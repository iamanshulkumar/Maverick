import type { Metadata } from "next";
import { ResumeContent } from "./resume-content";

export const metadata: Metadata = {
  title: "Resume",
  description: "Download my resume and view my professional experience.",
};

export default function ResumePage() {
  return <ResumeContent />;
}
