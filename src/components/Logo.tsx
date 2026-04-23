import Image from "next/image";

// To swap to SVG: replace "logo.png" with "logo.svg" below. No other file needs to change.
const LOGO_SRC = "/logo.png";

interface LogoProps {
  /** "full" shows icon + text (default). "icon" shows only the image mark. */
  variant?: "full" | "icon";
  /** Height of the logo image in pixels */
  size?: number;
  className?: string;
  /** Apply mix-blend-mode: multiply to make the white PNG background invisible on light surfaces */
  blendOnLight?: boolean;
}

export default function Logo({
  variant = "full",
  size = 40,
  className = "",
  blendOnLight = false,
}: LogoProps) {
  const imgStyle: React.CSSProperties = {
    width: "auto",
    height: `${size}px`,
    objectFit: "contain",
    ...(blendOnLight ? { mixBlendMode: "multiply" } : {}),
  };

  if (variant === "icon") {
    return (
      <Image
        src={LOGO_SRC}
        alt="Rannia Proyectos Modulares"
        width={size}
        height={size}
        style={imgStyle}
        priority
        className={className}
      />
    );
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src={LOGO_SRC}
        alt="Rannia Proyectos Modulares"
        width={size}
        height={size}
        style={imgStyle}
        priority
      />
      <div className="flex flex-col leading-none">
        <span
          className="text-xl font-bold tracking-tight text-[#43473e]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Rannia
        </span>
        <span
          className="text-xs font-light tracking-wider text-[#9f804f] hidden sm:block"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Proyectos Modulares
        </span>
      </div>
    </div>
  );
}
