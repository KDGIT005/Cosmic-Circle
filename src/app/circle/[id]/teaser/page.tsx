"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/app-store";
import PersonaSwitcher from "@/components/persona-switcher";
import BottomNav from "@/components/bottom-nav";
import { ArrowLeft, Lock, Share2, Copy, Check, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TeaserPage() {
  const router = useRouter();
  const { circle } = useAppStore();
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!circle) {
      router.push("/");
    }
  }, [circle, router]);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          className="mb-4 flex items-center gap-1.5 text-sm text-charcoal-light transition-colors hover:text-charcoal"
        >
          <ArrowLeft size={16} />
          Home
        </motion.button>

        {/* Circle Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-6 text-center"
        >
          <div className="mx-auto mb-3 flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lavender-light text-xl">
              {circle.memberA.avatar}
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-1 h-px w-8 bg-gold" />
              <span className="text-lg">💛</span>
              <div className="mt-1 h-px w-8 bg-gold" />
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-light text-xl">
              {circle.memberB?.avatar || "?"}
            </div>
          </div>
          <h1 className="text-lg font-semibold text-charcoal">
            {circle.memberA.name} & {circle.memberBName}
          </h1>
          <p className="text-xs text-charcoal-light">{circle.relationshipLabel} Circle</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-5 grid grid-cols-3 gap-2 text-center"
        >
          {["Invite ready", `${circle.memberBName} joins`, "Insight opens"].map((label, index) => (
            <div
              key={label}
              className={`rounded-xl px-2 py-3 text-[11px] font-medium ${
                index === 0
                  ? "bg-gold-light text-gold"
                  : "bg-white/70 text-charcoal-light"
              }`}
            >
              <span className="mb-1 block text-sm font-semibold">{index + 1}</span>
              {label}
            </div>
          ))}
        </motion.div>

        {/* Locked Insight Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative mb-6 overflow-hidden rounded-2xl bg-white shadow-md"
        >
          {/* Visible portion */}
          <div className="px-5 pt-5 pb-3">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gold">
                Shared Insight Preview
              </span>
            </div>
            <p className="text-sm leading-relaxed text-charcoal">
              You and {circle.memberBName} share a strong Moon connection this month —
            </p>
          </div>

          {/* Blurred portion */}
          <div className="relative px-5 pb-5 pt-1">
            <div className="blur-lock">
              <p className="text-sm leading-relaxed text-charcoal">
                your Moon-Saturn connection is entering a period of mutual understanding.
                Conversations about career expectations that felt stuck will find new openings this
                August. The key window is Aug 22–28. Be direct but kind.
              </p>
            </div>
            {/* Lock overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gold-light"
              >
                <Lock size={18} className="text-gold" />
              </motion.div>
              <p className="text-xs font-medium text-charcoal">
                …but the full picture needs her chart too.
              </p>
            </div>
          </div>

          {/* Gold border glow */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/20 pointer-events-none" />
        </motion.div>

        {/* Waiting note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 rounded-xl bg-lavender-light/50 px-4 py-3 text-center"
        >
          <p className="text-xs text-indigo leading-relaxed">
            Once <span className="font-semibold">{circle.memberBName}</span> adds her birth
            details, your Circle unlocks and the full insight reveals.
          </p>
        </motion.div>

        {/* Send Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={() => setShowShareModal(true)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo py-4 text-sm font-semibold text-white transition-all hover:bg-indigo/90 active:scale-[0.98]"
          >
            <Send size={16} />
            Send to {circle.memberBName}
          </button>
        </motion.div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-charcoal/30 backdrop-blur-sm"
              onClick={() => setShowShareModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 rounded-t-3xl bg-white px-6 py-6 shadow-2xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-semibold text-charcoal">Share with {circle.memberBName}</h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-charcoal/5"
                >
                  <X size={16} className="text-charcoal-light" />
                </button>
              </div>

              <div className="mb-4 rounded-xl bg-cream px-4 py-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-charcoal-light">
                  Message preview
                </p>
                <p className="text-sm leading-relaxed text-charcoal">
                  Rhea invited you to unlock a shared astrology insight for your{" "}
                  {circle.relationshipLabel.toLowerCase()} bond.
                </p>
                <p className="mt-3 text-xs font-mono text-charcoal-light break-all">
                  astrolive.app/circle/invite/Rh3a-Sn1t4
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCopy}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-charcoal/10 py-3 text-sm font-medium text-charcoal transition-all hover:bg-cream active:scale-[0.98]"
                >
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  {copied ? "Copied!" : "Copy Link"}
                </button>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-500 py-3 text-sm font-medium text-white transition-all hover:bg-green-600 active:scale-[0.98]"
                >
                  <Share2 size={16} />
                  WhatsApp
                </button>
              </div>

              <p className="mt-4 text-center text-[11px] text-charcoal-light">
                💡 Tip: Switch persona to &quot;{circle.memberBName}&quot; below to see her experience
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <PersonaSwitcher />
      <BottomNav />
    </>
  );
}
