"use client";

import { Smartphone, Users, Home, Search, Car, MessageCircle, TrendingUp, Activity, GitBranch, Database, Clock, Zap } from "lucide-react";
import { CaseStudyLayout } from "@/components/case-study/case-study-layout";
import { HeroWithStats } from "@/components/case-study/hero-with-stats";
import { ProductTour } from "@/components/case-study/product-tour";
import { PhoneMockup } from "./visual-components";
import { carzchoiceOldAppConfig } from "@/components/case-study/carzchoice-old-app.config";
import type { Project } from "@/types";

const filenames = [
  "Screenshot_2025-05-22-12-03-30-08_ef152c3a50f29aeadc120659b7736e32.jpg",
  "Screenshot_2025-05-22-12-03-43-12_ef152c3a50f29aeadc120659b7736e32.jpg",
  "Screenshot_2025-05-22-12-03-50-85_ef152c3a50f29aeadc120659b7736e32.jpg",
  "Screenshot_2025-05-22-12-03-59-22_ef152c3a50f29aeadc120659b7736e32.jpg",
  "Screenshot_2025-05-22-12-04-11-30_ef152c3a50f29aeadc120659b7736e32.jpg",
  "Screenshot_2025-05-22-12-05-13-94_ef152c3a50f29aeadc120659b7736e32.jpg",
  "Screenshot_2025-05-22-12-05-54-79_ef152c3a50f29aeadc120659b7736e32.jpg",
  "Screenshot_2025-05-22-12-06-00-73_ef152c3a50f29aeadc120659b7736e32.jpg",
  "Screenshot_2025-05-22-12-06-04-60_ef152c3a50f29aeadc120659b7736e32.jpg",
  "Screenshot_2025-05-22-12-06-20-50_ef152c3a50f29aeadc120659b7736e32.jpg",
  "Screenshot_2025-05-22-12-06-41-98_ef152c3a50f29aeadc120659b7736e32.jpg",
  "Screenshot_2025-05-22-12-06-48-71_ef152c3a50f29aeadc120659b7736e32.jpg",
  "Screenshot_2025-05-22-12-06-56-08_ef152c3a50f29aeadc120659b7736e32.jpg",
  "Screenshot_2025-05-22-12-07-05-31_ef152c3a50f29aeadc120659b7736e32.jpg",
  "Screenshot_2025-05-22-12-07-11-42_ef152c3a50f29aeadc120659b7736e32.jpg",
  "Screenshot_2025-05-22-12-07-20-88_ef152c3a50f29aeadc120659b7736e32.jpg",
  "Screenshot_2025-05-22-12-08-50-99_ef152c3a50f29aeadc120659b7736e32.jpg",
  "Screenshot_2025-05-22-12-08-59-20_ef152c3a50f29aeadc120659b7736e32.jpg",
  "Screenshot_2025-05-22-12-09-12-50_ef152c3a50f29aeadc120659b7736e32.jpg",
  "Screenshot_2025-05-22-12-09-44-65_ef152c3a50f29aeadc120659b7736e32.jpg",
  "Screenshot_2025-05-22-12-09-57-92_ef152c3a50f29aeadc120659b7736e32.jpg",
  "Screenshot_2025-05-22-12-10-29-33_ef152c3a50f29aeadc120659b7736e32.jpg",
  "Screenshot_2025-05-22-12-10-37-10_ef152c3a50f29aeadc120659b7736e32.jpg",
];

const img = (index: number) => `/images/projects/OLD%20CarzChoice%20App%20UI/${encodeURIComponent(filenames[index])}`;

