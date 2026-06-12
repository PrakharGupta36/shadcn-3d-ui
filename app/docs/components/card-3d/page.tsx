"use client";

import { motion } from "framer-motion";
import { Check, Copy, HelpCircle, Terminal } from "lucide-react";
import { useState } from "react";

import { Card3DContent } from "@/components/3d-ui/card-3d";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// ── CODE BLOCKS MARKUP DATA ──────────────────────────────────────────────────
const INSTALL_CMD = `npx 3d-ui add card-3d`;

const USAGE_CODE = `import { Card3DContent } from "@/components/3d-ui/card-3d";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Example() {
  return (
    <Card className="w-full max-w-sm bg-zinc-950 text-white border-zinc-800">
      <CardHeader>
        <CardTitle className="text-base">React Three Fiber Element</CardTitle>
        <CardDescription className="text-zinc-500 text-xs">
          Seamless unstyled WebGL geometry execution pipeline.
        </CardDescription>
      </CardHeader>

      <Card3DContent aspectRatio="video">
        <mesh>
          <torusKnotGeometry args={[0.55, 0.18, 128, 16]} />
          <meshNormalMaterial />
        </mesh>
      </Card3DContent>
    </Card>
  );
}`;

const EXAMPLES_CODE = `{/* Example A: No Controls Frame */}
<Card3DContent aspectRatio="square" showControls={false}>
  <mesh><boxGeometry args={[1.3, 1.3, 1.3]} /><meshNormalMaterial /></mesh>
</Card3DContent>

{/* Example B: Orbit Interaction Engine */}
<Card3DContent aspectRatio="square">
  <mesh><torusKnotGeometry args={[0.6, 0.2, 128, 16]} /><meshNormalMaterial /></mesh>
</Card3DContent>

{/* Example C: Structural Wireframe Blueprint */}
<Card3DContent aspectRatio="square">
  <mesh><sphereGeometry args={[0.8, 64, 64]} /><meshNormalMaterial wireframe /></mesh>
</Card3DContent>`;

const PROP_ROWS = [
  {
    prop: "aspectRatio",
    type: '"square" | "video" | "auto"',
    def: '"auto"',
    desc: '"auto" assigns 12rem height bounds. "video" enforces 16:9 box scaling ratios. "square" guarantees uniform 1:1 boxes.',
  },
  {
    prop: "showControls",
    type: "boolean",
    def: "true",
    desc: "Enables underlying Canvas OrbitControls tracking hooks. Drag coordinates to pan/rotate layout models.",
  },
  {
    prop: "cameraProps",
    type: "CanvasCameraProps",
    def: "pos [0,0,2.5]",
    desc: "Forwarded directly down to standard R3F high-performance responsive camera matrices configuration targets.",
  },
  {
    prop: "children",
    type: "ReactNode",
    def: "—",
    desc: "React Three Fiber engine components: geometric arrays, meshes, lighting configurations, or multi-pass effects.",
  },
  {
    prop: "className",
    type: "string",
    def: "—",
    desc: "Appends extra Tailwind CSS class design declarations cleanly to the wrapping element bounding container frame.",
  },
];

