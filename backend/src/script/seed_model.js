import connectDB from "../config/db.js";
import Skill from "../models/skill_model.js";

const skills = [
  {
    name: "React.js",
    slug: "react-js",
    category: "web",
    difficulty: "intermediate",
    description: "React frontend library",
    isActive: true
  },
  {
    name: "Node.js",
    slug: "node-js",
    category: "programming", // ✅ changed
    difficulty: "intermediate",
    description: "Node backend runtime",
    isActive: true
  },
  {
    name: "MongoDB",
    slug: "mongodb",
    category: "database",
    difficulty: "beginner",
    description: "NoSQL DB",
    isActive: true
  },
  {
  name: "JavaScript",
  slug: "javascript",
  category: "programming",
  difficulty: "beginner",
  description: "Core JS language",
  isActive: true
},
{
  name: "TypeScript",
  slug: "typescript",
  category: "programming",
  difficulty: "intermediate",
  description: "Typed JavaScript",
  isActive: true
},
{
  name: "Express.js",
  slug: "express-js",
  category: "web",
  difficulty: "intermediate",
  description: "Node web framework",
  isActive: true
},
{
  name: "Next.js",
  slug: "next-js",
  category: "web",
  difficulty: "intermediate",
  description: "React production framework",
  isActive: true
},
{
  name: "HTML",
  slug: "html",
  category: "web",
  difficulty: "beginner",
  description: "Markup language",
  isActive: true
},
{
  name: "CSS",
  slug: "css",
  category: "web",
  difficulty: "beginner",
  description: "Styling language",
  isActive: true
},
{
  name: "Tailwind CSS",
  slug: "tailwind-css",
  category: "web",
  difficulty: "beginner",
  description: "Utility CSS framework",
  isActive: true
},
{
  name: "Bootstrap",
  slug: "bootstrap",
  category: "web",
  difficulty: "beginner",
  description: "CSS component framework",
  isActive: true
},
{
  name: "Redux",
  slug: "redux",
  category: "web",
  difficulty: "intermediate",
  description: "State management",
  isActive: true
},
{
  name: "Zustand",
  slug: "zustand",
  category: "web",
  difficulty: "intermediate",
  description: "Lightweight state management",
  isActive: true
},
{
  name: "GraphQL",
  slug: "graphql",
  category: "programming",
  difficulty: "advanced",
  description: "API query language",
  isActive: true
},
{
  name: "REST API",
  slug: "rest-api",
  category: "programming",
  difficulty: "intermediate",
  description: "REST architecture",
  isActive: true
},
{
  name: "Python",
  slug: "python",
  category: "programming",
  difficulty: "beginner",
  description: "General purpose language",
  isActive: true
},
{
  name: "Java",
  slug: "java",
  category: "programming",
  difficulty: "intermediate",
  description: "OOP language",
  isActive: true
},
{
  name: "c-languag",
  slug: "c-language",
  category: "programming",
  difficulty: "beginner",
  description: "Low level language",
  isActive: true
},
{
  name: "C++",
  slug: "cpp",
  category: "programming",
  difficulty: "intermediate",
  description: "OOP systems language",
  isActive: true
},
{
  name: "DSA",
  slug: "dsa",
  category: "programming",
  difficulty: "advanced",
  description: "Data structures and algorithms",
  isActive: true
},
{
  name: "SQL",
  slug: "sql",
  category: "database",
  difficulty: "beginner",
  description: "Structured query language",
  isActive: true
},
{
  name: "PostgreSQL",
  slug: "postgresql",
  category: "database",
  difficulty: "intermediate",
  description: "Relational database",
  isActive: true
},
{
  name: "MySQL",
  slug: "mysql",
  category: "database",
  difficulty: "beginner",
  description: "Popular SQL database",
  isActive: true
},
{
  name: "Redis",
  slug: "redis",
  category: "database",
  difficulty: "intermediate",
  description: "In-memory database",
  isActive: true
},
{
  name: "Firebase",
  slug: "firebase",
  category: "database",
  difficulty: "beginner",
  description: "Realtime cloud database",
  isActive: true
},
{
  name: "JWT",
  slug: "jwt",
  category: "programming",
  difficulty: "intermediate",
  description: "Authentication tokens",
  isActive: true
},
{
  name: "OAuth",
  slug: "oauth",
  category: "programming",
  difficulty: "advanced",
  description: "Auth protocol",
  isActive: true
},
{
  name: "WebSockets",
  slug: "websockets",
  category: "programming",
  difficulty: "advanced",
  description: "Realtime communication",
  isActive: true
},
{
  name: "Socket.io",
  slug: "socket-io",
  category: "programming",
  difficulty: "intermediate",
  description: "Realtime Node library",
  isActive: true
},
{
  name: "Docker",
  slug: "docker",
  category: "programming",
  difficulty: "intermediate",
  description: "Containerization",
  isActive: true
},
{
  name: "Kubernetes",
  slug: "kubernetes",
  category: "programming",
  difficulty: "advanced",
  description: "Container orchestration",
  isActive: true
},
{
  name: "Git",
  slug: "git",
  category: "programming",
  difficulty: "beginner",
  description: "Version control",
  isActive: true
},
{
  name: "GitHub",
  slug: "github",
  category: "programming",
  difficulty: "beginner",
  description: "Code hosting",
  isActive: true
},
{
  name: "CI/CD",
  slug: "cicd",
  category: "programming",
  difficulty: "advanced",
  description: "Deployment pipelines",
  isActive: true
},
{
  name: "Unit Testing",
  slug: "unit-testing",
  category: "programming",
  difficulty: "intermediate",
  description: "Code testing",
  isActive: true
},
{
  name: "Jest",
  slug: "jest",
  category: "programming",
  difficulty: "intermediate",
  description: "JS testing framework",
  isActive: true
},
{
  name: "Vite",
  slug: "vite",
  category: "web",
  difficulty: "beginner",
  description: "Frontend build tool",
  isActive: true
},
{
  name: "Webpack",
  slug: "webpack",
  category: "web",
  difficulty: "advanced",
  description: "Module bundler",
  isActive: true
},
{
  name: "Babel",
  slug: "babel",
  category: "web",
  difficulty: "intermediate",
  description: "JS compiler",
  isActive: true
},
{
  name: "NPM",
  slug: "npm",
  category: "programming",
  difficulty: "beginner",
  description: "Node package manager",
  isActive: true
},
{
  name: "Yarn",
  slug: "yarn",
  category: "programming",
  difficulty: "beginner",
  description: "Package manager",
  isActive: true
},
{
  name: "Chrome DevTools",
  slug: "chrome-devtools",
  category: "web",
  difficulty: "beginner",
  description: "Browser debugging",
  isActive: true
}

];

const seed = async () => {
  try {
    await connectDB();

    console.log("🧹 Clearing old skills...");
    await Skill.deleteMany();

    console.log("📦 Inserting skills...");
    await Skill.insertMany(skills);

    console.log("🔥 Skills seeded successfully");
    process.exit(0);

  } catch (err) {
    console.error("❌ Seed error:", err.message);
    process.exit(1);
  }
};

seed();
