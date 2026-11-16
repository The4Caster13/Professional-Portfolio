// ABOUT PAGE CONTENT (/about). Edit the words here; the layout is in src/pages/AboutPage.tsx.
//
// - chapters are the three steps of the story, in order. `why` is the paragraph explaining that step.
// - entries inside a chapter appear top to bottom on the timeline.
// - kind changes the label and dot style: "project" | "milestone" | "education" get a solid dot in the
//   chapter's colour; "leadership" | "work" | "volunteering" get a hollow grey dot ("along the way").
// - project: "<exact title from src/data/projects.ts>" adds a "View project" link (survives reordering).
// - link: { label, url } adds an external link.

export type Phase = "architecture" | "coding" | "growth";
export type EntryKind = "project" | "milestone" | "education" | "leadership" | "work" | "volunteering";

export interface TimelineEntry {
  date: string;
  title: string;
  org?: string;
  kind: EntryKind;
  text: string;
  project?: string;
  link?: { label: string; url: string };
}

export interface Chapter {
  id: Phase;
  number: string;
  title: string;
  years: string;
  summary: string; // one line, shown in the overview at the top
  why: string;
  entries: TimelineEntry[];
}

export const aboutIntro = {
  eyebrow: "About",
  title: "Architecture → Code → Growth",
  lede:
    "I've always wanted to know how things are put together. It started with buildings, moved into software, and is now pointed at the business side: how the things people build actually grow. Here's how each step led to the next.",
};

