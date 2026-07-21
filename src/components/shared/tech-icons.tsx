interface IconProps {
  size?: number;
  className?: string;
}

export function ReactIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <ellipse cx="12" cy="12" rx="10" ry="3.5" />
      <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(-60 12 12)" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

export function NodeIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2l9 5.2v9.6L12 22l-9-5.2V7.2L12 2z" />
      <path d="M12 6v6l4.5 2.6" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function ExpoIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
      <path d="M8 14l4-7 4 7" />
      <path d="M7 16l5-9 5 9" />
    </svg>
  );
}

export function MongoIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2v20" />
      <path d="M8 6c0 2 1.5 4 4 6 2.5-2 4-4 4-6" />
      <path d="M8 18c2 1.5 4 2 4 2s2-.5 4-2" />
    </svg>
  );
}

export function RedisIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="3" y1="14" x2="21" y2="14" />
      <line x1="5" y1="18" x2="19" y2="18" />
      <line x1="3" y1="6" x2="5" y2="18" strokeWidth="2" />
      <line x1="21" y1="6" x2="19" y2="18" strokeWidth="2" />
    </svg>
  );
}

export function SocketIOIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2a10 10 0 1 0 10 10" />
      <path d="M12 12l6-6" />
      <path d="M12 12l-3 3" />
      <path d="M12 12l2-4" />
    </svg>
  );
}

export function BullMQIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="10" width="4" height="10" rx="1" />
      <rect x="10" y="6" width="4" height="14" rx="1" />
      <rect x="17" y="3" width="4" height="17" rx="1" />
      <path d="M5 4v6M12 2v4M19 2v1" strokeWidth="2" />
    </svg>
  );
}

export function MetaAPIIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="18" r="3" />
      <path d="M8 8l8 8" />
      <path d="M9 7l1 5 5 1" />
    </svg>
  );
}

export function ClaudeIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2a4 4 0 0 0-4 4v8a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z" />
      <path d="M8 14a4 4 0 0 0 8 0" />
      <path d="M12 18v4" />
      <path d="M8 22h8" />
    </svg>
  );
}

export function ExpressIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 7v10" />
      <path d="M21 7v10" />
      <path d="M3 12h18" />
      <path d="M8 7v5a4 4 0 0 0 8 0V7" />
    </svg>
  );
}

export function TwelveDataIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="22 7 16 13 12 10 2 18" />
      <polyline points="22 13 18 11 14 16 2 8" strokeOpacity="0.5" />
    </svg>
  );
}

export function FirebaseIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 20l4-16 4 12 4-8 4 12" />
      <path d="M8 12l4-6 4 6" />
    </svg>
  );
}

export const techIconMap: Record<string, React.ComponentType<IconProps>> = {
  "React Native (Expo)": ReactIcon,
  "React Native": ReactIcon,
  "Node.js": NodeIcon,
  Express: ExpressIcon,
  MongoDB: MongoIcon,
  "Socket.IO": SocketIOIcon,
  Redis: RedisIcon,
  MetaAPI: MetaAPIIcon,
  "Claude AI": ClaudeIcon,
  "Twelve Data API": TwelveDataIcon,
  Firebase: FirebaseIcon,
  BullMQ: BullMQIcon,
};
