import { useState, useEffect } from "react";
import type { LucideIcon } from "lucide-react";
import { MessageSquare, Briefcase, UserPlus, Star, AlertCircle } from "lucide-react";

export interface StaticNotification {
  id: number;
  icon: LucideIcon;
  title: string;
  message: string;
  time: string;
  initiallyRead: boolean;
}

export type NotifUserType = "Student" | "Company" | "Admin";

const STATIC_NOTIFICATIONS: Record<NotifUserType, StaticNotification[]> = {
  Student: [
    {
      id: 1,
      icon: MessageSquare,
      title: "Interview Invitation",
      message: "Stellar Cloud invited you to interview for Frontend Engineering Intern",
      time: "2 hours ago",
      initiallyRead: false,
    },
    {
      id: 2,
      icon: Briefcase,
      title: "New High Match",
      message: "You have a 94% match with InnovateLabs - Full Stack Developer role",
      time: "5 hours ago",
      initiallyRead: false,
    },
  ],
  Company: [
    {
      id: 1,
      icon: UserPlus,
      title: "New Application",
      message: "Alex Chen applied to your Frontend Engineering Intern position",
      time: "1 hour ago",
      initiallyRead: false,
    },
    {
      id: 2,
      icon: Star,
      title: "Student Feedback",
      message: "Michael Zhang left a 5-star review for your internship program",
      time: "1 day ago",
      initiallyRead: true,
    },
  ],
  Admin: [
    {
      id: 1,
      icon: AlertCircle,
      title: "Pending Company Verification",
      message: "2 new companies are awaiting verification",
      time: "30 minutes ago",
      initiallyRead: false,
    },
    {
      id: 2,
      icon: AlertCircle,
      title: "New Dispute Filed",
      message: "Alex Chen filed a dispute regarding match score calculation",
      time: "2 hours ago",
      initiallyRead: false,
    },
  ],
};

// ── Shared read state — mirrors adminMessages.ts subscription pattern ─────────
// Both the popover (DashboardLayout) and the full notification page subscribe,
// so reading in one place immediately updates the unread count in the other.

const _readState = new Map<NotifUserType, Set<number>>();
const _listeners = new Set<() => void>();

function ensureReadState(userType: NotifUserType): Set<number> {
  if (!_readState.has(userType)) {
    const initial = new Set(
      STATIC_NOTIFICATIONS[userType]
        .filter((n) => n.initiallyRead)
        .map((n) => n.id)
    );
    _readState.set(userType, initial);
  }
  return _readState.get(userType)!;
}

export function getStaticNotifications(userType: NotifUserType): StaticNotification[] {
  return STATIC_NOTIFICATIONS[userType];
}

export function getStaticReadIds(userType: NotifUserType): Set<number> {
  return new Set(ensureReadState(userType));
}

export function markStaticNotifRead(userType: NotifUserType, id: number): void {
  ensureReadState(userType).add(id);
  _listeners.forEach((l) => l());
}

export function useStaticReadState(userType: NotifUserType): Set<number> {
  const [readIds, setReadIds] = useState<Set<number>>(() => getStaticReadIds(userType));

  useEffect(() => {
    const update = () => setReadIds(getStaticReadIds(userType));
    _listeners.add(update);
    return () => {
      _listeners.delete(update);
    };
  }, [userType]);

  return readIds;
}

// ── Shared time formatters ────────────────────────────────────────────────────

export function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} minute${mins === 1 ? "" : "s"} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs === 1 ? "" : "s"} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

export function formatTimestamp(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
