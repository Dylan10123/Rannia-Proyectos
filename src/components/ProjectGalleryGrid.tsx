import Image from "next/image";

interface ProjectGalleryGridProps {
  images: string[];
  projectName: string;
}

export default function ProjectGalleryGrid({ images, projectName }: ProjectGalleryGridProps) {
  return (
    <div className="columns-1 sm:columns-3 gap-3">
      {images.map((src, i) => (
        <div key={src} className="break-inside-avoid mb-3">
          <Image
            src={src}
            alt={`${projectName} — imagen ${i + 1}`}
            width={0}
            height={0}
            sizes="(max-width: 640px) 90vw, 576px"
            className="w-full h-auto rounded-xl"
          />
        </div>
      ))}
    </div>
  );
}
