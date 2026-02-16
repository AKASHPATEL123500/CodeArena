import { useState, useRef, useCallback } from "react"
import { useNavigate, Link } from "react-router-dom"
import API from "../utils/api"

const Signup = () => {
  const navigate = useNavigate()
  const fileInputRef = useRef( null )

  const [ form, setForm ] = useState( {
    name: "",
    username: "",
    email: "",
    password: "",
    role: "student",
  } )

  // avatar file alag ref mein bhi rakho — state update se independent
  const avatarFileRef = useRef( null )
  const [ avatarPreview, setAvatarPreview ] = useState( null )
  const [ avatarName, setAvatarName ] = useState( "" )
  const [ error, setError ] = useState( "" )
  const [ success, setSuccess ] = useState( "" )
  const [ loading, setLoading ] = useState( false )

  const handleChange = ( e ) => {
    setForm( { ...form, [ e.target.name ]: e.target.value } )
    setError( "" )
  }

  const handleAvatarChange = useCallback( ( e ) => {
    const files = e.target.files
    if ( !files || files.length === 0 ) return

    const file = files[ 0 ]
    if ( !file ) return

    // File ko ref mein store karo — state se zyada reliable
    avatarFileRef.current = file
    setAvatarName( file.name )

    // Preview ke liye FileReader
    const reader = new FileReader()
    reader.onload = ( event ) => {
      if ( event.target && event.target.result ) {
        setAvatarPreview( event.target.result )
      }
    }
    reader.readAsDataURL( file )
  }, [] )

  const validate = () => {
    const trimName = form.name.trim()
    const trimUsername = form.username.trim()
    if ( trimName.length < 2 || trimName.length > 50 )
      return "Name must be between 2-50 characters"
    if ( trimUsername.length < 5 || trimUsername.length > 20 )
      return "Username must be between 5-20 characters"
    if ( form.password.length < 8 )
      return "Password must be at least 8 characters"
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
    if ( !passwordRegex.test( form.password ) )
      return "Password must contain uppercase, lowercase, number and special character"
    // state nahi — ref check karo
    if ( !avatarFileRef.current ) return "Avatar is required"
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
    // state nahi — ref se file lo
    formData.append( "avatar", avatarFileRef.current )

    setLoading( true )
    try {
      await API.post( "/auth/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      } )
      setSuccess( "Signup successful! Please verify your email." )
      setTimeout(
        () => navigate( "/send-otp?type=verify&email=" + encodeURIComponent( form.email ) ),
        1500
      )
    } catch ( err ) {
      setError( err.response?.data?.message || "Signup failed" )
    } finally {
      setLoading( false )
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-5">
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8 w-full max-w-lg">

        <h2 className="text-white text-2xl font-bold m-0">Create Account</h2>
        <p className="text-[#888] text-sm mt-1 mb-6">Join CodeArena today</p>

        { error && (
          <div className="bg-[#2d1b1b] border border-[#c0392b] text-[#e74c3c] px-4 py-3 rounded-lg mb-4 text-sm">
            { error }
          </div>
        ) }
        { success && (
          <div className="bg-[#1b2d1b] border border-[#27ae60] text-[#2ecc71] px-4 py-3 rounded-lg mb-4 text-sm">
            { success }
          </div>
        ) }

        {/* AVATAR SECTION */ }
        <div className="flex flex-col items-center mb-6 gap-3">

          {/* Preview */ }
          { avatarPreview ? (
            <img
              src={ avatarPreview }
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover border-[3px] border-[#4ade80]"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-[#2a2a2a] border-2 border-dashed border-[#555] flex flex-col items-center justify-center">
              <span className="text-4xl">📷</span>
            </div>
          ) }

          {/* File input - label se directly connected */ }
          <label
            htmlFor="avatarFile"
            className="px-5 py-2.5 bg-[#2a2a2a] border border-[#444] text-[#ccc] text-sm rounded-lg cursor-pointer"
          >
            { avatarName ? "📷 Change Photo" : "📷 Select Photo" }
          </label>

          <input
            ref={ fileInputRef }
            id="avatarFile"
            type="file"
            accept="image/*"
            onChange={ handleAvatarChange }
            style={ {
              position: "fixed",
              top: "-1000px",
              left: "-1000px",
              width: "1px",
              height: "1px",
              opacity: 0,
            } }
          />

          {/* Confirmation */ }
          { avatarName ? (
            <p className="text-[#4ade80] text-xs text-center">✓ { avatarName }</p>
          ) : (
            <p className="text-[#666] text-xs">No photo selected</p>
          ) }
        </div>

        <form onSubmit={ handleSubmit }>
          <div className="flex gap-3">
            <div className="flex-1 mb-4">
              <label className="block text-[#aaa] text-xs mb-1.5">Full Name</label>
              <input
                name="name"
                value={ form.name }
                onChange={ handleChange }
                placeholder="John Doe"
                className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm outline-none"
                required
              />
            </div>
            <div className="flex-1 mb-4">
              <label className="block text-[#aaa] text-xs mb-1.5">Username</label>
              <input
                name="username"
                value={ form.username }
                onChange={ handleChange }
                placeholder="johndoe123"
                className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm outline-none"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-[#aaa] text-xs mb-1.5">Email</label>
            <input
              name="email"
              type="email"
              value={ form.email }
              onChange={ handleChange }
              placeholder="john@example.com"
              className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-[#aaa] text-xs mb-1.5">Password</label>
            <input
              name="password"
              type="password"
              value={ form.password }
              onChange={ handleChange }
              placeholder="Min 8 chars, A-Z, 0-9, @$!%*?&#"
              className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-[#aaa] text-xs mb-1.5">Role</label>
            <select
              name="role"
              value={ form.role }
              onChange={ handleChange }
              className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm outline-none"
            >
              <option value="student">Student</option>
              <option value="startup">Startup</option>
              <option value="mentor">Mentor</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={ loading }
            className="w-full py-3 bg-[#4ade80] text-black font-bold rounded-lg text-sm disabled:opacity-60"
          >
            { loading ? "Creating Account..." : "Sign Up" }
          </button>
        </form>

        <p className="text-center text-[#888] text-sm mt-5">
          Already have an account?{ " " }
          <Link to="/login" className="text-[#4ade80] font-semibold no-underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup