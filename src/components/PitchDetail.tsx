import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, ExternalLink, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { PitchInfo, PitchScenario } from "@/types/project";

// layout for stock pitches + investment memos. The words live in src/data/projects.ts (the `pitch` block).

interface PitchDetailProps {
  title: string;
  year: string;
  pitch: PitchInfo;
}

const UP = "#2E7D32"; // forest green: above today's price
const DOWN = "#E27D60"; // terra-cotta: below today's price

const money = (n: number) => `$${n.toFixed(2)}`;
// change vs. today's price, e.g. "+12.7%" or "−18.7%"
const change = (to: number, from: number) => {
  const pct = (to / from - 1) * 100;
  return `${pct >= 0 ? "+" : "−"}${Math.abs(pct).toFixed(1)}%`;
};

const RATING_STYLE: Record<PitchInfo["rating"], string> = {
  Buy: "bg-forest-green text-white",
  Hold: "bg-gray-700 text-white",
  Sell: "bg-[#B5482B] text-white",
  Short: "bg-[#B5482B] text-white",
};

// "nice" axis ticks (steps of 1, 2 or 5 × 10^n)
const niceTicks = (min: number, max: number, target = 4) => {
  const raw = (max - min) / target;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 5, 10].map((m) => m * mag).find((s) => raw <= s) ?? 10 * mag;
  const ticks: number[] = [];
  for (let t = Math.ceil(min / step) * step; t <= max; t += step) ticks.push(t);
  return ticks;
};

