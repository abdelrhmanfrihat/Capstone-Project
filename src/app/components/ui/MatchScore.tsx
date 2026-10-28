import React from "react";
import { cn } from "../../utils/cn";
import { BrainCircuit } from "lucide-react";

interface MatchScoreProps {
  score: number;
  className?: string;
  showLabel?: boolean;
}

export function MatchScore({ score, className, showLabel = true }: MatchScoreProps) {
  // Use CSS variables for match scores (high >= 90, medium >= 70, low < 70)
  let colorClass = "";
  let borderClass = "";

  if (score >= 90) {
    // High match - green
    colorClass = "text-[var(--success-text)] bg-[var(--success-bg)]";
    borderClass = "border border-[var(--success-border)]";
  } else if (score >= 70) {
    // Medium match - amber
    colorClass = "text-[var(--warning-text)] bg-[var(--warning-bg)]";
    borderClass = "border border-[var(--warning-border)]";
  } else {
    // Low match - red
    colorClass = "text-[var(--danger-text)] bg-[var(--danger-bg)]";
    borderClass = "border border-[var(--danger-border)]";
  }

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <div className={cn("flex items-center gap-1 px-2 py-1 rounded-md font-semibold text-sm", colorClass, borderClass)}>
        <BrainCircuit className="w-3.5 h-3.5" />
        {score}%
      </div>
      {showLabel && <span className="text-sm font-medium text-[var(--text-muted)]">Match Score</span>}
    </div>
  );
}
