import type { Metadata } from "next";
import { UsesContent } from "./uses-content";

export const metadata: Metadata = {
  title: "Uses",
  description: "My development setup, tools, and software I use daily.",
};

export default function UsesPage() {
  return <UsesContent />;
}
