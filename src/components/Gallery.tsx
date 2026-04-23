"use client";

import { useState } from "react";
import Image from "next/image";
import RevealWrapper from "./RevealWrapper";
import ProjectModal from "./ProjectModal";

const projects = [
  {
    id: 1,
    title: "Proyecto 150",
    area: "150 m²",
    year: "2020 · Barbastro, Huesca",
    col: "col-span-1",
    row: "row-span-1",
    cover: "/Project%20145/project145_04.webp",
    images: [
      "/Project%20145/project145_01.webp",
      "/Project%20145/project145_02.webp",
      "/Project%20145/project145_03.webp",
      "/Project%20145/project145_04.webp",
      "/Project%20145/project145_05.webp",
      "/Project%20145/project145_06.webp",
      "/Project%20145/project145_07.webp",
      "/Project%20145/project145_08.webp",
      "/Project%20145/project_145_09.webp",
    ],
  },
  {
    id: 2,
    title: "Proyecto 160",
    area: "160 m²",
    year: "2013 · Denia, Alicante",
    col: "col-span-1 sm:col-span-2",
    row: "row-span-1",
    cover: "/Project%20160/project160_01.webp",
    images: [
      "/Project%20160/project160_01.webp",
      "/Project%20160/project160_02.webp",
      "/Project%20160/project160_03.webp",
      "/Project%20160/project160_04.webp",
      "/Project%20160/project160_05.webp",
      "/Project%20160/project160_06.webp",
      "/Project%20160/project160_07.webp",
      "/Project%20160/project_160_08.webp",
      "/Project%20160/project_160_09.webp",
      "/Project%20160/project_160_10.webp",
      "/Project%20160/project_160_11.webp",
    ],
  },
  {
    id: 3,
    title: "Proyecto 155",
    area: "155 m²",
    year: "2022 · Guadalajara",
    col: "col-span-1",
    row: "row-span-1",
    cover: "/Project%20170/project170_01.webp",
    images: [
      "/Project%20170/project170_01.webp",
      "/Project%20170/project170_02.webp",
      "/Project%20170/project170_03.webp",
      "/Project%20170/project170_04.webp",
      "/Project%20170/project170_05.webp",
      "/Project%20170/project170_06.webp",
      "/Project%20170/project170_07.webp",
      "/Project%20170/project170_08.webp",
      "/Project%20170/project170_09.webp",
      "/Project%20170/project170_10.webp",
      "/Project%20170/project170_11.webp",
      "/Project%20170/project170_12.webp",
      "/Project%20170/project170_13.webp",
      "/Project%20170/project170_14.webp",
      "/Project%20170/project170_15.webp",
      "/Project%20170/project170_16.webp",
      "/Project%20170/project170_17.webp",
    ],
  },
  {
    id: 4,
    title: "Proyecto 200",
    area: "200 m²",
    year: "2023 · San Vicente del Real, Toledo",
    col: "col-span-1",
    row: "row-span-1",
    cover: "/Project%20200/project200_03.webp",
    images: [
      "/Project%20200/project200_01.webp",
      "/Project%20200/project200_02.webp",
      "/Project%20200/project200_03.webp",
      "/Project%20200/project200_04.webp",
      "/Project%20200/project200_05.webp",
      "/Project%20200/project200_06.webp",
      "/Project%20200/project200_07.webp",
    ],
  },
  {
    id: 5,
    title: "Proyecto 220",
    area: "220 m²",
    year: "2020 · Finestrat, Alicante",
    col: "col-span-1 sm:col-span-2",
    row: "row-span-1",
    cover: "/Project%20220/project220_01.webp",
    images: [
      "/Project%20220/project220_01.webp",
      "/Project%20220/project220_02.webp",
      "/Project%20220/project220_03.webp",
      "/Project%20220/project220_04.webp",
      "/Project%20220/project220_05.webp",
      "/Project%20220/project220_06.webp",
      "/Project%20220/project220_07.webp",
      "/Project%20220/project220_08.webp",
      "/Project%20220/project220_09.webp",
      "/Project%20220/project220_10.webp",
      "/Project%20220/project220_11.webp",
      "/Project%20220/project220_12.webp",
      "/Project%20220/project220_13.webp",
      "/Project%20220/project220_14.webp",
      "/Project%20220/project220_15.webp",
      "/Project%20220/project220_16.webp",
      "/Project%20220/project220_17.webp",
      "/Project%20220/project220_18.webp",
      "/Project%20220/project220_19.webp",
      "/Project%20220/project_220_20.webp",
      "/Project%20220/project_220_21.webp",
      "/Project%20220/project_220_22.webp",
    ],
  },
  {
    id: 6,
    title: "Proyecto 330",
    area: "330 m²",
    year: "2012 · Aigües, Alicante",
    col: "col-span-1",
    row: "row-span-1",
    cover: "/Project%20330/project330_01.jpg",
    images: [
      "/Project%20330/project330_01.jpg",
      "/Project%20330/project330_02.jpg",
      "/Project%20330/project330_03.jpg",
      "/Project%20330/project330_04.jpg",
      "/Project%20330/project330_05.jpg",
      "/Project%20330/project330_06.jpg",
      "/Project%20330/project330_07.jpg",
      "/Project%20330/project330_08.jpg",
    ],
  },
];

export default function Gallery() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  return (
    <>
      <section
        id="galeria"
        className="py-20 lg:py-28 bg-[#f0ede0]"
        aria-label="Galería de proyectos"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <RevealWrapper>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#9f804f] mb-4">
                Proyectos realizados
              </p>
            </RevealWrapper>
            <RevealWrapper delay={1}>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#43473e] leading-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Casas que hablan por sí solas
              </h2>
            </RevealWrapper>
            <RevealWrapper delay={2}>
              <p className="mt-4 text-[#43473e]/70 text-lg">
                Más de 300 proyectos entregados en toda España. Cada uno, una
                historia de satisfacción y calidad.
              </p>
            </RevealWrapper>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {projects.map((project, i) => (
              <RevealWrapper
                key={project.id}
                delay={((i % 3) + 1) as 1 | 2 | 3}
              >
                <article
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-[#d4c9b0] cursor-pointer"
                  aria-label={project.title}
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Cover image */}
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-xs text-white/70 font-medium uppercase tracking-wide mb-1">
                      {project.area} · {project.year}
                    </p>
                    <h3
                      className="text-white font-semibold text-base"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {project.title}
                    </h3>
                  </div>
                </article>
              </RevealWrapper>
            ))}
          </div>

          {/* Pre-CTA text */}
          <RevealWrapper delay={1}>
            <p className="text-center text-xl text-[#43473e] leading-relaxed max-w-2xl mx-auto mt-14 mb-8">
              Cada casa es un proyecto único, diseñado desde cero contigo.
              Cuéntanos el tuyo y te preparamos un presupuesto sin compromiso.
            </p>
          </RevealWrapper>

          {/* CTA */}
          <RevealWrapper delay={2}>
            <div className="text-center">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 text-[#9f804f] font-semibold hover:text-[#8a6e42] transition-colors cursor-pointer group"
              >
                ¿Te interesa algún proyecto? Habla con nosotros
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
