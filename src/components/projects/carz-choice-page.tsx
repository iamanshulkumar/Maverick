"use client";

import { Smartphone, Users, Home, MessageCircle, Banknote, Car, Search, TrendingUp, GitBranch, Database, Globe, Eye } from "lucide-react";
import { CaseStudyLayout } from "@/components/case-study/case-study-layout";
import { HeroWithStats } from "@/components/case-study/hero-with-stats";
import { ProductTour } from "@/components/case-study/product-tour";
import { carChoiceConfig } from "@/components/case-study/car-choice.config";
import type { Project } from "@/types";

const img = (name: string) => `/images/projects/Car%20choice%20website%20UI/${name.replace(/ /g, "%20")}`;

const tourFeatures = [
  { id: "home", number: "01", label: "Home", icon: <Home size={14} />, title: "Multi-Attribute Car Discovery", tagline: "Find any used car across 6 filter dimensions", screenshot: "Screenshot_1.jpg", description: "Banner carousels, brand grids, city-based browsing (11 Indian cities), and infinite-scroll results grid. Multi-attribute filters via bottom sheet with searchable FlatLists." },
  { id: "browse", number: "02", label: "Browse", icon: <Search size={14} />, title: "Smart Browsing & Filtering", tagline: "Brand, budget, fuel, transmission, color", screenshot: "Screenshot_5.jpg", description: "Six filter dimensions with cascading dropdowns. Searchable FlatList pickers. City-based browsing with GPS location detection persisted to AsyncStorage." },
  { id: "detail", number: "03", label: "Car Details", icon: <Car size={14} />, title: "Comprehensive Vehicle View", tagline: "Gallery, specs, features, and dealer info", screenshot: "Screenshot_8.jpg", description: "Reanimated image carousel with auto-play. 12 attribute display. Features and specs accordions as tabbed bottom sheets. EMI calculator via RBSheet." },
  { id: "chat", number: "04", label: "Real-Time Chat", icon: <MessageCircle size={14} />, title: "Stream Chat Integration", tagline: "Buyers and dealers connect instantly", screenshot: "Screenshot_12.jpg", description: "Stream Chat with server-generated tokens. Deterministic channel creation. First message auto-sent with buyer contact. All/Unread tabs with Today/Older grouping." },
  { id: "sell", number: "05", label: "Sell Wizard", icon: <TrendingUp size={14} />, title: "3-Step Vehicle Listing", tagline: "List your car in under 5 minutes", screenshot: "Screenshot_15.jpg", description: "Guided 3-step wizard with progressive validation. Brand/Model/Variant cascading. Multi-image upload with preview and delete. Per-step error catching." },
  { id: "dealer", number: "06", label: "Dealer Platform", icon: <Users size={14} />, title: "Dealer Registration & Management", tagline: "Business verification and lead management", screenshot: "Screenshot_18.jpg", description: "Dealer registration with business name, WhatsApp validation, multi-brand selection, document upload. Dealer profile with brand logos and office photos." },
  { id: "finance", number: "07", label: "Financing", icon: <Banknote size={14} />, title: "Loans, Insurance & EMI", tagline: "From browsing to financing in one flow", screenshot: "Screenshot_20.jpg", description: "6 partner banks integrated. Insurance enquiry with DateTimePicker. EMI calculator with debounced sliders. Formik + Yup forms with cascading pickers." },
];

interface CarzChoicePageProps {
  project: Project;
}

export function CarzChoicePage({ project }: CarzChoicePageProps) {
  const config = carChoiceConfig;

  return (
    <CaseStudyLayout
      config={config}
      project={project}
      customHero={
        <HeroWithStats
          project={project}
          badgeLabel="Featured Project"
          platform="iOS + Android"
          gradient="bg-gradient-to-br from-orange-800/20 via-background to-amber-500/5"
          statChips={[
            { label: "App Screens", value: 18, suffix: "", icon: <Smartphone size={14} /> },
            { label: "Components", value: 21, suffix: "", icon: <GitBranch size={14} /> },
            { label: "API Endpoints", value: 30, suffix: "+", icon: <Database size={14} /> },
            { label: "User Types", value: 2, suffix: "", icon: <Users size={14} /> },
            { label: "Cities", value: 11, suffix: "", icon: <Globe size={14} /> },
            { label: "Partners", value: 6, suffix: "", icon: <Banknote size={14} /> },
          ]}
          floatingCards={[
            { label: "Total Listings", value: "10K+", color: "text-accent", delay: 0, side: "right", top: "8%" },
            { label: "Active Dealers", value: "500+", color: "text-emerald-400", delay: 0.3, side: "left", top: "22%" },
            { label: "Chats Sent", value: "50K+", color: "text-amber-400", delay: 0.6, side: "right", top: "52%" },
            { label: "Cities Live", value: "11", color: "text-accent", delay: 0.9, side: "left", top: "68%" },
          ]}
          phoneImage={
            <div className="rounded-xl border border-border bg-card p-2 shadow-2xl">
              <div className="overflow-hidden rounded-lg">
                <img src={img("Screenshot_1.jpg")} alt="Carz Choice Home" className="w-full object-cover" />
              </div>
            </div>
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
            <div className="rounded-xl border-2 border-border bg-card p-2 shadow-2xl">
              <div className="overflow-hidden rounded-lg">
                <img src={img(f.screenshot as string)} alt={f.label} className="w-full object-cover" />
              </div>
            </div>
          )}
        />
      }
    />
  );
}
