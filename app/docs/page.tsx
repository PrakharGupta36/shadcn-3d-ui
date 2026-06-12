"use client";

import { motion } from "framer-motion";
import { ArrowRight, Box, Cpu, Layers } from "lucide-react";
import Link from "next/link";

const PRINCIPLES = [
  {
    Icon: Box,
    title: "Zero Package Lock-in",
    desc: "You own the source code. It lives in your repository, running on top of React Three Fiber primitives without hidden dependencies.",
    delay: 0.4,
  },
  {
    Icon: Layers,
    title: "Shadcn Native Layouts",
    desc: "Slots directly into standard components like Cards and Dialogs. No complex layout gymnastics or canvas resizing hacks required.",
    delay: 0.5,
  },
  {
    Icon: Cpu,
    title: "Hardware-Optimized",
    desc: "Built with performant responsive scaling, frame-loop lifecycle awareness, and built-in handling for WebGL context loss.",
    delay: 0.6,
  },
];

// Explicitly casting 'as const' fixes the ts(2322) type mismatch
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

export default function DocsPage() {
  return (
    <div className="relative space-y-20 max-w-4xl pb-16 selection:bg-white selection:text-black">
      {/* ── BACKGROUND ACCENT MASK ────────────────────────────────────────── */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-b from-zinc-800/10 to-transparent blur-[80px] pointer-events-none rounded-full" />

      {/* ── HERO HEADER SECTION ──────────────────────────────────────────── */}
      <header className="relative space-y-6 pt-6 border-b border-zinc-900 pb-12">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-900/40 border border-zinc-800/60 font-mono text-[10px] text-zinc-500 uppercase tracking-[0.2em]"
        >
          <span className="w-1 h-1 rounded-full bg-white/40 animate-pulse" />
          Docs / Architecture
        </motion.div>

        {/* Cinematic Title Reveal */}
        <div className="overflow-hidden py-1">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-5xl sm:text-7xl font-bold tracking-tighter text-white leading-none"
          >
            Introduction
          </motion.h1>
        </div>

        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="text-zinc-400 text-lg sm:text-xl font-light leading-relaxed max-w-2xl"
        >
          An unstyled, component-driven WebGL paradigm designed to match fluid
          layouts perfectly.
        </motion.p>
      </header>

      {/* ── PHILOSOPHY (EDITORIAL SPLIT) ─────────────────────────────────── */}
      <motion.section
        {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-baseline"
      >
        <div className="md:col-span-4">
          <h2 className="text-xs font-mono uppercase text-zinc-500 tracking-[0.15em] border-l-2 border-zinc-800 pl-3">
            Design Philosophy
          </h2>
        </div>
        <div className="md:col-span-8 space-y-6 text-zinc-400 font-light leading-relaxed text-base sm:text-lg">
          <p>
            Traditional web-focused 3D pipelines break interface flow. They
            demand rigid viewports, breaking native scroll behaviors or breaking
            natural cross-device flex containers.
          </p>
          <p className="text-zinc-200 font-normal">
            <span className="text-zinc-500 italic">
              3d-ui reverses this convention.
            </span>{" "}
            By declaring React Three Fiber execution frames inside standard grid
            items, layouts preserve perfect responsiveness while carrying rich,
            canvas-level depth data natively.
          </p>
        </div>
      </motion.section>

      {/* ── HIGH-END HORIZONTAL ASYMMETRIC BENTO SECTION ────────────────── */}
      <section className="space-y-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-mono uppercase text-zinc-600 tracking-[0.15em]"
        >
          Core Mechanics
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 auto-rows-fr">
          {/* Main Anchor Card - Spans 7 columns for asymmetrical visual balance */}
          {PRINCIPLES.slice(0, 1).map(({ Icon, title, desc, delay }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              className="group relative lg:col-span-7 p-8 border border-zinc-900 bg-gradient-to-br from-zinc-950 via-zinc-950 to-zinc-900/30 hover:border-zinc-800 rounded-2xl flex flex-col justify-between transition-all duration-500 ease-out"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-800/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="w-10 h-10 rounded-xl bg-zinc-900/80 border border-zinc-800/80 flex items-center justify-center text-zinc-400 group-hover:text-white transition-all duration-300 shadow-inner">
                <Icon
                  size={18}
                  className="transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="space-y-2 mt-12">
                <h3 className="text-lg font-medium text-zinc-200 group-hover:text-white transition-colors tracking-tight">
                  {title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed font-light max-w-xl">
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Right Column Grid Shell - Houses remaining blocks horizontally grouped */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {PRINCIPLES.slice(1).map(({ Icon, title, desc, delay }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
                className="group relative flex-1 p-6 border border-zinc-900 bg-zinc-950/40 hover:bg-zinc-900/10 hover:border-zinc-800 rounded-2xl flex gap-5 items-start transition-all duration-500 ease-out"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-800/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="w-9 h-9 rounded-xl bg-zinc-900/60 border border-zinc-800/60 flex items-center justify-center text-zinc-500 group-hover:text-white shrink-0 shadow-inner transition-colors">
                  <Icon size={15} />
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">
                    {title}
                  </h3>
                  <p className="text-xs text-zinc-500 group-hover:text-zinc-400 leading-relaxed font-light transition-colors">
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREMIUM NAV LINK CARD ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8 }}
        className="pt-4"
      >
        <Link
          href="/docs/installation"
          className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-8 border border-zinc-900 bg-zinc-950/40 hover:border-zinc-800/80 rounded-2xl overflow-hidden transition-all duration-500 ease-out shadow-lg"
        >
          {/* Subtle elegant radial background glow map */}
          <div className="absolute -bottom-1/2 -right-1/4 w-[300px] h-[200px] bg-zinc-800/[0.03] blur-[50px] rounded-full pointer-events-none group-hover:bg-zinc-700/[0.05] transition-colors duration-500" />

          <div className="space-y-2 relative z-10">
            <span className="text-[10px] font-mono tracking-[0.2em] text-zinc-600 uppercase block">
              Up Next
            </span>
            <p className="text-xl font-medium text-zinc-300 group-hover:text-white transition-colors tracking-tight">
              Runtime Installation Setup
            </p>
            <p className="text-xs text-zinc-500 font-light max-w-sm">
              Configure Next.js transpilation parameters and drop in core layout
              packages.
            </p>
          </div>

          <div className="mt-6 sm:mt-0 flex items-center gap-2 self-start sm:self-auto text-xs font-mono text-zinc-400 group-hover:text-white border border-zinc-900 bg-zinc-950 px-4 h-9 rounded-lg group-hover:border-zinc-700 shadow-md transition-all duration-300">
            <span>Proceed</span>
            <ArrowRight
              size={12}
              className="transform group-hover:translate-x-1 transition-transform duration-300"
            />
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
