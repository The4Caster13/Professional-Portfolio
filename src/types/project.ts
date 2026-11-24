export interface MediaItem {
  url: string;
  type: "image" | "video" |"model";
}
//fixes the unorganized string problem
export interface ProgressionStage {
  stage: string;
  title: string;
  description: string;
  image: string;
  icon?: string;
  details: {
    process: string;
    tools: string[];
    timeline: string;
    deliverables: string[];
  };
}

// research reports (IAs + labs): a chart of the real data on the project page
export interface ResearchPoint {
  x: number;
  y: number;
  err?: number;
}

export interface ResearchChart {
  title: string;
  caption: string;
  xLabel: string;
  yLabel: string;
  xDomain: [number, number];
  yDomain: [number, number];
  xTicks: number[];
  yTicks: number[];
  points: ResearchPoint[];
  connect: boolean;
  fit?: { slope: number; intercept: number; label: string };
}

export interface ResearchStat {
  label: string;
  value: string;
}

export interface ResearchInfo {
  subject: string;
  researchQuestion: string;
  hypothesis?: string;
  variables?: {
    independent: string;
    dependent: string;
    controlled: string[];
  };
  method: string[];
  stats: ResearchStat[];
  chart: ResearchChart;
  findings: string[];
  limitations: string[];
  pdf: string;
  pdfName: string;
  pages: number;
  wordCount?: number;
}

// github case studies: live repo stats come from src/lib/github.ts
export interface CodeInfo {
  repo: string;
  tagline: string;
  problem: string;
  howItWorks: string[];
  features: string[];
  stack: string[];
  liveUrl?: string;
  fallbackLanguages: Record<string, number>; // snapshot of /languages for when the api is unavailable
}

// stock pitches + investment memos. Upside/downside % are worked out from the prices, never typed in.
export interface PitchScenario {
  name: string; // "Bear", "Base", "Bull"
  price: number; // value per share
  probability?: number; // 0.35 = 35%, optional
  note: string; // what has to happen for this case
}

export interface PitchInfo {
  kind: string; // small label above the title, e.g. "Equity research · Short memo"
  company: string;
  ticker: string; // "NASDAQ: FTAI"
  industry: string;
  rating: "Buy" | "Sell" | "Short" | "Hold";
  price: number; // share price the pitch was written at
  priceNote?: string; // e.g. "Nov 10, 2026 close"
  target: number; // base-case price target
  summary: string; // the recommendation in a few sentences
  variantView?: string; // what the market thinks vs. what you think
  thesis: { title: string; text: string }[];
  stats: { label: string; value: string }[]; // extra tiles after price / target / upside
  scenarios: PitchScenario[]; // drawn as the bear / base / bull chart
  valuation: string[]; // how the target was built
  catalysts: { when: string; event: string; detail: string }[];
  risks: { risk: string; detail: string; mitigant: string }[];
  pdf: string;
  pdfName: string;
  pages: number;
  format: "memo" | "deck"; // changes the wording on the download buttons
}

// filters on the All Projects page (labels and order: projectCategories in src/data/projects.ts)
export type ProjectCategory = "architecture" | "business" | "research" | "coding";

export interface Project {
  title: string;
  image: string;
  description: string;
  year: string;
  location: string;
  categories: ProjectCategory[]; // which filters the project shows under (can be more than one)
  construction?: boolean;
  details?: string;
  images?: MediaItem[];
  progressionStages?: ProgressionStage[];
  research?: ResearchInfo; // gives the project the research layout
  code?: CodeInfo; // gives the project the github case-study layout
  pitch?: PitchInfo; // gives the project the stock-pitch layout
}
