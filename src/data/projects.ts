// ALL PROJECTS, in one place.
//
// - Order here = order on the All Projects page (newest first), and the /project/N links (N = position,
//   starting at 0). Moving a project changes its link; the featured list and the About page find
//   projects by title, so they keep working.
// - "Featured Projects" on the home page = the featuredProjects list below (exact titles, in display order).
// - categories decides which All Projects filters it appears under (one or more of the ids in projectCategories).
// - image is the card thumbnail. Thumbnails for the research and code projects live in
//   src/Assets/thumbnails/: drop your own .jpg over the placeholder with the same name.
// - A project with a `research` block gets the research layout (chart + PDF download);
//   one with a `code` block gets the GitHub case-study layout; one with a `pitch` block gets the
//   stock-pitch layout. Everything else uses the gallery layout.
import type { MediaItem, Project, ProjectCategory, ResearchChart } from "@/types/project";

// ---------- design assets ----------
// snowboard
import initial from "../Assets/snowboard/initialplans.jpg";
import video from "../Assets/snowboard/creativetimelapse.mp4";
import prop from "../Assets/snowboard/ProperDrawing.jpg";
import deed from "../Assets/snowboard/3d.stl";
// cpt (bayside mansion)
import ai from "../Assets/cpt/aiart.jpg";
import concept from "../Assets/cpt/concept.jpg";
import drawing from "../Assets/cpt/drawing.jpg";
import plan1 from "../Assets/cpt/floorplan1.jpg";
import plan2 from "../Assets/cpt/floorplan2.jpg";
import plan3 from "../Assets/cpt/floorplan3.jpg";
import plan4 from "../Assets/cpt/floorplan4.jpg";
import line from "../Assets/cpt/line.jpg";
import sketch from "../Assets/cpt/sketch.jpg";
import vid from "../Assets/cpt/timelapsec.mp4";
// road
import original from "../Assets/road/original.jpg";
import change from "../Assets/road/changes.jpg";
import vid2 from "../Assets/road/changes.mp4";
import vid3 from "../Assets/road/original.mp4";
// sketchup (tiny house)
import first from "../Assets/sketchup/house.stl";
import hero from "../Assets/sketchup/house.png";

// ---------- research assets ----------
import physicsPdf from "../Assets/research/paper-airplane-physics-ia.pdf";
import chemistryPdf from "../Assets/research/spinach-vitamin-c-chemistry-ia.pdf";
import momentumPdf from "../Assets/research/momentum-lab-report.pdf";
import physicsThumb from "../Assets/thumbnails/paper-airplane.jpg";
import chemistryThumb from "../Assets/thumbnails/vitamin-c-spinach.jpg";
import momentumThumb from "../Assets/thumbnails/momentum-lab.jpg";

// ---------- code assets ----------
import morraThumb from "../Assets/thumbnails/morraai.jpg";
import dashboardThumb from "../Assets/thumbnails/financial-dashboard.jpg";

// ---------- finance assets (stock pitches) ----------
import ftaiPdf from "../Assets/research/ftai-short-memo.pdf";
import deltaPdf from "../Assets/research/delta-airlines-pitch.pdf";
import ftaiThumb from "../Assets/thumbnails/ftai-short.jpg"; // top of page 1 of the memo
import deltaThumb from "../Assets/thumbnails/delta-pitch.jpg"; // the deck's cover slide

const normalizeImages = (arr: (string | MediaItem)[]): MediaItem[] => {
  return arr.map((item) => {
    if (typeof item === "string") {
      const isVideo = item.toLowerCase().endsWith(".mp4");
      return { url: item, type: isVideo ? "video" : "image" };
    }
    return { url: item.url, type: item.type };
  });
};

// ---------- research chart data (from the reports) ----------
// physics ia: paper airplane wing area
const physicsChart: ResearchChart = {
  title: "Mean horizontal displacement vs. wing surface area",
  caption:
    "Each point is the mean of 8 launches; error bars are the uncertainty of the mean (σ/√n). Dashed line is the linear regression.",
  xLabel: "Wing surface area (cm²)",
  yLabel: "Displacement (m)",
  xDomain: [120, 185],
  yDomain: [2.8, 4.2],
  xTicks: [120, 130, 140, 150, 160, 170, 180],
  yTicks: [2.8, 3.0, 3.2, 3.4, 3.6, 3.8, 4.0, 4.2],
  connect: false,
  points: [
    { x: 124, y: 3.04, err: 0.09 },
    { x: 138, y: 3.43, err: 0.06 },
    { x: 153, y: 3.57, err: 0.07 },
    { x: 167, y: 3.58, err: 0.08 },
    { x: 181, y: 4.02, err: 0.09 },
  ],
  // regression from the report: 147.3 m/m² = 0.01473 m/cm², b = 1.280 m
  fit: { slope: 0.01473, intercept: 1.28, label: "y = 147.3x + 1.280 (r = 0.948)" },
};

