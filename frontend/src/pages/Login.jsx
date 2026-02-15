import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import API from "../utils/api"
import { useAuth } from "../context/AuthContext"

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [ form, setForm ] = useState( { email: "", password: "" } )
  const [ error, setError ] = useState( "" )
  const [ loading, setLoading ] = useState( false )
  const [ passkeyLoading, setPasskeyLoading ] = useState( false )

  const handleChange = ( e ) => {
    setForm( { ...form, [ e.target.name ]: e.target.value } )
    setError( "" )
  }

  // Normal email/password login
  const handleSubmit = async ( e ) => {
    e.preventDefault()
    if ( !form.email.trim() || !form.password.trim() ) {
      return setError( "Email and password are required" )
    }
    setLoading( true )
    try {
      const res = await API.post( "/auth/login", {
        email: form.email.trim().toLowerCase(),
        password: form.password.trim(),
      } )

      const data = res.data.data

      // If 2FA is required
      if ( data.twoFactorRequired ) {
        navigate( "/2fa-login", { state: { userId: data.userId } } )
        return
      }

      // Normal login success
      login( data.user, data.accessToken )
      navigate( "/profile" )
    } catch ( err ) {
      setError( err.response?.data?.message || "Login failed" )
    } finally {
      setLoading( false )
    }
  }

  // Passkey login
  const handlePasskeyLogin = async () => {
    if ( !form.email.trim() ) return setError( "Enter your email first for passkey login" )
    setPasskeyLoading( true )
    try {
      // Step 1: Get options
      const startRes = await API.post( "/auth/passkey/login/start", {
        email: form.email.trim().toLowerCase(),
      } )
      const options = startRes.data.data.options

      // Step 2: Browser WebAuthn
      const { startAuthentication } = await import( "@simplewebauthn/browser" )
      const credential = await startAuthentication( options )

      // Step 3: Verify
      const verifyRes = await API.post( "/auth/passkey/login/verify", {
        email: form.email.trim().toLowerCase(),
        credential,
      } )

      const data = verifyRes.data.data
      login( data.user, null )
      navigate( "/profile" )
    } catch ( err ) {
      setError( err.response?.data?.message || err.message || "Passkey login failed" )
    } finally {
      setPasskeyLoading( false )
    }
  }

  return (
    <div style={ styles.container }>
      <div style={ styles.card }>
        <h2 style={ styles.title }>Welcome Back</h2>
        <p style={ styles.subtitle }>Sign in to CodeArena</p>

        { error && <div style={ styles.error }>{ error }</div> }

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
              required
            />
          </div>

          <div style={ styles.field }>
            <label style={ styles.label }>Password</label>
            <input
              name="password"
              type="password"
              value={ form.password }
              onChange={ handleChange }
              placeholder="Your password"
              style={ styles.input }
              required
            />
          </div>

          <div style={ styles.forgotRow }>
            <Link to="/forgot-password" style={ styles.forgotLink }>
              Forgot Password?
            </Link>
          </div>

          <button type="submit" disabled={ loading } style={ styles.btn }>
            { loading ? "Signing In..." : "Sign In" }
          </button>
        </form>

        <div style={ styles.divider }>
          <span style={ styles.dividerLine } />
          <span style={ styles.dividerText }>OR</span>
          <span style={ styles.dividerLine } />
        </div>

        <button
          onClick={ handlePasskeyLogin }
          disabled={ passkeyLoading }
          style={ styles.passkeyBtn }
        >
          { passkeyLoading ? "Authenticating..." : "🔑 Sign in with Passkey" }
        </button>

        <p style={ styles.link }>
          Don't have an account?{ " " }
          <Link to="/signup" style={ styles.linkText }>Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#0f0f0f",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    background: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: 12,
    padding: "40px 36px",
    width: "100%",
    maxWidth: 420,
  },
  title: { color: "#fff", margin: 0, fontSize: 26, fontWeight: 700 },
  subtitle: { color: "#888", margin: "6px 0 24px", fontSize: 14 },
  error: {
    background: "#2d1b1b",
    border: "1px solid #c0392b",
    color: "#e74c3c",
    padding: "10px 14px",
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 13,
  },
  field: { marginBottom: 16 },
  label: { display: "block", color: "#aaa", fontSize: 13, marginBottom: 6 },
  input: {
    width: "100%", boxSizing: "border-box",
    background: "#111", border: "1px solid #333",
    borderRadius: 8, padding: "10px 12px",
    color: "#fff", fontSize: 14, outline: "none",
  },
  forgotRow: { textAlign: "right", marginBottom: 16 },
  forgotLink: { color: "#4ade80", fontSize: 13, textDecoration: "none" },
  btn: {
    width: "100%", padding: "12px",
    background: "#4ade80", color: "#000",
    border: "none", borderRadius: 8,
    fontSize: 15, fontWeight: 700, cursor: "pointer",
  },
  divider: {
    display: "flex", alignItems: "center",
    margin: "20px 0", gap: 10,
  },
  dividerLine: { flex: 1, height: 1, background: "#2a2a2a" },
  dividerText: { color: "#555", fontSize: 12 },
  passkeyBtn: {
    width: "100%", padding: "11px",
    background: "transparent",
    border: "1px solid #333",
    borderRadius: 8, color: "#ccc",
    fontSize: 14, cursor: "pointer",
  },
  link: { textAlign: "center", color: "#888", fontSize: 13, marginTop: 20 },
  linkText: { color: "#4ade80", textDecoration: "none", fontWeight: 600 },
}

export default Login