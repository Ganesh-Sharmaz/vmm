import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/header/Header";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vishal Mega Mart | India's Toughest Security Gaurd Exam",
  description: "Think JEE and UPSC are tough? Welcome to Mission Vishal Mega Mart — the ultimate satirical challenge where lakhs compete for the most elite role: Security Guard at Vishal Mega Mart. Take mock tests, view AIR ranks, and join the coaching revolution.",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="vEgABVsm4TQ0XVMHk44XQKc0UxIXzyMTesJdQwcqyFI"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
