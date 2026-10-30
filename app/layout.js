import "./globals.css";
import { Inter, Anton, Space_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESC, pageMeta } from "@/lib/seo";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400" });
const spaceMono = Space_Mono({ variable: "--font-space-mono", subsets: ["latin"], weight: ["400", "700"] });

const __jsonld = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": `${SITE_URL}/#website`, "url": SITE_URL, "name": SITE_TITLE, "description": SITE_DESC, "inLanguage": "en", "author": { "@id": `${SITE_URL}/#person` } },
    { "@type": "Person", "@id": `${SITE_URL}/#person`, "name": "Rex", "jobTitle": "Graphic Designer & Front-end Developer", "description": "A fictional persona for this portfolio template.", "url": SITE_URL },
  ],
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s — ${SITE_NAME}` },
  applicationName: SITE_NAME,
  keywords: ["graphic designer", "front-end developer", "neo-brutalism", "portfolio", "bold design"],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  ...pageMeta({ description: SITE_DESC, path: '/' }),
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${anton.variable} ${spaceMono.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <a href="#konten" className="skip-link">Skip to content</a>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
          <ThemeToggle />
        </ThemeProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__jsonld) }} />
        <aside aria-label="About this demo site" style={{ display: 'block', margin: 0, padding: '8px 76px', background: '#0f1b33', color: '#dfe6f3', font: '400 13px/1.5 system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', textAlign: 'center' }}>
          A demo site by PintuWeb — names and content are fictional.{' '}
          <a href="https://www.pintuweb.id/en/contact?demo=rex" style={{ color: '#ffffff', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px', display: 'inline-block', padding: '12px 4px', margin: '-8px 0' }}>Get a site like this →</a>
        </aside>
        </body>
    </html>
  );
}
