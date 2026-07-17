import projectsData from "@/content/projects.json";
import skillsData from "@/content/skills.json";
import experienceData from "@/content/experience.json";
import achievementsData from "@/content/achievements.json";
import timelineData from "@/content/timeline.json";
import type { Project, Skill, Experience, Achievement, TimelineEvent } from "@/types";

export function getProjects(): Project[] {
  return (projectsData as unknown as Project[]).filter((p) => p.published);
}

export function getFeaturedProjects(): Project[] {
  return getProjects()
    .filter((p) => p.featured)
    .sort((a, b) => (a.featuredIndex ?? 99) - (b.featuredIndex ?? 99));
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
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