export const chapters: Chapter[] = [
  // =====================================================================
  // 01 ARCHITECTURE
  // =====================================================================
  {
    id: "architecture",
    number: "01",
    title: "Architecture",
    years: "Childhood – 2025",
    summary: "Learning to see buildings as choices, then designing my own.",
    why:
      "Travelling through China and Japan when I was younger, I couldn't stop comparing their buildings with the ones back home. Japan's were functional and restrained: every element had a job. China's were elaborate and intricate, layered with detail and meaning. Seeing such different answers to the same question made me want to understand why buildings look the way they do, and then to start designing my own.",
    entries: [
      {
        date: "Early years",
        title: "Trips to China and Japan",
        kind: "milestone",
        text:
          "The first time I noticed architecture as design. Japanese buildings put function first; Chinese buildings celebrated ornament and intricacy. After that, the buildings at home stopped looking like defaults and started looking like decisions someone had made.",
      },
      {
        date: "2022 – 2026",
        title: "Volunteer",
        org: "JCCC, Toronto",
        kind: "volunteering",
        text:
          "Helped 100+ elderly guests in English, French and Mandarin, and handled $1,000+ in cash transactions at community events.",
      },
      {
        date: "2023 – 2025",
        title: "Co-Founder, Building Magicians",
        org: "St. Robert CHS",
        kind: "leadership",
        text:
          "Started a building club from nothing and filled every bi-weekly workshop (40+ people) within six months, leading a 5-person exec team.",
      },
      {
        date: "2024",
        title: "Snowboard Launcher",
        kind: "project",
        project: "Snowboard Launcher",
        text:
          "A simple wish to practise snowboard tricks at home turned into a full design exercise, from early plans to a 3D model.",
      },
      {
        date: "2024 – 2026",
        title: "Rink Guard",
        org: "City of Toronto Recreation",
        kind: "work",
        text:
          "Kept public skates of up to 150 people safe, coordinating with staff and responding to 10+ on-ice incidents a season.",
      },
      {
        date: "2024 – 2026",
        title: "Student Council Executive",
        org: "St. Robert CHS",
        kind: "leadership",
        text:
          "Ran a semi-formal for 500+ people on a $10,000 budget, organized 10+ events a year, and turned student feedback into a spring market for student vendors.",
      },
      {
        date: "2024 – 2025",
        title: "Bayside Mansion",
        kind: "project",
        project: "Bayside Mansion",
        text:
          "A grade 10 art project that grew into a full house design: sketches, line drawings, floor plans and a final rendering.",
      },
      {
        date: "2025",
        title: "Tiny House",
        kind: "project",
        project: "Tiny House",
        text:
          "Learned SketchUp so my sketches could become 3D models I could actually walk through.",
      },
      {
        date: "2025",
        title: "Road Reconstruction",
        kind: "project",
        project: "Road Reconstruction",
        text: "Took the same design thinking from a single building out to a whole road layout.",
      },
    ],
  },

  // =====================================================================
  // 02 CODING
  // =====================================================================
  {
    id: "coding",
    number: "02",
    title: "Coding",
    years: "2026",
    summary: "Building faster, starting with problems I had myself.",
    why:
      "Architecture taught me to design, but it's slow: a model takes weeks, and a real building takes years. I wanted to build something and test it the same day. Software gave me that loop: write it, try it, fix it, ship it. And the ideas worth building turned out to be my own problems: I didn't want to pay for a Notion subscription, and there was no good way to practise for the IB French oral.",
    entries: [
      {
        date: "Jul 2026 – Present",
        title: "Progress",
        org: "Web application",
        kind: "project",
        link: { label: "Visit site", url: "https://sisyphusneverslept.com" },
        text:
          "Built my own alternative to Notion instead of paying for premium, then grew it to 1,270+ unique visitors. Along the way I learned to run it properly in production: Cloudflare security, encrypted account data, automated deployments with end-to-end tests, Google Calendar sync, and routing between the Gemini and Claude APIs.",
      },
      {
        date: "Jul 2026",
        title: "MorraAI",
        kind: "project",
        project: "MorraAI",
        text:
          "An AI examiner for the IB French B oral. Practising alone, with a classmate, or with an expensive tutor never felt like the real thing, so I built something that listens, asks follow-up questions and scores you against the IB criteria.",
      },
    ],
  },

  // =====================================================================
  // 03 FINANCE & GROWTH
  // =====================================================================
  {
    id: "growth",
    number: "03",
    title: "Finance & Growth",
    years: "2026 – Now",
    summary: "Understanding how the things people build actually grow.",
    why:
      "Building Progress showed me that making something is only half the work. The other half is getting people to use it, and understanding why some products grow while others stall. At the same time I got hooked on markets: how companies are valued, and what the numbers say about the business behind them. Commerce at Smith felt like the place to bring all of that together.",
    entries: [
      {
        date: "Jul 2026",
        title: "Financial Research Dashboard",
        kind: "project",
        project: "Financial Research Dashboard",
        text:
          "Pointed my coding at markets: a Python research terminal with live data, company financials, peer comps and a stock screener in one place.",
      },
      {
        date: "2026 – 2030",
        title: "Bachelor of Commerce",
        org: "Smith School of Business, Queen's University",
        kind: "education",
        text: "Studying the other half of building things: strategy, finance and growth.",
      },
      {
        date: "2026",
        title: "Junior Analyst",
        org: "Queen's Startup Consulting",
        kind: "leadership",
        text: "A first look at growth from the other side of the table, working on problems startups actually face.",
      },
    ],
  },
];

export const aboutClosing = {
  title: "Where it all meets",
  text:
    "Each step built on the last. Architecture taught me to design for the people who use something. Code lets me build and test ideas quickly. Business is teaching me how good ideas grow. I want to keep working where all three meet.",
};

export const languages = [
  { name: "English", level: "Native" },
  { name: "French", level: "B2" },
  { name: "Chinese", level: "Basic" },
];

// RESUME: drop your resume PDF into src/Assets/resume/ (any filename). The "Download resume" button
// uses the first PDF it finds there, and stays hidden while the folder is empty.
const resumeFiles = import.meta.glob("../Assets/resume/*.pdf", { eager: true, query: "?url", import: "default" });
export const resumeUrl = Object.values(resumeFiles)[0] as string | undefined;
export const resumeDownloadName = "Matthew_Chen_Resume.pdf"; // the filename people get when they download it

export const hobbies = [
  "FPV drones",
  "Puzzles",
  "Musicals",
  "MLB",
  "F1",
  "Reading",
  "Tennis",
  "Pickleball",
  "Golf",
  "Soccer",
];
