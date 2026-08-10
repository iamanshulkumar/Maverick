export interface Project {
  slug: string;
  title: string;
  tagline: string;
  published: boolean;
  featured: boolean;
  featuredIndex?: number;
  categories?: string[];
  coverImage: string;
  screenshots: string[];
  overview: string;
  problem: string;
  solution: string;
  architecture: string;
  architectureSummary?: string;
  techStack: string[];
  challenges: string[];
  technicalOutcomes: { metric: string; value: string }[];
  businessOutcomes: { metric: string; value: string }[];
  lessons: string[];
  role: string;
  timeline: string;
  businessImpact: string;
  github?: string;
  demo?: string;
  isPrivate?: boolean;
  platform?: string;
  roleDescription?: string;
  challengeDetails?: { challenge: string; explanation: string }[];
  architectureDiagram?: string;
  architectureDescription?: string;
  featureGroups?: { title: string; features: string[]; rationale: string }[];
  technicalDecisions?: { decision: string; rationale: string; alternatives: string }[];
  tradeoffs?: { tradeoff: string; choice: string; reasoning: string }[];
  futureImprovements?: string[];
}

export interface Skill {
  category: string;
  icon: string;
  items: { name: string; years: number }[];
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  responsibilities: string[];
  achievements: string[];
  logo?: string;
}

export interface Achievement {
  title: string;
  value: string;
  description: string;
  why: string;
  icon: string;
  color: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export type BookStatus = "Reading" | "Completed" | "Wishlist";

export interface Book {
  id: string;
  title: string;
  author: string;
  yearRead: number;
  genre: string;
  cover?: string;
  thoughts?: string;
  quote?: string;
  tags: string[];
  favorite?: boolean;
  rating?: number;
  status?: BookStatus;
}

export interface ReadingStats {
  books: number;
  years: number;
  genres: number;
  authorsRevisited: number;
  currentRead: string;
}

export interface FavoriteAuthor {
  name: string;
  stars: number;
}

export interface ReadingInsight {
  book: string;
  why: string;
  impact: string;
}

export interface ReadingJourneyPhase {
  years: string;
  focus: string[];
  description: string;
}

export interface ReadingData {
  stats: ReadingStats;
  books: Book[];
  favoriteAuthors: FavoriteAuthor[];
  insights: ReadingInsight[];
  journey: ReadingJourneyPhase[];
}

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}
