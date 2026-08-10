"use client";

import { Home, Search, BarChart3, Cpu, Image, Activity, GitBranch, Database, Layout } from "lucide-react";
import { CaseStudyLayout } from "@/components/case-study/case-study-layout";
import { HeroWithStats } from "@/components/case-study/hero-with-stats";
import { ProductTour } from "@/components/case-study/product-tour";
import { PhoneMockup } from "./visual-components";
import { victoryVisionConfig } from "@/components/case-study/victory-vision.config";
import type { Project } from "@/types";

const filenames = [
  "Home screen.jpg",
  "Predictions.jpg",
  "Ai Generated Teams.jpg",
  "Expert Analysis.jpg",
  "Fantasy Points Tacker.jpg",
  "Reports.jpg",
];

const img = (index: number) => `/images/projects/Victory%20Vision/${encodeURIComponent(filenames[index])}`;

const tourFeatures = [
  { id: "home", number: "01", label: "Home", icon: <Home size={14} />, title: "App Home Screen", tagline: "Today's matches at a glance", screenshot: 0, description: "Match listing with today/upcoming tabs. Users pick a match to open the intelligence hub, or jump straight into AI team generation." },
  { id: "predictions", number: "02", label: "Predictions", icon: <BarChart3 size={14} />, title: "Match Intelligence Hub", tagline: "Toss, score, and top players predicted", screenshot: 1, description: "AI-calculated toss winner probability, predicted first-innings score, and top batsman/bowler projections in a swipeable tab view alongside AI teams and lineups." },
  { id: "ai-teams", number: "03", label: "AI Teams", icon: <Cpu size={14} />, title: "AI Team Generation", tagline: "Paired safe and risky teams", screenshot: 2, description: "Users configure match, contest type, and risk level. The AI produces paired safe (green) and risky (orange) teams with role distribution and win rate projections." },
  { id: "analysis", number: "04", label: "Expert Analysis", icon: <Image size={14} />, title: "Fantasy Screenshot Analysis", tagline: "AI feedback on any Dream11 team", screenshot: 3, description: "Upload a team screenshot via document picker. The AI returns a structured breakdown — points, captain evaluation, and improvement suggestions in a 2-column grid." },
  { id: "tracker", number: "05", label: "Points Tracker", icon: <Activity size={14} />, title: "Fantasy Points Tracker", tagline: "Live points for every selection", screenshot: 4, description: "Track fantasy points earned per match and per player, so users always know how their picks are performing in real time." },
  { id: "reports", number: "06", label: "Reports", icon: <BarChart3 size={14} />, title: "Performance Dashboard", tagline: "Net profit, win rate, and captain analysis", screenshot: 5, description: "Three sections — Performance Summary, Top Player Picks, and Captain Analysis — all fed from a single API endpoint via the global context." },
];

interface VictoryVisionPageProps {
  project: Project;
}

export function VictoryVisionPage({ project }: VictoryVisionPageProps) {
  const config = victoryVisionConfig;

  return (
    <CaseStudyLayout
      config={config}
      project={project}
      customHero={
        <HeroWithStats
          project={project}
          badgeLabel="Mobile App"
          platform="iOS + Android"
          statChips={[
            { label: "App Screens", value: 10, suffix: "", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg> },
            { label: "Components", value: 22, suffix: "+", icon: <GitBranch size={14} /> },
            { label: "API Endpoints", value: 15, suffix: "+", icon: <Database size={14} /> },
            { label: "Nav Groups", value: 2, suffix: "", icon: <Layout size={14} /> },
            { label: "Theme Zones", value: 2, suffix: "", icon: <Activity size={14} /> },
            { label: "Custom Icons", value: 11, suffix: "", icon: <Image size={14} /> },
          ]}
          floatingCards={[
            { label: "App Screens", value: "10", color: "text-accent", delay: 0, side: "right", top: "8%" },
            { label: "Reusable Components", value: "22+", color: "text-emerald-400", delay: 0.3, side: "left", top: "22%" },
            { label: "API Endpoints", value: "15+", color: "text-amber-400", delay: 0.6, side: "right", top: "52%" },
            { label: "Theme Zones", value: "2", color: "text-emerald-400", delay: 0.9, side: "left", top: "68%" },
          ]}
          phoneImage={
            <PhoneMockup gradient="from-blue-500/20 via-indigo-500/10 to-blue-500/10">
              <img src={img(0)} alt="Victory Vision Home" className="h-full w-full object-cover" />
            </PhoneMockup>
          }
        />
      }
      afterStory={
        <ProductTour
          features={tourFeatures}
          label="Experience the App"
          title="App Experience"
          subtitle="Walk through the screens that ship the experience"
          renderPhone={(f) => (
            <PhoneMockup gradient="from-blue-500/20 via-indigo-500/10 to-blue-500/10">
              <img src={img(f.screenshot as number)} alt={f.label} className="h-full w-full object-cover" />
            </PhoneMockup>
          )}
        />
      }
    />
  );
}
