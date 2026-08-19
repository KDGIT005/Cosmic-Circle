"use client";

import { useAppStore } from "@/store/app-store";
import { ArrowLeftRight, RotateCcw } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function PersonaSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const {
    activePersona,
    activeUser,
    circle,
    momProfileComplete,
    switchPersona,
    resetDemo,
  } = useAppStore();

  const handleSwitchPersona = () => {
    const nextPersona = activePersona === "rhea" ? "mom" : "rhea";
    switchPersona();

    if (!circle || circle.status === "unlocked") {
      return;
    }

    const teaserPath = `/circle/${circle.id}/teaser`;
    const joinPath = `/circle/${circle.id}/join`;

    if (pathname === teaserPath && nextPersona === "mom" && !momProfileComplete) {
      router.replace(joinPath);
    }

    if (pathname === joinPath && nextPersona === "rhea") {
      router.replace(teaserPath);
    }
  };

  return (
    <div className="persona-switcher flex items-center gap-2">
      <button
        onClick={resetDemo}
        className="flex items-center gap-1.5 rounded-full bg-charcoal/5 px-3 py-2 text-xs text-charcoal-light backdrop-blur-md transition-all hover:bg-charcoal/10"
        title="Reset Demo"
      >
        <RotateCcw size={12} />
        Reset
      </button>
      <button
        onClick={handleSwitchPersona}
        className="flex items-center gap-2 rounded-full border border-indigo/20 bg-white/80 px-4 py-2 text-sm font-medium shadow-lg backdrop-blur-md transition-all hover:shadow-xl active:scale-95"
      >
        <span className="text-base">{activeUser.avatar}</span>
        <span className="text-charcoal">
          Viewing as <span className="font-semibold text-indigo">{activeUser.name}</span>
        </span>
        <ArrowLeftRight size={14} className="text-indigo/50" />
      </button>
    </div>
  );
}
