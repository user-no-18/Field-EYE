import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trace Lite | Premium Field Management Platform",
  description: "Enterprise-grade field workforce management. Real-time tracking, budget analytics, and team management all in one intuitive platform.",
  keywords: "field management, worker tracking, route optimization, budget analytics",
  authors: [{ name: "Trace Lite" }],
  openGraph: {
    title: "Trace Lite | Premium Field Management Platform",
    description: "Manage your field teams with real-time tracking and analytics",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#10b981",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${plusJakarta.variable}`}>
        {children}
      </body>
    </html>
  );
}
