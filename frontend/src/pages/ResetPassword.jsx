import { useState } from "react"
import { useNavigate, useSearchParams, Link } from "react-router-dom"
import API from "../utils/api"

const ResetPassword = () => {
    const navigate = useNavigate()
    const [ searchParams ] = useSearchParams()
    const emailFromQuery = searchParams.get( "email" ) || ""
    const otpFromQuery = searchParams.get( "otp" ) || ""

    const [ form, setForm ] = useState( {
        email: emailFromQuery,
        otp: otpFromQuery,
        newPassword: "",
        confirmPassword: "",
    } )
    const [ error, setError ] = useState( "" )
    const [ success, setSuccess ] = useState( "" )
    const [ loading, setLoading ] = useState( false )

    const handleChange = ( e ) => {
        setForm( { ...form, [ e.target.name ]: e.target.value } )
        setError( "" )
    }

    const validate = () => {
        if ( !form.email || !form.otp || !form.newPassword || !form.confirmPassword )
            return "All fields are required"
        if ( form.newPassword !== form.confirmPassword )
            return "Passwords do not match"
        if ( form.newPassword.length < 8 )
            return "Password must be at least 8 characters"
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
        if ( !passwordRegex.test( form.newPassword ) )
            return "Password must contain uppercase, lowercase, number and special character"
        return null
    }

    const handleSubmit = async ( e ) => {
        e.preventDefault()
        const err = validate()
        if ( err ) return setError( err )
        setLoading( true )
        try {
            await API.post( "/auth/reset-password", {
                email: form.email.trim().toLowerCase(),
                otp: form.otp.trim(),
                newPassword: form.newPassword,
                confirmPassword: form.confirmPassword,
            } )
            setSuccess( "Password reset successfully! Redirecting to login..." )
            setTimeout( () => navigate( "/login" ), 2000 )
        } catch ( err ) {
            setError( err.response?.data?.message || "Failed to reset password" )
        } finally {
            setLoading( false )
        }
    }

    return (
        <div style={ styles.container }>
            <div style={ styles.card }>
                <div style={ styles.icon }>🔒</div>
                <h2 style={ styles.title }>Reset Password</h2>
                <p style={ styles.subtitle }>Create a new strong password</p>

                { error && <div style={ styles.error }>{ error }</div> }
                { success && <div style={ styles.success }>{ success }</div> }

                <form onSubmit={ handleSubmit }>
                    <div style={ styles.field }>
                        <label style={ styles.label }>Email</label>
                        <input
                            name="email"
                            type="email"
                            value={ form.email }
                            onChange={ handleChange }
                            placeholder="john@example.com"
                            style={ styles.input }
                        />
                    </div>

                    <div style={ styles.field }>
                        <label style={ styles.label }>OTP Code</label>
                        <input
                            name="otp"
                            type="text"
                            value={ form.otp }
                            onChange={ handleChange }
                            placeholder="Enter OTP"
                            maxLength={ 6 }
                            style={ styles.input }
                        />
                    </div>

                    <div style={ styles.field }>
                        <label style={ styles.label }>New Password</label>
                        <input
                            name="newPassword"
                            type="password"
                            value={ form.newPassword }
                            onChange={ handleChange }
                            placeholder="Min 8 chars, A-Z, 0-9, @$!%*?&#"
                            style={ styles.input }
                        />
                    </div>

                    <div style={ styles.field }>
                        <label style={ styles.label }>Confirm Password</label>
                        <input
                            name="confirmPassword"
                            type="password"
                            value={ form.confirmPassword }
                            onChange={ handleChange }
                            placeholder="Repeat new password"
                            style={ styles.input }
                        />
                    </div>

                    <button type="submit" disabled={ loading } style={ styles.btn }>
                        { loading ? "Resetting..." : "Reset Password" }
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
    subtitle: { color: "#888", margin: "8px 0 24px", fontSize: 14 },
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

export default ResetPassword