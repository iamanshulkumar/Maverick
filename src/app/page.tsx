import { Hero } from "@/components/sections/hero";
import { WhatMakesMeDifferent } from "@/components/sections/differentiators";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { InteractiveTimeline } from "@/components/sections/interactive-timeline";
import { TechnicalExpertise } from "@/components/sections/skills-grid";
import { Achievements } from "@/components/sections/achievements";
import { FeaturedEngineering } from "@/components/sections/github-preview";
import { FeaturedTechnologies } from "@/components/sections/featured-technologies";
import { BlogPreview } from "@/components/sections/blog-preview";
import { ContactSection } from "@/components/sections/contact-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatMakesMeDifferent />
      <FeaturedProjects />
      <Achievements />
      <InteractiveTimeline />
      <TechnicalExpertise />
      <FeaturedEngineering />
      <FeaturedTechnologies />
      <BlogPreview />
      <ContactSection />
    </>
  );
}
