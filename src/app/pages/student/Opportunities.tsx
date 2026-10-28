import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { MatchScore } from "../../components/ui/MatchScore";
import { MOCK_OPPORTUNITIES, MOCK_STUDENTS } from "../../data/mockData";
import { getCompanyById } from "../../data/companyData";
import {
  evaluateEligibility,
  ELIGIBILITY_POLICY,
  type EligibilityResult,
} from "../../data/eligibilityPolicy";
import {
  Search,
  Filter,
  MapPin,
  Clock,
  BrainCircuit,
  CheckCircle2,
  AlertCircle,
  Bookmark,
  BookmarkCheck,
  X,
  Building2,
  Info,
  ShieldAlert,
} from "lucide-react";

type TabType = "discover" | "saved" | "applied";

// ── Eligibility UI helpers ─────────────────────────────────────────────────

function EligibilityIndicator({ result }: { result: EligibilityResult }) {
  if (result.status === "already_applied") return null;
  const cfg = {
    eligible:    { dot: "bg-green-500",  text: "Eligible to apply",  cls: "text-green-700 dark:text-green-400" },
    ineligible:  { dot: "bg-red-500",    text: "Not currently eligible", cls: "text-red-600 dark:text-red-400" },
    policy_unset:{ dot: "bg-amber-600 dark:bg-amber-500",  text: "Applications paused", cls: "text-amber-700 dark:text-amber-400" },
  } as const;
  const c = cfg[result.status];
  return (
    <div className={`flex items-center gap-1.5 text-xs font-medium ${c.cls}`}>
      <div className={`w-2 h-2 rounded-full shrink-0 ${c.dot}`} />
      {c.text}
    </div>
  );
}