// ── SUB-COMPONENTS ───────────────────────────────────────────────────────────
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-200 transition-colors cursor-pointer"
    >
      {copied ? (
        <Check size={12} className="text-emerald-400" />
      ) : (
        <Copy size={12} />
      )}
      <span>{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

function CodeSection({ code, lang = "bash" }: { code: string; lang?: string }) {
  return (
    <div className="rounded-xl border border-zinc-900 bg-zinc-950 overflow-hidden shadow-inner">
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-900 bg-zinc-900/20">
        <div className="flex items-center gap-2 text-zinc-600">
          <Terminal size={12} />
          <span className="text-xs font-mono">{lang}</span>
        </div>
        <CopyButton text={code} />
      </div>
      <pre className="px-5 py-4 text-xs sm:text-sm font-mono text-zinc-300 overflow-x-auto leading-relaxed scrollbar-none">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function TabsStrip({
  active,
  onChange,
}: {
  active: string;
  onChange: (t: string) => void;
}) {
  return (
    <div className="flex gap-1 border-b border-zinc-900">
      {["preview", "code"].map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-4 py-2.5 text-xs font-mono uppercase tracking-wider transition-all border-b-2 -mb-px cursor-pointer ${
            active === tab
              ? "border-white text-white font-medium"
              : "border-transparent text-zinc-500 hover:text-zinc-300"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

// ── PRIMARY RECONCILER PAGE VIEWPORT ─────────────────────────────────────────
export default function Card3DPage() {
  const [playgroundTab, setPlaygroundTab] = useState("preview");
  const [examplesTab, setExamplesTab] = useState("preview");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-14 max-w-4xl"
    >
      {/* Editorial Header Section Layout */}
      <div className="space-y-3 border-b border-zinc-900 pb-8">
        <div className="flex items-center gap-3">
          <p className="text-xs font-mono text-zinc-600 tracking-wider uppercase">
            Components / UI Elements
          </p>
          <span className="text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded">
            R3F Native
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          card-3d
        </h1>
        <p className="text-zinc-400 text-lg font-light leading-relaxed max-w-2xl">
          An isolated dynamic WebGL layout canvas system built into standard box
          hierarchies. Handles frame loops, fallback containers, and performance
          matrices out of the box.
        </p>
      </div>

      {/* Primary Component Interactive Showcase Playground */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-zinc-200">
          Interactive Playground
        </h2>
        <div className="border border-zinc-900 rounded-xl overflow-hidden bg-zinc-950/20 backdrop-blur-sm">
          <div className="flex items-center justify-between pr-4 bg-zinc-900/10 border-b border-zinc-900">
            <TabsStrip active={playgroundTab} onChange={setPlaygroundTab} />
            <CopyButton text={USAGE_CODE} />
          </div>

          {playgroundTab === "preview" ? (
            <div
              className="p-8 sm:p-16 flex items-center justify-center bg-[#000000]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #1f1f1f 1px, transparent 2px)",
                backgroundSize: "24px 24px",
              }}
            >
              <Card className="w-full max-w-xs bg-zinc-950 text-white border-zinc-900 shadow-2xl rounded-2xl overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold tracking-tight">
                    React Three Fiber UI
                  </CardTitle>
                  <CardDescription className="text-zinc-500 text-xs font-light">
                    Fluid cross-device mesh rendering.
                  </CardDescription>
                </CardHeader>
                <Card3DContent aspectRatio="video">
                  <mesh rotation={[0.2, 0.2, 0]}>
                    <torusKnotGeometry args={[0.55, 0.18, 140, 16]} />
                    <meshNormalMaterial />
                  </mesh>
                </Card3DContent>
              </Card>
            </div>
          ) : (
            <pre className="p-5 text-xs font-mono text-zinc-400 bg-zinc-950 overflow-x-auto leading-relaxed whitespace-pre">
              <code>{USAGE_CODE}</code>
            </pre>
          )}
        </div>
      </div>

      {/* Setup Block */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-zinc-200">
          Installation Command
        </h2>
        <CodeSection code={INSTALL_CMD} lang="bash" />
      </div>

      {/* Prop Types Specifications Structure Table */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium text-zinc-200">
            API Documentation Reference
          </h2>
          <HelpCircle size={14} className="text-zinc-600" />
        </div>
        <div className="rounded-xl border border-zinc-900 bg-zinc-950/20 overflow-x-auto scrollbar-none">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-zinc-900 bg-zinc-900/30">
                {["Prop", "Type", "Default", "Description"].map((header) => (
                  <th
                    key={header}
                    className="px-4 py-3 text-[10px] font-mono font-semibold text-zinc-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 font-light">
              {PROP_ROWS.map((row) => (
                <tr
                  key={row.prop}
                  className="hover:bg-zinc-900/10 transition-colors"
                >
                  <td className="px-4 py-3.5 font-mono text-zinc-200 font-medium whitespace-nowrap">
                    {row.prop}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs text-blue-400 whitespace-nowrap">
                    {row.type}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs text-zinc-600 Regal-Code-Val whitespace-nowrap">
                    {row.def}
                  </td>
                  <td className="px-4 py-3.5 text-zinc-400 text-xs leading-relaxed max-w-sm">
                    {row.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Multi-variant Structural Examples */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-zinc-200">
          Alternative Mesh Renders
        </h2>
        <div className="border border-zinc-900 rounded-xl overflow-hidden bg-zinc-950/20 backdrop-blur-sm">
          <div className="flex items-center justify-between pr-4 bg-zinc-900/10 border-b border-zinc-900">
            <TabsStrip active={examplesTab} onChange={setExamplesTab} />
            <CopyButton text={EXAMPLES_CODE} />
          </div>

          {examplesTab === "preview" ? (
            <div className="p-6 bg-[#09090b] grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  Geometry: () => <boxGeometry args={[1.2, 1.2, 1.2]} />,
                  label: 'aspectRatio="square"',
                  sub: "No controls engine input",
                },
                {
                  Geometry: () => (
                    <torusKnotGeometry args={[0.55, 0.18, 128, 16]} />
                  ),
                  label: 'aspectRatio="square"',
                  sub: "Active Orbit Controls drag mechanics",
                },
                {
                  Geometry: () => <sphereGeometry args={[0.75, 48, 48]} />,
                  label: 'aspectRatio="square"',
                  sub: "Structural blueprint wireframe layer",
                  wf: true,
                },
              ].map(({ Geometry, label, sub, wf }, i) => (
                <div key={i} className="group space-y-3">
                  <div className="rounded-xl overflow-hidden border border-zinc-900 bg-zinc-950/80 group-hover:border-zinc-800/80 transition-all duration-300">
                    <Card3DContent aspectRatio="square" showControls={i !== 0}>
                      <mesh rotation={[0.3, 0.3, 0]}>
                        <Geometry />
                        <meshNormalMaterial wireframe={wf} />
                      </mesh>
                    </Card3DContent>
                  </div>
                  <div className="px-1 space-y-0.5">
                    <p className="text-xs font-mono text-zinc-400 group-hover:text-zinc-200 transition-colors">
                      {label}
                    </p>
                    <p className="text-[11px] text-zinc-600 font-light">
                      {sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <pre className="p-5 text-xs font-mono text-zinc-400 bg-zinc-950 overflow-x-auto leading-relaxed whitespace-pre">
              <code>{EXAMPLES_CODE}</code>
            </pre>
          )}
        </div>
      </div>
    </motion.div>
  );
}
