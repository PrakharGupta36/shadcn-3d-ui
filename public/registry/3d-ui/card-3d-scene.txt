/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import { Canvas, type RenderProps } from "@react-three/fiber";
import * as React from "react";

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
