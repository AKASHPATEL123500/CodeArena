import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiRespone } from "../utils/apiResponse.js";
import User from "../models/user_model.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/sendMail.js";
import { genrateOtp } from "../utils/otp.js";
import QRCode from "qrcode"
import speakeasy from "speakeasy"
import { otpTemplate } from "../utils/emailTemplates.js";
import { generateRegistrationOptions } from "@simplewebauthn/server"
import { verifyRegistrationResponse } from "@simplewebauthn/server";
import { generateAuthenticationOptions } from "@simplewebauthn/server";
import { verifyAuthenticationResponse } from "@simplewebauthn/server";
import redis from "../config/redis.js";


// ================ Signup =========================
const signup = asyncHandler( async ( req, res ) => {

    const { name, username, email, password, role } = req.body
    const avatarFilePath = req.files?.avatar?.[ 0 ]?.path

    if ( !avatarFilePath ) {
        throw new ApiError( 400, "Avatar is missing" )
    }

    const trimName = name?.trim()
    const trimUserName = username?.trim()
    const trimEmail = email?.trim()

    if ( !trimName || !trimUserName || !trimEmail || !password ) {
        throw new ApiError( 400, "All fields are required" )
    }

    // ✅ Fixed - .length add kiya
    if ( trimName.length < 2 || trimName.length > 50 ) {
        throw new ApiError( 400, "Name must be between 2-50 characters" )
    }

    if ( trimUserName.length < 5 || trimUserName.length > 20 ) {
        throw new ApiError( 400, "Username must be between 5-20 characters" )
    }

    if ( password.length < 8 ) {
        throw new ApiError( 400, "Password must be at least 8 characters" )
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/

    if ( !passwordRegex.test( password ) ) {
        throw new ApiError( 400, "Password must contain uppercase, lowercase, number and special character" )
    }

    const existingUser = await User.findOne( {
        $or: [
            { username: username },
            { email: email }
        ]
    } )

    if ( existingUser ) {
        if ( existingUser.isDeleted ) {
            throw new ApiError( 409, "Account with this email/username was deleted. Contact support" )
        }
        if ( existingUser.email === email ) {
            throw new ApiError( 409, "Email already exists" )
        }
        if ( existingUser.username === username ) {
            throw new ApiError( 409, "Username already exists" )
        }
    }

    const allowedRole = [ "student", "startup", "mentor" ]

    if ( role && !allowedRole.includes( role ) ) {
        throw new ApiError( 400, "Invalid role. Allowed: student, startup, mentor" )
    }

    const avatar = await uploadOnCloudinary( avatarFilePath )
    if ( !avatar ) {
        throw new ApiError( 400, "Failed to upload image. Please try again" )
    }

    const user = await User.create( {
        name: trimName,
        username: trimUserName,
        email: trimEmail,
        password: password,
        role: role || "student",
        avatar: avatar.url
    } )

    const freshUserData = await User.findById( user._id ).select( "-password -refreshToken" )

    return res.status( 201 ).json(
        new ApiRespone( 201, freshUserData, "Signup successfully" )
    )
} )


// ================= Login ==========================
const signin = asyncHandler( async ( req, res ) => {

    const { email, password } = req.body

    const trimmedEmail = email?.trim()
    const trimmedPassword = password?.trim()

    if ( !trimmedEmail || !trimmedPassword ) {
        throw new ApiError( 400, "Email and password are required" )
    }

    const existingUser = await User.findOne( {
        email: trimmedEmail.toLowerCase(), isDeleted: false
    } ).select( '+password' )

    const dummyHash = "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIWYzFKqle"
    if ( !existingUser ) {
        await bcrypt.compare( trimmedPassword, dummyHash )
        throw new ApiError( 401, "Invalid credentials" )
    }

    if ( !existingUser.isActive ) {
        throw new ApiError( 403, "Account has been deactivated. Contact support" )
    }

    if ( existingUser.isDeleted ) {
        throw new ApiError( 403, "Account has been deleted. Contact support" )
    }

    if ( existingUser.lockUntil && existingUser.lockUntil > Date.now() ) {
        const remainingMinutes = Math.ceil(
            ( existingUser.lockUntil - Date.now() ) / ( 60 * 1000 )
        )
        throw new ApiError( 403, `Account locked. Try again after ${ remainingMinutes } minutes` )
    }

    const isPasswordCorrect = await existingUser.isPasswordMatched( trimmedPassword )

    if ( !isPasswordCorrect ) {
        await existingUser.incrementLoginAttempts()
        throw new ApiError( 401, "Invalid credentials" )
    }

    await existingUser.resetLoginAttempts()

    if ( !existingUser.isVerified ) {
        throw new ApiError( 400, "Please verify your email first" )
    }

    if ( existingUser.twoFactorEnabled ) {
        return res.status( 200 ).json(
            new ApiRespone( 200, {
                twoFactorRequired: true,
                userId: existingUser._id
            }, "Enter 2FA Code" )
        )
    }

    const accessToken = existingUser.generateAccessToken()
    const refreshToken = existingUser.generateRefreshToken()

    existingUser.refreshToken = refreshToken
    existingUser.lastLogin = Date.now()
    await existingUser.save( { validateBeforeSave: false } )

    const userWithoutPassword = await User.findById( existingUser._id )
        .select( '-password ' )

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    }

    return res
        .status( 200 )
        .cookie( "accessToken", accessToken, cookieOptions )
        .cookie( "refreshToken", refreshToken, cookieOptions )
        .json(
            new ApiRespone( 200, {
                user: userWithoutPassword,
                accessToken: accessToken,
                refreshToken: refreshToken  // ✅ Added
            }, "Sign in successful" )
        )
} )


