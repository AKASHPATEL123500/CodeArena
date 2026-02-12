import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Filter, Code, TrendingUp, Plus, Check, X, 
  Loader, AlertCircle, ChevronLeft, Star, Users, Zap,
  Brain, Shield, Target, Trophy, Flame
} from 'lucide-react';
import axios from 'axios';

export default function Skills() {
  const navigate = useNavigate();
  const [allSkills, setAllSkills] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedProficiency, setSelectedProficiency] = useState('beginner');
  const [adding, setAdding] = useState(false);

  const categories = [
    'all', 'programming', 'web', 'mobile', 'design', 
    'database', 'devops', 'cloud', 'ai-ml', 'other'
  ];

  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];
  const proficiencies = ['beginner', 'intermediate', 'advanced'];

  useEffect(() => {
    fetchAllSkills();
    fetchUserSkills();
  }, []);

  const fetchAllSkills = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:15000/api/v1/skill/', {
        params: {
          category: selectedCategory !== 'all' ? selectedCategory : undefined,
          difficulty: selectedDifficulty !== 'all' ? selectedDifficulty : undefined
        }
      });
      
      if (response.data.success) {
        setAllSkills(response.data.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserSkills = async () => {
    try {
      const response = await axios.get('http://localhost:15000/api/v1/user/skills', {
        withCredentials: true
      });
      
      if (response.data.success) {
        setUserSkills(response.data.data.skills);
      }
    } catch (error) {
      console.error('Failed to fetch user skills:', error);
    }
  };

  useEffect(() => {
    fetchAllSkills();
  }, [selectedCategory, selectedDifficulty]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchAllSkills();
      return;
    }

    try {
      const response = await axios.get('http://localhost:15000/api/v1/skill/search', {
        params: { q: searchTerm }
      });
      
      if (response.data.success) {
        setAllSkills(response.data.data.skills);
      }
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const isSkillAdded = (skillId) => {
    return userSkills.some(us => us.skill._id === skillId);
  };

  const toggleSkillSelection = (skillId) => {
    if (isSkillAdded(skillId)) {
      return; // Already added, can't select
    }

    setSelectedSkills(prev => 
      prev.includes(skillId) 
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  const handleAddSkills = async () => {
    if (selectedSkills.length === 0) {
      alert('Please select at least one skill');
      return;
    }

    setAdding(true);

    try {
      const response = await axios.post(
        'http://localhost:15000/api/v1/user/skills',
        {
          skillIds: selectedSkills,
          proficiency: selectedProficiency
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        alert(`Successfully added ${selectedSkills.length} skill(s)!`);
        setSelectedSkills([]);
        fetchUserSkills();
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to add skills';
      alert(errorMessage);
    } finally {
      setAdding(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return { bg: '#3b82f6', light: '#3b82f620' };
      case 'intermediate': return { bg: '#eab308', light: '#eab30820' };
      case 'advanced': return { bg: '#22c55e', light: '#22c55e20' };
      default: return { bg: '#6b7280', light: '#6b728020' };
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      programming: '💻',
      web: '🌐',
      mobile: '📱',
      design: '🎨',
      database: '🗄️',
      devops: '⚙️',
      cloud: '☁️',
      'ai-ml': '🤖',
      other: '📦'
    };
    return icons[category] || '📦';
  };

  const filteredSkills = allSkills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

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
            <button
              onClick={() => navigate('/profile')}
              className="w-10 h-10 rounded-lg bg-purple-600/20 border border-purple-500/50 flex items-center justify-center hover:bg-purple-600/30 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Browse Skills
              </h1>
              <p className="text-sm text-gray-400">Discover and add new skills to your profile</p>
            </div>
          </div>

          {selectedSkills.length > 0 && (
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-lg">
                <span className="font-bold">{selectedSkills.length} selected</span>
              </div>
              <select
                value={selectedProficiency}
                onChange={(e) => setSelectedProficiency(e.target.value)}
                className="px-4 py-2 bg-black/60 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500/60"
              >
                {proficiencies.map(prof => (
                  <option key={prof} value={prof} className="bg-black">
                    {prof.charAt(0).toUpperCase() + prof.slice(1)}
                  </option>
                ))}
              </select>
              <button
                onClick={handleAddSkills}
                disabled={adding}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold hover:scale-105 transition flex items-center gap-2"
              >
                {adding ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Add Skills
                  </>
                )}
              </button>
            </div>
          )}
        </nav>
      </header>

      <main className="relative z-10 container mx-auto px-6 py-8">
        {/* Search & Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-2xl blur opacity-50 group-focus-within:opacity-75 transition" />
            <div className="relative flex items-center bg-black/80 border border-purple-500/30 rounded-2xl overflow-hidden">
              <Search className="w-5 h-5 text-gray-400 ml-6" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search skills (e.g., React, Python, TypeScript)..."
                className="flex-1 px-4 py-4 bg-transparent text-white placeholder-gray-500 focus:outline-none"
              />
              <button
                onClick={handleSearch}
                className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 font-bold hover:from-purple-700 hover:to-pink-700 transition"
              >
                Search
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                      selectedCategory === cat
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'bg-purple-600/20 border border-purple-500/50 text-gray-300 hover:bg-purple-600/30'
                    }`}
                  >
                    {cat === 'all' ? '🌟' : getCategoryIcon(cat)} {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Difficulty</label>
              <div className="flex flex-wrap gap-2">
                {difficulties.map(diff => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-6 py-2 rounded-lg font-semibold text-sm transition ${
                      selectedDifficulty === diff
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                        : 'bg-cyan-600/20 border border-cyan-500/50 text-gray-300 hover:bg-cyan-600/30'
                    }`}
                  >
                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Code className="w-8 h-8 text-purple-400" />
              <div>
                <div className="text-2xl font-black text-white">{allSkills.length}</div>
                <div className="text-xs text-gray-400">Total Skills</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Check className="w-8 h-8 text-cyan-400" />
              <div>
                <div className="text-2xl font-black text-white">{userSkills.length}</div>
                <div className="text-xs text-gray-400">Your Skills</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-green-400" />
              <div>
                <div className="text-2xl font-black text-white">{selectedSkills.length}</div>
                <div className="text-xs text-gray-400">Selected</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-orange-400" />
              <div>
                <div className="text-2xl font-black text-white">{filteredSkills.length}</div>
                <div className="text-xs text-gray-400">Filtered</div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        {loading ? (
          <div className="text-center py-20">
            <Loader className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading skills...</p>
          </div>
        ) : filteredSkills.length === 0 ? (
          <div className="text-center py-20">
            <AlertCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No skills found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredSkills.map((skill) => {
              const isAdded = isSkillAdded(skill._id);
              const isSelected = selectedSkills.includes(skill._id);
              const colors = getDifficultyColor(skill.difficulty);

              return (
                <div
                  key={skill._id}
                  onClick={() => toggleSkillSelection(skill._id)}
                  className={`group relative cursor-pointer ${isAdded ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className={`absolute -inset-0.5 rounded-xl blur transition ${
                    isSelected ? 'opacity-75 bg-gradient-to-r from-purple-600 to-pink-600' : 'opacity-0 group-hover:opacity-50'
                  }`} style={{ background: isSelected ? undefined : colors.bg }} />
                  
                  <div className={`relative bg-black/80 border rounded-xl p-5 transition ${
                    isSelected 
                      ? 'border-purple-500 bg-purple-500/10'
                      : isAdded
                      ? 'border-gray-700'
                      : 'border-purple-500/30 hover:border-purple-500/50'
                  }`}>
                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                    
                    {isAdded && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}

                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-4" style={{ background: colors.light }}>
                      {skill.icon || getCategoryIcon(skill.category)}
                    </div>

                    {/* Name */}
                    <h3 className="font-black text-lg mb-2 text-white">{skill.name}</h3>

                    {/* Description */}
                    {skill.description && (
                      <p className="text-xs text-gray-400 mb-4 line-clamp-2">{skill.description}</p>
                    )}

                    {/* Meta Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="px-2 py-1 rounded text-xs font-bold" style={{ background: colors.light, color: colors.bg }}>
                          {skill.difficulty}
                        </div>
                        <div className="px-2 py-1 bg-purple-500/20 rounded text-xs font-bold text-purple-400">
                          {skill.category}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Users className="w-3 h-3" />
                        {skill.totalUsers}
                      </div>
                    </div>

                    {isAdded && (
                      <div className="mt-3 pt-3 border-t border-gray-700">
                        <p className="text-xs text-green-400 font-semibold">✓ Already added</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}