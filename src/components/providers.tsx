"use client";

import { type PropsWithChildren } from "react";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      {children}
      <Analytics />
    </ThemeProvider>
  );
}
