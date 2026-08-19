// ─── Types ───

export interface User {
  id: string;
  name: string;
  dob?: string;
  birthTime?: string;
  birthPlace?: string;
  isPremium: boolean;
  avatar: string; // emoji for prototype
}

export interface Circle {
  id: string;
  relationshipLabel: string;
  memberA: User;
  memberBName: string;
  memberBRoughBirthday: string; // month + year only
  memberB: User | null;
  status: "teaser" | "pending_invitee" | "unlocked" | "premium";
  teaserInsight: string;
  sharedInsight: string | null;
  monthlyForecast: ForecastEntry[];
  healthMetrics: CircleMetric[];
  actionSuggestions: CircleAction[];
  notifications: CircleNotification[];
  premiumUpsells: PremiumUpsell[];
  shareCard: ShareCard;
  nextInsightDate: string;
  createdAt: string;
}

export interface ForecastEntry {
  id: string;
  month: string;
  headline: string;
  body: string;
  tone: "opportunity" | "gentle-caution" | "milestone";
}

export interface CircleMetric {
  id: string;
  label: string;
  score: number;
  note: string;
}

export interface CircleAction {
  id: string;
  title: string;
  body: string;
  timing: string;
}

export interface CircleNotification {
  id: string;
  title: string;
  body: string;
  kind: "join" | "monthly" | "action" | "premium";
}

export interface PremiumUpsell {
  id: string;
  title: string;
  body: string;
  cta: string;
}

export interface ShareCard {
  title: string;
  subtitle: string;
  caption: string;
}

export interface Consultation {
  id: string;
  astrologerName: string;
  astrologerSpecialty: string;
  topic: string;
  keyInsight: string;
  timestamp: string;
  duration: string;
  rating: number;
}

// ─── Users ───

export const rhea: User = {
  id: "rhea-001",
  name: "Rhea",
  dob: "1998-03-14",
  birthTime: "06:42 AM",
  birthPlace: "Mumbai, India",
  isPremium: false,
  avatar: "👩🏻",
};

export const mom: User = {
  id: "mom-001",
  name: "Sunita",
  dob: undefined, // will be filled when she joins
  birthTime: undefined,
  birthPlace: undefined,
  isPremium: false,
  avatar: "👩🏻‍🦱",
};

export const momComplete: User = {
  ...mom,
  dob: "1968-07-22",
  birthTime: "09:15 AM",
  birthPlace: "Pune, India",
};

// ─── Consultations ───

export const recentConsultation: Consultation = {
  id: "consult-001",
  astrologerName: "Pandit Arjun Shastri",
  astrologerSpecialty: "Vedic Astrology & Career Guidance",
  topic: "Career Decision — Job Change",
  keyInsight:
    "Your career crossroad this month is deeply connected to a parental figure — especially your mother's expectations and your response to them. Saturn's transit through your 10th house is activating old patterns around approval and independence.",
  timestamp: "2026-08-18T14:30:00+05:30",
  duration: "22 min",
  rating: 4.8,
};

// ─── Forecast Entries ───

export const forecasts: ForecastEntry[] = [
  {
    id: "fc-aug-2026",
    month: "August 2026",
    headline: "A window for honest conversation opens Aug 22–28",
    body: "Your Moon-Saturn connection is entering a period of mutual understanding. Conversations about career expectations that felt stuck will find new openings. Be direct but kind — the stars are supporting clarity over compromise this month.",
    tone: "opportunity",
  },
  {
    id: "fc-sep-2026",
    month: "September 2026",
    headline: "Shared decisions feel lighter — trust the process",
    body: "Jupiter's trine to both your natal Moons this month brings warmth and generosity into your dynamic. A financial or practical decision you've been avoiding together will resolve more easily than expected.",
    tone: "opportunity",
  },
  {
    id: "fc-oct-2026",
    month: "October 2026",
    headline: "A milestone moment — celebrate what's grown",
    body: "Venus conjunct your composite Sun marks a period of genuine appreciation. You may not say it aloud, but both of you will feel the shift. An old tension softens permanently around mid-October.",
    tone: "milestone",
  },
];

// ─── The Circle ───

