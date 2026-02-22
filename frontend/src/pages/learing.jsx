import { useState, useEffect, useRef } from "react";
import {
    ChevronLeft, ChevronRight, BookOpen, CheckCircle2, Circle,
    Lock, Menu, X, Home, Code2, Lightbulb, ArrowLeft, Copy,
    Check, Globe, ChevronDown, Trophy, Flame, Clock, Star, Zap,
    AlertTriangle, Info, Brain, Target
} from "lucide-react";

import { htmlCourse } from "../data/htmlCourse.js";
import { cssCourse } from "../data/cssCourse.js";
import { javaScriptCourse } from "../data/javaScript.js";
import { LANGUAGES } from "../data/Languages.js";

const C = {
    bg: "#05050b", surface: "#0c0c18", card: "#111126",
    border: "rgba(99,102,241,.16)", borderLight: "rgba(255,255,255,.06)",
    primary: "#6366f1", primaryDim: "rgba(99,102,241,.12)",
    accent: "#06b6d4", green: "#10b981", greenDim: "rgba(16,185,129,.12)",
    amber: "#f59e0b", pink: "#f43f5e", red: "#ef4444",
    text: "#e2e8f0", muted: "#64748b", subtle: "#94a3b8",
    purple: "#a855f7", yellow: "#eab308",
};

const COURSE_MAP = { html: htmlCourse, css: cssCourse, javascript: javaScriptCourse };

// ─────────────────────────────────────────────────────────
// PROPER TOKEN-BASED SYNTAX HIGHLIGHTER
// Pehle code ko tokens mein todo, PHIR har token render karo
// Koi bhi regex doosre span ke andar NAHI ghusega
// ─────────────────────────────────────────────────────────

const JS_KEYWORDS = new Set( [
    "const", "let", "var", "function", "return", "if", "else", "for", "while",
    "class", "new", "typeof", "instanceof", "import", "export", "default", "from",
    "async", "await", "try", "catch", "throw", "null", "undefined", "true", "false",
    "this", "super", "extends", "of", "in", "switch", "case", "break", "continue", "do"
] );

const JS_BUILTINS = new Set( [
    "console", "Object", "Array", "JSON", "Math", "Promise", "window", "document",
    "localStorage", "parseInt", "parseFloat", "Number", "String", "Boolean",
    "Symbol", "Map", "Set", "WeakMap", "WeakSet", "Error", "TypeError", "ReferenceError",
    "fetch", "setTimeout", "setInterval", "clearTimeout", "clearInterval"
] );

