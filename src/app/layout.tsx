import type { Metadata } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Claims Intelligence — AI Fraud Detection",
  description:
    "AI-powered insurance claims intelligence dashboard with fraud detection, risk scoring, and signal analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${plexMono.variable}`}>
      <body className="antialiased" style={{ fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
