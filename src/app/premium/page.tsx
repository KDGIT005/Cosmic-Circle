"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PersonaSwitcher from "@/components/persona-switcher";
import BottomNav from "@/components/bottom-nav";
import { ArrowLeft, Check, X, Crown, FileText, Calendar, Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const freeFeatures = [
  { text: "Monthly headline forecast", included: true },
  { text: "Shared insight on unlock", included: true },
  { text: "Relationship tone indicators", included: true },
];

const premiumFeatures = [
  { text: "Day-by-day relationship guidance", included: true },
  { text: "Full synastry report (both charts)", included: true },
  { text: "Joint consultation with astrologer", included: true },
  { text: "Unlimited Circles (5+ relationships)", included: true },
  { text: "Priority astrologer matching", included: true },
];

export default function PremiumPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("yearly");
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <>
      <div className="px-5 pt-12 pb-4">
        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-1.5 text-sm text-charcoal-light transition-colors hover:text-charcoal"
        >
          <ArrowLeft size={16} />
          Back
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-light">
            <Crown size={24} className="text-gold" />
          </div>
          <h1 className="mb-1 font-serif text-2xl font-medium text-charcoal">
            AstroLive Premium
          </h1>
          <p className="text-sm text-charcoal-light leading-relaxed">
            Free shows you the headline. The full report — day-by-day guidance, both charts read
            together — is part of Premium.
          </p>
        </motion.div>

        {/* What You Get Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-5"
        >
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-charcoal-light">
            What&apos;s Behind Premium
          </h2>

          {/* Report Preview Card */}
          <div className="card-premium mb-3 relative overflow-hidden">
            <div className="flex items-start gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo/5">
                <FileText size={18} className="text-indigo" />
              </div>
              <div>
                <p className="text-sm font-semibold text-charcoal">Full Synastry Report</p>
                <p className="text-xs text-charcoal-light">12-page personalized analysis</p>
              </div>
            </div>
            {/* Simulated report preview */}
            <div className="rounded-xl bg-cream-dark p-3 space-y-2">
              <div className="h-3 w-3/4 rounded bg-charcoal/10" />
              <div className="h-3 w-full rounded bg-charcoal/8" />
              <div className="h-3 w-5/6 rounded bg-charcoal/6" />
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-lavender-light/50 p-2">
                  <div className="h-2 w-1/2 rounded bg-indigo/20 mb-1" />
                  <div className="h-2 w-full rounded bg-indigo/10" />
                </div>
                <div className="rounded-lg bg-gold-light/50 p-2">
                  <div className="h-2 w-2/3 rounded bg-gold/20 mb-1" />
                  <div className="h-2 w-full rounded bg-gold/10" />
                </div>
              </div>
              <div className="blur-lock pt-2">
                <div className="h-3 w-full rounded bg-charcoal/8" />
                <div className="h-3 w-4/5 rounded bg-charcoal/6 mt-1" />
              </div>
            </div>
          </div>

          {/* Joint Consultation Preview */}
          <div className="card-premium relative overflow-hidden">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-dusty-rose-light">
                <Calendar size={18} className="text-dusty-rose" />
              </div>
              <div>
                <p className="text-sm font-semibold text-charcoal">Joint Consultation</p>
                <p className="text-xs text-charcoal-light">
                  Both of you + one astrologer, live on video
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-5"
        >
          <div className="card-premium !p-0 overflow-hidden">
            {/* Free Tier */}
            <div className="px-4 py-3 border-b border-charcoal/5">
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-light mb-2">
                Free
              </p>
              {freeFeatures.map((f, i) => (
                <div key={i} className="flex items-center gap-2 py-1">
                  <Check size={14} className="text-green-500" />
                  <span className="text-sm text-charcoal">{f.text}</span>
                </div>
              ))}
            </div>
            {/* Premium Tier */}
            <div className="px-4 py-3 bg-gold-light/20">
              <div className="flex items-center gap-2 mb-2">
                <Crown size={12} className="text-gold" />
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                  Premium
                </p>
              </div>
              {premiumFeatures.map((f, i) => (
                <div key={i} className="flex items-center gap-2 py-1">
                  <Sparkles size={14} className="text-gold" />
                  <span className="text-sm text-charcoal">{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 space-y-3"
        >
          <button
            onClick={() => setSelectedPlan("yearly")}
            className={`card-premium w-full text-left transition-all ${
              selectedPlan === "yearly" ? "ring-2 ring-gold ring-offset-2" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-charcoal">Yearly</p>
                  <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-700">
                    Save 50%
                  </span>
                </div>
                <p className="text-xs text-charcoal-light">₹2,999/year · ₹250/month</p>
              </div>
              <div
                className={`h-5 w-5 rounded-full border-2 ${
                  selectedPlan === "yearly"
                    ? "border-gold bg-gold"
                    : "border-charcoal/20"
                } flex items-center justify-center`}
              >
                {selectedPlan === "yearly" && <Check size={12} className="text-white" />}
              </div>
            </div>
          </button>

          <button
            onClick={() => setSelectedPlan("monthly")}
            className={`card-premium w-full text-left transition-all ${
              selectedPlan === "monthly" ? "ring-2 ring-gold ring-offset-2" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-charcoal">Monthly</p>
                <p className="text-xs text-charcoal-light">₹499/month</p>
              </div>
              <div
                className={`h-5 w-5 rounded-full border-2 ${
                  selectedPlan === "monthly"
                    ? "border-gold bg-gold"
                    : "border-charcoal/20"
                } flex items-center justify-center`}
              >
                {selectedPlan === "monthly" && <Check size={12} className="text-white" />}
              </div>
            </div>
          </button>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {!showSuccess ? (
            <button
              onClick={() => setShowSuccess(true)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gold py-4 text-sm font-semibold text-white transition-all hover:bg-gold/90 active:scale-[0.98] animate-pulse-glow"
            >
              <Crown size={16} />
              Start 7-day free trial
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl bg-green-50 py-4 text-center"
            >
              <p className="text-sm font-semibold text-green-700">
                ✨ Trial activated! (demo)
              </p>
            </motion.div>
          )}
          <p className="mt-3 text-center text-[11px] text-charcoal-light">
            Cancel anytime. No charge during trial period.
          </p>
        </motion.div>
      </div>

      <PersonaSwitcher />
      <BottomNav />
    </>
  );
}
