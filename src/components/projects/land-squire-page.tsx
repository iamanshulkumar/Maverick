"use client";

import { Home, Search, Map, Activity, Building2, BarChart3, Users, Banknote, Globe, GitBranch, Database } from "lucide-react";
import { CaseStudyLayout } from "@/components/case-study/case-study-layout";
import { HeroWithStats } from "@/components/case-study/hero-with-stats";
import { ProductTour } from "@/components/case-study/product-tour";
import { PhoneMockup } from "./visual-components";
import { landSquireConfig } from "@/components/case-study/land-squire.config";
import type { Project } from "@/types";

const filenames = [
  "Home.jpg",
  "Map View.jpg",
  "Search property.jpg",
  "Filter by interest.jpg",
  "Property Details.jpg",
  "Broker listings.jpg",
  "My Properties.jpg",
  "CRM panel.jpg",
  "Sell-Rent.jpg",
];

const img = (index: number) => `/images/projects/Land%20Squire%20App/${encodeURIComponent(filenames[index])}`;

const tourFeatures = [
  { id: "home", number: "01", label: "Home", icon: <Home size={14} />, title: "App Home Screen", tagline: "Discovery starts here", screenshot: 0, description: "Clean, map-first home screen that orients buyers around available properties. Role-aware content renders based on the logged-in user type." },
  { id: "map", number: "02", label: "Map Discovery", icon: <Map size={14} />, title: "Map-Based Property Discovery", tagline: "Find properties where they actually are", screenshot: 1, description: "Properties render directly on an interactive Google Map as custom price tag markers. Viewport culling with a 50% buffer prevents rendering thousands of markers at once." },
  { id: "search", number: "03", label: "Search", icon: <Search size={14} />, title: "Smart Property Search", tagline: "Multi-attribute search in seconds", screenshot: 2, description: "Search across property types, cities, budgets, and more. Google Places Autocomplete with session tokens resolves addresses accurately." },
  { id: "filter", number: "04", label: "Filters", icon: <Activity size={14} />, title: "Filter by Interest", tagline: "Narrow results by what matters", screenshot: 3, description: "Filter properties by type, price range, status, and location. Filter state lives in a shared hook so map and list views stay in sync." },
  { id: "details", number: "05", label: "Property Details", icon: <Building2 size={14} />, title: "Comprehensive Property View", tagline: "Gallery, amenities, and pricing in one scroll", screenshot: 4, description: "15 sub-components render gallery, videos, amenities, and price history. Defensive parsing handles inconsistent API response formats without crashes." },
  { id: "broker", number: "06", label: "Broker Listings", icon: <BarChart3 size={14} />, title: "Broker Property Listings", tagline: "Manage inventory on the go", screenshot: 5, description: "Brokers browse, edit, and toggle bidding on their listed properties. Status tracking and direct call/WhatsApp actions keep pipeline moving." },
  { id: "properties", number: "07", label: "My Properties", icon: <Home size={14} />, title: "My Properties Dashboard", tagline: "Every listing in one place", screenshot: 6, description: "Sellers and brokers manage all owned properties with quick access to enquiries, bids, and listing status." },
  { id: "crm", number: "08", label: "CRM", icon: <Users size={14} />, title: "Broker CRM Panel", tagline: "Every lead, every follow-up", screenshot: 7, description: "Full lead management with filters (city, date range, property type, status), follow-up timeline with notes, and 5 lead statuses from new to won." },
  { id: "sell", number: "09", label: "Sell / Rent", icon: <Banknote size={14} />, title: "Multi-Step Sell & Rent Wizard", tagline: "List a property in minutes", screenshot: 8, description: "Guided 4-step (sell) and 3-step (rent) wizards with progressive validation. Media uploads support images, videos, PDFs, and master plans with MIME validation." },
];

interface LandSquirePageProps {
  project: Project;
}

export function LandSquirePage({ project }: LandSquirePageProps) {
  const config = landSquireConfig;

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
            { label: "Screens", value: 25, suffix: "+", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg> },
            { label: "Components", value: 35, suffix: "+", icon: <GitBranch size={14} /> },
            { label: "API Endpoints", value: 35, suffix: "+", icon: <Database size={14} /> },
            { label: "User Roles", value: 3, suffix: "", icon: <Users size={14} /> },
            { label: "Translations", value: 130, suffix: "+", icon: <Globe size={14} /> },
            { label: "Custom Icons", value: 54, suffix: "", icon: <Activity size={14} /> },
          ]}
          floatingCards={[
            { label: "API Endpoints", value: "35+", color: "text-accent", delay: 0, side: "right", top: "8%" },
            { label: "Reusable Components", value: "35+", color: "text-emerald-400", delay: 0.3, side: "left", top: "22%" },
            { label: "i18n Translations", value: "130+", color: "text-amber-400", delay: 0.6, side: "right", top: "52%" },
            { label: "User Roles", value: "3", color: "text-emerald-400", delay: 0.9, side: "left", top: "68%" },
          ]}
          phoneImage={
            <PhoneMockup gradient="from-emerald-500/20 via-green-500/10 to-emerald-500/10">
              <img src={img(1)} alt="Land Squire Map View" className="h-full w-full object-cover" />
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
            <PhoneMockup gradient="from-emerald-500/20 via-green-500/10 to-emerald-500/10">
              <img src={img(f.screenshot as number)} alt={f.label} className="h-full w-full object-cover" />
            </PhoneMockup>
          )}
        />
      }
    />
  );
}
