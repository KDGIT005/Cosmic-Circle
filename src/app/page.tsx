"use client";

import Link from "next/link";
import { useAppStore } from "@/store/app-store";
import { recentConsultation, astrologerPicks } from "@/data/mock";
import BottomNav from "@/components/bottom-nav";
import PersonaSwitcher from "@/components/persona-switcher";
import {
  ChevronRight,
  Clock,
  Star,
  Sparkles,
  Lock,
  Check,
  Users,
  Bell,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HomePage() {
  const { activeUser, activePersona, circle, circleCreated, momProfileComplete } = useAppStore();

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const circleHref =
    circle?.status === "unlocked"
      ? `/circle/${circle.id}`
      : activePersona === "mom" && !momProfileComplete
      ? `/circle/${circle?.id}/join`
      : `/circle/${circle?.id}/teaser`;

  const homeAlert =
    circle?.status === "unlocked"
      ? circle.notifications[0]
      : circleCreated
      ? {
          title: activePersona === "mom" ? "Rhea invited you" : `Invite ${circle?.memberBName}`,
          body:
            activePersona === "mom"
              ? "Add your birth details to unlock the shared insight."
              : "Send the invite so your shared insight can open.",
        }
      : null;

  return (
    <>
      <div className="px-5 pt-12 pb-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-charcoal-light">{greeting()},</p>
              <h1 className="text-2xl font-semibold text-charcoal">
                {activeUser.name} <span className="inline-block animate-float">✨</span>
              </h1>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lavender-light text-xl">
              {activeUser.avatar}
            </div>
          </div>
        </motion.div>

        {circleCreated && homeAlert && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-6"
          >
            <Link href={circleHref}>
              <div className="rounded-2xl px-4 py-3 text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 50%, #EC4899 100%)' }}>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                    <Bell size={15} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{homeAlert.title}</p>
                    <p className="text-xs leading-relaxed text-white/80">{homeAlert.body}</p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Recent Consultation — only for Rhea */}
        {activePersona === "rhea" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-charcoal-light">
              Recent Consultation
            </h2>
            <Link href={`/consultation/${recentConsultation.id}`}>
              <div className="card-premium group cursor-pointer transition-all hover:shadow-lg">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-light text-lg">
                      🧔🏽
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-charcoal">
                        {recentConsultation.astrologerName}
                      </p>
                      <p className="text-xs text-charcoal-light">
                        {recentConsultation.astrologerSpecialty}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-charcoal-light transition-transform group-hover:translate-x-0.5"
                  />
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-lavender-light px-2.5 py-0.5 text-[11px] font-medium text-indigo">
                    {recentConsultation.topic}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-charcoal-light line-clamp-2">
                  {recentConsultation.keyInsight}
                </p>
                <div className="mt-3 flex items-center gap-3 text-xs text-charcoal-light">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {recentConsultation.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={12} className="fill-gold text-gold" />{" "}
                    {recentConsultation.rating}
                  </span>
                  <span>Today</span>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Your Circles Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-charcoal-light">
              Your Circles
            </h2>
            {circleCreated && (
              <span className="flex items-center gap-1 text-xs text-gold">
                <Sparkles size={12} /> Active
              </span>
            )}
          </div>

          <AnimatePresence mode="wait">
            {!circleCreated ? (
              /* Empty State */
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="card-premium flex flex-col items-center py-8 text-center"
              >
                <div className="relative mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lavender-light">
                    <Users size={28} className="text-indigo" />
                  </div>
                  <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-white text-xs">
                    +
                  </div>
                </div>
                <p className="mb-1 text-sm font-semibold text-charcoal">
                  Start your first Circle
                </p>
                <p className="mb-4 max-w-[240px] text-xs text-charcoal-light leading-relaxed">
                  Unlock shared relationship forecasts with someone who matters. Both of you need to join.
                </p>
                {activePersona === "rhea" && (
                  <Link
                    href="/create-circle"
                    className="rounded-full bg-indigo px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-indigo/90 active:scale-95"
                  >
                    Create a Circle
                  </Link>
                )}
              </motion.div>
            ) : (
              /* Circle Card */
              <motion.div
                key="circle"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Link
                  href={circleHref}
                >
                  <div className="card-premium-gold group cursor-pointer transition-all hover:shadow-lg">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-light text-lg">
                            💛
                          </div>
                          {circle?.status === "unlocked" && (
                            <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-green-500">
                              <Check size={10} className="text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-charcoal">
                            {activeUser.name} & {circle?.memberBName}
                          </p>
                          <p className="text-xs text-charcoal-light">
                            {circle?.relationshipLabel} Circle
                          </p>
                        </div>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                          circle?.status === "unlocked"
                            ? "bg-green-50 text-green-700"
                            : circle?.status === "pending_invitee"
                            ? "bg-gold-light text-gold"
                            : "bg-charcoal/5 text-charcoal-light"
                        }`}
                      >
                        {circle?.status === "unlocked"
                          ? "Active"
                          : circle?.status === "pending_invitee"
                          ? "Waiting"
                          : "Locked"}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-charcoal-light">
                      {circle?.status === "unlocked"
                        ? circle?.monthlyForecast[0]?.headline
                        : circle?.teaserInsight}
                    </p>
                    {circle?.status === "pending_invitee" && activePersona === "rhea" && (
                      <div className="mt-3 flex items-center gap-1.5 text-xs text-gold">
                        <Lock size={12} />
                        Waiting for {circle?.memberBName} to join
                      </div>
                    )}
                    {circle?.status === "pending_invitee" && activePersona === "mom" && (
                      <div className="mt-3 flex items-center gap-1.5 text-xs text-indigo font-medium">
                        <Sparkles size={12} />
                        Tap to add your details & unlock
                      </div>
                    )}
                    {circle?.status === "unlocked" && (
                      <div className="mt-3 flex items-center gap-1.5 text-xs text-indigo font-medium">
                        <Bell size={12} />
                        New action suggestions are ready
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Astrologer Picks — decorative */}
        {activePersona === "rhea" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-charcoal-light">
              Astrologers Online
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
              {astrologerPicks.map((ast) => (
                <div
                  key={ast.id}
                  className="card-premium flex min-w-[140px] flex-col items-center py-4 px-3 text-center"
                >
                  <div className="relative mb-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lavender-light text-2xl">
                      {ast.avatar}
                    </div>
                    {ast.online && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-400" />
                    )}
                  </div>
                  <p className="text-xs font-semibold text-charcoal line-clamp-1">{ast.name}</p>
                  <p className="text-[10px] text-charcoal-light">{ast.specialty}</p>
                  <div className="mt-1.5 flex items-center gap-1 text-[10px] text-charcoal-light">
                    <Star size={10} className="fill-gold text-gold" />
                    {ast.rating} · ₹{ast.rate}/min
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* If mom persona and no circle, show different state */}
        {activePersona === "mom" && !circleCreated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card-premium flex flex-col items-center py-8 text-center"
          >
            <div className="mb-3 text-4xl">🌙</div>
            <p className="text-sm font-semibold text-charcoal mb-1">Welcome to AstroLive</p>
            <p className="text-xs text-charcoal-light max-w-[240px] leading-relaxed">
              No Circles yet. Switch to Rhea&apos;s view to start the demo flow.
            </p>
          </motion.div>
        )}
      </div>

      <PersonaSwitcher />
      <BottomNav />
    </>
  );
}