function esc( str ) {
    return str.replace( /&/g, "&amp;" ).replace( /</g, "&lt;" ).replace( />/g, "&gt;" ).replace( /"/g, "&quot;" );
}

function highlightJS( raw ) {
    const tokens = [];
    let i = 0;
    const len = raw.length;

    while ( i < len ) {
        // Single-line comment  //...
        if ( raw[ i ] === "/" && raw[ i + 1 ] === "/" ) {
            let j = i;
            while ( j < len && raw[ j ] !== "\n" ) j++;
            tokens.push( { t: "comment", v: raw.slice( i, j ) } );
            i = j;
            continue;
        }
        // Multi-line comment  /*...*/
        if ( raw[ i ] === "/" && raw[ i + 1 ] === "*" ) {
            let j = i + 2;
            while ( j < len && !( raw[ j ] === "*" && raw[ j + 1 ] === "/" ) ) j++;
            tokens.push( { t: "comment", v: raw.slice( i, j + 2 ) } );
            i = j + 2;
            continue;
        }
        // Template literal  `...`
        if ( raw[ i ] === "`" ) {
            let j = i + 1;
            while ( j < len && raw[ j ] !== "`" ) { if ( raw[ j ] === "\\" ) j++; j++; }
            tokens.push( { t: "string", v: raw.slice( i, j + 1 ) } );
            i = j + 1;
            continue;
        }
        // Double-quoted string  "..."
        if ( raw[ i ] === '"' ) {
            let j = i + 1;
            while ( j < len && raw[ j ] !== '"' ) { if ( raw[ j ] === "\\" ) j++; j++; }
            tokens.push( { t: "string", v: raw.slice( i, j + 1 ) } );
            i = j + 1;
            continue;
        }
        // Single-quoted string  '...'
        if ( raw[ i ] === "'" ) {
            let j = i + 1;
            while ( j < len && raw[ j ] !== "'" ) { if ( raw[ j ] === "\\" ) j++; j++; }
            tokens.push( { t: "string", v: raw.slice( i, j + 1 ) } );
            i = j + 1;
            continue;
        }
        // Number — only if NOT preceded by a letter (to avoid 0x in color codes)
        if ( /[0-9]/.test( raw[ i ] ) && ( i === 0 || !/[a-zA-Z_$]/.test( raw[ i - 1 ] ) ) ) {
            let j = i;
            while ( j < len && /[0-9.a-fA-FxX_]/.test( raw[ j ] ) ) j++;
            tokens.push( { t: "number", v: raw.slice( i, j ) } );
            i = j;
            continue;
        }
        // Identifier → keyword / builtin / method / plain
        if ( /[a-zA-Z_$]/.test( raw[ i ] ) ) {
            let j = i;
            while ( j < len && /[a-zA-Z0-9_$]/.test( raw[ j ] ) ) j++;
            const word = raw.slice( i, j );
            // Is it called as a method?
            let k = j; while ( k < len && raw[ k ] === " " ) k++;
            const isFn = raw[ k ] === "(";
            // Is it after a dot?
            let p = i - 1; while ( p >= 0 && raw[ p ] === " " ) p--;
            const afterDot = raw[ p ] === ".";

            let type = "ident";
            if ( JS_KEYWORDS.has( word ) ) type = "keyword";
            else if ( JS_BUILTINS.has( word ) ) type = "builtin";
            else if ( afterDot || isFn ) type = "method";

            tokens.push( { t: type, v: word } );
            i = j;
            continue;
        }
        // Operator chars  = + - * / % < > ! & | ^ ~ ? :
        if ( /[=+\-*/%<>!&|^~?:]/.test( raw[ i ] ) ) {
            let j = i;
            while ( j < len && /[=+\-*/%<>!&|^~?:]/.test( raw[ j ] ) ) j++;
            tokens.push( { t: "op", v: raw.slice( i, j ) } );
            i = j;
            continue;
        }
        // Whitespace, punctuation, newlines — pass through
        tokens.push( { t: "other", v: raw[ i ] } );
        i++;
    }

    // Render each token — esc() is called per token so HTML chars are safe
    return tokens.map( ( { t, v } ) => {
        const s = esc( v );
        switch ( t ) {
            case "comment": return `<span style="color:#4a5568;font-style:italic">${ s }</span>`;
            case "string": return `<span style="color:#c3e88d">${ s }</span>`;
            case "number": return `<span style="color:#f78c6c">${ s }</span>`;
            case "keyword": return `<span style="color:#c792ea">${ s }</span>`;
            case "builtin": return `<span style="color:#ffcb6b">${ s }</span>`;
            case "method": return `<span style="color:#82aaff">${ s }</span>`;
            case "op": return `<span style="color:#89ddff">${ s }</span>`;
            default: return s;
        }
    } ).join( "" );
}

function highlightHTML( raw ) {
    // Simple HTML — token by tag vs text
    let out = "";
    let i = 0;
    const len = raw.length;
    while ( i < len ) {
        if ( raw.startsWith( "<!--", i ) ) {
            const end = raw.indexOf( "-->", i + 4 );
            const e = end === -1 ? len : end + 3;
            out += `<span style="color:#475569;font-style:italic">${ esc( raw.slice( i, e ) ) }</span>`;
            i = e; continue;
        }
        if ( raw[ i ] === "<" ) {
            const end = raw.indexOf( ">", i );
            if ( end !== -1 ) {
                const tag = raw.slice( i, end + 1 );
                // highlight tag name pink, attrs cyan, values green
                const highlighted = esc( tag )
                    .replace( /^(&lt;\/?)([\w-]+)/, '$1<span style="color:#f472b6">$2</span>' )
                    .replace( / ([\w-]+)(=)/g, ' <span style="color:#94a3b8">$1</span><span style="color:#64748b">=</span>' )
                    .replace( /(&quot;[^&]*&quot;)/g, '<span style="color:#c3e88d">$1</span>' );
                out += highlighted;
                i = end + 1; continue;
            }
        }
        // plain text
        let j = i;
        while ( j < len && raw[ j ] !== "<" ) j++;
        out += esc( raw.slice( i, j ) );
        i = j;
    }
    return out;
}

function highlight( raw, language ) {
    if ( !raw ) return "";
    if ( language === "html" ) return highlightHTML( raw );
    if ( language === "javascript" || language === "js" ) return highlightJS( raw );
    if ( language === "css" ) {
        return esc( raw )
            .replace( /(\/\*[\s\S]*?\*\/)/g, '<span style="color:#475569;font-style:italic">$1</span>' )
            .replace( /^([.#]?[\w-]+)\s*\{/gm, '<span style="color:#f472b6">$1</span> {' )
            .replace( /([\w-]+)(\s*:)/g, '<span style="color:#82aaff">$1</span>$2' )
            .replace( /:\s*([^;{}\n]+)/g, ': <span style="color:#c3e88d">$1</span>' );
    }
    return esc( raw );
}

// ─────────────────────────────────────────────────────────
// COPY BUTTON
// ─────────────────────────────────────────────────────────
function CopyBtn( { code } ) {
    const [ copied, setCopied ] = useState( false );
    const copy = () => {
        navigator.clipboard.writeText( code ).then( () => {
            setCopied( true );
            setTimeout( () => setCopied( false ), 2000 );
        } );
    };
    return (
        <button onClick={ copy } title="Copy code" style={ {
            background: "rgba(255,255,255,.06)", border: `1px solid ${ C.border }`,
            borderRadius: 6, padding: "5px 10px", cursor: "pointer",
            color: copied ? C.green : C.muted, display: "flex", alignItems: "center",
            gap: 5, fontSize: 12, fontFamily: "inherit", transition: "all .2s",
        } }>
            { copied ? <Check size={ 13 } /> : <Copy size={ 13 } /> }
            { copied ? "Copied!" : "Copy" }
        </button>
    );
}

// ─────────────────────────────────────────────────────────
// CODE BLOCK — full syntax highlighted
// ─────────────────────────────────────────────────────────
function CodeBlock( { code, language = "javascript" } ) {
    const fileName = language === "html" ? "index.html"
        : language === "css" ? "style.css"
            : `example.js`;
    return (
        <div style={ {
            background: "#0a0a16", border: `1px solid ${ C.border }`,
            borderRadius: 12, overflow: "hidden",
        } }>
            <div style={ {
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "8px 16px", background: "rgba(255,255,255,.025)",
                borderBottom: `1px solid ${ C.border }`,
            } }>
                <div style={ { display: "flex", alignItems: "center", gap: 8 } }>
                    <div style={ { display: "flex", gap: 5 } }>
                        { [ "#ff5f57", "#febc2e", "#28c840" ].map( c => (
                            <div key={ c } style={ { width: 10, height: 10, borderRadius: "50%", background: c } } />
                        ) ) }
                    </div>
                    <span style={ { fontSize: 11, color: C.muted, fontFamily: "'DM Mono', monospace" } }>
                        { fileName }
                    </span>
                </div>
                <CopyBtn code={ code } />
            </div>
            <pre style={ {
                padding: "18px 20px", margin: 0, overflowX: "auto",
                fontFamily: "'DM Mono', 'Fira Code', 'Cascadia Code', monospace",
                fontSize: 13, lineHeight: 1.85, color: C.text,
            } }>
                <code dangerouslySetInnerHTML={ { __html: highlight( code, language ) } } />
            </pre>
        </div>
    );
}

// ─────────────────────────────────────────────────────────
// HTML PREVIEW
// ─────────────────────────────────────────────────────────
function HtmlPreview( { html } ) {
    return (
        <div style={ {
            background: "#fff", borderRadius: "0 0 11px 11px",
            border: `1px solid ${ C.border }`, borderTop: "none", overflow: "hidden",
        } }>
            <div style={ {
                background: "#f1f5f9", borderBottom: "1px solid #e2e8f0",
                padding: "6px 14px", display: "flex", alignItems: "center", gap: 8,
            } }>
                <Globe size={ 12 } color="#94a3b8" />
                <span style={ { fontSize: 11, color: "#64748b", fontFamily: "monospace" } }>Preview</span>
            </div>
            <div dangerouslySetInnerHTML={ { __html: html } }
                style={ { padding: "4px 0", minHeight: 48, background: "#ffffff", color: "#111" } } />
        </div>
    );
}

// ─────────────────────────────────────────────────────────
// MARKDOWN RENDERER
// ─────────────────────────────────────────────────────────
function renderMarkdown( text ) {
    return text
        .replace( /\*\*(.*?)\*\*/g, '<strong style="color:#e2e8f0;font-weight:700">$1</strong>' )
        .replace( /`(.*?)`/g, '<code style="background:rgba(99,102,241,.15);color:#a5b4fc;padding:2px 7px;border-radius:4px;font-family:\'DM Mono\',monospace;font-size:.88em">$1</code>' )
        .replace( /\n/g, "<br/>" );
}

// ─────────────────────────────────────────────────────────
// SECTION RENDERERS
// ─────────────────────────────────────────────────────────

function SectionAnalogy( { data } ) {
    return (
        <div style={ {
            background: `linear-gradient(135deg, rgba(245,158,11,.07), rgba(99,102,241,.05))`,
            border: `1px solid rgba(245,158,11,.2)`, borderRadius: 14, padding: "22px 24px",
            marginBottom: 28,
        } }>
            <div style={ { display: "flex", alignItems: "center", gap: 10, marginBottom: 12 } }>
                <div style={ {
                    width: 36, height: 36, borderRadius: 10,
                    background: "rgba(245,158,11,.15)", border: "1px solid rgba(245,158,11,.3)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                } }>{ data.icon }</div>
                <span style={ { fontWeight: 700, fontSize: 14, color: C.amber } }>Analogy — Real Life se Samjho</span>
            </div>
            <div style={ { fontSize: 15, color: C.subtle, lineHeight: 1.8 } }
                dangerouslySetInnerHTML={ { __html: renderMarkdown( data.content ) } } />

            {/* Memory Diagram if present */ }
            { data.memoryDiagram && (
                <div style={ { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 20 } }>
                    { [ data.memoryDiagram.stack, data.memoryDiagram.heap ].map( ( box, i ) => (
                        <div key={ i } style={ {
                            borderRadius: 10, overflow: "hidden",
                            border: `1px solid ${ i === 0 ? "rgba(16,185,129,.25)" : "rgba(245,158,11,.25)" }`,
                        } }>
                            <div style={ {
                                padding: "8px 14px", fontSize: 12, fontWeight: 700,
                                background: i === 0 ? "rgba(16,185,129,.1)" : "rgba(245,158,11,.1)",
                                color: i === 0 ? C.green : C.amber,
                            } }>{ box.label }</div>
                            <div style={ { background: "#0a0a16", padding: "10px 14px" } }>
                                { box.rows.map( ( row, j ) => (
                                    <div key={ j } style={ {
                                        display: "flex", gap: 10, padding: "5px 0",
                                        borderBottom: j < box.rows.length - 1 ? "1px solid rgba(255,255,255,.04)" : "none",
                                        fontFamily: "'DM Mono', monospace", fontSize: 12,
                                    } }>
                                        <span style={ { color: "#334155", width: 55 } }>{ row.addr }</span>
                                        <span style={ { color: "#7dd3fc" } }>{ row.name }</span>
                                        <span style={ { color: "#fbbf24", marginLeft: "auto" } }>{ row.value }</span>
                                    </div>
                                ) ) }
                                <div style={ { fontSize: 11, color: C.muted, marginTop: 8 } }>{ box.note }</div>
                            </div>
                        </div>
                    ) ) }
                </div>
            ) }

            {/* Key Insight */ }
            { data.keyInsight && (
                <div style={ {
                    display: "flex", gap: 10, marginTop: 16, padding: "12px 16px",
                    background: "rgba(245,158,11,.08)", borderRadius: 10,
                    border: "1px solid rgba(245,158,11,.15)",
                } }>
                    <span style={ { fontSize: 16, flexShrink: 0 } }>💡</span>
                    <span style={ { fontSize: 13, color: C.subtle, lineHeight: 1.7 } }
                        dangerouslySetInnerHTML={ { __html: `<strong style="color:${ C.amber }">Key Insight:</strong> ${ renderMarkdown( data.keyInsight ) }` } } />
                </div>
            ) }
        </div>
    );
}

function SectionConcept( { data } ) {
    return (
        <div style={ { marginBottom: 28 } }>
            <h3 style={ { fontSize: 19, fontWeight: 700, color: C.text, marginBottom: 14, letterSpacing: "-.3px" } }>
                { data.heading }
            </h3>
            <div style={ { fontSize: 15, color: C.subtle, lineHeight: 1.85 } }
                dangerouslySetInnerHTML={ { __html: renderMarkdown( data.content ) } } />

            {/* Comparison Table */ }
            { data.comparisonTable && (
                <div style={ {
                    marginTop: 18, borderRadius: 12, overflow: "hidden",
                    border: `1px solid ${ C.border }`,
                } }>
                    {/* Header */ }
                    <div style={ { display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", background: "rgba(99,102,241,.1)" } }>
                        { [ "Property", "var ❌", "let / const ✅" ].map( ( h, i ) => (
                            <div key={ i } style={ {
                                padding: "10px 14px", fontSize: 12, fontWeight: 700,
                                color: i === 1 ? C.red : i === 2 ? C.green : C.text,
                                borderRight: i < 2 ? `1px solid ${ C.border }` : "none",
                                fontFamily: "'DM Mono', monospace",
                            } }>{ h }</div>
                        ) ) }
                    </div>
                    {/* Rows */ }
                    { data.comparisonTable.map( ( row, i ) => (
                        <div key={ i } style={ {
                            display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr",
                            borderTop: `1px solid ${ C.border }`,
                            background: i % 2 === 0 ? "rgba(255,255,255,.015)" : "transparent",
                        } }>
                            <div style={ { padding: "10px 14px", fontSize: 13, color: C.subtle, fontWeight: 600, borderRight: `1px solid ${ C.border }` } }>{ row.property }</div>
                            <div style={ { padding: "10px 14px", fontSize: 12, color: "#f87171", fontFamily: "'DM Mono', monospace", borderRight: `1px solid ${ C.border }` } }>{ row.var }</div>
                            <div style={ { padding: "10px 14px", fontSize: 12, color: "#4ade80", fontFamily: "'DM Mono', monospace" } }>{ row.letConst }</div>
                        </div>
                    ) ) }
                </div>
            ) }

            {/* Rule Tip */ }
            { data.ruleTip && (
                <div style={ {
                    display: "flex", gap: 10, marginTop: 16, padding: "12px 16px",
                    background: "rgba(6,182,212,.07)", borderRadius: 10,
                    border: "1px solid rgba(6,182,212,.15)",
                } }>
                    <Target size={ 16 } color={ C.accent } style={ { flexShrink: 0, marginTop: 2 } } />
                    <span style={ { fontSize: 13, color: C.subtle, lineHeight: 1.7 } }
                        dangerouslySetInnerHTML={ { __html: `<strong style="color:${ C.accent }">Rule of Thumb:</strong> ${ renderMarkdown( data.ruleTip ) }` } } />
                </div>
            ) }
        </div>
    );
}

function SectionFact( { data } ) {
    return (
        <div style={ {
            background: `linear-gradient(135deg, rgba(6,182,212,.07), rgba(99,102,241,.05))`,
            border: `1px solid rgba(6,182,212,.2)`, borderRadius: 14, padding: "18px 22px",
            marginBottom: 28, display: "flex", gap: 14, alignItems: "flex-start",
        } }>
            <div style={ {
                width: 34, height: 34, borderRadius: 9,
                background: "rgba(6,182,212,.12)", border: "1px solid rgba(6,182,212,.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 17, flexShrink: 0,
            } }>{ data.icon }</div>
            <div>
                <div style={ { fontWeight: 700, fontSize: 14, color: C.accent, marginBottom: 8 } }>{ data.heading }</div>
                <div style={ { fontSize: 14, color: C.subtle, lineHeight: 1.8 } }
                    dangerouslySetInnerHTML={ { __html: renderMarkdown( data.content ) } } />
            </div>
        </div>
    );
}

function SectionDeepDive( { data } ) {
    return (
        <div style={ {
            background: "rgba(168,85,247,.06)",
            border: "1px solid rgba(168,85,247,.2)",
            borderRadius: 14, padding: "22px 24px", marginBottom: 28,
        } }>
            <div style={ { display: "flex", alignItems: "center", gap: 10, marginBottom: 14 } }>
                <div style={ {
                    width: 36, height: 36, borderRadius: 10,
                    background: "rgba(168,85,247,.15)", border: "1px solid rgba(168,85,247,.3)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                } }>{ data.icon || "🔬" }</div>
                <div>
                    <div style={ { fontSize: 10, fontWeight: 700, color: "rgba(168,85,247,.7)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 2 } }>Deep Dive</div>
                    <div style={ { fontWeight: 700, fontSize: 16, color: C.text } }>{ data.heading }</div>
                </div>
            </div>
            <div style={ { fontSize: 15, color: C.subtle, lineHeight: 1.85, marginBottom: 16 } }
                dangerouslySetInnerHTML={ { __html: renderMarkdown( data.content ) } } />

            {/* Primitives vs References side-by-side */ }
            { data.primitives && data.references && (
                <div style={ { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 } }>
                    <div style={ { borderRadius: 10, overflow: "hidden", border: "1px solid rgba(16,185,129,.2)" } }>
                        <div style={ { padding: "8px 14px", background: "rgba(16,185,129,.1)", fontSize: 12, fontWeight: 700, color: C.green } }>
                            📋 Primitives — Stack mein
                        </div>
                        <div style={ { background: "#0a0a14", padding: "12px 14px" } }>
                            { data.primitives.map( ( p, i ) => (
                                <div key={ i } style={ {
                                    fontFamily: "'DM Mono', monospace", fontSize: 12,
                                    color: "#c792ea", padding: "3px 0",
                                    borderBottom: i < data.primitives.length - 1 ? "1px solid rgba(255,255,255,.04)" : "none",
                                } }>{ p }</div>
                            ) ) }
                            <div style={ { marginTop: 10, fontSize: 11, color: "#334155", fontFamily: "'DM Mono', monospace" } }>
                                // Copy = Naya value banta hai
                            </div>
                        </div>
                    </div>
                    <div style={ { borderRadius: 10, overflow: "hidden", border: "1px solid rgba(245,158,11,.2)" } }>
                        <div style={ { padding: "8px 14px", background: "rgba(245,158,11,.1)", fontSize: 12, fontWeight: 700, color: C.amber } }>
                            🏬 References — Heap mein
                        </div>
                        <div style={ { background: "#0a0a14", padding: "12px 14px" } }>
                            { data.references.map( ( r, i ) => (
                                <div key={ i } style={ {
                                    fontFamily: "'DM Mono', monospace", fontSize: 12,
                                    color: "#f78c6c", padding: "3px 0",
                                    borderBottom: i < data.references.length - 1 ? "1px solid rgba(255,255,255,.04)" : "none",
                                } }>{ r }</div>
                            ) ) }
                            <div style={ { marginTop: 10, fontSize: 11, color: "#334155", fontFamily: "'DM Mono', monospace" } }>
                                // Copy = Sirf address copy hota hai!
                            </div>
                        </div>
                    </div>
                </div>
            ) }
        </div>
    );
}

function SectionCode( { data } ) {
    return (
        <div style={ { marginBottom: 28 } }>
            { data.heading && (
                <h3 style={ { fontSize: 17, fontWeight: 700, color: C.text, marginBottom: 12, letterSpacing: "-.3px" } }>
                    { data.heading }
                </h3>
            ) }
            <CodeBlock code={ data.code } language={ data.language } />
            { data.output && data.output.type === "preview" && (
                data.language === "html"
                    ? <HtmlPreview html={ data.output.content } />
                    : <div dangerouslySetInnerHTML={ { __html: data.output.content } } />
            ) }
            { data.explanation && (
                <div style={ {
                    display: "flex", gap: 10, alignItems: "flex-start",
                    marginTop: 12, padding: "12px 16px",
                    background: "rgba(99,102,241,.07)", borderRadius: 10,
                    border: `1px solid rgba(99,102,241,.15)`,
                } }>
                    <Lightbulb size={ 15 } color={ C.primary } style={ { flexShrink: 0, marginTop: 2 } } />
                    <div style={ { fontSize: 13, color: C.subtle, lineHeight: 1.7 } }
                        dangerouslySetInnerHTML={ { __html: renderMarkdown( data.explanation ) } } />
                </div>
            ) }
        </div>
    );
}

function SectionErrorAlert( { data } ) {
    const isWarning = data.icon === "⚠️";
    const color = isWarning ? C.amber : C.red;
    const bg = isWarning ? "rgba(245,158,11,.06)" : "rgba(239,68,68,.06)";
    const border = isWarning ? "rgba(245,158,11,.2)" : "rgba(239,68,68,.2)";
    return (
        <div style={ {
            background: bg, border: `1px solid ${ border }`,
            borderRadius: 14, padding: "20px 22px", marginBottom: 28,
        } }>
            <div style={ { display: "flex", alignItems: "center", gap: 10, marginBottom: 10 } }>
                <div style={ {
                    width: 32, height: 32, borderRadius: 8, fontSize: 16,
                    background: isWarning ? "rgba(245,158,11,.12)" : "rgba(239,68,68,.12)",
                    border: `1px solid ${ border }`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                } }>{ data.icon }</div>
                <div style={ { fontWeight: 700, fontSize: 15, color } }>{ data.heading }</div>
            </div>
            <div style={ { fontSize: 14, color: C.subtle, lineHeight: 1.8 } }
                dangerouslySetInnerHTML={ { __html: renderMarkdown( data.content ) } } />
        </div>
    );
}

function SectionDetailedStep( { data } ) {
    return (
        <div style={ { marginBottom: 28 } }>
            <h3 style={ { fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 12 } }>{ data.heading }</h3>
            <div style={ { fontSize: 15, color: C.subtle, lineHeight: 1.85, marginBottom: 16 } }
                dangerouslySetInnerHTML={ { __html: renderMarkdown( data.content ) } } />

            {/* TDZ Visual */ }
            { data.tdzVisual && (
                <div style={ { display: "flex", flexDirection: "column", gap: 4 } }>
                    { data.tdzVisual.map( ( row, i ) => {
                        const isDanger = row.status === "danger" || row.status === "tdz-start";
                        const isSafe = row.status === "safe";
                        const bg = isDanger ? "rgba(239,68,68,.08)" : isSafe ? "rgba(16,185,129,.06)" : "rgba(255,255,255,.03)";
                        const border = isDanger ? "rgba(239,68,68,.2)" : isSafe ? "rgba(16,185,129,.15)" : "rgba(255,255,255,.06)";
                        const tagColor = row.tag.includes( "ERROR" ) ? C.red : row.tag.includes( "SAFE" ) ? C.green : C.amber;
                        const tagBg = row.tag.includes( "ERROR" ) ? "rgba(239,68,68,.12)" : row.tag.includes( "SAFE" ) ? "rgba(16,185,129,.1)" : "rgba(245,158,11,.1)";
                        return (
                            <div key={ i } style={ {
                                display: "flex", alignItems: "center", gap: 12,
                                padding: "9px 14px", borderRadius: 8,
                                background: bg, border: `1px solid ${ border }`,
                            } }>
                                <span style={ { color: "#334155", fontFamily: "'DM Mono', monospace", fontSize: 11, width: 24 } }>{ row.line }</span>
                                <span style={ { fontFamily: "'DM Mono', monospace", fontSize: 12, color: C.subtle, flex: 1 } }
                                    dangerouslySetInnerHTML={ { __html: highlightJS( row.code ) } } />
                                <span style={ {
                                    fontSize: 10, fontWeight: 700, padding: "2px 8px",
                                    borderRadius: 4, color: tagColor, background: tagBg,
                                    letterSpacing: 1, whiteSpace: "nowrap",
                                } }>{ row.tag }</span>
                            </div>
                        );
                    } ) }
                </div>
            ) }

            {/* Tip */ }
            { data.tip && (
                <div style={ {
                    display: "flex", gap: 10, marginTop: 14, padding: "12px 16px",
                    background: "rgba(245,158,11,.07)", borderRadius: 10,
                    border: "1px solid rgba(245,158,11,.15)",
                } }>
                    <span style={ { fontSize: 15, flexShrink: 0 } }>🎯</span>
                    <span style={ { fontSize: 13, color: C.subtle, lineHeight: 1.7 } }
                        dangerouslySetInnerHTML={ { __html: `<strong style="color:${ C.amber }">TDZ ka Fayda:</strong> ${ renderMarkdown( data.tip ) }` } } />
                </div>
            ) }
        </div>
    );
}

function SectionProTip( { data } ) {
    return (
        <div style={ {
            background: "rgba(16,185,129,.06)",
            border: "1px solid rgba(16,185,129,.2)",
            borderRadius: 14, padding: "20px 22px", marginBottom: 28,
        } }>
            <div style={ { display: "flex", alignItems: "center", gap: 10, marginBottom: 12 } }>
                <div style={ {
                    width: 32, height: 32, borderRadius: 8, fontSize: 16,
                    background: "rgba(16,185,129,.12)", border: "1px solid rgba(16,185,129,.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                } }>{ data.icon || "💡" }</div>
                <div style={ { fontWeight: 700, fontSize: 15, color: C.green } }>Pro Tip — { data.heading }</div>
            </div>
            <div style={ { fontSize: 14, color: C.subtle, lineHeight: 1.8, marginBottom: data.code ? 14 : 0 } }
                dangerouslySetInnerHTML={ { __html: renderMarkdown( data.content ) } } />
            { data.code && <CodeBlock code={ data.code } language="javascript" /> }
        </div>
    );
}

function SectionSummaryLesson( { data } ) {
    return (
        <div style={ {
            background: "linear-gradient(135deg, rgba(99,102,241,.08), rgba(16,185,129,.04))",
            border: "1px solid rgba(99,102,241,.2)",
            borderRadius: 16, padding: "24px 26px", marginBottom: 28,
        } }>
            <div style={ { display: "flex", alignItems: "center", gap: 10, marginBottom: 18 } }>
                <div style={ {
                    width: 36, height: 36, borderRadius: 10, fontSize: 18,
                    background: "rgba(99,102,241,.15)", border: "1px solid rgba(99,102,241,.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                } }>{ data.icon || "🎓" }</div>
                <div>
                    <div style={ { fontSize: 10, fontWeight: 700, color: "rgba(99,102,241,.7)", letterSpacing: 2, textTransform: "uppercase" } }>Summary</div>
                    <div style={ { fontWeight: 700, fontSize: 16, color: C.text } }>{ data.heading }</div>
                </div>
            </div>
            <div style={ { display: "flex", flexDirection: "column", gap: 10 } }>
                { data.points.map( ( p, i ) => (
                    <div key={ i } style={ {
                        display: "flex", gap: 12, alignItems: "flex-start",
                        padding: "11px 14px", borderRadius: 10,
                        background: "rgba(99,102,241,.06)",
                        border: "1px solid rgba(99,102,241,.1)",
                    } }>
                        <div style={ {
                            width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                            background: "rgba(99,102,241,.15)", border: "1px solid rgba(99,102,241,.3)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 11, fontWeight: 700, color: C.primary,
                            fontFamily: "'DM Mono', monospace",
                        } }>{ String( i + 1 ).padStart( 2, "0" ) }</div>
                        <span style={ { fontSize: 14, color: C.subtle, lineHeight: 1.7 } }
                            dangerouslySetInnerHTML={ { __html: renderMarkdown( p ) } } />
                    </div>
                ) ) }
            </div>
        </div>
    );
}

function SectionTakeaway( { data } ) {
    return (
        <div style={ {
            background: `linear-gradient(135deg, rgba(16,185,129,.08), rgba(6,182,212,.04))`,
            border: `1px solid rgba(16,185,129,.2)`, borderRadius: 14, padding: "22px 24px",
            marginTop: 8,
        } }>
            <div style={ { display: "flex", alignItems: "center", gap: 8, marginBottom: 14 } }>
                <div style={ {
                    width: 28, height: 28, borderRadius: 8,
                    background: "rgba(16,185,129,.15)", border: "1px solid rgba(16,185,129,.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                } }>
                    <Star size={ 14 } color={ C.green } />
                </div>
                <span style={ { fontWeight: 700, fontSize: 14, color: C.green } }>Key Takeaways</span>
            </div>
            <ul style={ { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 } }>
                { data.points.map( ( p, i ) => (
                    <li key={ i } style={ { display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: C.text, lineHeight: 1.6 } }>
                        <CheckCircle2 size={ 15 } color={ C.green } style={ { flexShrink: 0, marginTop: 2 } } />
                        <span dangerouslySetInnerHTML={ { __html: renderMarkdown( p ) } } />
                    </li>
                ) ) }
            </ul>
        </div>
    );
}

// ─────────────────────────────────────────────────────────
// MAIN SECTION SWITCH
// ─────────────────────────────────────────────────────────
function renderSection( section, idx ) {
    switch ( section.type ) {
        case "analogy": return <SectionAnalogy key={ idx } data={ section } />;
        case "concept": return <SectionConcept key={ idx } data={ section } />;
        case "fact": return <SectionFact key={ idx } data={ section } />;
        case "code": return <SectionCode key={ idx } data={ section } />;
        case "takeaway": return <SectionTakeaway key={ idx } data={ section } />;
        case "deep-dive": return <SectionDeepDive key={ idx } data={ section } />;
        case "error-alert": return <SectionErrorAlert key={ idx } data={ section } />;
        case "detailed-step": return <SectionDetailedStep key={ idx } data={ section } />;
        case "pro-tip": return <SectionProTip key={ idx } data={ section } />;
        case "summary-lesson": return <SectionSummaryLesson key={ idx } data={ section } />;
        default: return null;
    }
}

// ─────────────────────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────────────────────
function Sidebar( { course, currentTopic, completed, onSelect, isOpen, onClose } ) {
    return (
        <>
            { isOpen && (
                <div onClick={ onClose } style={ {
                    display: "none", position: "fixed", inset: 0, background: "rgba(0,0,0,.6)",
                    zIndex: 199, backdropFilter: "blur(4px)",
                } } className="ca-sidebar-overlay" />
            ) }
            <div className={ `ca-sidebar ${ isOpen ? "ca-sidebar-open" : "" }` } style={ {
                width: 280, background: C.surface, borderRight: `1px solid ${ C.border }`,
                height: "100%", overflowY: "auto", flexShrink: 0,
                display: "flex", flexDirection: "column",
            } }>
                <div style={ {
                    padding: "18px 20px 14px", borderBottom: `1px solid ${ C.border }`,
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    position: "sticky", top: 0, background: C.surface, zIndex: 2,
                } }>
                    <div>
                        <div style={ { fontSize: 11, color: C.muted, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 4 } }>
                            { course.title } Course
                        </div>
                        <div style={ { fontSize: 12, color: C.muted } }>
                            { completed.length } / { course.totalTopics } completed
                        </div>
                    </div>
                    <button onClick={ onClose } className="ca-sidebar-close" style={ {
                        background: "none", border: "none", color: C.muted, cursor: "pointer",
                        display: "none", padding: 4,
                    } }>
                        <X size={ 18 } />
                    </button>
                </div>

                <div style={ { padding: "10px 20px 14px", borderBottom: `1px solid ${ C.border }` } }>
                    <div style={ { background: "rgba(255,255,255,.06)", borderRadius: 100, height: 5 } }>
                        <div style={ {
                            height: "100%", borderRadius: 100,
                            width: `${ ( completed.length / course.totalTopics ) * 100 }%`,
                            background: `linear-gradient(90deg, ${ C.green }, ${ C.accent })`,
                            transition: "width .4s ease",
                        } } />
                    </div>
                    <div style={ { fontSize: 11, color: C.muted, marginTop: 6 } }>
                        { Math.round( ( completed.length / course.totalTopics ) * 100 ) }% complete
                    </div>
                </div>

                <div style={ { flex: 1, padding: "10px 12px" } }>
                    { course.topics.map( ( topic ) => {
                        const isDone = completed.includes( topic.id );
                        const isCurrent = currentTopic === topic.id;
                        return (
                            <button key={ topic.id } onClick={ () => { onSelect( topic.id ); onClose(); } }
                                style={ {
                                    width: "100%", display: "flex", alignItems: "center", gap: 10,
                                    padding: "10px 12px", borderRadius: 10, marginBottom: 3,
                                    background: isCurrent ? C.primaryDim : "transparent",
                                    border: `1px solid ${ isCurrent ? C.primary + "40" : "transparent" }`,
                                    cursor: "pointer", textAlign: "left", transition: "all .18s",
                                } }
                                onMouseEnter={ e => { if ( !isCurrent ) e.currentTarget.style.background = "rgba(255,255,255,.04)"; } }
                                onMouseLeave={ e => { if ( !isCurrent ) e.currentTarget.style.background = "transparent"; } }>
                                <div style={ { flexShrink: 0, marginTop: 1 } }>
                                    { isDone
                                        ? <CheckCircle2 size={ 16 } color={ C.green } />
                                        : isCurrent
                                            ? <Circle size={ 16 } color={ C.primary } style={ { fill: C.primaryDim } } />
                                            : <Circle size={ 16 } color={ C.muted } /> }
                                </div>
                                <div style={ { minWidth: 0 } }>
                                    <div style={ {
                                        fontSize: 13, fontWeight: isCurrent ? 700 : 500,
                                        color: isCurrent ? C.text : isDone ? C.subtle : C.muted,
                                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                                    } }>
                                        <span style={ { color: C.muted, fontSize: 11, marginRight: 6 } }>{ String( topic.id ).padStart( 2, "0" ) }</span>
                                        { topic.title }
                                    </div>
                                    { isCurrent && (
                                        <div style={ { fontSize: 11, color: C.muted, marginTop: 1, display: "flex", alignItems: "center", gap: 4 } }>
                                            <Clock size={ 10 } /> { topic.duration }
                                        </div>
                                    ) }
                                </div>
                            </button>
                        );
                    } ) }
                </div>

                <div style={ { padding: "12px 20px 16px", borderTop: `1px solid ${ C.border }` } }>
                    <div style={ { fontSize: 11, color: C.muted, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 8 } }>Next Courses</div>
                    { LANGUAGES.filter( l => !l.available ).slice( 0, 4 ).map( l => {
                        const Icon = l.icon;
                        return (
                            <div key={ l.id } style={ { display: "flex", alignItems: "center", gap: 8, padding: "7px 0", opacity: .55 } }>
                                <Icon size={ 13 } color={ l.color } />
                                <span style={ { fontSize: 12, color: C.muted } }>{ l.name }</span>
                                <span style={ { marginLeft: "auto", fontSize: 10, color: C.muted, background: "rgba(255,255,255,.05)", padding: "2px 7px", borderRadius: 100 } }>Soon</span>
                            </div>
                        );
                    } ) }
                </div>
            </div>
        </>
    );
}

// ─────────────────────────────────────────────────────────
// LANGUAGE PICKER
// ─────────────────────────────────────────────────────────
function LanguagePicker( { active, onChange } ) {
    const [ open, setOpen ] = useState( false );
    const ref = useRef( null );
    const activeLang = LANGUAGES.find( l => l.id === active );

    useEffect( () => {
        const h = ( e ) => { if ( ref.current && !ref.current.contains( e.target ) ) setOpen( false ); };
        document.addEventListener( "mousedown", h );
        return () => document.removeEventListener( "mousedown", h );
    }, [] );

    return (
        <div ref={ ref } style={ { position: "relative" } }>
            <button onClick={ () => setOpen( !open ) } style={ {
                display: "flex", alignItems: "center", gap: 8,
                background: C.card, border: `1px solid ${ C.border }`,
                borderRadius: 9, padding: "7px 14px", cursor: "pointer",
                color: C.text, fontFamily: "inherit", fontSize: 13, fontWeight: 600,
                transition: "all .2s",
            } }
                onMouseEnter={ e => e.currentTarget.style.borderColor = C.primary + "50" }
                onMouseLeave={ e => e.currentTarget.style.borderColor = C.border }>
                { activeLang && <div style={ { width: 8, height: 8, borderRadius: "50%", background: activeLang.color } } /> }
                { activeLang?.name || "Select Language" }
                <ChevronDown size={ 13 } color={ C.muted } style={ { transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" } } />
            </button>
            { open && (
                <div style={ {
                    position: "absolute", top: "calc(100% + 8px)", left: 0, zIndex: 300,
                    background: C.card, border: `1px solid ${ C.border }`, borderRadius: 12,
                    width: 220, overflow: "hidden", boxShadow: "0 16px 48px rgba(0,0,0,.4)",
                } }>
                    { LANGUAGES.map( l => {
                        const Icon = l.icon;
                        return (
                            <div key={ l.id } onClick={ () => { if ( l.available ) { onChange( l.id ); setOpen( false ); } } }
                                style={ {
                                    display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
                                    cursor: l.available ? "pointer" : "default", transition: "background .15s",
                                    opacity: l.available ? 1 : .45, borderBottom: `1px solid rgba(255,255,255,.04)`,
                                } }
                                onMouseEnter={ e => { if ( l.available ) e.currentTarget.style.background = "rgba(255,255,255,.04)"; } }
                                onMouseLeave={ e => e.currentTarget.style.background = "transparent" }>
                                <Icon size={ 15 } color={ l.color } />
                                <span style={ { fontSize: 13, fontWeight: 500, color: C.text, flex: 1 } }>{ l.name }</span>
                                { !l.available && (
                                    <span style={ { fontSize: 10, color: C.muted, background: "rgba(255,255,255,.06)", padding: "2px 7px", borderRadius: 100 } }>Soon</span>
                                ) }
                                { l.available && l.id === active && <CheckCircle2 size={ 13 } color={ C.green } /> }
                            </div>
                        );
                    } ) }
                </div>
            ) }
        </div>
    );
}

// ─────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────
function LearnNavbar( { activeLanguage, onLanguageChange, onMenuToggle, course, currentTopicId } ) {
    const topic = course?.topics.find( t => t.id === currentTopicId );
    return (
        <nav style={ {
            height: 56, background: "rgba(5,5,11,.95)", backdropFilter: "blur(20px)",
            borderBottom: `1px solid ${ C.border }`, display: "flex", alignItems: "center",
            padding: "0 20px", gap: 16, flexShrink: 0, position: "sticky", top: 0, zIndex: 100,
        } }>
            <button onClick={ onMenuToggle } style={ {
                background: "none", border: "none", color: C.muted, cursor: "pointer",
                padding: 6, borderRadius: 7, display: "flex", alignItems: "center", transition: "color .2s",
            } }
                onMouseEnter={ e => e.currentTarget.style.color = C.text }
                onMouseLeave={ e => e.currentTarget.style.color = C.muted }>
                <Menu size={ 19 } />
            </button>
            <a href="/" style={ { display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flexShrink: 0 } }>
                <div style={ { width: 28, height: 28, borderRadius: 7, background: `linear-gradient(135deg, ${ C.primary }, #8b5cf6)`, display: "flex", alignItems: "center", justifyContent: "center" } }>
                    <BookOpen size={ 14 } color="#fff" />
                </div>
                <span style={ { fontWeight: 800, fontSize: 16, color: C.text } }>
                    Code<span style={ { color: "#06b6d4" } }>Arena</span>
                </span>
            </a>
            <div style={ { width: 1, height: 20, background: C.border, flexShrink: 0 } } />
            <LanguagePicker active={ activeLanguage } onChange={ onLanguageChange } />
            { topic && (
                <>
                    <div style={ { width: 1, height: 16, background: C.border, flexShrink: 0 } } className="ca-hide-xs" />
                    <span className="ca-hide-xs" style={ { fontSize: 13, color: C.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }>
                        { String( topic.id ).padStart( 2, "0" ) } — { topic.title }
                    </span>
                </>
            ) }
            <div style={ { flex: 1 } } />
            <div style={ { display: "flex", alignItems: "center", gap: 6, background: "rgba(245,158,11,.1)", border: "1px solid rgba(245,158,11,.25)", borderRadius: 100, padding: "4px 12px", flexShrink: 0 } } className="ca-hide-xs">
                <Flame size={ 13 } color={ C.amber } />
                <span style={ { fontSize: 12, fontWeight: 700, color: C.amber } }>+50 XP per topic</span>
            </div>
            <a href="/" style={ { display: "flex", alignItems: "center", gap: 6, textDecoration: "none", color: C.muted, fontSize: 13, fontWeight: 500, padding: "7px 12px", borderRadius: 8, border: `1px solid ${ C.border }`, transition: "all .2s", flexShrink: 0 } }
                onMouseEnter={ e => { e.currentTarget.style.color = C.text; e.currentTarget.style.borderColor = C.primary + "40"; } }
                onMouseLeave={ e => { e.currentTarget.style.color = C.muted; e.currentTarget.style.borderColor = C.border; } }>
                <Home size={ 14 } /> <span className="ca-hide-xs">Home</span>
            </a>
        </nav>
    );
}

// ─────────────────────────────────────────────────────────
// TOPIC CONTENT
// ─────────────────────────────────────────────────────────
function TopicContent( { topic, course, onPrev, onNext, onComplete, isCompleted } ) {
    const contentRef = useRef( null );
    useEffect( () => { if ( contentRef.current ) contentRef.current.scrollTop = 0; }, [ topic?.id ] );
    if ( !topic ) return null;
    const topicIndex = course.topics.findIndex( t => t.id === topic.id );
    const isFirst = topicIndex === 0;
    const isLast = topicIndex === course.topics.length - 1;

    return (
        <div ref={ contentRef } style={ { flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" } }>
            <div style={ {
                padding: "36px 40px 28px", borderBottom: `1px solid ${ C.border }`,
                background: `linear-gradient(135deg, ${ C.surface }, ${ C.bg })`,
            } } className="ca-content-header">
                <div style={ { maxWidth: 780, margin: "0 auto" } }>
                    <div style={ { display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" } }>
                        <span style={ {
                            fontSize: 11, fontWeight: 700, color: C.muted,
                            background: "rgba(255,255,255,.05)", border: `1px solid ${ C.border }`,
                            padding: "3px 10px", borderRadius: 100, letterSpacing: ".06em",
                        } }>
                            { course.title } · Topic { String( topic.id ).padStart( 2, "0" ) } of { course.totalTopics }
                        </span>
                        <span style={ { fontSize: 11, fontWeight: 600, color: C.accent, display: "flex", alignItems: "center", gap: 4 } }>
                            <Clock size={ 10 } /> { topic.duration }
                        </span>
                        { isCompleted && (
                            <span style={ {
                                fontSize: 11, fontWeight: 700, color: C.green,
                                display: "flex", alignItems: "center", gap: 4,
                                background: C.greenDim, padding: "3px 10px", borderRadius: 100,
                                border: "1px solid rgba(16,185,129,.25)",
                            } }>
                                <CheckCircle2 size={ 10 } /> Completed
                            </span>
                        ) }
                    </div>
                    <h1 style={ {
                        fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: C.text,
                        letterSpacing: "-1px", lineHeight: 1.1, marginBottom: 10,
                    } }>
                        { topic.title }
                    </h1>
                    <p style={ { fontSize: 17, color: C.muted, lineHeight: 1.5 } }>{ topic.subtitle }</p>
                </div>
            </div>

            <div style={ { flex: 1, padding: "36px 40px" } } className="ca-content-body">
                <div style={ { maxWidth: 780, margin: "0 auto" } }>
                    { topic.sections.map( ( section, i ) => renderSection( section, i ) ) }
                </div>
            </div>

            <div style={ {
                borderTop: `1px solid ${ C.border }`, padding: "20px 40px",
                background: C.surface, flexShrink: 0,
            } } className="ca-content-footer">
                <div style={ { maxWidth: 780, margin: "0 auto", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" } }>
                    <button onClick={ onPrev } disabled={ isFirst } style={ {
                        display: "flex", alignItems: "center", gap: 7, padding: "10px 20px", borderRadius: 10,
                        background: "transparent", border: `1px solid ${ C.border }`,
                        color: isFirst ? C.muted : C.text, cursor: isFirst ? "not-allowed" : "pointer",
                        fontFamily: "inherit", fontSize: 14, fontWeight: 600, opacity: isFirst ? .4 : 1, transition: "all .2s",
                    } }
                        onMouseEnter={ e => { if ( !isFirst ) { e.currentTarget.style.borderColor = C.primary + "50"; e.currentTarget.style.background = C.primaryDim; } } }
                        onMouseLeave={ e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = "transparent"; } }>
                        <ChevronLeft size={ 16 } /> Previous
                    </button>

                    { !isCompleted && (
                        <button onClick={ onComplete } style={ {
                            display: "flex", alignItems: "center", gap: 7, padding: "10px 22px", borderRadius: 10,
                            background: `linear-gradient(135deg, ${ C.green }, #059669)`,
                            border: "none", color: "#fff", cursor: "pointer",
                            fontFamily: "inherit", fontSize: 14, fontWeight: 700,
                            boxShadow: "0 4px 16px rgba(16,185,129,.3)", transition: "all .2s",
                        } }
                            onMouseEnter={ e => e.currentTarget.style.transform = "translateY(-1px)" }
                            onMouseLeave={ e => e.currentTarget.style.transform = "none" }>
                            <CheckCircle2 size={ 15 } /> Mark as Complete
                        </button>
                    ) }

                    { isCompleted && (
                        <div style={ {
                            display: "flex", alignItems: "center", gap: 7, padding: "10px 18px", borderRadius: 10,
                            background: C.greenDim, border: "1px solid rgba(16,185,129,.25)",
                            color: C.green, fontSize: 14, fontWeight: 700,
                        } }>
                            <CheckCircle2 size={ 15 } /> Completed · +50 XP
                        </div>
                    ) }

                    <div style={ { flex: 1 } } />

                    <button onClick={ onNext } disabled={ isLast } style={ {
                        display: "flex", alignItems: "center", gap: 7, padding: "10px 20px", borderRadius: 10,
                        background: isLast ? "transparent" : `linear-gradient(135deg, ${ C.primary }, #8b5cf6)`,
                        border: `1px solid ${ isLast ? C.border : "transparent" }`,
                        color: isLast ? C.muted : "#fff", cursor: isLast ? "not-allowed" : "pointer",
                        fontFamily: "inherit", fontSize: 14, fontWeight: 700, opacity: isLast ? .4 : 1,
                        boxShadow: isLast ? "none" : "0 4px 16px rgba(99,102,241,.3)", transition: "all .2s",
                    } }
                        onMouseEnter={ e => { if ( !isLast ) e.currentTarget.style.transform = "translateY(-1px)"; } }
                        onMouseLeave={ e => e.currentTarget.style.transform = "none" }>
                        Next <ChevronRight size={ 16 } />
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────
// COURSE LANDING
// ─────────────────────────────────────────────────────────
function CourseLanding( { course, onStart } ) {
    const lang = LANGUAGES.find( l => l.id === course.id );
    return (
        <div style={ { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px", overflowY: "auto" } }>
            <div style={ { maxWidth: 540, textAlign: "center" } }>
                <div style={ {
                    width: 72, height: 72, borderRadius: 18,
                    background: lang?.colorDim || C.primaryDim,
                    border: `1px solid ${ lang?.color || C.primary }30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 24px", fontSize: 32,
                } }>
                    { course.icon }
                </div>
                <h1 style={ { fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 800, color: C.text, marginBottom: 12, letterSpacing: "-1px" } }>
                    { course.title } — Zero to Advance
                </h1>
                <p style={ { fontSize: 16, color: C.muted, lineHeight: 1.75, marginBottom: 28 } }>
                    { course.description }. { course.totalTopics } structured topics — from absolute basics to real-world projects.
                </p>
                <div style={ { display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 } }>
                    { [
                        { icon: <BookOpen size={ 14 } />, label: `${ course.totalTopics } Topics`, color: C.accent },
                        { icon: <Clock size={ 14 } />, label: "Self-paced", color: C.primary },
                        { icon: <Trophy size={ 14 } />, label: "Free Certificate", color: C.amber },
                        { icon: <Zap size={ 14 } />, label: "100% Free", color: C.green },
                    ].map( ( b, i ) => (
                        <div key={ i } style={ {
                            display: "flex", alignItems: "center", gap: 6,
                            background: "rgba(255,255,255,.04)", border: `1px solid ${ C.border }`,
                            borderRadius: 100, padding: "6px 14px", fontSize: 12, fontWeight: 600, color: b.color,
                        } }>
                            { b.icon } { b.label }
                        </div>
                    ) ) }
                </div>
                <button onClick={ onStart } style={ {
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "14px 36px", borderRadius: 12,
                    background: `linear-gradient(135deg, ${ C.primary }, #8b5cf6)`,
                    border: "none", color: "#fff", cursor: "pointer",
                    fontFamily: "inherit", fontSize: 16, fontWeight: 700,
                    boxShadow: "0 4px 24px rgba(99,102,241,.35)", transition: "all .2s",
                } }
                    onMouseEnter={ e => e.currentTarget.style.transform = "translateY(-2px)" }
                    onMouseLeave={ e => e.currentTarget.style.transform = "none" }>
                    Start Learning <ChevronRight size={ 17 } />
                </button>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────
// COMING SOON
// ─────────────────────────────────────────────────────────
function ComingSoon( { langId } ) {
    const lang = LANGUAGES.find( l => l.id === langId );
    const Icon = lang?.icon || Code2;
    return (
        <div style={ { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 40 } }>
            <div style={ { textAlign: "center" } }>
                <div style={ {
                    width: 64, height: 64, borderRadius: 16,
                    background: lang?.colorDim || C.primaryDim,
                    border: `1px solid ${ lang?.color || C.primary }30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 20px",
                } }>
                    <Icon size={ 28 } color={ lang?.color || C.primary } />
                </div>
                <h2 style={ { fontSize: 28, fontWeight: 800, color: C.text, marginBottom: 12 } }>
                    { lang?.name } — Coming Soon
                </h2>
                <p style={ { fontSize: 16, color: C.muted, maxWidth: 400, lineHeight: 1.7 } }>
                    We're building an amazing { lang?.name } course right now. Start with HTML to get a feel for how we teach.
                </p>
                <div style={ {
                    marginTop: 24, padding: "14px 24px",
                    background: "rgba(245,158,11,.08)", border: "1px solid rgba(245,158,11,.2)",
                    borderRadius: 12, display: "inline-flex", alignItems: "center", gap: 8,
                    fontSize: 14, color: C.amber, fontWeight: 600,
                } }>
                    <Flame size={ 15 } /> Be the first to know — join the waitlist
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────
export default function Learnings() {
    const [ activeLanguage, setActiveLanguage ] = useState( "html" );
    const [ currentTopicId, setCurrentTopicId ] = useState( null );
    const [ completed, setCompleted ] = useState( [] );
    const [ sidebarOpen, setSidebarOpen ] = useState( false );

    const course = COURSE_MAP[ activeLanguage ] || null;
    const topic = course?.topics.find( t => t.id === currentTopicId ) || null;

    const handleLanguageChange = ( id ) => { setActiveLanguage( id ); setCurrentTopicId( null ); setSidebarOpen( false ); };

    const handleNext = () => {
        if ( !course ) return;
        const idx = course.topics.findIndex( t => t.id === currentTopicId );
        if ( idx < course.topics.length - 1 ) setCurrentTopicId( course.topics[ idx + 1 ].id );
    };

    const handlePrev = () => {
        if ( !course ) return;
        const idx = course.topics.findIndex( t => t.id === currentTopicId );
        if ( idx > 0 ) setCurrentTopicId( course.topics[ idx - 1 ].id );
    };

    const handleComplete = () => {
        if ( currentTopicId && !completed.includes( currentTopicId ) ) {
            setCompleted( prev => [ ...prev, currentTopicId ] );
            setTimeout( () => handleNext(), 400 );
        }
    };

    const isCompleted = completed.includes( currentTopicId );
    const isAvailable = LANGUAGES.find( l => l.id === activeLanguage )?.available;

    return (
        <div style={ {
            display: "flex", flexDirection: "column", height: "100vh",
            background: C.bg, color: C.text, fontFamily: "'DM Sans', sans-serif",
            overflow: "hidden",
        } }>
            <style>{ `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(99,102,241,.3); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(99,102,241,.6); }
        .ca-sidebar { position: relative; z-index: 200; }
        @media (max-width: 768px) {
          .ca-sidebar { position: fixed !important; left: -280px; top: 0; bottom: 0; transition: left .25s cubic-bezier(.4,0,.2,1); box-shadow: none; }
          .ca-sidebar.ca-sidebar-open { left: 0 !important; box-shadow: 8px 0 40px rgba(0,0,0,.5); }
          .ca-sidebar-overlay { display: block !important; }
          .ca-sidebar-close { display: flex !important; }
          .ca-content-header { padding: 24px 20px 20px !important; }
          .ca-content-body { padding: 24px 20px !important; }
          .ca-content-footer { padding: 16px 20px !important; }
          .ca-hide-xs { display: none !important; }
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .ca-topic-content { animation: fadeIn .35s ease both; }
      `}</style>

            <LearnNavbar
                activeLanguage={ activeLanguage }
                onLanguageChange={ handleLanguageChange }
                onMenuToggle={ () => setSidebarOpen( !sidebarOpen ) }
                course={ course }
                currentTopicId={ currentTopicId }
            />

            <div style={ { flex: 1, display: "flex", overflow: "hidden", position: "relative" } }>
                { course && isAvailable && (
                    <Sidebar
                        course={ course }
                        currentTopic={ currentTopicId }
                        completed={ completed }
                        onSelect={ ( id ) => setCurrentTopicId( id ) }
                        isOpen={ sidebarOpen }
                        onClose={ () => setSidebarOpen( false ) }
                    />
                ) }
                <div style={ { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" } } className="ca-topic-content">
                    { !isAvailable
                        ? <ComingSoon langId={ activeLanguage } />
                        : currentTopicId === null
                            ? <CourseLanding course={ course } onStart={ () => setCurrentTopicId( 1 ) } />
                            : <TopicContent
                                topic={ topic }
                                course={ course }
                                onPrev={ handlePrev }
                                onNext={ handleNext }
                                onComplete={ handleComplete }
                                isCompleted={ isCompleted }
                            />
                    }
                </div>
            </div>
        </div>
    );
}