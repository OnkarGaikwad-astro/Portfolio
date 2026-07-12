import type { Metadata } from "next";
import { Josefin_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import AppLayout from "@/components/AppLayout";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Onkar Gaikwad | AI & Software Engineer",
  description: "Portfolio of Onkar Gaikwad, an AI undergrad at IIT Gandhinagar building full-stack applications and intelligent models.",
  keywords: [
    "Onkar Gaikwad",
    "Onkar",
    "Gaikwad",
    "Onkar Chandrakant Gaikwad",
    "Portfolio",
    "AI",
    "Software Engineer",
    "Full-stack Developer",
    "IIT Gandhinagar",
    "Machine Learning",
    "React",
    "Next.js"
  ],
  authors: [{ name: "Onkar Gaikwad", url: "https://onkar-portfolio.vercel.app" }],
  creator: "Onkar Gaikwad",
  icons: {
    icon: "/icon.png",
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE_HERE",
  },
  openGraph: {
    title: "Onkar Gaikwad | AI & Software Engineer",
    description: "Portfolio of Onkar Gaikwad, an AI undergrad at IIT Gandhinagar building full-stack applications and intelligent models.",
    url: "https://portfolio.astronkar.in", 
    siteName: "Onkar Gaikwad Portfolio",
    type: "website",
  }
};

import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${josefinSans.variable} ${playfairDisplay.variable} antialiased`}
    >
      <body>
        <AppLayout>{children}</AppLayout>
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}
