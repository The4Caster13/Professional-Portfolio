import React from "react";
import { Link } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ExternalLink, Github } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { pinnedRepos, projectsData } from "@/data/projects";
import { GITHUB_URL, fetchRepo, languageColor } from "@/lib/github";

// repo name -> its case-study page, for pinned repos that also have a project on this site
const caseStudyLink = new Map(
  projectsData.flatMap((p, i) => (p.code ? [[p.code.repo, `/project/${i}`] as const] : []))
);

// "More on GitHub": the pinned repos listed in src/data/projects.ts, with live details
const GitHubStrip = () => {
  const results = useQueries({
    // same query key as the case-study pages, so a repo already loaded there isn't fetched twice
    queries: pinnedRepos.map((name) => ({
      queryKey: ["gh-repo", name],
      queryFn: () => fetchRepo(name),
      staleTime: 60 * 60 * 1000,
      retry: false,
    })),
  });

  const isLoading = results.some((r) => r.isLoading);
  const repos = results.flatMap((r) => (r.data ? [r.data] : []));

  // github unreachable (or every repo missing): leave the section out
  if (!isLoading && repos.length === 0) return null;

  return (
    <section className="mt-20">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">More on GitHub</h2>
          <div className="w-16 h-1 bg-gray-900 mt-3" />
        </div>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium uppercase tracking-wide flex items-center gap-2 hover:text-gray-600"
        >
          <Github size={16} />
          View all on GitHub →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? pinnedRepos.map((name) => <Skeleton key={name} className="h-36 rounded-lg" />)
          : repos.map((r) => {
              const caseStudy = caseStudyLink.get(r.name);
              return (
                <div
                  key={r.name}
                  className="relative bg-white/80 border border-gray-200 rounded-lg p-5 hover:shadow-md hover:border-gray-300 transition"
                >
                  <a
                    href={r.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-lg hover:text-forest-green after:absolute after:inset-0"
                  >
                    {r.name}
                  </a>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {r.description || "No description yet"}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-4 text-xs text-muted-foreground">
                    {r.language && (
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: languageColor(r.language) }} />
                        {r.language}
                      </span>
                    )}
                    <span>updated {formatDistanceToNow(new Date(r.pushed_at), { addSuffix: true })}</span>
                    {r.homepage && (
                      <a
                        href={r.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 inline-flex items-center gap-1 text-forest-green hover:underline"
                      >
                        <ExternalLink size={12} />
                        {r.homepage.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      </a>
                    )}
                    {caseStudy && (
                      <Link to={caseStudy} className="relative z-10 text-forest-green font-medium hover:underline">
                        Case study →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
      </div>
    </section>
  );
};

export default GitHubStrip;
