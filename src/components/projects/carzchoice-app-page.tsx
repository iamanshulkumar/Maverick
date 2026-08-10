"use client";

import { Smartphone, Users, Home, Search, Car, MessageCircle, TrendingUp, Banknote, BarChart3, Eye, GitBranch, Globe, Zap, Activity } from "lucide-react";
import { CaseStudyLayout } from "@/components/case-study/case-study-layout";
import { HeroWithStats } from "@/components/case-study/hero-with-stats";
import { ProductTour } from "@/components/case-study/product-tour";
import { PhoneMockup } from "./visual-components";
import { carzchoiceAppConfig } from "@/components/case-study/carzchoice-app.config";
import type { Project } from "@/types";

const filenames = [
  "Screenshot_2025-05-22-12-17-03-07_501ba508f8141345221d188b83acfffc.jpg",
  "Screenshot_2025-05-22-12-17-21-18_501ba508f8141345221d188b83acfffc.jpg",
  "Screenshot_2025-05-22-12-17-52-95_501ba508f8141345221d188b83acfffc.jpg",
  "Screenshot_2025-05-22-12-18-14-26_501ba508f8141345221d188b83acfffc.jpg",
  "Screenshot_2025-05-22-12-18-33-59_501ba508f8141345221d188b83acfffc.jpg",
  "Screenshot_2025-05-22-12-18-38-18_501ba508f8141345221d188b83acfffc.jpg",
  "Screenshot_2025-05-22-12-18-43-17_501ba508f8141345221d188b83acfffc.jpg",
  "Screenshot_2025-05-22-12-18-51-40_501ba508f8141345221d188b83acfffc.jpg",
  "Screenshot_2025-05-22-12-19-08-18_501ba508f8141345221d188b83acfffc.jpg",
  "Screenshot_2025-05-22-12-19-18-36_501ba508f8141345221d188b83acfffc.jpg",
  "Screenshot_2025-05-22-12-19-30-67_501ba508f8141345221d188b83acfffc.jpg",
  "Screenshot_2025-05-22-12-19-46-40_501ba508f8141345221d188b83acfffc.jpg",
  "Screenshot_2025-05-22-12-19-56-92_501ba508f8141345221d188b83acfffc.jpg",
  "Screenshot_2025-05-22-12-20-08-26_501ba508f8141345221d188b83acfffc.jpg",
  "Screenshot_2025-05-22-12-20-18-51_501ba508f8141345221d188b83acfffc.jpg",
  "Screenshot_2025-05-22-12-20-47-97_501ba508f8141345221d188b83acfffc.jpg",
  "Screenshot_2025-05-22-12-21-07-08_501ba508f8141345221d188b83acfffc.jpg",
  "Screenshot_2025-05-22-12-21-46-57_501ba508f8141345221d188b83acfffc.jpg",
  "Screenshot_2025-05-22-12-25-59-09_501ba508f8141345221d188b83acfffc.jpg",
  "Screenshot_2025-05-22-12-26-44-52_501ba508f8141345221d188b83acfffc.jpg",
  "Screenshot_2025-05-22-13-28-02-57_501ba508f8141345221d188b83acfffc.jpg",
];

const img = (index: number) => `/images/projects/NEW%20CarzChoice%20App%20UI/${encodeURIComponent(filenames[index])}`;

