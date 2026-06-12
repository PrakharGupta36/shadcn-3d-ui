"use client";

import { cn } from "@/lib/utils";
import { OrbitControls } from "@react-three/drei";
import { Loader2 } from "lucide-react";
import * as React from "react";
import { Card3DScene, type Card3DSceneProps } from "./card-3d-scene";

interface Card3DContentProps extends React.ComponentProps<"div"> {
  showControls?: boolean;
  cameraProps?: Card3DSceneProps["camera"];
  aspectRatio?: Card3DSceneProps["aspectRatio"];
}

const Card3DContent = React.forwardRef<HTMLDivElement, Card3DContentProps>(
  (
    {
      className,
      children,
      showControls = true,
      cameraProps,
      aspectRatio = "auto",
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        data-slot="card-3d-content"
        className={cn(
          "px-(--card-spacing) py-2 relative w-full h-full",
          className,
        )}
        {...props}
      >
        <React.Suspense
          fallback={
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/5 dark:bg-white/5 rounded-md min-w-60">
              {/* Native shadcn loading spinner style */}
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          }
        >
          <Card3DScene camera={cameraProps} aspectRatio={aspectRatio}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />

            {children}

            {showControls && (
              <OrbitControls enableZoom={false} makeDefault enablePan={false} />
            )}
          </Card3DScene>
        </React.Suspense>
      </div>
    );
  },
);
Card3DContent.displayName = "Card3DContent";

export { Card3DContent };
