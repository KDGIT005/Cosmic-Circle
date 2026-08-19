"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { recentConsultation } from "@/data/mock";
import PersonaSwitcher from "@/components/persona-switcher";
import BottomNav from "@/components/bottom-nav";
import { ArrowLeft, Star, Clock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function ConsultationPage() {
  const router = useRouter();
  const c = recentConsultation;

  return (
    <>
      <div className="px-5 pt-12 pb-4">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push("/")}
          className="mb-4 flex items-center gap-1.5 text-sm text-charcoal-light transition-colors hover:text-charcoal"
        >
          <ArrowLeft size={16} />
          Back
        </motion.button>

        {/* Consultation Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="card-premium mb-5"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-light text-2xl">
              🧔🏽
            </div>
            <div>
              <p className="text-base font-semibold text-charcoal">{c.astrologerName}</p>
              <p className="text-xs text-charcoal-light">{c.astrologerSpecialty}</p>
              <div className="mt-1 flex items-center gap-3 text-xs text-charcoal-light">
                <span className="flex items-center gap-1">
                  <Clock size={11} /> {c.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Star size={11} className="fill-gold text-gold" /> {c.rating}
                </span>
                <span>Today</span>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-cream-dark px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-light mb-1.5">
              Topic
            </p>
            <p className="text-sm font-medium text-charcoal">{c.topic}</p>
          </div>
        </motion.div>

        {/* Key Insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-5"
        >
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-charcoal-light">
            Key Insight
          </h2>
          <div className="card-premium">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-lavender-light">
                <Sparkles size={14} className="text-indigo" />
              </div>
              <span className="text-xs font-medium text-indigo">Astrologer&apos;s Takeaway</span>
            </div>
            <p className="text-sm leading-relaxed text-charcoal">{c.keyInsight}</p>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-charcoal/5" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-cream px-3 text-xs text-charcoal-light">✦</span>
          </div>
        </div>

        {/* Circle Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="card-premium-gold">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-lg">💛</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-gold">
                Cosmic Circle
              </span>
            </div>
            <p className="mb-1 font-serif text-lg font-medium leading-snug text-charcoal">
              See how this connects to your relationship with Mom.
            </p>
            <p className="mb-4 text-sm leading-relaxed text-charcoal-light">
              Your relationship with Mom has an upcoming high-impact period. Unlock your shared
              forecast together.
            </p>
            <Link
              href="/create-circle"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-gold/90 active:scale-95"
            >
              Start a Circle with Mom
              <Sparkles size={14} />
            </Link>
          </div>
        </motion.div>
      </div>

      <PersonaSwitcher />
      <BottomNav />
    </>
  );
}
