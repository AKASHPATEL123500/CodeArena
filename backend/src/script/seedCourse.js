import connectDB from "../config/db.js";
import { Course } from "../models/course_model.js";
import { Lesson } from "../models/lession_model.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// load .env (try local then project root)
dotenv.config();
const __dirname = path.dirname( fileURLToPath( import.meta.url ) );
if ( !process.env.MONGODB_URL ) {
    dotenv.config( { path: path.resolve( __dirname, "../../.env" ) } );
}

const courseData = {
    title: "HTML & CSS - Complete Guide",
    slug: "html-css-complete-guide",
    language: "HTML & CSS",
    description: "Learn web development from scratch. Build beautiful websites with HTML and CSS.",
    difficulty: "beginner",
    totalLessons: 5,
    isPublished: true,
};

const lessons = [
    {
        title: "Introduction to HTML",
        slug: "introduction-to-html",
        order: 1,
        content: `# Introduction to HTML

## What is HTML?

HTML (HyperText Markup Language) is the **foundation** of every website you see on the internet. Think of it as the skeleton of a webpage - it provides structure and meaning to web content.

## Why Learn HTML?

- 🌐 **Universal**: Every website uses HTML
- 📱 **Cross-platform**: Works on all devices
- 🎨 **Easy to learn**: Simple syntax, visual results
- 💼 **High demand**: Essential skill for web developers

## Your First HTML Page

Let's create a simple HTML page:

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Hello World!</h1>
    <p>This is my first webpage!</p>
</body>
</html>
\`\`\`

## Understanding the Structure

1. **\`<!DOCTYPE html>\`** - Tells the browser this is an HTML5 document
2. **\`<html>\`** - Root element that contains all other elements
3. **\`<head>\`** - Contains metadata (title, links to CSS, etc.)
4. **\`<body>\`** - Contains all visible content

## Practice Exercise ✏️

Create a simple HTML page with:
- A heading saying "Welcome to My Website"
- A paragraph introducing yourself
- Save it as \`index.html\` and open in browser

**Remember**: HTML is like building with LEGO blocks - each tag is a block! 🧱

---

**Next Lesson**: We'll learn about different HTML tags and how to use them.
`,
        estimatedTime: 15
    },
    {
        title: "HTML Tags & Elements",
        slug: "html-tags-elements",
        order: 2,
        content: `# HTML Tags & Elements

## What are HTML Tags?

HTML tags are like **labels** that tell the browser what type of content you're displaying. Every tag has an opening \`<tag>\` and closing \`</tag>\`.

## Common HTML Tags

### 📝 Headings (6 levels)

\`\`\`html
<h1>Main Heading (Biggest)</h1>
<h2>Sub Heading</h2>
<h3>Smaller Heading</h3>
<h4>Even Smaller</h4>
<h5>Getting Tiny</h5>
<h6>Smallest Heading</h6>
\`\`\`

**Tip**: Use \`<h1>\` only once per page (main title). Use \`<h2>\`-\`<h6>\` for subheadings.

### 📄 Paragraphs

\`\`\`html
<p>This is a paragraph of text. It can contain multiple sentences.</p>
<p>This is another paragraph. Each paragraph tag creates a new block.</p>
\`\`\`

### 🔗 Links

\`\`\`html
<a href="https://google.com">Visit Google</a>
<a href="about.html">About Page</a>
<a href="mailto:hello@example.com">Send Email</a>
\`\`\`

### 🖼️ Images

\`\`\`html
<img src="photo.jpg" alt="Description of image">
<img src="https://example.com/image.png" alt="Online image">
\`\`\`

**Important**: Always use \`alt\` attribute - it shows if image fails to load and helps accessibility!

### ✨ Text Formatting

\`\`\`html
<strong>Bold text (important)</strong>
<em>Italic text (emphasis)</em>
<u>Underlined text</u>
<mark>Highlighted text</mark>
<small>Smaller text</small>
\`\`\`

### 🔀 Line Breaks & Horizontal Rules

\`\`\`html
<p>Line 1<br>Line 2</p>
<hr>  <!-- Horizontal line -->
\`\`\`

## Real Example

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>My Profile</title>
</head>
<body>
    <h1>Welcome to My Profile</h1>
    <img src="profile.jpg" alt="My Photo">
    
    <h2>About Me</h2>
    <p>Hi! My name is <strong>Arjun</strong>.</p>
    <p>I'm learning <em>web development</em>!</p>
    
    <h2>Contact</h2>
    <p>Email: <a href="mailto:arjun@example.com">arjun@example.com</a></p>
</body>
</html>
\`\`\`

## Practice Exercise ✏️

Create a page with:
1. A main heading with your name
2. Your photo (use any image)
3. 3 paragraphs about yourself
4. A link to your favorite website
5. Some bold and italic text

**Try it yourself!** 💪
`,
        estimatedTime: 20
    },
    {
        title: "HTML Lists & Tables",
        slug: "html-lists-tables",
        order: 3,
        content: `# HTML Lists & Tables

## Lists in HTML

Lists help organize information in a clear, readable way.

### 📋 Unordered Lists (Bullet Points)

\`\`\`html
<ul>
    <li>Apple</li>
    <li>Banana</li>
    <li>Orange</li>
</ul>
\`\`\`

**Result:**
- Apple
- Banana
- Orange

### 🔢 Ordered Lists (Numbered)

\`\`\`html
<ol>
    <li>Wake up</li>
    <li>Brush teeth</li>
    <li>Have breakfast</li>
</ol>
\`\`\`

**Result:**
1. Wake up
2. Brush teeth
3. Have breakfast

### 📝 Nested Lists

\`\`\`html
<ul>
    <li>Fruits
        <ul>
            <li>Apple</li>
            <li>Banana</li>
        </ul>
    </li>
    <li>Vegetables
        <ul>
            <li>Carrot</li>
            <li>Tomato</li>
        </ul>
    </li>
</ul>
\`\`\`

## Tables in HTML

Tables display data in rows and columns.

### Basic Table Structure

\`\`\`html
<table>
    <tr>
        <th>Name</th>
        <th>Age</th>
        <th>City</th>
    </tr>
    <tr>
        <td>John</td>
        <td>25</td>
        <td>Mumbai</td>
    </tr>
    <tr>
        <td>Sarah</td>
        <td>28</td>
        <td>Delhi</td>
    </tr>
</table>
\`\`\`

**Elements:**
- \`<table>\` - Creates the table
- \`<tr>\` - Table Row
- \`<th>\` - Table Header (bold by default)
- \`<td>\` - Table Data (cell)

### Table with Border (CSS needed)

\`\`\`html
<table border="1">
    <tr>
        <th>Product</th>
        <th>Price</th>
    </tr>
    <tr>
        <td>Laptop</td>
        <td>₹50,000</td>
    </tr>
    <tr>
        <td>Phone</td>
        <td>₹20,000</td>
    </tr>
</table>
\`\`\`

## Real Example - Shopping List

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>Shopping List</title>
</head>
<body>
    <h1>My Shopping List</h1>
    
    <h2>Groceries</h2>
    <ul>
        <li>Milk</li>
        <li>Bread</li>
        <li>Eggs</li>
    </ul>
    
    <h2>Electronics</h2>
    <ol>
        <li>Laptop</li>
        <li>Mouse</li>
        <li>Keyboard</li>
    </ol>
    
    <h2>Price Table</h2>
    <table border="1">
        <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
        </tr>
        <tr>
            <td>Milk</td>
            <td>₹60</td>
            <td>2</td>
        </tr>
        <tr>
            <td>Bread</td>
            <td>₹40</td>
            <td>1</td>
        </tr>
    </table>
</body>
</html>
\`\`\`
`,
        estimatedTime: 25
    },
    {
        title: "Introduction to CSS",
        slug: "introduction-to-css",
        order: 4,
        content: `# Introduction to CSS

## What is CSS?

CSS (Cascading Style Sheets) is what makes websites **beautiful**! 🎨

**Think of it this way:**
- HTML = Skeleton (structure)
- CSS = Clothes & Makeup (style)

## Why Learn CSS?

- 🎨 **Design**: Make websites visually appealing
- 📱 **Responsive**: Adapt to different screen sizes
- 🚀 **Professional**: Separate content from presentation
- 💼 **Essential**: Every web developer needs CSS

## Three Ways to Add CSS

### 1. Inline CSS (Not Recommended)

\`\`\`html
<h1 style="color: blue; font-size: 36px;">Hello</h1>
\`\`\`

**Problem**: Hard to maintain, mixes HTML and CSS.

### 2. Internal CSS (Good for Small Pages)

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <style>
        h1 {
            color: blue;
            font-size: 36px;
        }
    </style>
</head>
<body>
    <h1>Hello</h1>
</body>
</html>
\`\`\`

### 3. External CSS (Best Practice!)

**HTML:**
\`\`\`html
<link rel="stylesheet" href="style.css">
\`\`\`

**style.css:**
\`\`\`css
h1 {
    color: red;
    font-size: 48px;
}
\`\`\`

## Common CSS Properties

\`\`\`css
color: red;
background-color: yellow;
\`\`\`
`,
        estimatedTime: 30
    },
    {
        title: "CSS Box Model & Layout",
        slug: "css-box-model-layout",
        order: 5,
        content: `# CSS Box Model & Layout

## The CSS Box Model

Every HTML element is a **box**! Understanding this is crucial for layout.

\`\`\`
┌─────────────────────────────────────┐
│          MARGIN (transparent)       │
│  ┌──────────────────────────────┐  │
│  │     BORDER (visible line)    │  │
│  │  ┌────────────────────────┐  │  │
│  │  │   PADDING (transparent)│  │  │
│  │  │  ┌──────────────────┐  │  │  │
│  │  │  │    CONTENT       │  │  │  │
│  │  │  │  (text/image)    │  │  │  │
│  │  │  └──────────────────┘  │  │  │
│  │  └────────────────────────┘  │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
\`\`\`

## Box Model Properties

### Content
\`\`\`css
width: 300px;
height: 200px;
\`\`\`

### Padding (Space Inside)
\`\`\`css
padding: 20px;
\`\`\`

### Border
\`\`\`css
border: 2px solid black;
\`\`\`

### Margin (Space Outside)
\`\`\`css
margin: 20px;
\`\`\`
`,
        estimatedTime: 30
    }
];

const seed = async () => {
    try {
        await connectDB();

        console.log( "🧹 Clearing existing course & lessons..." );
        await Course.deleteMany();
        await Lesson.deleteMany();

        console.log( "📚 Creating course..." );
        const course = await Course.create( courseData );

        console.log( "📝 Creating lessons..." );
        const lessonsWithCourse = lessons.map( ( l ) => ( { ...l, course: course._id } ) );
        await Lesson.insertMany( lessonsWithCourse );

        console.log( "🎉 Seeding complete!" );
        console.log( "📚 Course:", course.title );
        console.log( "📝 Total Lessons:", lessonsWithCourse.length );
        process.exit( 0 );
    } catch ( err ) {
        console.error( "❌ Seed error:", err.message );
        process.exit( 1 );
    }
};

seed();