function EligibilityBanner({ result }: { result: EligibilityResult }) {
  if (result.status === "eligible") {
    return (
      <div className="flex items-start gap-3 p-4 rounded-xl border border-green-300 bg-green-50/60 dark:bg-green-900/10 dark:border-green-700">
        <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
        <p className="text-sm text-green-800 dark:text-green-300 font-medium">
          You meet the application requirements for this opportunity.
        </p>
      </div>
    );
  }
  if (result.status === "already_applied") {
    return (
      <div className="flex items-start gap-3 p-4 rounded-xl border border-blue-300 bg-blue-50/60 dark:bg-blue-900/10 dark:border-blue-700">
        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
          You have already applied to this opportunity. Track your application in My Activity.
        </p>
      </div>
    );
  }
  if (result.status === "ineligible") {
    return (
      <div className="flex items-start gap-3 p-4 rounded-xl border border-red-300 bg-red-50/60 dark:bg-red-900/10 dark:border-red-700">
        <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-red-800 dark:text-red-300 font-semibold mb-1.5">
            {"You're not currently eligible to apply."}
          </p>
          <ul className="space-y-1">
            {result.reasons.map((r, i) => (
              <li key={i} className="text-xs text-red-700 dark:text-red-400 flex items-start gap-1.5">
                <AlertCircle className="w-3 h-3 shrink-0 mt-0.5" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  // policy_unset
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-700">
      <Info className="w-4 h-4 text-amber-700 dark:text-amber-600 shrink-0 mt-0.5" />
      <div>
        <p className="text-sm text-amber-800 dark:text-amber-300 font-semibold mb-0.5">
          Application eligibility is not available yet.
        </p>
        <p className="text-xs text-amber-700 dark:text-amber-400">
          Applications are temporarily unavailable while eligibility requirements are being finalized.
        </p>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export function StudentOpportunities() {
  const student = MOCK_STUDENTS[0];
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // URL parameters
  const companyFilterId = searchParams.get("company");
  const opportunityFilterId = searchParams.get("opportunity");

  // Tabs and search
  const [activeTab, setActiveTab] = useState<TabType>("discover");
  const [search, setSearch] = useState("");

  // Saved / applied tracking
  const [savedOpportunities, setSavedOpportunities] = useState<string[]>([]);
  const [appliedOpportunities, setAppliedOpportunities] = useState<string[]>([]);

  // Detail + apply modal (unified)
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<
    (typeof MOCK_OPPORTUNITIES)[number] | null
  >(null);
  const [applicationMessage, setApplicationMessage] = useState("");
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Success modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successOpportunity, setSuccessOpportunity] = useState<
    (typeof MOCK_OPPORTUNITIES)[number] | null
  >(null);

  // Derived: company filter info for the banner
  const companyFilter = companyFilterId ? getCompanyById(companyFilterId) : null;

  // Auto-open specific opportunity from URL param
  useEffect(() => {
    if (!opportunityFilterId) return;
    const opp = MOCK_OPPORTUNITIES.find((o) => o.id === opportunityFilterId);
    if (opp) {
      setSelectedOpportunity(opp);
      setApplicationMessage("");
      setConfirmChecked(false);
      setSubmitError(null);
      setShowDetailModal(true);
    }
  }, [opportunityFilterId]);

  // ── Helpers ──────────────────────────────────────────────────────────────

  const isOpportunitySaved   = (id: string) => savedOpportunities.includes(id);
  const isOpportunityApplied = (id: string) => appliedOpportunities.includes(id);

  const discoverOpportunities = MOCK_OPPORTUNITIES.filter((opp) => {
    if (companyFilterId && opp.companyId !== companyFilterId) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        opp.title.toLowerCase().includes(q) ||
        opp.companyName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const savedList   = MOCK_OPPORTUNITIES.filter((o) => isOpportunitySaved(o.id));
  const appliedList = MOCK_OPPORTUNITIES.filter((o) => isOpportunityApplied(o.id));

  // ── Event handlers ────────────────────────────────────────────────────────

  const openDetail = (opp: (typeof MOCK_OPPORTUNITIES)[number]) => {
    setSelectedOpportunity(opp);
    setApplicationMessage("");
    setConfirmChecked(false);
    setSubmitError(null);
    setShowDetailModal(true);
  };

  const closeDetail = () => {
    setShowDetailModal(false);
    if (opportunityFilterId) {
      const next = new URLSearchParams(searchParams);
      next.delete("opportunity");
      setSearchParams(next, { replace: true });
    }
  };

  const handleSaveClick = (opp: (typeof MOCK_OPPORTUNITIES)[number]) => {
    setSavedOpportunities((prev) =>
      isOpportunitySaved(opp.id)
        ? prev.filter((id) => id !== opp.id)
        : [...prev, opp.id]
    );
  };

  const clearCompanyFilter = () => {
    const next = new URLSearchParams(searchParams);
    next.delete("company");
    setSearchParams(next, { replace: true });
  };

  const handleSubmitApplication = async () => {
    if (!selectedOpportunity || isSubmitting) return;

    // Re-validate with the latest state before submitting
    const recheck = evaluateEligibility({
      studentStatus: student.status,
      opportunityStatus: selectedOpportunity.status,
      matchScore: selectedOpportunity.matchScore,
      alreadyApplied: isOpportunityApplied(selectedOpportunity.id),
      policy: ELIGIBILITY_POLICY,
    });

    if (recheck.status !== "eligible") {
      setSubmitError(
        recheck.status === "already_applied"
          ? "You have already applied to this opportunity."
          : recheck.reasons[0] ?? "You are not currently eligible to apply."
      );
      return;
    }

    if (!confirmChecked) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await new Promise<void>((res) => setTimeout(res, 900));
      const submitted = selectedOpportunity;
      setAppliedOpportunities((prev) => [...prev, submitted.id]);
      setShowDetailModal(false);
      setSuccessOpportunity(submitted);
      setShowSuccessModal(true);
    } catch {
      setSubmitError(
        "Something went wrong. Your application was not submitted. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Live eligibility for the selected opportunity in the modal ────────────

  const modalEligibility = selectedOpportunity
    ? evaluateEligibility({
        studentStatus: student.status,
        opportunityStatus: selectedOpportunity.status,
        matchScore: selectedOpportunity.matchScore,
        alreadyApplied: isOpportunityApplied(selectedOpportunity.id),
        policy: ELIGIBILITY_POLICY,
      })
    : null;

  // ── Opportunity card renderer ─────────────────────────────────────────────

  const renderOpportunityCard = (
    opp: (typeof MOCK_OPPORTUNITIES)[number],
    showRemoveButton = false
  ) => {
    const eligibility = evaluateEligibility({
      studentStatus: student.status,
      opportunityStatus: opp.status,
      matchScore: opp.matchScore,
      alreadyApplied: isOpportunityApplied(opp.id),
      policy: ELIGIBILITY_POLICY,
    });

    return (
      <Card key={opp.id} className="hover:border-blue-300 transition-colors">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Main content */}
            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <button
                      type="button"
                      onClick={() => openDetail(opp)}
                      className="text-xl font-bold text-left hover:text-blue-600 focus:outline-none focus-visible:underline"
                    >
                      {opp.title}
                    </button>
                    <Badge variant="blue">{opp.type}</Badge>
                    {isOpportunitySaved(opp.id) && (
                      <Badge variant="outline" className="gap-1 text-xs">
                        <BookmarkCheck className="w-3 h-3" /> Saved
                      </Badge>
                    )}
                    {isOpportunityApplied(opp.id) && (
                      <Badge variant="success" className="gap-1 text-xs">
                        <CheckCircle2 className="w-3 h-3" /> Applied
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[var(--text-muted)] flex-wrap">
                    <Link
                      to={`/student/companies/${opp.companyId}`}
                      className="font-medium text-[var(--text-main)] hover:text-blue-600 hover:underline transition-colors"
                    >
                      {opp.companyName}
                    </Link>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {opp.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Posted {opp.postedAt}
                    </span>
                  </div>
                </div>
                <div className="hidden md:block">
                  <MatchScore score={opp.matchScore} />
                </div>
              </div>

              {/* AI Match Analysis */}
              <div className="bg-background dark:bg-gray-800/50 rounded-lg p-4 border border-[var(--border-main)]">
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-blue-600" />
                  AI Match Analysis
                </h4>
                <p className="text-sm text-[var(--text-muted)] mb-3">
                  {opp.matchDetails.explanation}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-1 block">
                      Strong Match
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {opp.matchDetails.strong.map((skill: string) => (
                        <Badge key={skill} variant="success" className="font-normal">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {opp.matchDetails.missing.length > 0 && (
                    <div>
                      <span className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-1 block">
                        Missing Skills
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {opp.matchDetails.missing.map((skill: string) => (
                          <Badge key={skill} variant="danger" className="font-normal">
                            <AlertCircle className="w-3 h-3 mr-1" /> {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action sidebar */}
            <div className="flex md:flex-col justify-between md:justify-start items-center md:items-end gap-3 min-w-[160px] border-t md:border-t-0 md:border-l border-[var(--border-main)] pt-4 md:pt-0 md:pl-6">
              <div className="md:hidden">
                <MatchScore score={opp.matchScore} showLabel={false} />
              </div>

              <div className="flex flex-col gap-2 w-full">
                {/* Eligibility status line */}
                <EligibilityIndicator result={eligibility} />

                {/* Primary action */}
                {eligibility.status === "already_applied" ? (
                  <Button className="w-full gap-2" disabled>
                    <CheckCircle2 className="w-4 h-4" /> Applied
                  </Button>
                ) : eligibility.status === "eligible" ? (
                  <Button className="w-full" onClick={() => openDetail(opp)}>
                    Apply Now
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => openDetail(opp)}
                  >
                    View Details
                  </Button>
                )}

                {/* Save */}
                {showRemoveButton ? (
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => handleSaveClick(opp)}
                  >
                    <X className="w-4 h-4" /> Remove Saved
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => handleSaveClick(opp)}
                  >
                    {isOpportunitySaved(opp.id) ? (
                      <><BookmarkCheck className="w-4 h-4" /> Saved</>
                    ) : (
                      <><Bookmark className="w-4 h-4" /> Save Role</>
                    )}
                  </Button>
                )}
              </div>

              <div className="text-xs text-[var(--text-muted)] mt-auto md:text-right w-full">
                {opp.applicantsCount} applicants
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Opportunities</h1>
          <p className="text-[var(--text-muted)]">
            AI-matched internships and training programs based on your profile.
          </p>
        </div>
      </div>

      {/* Company filter banner */}
      {companyFilter && (
        <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-blue-300 bg-blue-50/60 dark:bg-blue-900/10 dark:border-blue-700">
          <div className="flex items-center gap-2 text-sm text-blue-800 dark:text-blue-300 font-medium min-w-0">
            <Building2 className="w-4 h-4 shrink-0" />
            <span className="truncate">Showing opportunities from {companyFilter.name}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => navigate(`/student/companies/${companyFilterId}`)}
              className="text-xs font-medium text-blue-600 hover:underline focus:outline-none focus:underline"
            >
              View profile
            </button>
            <button
              type="button"
              onClick={clearCompanyFilter}
              className="p-1 rounded hover:bg-blue-100 dark:hover:bg-blue-800/40 text-blue-600 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500"
              aria-label="Clear company filter"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[var(--border-main)]">
        {(
          [
            { id: "discover", label: "Discover" },
            { id: "saved",    label: `Saved Roles (${savedOpportunities.length})` },
            { id: "applied",  label: `Applied (${appliedOpportunities.length})` },
          ] as { id: TabType; label: string }[]
        ).map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${
              activeTab === id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Discover ── */}
      {activeTab === "discover" && (
        <>
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    placeholder="Search by role, company, or skills…"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--border-main)] bg-[var(--bg-main)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" /> Filters
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[var(--border-main)]">
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary dark:hover:bg-gray-800">
                  Match &gt; 80%
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary dark:hover:bg-gray-800">
                  Frontend
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary dark:hover:bg-gray-800">
                  Remote
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary dark:hover:bg-gray-800">
                  Internships
                </Badge>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {discoverOpportunities.length > 0 ? (
              discoverOpportunities.map((opp) => renderOpportunityCard(opp))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Building2 className="w-10 h-10 text-[var(--text-muted)] mx-auto mb-3" />
                  <p className="font-semibold text-[var(--text-main)] mb-1">
                    No opportunities found
                  </p>
                  <p className="text-sm text-[var(--text-muted)] mb-4">
                    {companyFilter
                      ? `${companyFilter.name} has no listed opportunities matching your search.`
                      : "Try a different search term."}
                  </p>
                  {companyFilter && (
                    <button
                      type="button"
                      onClick={clearCompanyFilter}
                      className="text-sm font-medium text-blue-600 hover:underline focus:outline-none focus:underline"
                    >
                      View all companies
                    </button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </>
      )}

      {/* ── Saved ── */}
      {activeTab === "saved" && (
        <div className="space-y-4">
          {savedList.length > 0 ? (
            savedList.map((opp) => renderOpportunityCard(opp, true))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Bookmark className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No saved roles yet</h3>
                <p className="text-[var(--text-muted)] mb-6">
                  Save opportunities you are interested in so you can apply later.
                </p>
                <Button onClick={() => setActiveTab("discover")}>Browse Opportunities</Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* ── Applied ── */}
      {activeTab === "applied" && (
        <div className="space-y-4">
          {appliedList.length > 0 ? (
            appliedList.map((opp) => (
              <Card key={opp.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-bold">{opp.title}</h3>
                            <Badge variant="success">Applied</Badge>
                          </div>
                          <Link
                            to={`/student/companies/${opp.companyId}`}
                            className="text-[var(--text-muted)] hover:text-blue-600 hover:underline transition-colors"
                          >
                            {opp.companyName}
                          </Link>
                        </div>
                        <MatchScore score={opp.matchScore} />
                      </div>

                      <div className="bg-[var(--bg-secondary)] p-4 rounded-lg">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-[var(--text-muted)] mb-1">Status</div>
                            <Badge variant="blue">Applied</Badge>
                          </div>
                          <div>
                            <div className="text-[var(--text-muted)] mb-1">Submitted</div>
                            <div className="font-medium">Today</div>
                          </div>
                          <div>
                            <div className="text-[var(--text-muted)] mb-1">Next Step</div>
                            <div className="font-medium">Waiting for company review</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                        <h4 className="text-sm font-semibold mb-2">Application Status Timeline</h4>
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                              1
                            </div>
                            <span className="text-sm font-medium">Applied</span>
                          </div>
                          <div className="flex-1 h-0.5 bg-gray-300 dark:bg-gray-600 min-w-[24px]" />
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 text-[var(--text-muted)] flex items-center justify-center text-xs font-bold">
                              2
                            </div>
                            <span className="text-sm text-[var(--text-muted)]">Shortlisted</span>
                          </div>
                          <div className="flex-1 h-0.5 bg-gray-300 dark:bg-gray-600 min-w-[24px]" />
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 text-[var(--text-muted)] flex items-center justify-center text-xs font-bold">
                              3
                            </div>
                            <span className="text-sm text-[var(--text-muted)]">Interview</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex md:flex-col gap-2 min-w-[140px]">
                      <Button variant="outline" className="flex-1" onClick={() => openDetail(opp)}>
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                      >
                        Withdraw
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <CheckCircle2 className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No applications yet</h3>
                <p className="text-[var(--text-muted)] mb-6">
                  Start applying to opportunities that match your profile.
                </p>
                <Button onClick={() => setActiveTab("discover")}>Browse Opportunities</Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* ── Detail + Apply Modal ── */}
      {showDetailModal && selectedOpportunity && modalEligibility && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={closeDetail}
        >
          <Card
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <CardContent className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">{selectedOpportunity.title}</h2>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <Link
                      to={`/student/companies/${selectedOpportunity.companyId}`}
                      className="text-[var(--text-muted)] hover:text-blue-600 hover:underline transition-colors text-sm"
                      onClick={closeDetail}
                    >
                      {selectedOpportunity.companyName}
                    </Link>
                    {companyFilterId === selectedOpportunity.companyId && companyFilter && (
                      <button
                        type="button"
                        onClick={() => {
                          closeDetail();
                          navigate(`/student/companies/${selectedOpportunity.companyId}`);
                        }}
                        className="text-xs text-blue-600 hover:underline focus:outline-none focus:underline"
                      >
                        ← Back to {companyFilter.name}
                      </button>
                    )}
                  </div>
                </div>
                <button
                  onClick={closeDetail}
                  className="p-2 hover:bg-[var(--hover-bg)] rounded-lg transition-colors shrink-0"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Eligibility banner */}
              <EligibilityBanner result={modalEligibility} />

              {/* Opportunity summary */}
              <Card className="bg-[var(--bg-secondary)]">
                <CardContent className="p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-[var(--text-muted)] mb-1">Type</div>
                      <Badge variant="blue">{selectedOpportunity.type}</Badge>
                    </div>
                    <div>
                      <div className="text-[var(--text-muted)] mb-1">Location</div>
                      <div className="font-semibold">{selectedOpportunity.location}</div>
                    </div>
                    <div>
                      <div className="text-[var(--text-muted)] mb-1">Applicants</div>
                      <div className="font-semibold">{selectedOpportunity.applicantsCount}</div>
                    </div>
                    <div>
                      <div className="text-[var(--text-muted)] mb-1">Posted</div>
                      <div className="font-semibold">{selectedOpportunity.postedAt}</div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-[var(--border-main)]">
                    <div className="text-[var(--text-muted)] text-sm mb-2">Your Match Score</div>
                    <MatchScore score={selectedOpportunity.matchScore} />
                  </div>
                </CardContent>
              </Card>

              {/* AI Match Summary */}
              <div>
                <h3 className="font-semibold mb-2">AI Match Analysis</h3>
                <p className="text-sm text-[var(--text-muted)] mb-3">
                  {selectedOpportunity.matchDetails.explanation}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-semibold text-green-600 mb-2">Strong Match</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedOpportunity.matchDetails.strong.map((skill: string) => (
                        <Badge key={skill} variant="success" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  {selectedOpportunity.matchDetails.missing.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold text-red-600 mb-2">Missing Skills</div>
                      <div className="flex flex-wrap gap-1">
                        {selectedOpportunity.matchDetails.missing.map((skill: string) => (
                          <Badge key={skill} variant="danger" className="text-xs">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Application form — only shown when eligible */}
              {modalEligibility.status === "eligible" && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Message to Company{" "}
                      <span className="text-[var(--text-muted)]">(optional)</span>
                    </label>
                    <textarea
                      className="w-full px-4 py-2 rounded-lg border border-[var(--border-main)] bg-[var(--bg-main)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      placeholder="Write a short message to introduce yourself…"
                      value={applicationMessage}
                      onChange={(e) => setApplicationMessage(e.target.value)}
                    />
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800 text-sm">
                    <h4 className="font-semibold mb-1">Application Visibility</h4>
                    <p className="text-[var(--text-muted)]">
                      Your profile, assessment-based skills, match score, and public student
                      information will be visible to {selectedOpportunity.companyName}.
                    </p>
                  </div>

                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 mt-1 shrink-0"
                      checked={confirmChecked}
                      onChange={(e) => setConfirmChecked(e.target.checked)}
                    />
                    <span className="text-sm">
                      I confirm that my profile is up to date and I agree to share my AI-generated
                      profile, match score, and application information with{" "}
                      {selectedOpportunity.companyName}.
                    </span>
                  </label>
                </>
              )}

              {/* Submit error */}
              {submitError && (
                <div className="flex items-start gap-2 p-3 rounded-lg border border-red-300 bg-red-50 dark:bg-red-900/10 dark:border-red-700">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700 dark:text-red-400">{submitError}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={closeDetail}
                  disabled={isSubmitting}
                >
                  {modalEligibility.status === "eligible" ? "Cancel" : "Close"}
                </Button>
                {modalEligibility.status === "eligible" && (
                  <Button
                    className="flex-1"
                    onClick={handleSubmitApplication}
                    disabled={!confirmChecked || isSubmitting}
                  >
                    {isSubmitting
                      ? "Submitting…"
                      : `Submit Application to ${selectedOpportunity.companyName}`}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── Success Modal ── */}
      {showSuccessModal && successOpportunity && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Application Submitted</h3>
              <p className="text-[var(--text-muted)] mb-6">
                Your application has been sent to {successOpportunity.companyName}. You can track
                its progress in My Activity.
              </p>

              <Card className="bg-[var(--bg-secondary)] mb-6">
                <CardContent className="p-4 space-y-2 text-sm text-left">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Opportunity:</span>
                    <span className="font-semibold">{successOpportunity.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Company:</span>
                    <span className="font-semibold">{successOpportunity.companyName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Status:</span>
                    <Badge variant="success">Applied</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--text-muted)]">Match Score:</span>
                    <MatchScore score={successOpportunity.matchScore} showLabel={false} />
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowSuccessModal(false);
                    setActiveTab("applied");
                  }}
                >
                  View Application
                </Button>
                <Button className="flex-1" onClick={() => setShowSuccessModal(false)}>
                  Continue Browsing
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