// =================== Signout ======================
const signout = asyncHandler( async ( req, res ) => {

    await User.findByIdAndUpdate(
        req.user._id,
        { $unset: { refreshToken: 1 } }
    )

    const cookieOptions = {
        httpOnly: true,
        secure: true
    }

    return res
        .status( 200 )
        .clearCookie( "accessToken", cookieOptions )
        .clearCookie( "refreshToken", cookieOptions )
        .json( new ApiRespone( 200, {}, "SignOut Successfully" ) )
} )


// ==================== Refresh Token =============
const refreshTokenRotation = asyncHandler( async ( req, res ) => {

    const inCommingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if ( !inCommingRefreshToken ) {
        throw new ApiError( 401, "Refresh token is required" )
    }

    let decodeToken
    try {
        decodeToken = jwt.verify(
            inCommingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET_KEY
        )
    } catch ( error ) {
        throw new ApiError( 401, "Invalid or expired refresh token" )
    }

    // ✅ +refreshToken explicitly select karo
    const user = await User.findById( decodeToken?._id ).select( '+refreshToken' )

    if ( !user ) {
        throw new ApiError( 401, "User not found" )
    }

    if ( inCommingRefreshToken !== user.refreshToken ) {
        throw new ApiError( 401, "Refresh token is invalid or expired" )
    }

    const newAccessToken = user.generateAccessToken()
    const newRefreshToken = user.generateRefreshToken()

    user.refreshToken = newRefreshToken
    await user.save( { validateBeforeSave: false } )

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    }

    return res
        .status( 200 )
        .cookie( "accessToken", newAccessToken, cookieOptions )
        .cookie( "refreshToken", newRefreshToken, cookieOptions )
        .json(
            new ApiRespone( 200, {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken  // ✅ Naya refreshToken bhi bhejo
            }, "Token refreshed successfully" )
        )
} )


// =============== Email Verification =============
const sendOtpEmail = asyncHandler( async ( req, res ) => {

    const { email } = req.body
    if ( !email ) throw new ApiError( 400, "Email is required" )

    const trimEmail = email.trim().toLowerCase()

    const user = await User.findOne( { email: trimEmail } )
    if ( !user ) throw new ApiError( 401, "Invalid Credential" )

    const otp = genrateOtp()

    // ✅ Removed undefined functions candSendOTP and storeOTP
    await redis.set( `email_otp:${ trimEmail }`, otp, 'EX', 600 )

    await sendMail( {
        to: trimEmail,
        subject: "Email Verification OTP",
        text: "",
        html: otpTemplate( otp, user.name )
    } )

    return res.status( 200 ).json(
        new ApiRespone( 200, {}, "OTP sent successfully. Please check your email" )
    )
} )


// ==================== Verify Email OTP ==========
const verifyEmailOtp = asyncHandler( async ( req, res ) => {

    const { email, otp } = req.body

    if ( !email || !otp ) throw new ApiError( 400, "All fields are required" )

    const trimEmail = email.trim().toLowerCase()

    const user = await User.findOne( { email: trimEmail } )
    if ( !user ) throw new ApiError( 400, "Invalid Credential" )

    const savedOtp = await redis.get( `email_otp:${ trimEmail }` )
    if ( !savedOtp ) throw new ApiError( 400, "OTP expired" )

    if ( savedOtp !== String( otp ).trim() ) throw new ApiError( 400, "Invalid OTP" )

    await redis.del( `email_otp:${ trimEmail }` )
    await redis.del( `otp_limit:${ trimEmail }` )

    user.isVerified = true
    await user.save( { validateBeforeSave: false } )

    return res.status( 200 ).json(
        new ApiRespone( 200, {}, "Email verified successfully!" )
    )
} )


