import projectsData from "@/content/projects.json";
import websitesData from "@/content/websites.json";
import skillsData from "@/content/skills.json";
import experienceData from "@/content/experience.json";
import achievementsData from "@/content/achievements.json";
import timelineData from "@/content/timeline.json";
import readingData from "@/content/reading.json";
import type {
  Project,
  WebsiteProject,
  Skill,
  Experience,
  Achievement,
  TimelineEvent,
  Book,
  ReadingData,
  ReadingStats,
} from "@/types";

export function getProjects(): Project[] {
  return (projectsData as unknown as Project[]).filter((p) => p.published);
}

export function getFeaturedProjects(): Project[] {
  return getProjects()
    .filter((p) => p.featured && p.coverImage)
    .sort((a, b) => (a.featuredIndex ?? 99) - (b.featuredIndex ?? 99));
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function getWebsites(): WebsiteProject[] {
  return (websitesData as unknown as WebsiteProject[]).filter((w) => w.published);
}

export function getFeaturedWebsites(): WebsiteProject[] {
  return getWebsites()
    .filter((w) => w.featured)
    .sort((a, b) => (a.featuredIndex ?? 99) - (b.featuredIndex ?? 99));
}

export function getWebsiteProject(slug: string): WebsiteProject | undefined {
  return getWebsites().find((w) => w.slug === slug);
}

export function getAllSlugs(): string[] {
  return [...getProjects().map((p) => p.slug), ...getWebsites().map((w) => w.slug)];
}

export function getAllPublishedSlugs(): { slug: string; kind: "mobile" | "website" }[] {
  return [
    ...getProjects().map((p) => ({ slug: p.slug, kind: "mobile" as const })),
    ...getWebsites().map((w) => ({ slug: w.slug, kind: "website" as const })),
  ];
}

export function getSkills(): Skill[] {
  return skillsData as unknown as Skill[];
}

export function getExperience(): Experience[] {
  return experienceData as unknown as Experience[];
}

export function getAchievements(): Achievement[] {
  return achievementsData as unknown as Achievement[];
}

export function getTimeline(): TimelineEvent[] {
  return timelineData as unknown as TimelineEvent[];
}

export function getReadingData(): ReadingData {
  return readingData as unknown as ReadingData;
}

export function getBooks(): Book[] {
  return getReadingData().books;
}

export function getBookGenres(): string[] {
  const genres = new Set(getBooks().map((b) => b.genre).filter(Boolean));
  return ["All", ...Array.from(genres)];
}

export function getReadingStats(): ReadingStats {
  const readBooks = getBooks().filter((b) => b.status !== "Wishlist");
  const years = readBooks.map((b) => b.yearRead).filter((y) => y > 0);
  const genres = new Set(readBooks.map((b) => b.genre).filter(Boolean));
  const authorCounts = new Map<string, number>();
  readBooks.forEach((b) => {
    const name = b.author.trim();
    if (name) authorCounts.set(name, (authorCounts.get(name) ?? 0) + 1);
  });
  const currentRead = readBooks.find((b) => b.status === "Reading");

  return {
    books: readBooks.length,
    years: years.length ? Math.max(...years) - Math.min(...years) + 1 : 0,
    genres: genres.size,
    authorsRevisited: Array.from(authorCounts.values()).filter((c) => c >= 2).length,
    currentRead: currentRead?.title ?? "",
  };
}
