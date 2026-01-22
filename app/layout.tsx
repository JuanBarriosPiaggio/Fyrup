import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: "Fyrup | Leading Provider of Passive Fire Protection & Fire Risk Assessments",
  description: "With over 15 years of experience, Fyrup delivers exceptional fire protection services including fire risk assessments, fire stopping, fire doors, and fire dampers across London.",
  keywords: "fire protection, fire risk assessment, fire stopping, fire doors, fire dampers, London",
  icons: {
    icon: '/logo.png',
  },
  openGraph: {
    title: "Fyrup | Leading Provider of Passive Fire Protection",
    description: "Expert fire protection services in London with over 15 years of experience",
    type: "website",
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
