"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/app-store";
import PersonaSwitcher from "@/components/persona-switcher";
import BottomNav from "@/components/bottom-nav";
import { ArrowLeft, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function JoinPage() {
  const router = useRouter();
  const { circle, completeMomProfile, unlockCircle } = useAppStore();
  const [dob, setDob] = useState("1968-07-22");
  const [birthTime, setBirthTime] = useState("09:15");
  const [birthPlace, setBirthPlace] = useState("Pune, India");
  const [isUnlocking, setIsUnlocking] = useState(false);

  useEffect(() => {
    if (!circle) {
      router.push("/");
    }
  }, [circle, router]);

  const handleSubmit = async () => {
    const circleId = circle?.id;
    if (!circleId || isUnlocking) {
      return;
    }

    setIsUnlocking(true);
    completeMomProfile(dob, birthTime, birthPlace);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    unlockCircle();
    router.replace(`/circle/${circleId}/reveal`);
  };

  if (!circle) {
    return null;
  }

  return (
    <>
      <div className="px-5 pt-12 pb-4">
        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push("/")}
          className="mb-6 flex items-center gap-1.5 text-sm text-charcoal-light transition-colors hover:text-charcoal"
        >
          <ArrowLeft size={16} />
          Home
        </motion.button>

        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold-light text-3xl animate-float">
            ✨
          </div>
          <h1 className="mb-2 font-serif text-2xl font-medium text-charcoal">
            {circle.memberA.name} started something for you both.
          </h1>
          <p className="text-sm text-charcoal-light leading-relaxed">
            Add your birth details to see your shared cosmic connection.
          </p>
        </motion.div>

        {/* Trust Signal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex items-center gap-3 rounded-xl bg-lavender-light/50 px-4 py-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lavender-light text-lg">
            {circle.memberA.avatar}
          </div>
          <div>
            <p className="text-sm font-medium text-charcoal">{circle.memberA.name}</p>
            <p className="text-xs text-charcoal-light">
              created a {circle.relationshipLabel} Circle with you
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-xs font-semibold uppercase tracking-wider text-charcoal-light">
            Your Birth Details
          </h2>

          {/* Date of Birth */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-charcoal-light">
              Date of Birth
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm text-charcoal focus:border-indigo focus:outline-none focus:ring-2 focus:ring-indigo/10 transition-all"
            />
          </div>

          {/* Birth Time */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-charcoal-light">
              Birth Time <span className="text-charcoal-light/50">(optional)</span>
            </label>
            <input
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              className="w-full rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm text-charcoal focus:border-indigo focus:outline-none focus:ring-2 focus:ring-indigo/10 transition-all"
            />
            <p className="mt-1 text-[11px] text-charcoal-light">
              Exact time makes your reading more accurate, but isn&apos;t required.
            </p>
          </div>

          {/* Birth Place */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-charcoal-light">
              Birth Place <span className="text-charcoal-light/50">(optional)</span>
            </label>
            <input
              type="text"
              value={birthPlace}
              onChange={(e) => setBirthPlace(e.target.value)}
              placeholder="City, Country"
              className="w-full rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal-light/50 focus:border-indigo focus:outline-none focus:ring-2 focus:ring-indigo/10 transition-all"
            />
          </div>
        </motion.div>

        {/* Submit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <button
            onClick={handleSubmit}
            disabled={!dob || isUnlocking}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gold py-4 text-sm font-semibold text-white transition-all hover:bg-gold/90 active:scale-[0.98] disabled:opacity-50"
          >
            {isUnlocking ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                />
                <span>Unlocking your Circle…</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Unlock Your Circle
              </>
            )}
          </button>
        </motion.div>
      </div>

      <PersonaSwitcher />
      <BottomNav />
    </>
  );
}
