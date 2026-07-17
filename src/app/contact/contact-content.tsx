"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Github, Linkedin, MapPin, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";

export function ContactContent() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setError("Something went wrong. Please email me directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-center">
            <span className="mb-4 inline-block text-xs font-medium uppercase tracking-widest text-accent">
              Contact
            </span>
            <h1 className="text-4xl font-bold tracking-tight">Get in Touch</h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Have a project in mind or just want to say hi? I&apos;d love to hear from you.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-5">
            <div className="md:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1.5">Name</label>
                    <input
                      id="name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1.5">Subject</label>
                  <input
                    id="subject"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1.5">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                {error && <p className="text-sm text-red-400">{error}</p>}
                <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={loading}>
                  {loading ? (
                    <><Loader2 size={16} className="mr-2 animate-spin" /> Sending...</>
                  ) : submitted ? (
                    <><Check size={16} className="mr-2" /> Message Sent!</>
                  ) : (
                    <><Send size={16} className="mr-2" /> Send Message</>
                  )}
                </Button>
              </form>
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-medium mb-3">Contact Info</h3>
                <div className="space-y-3">
                  <a href={`mailto:${siteConfig.links.email}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Mail size={16} className="text-accent" /> {siteConfig.links.email}
                  </a>
                  <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Github size={16} className="text-accent" /> GitHub
                  </a>
                  <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Linkedin size={16} className="text-accent" /> LinkedIn
                  </a>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <MapPin size={16} className="text-accent" /> Ajmer, Rajasthan, India
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-gradient-to-br from-accent/5 to-accent-cyan/5 p-5">
                <h3 className="font-medium mb-2">Availability</h3>
                <p className="text-sm text-muted-foreground">
                  Currently open to freelance projects and full-time opportunities.
                  Response time is typically within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
