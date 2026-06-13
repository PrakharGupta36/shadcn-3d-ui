"use client";

import { Card3DContent } from "@/components/3d-ui/card-3d";
import { motion } from "framer-motion";
import { Activity, ArrowUpRight, Cpu } from "lucide-react";
import Link from "next/link";

const HERO_DEMOS = [
  {
    Geometry: () => <torusKnotGeometry args={[0.5, 0.16, 140, 16]} />,
    label: "TorusKnot.gl",
    meta: "FBO Vertex Array",
    Icon: Activity,
    ratio: "video" as const,
  },
];

export default function HomePage() {
  return (
    <div className="relative h-screen max-h-screen w-screen bg-zinc-950 text-zinc-100 font-sans tracking-tight antialiased select-none selection:bg-zinc-100 selection:text-zinc-950">
    

      {/* Main Framework Container */}
      <main className="relative w-full h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 flex flex-col justify-between lg:justify-center pt-12 md:pt-24 pb-12 lg:py-0 z-10 box-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center my-auto w-full">
          {/* Left Hero Content Engine */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 lg:space-y-10">
            <div className="inline-flex items-center gap-3 bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-md rounded-full px-4 py-1.5 text-[10px] font-mono tracking-[0.18em] text-zinc-400">
              <Cpu size={11} className="text-zinc-500 animate-pulse" />
              <span>NATIVE SHADCN PIPELINE — V1.0.0</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[0.9] flex flex-col">
              <span className="block">3D UI Components</span>
              <span className="text-zinc-500 font-light italic block mt-0.5">
                engineered for layout flow.
              </span>
            </h1>

            <p className="text-zinc-400 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-light">
              React Three Fiber primitives tailored seamlessly into your
              document structure. No black-box wrappers, no bundle bloat. Pure
              source code matching your exact layout.
            </p>

            <div className="flex items-center gap-4 flex-wrap w-full sm:w-auto pt-2 lg:pt-0">
              <Link
                href="/docs"
                className="group inline-flex items-center justify-center gap-3 bg-zinc-100 text-zinc-950 hover:bg-white text-xs font-mono font-semibold uppercase tracking-[0.15em] px-8 h-12 rounded-xl transition-all duration-300 shadow-xl active:scale-[0.98] cursor-pointer transform-gpu"
              >
                <span>Docs</span>
                <ArrowUpRight
                  size={13}
                  className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 ease-out"
                />
              </Link>
              <Link
                href="/docs/components/card-3d"
                className="inline-flex items-center justify-center border border-zinc-900 bg-zinc-950/20 hover:bg-zinc-900/40 hover:border-zinc-800 text-zinc-500 hover:text-white text-xs font-mono uppercase tracking-[0.15em] px-8 h-12 rounded-xl transition-all duration-300 cursor-pointer transform-gpu"
              >
                Components
              </Link>
            </div>
          </div>

          {/* Right Product Demo Viewport */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-md">
              {HERO_DEMOS.map(({ Geometry, label, meta, Icon, ratio }) => (
                <div
                  key={label}
                  className="group relative border border-zinc-900 bg-zinc-950/30 hover:border-zinc-800/80 rounded-2xl overflow-hidden p-3 transition-all duration-500 ease-out transform-gpu"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-700/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="rounded-xl overflow-hidden bg-zinc-950 border border-zinc-900 group-hover:border-zinc-800/60 transition-colors duration-500 will-change-transform transform-gpu">
                    <Card3DContent aspectRatio={ratio}>
                      <mesh rotation={[0.35, 0.35, 0]}>
                        <Geometry />
                        <meshNormalMaterial />
                      </mesh>
                    </Card3DContent>
                  </div>

                  <div className="flex items-center justify-between mt-3 px-1 text-zinc-600 group-hover:text-zinc-400 transition-colors duration-300">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-zinc-500 group-hover:text-zinc-300 transition-colors">
                        {label}
                      </span>
                      <span className="text-[8px] sm:text-[9px] font-mono tracking-normal text-zinc-700">
                        {meta}
                      </span>
                    </div>
                    <Icon
                      size={12}
                      className="opacity-20 group-hover:opacity-100 transform group-hover:rotate-12 transition-all duration-500 ease-out text-zinc-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
