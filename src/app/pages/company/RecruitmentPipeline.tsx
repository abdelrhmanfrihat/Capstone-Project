import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { MatchScore } from "../../components/ui/MatchScore";
import {
  Calendar,
  AlertCircle,
  Eye,
  Star,
  Mail,
  MessageSquare,
  Heart,
  UserCheck,
  Video,
  GraduationCap,
  MapPin,
  Search,
  Filter,
  Download,
  X,
  Lightbulb,
  TrendingUp,
  Users,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Opportunity {
  id: string;
  title: string;
  workMode: string;
  status: string;
  applicants: number;
  avgMatch: number;
  deadline: string;
  interested: number; // formerly "shortlisted" — now reflects Interested stage count
  interviews: number;
  matched: number;
}

interface Candidate {
  id: number;
  name: string;
  university: string;
  major: string;
  matchScore: number;
  skills: string[];
  softSkills: string[];
  availability: string;
  stage: string;
  lastActivity: string;
  aiReason: string;
  profileStrength: number;
}

// ── Static data ───────────────────────────────────────────────────────────────

const OPPORTUNITIES: Opportunity[] = [
  {
    id: "fe-intern",
    title: "Frontend Engineering Intern",
    workMode: "Remote",
    status: "Active",
    applicants: 42,
    avgMatch: 84,
    deadline: "June 01, 2026",
    interested: 2,   // Alex + Michael Zhang after Shortlisted → Interested merge
    interviews: 4,
    matched: 1,
  },
  {
    id: "be-intern",
    title: "Backend Systems Intern",
    workMode: "Hybrid",
    status: "Active",
    applicants: 28,
    avgMatch: 79,
    deadline: "June 05, 2026",
    interested: 1,
    interviews: 2,
    matched: 0,
  },
  {
    id: "design-training",
    title: "Product Design Training",
    workMode: "On-site",
    status: "Active",
    applicants: 16,
    avgMatch: 81,
    deadline: "May 30, 2026",
    interested: 3,
    interviews: 1,
    matched: 0,
  },
  // Additional prototype opportunities so the selector has a realistic collection.
  {
    id: "ds-intern",
    title: "Data Science Intern",
    workMode: "Remote",
    status: "Active",
    applicants: 20,
    avgMatch: 77,
    deadline: "June 10, 2026",
    interested: 2,
    interviews: 1,
    matched: 0,
  },
  {
    id: "devops-intern",
    title: "DevOps & Cloud Intern",
    workMode: "Hybrid",
    status: "Active",
    applicants: 11,
    avgMatch: 73,
    deadline: "June 15, 2026",
    interested: 1,
    interviews: 0,
    matched: 0,
  },
  {
    id: "mobile-intern",
    title: "Mobile Development Intern",
    workMode: "Remote",
    status: "Closed",
    applicants: 9,
    avgMatch: 80,
    deadline: "May 01, 2026",
    interested: 2,
    interviews: 2,
    matched: 1,
  },
];

// Pipeline stages — Shortlisted removed; order: Applied → Interested → Interview → …
const PIPELINE_STAGES = [
  { id: "Applied",     label: "Applied",     color: "gray" },
  { id: "Interested",  label: "Interested",  color: "blue" },
  { id: "Interview",   label: "Interview",   color: "yellow" },
  { id: "Matched",     label: "Matched",     color: "green" },
  { id: "In Training", label: "In Training", color: "teal" },
  { id: "Rejected",    label: "Rejected",    color: "red" },
];

// ── Candidate data ────────────────────────────────────────────────────────────

// Frontend Engineering Intern — Michael Zhang moved from Shortlisted → Interested
const feCandidates: Candidate[] = [
  {
    id: 1,
    name: "Alex Chen",
    university: "Stanford University",
    major: "Computer Science",
    matchScore: 94,
    skills: ["React", "TypeScript", "Node.js"],
    softSkills: ["Teamwork", "Communication"],
    availability: "Available Now",
    stage: "Applied",
    lastActivity: "2 hours ago",
    aiReason: "Strong frontend fit with React and TypeScript.",
    profileStrength: 92,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    university: "MIT",
    major: "Software Engineering",
    matchScore: 91,
    skills: ["Python", "Java", "AWS"],
    softSkills: ["Leadership", "Problem Solving"],
    availability: "Available Soon",
    stage: "Interested",
    lastActivity: "1 day ago",
    aiReason: "Excellent technical foundation, adaptable to frontend.",
    profileStrength: 88,
  },
  {
    id: 3,
    name: "Michael Zhang",
    university: "UC Berkeley",
    major: "Computer Science",
    matchScore: 87,
    skills: ["JavaScript", "React", "GraphQL"],
    softSkills: ["Creativity", "Self Learning"],
    availability: "Available Now",
    stage: "Interested", // was Shortlisted — merged into Interested per C02
    lastActivity: "3 hours ago",
    aiReason: "Great fit with React and JavaScript expertise.",
    profileStrength: 85,
  },
  {
    id: 4,
    name: "Emily Williams",
    university: "Carnegie Mellon",
    major: "Human-Computer Interaction",
    matchScore: 89,
    skills: ["UI/UX", "React", "Figma"],
    softSkills: ["Communication", "Creativity"],
    availability: "Available Soon",
    stage: "Interview",
    lastActivity: "5 hours ago",
    aiReason: "Perfect blend of design and development skills.",
    profileStrength: 90,
  },
];

// Backend Systems Intern
const beCandidates: Candidate[] = [
  {
    id: 5,
    name: "David Park",
    university: "University of Jordan",
    major: "Software Engineering",
    matchScore: 82,
    skills: ["TypeScript", "Node.js", "Docker"],
    softSkills: ["Teamwork", "Responsibility"],
    availability: "Available Now",
    stage: "Applied",
    lastActivity: "1 hour ago",
    aiReason: "Solid backend skills with TypeScript and Node.js.",
    profileStrength: 78,
  },
  {
    id: 6,
    name: "Elena Rodriguez",
    university: "PSUT",
    major: "Data Science",
    matchScore: 84,
    skills: ["Python", "SQL", "APIs"],
    softSkills: ["Analytical", "Detail-oriented"],
    availability: "Available Now",
    stage: "Interested",
    lastActivity: "4 hours ago",
    aiReason: "Strong data and backend foundation.",
    profileStrength: 81,
  },
];

function getCandidatesForOpportunity(opportunityId: string): Candidate[] {
  if (opportunityId === "fe-intern") return feCandidates;
  if (opportunityId === "be-intern") return beCandidates;
  return [];
}

// ── Opportunity selector (searchable combobox) ────────────────────────────────

function OpportunitySelector({
  opportunities,
  selectedId,
  onSelect,
}: {
  opportunities: Opportunity[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const selected = opportunities.find((o) => o.id === selectedId);

  const filtered = opportunities.filter((o) =>
    o.title.toLowerCase().includes(query.toLowerCase())
  );

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Focus search when opened
  useEffect(() => {
    if (open) {
      setFocusedIndex(0);
      setTimeout(() => searchRef.current?.focus(), 10);
    }
  }, [open]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      setQuery("");
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[focusedIndex]) {
        onSelect(filtered[focusedIndex].id);
        setOpen(false);
        setQuery("");
      }
    }
  }

  return (
    <div ref={containerRef} className="w-full max-w-[480px] relative">
      {/* Trigger */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={selected ? `Selected: ${selected.title}` : "Select an opportunity"}
        onClick={() => { setOpen((o) => !o); }}
        onKeyDown={handleKeyDown}
        className={`w-full min-h-[48px] flex items-center gap-3 px-4 py-2 rounded-lg border text-left transition-colors bg-[var(--bg-main)] ${
          open
            ? "border-blue-500 ring-2 ring-blue-500/20"
            : "border-[var(--border-main)] hover:border-blue-400"
        }`}
      >
        <span className="flex-1 min-w-0">
          {selected ? (
            <span className="flex items-center gap-2 min-w-0">
              <span className="truncate text-sm font-semibold text-[var(--text-main)]">
                {selected.title}
              </span>
              <Badge
                variant={selected.status === "Active" ? "success" : "outline"}
                className="shrink-0 text-xs"
              >
                {selected.status}
              </Badge>
            </span>
          ) : (
            <span className="text-sm text-[var(--text-muted)]">Select an opportunity…</span>
          )}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute left-0 right-0 top-full mt-1 z-50 rounded-lg border border-[var(--border-main)] bg-[var(--bg-main)] shadow-xl overflow-hidden"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
        >
          {/* Search */}
          <div className="p-2 border-b border-[var(--border-main)]">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setFocusedIndex(0); }}
                onKeyDown={handleKeyDown}
                placeholder="Search your opportunities…"
                className="w-full pl-9 pr-3 py-2 text-sm bg-[var(--bg-secondary)] rounded-md border border-[var(--border-main)] focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[var(--text-muted)]"
              />
            </div>
          </div>

          {/* Options list */}
          <div
            ref={listRef}
            role="listbox"
            aria-label="Opportunities"
            className="overflow-y-auto"
            style={{ maxHeight: 320 }}
          >
            {filtered.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-[var(--text-muted)]">
                No opportunities match your search.
              </div>
            ) : (
              filtered.map((opp, idx) => {
                const isSelected = opp.id === selectedId;
                const isFocused = idx === focusedIndex;
                return (
                  <button
                    key={opp.id}
                    role="option"
                    aria-selected={isSelected}
                    type="button"
                    onClick={() => {
                      onSelect(opp.id);
                      setOpen(false);
                      setQuery("");
                    }}
                    onMouseEnter={() => setFocusedIndex(idx)}
                    className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors ${
                      isFocused && !isSelected
                        ? "bg-[var(--hover-bg)]"
                        : isSelected
                        ? "bg-blue-50 dark:bg-blue-900/20"
                        : ""
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 min-w-0">
                        <span className="text-sm font-semibold truncate text-[var(--text-main)]">
                          {opp.title}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-[var(--text-muted)]">
                        <Badge
                          variant={opp.status === "Active" ? "success" : "outline"}
                          className="text-[10px]"
                        >
                          {opp.status}
                        </Badge>
                        <span>{opp.workMode}</span>
                        <span>{opp.applicants} applicants</span>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {opportunities.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-[var(--text-muted)]">
              <p className="font-semibold mb-1">No published opportunities available.</p>
              <p>Your published opportunities will appear here.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function RecruitmentPipeline() {
  const [selectedOpportunity, setSelectedOpportunity] = useState<string>(OPPORTUNITIES[0].id);
  const [showMarkInterestedModal, setShowMarkInterestedModal] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [moveToStage, setMoveToStage] = useState("");
  const [internalNote, setInternalNote] = useState("");

  const [showViewOpportunityDrawer, setShowViewOpportunityDrawer] = useState(false);
  const [showEditOpportunityModal, setShowEditOpportunityModal] = useState(false);
  const [showCloseOpportunityModal, setShowCloseOpportunityModal] = useState(false);
  const [closeReason, setCloseReason] = useState("");
  const [editStep, setEditStep] = useState(1);
  const [showEditConfirmModal, setShowEditConfirmModal] = useState(false);
  const [showEditSuccessModal, setShowEditSuccessModal] = useState(false);

  const candidates = getCandidatesForOpportunity(selectedOpportunity);
  const opportunity = OPPORTUNITIES.find((o) => o.id === selectedOpportunity);

  const getCandidatesByStage = (stage: string) =>
    candidates.filter((c) => c.stage === stage);

  // Derived counts from actual candidate records
  const interestedCount = getCandidatesByStage("Interested").length;
  const appliedCount = getCandidatesByStage("Applied").length;

  const handleMarkInterested = () => {
    setShowMarkInterestedModal(false);
    setSelectedCandidate(null);
  };

  const handleMove = () => {
    setShowMoveModal(false);
    setSelectedCandidate(null);
    setMoveToStage("");
    setInternalNote("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Recruitment Pipeline</h1>
        <p className="text-[var(--text-muted)]">
          Manage candidates separately for each internship or training opportunity.
        </p>
      </div>

      {/* ── Opportunity selector ── */}
      <div>
        <label className="text-sm font-semibold mb-3 block">Select Opportunity Pipeline</label>
        <OpportunitySelector
          opportunities={OPPORTUNITIES}
          selectedId={selectedOpportunity}
          onSelect={setSelectedOpportunity}
        />
        <p className="text-xs text-[var(--text-muted)] mt-2">
          Each opportunity has its own pipeline, candidates, statuses, notes, and interview
          progress.
        </p>
      </div>

      {/* ── Selected opportunity summary ── */}
      {opportunity && (
        <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
          <CardContent className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-bold mb-1">
                Selected Opportunity: {opportunity.title}
              </h3>
              <div className="flex flex-wrap gap-3 text-sm text-[var(--text-muted)]">
                <span>Type: Internship</span>
                <span>•</span>
                <span>Work Mode: {opportunity.workMode}</span>
                <span>•</span>
                <span>Status: {opportunity.status}</span>
                <span>•</span>
                <span>Deadline: {opportunity.deadline}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="p-3 bg-card dark:bg-gray-800 rounded-lg">
                <p className="text-xs text-[var(--text-muted)] mb-1">Applicants</p>
                <p className="text-xl font-bold">{opportunity.applicants}</p>
              </div>
              <div className="p-3 bg-card dark:bg-gray-800 rounded-lg">
                <p className="text-xs text-[var(--text-muted)] mb-1">Interested</p>
                {/* Use live count from candidate records when available; fall back to stored value */}
                <p className="text-xl font-bold">
                  {candidates.length > 0 ? interestedCount : opportunity.interested}
                </p>
              </div>
              <div className="p-3 bg-card dark:bg-gray-800 rounded-lg">
                <p className="text-xs text-[var(--text-muted)] mb-1">Interviews</p>
                <p className="text-xl font-bold">{opportunity.interviews}</p>
              </div>
              <div className="p-3 bg-card dark:bg-gray-800 rounded-lg">
                <p className="text-xs text-[var(--text-muted)] mb-1">Avg Match</p>
                <p className="text-xl font-bold">{opportunity.avgMatch}%</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowViewOpportunityDrawer(true)}
              >
                View Opportunity
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowEditOpportunityModal(true)}
              >
                Edit Opportunity
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  (window.location.href = `/company/candidates?opportunity=${selectedOpportunity}`)
                }
              >
                Search Candidates
              </Button>
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4 mr-1" />
                Export Pipeline
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── AI Suggestion ── */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold mb-1">AI Suggestion</p>
              <p className="text-sm text-[var(--text-muted)]">
                {appliedCount > 0
                  ? `${appliedCount} high-match ${
                      appliedCount === 1 ? "candidate is" : "candidates are"
                    } still in Applied. Consider marking them as Interested.`
                  : "All high-match candidates have been reviewed. No candidates remain in Applied."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Kanban board ── */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {PIPELINE_STAGES.map((stage) => {
            const stageCandidates = getCandidatesByStage(stage.id);
            return (
              <div key={stage.id} className="w-80 shrink-0">
                <div className="flex items-center justify-between mb-3 px-2">
                  <span className="font-semibold">{stage.label}</span>
                  <Badge variant="outline" className="text-xs">
                    {stageCandidates.length}
                  </Badge>
                </div>

                <div className="bg-background dark:bg-gray-800/50 rounded-lg p-3 min-h-[400px] border-2 border-dashed border-[var(--border-main)]">
                  {stageCandidates.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-center">
                      <Users className="w-8 h-8 text-[var(--text-muted)] mb-2" />
                      <p className="text-sm text-[var(--text-muted)]">
                        {stage.id === "Applied" && "No applicants yet."}
                        {stage.id === "Interested" && "No students marked as interesting yet."}
                        {stage.id === "Interview" && "No interviews scheduled yet."}
                        {stage.id === "Matched" && "No matched candidates yet."}
                        {stage.id === "In Training" && "No student has started training yet."}
                        {stage.id === "Rejected" && "No rejected candidates."}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {stageCandidates.map((candidate) => (
                        <Card
                          key={candidate.id}
                          className="hover:border-blue-300 transition-colors cursor-pointer"
                        >
                          <CardContent className="p-4 space-y-3">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                  {candidate.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </div>
                                <div>
                                  <h4 className="font-semibold text-sm">{candidate.name}</h4>
                                  <p className="text-xs text-[var(--text-muted)]">
                                    {candidate.university}
                                  </p>
                                </div>
                              </div>
                              <MatchScore score={candidate.matchScore} size="sm" />
                            </div>

                            <div className="text-xs text-[var(--text-muted)]">
                              <div className="flex items-center gap-1 mb-1">
                                <GraduationCap className="w-3 h-3" />
                                {candidate.major}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {candidate.availability}
                              </div>
                            </div>

                            <div>
                              <p className="text-xs font-semibold text-[var(--text-muted)] mb-1">
                                SKILLS
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {candidate.skills.slice(0, 3).map((skill) => (
                                  <Badge key={skill} variant="blue" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs">
                              <p className="text-blue-900 dark:text-blue-100">
                                <strong>AI:</strong> {candidate.aiReason}
                              </p>
                            </div>

                            <div className="text-xs text-[var(--text-muted)]">
                              Last activity: {candidate.lastActivity}
                            </div>

                            <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--border-main)]">
                              {/* View profile */}
                              <Button size="sm" variant="outline" className="text-xs flex-1">
                                <Eye className="w-3 h-3" />
                              </Button>
                              {/* Mark Interested — Applied only */}
                              {stage.id === "Applied" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-xs flex-1"
                                  onClick={() => {
                                    setSelectedCandidate(candidate);
                                    setShowMarkInterestedModal(true);
                                  }}
                                >
                                  <Heart className="w-3 h-3" />
                                </Button>
                              )}
                              {/* Move stage */}
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs flex-1"
                                onClick={() => {
                                  setSelectedCandidate(candidate);
                                  setShowMoveModal(true);
                                }}
                              >
                                Move
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Mark Interested modal ── */}
      {showMarkInterestedModal && selectedCandidate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Mark Student as Interesting?</h3>
                <button
                  onClick={() => setShowMarkInterestedModal(false)}
                  className="p-1 hover:bg-muted dark:hover:bg-gray-800 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm text-[var(--text-muted)] mb-4">
                This student will be added to the Interested stage for this opportunity so your
                team can review them later.
              </p>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {selectedCandidate.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h4 className="font-semibold">{selectedCandidate.name}</h4>
                    <p className="text-sm text-[var(--text-muted)]">
                      {selectedCandidate.university}
                    </p>
                  </div>
                  <MatchScore score={selectedCandidate.matchScore} />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowMarkInterestedModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button onClick={handleMarkInterested} className="flex-1">
                  Mark Interested
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── Move Stage modal ── */}
      {showMoveModal && selectedCandidate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Move Candidate</h3>
                <button
                  onClick={() => setShowMoveModal(false)}
                  className="p-1 hover:bg-muted dark:hover:bg-gray-800 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">New Stage</label>
                  <select
                    value={moveToStage}
                    onChange={(e) => setMoveToStage(e.target.value)}
                    className="w-full p-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                  >
                    <option value="">Select stage…</option>
                    {PIPELINE_STAGES.map((stage) => (
                      <option key={stage.id} value={stage.id}>
                        {stage.label}
                      </option>
                    ))}
                  </select>
                </div>

                {moveToStage === "In Training" && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-red-900 dark:text-red-100 mb-1">
                          Warning
                        </p>
                        <p className="text-xs text-red-800 dark:text-red-200">
                          This will hard-lock the student. They will no longer appear in other
                          company searches and cannot apply to new opportunities.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-sm font-semibold mb-2 block">Reason / Note</label>
                  <textarea
                    value={internalNote}
                    onChange={(e) => setInternalNote(e.target.value)}
                    placeholder="Add a note about this status change..."
                    className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)] min-h-[80px] resize-y"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowMoveModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button onClick={handleMove} className="flex-1">
                  Move Candidate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── View Opportunity drawer ── */}
      {showViewOpportunityDrawer && opportunity && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex justify-end"
          onClick={() => setShowViewOpportunityDrawer(false)}
        >
          <div
            className="bg-[var(--bg-main)] w-full max-w-3xl h-full overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between sticky top-0 bg-[var(--bg-main)] pb-4 border-b border-[var(--border-main)]">
                <div>
                  <h2 className="text-2xl font-bold">Opportunity Details</h2>
                  <p className="text-[var(--text-muted)]">
                    View the published opportunity, requirements, match analysis, and recruitment
                    activity.
                  </p>
                </div>
                <button
                  onClick={() => setShowViewOpportunityDrawer(false)}
                  className="p-2 hover:bg-muted dark:hover:bg-gray-800 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Opportunity Summary */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Opportunity Summary</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-[var(--text-muted)] mb-1">Opportunity Title</div>
                      <div className="font-semibold">{opportunity.title}</div>
                    </div>
                    <div>
                      <div className="text-[var(--text-muted)] mb-1">Company</div>
                      <div className="font-semibold">Stellar Cloud</div>
                    </div>
                    <div>
                      <div className="text-[var(--text-muted)] mb-1">Type</div>
                      <Badge>Internship</Badge>
                    </div>
                    <div>
                      <div className="text-[var(--text-muted)] mb-1">Work Mode</div>
                      <div className="font-semibold">{opportunity.workMode}</div>
                    </div>
                    <div>
                      <div className="text-[var(--text-muted)] mb-1">Status</div>
                      <Badge variant="success">{opportunity.status}</Badge>
                    </div>
                    <div>
                      <div className="text-[var(--text-muted)] mb-1">Deadline</div>
                      <div className="font-semibold">{opportunity.deadline}</div>
                    </div>
                    <div>
                      <div className="text-[var(--text-muted)] mb-1">Posted Date</div>
                      <div className="font-semibold">May 10, 2026</div>
                    </div>
                    <div>
                      <div className="text-[var(--text-muted)] mb-1">Available Seats</div>
                      <div className="font-semibold">3</div>
                    </div>
                    <div>
                      <div className="text-[var(--text-muted)] mb-1">Applicants</div>
                      <div className="font-semibold">{opportunity.applicants}</div>
                    </div>
                    <div>
                      <div className="text-[var(--text-muted)] mb-1">Avg Match Score</div>
                      <div className="font-semibold text-blue-600">{opportunity.avgMatch}%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-3">Description</h3>
                  <p className="text-sm text-[var(--text-muted)]">
                    Students will work with the frontend team to build React components, improve UI
                    performance, and collaborate with designers and backend developers.
                  </p>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-bold text-lg">Requirements</h3>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Technical Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {["React", "TypeScript", "JavaScript", "Git", "APIs"].map((skill) => (
                        <Badge key={skill} variant="blue">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Preferred Soft Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Communication", "Teamwork", "Problem Solving", "Self Learning"].map(
                        (skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Academic Requirements</h4>
                    <p className="text-sm text-[var(--text-muted)]">
                      Computer Science, Software Engineering, or any related field
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Experience Level</h4>
                    <p className="text-sm text-[var(--text-muted)]">Basic project experience</p>
                  </div>
                </CardContent>
              </Card>

              {/* Matching Weights */}
              <Card>
                <CardContent className="p-6 space-y-3">
                  <h3 className="font-bold text-lg mb-3">Matching Weights</h3>
                  {[
                    { label: "Technical Skills", pct: 40 },
                    { label: "Soft Skills",       pct: 25 },
                    { label: "Interests",          pct: 15 },
                    { label: "Behavioral Fit",     pct: 20 },
                  ].map(({ label, pct }) => (
                    <div key={label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{label}</span>
                        <span className="font-semibold">{pct}%</span>
                      </div>
                      <div className="w-full bg-muted dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* AI Match Analysis */}
              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">AI Match Analysis</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-[var(--text-muted)] mb-1">Estimated Candidate Pool</div>
                      <div className="text-2xl font-bold text-blue-600">184</div>
                    </div>
                    <div>
                      <div className="text-[var(--text-muted)] mb-1">Strong Matches</div>
                      <div className="text-2xl font-bold text-blue-600">
                        {opportunity.applicants}
                      </div>
                    </div>
                    <div>
                      <div className="text-[var(--text-muted)] mb-1">Average Match Score</div>
                      <div className="text-2xl font-bold text-blue-600">{opportunity.avgMatch}%</div>
                    </div>
                    <div>
                      <div className="text-[var(--text-muted)] mb-1">Top Matching Factors</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {["React", "TypeScript", "Communication"].map((factor) => (
                          <Badge key={factor} variant="blue">
                            {factor}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recruitment Summary — Shortlisted stage removed */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Recruitment Summary</h3>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                    {[
                      { label: "Applied",     count: 12,                   color: "text-[var(--text-body)]" },
                      { label: "Interested",  count: candidates.length > 0 ? interestedCount : opportunity.interested, color: "text-blue-600" },
                      { label: "Interview",   count: opportunity.interviews, color: "text-yellow-600" },
                      { label: "Matched",     count: opportunity.matched,   color: "text-green-600" },
                      { label: "In Training", count: 0,                    color: "text-teal-600" },
                      { label: "Rejected",    count: 3,                    color: "text-red-600" },
                    ].map((stage) => (
                      <div key={stage.label} className="text-center">
                        <div className={`text-2xl font-bold ${stage.color}`}>{stage.count}</div>
                        <div className="text-xs text-[var(--text-muted)]">{stage.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 sticky bottom-0 bg-[var(--bg-main)] pt-4 border-t border-[var(--border-main)]">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowViewOpportunityDrawer(false);
                    setShowEditOpportunityModal(true);
                  }}
                >
                  Edit Opportunity
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    (window.location.href = `/company/candidates?opportunity=${selectedOpportunity}`)
                  }
                >
                  Search Candidates
                </Button>
                <Button
                  variant="outline"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => {
                    setShowViewOpportunityDrawer(false);
                    setShowCloseOpportunityModal(true);
                  }}
                >
                  Close Opportunity
                </Button>
                <Button
                  className="ml-auto"
                  onClick={() => setShowViewOpportunityDrawer(false)}
                >
                  Back to Pipeline
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Close Opportunity modal ── */}
      {showCloseOpportunityModal && opportunity && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Close Opportunity?</h3>
                <button
                  onClick={() => setShowCloseOpportunityModal(false)}
                  className="p-1 hover:bg-muted dark:hover:bg-gray-800 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm text-[var(--text-muted)] mb-4">
                This opportunity will stop accepting new applications and will be hidden from
                student search results. Existing pipeline history will remain available.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Reason</label>
                  <select
                    value={closeReason}
                    onChange={(e) => setCloseReason(e.target.value)}
                    className="w-full p-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                  >
                    <option value="">Select reason…</option>
                    <option>Position filled</option>
                    <option>Training started</option>
                    <option>No longer available</option>
                    <option>Requirements changed</option>
                    <option>Duplicate opportunity</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowCloseOpportunityModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  onClick={() => {
                    setShowCloseOpportunityModal(false);
                    alert("Opportunity closed successfully");
                  }}
                >
                  Close Opportunity
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── Edit Opportunity modal ── */}
      {showEditOpportunityModal && opportunity && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <Card className="w-full max-w-4xl my-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Edit Opportunity</h2>
                  <p className="text-[var(--text-muted)]">
                    Update opportunity details and matching requirements. The system will
                    recalculate candidate matches after saving changes.
                  </p>
                </div>
                <button
                  onClick={() => setShowEditOpportunityModal(false)}
                  className="p-2 hover:bg-muted dark:hover:bg-gray-800 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <div key={step} className="flex items-center flex-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          editStep >= step
                            ? "bg-blue-600 text-white"
                            : "bg-muted dark:bg-gray-700 text-[var(--text-muted)]"
                        }`}
                      >
                        {step}
                      </div>
                      {step < 5 && (
                        <div
                          className={`flex-1 h-1 mx-2 ${
                            editStep > step
                              ? "bg-blue-600"
                              : "bg-muted dark:bg-gray-700"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {editStep === 5 ? (
                <div className="space-y-4">
                  <h3 className="font-bold">Review & Save Changes</h3>
                  <Card className="bg-blue-50 dark:bg-blue-900/20">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Summary of Changes</h4>
                      <ul className="text-sm space-y-1 text-[var(--text-muted)]">
                        <li>• Added REST APIs to required skills</li>
                        <li>• Updated TypeScript level from Advanced to Intermediate</li>
                        <li>• Changed application deadline</li>
                        <li>• Updated mentor name</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" onClick={() => setEditStep(4)}>
                      Back
                    </Button>
                    <Button onClick={() => setShowEditConfirmModal(true)}>Save Changes</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-[var(--text-muted)]">
                    Edit form would be rendered here for step {editStep}
                  </p>
                  <div className="flex gap-3">
                    {editStep > 1 && (
                      <Button variant="outline" onClick={() => setEditStep(editStep - 1)}>
                        Back
                      </Button>
                    )}
                    <Button
                      onClick={() =>
                        editStep === 4 ? setEditStep(5) : setEditStep(editStep + 1)
                      }
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── Edit Confirmation modal ── */}
      {showEditConfirmModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">Save Opportunity Changes?</h3>
              <p className="text-sm text-[var(--text-muted)] mb-6">
                Updating this opportunity will re-analyze requirements and recalculate match
                scores for related students.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowEditConfirmModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setShowEditConfirmModal(false);
                    setShowEditOpportunityModal(false);
                    setShowEditSuccessModal(true);
                  }}
                  className="flex-1"
                >
                  Save & Recalculate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── Edit Success modal ── */}
      {showEditSuccessModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Opportunity Updated Successfully</h3>
              <p className="text-[var(--text-muted)] mb-4">
                The system is recalculating candidate matches for {opportunity?.title}.
              </p>

              <Card className="bg-[var(--bg-secondary)] mb-6">
                <CardContent className="p-4 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Status:</span>
                    <Badge variant="success">Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Updated:</span>
                    <span className="font-semibold">Today</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Recalculation:</span>
                    <span className="font-semibold text-blue-600">In Progress</span>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowEditSuccessModal(false)}
                  className="flex-1"
                >
                  Back to Pipeline
                </Button>
                <Button
                  onClick={() => {
                    setShowEditSuccessModal(false);
                    setShowViewOpportunityDrawer(true);
                  }}
                  className="flex-1"
                >
                  View Updated Opportunity
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
