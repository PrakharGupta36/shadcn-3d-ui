"use client";

import { motion } from "framer-motion";
import { Check, Copy, Terminal, AlertTriangle } from "lucide-react";
import { useState } from "react";

function CommandBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group flex items-center justify-between bg-zinc-950 border border-zinc-800 rounded-xl pl-4 pr-3 py-3.5 font-mono text-xs sm:text-sm text-zinc-300 shadow-inner">
      <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap pr-4 scrollbar-none">
        <Terminal size={14} className="text-zinc-600 shrink-0" />
        <code>{code}</code>
      </div>
      <button
        onClick={handleCopy}
        className="shrink-0 p-2 rounded-md bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 text-zinc-500 hover:text-zinc-200 transition-all cursor-pointer"
        aria-label="Copy code block"
      >
        {copied ? (
          <Check size={13} className="text-emerald-400" />
        ) : (
          <Copy size={13} />
        )}
      </button>
    </div>
  );
}

export default function InstallationPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-12 max-w-3xl"
    >
      {/* Header Section */}
      <div className="space-y-3 border-b border-zinc-900 pb-8">
        <p className="text-xs font-mono text-zinc-600 tracking-wider uppercase">
          Docs / Setup
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Installation
        </h1>
        <p className="text-zinc-400 text-lg font-light leading-relaxed">
          Integrate the 3D layout runtime into your ecosystem environments.
        </p>
      </div>

      {/* Critical Prerequisite Warning Callout */}
      <div className="p-4 border border-amber-500/10 bg-amber-500/[0.02] backdrop-blur-sm rounded-xl flex gap-3 items-start">
        <AlertTriangle
          size={16}
          className="text-amber-500/80 shrink-0 mt-0.5"
        />
        <div className="space-y-1 text-sm">
          <p className="font-medium text-amber-200/90">
            Core Dependency Prerequisite
          </p>
          <p className="text-zinc-400 font-light leading-relaxed text-xs">
            3d-ui builds on top of your existing design choices. You{" "}
            <strong className="text-zinc-300">
              must have shadcn/ui initialized
            </strong>{" "}
            in your project before attempting to layer these components on top.
          </p>
        </div>
      </div>

      {/* Steps Content Loop */}
      <div className="space-y-10 relative before:absolute before:inset-y-0 before:left-3.5 before:w-px before:bg-zinc-900">
        {/* Step 1 */}
        <div className="relative pl-10 space-y-3">
          <div className="absolute left-0 top-0.5 w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400 flex items-center justify-center shadow-md">
            1
          </div>
          <h3 className="text-base font-semibold text-zinc-200 pt-0.5">
            Install Core WebGL Packages
          </h3>
          <p className="text-sm text-zinc-400 font-light leading-relaxed">
            Ensure your project features Three.js, React Three Fiber, and its
            essential layout hooks.
          </p>
          <CommandBlock code="npm install @react-three/fiber @react-three/drei three lucide-react" />
        </div>

        {/* Step 2 */}
        <div className="relative pl-10 space-y-4">
          <div className="absolute left-0 top-0.5 w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400 flex items-center justify-center shadow-md">
            2
          </div>
          <h3 className="text-base font-semibold text-zinc-200 pt-0.5">
            Match Foundations & Add Components
          </h3>
          <p className="text-sm text-zinc-400 font-light leading-relaxed">
            Every 3D component maps directly to a standard unstyled UI
            counterpart. For example, using a{" "}
            <code className="text-xs font-mono text-zinc-300 bg-zinc-900 px-1 py-0.5 border border-zinc-800 rounded">
              3d-ui
            </code>{" "}
            component requires its matching structural primitive from{" "}
            <code className="text-xs font-mono text-zinc-300 bg-zinc-900 px-1 py-0.5 border border-zinc-800 rounded">
              shadcn
            </code>
            .
          </p>

          <div className="">
            <div className="p-4 border border-zinc-900 bg-zinc-950/20 rounded-xl space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-zinc-600 uppercase block">
                Card Architecture
              </span>
              <p className="text-xs text-zinc-400 font-light">
                Requires{" "}
                <code className="text-zinc-200 font-mono">card.tsx</code> to
                structure.
              </p>
              <CommandBlock code="npx shadcn@latest add card && npx 3d-ui add card-3d" />
            </div>

            
          </div>
        </div>

        {/* Step 3 */}
        <div className="relative pl-10 space-y-3">
          <div className="absolute left-0 top-0.5 w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400 flex items-center justify-center shadow-md">
            3
          </div>
          <h3 className="text-base font-semibold text-zinc-200 pt-0.5">
            Verify Dynamic Transpilation
          </h3>
          <p className="text-sm text-zinc-400 font-light leading-relaxed">
            If you encounter layout or WebGL bundle compilation errors under
            Next.js Server Components, make sure your build pipeline processes
            client modules properly inside{" "}
            <code className="text-xs bg-zinc-900 text-zinc-300 font-mono px-1.5 py-0.5 border border-zinc-800 rounded">
              next.config.mjs
            </code>
            :
          </p>
          <pre className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl text-xs font-mono text-zinc-500 leading-relaxed overflow-x-auto scrollbar-none">
            {`/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
};

export default nextConfig;`}
          </pre>
        </div>
      </div>
    </motion.div>
  );
}
