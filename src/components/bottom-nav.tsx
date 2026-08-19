"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Phone, User } from "lucide-react";

const tabs = [
  { label: "Home", href: "/", icon: Home },
  { label: "Circles", href: "/circles", icon: Users },
  { label: "Consult", href: "#", icon: Phone },
  { label: "Profile", href: "#", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 border-t border-indigo/10 bg-white/95 backdrop-blur-xl">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const isActive = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.label}
              href={tab.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${
                isActive ? "text-indigo" : "text-charcoal-light"
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.2 : 1.5} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
