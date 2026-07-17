import { NextResponse } from "next/server";
import { getProjects } from "@/lib/data";

export async function GET() {
  const projects = getProjects().map((p) => ({
    slug: p.slug,
    title: p.title,
    tagline: p.tagline,
  }));
  return NextResponse.json(projects);
}
