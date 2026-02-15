import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import API from "../utils/api"
import { useAuth } from "../context/AuthContext"

const Profile = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [ passkeyLoading, setPasskeyLoading ] = useState( false )
  const [ passkeyMsg, setPasskeyMsg ] = useState( "" )
  const [ passkeyError, setPasskeyError ] = useState( "" )

  const handleLogout = async () => {
    await logout()
    navigate( "/login" )
  }

  // Register passkey
  const registerPasskey = async () => {
    setPasskeyLoading( true )
    setPasskeyError( "" )
    setPasskeyMsg( "" )
    try {
      // Step 1: Get registration options
      const startRes = await API.post( "/auth/passkey/register/start" )
      const options = startRes.data.data.options

      // Step 2: Browser WebAuthn
      const { startRegistration } = await import( "@simplewebauthn/browser" )
      const credential = await startRegistration( options )

      // Step 3: Verify registration
      await API.post( "/auth/passkey/register/verify", { credential } )
      setPasskeyMsg( "✅ Passkey registered successfully!" )
    } catch ( err ) {
      setPasskeyError( err.response?.data?.message || err.message || "Failed to register passkey" )
    } finally {
      setPasskeyLoading( false )
    }
  }

  if ( !user ) {
    return (
      <div style={ styles.container }>
        <div style={ styles.card }>
          <p style={ { color: "#888", textAlign: "center" } }>
            Not logged in.{ " " }
            <Link to="/login" style={ { color: "#4ade80" } }>Go to Login</Link>
          </p>
        </div>
      </div>
    )
  }

  const roleBadgeColor = {
    student: "#3b82f6",
    startup: "#f59e0b",
    mentor: "#8b5cf6",
  }

  return (
    <div style={ styles.container }>
      <div style={ styles.card }>

        {/* Header */ }
        <div style={ styles.header }>
          <img
            src={ user.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent( user.name ) }
            alt="Avatar"
            style={ styles.avatar }
          />
          <div style={ styles.headerInfo }>
            <h2 style={ styles.name }>{ user.name }</h2>
            <p style={ styles.username }>@{ user.username }</p>
            <span style={ {
              ...styles.roleBadge,
              background: roleBadgeColor[ user.role ] || "#555"
            } }>
              { user.role?.toUpperCase() }
            </span>
          </div>
        </div>

        {/* Info Grid */ }
        <div style={ styles.infoGrid }>
          <InfoRow label="Email" value={ user.email } />
          <InfoRow
            label="Email Verified"
            value={ user.isVerified ? "✅ Verified" : "❌ Not Verified" }
          />
          <InfoRow
            label="2FA Status"
            value={ user.twoFactorEnabled ? "✅ Enabled" : "❌ Disabled" }
          />
          <InfoRow
            label="Account Status"
            value={ user.isActive ? "✅ Active" : "❌ Inactive" }
          />
          <InfoRow
            label="Passkeys"
            value={ `${ user.passkeys?.length || 0 } registered` }
          />
          { user.lastLogin && (
            <InfoRow
              label="Last Login"
              value={ new Date( user.lastLogin ).toLocaleString() }
            />
          ) }
        </div>

        {/* Actions */ }
        <div style={ styles.actions }>

          {/* 2FA Setup / Already enabled */ }
          { !user.twoFactorEnabled ? (
            <Link to="/setup-2fa" style={ styles.actionBtn }>
              🛡️ Enable Two-Factor Auth
            </Link>
          ) : (
            <div style={ styles.activeFeature }>
              ✅ Two-Factor Auth is Active
            </div>
          ) }

          {/* Passkey Registration */ }
          <div style={ styles.passkeySection }>
            { passkeyError && <div style={ styles.error }>{ passkeyError }</div> }
            { passkeyMsg && <div style={ styles.success }>{ passkeyMsg }</div> }
            <button
              onClick={ registerPasskey }
              disabled={ passkeyLoading }
              style={ styles.passkeyBtn }
            >
              { passkeyLoading ? "Registering..." : "🔑 Register Passkey" }
            </button>
          </div>

          {/* Email Verification - if not verified */ }
          { !user.isVerified && (
            <Link
              to={ `/send-otp?type=verify&email=${ encodeURIComponent( user.email ) }` }
              style={ { ...styles.actionBtn, background: "#1e2d1e", color: "#4ade80", border: "1px solid #27ae60" } }
            >
              ✉️ Verify Email
            </Link>
          ) }

          {/* Logout */ }
          <button onClick={ handleLogout } style={ styles.logoutBtn }>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}

const InfoRow = ( { label, value } ) => (
  <div style={ infoStyles.row }>
    <span style={ infoStyles.label }>{ label }</span>
    <span style={ infoStyles.value }>{ value }</span>
  </div>
)

const infoStyles = {
  row: {
    display: "flex", justifyContent: "space-between",
    alignItems: "center", padding: "10px 0",
    borderBottom: "1px solid #222",
  },
  label: { color: "#888", fontSize: 13 },
  value: { color: "#ddd", fontSize: 13, fontWeight: 500 },
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
    borderRadius: 12, padding: "36px",
    width: "100%", maxWidth: 480,
  },
  header: {
    display: "flex", alignItems: "center",
    gap: 20, marginBottom: 28,
    paddingBottom: 24, borderBottom: "1px solid #2a2a2a",
  },
  avatar: {
    width: 80, height: 80, borderRadius: "50%",
    objectFit: "cover", border: "3px solid #4ade80",
    flexShrink: 0,
  },
  headerInfo: { flex: 1 },
  name: { color: "#fff", margin: "0 0 4px", fontSize: 20, fontWeight: 700 },
  username: { color: "#888", margin: "0 0 8px", fontSize: 14 },
  roleBadge: {
    display: "inline-block", color: "#fff",
    padding: "2px 10px", borderRadius: 20,
    fontSize: 11, fontWeight: 700, letterSpacing: 1,
  },
  infoGrid: { marginBottom: 24 },
  actions: { display: "flex", flexDirection: "column", gap: 10 },
  actionBtn: {
    display: "block", padding: "11px 16px",
    background: "#1e2233", border: "1px solid #2d3458",
    borderRadius: 8, color: "#7ca6ff",
    fontSize: 14, textDecoration: "none", textAlign: "center",
  },
  activeFeature: {
    padding: "11px 16px", background: "#1b2d1b",
    border: "1px solid #27ae60", borderRadius: 8,
    color: "#2ecc71", fontSize: 14, textAlign: "center",
  },
  passkeySection: {},
  error: {
    background: "#2d1b1b", border: "1px solid #c0392b",
    color: "#e74c3c", padding: "8px 12px",
    borderRadius: 8, marginBottom: 8, fontSize: 12,
  },
  success: {
    background: "#1b2d1b", border: "1px solid #27ae60",
    color: "#2ecc71", padding: "8px 12px",
    borderRadius: 8, marginBottom: 8, fontSize: 12,
  },
  passkeyBtn: {
    width: "100%", padding: "11px",
    background: "transparent", border: "1px solid #333",
    borderRadius: 8, color: "#ccc",
    fontSize: 14, cursor: "pointer",
  },
  logoutBtn: {
    width: "100%", padding: "11px",
    background: "#2d1b1b", border: "1px solid #c0392b",
    borderRadius: 8, color: "#e74c3c",
    fontSize: 14, fontWeight: 700, cursor: "pointer",
    marginTop: 6,
  },
}

export default Profile