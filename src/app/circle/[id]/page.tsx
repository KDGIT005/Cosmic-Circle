"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/app-store";
import PersonaSwitcher from "@/components/persona-switcher";
import BottomNav from "@/components/bottom-nav";
import {
  ArrowLeft,
  Lock,
  ChevronDown,
  ChevronUp,
  Calendar,
  FileText,
  Sparkles,
  Bell,
  MessageCircle,
  Share2,
  Crown,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const toneStyles = {
  opportunity: { bg: "bg-green-50", text: "text-green-700", label: "Opportunity" },
  "gentle-caution": { bg: "bg-amber-50", text: "text-amber-700", label: "Gentle Caution" },
  milestone: { bg: "bg-indigo/5", text: "text-indigo", label: "Milestone" },
};

export default function CircleHomePage() {
  const router = useRouter();
  const { circle } = useAppStore();
  const [expandedForecast, setExpandedForecast] = useState<string | null>(null);
  const [copiedCard, setCopiedCard] = useState(false);

  useEffect(() => {
    if (!circle || circle.status !== "unlocked") {
      router.push("/");
    }
  }, [circle, router]);

  if (!circle || circle.status !== "unlocked") {
    return null;
  }

  const currentForecast = circle.monthlyForecast[0];
  const pastForecasts = circle.monthlyForecast.slice(1);
  const topNotification = circle.notifications[0];
  const nextInsightLabel = new Date(circle.nextInsightDate).toLocaleDateString("en", {
    month: "short",
    day: "numeric",
  });

  const handleCopyShareCard = () => {
    setCopiedCard(true);
    setTimeout(() => setCopiedCard(false), 2000);
  };

  return (
    <>
      <div className="px-5 pt-12 pb-4">
        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push("/")}
          className="mb-4 flex items-center gap-1.5 text-sm text-charcoal-light transition-colors hover:text-charcoal"
        >
          <ArrowLeft size={16} />
          Home
        </motion.button>

        {/* Circle Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lavender-light text-xl">
                  {circle.memberA.avatar}
                </div>
                <div className="absolute -bottom-1 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-gold-light text-base border-2 border-cream">
                  {circle.memberB?.avatar || "👩🏻‍🦱"}
                </div>
              </div>
              <div className="ml-2">
                <h1 className="text-lg font-semibold text-charcoal">
                  {circle.memberA.name} & {circle.memberBName}
                </h1>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-gold-light px-2 py-0.5 text-[10px] font-medium text-gold">
                    {circle.relationshipLabel}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-green-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {topNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-5 rounded-2xl px-4 py-3 text-white shadow-lg"
            style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 50%, #EC4899 100%)' }}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                <Bell size={15} />
              </div>
              <div>
                <p className="text-sm font-semibold">{topNotification.title}</p>
                <p className="text-xs leading-relaxed text-white/80">{topNotification.body}</p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mb-5 grid grid-cols-3 gap-2 text-center"
        >
          <div className="rounded-xl bg-green-50 px-2 py-3">
            <p className="text-sm font-semibold text-green-700">Joined</p>
            <p className="text-[10px] text-charcoal-light">{circle.memberBName} is in</p>
          </div>
          <div className="rounded-xl bg-gold-light px-2 py-3">
            <p className="text-sm font-semibold text-gold">Unlocked</p>
            <p className="text-[10px] text-charcoal-light">Full insight</p>
          </div>
          <div className="rounded-xl bg-white/70 px-2 py-3">
            <p className="text-sm font-semibold text-indigo">{nextInsightLabel}</p>
            <p className="text-[10px] text-charcoal-light">Next update</p>
          </div>
        </motion.div>

        {/* This Month's Forecast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-5"
        >
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-charcoal-light">
            This Month&apos;s Forecast
          </h2>
          <div className="card-premium-gold">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-medium text-charcoal-light">
                {currentForecast.month}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
                  toneStyles[currentForecast.tone].bg
                } ${toneStyles[currentForecast.tone].text}`}
              >
                {toneStyles[currentForecast.tone].label}
              </span>
            </div>
            <h3 className="mb-2 font-serif text-base font-medium leading-snug text-charcoal">
              {currentForecast.headline}
            </h3>
            <p className="text-sm leading-relaxed text-charcoal-light">{currentForecast.body}</p>
          </div>
        </motion.div>

        {/* Circle Health */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="mb-5"
        >
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-charcoal-light">
            Circle Health
          </h2>
          <div className="card-premium space-y-4">
            {circle.healthMetrics.map((metric) => (
              <div key={metric.id}>
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{metric.label}</p>
                    <p className="text-[11px] text-charcoal-light">{metric.note}</p>
                  </div>
                  <span className="text-sm font-semibold text-indigo">{metric.score}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-charcoal/10">
                  <div
                    className="h-full rounded-full bg-indigo"
                    style={{ width: `${metric.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          className="mb-5"
        >
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-charcoal-light">
            What To Do Now
          </h2>
          <div className="space-y-2">
            {circle.actionSuggestions.map((action) => (
              <div key={action.id} className="card-premium flex items-start gap-3 !p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lavender-light">
                  <MessageCircle size={16} className="text-indigo" />
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-charcoal">{action.title}</p>
                    <span className="shrink-0 rounded-full bg-gold-light px-2 py-0.5 text-[10px] font-medium text-gold">
                      {action.timing}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-charcoal-light">{action.body}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Shareable Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26 }}
          className="mb-5"
        >
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-charcoal-light">
            Shareable Insight
          </h2>
          <div className="rounded-2xl p-5 text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #1E1B2E 0%, #3B1D6E 50%, #5B2180 100%)' }}>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="font-serif text-xl font-medium">{circle.shareCard.title}</p>
                <p className="text-xs text-white/60">{circle.shareCard.subtitle}</p>
              </div>
              <Sparkles size={20} className="text-gold" />
            </div>
            <p className="mb-4 text-sm leading-relaxed">{circle.shareCard.caption}</p>
            <button
              onClick={handleCopyShareCard}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-semibold text-charcoal transition-all active:scale-[0.98]"
            >
              {copiedCard ? <Check size={16} className="text-green-600" /> : <Share2 size={16} />}
              {copiedCard ? "Copied" : "Share this insight"}
            </button>
          </div>
        </motion.div>

        {/* Past Insights Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-5"
        >
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-charcoal-light">
            Upcoming Months
          </h2>
          <div className="space-y-2">
            {pastForecasts.map((fc) => (
              <div key={fc.id} className="card-premium !p-0 overflow-hidden">
                <button
                  onClick={() =>
                    setExpandedForecast(expandedForecast === fc.id ? null : fc.id)
                  }
                  className="flex w-full items-center justify-between px-4 py-3.5 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        toneStyles[fc.tone].bg.replace("bg-", "bg-")
                      }`}
                      style={{
                        backgroundColor:
                          fc.tone === "opportunity"
                            ? "#16a34a"
                            : fc.tone === "gentle-caution"
                            ? "#d97706"
                            : "#5B4A8A",
                      }}
                    />
                    <div>
                      <p className="text-sm font-medium text-charcoal">{fc.month}</p>
                      <p className="text-xs text-charcoal-light line-clamp-1">{fc.headline}</p>
                    </div>
                  </div>
                  {expandedForecast === fc.id ? (
                    <ChevronUp size={16} className="text-charcoal-light" />
                  ) : (
                    <ChevronDown size={16} className="text-charcoal-light" />
                  )}
                </button>
                <AnimatePresence>
                  {expandedForecast === fc.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-charcoal/5 px-4 py-3">
                        <span
                          className={`mb-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${
                            toneStyles[fc.tone].bg
                          } ${toneStyles[fc.tone].text}`}
                        >
                          {toneStyles[fc.tone].label}
                        </span>
                        <p className="text-sm leading-relaxed text-charcoal-light">{fc.body}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Premium Locked Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <h2 className="text-xs font-semibold uppercase tracking-wider text-charcoal-light">
            Go Deeper
          </h2>

          {circle.premiumUpsells.map((item) => {
            const isConsult = item.id === "consult";
            const Icon = isConsult ? Calendar : item.id === "year" ? Crown : FileText;

            return (
              <button
                key={item.id}
                onClick={() => router.push(isConsult ? `/circle/${circle.id}/book` : "/premium")}
                className="card-premium group w-full text-left transition-all hover:shadow-lg relative overflow-hidden"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo/5">
                    <Icon size={18} className="text-indigo" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-charcoal">{item.title}</p>
                    <p className="text-xs leading-relaxed text-charcoal-light">{item.body}</p>
                    <p className="mt-2 text-xs font-semibold text-indigo">{item.cta}</p>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-light">
                    <Lock size={14} className="text-gold" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 animate-shimmer" />
              </button>
            );
          })}
        </motion.div>
      </div>

      <PersonaSwitcher />
      <BottomNav />
    </>
  );
}
