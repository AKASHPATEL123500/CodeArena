// ============================================================
// HTML COURSE DATA — CodeArena Learning Platform
// Zero to Advance — 20 Topics
// ============================================================

export const htmlCourse = {
    id: "html",
    title: "HTML",
    color: "#e34f26",
    colorDim: "rgba(227,79,38,.12)",
    icon: "🌐",
    description: "Build the skeleton of every webpage",
    totalTopics: 20,
    topics: [
        // ── 01 ──────────────────────────────────────────────────
        {
            id: 1,
            title: "What is HTML?",
            subtitle: "The language of the web",
            duration: "3 min read",
            sections: [
                {
                    type: "analogy",
                    icon: "🏗️",
                    heading: "Think of it like this…",
                    content: `Imagine building a house. Before painting, furniture, or lights — you need the **skeleton**: walls, doors, windows, rooms.\n\nHTML is exactly that skeleton for a website.\n\n- **HTML** = structure (walls, doors)\n- **CSS** = looks (paint, decoration)\n- **JavaScript** = behaviour (lights, locks, appliances)\n\nEvery website you visit — Google, YouTube, Instagram — starts with HTML.`,
                },
                {
                    type: "concept",
                    heading: "So what exactly is HTML?",
                    content: `**HTML** stands for **HyperText Markup Language**.\n\nDon't let the name scare you. It just means:\n- **HyperText** → text that can link to other pages\n- **Markup** → you "mark up" content with tags to give it meaning\n- **Language** → a set of rules browsers understand\n\nHTML is NOT a programming language. It doesn't do calculations or logic. It simply **describes** what content is on the page and what each piece means.`,
                },
                {
                    type: "fact",
                    icon: "💡",
                    heading: "Key Insight",
                    content: `HTML was invented by **Tim Berners-Lee** in 1991. The entire web was built on this one idea: wrapping text in tags to give it meaning. 30+ years later, it still works the same way.`,
                },
                {
                    type: "code",
                    heading: "Your first HTML",
                    language: "html",
                    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first webpage.</p>
</body>
</html>


`,
                    output: {
                        type: "preview",
                        content: `<div style="font-family:serif;padding:8px"><h1 style="font-size:28px;font-weight:bold;margin-bottom:8px">Hello, World!</h1><p style="font-size:16px">This is my first webpage.</p></div>`,
                    },
                    explanation: `\`<h1>\` makes a big heading. \`<p>\` makes a paragraph. That's it. The browser reads these tags and shows the right thing.`,
                },
                {
                    type: "takeaway",
                    points: [
                        "HTML gives structure and meaning to content",
                        "It uses tags wrapped in angle brackets < >",
                        "Every webpage in the world uses HTML",
                        "It works alongside CSS (looks) and JS (behaviour)",
                    ],
                },
            ],
        },

        // ── 02 ──────────────────────────────────────────────────
        {
            id: 2,
            title: "HTML Tags & Elements",
            subtitle: "The building blocks of HTML",
            duration: "4 min read",
            sections: [
                {
                    type: "analogy",
                    icon: "🏷️",
                    heading: "Tags are like labels",
                    content: `Imagine you're organising files. You put a label on each folder: "PHOTOS", "BILLS", "WORK".\n\nHTML tags are those labels. They tell the browser:\n- "This is a **heading**"\n- "This is a **paragraph**"\n- "This is a **link**"\n\nThe browser reads the label and displays the content correctly.`,
                },
                {
                    type: "concept",
                    heading: "Anatomy of an HTML element",
                    content: `An **element** has 3 parts:\n1. **Opening tag** → tells browser where it starts\n2. **Content** → what the user sees\n3. **Closing tag** → tells browser where it ends (has a slash /)`,
                },
                {
                    type: "code",
                    heading: "Breaking it down",
                    language: "html",
                    code: `<!-- Full element structure -->
<tagname> content here </tagname>

<!-- Real example -->
<p> I love coding! </p>

<!-- Opening tag:  <p>    -->
<!-- Content:      I love coding!   -->
<!-- Closing tag:  </p>   -->`,
                    explanation: `The \`<!-- -->\` parts are comments — notes for humans. The browser ignores them completely.`,
                },
                {
                    type: "code",
                    heading: "Common tags you'll use daily",
                    language: "html",
                    code: `<h1>Biggest Heading</h1>
<h2>Smaller Heading</h2>
<h3>Even Smaller</h3>

<p>A paragraph of text goes here.</p>

<strong>Bold text</strong>
<em>Italic text</em>

<br>  <!-- line break — no closing tag needed! -->`,
                    output: {
                        type: "preview",
                        content: `<div style="font-family:serif;padding:8px;line-height:1.6"><h1 style="font-size:26px;font-weight:bold">Biggest Heading</h1><h2 style="font-size:20px;font-weight:bold">Smaller Heading</h2><h3 style="font-size:16px;font-weight:bold">Even Smaller</h3><p style="margin-top:8px">A paragraph of text goes here.</p><p style="margin-top:6px"><strong>Bold text</strong> &nbsp; <em>Italic text</em></p></div>`,
                    },
                },
                {
                    type: "fact",
                    icon: "⚡",
                    heading: "Self-closing tags",
                    content: `Some tags don't wrap content — they stand alone. These are called **void elements** or **self-closing tags**.\n\n\`<br>\` → line break\n\`<img>\` → image\n\`<input>\` → form field\n\nThey have no closing tag because there's nothing to wrap.`,
                },
                {
                    type: "takeaway",
                    points: [
                        "Tags come in pairs: opening <tag> and closing </tag>",
                        "Opening + content + closing = one element",
                        "Some tags are self-closing (br, img, input)",
                        "Comments <!-- --> are ignored by browsers",
                    ],
                },
            ],
        },

        // ── 03 ──────────────────────────────────────────────────
        {
            id: 3,
            title: "HTML Document Structure",
            subtitle: "The skeleton every webpage needs",
            duration: "5 min read",
            sections: [
                {
                    type: "analogy",
                    icon: "📄",
                    heading: "Every book has a structure",
                    content: `A book always has:\n- A **cover** with title & author\n- A **table of contents**\n- The **main content**\n\nAn HTML page works the same way. It has a required structure that every single webpage must follow — no exceptions.`,
                },
                {
                    type: "code",
                    heading: "The complete HTML template",
                    language: "html",
                    code: `<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Page</title>
  </head>

  <body>
    <h1>Hello World!</h1>
    <p>This is visible on the page.</p>
  </body>

</html>`,
                    explanation: `This is the **boilerplate** — copy this for every HTML project you start.`,
                },
                {
                    type: "concept",
                    heading: "What does each part do?",
                    content: `**\`<!DOCTYPE html>\`** → Tells the browser: "This is modern HTML5". Always the very first line.\n\n**\`<html lang="en">\`** → The root element. Everything lives inside this. \`lang="en"\` tells search engines the language.\n\n**\`<head>\`** → The "behind the scenes" section. Users don't see this directly. Contains:\n- Page title (shown in browser tab)\n- Meta info (charset, viewport)\n- Links to CSS files\n\n**\`<body>\`** → Everything users SEE goes here. Text, images, buttons — all of it.`,
                },
                {
                    type: "fact",
                    icon: "📱",
                    heading: "What is viewport?",
                    content: `\`<meta name="viewport" content="width=device-width, initial-scale=1.0">\`\n\nThis one line makes your page work properly on mobile phones. Without it, mobile browsers zoom out and show a tiny desktop version. Always include it.`,
                },
                {
                    type: "code",
                    heading: "What users see vs what they don't",
                    language: "html",
                    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Users DON'T see this -->
  <title>CodeArena</title>  <!-- Shows in browser tab -->
  <meta charset="UTF-8">   <!-- Encoding for special chars -->
</head>
<body>
  <!-- Users SEE everything here -->
  <h1>Welcome to CodeArena!</h1>
  <p>Let's start learning HTML.</p>
</body>
</html>`,
                    output: {
                        type: "preview",
                        content: `<div style="font-family:serif;padding:8px"><h1 style="font-size:24px;font-weight:bold;margin-bottom:8px">Welcome to CodeArena!</h1><p>Let's start learning HTML.</p></div>`,
                    },
                },
                {
                    type: "takeaway",
                    points: [
                        "<!DOCTYPE html> always goes first",
                        "<head> = info about the page (not visible)",
                        "<body> = everything the user sees",
                        "<title> shows in the browser tab",
                        "Always include the viewport meta tag for mobile",
                    ],
                },
            ],
        },

        // ── 04 ──────────────────────────────────────────────────
        {
            id: 4,
            title: "Headings & Paragraphs",
            subtitle: "Organising text with meaning",
            duration: "4 min read",
            sections: [
                {
                    type: "analogy",
                    icon: "📰",
                    heading: "Think of a newspaper",
                    content: `A newspaper has:\n- A **big headline** (most important — grabs attention)\n- **Section headings** (Sports, Business, Tech)\n- **Sub-headings** (inside each section)\n- **Paragraphs** (the actual story)\n\nHTML headings work exactly the same way. They create **hierarchy** — a visual and semantic structure.`,
                },
                {
                    type: "code",
                    heading: "6 levels of headings",
                    language: "html",
                    code: `<h1>H1 — Page Title (use ONCE per page)</h1>
<h2>H2 — Major Section</h2>
<h3>H3 — Sub-section</h3>
<h4>H4 — Sub-sub-section</h4>
<h5>H5 — Rarely used</h5>
<h6>H6 — Smallest heading</h6>`,
                    output: {
                        type: "preview",
                        content: `<div style="font-family:serif;padding:8px;line-height:1.5"><h1 style="font-size:28px;font-weight:bold">H1 — Page Title</h1><h2 style="font-size:22px;font-weight:bold">H2 — Major Section</h2><h3 style="font-size:18px;font-weight:bold">H3 — Sub-section</h3><h4 style="font-size:15px;font-weight:bold">H4 — Sub-sub-section</h4><h5 style="font-size:13px;font-weight:bold">H5 — Rarely used</h5><h6 style="font-size:11px;font-weight:bold">H6 — Smallest heading</h6></div>`,
                    },
                    explanation: `Notice how the browser automatically makes each heading smaller. You never need to set the size manually — HTML handles it.`,
                },
                {
                    type: "fact",
                    icon: "🔍",
                    heading: "SEO matters here!",
                    content: `Google reads your H1 to understand what your page is about. Use **only one H1** per page — it should be the main topic. Use H2, H3 for sections. This is called **semantic HTML** and it helps your page rank in search results.`,
                },
                {
                    type: "code",
                    heading: "Paragraphs",
                    language: "html",
                    code: `<p>This is the first paragraph. It can be as long as you want.
The browser doesn't care about line breaks inside the code —
it just shows one continuous paragraph.</p>

<p>This is the second paragraph. Notice the automatic
space between paragraphs — HTML adds it for you.</p>

<!-- Want a line break inside a paragraph? -->
<p>Line one<br>Line two on a new line<br>Line three</p>`,
                    output: {
                        type: "preview",
                        content: `<div style="font-family:serif;padding:8px;line-height:1.7"><p style="margin-bottom:10px">This is the first paragraph. It can be as long as you want. The browser doesn't care about line breaks inside code.</p><p style="margin-bottom:10px">This is the second paragraph. Notice the automatic space between paragraphs.</p><p>Line one<br/>Line two on a new line<br/>Line three</p></div>`,
                    },
                },
                {
                    type: "code",
                    heading: "Real page structure example",
                    language: "html",
                    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>My Blog Post</title>
</head>
<body>

  <h1>How I Learned to Code in 6 Months</h1>

  <h2>The Beginning</h2>
  <p>I started with zero knowledge. I didn't even know
  what HTML stood for. But I was determined to learn.</p>

  <h2>First Month — HTML & CSS</h2>
  <p>HTML was the easiest part. I learned it in a week
  and immediately started building simple pages.</p>

  <h3>My favourite resource</h3>
  <p>CodeArena was by far the most beginner-friendly
  platform I found. The analogies made everything click.</p>

</body>
</html>`,
                },
                {
                    type: "takeaway",
                    points: [
                        "h1 → h6: six levels, each smaller than the last",
                        "Use only ONE h1 per page (for SEO)",
                        "p tags automatically add space between paragraphs",
                        "Use <br> for a line break within a paragraph",
                        "Headings create hierarchy — use them in order",
                    ],
                },
            ],
        },

        // ── 05 ──────────────────────────────────────────────────
        {
            id: 5,
            title: "Links & Anchors",
            subtitle: "Connecting pages together",
            duration: "5 min read",
            sections: [
                {
                    type: "analogy",
                    icon: "🔗",
                    heading: "Links are the web's superpower",
                    content: `The word "Web" in World Wide Web literally means links connecting pages — like threads in a spider's web.\n\nBefore the web, documents were isolated. Tim Berners-Lee's genius was: what if you could click a word and jump to another document anywhere on the planet?\n\nThat's still how links work today. The anchor tag \`<a>\` is what makes it happen.`,
                },
                {
                    type: "code",
                    heading: "Basic link syntax",
                    language: "html",
                    code: `<!-- href = "Hypertext REFerence" — where to go -->
<a href="https://www.google.com">Visit Google</a>

<!-- What the user sees: "Visit Google" (clickable) -->
<!-- Where it goes: https://www.google.com           -->`,
                    output: {
                        type: "preview",
                        content: `<div style="padding:8px"><a href="#" style="color:#3b82f6;text-decoration:underline">Visit Google</a></div>`,
                    },
                    explanation: `\`href\` stands for **H**ypertext **Ref**erence. It's where the link goes. The content between the tags is what the user clicks.`,
                },
                {
                    type: "concept",
                    heading: "3 types of links",
                    content: `**1. External links** → to other websites\n\`<a href="https://github.com">GitHub</a>\`\n\n**2. Internal links** → to other pages on YOUR site\n\`<a href="about.html">About Us</a>\`\n\n**3. Anchor links** → jump to a section on the SAME page\n\`<a href="#contact">Go to Contact</a>\``,
                },
                {
                    type: "code",
                    heading: "Opening in a new tab",
                    language: "html",
                    code: `<!-- Without target: replaces current page -->
<a href="https://google.com">Opens here</a>

<!-- With target="_blank": opens new tab -->
<a href="https://google.com" target="_blank">
  Opens in new tab ↗
</a>

<!-- Best practice: add rel for security -->
<a href="https://google.com"
   target="_blank"
   rel="noopener noreferrer">
  Safe external link ↗
</a>`,
                    explanation: `Always add \`rel="noopener noreferrer"\` when using \`target="_blank"\`. Without it, the new page can access your page — a security risk.`,
                },
                {
                    type: "code",
                    heading: "Anchor links — jump to sections",
                    language: "html",
                    code: `<!-- Step 1: Give a section an id -->
<h2 id="contact">Contact Us</h2>

<!-- Step 2: Link to that id with # -->
<a href="#contact">Jump to Contact</a>

<!-- Real world example — navigation -->
<nav>
  <a href="#about">About</a>
  <a href="#services">Services</a>
  <a href="#contact">Contact</a>
</nav>`,
                    explanation: `The \`#\` symbol means "on this page". This is how single-page websites create smooth scroll navigation.`,
                },
                {
                    type: "fact",
                    icon: "📧",
                    heading: "Bonus: Email & Phone links",
                    content: `\`<a href="mailto:hello@codearena.com">Email us</a>\`\nOpens the user's email app with your address pre-filled.\n\n\`<a href="tel:+911234567890">Call us</a>\`\nOn mobile, this opens the phone dialer.`,
                },
                {
                    type: "takeaway",
                    points: [
                        "<a href='URL'>text</a> is the basic link structure",
                        "href is where the link goes",
                        "target='_blank' opens in new tab",
                        "Add rel='noopener noreferrer' for security",
                        "#id creates anchor links to sections on same page",
                    ],
                },
            ],
        },

        // ── 06 ──────────────────────────────────────────────────
        {
            id: 6,
            title: "Images",
            subtitle: "Adding visuals to your page",
            duration: "4 min read",
            sections: [
                {
                    type: "analogy",
                    icon: "🖼️",
                    heading: "Images are guests",
                    content: `HTML doesn't store images inside the code. Instead, it sends an invitation:\n\n*"Hey browser, go find this image at this address and display it here."*\n\nThe \`<img>\` tag is that invitation. It tells the browser WHERE to find the image and HOW to display it.`,
                },
                {
                    type: "code",
                    heading: "The img tag",
                    language: "html",
                    code: `<!-- img is self-closing — no </img> needed -->
<img src="photo.jpg" alt="A sunset over mountains">

<!-- src = source (WHERE is the image?)  -->
<!-- alt = alternative text (WHAT is it?) -->`,
                    explanation: `\`src\` = source, the path to the image. \`alt\` = alternative text shown if image fails to load, and read by screen readers for accessibility.`,
                },
                {
                    type: "fact",
                    icon: "♿",
                    heading: "alt is not optional",
                    content: `**Always write descriptive alt text.**\n\nWhy?\n1. If image fails to load, user sees the alt text\n2. Screen readers (used by visually impaired people) read alt text aloud\n3. Search engines use alt text to understand images\n\nBad: \`alt="img1"\`\nGood: \`alt="A developer coding on a laptop at night"\``,
                },
                {
                    type: "code",
                    heading: "Image sources — 3 ways",
                    language: "html",
                    code: `<!-- 1. Same folder -->
<img src="photo.jpg" alt="My photo">

<!-- 2. Inside a folder -->
<img src="images/logo.png" alt="Site logo">

<!-- 3. From the internet (URL) -->
<img src="https://via.placeholder.com/300x200"
     alt="Placeholder image">`,
                },
                {
                    type: "code",
                    heading: "Controlling size",
                    language: "html",
                    code: `<!-- Set width (height adjusts automatically) -->
<img src="photo.jpg" alt="Photo" width="300">

<!-- Set both (careful — may stretch!) -->
<img src="photo.jpg" alt="Photo" width="300" height="200">

<!-- Best practice: use CSS for sizing
     (we'll learn this in the CSS course) -->
<img src="photo.jpg" alt="Photo" style="width: 300px;">`,
                    output: {
                        type: "preview",
                        content: `<div style="padding:8px"><img src="https://picsum.photos/300/180" alt="Sample landscape photo" style="width:280px;border-radius:6px;display:block"/><p style="font-size:12px;color:#888;margin-top:6px">↑ Example image loaded from URL</p></div>`,
                    },
                },
                {
                    type: "code",
                    heading: "Making an image a link",
                    language: "html",
                    code: `<!-- Wrap <img> inside <a> tag -->
<a href="https://codearena.com">
  <img src="logo.png" alt="CodeArena — go to homepage">
</a>

<!-- Clicking the image now navigates to the URL -->`,
                },
                {
                    type: "takeaway",
                    points: [
                        "<img> is self-closing — no closing tag",
                        "src tells the browser WHERE to find the image",
                        "alt is required for accessibility and SEO",
                        "Use width attribute or CSS to control size",
                        "Wrap image in <a> to make it clickable",
                    ],
                },
            ],
        },

        // ── 07 ──────────────────────────────────────────────────
        {
            id: 7,
            title: "Lists",
            subtitle: "Ordered and unordered lists",
            duration: "4 min read",
            sections: [
                {
                    type: "analogy",
                    icon: "📋",
                    heading: "Two kinds of lists",
                    content: `Think of the difference between:\n\n**A shopping list** → order doesn't matter, just bullet points\n- Milk\n- Eggs  \n- Bread\n\n**A recipe** → order matters CRITICALLY\n1. Boil water\n2. Add pasta\n3. Cook for 10 minutes\n\nHTML has both: **unordered** (bullets) and **ordered** (numbers).`,
                },
                {
                    type: "code",
                    heading: "Unordered list — ul",
                    language: "html",
                    code: `<!-- ul = unordered list -->
<!-- li = list item -->
<ul>
  <li>HTML — structure</li>
  <li>CSS — styling</li>
  <li>JavaScript — behaviour</li>
</ul>`,
                    output: {
                        type: "preview",
                        content: `<div style="padding:8px"><ul style="list-style:disc;padding-left:20px;line-height:2"><li>HTML — structure</li><li>CSS — styling</li><li>JavaScript — behaviour</li></ul></div>`,
                    },
                    explanation: `\`<ul>\` creates the list container. Each \`<li>\` is one item. The browser adds bullets automatically.`,
                },
                {
                    type: "code",
                    heading: "Ordered list — ol",
                    language: "html",
                    code: `<!-- ol = ordered list (numbered) -->
<ol>
  <li>Create HTML file</li>
  <li>Write the boilerplate</li>
  <li>Add your content</li>
  <li>Open in browser</li>
</ol>`,
                    output: {
                        type: "preview",
                        content: `<div style="padding:8px"><ol style="list-style:decimal;padding-left:22px;line-height:2"><li>Create HTML file</li><li>Write the boilerplate</li><li>Add your content</li><li>Open in browser</li></ol></div>`,
                    },
                },
                {
                    type: "code",
                    heading: "Nested lists — lists inside lists",
                    language: "html",
                    code: `<ul>
  <li>Frontend
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
    </ul>
  </li>
  <li>Backend
    <ul>
      <li>Node.js</li>
      <li>Python</li>
    </ul>
  </li>
</ul>`,
                    output: {
                        type: "preview",
                        content: `<div style="padding:8px"><ul style="list-style:disc;padding-left:18px;line-height:1.9"><li>Frontend<ul style="list-style:circle;padding-left:18px"><li>HTML</li><li>CSS</li><li>JavaScript</li></ul></li><li>Backend<ul style="list-style:circle;padding-left:18px"><li>Node.js</li><li>Python</li></ul></li></ul></div>`,
                    },
                },
                {
                    type: "concept",
                    heading: "Description list — dl",
                    content: `There's a third, lesser-known list type: the **description list**. Perfect for glossaries, FAQs, or term definitions.\n\n\`<dl>\` = description list container\n\`<dt>\` = description term (the word/question)\n\`<dd>\` = description detail (the explanation)`,
                },
                {
                    type: "code",
                    heading: "Description list example",
                    language: "html",
                    code: `<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language — structures webpages</dd>

  <dt>CSS</dt>
  <dd>Cascading Style Sheets — styles webpages</dd>

  <dt>JavaScript</dt>
  <dd>Programming language that makes pages interactive</dd>
</dl>`,
                    output: {
                        type: "preview",
                        content: `<div style="padding:8px;line-height:1.8"><dl><dt style="font-weight:bold">HTML</dt><dd style="margin-left:20px;color:#666;margin-bottom:6px">HyperText Markup Language — structures webpages</dd><dt style="font-weight:bold">CSS</dt><dd style="margin-left:20px;color:#666;margin-bottom:6px">Cascading Style Sheets — styles webpages</dd><dt style="font-weight:bold">JavaScript</dt><dd style="margin-left:20px;color:#666">Programming language that makes pages interactive</dd></dl></div>`,
                    },
                },
                {
                    type: "takeaway",
                    points: [
                        "ul = unordered list (bullets) — order doesn't matter",
                        "ol = ordered list (numbers) — order matters",
                        "li = list item (used in both ul and ol)",
                        "Lists can be nested inside each other",
                        "dl/dt/dd = description lists for glossaries/FAQs",
                    ],
                },
            ],
        },

        // ── 08 ──────────────────────────────────────────────────
        {
            id: 8,
            title: "Attributes",
            subtitle: "Giving tags extra information",
            duration: "4 min read",
            sections: [
                {
                    type: "analogy",
                    icon: "🎛️",
                    heading: "Attributes are settings",
                    content: `Imagine ordering a coffee:\n- "Give me a **coffee**" — that's the tag\n- "Make it **large**, **hot**, with **oat milk**" — those are attributes\n\nAttributes are extra settings that customise how a tag behaves or looks. They always go INSIDE the opening tag.`,
                },
                {
                    type: "code",
                    heading: "Attribute syntax",
                    language: "html",
                    code: `<!-- attribute goes inside the opening tag -->
<!-- format: name="value" -->

<tag attribute="value">content</tag>

<!-- Real examples -->
<a href="https://google.com">Google</a>
<img src="photo.jpg" alt="My photo" width="300">
<input type="text" placeholder="Type here">`,
                    explanation: `Attributes always have a **name** and a **value**, separated by \`=\`, with the value in quotes.`,
                },
                {
                    type: "concept",
                    heading: "Global attributes — work on ANY tag",
                    content: `Some attributes work on every HTML element:\n\n**\`id\`** → unique identifier (only one per page)\n\`<h1 id="main-title">Hello</h1>\`\n\n**\`class\`** → group elements (multiple per page OK)\n\`<p class="intro">Paragraph</p>\`\n\n**\`style\`** → inline CSS (avoid if possible)\n\`<p style="color: red;">Red text</p>\`\n\n**\`title\`** → tooltip on hover\n\`<p title="More info here">Hover me</p>\``,
                },
                {
                    type: "code",
                    heading: "id vs class — the key difference",
                    language: "html",
                    code: `<!-- id = unique. Only ONE element per page -->
<h1 id="page-title">Welcome</h1>
<p id="intro-text">First paragraph</p>

<!-- class = reusable. Use on MANY elements -->
<p class="highlight">First important text</p>
<p class="highlight">Second important text</p>
<p class="highlight">Third important text</p>

<!-- One element can have multiple classes -->
<p class="highlight large centered">Special text</p>`,
                    explanation: `\`id\` is like a passport — unique to one person. \`class\` is like a team jersey number — many people can wear the same number.`,
                },
                {
                    type: "code",
                    heading: "Boolean attributes",
                    language: "html",
                    code: `<!-- Some attributes are boolean — just write the name -->
<!-- No value needed! Their presence = true -->

<input type="text" disabled>     <!-- input is disabled -->
<input type="checkbox" checked>  <!-- checkbox is ticked -->
<video autoplay muted loop>      <!-- video plays auto -->

<!-- These two are equivalent: -->
<input disabled>
<input disabled="disabled">`,
                },
                {
                    type: "takeaway",
                    points: [
                        "Attributes go inside the opening tag",
                        "Format: name=\"value\" (always in quotes)",
                        "id is unique — one per page per id",
                        "class is reusable — many elements can share",
                        "Boolean attributes just need the name, no value",
                    ],
                },
            ],
        },

        // ── 09 ──────────────────────────────────────────────────
        {
            id: 9,
            title: "Tables",
            subtitle: "Displaying data in rows and columns",
            duration: "5 min read",
            sections: [
                {
                    type: "analogy",
                    icon: "📊",
                    heading: "Tables are like Excel sheets",
                    content: `Think of any spreadsheet — rows, columns, cells. HTML tables work exactly the same way.\n\nUse tables for **tabular data** — data that genuinely makes sense in rows and columns:\n- Price comparisons\n- Schedules\n- Statistics\n\n❌ Don't use tables for page layout — that's what CSS Grid and Flexbox are for.`,
                },
                {
                    type: "code",
                    heading: "Table structure",
                    language: "html",
                    code: `<table>
  <thead>           <!-- Table header section -->
    <tr>            <!-- tr = table row -->
      <th>Name</th> <!-- th = table header cell (bold) -->
      <th>Language</th>
      <th>Level</th>
    </tr>
  </thead>

  <tbody>           <!-- Table body section -->
    <tr>
      <td>Arjun</td>   <!-- td = table data cell -->
      <td>Python</td>
      <td>Intermediate</td>
    </tr>
    <tr>
      <td>Priya</td>
      <td>JavaScript</td>
      <td>Advanced</td>
    </tr>
  </tbody>
</table>`,
                    output: {
                        type: "preview",
                        content: `<div style="padding:8px;overflow-x:auto"><table style="border-collapse:collapse;width:100%;font-size:14px"><thead><tr style="background:#1e1e3a"><th style="padding:10px 14px;text-align:left;border:1px solid #333;color:#a78bfa">Name</th><th style="padding:10px 14px;text-align:left;border:1px solid #333;color:#a78bfa">Language</th><th style="padding:10px 14px;text-align:left;border:1px solid #333;color:#a78bfa">Level</th></tr></thead><tbody><tr style="background:#111"><td style="padding:9px 14px;border:1px solid #333">Arjun</td><td style="padding:9px 14px;border:1px solid #333">Python</td><td style="padding:9px 14px;border:1px solid #333">Intermediate</td></tr><tr style="background:#161626"><td style="padding:9px 14px;border:1px solid #333">Priya</td><td style="padding:9px 14px;border:1px solid #333">JavaScript</td><td style="padding:9px 14px;border:1px solid #333">Advanced</td></tr></tbody></table></div>`,
                    },
                    explanation: `\`<thead>\` groups header rows. \`<tbody>\` groups data rows. \`<th>\` is bold by default. \`<td>\` is a normal cell.`,
                },
                {
                    type: "code",
                    heading: "Merging cells — colspan & rowspan",
                    language: "html",
                    code: `<table>
  <tr>
    <!-- colspan = span across columns -->
    <th colspan="3">Student Scores</th>
  </tr>
  <tr>
    <td>Name</td>
    <td>Math</td>
    <td>Science</td>
  </tr>
  <tr>
    <td>Rahul</td>
    <td>90</td>
    <td>85</td>
  </tr>
</table>

<!-- rowspan works the same but spans DOWN rows -->`,
                    output: {
                        type: "preview",
                        content: `<div style="padding:8px"><table style="border-collapse:collapse;font-size:14px;width:100%"><tr><th colspan="3" style="padding:10px 14px;border:1px solid #333;background:#1e1e3a;color:#a78bfa;text-align:center">Student Scores</th></tr><tr><td style="padding:9px 14px;border:1px solid #333;font-weight:bold">Name</td><td style="padding:9px 14px;border:1px solid #333;font-weight:bold">Math</td><td style="padding:9px 14px;border:1px solid #333;font-weight:bold">Science</td></tr><tr style="background:#111"><td style="padding:9px 14px;border:1px solid #333">Rahul</td><td style="padding:9px 14px;border:1px solid #333">90</td><td style="padding:9px 14px;border:1px solid #333">85</td></tr></table></div>`,
                    },
                },
                {
                    type: "takeaway",
                    points: [
                        "table → the container for everything",
                        "thead / tbody → semantic grouping of rows",
                        "tr → one row",
                        "th → header cell (bold), td → data cell",
                        "colspan spans columns, rowspan spans rows",
                    ],
                },
            ],
        },

        // ── 10 ──────────────────────────────────────────────────
        {
            id: 10,
            title: "Forms",
            subtitle: "Collecting input from users",
            duration: "6 min read",
            sections: [
                {
                    type: "analogy",
                    icon: "📝",
                    heading: "Forms are conversations",
                    content: `Every time you:\n- Log into a website\n- Search on Google\n- Buy something online\n- Sign up for an app\n\nYou're using an HTML form. Forms are how websites **collect information** from users and send it somewhere (a server, an email, a database).`,
                },
                {
                    type: "code",
                    heading: "Basic form structure",
                    language: "html",
                    code: `<form action="/submit" method="POST">

  <label for="username">Username</label>
  <input type="text" id="username" name="username"
         placeholder="Enter username">

  <label for="password">Password</label>
  <input type="password" id="password" name="password">

  <button type="submit">Log In</button>

</form>`,
                    output: {
                        type: "preview",
                        content: `<div style="padding:12px;font-family:sans-serif"><div style="margin-bottom:12px"><label style="display:block;font-size:13px;font-weight:600;margin-bottom:5px;color:#ccc">Username</label><input type="text" placeholder="Enter username" style="width:100%;padding:9px 12px;background:#1a1a2e;border:1px solid #333;border-radius:8px;color:#fff;font-size:14px;outline:none"/></div><div style="margin-bottom:14px"><label style="display:block;font-size:13px;font-weight:600;margin-bottom:5px;color:#ccc">Password</label><input type="password" placeholder="••••••••" style="width:100%;padding:9px 12px;background:#1a1a2e;border:1px solid #333;border-radius:8px;color:#fff;font-size:14px;outline:none"/></div><button style="padding:10px 24px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border:none;border-radius:8px;color:#fff;font-weight:700;cursor:pointer;font-size:14px">Log In</button></div>`,
                    },
                    explanation: `\`action\` = where to send the data. \`method\` = how to send it (GET or POST). \`for\` in label must match the \`id\` in input — this links them together.`,
                },
                {
                    type: "code",
                    heading: "Input types — there are many!",
                    language: "html",
                    code: `<!-- Text inputs -->
<input type="text"     placeholder="Plain text">
<input type="email"    placeholder="Validates email format">
<input type="password" placeholder="Hides characters">
<input type="number"   placeholder="Numbers only" min="0" max="100">
<input type="tel"      placeholder="Phone number">
<input type="url"      placeholder="Website URL">

<!-- Date/Time -->
<input type="date">
<input type="time">

<!-- Choices -->
<input type="checkbox"> Remember me
<input type="radio" name="gender" value="male"> Male
<input type="radio" name="gender" value="female"> Female

<!-- File -->
<input type="file" accept=".jpg,.png">

<!-- Range slider -->
<input type="range" min="0" max="100" value="50">

<!-- Hidden (sends data without showing it) -->
<input type="hidden" name="userId" value="12345">`,
                },
                {
                    type: "code",
                    heading: "Textarea and Select",
                    language: "html",
                    code: `<!-- Multi-line text input -->
<label for="bio">Tell us about yourself</label>
<textarea id="bio" name="bio" rows="4" cols="40"
          placeholder="Write something..."></textarea>

<!-- Dropdown -->
<label for="language">Favourite Language</label>
<select id="language" name="language">
  <option value="">-- Select --</option>
  <option value="python">Python</option>
  <option value="javascript">JavaScript</option>
  <option value="cpp">C++</option>
</select>`,
                    output: {
                        type: "preview",
                        content: `<div style="padding:10px;font-family:sans-serif"><div style="margin-bottom:12px"><label style="display:block;font-size:13px;font-weight:600;margin-bottom:5px;color:#ccc">Tell us about yourself</label><textarea rows="3" placeholder="Write something..." style="width:100%;padding:9px 12px;background:#1a1a2e;border:1px solid #333;border-radius:8px;color:#fff;font-size:13px;outline:none;resize:vertical"></textarea></div><div><label style="display:block;font-size:13px;font-weight:600;margin-bottom:5px;color:#ccc">Favourite Language</label><select style="width:100%;padding:9px 12px;background:#1a1a2e;border:1px solid #333;border-radius:8px;color:#fff;font-size:13px;outline:none"><option>-- Select --</option><option>Python</option><option>JavaScript</option><option>C++</option></select></div></div>`,
                    },
                },
                {
                    type: "concept",
                    heading: "required, disabled, readonly",
                    content: `**\`required\`** → user MUST fill this before submitting\n\`<input type="email" required>\`\n\n**\`disabled\`** → user can't interact with it at all\n\`<input type="text" disabled value="Not editable">\`\n\n**\`readonly\`** → user can see but not edit\n\`<input type="text" readonly value="Read only">\``,
                },
                {
                    type: "takeaway",
                    points: [
                        "<form> wraps all form elements",
                        "action = where data goes, method = how it's sent",
                        "<label for='id'> links labels to inputs",
                        "Many input types: text, email, password, checkbox, radio...",
                        "required, disabled, readonly control field behaviour",
                    ],
                },
            ],
        },

        // ── 11 ──────────────────────────────────────────────────
        {
            id: 11,
            title: "Semantic HTML",
            subtitle: "Writing HTML that means something",
            duration: "5 min read",
            sections: [
                {
                    type: "analogy",
                    icon: "🗺️",
                    heading: "Semantic = meaningful",
                    content: `Imagine two ways to label boxes while moving house:\n\n**Non-semantic:** Box 1, Box 2, Box 3\n**Semantic:** Kitchen, Bedroom, Books\n\nThe second version tells you what's inside without opening the box. Semantic HTML is the same — it tells browsers and search engines what the content MEANS, not just what it looks like.`,
                },
                {
                    type: "code",
                    heading: "Non-semantic vs Semantic",
                    language: "html",
                    code: `<!-- ❌ Non-semantic — div soup (bad practice) -->
<div class="header">...</div>
<div class="nav">...</div>
<div class="main">
  <div class="article">...</div>
  <div class="sidebar">...</div>
</div>
<div class="footer">...</div>

<!-- ✅ Semantic — self-describing (best practice) -->
<header>...</header>
<nav>...</nav>
<main>
  <article>...</article>
  <aside>...</aside>
</main>
<footer>...</footer>`,
                    explanation: `Both look identical in the browser. But the semantic version tells Google, screen readers, and future developers exactly what each section is.`,
                },
                {
                    type: "concept",
                    heading: "Key semantic elements",
                    content: `**\`<header>\`** → top section of page or article (logo, nav, title)\n\n**\`<nav>\`** → navigation links\n\n**\`<main>\`** → the main content (only ONE per page)\n\n**\`<article>\`** → self-contained content (blog post, news story)\n\n**\`<section>\`** → a thematic grouping of content\n\n**\`<aside>\`** → sidebar, related links, ads\n\n**\`<footer>\`** → bottom section (copyright, links)\n\n**\`<figure>\`** + **\`<figcaption>\`** → image with caption`,
                },
                {
                    type: "code",
                    heading: "A real page with semantic HTML",
                    language: "html",
                    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>My Blog</title>
</head>
<body>

  <header>
    <h1>CodeArena Blog</h1>
    <nav>
      <a href="/">Home</a>
      <a href="/tutorials">Tutorials</a>
      <a href="/about">About</a>
    </nav>
  </header>

  <main>
    <article>
      <h2>How to Learn HTML Fast</h2>
      <p>Published on <time datetime="2025-01-15">Jan 15, 2025</time></p>
      <p>The secret to learning HTML quickly is...</p>

      <figure>
        <img src="html-code.jpg" alt="HTML code on screen">
        <figcaption>A developer writing clean HTML</figcaption>
      </figure>
    </article>

    <aside>
      <h3>Related Articles</h3>
      <ul>
        <li><a href="/css">Learn CSS Next</a></li>
        <li><a href="/js">Then JavaScript</a></li>
      </ul>
    </aside>
  </main>

  <footer>
    <p>&copy; 2025 CodeArena. All rights reserved.</p>
  </footer>

</body>
</html>`,
                },
                {
                    type: "fact",
                    icon: "🔍",
                    heading: "Why this matters for your career",
                    content: `Semantic HTML:\n✅ Improves **SEO** — Google ranks semantic pages higher\n✅ Improves **Accessibility** — screen readers navigate by landmarks\n✅ Improves **Maintainability** — teammates understand your code\n✅ Required in **job interviews** — companies check this`,
                },
                {
                    type: "takeaway",
                    points: [
                        "Semantic elements describe their purpose",
                        "header, nav, main, article, aside, footer, section",
                        "Use <main> only once per page",
                        "Semantic HTML helps SEO, accessibility, readability",
                        "Avoid div soup — always use the right element",
                    ],
                },
            ],
        },

        // ── 12 ──────────────────────────────────────────────────
        {
            id: 12,
            title: "Div & Span",
            subtitle: "Generic containers for grouping",
            duration: "3 min read",
            sections: [
                {
                    type: "analogy",
                    icon: "📦",
                    heading: "The generic boxes",
                    content: `After learning semantic elements, you might wonder: when do I use \`<div>\` and \`<span>\`?\n\nThink of them as **generic, unnamed boxes**. Use them when no semantic element fits — purely for grouping or styling purposes.\n\n- \`<div>\` → a **block-level** box (takes full width, starts on new line)\n- \`<span>\` → an **inline** box (sits within text, only as wide as content)`,
                },
                {
                    type: "code",
                    heading: "div vs span",
                    language: "html",
                    code: `<!-- div = block level — breaks to new line -->
<div style="background: #1e1e3a; padding: 16px; border-radius: 8px;">
  <h3>Card Title</h3>
  <p>This whole card is wrapped in a div.</p>
</div>

<!-- span = inline — stays within the text flow -->
<p>
  The word <span style="color: #6366f1; font-weight: bold;">
  important</span> is highlighted with span.
</p>`,
                    output: {
                        type: "preview",
                        content: `<div style="padding:8px"><div style="background:#1e1e3a;padding:14px;border-radius:8px;margin-bottom:12px;border:1px solid #333"><h3 style="font-weight:bold;margin-bottom:6px">Card Title</h3><p style="font-size:13px;color:#aaa">This whole card is wrapped in a div.</p></div><p style="font-size:14px">The word <span style="color:#6366f1;font-weight:bold">important</span> is highlighted with span.</p></div>`,
                    },
                    explanation: `\`<div>\` creates a box around a section. \`<span>\` highlights or styles part of inline text.`,
                },
                {
                    type: "concept",
                    heading: "When to use div vs semantic",
                    content: `**Use semantic elements first:**\n- Navigation menu? Use \`<nav>\`\n- Blog post? Use \`<article>\`\n- Page header? Use \`<header>\`\n\n**Use div only when:**\n- No semantic element fits\n- You need a wrapper purely for CSS layout\n- You're grouping elements for JavaScript targeting\n\nA good rule: if you can name what the div IS (header, article, nav), use that semantic element instead.`,
                },
                {
                    type: "takeaway",
                    points: [
                        "div = block container (new line, full width)",
                        "span = inline container (within text flow)",
                        "Both have no semantic meaning — use for layout/styling",
                        "Prefer semantic elements (nav, article, header) when possible",
                        "div and span are the most used elements in real codebases",
                    ],
                },
            ],
        },

        // ── 13 ──────────────────────────────────────────────────
        {
            id: 13,
            title: "HTML Entities & Characters",
            subtitle: "Special characters in HTML",
            duration: "3 min read",
            sections: [
                {
                    type: "analogy",
                    icon: "✍️",
                    heading: "Some characters are reserved",
                    content: `HTML uses \`<\` and \`>\` for tags. But what if you want to actually DISPLAY the < or > symbol on your page?\n\nIf you write \`<div>\`, the browser thinks it's a tag. To show the literal characters, you use **HTML entities** — special codes that represent characters.`,
                },
                {
                    type: "code",
                    heading: "The most common entities",
                    language: "html",
                    code: `<!-- Essential entities -->
&lt;    →  <   (less than)
&gt;    →  >   (greater than)
&amp;   →  &   (ampersand)
&quot;  →  "   (quotation mark)
&apos;  →  '   (apostrophe)
&nbsp;  →  (non-breaking space)
&copy;  →  ©   (copyright)
&reg;   →  ®   (registered trademark)
&trade; →  ™   (trademark)
&euro;  →  €   (euro)
&pound; →  £   (pound)
&mdash; →  —   (em dash)
&hellip;→  …   (ellipsis)`,
                    output: {
                        type: "preview",
                        content: `<div style="padding:8px;font-size:14px;line-height:2"><p>2 &lt; 5 and 10 &gt; 3</p><p>AT&amp;T &copy; 2025 &reg; &trade;</p><p>Price: &pound;99 or &euro;109</p><p>Wait&hellip; that&apos;s interesting &mdash; right?</p></div>`,
                    },
                },
                {
                    type: "code",
                    heading: "Real usage",
                    language: "html",
                    code: `<!-- Showing code in a tutorial (like this site!) -->
<p>To make a heading, write <code>&lt;h1&gt;Text&lt;/h1&gt;</code></p>

<!-- Copyright in footer -->
<footer>
  <p>&copy; 2025 CodeArena. All rights reserved.</p>
</footer>

<!-- Non-breaking space — prevents line break -->
<p>10&nbsp;km (number and unit stay together)</p>`,
                    output: {
                        type: "preview",
                        content: `<div style="padding:8px;font-size:14px;line-height:1.9"><p>To make a heading, write <code style="background:#1e1e3a;padding:2px 6px;border-radius:4px;font-family:monospace">&lt;h1&gt;Text&lt;/h1&gt;</code></p><p style="color:#888;font-size:12px;border-top:1px solid #333;margin-top:8px;padding-top:8px">&copy; 2025 CodeArena. All rights reserved.</p><p>10&nbsp;km (stays together)</p></div>`,
                    },
                },
                {
                    type: "takeaway",
                    points: [
                        "HTML entities start with & and end with ;",
                        "&lt; = <   &gt; = >   &amp; = &",
                        "&nbsp; adds a non-breaking space",
                        "&copy; = © for copyright in footers",
                        "Use entities whenever reserved characters appear in content",
                    ],
                },
            ],
        },

        // ── 14 ──────────────────────────────────────────────────
        {
            id: 14,
            title: "Multimedia: Audio & Video",
            subtitle: "Embedding media in HTML5",
            duration: "4 min read",
            sections: [
                {
                    type: "analogy",
                    icon: "🎬",
                    heading: "HTML5 changed everything",
                    content: `Before 2010, embedding video on a website required **Flash** — a plugin that's now dead and gone. HTML5 introduced native \`<audio>\` and \`<video>\` elements.\n\nNow you can embed media with just a few lines of HTML — no plugins, no Flash, works on every device.`,
                },
                {
                    type: "code",
                    heading: "Video element",
                    language: "html",
                    code: `<video width="640" height="360" controls>
  <source src="movie.mp4"  type="video/mp4">
  <source src="movie.webm" type="video/webm">
  Your browser doesn't support video.
</video>`,
                    explanation: `\`controls\` adds play/pause/volume buttons. Multiple \`<source>\` tags give fallback formats. The text at the end shows if NOTHING works.`,
                },
                {
                    type: "code",
                    heading: "Video attributes",
                    language: "html",
                    code: `<video
  src="intro.mp4"
  controls       <!-- show play/pause controls -->
  autoplay       <!-- play when page loads -->
  muted          <!-- muted (required for autoplay) -->
  loop           <!-- replay when finished -->
  poster="thumbnail.jpg"  <!-- image shown before play -->
  width="100%"
>
  Your browser doesn't support video.
</video>`,
                },
                {
                    type: "code",
                    heading: "Audio element",
                    language: "html",
                    code: `<audio controls>
  <source src="podcast.mp3" type="audio/mpeg">
  <source src="podcast.ogg" type="audio/ogg">
  Your browser doesn't support audio.
</audio>

<!-- Autoplay (muted required for autoplay) -->
<audio src="background.mp3" autoplay muted loop></audio>`,
                },
                {
                    type: "code",
                    heading: "Embedding YouTube (iframe)",
                    language: "html",
                    code: `<!-- iframe embeds another page inside yours -->
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="YouTube video player"
  frameborder="0"
  allowfullscreen
></iframe>

<!-- Replace VIDEO_ID with the actual YouTube video ID -->
<!-- e.g. https://youtube.com/watch?v=dQw4w9WgXcQ -->
<!-- VIDEO_ID = dQw4w9WgXcQ -->`,
                },
                {
                    type: "takeaway",
                    points: [
                        "<video> and <audio> are native HTML5 elements",
                        "controls attribute adds the player interface",
                        "Provide multiple source formats for compatibility",
                        "autoplay needs muted to work in modern browsers",
                        "<iframe> embeds external pages (YouTube, Google Maps)",
                    ],
                },
            ],
        },

        // ── 15 ──────────────────────────────────────────────────
        {
            id: 15,
            title: "Block vs Inline Elements",
            subtitle: "How elements flow on the page",
            duration: "4 min read",
            sections: [
                {
                    type: "analogy",
                    icon: "🧱",
                    heading: "Bricks vs words",
                    content: `Think of HTML elements in two categories:\n\n**Block elements** are like **bricks** — each one sits on its own line, taking full width.\n\n**Inline elements** are like **words** — they flow within the text, only as wide as they need to be.\n\nThis is fundamental to understanding how HTML pages lay out content.`,
                },
                {
                    type: "code",
                    heading: "Block elements",
                    language: "html",
                    code: `<!-- Block elements: each on new line, full width -->
<div>I'm a block element</div>
<p>I'm also a block element</p>
<h1>Headings are block too</h1>
<ul>
  <li>List items are block</li>
</ul>

<!-- Common block elements: -->
<!-- div, p, h1-h6, ul, ol, li, table, -->
<!-- form, header, nav, main, section, article, footer -->`,
                    output: {
                        type: "preview",
                        content: `<div style="padding:8px;font-size:13px"><div style="background:#1e1e3a;padding:8px;margin:4px 0;border-left:3px solid #6366f1">div (full width, new line)</div><p style="background:#1a2e1a;padding:8px;margin:4px 0;border-left:3px solid #10b981">p (full width, new line)</p><h3 style="background:#2e1a1a;padding:8px;margin:4px 0;border-left:3px solid #f43f5e">h3 (full width, new line)</h3></div>`,
                    },
                },
                {
                    type: "code",
                    heading: "Inline elements",
                    language: "html",
                    code: `<!-- Inline elements: stay within text, no new line -->
<p>
  This text has <strong>bold</strong>,
  <em>italic</em>,
  a <a href="#">link</a>,
  and <span style="color:cyan">coloured text</span>
  all flowing together on one line.
</p>

<!-- Common inline elements: -->
<!-- a, span, strong, em, img, button, input, -->
<!-- label, code, small, sub, sup, br -->`,
                    output: {
                        type: "preview",
                        content: `<div style="padding:8px;font-size:14px;line-height:1.8"><p>This text has <strong>bold</strong>, <em>italic</em>, a <a href="#" style="color:#6366f1">link</a>, and <span style="color:#06b6d4">coloured text</span> all flowing together on one line.</p></div>`,
                    },
                },
                {
                    type: "fact",
                    icon: "💡",
                    heading: "CSS can change this",
                    content: `With CSS, you can change any element's display behaviour:\n\n\`display: block;\` → makes any element block-level\n\`display: inline;\` → makes any element inline\n\`display: inline-block;\` → inline but can have width/height\n\nWe'll cover this in the CSS course. For now, just understand the default behaviour.`,
                },
                {
                    type: "takeaway",
                    points: [
                        "Block elements start on a new line, take full width",
                        "Inline elements flow within text, only as wide as content",
                        "Block: div, p, h1-h6, ul, ol, form, header, footer...",
                        "Inline: a, span, strong, em, img, input...",
                        "CSS display property can change this behaviour",
                    ],
                },
            ],
        },

        // ── 16 ──────────────────────────────────────────────────
        {
            id: 16,
            title: "HTML5 New Features",
            subtitle: "Modern HTML you should know",
            duration: "4 min read",
            sections: [
                {
                    type: "concept",
                    heading: "What changed in HTML5?",
                    content: `HTML5 (released 2014) was a massive update that added:\n1. Semantic elements (header, nav, article, etc.)\n2. Native audio/video support\n3. Canvas for drawing\n4. Local Storage\n5. New form input types\n6. Geolocation API\n7. Better accessibility features\n\nMost of what we've learned IS HTML5. Here are a few more powerful features.`,
                },
                {
                    type: "code",
                    heading: "data-* attributes",
                    language: "html",
                    code: `<!-- Store custom data on any element -->
<!-- Prefix: data- then your name -->

<button data-user-id="42"
        data-action="delete"
        data-confirm="Are you sure?">
  Delete User
</button>

<!-- JavaScript can read it: -->
<!-- button.dataset.userId   → "42"    -->
<!-- button.dataset.action   → "delete" -->
<!-- button.dataset.confirm  → "Are you sure?" -->`,
                    explanation: `\`data-*\` attributes let you store extra info on elements without using hidden inputs. JavaScript reads them via \`element.dataset\`.`,
                },
                {
                    type: "code",
                    heading: "details & summary — accordion",
                    language: "html",
                    code: `<!-- Built-in collapsible — no JavaScript needed! -->
<details>
  <summary>Click to expand</summary>
  <p>This content is hidden by default and revealed
  when the user clicks the summary. Perfect for FAQs!</p>
</details>

<details open>  <!-- open attribute = expanded by default -->
  <summary>I'm already open</summary>
  <p>This shows immediately without needing a click.</p>
</details>`,
                    output: {
                        type: "preview",
                        content: `<div style="padding:8px;font-size:14px"><details style="background:#1e1e3a;border:1px solid #333;border-radius:8px;padding:12px;margin-bottom:8px"><summary style="cursor:pointer;font-weight:600;color:#a78bfa">Click to expand</summary><p style="margin-top:10px;color:#94a3b8">This content is hidden by default and revealed when the user clicks the summary. Perfect for FAQs!</p></details><details open style="background:#1e1e3a;border:1px solid #333;border-radius:8px;padding:12px"><summary style="cursor:pointer;font-weight:600;color:#a78bfa">I'm already open</summary><p style="margin-top:10px;color:#94a3b8">This shows immediately without needing a click.</p></details></div>`,
                    },
                },
                {
                    type: "code",
                    heading: "progress & meter",
                    language: "html",
                    code: `<!-- progress bar -->
<label>Course completion:</label>
<progress value="65" max="100">65%</progress>

<!-- meter — for a scale with good/bad ranges -->
<label>Storage used:</label>
<meter value="7" min="0" max="10"
       low="3" high="8" optimum="2">7GB</meter>`,
                    output: {
                        type: "preview",
                        content: `<div style="padding:8px;font-size:13px;line-height:2.5"><div><label style="color:#ccc">Course completion: </label><progress value="65" max="100" style="width:180px;height:10px"></progress> <span style="color:#10b981;font-weight:700">65%</span></div><div><label style="color:#ccc">Storage used: </label><meter value="7" min="0" max="10" low="3" high="8" optimum="2" style="width:180px"></meter></div></div>`,
                    },
                },
                {
                    type: "takeaway",
                    points: [
                        "data-* stores custom data on elements for JavaScript",
                        "<details><summary> creates accordions without JS",
                        "<progress> shows a completion bar",
                        "<meter> shows a value within a range",
                        "HTML5 features reduce the need for JavaScript",
                    ],
                },
            ],
        },

        // ── 17 ──────────────────────────────────────────────────
        {
            id: 17,
            title: "Accessibility (a11y)",
            subtitle: "Making HTML for everyone",
            duration: "5 min read",
            sections: [
                {
                    type: "analogy",
                    icon: "♿",
                    heading: "The web should work for everyone",
                    content: `1 billion people worldwide have some form of disability:\n- Visually impaired → use screen readers\n- Motor impaired → use keyboard, not mouse\n- Deaf → need captions\n- Cognitive disabilities → need clear, simple content\n\nAccessibility (a11y) means building websites that work for ALL of them. And it makes your site better for everyone.`,
                },
                {
                    type: "code",
                    heading: "ARIA labels",
                    language: "html",
                    code: `<!-- ARIA = Accessible Rich Internet Applications -->
<!-- Add meaning when HTML alone isn't enough -->

<!-- Icon button with no visible text -->
<button aria-label="Close dialog">
  ✕
</button>
<!-- Screen reader says: "Close dialog, button" -->

<!-- Navigation landmark -->
<nav aria-label="Main navigation">
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<!-- Live region — announces updates -->
<div aria-live="polite" id="status-message">
  <!-- JS updates this; screen readers announce it -->
</div>`,
                },
                {
                    type: "code",
                    heading: "Tab order & keyboard navigation",
                    language: "html",
                    code: `<!-- tabindex controls keyboard focus order -->

<!-- Skip navigation link (vital for keyboard users) -->
<a href="#main-content" class="skip-link">
  Skip to main content
</a>

<!-- tabindex="0" → follows natural DOM order -->
<div tabindex="0">I can receive keyboard focus</div>

<!-- tabindex="-1" → focusable by JS, not keyboard tab -->
<div tabindex="-1" id="modal">Modal dialog</div>

<!-- tabindex="1,2,3..." → custom order (AVOID this) -->
<!-- It's confusing and breaks user expectations -->`,
                    explanation: `Interactive elements (buttons, links, inputs) are focusable by default. Only add tabindex to non-interactive elements that need keyboard focus.`,
                },
                {
                    type: "code",
                    heading: "Accessibility checklist in HTML",
                    language: "html",
                    code: `<!-- ✅ 1. Always set the language -->
<html lang="en">

<!-- ✅ 2. Descriptive page titles -->
<title>User Profile — CodeArena</title>

<!-- ✅ 3. Alt text on images -->
<img src="chart.png" alt="Bar chart showing 85% increase in users from Jan to Dec">

<!-- ✅ 4. Labels for all form fields -->
<label for="email">Email Address</label>
<input type="email" id="email" required>

<!-- ✅ 5. Semantic structure -->
<main>
  <h1>One H1 per page</h1>
  <article>
    <h2>Section heading</h2>
  </article>
</main>

<!-- ✅ 6. Sufficient colour contrast (handle in CSS) -->
<!-- ✅ 7. Don't rely on colour alone to convey info -->`,
                },
                {
                    type: "fact",
                    icon: "⚖️",
                    heading: "It's also the law",
                    content: `In many countries, websites must meet accessibility standards:\n- **WCAG 2.1** (Web Content Accessibility Guidelines)\n- **ADA** (Americans with Disabilities Act) — USA\n- **EN 301 549** — EU\n\nCompanies have been sued for inaccessible websites. Building accessibly from the start is far easier than retrofitting.`,
                },
                {
                    type: "takeaway",
                    points: [
                        "1 billion people have disabilities — build for everyone",
                        "Use semantic HTML first — it's already accessible",
                        "Always write alt text for images",
                        "Always label form inputs with <label>",
                        "ARIA labels add context when HTML alone is not enough",
                    ],
                },
            ],
        },

        // ── 18 ──────────────────────────────────────────────────
        {
            id: 18,
            title: "Best Practices & Common Mistakes",
            subtitle: "Write HTML like a professional",
            duration: "4 min read",
            sections: [
                {
                    type: "concept",
                    heading: "Rules professional developers follow",
                    content: `After years of building websites, the dev community has agreed on a set of best practices. Following these from day one means:\n- Your code is readable by teammates\n- Fewer bugs and browser quirks\n- Better SEO and accessibility\n- Easier to maintain in the future`,
                },
                {
                    type: "code",
                    heading: "✅ Good HTML vs ❌ Bad HTML",
                    language: "html",
                    code: `<!-- ❌ BAD: Missing doctype & structure -->
<h1>Hello</h1>
<p>No doctype, no html, no head, no body

<!-- ✅ GOOD: Proper boilerplate -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title</title>
</head>
<body>
  <h1>Hello</h1>
  <p>Properly structured!</p>
</body>
</html>


<!-- ❌ BAD: Non-descriptive ids and classes -->
<div class="red big thing">...</div>
<div id="div1">...</div>

<!-- ✅ GOOD: Meaningful names -->
<div class="error-message">...</div>
<section id="testimonials">...</section>


<!-- ❌ BAD: Skipping heading levels -->
<h1>Title</h1>
<h4>Jumped from h1 to h4!</h4>

<!-- ✅ GOOD: Sequential headings -->
<h1>Title</h1>
<h2>Section</h2>
<h3>Sub-section</h3>`,
                },
                {
                    type: "code",
                    heading: "More common mistakes",
                    language: "html",
                    code: `<!-- ❌ BAD: <br> for spacing -->
<p>First paragraph</p>
<br><br><br>
<p>Second paragraph</p>
<!-- Use CSS margin instead! -->

<!-- ✅ GOOD: CSS handles spacing -->
<p>First paragraph</p>
<p>Second paragraph</p>
<!-- Then: p { margin-bottom: 1rem; } in CSS -->


<!-- ❌ BAD: Empty alt text on meaningful images -->
<img src="team-photo.jpg" alt="">

<!-- ✅ GOOD: Descriptive alt text -->
<img src="team-photo.jpg" alt="CodeArena team at their annual meetup in Bangalore">
<!-- Empty alt="" is OK ONLY for decorative images -->


<!-- ❌ BAD: Using <b> and <i> for styling -->
<b>Important</b>
<i>Emphasis</i>

<!-- ✅ GOOD: Semantic alternatives -->
<strong>Important</strong>  <!-- bold + semantic weight -->
<em>Emphasis</em>           <!-- italic + semantic stress -->`,
                },
                {
                    type: "fact",
                    icon: "🔧",
                    heading: "Validate your HTML",
                    content: `Use the **W3C HTML Validator** at validator.w3.org\n\nPaste your HTML and it will flag every error and warning. Run your page through this before calling it done. Professional developers do this.`,
                },
                {
                    type: "takeaway",
                    points: [
                        "Always use the full boilerplate — DOCTYPE, html, head, body",
                        "Use semantic elements before reaching for div",
                        "Never skip heading levels (h1 → h3 without h2)",
                        "Use CSS for spacing, not <br> tags",
                        "Validate HTML at validator.w3.org",
                    ],
                },
            ],
        },

        // ── 19 ──────────────────────────────────────────────────
        {
            id: 19,
            title: "HTML & CSS Connection",
            subtitle: "Linking stylesheets to your page",
            duration: "3 min read",
            sections: [
                {
                    type: "analogy",
                    icon: "🎨",
                    heading: "HTML is skeleton, CSS is clothing",
                    content: `HTML creates the structure. CSS makes it beautiful.\n\nWithout CSS, every website looks like a plain text document from 1995. CSS adds:\n- Colours, fonts, sizes\n- Layout (columns, grids)\n- Animations\n- Responsive design for mobile\n\nBefore diving deep into CSS (our next course), here's how HTML and CSS connect.`,
                },
                {
                    type: "code",
                    heading: "3 ways to add CSS to HTML",
                    language: "html",
                    code: `<!-- Method 1: External CSS file (RECOMMENDED) -->
<head>
  <link rel="stylesheet" href="styles.css">
</head>

<!-- Method 2: Internal CSS (inside <head>) -->
<head>
  <style>
    h1 { color: blue; font-size: 32px; }
    p  { color: gray; line-height: 1.6; }
  </style>
</head>

<!-- Method 3: Inline CSS (avoid — hard to maintain) -->
<h1 style="color: blue; font-size: 32px;">Title</h1>
<p style="color: gray;">Paragraph</p>`,
                    explanation: `**Always prefer external CSS.** It separates concerns, is reusable across pages, and is cacheable by browsers (faster load times).`,
                },
                {
                    type: "code",
                    heading: "A complete HTML + CSS example",
                    language: "html",
                    code: `<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Styled Page</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>

  <header>
    <h1>CodeArena</h1>
    <nav>
      <a href="/">Home</a>
      <a href="/learn">Learn</a>
    </nav>
  </header>

  <main>
    <h2>Welcome, Developer</h2>
    <p>Your coding journey starts here.</p>
    <button class="btn-primary">Start Learning</button>
  </main>

</body>
</html>`,
                },
                {
                    type: "fact",
                    icon: "📁",
                    heading: "File structure for a web project",
                    content: `\`\`\`\nmy-website/\n├── index.html\n├── about.html\n├── css/\n│   └── styles.css\n├── js/\n│   └── main.js\n└── images/\n    ├── logo.png\n    └── hero.jpg\n\`\`\`\n\nKeep it organised from day one. This is the standard structure used in professional projects.`,
                },
                {
                    type: "takeaway",
                    points: [
                        "CSS adds all the visual styling to HTML",
                        "External CSS file is the best approach",
                        "<link rel='stylesheet' href='styles.css'> in <head>",
                        "Inline styles should be avoided",
                        "Organise files: separate folders for css, js, images",
                    ],
                },
            ],
        },

        // ── 20 ──────────────────────────────────────────────────
        {
            id: 20,
            title: "Build Your First Project",
            subtitle: "Put it all together",
            duration: "10 min project",
            sections: [
                {
                    type: "analogy",
                    icon: "🚀",
                    heading: "You've learned the tools — now build!",
                    content: `A craftsman doesn't just read about tools. They pick them up and make something.\n\nYou've now learned:\n✅ Document structure\n✅ Headings & paragraphs\n✅ Links & images\n✅ Lists & tables\n✅ Forms\n✅ Semantic HTML\n✅ Accessibility\n\nTime to build a real personal profile page using everything.`,
                },
                {
                    type: "code",
                    heading: "Project: Personal Profile Page",
                    language: "html",
                    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rahul Dev — Developer Profile</title>
</head>
<body>

  <header>
    <img src="profile.jpg" alt="Rahul Dev, web developer" width="100">
    <h1>Rahul Dev</h1>
    <p>Full-Stack Developer · Mumbai, India</p>
    <nav>
      <a href="#about">About</a>
      <a href="#skills">Skills</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <main>

    <section id="about">
      <h2>About Me</h2>
      <p>I'm a self-taught developer who went from zero
      to building full-stack apps in 12 months using
      CodeArena. I love solving real problems with code.</p>
    </section>

    <section id="skills">
      <h2>My Skills</h2>
      <ul>
        <li>HTML &amp; CSS</li>
        <li>JavaScript</li>
        <li>React</li>
        <li>Python</li>
        <li>SQL</li>
      </ul>
    </section>

    <section id="projects">
      <h2>Projects</h2>
      <article>
        <h3>Weather App</h3>
        <p>A real-time weather app using OpenWeather API.</p>
        <a href="https://github.com" target="_blank"
           rel="noopener noreferrer">View on GitHub ↗</a>
      </article>

      <article>
        <h3>Todo List</h3>
        <p>A clean todo app with local storage persistence.</p>
        <a href="https://github.com" target="_blank"
           rel="noopener noreferrer">View on GitHub ↗</a>
      </article>
    </section>

    <section id="contact">
      <h2>Contact Me</h2>
      <form action="/send" method="POST">
        <label for="name">Name</label>
        <input type="text" id="name" name="name"
               placeholder="Your name" required>

        <label for="email">Email</label>
        <input type="email" id="email" name="email"
               placeholder="your@email.com" required>

        <label for="message">Message</label>
        <textarea id="message" name="message" rows="4"
                  placeholder="What would you like to say?"></textarea>

        <button type="submit">Send Message</button>
      </form>
    </section>

  </main>

  <footer>
    <p>&copy; 2025 Rahul Dev · Built with HTML &amp; CSS</p>
    <p>
      <a href="https://github.com" target="_blank"
         rel="noopener noreferrer">GitHub</a> ·
      <a href="https://linkedin.com" target="_blank"
         rel="noopener noreferrer">LinkedIn</a>
    </p>
  </footer>

</body>
</html>`,
                    explanation: `This page uses: document structure, header/nav/main/footer, sections with ids, lists, articles, a form, links, images, entities, and anchor navigation. That's everything you've learned!`,
                },
                {
                    type: "fact",
                    icon: "🎯",
                    heading: "What to do next",
                    content: `1. Build this page exactly as shown\n2. Change the content to YOUR information\n3. Add more projects you've built\n4. Host it free on GitHub Pages or Netlify\n5. Share the link on LinkedIn\n\nYou now have your first live project on the internet. Many developers got their first job by showing this kind of initiative.\n\n**Next course: CSS** — let's make this profile page look incredible.`,
                },
                {
                    type: "takeaway",
                    points: [
                        "You now know all core HTML concepts",
                        "A profile page uses every technique you learned",
                        "Build it, deploy it, share it — that's how you get noticed",
                        "CSS is next — same logical approach, you'll pick it up fast",
                        "The best way to learn is to build real things",
                    ],
                },
            ],
        },
    ],
};