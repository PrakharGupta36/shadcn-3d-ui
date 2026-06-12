/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { cn } from "@/lib/utils";
import { OrbitControls } from "@react-three/drei";
import { Loader2 } from "lucide-react";
import * as React from "react";

import { Canvas, type RenderProps } from "@react-three/fiber";

type CanvasCameraProps = RenderProps<HTMLCanvasElement>["camera"];

export interface Card3DSceneProps extends Omit<
  RenderProps<HTMLCanvasElement>,
  "camera"
> {
  containerClassName?: string;
  className?: string;
  children?: React.ReactNode;
  camera?: CanvasCameraProps;
  aspectRatio?: "square" | "video" | "auto";
}

export function Card3DScene({
  children,
  className,
  containerClassName,
  camera,
  aspectRatio = "auto",
  ...props
}: Card3DSceneProps) {
  // A unique key that we increment to force-reset the canvas if it crashes
  const [sceneKey, setSceneKey] = React.useState(0);

  const handleContextLost = React.useCallback((event: React.SyntheticEvent) => {
    event.preventDefault(); // Prevents the browser's default crash behavior
    console.warn(
      "3D UI Engine: WebGL context lost. Resetting internal scene canvas...",
    );
    setSceneKey((prev) => prev + 1); // Force re-mounts a pristine element
  }, []);

  return (
    <div
      key={sceneKey} // Changing this clears memory completely
      data-slot="card-3d-scene-container"
      className={cn(
        "relative w-full overflow-hidden rounded-md bg-zinc-950/5 dark:bg-white/5",
        {
          "aspect-square": aspectRatio === "square",
          "aspect-video": aspectRatio === "video",
          "h-48": aspectRatio === "auto",
        },
        containerClassName,
      )}
    >
      <Canvas
        className={cn("absolute inset-0 pointer-events-auto", className)}
        camera={
          { position: [0, 0, 2.5], fov: 45, ...camera } as CanvasCameraProps
        }
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        // Event listeners directly into R3F canvas instance hook hooks
        onCreated={({ gl }) => {
          const canvasEl = gl.domElement;
          canvasEl.addEventListener(
            "webglcontextlost",
            handleContextLost as any,
            { once: true },
          );
        }}
        {...props}
      >
        {children}
      </Canvas>
    </div>
  );
}

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
