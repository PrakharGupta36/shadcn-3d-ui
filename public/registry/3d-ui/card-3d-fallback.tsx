"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function Card3DFallback({ className }: { className?: string }) {
  return (
    <div
      data-slot="card-3d-fallback"
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center bg-muted/40 animate-pulse rounded-md text-muted-foreground",
        className,
      )}
    >
      <Loader2 className="animate-spin" />
    </div>
  );
}
