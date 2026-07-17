"use client";

import { PropsWithChildren } from "react";
import { Analytics } from "@vercel/analytics/react";

export function Providers({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
}
