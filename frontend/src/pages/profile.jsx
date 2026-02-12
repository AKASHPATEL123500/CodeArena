import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Calendar, MapPin, Github, Linkedin, Globe, 
  Edit, Camera, Trophy, Zap, Target, Award, TrendingUp, 
  Settings, LogOut, Shield, Crown, Star, Flame, Code,
  Plus, X, CheckCircle, AlertCircle, Loader
} from 'lucide-react';
import axios from 'axios';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [userSkills, setUserSkills] = useState([]);
  const [skillsLoading, setSkillsLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchUserSkills();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:15000/api/v1/user/profile', {
        withCredentials: true
      });
      
      if (response.data.success) {
        setUser(response.data.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      // If unauthorized, redirect to signin
      if (error.response?.status === 401) {
        navigate('/signin');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchUserSkills = async () => {
    setSkillsLoading(true);
    try {
      const response = await axios.get('http://localhost:15000/api/v1/user/skills', {
        withCredentials: true
      });
      
      if (response.data.success) {
        setUserSkills(response.data.data.skills);
      }
    } catch (error) {
      console.error('Failed to fetch skills:', error);
    } finally {
      setSkillsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:15000/api/v1/auth/logout', {}, {
        withCredentials: true
      });
      
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      navigate('/signin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getProficiencyColor = (proficiency) => {
    switch (proficiency) {
      case 'beginner': return { bg: '#3b82f6', light: '#3b82f620' };
      case 'intermediate': return { bg: '#eab308', light: '#eab30820' };
      case 'advanced': return { bg: '#22c55e', light: '#22c55e20' };
      default: return { bg: '#6b7280', light: '#6b728020' };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-400">Failed to load profile</p>
        </div>
      </div>
    );
  }

  const winRate = user.battlesPlayed > 0 ? ((user.battlesWon / user.battlesPlayed) * 100).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-purple-500/20 backdrop-blur-xl bg-black/60">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative group cursor-pointer" onClick={() => navigate('/')}>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition" />
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <Code className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                CODE ARENA
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/skills')}
              className="px-6 py-2.5 bg-purple-600/20 border border-purple-500/50 rounded-lg font-semibold hover:bg-purple-600/30 transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Skills
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-2.5 bg-red-600/20 border border-red-500/50 rounded-lg font-semibold hover:bg-red-600/30 transition flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-12">
        {/* Profile Header Card */}
        <div className="relative mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-400 rounded-3xl blur opacity-75" />
          <div className="relative bg-gradient-to-br from-black/90 via-purple-900/40 to-black/90 backdrop-blur-2xl border border-purple-500/40 rounded-3xl p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Avatar Section */}
              <div className="flex-shrink-0">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl blur opacity-75" />
                  <div className="relative w-48 h-48 rounded-3xl overflow-hidden border-4 border-purple-500/50">
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <Camera className="w-8 h-8 text-white" />
                    </button>
                  </div>
                </div>

                {/* Role Badge */}
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
                    {user.role === 'student' && <Star className="w-4 h-4" />}
                    {user.role === 'mentor' && <Crown className="w-4 h-4" />}
                    {user.role === 'startup' && <Zap className="w-4 h-4" />}
                    <span className="text-sm font-bold uppercase">{user.role}</span>
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      {user.name}
                    </h1>
                    <p className="text-xl text-gray-400">@{user.username}</p>
                  </div>
                  <button
                    onClick={() => setEditMode(!editMode)}
                    className="px-6 py-3 bg-purple-600/20 border border-purple-500/50 rounded-xl font-semibold hover:bg-purple-600/30 transition flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </button>
                </div>

                {/* Bio */}
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {user.bio || "Welcome to CodeArena"}
                </p>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    <span className="text-gray-300">{user.email}</span>
                  </div>
                  {user.location?.city && (
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-pink-400" />
                      <span className="text-gray-300">{user.location.city}, {user.location.country}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    <span className="text-gray-300">Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Level: {user.experienceLevel}</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4">
                  {user.githubUsername && (
                    <a
                      href={`https://github.com/${user.githubUsername}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition flex items-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                  {user.linkedinUrl && (
                    <a
                      href={user.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition flex items-center gap-2"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                  )}
                  {user.portfolioUrl && (
                    <a
                      href={user.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition flex items-center gap-2"
                    >
                      <Globe className="w-4 h-4" />
                      Portfolio
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Rating', value: user.rating, icon: <Trophy />, color: '#eab308', change: '+12' },
            { label: 'Battles Won', value: user.battlesWon, icon: <Target />, color: '#22c55e', change: '+8' },
            { label: 'Win Rate', value: `${winRate}%`, icon: <TrendingUp />, color: '#06ffa5', change: '+5%' },
            { label: 'Current Streak', value: user.currentStreak, icon: <Flame />, color: '#ff006e', change: '+3' }
          ].map((stat, i) => (
            <div key={i} className="relative group">
              <div className="absolute -inset-0.5 rounded-2xl blur opacity-50 group-hover:opacity-75 transition" style={{ background: stat.color }} />
              <div className="relative bg-gradient-to-br from-black/80 to-purple-900/40 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}20`, border: `2px solid ${stat.color}40` }}>
                    {React.cloneElement(stat.icon, { className: "w-6 h-6", style: { color: stat.color } })}
                  </div>
                  <span className="text-xs text-green-400 font-bold">{stat.change}</span>
                </div>
                <div className="text-3xl font-black mb-1" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 uppercase">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-50" />
          <div className="relative bg-gradient-to-br from-black/90 via-purple-900/40 to-black/90 backdrop-blur-2xl border border-purple-500/40 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-purple-400" />
                <h2 className="text-3xl font-black">My Skills</h2>
                <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-sm font-bold">
                  {userSkills.length}
                </span>
              </div>
              <button
                onClick={() => navigate('/skills')}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:scale-105 transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add More Skills
              </button>
            </div>

            {skillsLoading ? (
              <div className="text-center py-12">
                <Loader className="w-8 h-8 text-purple-500 animate-spin mx-auto mb-4" />
                <p className="text-gray-400">Loading skills...</p>
              </div>
            ) : userSkills.length === 0 ? (
              <div className="text-center py-12">
                <Code className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-4">No skills added yet</p>
                <button
                  onClick={() => navigate('/skills')}
                  className="px-6 py-3 bg-purple-600/20 border border-purple-500/50 rounded-xl font-semibold hover:bg-purple-600/30 transition"
                >
                  Add Your First Skill
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userSkills.map((userSkill) => {
                  const colors = getProficiencyColor(userSkill.proficiency);
                  return (
                    <div key={userSkill._id} className="group relative">
                      <div className="absolute -inset-0.5 rounded-xl blur opacity-0 group-hover:opacity-50 transition" style={{ background: colors.bg }} />
                      <div className="relative bg-black/60 border border-purple-500/30 rounded-xl p-4 hover:border-purple-500/50 transition">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {userSkill.skill?.icon && (
                              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-2xl" style={{ background: colors.light }}>
                                {userSkill.skill.icon}
                              </div>
                            )}
                            <div>
                              <h3 className="font-bold text-white">{userSkill.skill?.name}</h3>
                              <p className="text-xs text-gray-400">{userSkill.skill?.category}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: colors.light, color: colors.bg }}>
                            {userSkill.proficiency}
                          </div>
                          <span className="text-xs text-gray-500">
                            Added {new Date(userSkill.addedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}