const tourFeatures = [
  { id: "home", number: "01", label: "Home", icon: <Home size={14} />, title: "App Home Screen", tagline: "Browse, search, and discover instantly", screenshot: 0, description: "Clean home screen with multi-attribute search, city selector, and personalized car recommendations based on browsing history." },
  { id: "browse", number: "02", label: "Browse", icon: <Search size={14} />, title: "Smart Car Browsing", tagline: "6 filter dimensions for precise discovery", screenshot: 2, description: "Multi-attribute filter engine with brand, budget, fuel, transmission, color, and city dimensions. Results update in real-time as filters change." },
  { id: "listings", number: "03", label: "Listings", icon: <Car size={14} />, title: "Car Listings Grid", tagline: "Infinite scroll with 6 items per batch", screenshot: 3, description: "Infinite-scroll results grid optimized for mobile data consumption. Each card shows photo, title, price, year, fuel type, and location at a glance." },
  { id: "detail", number: "04", label: "Car Details", icon: <Smartphone size={14} />, title: "Comprehensive Vehicle View", tagline: "Gallery, specs, and dealer info in one scroll", screenshot: 4, description: "Full detail page with Reanimated image carousel, 12 attribute display, features/specs accordions, EMI calculator, and one-tap chat." },
  { id: "gallery", number: "05", label: "Gallery", icon: <Activity size={14} />, title: "Image Gallery", tagline: "Smooth, gesture-driven car photos", screenshot: 5, description: "Reanimated-powered gallery with auto-play, gesture snapping, loop support, and pinch-to-zoom at 60fps." },
  { id: "chat", number: "06", label: "Chat", icon: <MessageCircle size={14} />, title: "Real-Time Dealer Chat", tagline: "Instant communication with push notifications", screenshot: 8, description: "Stream Chat integration with push notifications. Auto-first message with contact details. Unread count badges and message grouping." },
  { id: "sell", number: "07", label: "Sell Wizard", icon: <TrendingUp size={14} />, title: "3-Step Vehicle Listing", tagline: "List your car in under 5 minutes", screenshot: 10, description: "Guided wizard with progressive validation. Cascading Brand/Model/Variant pickers. Native camera/gallery integration for vehicle photos." },
  { id: "dealer", number: "08", label: "Dealer Platform", icon: <Users size={14} />, title: "Dealer Registration", tagline: "Business verification on mobile", screenshot: 12, description: "Dealer registration with business details, multi-brand selection, document upload via camera, and lead management dashboard." },
  { id: "finance", number: "09", label: "Financing", icon: <Banknote size={14} />, title: "Loans & EMI Calculator", tagline: "6 partner banks, one tap away", screenshot: 14, description: "Integrated loan applications, insurance enquiries, and EMI calculator with debounced sliders. Formik + Yup validation ensures error-free submissions." },
  { id: "dashboard", number: "10", label: "Dashboard", icon: <BarChart3 size={14} />, title: "User Dashboard", tagline: "My vehicles, chat, and settings", screenshot: 16, description: "Personal dashboard showing my vehicles, saved searches, chat history, and account settings in a unified interface." },
];

interface CarzchoiceAppPageProps {
  project: Project;
}

export function CarzchoiceAppPage({ project }: CarzchoiceAppPageProps) {
  const config = carzchoiceAppConfig;

  return (
    <CaseStudyLayout
      config={config}
      project={project}
      customHero={
        <HeroWithStats
          project={project}
          badgeLabel="Mobile App"
          platform="Android"
          statChips={[
            { label: "App Screens", value: 21, suffix: "", icon: <Smartphone size={14} /> },
            { label: "Components", value: 21, suffix: "", icon: <GitBranch size={14} /> },
            { label: "Cities", value: 11, suffix: "", icon: <Globe size={14} /> },
            { label: "Partners", value: 6, suffix: "", icon: <Banknote size={14} /> },
            { label: "Users", value: 2, suffix: "", icon: <Users size={14} /> },
            { label: "Notifications", value: 1, suffix: "", icon: <Zap size={14} /> },
          ]}
          floatingCards={[
            { label: "Total Listings", value: "10K+", color: "text-accent", delay: 0, side: "right", top: "8%" },
            { label: "Active Dealers", value: "500+", color: "text-emerald-400", delay: 0.3, side: "left", top: "22%" },
            { label: "Chat Messages", value: "50K+", color: "text-amber-400", delay: 0.6, side: "right", top: "52%" },
            { label: "Push Delivered", value: "95%", color: "text-emerald-400", delay: 0.9, side: "left", top: "68%" },
          ]}
          phoneImage={
            <PhoneMockup gradient="from-orange-500/20 via-amber-500/10 to-orange-500/10">
              <img src={img(1)} alt="CarzChoice App Home" className="h-full w-full object-cover" />
            </PhoneMockup>
          }
        />
      }
      afterStory={
        <ProductTour
          features={tourFeatures}
          label="Experience the App"
          title="App Experience"
          subtitle="Scroll to walk through every screen"
          renderPhone={(f) => (
            <PhoneMockup gradient="from-orange-500/20 via-amber-500/10 to-orange-500/10">
              <img src={img(f.screenshot as number)} alt={f.label} className="h-full w-full object-cover" />
            </PhoneMockup>
          )}
        />
      }
    />
  );
}
