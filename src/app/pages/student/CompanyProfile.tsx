import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import {
  getCompanyById,
  getOpportunitiesForCompany,
  getReviewsForCompany,
  getPublicStudentFeedbackByCompany,
  getAverageRating,
  type CompanyReview,
  type CompanyStudentFeedback,
} from "../../data/companyData";
import {
  AlertCircle,
  ArrowLeft,
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  ExternalLink,
  Globe,
  MapPin,
  Star,
  Users,
  ArrowRight,
  GraduationCap,
  X,
  BrainCircuit,
} from "lucide-react";

// ── Sub-components ─────────────────────────────────────────────────────────

function FactItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
        {label}
      </dt>
      <dd className="text-sm font-medium text-[var(--text-main)]">
        {value || <span className="text-[var(--text-muted)] font-normal">—</span>}
      </dd>
    </div>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating.toFixed(1)} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : "text-gray-200 dark:text-gray-700"
          }`}
        />
      ))}
    </span>
  );
}

// ── Opportunity row ────────────────────────────────────────────────────────

function OpportunityRow({
  opp,
  onView,
}: {
  opp: ReturnType<typeof getOpportunitiesForCompany>[number];
  onView: (oppId: string, trigger: HTMLButtonElement) => void;
}) {
  return (
    <div className="p-4 rounded-xl border border-[var(--border-main)] hover:border-blue-300 transition-colors">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <button
              type="button"
              onClick={(e) => onView(opp.id, e.currentTarget)}
              className="text-sm font-semibold text-[var(--text-main)] hover:text-blue-600 hover:underline text-left focus:outline-none focus-visible:underline"
            >
              {opp.title}
            </button>
            <Badge variant="blue">{opp.type}</Badge>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-[var(--text-muted)]">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {opp.location}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="w-3 h-3" />
              {opp.applicantsCount} applicants
            </span>
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={(e) => onView(opp.id, e.currentTarget as HTMLButtonElement)}
          className="shrink-0"
        >
          View Opportunity
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Button>
      </div>
    </div>
  );
}

// ── Read-only opportunity detail modal ────────────────────────────────────

function OpportunityDetailModal({
  opp,
  companyName,
  onClose,
}: {
  opp: ReturnType<typeof getOpportunitiesForCompany>[number];
  companyName: string;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Focus the close button when modal mounts
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  // Escape key closes the modal
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Prevent scroll on body while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="opp-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative w-full sm:max-w-xl max-h-[92dvh] flex flex-col rounded-t-2xl sm:rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 p-6 pb-4 border-b border-[var(--border-main)] shrink-0">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
              {companyName}
            </p>
            <h2
              id="opp-modal-title"
              className="text-lg font-bold text-[var(--text-main)] leading-snug"
            >
              {opp.title}
            </h2>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              <Badge variant="blue">{opp.type}</Badge>
              <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                <MapPin className="w-3 h-3" />
                {opp.location}
              </span>
            </div>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close opportunity details"
            className="shrink-0 p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--hover-bg)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-5">
          {/* Quick facts */}
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <dt className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-0.5">
                Match Score
              </dt>
              <dd className="text-2xl font-bold text-blue-600">{opp.matchScore}%</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-0.5">
                Applicants
              </dt>
              <dd className="text-sm font-medium text-[var(--text-main)]">{opp.applicantsCount}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-0.5">
                Type
              </dt>
              <dd className="text-sm font-medium text-[var(--text-main)]">{opp.type}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-0.5">
                Posted
              </dt>
              <dd className="text-sm font-medium text-[var(--text-main)]">{opp.postedAt}</dd>
            </div>
          </dl>

          {/* AI match explanation */}
          <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-800 dark:text-blue-300">
              <BrainCircuit className="w-4 h-4 shrink-0" />
              AI Match Analysis
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-400 leading-relaxed">
              {opp.matchDetails.explanation}
            </p>
            {(opp.matchDetails.strong.length > 0 || opp.matchDetails.missing.length > 0) && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {opp.matchDetails.strong.map((s) => (
                  <Badge key={s} variant="success" className="gap-1 text-[10px]">
                    <CheckCircle2 className="w-3 h-3" />
                    {s}
                  </Badge>
                ))}
                {opp.matchDetails.missing.map((s) => (
                  <Badge key={s} variant="danger" className="gap-1 text-[10px]">
                    <AlertCircle className="w-3 h-3" />
                    {s} (Missing)
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 px-6 py-4 border-t border-[var(--border-main)] bg-[var(--bg-secondary)]">
          <Button
            variant="outline"
            className="w-full"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Student review card ────────────────────────────────────────────────────

function StudentReviewCard({ review }: { review: CompanyReview }) {
  return (
    <Card>
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <p className="text-sm font-semibold text-[var(--text-main)]">{review.studentName}</p>
            <p className="text-xs text-[var(--text-muted)]">
              {review.opportunity} · {review.year}
            </p>
          </div>
          <StarRow rating={review.overallRating} />
        </div>
        <p className="text-sm text-[var(--text-main)] leading-relaxed">{review.writtenFeedback}</p>
        {review.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {review.skills.map((s) => (
              <Badge key={s} variant="blue" className="text-[10px] px-2 py-0.5">
                {s}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ── Company-to-student feedback card ──────────────────────────────────────

function CompanyFeedbackCard({ feedback }: { feedback: CompanyStudentFeedback }) {
  return (
    <Card>
      <CardContent className="p-5 space-y-2">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <p className="text-sm font-semibold text-[var(--text-main)]">
              {feedback.studentName}
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              {feedback.opportunity} · {feedback.year}
            </p>
          </div>
          <Badge variant="outline" className="text-[10px] shrink-0">
            {feedback.companyName}
          </Badge>
        </div>
        <p className="text-sm text-[var(--text-main)] leading-relaxed">
          {feedback.writtenFeedback}
        </p>
      </CardContent>
    </Card>
  );
}

// ── Sky cover placeholder ──────────────────────────────────────────────────

function SkyCoverPlaceholder() {
  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0369a1 0%, #0284c7 20%, #0ea5e9 50%, #38bdf8 75%, #7dd3fc 100%)",
      }}
    >
      <svg className="absolute" style={{ left: "6%", top: "28%", opacity: 0.35 }}
        width="320" height="100" viewBox="0 0 320 100" fill="none" aria-hidden="true">
        <ellipse cx="160" cy="72" rx="160" ry="44" fill="white" />
        <ellipse cx="100" cy="52" rx="90" ry="52" fill="white" />
        <ellipse cx="220" cy="56" rx="80" ry="44" fill="white" />
      </svg>
      <svg className="absolute" style={{ right: "12%", top: "18%", opacity: 0.28 }}
        width="240" height="78" viewBox="0 0 240 78" fill="none" aria-hidden="true">
        <ellipse cx="120" cy="58" rx="120" ry="32" fill="white" />
        <ellipse cx="72" cy="40" rx="66" ry="40" fill="white" />
        <ellipse cx="172" cy="44" rx="60" ry="34" fill="white" />
      </svg>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

type Tab = "overview" | "opportunities" | "feedback";

export function StudentCompanyProfile() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  // Show More state for feedback sections
  const [showMoreStudentReviews, setShowMoreStudentReviews] = useState(false);
  const [showMoreCompanyFeedback, setShowMoreCompanyFeedback] = useState(false);

  // Read-only opportunity detail modal
  const [modalOppId, setModalOppId] = useState<string | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const openModal = (oppId: string, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger;
    setModalOppId(oppId);
  };

  const closeModal = () => {
    setModalOppId(null);
    // Restore focus to the element that opened the modal
    requestAnimationFrame(() => lastTriggerRef.current?.focus());
  };

  const company = id ? getCompanyById(id) : undefined;

  if (!company) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => navigate("/student/companies")}
          className="flex items-center gap-1.5 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors focus:outline-none focus:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Companies
        </button>
        <Card>
          <CardContent className="p-12 text-center">
            <Building2 className="w-10 h-10 text-[var(--text-muted)] mx-auto mb-3" />
            <p className="font-semibold text-[var(--text-main)] mb-1">Company not found</p>
            <p className="text-sm text-[var(--text-muted)] mb-4">
              This company may have been removed or the link is invalid.
            </p>
            <Button onClick={() => navigate("/student/companies")}>Browse Companies</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const opportunities    = getOpportunitiesForCompany(company.id);
  const studentReviews   = getReviewsForCompany(company.id);
  const companyFeedbacks = getPublicStudentFeedbackByCompany(company.id);
  const avgRating        = getAverageRating(company.id);

  const initials = company.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Navigate to the Opportunities page filtered to this company (directory view)
  const handleViewAllOpportunities = () => {
    navigate(`/student/opportunities?company=${company.id}`);
  };

  const modalOpp = modalOppId ? opportunities.find((o) => o.id === modalOppId) ?? null : null;

  const TABS: { id: Tab; label: string; count?: number }[] = [
    { id: "overview",      label: "Overview" },
    { id: "opportunities", label: "Opportunities", count: opportunities.length },
    { id: "feedback",      label: "Public Feedback",
      count: studentReviews.length + companyFeedbacks.length },
  ];

  // Feedback: show first 3, expand on demand
  const PREVIEW = 3;
  const visibleStudentReviews   = showMoreStudentReviews   ? studentReviews   : studentReviews.slice(0, PREVIEW);
  const visibleCompanyFeedbacks = showMoreCompanyFeedback  ? companyFeedbacks : companyFeedbacks.slice(0, PREVIEW);

  return (
    <div className="space-y-6 pb-8">
      {/* Read-only opportunity detail modal */}
      {modalOpp && (
        <OpportunityDetailModal
          opp={modalOpp}
          companyName={company.name}
          onClose={closeModal}
        />
      )}

      {/* Back nav */}
      <button
        type="button"
        onClick={() => navigate("/student/companies")}
        className="flex items-center gap-1.5 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors focus:outline-none focus:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Companies
      </button>

      {/* Unverified notice */}
      {!company.verified && (
        <div className="flex items-start gap-3 p-4 rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-700">
          <Clock className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
              Verification Pending
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
              This company is awaiting verification by InternMatch administrators. Opportunities may
              be listed but the company's credentials have not yet been confirmed.
            </p>
          </div>
        </div>
      )}

      {/* Hero card */}
      <Card className="overflow-hidden">
        <div className="relative h-[180px] md:h-[200px] overflow-hidden">
          <SkyCoverPlaceholder />
        </div>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start gap-5 -mt-12">
            {/* Logo */}
            <div className="w-20 h-20 rounded-xl border-2 border-[var(--bg-main)] overflow-hidden bg-[var(--bg-secondary)] shrink-0 z-10">
              {company.logo ? (
                <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                  {initials}
                </div>
              )}
            </div>

            {/* Name + meta */}
            <div className="flex-1 min-w-0 sm:mt-8">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-[var(--text-main)]">{company.name}</h1>
                {company.verified ? (
                  <Badge variant="success" className="flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="warning" className="shrink-0">Pending Verification</Badge>
                )}
              </div>
              {company.tagline && (
                <p className="text-sm text-[var(--text-muted)] mb-2">{company.tagline}</p>
              )}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--text-muted)]">
                {company.industry && <span>{company.industry}</span>}
                {(company.city || company.country) && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {[company.city, company.country].filter(Boolean).join(", ")}
                  </span>
                )}
                {company.size && (
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {company.size}
                  </span>
                )}
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    <Globe className="w-3 h-3" />
                    Website
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </div>

            {/* View All Opportunities CTA */}
            {opportunities.length > 0 && (
              <div className="shrink-0 mt-2 sm:mt-8">
                <Button onClick={handleViewAllOpportunities}>
                  <Briefcase className="w-4 h-4 mr-1.5" />
                  {opportunities.length} Open Role{opportunities.length !== 1 ? "s" : ""}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-[var(--border-main)] overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors focus:outline-none ${
              activeTab === tab.id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                  activeTab === tab.id
                    ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
                    : "bg-[var(--bg-secondary)] text-[var(--text-muted)]"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Overview tab ── */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-5">
              <h2 className="text-base font-semibold">About {company.name}</h2>
              {company.description ? (
                <p className="text-sm text-[var(--text-main)] whitespace-pre-wrap leading-relaxed">
                  {company.description}
                </p>
              ) : (
                <p className="text-sm text-[var(--text-muted)] italic">No description provided.</p>
              )}
              <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 pt-4 border-t border-[var(--border-main)]">
                <FactItem label="Industry"     value={company.industry} />
                <FactItem label="Company Size" value={company.size} />
                <FactItem label="Founded"      value={company.yearFounded} />
                <FactItem label="Work Model"   value={company.workModel} />
              </dl>
            </CardContent>
          </Card>

          {company.specialties.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-base font-semibold mb-4">Areas of Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {company.specialties.map((s) => (
                    <Badge key={s} variant="blue" className="px-3 py-1 text-sm">
                      {s}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {company.workEnvironment && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-base font-semibold mb-3">Life at {company.name}</h2>
                  <p className="text-sm text-[var(--text-main)] whitespace-pre-wrap leading-relaxed">
                    {company.workEnvironment}
                  </p>
                </CardContent>
              </Card>
            )}
            {company.studentLearning && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-base font-semibold mb-3">{"What You'll Learn"}</h2>
                  <p className="text-sm text-[var(--text-main)] whitespace-pre-wrap leading-relaxed">
                    {company.studentLearning}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Opportunity preview */}
          {opportunities.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <h2 className="text-base font-semibold">Open Opportunities</h2>
                  <button
                    type="button"
                    onClick={handleViewAllOpportunities}
                    className="text-sm font-medium text-blue-600 hover:underline focus:outline-none focus:underline"
                  >
                    View all
                  </button>
                </div>
                <div className="space-y-3">
                  {opportunities.slice(0, 2).map((opp) => (
                    <OpportunityRow
                      key={opp.id}
                      opp={opp}
                      onView={openModal}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* ── Opportunities tab ── */}
      {activeTab === "opportunities" && (
        <div className="space-y-4">
          {opportunities.length > 0 ? (
            <>
              <p className="text-sm text-[var(--text-muted)]">
                {opportunities.length} active opportunit
                {opportunities.length !== 1 ? "ies" : "y"} at {company.name}
              </p>
              {opportunities.map((opp) => (
                <OpportunityRow
                  key={opp.id}
                  opp={opp}
                  onView={openModal}
                />
              ))}
              <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/60 dark:bg-blue-900/10 text-sm text-blue-800 dark:text-blue-300">
                Click "View Opportunity" to read details and your AI match analysis. To apply, visit
                the{" "}
                <button
                  type="button"
                  onClick={handleViewAllOpportunities}
                  className="underline font-medium hover:text-blue-900 dark:hover:text-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                >
                  Opportunities page
                </button>
                .
              </div>
            </>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Briefcase className="w-10 h-10 text-[var(--text-muted)] mx-auto mb-3" />
                <p className="font-semibold text-[var(--text-main)] mb-1">No open opportunities</p>
                <p className="text-sm text-[var(--text-muted)]">
                  {company.name} has no active roles right now. Check back later.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* ── Public Feedback tab ── */}
      {activeTab === "feedback" && (
        <div className="space-y-8">

          {/* SECTION A: Student Reviews */}
          <section>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h2 className="text-base font-semibold">Student Reviews</h2>
            </div>
            <p className="text-sm text-[var(--text-muted)] mb-4">
              What students say about this company.
            </p>

            {studentReviews.length > 0 ? (
              <>
                {/* Aggregate */}
                <Card className="mb-4">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex flex-col items-center justify-center text-center shrink-0">
                        <span className="text-5xl font-bold text-[var(--text-main)] leading-none">
                          {avgRating.toFixed(1)}
                        </span>
                        <StarRow rating={avgRating} />
                        <span className="text-xs text-[var(--text-muted)] mt-1">
                          {studentReviews.length} review{studentReviews.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="flex-1 space-y-2">
                        {[5, 4, 3, 2, 1].map((star) => {
                          const count = studentReviews.filter((r) => r.overallRating === star).length;
                          const pct   = studentReviews.length > 0 ? (count / studentReviews.length) * 100 : 0;
                          return (
                            <div key={star} className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                              <span className="w-4 shrink-0 text-right">{star}</span>
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
                              <div className="flex-1 h-2 rounded-full bg-muted dark:bg-gray-700 overflow-hidden">
                                <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                              </div>
                              <span className="w-4 shrink-0">{count}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Review list */}
                <div className="space-y-4">
                  {visibleStudentReviews.map((r) => (
                    <StudentReviewCard key={r.id} review={r} />
                  ))}
                </div>

                {studentReviews.length > PREVIEW && (
                  <button
                    type="button"
                    onClick={() => setShowMoreStudentReviews((p) => !p)}
                    className="mt-3 text-sm font-medium text-blue-600 hover:underline focus:outline-none focus:underline"
                  >
                    {showMoreStudentReviews
                      ? "Show fewer reviews"
                      : `Show ${studentReviews.length - PREVIEW} more review${studentReviews.length - PREVIEW !== 1 ? "s" : ""}`}
                  </button>
                )}
              </>
            ) : (
              <Card>
                <CardContent className="p-10 text-center">
                  <GraduationCap className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-2" />
                  <p className="text-sm text-[var(--text-muted)]">
                    No published feedback from students yet.
                  </p>
                </CardContent>
              </Card>
            )}
          </section>

          {/* Divider */}
          <div className="border-t border-[var(--border-main)]" />

          {/* SECTION B: Company Feedback About Students */}
          <section>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600">
                <Building2 className="w-4 h-4" />
              </div>
              <h2 className="text-base font-semibold">Company Feedback About Students</h2>
            </div>
            <p className="text-sm text-[var(--text-muted)] mb-4">
              Public feedback this company has shared about students.
            </p>

            {companyFeedbacks.length > 0 ? (
              <>
                <div className="space-y-4">
                  {visibleCompanyFeedbacks.map((f) => (
                    <CompanyFeedbackCard key={f.id} feedback={f} />
                  ))}
                </div>

                {companyFeedbacks.length > PREVIEW && (
                  <button
                    type="button"
                    onClick={() => setShowMoreCompanyFeedback((p) => !p)}
                    className="mt-3 text-sm font-medium text-blue-600 hover:underline focus:outline-none focus:underline"
                  >
                    {showMoreCompanyFeedback
                      ? "Show fewer"
                      : `Show ${companyFeedbacks.length - PREVIEW} more`}
                  </button>
                )}
              </>
            ) : (
              <Card>
                <CardContent className="p-10 text-center">
                  <Building2 className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-2" />
                  <p className="text-sm text-[var(--text-muted)]">
                    This company has not published public feedback about students yet.
                  </p>
                </CardContent>
              </Card>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
