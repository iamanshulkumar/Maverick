import type { Metadata } from "next";
import { NowContent } from "./now-content";

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm focused on right now.",
};

export default function NowPage() {
  return <NowContent />;
}
