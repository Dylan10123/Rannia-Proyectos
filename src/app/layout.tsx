import type { Metadata } from "next";
import { Manrope, Work_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-work-sans",
  display: "swap",
});

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ranniamodular.es";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Rannia Proyectos Modulares | Casas Modulares de Calidad",
  description:
    "Construimos casas modulares de alta calidad en España. Diseño moderno, construcción eficiente y personalización total. Solicita información sin compromiso.",
  keywords:
    "casas modulares España, construcción modular, viviendas prefabricadas, casas prefabricadas calidad, proyectos modulares",
  openGraph: {
    title: "Rannia Proyectos Modulares | Casas Modulares de Calidad",
    description:
      "Construimos casas modulares de alta calidad en España. Diseño moderno, construcción eficiente y personalización total.",
    type: "website",
    locale: "es_ES",
    siteName: "Rannia Proyectos Modulares",
    url: BASE_URL,
    images: [
      {
        url: "/hero-image.webp",
        width: 1200,
        height: 630,
        alt: "Rannia Proyectos Modulares — Casas modulares de calidad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rannia Proyectos Modulares | Casas Modulares de Calidad",
    description:
      "Construimos casas modulares de alta calidad en España. Diseño moderno y construcción eficiente.",
    images: ["/hero-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${manrope.variable} ${workSans.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
