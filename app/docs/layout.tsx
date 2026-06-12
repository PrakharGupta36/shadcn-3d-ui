"use client";

import Sidebar from "@/components/navigation/sidebar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-white selection:text-black">
      {/* Primary Structural Wrapper - Expanded to max-w-7xl and relaxed to py-20 for better spatial flow */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 flex flex-col lg:flex-row gap-16 items-start">
        {/* Left Column Structural Shell Container */}
        <div className="w-full lg:w-56 shrink-0 flex flex-col gap-8 lg:sticky lg:top-7 self-start">
          {/* Minimalist Awwwards-style Back navigation button action */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-200 uppercase tracking-widest transition-colors duration-300"
            >
              <ArrowLeft
                size={12}
                className="transform group-hover:-translate-x-1 transition-transform duration-300 ease-out text-zinc-600 group-hover:text-zinc-300"
              />
              <span>Back Home</span>
            </Link>
          </motion.div>

          {/* Core Navigation Sidebar Component */}
          <Sidebar />
        </div>

        {/* Right-hand Main Content viewport area */}
        <main className="flex-1 min-w-0 w-full  dynamic-content-entry">
          {children}
        </main>
      </div>
    </div>
  );
}