// chemistry ia: vitamin c in boiled spinach
const chemistryChart: ResearchChart = {
  title: "Ascorbic acid concentration vs. boiling time",
  caption:
    "Each point is the mean of 5 iodine titrations; error bars are the propagated absolute uncertainty.",
  xLabel: "Boiling time (min)",
  yLabel: "Concentration (×10⁻⁴ M)",
  xDomain: [0, 8],
  yDomain: [0, 5.5],
  xTicks: [0, 2, 4, 6, 8],
  yTicks: [0, 1, 2, 3, 4, 5],
  connect: true,
  points: [
    { x: 0, y: 4.6, err: 0.4 },
    { x: 2, y: 2.9, err: 0.2 },
    { x: 4, y: 1.9, err: 0.2 },
    { x: 6, y: 1.8, err: 0.2 },
    { x: 8, y: 1.5, err: 0.2 },
  ],
};

// momentum lab: total system momentum around the collision
const momentumChart: ResearchChart = {
  title: "Total system momentum through the collision",
  caption:
    "p = 0.5447·v₁ + 0.5342·v₂ from Logger Pro. The sign flips because the carts reverse direction; the magnitude drops from 0.199 to 0.184 kg·m/s.",
  xLabel: "Time (s)",
  yLabel: "Momentum (kg·m/s)",
  xDomain: [4.3, 5.0],
  yDomain: [-0.22, 0.22],
  xTicks: [4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0],
  yTicks: [-0.2, -0.1, 0, 0.1, 0.2],
  connect: true,
  points: [
    { x: 4.3, y: 0.199 },
    { x: 4.35, y: 0.19 },
    { x: 4.4, y: 0.17 },
    { x: 4.45, y: 0.126 },
    { x: 4.5, y: 0.048 },
    { x: 4.55, y: -0.045 },
    { x: 4.6, y: -0.12 },
    { x: 4.65, y: -0.161 },
    { x: 4.7, y: -0.178 },
    { x: 4.75, y: -0.184 },
    { x: 4.8, y: -0.185 },
    { x: 4.85, y: -0.184 },
    { x: 4.9, y: -0.184 },
    { x: 4.95, y: -0.185 },
    { x: 5.0, y: -0.184 },
  ],
};

// filter buttons on the All Projects page, in this order
export const projectCategories: { id: ProjectCategory; label: string }[] = [
  { id: "architecture", label: "Architecture" },
  { id: "business", label: "Business" },
  { id: "research", label: "Research" },
  { id: "coding", label: "Coding" },
];

// FEATURED PROJECTS on the home page: exact titles from projectsData below, shown in this order.
export const featuredProjects = [
  "Delta Air Lines Stock Pitch",
  "Financial Research Dashboard",
  "Vitamin C in Boiled Spinach",
];

