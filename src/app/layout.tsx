import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// -----------------------------------------------------
// CONFIGURACIÓN GLOBAL DE METADATA (SEO)
// Esto se aplica a TODAS las páginas de la web.
// -----------------------------------------------------

export const metadata: Metadata = {
  // 1. METADATOS BÁSICOS (PARA GOOGLE)
  title: {
    default:
      "AO Liquidation Warehouse | Electrodomésticos y Lotes de Liquidación", // Título principal que aparecerá en Google
    template: "%s | AO Liquidation Warehouse", // Usado para añadir el nombre del sitio a otros títulos
  },
  description:
    "Encuentra electrodomésticos, equipos de construcción y lotes de liquidación de alta calidad a precios inmejorables. ¡Ideal para reventa y proyectos!", // Descripción que aparece bajo el título en Google

  // 2. METADATOS DE REDES SOCIALES (OPEN GRAPH)
  openGraph: {
    title: "AO Liquidation Warehouse - Los mejores lotes de reventa",
    description:
      "Electrodomésticos, materiales de construcción y más en lotes de liquidación. Ahorra y maximiza tus ganancias.",
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
    "liquidación",
    "electrodomésticos",
    "lotes",
    "construcción",
    "reventa",
    "almacén",
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

// Importaciones de tus componentes Header y Footer (asegúrate de que estas rutas sean correctas)
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
