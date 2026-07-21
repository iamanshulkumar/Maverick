"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Users, Settings, LineChart, Bell, Shield, Activity } from "lucide-react";

const img = (name: string) => `/images/projects/Ai%20analyser/admin%20panel/${name.replace(/ /g, "%20").replace(/&/g, "%26").replace(/\(/g, "%28").replace(/\)/g, "%29")}`;

interface AdminScreen {
  label: string;
  category: string;
  icon: React.ReactNode;
  context: string;
  why: string;
  file: string;
}

const adminScreens: AdminScreen[] = [
  { label: "Dashboard", category: "Overview", icon: <Activity size={14} />, context: "Real-time platform health: active users, strategy deployments, system metrics, and error rates at a glance.", why: "Operators need immediate visibility into platform health without digging through logs.", file: "Admin panel Dashboard.png" },
  { label: "User Management", category: "Users", icon: <Users size={14} />, context: "Full CRUD for platform users with role-based access control (admin, operator, viewer).", why: "Trading platforms require strict access control. Operators manage users who can deploy strategies, not just view them.", file: "Users (CRUD).png" },
  { label: "Add New User", category: "Users", icon: <Users size={14} />, context: "User creation with role assignment, broker linking, and initial risk limits configuration.", why: "New traders need broker accounts linked and risk boundaries set before their first trade.", file: "Add new User.png" },
  { label: "Edit User", category: "Users", icon: <Users size={14} />, context: "Modify permissions, adjust risk limits, update broker connections, or suspend accounts.", why: "Risk limits need adjustment as users prove (or fail) their trading discipline.", file: "Edit User.png" },
  { label: "View User", category: "Users", icon: <Users size={14} />, context: "Detailed user profile with trade history, strategy performance, and activity timeline.", why: "Support and risk teams need full context when investigating user issues.", file: "View User.png" },
  { label: "Create Strategy", category: "Strategies", icon: <Settings size={14} />, context: "Admin can create strategies on behalf of users, configure entry/exit conditions and risk params.", why: "Not all users can configure strategies correctly. Admin creation ensures safe parameters.", file: "Create new strategy.png" },
  { label: "Edit Strategy", category: "Strategies", icon: <Settings size={14} />, context: "Modify running strategies — adjust conditions, pause execution, or force-close positions.", why: "Operators need emergency override capability to pause or modify strategies during volatile markets.", file: "Edit strategy.png" },
  { label: "AI Strategy", category: "Strategies", icon: <Settings size={14} />, context: "AI-assisted strategy generation. Claude proposes strategy parameters based on user goals.", why: "Democratizes strategy creation — users without coding knowledge get AI-generated strategies.", file: "Ai Strategy.png" },
  { label: "Backtesting", category: "Analysis", icon: <LineChart size={14} />, context: "Admin overview of all user backtesting activity. Monitor system-wide backtest load and results.", why: "Backtesting is compute-intensive. Operators need visibility into resource usage across all users.", file: "Admin backtesting Strategies.png" },
  { label: "Back Test Runner", category: "Analysis", icon: <LineChart size={14} />, context: "Run and monitor individual backtests. View equity curves, drawdowns, and trade lists.", why: "Operators validate strategy changes by running backtests before approving live deployment.", file: "Back testing.png" },
  { label: "Trade Log", category: "Compliance", icon: <Shield size={14} />, context: "Immutable trade log showing every executed order with timestamps, prices, and broker confirmations.", why: "Regulatory compliance requires complete trade audit trails. Every order is logged immutably.", file: "Trade log.png" },
  { label: "Send Notification", category: "Communication", icon: <Bell size={14} />, context: "Compose and send push notifications to all users or targeted segments.", why: "Platform updates, maintenance windows, and market alerts need reliable push delivery.", file: "Send notification.png" },
  { label: "Firebase Notifications", category: "Communication", icon: <Bell size={14} />, context: "Firebase Cloud Messaging delivery management with delivery receipts and failure tracking.", why: "Push notification delivery is critical for trade alerts. Firebase provides reliable cross-platform delivery.", file: "Notifications with firebase.png" },
];

export function AdminSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = adminScreens[activeIndex];

  const prev = () => setActiveIndex((i) => (i === 0 ? adminScreens.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === adminScreens.length - 1 ? 0 : i + 1));

  return (
    <section id="admin" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">Operator Experience</h2>
          <p className="mt-2 text-sm text-muted-foreground">Web-based administration dashboard for platform management</p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 lg:grid-cols-5">
            {/* Screenshot */}
            <div className="lg:col-span-3">
              <div className="relative">
                <div className="flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative w-full max-w-[600px]">
                        <div className="relative rounded-xl border border-border bg-card p-2 shadow-2xl">
                          <div className="flex items-center gap-2 border-b border-border px-3 py-2">
                            <div className="flex gap-1.5">
                              <div className="h-3 w-3 rounded-full bg-red-500" />
                              <div className="h-3 w-3 rounded-full bg-amber-500" />
                              <div className="h-3 w-3 rounded-full bg-emerald-500" />
                            </div>
                            <span className="text-xs text-muted-foreground ml-2">Admin — {active.label}</span>
                          </div>
                          <div className="aspect-[16/10] w-full overflow-hidden rounded-lg bg-card">
                            <img src={img(active.file)} alt={active.label} className="h-full w-full object-cover" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <button onClick={prev} className="absolute -left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground transition-colors">
                  <ChevronLeft size={14} />
                </button>
                <button onClick={next} className="absolute -right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground transition-colors">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Context */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col justify-center h-full"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/10 text-accent">
                      {active.icon}
                    </div>
                    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{active.category}</span>
                  </div>
                  <h4 className="text-base font-bold text-foreground">{active.label}</h4>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{active.context}</p>
                  <div className="mt-3 rounded-lg border border-accent/10 bg-accent/[0.02] p-3">
                    <p className="text-[10px] font-medium text-accent uppercase tracking-wider">Why this exists</p>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{active.why}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="mt-6 flex justify-center gap-2 overflow-x-auto pb-2">
            {adminScreens.map((screen, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveIndex(i)}
                className={`shrink-0 rounded-lg border-2 transition-all duration-200 overflow-hidden ${
                  activeIndex === i ? "border-accent opacity-100" : "border-border opacity-40 hover:opacity-80"
                }`}
              >
                <div className="h-9 w-14 overflow-hidden bg-card flex items-center justify-center">
                  <img src={img(screen.file)} alt={screen.label} className="h-full w-full object-cover" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}