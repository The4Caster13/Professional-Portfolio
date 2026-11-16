import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import {
  aboutClosing,
  aboutIntro,
  chapters,
  hobbies,
  languages,
  resumeDownloadName,
  resumeUrl,
  type EntryKind,
  type Phase,
  type TimelineEntry,
} from "@/data/about";
import { projectsData } from "@/data/projects";

// the words live in src/data/about.ts; this file is only layout

const PHASE_COLOR: Record<Phase, string> = {
  architecture: "#E27D60", // terra-cotta
  coding: "#4A9FC4", // deeper sky blue
  growth: "#2E7D32", // forest green
};

const KIND_LABEL: Record<EntryKind, string> = {
  project: "Project",
  milestone: "Milestone",
  education: "Education",
  leadership: "Leadership",
  work: "Work",
  volunteering: "Volunteering",
};

// these read as "along the way": hollow grey dot, quieter text
const ALONG_THE_WAY: EntryKind[] = ["leadership", "work", "volunteering"];

// link entries to projects by title, so reordering projects.ts doesn't break them
const projectHref = (title?: string) => {
  if (!title) return null;
  const i = projectsData.findIndex((p) => p.title === title);
  if (i < 0) {
    console.warn(`about.ts: no project titled "${title}" in src/data/projects.ts`);
    return null;
  }
  return `/project/${i}`;
};

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const Entry: React.FC<{ entry: TimelineEntry; color: string }> = ({ entry, color }) => {
  const side = ALONG_THE_WAY.includes(entry.kind);
  const href = projectHref(entry.project);

  return (
    <li className="reveal from-bottom relative pl-8 md:pl-10 pb-10 last:pb-0">
      {/* dot sits on the timeline line */}
      <span
        aria-hidden="true"
        className="absolute top-1.5 w-3.5 h-3.5 -translate-x-1/2 rounded-full border-2"
        style={{
          left: -1,
          borderColor: side ? "#9ca3af" : color,
          backgroundColor: side ? "#ffffff" : color,
        }}
      />
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-wider">
        <span className="text-gray-500">{entry.date}</span>
        <span className={side ? "text-gray-400" : "font-semibold"} style={side ? undefined : { color }}>
          {KIND_LABEL[entry.kind]}
        </span>
      </div>
      <h3 className={`mt-1 font-semibold ${side ? "text-base text-gray-800" : "text-lg md:text-xl text-gray-900"}`}>
        {entry.title}
      </h3>
      {entry.org && <p className="text-sm text-gray-500">{entry.org}</p>}
      <p className={`mt-2 leading-relaxed ${side ? "text-sm text-gray-500" : "text-gray-600"}`}>{entry.text}</p>

      {(href || entry.link) && (
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm font-medium">
          {href && (
            <Link to={href} className="hover:underline" style={{ color }}>
              View project →
            </Link>
          )}
          {entry.link && (
            <a href={entry.link.url} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color }}>
              {entry.link.label} ↗
            </a>
          )}
        </div>
      )}
    </li>
  );
};

