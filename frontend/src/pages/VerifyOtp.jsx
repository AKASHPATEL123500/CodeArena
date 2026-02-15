import { useState } from "react"
import { useNavigate, useSearchParams, Link } from "react-router-dom"
import API from "../utils/api"

const VerifyOtp = () => {
    const navigate = useNavigate()
    const [ searchParams ] = useSearchParams()
    const emailFromQuery = searchParams.get( "email" ) || ""

    const [ email, setEmail ] = useState( emailFromQuery )
    const [ otp, setOtp ] = useState( "" )
    const [ error, setError ] = useState( "" )
    const [ success, setSuccess ] = useState( "" )
    const [ loading, setLoading ] = useState( false )

    const handleSubmit = async ( e ) => {
        e.preventDefault()
        if ( !email.trim() || !otp.trim() ) return setError( "All fields are required" )
        setLoading( true )
        setError( "" )
        try {
            await API.post( "/auth/verify-otp", {
                email: email.trim().toLowerCase(),
                otp: otp.trim(),
            } )
            setSuccess( "OTP verified! Redirecting to reset password..." )
            setTimeout( () => {
                navigate( `/reset-password?email=${ encodeURIComponent( email.trim() ) }&otp=${ otp.trim() }` )
            }, 1500 )
        } catch ( err ) {
            setError( err.response?.data?.message || "Invalid or expired OTP" )
        } finally {
            setLoading( false )
        }
    }

    return (
        <div style={ styles.container }>
            <div style={ styles.card }>
                <div style={ styles.icon }>🔑</div>
                <h2 style={ styles.title }>Enter OTP</h2>
                <p style={ styles.subtitle }>
                    Enter the reset code sent to your email
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
                            placeholder="Enter OTP"
                            maxLength={ 6 }
                            style={ { ...styles.input, textAlign: "center", letterSpacing: 8, fontSize: 18 } }
                        />
                    </div>

                    <button type="submit" disabled={ loading } style={ styles.btn }>
                        { loading ? "Verifying..." : "Verify OTP" }
                    </button>
                </form>

                <p style={ styles.link }>
                    <Link to="/send-otp?type=forgot" style={ styles.linkText }>← Resend OTP</Link>
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

export default VerifyOtp