import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import API from "../utils/api"

const Signup = () => {
  const navigate = useNavigate()
  const [ form, setForm ] = useState( {
    name: "",
    username: "",
    email: "",
    password: "",
    role: "student",
  } )
  const [ avatar, setAvatar ] = useState( null )
  const [ avatarPreview, setAvatarPreview ] = useState( null )
  const [ error, setError ] = useState( "" )
  const [ success, setSuccess ] = useState( "" )
  const [ loading, setLoading ] = useState( false )

  const handleChange = ( e ) => {
    setForm( { ...form, [ e.target.name ]: e.target.value } )
    setError( "" )
  }

  const handleAvatarChange = ( e ) => {
    const file = e.target.files[ 0 ]
    if ( file ) {
      setAvatar( file )
      setAvatarPreview( URL.createObjectURL( file ) )
    }
  }

  const validate = () => {
    const trimName = form.name.trim()
    const trimUsername = form.username.trim()

    if ( trimName.length < 2 || trimName.length > 50 )
      return "Name must be between 2-50 characters"
    if ( trimUsername.length < 5 || trimUsername.length > 20 )
      return "Username must be between 5-20 characters"
    if ( form.password.length < 8 )
      return "Password must be at least 8 characters"

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
    if ( !passwordRegex.test( form.password ) )
      return "Password must contain uppercase, lowercase, number and special character"
    if ( !avatar ) return "Avatar is required"
    return null
  }

  const handleSubmit = async ( e ) => {
    e.preventDefault()
    const err = validate()
    if ( err ) return setError( err )

    const formData = new FormData()
    formData.append( "name", form.name )
    formData.append( "username", form.username )
    formData.append( "email", form.email )
    formData.append( "password", form.password )
    formData.append( "role", form.role )
    formData.append( "avatar", avatar )

    setLoading( true )
    try {
      await API.post( "/auth/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      } )
      setSuccess( "Signup successful! Please verify your email." )
      setTimeout( () => navigate( "/send-otp?type=verify&email=" + encodeURIComponent( form.email ) ), 1500 )
    } catch ( err ) {
      setError( err.response?.data?.message || "Signup failed" )
    } finally {
      setLoading( false )
    }
  }

  return (
    <div style={ styles.container }>
      <div style={ styles.card }>
        <h2 style={ styles.title }>Create Account</h2>
        <p style={ styles.subtitle }>Join CodeArena today</p>

        { error && <div style={ styles.error }>{ error }</div> }
        { success && <div style={ styles.success }>{ success }</div> }

        {/* Avatar Preview */ }
        <div style={ styles.avatarSection }>
          <label htmlFor="avatar" style={ styles.avatarLabel }>
            { avatarPreview ? (
              <img src={ avatarPreview } alt="Avatar" style={ styles.avatarImg } />
            ) : (
              <div style={ styles.avatarPlaceholder }>
                <span style={ { fontSize: 32 } }>📷</span>
                <p style={ { margin: "4px 0 0", fontSize: 12, color: "#888" } }>Upload Avatar</p>
              </div>
            ) }
          </label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={ handleAvatarChange }
            style={ { display: "none" } }
          />
        </div>

        <form onSubmit={ handleSubmit }>
          <div style={ styles.row }>
            <div style={ styles.field }>
              <label style={ styles.label }>Full Name</label>
              <input
                name="name"
                value={ form.name }
                onChange={ handleChange }
                placeholder="John Doe"
                style={ styles.input }
                required
              />
            </div>
            <div style={ styles.field }>
              <label style={ styles.label }>Username</label>
              <input
                name="username"
                value={ form.username }
                onChange={ handleChange }
                placeholder="johndoe123"
                style={ styles.input }
                required
              />
            </div>
          </div>

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
              placeholder="Min 8 chars, A-Z, 0-9, @$!%*?&#"
              style={ styles.input }
              required
            />
          </div>

          <div style={ styles.field }>
            <label style={ styles.label }>Role</label>
            <select
              name="role"
              value={ form.role }
              onChange={ handleChange }
              style={ styles.input }
            >
              <option value="student">Student</option>
              <option value="startup">Startup</option>
              <option value="mentor">Mentor</option>
            </select>
          </div>

          <button type="submit" disabled={ loading } style={ styles.btn }>
            { loading ? "Creating Account..." : "Sign Up" }
          </button>
        </form>

        <p style={ styles.link }>
          Already have an account?{ " " }
          <Link to="/login" style={ styles.linkText }>Sign In</Link>
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
    maxWidth: 480,
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
  success: {
    background: "#1b2d1b",
    border: "1px solid #27ae60",
    color: "#2ecc71",
    padding: "10px 14px",
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 13,
  },
  avatarSection: { display: "flex", justifyContent: "center", marginBottom: 24 },
  avatarLabel: { cursor: "pointer" },
  avatarImg: {
    width: 80, height: 80, borderRadius: "50%",
    objectFit: "cover", border: "3px solid #4ade80",
  },
  avatarPlaceholder: {
    width: 80, height: 80, borderRadius: "50%",
    background: "#2a2a2a", border: "2px dashed #444",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
  },
  row: { display: "flex", gap: 12 },
  field: { flex: 1, marginBottom: 16 },
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
    fontSize: 15, fontWeight: 700,
    cursor: "pointer", marginTop: 8,
  },
  link: { textAlign: "center", color: "#888", fontSize: 13, marginTop: 20 },
  linkText: { color: "#4ade80", textDecoration: "none", fontWeight: 600 },
}

export default Signup