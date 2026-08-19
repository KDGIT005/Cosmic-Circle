"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/app-store";
import PersonaSwitcher from "@/components/persona-switcher";
import BottomNav from "@/components/bottom-nav";
import { ArrowLeft, Star, Clock, Video, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BookingPage() {
  const router = useRouter();
  const { circle, bookingConfirmed, confirmBooking } = useAppStore();
  const [selectedDate, setSelectedDate] = useState("2026-08-25");
  const [selectedTime, setSelectedTime] = useState("18:00");
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    if (!circle) {
      router.push("/");
    }
  }, [circle, router]);

  const handleBook = async () => {
    setIsBooking(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    confirmBooking();
    setIsBooking(false);
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
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-1.5 text-sm text-charcoal-light transition-colors hover:text-charcoal"
        >
          <ArrowLeft size={16} />
          Back
        </motion.button>

        <AnimatePresence mode="wait">
          {!bookingConfirmed ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <h1 className="mb-1 text-xl font-semibold text-charcoal">
                  Book Joint Consultation
                </h1>
                <p className="text-sm text-charcoal-light">
                  A live session for both {circle.memberA.name} & {circle.memberBName} with an
                  astrologer.
                </p>
              </motion.div>

              {/* Astrologer Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card-premium mb-5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-light text-2xl">
                    🧔🏽
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-charcoal">Pandit Arjun Shastri</p>
                    <p className="text-xs text-charcoal-light">
                      Vedic Astrology & Relationship Specialist
                    </p>
                    <div className="mt-1 flex items-center gap-3 text-xs text-charcoal-light">
                      <span className="flex items-center gap-1">
                        <Star size={11} className="fill-gold text-gold" /> 4.8
                      </span>
                      <span className="flex items-center gap-1">
                        <Video size={11} /> Video call
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} /> 30 min
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Both Members */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mb-5"
              >
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-charcoal-light">
                  Session Members
                </h2>
                <div className="flex items-center gap-3 rounded-xl bg-lavender-light/30 px-4 py-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lavender-light text-lg">
                    {circle.memberA.avatar}
                  </div>
                  <span className="text-sm font-medium text-charcoal">{circle.memberA.name}</span>
                  <span className="text-charcoal-light">+</span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-light text-lg">
                    {circle.memberB?.avatar || "👩🏻‍🦱"}
                  </div>
                  <span className="text-sm font-medium text-charcoal">
                    {circle.memberBName}
                  </span>
                </div>
              </motion.div>

              {/* Date & Time */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6 space-y-4"
              >
                <h2 className="text-xs font-semibold uppercase tracking-wider text-charcoal-light">
                  Pick a Time
                </h2>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-charcoal-light">
                    Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm text-charcoal focus:border-indigo focus:outline-none focus:ring-2 focus:ring-indigo/10 transition-all"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-charcoal-light">
                    Time
                  </label>
                  <input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm text-charcoal focus:border-indigo focus:outline-none focus:ring-2 focus:ring-indigo/10 transition-all"
                  />
                </div>
              </motion.div>

              {/* Book CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={handleBook}
                  disabled={isBooking}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo py-4 text-sm font-semibold text-white transition-all hover:bg-indigo/90 active:scale-[0.98] disabled:opacity-50"
                >
                  {isBooking ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                      />
                      Booking…
                    </>
                  ) : (
                    "Confirm Booking — ₹599"
                  )}
                </button>
                <p className="mt-2 text-center text-[11px] text-charcoal-light">
                  30-minute video session · Both members join
                </p>
              </motion.div>
            </motion.div>
          ) : (
            /* Success State */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center pt-12 text-center"
            >
              {/* Confetti-ish particles */}
              <div className="relative mb-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0.5],
                      x: Math.cos((i * Math.PI * 2) / 8) * 50,
                      y: Math.sin((i * Math.PI * 2) / 8) * 50,
                    }}
                    transition={{ duration: 1.5, delay: i * 0.1 }}
                    className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: ["#C7993D", "#B8A9D4", "#D4A0A0", "#5B4A8A"][i % 4],
                    }}
                  />
                ))}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 10, delay: 0.3 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50"
                >
                  <Check size={36} className="text-green-500" />
                </motion.div>
              </div>

              <h2 className="mb-2 font-serif text-2xl font-medium text-charcoal">
                You&apos;re booked!
              </h2>
              <p className="mb-6 text-sm text-charcoal-light max-w-[280px]">
                Joint consultation with Pandit Arjun Shastri on{" "}
                <span className="font-medium text-charcoal">Aug 25, 6:00 PM</span>
              </p>

              <div className="card-premium w-full mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lavender-light text-sm">
                      {circle.memberA.avatar}
                    </div>
                    <span className="text-charcoal-light text-xs">+</span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-light text-sm">
                      {circle.memberB?.avatar || "👩🏻‍🦱"}
                    </div>
                    <span className="text-charcoal-light text-xs">+</span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lavender-light text-sm">
                      🧔🏽
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-charcoal">30 min · Video</p>
                    <p className="text-xs text-charcoal-light">₹599</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => router.push(`/circle/${circle.id}`)}
                className="rounded-full bg-indigo px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-indigo/90 active:scale-95"
              >
                Back to Circle Home
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <PersonaSwitcher />
      <BottomNav />
    </>
  );
}