// ================ Forget Password =================
const forgetPassword = asyncHandler( async ( req, res ) => {

    const { email } = req.body

    if ( !email ) throw new ApiError( 400, "Email is required" )

    const user = await User.findOne( { email } )
    if ( !user ) throw new ApiError( 404, "User not found" )

    const otp = genrateOtp()

    await redis.set( `reset_otp:${ email }`, otp, 'EX', 600 )

    await sendMail( {
        to: email,
        subject: "Password Reset OTP",
        text: '',
        html: otpTemplate( otp, user.name )
    } )

    return res.status( 200 ).json(
        new ApiRespone( 200, {}, "OTP sent to your email. Please check" )
    )
} )


// ================= Verify OTP =======================
const verifyOtp = asyncHandler( async ( req, res ) => {

    const { email, otp } = req.body
    if ( !email || !otp ) throw new ApiError( 400, "All fields are required" )

    const user = await User.findOne( { email } )
    if ( !user ) throw new ApiError( 400, "Invalid Credential" )

    const savedOtp = await redis.get( `reset_otp:${ email }` )
    if ( !savedOtp ) throw new ApiError( 400, "OTP Expired" )
    if ( savedOtp !== String( otp ).trim() ) throw new ApiError( 400, "Invalid OTP" )

    await redis.set( `otp_verified:${ email }`, "True", 'EX', 600 )

    return res.status( 200 ).json(
        new ApiRespone( 200, {}, "OTP verified successfully" )
    )
} )


// ================== Reset Password =====================
const resetPassword = asyncHandler( async ( req, res ) => {

    const { email, otp, newPassword, confirmPassword } = req.body

    if ( !email || !otp || !newPassword || !confirmPassword ) {
        throw new ApiError( 400, "All fields are required" )
    }

    if ( newPassword !== confirmPassword ) {
        throw new ApiError( 400, "Passwords do not match" )
    }

    const user = await User.findOne( { email } )
    if ( !user ) throw new ApiError( 401, "Invalid Credentials" )

    const isVerified = await redis.get( `otp_verified:${ email }` )
    if ( !isVerified ) throw new ApiError( 400, "Please verify OTP first" )

    user.password = newPassword
    user.isVerified = true
    await user.save( { validateBeforeSave: false } )

    await redis.del( `reset_otp:${ email }` )
    await redis.del( `otp_verified:${ email }` )
    await redis.del( `forget_limit:${ email }` )

    return res.status( 200 ).json(
        new ApiRespone( 200, {}, "Password reset successfully" )
    )
} )


// =================== 2FA System =========================
const genrate2FASecret = asyncHandler( async ( req, res ) => {

    const user = await User.findById( req.user._id )

    const secret = speakeasy.generateSecret( {
        name: `CodeArena(${ user.email })`
    } )

    user.twoFactorSecret = secret.base32
    await user.save( { validateBeforeSave: false } )

    const qr = await QRCode.toDataURL( secret.otpauth_url )

    return res.status( 200 ).json(
        new ApiRespone( 200, { QrCode: qr }, "Scan QR with Authenticator" )
    )
} )


// =================== Verify 2FA ==========================
const verifyAndEnable2FA = asyncHandler( async ( req, res ) => {

    const { token } = req.body

    const user = await User.findById( req.user._id )

    const verify = speakeasy.totp.verify( {
        secret: user.twoFactorSecret,
        encoding: "base32",
        token: token.toString(),
        window: 6
    } )

    if ( !verify ) throw new ApiError( 400, "Invalid code" )

    user.twoFactorEnabled = true
    await user.save()

    return res.status( 200 ).json(
        new ApiRespone( 200, {}, "2FA Enabled successfully" )
    )
} )


// ==================== Verify 2FA Login ===================
const verify2FALogin = asyncHandler( async ( req, res ) => {

    const { userId, token } = req.body

    if ( !userId || !token ) throw new ApiError( 400, "Missing data" )

    const user = await User.findById( userId )

    if ( !user || !user.twoFactorEnabled ) throw new ApiError( 400, "Invalid request" )

    const ok = speakeasy.totp.verify( {
        secret: user.twoFactorSecret,
        encoding: "base32",
        token: token.toString(),
        window: 6
    } )

    if ( !ok ) throw new ApiError( 400, "Wrong 2FA Code" )

    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    user.lastLogin = Date.now()
    await user.save( { validateBeforeSave: false } )

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    }

    return res
        .cookie( "accessToken", accessToken, cookieOptions )
        .cookie( "refreshToken", refreshToken, cookieOptions )
        .json( new ApiRespone( 200, {
            accessToken,
            refreshToken
        }, "2FA Login success" ) )
} )