export const projectsData: Project[] = [
  // NEWEST FIRST. Add new projects at the top.

  // ftai short memo
  {
    image: ftaiThumb,
    title: "FTAI Aviation Short Thesis",
    description:
      "A 4-page investment memo arguing to short FTAI Aviation (NASDAQ: FTAI): a stock priced for its best case while it burns cash and leans on debt and asset sales to grow.",
    year: "2026",
    location: "",
    categories: ["business"],
    pitch: {
      kind: "Equity research · Investment memo",
      company: "FTAI Aviation Ltd.",
      ticker: "NASDAQ: FTAI",
      industry: "Aircraft engine aftermarket & power",
      rating: "Short",
      price: 188.0,
      priceNote: "Nov 10, 2026 close",
      target: 152.87,
      summary:
        "Short FTAI with a 12-month price target of about $153, my base-case DCF. FTAI's core business rebuilds an ageing engine, it keeps burning cash, and it relies on debt and asset sales to grow, yet the stock is priced as if everything goes right. If 2027 guidance is missed, the bear case is about $92.",
      variantView:
        "The Street is paying for Power and a margin rebound. The new-aircraft delivery backlog cuts both ways: it keeps old engines flying and needing repairs, but it also leaves fewer retired engines to strip for parts and Power. The growth is real but low quality: Aerospace margin has fallen from 42% to 30%, growth is absorbed by inventory, and expansion is funded by selling leased assets to FTAI's own funds and by borrowing.",
      thesis: [
        {
          title: "Priced for guidance in full",
          text: "At $188 the market is already paying for ~75% revenue growth and ~51% EBITDA growth in a single year, with about a fifth of 2027 EBITDA coming from Power, a product that hasn't shipped yet. FTAI has to hit aggressive guidance just to justify today's price.",
        },
        {
          title: "Profit isn't turning into cash",
          text: "Aerospace margin fell from 41.6% (FY2022) to 29.8% (9M 2026). Operations used $188M of cash in 2024 and $311M in 2025 while inventory grew from $317M to $1.93B. 'Adjusted free cash flow' also counts asset sales, largely to FTAI's own funds.",
        },
        {
          title: "Growth runs on asset sales and debt",
          text: "Inventory and buybacks are paid for with asset sales and borrowing. On Nov 6, 2026 FTAI issued $1.0bn of 7.125% notes to fund a $500M accelerated buyback and redeem $500M of 5.50% notes: debt is refinanced at higher rates, not repaid. Debt sits at $3.96bn, rated Ba1 / BB+.",
        },
        {
          title: "The core market is ageing out",
          text: "About 20,000 CFM56 engines are in service, retiring at 2–3% a year as LEAP and GTF engines take over, so the fleet shrinks to roughly 17,000–18,000 by 2031. The 25% share target caps revenue near $5.5–6.25bn, which the forecast already reaches by FY2031.",
        },
        {
          title: "Two businesses, one engine supply",
          text: "Each Mod-1 power turbine uses one retired CFM56. At 10–15 units a month, Power would take 20–45% of the 400–600 engines retiring each year, the same engines Aerospace needs. First Mod-1 delivery has already slipped from Q4 2026 into 2027.",
        },
      ],
      stats: [
        { label: "WACC", value: "11.49%" },
        { label: "EV / FY27E EBITDA guide", value: "9.9x" },
        { label: "Probability-weighted value", value: "$146.37" },
      ],
      scenarios: [
        {
          name: "Bear",
          price: 92.15,
          probability: 0.35,
          note: "2027 guidance missed: Mod-1 deliveries slip to 45 units and Aerospace margin falls to 27%.",
        },
        {
          name: "Base",
          price: 152.87,
          probability: 0.55,
          note: "Aerospace at guidance with a 30% margin; Power earns the low end of guidance ($450M EBITDA) in 2027.",
        },
        {
          name: "Bull",
          price: 300.38,
          probability: 0.1,
          note: "Power and Aerospace both beat: 180 Mod-1 units a year and margins near 33%.",
        },
      ],
      valuation: [
        "Five-year DCF (FY2027E–FY2031E) with 2.5% terminal growth; the terminal value is 72% of enterprise value.",
        "WACC of 11.49%: cost of equity 12.71% (beta 1.57), after-tax cost of debt 5.63%, 17.2% debt weight.",
        "Aerospace revenue growth fades 14% → 10% → 6% → 3% at a flat 30% margin; Power EBITDA grows from $450M (2027) to $772M (FY2031E).",
        "Every $1 of Aerospace revenue growth ties up about $0.50 of inventory, which is why free cash flow lags EBITDA.",
        "Bear and bull cases are built bottom-up from Mod-1 units, price per unit and module volumes.",
      ],
      catalysts: [
        {
          when: "Late Feb 2027",
          event: "Q4 2026 results and guidance",
          detail: "Confirms the short: margin under 30%, inventory outgrowing revenue. Breaks it: margin above 32%, guidance raised.",
        },
        {
          when: "Q1 2027",
          event: "First Mod-1 deliveries",
          detail: "Confirms: under 5 units a month by mid-year, or another delay. Breaks: on pace for the 100-unit target.",
        },
        {
          when: "Mid-2027",
          event: "Q1–Q2 results; Mod-1 run-rate",
          detail: "Confirms: under ~425 modules a quarter (the 1,700 plan). Breaks: run-rate above plan with margin held.",
        },
        {
          when: "Q3 2027",
          event: "2028 Power orders",
          detail: "Confirms: no new customers. Breaks: new orders and 10–15 units a month reached.",
        },
        {
          when: "Any time",
          event: "Buyback and $500M ASR",
          detail: "Confirms: buying support fades once the ASR completes. Breaks: the buyback authorization is raised again.",
        },
      ],
      risks: [
        {
          risk: "Power beats",
          detail: "Guidance is $450–750M of EBITDA; the top end is worth about $217 a share.",
          mitigant: "The base case already uses the low end, and first delivery has slipped once.",
        },
        {
          risk: "Margin rebound",
          detail: "35% margins from 2028 would lift the DCF value to about $192.",
          mitigant: "Management itself guides to 30% in the near term.",
        },
        {
          risk: "Short squeeze",
          detail: "$1.0bn buyback, ~10% short interest, and a +17% move on Q3.",
          mitigant: "Keep the position small; cap losses with a stop or puts.",
        },
        {
          risk: "Re-rating",
          detail: "The AI-power story lifts the multiple anyway.",
          mitigant: "The thesis rests on cash conversion, so track free cash flow.",
        },
        {
          risk: "Carry cost",
          detail: "A short pays the $2.00 dividend (~1.1%) plus the borrow fee.",
          mitigant: "12-month horizon, with catalysts inside six months.",
        },
      ],
      pdf: ftaiPdf,
      pdfName: "FTAI_Aviation_Short_Memo.pdf",
      pages: 4,
      format: "memo",
    },
  },

  // delta pitch deck
  {
    image: deltaThumb,
    title: "Delta Air Lines Stock Pitch",
    description:
      "A team stock pitch recommending a Buy on Delta Air Lines (NYSE: DAL): premium and loyalty revenue keeps growing through a fuel shock the market is pricing as permanent.",
    year: "2026",
    location: "",
    categories: ["business"],
    pitch: {
      kind: "Equity research · Team pitch deck",
      company: "Delta Air Lines",
      ticker: "NYSE: DAL",
      industry: "Airlines",
      rating: "Buy",
      price: 74.63,
      target: 84.08,
      summary:
        "Buy Delta with a base-case target of $84.08. Premium cabins and the Amex partnership are growing faster than the rest of the business and don't move with fuel prices, while the market is pricing the 2026 fuel shock as if it were permanent.",
      variantView:
        "The Street treats Delta as a cyclical airline whose earnings fall with every fuel spike: the 2026 EPS guide was cut from $6.50–7.50 to $5.10–5.60, and 2027 consensus fell ~15% in 60 days. We see a short-term setback: the damage is mostly fuel, and fares covered about 91% of the Q3 cost increase.",
      thesis: [
        {
          title: "Premium and loyalty improve revenue quality",
          text: "Q3 premium revenue grew 18% on ~6% more seats and now edges past main cabin ($6.82B vs $6.8B). Loyalty revenue grew 19% and Amex remuneration 15% to $2.3B for the quarter, on pace for more than $9B in 2026. Amex follows card spending, not fares or fuel.",
        },
        {
          title: "The fuel shock is priced as permanent",
          text: "In Q3 passenger revenue grew 15% on just 0.3% more capacity, with yield up 14% and an unchanged 86% load factor: customers kept flying at higher prices. Fares covered ~91% of the fuel cost increase, and the EIA expects jet fuel to fall 24% in 2027.",
        },
        {
          title: "Earnings beyond ticket sales",
          text: "Equity stakes in other airlines ($4.2B), the Monroe Energy refinery ($157M of operating income in 2025) and Delta TechOps maintenance ($1B of revenue, +60%) add earnings that don't depend on selling seats.",
        },
      ],
      stats: [
        { label: "WACC", value: "10.25%" },
        { label: "2027E P/E vs peers", value: "13.8x vs 11.5x" },
        { label: "Trading comps range", value: "$84–$101" },
      ],
      scenarios: [
        { name: "Bear", price: 72.8, note: "Fuel stays elevated." },
        {
          name: "Base",
          price: 84.08,
          note: "Fuel eases as the US–Iran conflict and Hormuz disruption resolve; EBIT margin recovers from 7.9% to 10.5%.",
        },
        { name: "Bull", price: 91.23, note: "Faster fuel relief." },
      ],
      valuation: [
        "Five-year DCF with a 10.25% WACC (risk-free 5.13%, beta 1.34, 5.0% equity risk premium) and 2.5% terminal growth; the terminal value is 75.7% of enterprise value.",
        "EBIT margin recovers from 7.9% (FY2026E) to 10.5% as fuel normalizes, with revenue growth of 3.3% rising to 5.0%.",
        "Capex falls from 8.0% to 6.2% of revenue while D&A rises from 4.2% to 5.0%.",
        "Cross-checked with trading comps (United, American, Ryanair, IAG): the peer-median 2027E P/E and EV/EBITDA imply $84.30–$101.18.",
        "Sensitivity across WACC (8.75–11.75%) and terminal growth (1.5–3.5%) gives a range of about $61–$132.",
      ],
      catalysts: [
        {
          when: "Any time",
          event: "Hormuz resolution",
          detail: "A US–Iran deal unwinds the war premium in Brent (~$109). Not priced in: oil swings on every rumour, and a deal isn't the base case.",
        },
        {
          when: "Mid-Jan 2027",
          event: "Q4 earnings and FY27 guide",
          detail: "Revenue up ~20% on under 2% more seats. 2027 consensus was cut ~15% in 60 days, a low bar to beat.",
        },
        {
          when: "Through 2027",
          event: "Jet fuel normalizes",
          detail: "EIA: US jet fuel falls from $3.39/gal (2026) to $2.59/gal (2027), −24%.",
        },
        {
          when: "2026–2027",
          event: "Amex and loyalty growth",
          detail: "Amex above $9B in 2026 with a path to $10B, plus a new Hyatt deal.",
        },
        {
          when: "2026–2027",
          event: "Deleveraging",
          detail: "$2B+ of debt paydown to ~2.2x leverage on ~$2.5B of FY26 free cash flow.",
        },
      ],
      risks: [
        {
          risk: "Rising fuel costs",
          detail: "The FY26 fuel bill is up ~$6B with Brent near $109, and Delta doesn't hedge.",
          mitigant: "Fares covered ~91% of the Q3 cost rise, and the refinery offsets part of it.",
        },
        {
          risk: "Industry competition",
          detail: "As fuel falls, rivals add flights back and compete fares down.",
          mitigant: "Aircraft and engine delivery bottlenecks cap new seats.",
        },
        {
          risk: "Inflation and rates",
          detail: "With the Fed at 3.75–4.00%, a slowdown hits ticket sales and Amex card spending.",
          mitigant: "Premium flyers are less price-sensitive, and real spending is still growing.",
        },
        {
          risk: "Operational issues",
          detail: "A Q3 refinery outage caused a $33M operating loss.",
          mitigant: "The refinery is ~2.7% of operating income, small against total earnings.",
        },
      ],
      pdf: deltaPdf,
      pdfName: "Delta_Air_Lines_Stock_Pitch.pdf",
      pages: 17,
      format: "deck",
    },
  },

  // momentum lab
  {
    image: momentumThumb,
    title: "Momentum & Friction in Collisions",
    description:
      "A lab using motion detectors and magnetic carts to test whether momentum is conserved in a collision, and to measure friction from the momentum lost.",
    year: "2026",
    location: "Thornhill, ON",
    categories: ["research"],
    research: {
      subject: "Physics · Lab Report (SPH4U)",
      researchQuestion:
        "Is momentum conserved when two magnetic carts collide on a track, and how large is the friction force acting on them?",
      method: [
        "Placed two carts with repelling magnets (544.7 g and 534.2 g) at opposite ends of an aluminium track and gently pushed them toward each other.",
        "Recorded position–time data for both carts with Vernier motion detectors, and let Logger Pro calculate their velocities.",
        "Calculated total momentum at every time step as p = 0.5447·v₁ + 0.5342·v₂.",
        "Fitted lines to the momentum–time graph before and after the collision and found friction from the slope, F = Δp/Δt.",
      ],
      stats: [
        { label: "Momentum before", value: "0.199 kg·m/s" },
        { label: "Momentum after", value: "0.184 kg·m/s" },
        { label: "Difference", value: "7.83%" },
        { label: "Friction force", value: "0.0392 ± 0.0013 N" },
        { label: "Total uncertainty", value: "3.35%" },
      ],
      chart: momentumChart,
      findings: [
        "Total momentum dropped from 0.199 to 0.184 kg·m/s across the collision (7.83%). That loss matches friction's impulse (J = Δp), so the collision itself effectively conserved momentum.",
        "The momentum–time slopes were −0.0364 N before the collision and +0.0420 N after, which average to a friction force of 0.0392 ± 0.0013 N.",
        "Nearly all of the uncertainty came from sensor noise: the scale contributed only 0.037% of the 3.35% total.",
        "Rigid plastic wheels on an aluminium rail keep rolling friction very low, and the rail stops the carts drifting sideways.",
      ],
      limitations: [
        "The detectors have a minimum range, so overlapping pulses created a false dip between 4.4 and 4.8 s. Only data from before and after the collision was used.",
        "The slopes before and after differed by about 0.0056 N, suggesting a slightly tilted track. That systematic error is about 4× the random uncertainty.",
        "Improvement: level the track precisely with a bubble or laser level.",
      ],
      pdf: momentumPdf,
      pdfName: "Momentum_Lab_Report.pdf",
      pages: 9,
    },
  },

  // morraai
  {
    image: morraThumb,
    title: "MorraAI",
    description:
      "An AI practice examiner for the IB French B Individual Oral: it transcribes your presentation live, asks follow-up questions, and scores you against the IB criteria.",
    year: "2026",
    location: "Thornhill, ON",
    categories: ["coding"],
    code: {
      repo: "MorraAI",
      tagline: "An AI examiner for IB French oral practice",
      problem:
        "The IB French B Individual Oral is spontaneous: you present on an image tied to an IB theme, then answer unpredictable follow-up questions live. Practice options were talking to a wall, asking a classmate whose French is as shaky as yours, or paying a tutor a lot for 15 minutes. MorraAI gives students unlimited, low-stakes practice with an examiner that speaks excellent French and never gets tired.",
      howItWorks: [
        "The app gives a mock prompt from one of the five core IB themes (Identities, Sharing the Planet, and so on).",
        "You record a 10-minute presentation on the spot, and MorraAI transcribes it in real time.",
        "It analyzes your vocabulary and level, then asks follow-up questions pitched to you, the way a real examiner would.",
        "At the end you get a full performance breakdown, scored against the actual IB assessment criteria.",
      ],
      features: [
        "Live transcription streamed over WebSockets during the presentation",
        "Adaptive follow-up questions based on what you actually said",
        "Prompts covering all five IB themes",
        "Feedback scored against the official IB French B IO criteria",
        "Containerized with Docker",
      ],
      stack: ["TypeScript", "React", "Fastify", "WebSockets", "Gemini API", "Prisma", "Supabase", "Docker"],
      fallbackLanguages: { TypeScript: 407353, CSS: 2755, Dockerfile: 991, HTML: 295, JavaScript: 81 },
    },
  },

  // financial dashboard
  {
    image: dashboardThumb,
    title: "Financial Research Dashboard",
    description:
      "A Python/Dash terminal for equity analysis: live market overview, company financials, peer comps, a stock screener, commodities and news sentiment.",
    year: "2026",
    location: "Thornhill, ON",
    categories: ["coding", "business"],
    code: {
      repo: "Financial-Dashboard",
      tagline: "A live equity research terminal in Python",
      problem:
        "Investment-banking-style research means jumping between quote screens, filings, comps spreadsheets and news sites. This dashboard puts those workflows in one terminal that runs out of the box on free, no-key data providers.",
      howItWorks: [
        "Market data is pulled through the OpenBB Platform, mostly from yfinance, with SEC data for ticker search.",
        "Each data call has its own cache lifetime, so fundamentals are cached for hours while prices stay fresh.",
        "The Overview, Company and Commodities pages auto-refresh every 30 seconds, with a 'Live · updated' indicator.",
        "Comps and the Screener are run on demand, because multiples and screens are deliberate analysis, not a live feed.",
      ],
      features: [
        "Overview: Fear & Greed Index, major indices, sector performance, top movers, commodities",
        "Company: profile, key stats, 12-month chart, analyst consensus, full financial statements",
        "Comps: auto-suggested peer group with P/E, EV/EBITDA, EV/Revenue, margins, growth and leverage",
        "Screener: filter by sector, market cap, price, beta and volume",
        "Commodities: gold, silver, oil, natural gas, copper, corn and wheat with price and volume charts",
        "News & Sentiment: Fear & Greed history plus ticker and market news",
      ],
      stack: ["Python", "Dash", "Plotly", "OpenBB", "yfinance"],
      fallbackLanguages: { Python: 67758, CSS: 5517 },
    },
  },

  // physics ia
  {
    image: physicsThumb,
    title: "Paper Airplane Wing Area",
    description:
      "A physics investigation into how wing surface area changes how far a slingshot-launched paper airplane flies, linking lift and drag to measured range.",
    year: "2026",
    location: "Thornhill, ON",
    categories: ["research"],
    research: {
      subject: "Physics · Internal Assessment",
      researchQuestion:
        "How does the horizontal displacement (in m) of a paper airplane depend on the surface area of its wings when it is launched from an inclined slingshot at a height of 1.016 ± 0.0005 m?",
      hypothesis:
        "Since lift is proportional to wing area (L = ½ρv²·Cₗ·A), reducing the wing area should reduce the horizontal displacement.",
      variables: {
        independent: "Wing surface area: 181, 167, 153, 138, 124 cm² (±3 cm²)",
        dependent: "Horizontal displacement of the plane (m)",
        controlled: [
          "Plane mass: 4.90 g ± 0.05 g",
          "Launch height: 1.016 m ± 0.0005 m",
          "Launch angle (checked with a protractor daily)",
          "Rubber band extension: 0.165 m",
          "Folding pattern and paper type",
          "Indoor room with doors and windows closed",
        ],
      },
      method: [
        "Folded a dart-style plane from letter paper and taped the tail so the slingshot wouldn't deform it, trimming the mass to 4.90 g.",
        "Launched each plane from a slingshot rail fixed at 1.016 m, pulling the band back 0.165 m every time.",
        "Measured the horizontal distance from the launch point's floor projection to the back of the plane with a tape measure.",
        "Reduced the wing area in ~14 cm² steps by folding the trailing edge along preset parallel lines, with 8 launches per area (40 total).",
      ],
      stats: [
        { label: "Wing areas tested", value: "5" },
        { label: "Total launches", value: "40" },
        { label: "Range", value: "3.04 → 4.02 m" },
        { label: "Gradient", value: "151 ± 26 m/m²" },
        { label: "Correlation", value: "r = 0.948" },
      ],
      chart: physicsChart,
      findings: [
        "Flight distance increased with wing area in a strong, near-linear trend: about 0.15 m of extra range for every 10 cm² of wing.",
        "More wing area means more lift, which reduces the net downward acceleration, keeps the plane in the air longer, and so carries it further (Δx = vₓt).",
        "Drag also changes with area, but induced and parasite drag move in opposite directions and partly cancel, so lift dominates over the tested range.",
        "An RMSE of 0.13 m (about 3–4%) shows the linear model is a good approximation within 124–181 cm², not a universal law.",
      ],
      limitations: [
        "Repeated launches slightly deformed the planes, shifting the centre of pressure relative to the centre of mass and adding torque.",
        "Small folding inconsistencies were hard to see until a plane veered off course.",
        "Simplifying lift to L = C·A assumes constant velocity, but drag slows the plane during flight.",
        "The separate effects of induced and parasite drag could not be measured.",
      ],
      pdf: physicsPdf,
      pdfName: "Paper_Airplane_Wing_Area_Physics_IA.pdf",
      pages: 16,
      wordCount: 2985,
    },
  },

  // chemistry ia
  {
    image: chemistryThumb,
    title: "Vitamin C in Boiled Spinach",
    description:
      "A chemistry investigation using iodine redox titration to measure how quickly boiling destroys the vitamin C in baby spinach.",
    year: "2026",
    location: "Thornhill, ON",
    categories: ["research"],
    research: {
      subject: "Chemistry · Internal Assessment",
      researchQuestion:
        "How does boiling time (0–8 minutes) affect the concentration of ascorbic acid in spinach, as determined by iodine redox titration?",
      hypothesis:
        "Longer boiling will lower the ascorbic acid concentration, because vitamin C oxidizes and breaks down with heat, and leaches into the cooking water.",
      variables: {
        independent: "Boiling time: 0, 2, 4, 6, 8 min (raw, blanched, cooked, stewed, puréed)",
        dependent: "Ascorbic acid concentration (mol dm⁻³)",
        controlled: [
          "Spinach mass: 5.00 g ± 0.01 g",
          "Boiling water: 150 mL ± 2 mL distilled, at 100 °C",
          "Aliquot volume: 10.0 mL ± 0.1 mL",
          "Iodine solution: 0.00100 M ± 0.00001 M",
          "Blending time: 1 min; filtration: 30 min, same filter paper",
          "Spinach and water blended together so leached vitamin C is counted",
        ],
      },
      method: [
        "Boiled 5.00 g of baby spinach in 150 mL of distilled water at 100 °C for the set time, then let it cool for 10 minutes.",
        "Blended the spinach together with its cooking water for 1 minute and filtered it for 30 minutes.",
        "Titrated 10 mL of filtrate (with 20 mL of water, 5 mL of 0.5 M HCl and starch indicator) against 0.00100 M iodine until a blue-black colour held for 10–15 s.",
        "Ran 5 trials per boiling time (25 titrations) and found the concentration from the 1:1 reaction C₆H₈O₆ + I₂ → C₆H₆O₆ + 2H⁺ + 2I⁻.",
      ],
      stats: [
        { label: "Titrations", value: "25" },
        { label: "Raw spinach", value: "4.6 × 10⁻⁴ M" },
        { label: "After 8 min", value: "1.5 × 10⁻⁴ M" },
        { label: "Vitamin C lost", value: "≈ 67%" },
        { label: "Best-fit model", value: "1st order, R² ≈ 0.95" },
      ],
      chart: chemistryChart,
      findings: [
        "Ascorbic acid concentration fell from 4.6 to 1.5 × 10⁻⁴ M: about two-thirds of the vitamin C was gone after 8 minutes, and over a third after just 2 minutes of blanching.",
        "The loss slows down over time. Plotting ln[A] against time gave the best fit (R² ≈ 0.95, vs 0.91 for zero order and 0.92 for second order), which points to first-order kinetics.",
        "First-order behaviour means the rate of loss is proportional to how much vitamin C is left, which fits collision theory for the oxidation to dehydroascorbic acid.",
        "Practical takeaway: raw spinach keeps by far the most vitamin C, so even short cooking costs a lot of it.",
      ],
      limitations: [
        "Spinach kept oxidizing in storage, even refrigerated in a sealed container.",
        "The iodine solution slowly degraded despite being stored in the dark.",
        "Polyphenols and flavonoids also reduce iodine, so the titration measures more than vitamin C alone.",
        "Some vitamin C may have stayed in the filtered-out pulp, and the starch end point is a visual judgement.",
        "Improvement: HPLC would measure ascorbic acid on its own, without relying on a visual end point.",
      ],
      pdf: chemistryPdf,
      pdfName: "Vitamin_C_Spinach_Chemistry_IA.pdf",
      pages: 14,
      wordCount: 2870,
    },
  },

  // road
  {
    image: change,
    title: "Road Reconstruction",
    description:
      "Renovation project that transformed a traditional suburban house into a contemporary living space...",
    year: "2025",
    location: "Toronto, ON",
    categories: ["architecture"],
    details: "",
    images: normalizeImages([
      { url: change, type: "image" },
      { url: original, type: "image" },
      { url: vid2, type: "video" },
      { url: vid3, type: "video" },
    ]),
    progressionStages: [],
  },

  // sketchup
  {
    image: hero,
    title: "Tiny House",
    description:
      "While drawings and sketches are great for brainstorming and idea generation, ultimately bringing your ideas into 3D helps to visualize the real end-product. My goal was to learn SketchUp and become proficient in using 3D modelling softwares to improve my technical skills and help bring my ideas to life.",
    year: "2025",
    location: "Toronto, ON",
    categories: ["architecture"],
    details:
      "While drawings and sketches are great for brainstorming and idea generation, ultimately bringing your ideas into 3D helps to visualize the real end-product. My goal was to learn SketchUp and become proficient in using 3D modelling softwares to improve my technical skills and help bring my ideas to life.",
    images: normalizeImages([
      { url: hero, type: "image" },
      { url: first, type: "model" },
    ]),
    progressionStages: [],
  },

  // grade 10 cpt
  {
    image: drawing,
    title: "Bayside Mansion",
    description:
      "Harmonizing with the surrounding landscape, this retreat employs sustainable materials...",
    year: "2024-2025",
    location: "San Jose, CA",
    categories: ["architecture"],
    details:
      "The Bayside Mansion was a project that began in 10th grade during Art Class when we were told to create a meaningful art project. My passion for architecture, as well as my ",
    images: normalizeImages([
      drawing,
      line,
      { url: vid, type: "video" },
      sketch,
      plan1,
      plan2,
      plan3,
      plan4,
      concept,
      ai,
    ]),
    progressionStages: [],
  },

  // cas project
  {
    image: prop,
    title: "Snowboard Launcher",
    description:
      "What began as a simple desire to practice snowboard tricks at home evolved into a full architectural exploration...",
    year: "2024",
    location: "North York, ON",
    categories: ["architecture"],
    images: [
      { url: prop, type: "image" },
      { url: initial, type: "image" },
      { url: deed, type: "model" },
      { url: video, type: "video" },
    ],
    progressionStages: [],
  },
];

// "More on GitHub" on the All Projects page shows exactly these repos, in this order.
// Keep it matching the pinned repos on github.com/The4Caster13 (exact repo names).
// GitHub's public API can't read pins without a login token, so this list is the source of truth.
export const pinnedRepos = ["Professional-Portfolio", "Financial-Dashboard", "MorraAI"];
