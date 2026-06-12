export const registry: Record<string, object> = {
  "card-3d": {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "card-3d",
    title: "3D Card",
    description:
      "A collection of Three.js React Three Fiber 3D card primitives.",
    type: "registry:ui",
    dependencies: [
      "@react-three/fiber",
      "@react-three/drei",
      "three",
      "lucide-react",
    ],
    registryDependencies: ["card"],
    files: [
      {
        path: "components/3d-ui/card-3d.tsx",
        type: "registry:ui",
        target: "components/3d-ui/card-3d.tsx",
        content: `...the full file content as a string...`,
      },
    ],
  },
};
