// app/r/[name]/route.ts
import { NextResponse } from "next/server";
import { registry } from "@/registry";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const item = registry[name];
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}