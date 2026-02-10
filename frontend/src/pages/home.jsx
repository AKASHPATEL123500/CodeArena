import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, Users, Trophy, Code, Brain, Sword, Shield, Target, Rocket, Crown, Star } from 'lucide-react';

export default function CodeArena() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState(null);
  const [battleCount, setBattleCount] = useState(1247);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    const interval = setInterval(() => {
      setBattleCount(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  const features = [
    {
      icon: <Sword className="w-8 h-8" />,
      title: "Real-Time Code Battles",
      description: "Challenge developers worldwide in live coding competitions with instant feedback",
      color: "#ff006e"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Learning",
      description: "Get personalized hints, code reviews, and improvement suggestions from our advanced AI",
      color: "#8338ec"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Multiplayer Arenas",
      description: "Join team battles, tournaments, and compete in multiple programming languages",
      color: "#3a86ff"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Global Leaderboards",
      description: "Climb the ranks, earn badges, and showcase your skills to the world",
      color: "#fb5607"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Multi-Language Support",
      description: "Code in Python, JavaScript, C++, Java, Rust, and 15+ other languages",
      color: "#06ffa5"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Skill-Based Matching",
      description: "Our AI matches you with opponents of similar skill level for fair battles",
      color: "#ffbe0b"
    }
  ];

  const pricingPlans = [
    {
      name: "Warrior",
      price: "Free",
      period: "Forever",
      features: [
        "5 battles per day",
        "Basic AI hints",
        "Community challenges",
        "Single player mode",
        "Standard themes"
      ],
      popular: false,
      gradient: "from-slate-700 to-slate-900"
    },
    {
      name: "Champion",
      price: "₹499",
      period: "/month",
      features: [
        "Unlimited battles",
        "Advanced AI coach",
        "Private arenas",
        "Team tournaments",
        "Premium themes",
        "Priority matching",
        "Detailed analytics"
      ],
      popular: true,
      gradient: "from-purple-600 to-pink-600"
    },
    {
      name: "Legend",
      price: "₹1,299",
      period: "/month",
      features: [
        "Everything in Champion",
        "1-on-1 AI training",
        "Custom tournaments",
        "API access",
        "White-label option",
        "Dedicated support",
        "Early feature access",
        "Exclusive NFT badges"
      ],
      popular: false,
      gradient: "from-amber-500 to-orange-600"
    }
  ];

  const stats = [
    { label: "Active Battles", value: battleCount, icon: <Zap /> },
    { label: "Global Players", value: "47.5K+", icon: <Users /> },
    { label: "Code Challenges", value: "2,800+", icon: <Code /> },
    { label: "AI Hints Given", value: "1.2M+", icon: <Brain /> }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(138, 43, 226, 0.15), transparent 50%)`,
               transition: 'background-image 0.3s ease'
             }} 
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Floating 3D Code Blocks */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
              opacity: 0.1
            }}
          >
            <div className="text-cyan-400 font-mono text-xs transform rotate-12">
              {['{}', '()', '[]', '<>', ';;', '//'][Math.floor(Math.random() * 6)]}
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-purple-500/20 backdrop-blur-sm">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-lg opacity-50 animate-pulse" />
              <Sword className="w-8 h-8 relative text-cyan-400" />
            </div>
            <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              CODE ARENA
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium">Features</a>
            <a href="#pricing" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium">Pricing</a>
            <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg shadow-purple-500/30">
              Launch Arena
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 pt-20 pb-32">
        <div className="text-center max-w-5xl mx-auto">
          {/* Floating Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-8 backdrop-blur-sm animate-fade-in">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300 font-medium">Live Battles Happening Now: {battleCount}</span>
          </div>

          <h1 className="text-7xl md:text-8xl font-black mb-6 leading-none">
            <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              Battle. Code.
            </span>
            <span className="block text-white mt-2">Conquer.</span>
          </h1>

          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Enter the ultimate coding battleground where AI meets competition. 
            Challenge developers worldwide, sharpen your skills, and rise through the ranks in <span className="text-purple-400 font-semibold">real-time code battles</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold text-lg hover:scale-105 transition-all shadow-2xl shadow-purple-500/50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Start Your First Battle
              </span>
            </button>
            <button className="px-8 py-4 border border-purple-500/50 rounded-lg font-bold text-lg hover:bg-purple-500/10 transition-all">
              Watch Demo Battle
            </button>
          </div>

          {/* 3D Arena Visualization */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl" />
            <div className="relative bg-gradient-to-br from-slate-900/50 to-purple-900/30 backdrop-blur-md border border-purple-500/30 rounded-2xl p-8 transform hover:scale-105 transition-transform duration-500">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                    <Shield className="w-8 h-8 text-cyan-400" />
                    <div>
                      <div className="text-cyan-400 font-mono text-sm">Player 1</div>
                      <div className="text-white font-bold">DestroyerX</div>
                    </div>
                  </div>
                  <div className="bg-black/50 rounded-lg p-4 font-mono text-xs text-green-400 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span>Coding...</span>
                    </div>
                    <div className="text-gray-500">function solve(arr) {'{'}</div>
                    <div className="text-gray-500 pl-4">return arr.sort()...</div>
                    <div className="text-gray-500">{'}'}</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-pink-500/10 border border-pink-500/30 rounded-lg p-4">
                    <Sword className="w-8 h-8 text-pink-400" />
                    <div>
                      <div className="text-pink-400 font-mono text-sm">Player 2</div>
                      <div className="text-white font-bold">CodeNinja</div>
                    </div>
                  </div>
                  <div className="bg-black/50 rounded-lg p-4 font-mono text-xs text-purple-400 border border-purple-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                      <span>Thinking...</span>
                    </div>
                    <div className="text-gray-500">const solution = (n) => {'{'}</div>
                    <div className="text-gray-500 pl-4">// AI analyzing...</div>
                    <div className="text-gray-500">{'}'}</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-mono text-sm">
                  <Zap className="w-4 h-4 animate-pulse" />
                  <span>Challenge: Two Sum Problem • Time: 4:32</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 border-y border-purple-500/20 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center transform hover:scale-110 transition-transform">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg mb-3">
                  {React.cloneElement(stat.icon, { className: "w-6 h-6" })}
                </div>
                <div className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-6">
            <Star className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300 font-medium">Powered Features</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Arena Features
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Cutting-edge technology meets competitive coding
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
              className="group relative bg-gradient-to-br from-slate-900/50 to-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 cursor-pointer overflow-hidden"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 transition-all duration-300" />
              
              <div className="relative">
                <div 
                  className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}40)`,
                    boxShadow: activeFeature === index ? `0 0 30px ${feature.color}50` : 'none'
                  }}
                >
                  {React.cloneElement(feature.icon, { 
                    className: "w-8 h-8",
                    style: { color: feature.color }
                  })}
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-purple-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn more</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Feature Highlight */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl" />
          <div className="relative bg-gradient-to-br from-slate-900/80 to-purple-900/40 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/40 rounded-full mb-6">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <span className="text-sm text-purple-300 font-semibold">AI-POWERED</span>
                </div>
                <h3 className="text-4xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Your Personal AI Coach
                </h3>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  Our advanced AI analyzes your coding style, identifies weaknesses, and provides real-time suggestions to level up your skills. Get personalized learning paths and instant feedback on every battle.
                </p>
                <ul className="space-y-3">
                  {[
                    "Real-time code optimization hints",
                    "Personalized difficulty scaling",
                    "Pattern recognition & learning",
                    "Strategic battle suggestions"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1">
                <div className="bg-black/50 rounded-2xl p-6 border border-purple-500/20 font-mono text-sm">
                  <div className="flex items-center gap-2 mb-4 text-purple-400">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <span className="text-xs">AI Analysis</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="text-green-400">✓ Time Complexity: O(n log n)</div>
                    <div className="text-yellow-400">⚡ Hint: Consider using a hash map</div>
                    <div className="text-cyan-400">💡 Alternative: Two-pointer approach</div>
                    <div className="text-purple-400 animate-pulse">🤖 AI is analyzing your pattern...</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-6">
            <Crown className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300 font-medium">Choose Your Path</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Battle Plans
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Select the plan that matches your ambition
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 transform hover:scale-105 transition-all duration-300 ${
                plan.popular ? 'md:-mt-4 md:mb-4' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-sm font-bold shadow-lg shadow-purple-500/50">
                    MOST POPULAR
                  </div>
                </div>
              )}

              <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-10 rounded-3xl`} />
              <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-purple-500/30" />

              <div className="relative">
                <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  {plan.period !== "Forever" && (
                    <span className="text-gray-400 text-sm">{plan.period}</span>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-4 rounded-xl font-bold transition-all ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/50' 
                    : 'border border-purple-500/50 hover:bg-purple-500/10'
                }`}>
                  {plan.price === "Free" ? "Start Free" : "Choose Plan"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-6 py-24">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 blur-3xl" />
          <div className="relative bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl" />
            
            <div className="relative">
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Ready to Battle?
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                Join thousands of developers sharpening their skills in the arena. 
                Your first battle is just one click away.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-2xl shadow-purple-500/50 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center gap-2">
                    <Sword className="w-5 h-5" />
                    Enter the Arena Now
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-purple-500/20 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Sword className="w-6 h-6 text-cyan-400" />
              <span className="text-xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                CODE ARENA
              </span>
            </div>
            <div className="text-sm text-gray-400">
              Powered by <span className="text-purple-400 font-semibold">Akash Reddy</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-xs text-gray-500">
            © 2025 Code Arena. All rights reserved. Battle responsibly.
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}