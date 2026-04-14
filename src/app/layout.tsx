import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "VibeFlow - Mood Music Discovery",
  description: "Find the perfect soundtrack for every moment and mood.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark h-full">
        <body
          className={`${outfit.variable} font-sans min-h-full bg-[#030014] text-white antialiased selection:bg-purple-500/30`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
