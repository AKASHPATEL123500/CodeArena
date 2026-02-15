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
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
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
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-5 font-sans">
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

        {/* Avatar Upload
            KEY FIX: input ko display:none mat karo
            Instead: absolute position + opacity-0 + inset-0
            Ye mobile pe bhi perfectly kaam karta hai
            Input poore circle pe overlay hai — touch anywhere = file picker opens
        */}
        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-24 rounded-full cursor-pointer">

            {/* Visual layer — jo user dekhta hai */ }
            { avatarPreview ? (
              <img
                src={ avatarPreview }
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover border-[3px] border-[#4ade80]"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-[#2a2a2a] border-2 border-dashed border-[#555] flex flex-col items-center justify-center">
                <span className="text-3xl">📷</span>
                <p className="text-[#888] text-xs mt-1">Tap to Upload</p>
              </div>
            ) }

            {/* Change label — image select hone ke baad dikhao */ }
            { avatarPreview && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] text-center py-1 rounded-b-full">
                Change
              </div>
            ) }

            {/* 
              ACTUAL INPUT — opacity 0 but fully covering the circle
              Mobile pe ye sahi tarika hai file picker trigger karne ka
              display:none ya visibility:hidden use mat karo — mobile block karta hai
            */}
            <input
              type="file"
              accept="image/*"
              onChange={ handleAvatarChange }
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 rounded-full"
            />
          </div>
        </div>

        <form onSubmit={ handleSubmit }>
          {/* Name + Username row */ }
          <div className="flex gap-3 mb-0">
            <div className="flex-1 mb-4">
              <label className="block text-[#aaa] text-xs mb-1.5">Full Name</label>
              <input
                name="name"
                value={ form.name }
                onChange={ handleChange }
                placeholder="John Doe"
                className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-[#4ade80]"
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
                className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-[#4ade80]"
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
              className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-[#4ade80]"
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
              className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-[#4ade80]"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block text-[#aaa] text-xs mb-1.5">Role</label>
            <select
              name="role"
              value={ form.role }
              onChange={ handleChange }
              className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-[#4ade80]"
            >
              <option value="student">Student</option>
              <option value="startup">Startup</option>
              <option value="mentor">Mentor</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={ loading }
            className="w-full py-3 bg-[#4ade80] text-black font-bold rounded-lg text-sm cursor-pointer disabled:opacity-60"
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