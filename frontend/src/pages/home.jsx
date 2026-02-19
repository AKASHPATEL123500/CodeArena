import { useState, useEffect, useRef } from "react";
import {
  Code2, Sword, Trophy, Users, Brain, Zap, Target, BookOpen,
  TrendingUp, Shield, Star, ChevronRight, Play, Github,
  Twitter, Linkedin, Youtube, Menu, X, Check, BarChart2,
  Clock, Award, Flame, Cpu, Activity, MessageSquare,
  ArrowRight, Globe, Sparkles, LogIn, UserPlus, ChevronDown,
  Terminal, GitBranch, Layers, Database,
  CheckCircle2, Minimize2, Maximize2
} from "lucide-react";

const C = {
  bg: "#05050b", surface: "#0c0c18", card: "#111126", cardHover: "#15152e",
  border: "rgba(99,102,241,.18)", borderHover: "rgba(99,102,241,.45)",
  primary: "#6366f1", primaryDim: "rgba(99,102,241,.12)",
  accent: "#06b6d4", accentDim: "rgba(6,182,212,.12)",
  pink: "#f43f5e", pinkDim: "rgba(244,63,94,.12)",
  green: "#10b981", greenDim: "rgba(16,185,129,.12)",
  amber: "#f59e0b", amberDim: "rgba(245,158,11,.12)",
  violet: "#8b5cf6", text: "#e2e8f0", muted: "#64748b", subtle: "#94a3b8",
};

const Pill = ( { children, color = C.primary } ) => (
  <span style={ {
    display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 11px", borderRadius: 100,
    fontSize: 11, fontWeight: 700, background: `${ color }18`, color, border: `1px solid ${ color }30`,
    letterSpacing: ".05em", textTransform: "uppercase",
  } }>{ children }</span>
);

const Btn = ( { children, variant = "primary", onClick, type, style = {} } ) => {
  const base = {
    display: "inline-flex", alignItems: "center", gap: 7, padding: "11px 22px", borderRadius: 11,
    fontWeight: 700, cursor: "pointer", fontSize: 14, transition: "all .2s ease",
    fontFamily: "inherit", whiteSpace: "nowrap", border: "none",
    ...style,
  };
  const v = {
    primary: { background: `linear-gradient(135deg,${ C.primary },${ C.violet })`, color: "#fff", boxShadow: `0 4px 20px rgba(99,102,241,.3)` },
    outline: { background: "transparent", color: C.text, border: `1px solid ${ C.border }` },
    ghost: { background: "transparent", color: C.subtle, padding: "8px 14px" },
    green: { background: `linear-gradient(135deg,${ C.green },#059669)`, color: "#fff", boxShadow: `0 4px 16px rgba(16,185,129,.25)` },
  };
  return (
    <button onClick={ onClick } type={ type }
      onMouseEnter={ e => e.currentTarget.style.transform = "translateY(-1px)" }
      onMouseLeave={ e => e.currentTarget.style.transform = "none" }
      style={ { ...base, ...v[ variant ] } }>
      { children }
    </button>
  );
};

