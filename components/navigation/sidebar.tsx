"use client";

import { ChevronRight, Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
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
    items: [{ label: "card-3d", href: "/docs/components/card-3d" }],
  },
];

// High-end cinematic easing curve used on Awwwards sites
const easeQuint = [0.16, 1, 0.3, 1] as const;

// Takeover overlay background transition matrix
const overlayVariants = {
  initial: {
    clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
    opacity: 0,
  },
  animate: {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    opacity: 1,
    transition: { duration: 0.75, ease: easeQuint },
  },
  exit: {
    clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
    opacity: 0,
    transition: { duration: 0.6, ease: easeQuint, delay: 0.1 },
  },
};

// Cascading line items text transitions
const containerVariants = {
  animate: {
    transition: { staggerChildren: 0.04, delayChildren: 0.15 },
  },
  exit: {
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
};

const itemVariants = {
  initial: { y: "100%", opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.6, ease: easeQuint } },
  exit: {
    y: "-40%",
    opacity: 0,
    transition: { duration: 0.4, ease: easeQuint },
  },
};

export default function Sidebar() {
  const currentPathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Core navigation generation block shared across screen states
  const renderNavTree = (isMobile = false) => (
    <nav className="flex flex-col gap-8 w-full">
      {NAV_STRUCTURE.map((group) => (
        <div key={group.section} className="flex flex-col">
          <p className="text-[10px] font-mono font-semibold text-zinc-600 uppercase tracking-[0.25em] mb-4 px-2">
            {group.section}
          </p>
          <ul className={isMobile ? "space-y-4" : "space-y-1"}>
            {group.items.map((item) => {
              const isActive = currentPathname === item.href;
              return (
                <li key={item.href} className="overflow-hidden">
                  {isMobile ? (
                    // Mobile interactive line items with tracking animations
                    <motion.div variants={itemVariants} className="w-full">
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between px-2 py-1 text-3xl font-light tracking-tight transition-colors duration-300 ${
                          isActive
                            ? "text-white font-normal"
                            : "text-zinc-500 hover:text-zinc-200"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                          {item.label}
                        </span>
                        <ArrowUpRight
                          size={18}
                          className="opacity-20 group-hover:opacity-100 text-zinc-400"
                        />
                      </Link>
                    </motion.div>
                  ) : (
                    // Standard desktop minimal elements
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
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
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <>
      {/* ── DESKTOP PERSISTENT NAVIGATION VIEWPORT ────────────────────── */}
      <aside className="hidden lg:block w-56 shrink-0 sticky self-start max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 scrollbar-none">
        {renderNavTree(false)}
      </aside>

      {/* ── MOBILE STICKY BOTTOM ACTIONS CONTROL PINBAR ───────────────── */}
      <div className="lg:hidden w-full border border-zinc-900 bg-zinc-950/80 backdrop-blur-md rounded-xl px-4 h-12 flex items-center justify-between sticky top-16 z-40 shadow-xl">
        <span className="text-xs font-mono text-zinc-500 tracking-wide">
          Index — {currentPathname.split("/").pop() || "Index"}
        </span>
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

      {/* ── HIGH-END CINEMATIC TAKEOVER DIALOG PORTAL ──────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="lg:hidden fixed inset-0 z-40 bg-zinc-950/98 backdrop-blur-lg flex flex-col justify-between px-8 pt-36 pb-12 overflow-hidden h-screen w-screen"
          >
            {/* Ambient subtle light leak accent mapping to bottom corner */}
            <div className="absolute -bottom-1/4 -left-1/4 w-[70vw] h-[70vw] bg-zinc-900/[0.15] blur-[100px] rounded-full pointer-events-none" />

            {/* Nav Menu Content wrapper */}
            <motion.div
              variants={containerVariants}
              className="w-full max-w-lg mx-auto flex-1 flex flex-col justify-center"
            >
              {renderNavTree(true)}
            </motion.div>

            {/* Editorial Footer Subtext within Mobile Menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
              className="w-full max-w-lg mx-auto border-t border-zinc-900 pt-6 flex justify-between items-center text-[10px] font-mono text-zinc-600 tracking-wider uppercase mt-8"
            >
              <span>3d-ui ecosystem ©2026</span>
              <a
                href="https://github.com"
                className="hover:text-zinc-400 transition-colors"
              >
                GitHub Repository
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
