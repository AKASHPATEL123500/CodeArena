// src/pages/AIChat.jsx
// npm install react-syntax-highlighter react-markdown remark-gfm

import { useState, useRef, useEffect, useCallback, memo } from 'react';
import {
    Send, Sparkles, User, Bot, Loader2,
    Copy, Check, Plus, MessageSquare, ChevronLeft,
    ChevronRight, Code2, Lightbulb, Zap, Menu, X
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// ─── Constants (outside component = no re-render) ─────────────────────────────
const SUGGESTED_PROMPTS = [
    {
        icon: Code2,
        label: 'Portfolio Website',
        prompt: `Build me a COMPLETE portfolio website in a single HTML file using HTML, CSS, JavaScript.

Include ALL of these:
1. Fixed navbar with smooth scroll + mobile hamburger menu
2. Hero — animated typing effect for job title, particle background, CTA buttons
3. About — profile pic placeholder, bio, download resume button
4. Skills — animated progress bars: HTML 95%, CSS 90%, JS 85%, React 80%, Node.js 75%
5. Projects — 3 cards with image, title, description, tech tags, GitHub + Live links, hover flip
6. Contact — styled form (name, email, message) + social icons
7. Footer

Design: dark theme (#0a0a0a bg, #00ff88 accent), Poppins font, glassmorphism cards, scroll animations, fully responsive.

Write the ENTIRE HTML file — every single line. No truncation.`
    },
    {
        icon: Zap,
        label: 'REST API + JWT Auth',
        prompt: `Build a complete Node.js + Express REST API with JWT auth.

Write COMPLETE code for ALL files:
1. server.js — express setup, middleware, routes
2. middleware/auth.js — JWT verify
3. routes/auth.js — register + login
4. routes/users.js — protected CRUD
5. models/User.js — Mongoose schema
6. .env.example

Include: bcrypt, express-validator, refresh tokens, proper error handling, HTTP status codes. Every file complete — no placeholders.`
    },
    {
        icon: Lightbulb,
        label: 'Explain Async/Await',
        prompt: `Explain JavaScript async/await in complete detail — minimum 800 words.

Cover: event loop, callbacks + callback hell, Promises (.then/.catch, Promise.all, Promise.race), async/await syntax + error handling, common mistakes (forgetting await, sequential vs parallel), real examples (API fetch, DB queries, file read), advanced: Promise.allSettled, async iteration, AbortController.

Code example for every single concept.`
    },
    {
        icon: Code2,
        label: 'React Dashboard',
        prompt: `Build a complete React admin dashboard component.

Include: collapsible sidebar with icons, top header with search + notifications + user dropdown, stats cards row (Users/Revenue/Orders/Conversion with % change), SVG line chart for revenue, recent orders table with status badges (paid/pending/failed), dark theme.

Use only useState/useEffect + Tailwind CSS. Make it look like a real SaaS product. Write the COMPLETE component — nothing omitted.`
    },
];

const generateId = () => Math.random().toString( 36 ).slice( 2, 10 );
const getTime = () => new Date().toLocaleTimeString( [], { hour: '2-digit', minute: '2-digit' } );

const makeWelcomeMsg = () => ( {
    id: generateId(),
    role: 'assistant',
    content: `👋 Hey! I'm **CodeArena AI** — your senior dev companion.\n\nI write **complete, production-ready code** — no shortcuts, no truncation. Ask me to build something, explain a concept, or debug your code.`,
    time: getTime(),
} );

const createChat = () => ( {
    id: generateId(),
    title: 'New Chat',
    messages: [ makeWelcomeMsg() ],
    createdAt: Date.now(),
} );

// ─── Auto-resize textarea hook (no re-render on parent) ───────────────────────
function useAutoResize( ref ) {
    const handleInput = useCallback( () => {
        const el = ref.current;
        if ( !el ) return;
        el.style.height = 'auto';
        el.style.height = Math.min( el.scrollHeight, 160 ) + 'px';
    }, [ ref ] );

    useEffect( () => {
        const el = ref.current;
        if ( !el ) return;
        el.addEventListener( 'input', handleInput );
        return () => el.removeEventListener( 'input', handleInput );
    }, [ ref, handleInput ] );
}

// ─── Sidebar (memoized — never re-renders unless props change) ────────────────
const Sidebar = memo( function Sidebar( { chats, activeChatId, onNewChat, onSelectChat, onDeleteChat } ) {
    return (
        <div className="flex flex-col h-full bg-[#0c0c0c]">
            <div className="p-4 border-b border-white/6 flex-shrink-0">
                <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-7 h-7 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-3.5 h-3.5 text-black" />
                    </div>
                    <span className="text-white/80 text-sm font-semibold">CodeArena AI</span>
                </div>
                <button
                    onClick={ onNewChat }
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-white/55 hover:text-white bg-white/4 hover:bg-white/8 border border-white/8 hover:border-white/16 rounded-xl transition-all"
                >
                    <Plus className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    New Chat
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
                { chats.map( chat => (
                    <button
                        key={ chat.id }
                        onClick={ () => onSelectChat( chat.id ) }
                        className={ `w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all group ${ chat.id === activeChatId
                            ? 'bg-white/10 text-white'
                            : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                            }` }
                    >
                        <MessageSquare className={ `w-3.5 h-3.5 flex-shrink-0 ${ chat.id === activeChatId ? 'text-emerald-400' : 'text-white/20' }` } />
                        <span className="flex-1 text-xs truncate">{ chat.title }</span>
                        <span
                            onClick={ ( e ) => onDeleteChat( chat.id, e ) }
                            className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-red-500/20 text-red-400/60 hover:text-red-400 transition-all cursor-pointer flex-shrink-0"
                        >
                            <X className="w-3 h-3" />
                        </span>
                    </button>
                ) ) }
            </div>

            <div className="p-4 border-t border-white/6 flex-shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-white/25 text-xs">OpenRouter API</span>
                </div>
            </div>
        </div>
    );
} );

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AIChat() {
    const [ chats, setChats ] = useState( () => [ createChat() ] );
    const [ activeChatId, setActiveChatId ] = useState( () => chats[ 0 ].id );
    const [ loading, setLoading ] = useState( false );
    const [ sidebarOpen, setSidebarOpen ] = useState( true );
    const [ mobileSidebar, setMobileSidebar ] = useState( false );

    const messagesEndRef = useRef( null );
    const textareaRef = useRef( null );
    const activeChatIdRef = useRef( activeChatId );
    activeChatIdRef.current = activeChatId;

    // ✅ FIX: Auto-resize via DOM event — NOT React state — so no re-render on type
    useAutoResize( textareaRef );

    const activeChat = chats.find( c => c.id === activeChatId );
    const messages = activeChat?.messages || [];
    const showWelcome = messages.length === 1 && messages[ 0 ].role === 'assistant';

    useEffect( () => {
        messagesEndRef.current?.scrollIntoView( { behavior: 'smooth' } );
    }, [ messages ] );



    // ── Send ─────────────────────────────────────────────────────────────────
    const handleSend = useCallback( async ( overrideText ) => {
        const text = ( overrideText ?? textareaRef.current?.value ?? '' ).trim();
        if ( !text || loading ) return;

        const chatId = activeChatIdRef.current;
        const userMsgId = generateId();
        const assistMsgId = generateId();
        const userMsg = { id: userMsgId, role: 'user', content: text, time: getTime() };
        const assistMsg = { id: assistMsgId, role: 'assistant', content: '', time: getTime() };

        const history = ( chats.find( c => c.id === chatId )?.messages || [] )
            .filter( m => m.content )
            .map( m => ( { role: m.role, content: m.content } ) );

        const isFirstUser = history.filter( m => m.role === 'user' ).length === 0;

        if ( textareaRef.current ) {
            textareaRef.current.value = '';
            textareaRef.current.style.height = 'auto';
            textareaRef.current.focus();
        }

        setChats( prev => prev.map( c => c.id !== chatId ? c : {
            ...c,
            title: isFirstUser ? text.slice( 0, 45 ) + ( text.length > 45 ? '…' : '' ) : c.title,
            messages: [ ...c.messages, userMsg, assistMsg ],
        } ) );

        setLoading( true );
        setMobileSidebar( false );

        try {
            const response = await fetch( `${ import.meta.env.VITE_API_URL }/chat-stream`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( {
                    message: text,
                    history,
                    model: 'openai/gpt-3.5-turbo',
                } ),
            } );

            if ( !response.ok ) throw new Error( `Server ${ response.status }` );

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullText = '';

            while ( true ) {
                const { done, value } = await reader.read();
                if ( done ) break;
                fullText += decoder.decode( value, { stream: true } );

                setChats( prev => prev.map( c => c.id !== chatId ? c : {
                    ...c,
                    messages: c.messages.map( m =>
                        m.id === assistMsgId ? { ...m, content: fullText } : m
                    ),
                } ) );
            }
        } catch ( err ) {
            setChats( prev => prev.map( c => c.id !== chatId ? c : {
                ...c,
                messages: c.messages.map( m =>
                    m.id === assistMsgId
                        ? { ...m, content: `❌ **Error:** ${ err.message || 'Could not reach server.' }` }
                        : m
                ),
            } ) );
        } finally {
            setLoading( false );
        }
    }, [ loading, chats ] );


    const handleNewChat = useCallback( () => {
        const chat = createChat();
        setChats( prev => [ chat, ...prev ] );
        setActiveChatId( chat.id );
        setMobileSidebar( false );
        setTimeout( () => textareaRef.current?.focus(), 50 );
    }, [] );

    const handleSelectChat = useCallback( ( chatId ) => {
        setActiveChatId( chatId );
        setMobileSidebar( false );
        setTimeout( () => textareaRef.current?.focus(), 50 );
    }, [] );

    const handleDeleteChat = useCallback( ( chatId, e ) => {
        e.stopPropagation();
        setChats( prev => {
            const rest = prev.filter( c => c.id !== chatId );
            if ( rest.length === 0 ) {
                const fresh = createChat();
                setActiveChatId( fresh.id );
                return [ fresh ];
            }
            if ( chatId === activeChatId ) setActiveChatId( rest[ 0 ].id );
            return rest;
        } );
    }, [ activeChatId ] );

    // ✅ FIX: keydown on textarea directly — not tied to input state
    const handleKeyDown = useCallback( ( e ) => {
        if ( e.key === 'Enter' && !e.shiftKey ) {
            e.preventDefault();
            handleSend();
        }
    }, [ handleSend ] );

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div className="flex h-screen bg-[#111111] overflow-hidden" style={ { fontFamily: 'system-ui, -apple-system, sans-serif' } }>

            {/* Desktop Sidebar */ }
            <div className={ `hidden md:flex flex-col flex-shrink-0 border-r border-white/6 transition-all duration-300 ease-in-out ${ sidebarOpen ? 'w-60' : 'w-0 overflow-hidden border-none' }` }>
                <Sidebar
                    chats={ chats }
                    activeChatId={ activeChatId }
                    onNewChat={ handleNewChat }
                    onSelectChat={ handleSelectChat }
                    onDeleteChat={ handleDeleteChat }
                />
            </div>

            {/* Mobile Sidebar */ }
            { mobileSidebar && (
                <div className="fixed inset-0 z-50 md:hidden flex">
                    <div className="w-64 flex-shrink-0">
                        <Sidebar
                            chats={ chats }
                            activeChatId={ activeChatId }
                            onNewChat={ handleNewChat }
                            onSelectChat={ handleSelectChat }
                            onDeleteChat={ handleDeleteChat }
                        />
                    </div>
                    <div className="flex-1 bg-black/70 backdrop-blur-sm" onClick={ () => setMobileSidebar( false ) } />
                </div>
            ) }

            {/* Main */ }
            <div className="flex-1 flex flex-col min-w-0">

                {/* Header */ }
                <div className="flex items-center gap-3 px-4 py-3 border-b border-white/6 flex-shrink-0 bg-[#111111]">
                    <button onClick={ () => setMobileSidebar( true ) } className="md:hidden text-white/40 hover:text-white p-1.5 rounded-lg hover:bg-white/8 transition-all">
                        <Menu className="w-4 h-4" />
                    </button>
                    <button onClick={ () => setSidebarOpen( p => !p ) } className="hidden md:flex text-white/30 hover:text-white/70 p-1.5 rounded-lg hover:bg-white/6 transition-all">
                        { sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" /> }
                    </button>

                    <div className="flex items-center gap-2 md:hidden flex-shrink-0">
                        <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
                            <Sparkles className="w-3 h-3 text-black" />
                        </div>
                    </div>

                    <h1 className="text-white/55 text-sm truncate flex-1">{ activeChat?.title || 'New Chat' }</h1>

                    <button
                        onClick={ handleNewChat }
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/40 hover:text-white/80 hover:bg-white/8 rounded-lg border border-white/8 hover:border-white/16 transition-all flex-shrink-0"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        <span className="hidden sm:block">New</span>
                    </button>
                </div>

                {/* Messages */ }
                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-3xl mx-auto px-4 py-8">

                        {/* Welcome */ }
                        { showWelcome && (
                            <div className="mb-10">
                                <div className="text-center mb-8">
                                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-emerald-500/15">
                                        <Sparkles className="w-7 h-7 text-black" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-1">What can I build for you?</h2>
                                    <p className="text-white/35 text-sm">Complete code. No shortcuts. Production-ready.</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    { SUGGESTED_PROMPTS.map( ( { icon: Icon, label, prompt } ) => (
                                        <button
                                            key={ label }
                                            onClick={ () => handleSend( prompt ) }
                                            className="flex items-start gap-3 p-4 bg-white/4 hover:bg-white/8 border border-white/8 hover:border-white/16 rounded-xl text-left transition-all group"
                                        >
                                            <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-all mt-0.5">
                                                <Icon className="w-4 h-4 text-emerald-400" />
                                            </div>
                                            <div>
                                                <p className="text-white/75 text-sm font-medium group-hover:text-white transition-colors">{ label }</p>
                                                <p className="text-white/30 text-xs mt-0.5 leading-relaxed">Click to generate complete code</p>
                                            </div>
                                        </button>
                                    ) ) }
                                </div>
                            </div>
                        ) }

                        {/* Messages */ }
                        <div className="space-y-8">
                            { messages.map( msg => (
                                <MessageBubble key={ msg.id } message={ msg } />
                            ) ) }

                            { loading && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Bot className="w-4 h-4 text-black" />
                                    </div>
                                    <div className="flex items-center gap-3 px-4 py-3 bg-white/4 border border-white/8 rounded-2xl rounded-tl-sm">
                                        <div className="flex gap-1">
                                            { [ 0, 120, 240 ].map( d => (
                                                <div key={ d } className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={ { animationDelay: `${ d }ms` } } />
                                            ) ) }
                                        </div>
                                        <span className="text-white/30 text-sm">Writing response…</span>
                                    </div>
                                </div>
                            ) }

                            <div ref={ messagesEndRef } />
                        </div>
                    </div>
                </div>

                {/* Input */ }
                <div className="flex-shrink-0 border-t border-white/6 bg-[#111111]">
                    <div className="max-w-3xl mx-auto px-4 py-4">
                        <div className="relative bg-white/5 border border-white/10 hover:border-white/18 focus-within:border-emerald-500/50 rounded-2xl transition-colors">
                            {/* ✅ FIX: Uncontrolled textarea — value NOT in React state */ }
                            <textarea
                                ref={ textareaRef }
                                onKeyDown={ handleKeyDown }
                                placeholder="Ask me to build something, explain a concept, debug code…"
                                disabled={ loading }
                                rows={ 1 }
                                className="w-full px-5 pt-4 pb-14 bg-transparent text-white/90 placeholder-white/20 text-sm resize-none focus:outline-none leading-relaxed"
                                style={ { maxHeight: '160px' } }
                            />
                            <div className="absolute bottom-3 right-3">
                                <button
                                    onClick={ () => handleSend() }
                                    disabled={ loading }
                                    className={ `w-9 h-9 rounded-xl flex items-center justify-center transition-all ${ !loading
                                        ? 'bg-gradient-to-br from-emerald-400 to-cyan-500 text-black hover:scale-105 shadow-lg shadow-emerald-500/20'
                                        : 'bg-white/6 text-white/20 cursor-not-allowed'
                                        }` }
                                >
                                    { loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" /> }
                                </button>
                            </div>
                        </div>
                        <p className="text-white/12 text-xs text-center mt-2">Enter to send · Shift+Enter for new line</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Message Bubble (memoized) ────────────────────────────────────────────────
const MessageBubble = memo( function MessageBubble( { message } ) {
    const [ copiedBlockId, setCopiedBlockId ] = useState( null );
    const [ msgCopied, setMsgCopied ] = useState( false );
    const isUser = message.role === 'user';
    let blockCounter = 0;

    const copyCode = useCallback( ( code, id ) => {
        navigator.clipboard.writeText( code );
        setCopiedBlockId( id );
        setTimeout( () => setCopiedBlockId( null ), 2000 );
    }, [] );

    const copyMsg = useCallback( () => {
        navigator.clipboard.writeText( message.content );
        setMsgCopied( true );
        setTimeout( () => setMsgCopied( false ), 2000 );
    }, [ message.content ] );

    if ( isUser ) {
        return (
            <div className="flex gap-3 flex-row-reverse">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-4 h-4 text-white" />
                </div>
                <div className="max-w-[78%]">
                    <div className="bg-white/8 border border-white/10 px-5 py-3.5 rounded-2xl rounded-tr-sm">
                        <p className="text-white/85 text-sm leading-relaxed whitespace-pre-wrap">{ message.content }</p>
                    </div>
                    { message.time && <p className="text-white/18 text-xs mt-1 text-right">{ message.time }</p> }
                </div>
            </div>
        );
    }

    return (
        <div className="flex gap-3 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot className="w-4 h-4 text-black" />
            </div>

            <div className="flex-1 min-w-0">
                { message.content ? (
                    <div className="text-sm">
                        <ReactMarkdown
                            remarkPlugins={ [ remarkGfm ] }
                            components={ {
                                h1: ( { node, ...props } ) => <h1 className="text-xl font-bold mt-6 mb-3 text-white border-b border-white/8 pb-2" { ...props } />,
                                h2: ( { node, ...props } ) => <h2 className="text-base font-semibold mt-5 mb-2 text-emerald-300" { ...props } />,
                                h3: ( { node, ...props } ) => <h3 className="text-sm font-semibold mt-4 mb-1.5 text-cyan-300" { ...props } />,
                                p: ( { node, ...props } ) => <p className="mb-3 leading-7 text-white/72" { ...props } />,
                                ul: ( { node, ...props } ) => <ul className="my-3 ml-5 space-y-1.5 text-white/70" { ...props } />,
                                ol: ( { node, ...props } ) => <ol className="my-3 ml-5 space-y-1.5 text-white/70 list-decimal" { ...props } />,
                                li: ( { node, ...props } ) => <li className="leading-7 list-disc marker:text-emerald-400/60" { ...props } />,
                                strong: ( { node, ...props } ) => <strong className="font-semibold text-white/90" { ...props } />,
                                em: ( { node, ...props } ) => <em className="italic text-white/50" { ...props } />,
                                blockquote: ( { node, ...props } ) => <blockquote className="border-l-4 border-emerald-500/40 pl-4 my-4 text-white/45 italic bg-emerald-500/4 py-2 rounded-r-lg" { ...props } />,
                                table: ( { node, ...props } ) => (
                                    <div className="overflow-x-auto my-5 rounded-xl border border-white/8">
                                        <table className="w-full text-sm border-collapse" { ...props } />
                                    </div>
                                ),
                                thead: ( { node, ...props } ) => <thead className="bg-white/5" { ...props } />,
                                th: ( { node, ...props } ) => <th className="px-4 py-2.5 text-white/55 font-medium text-left border-b border-white/8 text-xs uppercase tracking-wider" { ...props } />,
                                td: ( { node, ...props } ) => <td className="px-4 py-2.5 text-white/50 border-b border-white/4" { ...props } />,
                                a: ( { node, href, ...props } ) => <a href={ href } target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors" { ...props } />,
                                hr: () => <hr className="my-6 border-white/8" />,
                                code: ( { node, inline, className, children, ...props } ) => {
                                    const match = /language-(\w+)/.exec( className || '' );
                                    const language = match ? match[ 1 ] : 'text';
                                    const codeString = String( children ).replace( /\n$/, '' );
                                    const isBlock = !inline && ( match || codeString.includes( '\n' ) );

                                    if ( isBlock ) {
                                        const blockId = `b${ ++blockCounter }`;
                                        return (
                                            <div className="my-5 rounded-xl overflow-hidden border border-white/8 shadow-2xl">
                                                <div className="flex items-center justify-between px-4 py-2.5 bg-[#161616] border-b border-white/6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex items-center gap-1.5">
                                                            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                                                            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                                                            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                                                        </div>
                                                        <span className="text-white/30 text-[11px] font-mono uppercase tracking-widest">{ language }</span>
                                                    </div>
                                                    <button
                                                        onClick={ () => copyCode( codeString, blockId ) }
                                                        className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-white/35 hover:text-white/70 hover:bg-white/6 rounded-lg transition-all"
                                                    >
                                                        { copiedBlockId === blockId
                                                            ? <><Check className="w-3 h-3 text-emerald-400" /><span className="text-emerald-400">Copied!</span></>
                                                            : <><Copy className="w-3 h-3" />Copy</>
                                                        }
                                                    </button>
                                                </div>
                                                <SyntaxHighlighter
                                                    language={ language }
                                                    style={ oneDark }
                                                    customStyle={ { margin: 0, padding: '1.2rem 1.5rem', background: '#0e0e0e', fontSize: '0.8rem', lineHeight: '1.75', borderRadius: 0 } }
                                                    showLineNumbers={ codeString.split( '\n' ).length > 5 }
                                                    lineNumberStyle={ { color: '#ffffff10', minWidth: '2.5em', paddingRight: '1.5em', userSelect: 'none', fontSize: '0.72rem' } }
                                                    wrapLongLines={ false }
                                                >
                                                    { codeString }
                                                </SyntaxHighlighter>
                                            </div>
                                        );
                                    }

                                    return (
                                        <code className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/15 px-1.5 py-0.5 rounded-md text-[0.8em] font-mono" { ...props }>
                                            { children }
                                        </code>
                                    );
                                },
                            } }
                        >
                            { message.content }
                        </ReactMarkdown>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-white/25 text-sm py-2">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Starting…
                    </div>
                ) }

                { message.content && (
                    <div className="flex items-center gap-3 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={ copyMsg } className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-white/25 hover:text-white/55 hover:bg-white/5 rounded-lg transition-all">
                            { msgCopied
                                ? <><Check className="w-3 h-3 text-emerald-400" /><span className="text-emerald-400">Copied</span></>
                                : <><Copy className="w-3 h-3" />Copy response</>
                            }
                        </button>
                        { message.time && <span className="text-white/18 text-xs">{ message.time }</span> }
                    </div>
                ) }
            </div>
        </div>
    );
} );