const AboutPage = () => {
  useEffect(() => {
    document.title = "About - Matthew Chen";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ScrollReveal />
      <Navbar />

      <main className="relative min-h-screen bg-background pt-28 md:pt-32 pb-16">
        {/* background pattern (same as All Projects) */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none" aria-hidden="true">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="about-rings" x="0" y="0" width="240" height="240" patternUnits="userSpaceOnUse">
                <circle cx="120" cy="120" r="40" fill="none" stroke="#1b1b1b" strokeWidth="0.5" />
                <circle cx="120" cy="120" r="80" fill="none" stroke="#1b1b1b" strokeWidth="0.5" />
                <circle cx="120" cy="120" r="120" fill="none" stroke="#1b1b1b" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#about-rings)" />
          </svg>
        </div>

        <div className="container px-6 md:px-12 relative z-10">
          {/* intro */}
          <header className="max-w-5xl reveal from-bottom">
            <p className="text-xs uppercase tracking-[0.25em] text-gray-500">{aboutIntro.eyebrow}</p>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight">{aboutIntro.title}</h1>
            <div className="w-24 h-1 bg-gray-900 mt-6" />
            <p className="mt-8 max-w-3xl text-lg md:text-xl text-gray-600 leading-relaxed">{aboutIntro.lede}</p>
          </header>

          {/* overview of the three steps */}
          <nav aria-label="Chapters" className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 reveal from-bottom">
            {chapters.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(c.id);
                }}
                className="group block bg-white/80 border border-gray-200 border-t-4 rounded-lg p-5 hover:shadow-md transition"
                style={{ borderTopColor: PHASE_COLOR[c.id] }}
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-2xl font-bold" style={{ color: PHASE_COLOR[c.id] }}>
                    {c.number}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-gray-400">{c.years}</span>
                </div>
                <h2 className="mt-2 text-xl font-bold group-hover:underline">{c.title}</h2>
                <p className="mt-1 text-sm text-gray-600">{c.summary}</p>
              </a>
            ))}
          </nav>

          {/* the timeline, one section per chapter */}
          <div className="mt-16">
            {chapters.map((c) => {
              const color = PHASE_COLOR[c.id];
              return (
                <section
                  key={c.id}
                  id={c.id}
                  className="scroll-mt-28 py-14 md:py-20 border-t border-gray-200 grid grid-cols-1 md:grid-cols-12 gap-10"
                >
                  {/* chapter + why (sticks while the entries scroll on desktop) */}
                  <div className="md:col-span-5 md:sticky md:top-28 self-start reveal from-bottom">
                    <div className="font-display text-6xl md:text-7xl font-bold leading-none" style={{ color }}>
                      {c.number}
                    </div>
                    <h2 className="mt-3 text-3xl md:text-4xl font-bold">{c.title}</h2>
                    <p className="mt-2 text-sm uppercase tracking-wider text-gray-500">{c.years}</p>
                    <div className="mt-6 border-l-4 pl-5" style={{ borderColor: color }}>
                      <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Why this step</p>
                      <p className="text-gray-700 leading-relaxed">{c.why}</p>
                    </div>
                  </div>

                  <div className="md:col-span-7">
                    <ol className="relative border-l-2 ml-2" style={{ borderColor: `${color}55` }}>
                      {c.entries.map((entry) => (
                        <Entry key={`${entry.date}-${entry.title}`} entry={entry} color={color} />
                      ))}
                    </ol>
                  </div>
                </section>
              );
            })}
          </div>

          {/* closing */}
          <section className="border-t border-gray-200 pt-16 md:pt-20 max-w-3xl mx-auto text-center reveal from-bottom">
            <h2 className="text-3xl md:text-4xl font-bold">{aboutClosing.title}</h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">{aboutClosing.text}</p>
          </section>

          {/* outside of work */}
          <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 reveal from-bottom">
            <div className="bg-white/80 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold">Languages</h3>
              <ul className="mt-4 space-y-2">
                {languages.map((l) => (
                  <li key={l.name} className="flex justify-between text-gray-700">
                    <span>{l.name}</span>
                    <span className="text-gray-400 text-sm">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/80 border border-gray-200 rounded-lg p-6 md:col-span-2">
              <h3 className="text-lg font-bold">Outside of work</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {hobbies.map((h) => (
                  <li key={h} className="px-3 py-1 rounded-full border border-gray-300 text-sm text-gray-700">
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* next steps */}
          <div className="mt-16 flex flex-wrap justify-center gap-4 reveal from-bottom">
            <Link
              to="/projects"
              className="bg-gray-900 text-white px-8 py-3 text-sm uppercase tracking-wider font-medium hover:bg-gray-700 transition-colors"
            >
              See my projects
            </Link>
            {resumeUrl && (
              <a
                href={resumeUrl}
                download={resumeDownloadName}
                className="inline-flex items-center gap-2 border border-gray-900 px-8 py-3 text-sm uppercase tracking-wider font-medium hover:bg-gray-900 hover:text-white transition-colors"
              >
                <Download size={16} />
                Download resume
              </a>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AboutPage;
