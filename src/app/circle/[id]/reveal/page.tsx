"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/app-store";
import PersonaSwitcher from "@/components/persona-switcher";
import { motion, AnimatePresence } from "framer-motion";

export default function RevealPage() {
  const router = useRouter();
  const { circle } = useAppStore();
  const [phase, setPhase] = useState<"loading" | "orbits" | "connect" | "reveal" | "insight">("loading");

  useEffect(() => {
    if (!circle) {
      router.push("/");
      return;
    }

    const timers = [
      setTimeout(() => setPhase("orbits"), 800),
      setTimeout(() => setPhase("connect"), 2200),
      setTimeout(() => setPhase("reveal"), 3400),
      setTimeout(() => setPhase("insight"), 4600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [circle, router]);

  if (!circle) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 40%, #EC4899 100%)' }}>
        {/* Background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 40%, #EC4899 100%)' }}
        />

        {/* Subtle radial glow */}
        <AnimatePresence>
          {(phase === "connect" || phase === "reveal" || phase === "insight") && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.6, scale: 1.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute z-0 h-64 w-64 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
              }}
            />
          )}
        </AnimatePresence>

        {/* Loading phase — shimmer dots */}
        <AnimatePresence>
          {phase === "loading" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-10 flex items-center gap-2"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                  className="h-2 w-2 rounded-full bg-white"
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Orbit phase — two circles drifting together */}
        <AnimatePresence>
          {(phase === "orbits" || phase === "connect") && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative z-10 flex items-center justify-center"
              style={{ width: 200, height: 200 }}
            >
              {/* Orbit ring */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.3, scale: 1 }}
                className="absolute h-40 w-40 rounded-full border border-gold/30"
              />

              {/* Circle A — Rhea */}
              <motion.div
                initial={{ x: -60, y: 0 }}
                animate={
                  phase === "connect"
                    ? { x: -16, y: 0, scale: 1.1 }
                    : { x: -50, y: 0 }
                }
                transition={{ type: "spring", damping: 15, stiffness: 80 }}
                className="absolute flex h-14 w-14 items-center justify-center rounded-full bg-lavender-light text-2xl shadow-lg"
              >
                {circle.memberA.avatar}
              </motion.div>

              {/* Circle B — Mom */}
              <motion.div
                initial={{ x: 60, y: 0 }}
                animate={
                  phase === "connect"
                    ? { x: 16, y: 0, scale: 1.1 }
                    : { x: 50, y: 0 }
                }
                transition={{ type: "spring", damping: 15, stiffness: 80 }}
                className="absolute flex h-14 w-14 items-center justify-center rounded-full bg-gold-light text-2xl shadow-lg"
              >
                {circle.memberB?.avatar || circle.memberA.avatar}
              </motion.div>

              {/* Connection burst */}
              {phase === "connect" && (
                <>
                  {/* Golden particles */}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        x: Math.cos((i * Math.PI * 2) / 12) * 60,
                        y: Math.sin((i * Math.PI * 2) / 12) * 60,
                      }}
                      transition={{ duration: 1.2, delay: 0.1 + i * 0.05 }}
                      className="absolute h-1.5 w-1.5 rounded-full bg-white"
                    />
                  ))}
                  {/* Glow ring */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 0.5, 0], scale: [0, 2, 3] }}
                    transition={{ duration: 1.5 }}
                    className="absolute h-16 w-16 rounded-full border border-white/40"
                  />
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reveal text */}
        <AnimatePresence>
          {(phase === "reveal" || phase === "insight") && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 mb-8 text-center px-8"
            >
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-serif text-3xl font-medium text-white"
              >
                Your Circle is open.
              </motion.h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mx-auto mt-3 h-0.5 bg-white/60 rounded-full"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shared Insight Card */}
        <AnimatePresence>
          {phase === "insight" && (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 150, delay: 0.3 }}
              className="relative z-10 mx-5 w-full max-w-[390px] px-5"
            >
              <div className="card-premium-gold">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lavender-light text-sm">
                    {circle.memberA.avatar}
                  </div>
                  <div className="h-px flex-1 bg-gold/30" />
                  <span className="text-sm">💛</span>
                  <div className="h-px flex-1 bg-gold/30" />
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-light text-sm">
                    {circle.memberB?.avatar || "👩🏻‍🦱"}
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-charcoal">
                  {circle.sharedInsight}
                </p>
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={() => router.push(`/circle/${circle.id}`)}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo py-4 text-sm font-semibold text-white transition-all hover:bg-indigo/90 active:scale-[0.98]"
              >
                View Your Circle →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <PersonaSwitcher />
    </>
  );
}
