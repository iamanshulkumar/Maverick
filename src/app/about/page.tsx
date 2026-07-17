import type { Metadata } from "next";
import { AboutContent } from "./about-content";

export const metadata: Metadata = {
  title: "About",
  description: "My journey from Web Developer to Project Manager.",
};

export default function AboutPage() {
  return <AboutContent />;
}
