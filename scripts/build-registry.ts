import fs from "fs";
import path from "path";

const card3d = fs.readFileSync(
  path.join(process.cwd(), "components/3d-ui/card-3d.tsx"),
  "utf-8",
);

const registry = {
  "card-3d": {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "card-3d",
    type: "registry:ui",
    title: "3D Card",
    description:
      "A collection of Three.js React Three Fiber 3D card primitives.",
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
        content: card3d,
      },
    ],
  },
};

fs.writeFileSync(
  path.join(process.cwd(), "public/r/card-3d.json"),
  JSON.stringify(registry["card-3d"], null, 2),
);

console.log("Registry built.");
