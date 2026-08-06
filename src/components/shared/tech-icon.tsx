import { siAxios, siClaude, siDocker, siExpo, siExpress, siFirebase, siFormik, siGooglemaps, siI18next, siLaravel, siMongodb, siMui, siMysql, siNodedotjs, siPostgresql, siPython, siReact, siRedis, siSocketdotio, siStripe, siTypescript, siVite } from "simple-icons";

interface SimpleIcon {
  path: string;
  hex: string;
  title: string;
}

const ICONS: Record<string, SimpleIcon> = {
  "React Native": siReact,
  "React Native (Expo)": siExpo,
  React: siReact,
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
  Vite: siVite,
  "Laravel PHP": siLaravel,
  "Google Maps": siGooglemaps,
  "Google Maps API": siGooglemaps,
  TypeScript: siTypescript,
  i18next: siI18next,
  "Material UI": siMui,
  Stripe: siStripe,
  Formik: siFormik,
};

function lighten(hex: string, amount = 0.72): string {
  const n = parseInt(hex, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  if (luminance > 110) return `#${hex}`;
  const mix = (c: number) => Math.round(c + (255 - c) * amount);
  const to = (c: number) => c.toString(16).padStart(2, "0");
  return `#${to(mix(r))}${to(mix(g))}${to(mix(b))}`;
}

interface TechIconProps {
  name: string;
  size?: number;
  className?: string;
}

export function TechIcon({ name, size = 25, className }: TechIconProps) {
  const icon = ICONS[name];
  if (!icon) return null;
  return (
    <svg
      role="img"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={lighten(icon.hex)}
      style={{ flexShrink: 0, display: "block" }}
      className={className}
      aria-label={icon.title}
    >
      <path d={icon.path} />
    </svg>
  );
}
