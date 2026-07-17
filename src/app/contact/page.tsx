import type { Metadata } from "next";
import { ContactContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch for project inquiries, collaborations, or opportunities.",
};

export default function ContactPage() {
  return <ContactContent />;
}
