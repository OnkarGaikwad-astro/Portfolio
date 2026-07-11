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
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    title: "Onkar Gaikwad | AI & Software Engineer",
    description: "Portfolio of Onkar Gaikwad, an AI undergrad at IIT Gandhinagar building full-stack applications and intelligent models.",
    url: "https://onkar-portfolio.vercel.app", 
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
