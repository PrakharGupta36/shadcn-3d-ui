"use client";

import { Card3DContent } from "@/components/3d-ui/card-3d";
import { motion } from "framer-motion";
import { Activity, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const HERO_DEMOS = [
  {
    Geometry: () => <torusKnotGeometry args={[0.5, 0.16, 140, 16]} />,
    label: "TorusKnot.gl",
    Icon: Activity,
    span: "sm:col-span-2",
    ratio: "video" as const,
  },
];

// Cinematic animation curves
const easeQuint = [0.16, 1, 0.3, 1] as const;

const maskReveal = {
  initial: { y: "110%" },
  animate: { y: 0 },
};

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden select-none selection:bg-white selection:text-black font-sans">
      {/* ── AMBIENT CINEMATIC CANVAS BACKDROP ────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015] mix-blend-overlay transition-opacity duration-1000"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Subtle chromatic aberration aura */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-zinc-800/[0.07] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-zinc-900/[0.05] blur-[120px] pointer-events-none" />

      {/* ── MAIN CONTENT CANVAS CONTAINER ────────────────────────────────── */}
      <main className="relative max-w-7xl mx-auto px-6 lg:px-12 min-h-screen flex flex-col justify-center pt-28 pb-20 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* LEFT COLUMN: EDITORIAL HERO TEXT ENGINE */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-10">
            {/* Context Badge Pin */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: easeQuint }}
              className="inline-flex items-center gap-2.5 bg-zinc-900/30 border border-zinc-800/60 backdrop-blur-md rounded-full pl-2.5 pr-4 py-1 text-[11px] text-zinc-400 font-mono tracking-wider"
            >
              <div className="w-5 h-5 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <Sparkles size={10} className="text-zinc-400 animate-pulse" />
              </div>
              <span>SHADCN DEPLOYABLE COMPATIBLE</span>
            </motion.div>

            {/* Split Mask Text Reveal Layout */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl font-bold tracking-tighter text-white leading-[0.95] flex flex-col">
                <div className="overflow-hidden py-1">
                  <motion.span
                    variants={maskReveal}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.9, ease: easeQuint }}
                    className="block"
                  >
                    3D UI components
                  </motion.span>
                </div>
                <div className="overflow-hidden py-1">
                  <motion.span
                    variants={maskReveal}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.9, delay: 0.08, ease: easeQuint }}
                    className="text-zinc-500 font-light italic block"
                  >
                    built for layout flow.
                  </motion.span>
                </div>
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: easeQuint }}
              className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-lg font-light"
            >
              React Three Fiber primitives tailored seamlessly into your design
              structure. No locked npm packages or black-box wrappers. Copy,
              paste, and compile natively.
            </motion.p>

            {/* Premium Call to Action Array */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: easeQuint }}
              className="flex items-center gap-4 flex-wrap w-full sm:w-auto"
            >
              <Link
                href="/docs"
                className="group flex items-center gap-2.5 bg-zinc-100 text-zinc-950 hover:bg-white text-xs font-mono uppercase tracking-wider px-6 h-12 rounded-xl transition-all duration-300 shadow-md active:scale-98 cursor-pointer"
              >
                <span>Docs</span>
                <ArrowRight
                  size={14}
                  className="transform group-hover:translate-x-1 transition-transform duration-300"
                />
              </Link>
              <Link
                href="/docs/components/card-3d"
                className="flex items-center gap-2 border border-zinc-900 bg-zinc-950/40 hover:bg-zinc-900/40 text-zinc-400 hover:text-white text-xs font-mono uppercase tracking-wider px-6 h-12 rounded-xl transition-all duration-300 cursor-pointer"
              >
                Components
              </Link>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: FLOATING RECONCILED BENTO COMPONENT STREAM */}
          <div className="lg:col-span-6 w-full flex justify-center lg:justify-end lg:pl-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl auto-rows-max">
              {HERO_DEMOS.map(
                ({ Geometry, label, Icon, span, ratio }, index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 1,
                      delay: 0.2 + index * 0.12,
                      ease: easeQuint,
                    }}
                    className={`${span} group relative border border-zinc-900/80 bg-zinc-950/20 hover:bg-zinc-900/10 hover:border-zinc-800 rounded-2xl overflow-hidden p-3 transition-all duration-500 ease-out`}
                  >
                    {/* Subtle top edge border illumination highlight strip */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-800/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* WebGL Canvas Content Target Frame */}
                    <div className="rounded-xl overflow-hidden bg-zinc-950/80 border border-zinc-900/60 group-hover:border-zinc-800/40 transition-colors duration-500 will-change-transform">
                      <Card3DContent aspectRatio={ratio}>
                        <mesh rotation={[0.35, 0.35, 0]}>
                          <Geometry />
                          <meshNormalMaterial />
                        </mesh>
                      </Card3DContent>
                    </div>

                    {/* Label Meta-Strip */}
                    <div className="flex items-center justify-between mt-3 px-1.5 text-zinc-600 group-hover:text-zinc-400 transition-colors duration-300">
                      <span className="text-[10px] font-mono tracking-wider uppercase">
                        {label}
                      </span>
                      <Icon
                        size={12}
                        className="opacity-30 group-hover:opacity-100 transform group-hover:rotate-12 transition-all duration-300"
                      />
                    </div>
                  </motion.div>
                ),
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
