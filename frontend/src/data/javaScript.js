export const javaScriptCourse = {
    id: "javascript",
    title: "JavaScript",
    color: "#f0b300",
    colorDim: "rgba(240,179,0,.12)",
    icon: "🟨",
    description: "The language of the web",
    totalTopics: 22,
    topics: [
        // ─── TOPIC 1: Unchanged ───────────────────────────────────────
        {
            id: 1,
            title: "What is javascript",
            subtitle: "",
            duration: "3 min read",
            sections: [
                {
                    type: "analogy",
                    icon: "🧩",
                    heading: "JavaScript Analogy",
                    content: "Think of JavaScript like a chef's knife in a kitchen. Just as a chef uses a knife to chop, slice, and prepare ingredients, JavaScript is used to manipulate and interact with web pages.",
                },
                {
                    type: "concept",
                    heading: "What is JavaScript?",
                    content: "JavaScript is a programming language that enables interactive web pages."
                },
                {
                    type: "fact",
                    icon: "💡",
                    heading: "JavaScript is a scripting language",
                    content: "JavaScript is used to make web pages interactive and dynamic. It allows you to create things like animations, form validations, and dynamic content updates without needing to reload the page."
                },
                {
                    type: "code",
                    language: "javascript",
                    heading: "Basic JavaScript Syntax",
                    code: "console.log('Hello, World!');",
                    output: {
                        type: "preview",
                        content: `<div style="font-family:serif;padding:8px"><h1 style="font-size:28px;font-weight:bold;margin-bottom:8px">Hello, World!</h1></div>`
                    },
                    explanation: "This code uses the console.log() function to print 'Hello, World!' to the browser's console. It's a simple way to see how JavaScript works and is often the first line of code that beginners learn."
                },
                {
                    type: "takeaway",
                    icon: "🎯",
                    points: [
                        "JavaScript is essential for creating interactive web experiences.",
                        "It runs in the browser and can manipulate web page content.",
                        "JavaScript is a versatile language used for both front-end and back-end development.",
                        "Learning JavaScript opens up a world of possibilities in web development.",
                        "JavaScript is a powerful tool for bringing web pages to life!",
                    ]
                }
            ]
        },

        // ─── TOPIC 2: FULLY UPDATED ───────────────────────────────────
        {
            id: 2,
            title: "Variables & Memory Storage",
            subtitle: "Deep Dive into Stack, Heap, and the 'Var' Trap",
            duration: "20 min read",
            sections: [
                // 1. ANALOGY
                {
                    type: "analogy",
                    icon: "🏗️",
                    heading: "The Architect's Office",
                    content: "Socho JavaScript Engine ek architect ka office hai. **Stack** wo desk hai jahan turant kaam hone waale nakshe (Primitives) rakhe hain. **Heap** wo bada store-room hai jahan bade models (Objects/Arrays) rakhe hain. Jab aap variable banate ho, aap sirf ek 'Label' bana rahe ho jo kisi na kisi jagah ko point kar raha hai.",
                    memoryDiagram: {
                        stack: {
                            label: "📋 STACK — Turant kaam ki desk",
                            note: "✅ Fast · Fixed Size · Auto-cleanup",
                            rows: [
                                { addr: "0x001", name: "x", value: "10" },
                                { addr: "0x002", name: "name", value: '"Rahul"' },
                                { addr: "0x003", name: "flag", value: "true" }
                            ]
                        },
                        heap: {
                            label: "🏬 HEAP — Bada storeroom",
                            note: "⚠️ Slower · Dynamic · GC needed",
                            rows: [
                                { addr: "0xA01", name: "user", value: '{name:"Rahul"}' },
                                { addr: "0xA02", name: "nums", value: "[1, 2, 3]" },
                                { addr: "0xA03", name: "config", value: "{...}" }
                            ]
                        }
                    },
                    keyInsight: "Jab aap koi variable banate ho, JS engine decide karta hai ki data Stack mein rakhe ya Heap mein. Primitive values = Stack. Objects/Arrays = Heap. Simple."
                },

                // 2. CONCEPT — var vs let vs const
                {
                    type: "concept",
                    heading: "1. The Evolution: Why 'let' & 'const'?",
                    content: "2015 se pehle sirf `var` tha. `var` ki sabse badi dikkat thi **'Function Scoping'** aur **'Hoisting'**. Ye variables ko global window mein leak kar deta tha, jisse bade projects mein bugs aate the. ES6 ne `let` aur `const` diya jo **Block Scoped** hain (matlab `{ }` ke bahar nahi nikal sakte).",
                    comparisonTable: [
                        { property: "Scope", var: "Function Scope", letConst: "Block Scope { }" },
                        { property: "Hoisting", var: "Hota hai (undefined)", letConst: "TDZ protect karta hai" },
                        { property: "Re-declare", var: "Same scope mein kar sakte ho", letConst: "Error aata hai (safe!)" },
                        { property: "Global leak", var: "window.xyz ban jata hai", letConst: "Global nahi banta" },
                        { property: "Use karo?", var: "🚫 Avoid karo", letConst: "✅ Always use" }
                    ],
                    ruleTip: "Default pe `const` use karo. Agar value change karni ho toh `let`. `var`? Bhool jao."
                },

                // 3. DEEP DIVE — Primitive vs Reference
                {
                    type: "deep-dive",
                    icon: "🔬",
                    heading: "2. Primitive vs Reference Types (The Secret)",
                    content: "JS mein data do tarah se save hota hai:\n- **Primitives (Number, String, Boolean):** Ye 'Stack' mein save hote hain. Jab aap `a = b` karte ho, toh puri value copy hoti hai.\n- **Reference (Object, Array):** Ye 'Heap' mein save hote hain. Jab aap `obj1 = obj2` karte ho, toh sirf **Address (Memory Link)** copy hota hai, data nahi!",
                    primitives: [ "Number", "String", "Boolean", "null", "undefined", "Symbol" ],
                    references: [ "Object", "Array", "Function" ]
                },

                // 4. CODE — Primitive Copy
                {
                    type: "code",
                    language: "javascript",
                    heading: "Example 1: Primitive Copy — Stack Safe Hai",
                    code: `// ✅ Primitive Copy — Value copy hoti hai
let x = 10;           // Stack mein x = 10
let y = x;            // Stack mein y = 10 (NAYA copy)

y = 20;               // sirf y badla, x nahi

console.log(x);       // 10  ← Same hai!
console.log(y);       // 20`,
                    output: {
                        type: "preview",
                        content: `<div style="background:#080812;padding:16px;border-radius:8px;font-family:'Fira Code',monospace;font-size:13px;line-height:1.8;">
                            <span style="color:#546e7a;">// Output:</span><br/>
                            <span style="color:#c3e88d;">10 ← x unchanged ✅</span><br/>
                            <span style="color:#c3e88d;">20</span>
                        </div>`
                    },
                    explanation: "Jab aapne `y = x` likha, JS ne Stack mein ek bilkul naya box banaya aur usme 10 copy kar diya. Dono boxes independent hain. Ek change karne se doosra nahi badhta."
                },

                // 5. CODE — Reference Trap
                {
                    type: "code",
                    language: "javascript",
                    heading: "Example 2: The 'Copy' Mistake (Interview Special)",
                    code: `// 🚨 Reference Copy — Address copy hota hai!
let arr1 = [1, 2, 3];       // Heap mein bana 0xA01
let arr2 = arr1;             // arr2 ne 0xA01 pakad liya!
                             // Naya array NAHI bana

arr2.push(4);                // 0xA01 pe change hua

console.log(arr1);           // [1,2,3,4] ← SHOCK! 😱
console.log(arr2);           // [1,2,3,4] ← Same!

// ────────────────────────────────────────────
// ✅ SOLUTION: Spread Operator se true copy
// ────────────────────────────────────────────
let arr3 = [1, 2, 3];
let arr4 = [...arr3];        // Naya array banata hai!

arr4.push(4);

console.log(arr3);           // [1,2,3] ← Safe! ✅
console.log(arr4);           // [1,2,3,4]`,
                    output: {
                        type: "preview",
                        content: `<div style="background:#080812;padding:16px;border-radius:8px;font-family:'Fira Code',monospace;font-size:13px;line-height:1.8;">
                            <span style="color:#f07178;">[1, 2, 3, 4] ← arr1 bhi badal gaya! 😱</span><br/>
                            <span style="color:#f07178;">[1, 2, 3, 4]</span><br/><br/>
                            <span style="color:#c3e88d;">[1, 2, 3] ← Spread se safe ✅</span><br/>
                            <span style="color:#c3e88d;">[1, 2, 3, 4]</span>
                        </div>`
                    },
                    explanation: "`arr2 = arr1` karte time JS ne Heap mein naya array nahi banaya. Dono variables ek hi memory address 0xA01 pe point kar rahe hain. Matlab `arr2` sirf ek alias (doosra naam) hai us array ka. Ek se change karo, dono mein dikhega.\n\nFix: `[...arr3]` ya `Array.from(arr3)` ya `arr3.slice()` se genuinely naya array banta hai."
                },

                // 6. CODE — Object Copy Trap
                {
                    type: "code",
                    language: "javascript",
                    heading: "Example 3: Object Copy Trap",
                    code: `// 🚨 Object Reference Trap
let user1 = { name: "Rahul", age: 20 };
let user2 = user1;          // Sirf address copy

user2.name = "Priya";

console.log(user1.name);   // "Priya" ← user1 bhi badla! 😱

// ✅ Shallow Copy (1 level deep)
let user3 = {...user1};    // Object spread
// ya
let user4 = Object.assign({}, user1);

// ✅ Deep Copy (nested objects ke liye)
let user5 = JSON.parse(JSON.stringify(user1));`,
                    output: {
                        type: "preview",
                        content: `<div style="background:#080812;padding:16px;border-radius:8px;font-family:'Fira Code',monospace;font-size:13px;">
                            <span style="color:#f07178;">"Priya" ← user1 bhi badal gaya 😱</span>
                        </div>`
                    },
                    explanation: "`{...obj}` sirf 1 level deep copy karta hai. Agar object ke andar object ho (nested), toh woh phir bhi reference rahega. Iske liye `JSON.parse(JSON.stringify())` use karo — lekin ye methods aur functions ko copy nahi karta."
                },

                // 7. ERROR ALERT — Shadowing
                {
                    type: "error-alert",
                    icon: "🚫",
                    heading: "Common Mistake #1: Variable Shadowing — var se scope leak",
                    content: "Ye beginners ki sabse common galti hai — ek hi naam ka variable bahar aur andar block mein bana dena. `var` ke saath ye outer variable ko silently overwrite kar deta hai."
                },

                // 8. CODE — Shadowing
                {
                    type: "code",
                    language: "javascript",
                    heading: "Example 4: Shadowing & Scope Leak",
                    code: `// 🚨 var Shadowing Trap
var count = 100;        // Global var

{
  var count = 10;       // 🚨 var { } nahi maanta!
  let score = 200;      // Block scoped — safe
}

console.log(count);    // 10 ← 100 kahan gaya?! 😱
console.log(score);    // ReferenceError ← Safe! ✅

// ─────────────────────────────────────────
// ✅ let use karo — Shadowing controlled
// ─────────────────────────────────────────
let total = 100;

{
  let total = 10;       // Intentional shadowing (allowed)
  console.log(total);  // 10 (block wala)
}

console.log(total);    // 100 ← Outer safe hai ✅`,
                    output: {
                        type: "preview",
                        content: `<div style="background:#2d0000;color:#ffbaba;padding:15px;border-radius:8px;border:1px solid #ff4444;">
                            <strong>🚨 var Output:</strong><br/>
                            10 ← 100 overwrite ho gaya!<br/>
                            ReferenceError: score is not defined<br/><br/>
                            <span style="color:#c3e88d;"><strong>✅ let Output:</strong><br/>
                            10<br/>100 ← Outer safe raha!</span>
                        </div>`
                    },
                    explanation: "`var` ko curly braces `{ }` ki koi parwah nahi. Wo sirf function boundary maanta hai. Isliye block ke andar `var count = 10` karne se bahar wala `count` bhi badal gaya. `let` ke saath aisa nahi hota."
                },

                // 9. ERROR ALERT — Hoisting
                {
                    type: "error-alert",
                    icon: "🚫",
                    heading: "Common Mistake #2: Hoisting Confusion",
                    content: "Naye developers sochte hain variable declare karne se pehle use nahi kar sakte — `var` ke saath ye galat hai. `var` silently `undefined` return karta hai, error nahi deta — jo ek hidden bug hai."
                },

                // 10. CODE — Hoisting
                {
                    type: "code",
                    language: "javascript",
                    heading: "Example 5: Hoisting ka Kaam",
                    code: `// 🤔 Aap sochte ho ye error dega...
console.log(myVar);   // undefined (Error nahi!) 😕
var myVar = 5;
console.log(myVar);   // 5

// Internally JS aise karta hai:
var myVar;            // ← Upar aa gaya (hoisted)
console.log(myVar);   // undefined
myVar = 5;

// ─────────────────────────────────────────
// ✅ let/const — TDZ protect karta hai
// ─────────────────────────────────────────
console.log(myLet);   // ReferenceError: TDZ! ✅
let myLet = 5;`,
                    output: {
                        type: "preview",
                        content: `<div style="background:#080812;padding:16px;border-radius:8px;font-family:'Fira Code',monospace;font-size:13px;line-height:1.8;">
                            <span style="color:#ffcb6b;">undefined ← Error nahi, par misleading! 😕</span><br/>
                            <span style="color:#c3e88d;">5</span><br/><br/>
                            <span style="color:#f07178;">ReferenceError: Cannot access 'myLet' before initialization</span>
                        </div>`
                    },
                    explanation: "JS code run karne se pehle compilation phase mein saare `var` declarations ko upar le jaata hai (hoist karta hai) — sirf declaration, assignment nahi. Isliye `undefined` aata hai error nahi. `let` aur `const` bhi technically hoist hote hain — lekin TDZ unhe access nahi karne deta."
                },

                // 11. DETAILED STEP — TDZ
                {
                    type: "detailed-step",
                    heading: "3. The Temporal Dead Zone (TDZ) Explained",
                    content: "Jab aap `let` ya `const` use karte ho, JS unhe memory deta hai par unhe 'Uninitialized' rakhta hai jab tak wo line execute na ho jaye. Is 'waiting period' ko TDZ kehte hain.",
                    tdzVisual: [
                        { line: "L1", code: "// start of block", status: "tdz-start", tag: "TDZ START" },
                        { line: "L2", code: "console.log(name);", status: "danger", tag: "🚨 ERROR" },
                        { line: "L3", code: 'let name = "Rahul";', status: "neutral", tag: "TDZ END" },
                        { line: "L4", code: "console.log(name);", status: "safe", tag: "✅ SAFE" }
                    ],
                    tip: "TDZ aapko accidentally declaration se pehle variable use karne se bachata hai — jo var ke saath ek silent bug create karta tha (undefined return karke)."
                },

                // 12. WARNING — const misconception
                {
                    type: "error-alert",
                    icon: "⚠️",
                    heading: "Common Mistake #3: const ka matlab 'freeze' nahi",
                    content: "Bahut log sochte hain `const` object ya array ko completely freeze kar deta hai. Ye galat hai! `const` sirf variable ki binding fix karta hai — Heap ka data toh badal sakta hai."
                },

                // 13. CODE — const trap
                {
                    type: "code",
                    language: "javascript",
                    heading: "Example 6: const Object Trap",
                    code: `// ⚠️ const ke saath ye possible hai:
const user = { name: "Rahul" };
user.name = "Priya";          // ✅ Works! Object mutate ho sakta
console.log(user);            // {name: "Priya"}

// 🚨 const ke saath ye NAHI hoga:
user = { name: "Someone" };   // TypeError! Reassign nahi

// ────────────────────────────────────────────
// ✅ True freeze: Object.freeze()
// ────────────────────────────────────────────
const config = Object.freeze({
  apiKey: "abc123",
  maxLimit: 100
});

config.apiKey = "hacked";    // Silently ignored
console.log(config.apiKey);  // "abc123" ← Unchanged ✅`,
                    output: {
                        type: "preview",
                        content: `<div style="background:#080812;padding:16px;border-radius:8px;font-family:'Fira Code',monospace;font-size:13px;line-height:1.8;">
                            <span style="color:#ffcb6b;">{name: "Priya"} ← mutate hua!</span><br/>
                            <span style="color:#f07178;">TypeError: Assignment to constant variable</span><br/><br/>
                            <span style="color:#c3e88d;">"abc123" ← Object.freeze ne protect kiya ✅</span>
                        </div>`
                    },
                    explanation: "`const` sirf ye fix karta hai ki variable kis address ko point kar raha hai. Heap mein jo data hai, use toh aap badal sakte ho! Agar truly immutable object chahiye toh `Object.freeze()` use karo."
                },

                // 14. PRO TIP — Memory Management
                {
                    type: "pro-tip",
                    icon: "💡",
                    heading: "Memory Management Tip",
                    content: "Jab bade Arrays ya Objects ka kaam khatam ho jaye, unhe `null` assign kar do. Isse JS ka 'Garbage Collector' unhe memory se saaf kar dega aur aapki app fast chalegi.",
                    code: `let bigData = fetchMillionRecords();
// ... processing ...
bigData = null;   // ✅ GC ab free karega Heap memory`
                },

                // 15. SUMMARY
                {
                    type: "summary-lesson",
                    icon: "🎓",
                    heading: "Humne Kya Sikha? (Mastery Points)",
                    points: [
                        "Hamesha `const` use karo, jab tak variable badalna na ho (`let`). `var` ko bhool jao.",
                        "Primitives 'Stack' mein jate hain (Fast), Objects 'Heap' mein (Large Storage).",
                        "Objects copy karte waqt dhyan rakho — sirf 'Address' copy ho raha hai, data nahi.",
                        "Array copy ke liye `[...arr]`, Object copy ke liye `{...obj}`. Nested ke liye JSON trick.",
                        "Temporal Dead Zone aapka dost hai — hoisting ke bugs se bachata hai.",
                        "Block Scope `{ }` variables ko 'private' rakhne mein madad karta hai.",
                        "`const` sirf binding fix karta hai — object freeze nahi hota. `Object.freeze()` use karo.",
                        "Kaam khatam hone pe bade objects ko `null` karo — Garbage Collector memory free karega."
                    ]
                }
            ]
        }

        // ... aur topics aage yahan add karte raho
    ]
}