// src/pages/SignUp.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sword, User, Mail, Lock, Upload, Eye, EyeOff, Sparkles, CheckCircle, XCircle, Zap } from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://localhost:15000/api/v1';

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    role: 'student',
    avatar: null
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[@$!%*?&#]/.test(password)) strength++;
    return strength;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, avatar: 'File size must be less than 5MB' }));
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, avatar: 'File must be an image' }));
        return;
      }

      setFormData(prev => ({ ...prev, avatar: file }));
      setAvatarPreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, avatar: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    if (formData.name.trim().length > 50) {
      newErrors.name = 'Name cannot exceed 50 characters';
    }

    if (formData.username.trim().length < 5) {
      newErrors.username = 'Username must be at least 5 characters';
    }
    if (formData.username.trim().length > 20) {
      newErrors.username = 'Username cannot exceed 20 characters';
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, number and special character';
    }

    if (!formData.avatar) {
      newErrors.avatar = 'Avatar is required';
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
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name.trim());
      formDataToSend.append('username', formData.username.trim());
      formDataToSend.append('email', formData.email.trim());
      formDataToSend.append('password', formData.password);
      formDataToSend.append('role', formData.role);
      formDataToSend.append('avatar', formData.avatar);

      const response = await axios.post(`${API_URL}/auth/signup`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        alert('Sign up successful! Please login.');
        navigate('/signin');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Sign up failed. Please try again.';
      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const passwordStrengthColors = ['#dc2626', '#f59e0b', '#eab308', '#84cc16', '#22c55e'];
  const passwordStrengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
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

      {/* Sign Up Card */}
      <div className="relative w-full max-w-md">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-400 rounded-3xl blur opacity-75" />
        
        <div className="relative bg-gradient-to-br from-black/90 via-purple-900/40 to-black/90 backdrop-blur-2xl border border-purple-500/40 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4">
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur" />
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-xl">
                <Sword className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-black mb-2">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Join The Arena
              </span>
            </h1>
            <p className="text-gray-400 text-sm">Create your warrior account</p>
          </div>

          {/* General Error */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center gap-3">
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-400">{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Avatar Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">Profile Avatar *</label>
              <div className="flex items-center gap-6">
                <div className="relative group cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <label htmlFor="avatar-upload" className="cursor-pointer">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-0 group-hover:opacity-75 transition" />
                    <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-2 border-purple-500/50 flex items-center justify-center overflow-hidden">
                      {avatarPreview ? (
                        <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <Upload className="w-8 h-8 text-purple-400" />
                      )}
                    </div>
                  </label>
                </div>
                <div className="flex-1">
                  <label htmlFor="avatar-upload" className="cursor-pointer inline-block px-4 py-2 bg-purple-600/20 border border-purple-500/50 rounded-lg text-sm font-semibold hover:bg-purple-600/30 transition">
                    Choose File
                  </label>
                  <p className="text-xs text-gray-500 mt-2">Max 5MB • JPG, PNG, GIF</p>
                  {errors.avatar && (
                    <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <XCircle className="w-3 h-3" />
                      {errors.avatar}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name *</label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-0 group-focus-within:opacity-30 transition" />
                <div className="relative flex items-center">
                  <User className="absolute left-4 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full pl-12 pr-4 py-3 bg-black/60 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition"
                  />
                </div>
              </div>
              {errors.name && (
                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <XCircle className="w-3 h-3" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Username *</label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl blur opacity-0 group-focus-within:opacity-30 transition" />
                <div className="relative flex items-center">
                  <Sparkles className="absolute left-4 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Choose a unique username"
                    className="w-full pl-12 pr-4 py-3 bg-black/60 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition"
                  />
                </div>
              </div>
              {errors.username && (
                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <XCircle className="w-3 h-3" />
                  {errors.username}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address *</label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl blur opacity-0 group-focus-within:opacity-30 transition" />
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full pl-12 pr-4 py-3 bg-black/60 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition"
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
              <label className="block text-sm font-semibold text-gray-300 mb-2">Password *</label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl blur opacity-0 group-focus-within:opacity-30 transition" />
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 w-5 h-5 text-gray-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a strong password"
                    className="w-full pl-12 pr-12 py-3 bg-black/60 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-gray-500 hover:text-purple-400 transition"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              {/* Password Strength */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="h-1 flex-1 rounded-full transition-all"
                        style={{
                          background: i < passwordStrength ? passwordStrengthColors[passwordStrength - 1] : '#374151'
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs" style={{ color: passwordStrengthColors[passwordStrength - 1] }}>
                    {passwordStrengthLabels[passwordStrength - 1] || 'Too Weak'}
                  </p>
                </div>
              )}
              
              {errors.password && (
                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <XCircle className="w-3 h-3" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">I am a *</label>
              <div className="grid grid-cols-3 gap-3">
                {['student', 'startup', 'mentor'].map((role) => (
                  <label
                    key={role}
                    className={`relative cursor-pointer group ${formData.role === role ? 'ring-2 ring-purple-500' : ''}`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role}
                      checked={formData.role === role}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <div className={`p-3 rounded-xl border-2 text-center transition ${
                      formData.role === role
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-purple-500/30 bg-black/60 hover:border-purple-500/50'
                    }`}>
                      <div className="text-sm font-bold capitalize">{role}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 rounded-xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition" />
              <div className="relative px-6 py-4 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 rounded-xl font-black text-lg flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Create Account
                  </>
                )}
              </div>
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <Link to="/signin" className="text-purple-400 hover:text-purple-300 font-bold transition">
                Sign In
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