const tourFeatures = [
  { id: "listings", number: "01", label: "Listings", icon: <Search size={14} />, title: "Car Listings Grid", tagline: "Browse all listed cars at a glance", screenshot: 0, description: "Clean grid layout showing car photos, brand, price, and location. Simple filters for budget, brand, fuel type, and city." },
  { id: "browse", number: "02", label: "Browse", icon: <Car size={14} />, title: "Browse & Filter", tagline: "Find the right car quickly", screenshot: 1, description: "Browse cars with basic filters — no promoted listings, no dealer interference. Just real people selling their cars." },
  { id: "detail", number: "03", label: "Car Details", icon: <Smartphone size={14} />, title: "Vehicle Details", tagline: "Photos, specs, and seller info", screenshot: 3, description: "Minimal detail view showing car photos, key specs (year, fuel, KMs), seller info, and a direct Chat button." },
  { id: "photos", number: "04", label: "Photos", icon: <Activity size={14} />, title: "Photo Gallery", tagline: "See the car from every angle", screenshot: 4, description: "Swipeable photo gallery with seller-uploaded images. Multi-photo listings get 3x more buyer interest." },
  { id: "sell", number: "05", label: "Sell", icon: <TrendingUp size={14} />, title: "2-Step Sell Flow", tagline: "List your car in 2 minutes", screenshot: 6, description: "Straightforward sell form: upload photos, enter details (brand, model, year, price), add description, and publish. No multi-page wizards." },
  { id: "chat", number: "06", label: "Chat", icon: <MessageCircle size={14} />, title: "Direct Buyer-Seller Chat", tagline: "Negotiate directly, no middlemen", screenshot: 10, description: "In-app chat with push notifications. Buyers ask questions, negotiate price, and arrange viewing — all without leaving the app." },
  { id: "profile", number: "07", label: "Profiles", icon: <Users size={14} />, title: "User Profiles", tagline: "Trust through transparency", screenshot: 14, description: "Seller profiles show listing history, response time, and verification status. Verified phone badge builds buyer confidence." },
  { id: "manage", number: "08", label: "My Cars", icon: <Home size={14} />, title: "Manage Listings", tagline: "Edit, mark sold, or delete", screenshot: 18, description: "Dashboard showing all active and sold listings. Mark cars as sold, edit details, or remove listings with one tap." },
  { id: "messages", number: "09", label: "Messages", icon: <MessageCircle size={14} />, title: "Message Inbox", tagline: "All your conversations in one place", screenshot: 16, description: "Centralized inbox showing all buyer-seller conversations. Read receipts and typing indicators show engagement." },
  { id: "settings", number: "10", label: "Settings", icon: <Zap size={14} />, title: "Account Settings", tagline: "Manage your profile and preferences", screenshot: 22, description: "Profile management, notification preferences, phone verification, and account settings in a simple menu." },
];

interface CarzchoiceOldAppPageProps {
  project: Project;
}

export function CarzchoiceOldAppPage({ project }: CarzchoiceOldAppPageProps) {
  const config = carzchoiceOldAppConfig;

  return (
    <CaseStudyLayout
      config={config}
      project={project}
      customHero={
        <HeroWithStats
          project={project}
          badgeLabel="P2P Marketplace"
          platform="Android"
          statChips={[
            { label: "App Screens", value: 24, suffix: "", icon: <Smartphone size={14} /> },
            { label: "Components", value: 18, suffix: "", icon: <GitBranch size={14} /> },
            { label: "Endpoints", value: 15, suffix: "+", icon: <Database size={14} /> },
            { label: "Chat", value: 1, suffix: "", icon: <MessageCircle size={14} /> },
            { label: "Users", value: 1, suffix: "", icon: <Users size={14} /> },
            { label: "Timeline", value: 3, suffix: "mo", icon: <Clock size={14} /> },
          ]}
          floatingCards={[
            { label: "Active Listings", value: "5K+", color: "text-accent", delay: 0, side: "right", top: "8%" },
            { label: "Cars Sold", value: "2K+", color: "text-emerald-400", delay: 0.3, side: "left", top: "22%" },
            { label: "Chats Sent", value: "20K+", color: "text-amber-400", delay: 0.6, side: "right", top: "52%" },
            { label: "Response Rate", value: "92%", color: "text-emerald-400", delay: 0.9, side: "left", top: "68%" },
          ]}
          phoneImage={
            <PhoneMockup gradient="from-sky-500/20 via-blue-500/10 to-sky-500/10">
              <img src={img(0)} alt="OLD CarzChoice App" className="h-full w-full object-cover" />
            </PhoneMockup>
          }
        />
      }
      afterStory={
        <ProductTour
          features={tourFeatures}
          label="Explore the App"
          title="App Screens"
          subtitle="Scroll to walk through every screen"
          renderPhone={(f) => (
            <PhoneMockup gradient="from-sky-500/20 via-blue-500/10 to-sky-500/10">
              <img src={img(f.screenshot as number)} alt={f.label} className="h-full w-full object-cover" />
            </PhoneMockup>
          )}
        />
      }
    />
  );
}
