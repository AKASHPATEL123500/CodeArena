import { useState } from "react"
import { useNavigate, useSearchParams, Link } from "react-router-dom"
import API from "../utils/api"

const VerifyEmail = () => {
    const navigate = useNavigate()
    const [ searchParams ] = useSearchParams()
    const emailFromQuery = searchParams.get( "email" ) || ""

    const [ email, setEmail ] = useState( emailFromQuery )
    const [ otp, setOtp ] = useState( "" )
    const [ error, setError ] = useState( "" )
    const [ success, setSuccess ] = useState( "" )
    const [ loading, setLoading ] = useState( false )
    const [ resending, setResending ] = useState( false )

    const handleSubmit = async ( e ) => {
        e.preventDefault()
        if ( !email.trim() || !otp.trim() ) return setError( "All fields are required" )
        setLoading( true )
        setError( "" )
        try {
            await API.post( "/auth/verify-email", {
                email: email.trim().toLowerCase(),
                otp: otp.trim(),
            } )
            setSuccess( "Email verified successfully! Redirecting to login..." )
            setTimeout( () => navigate( "/login" ), 1800 )
        } catch ( err ) {
            setError( err.response?.data?.message || "Invalid OTP" )
        } finally {
            setLoading( false )
        }
    }

    const resendOtp = async () => {
        if ( !email.trim() ) return setError( "Enter your email first" )
        setResending( true )
        setError( "" )
        try {
            await API.post( "/auth/send-otp-email", { email: email.trim() } )
            setSuccess( "New OTP sent to your email!" )
        } catch ( err ) {
            setError( err.response?.data?.message || "Failed to resend OTP" )
        } finally {
            setResending( false )
        }
    }

    return (
        <div style={ styles.container }>
            <div style={ styles.card }>
                <div style={ styles.icon }>✉️</div>
                <h2 style={ styles.title }>Verify Email</h2>
                <p style={ styles.subtitle }>
                    Enter the 6-digit code sent to your email address
                </p>

                { error && <div style={ styles.error }>{ error }</div> }
                { success && <div style={ styles.success }>{ success }</div> }

                <form onSubmit={ handleSubmit }>
                    <div style={ styles.field }>
                        <label style={ styles.label }>Email</label>
                        <input
                            type="email"
                            value={ email }
                            onChange={ ( e ) => { setEmail( e.target.value ); setError( "" ) } }
                            placeholder="john@example.com"
                            style={ styles.input }
                        />
                    </div>

                    <div style={ styles.field }>
                        <label style={ styles.label }>OTP Code</label>
                        <input
                            type="text"
                            value={ otp }
                            onChange={ ( e ) => { setOtp( e.target.value ); setError( "" ) } }
                            placeholder="Enter 6-digit OTP"
                            maxLength={ 6 }
                            style={ { ...styles.input, textAlign: "center", letterSpacing: 8, fontSize: 18 } }
                        />
                    </div>

                    <button type="submit" disabled={ loading } style={ styles.btn }>
                        { loading ? "Verifying..." : "Verify Email" }
                    </button>
                </form>

                <p style={ styles.resendText }>
                    Didn't receive code?{ " " }
                    <button
                        onClick={ resendOtp }
                        disabled={ resending }
                        style={ styles.resendBtn }
                    >
                        { resending ? "Sending..." : "Resend OTP" }
                    </button>
                </p>

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
    resendText: { marginTop: 16, color: "#888", fontSize: 13 },
    resendBtn: {
        background: "none", border: "none",
        color: "#4ade80", cursor: "pointer",
        fontSize: 13, fontWeight: 600, padding: 0,
    },
    link: { marginTop: 16, fontSize: 13 },
    linkText: { color: "#4ade80", textDecoration: "none" },
}

export default VerifyEmail