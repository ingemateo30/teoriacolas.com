import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// URL base de tu sitio para URLs absolutas
const siteUrl = "https://teoriacolascom.vercel.app"; // Reemplaza con tu URL real

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Quequesim - Teoría de Colas y Simulación",
  description: "Todo acerca de la teoría de colas. Encontrarás simulación de la teoría, calculadora, graficadora de resultados y toda la teoría relacionada.",
  keywords: "teoría de colas, simulación, calculadora, graficadora, modelos de colas, sistemas de espera",

  // Configuración de robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // URL canónica
  canonical: siteUrl,

  // Open Graph para redes sociales (Facebook, LinkedIn, etc)
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: siteUrl,
    siteName: 'Quequesim',
    title: 'Quequesim - Teoría de Colas y Simulación',
    description: 'Todo acerca de la teoría de colas. Encontrarás simulación de la teoría, calculadora, graficadora de resultados y toda la teoría relacionada.',
    images: [
      {
        url: `${siteUrl}/logosim.png`,
        width: 1200,
        height: 630,
        alt: 'Quequesim - Teoría de Colas',
      }
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Quequesim - Teoría de Colas y Simulación',
    description: 'Todo acerca de la teoría de colas. Encontrarás simulación de la teoría, calculadora, graficadora de resultados y toda la teoría relacionada.',
    images: [`${siteUrl}/logosim.png`],
  },

  // Favicon y otros íconos
  icons: {
    icon: "/logosim.png",
    apple: "/logosim.png",
    shortcut: "/logosim.png",
  },

  // Información del autor
  authors: [{ name: 'Mateo Salazar ortiz', url: siteUrl }],

  // Verificación de propiedad del sitio para Google
  verification: {
    google: 'tu-código-de-verificación', // Reemplazar con tu código de Google Search Console
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" dir="ltr" className="scroll-smooth">
      <head>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7885333886424439"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Mateo Salazar Ortiz" />
        <meta name="copyright" content="© 2025 Quequesim" />
        <meta name="distribution" content="global" />
        <link rel="alternate" href="https://teoriacolascom.vercel.app" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="google-adsense-account" content="ca-pub-7885333886424439"></meta>
      </head>
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {children}
        <Analytics/>
        {/* Schema.org JSON-LD para SEO */}
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Quequesim - Teoría de Colas",
              "url": siteUrl,
              "description": "Todo acerca de la teoría de colas. Encontrarás simulación de la teoría, calculadora, graficadora de resultados y toda la teoría relacionada.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${siteUrl}/buscar?q={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </body>
      
    </html>

    
  );
}