export const circleHealthMetrics: CircleMetric[] = [
  {
    id: "harmony",
    label: "Harmony",
    score: 82,
    note: "Warm bond this month",
  },
  {
    id: "communication",
    label: "Communication",
    score: 74,
    note: "Best when talks are planned",
  },
  {
    id: "support",
    label: "Support",
    score: 88,
    note: "Strong emotional backing",
  },
];

export const circleActions: CircleAction[] = [
  {
    id: "message",
    title: "Send a small check-in",
    body: "A simple message lands better than a long serious talk today.",
    timing: "Today",
  },
  {
    id: "career-talk",
    title: "Plan the career conversation",
    body: "Keep the big topic for Aug 22-28, when both charts support clarity.",
    timing: "This week",
  },
  {
    id: "gratitude",
    title: "Name one thing you appreciate",
    body: "A little warmth first will make the practical discussion easier.",
    timing: "2 minutes",
  },
];

export const circleNotifications: CircleNotification[] = [
  {
    id: "joined",
    title: "Sunita joined your Circle",
    body: "The full shared insight is ready.",
    kind: "join",
  },
  {
    id: "monthly",
    title: "New monthly forecast",
    body: "August has a clear window for honest conversation.",
    kind: "monthly",
  },
  {
    id: "action",
    title: "Good day for a soft check-in",
    body: "Start light today. Save the deep talk for later this week.",
    kind: "action",
  },
];

export const premiumUpsells: PremiumUpsell[] = [
  {
    id: "synastry",
    title: "Full synastry report",
    body: "Both charts read together, with strengths, tension points, and remedies.",
    cta: "Unlock report",
  },
  {
    id: "year",
    title: "12-month relationship guide",
    body: "Know the best windows for talks, decisions, and healing.",
    cta: "See 12 months",
  },
  {
    id: "consult",
    title: "Joint consultation",
    body: "Bring both people into one live session with an astrologer.",
    cta: "Book session",
  },
];

export const defaultCircle: Circle = {
  id: "circle-001",
  relationshipLabel: "Mom",
  memberA: rhea,
  memberBName: "Sunita",
  memberBRoughBirthday: "July 1968",
  memberB: null,
  status: "teaser",
  teaserInsight:
    "You and Mom share a strong Moon connection this month — but the full picture needs her chart too.",
  sharedInsight:
    "Rhea and Sunita — your Moon-Saturn connection is entering a period of mutual understanding. Conversations about career expectations that felt stuck will find new openings this August. The key window is Aug 22–28. Be direct but kind — the stars are supporting clarity over compromise.",
  monthlyForecast: forecasts,
  healthMetrics: circleHealthMetrics,
  actionSuggestions: circleActions,
  notifications: circleNotifications,
  premiumUpsells,
  shareCard: {
    title: "Rhea + Sunita",
    subtitle: "Moon-Saturn bond",
    caption: "Best conversation window: Aug 22-28",
  },
  nextInsightDate: "2026-09-01",
  createdAt: "2026-08-18T15:00:00+05:30",
};

// ─── Astrologer Picks (decorative) ───

export const astrologerPicks = [
  {
    id: "ast-001",
    name: "Pandit Arjun Shastri",
    specialty: "Career & Vedic",
    rating: 4.8,
    rate: 15,
    avatar: "🧔🏽",
    online: true,
  },
  {
    id: "ast-002",
    name: "Dr. Meera Iyer",
    specialty: "Relationships",
    rating: 4.9,
    rate: 20,
    avatar: "👩🏽‍🔬",
    online: true,
  },
  {
    id: "ast-003",
    name: "Acharya Vikram",
    specialty: "Kundli & Muhurat",
    rating: 4.7,
    rate: 12,
    avatar: "👳🏽",
    online: false,
  },
];

// ─── Relationship Types ───

export const relationshipTypes = [
  { label: "Mom", icon: "💛", description: "Mother" },
  { label: "Partner", icon: "💜", description: "Romantic Partner" },
  { label: "Best Friend", icon: "🩵", description: "Best Friend" },
  { label: "Sibling", icon: "🧡", description: "Brother / Sister" },
];