// ==================== Passkey =============================
const startPasskeyRegistration = asyncHandler( async ( req, res ) => {

    const user = req.user

    const excludeCredentials = user.passkeys.map( pk => ( {
        id: pk.credentialID,
        type: "public-key"
    } ) )

    const options = await generateRegistrationOptions( {
        rpName: "CodeArena",
        rpID: "code-arena-seven",
        userID: new TextEncoder().encode( user._id.toString() ),
        userName: user.email,
        attestationType: "none",
        excludeCredentials,
        authenticatorSelection: {
            residentKey: "preferred",
            userVerification: "preferred"
        }
    } )

    user.currentChallenge = options.challenge
    await user.save( { validateBeforeSave: false } )

    return res.status( 200 ).json(
        new ApiRespone( 200, { options }, "Passkey registration started" )
    )
} )


// ==================== Verify Passkey =======================
const verifyPasskeyRegistration = asyncHandler( async ( req, res ) => {

    const user = req.user
    const { credential } = req.body

    if ( !credential ) throw new ApiError( 400, "Credential is required" )

    const verification = await verifyRegistrationResponse( {
        response: credential,
        expectedChallenge: user.currentChallenge,
        expectedOrigin: "https://code-arena-seven.vercel.app",
        expectedRPID: "code-arena-seven",
        requireUserVerification: true
    } )

    if ( !verification.verified ) throw new ApiError( 400, "Passkey verification failed" )

    const { credential: cred } = verification.registrationInfo

    user.passkeys.push( {
        credentialID: cred.id,
        publicKey: Buffer.from( cred.publicKey ).toString( "base64url" ),
        counter: cred.counter,
        deviceName: "User Device",
        transports: credential.response.transports || []
    } )

    user.currentChallenge = undefined
    await user.save( { validateBeforeSave: false } )

    return res.status( 200 ).json(
        new ApiRespone( 200, {}, "Passkey registered successfully" )
    )
} )


// ===================== Login Passkey =========================
const startPasskeyLogin = asyncHandler( async ( req, res ) => {

    const { email } = req.body

    if ( !email ) throw new ApiError( 400, "Email is required" )

    const user = await User.findOne( { email: email.toLowerCase() } )

    if ( !user || user.passkeys.length === 0 ) {
        throw new ApiError( 404, "No passkey registered" )
    }

    const allowCredentials = user.passkeys.map( pk => ( {
        id: pk.credentialID,
        type: "public-key"
    } ) )

    const options = await generateAuthenticationOptions( {
        rpID: "code-arena-seven",
        allowCredentials,
        userVerification: "required"
    } )

    user.currentChallenge = options.challenge
    await user.save( { validateBeforeSave: false } )

    return res.status( 200 ).json(
        new ApiRespone( 200, { options }, "Passkey login started" )
    )
} )


// ===================== Verify Login Passkey ===================
const verifyPasskeyLogin = asyncHandler( async ( req, res ) => {

    const { email, credential } = req.body

    const user = await User.findOne( { email: email.toLowerCase() } )

    if ( !user ) throw new ApiError( 404, "Invalid credential" )

    if ( !user.currentChallenge ) throw new ApiError( 400, "No login challenge found" )

    const passkey = user.passkeys.find( pk => pk.credentialID === credential.id )

    if ( !passkey ) throw new ApiError( 400, "Passkey not registered" )

    const verification = await verifyAuthenticationResponse( {
        response: credential,
        expectedChallenge: user.currentChallenge,
        expectedOrigin: "https://code-arena-seven.vercel.app",
        expectedRPID: "code-arena-seven",
        credential: {
            id: passkey.credentialID,
            publicKey: Buffer.from( passkey.publicKey, "base64url" ),
            counter: passkey.counter,
            transports: passkey.transports
        }
    } )

    if ( !verification.verified ) throw new ApiError( 400, "Passkey login failed" )

    passkey.counter = verification.authenticationInfo.newCounter
    user.currentChallenge = undefined

    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save( { validateBeforeSave: false } )

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    }

    const safeUser = await User.findById( user._id ).select( "-password -refreshToken" )

    return res
        .status( 200 )
        .cookie( "accessToken", accessToken, cookieOptions )
        .cookie( "refreshToken", refreshToken, cookieOptions )
        .json( new ApiRespone( 200, {
            user: safeUser,
            accessToken,
            refreshToken
        }, "Passkey login success" ) )
} )


export {
    signup,
    signin,
    signout,
    refreshTokenRotation,
    forgetPassword,
    verifyOtp,
    resetPassword,
    genrate2FASecret,
    verifyAndEnable2FA,
    verify2FALogin,
    sendOtpEmail,
    verifyEmailOtp,
    startPasskeyRegistration,
    verifyPasskeyRegistration,
    startPasskeyLogin,
    verifyPasskeyLogin,
}