"use client";

import { Activity, BarChart3, Zap, Search, Cpu, BookOpen, GitBranch, Smartphone, Fingerprint } from "lucide-react";
import { CaseStudyLayout } from "@/components/case-study/case-study-layout";
import { HeroWithStats } from "@/components/case-study/hero-with-stats";
import { ProductTour } from "@/components/case-study/product-tour";
import { PhoneMockup } from "./visual-components";
import { wealthWalkConfig } from "@/components/case-study/wealth-walk.config";
import type { Project } from "@/types";

const img = (name: string) => `/images/projects/Wealth%20Walk/${name.replace(/ /g, "%20")}`;

const tourFeatures = [
  { id: "dashboard", number: "01", label: "Dashboard", icon: <Activity size={14} />, title: "Live Market Dashboard", tagline: "Real-time portfolio and market overview", screenshot: "Home Screen.png", description: "Open positions, P&L tracking, market indices (NIFTY, Sensex, FX), and AI-curated news — all in a single scrollable feed." },
  { id: "portfolio", number: "02", label: "Portfolio", icon: <BarChart3 size={14} />, title: "Multi-Broker Portfolio", tagline: "All your holdings, one place", screenshot: "My Portfolio Overview.png", description: "Broker-agnostic portfolio sync with holdings, positions, and trade history aggregated from multiple accounts with sector-wise allocation." },
  { id: "signals", number: "03", label: "AI Signals", icon: <Zap size={14} />, title: "AI Trading Signals", tagline: "Explainable, not black-box", screenshot: "Signal details.png", description: "AI-generated signals with confidence scores, supporting rationale, and backtested performance across equity, derivatives, and FX." },
  { id: "discovery", number: "04", label: "Discovery", icon: <Search size={14} />, title: "Smart Stock Discovery", tagline: "Screeners, patterns, AI picks", screenshot: "Screener Results.png", description: "Multi-criteria screener with AI pattern recognition, category-wise browsing, and pre-built strategy templates." },
  { id: "algo", number: "05", label: "Algo Trading", icon: <Cpu size={14} />, title: "Algorithmic Trading", tagline: "Deploy strategies without coding", screenshot: "Algo Trading (Running Strategies).png", description: "Pre-built strategy templates configured via simple parameters. Cloud execution with 99.9% uptime and live monitoring." },
  { id: "education", number: "06", label: "Education", icon: <BookOpen size={14} />, title: "Structured Learning", tagline: "From basics to algo trading", screenshot: "Course detail page.png", description: "Complete curriculum with category-wise courses, video lessons, articles, and progress tracking from beginner to algorithmic trader." },
  { id: "broker", number: "07", label: "Broker", icon: <GitBranch size={14} />, title: "Broker Connection", tagline: "Connect, trade, track", screenshot: "Connect broker.png", description: "In-app broker connection with guided setup, one-tap order placement from signals, and full trade history with P&L per trade." },
];

interface WealthWalkPageProps {
  project: Project;
}

export function WealthWalkPage({ project }: WealthWalkPageProps) {
  const config = wealthWalkConfig;

  return (
    <CaseStudyLayout
      config={config}
      project={project}
      customHero={
        <HeroWithStats
          project={project}
          badgeLabel="Featured Project"
          platform="iOS + Android"
          statChips={[
            { label: "Screens", value: 40, suffix: "+", icon: <Smartphone size={14} /> },
            { label: "API Endpoints", value: 35, suffix: "+", icon: <BarChart3 size={14} /> },
            { label: "Broker Integrations", value: 3, suffix: "", icon: <GitBranch size={14} /> },
            { label: "User Auth Providers", value: 2, suffix: "", icon: <Fingerprint size={14} /> },
            { label: "Market Data Providers", value: 3, suffix: "+", icon: <Activity size={14} /> },
          ]}
          floatingCards={[
            { label: "Portfolio Value", value: "$12,450", color: "text-emerald-400", delay: 0, side: "right", top: "8%" },
            { label: "AI Signals Today", value: "156", color: "text-amber-400", delay: 0.3, side: "left", top: "22%" },
            { label: "Broker Integrations", value: "3", color: "text-accent", delay: 0.6, side: "right", top: "52%" },
            { label: "Screens Built", value: "40", color: "text-emerald-400", delay: 0.9, side: "left", top: "68%" },
          ]}
          phoneImage={
            <PhoneMockup gradient="from-emerald-500/20 via-amber-500/10 to-emerald-500/10">
              <img src={img("Home Screen.png")} alt="Wealth Walk Home" className="h-full w-full object-cover" />
            </PhoneMockup>
          }
        />
      }
      afterStory={
        <ProductTour
          features={tourFeatures}
          label="Experience the Platform"
          title="Product Experience"
          subtitle="Scroll to walk through every feature"
          renderPhone={(f) => (
            <PhoneMockup gradient="from-emerald-500/20 via-amber-500/10 to-emerald-500/10">
              <img src={img(f.screenshot as string)} alt={f.label} className="h-full w-full object-cover" />
            </PhoneMockup>
          )}
        />
      }
    />
  );
}