// bear / base / bull as bars growing out of today's price
const ScenarioChart: React.FC<{ price: number; scenarios: PitchScenario[] }> = ({ price, scenarios }) => {
  const [active, setActive] = useState<number | null>(null);

  const values = [price, ...scenarios.map((s) => s.price)];
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const pad = (hi - lo) * 0.08;
  const min = Math.max(0, lo - pad);
  const max = hi + pad;
  const x = (v: number) => ((v - min) / (max - min)) * 100;
  const ticks = niceTicks(min, max);

  return (
    <div>
      <div className="relative">
        {/* grid lines + today's price, behind the bars (track column only) */}
        <div className="absolute inset-y-0 left-16 right-28 sm:right-32 pointer-events-none" aria-hidden="true">
          {ticks.map((t) => (
            <span key={t} className="absolute inset-y-0 border-l border-gray-100" style={{ left: `${x(t)}%` }} />
          ))}
          <span className="absolute inset-y-0 border-l-2 border-dashed border-charcoal/50" style={{ left: `${x(price)}%` }} />
        </div>

        <ul className="relative space-y-5">
          {scenarios.map((s, i) => {
            const up = s.price >= price;
            const left = Math.min(x(s.price), x(price));
            const width = Math.abs(x(s.price) - x(price));
            const dim = active !== null && active !== i;
            return (
              <li
                key={s.name}
                tabIndex={0}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className={`outline-none transition-opacity ${dim ? "opacity-40" : ""}`}
                aria-label={`${s.name} case: ${money(s.price)}, ${change(s.price, price)} vs. today's ${money(price)}`}
              >
                <div className="flex items-center gap-0">
                  <div className="w-16 flex-shrink-0">
                    <p className="font-semibold text-charcoal leading-tight">{s.name}</p>
                    {s.probability !== undefined && (
                      <p className="text-xs text-charcoal/60">{Math.round(s.probability * 100)}% odds</p>
                    )}
                  </div>
                  {/* track: a taller hit area than the bar itself */}
                  <div className="relative flex-1 h-9">
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 h-5 ${up ? "rounded-r" : "rounded-l"}`}
                      style={{ left: `${left}%`, width: `${Math.max(width, 0.5)}%`, backgroundColor: up ? UP : DOWN }}
                    />
                    {active === i && (
                      <div
                        role="tooltip"
                        className="absolute bottom-full mb-1 z-10 w-56 max-w-[70vw] rounded-md bg-charcoal text-white text-xs p-3 shadow-lg"
                        style={{ left: `${Math.min(x(s.price), 60)}%` }}
                      >
                        <p className="font-semibold">
                          {s.name} case · {money(s.price)} ({change(s.price, price)})
                        </p>
                        <p className="mt-1 text-white/80">{s.note}</p>
                      </div>
                    )}
                  </div>
                  <div className="w-28 sm:w-32 flex-shrink-0 text-right pl-3">
                    <p className="font-semibold text-charcoal tabular-nums">{money(s.price)}</p>
                    <p className="text-xs text-charcoal/60 tabular-nums">{change(s.price, price)}</p>
                  </div>
                </div>
                {/* white behind the text so the grid / today line doesn't run through it */}
                <p className="mt-1 ml-16 sm:mr-32 text-xs text-charcoal/60">
                  <span className="bg-white box-decoration-clone py-0.5">{s.note}</span>
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      {/* axis */}
      <div className="relative ml-16 mr-28 sm:mr-32 mt-3 h-10 border-t border-gray-200 text-[11px] text-charcoal/50" aria-hidden="true">
        {ticks.map((t) => (
          <span key={t} className="absolute top-1 -translate-x-1/2 tabular-nums" style={{ left: `${x(t)}%` }}>
            ${t}
          </span>
        ))}
        <span
          className="absolute top-5 -translate-x-1/2 whitespace-nowrap font-medium text-charcoal/80"
          style={{ left: `${x(price)}%` }}
        >
          Today {money(price)}
        </span>
      </div>

      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-charcoal/70">
        <span className="inline-flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: UP }} /> Above today's price
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: DOWN }} /> Below today's price
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="w-4 border-t-2 border-dashed border-charcoal/50" /> Today's price
        </span>
      </div>
    </div>
  );
};

const DownloadButtons: React.FC<{ pitch: PitchInfo }> = ({ pitch }) => (
  <div className="flex flex-wrap gap-3">
    <a
      href={pitch.pdf}
      download={pitch.pdfName}
      className="inline-flex items-center gap-2 bg-forest-green text-white px-5 py-3 rounded-lg font-medium hover:bg-forest-green/90 transition-colors"
    >
      <Download size={18} />
      Download the {pitch.format} (PDF)
    </a>
    <a
      href={pitch.pdf}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 border border-forest-green text-forest-green px-5 py-3 rounded-lg font-medium hover:bg-forest-green/5 transition-colors"
    >
      <ExternalLink size={18} />
      Open in new tab
    </a>
  </div>
);

const PitchDetail: React.FC<PitchDetailProps> = ({ title, year, pitch }) => {
  const navigate = useNavigate();
  const upside = pitch.target >= pitch.price;

  const tiles = [
    { label: "Share price", value: money(pitch.price), sub: pitch.priceNote },
    { label: "Price target", value: money(pitch.target), sub: "Base case" },
    { label: upside ? "Upside to target" : "Downside to target", value: change(pitch.target, pitch.price) },
    ...pitch.stats,
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container px-6 md:px-12 py-24 space-y-8">
          <button onClick={() => navigate("/projects")} className="text-charcoal hover:text-forest-green">
            ← Back to projects
          </button>

          {/* header: rating + recommendation + download */}
          <div className="bg-white rounded-xl shadow p-8 md:p-10">
            <span className="text-xs uppercase tracking-widest text-forest-green">
              {pitch.kind} • {year}
            </span>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              <h1 className="text-3xl md:text-4xl font-bold text-charcoal">{title}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wider ${RATING_STYLE[pitch.rating]}`}>
                {pitch.rating}
              </span>
            </div>
            <p className="mt-2 text-charcoal/60">
              {pitch.company} ({pitch.ticker}) · {pitch.industry}
            </p>

            <div className="mt-6 border-l-4 border-forest-green pl-5">
              <p className="text-xs uppercase tracking-wide text-charcoal/60 mb-1">Recommendation</p>
              <p className="text-lg md:text-xl text-charcoal/90 leading-relaxed">{pitch.summary}</p>
            </div>

            <div className="mt-8 flex flex-col md:flex-row md:items-center gap-4 md:justify-between">
              <DownloadButtons pitch={pitch} />
              <span className="inline-flex items-center gap-2 text-sm text-charcoal/60">
                <FileText size={16} />
                {pitch.pages}-{pitch.format === "deck" ? "slide deck" : "page memo"}
              </span>
            </div>
          </div>

          {/* key numbers */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {tiles.map((t) => (
              <div key={t.label} className="bg-white rounded-xl shadow p-5">
                <p className="text-xs uppercase tracking-wide text-charcoal/60">{t.label}</p>
                <p className="text-xl font-bold text-forest-green mt-2 tabular-nums">{t.value}</p>
                {"sub" in t && t.sub && <p className="text-xs text-charcoal/50 mt-1">{t.sub}</p>}
              </div>
            ))}
          </div>

          {/* scenarios + variant view */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className={`bg-white rounded-xl shadow p-6 md:p-8 ${pitch.variantView ? "lg:col-span-3" : "lg:col-span-5"}`}>
              <h2 className="text-xl font-semibold text-forest-green">Bear, base and bull cases</h2>
              <p className="text-sm text-charcoal/60 mt-1 mb-6">Value per share in each case, against today's price.</p>
              <ScenarioChart price={pitch.price} scenarios={pitch.scenarios} />
            </div>

            {pitch.variantView && (
              <div className="bg-white rounded-xl shadow p-6 md:p-8 lg:col-span-2">
                <h2 className="text-xl font-semibold text-forest-green mb-4">Street view vs. our view</h2>
                <p className="text-charcoal/80 leading-relaxed">{pitch.variantView}</p>
              </div>
            )}
          </div>

          {/* thesis */}
          <div className="bg-white rounded-xl shadow p-6 md:p-8">
            <h2 className="text-xl font-semibold text-forest-green mb-6">Investment thesis</h2>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
              {pitch.thesis.map((t, i) => (
                <li key={t.title} className="flex gap-4">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-forest-green/10 text-forest-green text-sm font-semibold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-charcoal">{t.title}</h3>
                    <p className="mt-1 text-charcoal/75 text-sm leading-relaxed">{t.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* valuation + catalysts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow p-6 md:p-8">
              <h2 className="text-xl font-semibold text-forest-green mb-4">How the target was built</h2>
              <ul className="space-y-4">
                {pitch.valuation.map((v, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex-shrink-0 mt-2 w-2 h-2 rounded-full bg-forest-green" />
                    <p className="text-charcoal/80 text-sm leading-relaxed">{v}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow p-6 md:p-8">
              <h2 className="text-xl font-semibold text-forest-green mb-4">Catalysts to watch</h2>
              <ol className="relative border-l-2 border-forest-green/20 ml-1 space-y-5">
                {pitch.catalysts.map((c) => (
                  <li key={c.event} className="relative pl-5">
                    <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-forest-green" aria-hidden="true" />
                    <p className="text-xs uppercase tracking-wide text-charcoal/50">{c.when}</p>
                    <p className="font-semibold text-charcoal">{c.event}</p>
                    <p className="text-sm text-charcoal/70 mt-0.5">{c.detail}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* risks */}
          <div className="bg-white rounded-xl shadow p-6 md:p-8">
            <h2 className="text-xl font-semibold text-forest-green mb-4">Risks &amp; mitigants</h2>
            <div className="hidden md:grid grid-cols-[180px_1fr_1fr] gap-6 pb-2 border-b border-gray-200 text-xs uppercase tracking-wide text-charcoal/50">
              <span>Risk</span>
              <span>What could go wrong</span>
              <span>Mitigant</span>
            </div>
            <ul className="divide-y divide-gray-100">
              {pitch.risks.map((r) => (
                <li key={r.risk} className="py-4 grid grid-cols-1 md:grid-cols-[180px_1fr_1fr] gap-1 md:gap-6">
                  <p className="font-semibold text-charcoal">{r.risk}</p>
                  <p className="text-sm text-charcoal/75">
                    <span className="md:hidden text-charcoal/50">Risk: </span>
                    {r.detail}
                  </p>
                  <p className="text-sm text-charcoal/75">
                    <span className="md:hidden text-charcoal/50">Mitigant: </span>
                    {r.mitigant}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* closing cta */}
          <div className="bg-forest-green/5 border border-forest-green/20 rounded-xl p-8 text-center">
            <h2 className="text-xl font-semibold text-charcoal">Want the full model?</h2>
            <p className="text-charcoal/70 mt-2 mb-6">
              The full {pitch.format} has the DCF, the scenario models and the sensitivity table behind these numbers.
            </p>
            <div className="flex justify-center">
              <DownloadButtons pitch={pitch} />
            </div>
            <p className="mt-6 text-xs text-charcoal/50">Student research written for learning. Not investment advice.</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PitchDetail;
