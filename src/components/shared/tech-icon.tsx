"use client";

import { siAxios, siClaude, siDocker, siExpo, siExpress, siFirebase, siFormik, siGooglemaps, siI18next, siLaravel, siMongodb, siMui, siMysql, siNodedotjs, siPostgresql, siPython, siReact, siRedis, siShopify, siSocketdotio, siStripe, siTypescript, siVite, siWix, siWordpress, siFramer, siTailwindcss, siNextdotjs, siPhp, siBootstrap } from "simple-icons";

interface SimpleIcon {
  path: string;
  hex: string;
  title: string;
}

const ICONS: Record<string, SimpleIcon> = {
  "React Native": siReact,
  "React Native (Expo)": siExpo,
  React: siReact,
  "React.js": siReact,
  "Node.js": siNodedotjs,
  Python: siPython,
  PostgreSQL: siPostgresql,
  Redis: siRedis,
  Docker: siDocker,
  Firebase: siFirebase,
  MySQL: siMysql,
  Axios: siAxios,
  Express: siExpress,
  MongoDB: siMongodb,
  "Socket.IO": siSocketdotio,
  "Claude AI": siClaude,
  "Claude API": siClaude,
  "OpenAI API": siReact,
  Vite: siVite,
  "Laravel PHP": siLaravel,
  Laravel: siLaravel,
  "Google Maps": siGooglemaps,
  "Google Maps API": siGooglemaps,
  TypeScript: siTypescript,
  i18next: siI18next,
  "Material UI": siMui,
  Stripe: siStripe,
  Formik: siFormik,
  Shopify: siShopify,
  WordPress: siWordpress,
  Wix: siWix,
  AWS: siReact,
  Framer: siFramer,
  "Framer Motion": siFramer,
  "Tailwind CSS": siTailwindcss,
  TailwindCSS: siTailwindcss,
  "Next.js": siNextdotjs,
  PHP: siPhp,
  Bootstrap: siBootstrap,
  Expo: siExpo,
  "Expo Router": siExpo,
  BullMQ: siReact,
  Reanimated: siReact,
  NativeWind: siReact,
  "Stream Chat": siReact,
};

interface TechIconProps {
  name: string;
  size?: number;
  className?: string;
}

export function TechIcon({ name, size = 16, className }: TechIconProps) {
  const icon = ICONS[name];
  if (!icon) return null;

  return (
    <svg
      role="img"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ flexShrink: 0, display: "block" }}
      className={`text-muted-foreground ${className || ""}`}
      aria-label={icon.title}
      suppressHydrationWarning
    >
      <path d={icon.path} />
    </svg>
  );
}
