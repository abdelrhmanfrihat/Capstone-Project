import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Plus, Star, MessageSquare, X, Inbox, Send, Lock, Globe } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../components/ui/tooltip";
import {
  FeedbackBadge,
  feedbackSectionLabelStyles,
  getFeedbackCategoryTone,
  getFeedbackStatusTone,
  getFeedbackVisibilityTone,
} from "../../components/shared/FeedbackBadge";

// ── Types ─────────────────────────────────────────────────────────────────────

type TabType = "all" | "private" | "public";
type FeedbackDirection = "received" | "given";
type FeedbackVisibility = "private" | "public";
type PublicStatus = "pending" | "published" | "hidden" | "rejected";

interface FeedbackRecord {
  id: string;
  direction: FeedbackDirection;
  company: string;
  opportunity: string;
  category: string;
  visibility: FeedbackVisibility;
  publicStatus?: PublicStatus;
  rating: number;
  date: string;
  comment: string;
  strengths?: string[];
  areasToDevelop?: string[];
  whatWorkedWell?: string[];
  whatCouldImprove?: string[];
}

// Eligible company shape for the submission modal
interface EligibleCompany {
  id: string;
  name: string;
  logo?: string;
  opportunity: string;
}

// ── Demo fixtures ─────────────────────────────────────────────────────────────
// Fictional demonstration content — not real company or student testimony.

const INITIAL_FEEDBACK: FeedbackRecord[] = [
  {
    id: "rec-1",
    direction: "received",
    company: "Stellar Cloud",
    opportunity: "Frontend Engineering Intern",
    category: "Interview Feedback",
    visibility: "private",
    rating: 4.2,
    date: "May 14, 2026",
    comment:
      "You explained your React component structure clearly and responded well to follow-up questions. Strengthen your handling of API failures and practise describing how you test loading and error states.",
    strengths: ["Clear technical explanations", "React fundamentals", "Receptiveness to feedback"],
    areasToDevelop: ["API error handling", "Testing approach"],
  },
  {
    id: "giv-1",
    direction: "given",
    company: "Stellar Cloud",
    opportunity: "Frontend Engineering Intern",
    category: "Interview Feedback",
    visibility: "public",
    publicStatus: "published",
    rating: 4.0,
    date: "May 14, 2026",
    comment:
      "The interviewer explained the role clearly and gave me time to discuss my projects. Sharing the interview format beforehand would have helped me prepare more effectively.",
    whatWorkedWell: ["Clear explanation of the role", "Time to discuss projects"],
    whatCouldImprove: ["Advance information about the interview format"],
  },
  {
    id: "giv-2",
    direction: "given",
    company: "TechNova",
    opportunity: "Frontend Training Program",
    category: "Training Feedback",
    visibility: "public",
    publicStatus: "pending",
    rating: 4.3,
    date: "May 12, 2026",
    comment:
      "The training included practical tasks and regular guidance from my mentor. A clearer weekly plan and more structured feedback on completed work would improve the experience.",
    whatWorkedWell: ["Practical assignments", "Accessible mentor support"],
    whatCouldImprove: ["Weekly planning", "Structured task feedback"],
  },
  {
    id: "rec-2",
    direction: "received",
    company: "BrightLabs",
    opportunity: "UI Developer Intern",
    category: "Interview Feedback",
    visibility: "private",
    rating: 3.5,
    date: "May 10, 2026",
    comment:
      "Your interface implementation showed attention to detail, and you explained your design choices clearly. For future interviews, prepare examples of responsive layouts and how you check keyboard accessibility.",
    strengths: ["Attention to detail", "Clear design reasoning"],
    areasToDevelop: ["Responsive layout examples", "Accessibility testing"],
  },
  {
    id: "rec-3",
    direction: "received",
    company: "TechNova",
    opportunity: "Frontend Training Program",
    category: "Training Feedback",
    visibility: "public",
    publicStatus: "published",
    rating: 4.6,
    date: "May 08, 2026",
    comment:
      "During training, you completed assigned interface tasks reliably, asked useful questions, and incorporated mentor feedback into later work. Your next development goal is to estimate tasks more accurately and document implementation decisions.",
    strengths: ["Reliability", "Collaboration", "Response to feedback"],
    areasToDevelop: ["Task estimation", "Technical documentation"],
  },
];

