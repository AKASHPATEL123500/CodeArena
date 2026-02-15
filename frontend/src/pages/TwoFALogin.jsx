import { useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import API from "../utils/api"

const TwoFALogin = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { login } = useAuth()

    // userId login page se navigate state mein aata hai
    const userId = location.state?.userId

    const [ token, setToken ] = useState( "" )
    const [ error, setError ] = useState( "" )
    const [ loading, setLoading ] = useState( false )

    if ( !userId ) {
        return (
            <div style={ styles.container }>
                <div style={ styles.card }>
                    <p style={ { color: "#e74c3c", textAlign: "center", fontSize: 14 } }>
                        Session expired.{ " " }
                        <Link to="/login" style={ styles.linkText }>Go back to login</Link>
                    </p>
                </div>
            </div>
        )
    }

    const handleSubmit = async ( e ) => {
        e.preventDefault()
        if ( !token.trim() ) return setError( "Enter your authenticator code" )
        setLoading( true )
        setError( "" )
        try {
            // Backend: POST /auth/verify-2fa-login
            // Body: { userId, token }
            // Response: cookies set (httpOnly) — koi user data response mein nahi aata
            await API.post( "/auth/verify-2fa-login", {
                userId,
                token: token.trim(),
            } )

            // login(null) call karega → AuthContext fetchProfile() trigger karega
            // fetchProfile cookies se user data laayega
            await login( null, null )

            navigate( "/profile" )
        } catch ( err ) {
            setError( err.response?.data?.message || "Invalid 2FA code. Try again." )
        } finally {
            setLoading( false )
        }
    }

    return (
        <div style={ styles.container }>
            <div style={ styles.card }>
                <div style={ styles.icon }>🔐</div>
                <h2 style={ styles.title }>Two-Factor Auth</h2>
                <p style={ styles.subtitle }>
                    Enter the 6-digit code from your authenticator app
                </p>

                { error && <div style={ styles.error }>{ error }</div> }

                <form onSubmit={ handleSubmit }>
                    <div style={ styles.field }>
                        <label style={ styles.label }>Authentication Code</label>
                        <input
                            type="text"
                            inputMode="numeric"
                            value={ token }
                            onChange={ ( e ) => {
                                // Only digits allow karo
                                const val = e.target.value.replace( /\D/g, "" )
                                setToken( val )
                                setError( "" )
                            } }
                            placeholder="000000"
                            maxLength={ 6 }
                            autoFocus
                            style={ {
                                ...styles.input,
                                textAlign: "center",
                                letterSpacing: 12,
                                fontSize: 28,
                                fontWeight: 700,
                            } }
                        />
                    </div>

                    <button type="submit" disabled={ loading } style={ styles.btn }>
                        { loading ? "Verifying..." : "Verify Code" }
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
        width: "100%", maxWidth: 380, textAlign: "center",
    },
    icon: { fontSize: 48, marginBottom: 12 },
    title: { color: "#fff", margin: 0, fontSize: 24, fontWeight: 700 },
    subtitle: { color: "#888", margin: "8px 0 30px", fontSize: 14, lineHeight: 1.5 },
    error: {
        background: "#2d1b1b", border: "1px solid #c0392b",
        color: "#e74c3c", padding: "10px 14px",
        borderRadius: 8, marginBottom: 16, fontSize: 13, textAlign: "left",
    },
    field: { marginBottom: 20, textAlign: "left" },
    label: { display: "block", color: "#aaa", fontSize: 13, marginBottom: 8 },
    input: {
        width: "100%", boxSizing: "border-box",
        background: "#111", border: "2px solid #333",
        borderRadius: 10, padding: "14px 12px",
        color: "#fff", outline: "none",
    },
    btn: {
        width: "100%", padding: "13px",
        background: "#4ade80", color: "#000",
        border: "none", borderRadius: 8,
        fontSize: 15, fontWeight: 700, cursor: "pointer",
    },
    link: { marginTop: 20, fontSize: 13 },
    linkText: { color: "#4ade80", textDecoration: "none" },
}

export default TwoFALogin