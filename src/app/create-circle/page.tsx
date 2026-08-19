"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/app-store";
import { relationshipTypes } from "@/data/mock";
import PersonaSwitcher from "@/components/persona-switcher";
import BottomNav from "@/components/bottom-nav";
import { ArrowLeft, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const extraRelationshipTypes = [
  { label: "Mentor", icon: "M", description: "Guide / Teacher" },
  { label: "Boss", icon: "B", description: "Work Relationship" },
];

export default function CreateCirclePage() {
  const router = useRouter();
  const { createCircle } = useAppStore();
  const [step, setStep] = useState(1);
  const [selectedRelation, setSelectedRelation] = useState<string | null>(null);
  const [name, setName] = useState("Sunita");
  const [birthMonth, setBirthMonth] = useState("July");
  const [birthYear, setBirthYear] = useState("1968");
  const [isCreating, setIsCreating] = useState(false);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const years = Array.from({ length: 50 }, (_, i) => String(1950 + i));
  const circleTypes = [...relationshipTypes, ...extraRelationshipTypes];

  const handleCreate = async () => {
    setIsCreating(true);
    // Simulate a brief loading state
    await new Promise((resolve) => setTimeout(resolve, 1500));
    createCircle(selectedRelation || "Mom", name, `${birthMonth} ${birthYear}`);
    router.push("/circle/circle-001/teaser");
  };

  return (
    <>
      <div className="px-5 pt-12 pb-4">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => {
            if (step > 1) setStep(step - 1);
            else router.push("/");
          }}
          className="mb-4 flex items-center gap-1.5 text-sm text-charcoal-light transition-colors hover:text-charcoal"
        >
          <ArrowLeft size={16} />
          {step > 1 ? "Back" : "Home"}
        </motion.button>

        {/* Progress */}
        <div className="mb-6 flex gap-2">
          {[1, 2].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors ${
                s <= step ? "bg-indigo" : "bg-charcoal/10"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Choose Relationship */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="mb-1 text-xl font-semibold text-charcoal">Create a Circle</h1>
              <p className="mb-4 text-sm text-charcoal-light">
                Who would you like to share cosmic insights with?
              </p>

              <div className="mb-5 grid grid-cols-3 gap-2 text-center">
                {["Pick person", "Send invite", "Unlock insight"].map((label, index) => (
                  <div
                    key={label}
                    className="rounded-xl bg-white/70 px-2 py-3 text-[11px] font-medium text-charcoal-light"
                  >
                    <span className="mb-1 block text-sm font-semibold text-indigo">{index + 1}</span>
                    {label}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {circleTypes.map((rel) => (
                  <button
                    key={rel.label}
                    onClick={() => {
                      setSelectedRelation(rel.label);
                      setStep(2);
                    }}
                    className={`card-premium flex flex-col items-center py-6 text-center transition-all hover:shadow-lg active:scale-[0.97] ${
                      selectedRelation === rel.label
                        ? "ring-2 ring-indigo ring-offset-2"
                        : ""
                    }`}
                  >
                    <span className="mb-2 text-3xl">{rel.icon}</span>
                    <p className="text-sm font-semibold text-charcoal">{rel.label}</p>
                    <p className="text-[11px] text-charcoal-light">{rel.description}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Name + Rough Birthday */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-1 flex items-center gap-2">
                <span className="text-xl">
                  {circleTypes.find((r) => r.label === selectedRelation)?.icon}
                </span>
                <h1 className="text-xl font-semibold text-charcoal">
                  Your {selectedRelation} Circle
                </h1>
              </div>
              <p className="mb-6 text-sm text-charcoal-light">
                Tell us a bit about them. Don&apos;t worry about exact details — they&apos;ll add their own.
              </p>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-charcoal-light">
                    Their Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter their name"
                    className="w-full rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal-light/50 focus:border-indigo focus:outline-none focus:ring-2 focus:ring-indigo/10 transition-all"
                  />
                </div>

                {/* Rough Birthday */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-charcoal-light">
                    Rough Birthday (month & year)
                  </label>
                  <div className="flex gap-3">
                    <select
                      value={birthMonth}
                      onChange={(e) => setBirthMonth(e.target.value)}
                      className="flex-1 rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm text-charcoal focus:border-indigo focus:outline-none focus:ring-2 focus:ring-indigo/10 transition-all appearance-none"
                    >
                      {months.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                    <select
                      value={birthYear}
                      onChange={(e) => setBirthYear(e.target.value)}
                      className="w-[100px] rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm text-charcoal focus:border-indigo focus:outline-none focus:ring-2 focus:ring-indigo/10 transition-all appearance-none"
                    >
                      {years.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="mt-2 text-[11px] text-charcoal-light leading-relaxed">
                    We only need a rough idea — {name || "they"} will add their own exact details when they join.
                  </p>
                </div>
              </div>

              {/* Create Button */}
              <motion.button
                onClick={handleCreate}
                disabled={!name || isCreating}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo py-4 text-sm font-semibold text-white transition-all hover:bg-indigo/90 active:scale-[0.98] disabled:opacity-50"
                whileTap={{ scale: 0.98 }}
              >
                {isCreating ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                    />
                    Creating your Circle…
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Create Circle with {name || "..."}
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <PersonaSwitcher />
      <BottomNav />
    </>
  );
}