// Prototype: companies eligible for student feedback — interviewed the student,
// passed the interview, and accepted them for training (application status "Matched").
// In production this would be derived from the authenticated student's application records.
const ELIGIBLE_COMPANIES_DEMO: EligibleCompany[] = [
  {
    id: "c3",
    name: "TechNova",
    logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=64&h=64&q=80",
    opportunity: "Frontend Training Program",
  },
];

// ── Shared star components ────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating.toFixed(1)} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= Math.round(rating)
              ? "fill-yellow-500 text-yellow-500"
              : "text-gray-300 dark:text-gray-600"
          }`}
        />
      ))}
    </div>
  );
}

function StarRatingInput({
  value,
  onChange,
  error,
}: {
  value: number;
  onChange: (v: number) => void;
  error?: string;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div>
      <div
        className="flex items-center gap-1"
        onMouseLeave={() => setHovered(0)}
        role="group"
        aria-label="Overall rating"
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            aria-label={`${star} out of 5`}
            aria-pressed={value === star}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" && star < 5) onChange(star + 1);
              if (e.key === "ArrowLeft" && star > 1) onChange(star - 1);
            }}
            className="p-0.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <Star
              className={`w-7 h-7 transition-colors ${
                star <= (hovered || value)
                  ? "fill-yellow-500 text-yellow-500"
                  : "text-gray-300 dark:text-gray-600"
              }`}
            />
          </button>
        ))}
        {value > 0 && (
          <span className="ml-2 text-sm font-medium text-[var(--text-main)]">
            {value} out of 5
          </span>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-600 dark:text-red-400 mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// ── Publication status helpers ────────────────────────────────────────────────

function publicStatusNote(status: PublicStatus): string {
  switch (status) {
    case "pending":  return "Awaiting approval before public display.";
    case "published": return "Published publicly.";
    case "hidden":   return "Not currently displayed publicly.";
    case "rejected": return "Not approved for public display.";
  }
}

// ── Feedback card ─────────────────────────────────────────────────────────────

function FeedbackCard({
  record,
  onClick,
}: {
  record: FeedbackRecord;
  onClick: () => void;
}) {
  const isGiven = record.direction === "given";
  const hasReceivedSections =
    !isGiven &&
    ((record.strengths?.length ?? 0) > 0 || (record.areasToDevelop?.length ?? 0) > 0);
  const hasGivenSections =
    isGiven &&
    ((record.whatWorkedWell?.length ?? 0) > 0 || (record.whatCouldImprove?.length ?? 0) > 0);

  return (
    <Card className="cursor-pointer hover:border-blue-300 transition-colors" onClick={onClick}>
      <CardContent className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-base leading-snug">
              {isGiven ? `Given to ${record.company}` : `Received from ${record.company}`}
            </h4>
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <FeedbackBadge tone={getFeedbackCategoryTone(record.category)}>
                {record.category}
              </FeedbackBadge>
              <FeedbackBadge
                tone={getFeedbackVisibilityTone(record.visibility)}
                icon={record.visibility === "private" ? Lock : Globe}
              >
                {record.visibility === "private" ? "Private" : "Public"}
              </FeedbackBadge>
              {record.visibility === "public" && record.publicStatus === "published" && (
                <FeedbackBadge tone={getFeedbackStatusTone("Published")}>Published</FeedbackBadge>
              )}
              {record.visibility === "public" &&
                record.publicStatus &&
                record.publicStatus !== "published" && (
                  <FeedbackBadge tone={getFeedbackStatusTone(record.publicStatus)}>
                    {record.publicStatus === "pending"
                      ? "Pending Review"
                      : record.publicStatus === "hidden"
                      ? "Hidden"
                      : "Rejected"}
                  </FeedbackBadge>
                )}
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-1.5">
              {record.opportunity} · {record.date}
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-0.5 shrink-0">
            <StarRating rating={record.rating} />
            <span className="text-sm font-semibold">{record.rating.toFixed(1)} / 5</span>
          </div>
        </div>

        {/* Comment */}
        <p className="text-sm text-[var(--text-main)] leading-relaxed mb-4">{record.comment}</p>

        {/* Supporting sections — received */}
        {hasReceivedSections && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[var(--border-main)]">
            {(record.strengths?.length ?? 0) > 0 && (
              <div>
                <h5 className={`text-xs font-semibold ${feedbackSectionLabelStyles.strengths} uppercase tracking-wider mb-2`}>
                  Strengths
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {record.strengths!.map((s) => (
                    <FeedbackBadge key={s} tone="strength">{s}</FeedbackBadge>
                  ))}
                </div>
              </div>
            )}
            {(record.areasToDevelop?.length ?? 0) > 0 && (
              <div>
                <h5 className={`text-xs font-semibold ${feedbackSectionLabelStyles.areas} uppercase tracking-wider mb-2`}>
                  Areas to Develop
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {record.areasToDevelop!.map((a) => (
                    <FeedbackBadge key={a} tone="areas">{a}</FeedbackBadge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Supporting sections — given */}
        {hasGivenSections && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[var(--border-main)]">
            {(record.whatWorkedWell?.length ?? 0) > 0 && (
              <div>
                <h5 className={`text-xs font-semibold ${feedbackSectionLabelStyles.strengths} uppercase tracking-wider mb-2`}>
                  What Worked Well
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {record.whatWorkedWell!.map((s) => (
                    <FeedbackBadge key={s} tone="strength">{s}</FeedbackBadge>
                  ))}
                </div>
              </div>
            )}
            {(record.whatCouldImprove?.length ?? 0) > 0 && (
              <div>
                <h5 className={`text-xs font-semibold ${feedbackSectionLabelStyles.areas} uppercase tracking-wide mb-2`}>
                  AREAS TO DEVELOP
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {record.whatCouldImprove!.map((a) => (
                    <FeedbackBadge key={a} tone="areas">{a}</FeedbackBadge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Status notes */}
        {record.visibility === "private" && (
          <p className="mt-3 text-xs text-[var(--text-muted)]">
            This feedback is not publicly displayed.
          </p>
        )}
        {record.visibility === "public" &&
          record.publicStatus &&
          record.publicStatus !== "published" && (
            <div className="mt-3 p-2.5 bg-amber-50 dark:bg-amber-500/10 rounded-lg border border-amber-200 dark:border-amber-500/30 text-xs text-amber-800 dark:text-amber-400">
              {publicStatusNote(record.publicStatus)}
            </div>
          )}
      </CardContent>
    </Card>
  );
}

// ── Main page component ───────────────────────────────────────────────────────

export function StudentFeedback() {

  // Tab state
  const [activeTab, setActiveTab] = useState<TabType>("all");

  // Feedback records — seeded with demo fixtures; new submissions append here
  const [feedbackRecords, setFeedbackRecords] = useState<FeedbackRecord[]>(INITIAL_FEEDBACK);

  // Details drawer
  const [selectedRecord, setSelectedRecord] = useState<FeedbackRecord | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);

  // Submission modal
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitCompanyId, setSubmitCompanyId] = useState(
    ELIGIBLE_COMPANIES_DEMO.length === 1 ? ELIGIBLE_COMPANIES_DEMO[0].id : ""
  );
  const [submitRating, setSubmitRating] = useState(0);
  const [submitComment, setSubmitComment] = useState("");
  const [submitErrors, setSubmitErrors] = useState<Record<string, string>>({});
  const [submitBusy, setSubmitBusy] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Refs for focus management
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const submitModalRef = useRef<HTMLDivElement>(null);
  const drawerCloseRef = useRef<HTMLButtonElement>(null);

  // ── Focus trap: submission modal ──
  useEffect(() => {
    if (!showSubmitModal) return;
    const modal = submitModalRef.current;
    if (!modal) return;
    const getFocusables = () =>
      Array.from(
        modal.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
    // Focus first element
    setTimeout(() => getFocusables()[0]?.focus(), 10);

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeSubmitModal();
        return;
      }
      if (e.key === "Tab") {
        const focusables = getFocusables();
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [showSubmitModal]);

  // ── Helpers ───────────────────────────────────────────────────────────────

  function openSubmitModal() {
    setSubmitCompanyId(ELIGIBLE_COMPANIES_DEMO.length === 1 ? ELIGIBLE_COMPANIES_DEMO[0].id : "");
    setSubmitRating(0);
    setSubmitComment("");
    setSubmitErrors({});
    setSubmitError("");
    setShowSubmitModal(true);
  }

  function closeSubmitModal() {
    setShowSubmitModal(false);
    addButtonRef.current?.focus();
  }

  function validateSubmit(): boolean {
    const errs: Record<string, string> = {};
    if (!submitCompanyId) errs.company = "Select an eligible company.";
    if (submitRating === 0) errs.rating = "Choose an overall rating.";
    if (!submitComment.trim()) errs.comment = "Enter your feedback.";
    setSubmitErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");
    if (!validateSubmit()) return;

    setSubmitBusy(true);
    try {
      // Prototype: simulated async submission
      await new Promise<void>((resolve, reject) =>
        setTimeout(() => resolve(), 1200)
      );

      const company = ELIGIBLE_COMPANIES_DEMO.find((c) => c.id === submitCompanyId)!;
      const now = new Date();
      const dateStr = now.toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric",
      });

      const newRecord: FeedbackRecord = {
        id: `giv-${now.getTime()}`,
        direction: "given",
        company: company.name,
        opportunity: company.opportunity,
        category: "Training Feedback",
        visibility: "public",
        publicStatus: "pending",
        rating: submitRating,
        date: dateStr,
        comment: submitComment.trim(),
      };

      setFeedbackRecords((prev) => [newRecord, ...prev]);
      closeSubmitModal();
      toast.success("Your feedback has been submitted.");
    } catch {
      setSubmitError("We couldn't submit your feedback. Please try again.");
    } finally {
      setSubmitBusy(false);
    }
  }

  // ── Derived data ──────────────────────────────────────────────────────────

  const receivedCount = feedbackRecords.filter((f) => f.direction === "received").length;
  const givenCount    = feedbackRecords.filter((f) => f.direction === "given").length;
  const privateCount  = feedbackRecords.filter(
    (f) => f.direction === "received" && f.visibility === "private"
  ).length;
  const publicCount   = feedbackRecords.filter((f) => f.visibility === "public").length;

  const statCards = [
    {
      label: "Received from companies",
      value: receivedCount,
      Icon: Inbox,
      iconClass: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    },
    {
      label: "Given to companies",
      value: givenCount,
      Icon: Send,
      iconClass: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    },
    {
      label: "Private feedback",
      value: privateCount,
      Icon: Lock,
      iconClass: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    },
    {
      label: "Public feedback",
      value: publicCount,
      Icon: Globe,
      iconClass: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    },
  ];

  const tabRecords: Record<TabType, FeedbackRecord[]> = {
    all:     feedbackRecords,
    private: feedbackRecords.filter(
      (f) => f.direction === "received" && f.visibility === "private"
    ),
    public:  feedbackRecords.filter((f) => f.visibility === "public"),
  };

  const TABS: { id: TabType; label: string }[] = [
    { id: "all",     label: "All Feedback" },
    { id: "private", label: "Private Feedback" },
    { id: "public",  label: "Public Feedback" },
  ];

  const SECTION_COPY: Record<TabType, { heading: string; description: string }> = {
    all: {
      heading:     "All Feedback",
      description: "Feedback you've received from companies and shared about your experiences.",
    },
    private: {
      heading:     "Private Feedback",
      description: "Private feedback companies have shared with you.",
    },
    public: {
      heading:     "Public Feedback",
      description: "Public feedback from companies and reviews you've shared after interviews or training.",
    },
  };

  const EMPTY_COPY: Record<TabType, { title: string; description: string }> = {
    all:     { title: "No feedback yet.", description: "Feedback you receive and share will appear here." },
    private: { title: "No private feedback yet.", description: "Private feedback from companies will appear here." },
    public:  { title: "No public feedback yet.", description: "Public feedback you receive or share will appear here." },
  };

  const activeRecords = tabRecords[activeTab];
  const { heading, description } = SECTION_COPY[activeTab];
  const { title: emptyTitle, description: emptyDesc } = EMPTY_COPY[activeTab];

  const selectedCompanyForModal = ELIGIBLE_COMPANIES_DEMO.find((c) => c.id === submitCompanyId);
  const hasEligibleCompanies = ELIGIBLE_COMPANIES_DEMO.length > 0;

  // ── Tab keyboard navigation ───────────────────────────────────────────────

  function handleTabKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, currentId: TabType) {
    const ids = TABS.map((t) => t.id);
    const idx = ids.indexOf(currentId);
    if (e.key === "ArrowRight") {
      e.preventDefault(); setActiveTab(ids[(idx + 1) % ids.length]);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault(); setActiveTab(ids[(idx - 1 + ids.length) % ids.length]);
    } else if (e.key === "Home") {
      e.preventDefault(); setActiveTab(ids[0]);
    } else if (e.key === "End") {
      e.preventDefault(); setActiveTab(ids[ids.length - 1]);
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* ── Page heading + add button ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Feedback</h1>
          <p className="text-[var(--text-muted)]">
            Review feedback from companies and the feedback you've shared about your interview and
            training experiences.
          </p>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              ref={addButtonRef}
              onClick={openSubmitModal}
              aria-label="Add feedback"
              title="Add feedback"
              className="shrink-0 h-11 min-h-11 w-11 px-3 sm:h-10 sm:min-h-10 sm:w-auto sm:px-4 rounded-[10px] bg-blue-600 hover:bg-blue-700 active:scale-95 flex items-center justify-center gap-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <Plus className="w-5 h-5 text-white" aria-hidden="true" />
              <span className="hidden sm:inline text-sm font-medium text-white">Add feedback</span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Add feedback</TooltipContent>
        </Tooltip>
      </div>

      {/* ── Tab navigation ── */}
      <div
        role="tablist"
        aria-label="Feedback sections"
        className="flex gap-0 border-b border-[var(--border-main)] overflow-x-auto"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            id={`feedback-tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`feedback-panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(e) => handleTabKeyDown(e, tab.id)}
            className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${
              activeTab === tab.id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Compact summary row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, Icon, iconClass }) => (
          <Card
            key={label}
            className="p-5 bg-white border border-slate-200 dark:bg-card dark:border-border shadow-sm hover:-translate-y-0.5 hover:shadow-md transition motion-reduce:transform-none motion-reduce:hover:translate-y-0 motion-reduce:transition-none"
          >
            <div className="flex h-full min-w-0 items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-3xl font-semibold tabular-nums whitespace-nowrap">{value}</div>
                <div className="mt-1 text-sm text-muted-foreground leading-snug">{label}</div>
              </div>
              <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${iconClass}`}>
                <Icon className="size-5" aria-hidden="true" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* ── Active tab panel ── */}
      <div
        role="tabpanel"
        id={`feedback-panel-${activeTab}`}
        aria-labelledby={`feedback-tab-${activeTab}`}
      >
        <div className="mb-4">
          <h2 className="text-lg font-bold">{heading}</h2>
          <p className="text-sm text-[var(--text-muted)]">{description}</p>
          {activeTab === "private" && (
            <p className="text-xs text-[var(--text-muted)] mt-1">
              This feedback is not publicly displayed.
            </p>
          )}
        </div>

        <p className="text-xs text-[var(--text-muted)] mb-4">
          Demo data · Fictional demonstration content, not real company or student testimony.
        </p>

        <div className="space-y-4">
          {activeRecords.length > 0 ? (
            activeRecords.map((record) => (
              <FeedbackCard
                key={record.id}
                record={record}
                onClick={() => { setSelectedRecord(record); setShowDrawer(true); }}
              />
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{emptyTitle}</h3>
                <p className="text-[var(--text-muted)]">{emptyDesc}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* ── Details drawer ── */}
      {showDrawer && selectedRecord && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex justify-end"
          onClick={() => setShowDrawer(false)}
        >
          <div
            className="bg-[var(--bg-main)] w-full max-w-2xl h-full overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-bold">Feedback Details</h2>
                <button
                  ref={drawerCloseRef}
                  onClick={() => setShowDrawer(false)}
                  aria-label="Close"
                  className="p-2 hover:bg-muted dark:hover:bg-gray-800 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <Card>
                <CardContent className="p-5">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-[var(--text-muted)] mb-1">Direction</div>
                      <div className="font-semibold">
                        {selectedRecord.direction === "given"
                          ? `Given to ${selectedRecord.company}`
                          : `Received from ${selectedRecord.company}`}
                      </div>
                    </div>
                    <div>
                      <div className="text-[var(--text-muted)] mb-1">Opportunity</div>
                      <div className="font-semibold">{selectedRecord.opportunity}</div>
                    </div>
                    <div>
                      <div className="text-[var(--text-muted)] mb-1">Category</div>
                      <FeedbackBadge tone={getFeedbackCategoryTone(selectedRecord.category)}>{selectedRecord.category}</FeedbackBadge>
                    </div>
                    <div>
                      <div className="text-[var(--text-muted)] mb-1">Visibility</div>
                      <FeedbackBadge
                        tone={getFeedbackVisibilityTone(selectedRecord.visibility)}
                        icon={selectedRecord.visibility === "private" ? Lock : Globe}
                      >
                        {selectedRecord.visibility === "private" ? "Private" : "Public"}
                      </FeedbackBadge>
                    </div>
                    {selectedRecord.publicStatus && (
                      <div>
                        <div className="text-[var(--text-muted)] mb-1">Publication Status</div>
                        <FeedbackBadge tone={getFeedbackStatusTone(selectedRecord.publicStatus)}>
                          {selectedRecord.publicStatus === "published" ? "Published" :
                           selectedRecord.publicStatus === "pending"   ? "Pending Review" :
                           selectedRecord.publicStatus === "hidden"    ? "Hidden" : "Rejected"}
                        </FeedbackBadge>
                      </div>
                    )}
                    <div>
                      <div className="text-[var(--text-muted)] mb-1">Date</div>
                      <div className="font-semibold">{selectedRecord.date}</div>
                    </div>
                    <div>
                      <div className="text-[var(--text-muted)] mb-1">Rating</div>
                      <div className="flex items-center gap-2">
                        <StarRating rating={selectedRecord.rating} />
                        <span className="font-semibold text-sm">{selectedRecord.rating.toFixed(1)} / 5</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Feedback Comment</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-sm text-[var(--text-main)] leading-relaxed">{selectedRecord.comment}</p>
                </CardContent>
              </Card>

              {selectedRecord.direction === "received" && (
                <>
                  {(selectedRecord.strengths?.length ?? 0) > 0 && (
                    <Card>
                      <CardHeader><CardTitle className={`text-base ${feedbackSectionLabelStyles.strengths}`}>Strengths</CardTitle></CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {selectedRecord.strengths!.map((s) => (
                            <FeedbackBadge key={s} tone="strength">{s}</FeedbackBadge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  {(selectedRecord.areasToDevelop?.length ?? 0) > 0 && (
                    <Card>
                      <CardHeader><CardTitle className={`text-base ${feedbackSectionLabelStyles.areas}`}>Areas to Develop</CardTitle></CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {selectedRecord.areasToDevelop!.map((a) => (
                            <FeedbackBadge key={a} tone="areas">{a}</FeedbackBadge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}

              {selectedRecord.direction === "given" && (
                <>
                  {(selectedRecord.whatWorkedWell?.length ?? 0) > 0 && (
                    <Card>
                      <CardHeader><CardTitle className={`text-base ${feedbackSectionLabelStyles.strengths}`}>What Worked Well</CardTitle></CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {selectedRecord.whatWorkedWell!.map((s) => (
                            <FeedbackBadge key={s} tone="strength">{s}</FeedbackBadge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  {(selectedRecord.whatCouldImprove?.length ?? 0) > 0 && (
                    <Card>
                      <CardHeader><CardTitle className={`text-base ${feedbackSectionLabelStyles.areas}`}>What Could Improve</CardTitle></CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {selectedRecord.whatCouldImprove!.map((a) => (
                            <FeedbackBadge key={a} tone="areas">{a}</FeedbackBadge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ── Feedback submission modal ── */}
      {showSubmitModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={closeSubmitModal}
        >
          <div
            ref={submitModalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="submit-modal-title"
            className="bg-[var(--bg-main)] rounded-xl shadow-2xl w-full max-w-[520px] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 sm:p-7 space-y-5">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 id="submit-modal-title" className="text-xl font-bold">
                    Add feedback
                  </h2>
                  <p className="text-sm text-[var(--text-muted)] mt-1">
                    Share feedback about a company that interviewed you and accepted you for
                    training.
                  </p>
                </div>
                <button
                  onClick={closeSubmitModal}
                  aria-label="Close"
                  className="p-2 hover:bg-muted dark:hover:bg-gray-800 rounded-lg shrink-0 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!hasEligibleCompanies ? (
                /* ── No eligible companies ── */
                <>
                  <div className="py-6 text-center space-y-3">
                    <h3 className="font-bold text-lg">No eligible companies yet</h3>
                    <p className="text-sm text-[var(--text-muted)] max-w-xs mx-auto">
                      You can give feedback after a company interviews you, marks your interview as
                      passed, and accepts you for training.
                    </p>
                  </div>
                  <Button variant="outline" className="w-full" onClick={closeSubmitModal}>
                    Close
                  </Button>
                </>
              ) : (
                /* ── Submission form ── */
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Company field */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">Company</label>
                    <p className="text-xs text-[var(--text-muted)] mb-3">
                      Only companies that interviewed you, passed your interview, and accepted you
                      for training are shown.
                    </p>

                    {ELIGIBLE_COMPANIES_DEMO.length === 1 ? (
                      /* Single eligible company — read-only card */
                      <div className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border-main)] bg-[var(--bg-secondary)]">
                        {ELIGIBLE_COMPANIES_DEMO[0].logo && (
                          <img
                            src={ELIGIBLE_COMPANIES_DEMO[0].logo}
                            alt={ELIGIBLE_COMPANIES_DEMO[0].name}
                            className="w-10 h-10 rounded-lg object-cover shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm">{ELIGIBLE_COMPANIES_DEMO[0].name}</p>
                          <p className="text-xs text-[var(--text-muted)] truncate">
                            {ELIGIBLE_COMPANIES_DEMO[0].opportunity}
                          </p>
                        </div>
                        <FeedbackBadge tone="published" className="shrink-0">
                          Accepted for training
                        </FeedbackBadge>
                      </div>
                    ) : (
                      /* Multiple eligible companies — dropdown */
                      <select
                        value={submitCompanyId}
                        onChange={(e) => setSubmitCompanyId(e.target.value)}
                        aria-describedby={submitErrors.company ? "company-error" : undefined}
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border-main)] bg-[var(--bg-main)] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select an eligible company</option>
                        {ELIGIBLE_COMPANIES_DEMO.map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    )}

                    {submitErrors.company && (
                      <p id="company-error" className="text-xs text-red-600 dark:text-red-400 mt-1" role="alert">
                        {submitErrors.company}
                      </p>
                    )}
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Overall rating <span className="text-red-500">*</span>
                    </label>
                    <StarRatingInput
                      value={submitRating}
                      onChange={(v) => {
                        setSubmitRating(v);
                        if (v > 0) setSubmitErrors((e) => ({ ...e, rating: "" }));
                      }}
                      error={submitErrors.rating}
                    />
                  </div>

                  {/* Comment */}
                  <div>
                    <label htmlFor="submit-comment" className="block text-sm font-semibold mb-2">
                      Your feedback <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="submit-comment"
                      rows={5}
                      maxLength={1000}
                      value={submitComment}
                      onChange={(e) => {
                        setSubmitComment(e.target.value);
                        if (e.target.value.trim()) setSubmitErrors((err) => ({ ...err, comment: "" }));
                      }}
                      placeholder="Describe your interview experience and communication with the company."
                      aria-describedby={
                        [submitErrors.comment ? "comment-error" : "", "comment-counter"]
                          .filter(Boolean)
                          .join(" ") || undefined
                      }
                      className="w-full px-3 py-2 rounded-lg border border-[var(--border-main)] bg-[var(--bg-main)] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                    <div className="flex justify-between mt-1">
                      {submitErrors.comment ? (
                        <p id="comment-error" className="text-xs text-red-600 dark:text-red-400" role="alert">
                          {submitErrors.comment}
                        </p>
                      ) : (
                        <span />
                      )}
                      <span
                        id="comment-counter"
                        className="text-xs text-[var(--text-muted)]"
                        aria-live="polite"
                      >
                        {submitComment.length} / 1000
                      </span>
                    </div>
                  </div>

                  {/* Submission error */}
                  {submitError && (
                    <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800" role="alert">
                      {submitError}
                    </p>
                  )}

                  {/* Footer actions */}
                  <div className="flex gap-3 pt-1">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={closeSubmitModal}
                      disabled={submitBusy}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={submitBusy}
                    >
                      {submitBusy ? "Submitting…" : "Submit feedback"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
