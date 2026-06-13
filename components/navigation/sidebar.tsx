/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface SubPage {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  subPages?: SubPage[];
}

interface NavGroup {
  section: string;
  items: NavItem[];
}

const NAV_STRUCTURE: NavGroup[] = [
  {
    section: "Getting Started",
    items: [
      { label: "Introduction", href: "/docs" },
      { label: "Installation", href: "/docs/installation" },
    ],
  },
  {
    section: "Components",
    items: [
      {
        label: "card-3d",
        href: "/docs/components/card-3d",
      },
    ],
  },
];

// Ultra-optimized fast ease curve
const easeFast = [0.22, 1, 0.36, 1] as const;

const overlayVariants = {
  initial: { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", opacity: 0 },
  animate: {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    opacity: 1,
    transition: { duration: 0.45, ease: easeFast },
  },
  exit: {
    clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
    opacity: 0,
    transition: { duration: 0.35, ease: easeFast },
  },
};

export default function Sidebar() {
  const currentPathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeGroupIndex, setActiveGroupIndex] = useState<number | null>(null);

  // Background state lock hook
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "unset";
    if (!mobileOpen) setActiveGroupIndex(null);
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* ── DESKTOP PERSISTENT SIDEBAR VIEWPORT ────────────────────── */}
      <aside className="hidden lg:block w-56 shrink-0 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 scrollbar-none transform-gpu">
        <nav className="flex flex-col gap-8 w-full">
          {NAV_STRUCTURE.map((group) => (
            <div key={group.section} className="flex flex-col">
              <p className="text-[10px] font-mono font-semibold text-zinc-600 uppercase tracking-[0.25em] mb-4 px-2">
                {group.section}
              </p>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive =
                    item.href &&
                    (currentPathname === item.href ||
                      currentPathname.startsWith(item.href + "/"));
                  return (
                    <div key={item.label} className="flex flex-col">
                      {item.href ? (
                        <Link
                          href={item.href}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                            isActive
                              ? "bg-zinc-900 text-white font-medium border border-zinc-800"
                              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
                          }`}
                        >
                          {isActive && (
                            <ChevronRight size={12} className="text-zinc-400" />
                          )}
                          {item.label}
                        </Link>
                      ) : (
                        <span className="text-zinc-400 text-sm px-3 py-2">
                          {item.label}
                        </span>
                      )}
                    </div>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* ── MOBILE FIXED CONTROL TOP BAR ───────────────── */}
      {/* ── MOBILE FIXED CONTROL TOP BAR ───────────────── */}
      <div className="lg:hidden fixed top-4 left-4 right-4 border border-zinc-900 bg-zinc-950/80 backdrop-blur-md rounded-xl px-4 h-12 flex items-center justify-between z-40 shadow-xl transform-gpu">
        <div className="flex items-center overflow-hidden h-full">
          <AnimatePresence mode="wait">
            {!mobileOpen ? (
              <motion.div
                key="mobile-back-home"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href="/"
                  className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white uppercase tracking-wider transition-colors py-1"
                >
                  <ArrowLeft size={12} className="text-zinc-500" />
                  <span>Home</span>
                </Link>
              </motion.div>
            ) : (
              <motion.span
                key="mobile-index-title"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="text-xs font-mono text-zinc-500 tracking-wide block py-1"
              >
                Index — {currentPathname.split("/").pop() || "Index"}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 text-zinc-400 hover:text-white transition-colors relative z-50 cursor-pointer"
          aria-label="Toggle structural layout portal"
        >
          {mobileOpen ? (
            <X size={18} className="text-white" />
          ) : (
            <Menu size={18} />
          )}
        </button>
      </div>

      {/* ── HIGH-END CINEMATIC NESTED TAKEOVER DIALOG PORTAL ──────────────────── */}
      <AnimatePresence mode="wait">
        {mobileOpen && (
          <motion.div
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="lg:hidden fixed inset-0 z-40 bg-zinc-950/98 backdrop-blur-lg flex flex-col justify-between px-6 sm:px-12 pt-32 pb-8 h-screen w-screen transform-gpu overflow-hidden select-none touch-none"
          >
            {/* Header Controls */}
            <div className="absolute top-8 left-6 sm:left-12 right-6 sm:right-12 z-50 flex items-center justify-between h-8">
              <div className="w-20">
                {activeGroupIndex !== null && (
                  <button
                    onClick={() => setActiveGroupIndex(null)}
                    className="text-[10px] font-mono tracking-[0.2em] text-zinc-400 uppercase hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft size={12} />
                    <span>Back</span>
                  </button>
                )}
              </div>

              <button
                onClick={() => setMobileOpen(false)}
                className="text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase hover:text-white transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>[ Close ]</span>
                <X size={14} />
              </button>
            </div>

            <div className="absolute -bottom-1/4 -left-1/4 w-[70vw] h-[70vw] bg-zinc-900/[0.12] blur-[80px] rounded-full pointer-events-none" />

            {/* Optimized High-Performance Multi-Panel Slider View */}
            <div className="w-full max-w-2xl mx-auto my-auto overflow-hidden relative py-4">
              <div
                className="flex w-[200%] transition-transform duration-500 will-change-transform transform-gpu"
                style={{
                  transform:
                    activeGroupIndex !== null
                      ? "translateX(-50%)"
                      : "translateX(0%)",
                }}
              >
                {/* PANEL ONE: Root View */}
                <div className="w-1/2 pr-4 shrink-0 flex flex-col gap-10">
                  {NAV_STRUCTURE.map((group, index) => (
                    <div
                      key={group.section}
                      className="flex flex-col group/row"
                    >
                      <span className="text-[10px] font-mono font-semibold text-zinc-600 uppercase tracking-[0.25em] mb-2">
                        / 0{index + 1}
                      </span>
                      <button
                        onClick={() => setActiveGroupIndex(index)}
                        className="flex items-baseline justify-between w-full text-left text-4xl sm:text-5xl font-light tracking-tight text-zinc-400 hover:text-white transition-colors duration-200 py-2 cursor-pointer border-b border-zinc-900 group-hover/row:border-zinc-700"
                      >
                        <span>{group.section}</span>
                        <ChevronRight
                          size={24}
                          className="text-zinc-600 transform group-hover/row:translate-x-1 transition-transform duration-200"
                        />
                      </button>
                    </div>
                  ))}
                </div>

                {/* PANEL TWO: Nested Inner Page List View */}
                <div className="w-1/2 pl-4 shrink-0 flex flex-col gap-6">
                  <div className="border-b border-zinc-900 pb-3">
                    <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest block mb-0.5">
                      Viewing Category
                    </span>
                    <h2 className="text-lg font-normal text-zinc-300 tracking-tight">
                      {activeGroupIndex !== null
                        ? NAV_STRUCTURE[activeGroupIndex].section
                        : ""}
                    </h2>
                  </div>

                  <ul className="space-y-6 overflow-y-auto max-h-[40vh] pr-2 scrollbar-none">
                    {activeGroupIndex !== null &&
                      NAV_STRUCTURE[activeGroupIndex].items.map((item, idx) => {
                        const isActive =
                          item.href &&
                          (currentPathname === item.href ||
                            currentPathname.startsWith(item.href + "/"));
                        return (
                          <li key={item.label} className="flex flex-col gap-2">
                            <div className="flex items-baseline justify-between group/item">
                              {item.href ? (
                                <Link
                                  href={item.href}
                                  onClick={() => setMobileOpen(false)}
                                  className={`text-2xl sm:text-3xl font-light tracking-tight transition-colors flex items-baseline gap-3 ${
                                    isActive
                                      ? "text-white"
                                      : "text-zinc-400 hover:text-zinc-200"
                                  }`}
                                >
                                  <span className="text-xs font-mono text-zinc-600">
                                    ({idx + 1})
                                  </span>
                                  {item.label}
                                </Link>
                              ) : (
                                <span className="text-2xl sm:text-3xl font-light tracking-tight text-zinc-500 flex items-baseline gap-3">
                                  <span className="text-xs font-mono text-zinc-600">
                                    ({idx + 1})
                                  </span>
                                  {item.label}
                                </span>
                              )}
                              {item.href && (
                                <ArrowUpRight
                                  size={16}
                                  className="text-zinc-600 opacity-0 group-hover/item:opacity-100 transition-opacity duration-150"
                                />
                              )}
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>

            {/* Editorial Footer */}
            <div className="w-full max-w-2xl mx-auto border-t border-zinc-900 pt-4 flex flex-col sm:flex-row gap-2 justify-between items-center text-[10px] font-mono text-zinc-600 tracking-wider uppercase mt-auto">
              <span>3d-ui ecosystem ©2026</span>
              <a
                href="https://github.com"
                className="hover:text-zinc-400 transition-colors"
              >
                GitHub Repository
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
