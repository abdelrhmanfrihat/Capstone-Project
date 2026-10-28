import type React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../ui/utils";

export const feedbackBadgeStyles = {
  interview: "bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-500/10 dark:border-blue-500/40 dark:text-blue-400",
  training: "bg-purple-100 border-purple-300 text-purple-800 dark:bg-purple-500/10 dark:border-purple-500/40 dark:text-purple-400",
  private: "bg-teal-100 border-teal-300 text-teal-800 dark:bg-teal-500/10 dark:border-teal-500/40 dark:text-teal-400",
  public: "bg-indigo-100 border-indigo-300 text-indigo-800 dark:bg-indigo-500/10 dark:border-indigo-500/40 dark:text-indigo-400",
  published: "bg-green-100 border-green-300 text-green-800 dark:bg-green-500/10 dark:border-green-500/30 dark:text-green-400",
  pending: "bg-amber-100 border-amber-300 text-amber-800 dark:bg-amber-500/10 dark:border-amber-500/30 dark:text-amber-400",
  rejected: "bg-red-100 border-red-300 text-red-800 dark:bg-red-500/10 dark:border-red-500/30 dark:text-red-400",
  neutral: "bg-slate-100 border-slate-300 text-slate-700 dark:bg-slate-500/10 dark:border-slate-500/30 dark:text-slate-300",
  strength: "bg-green-100 border-green-300 text-green-800 dark:bg-green-500/10 dark:border-green-500/30 dark:text-green-400",
  areas: "bg-amber-100 border-amber-300 text-amber-800 dark:bg-amber-500/10 dark:border-amber-500/30 dark:text-amber-400",
} as const;

export type FeedbackBadgeTone = keyof typeof feedbackBadgeStyles;

export const feedbackSectionLabelStyles = {
  strengths: "text-green-700 dark:text-green-400",
  areas: "text-amber-700 dark:text-amber-400",
} as const;

export const feedbackSelectableChipStyles = {
  strengthSelected: "border-green-300 bg-green-100 text-green-800 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-400",
  strengthIdle: "border-[var(--border-main)] hover:border-green-300 dark:hover:border-green-500/40",
  areasSelected: "border-amber-300 bg-amber-100 text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-400",
  areasIdle: "border-[var(--border-main)] hover:border-amber-300 dark:hover:border-amber-500/40",
} as const;

export function getFeedbackCategoryTone(category: string): FeedbackBadgeTone {
  if (category.toLowerCase().includes("interview")) return "interview";
  if (category.toLowerCase().includes("training")) return "training";
  return category.trim() ? "interview" : "neutral";
}

export function getFeedbackStatusTone(status: string): FeedbackBadgeTone {
  const normalized = status.toLowerCase();
  if (normalized.includes("not published")) return "neutral";
  if (normalized.includes("pending") || normalized.includes("awaiting") || normalized.includes("required") || normalized === "flagged") return "pending";
  if (normalized.includes("reject")) return "rejected";
  if (normalized.includes("publish") || normalized.includes("approv") || normalized.includes("sent") || normalized.includes("submitted") || normalized.includes("verified") || normalized.includes("completed") || normalized.includes("accepted")) return "published";
  if (normalized === "private") return "private";
  if (normalized === "public") return "public";
  return "neutral";
}

export function getFeedbackVisibilityTone(visibility: string): FeedbackBadgeTone {
  if (visibility.toLowerCase() === "private") return "private";
  if (visibility.toLowerCase() === "public") return "public";
  return "neutral";
}

type FeedbackBadgeProps = React.ComponentProps<"span"> & {
  tone: FeedbackBadgeTone;
  icon?: LucideIcon;
};

export function FeedbackBadge({ tone, icon: Icon, className, children, ...props }: FeedbackBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium",
        feedbackBadgeStyles[tone],
        className,
      )}
      {...props}
    >
      {Icon && <Icon className="size-3 shrink-0" aria-hidden="true" />}
      {children}
    </span>
  );
}
