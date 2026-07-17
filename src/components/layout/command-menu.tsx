"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { File, Folder, ArrowRight, Search } from "lucide-react";
import type { Project } from "@/types";

interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) setProjects(await res.json());
      } catch {}
    }
    load();
  }, []);

  const pages = [
    { label: "Home", href: "/", icon: File },
    { label: "About", href: "/about", icon: File },
    { label: "Projects", href: "/projects", icon: Folder },
    { label: "Blog", href: "/blog", icon: File },
    { label: "Resume", href: "/resume", icon: File },
    { label: "Contact", href: "/contact", icon: File },
    { label: "Uses", href: "/uses", icon: File },
    { label: "Now", href: "/now", icon: File },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0">
        <Command className="rounded-xl bg-card" label="Command Menu">
          <div className="flex items-center border-b border-border px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Search pages and projects..."
              className="flex h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <Command.List className="max-h-72 overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </Command.Empty>

            <Command.Group heading="Pages" className="text-xs text-muted-foreground [&>[cmdk-group-heading]]:px-2 [&>[cmdk-group-heading]]:py-1.5">
              {pages.map((page) => (
                <Command.Item
                  key={page.href}
                  value={page.label}
                  onSelect={() => {
                    router.push(page.href);
                    onOpenChange(false);
                  }}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground aria-selected:bg-muted"
                >
                  <page.icon className="h-4 w-4 text-muted-foreground" />
                  {page.label}
                  <ArrowRight className="ml-auto h-3 w-3 text-muted-foreground opacity-0 aria-selected:opacity-100" />
                </Command.Item>
              ))}
            </Command.Group>

            {projects.length > 0 && (
              <Command.Group heading="Projects" className="text-xs text-muted-foreground [&>[cmdk-group-heading]]:px-2 [&>[cmdk-group-heading]]:py-1.5">
                {projects.map((project) => (
                  <Command.Item
                    key={project.slug}
                    value={project.title}
                    onSelect={() => {
                      router.push(`/projects/${project.slug}`);
                      onOpenChange(false);
                    }}
                    className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground aria-selected:bg-muted"
                  >
                    <Folder className="h-4 w-4 text-muted-foreground" />
                    {project.title}
                    <span className="ml-auto text-xs text-muted-foreground">{project.tagline}</span>
                  </Command.Item>
                ))}
              </Command.Group>
            )}
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