const GradText = ( { children } ) => (
  <span style={ { background: `linear-gradient(135deg,${ C.accent },${ C.primary },${ C.pink })`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" } }>{ children }</span>
);

const H2 = ( { children, style = {} } ) => (
  <h2 style={ { fontWeight: 800, fontSize: "clamp(26px,4vw,46px)", lineHeight: 1.1, letterSpacing: "-1px", color: C.text, ...style } }>{ children }</h2>
);

const SLabel = ( { children, color = C.accent } ) => (
  <div style={ { marginBottom: 12 } }>
    <Pill color={ color }><Sparkles size={ 10 } /> { children }</Pill>
  </div>
);

/* ── NAVBAR ─────────────────────────────────────────── */
function Navbar() {
  const [ scrolled, setScrolled ] = useState( false );
  const [ open, setOpen ] = useState( false );
  useEffect( () => {
    const h = () => setScrolled( window.scrollY > 20 );
    window.addEventListener( "scroll", h );
    return () => window.removeEventListener( "scroll", h );
  }, [] );
  const links = [ "Features", "Languages", "Battle", "AI Tools", "Pricing" ];
  return (
    <>
      <nav style={ {
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(5,5,11,.94)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${ C.border }` : "1px solid transparent",
        transition: "all .3s",
      } }>
        <div style={ { maxWidth: 1160, margin: "0 auto", padding: "0 20px", height: 62, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 } }>
          <a href="#" style={ { display: "flex", alignItems: "center", gap: 9, textDecoration: "none", flexShrink: 0 } }>
            <div style={ { width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg,${ C.primary },${ C.pink })`, display: "flex", alignItems: "center", justifyContent: "center" } }>
              <Sword size={ 16 } color="#fff" />
            </div>
            <span style={ { fontWeight: 800, fontSize: 18, letterSpacing: "-.5px", color: C.text } }>
              Code<span style={ { color: C.accent } }>Arena</span>
            </span>
          </a>

          {/* Desktop links */ }
          <div style={ { display: "flex", gap: 2, alignItems: "center", flex: 1, justifyContent: "center" } } className="ca-desktop-links">
            { links.map( l => (
              <a key={ l } href={ `#${ l.toLowerCase().replace( " ", "-" ) }` }
                style={ { color: C.muted, textDecoration: "none", fontSize: 14, fontWeight: 500, padding: "7px 13px", borderRadius: 8, transition: "all .2s" } }
                onMouseEnter={ e => { e.target.style.color = C.text; e.target.style.background = C.primaryDim; } }
                onMouseLeave={ e => { e.target.style.color = C.muted; e.target.style.background = "transparent"; } }>
                { l }
              </a>
            ) ) }
          </div>

          <div style={ { display: "flex", gap: 8, alignItems: "center", flexShrink: 0 } } className="ca-desktop-auth">
            <Btn variant="ghost" style={ { fontSize: 13, padding: "7px 14px" } }><LogIn size={ 14 } /> Sign In</Btn>
            <Btn variant="primary" style={ { fontSize: 13, padding: "8px 18px" } }><UserPlus size={ 14 } /> Sign Up Free</Btn>
          </div>

          <button onClick={ () => setOpen( !open ) } className="ca-mobile-btn"
            style={ { background: "none", border: "none", color: C.text, cursor: "pointer", padding: 4, display: "none" } }>
            { open ? <X size={ 22 } /> : <Menu size={ 22 } /> }
          </button>
        </div>

        { open && (
          <div style={ { background: "rgba(5,5,11,.98)", borderTop: `1px solid ${ C.border }`, padding: "16px 20px 24px" } }>
            { links.map( l => (
              <a key={ l } href={ `#${ l.toLowerCase().replace( " ", "-" ) }` }
                onClick={ () => setOpen( false ) }
                style={ { display: "block", color: C.subtle, textDecoration: "none", padding: "12px 0", fontSize: 16, fontWeight: 500, borderBottom: `1px solid ${ C.border }` } }>
                { l }
              </a>
            ) ) }
            <div style={ { display: "flex", gap: 10, marginTop: 18 } }>
              <Btn variant="outline" style={ { flex: 1, justifyContent: "center", fontSize: 14 } }><LogIn size={ 14 } /> Sign In</Btn>
              <Btn variant="primary" style={ { flex: 1, justifyContent: "center", fontSize: 14 } }><UserPlus size={ 14 } /> Sign Up Free</Btn>
            </div>
          </div>
        ) }
      </nav>

      <style>{ `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{font-family:'DM Sans',sans-serif;-webkit-font-smoothing:antialiased;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:${ C.bg };}
        ::-webkit-scrollbar-thumb{background:${ C.primary };border-radius:3px;}
        @keyframes floatY{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}
        @keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
        @keyframes ping{0%{transform:scale(1);opacity:.8;}100%{transform:scale(1.8);opacity:0;}}
        @keyframes gradX{0%,100%{background-position:0% 50%;}50%{background-position:100% 50%;}}
        .ca-card{transition:transform .25s ease,border-color .25s,box-shadow .25s;}
        .ca-card:hover{transform:translateY(-4px);border-color:${ C.borderHover }!important;box-shadow:0 12px 40px rgba(99,102,241,.1);}
        .ca-link{transition:color .2s;cursor:pointer;}
        .ca-link:hover{color:${ C.accent }!important;}
        @media(max-width:768px){
          .ca-desktop-links,.ca-desktop-auth{display:none!important;}
          .ca-mobile-btn{display:flex!important;}
          .ca-2col{grid-template-columns:1fr!important;}
          .ca-3col{grid-template-columns:1fr!important;}
          .ca-5col{grid-template-columns:repeat(2,1fr)!important;}
          .ca-stats{grid-template-columns:repeat(2,1fr)!important;}
          .ca-footer-grid{grid-template-columns:1fr 1fr!important;}
          .ca-roadmap{flex-direction:column!important;align-items:flex-start!important;}
          .ca-roadmap-dot{display:none!important;}
          .ca-roadmap-spacer{display:none!important;}
          .ca-hero-checks{gap:12px!important;flex-direction:column!important;align-items:center;}
        }
        @media(max-width:480px){
          .ca-5col{grid-template-columns:1fr!important;}
          .ca-stats{grid-template-columns:1fr 1fr!important;}
        }
        @media(min-width:769px){.ca-mobile-btn{display:none!important;}}
      `}</style>
    </>
  );
}

/* ── HERO ───────────────────────────────────────────── */
function Hero() {
  const [ typed, setTyped ] = useState( "" );
  const [ email, setEmail ] = useState( "" );
  const [ done, setDone ] = useState( false );
  const phrases = [ "Master Algorithms", "Win Coding Battles", "Learn with 3 AIs", "Build a Real Career" ];
  const ph = useRef( 0 ), ch = useRef( 0 ), del = useRef( false );
  useEffect( () => {
    const t = setInterval( () => {
      const cur = phrases[ ph.current ];
      if ( !del.current ) {
        ch.current++; setTyped( cur.slice( 0, ch.current ) );
        if ( ch.current === cur.length ) setTimeout( () => { del.current = true; }, 1400 );
      } else {
        ch.current--; setTyped( cur.slice( 0, ch.current ) );
        if ( ch.current === 0 ) { del.current = false; ph.current = ( ph.current + 1 ) % phrases.length; }
      }
    }, del.current ? 35 : 75 );
    return () => clearInterval( t );
  }, [] );
  const onSubmit = e => {
    e.preventDefault();
    if ( email.includes( "@" ) ) { setDone( true ); setEmail( "" ); setTimeout( () => setDone( false ), 3500 ); }
  };
  return (
    <section style={ { minHeight: "100vh", display: "flex", alignItems: "center", padding: "100px 20px 80px", position: "relative", overflow: "hidden", background: C.bg } }>
      {/* Grid bg */ }
      <div style={ { position: "absolute", inset: 0, zIndex: 0, backgroundImage: `linear-gradient(${ C.border } 1px,transparent 1px),linear-gradient(90deg,${ C.border } 1px,transparent 1px)`, backgroundSize: "64px 64px", maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%,black 40%,transparent 100%)" } } />
      <div style={ { position: "absolute", top: "10%", left: "15%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,.14) 0%,transparent 65%)", filter: "blur(20px)", zIndex: 0 } } />
      <div style={ { position: "absolute", bottom: "15%", right: "8%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle,rgba(6,182,212,.1) 0%,transparent 65%)", filter: "blur(20px)", zIndex: 0 } } />

      <div style={ { maxWidth: 860, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1, width: "100%" } }>
        <div style={ { marginBottom: 28 } }>
          <div style={ { display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(99,102,241,.08)", border: `1px solid rgba(99,102,241,.22)`, borderRadius: 100, padding: "7px 18px", fontSize: 13, fontWeight: 600, color: C.subtle } }>
            <span style={ { width: 7, height: 7, borderRadius: "50%", background: C.green, display: "inline-block", position: "relative" } }>
              <span style={ { position: "absolute", inset: -3, borderRadius: "50%", background: C.green, opacity: .35, animation: "ping 1.3s ease-out infinite" } } />
            </span>
            Trusted by 52,000+ developers worldwide · 100% Free
            <ChevronRight size={ 12 } color={ C.accent } />
          </div>
        </div>

        <h1 style={ { fontWeight: 800, fontSize: "clamp(40px,8vw,84px)", lineHeight: 1.04, letterSpacing: "-2.5px", marginBottom: 18 } }>
          Code. Battle.<br /><GradText>Dominate.</GradText>
        </h1>

        <div style={ { height: 34, marginBottom: 18 } }>
          <span style={ { fontSize: "clamp(16px,2.5vw,22px)", color: C.subtle, fontWeight: 400 } }>
            { typed }<span style={ { animation: "blink 1s infinite", color: C.accent } }>|</span>
          </span>
        </div>

        <p style={ { fontSize: "clamp(14px,1.8vw,17px)", color: C.muted, maxWidth: 540, margin: "0 auto 36px", lineHeight: 1.8 } }>
          The most advanced free coding platform. Learn 10+ languages, battle globally in real-time, and get mentored by <strong style={ { color: C.text } }>Claude AI, ChatGPT & Gemini</strong>.
        </p>

        <form onSubmit={ onSubmit } style={ { marginBottom: 18 } }>
          <div style={ { display: "flex", gap: 6, maxWidth: 460, margin: "0 auto", background: "rgba(255,255,255,.04)", border: `1px solid ${ C.border }`, borderRadius: 13, padding: 5 } }>
            <input type="email" value={ email } onChange={ e => setEmail( e.target.value ) } placeholder="Enter your email address" required
              style={ { flex: 1, background: "transparent", border: "none", outline: "none", padding: "9px 13px", color: C.text, fontSize: 14, fontFamily: "inherit", minWidth: 0 } } />
            <Btn type="submit" variant={ done ? "green" : "primary" } style={ { padding: "9px 20px", fontSize: 13 } }>
              { done ? <><CheckCircle2 size={ 14 } /> Done!</> : <>Start Free <ArrowRight size={ 14 } /></> }
            </Btn>
          </div>
        </form>

        <div className="ca-hero-checks" style={ { display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", fontSize: 12, color: C.muted } }>
          { [ "100% Free Forever", "No Credit Card", "Certificate Included", "3 AI Mentors" ].map( t => (
            <div key={ t } style={ { display: "flex", alignItems: "center", gap: 5 } }>
              <Check size={ 13 } color={ C.green } /><span>{ t }</span>
            </div>
          ) ) }
        </div>
      </div>
    </section>
  );
}

/* ── STATS ──────────────────────────────────────────── */
function Stats() {
  const items = [
    { icon: <Users size={ 18 } color={ C.accent } />, v: "52,000+", l: "Active Learners" },
    { icon: <BookOpen size={ 18 } color={ C.primary } />, v: "500+", l: "Free Lessons" },
    { icon: <Sword size={ 18 } color={ C.pink } />, v: "1.2M+", l: "Battles Fought" },
    { icon: <Brain size={ 18 } color={ C.amber } />, v: "2.4M+", l: "AI Hints Given" },
    { icon: <Award size={ 18 } color={ C.green } />, v: "18K+", l: "Certificates" },
    { icon: <Globe size={ 18 } color={ C.violet } />, v: "120+", l: "Countries" },
  ];
  return (
    <div style={ { background: C.surface, borderTop: `1px solid ${ C.border }`, borderBottom: `1px solid ${ C.border }`, padding: "32px 20px" } }>
      <div className="ca-stats" style={ { maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 20, textAlign: "center" } }>
        { items.map( ( s, i ) => (
          <div key={ i }>
            <div style={ { display: "flex", justifyContent: "center", marginBottom: 6 } }>{ s.icon }</div>
            <div style={ { fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 800, color: C.text, letterSpacing: "-.5px" } }>{ s.v }</div>
            <div style={ { fontSize: 11, color: C.muted, marginTop: 3 } }>{ s.l }</div>
          </div>
        ) ) }
      </div>
    </div>
  );
}

/* ── AI DASHBOARD ───────────────────────────────────── */
function AIDashboard() {
  const [ activeAI, setActiveAI ] = useState( 0 );
  const [ input, setInput ] = useState( "" );
  const [ msgs, setMsgs ] = useState( [ { from: "ai", text: "Hi! I'm Claude AI. Paste your code or ask me anything — I'll explain it clearly." } ] );
  const ais = [
    { name: "Claude AI", by: "Anthropic", icon: <Brain size={ 15 } />, color: C.amber, desc: "Deep reasoning & explanations" },
    { name: "ChatGPT", by: "OpenAI", icon: <Zap size={ 15 } />, color: C.green, desc: "Fast code generation & fixes" },
    { name: "Gemini", by: "Google", icon: <Sparkles size={ 15 } />, color: C.accent, desc: "Multimodal & real-time search" },
  ];
  const samples = [ "Explain recursion with example", "Why is my loop not working?", "What is time complexity?", "Explain binary search" ];
  const send = ( text ) => {
    const q = text || input; if ( !q.trim() ) return;
    setMsgs( m => [ ...m, { from: "user", text: q } ] ); setInput( "" );
    setTimeout( () => setMsgs( m => [ ...m, { from: "ai", text: `Great question! Let me break down "${ q.substring( 0, 40 ) }..." step by step with examples. [${ ais[ activeAI ].name } analyzing...]` } ] ), 700 );
  };
  return (
    <section id="ai-tools" style={ { padding: "90px 20px", background: C.bg } }>
      <div style={ { maxWidth: 1100, margin: "0 auto" } }>
        <div style={ { textAlign: "center", marginBottom: 52 } }>
          <SLabel color={ C.amber }><Brain size={ 10 } /> AI-Powered Learning</SLabel>
          <H2 style={ { marginBottom: 14 } }>3 World-Class AI Mentors,<br /><GradText>Always Available</GradText></H2>
          <p style={ { color: C.muted, fontSize: 16, maxWidth: 520, margin: "0 auto" } }>
            Switch between Claude AI, ChatGPT, and Gemini instantly. Get explanations, code reviews, and hints — 24/7, 100% free.
          </p>
        </div>

        {/* Chat mockup */ }
        <div style={ { background: C.card, border: `1px solid ${ C.border }`, borderRadius: 18, overflow: "hidden", boxShadow: `0 24px 60px rgba(0,0,0,.35)`, marginBottom: 16 } }>
          {/* Title bar */ }
          <div style={ { padding: "11px 18px", background: "rgba(255,255,255,.025)", borderBottom: `1px solid ${ C.border }`, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" } }>
            <div style={ { display: "flex", gap: 5 } }>{ [ "#ff5f57", "#febc2e", "#28c840" ].map( c => <div key={ c } style={ { width: 11, height: 11, borderRadius: "50%", background: c } } /> ) }</div>
            <div style={ { flex: 1, display: "flex", justifyContent: "center", minWidth: 0 } }>
              <div style={ { background: "rgba(255,255,255,.05)", border: `1px solid ${ C.border }`, borderRadius: 7, padding: "3px 14px", fontSize: 11, color: C.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }>codearena.io/ai-mentor</div>
            </div>
            <div style={ { display: "flex", gap: 8 } }>
              <Minimize2 size={ 13 } color={ C.muted } /><Maximize2 size={ 13 } color={ C.muted } />
            </div>
          </div>

          <div className="ca-2col" style={ { display: "grid", gridTemplateColumns: "200px 1fr" } }>
            {/* Sidebar */ }
            <div style={ { borderRight: `1px solid ${ C.border }`, padding: "16px 12px", background: "rgba(0,0,0,.12)" } }>
              <div style={ { fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 10, paddingLeft: 4 } }>Select AI</div>
              { ais.map( ( ai, i ) => (
                <div key={ i } onClick={ () => setActiveAI( i ) } style={ {
                  display: "flex", alignItems: "center", gap: 9, padding: "9px 8px", borderRadius: 9, marginBottom: 5, cursor: "pointer",
                  background: activeAI === i ? `${ ai.color }14` : "transparent",
                  border: `1px solid ${ activeAI === i ? ai.color + "30" : "transparent" }`, transition: "all .18s",
                } }>
                  <div style={ { width: 28, height: 28, borderRadius: 7, background: activeAI === i ? `${ ai.color }22` : "rgba(255,255,255,.06)", display: "flex", alignItems: "center", justifyContent: "center", color: ai.color, flexShrink: 0 } }>{ ai.icon }</div>
                  <div style={ { minWidth: 0 } }>
                    <div style={ { fontSize: 12, fontWeight: 700, color: activeAI === i ? ai.color : C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }>{ ai.name }</div>
                    <div style={ { fontSize: 10, color: C.muted } }>{ ai.by }</div>
                  </div>
                </div>
              ) ) }
              <div style={ { borderTop: `1px solid ${ C.border }`, marginTop: 12, paddingTop: 12 } }>
                <div style={ { fontSize: 10, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8, paddingLeft: 4 } }>Try these</div>
                { samples.map( ( q, i ) => (
                  <div key={ i } onClick={ () => send( q ) } style={ { fontSize: 11, color: C.muted, padding: "6px 8px", borderRadius: 6, cursor: "pointer", marginBottom: 3, lineHeight: 1.4, transition: "all .15s" } }
                    onMouseEnter={ e => { e.currentTarget.style.background = C.primaryDim; e.currentTarget.style.color = C.text; } }
                    onMouseLeave={ e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.muted; } }>
                    "{ q }"
                  </div>
                ) ) }
              </div>
            </div>
            {/* Chat */ }
            <div style={ { display: "flex", flexDirection: "column" } }>
              <div style={ { flex: 1, padding: "16px 20px", overflowY: "auto", maxHeight: 260, minHeight: 200 } }>
                { msgs.map( ( m, i ) => (
                  <div key={ i } style={ { display: "flex", gap: 10, marginBottom: 14, flexDirection: m.from === "user" ? "row-reverse" : "row" } }>
                    <div style={ { width: 28, height: 28, borderRadius: 7, flexShrink: 0, background: m.from === "ai" ? `${ ais[ activeAI ].color }18` : C.primaryDim, border: `1px solid ${ m.from === "ai" ? ais[ activeAI ].color + "30" : C.border }`, display: "flex", alignItems: "center", justifyContent: "center", color: m.from === "ai" ? ais[ activeAI ].color : C.primary } }>
                      { m.from === "ai" ? ais[ activeAI ].icon : <Code2 size={ 12 } /> }
                    </div>
                    <div style={ { background: m.from === "ai" ? "rgba(255,255,255,.04)" : C.primaryDim, border: `1px solid ${ m.from === "ai" ? C.border : `${ C.primary }28` }`, borderRadius: m.from === "ai" ? "4px 11px 11px 11px" : "11px 4px 11px 11px", padding: "9px 13px", fontSize: 13, color: C.text, lineHeight: 1.6, maxWidth: "76%" } }>
                      { m.text }
                    </div>
                  </div>
                ) ) }
              </div>
              <div style={ { borderTop: `1px solid ${ C.border }`, padding: "10px 16px", display: "flex", gap: 8 } }>
                <input value={ input } onChange={ e => setInput( e.target.value ) } onKeyDown={ e => e.key === "Enter" && send() }
                  placeholder={ `Ask ${ ais[ activeAI ].name } anything…` }
                  style={ { flex: 1, background: "rgba(255,255,255,.04)", border: `1px solid ${ C.border }`, borderRadius: 9, padding: "9px 13px", color: C.text, fontSize: 13, fontFamily: "inherit", outline: "none" } } />
                <Btn variant="primary" onClick={ () => send() } style={ { padding: "9px 16px" } }><ArrowRight size={ 14 } /></Btn>
              </div>
            </div>
          </div>
        </div>

        <div className="ca-3col" style={ { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 } }>
          { ais.map( ( ai, i ) => (
            <div key={ i } className="ca-card" style={ { background: C.card, border: `1px solid ${ C.border }`, borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 } }>
              <div style={ { width: 34, height: 34, borderRadius: 9, background: `${ ai.color }16`, border: `1px solid ${ ai.color }28`, display: "flex", alignItems: "center", justifyContent: "center", color: ai.color, flexShrink: 0 } }>{ ai.icon }</div>
              <div>
                <div style={ { fontWeight: 700, fontSize: 13, color: C.text } }>{ ai.name } <span style={ { color: C.muted, fontWeight: 400, fontSize: 11 } }>by { ai.by }</span></div>
                <div style={ { fontSize: 11, color: C.muted, marginTop: 2 } }>{ ai.desc }</div>
              </div>
            </div>
          ) ) }
        </div>
      </div>
    </section>
  );
}

/* ── ANALYTICS DASHBOARD ────────────────────────────── */
function AnalyticsDashboard() {
  const bars = [
    { lang: "Py", val: 84, color: C.accent }, { lang: "JS", val: 67, color: C.amber },
    { lang: "Java", val: 45, color: C.pink }, { lang: "C++", val: 58, color: C.violet },
    { lang: "TS", val: 72, color: C.primary }, { lang: "Go", val: 39, color: C.green },
  ];
  const activity = [
    { icon: <CheckCircle2 size={ 13 } color={ C.green } />, text: "Solved Two Sum — Easy", time: "2m ago", xp: "+50 XP" },
    { icon: <Sword size={ 13 } color={ C.pink } />, text: "Won battle vs AlgoQueen", time: "14m ago", xp: "+200 XP" },
    { icon: <BookOpen size={ 13 } color={ C.accent } />, text: "Completed Recursion lesson", time: "1h ago", xp: "+30 XP" },
    { icon: <Trophy size={ 13 } color={ C.amber } />, text: "Earned 'Week Streak' badge", time: "3h ago", xp: "+100 XP" },
  ];
  return (
    <section style={ { padding: "90px 20px", background: C.surface } }>
      <div style={ { maxWidth: 1100, margin: "0 auto" } }>
        <div style={ { textAlign: "center", marginBottom: 52 } }>
          <SLabel color={ C.green }><BarChart2 size={ 10 } /> Progress Dashboard</SLabel>
          <H2 style={ { marginBottom: 14 } }>Track Every Step of<br /><GradText>Your Growth</GradText></H2>
          <p style={ { color: C.muted, fontSize: 16, maxWidth: 500, margin: "0 auto" } }>
            Your personal analytics dashboard tracks progress, streaks, battle history, and skill gaps in real time.
          </p>
        </div>

        <div style={ { background: C.card, border: `1px solid ${ C.border }`, borderRadius: 18, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,.3)" } }>
          {/* Bar */ }
          <div style={ { padding: "12px 22px", borderBottom: `1px solid ${ C.border }`, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" } }>
            <div style={ { display: "flex", gap: 5 } }>{ [ "#ff5f57", "#febc2e", "#28c840" ].map( c => <div key={ c } style={ { width: 11, height: 11, borderRadius: "50%", background: c } } /> ) }</div>
            <span style={ { fontSize: 12, color: C.muted, fontFamily: "'DM Mono',monospace" } }>codearena.io/dashboard</span>
            <div style={ { marginLeft: "auto", display: "flex", gap: 8, flexWrap: "wrap" } }>
              <Pill color={ C.green }><Flame size={ 10 } /> 28-Day Streak</Pill>
              <Pill color={ C.primary }><Star size={ 10 } /> Level 14</Pill>
            </div>
          </div>

          <div className="ca-2col" style={ { display: "grid", gridTemplateColumns: "1fr 1fr" } }>
            {/* Left */ }
            <div style={ { padding: 20, borderRight: `1px solid ${ C.border }` } }>
              <div className="ca-2col" style={ { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 } }>
                { [
                  { l: "Total XP", v: "12,450", icon: <Zap size={ 14 } color={ C.amber } />, color: C.amber, sub: "+340 this week" },
                  { l: "Battles Won", v: "87", icon: <Sword size={ 14 } color={ C.pink } />, color: C.pink, sub: "72% win rate" },
                  { l: "Lessons Done", v: "134", icon: <BookOpen size={ 14 } color={ C.accent } />, color: C.accent, sub: "of 500 total" },
                  { l: "Global Rank", v: "#432", icon: <Trophy size={ 14 } color={ C.primary } />, color: C.primary, sub: "↑ 58 places" },
                ].map( ( m, i ) => (
                  <div key={ i } style={ { background: "rgba(255,255,255,.03)", border: `1px solid ${ C.border }`, borderRadius: 11, padding: "12px 14px" } }>
                    <div style={ { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 } }><span style={ { fontSize: 10, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em" } }>{ m.l }</span>{ m.icon }</div>
                    <div style={ { fontSize: 22, fontWeight: 800, color: m.color, marginBottom: 3 } }>{ m.v }</div>
                    <div style={ { fontSize: 10, color: C.muted } }>{ m.sub }</div>
                  </div>
                ) ) }
              </div>
              <div style={ { background: "rgba(255,255,255,.02)", border: `1px solid ${ C.border }`, borderRadius: 11, padding: "14px 16px" } }>
                <div style={ { fontSize: 11, color: C.muted, fontWeight: 600, marginBottom: 12 } }>Language Proficiency</div>
                <div style={ { display: "flex", gap: 8, alignItems: "flex-end", height: 72 } }>
                  { bars.map( ( b, i ) => (
                    <div key={ i } style={ { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 } }>
                      <div style={ { fontSize: 8, color: C.muted } }>{ b.val }%</div>
                      <div style={ { width: "100%", height: `${ b.val * .6 }px`, borderRadius: "3px 3px 0 0", background: `linear-gradient(180deg,${ b.color },${ b.color }70)` } } />
                      <div style={ { fontSize: 9, color: C.muted } }>{ b.lang }</div>
                    </div>
                  ) ) }
                </div>
              </div>
            </div>
            {/* Right */ }
            <div style={ { padding: 20 } }>
              <div style={ { fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 14 } }>Recent Activity</div>
              { activity.map( ( a, i ) => (
                <div key={ i } style={ { display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: i < 3 ? `1px solid ${ C.border }` : "none" } }>
                  <div style={ { width: 30, height: 30, borderRadius: 7, background: "rgba(255,255,255,.04)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } }>{ a.icon }</div>
                  <div style={ { flex: 1, minWidth: 0 } }>
                    <div style={ { fontSize: 12, color: C.text, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }>{ a.text }</div>
                    <div style={ { fontSize: 10, color: C.muted, marginTop: 1 } }>{ a.time }</div>
                  </div>
                  <div style={ { fontSize: 11, fontWeight: 700, color: C.green, flexShrink: 0 } }>{ a.xp }</div>
                </div>
              ) ) }
              <div style={ { marginTop: 16, background: "rgba(255,255,255,.02)", border: `1px solid ${ C.border }`, borderRadius: 11, padding: "12px 14px" } }>
                <div style={ { fontSize: 10, color: C.muted, fontWeight: 600, marginBottom: 8 } }>Coding Activity — Last 28 days</div>
                <div style={ { display: "flex", gap: 3, flexWrap: "wrap" } }>
                  { Array.from( { length: 28 }, ( _, i ) => {
                    const r = Math.random();
                    return <div key={ i } style={ { width: 12, height: 12, borderRadius: 2, background: r > .7 ? C.primary : r > .4 ? `${ C.primary }55` : "rgba(255,255,255,.07)" } } />;
                  } ) }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FEATURES ───────────────────────────────────────── */
function Features() {
  const items = [
    { icon: <Sword size={ 20 } />, title: "Live Battle Arena", desc: "Real-time 1v1 or team coding battles. Earn XP, climb leaderboards, and sharpen your skills under competitive pressure.", color: C.pink },
    { icon: <Brain size={ 20 } />, title: "Triple AI Mentor", desc: "Claude, ChatGPT & Gemini explain concepts, review code, and give personalized hints — like having 3 expert tutors.", color: C.amber },
    { icon: <BookOpen size={ 20 } />, title: "500+ Structured Lessons", desc: "Curated curriculum from absolute beginner to advanced. Each lesson builds logically with real examples and exercises.", color: C.accent },
    { icon: <Trophy size={ 20 } />, title: "Weekly Tournaments", desc: "Weekly coding competitions with global rankings. Serious practice against thousands of developers worldwide.", color: C.primary },
    { icon: <BarChart2 size={ 20 } />, title: "Progress Analytics", desc: "AI-powered dashboard tracks skill gaps, speed, accuracy, and improvement areas with actionable insights.", color: C.green },
    { icon: <Users size={ 20 } />, title: "50K+ Dev Community", desc: "Ask questions, share projects, find teammates. A thriving, helpful, non-toxic developer community.", color: C.violet },
    { icon: <Award size={ 20 } />, title: "Verified Certificates", desc: "Earn recognized certificates on completion, shareable directly to LinkedIn and your professional resume.", color: C.pink },
    { icon: <Target size={ 20 } />, title: "Interview Prep Mode", desc: "Dedicated FAANG-style prep with time-limited challenges, mock interviews, and detailed performance reviews.", color: C.amber },
    { icon: <GitBranch size={ 20 } />, title: "Project-Based Learning", desc: "Build real projects at the end of each course. Create a portfolio that actually shows employers what you can do.", color: C.accent },
  ];
  return (
    <section id="features" style={ { padding: "90px 20px", background: C.bg } }>
      <div style={ { maxWidth: 1100, margin: "0 auto" } }>
        <div style={ { textAlign: "center", marginBottom: 52 } }>
          <SLabel color={ C.primary }><Layers size={ 10 } /> Platform Features</SLabel>
          <H2 style={ { marginBottom: 14 } }>Everything You Need to<br /><GradText>Become a Great Developer</GradText></H2>
          <p style={ { color: C.muted, fontSize: 16, maxWidth: 500, margin: "0 auto" } }>Built by developers who know what's needed to level up — not just theory, but real, applicable skills.</p>
        </div>
        <div className="ca-3col" style={ { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 } }>
          { items.map( ( f, i ) => (
            <div key={ i } className="ca-card" style={ { background: C.card, border: `1px solid ${ C.border }`, borderRadius: 14, padding: 24 } }
              onMouseEnter={ e => e.currentTarget.style.borderColor = `${ f.color }50` }
              onMouseLeave={ e => e.currentTarget.style.borderColor = C.border }>
              <div style={ { width: 40, height: 40, borderRadius: 10, marginBottom: 16, background: `${ f.color }12`, border: `1px solid ${ f.color }22`, display: "flex", alignItems: "center", justifyContent: "center", color: f.color } }>{ f.icon }</div>
              <h3 style={ { fontSize: 15, fontWeight: 700, marginBottom: 8, color: C.text } }>{ f.title }</h3>
              <p style={ { fontSize: 13, color: C.muted, lineHeight: 1.7 } }>{ f.desc }</p>
            </div>
          ) ) }
        </div>
      </div>
    </section>
  );
}

/* ── LANGUAGES ──────────────────────────────────────── */
function Languages() {
  const [ hov, setHov ] = useState( null );
  const langs = [
    { name: "JavaScript", icon: <Code2 size={ 20 } />, color: "#f7df1e", lessons: 50, lvl: "Beginner → Pro" },
    { name: "Python", icon: <Terminal size={ 20 } />, color: "#3776ab", lessons: 45, lvl: "Beginner → Pro" },
    { name: "Java", icon: <Cpu size={ 20 } />, color: "#f89820", lessons: 40, lvl: "Intermediate" },
    { name: "C++", icon: <Zap size={ 20 } />, color: "#00599c", lessons: 35, lvl: "Intermediate" },
    { name: "TypeScript", icon: <Layers size={ 20 } />, color: "#3178c6", lessons: 40, lvl: "Intermediate" },
    { name: "Rust", icon: <Shield size={ 20 } />, color: "#ce422b", lessons: 28, lvl: "Advanced" },
    { name: "Go", icon: <Activity size={ 20 } />, color: "#00add8", lessons: 30, lvl: "Intermediate" },
    { name: "SQL", icon: <Database size={ 20 } />, color: "#f29111", lessons: 25, lvl: "Beginner → Pro" },
    { name: "C", icon: <GitBranch size={ 20 } />, color: "#a8b9cc", lessons: 30, lvl: "Intermediate" },
    { name: "HTML/CSS", icon: <Globe size={ 20 } />, color: "#e34f26", lessons: 35, lvl: "Beginner" },
  ];
  return (
    <section id="languages" style={ { padding: "90px 20px", background: C.surface } }>
      <div style={ { maxWidth: 1100, margin: "0 auto" } }>
        <div style={ { textAlign: "center", marginBottom: 52 } }>
          <SLabel color={ C.accent }><Globe size={ 10 } /> 10 Languages</SLabel>
          <H2 style={ { marginBottom: 14 } }>Choose Your Language,<br /><GradText>Start in Minutes</GradText></H2>
          <p style={ { color: C.muted, fontSize: 16, maxWidth: 500, margin: "0 auto" } }>Every language has a complete structured curriculum from beginner to advanced. All free.</p>
        </div>
        <div className="ca-5col" style={ { display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 13 } }>
          { langs.map( ( l, i ) => (
            <div key={ i } className="ca-card" style={ {
              background: hov === i ? `${ l.color }0b` : C.card,
              border: `1px solid ${ hov === i ? l.color + "40" : C.border }`,
              borderRadius: 13, padding: "20px 14px", textAlign: "center", cursor: "pointer", transition: "all .24s",
            } }
              onMouseEnter={ () => setHov( i ) } onMouseLeave={ () => setHov( null ) }>
              <div style={ { width: 44, height: 44, borderRadius: 11, margin: "0 auto 11px", background: hov === i ? `${ l.color }1c` : "rgba(255,255,255,.05)", border: `1px solid ${ hov === i ? l.color + "45" : "transparent" }`, display: "flex", alignItems: "center", justifyContent: "center", color: l.color, transition: "all .24s" } }>{ l.icon }</div>
              <div style={ { fontWeight: 700, fontSize: 13, marginBottom: 4, color: C.text } }>{ l.name }</div>
              <div style={ { fontSize: 11, color: C.muted, marginBottom: hov === i ? 8 : 0 } }>{ l.lessons } Lessons</div>
              { hov === i && <Pill color={ l.color }>{ l.lvl }</Pill> }
            </div>
          ) ) }
        </div>
      </div>
    </section>
  );
}

/* ── BATTLE ─────────────────────────────────────────── */
function Battle() {
  const [ p1, setP1 ] = useState( 72 );
  const [ p2, setP2 ] = useState( 58 );
  useEffect( () => {
    const t = setInterval( () => {
      setP1( v => Math.min( 99, v + ( Math.random() > .6 ? 2 : 0 ) ) );
      setP2( v => Math.min( 99, v + ( Math.random() > .7 ? 2 : 0 ) ) );
    }, 800 );
    return () => clearInterval( t );
  }, [] );
  return (
    <section id="battle" style={ { padding: "90px 20px", background: C.bg } }>
      <div style={ { maxWidth: 1100, margin: "0 auto" } }>
        <div className="ca-2col" style={ { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" } }>
          <div>
            <SLabel color={ C.pink }><Sword size={ 10 } /> Battle Arena</SLabel>
            <H2 style={ { marginBottom: 18 } }>Compete. Learn.<br /><GradText>Rise Through the Ranks.</GradText></H2>
            <p style={ { color: C.muted, fontSize: 15, lineHeight: 1.8, marginBottom: 26 } }>
              Real-time coding battles where you and an opponent solve the same problem. Fastest correct solution wins. It's the most effective way to build real coding instincts.
            </p>
            { [
              { icon: <Sword size={ 15 } />, t: "1v1 Duels", d: "Head-to-head battles, any language", c: C.pink },
              { icon: <Users size={ 15 } />, t: "Team Battles", d: "2v2, 3v3 team competitions", c: C.accent },
              { icon: <Trophy size={ 15 } />, t: "Weekly Tournaments", d: "Compete for rankings & recognition", c: C.amber },
              { icon: <Brain size={ 15 } />, t: "vs AI Mode", d: "Practice battles against AI opponents", c: C.primary },
            ].map( ( b, i ) => (
              <div key={ i } style={ { display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 } }>
                <div style={ { width: 34, height: 34, borderRadius: 9, background: `${ b.c }12`, border: `1px solid ${ b.c }22`, display: "flex", alignItems: "center", justifyContent: "center", color: b.c, flexShrink: 0, marginTop: 2 } }>{ b.icon }</div>
                <div>
                  <div style={ { fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 2 } }>{ b.t }</div>
                  <div style={ { fontSize: 12, color: C.muted } }>{ b.d }</div>
                </div>
              </div>
            ) ) }
          </div>

          <div style={ { background: C.card, border: `1px solid ${ C.border }`, borderRadius: 18, overflow: "hidden" } }>
            <div style={ { padding: "11px 16px", borderBottom: `1px solid ${ C.border }`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 } }>
              <div style={ { display: "flex", alignItems: "center", gap: 8 } }>
                <div style={ { width: 7, height: 7, borderRadius: "50%", background: C.pink, animation: "ping .9s ease-out infinite" } } />
                <span style={ { fontSize: 12, color: C.text, fontWeight: 600 } }>Live Battle #2847</span>
              </div>
              <Pill color={ C.pink }><Clock size={ 9 } /> 03:48</Pill>
            </div>
            <div style={ { padding: "14px 16px", borderBottom: `1px solid ${ C.border }` } }>
              <div style={ { fontSize: 10, color: C.muted, fontWeight: 600, marginBottom: 5 } }>PROBLEM</div>
              <div style={ { fontSize: 14, color: C.text, fontWeight: 600, marginBottom: 4 } }>Two Sum</div>
              <div style={ { fontSize: 12, color: C.muted, lineHeight: 1.5 } }>Given an array of integers, return indices of the two numbers that add up to target.</div>
            </div>
            { [ { name: "CodeMasterX", flag: "🇮🇳", p: p1, c: C.accent, s: "Typing…" }, { name: "AlgoQueen", flag: "🇺🇸", p: p2, c: C.pink, s: "Testing…" } ].map( ( pl, i ) => (
              <div key={ i } style={ { padding: "13px 16px", borderBottom: i === 0 ? `1px solid ${ C.border }` : "none" } }>
                <div style={ { display: "flex", alignItems: "center", gap: 9, marginBottom: 9 } }>
                  <div style={ { width: 30, height: 30, borderRadius: 7, background: `${ pl.c }1c`, border: `1px solid ${ pl.c }38`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, color: pl.c } }>{ pl.name[ 0 ] }</div>
                  <div style={ { flex: 1 } }>
                    <div style={ { fontSize: 13, fontWeight: 700, color: C.text } }>{ pl.name } { pl.flag }</div>
                    <div style={ { fontSize: 10, color: C.muted } }>{ pl.s }</div>
                  </div>
                  <div style={ { fontSize: 12, fontWeight: 700, color: pl.c } }>{ pl.p }%</div>
                </div>
                <div style={ { background: "rgba(255,255,255,.06)", borderRadius: 5, height: 5 } }>
                  <div style={ { height: "100%", width: `${ pl.p }%`, borderRadius: 5, background: `linear-gradient(90deg,${ pl.c },${ pl.c }80)`, transition: "width .4s ease" } } />
                </div>
              </div>
            ) ) }
            <div style={ { padding: "12px 16px", textAlign: "center" } }>
              <Btn variant="primary" style={ { fontSize: 13, padding: "9px 22px" } }><Sword size={ 13 } /> Join Battle</Btn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── LEADERBOARD ────────────────────────────────────── */
function Leaderboard() {
  const [ tab, setTab ] = useState( 0 );
  const leaders = [
    { r: 1, name: "CodeMasterX", c: "IN", xp: 48250, wins: 847, streak: 45 },
    { r: 2, name: "AlgoQueen", c: "US", xp: 41200, wins: 723, streak: 38 },
    { r: 3, name: "PyWarrior", c: "GB", xp: 38900, wins: 691, streak: 29 },
    { r: 4, name: "RustNinja", c: "CA", xp: 32100, wins: 634, streak: 25 },
    { r: 5, name: "JSDevil", c: "DE", xp: 28700, wins: 589, streak: 22 },
  ];
  const rankColor = ( r ) => r === 1 ? C.amber : r === 2 ? "#94a3b8" : r === 3 ? "#b45309" : C.muted;
  return (
    <section style={ { padding: "90px 20px", background: C.surface } }>
      <div style={ { maxWidth: 800, margin: "0 auto" } }>
        <div style={ { textAlign: "center", marginBottom: 48 } }>
          <SLabel color={ C.amber }><Trophy size={ 10 } /> Leaderboard</SLabel>
          <H2 style={ { marginBottom: 14 } }>Top <GradText>Code Warriors</GradText></H2>
        </div>
        <div style={ { background: C.card, border: `1px solid ${ C.border }`, borderRadius: 18, overflow: "hidden" } }>
          <div style={ { padding: "14px 22px", borderBottom: `1px solid ${ C.border }`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 } }>
            <div style={ { display: "flex", alignItems: "center", gap: 8 } }><Trophy size={ 16 } color={ C.amber } /><span style={ { fontWeight: 700, fontSize: 14 } }>Global Rankings</span></div>
            <div style={ { display: "flex", gap: 5 } }>
              { [ "All Time", "This Week", "Today" ].map( ( t, i ) => (
                <button key={ t } onClick={ () => setTab( i ) } style={ { padding: "5px 13px", borderRadius: 7, fontSize: 11, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "inherit", background: tab === i ? C.primary : "rgba(255,255,255,.06)", color: tab === i ? "#fff" : C.muted, transition: "all .2s" } }>{ t }</button>
              ) ) }
            </div>
          </div>
          <div style={ { display: "grid", gridTemplateColumns: "44px 1fr 80px 70px 70px", gap: 8, padding: "8px 22px", borderBottom: `1px solid ${ C.border }` } }>
            { [ "#", "Developer", "XP", "Wins", "Streak" ].map( ( h, i ) => (
              <div key={ i } style={ { fontSize: 10, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", textAlign: i > 1 ? "right" : "left" } }>{ h }</div>
            ) ) }
          </div>
          { leaders.map( ( l, i ) => (
            <div key={ i } style={ { display: "grid", gridTemplateColumns: "44px 1fr 80px 70px 70px", gap: 8, padding: "13px 22px", borderBottom: i < 4 ? `1px solid ${ C.border }` : "none", background: i === 0 ? `${ C.amber }05` : "transparent", transition: "background .2s", cursor: "pointer", alignItems: "center" } }
              onMouseEnter={ e => e.currentTarget.style.background = "rgba(255,255,255,.03)" }
              onMouseLeave={ e => e.currentTarget.style.background = i === 0 ? `${ C.amber }05` : "transparent" }>
              <div style={ { display: "flex", justifyContent: "center" } }>
                <Trophy size={ 14 } color={ rankColor( l.r ) } />
              </div>
              <div style={ { display: "flex", alignItems: "center", gap: 10, minWidth: 0 } }>
                <div style={ { width: 34, height: 34, borderRadius: 8, flexShrink: 0, background: i === 0 ? `linear-gradient(135deg,${ C.amber },#d97706)` : C.primaryDim, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, color: i === 0 ? "#000" : C.text } }>{ l.name[ 0 ] }</div>
                <div style={ { minWidth: 0 } }>
                  <div style={ { fontWeight: 700, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }>{ l.name }</div>
                  <div style={ { fontSize: 10, color: C.muted } }>🌍 { l.c }</div>
                </div>
              </div>
              <div style={ { textAlign: "right", fontWeight: 700, fontSize: 13, color: i === 0 ? C.amber : C.text } }>{ l.xp.toLocaleString() }</div>
              <div style={ { textAlign: "right", fontSize: 12, color: C.subtle } }>{ l.wins }</div>
              <div style={ { textAlign: "right", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 3 } }>
                <Flame size={ 11 } color={ C.amber } /><span style={ { fontSize: 12, color: C.amber, fontWeight: 700 } }>{ l.streak }d</span>
              </div>
            </div>
          ) ) }
          <div style={ { padding: "13px 22px", textAlign: "center", borderTop: `1px solid ${ C.border }` } }>
            <Btn variant="outline" style={ { fontSize: 12, padding: "8px 20px" } }>View Full Leaderboard <ChevronRight size={ 13 } /></Btn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── ROADMAP ────────────────────────────────────────── */
function Roadmap() {
  const steps = [
    { n: "01", title: "Pick a Language", desc: "Choose from 10 languages. Python recommended for beginners.", icon: <Target size={ 16 } />, color: C.green },
    { n: "02", title: "Learn the Basics", desc: "Variables, control flow, functions — the building blocks explained simply.", icon: <BookOpen size={ 16 } />, color: C.accent },
    { n: "03", title: "Practice with AI", desc: "Get stuck? Ask Claude AI, ChatGPT, or Gemini for instant help.", icon: <Brain size={ 16 } />, color: C.amber },
    { n: "04", title: "Solve Challenges", desc: "Progressively harder problems after each lesson. Build problem-solving instincts.", icon: <Code2 size={ 16 } />, color: C.primary },
    { n: "05", title: "Enter the Arena", desc: "Live battles against real developers. Learn 10x faster under pressure.", icon: <Sword size={ 16 } />, color: C.pink },
    { n: "06", title: "Land the Job", desc: "Certificates, portfolio, interview prep. Your coding career starts here.", icon: <Trophy size={ 16 } />, color: C.violet },
  ];
  return (
    <section style={ { padding: "90px 20px", background: C.bg } }>
      <div style={ { maxWidth: 880, margin: "0 auto" } }>
        <div style={ { textAlign: "center", marginBottom: 60 } }>
          <SLabel color={ C.primary }><TrendingUp size={ 10 } /> Learning Path</SLabel>
          <H2 style={ { marginBottom: 14 } }>Zero to Hired in<br /><GradText>6 Clear Steps</GradText></H2>
        </div>
        <div style={ { position: "relative" } }>
          <div style={ { position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom,transparent,${ C.primary }50,transparent)`, transform: "translateX(-50%)" } } className="ca-roadmap-dot" />
          { steps.map( ( s, i ) => (
            <div key={ i } className="ca-roadmap" style={ { display: "flex", alignItems: "center", gap: 0, marginBottom: 28, flexDirection: i % 2 === 0 ? "row" : "row-reverse" } }>
              <div style={ { flex: 1, padding: "0 24px", textAlign: i % 2 === 0 ? "right" : "left" } }>
                <div className="ca-card" style={ { display: "inline-block", background: C.card, border: `1px solid ${ C.border }`, borderRadius: 14, padding: "18px 22px", maxWidth: 320 } }>
                  <div style={ { fontSize: 10, color: s.color, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 5 } }>Step { s.n }</div>
                  <div style={ { fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 5 } }>{ s.title }</div>
                  <div style={ { fontSize: 12, color: C.muted, lineHeight: 1.65 } }>{ s.desc }</div>
                </div>
              </div>
              <div className="ca-roadmap-dot" style={ { width: 40, height: 40, borderRadius: "50%", flexShrink: 0, zIndex: 1, background: `linear-gradient(135deg,${ s.color },${ s.color }80)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", boxShadow: `0 0 0 4px ${ C.bg },0 0 0 5px ${ s.color }40` } }>{ s.icon }</div>
              <div className="ca-roadmap-spacer" style={ { flex: 1 } } />
            </div>
          ) ) }
        </div>
      </div>
    </section>
  );
}

/* ── TESTIMONIALS ───────────────────────────────────── */
function Testimonials() {
  const reviews = [
    { name: "Arjun Sharma", role: "SDE @ Amazon", text: "The battle mode changed how I think about coding under pressure. Got my Amazon offer 3 months after competing here consistently.", r: 5 },
    { name: "Priya Singh", role: "CS Student, IIT Delhi", text: "Claude AI explains concepts better than any textbook. I asked it to explain dynamic programming 5 different ways until it clicked.", r: 5 },
    { name: "Rahul Dev", role: "Freelance Developer", text: "Went from zero to full-stack projects in 8 months. The structured roadmap kept me from getting lost.", r: 5 },
    { name: "Ananya Patel", role: "Backend Engineer", text: "Free and genuinely better than paid platforms I've tried. The community is extremely helpful and non-toxic.", r: 5 },
  ];
  const cos = [ "Google", "Amazon", "Microsoft", "Meta", "Flipkart", "Razorpay", "Atlassian", "Stripe" ];
  return (
    <section style={ { padding: "90px 20px", background: C.surface } }>
      <div style={ { maxWidth: 1100, margin: "0 auto" } }>
        <div style={ { textAlign: "center", marginBottom: 52 } }>
          <SLabel color={ C.violet }><Star size={ 10 } /> Testimonials</SLabel>
          <H2 style={ { marginBottom: 14 } }>Developers Who<br /><GradText>Leveled Up with CodeArena</GradText></H2>
        </div>
        <div className="ca-2col" style={ { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16, marginBottom: 48 } }>
          { reviews.map( ( r, i ) => (
            <div key={ i } className="ca-card" style={ { background: C.card, border: `1px solid ${ C.border }`, borderRadius: 14, padding: 24 } }>
              <div style={ { display: "flex", gap: 2, marginBottom: 14 } }>{ Array.from( { length: r.r } ).map( ( _, j ) => <Star key={ j } size={ 13 } fill={ C.amber } color={ C.amber } /> ) }</div>
              <p style={ { fontSize: 14, color: C.text, lineHeight: 1.78, marginBottom: 18, fontStyle: "italic" } }>"{ r.text }"</p>
              <div style={ { display: "flex", alignItems: "center", gap: 10 } }>
                <div style={ { width: 36, height: 36, borderRadius: 9, background: `linear-gradient(135deg,${ C.primary },${ C.pink })`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14 } }>{ r.name[ 0 ] }</div>
                <div>
                  <div style={ { fontWeight: 700, fontSize: 13, color: C.text } }>{ r.name }</div>
                  <div style={ { fontSize: 11, color: C.muted } }>{ r.role }</div>
                </div>
              </div>
            </div>
          ) ) }
        </div>
        <div style={ { textAlign: "center" } }>
          <div style={ { fontSize: 11, color: C.muted, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 20 } }>Our learners work at</div>
          <div style={ { display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" } }>
            { cos.map( c => (
              <div key={ c } style={ { padding: "7px 18px", background: "rgba(255,255,255,.04)", border: `1px solid ${ C.border }`, borderRadius: 9, fontSize: 12, fontWeight: 600, color: C.muted } }>{ c }</div>
            ) ) }
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── PRICING ────────────────────────────────────────── */
function Pricing() {
  const feats = [ "500+ Lessons", "10 Programming Languages", "Claude AI + ChatGPT + Gemini", "Live Battle Arena", "Weekly Tournaments", "Global Leaderboard", "Progress Dashboard", "Verified Certificate", "Developer Community", "Daily Challenges", "Interview Prep Mode", "Project-Based Courses" ];
  return (
    <section id="pricing" style={ { padding: "90px 20px", background: C.bg } }>
      <div style={ { maxWidth: 660, margin: "0 auto" } }>
        <div style={ { textAlign: "center", marginBottom: 48 } }>
          <SLabel color={ C.green }><Shield size={ 10 } /> Pricing</SLabel>
          <H2 style={ { marginBottom: 14 } }><GradText>Completely Free.</GradText><br />No Catch. Ever.</H2>
          <p style={ { color: C.muted, fontSize: 16 } }>No subscription. No paywall. No freemium tricks. Every single feature is free — because great education should be accessible to everyone.</p>
        </div>
        <div style={ { background: C.card, border: `2px solid ${ C.primary }`, borderRadius: 22, overflow: "hidden", boxShadow: `0 0 60px rgba(99,102,241,.12)` } }>
          <div style={ { padding: "30px 36px", borderBottom: `1px solid ${ C.border }`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 } }>
            <div>
              <div style={ { fontSize: 11, color: C.muted, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 5 } }>CodeArena Plan</div>
              <div style={ { fontSize: 52, fontWeight: 900, color: C.text, letterSpacing: "-2px", lineHeight: 1 } }>₹0</div>
              <div style={ { fontSize: 13, color: C.muted, marginTop: 5 } }>Forever free · No credit card needed</div>
            </div>
            <Btn variant="primary" style={ { fontSize: 15, padding: "13px 32px" } }><UserPlus size={ 16 } /> Create Free Account</Btn>
          </div>
          <div style={ { padding: "28px 36px" } }>
            <div style={ { fontSize: 11, color: C.muted, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 18 } }>Everything Included</div>
            <div className="ca-2col" style={ { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "9px 18px" } }>
              { feats.map( ( f, i ) => (
                <div key={ i } style={ { display: "flex", alignItems: "center", gap: 9, fontSize: 13, color: C.text } }>
                  <Check size={ 14 } color={ C.green } style={ { flexShrink: 0 } } /> { f }
                </div>
              ) ) }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ────────────────────────────────────────────── */
function FAQ() {
  const [ open, setOpen ] = useState( null );
  const faqs = [
    { q: "Is CodeArena actually free?", a: "Yes, 100% free. No hidden fees, no premium tier, no credit card required. Every lesson, battle, certificate, and AI feature is free for everyone, always." },
    { q: "Do I need prior coding experience?", a: "Not at all. Our roadmap starts from absolute zero. If you've never written a single line of code, you're in the right place." },
    { q: "Which language should I start with?", a: "Python is the best first language — clean, readable, and widely used. For web development, start with HTML/CSS then JavaScript." },
    { q: "How do the AI mentors work?", a: "During any lesson or challenge, open the AI panel and ask Claude AI, ChatGPT, or Gemini for help. They explain concepts, debug code, and give hints — in real time." },
    { q: "What is the Battle Arena?", a: "Real-time competitive coding where you solve the same problem as an opponent. Fastest correct solution wins XP and ranking points. It's addictive and highly effective." },
    { q: "Will I get a certificate?", a: "Yes. Each completed course generates a verifiable digital certificate with a unique ID, shareable on LinkedIn or to employers." },
  ];
  return (
    <section id="faq" style={ { padding: "90px 20px", background: C.surface } }>
      <div style={ { maxWidth: 700, margin: "0 auto" } }>
        <div style={ { textAlign: "center", marginBottom: 52 } }>
          <SLabel color={ C.accent }><MessageSquare size={ 10 } /> FAQ</SLabel>
          <H2>Common Questions</H2>
        </div>
        <div style={ { display: "flex", flexDirection: "column", gap: 9 } }>
          { faqs.map( ( f, i ) => (
            <div key={ i } style={ { background: C.card, border: `1px solid ${ open === i ? C.primary : C.border }`, borderRadius: 13, overflow: "hidden", transition: "border-color .2s" } }>
              <button onClick={ () => setOpen( open === i ? null : i ) }
                style={ { width: "100%", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 14 } }>
                <span style={ { fontSize: 14, fontWeight: 600, color: C.text, fontFamily: "inherit" } }>{ f.q }</span>
                <ChevronDown size={ 15 } color={ C.muted } style={ { flexShrink: 0, transform: open === i ? "rotate(180deg)" : "none", transition: "transform .2s" } } />
              </button>
              { open === i && (
                <div style={ { padding: "0 20px 16px", fontSize: 13, color: C.muted, lineHeight: 1.75, borderTop: `1px solid ${ C.border }`, paddingTop: 13 } }>{ f.a }</div>
              ) }
            </div>
          ) ) }
        </div>
      </div>
    </section>
  );
}

/* ── FINAL CTA ──────────────────────────────────────── */
function FinalCTA() {
  return (
    <section style={ { padding: "90px 20px", background: C.bg } }>
      <div style={ { maxWidth: 760, margin: "0 auto", textAlign: "center" } }>
        <div style={ { background: "linear-gradient(135deg,rgba(99,102,241,.1),rgba(244,63,94,.06),rgba(6,182,212,.08))", border: `1px solid rgba(99,102,241,.22)`, borderRadius: 24, padding: "64px 36px", position: "relative", overflow: "hidden" } }>
          <div style={ { position: "absolute", top: -50, left: "30%", width: 280, height: 280, borderRadius: "50%", background: `radial-gradient(circle,rgba(99,102,241,.1),transparent 65%)`, pointerEvents: "none" } } />
          <Sword size={ 36 } color={ C.primary } style={ { marginBottom: 20 } } />
          <H2 style={ { marginBottom: 14 } }>Ready to Start Your<br /><GradText>Coding Journey?</GradText></H2>
          <p style={ { fontSize: 16, color: C.muted, marginBottom: 32, maxWidth: 460, margin: "0 auto 32px", lineHeight: 1.75 } }>
            Join 52,000+ developers learning, battling, and growing on CodeArena — completely free, right now.
          </p>
          <div style={ { display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 22 } }>
            <Btn variant="primary" style={ { fontSize: 15, padding: "13px 32px" } }><UserPlus size={ 16 } /> Create Free Account</Btn>
            <Btn variant="outline" style={ { fontSize: 15, padding: "13px 32px" } }><Play size={ 16 } /> Watch Demo</Btn>
          </div>
          <div style={ { display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" } }>
            { [ "No credit card", "Instant access", "Free forever" ].map( t => (
              <div key={ t } style={ { display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: C.muted } }>
                <Check size={ 12 } color={ C.green } /> { t }
              </div>
            ) ) }
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ─────────────────────────────────────────── */
function Footer() {
  const cols = [
    { title: "Platform", links: [ "Courses", "Battle Arena", "Leaderboard", "AI Mentor", "Certificates" ] },
    { title: "Languages", links: [ "Python", "JavaScript", "Java", "C++", "TypeScript" ] },
    { title: "Company", links: [ "About", "Blog", "Careers", "Contact", "Privacy" ] },
    { title: "Community", links: [ "Discord", "Forum", "GitHub", "Twitter", "YouTube" ] },
  ];
  return (
    <footer style={ { background: C.surface, borderTop: `1px solid ${ C.border }`, padding: "56px 20px 28px" } }>
      <div style={ { maxWidth: 1100, margin: "0 auto" } }>
        <div className="ca-footer-grid" style={ { display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 36, marginBottom: 44 } }>
          <div>
            <div style={ { display: "flex", alignItems: "center", gap: 9, marginBottom: 14 } }>
              <div style={ { width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg,${ C.primary },${ C.pink })`, display: "flex", alignItems: "center", justifyContent: "center" } }>
                <Sword size={ 15 } color="#fff" />
              </div>
              <span style={ { fontWeight: 800, fontSize: 17, letterSpacing: "-.5px" } }>Code<span style={ { color: C.accent } }>Arena</span></span>
            </div>
            <p style={ { fontSize: 13, color: C.muted, lineHeight: 1.8, maxWidth: 240, marginBottom: 18 } }>
              The world's most advanced free coding platform. Battle, learn, and grow — together.
            </p>
            <div style={ { display: "flex", gap: 7 } }>
              { [ <Twitter size={ 15 } />, <Github size={ 15 } />, <Linkedin size={ 15 } />, <Youtube size={ 15 } /> ].map( ( ic, i ) => (
                <div key={ i } className="ca-link" style={ { width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,.05)", border: `1px solid ${ C.border }`, display: "flex", alignItems: "center", justifyContent: "center", color: C.muted, cursor: "pointer" } }>{ ic }</div>
              ) ) }
            </div>
          </div>
          { cols.map( ( col, i ) => (
            <div key={ i }>
              <div style={ { fontWeight: 700, fontSize: 12, color: C.text, marginBottom: 14, textTransform: "uppercase", letterSpacing: ".06em" } }>{ col.title }</div>
              { col.links.map( l => (
                <div key={ l } className="ca-link" style={ { fontSize: 13, color: C.muted, marginBottom: 9 } }>{ l }</div>
              ) ) }
            </div>
          ) ) }
        </div>
        <div style={ { borderTop: `1px solid ${ C.border }`, paddingTop: 22, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 } }>
          <div style={ { fontSize: 12, color: C.muted } }>© 2026 CodeArena. Built for developers everywhere.</div>
          <div style={ { display: "flex", gap: 18 } }>
            { [ "Terms", "Privacy", "Cookies" ].map( l => (
              <span key={ l } className="ca-link" style={ { fontSize: 12, color: C.muted } }>{ l }</span>
            ) ) }
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div style={ { background: C.bg, color: C.text, minHeight: "100vh", fontFamily: "'DM Sans',sans-serif" } }>
      <Navbar />
      <Hero />
      <Stats />
      <AIDashboard />
      <AnalyticsDashboard />
      <Features />
      <Languages />
      <Battle />
      <Leaderboard />
      <Roadmap />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}