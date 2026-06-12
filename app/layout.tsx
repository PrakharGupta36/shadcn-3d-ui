import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Elegant geometric sans-serif for headers and core layouts
const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Highly polished mono typeface for code, tags, and technical specs
const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "3d-ui — Spatial Primitives for your Design System",
  description:
    "Copy and paste high-performance WebGL layout components native to shadcn/ui.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${monoFont.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full font-sans bg-zinc-950 text-zinc-100 flex flex-col selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
