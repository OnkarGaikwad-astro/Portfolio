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
  title: "Onkar | Premium Portfolio",
  description: "Software Engineer & AI Developer",
};

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
      </body>
    </html>
  );
}
