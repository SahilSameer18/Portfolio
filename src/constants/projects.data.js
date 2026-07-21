import safar from "../assets/safar.png";
import prepstack from "../assets/prepstack.png";
import skillbridgeAI from "../assets/skillbridgeAI.png";

export const projectsData = [
  {
    title: "PrepStack",
    tag: "SDE Prep Platform",
    featured: true,
    description:
      "A comprehensive preparation platform that structures and accelerates interview preparation workflows for software engineering candidates.",
    challenge: "Candidates navigate fragmented sheets, scattered concept repositories, and lack custom, high-fidelity mock project ideas.",
    solution: "Coded an automated DSA dashboard synced with React and MongoDB, coupled with a customized project idea engine running LLM-assisted generation.",
    impact: "Created an integrated study tracker saving candidates prep time by consolidating structured sheet progress and project mockups.",
    link: "https://prepstack-ss.vercel.app/",
    github: "https://github.com/SahilSameer18/prepstack",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    image: prepstack,
    accent: "#FFA116",
  },
  {
    title: "SkillBridgeAI",
    tag: "AI Career Analyzer",
    description:
      "An intelligent resume and skill-gap diagnostics platform mapping user profiles to modern software roles.",
    challenge: "Traditional technical prep is generic; candidates fail to identify concrete architectural and library knowledge gaps before coding assessments.",
    solution: "Designed a backend profiling system integrating Gemini AI models to map resume skills directly to SQL/NoSQL tech metrics, spinning up customized sample questions.",
    impact: "Accelerated skills matching and prep loops by offering instant tailored prep schedules and detailed answer analytics.",
    link: "https://skillbridgeai-s.vercel.app/",
    github: "https://github.com/SahilSameer18/skillbridgeAI",
    techStack: ["React", "PostgreSQL", "Prisma ORM", "Node", "Gemini AI"],
    image: skillbridgeAI,
    accent: "#4DB8D4",
  },
  {
    title: "SafarAI",
    tag: "AI Travel Planner",
    description:
      "A context-aware day-by-day travel itinerary scheduler adjusting to user budget, timing constraints, and interests.",
    challenge: "Constructing personalized travel schedules takes hours of manual aggregation across flight, hotel, and tourist logs.",
    solution: "Engineered a rapid responsive layout integrating Firebase cloud storage with prompt-engineered Gemini schemas to produce day itineraries.",
    impact: "Deploys complete customizable schedules in seconds under real-world testing conditions.",
    link: "https://www.safarai.in/",
    github: "https://github.com/SahilSameer18",
    techStack: ["React", "Tailwind CSS", "Firebase", "Gemini AI"],
    image: safar,
    accent: "#34d399",
  },
];


