import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projectCategories, projectsData } from "@/data/projects";
import type { ProjectCategory } from "@/types/project";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import GitHubStrip from "@/components/GitHubStrip";

const AllProjects = () => {
  const navigate = useNavigate();

  // the active filter lives in the url (?category=research) so it survives going into a project and back
  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get("category");
  const active = projectCategories.find((c) => c.id === param)?.id ?? null;

  const setFilter = (id: ProjectCategory | null) =>
    setSearchParams(id ? { category: id } : {}, { replace: true });

  // keep each project's position in projectsData, since /project/:id links use it
  const visible = projectsData
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => !active || project.categories.includes(active));

  const filters = [
    { id: null, label: "All", count: projectsData.length },
    ...projectCategories.map((c) => ({
      ...c,
      count: projectsData.filter((p) => p.categories.includes(c.id)).length,
    })),
  ];

  useEffect(() => {
    document.title = "All Projects - Matthew Chen";
  }, []);

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen bg-background pt-24 pb-16 overflow-hidden">

        {/* background pattern */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="rings" x="0" y="0" width="240" height="240" patternUnits="userSpaceOnUse">
                <circle cx="120" cy="120" r="40" fill="none" stroke="#1b1b1b" strokeWidth="0.5" />
                <circle cx="120" cy="120" r="80" fill="none" stroke="#1b1b1b" strokeWidth="0.5" />
                <circle cx="120" cy="120" r="120" fill="none" stroke="#1b1b1b" strokeWidth="0.5" />
              </pattern>
              <pattern id="waves" x="0" y="0" width="260" height="120" patternUnits="userSpaceOnUse">
                <path d="M0 60 Q60 0 130 60 T260 60" fill="none" stroke="#1b1b1b" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#rings)" />
            <rect width="100%" height="100%" fill="url(#waves)" />
          </svg>
        </div>

        {/* leaf decorations */}
        <div className="absolute top-14 left-10 opacity-10">
          <svg width="65" height="65" viewBox="0 0 60 60" fill="none">
            <path d="M30 5C35 15 45 25 30 55C15 25 25 15 30 5Z" fill="#1b1b1b" />
            <path d="M30 5V55" stroke="#1b1b1b" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="absolute bottom-20 right-10 opacity-10 rotate-45">
          <svg width="50" height="50" viewBox="0 0 60 60" fill="none">
            <path d="M30 5C35 15 45 25 30 55C15 25 25 15 30 5Z" fill="#1b1b1b" />
          </svg>
        </div>

        {/* page content */}
        <div className="container px-6 md:px-12 relative z-10">

          {/* title */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              ALL PROJECTS
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore my complete portfolio of projects spanning architecture, finance, and 3D design.
            </p>
          </div>

          {/* category filter */}
          <div role="group" aria-label="Filter projects by category" className="flex flex-wrap justify-center gap-2 mb-12">
            {filters.map((f) => {
              const selected = active === f.id;
              return (
                <button
                  key={f.label}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setFilter(f.id)}
                  className={`px-4 py-2 rounded-full border text-sm uppercase tracking-wide transition-colors ${
                    selected
                      ? "bg-gray-900 border-gray-900 text-white"
                      : "bg-white/70 border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900"
                  }`}
                >
                  {f.label}
                  <span className={`ml-2 text-xs ${selected ? "text-white/70" : "text-gray-400"}`}>{f.count}</span>
                </button>
              );
            })}
          </div>

          {visible.length === 0 && (
            <p className="text-center text-muted-foreground py-16">No projects in this category yet.</p>
          )}

          {/* projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visible.map(({ project, index }) => (
              <div
                key={index}
                onClick={() => navigate(`/project/${index}`)}
                className="group cursor-pointer"
              >
                <AspectRatio ratio={4 / 3} className="overflow-hidden rounded-lg mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </AspectRatio>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{project.year}</span>
                    {project.location && (
                      <>
                        <span>•</span>
                        <span>{project.location}</span>
                      </>
                    )}
                  </div>

                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* pinned github repos, live; only with All or Coding selected */}
          {(!active || active === "coding") && <GitHubStrip />}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AllProjects;
