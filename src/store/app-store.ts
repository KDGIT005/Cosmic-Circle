import { create } from "zustand";
import { rhea, mom, momComplete, defaultCircle } from "@/data/mock";
import type { User, Circle } from "@/data/mock";

interface AppState {
  // Persona
  activePersona: "rhea" | "mom";
  activeUser: User;
  switchPersona: () => void;

  // Circle
  circle: Circle | null;
  circleCreated: boolean;
  createCircle: (relationshipLabel: string, name: string, roughBirthday: string) => void;

  // Invitee flow
  momProfileComplete: boolean;
  completeMomProfile: (dob: string, birthTime?: string, birthPlace?: string) => void;

  // Unlock
  circleUnlocked: boolean;
  unlockCircle: () => void;

  // Booking
  bookingConfirmed: boolean;
  confirmBooking: () => void;

  // Reset
  resetDemo: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // ─── Persona ───
  activePersona: "rhea",
  activeUser: rhea,
  switchPersona: () => {
    const current = get().activePersona;
    const next = current === "rhea" ? "mom" : "rhea";
    const nextUser = next === "rhea" ? rhea : get().momProfileComplete ? momComplete : mom;
    set({ activePersona: next, activeUser: nextUser });
  },

  // ─── Circle ───
  circle: null,
  circleCreated: false,
  createCircle: (relationshipLabel, name, roughBirthday) => {
    const newCircle: Circle = {
      ...defaultCircle,
      relationshipLabel,
      memberBName: name,
      memberBRoughBirthday: roughBirthday,
      teaserInsight: `You and ${name} share a strong Moon connection this month, but the full picture needs their chart too.`,
      sharedInsight: `Rhea and ${name} are entering a period of mutual understanding. Conversations that felt stuck can find new openings this month. The key window is Aug 22-28. Be direct, kind, and clear.`,
      notifications: defaultCircle.notifications.map((notification) =>
        notification.id === "joined"
          ? { ...notification, title: `${name} joined your Circle` }
          : notification
      ),
      shareCard: {
        ...defaultCircle.shareCard,
        title: `Rhea + ${name}`,
      },
      status: "pending_invitee",
    };
    set({ circle: newCircle, circleCreated: true });
  },

  // ─── Invitee ───
  momProfileComplete: false,
  completeMomProfile: (dob, birthTime, birthPlace) => {
    const updatedMom: User = {
      ...mom,
      dob,
      birthTime: birthTime || undefined,
      birthPlace: birthPlace || undefined,
    };
    const circle = get().circle;
    if (circle) {
      set({
        momProfileComplete: true,
        activeUser: updatedMom,
        circle: { ...circle, memberB: updatedMom, status: "unlocked" },
      });
    }
  },

  // ─── Unlock ───
  circleUnlocked: false,
  unlockCircle: () => {
    const circle = get().circle;
    if (circle) {
      set({
        circleUnlocked: true,
        circle: { ...circle, status: "unlocked" },
      });
    }
  },

  // ─── Booking ───
  bookingConfirmed: false,
  confirmBooking: () => set({ bookingConfirmed: true }),

  // ─── Reset ───
  resetDemo: () =>
    set({
      activePersona: "rhea",
      activeUser: rhea,
      circle: null,
      circleCreated: false,
      momProfileComplete: false,
      circleUnlocked: false,
      bookingConfirmed: false,
    }),
}));
