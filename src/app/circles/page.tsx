"use client";

import Link from "next/link";
import { useAppStore } from "@/store/app-store";
import PersonaSwitcher from "@/components/persona-switcher";
import BottomNav from "@/components/bottom-nav";
import { Users, Lock, Check, Sparkles, Bell } from "lucide-react";
import { motion } from "framer-motion";

export default function CirclesListPage() {
  const { circle, circleCreated, activePersona, activeUser, momProfileComplete } = useAppStore();
  const circleHref =
    circle?.status === "unlocked"
      ? `/circle/${circle.id}`
      : activePersona === "mom" && !momProfileComplete
      ? `/circle/${circle?.id}/join`
      : `/circle/${circle?.id}/teaser`;

  return (
    <>
      <div className="px-5 pt-12 pb-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-semibold text-charcoal">Your Circles</h1>
          <p className="text-sm text-charcoal-light">
            Shared cosmic insights with the people who matter.
          </p>
        </motion.div>

        {circleCreated && circle?.status === "unlocked" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-5 rounded-2xl px-4 py-3 text-white"
            style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 50%, #EC4899 100%)' }}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                <Bell size={15} />
              </div>
              <div>
                <p className="text-sm font-semibold">{circle.notifications[0]?.title}</p>
                <p className="text-xs leading-relaxed text-white/80">
                  Health score, actions, and a share card are ready.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {!circleCreated ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-premium flex flex-col items-center py-10 text-center"
          >
            <div className="relative mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lavender-light">
                <Users size={28} className="text-indigo" />
              </div>
            </div>
            <p className="mb-1 text-sm font-semibold text-charcoal">No Circles Yet</p>
            <p className="mb-4 max-w-[240px] text-xs text-charcoal-light leading-relaxed">
              Start a Circle after your next consultation to unlock shared relationship forecasts.
            </p>
            {activePersona === "rhea" && (
              <Link
                href="/create-circle"
                className="rounded-full bg-indigo px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-indigo/90 active:scale-95"
              >
                Create Your First Circle
              </Link>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
                        : "bg-gold-light text-gold"
                    }`}
                  >
                    {circle?.status === "unlocked" ? "Active" : "Pending"}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-charcoal-light">
                  {circle?.status === "unlocked"
                    ? circle?.monthlyForecast[0]?.headline
                    : circle?.teaserInsight}
                </p>
                {circle?.status !== "unlocked" && activePersona === "rhea" && (
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-gold">
                    <Lock size={12} />
                    Waiting for {circle?.memberBName} to join
                  </div>
                )}
                {circle?.status !== "unlocked" && activePersona === "mom" && (
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-indigo font-medium">
                    <Sparkles size={12} />
                    Tap to add your details & unlock
                  </div>
                )}
                {circle?.status === "unlocked" && (
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-indigo font-medium">
                    <Bell size={12} />
                    New monthly guidance available
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        )}
      </div>

      <PersonaSwitcher />
      <BottomNav />
    </>
  );
}
