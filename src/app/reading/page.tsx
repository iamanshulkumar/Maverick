import type { Metadata } from "next";
import { ReadingContent } from "@/components/reading/reading-content";

export const metadata: Metadata = {
  title: "Reading Journal",
  description:
    "A decade of books that shaped how I think, build, and see the world. Every book I've finished, with notes, quotes, and insights.",
};

export default function ReadingPage() {
  return <ReadingContent />;
}
