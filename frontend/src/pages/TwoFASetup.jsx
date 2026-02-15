import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../utils/api"

const TwoFASetup = () => {
    const navigate = useNavigate()
    const [ qrCode, setQrCode ] = useState( null )
    const [ token, setToken ] = useState( "" )
    const [ error, setError ] = useState( "" )
    const [ success, setSuccess ] = useState( "" )
    const [ loadingQr, setLoadingQr ] = useState( false )
    const [ loadingVerify, setLoadingVerify ] = useState( false )
    const [ step, setStep ] = useState( 1 ) // 1: generate QR, 2: enter code

    // Step 1: Generate 2FA secret and get QR code
    const generateSecret = async () => {
        setLoadingQr( true )
        setError( "" )
        try {
            const res = await API.post( "/auth/2fa-secret-key" )
            setQrCode( res.data.data.QrCode )
            setStep( 2 )
        } catch ( err ) {
            setError( err.response?.data?.message || "Failed to generate 2FA secret" )
        } finally {
            setLoadingQr( false )
        }
    }

    // Step 2: Verify TOTP code and enable 2FA
    const verifyAndEnable = async ( e ) => {
        e.preventDefault()
        if ( !token.trim() ) return setError( "Enter the authenticator code" )
        setLoadingVerify( true )
        setError( "" )
        try {
            await API.post( "/auth/verify-2fa", { token: token.trim() } )
            setSuccess( "2FA enabled successfully! Your account is now more secure." )
            setTimeout( () => navigate( "/profile" ), 2000 )
        } catch ( err ) {
            setError( err.response?.data?.message || "Invalid code. Try again." )
        } finally {
            setLoadingVerify( false )
        }
    }

    return (
        <div style={ styles.container }>
            <div style={ styles.card }>
                <div style={ styles.icon }>🛡️</div>
                <h2 style={ styles.title }>Two-Factor Authentication</h2>
                <p style={ styles.subtitle }>
                    Add an extra layer of security to your account
                </p>

                { error && <div style={ styles.error }>{ error }</div> }
                { success && <div style={ styles.success }>{ success }</div> }

                { step === 1 && (
                    <div>
                        <div style={ styles.infoBox }>
                            <p style={ styles.infoText }>
                                📱 You'll need an authenticator app like{ " " }
                                <strong>Google Authenticator</strong> or{ " " }
                                <strong>Authy</strong> to set up 2FA.
                            </p>
                        </div>
                        <button onClick={ generateSecret } disabled={ loadingQr } style={ styles.btn }>
                            { loadingQr ? "Generating..." : "Generate QR Code" }
                        </button>
                    </div>
                ) }

                { step === 2 && qrCode && (
                    <div>
                        <div style={ styles.qrSection }>
                            <p style={ styles.qrInstruction }>
                                Scan this QR code with your authenticator app
                            </p>
                            <img src={ qrCode } alt="2FA QR Code" style={ styles.qrImg } />
                            <p style={ styles.qrNote }>
                                After scanning, enter the 6-digit code shown in your app
                            </p>
                        </div>

                        <form onSubmit={ verifyAndEnable }>
                            <div style={ styles.field }>
                                <label style={ styles.label }>Authenticator Code</label>
                                <input
                                    type="text"
                                    value={ token }
                                    onChange={ ( e ) => { setToken( e.target.value ); setError( "" ) } }
                                    placeholder="Enter 6-digit code"
                                    maxLength={ 6 }
                                    style={ { ...styles.input, textAlign: "center", letterSpacing: 10, fontSize: 20 } }
                                />
                            </div>
                            <button type="submit" disabled={ loadingVerify } style={ styles.btn }>
                                { loadingVerify ? "Enabling..." : "Enable 2FA" }
                            </button>
                        </form>
                    </div>
                ) }

                <button
                    onClick={ () => navigate( "/profile" ) }
                    style={ styles.cancelBtn }
                >
                    Cancel
                </button>
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
        width: "100%", maxWidth: 440, textAlign: "center",
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
    infoBox: {
        background: "#1e2233", border: "1px solid #2d3458",
        borderRadius: 8, padding: "12px 16px", marginBottom: 20,
    },
    infoText: { color: "#aaa", fontSize: 13, margin: 0, lineHeight: 1.6 },
    qrSection: { marginBottom: 24 },
    qrInstruction: { color: "#aaa", fontSize: 13, marginBottom: 12 },
    qrImg: {
        width: 180, height: 180,
        border: "4px solid #2a2a2a", borderRadius: 8,
    },
    qrNote: { color: "#666", fontSize: 12, marginTop: 12 },
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
    cancelBtn: {
        width: "100%", padding: "11px",
        background: "transparent", border: "1px solid #333",
        borderRadius: 8, color: "#888",
        fontSize: 14, cursor: "pointer", marginTop: 10,
    },
}

export default TwoFASetup