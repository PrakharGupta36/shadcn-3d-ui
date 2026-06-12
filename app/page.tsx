import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Card3DContent } from "@/packages/3d-ui/src";

export default function Home() {
  return (
    <main className="grid place-items-center h-screen bg-[#ececec]">
      <Card className="w-full max-w-sm bg-black text-white border-[1.25px] border-[#edecec] shadow-2xl">
        <CardHeader>
          <CardTitle>React Three Fiber UI</CardTitle>
          <CardDescription>Seamlessly rendering 3D items.</CardDescription>
        </CardHeader>

        <Card3DContent aspectRatio="auto">
          <mesh scale={1}>
            <boxGeometry />
            <meshNormalMaterial />
          </mesh>
        </Card3DContent>
      </Card>
    </main>
  );
}
