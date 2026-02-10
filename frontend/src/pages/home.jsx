import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Zap, Users, Trophy, Code, Brain, Sword, Shield, Target, Rocket, Crown, Star, 
         Cpu, Activity, TrendingUp, Database, CheckCircle, Play, ChevronRight, Github, 
         Twitter, Linkedin, Mail, Bell, Flame, Eye, Volume2, VolumeX, Medal, Award } from 'lucide-react';

export default function CodeArenaImproved() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState(null);
  const [battleCount, setBattleCount] = useState(1247);
  const [emailInput, setEmailInput] = useState('');
  const [isNotifySuccess, setIsNotifySuccess] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [countdown, setCountdown] = useState({ days: 45, hours: 12, minutes: 34, seconds: 22 });
  const [hoveredPricing, setHoveredPricing] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const canvasRef = useRef(null);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23;
              days--;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Optimized mouse tracking (throttled for performance)
  useEffect(() => {
    let rafId;
    const handleMouseMove = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        rafId = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    const battleInterval = setInterval(() => {
      setBattleCount(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 2500);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(battleInterval);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Optimized Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: false });
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    // Reduced particles for better performance
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5
      });
    }

    let animationFrameId;
    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#8338ec';
        ctx.fill();

        // Only draw connections to nearby particles for performance
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(131, 56, 236, ${0.3 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleNotifyMe = (e) => {
    e.preventDefault();
    if (emailInput && emailInput.includes('@')) {
      setIsNotifySuccess(true);
      setTimeout(() => setIsNotifySuccess(false), 3000);
      setEmailInput('');
    }
  };

  const features = [
    { 
      icon: <Sword className="w-10 h-10" />, 
      title: "Real-Time Combat", 
      description: "Compete in lightning-fast coding battles with live leaderboards and instant feedback",
      color: "#ff006e", 
      stats: "2.4M+ battles",
      badge: "LIVE",
      demo: "Watch developers solve algorithms in real-time with live syntax highlighting"
    },
    { 
      icon: <Brain className="w-10 h-10" />, 
      title: "Multi-AI Mentor", 
      description: "GPT-4, Gemini Pro, and Grok provide personalized guidance and code analysis",
      color: "#8338ec", 
      stats: "1.8M hints",
      badge: "AI-POWERED",
      demo: "Get intelligent hints from multiple AI models, each with unique strengths"
    },
    { 
      icon: <Users className="w-10 h-10" />, 
      title: "Team Arenas", 
      description: "Join forces in 2v2, 4v4 battles with voice chat and strategy planning",
      color: "#3a86ff", 
      stats: "52K+ teams",
      badge: "MULTIPLAYER",
      demo: "Coordinate with teammates, share code snippets, win together"
    },
    { 
      icon: <Trophy className="w-10 h-10" />, 
      title: "NFT Achievements", 
      description: "Earn exclusive NFT badges, unlock rare skins, showcase your victories",
      color: "#fb5607", 
      stats: "10K+ NFTs",
      badge: "WEB3",
      demo: "Collect limited edition NFTs for tournament wins and milestones"
    },
    { 
      icon: <Play className="w-10 h-10" />, 
      title: "Live Streaming", 
      description: "Stream your battles in 4K, build your audience, monetize your skills",
      color: "#06ffa5", 
      stats: "800+ streams",
      badge: "CREATOR",
      demo: "Professional streaming tools with overlays and sponsor integration"
    },
    { 
      icon: <Activity className="w-10 h-10" />, 
      title: "Performance Analytics", 
      description: "Deep insights into code efficiency, time complexity, and improvement areas",
      color: "#ffbe0b", 
      stats: "200+ metrics",
      badge: "PRO",
      demo: "Track every metric: solve speed, memory usage, optimization score"
    },
    { 
      icon: <Star className="w-10 h-10" />, 
      title: "25+ Languages", 
      description: "Master Python, Rust, Go, TypeScript, and 20+ more languages",
      color: "#ff006e", 
      stats: "25+ langs",
      badge: "POLYGLOT",
      demo: "Switch between languages mid-battle, auto-translate solutions"
    },
    { 
      icon: <Flame className="w-10 h-10" />, 
      title: "Daily Streaks", 
      description: "Build coding habits with streak rewards, XP bonuses, and exclusive perks",
      color: "#8338ec", 
      stats: "10K+ on fire",
      badge: "ADDICTIVE",
      demo: "Maintain your streak, unlock multipliers, dominate leaderboards"
    },
  ];

  const aiFeatures = [
    { 
      icon: <Brain />, 
      title: "GPT-4 Turbo", 
      description: "OpenAI's most advanced model for complex problem-solving and code generation",
      gradient: "from-purple-600 to-pink-600",
      features: ["Natural language hints", "Code refactoring", "Bug detection"]
    },
    { 
      icon: <Sparkles />, 
      title: "Gemini Pro", 
      description: "Google's multimodal AI for visual code analysis and pattern recognition",
      gradient: "from-cyan-500 to-blue-600",
      features: ["Visual debugging", "Architecture analysis", "Performance optimization"]
    },
    { 
      icon: <Zap />, 
      title: "Grok AI", 
      description: "X.AI's conversational model for real-time coding assistance and learning",
      gradient: "from-orange-500 to-red-600",
      features: ["Real-time suggestions", "Context-aware help", "Interactive learning"]
    },
    { 
      icon: <Activity />, 
      title: "Live Code Analysis", 
      description: "Real-time bug detection and performance optimization across all AI models",
      gradient: "from-green-500 to-emerald-600",
      features: ["Instant feedback", "Complexity analysis", "Security checks"]
    },
    { 
      icon: <TrendingUp />, 
      title: "Smart Learning Paths", 
      description: "AI creates personalized roadmaps based on your weaknesses and goals",
      gradient: "from-violet-500 to-purple-600",
      features: ["Adaptive difficulty", "Progress tracking", "Skill recommendations"]
    },
    { 
      icon: <Database />, 
      title: "Pattern Recognition", 
      description: "AI learns your coding patterns and prevents common mistakes",
      gradient: "from-yellow-500 to-orange-600",
      features: ["Mistake prediction", "Style analysis", "Best practices"]
    },
  ];

  const pricingPlans = [
    {
      name: "Explorer", 
      price: "Free", 
      period: "Forever",
      tagline: "Start your journey",
      features: [
        { text: "10 battles per day", included: true },
        { text: "Basic AI hints", included: true },
        { text: "Community challenges", included: true },
        { text: "Public leaderboards", included: true },
        { text: "Code playback", included: true },
        { text: "Team tournaments", included: false },
        { text: "Advanced analytics", included: false }
      ],
      popular: false, 
      gradient: "from-slate-700 to-slate-900",
      cta: "Start Free"
    },
    {
      name: "Champion", 
      price: "₹499", 
      period: "/month",
      tagline: "Most popular choice",
      features: [
        { text: "Unlimited battles", included: true },
        { text: "GPT-4 + Gemini + Grok AI", included: true },
        { text: "Private arenas", included: true },
        { text: "Team tournaments", included: true },
        { text: "Premium themes", included: true },
        { text: "Priority matching", included: true },
        { text: "Advanced analytics", included: true },
        { text: "1080p streaming", included: true },
        { text: "NFT badges", included: true },
        { text: "Discord role", included: true }
      ],
      popular: true, 
      gradient: "from-purple-600 via-pink-600 to-purple-600",
      cta: "Get Champion",
      savings: "Save 40%"
    },
    {
      name: "Legend", 
      price: "₹1,299", 
      period: "/month",
      tagline: "For elite coders",
      features: [
        { text: "Everything in Champion", included: true },
        { text: "1-on-1 AI mentoring", included: true },
        { text: "Custom tournaments", included: true },
        { text: "White-label platform", included: true },
        { text: "API access", included: true },
        { text: "Dedicated support", included: true },
        { text: "Early features", included: true },
        { text: "Exclusive NFTs", included: true },
        { text: "4K streaming", included: true },
        { text: "Sponsor visibility", included: true }
      ],
      popular: false, 
      gradient: "from-amber-500 via-orange-600 to-red-600",
      cta: "Go Legend",
      badge: "ULTIMATE"
    }
  ];

  const leaderboard = [
    { rank: 1, name: "CodeMaster_X", rating: 3247, wins: 847, avatar: "C", country: "🇮🇳", streak: 45 },
    { rank: 2, name: "AlgoQueen", rating: 3156, wins: 723, avatar: "A", country: "🇺🇸", streak: 38 },
    { rank: 3, name: "PyWarrior", rating: 3089, wins: 691, avatar: "P", country: "🇬🇧", streak: 29 },
    { rank: 4, name: "RustNinja", rating: 2987, wins: 634, avatar: "R", country: "🇨🇦", streak: 25 },
    { rank: 5, name: "JSDevil", rating: 2912, wins: 589, avatar: "J", country: "🇩🇪", streak: 22 },
  ];

  const stats = [
    { label: "Active Battles", value: battleCount.toLocaleString(), icon: <Zap />, color: "#ff006e", change: "+12%" },
    { label: "Global Warriors", value: "52.8K", icon: <Users />, color: "#8338ec", change: "+8%" },
    { label: "Code Challenges", value: "3,200+", icon: <Code />, color: "#3a86ff", change: "+15%" },
    { label: "AI Hints Given", value: "1.8M", icon: <Brain />, color: "#06ffa5", change: "+25%" }
  ];

  const battleDemo = {
    player1: {
      name: "DestroyerX",
      avatar: "D",
      rating: 2847,
      winRate: 98,
      code: [
        "def twoSum(nums, target):",
        "    seen = {}",
        "    for i, num in enumerate(nums):",
        "        complement = target - num",
        "        if complement in seen:",
        "            return [seen[complement], i]",
        "        seen[num] = i"
      ],
      progress: 85
    },
    player2: {
      name: "CodeNinja",
      avatar: "C",
      rating: 2156,
      winRate: 94,
      code: [
        "function twoSum(nums, target) {",
        "    const map = new Map();",
        "    for (let i = 0; i < nums.length; i++) {",
        "        const complement = target - nums[i];",
        "        if (map.has(complement)) {",
        "            return [map.get(complement), i];",
        "        }",
      ],
      progress: 72
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Optimized Canvas Background */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-30 z-0" />

      {/* Dynamic Gradient Background */}
      <div className="fixed inset-0 opacity-40 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 transition-opacity duration-300" 
          style={{ 
            backgroundImage: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(131, 56, 236, 0.15), transparent 50%)` 
          }} 
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
      </div>

      {/* Optimized Floating Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i} 
            className="absolute" 
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`, 
              animation: `float-3d ${15 + Math.random() * 20}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              willChange: 'transform'
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

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-black/60 border-b border-purple-500/20">
        <nav className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300" />
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <Sword className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
            </div>
            <div>
              <span className="text-lg sm:text-2xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                CODE ARENA
              </span>
              <div className="text-xs text-gray-500 font-mono -mt-1">Launching Soon</div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-semibold text-gray-300 hover:text-cyan-400 transition-colors relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#ai" className="text-sm font-semibold text-gray-300 hover:text-purple-400 transition-colors relative group">
              AI Power
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#pricing" className="text-sm font-semibold text-gray-300 hover:text-pink-400 transition-colors relative group">
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-orange-400 group-hover:w-full transition-all duration-300" />
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-purple-500/30 flex items-center justify-center hover:bg-purple-500/10 transition-all"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-xs sm:text-sm font-bold hover:scale-105 transition-all shadow-lg shadow-purple-500/50">
              Join Waitlist
            </button>
          </div>
        </nav>
      </header>

      {/* Improved Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 pt-32 pb-20">
        <div className="relative max-w-7xl mx-auto w-full">
          {/* Launch Status Badge */}
          <div className="flex justify-center mb-8">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full blur opacity-75 group-hover:opacity-100 transition" />
              <div className="relative inline-flex items-center gap-3 sm:gap-4 px-4 sm:px-8 py-3 sm:py-4 bg-black/80 backdrop-blur-xl border border-green-500/40 rounded-full">
                <div className="relative flex items-center gap-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-ping absolute" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-green-400">LAUNCHING SOON</span>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                <span className="text-xs sm:text-sm text-gray-300 font-mono">
                  {countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
                </span>
              </div>
            </div>
          </div>

          {/* Main Hero Title - Interactive */}
          <div className="text-center mb-12">
            <h1 className="text-6xl sm:text-8xl lg:text-[10rem] font-black leading-none mb-6 relative">
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent blur-2xl opacity-50">
                CODE ARENA
              </span>
              <span className="relative bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 inline-block">
                CODE ARENA
              </span>
            </h1>
            
            <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8 flex-wrap">
              <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
              <span className="text-lg sm:text-2xl lg:text-3xl font-light text-purple-400 tracking-[0.3em]">
                BATTLE • EVOLVE • DOMINATE
              </span>
              <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
            </div>
            
            <p className="text-lg sm:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12 px-4">
              The world's first <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-bold">Multi-AI powered</span> competitive coding platform.
              <br />
              Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 font-bold">52,000+ elite developers</span> worldwide.
            </p>

            {/* Feature Pills - Interactive */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {[
                { icon: <Brain className="w-4 h-4 sm:w-5 sm:h-5" />, text: "Multi-AI Powered", gradient: "from-purple-600 to-pink-600" },
                { icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />, text: "52K+ Warriors", gradient: "from-cyan-500 to-blue-600" },
                { icon: <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />, text: "Live Tournaments", gradient: "from-amber-500 to-orange-600" },
                { icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" />, text: "Real-Time Battles", gradient: "from-green-500 to-emerald-600" },
                { icon: <Star className="w-4 h-4 sm:w-5 sm:h-5" />, text: "25+ Languages", gradient: "from-pink-500 to-red-600" }
              ].map((pill, i) => (
                <div 
                  key={i} 
                  className="group relative cursor-pointer"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 rounded-full blur transition duration-300" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }} />
                  <div className={`relative flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-black rounded-full text-xs sm:text-sm font-bold border border-purple-500/30 group-hover:scale-105 transition-transform`}>
                    {pill.icon}
                    <span>{pill.text}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Email Signup - Improved */}
            <div className="max-w-xl mx-auto mb-12 px-4">
              <form onSubmit={handleNotifyMe} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition" />
                <div className="relative flex flex-col sm:flex-row gap-2 sm:gap-3 bg-black border border-purple-500/30 rounded-2xl p-2">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email to get early access"
                    className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-transparent text-white placeholder-gray-500 focus:outline-none text-base sm:text-lg"
                    required
                  />
                  <button 
                    type="submit"
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-black text-base sm:text-lg hover:scale-105 transition-all shadow-lg shadow-purple-500/50 flex items-center justify-center gap-2"
                  >
                    <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                    Notify Me
                  </button>
                </div>
              </form>
              {isNotifySuccess && (
                <div className="mt-4 px-6 py-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center font-semibold text-sm sm:text-base">
                  🎉 You're on the list! We'll notify you on launch day.
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 px-4">
              <button 
                onClick={() => setShowVideo(true)}
                className="group relative px-8 sm:px-10 py-4 sm:py-5 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 rounded-xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 rounded-xl blur-xl opacity-75 group-hover:opacity-100 transition" />
                <span className="relative flex items-center justify-center gap-3 font-black text-lg sm:text-xl text-white">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6" />
                  Watch Demo
                </span>
              </button>
              <button className="px-8 sm:px-10 py-4 sm:py-5 bg-black/50 backdrop-blur-sm border-2 border-purple-500/50 rounded-xl font-bold text-lg sm:text-xl hover:bg-purple-500/20 transition-all flex items-center justify-center gap-3">
                <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                View on GitHub
              </button>
            </div>
          </div>

          {/* Enhanced Battle Arena Demo */}
          <div className="relative max-w-6xl mx-auto">
            <div className="absolute -inset-4 sm:-inset-8 bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-cyan-400/30 blur-3xl" />
            <div className="relative bg-gradient-to-br from-black/90 via-purple-900/40 to-black/90 backdrop-blur-2xl border border-purple-500/40 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl">
              {/* Battle Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-purple-500/30 gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur" />
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-xl">
                      <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-cyan-400 font-mono uppercase tracking-wider mb-1">LIVE BATTLE #2847</div>
                    <div className="text-lg sm:text-2xl font-black text-white">Two Sum Challenge</div>
                    <div className="text-xs text-gray-400">Difficulty: Medium • Competitive Mode</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                  <div className="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-3 bg-gradient-to-r from-red-600/30 to-pink-600/30 border border-red-500/50 rounded-xl backdrop-blur-sm flex-1 sm:flex-initial justify-center">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-base sm:text-lg font-black font-mono text-red-400">04:32</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-3 bg-purple-500/20 border border-purple-500/50 rounded-xl">
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                    <span className="text-xs sm:text-sm font-bold text-purple-400">1.2K</span>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Player Cards - Fully Responsive */}
                {[battleDemo.player1, battleDemo.player2].map((player, idx) => (
                  <div key={idx} className="space-y-3 sm:space-y-4">
                    <div className="group relative">
                      <div className={`absolute -inset-0.5 bg-gradient-to-r ${idx === 0 ? 'from-cyan-500 to-blue-600' : 'from-pink-500 to-purple-600'} rounded-2xl blur opacity-75 group-hover:opacity-100 transition`} />
                      <div className={`relative flex items-center gap-3 sm:gap-5 bg-gradient-to-br ${idx === 0 ? 'from-cyan-500/20 to-blue-500/20 border-cyan-500/50' : 'from-pink-500/20 to-purple-500/20 border-pink-500/50'} border rounded-2xl p-4 sm:p-6 backdrop-blur-sm`}>
                        <div className="relative flex-shrink-0">
                          <div className={`w-16 h-16 sm:w-24 sm:h-24 rounded-xl bg-gradient-to-br ${idx === 0 ? 'from-cyan-400 to-blue-600' : 'from-pink-400 to-purple-600'} flex items-center justify-center font-black text-2xl sm:text-4xl shadow-xl`}>
                            {player.avatar}
                          </div>
                          <div className={`absolute -bottom-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 ${idx === 0 ? 'bg-green-500' : 'bg-purple-500'} rounded-full border-4 border-black flex items-center justify-center`}>
                            {idx === 0 ? <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-white" /> : <Brain className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`${idx === 0 ? 'text-cyan-400' : 'text-pink-400'} font-mono text-xs mb-1`}>PLAYER {idx + 1}</div>
                          <div className="text-white font-black text-lg sm:text-2xl mb-2 truncate">{player.name}</div>
                          <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap text-xs sm:text-sm">
                            <span className={`${idx === 0 ? 'text-green-400' : 'text-purple-400'} font-bold`}>
                              {idx === 0 ? `${player.winRate}% Win` : 'AI Assisted'}
                            </span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-400">{player.rating} Rating</span>
                          </div>
                          <div className="w-full bg-black/50 rounded-full h-2">
                            <div 
                              className={`h-2 bg-gradient-to-r ${idx === 0 ? 'from-cyan-400 to-blue-600' : 'from-pink-400 to-purple-600'} rounded-full transition-all duration-500`}
                              style={{ width: `${player.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <div className={`absolute -inset-0.5 ${idx === 0 ? 'bg-cyan-500/30' : 'bg-pink-500/30'} rounded-xl blur`} />
                      <div className={`relative bg-black/80 border ${idx === 0 ? 'border-cyan-500/40' : 'border-pink-500/40'} rounded-xl p-4 sm:p-6 backdrop-blur-sm`}>
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-xs ${idx === 0 ? 'text-green-400' : 'text-purple-400'} font-mono flex items-center gap-2`}>
                            {idx === 0 ? (
                              <>
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                CODING
                              </>
                            ) : (
                              <>
                                <Brain className="w-4 h-4 animate-pulse" />
                                AI THINKING
                              </>
                            )}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">{idx === 0 ? 'Python 3.11' : 'JavaScript'}</span>
                        </div>
                        <div className="font-mono text-xs sm:text-sm space-y-1.5 overflow-x-auto">
                          {player.code.map((line, i) => (
                            <div key={i} className={`${i === 0 ? 'text-pink-400' : i === 1 ? 'text-purple-400' : i === 2 ? 'text-cyan-400' : 'text-gray-400'} whitespace-nowrap`}>
                              {line}
                            </div>
                          ))}
                          {idx === 1 && (
                            <div className="flex items-center gap-2 text-purple-400 animate-pulse pt-2">
                              <Brain className="w-4 h-4" />
                              <span>Analyzing optimal solution...</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 border-y border-purple-500/20 bg-gradient-to-r from-black via-purple-900/20 to-black py-12 sm:py-20 px-4">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group cursor-pointer">
              <div className="relative inline-block mb-4">
                <div className="absolute -inset-2 bg-gradient-to-r opacity-75 group-hover:opacity-100 rounded-2xl blur transition" style={{ background: stat.color }} />
                <div 
                  className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl mx-auto flex items-center justify-center backdrop-blur-sm border" 
                  style={{ 
                    background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}40)`,
                    borderColor: `${stat.color}40`
                  }}
                >
                  {React.cloneElement(stat.icon, { className: "w-8 h-8 sm:w-10 sm:h-10", style: { color: stat.color } })}
                </div>
              </div>
              <div className="text-3xl sm:text-5xl font-black mb-2" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-400 uppercase mb-2">{stat.label}</div>
              <div className="text-xs text-green-400 font-bold">{stat.change}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Leaderboard Section - NEW */}
      <section className="relative z-10 py-16 sm:py-32 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-4xl sm:text-7xl md:text-8xl font-black mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Global Leaderboard
              </span>
            </h2>
            <p className="text-gray-400 text-lg sm:text-2xl max-w-3xl mx-auto">
              Compete with the world's best developers
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-cyan-400/20 blur-3xl" />
            <div className="relative bg-gradient-to-br from-black/80 via-purple-900/30 to-black/80 backdrop-blur-2xl border border-purple-500/30 rounded-2xl sm:rounded-3xl p-4 sm:p-8">
              <div className="flex items-center justify-between mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-purple-500/30">
                <div className="flex items-center gap-3">
                  <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
                  <span className="text-lg sm:text-2xl font-black">Top Warriors</span>
                </div>
                <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-green-500/20 border border-green-500/50 rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs sm:text-sm font-bold text-green-400">LIVE</span>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {leaderboard.map((player) => (
                  <div 
                    key={player.rank}
                    className="group relative p-4 sm:p-6 bg-white/5 hover:bg-white/10 border border-purple-500/20 hover:border-purple-500/40 rounded-xl sm:rounded-2xl transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3 sm:gap-6">
                      {/* Rank */}
                      <div className={`flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center font-black text-lg sm:text-2xl ${
                        player.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-black' :
                        player.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-black' :
                        player.rank === 3 ? 'bg-gradient-to-br from-amber-600 to-amber-800 text-white' :
                        'bg-purple-500/20 text-purple-400'
                      }`}>
                        {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : player.rank === 3 ? '🥉' : player.rank}
                      </div>

                      {/* Avatar */}
                      <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center font-black text-xl sm:text-3xl shadow-xl">
                        {player.avatar}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-black text-base sm:text-xl text-white truncate">{player.name}</span>
                          <span className="text-lg sm:text-xl">{player.country}</span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm flex-wrap">
                          <span className="text-purple-400 font-bold">{player.rating} Rating</span>
                          <span className="text-gray-600">•</span>
                          <span className="text-green-400">{player.wins} Wins</span>
                          <span className="text-gray-600">•</span>
                          <span className="text-orange-400 flex items-center gap-1">
                            <Flame className="w-3 h-3 sm:w-4 sm:h-4" />
                            {player.streak} streak
                          </span>
                        </div>
                      </div>

                      {/* Medal Icon */}
                      {player.rank <= 3 && (
                        <div className="hidden sm:block">
                          <Medal className={`w-8 h-8 ${
                            player.rank === 1 ? 'text-yellow-400' :
                            player.rank === 2 ? 'text-gray-400' :
                            'text-amber-600'
                          }`} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 sm:mt-8 text-center">
                <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-sm sm:text-base hover:scale-105 transition-all">
                  View Full Leaderboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-16 sm:py-32 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-4xl sm:text-7xl md:text-8xl font-black mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Dominate With Power
              </span>
            </h2>
            <p className="text-gray-400 text-lg sm:text-2xl max-w-3xl mx-auto px-4">
              Elite features for serious competitive programmers
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative cursor-pointer"
                onMouseEnter={() => setActiveFeature(index)} 
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-75 rounded-2xl sm:rounded-3xl blur transition duration-300" style={{ background: feature.color }} />
                
                <div className="relative h-full bg-black/80 backdrop-blur-xl border border-purple-500/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 group-hover:border-purple-500/60 transition-all duration-300">
                  {/* Badge */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                    <div 
                      className="px-2 sm:px-3 py-1 rounded-full text-xs font-black uppercase"
                      style={{ 
                        background: `${feature.color}20`,
                        color: feature.color,
                        border: `1px solid ${feature.color}40`
                      }}
                    >
                      {feature.badge}
                    </div>
                  </div>

                  <div 
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl mb-4 sm:mb-6 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" 
                    style={{ 
                      background: `linear-gradient(135deg, ${feature.color}30, ${feature.color}10)`,
                      border: `2px solid ${feature.color}30`,
                      boxShadow: `0 10px 40px ${feature.color}30`
                    }}
                  >
                    {React.cloneElement(feature.icon, { style: { color: feature.color } })}
                  </div>

                  <h3 className="text-lg sm:text-2xl font-black mb-2 sm:mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {feature.title}
                  </h3>

                  <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {activeFeature === index && (
                    <div className="mt-4 p-3 sm:p-4 bg-black/60 rounded-xl border border-purple-500/30 animate-fadeIn">
                      <p className="text-xs sm:text-sm text-gray-300">{feature.demo}</p>
                    </div>
                  )}

                  <div 
                    className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold"
                    style={{ 
                      background: `${feature.color}20`,
                      borderColor: `${feature.color}40`,
                      color: feature.color,
                      border: '1px solid'
                    }}
                  >
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                    {feature.stats}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Section - Updated with Gemini & Grok */}
      <section id="ai" className="relative z-10 py-16 sm:py-32 px-4 bg-gradient-to-b from-black via-purple-900/20 to-black">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-4xl sm:text-7xl md:text-8xl font-black mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Multi-AI Superpowers
              </span>
            </h2>
            <p className="text-gray-400 text-lg sm:text-2xl max-w-3xl mx-auto px-4">
              Powered by GPT-4, Gemini Pro, and Grok to make you unstoppable
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {aiFeatures.map((feat, i) => (
              <div key={i} className="group relative">
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${feat.gradient} rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-300`} />
                <div className="relative bg-gradient-to-br from-black/80 to-purple-900/40 border border-purple-500/30 rounded-2xl p-6 sm:p-8 group-hover:border-purple-500/60 transition-all backdrop-blur-sm h-full">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${feat.gradient} flex items-center justify-center mb-4 sm:mb-5 shadow-xl`}>
                    {React.cloneElement(feat.icon, { className: "w-6 h-6 sm:w-7 sm:h-7 text-white" })}
                  </div>
                  <h4 className="text-lg sm:text-xl font-black text-white mb-2 sm:mb-3">{feat.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-4">{feat.description}</p>
                  
                  {feat.features && (
                    <ul className="space-y-2">
                      {feat.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs text-gray-500">
                          <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - Fully Responsive */}
      <section id="pricing" className="relative z-10 py-16 sm:py-32 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-4xl sm:text-7xl md:text-8xl font-black mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Choose Your Battle Plan
              </span>
            </h2>
            <p className="text-gray-400 text-lg sm:text-2xl px-4">Launch special pricing • Limited time only</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className="relative group"
                onMouseEnter={() => setHoveredPricing(index)}
                onMouseLeave={() => setHoveredPricing(null)}
              >
                {plan.popular && (
                  <div className="absolute -top-4 sm:-top-6 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="px-4 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs sm:text-sm font-black shadow-xl shadow-purple-500/50">
                      <Crown className="w-3 h-3 sm:w-4 sm:h-4 inline mr-2" />
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {plan.badge && (
                  <div className="absolute -top-4 sm:-top-6 right-4 z-20">
                    <div className="px-4 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full text-xs font-black shadow-xl">
                      {plan.badge}
                    </div>
                  </div>
                )}

                <div className={`absolute -inset-1 bg-gradient-to-br ${plan.gradient} rounded-2xl sm:rounded-3xl blur ${hoveredPricing === index ? 'opacity-75' : 'opacity-0'} transition duration-300`} />

                <div className={`relative h-full bg-gradient-to-br ${plan.gradient} rounded-2xl sm:rounded-3xl p-6 sm:p-10 transform ${hoveredPricing === index ? 'scale-105' : ''} transition-all duration-300`}>
                  <div className="absolute top-0 left-0 right-0 h-32 sm:h-48 bg-gradient-to-b from-white/10 to-transparent rounded-t-2xl sm:rounded-t-3xl" />
                  
                  <div className="relative">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center mb-4 sm:mb-6 shadow-xl">
                      {index === 0 && <Shield className="w-8 h-8 sm:w-10 sm:h-10" />}
                      {index === 1 && <Crown className="w-8 h-8 sm:w-10 sm:h-10" />}
                      {index === 2 && <Rocket className="w-8 h-8 sm:w-10 sm:h-10" />}
                    </div>

                    <h3 className="text-3xl sm:text-4xl font-black mb-2 text-white">{plan.name}</h3>
                    <p className="text-white/70 text-sm mb-4 sm:mb-6">{plan.tagline}</p>
                    
                    <div className="flex items-baseline gap-2 mb-6 sm:mb-8">
                      <span className="text-5xl sm:text-7xl font-black text-white">{plan.price}</span>
                      {plan.period !== "Forever" && <span className="text-white/60 text-lg sm:text-xl">{plan.period}</span>}
                      {plan.period === "Forever" && <span className="text-white/60 text-lg sm:text-xl">forever</span>}
                    </div>

                    {plan.savings && (
                      <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 rounded-full text-xs sm:text-sm font-bold text-white mb-4 sm:mb-6">
                        💰 {plan.savings}
                      </div>
                    )}

                    <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className={`flex items-start gap-2 sm:gap-3 text-xs sm:text-sm ${feature.included ? 'text-white/90' : 'text-white/40'}`}>
                          <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${feature.included ? 'bg-white/20' : 'bg-white/10'}`}>
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                          </div>
                          <span className="font-medium">{feature.text}</span>
                        </li>
                      ))}
                    </ul>

                    <button className={`w-full py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg ${plan.popular ? 'bg-white text-purple-600 shadow-2xl' : 'bg-white/10 border-2 border-white/30 text-white hover:bg-white/20'} transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2`}>
                      {plan.cta}
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 sm:mt-16 px-4">
            <p className="text-gray-400 text-base sm:text-lg mb-4">
              🎁 <span className="text-purple-400 font-bold">Launch Special:</span> First 1,000 users get <span className="text-cyan-400 font-bold">50% off</span> for life!
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-16 sm:py-32 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl sm:rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-500" />
            <div className="relative bg-gradient-to-br from-purple-900/60 to-pink-900/60 backdrop-blur-2xl border border-purple-500/50 rounded-2xl sm:rounded-3xl p-12 sm:p-20 text-center">
              <h2 className="text-4xl sm:text-7xl md:text-8xl font-black mb-6 sm:mb-8">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Ready To Battle?
                </span>
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl text-gray-200 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
                Join <span className="text-purple-400 font-black">52,000+ elite developers</span> preparing for launch.
                <br />
                Your coding evolution starts <span className="text-cyan-400 font-black">here</span>.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8 sm:mb-12 px-4">
                <button className="group px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 rounded-xl font-black text-lg sm:text-2xl hover:scale-105 transition-all shadow-2xl shadow-purple-500/50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center justify-center gap-3">
                    <Rocket className="w-5 h-5 sm:w-7 sm:h-7" />
                    Join Waitlist Now
                  </span>
                </button>
                <button className="px-8 sm:px-12 py-4 sm:py-6 bg-black/50 backdrop-blur-sm border-2 border-purple-500/50 rounded-xl font-bold text-lg sm:text-2xl hover:bg-purple-500/20 transition-all flex items-center justify-center gap-3">
                  <Github className="w-5 h-5 sm:w-7 sm:h-7" />
                  Star on GitHub
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-gray-400 text-sm sm:text-base px-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  <span>No credit card required</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-gray-600" />
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  <span>Free tier available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-purple-500/20 pt-12 sm:pt-20 pb-8 sm:pb-12 px-4 bg-gradient-to-b from-black to-purple-900/10">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="relative inline-block mb-6 sm:mb-8">
              <h2 className="text-6xl sm:text-9xl font-black leading-none">
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent blur-2xl">
                  CODE ARENA
                </span>
                <span className="relative bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  CODE
                </span>
              </h2>
              <h2 className="text-6xl sm:text-9xl font-black leading-none">
                <span className="text-white/10">ARENA</span>
              </h2>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm uppercase tracking-[0.5em]">Battle • Evolve • Dominate</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 sm:gap-12 mb-12 sm:mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <Sword className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>
                <div>
                  <span className="text-lg sm:text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">CODE ARENA</span>
                  <div className="text-xs text-gray-500">The Ultimate Coding Battleground</div>
                </div>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 max-w-md">
                Revolutionizing competitive programming with Multi-AI features, real-time battles, and a global community of elite developers.
              </p>
              <div className="flex items-center gap-3">
                {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 hover:bg-purple-500/20 border border-purple-500/30 flex items-center justify-center transition-all">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                ))}
              </div>
            </div>

            {[
              { title: "Product", links: ['Features', 'Pricing', 'AI Coach', 'Tournaments', 'Leaderboards'] },
              { title: "Resources", links: ['Documentation', 'Tutorials', 'Blog', 'Videos', 'Community'] },
              { title: "Company", links: ['About Us', 'Careers', 'Press Kit', 'Contact', 'Partners'] }
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-white font-black text-base sm:text-lg mb-4 sm:mb-6">{col.title}</h4>
                <ul className="space-y-2 sm:space-y-3">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-xs sm:text-sm flex items-center gap-2 group">
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 pt-8 sm:pt-12 border-t border-purple-500/20">
            <div className="text-xs sm:text-sm text-gray-600 text-center md:text-left">
              © 2025 Code Arena. All rights reserved. Built with ❤️ by developers, for developers.
            </div>
            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600 flex-wrap justify-center">
              <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6" onClick={() => setShowVideo(false)}>
          <div className="relative max-w-6xl w-full aspect-video bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl sm:rounded-3xl border border-purple-500/50 flex items-center justify-center">
            <div className="text-center px-4">
              <Play className="w-16 h-16 sm:w-24 sm:h-24 text-purple-400 mb-4 mx-auto" />
              <p className="text-xl sm:text-2xl text-gray-300">Demo video coming soon!</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        * { 
          font-family: 'Inter', sans-serif;
        }

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

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        html { 
          scroll-behavior: smooth; 
        }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.5); }
        ::-webkit-scrollbar-thumb { 
          background: linear-gradient(to bottom, #8338ec, #ff006e); 
          border-radius: 4px; 
        }
        ::-webkit-scrollbar-thumb:hover { 
          background: linear-gradient(to bottom, #a855f7, #ff1a75); 
        }

        /* Performance optimizations */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .will-change-transform {
          will-change: transform;
        }
      `}</style>
    </div>
  );
}