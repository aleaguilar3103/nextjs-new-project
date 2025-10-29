import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// -----------------------------------------------------
// CONFIGURACIÓN GLOBAL DE METADATA (SEO)
// Basado en el contenido de la web y el App Router de Next.js
// -----------------------------------------------------

export const metadata: Metadata = {
  // 1. METADATOS BÁSICOS (PARA GOOGLE)
  title: {
    // Título principal basado en el banner. Minimizando capitalización para mejor SEO.
    default:
      "Su Proveedor Oficial de Mercancía de Liquidación Premium en Costa Rica",
    template: "%s | AO Liquidation Warehouse",
  },

  // Descripción optimizada usando el texto de Misión, Visión y Principios.
  description:
    "Accede a productos de liquidación de calidad y precios inmejorables. Brindamos programas flexibles, transparencia y acompañamiento. Con más de 15 años de experiencia, ofrecemos lotes, pallets y contenedores 100% vírgenes.",

  // 2. METADATOS DE REDES SOCIALES (OPEN GRAPH)
  openGraph: {
    title:
      "AO Liquidation Warehouse - Lotes, Pallets y Contenedores para Reventa",
    description:
      "Establezca una relación sólida con su fuente directa de pallets y contenedores de grandes minoristas de EE. UU. ¡Transparencia, Variedad y Precios Justos!",
    url: "https://www.aoliquidationwarehouse.com/", // Reemplaza con tu dominio final
    siteName: "AO Liquidation Warehouse",
    images: [
      {
        url: "https://storage.googleapis.com/msgsndr/pvSYCYQR9RHbeg9BXuIL/media/6902623210e460f861271016.png", // URL de tu imagen
        width: 1200,
        height: 630,
        alt: "Lotes de Liquidación de Electrodomésticos y Construcción",
      },
    ],
    locale: "es_ES",
    type: "website",
  },

  // 3. METADATOS ADICIONALES
  keywords: [
    "liquidación Costa Rica",
    "pallets de liquidación",
    "contenedores de liquidación",
    "lotes para reventa",
    "mercadotería saldos",
    "electrodomésticos liquidación",
  ],
  authors: [{ name: "AO Liquidation Warehouse" }],
  metadataBase: new URL("https://www.aoliquidationwarehouse.com/"),

  // 4. TWITTER CARDS (PARA TWITTER/X)
  twitter: {
    card: "summary_large_image",
    title: "AO Liquidation Warehouse",
    description:
      "Encuentra las mejores ofertas en lotes de liquidación para tu negocio.",
    images: [
      "https://storage.googleapis.com/msgsndr/pvSYCYQR9RHbeg9BXuIL/media/6902623210e460f861271016.png",
    ],
  },
};

// -----------------------------------------------------
// CÓDIGO DE COMPONENTE DE LAYOUT ORIGINAL
// -----------------------------------------------------

// Importaciones de tus componentes Header y Footer
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
