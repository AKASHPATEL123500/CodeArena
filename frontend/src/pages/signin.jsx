import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sword, Mail, Lock, Eye, EyeOff, Zap, XCircle, LogIn, Sparkles } from 'lucide-react';
import axios from 'axios';

export default function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.password.trim().length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:15000/api/v1/auth/login', {
        email: formData.email.trim(),
        password: formData.password.trim()
      }, {
        withCredentials: true // Important for cookies
      });

      if (response.data.success) {
        // Store access token if needed
        if (rememberMe) {
          localStorage.setItem('accessToken', response.data.data.accessToken);
        }
        
        // Store user data
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        
        // Navigate to profile or dashboard
        navigate('/profile');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Sign in failed. Please try again.';
      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="absolute" 
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`, 
              animation: `float-3d ${15 + Math.random() * 20}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            <div 
              className="w-1 h-1 rounded-full blur-sm" 
              style={{ 
                background: ['#06ffa5', '#8338ec', '#ff006e', '#3a86ff'][Math.floor(Math.random() * 4)],
                boxShadow: `0 0 ${10 + Math.random() * 15}px currentColor`,
                opacity: 0.4
              }} 
            />
          </div>
        ))}
      </div>

      {/* Sign In Card */}
      <div className="relative w-full max-w-md">
        <div className="absolute -inset-1 bg-linear-to-r from-cyan-600 via-blue-600 to-purple-600 rounded-3xl blur opacity-75" />
        
        <div className="relative bg-linear-to-br from-black/90 via-blue-900/40 to-black/90 backdrop-blur-2xl border border-blue-500/40 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4">
              <div className="absolute -inset-2 bg-linear-to-r from-cyan-500 to-blue-600 rounded-2xl blur" />
              <div className="relative w-16 h-16 rounded-2xl bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-xl">
                <LogIn className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-black mb-2">
              <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Welcome Back
              </span>
            </h1>
            <p className="text-gray-400 text-sm">Enter the arena, warrior</p>
          </div>

          {/* General Error */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center gap-3">
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-400">{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-0 group-focus-within:opacity-30 transition" />
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full pl-12 pr-4 py-3 bg-black/60 border border-blue-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 transition"
                  />
                </div>
              </div>
              {errors.email && (
                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <XCircle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl blur opacity-0 group-focus-within:opacity-30 transition" />
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 w-5 h-5 text-gray-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3 bg-black/60 border border-blue-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-gray-500 hover:text-blue-400 transition"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              {errors.password && (
                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <XCircle className="w-3 h-3" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-2 border-blue-500/50 bg-black/60 checked:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition cursor-pointer"
                />
                <span className="text-sm text-gray-400 group-hover:text-blue-400 transition">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-400 hover:text-blue-300 font-semibold transition">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition" />
              <div className="relative px-6 py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-xl font-black text-lg flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Sign In
                  </>
                )}
              </div>
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
            <span className="text-xs text-gray-500 uppercase">Or</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          </div>

          {/* Social Login (Optional - for future) */}
          <div className="space-y-3">
            <button className="w-full px-6 py-3 bg-white/5 border border-blue-500/30 rounded-xl font-semibold text-sm hover:bg-white/10 transition flex items-center justify-center gap-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Continue with GitHub
            </button>
            <button className="w-full px-6 py-3 bg-white/5 border border-blue-500/30 rounded-xl font-semibold text-sm hover:bg-white/10 transition flex items-center justify-center gap-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-bold transition">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-3d {
          0%, 100% { 
            transform: translate3d(0, 0, 0); 
            opacity: 0.2; 
          }
          50% { 
            transform: translate3d(0, -20px, 0); 
            opacity: 0.5; 
          }
        }
      `}</style>
    </div>
  );
}