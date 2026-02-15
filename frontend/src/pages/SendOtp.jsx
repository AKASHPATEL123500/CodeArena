import { useState, useEffect } from "react"
import { useNavigate, useSearchParams, Link } from "react-router-dom"
import API from "../utils/api"

// This page handles:
// 1. type=verify  → send OTP for email verification (/auth/send-otp-email)
// 2. type=forgot  → send OTP for password reset (/auth/forget-passowrd)

const SendOtp = () => {
    const navigate = useNavigate()
    const [ searchParams ] = useSearchParams()
    const type = searchParams.get( "type" ) || "verify"
    const prefillEmail = searchParams.get( "email" ) || ""

    const [ email, setEmail ] = useState( prefillEmail )
    const [ error, setError ] = useState( "" )
    const [ success, setSuccess ] = useState( "" )
    const [ loading, setLoading ] = useState( false )

    const isVerify = type === "verify"

    const handleSubmit = async ( e ) => {
        e.preventDefault()
        const trimEmail = email.trim()
        if ( !trimEmail ) return setError( "Email is required" )
        setLoading( true )
        setError( "" )
        try {
            const endpoint = isVerify
                ? "/auth/send-otp-email"
                : "/auth/forget-passowrd"

            await API.post( endpoint, { email: trimEmail } )
            setSuccess( "OTP sent to your email! Please check your inbox." )
            setTimeout( () => {
                if ( isVerify ) {
                    navigate( `/verify-email?email=${ encodeURIComponent( trimEmail ) }` )
                } else {
                    navigate( `/verify-otp?email=${ encodeURIComponent( trimEmail ) }` )
                }
            }, 1500 )
        } catch ( err ) {
            setError( err.response?.data?.message || "Failed to send OTP" )
        } finally {
            setLoading( false )
        }
    }

    return (
        <div style={ styles.container }>
            <div style={ styles.card }>
                <div style={ styles.icon }>{ isVerify ? "📧" : "🔐" }</div>
                <h2 style={ styles.title }>
                    { isVerify ? "Verify Your Email" : "Forgot Password" }
                </h2>
                <p style={ styles.subtitle }>
                    { isVerify
                        ? "We'll send a verification code to your email"
                        : "Enter your email to receive a password reset OTP" }
                </p>

                { error && <div style={ styles.error }>{ error }</div> }
                { success && <div style={ styles.success }>{ success }</div> }

                <form onSubmit={ handleSubmit }>
                    <div style={ styles.field }>
                        <label style={ styles.label }>Email Address</label>
                        <input
                            type="email"
                            value={ email }
                            onChange={ ( e ) => { setEmail( e.target.value ); setError( "" ) } }
                            placeholder="john@example.com"
                            style={ styles.input }
                            required
                        />
                    </div>

                    <button type="submit" disabled={ loading } style={ styles.btn }>
                        { loading ? "Sending OTP..." : "Send OTP" }
                    </button>
                </form>

                <p style={ styles.link }>
                    <Link to="/login" style={ styles.linkText }>← Back to Login</Link>
                </p>
            </div>
        </div>
    )
}

const styles = {
    container: {
        minHeight: "100vh",
        background: "#0f0f0f",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px", fontFamily: "'Segoe UI', sans-serif",
    },
    card: {
        background: "#1a1a1a", border: "1px solid #2a2a2a",
        borderRadius: 12, padding: "40px 36px",
        width: "100%", maxWidth: 420, textAlign: "center",
    },
    icon: { fontSize: 48, marginBottom: 12 },
    title: { color: "#fff", margin: 0, fontSize: 24, fontWeight: 700 },
    subtitle: { color: "#888", margin: "8px 0 24px", fontSize: 14, lineHeight: 1.5 },
    error: {
        background: "#2d1b1b", border: "1px solid #c0392b",
        color: "#e74c3c", padding: "10px 14px",
        borderRadius: 8, marginBottom: 16, fontSize: 13, textAlign: "left",
    },
    success: {
        background: "#1b2d1b", border: "1px solid #27ae60",
        color: "#2ecc71", padding: "10px 14px",
        borderRadius: 8, marginBottom: 16, fontSize: 13, textAlign: "left",
    },
    field: { marginBottom: 16, textAlign: "left" },
    label: { display: "block", color: "#aaa", fontSize: 13, marginBottom: 6 },
    input: {
        width: "100%", boxSizing: "border-box",
        background: "#111", border: "1px solid #333",
        borderRadius: 8, padding: "10px 12px",
        color: "#fff", fontSize: 14, outline: "none",
    },
    btn: {
        width: "100%", padding: "12px",
        background: "#4ade80", color: "#000",
        border: "none", borderRadius: 8,
        fontSize: 15, fontWeight: 700, cursor: "pointer",
    },
    link: { marginTop: 20, fontSize: 13 },
    linkText: { color: "#4ade80", textDecoration: "none" },
}

export default SendOtp