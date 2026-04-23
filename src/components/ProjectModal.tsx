"use client";

import { useEffect } from "react";
import ProjectGalleryGrid from "./ProjectGalleryGrid";

interface Project {
  id: number;
  title: string;
  area: string;
  year: string;
  images: string[];
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
      aria-modal="true"
      role="dialog"
      aria-label={project.title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#43473e]/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div className="relative z-10 w-full h-[90vh] sm:w-[70vw] sm:h-[70vh] bg-[#fdfcf5] rounded-2xl shadow-2xl border border-[#d4c9b0]/60 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between px-4 py-4 sm:px-8 sm:py-6 border-b border-[#d4c9b0]/50">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#9f804f] mb-1">
              {project.area} · {project.year}
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#43473e]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="ml-6 mt-1 flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[#43473e]/50 hover:text-[#43473e] hover:bg-[#d4c9b0]/40 transition-colors duration-200"
            aria-label="Cerrar"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div
          className="flex-1 overflow-y-auto px-4 py-4 sm:px-8 sm:py-8"
          style={{ WebkitOverflowScrolling: "touch", willChange: "transform" }}
        >
          <ProjectGalleryGrid images={project.images} projectName={project.title} />
        </div>
      </div>
    </div>
  );
}
