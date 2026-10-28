import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Progress } from "../../components/ui/progress";
import { MOCK_STUDENTS } from "../../data/mockData";
import { User, Mail, GraduationCap, Calendar, Edit, Star, Briefcase, X } from "lucide-react";

// Career interest options keyed by major
const MAJOR_CAREER_FIELDS: Record<string, string[]> = {
  "Computer Science": [
    "Frontend Development",
    "Backend Development",
    "Mobile Development",
    "DevOps & Cloud",
    "Data Engineering",
    "Machine Learning & AI",
    "Cybersecurity",
    "Game Development",
    "UI/UX Design",
    "Data Analysis",
  ],
  "Data Science": [
    "Data Engineering",
    "Machine Learning & AI",
    "Business Intelligence",
    "Statistical Modelling",
    "Data Visualisation",
    "Research Science",
    "Product Analytics",
    "Natural Language Processing",
    "Computer Vision",
    "Data Analysis",
  ],
  // Fallback options for any other major
  default: [
    "Product Management",
    "Business Analysis",
    "Marketing Technology",
    "Operations",
    "Project Management",
    "Consulting",
    "Entrepreneurship",
    "Research",
    "Finance Technology",
    "Technical Writing",
  ],
};

const MAX_INTERESTS = 5;

export function StudentProfile() {
  const navigate = useNavigate();
  const student = MOCK_STUDENTS[0];

  // Career interests state — empty by default (not fabricated)
  const [careerInterests, setCareerInterests] = useState<string[]>([]);

  // Career interests modal
  const [showInterestsModal, setShowInterestsModal] = useState(false);
  const [draftInterests, setDraftInterests] = useState<string[]>([]);
  const [saveBusy, setSaveBusy] = useState(false);

  // Refs for focus management
  const editInterestsButtonRef = useRef<HTMLButtonElement>(null);
  const interestsModalRef = useRef<HTMLDivElement>(null);

  // Options for this student's major
  const majorOptions =
    MAJOR_CAREER_FIELDS[student.major] ?? MAJOR_CAREER_FIELDS.default;

  // ── Focus trap: interests modal ──
  useEffect(() => {
    if (!showInterestsModal) return;
    const modal = interestsModalRef.current;
    if (!modal) return;
    const getFocusables = () =>
      Array.from(
        modal.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
    setTimeout(() => getFocusables()[0]?.focus(), 10);

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") { closeInterestsModal(); return; }
      if (e.key === "Tab") {
        const items = getFocusables();
        if (!items.length) return;
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [showInterestsModal]);

  // ── Helpers ────────────────────────────────────────────────────────────────

  function openInterestsModal() {
    setDraftInterests([...careerInterests]);
    setShowInterestsModal(true);
  }

  function closeInterestsModal() {
    setShowInterestsModal(false);
    editInterestsButtonRef.current?.focus();
  }

  function toggleDraftInterest(interest: string) {
    setDraftInterests((prev) => {
      if (prev.includes(interest)) return prev.filter((i) => i !== interest);
      if (prev.length >= MAX_INTERESTS) return prev;
      return [...prev, interest];
    });
  }

  async function handleSaveInterests(e: React.FormEvent) {
    e.preventDefault();
    setSaveBusy(true);
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 800));
      setCareerInterests(draftInterests);
      closeInterestsModal();
      toast.success("Career interests saved.");
    } catch {
      toast.error("We couldn't save your interests. Please try again.");
    } finally {
      setSaveBusy(false);
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <Button
          className="flex items-center gap-2"
          onClick={() => navigate("/student/update-profile")}
        >
          <Edit className="w-4 h-4" />
          Edit Profile
        </Button>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shrink-0">
              {student.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{student.name}</h2>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-[var(--text-muted)]">
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {student.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <GraduationCap className="w-4 h-4" />
                    {student.major} @ {student.university}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Graduating {student.graduationYear}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Badge
                  variant={student.status === "Active" ? "success" : "warning"}
                  className="text-sm"
                >
                  {student.status === "Active" ? "✓ Available" : "🔒 In Training"}
                </Badge>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Profile Strength:</span>
                  <div className="flex items-center gap-2">
                    <Progress value={student.profileStrength} className="w-32" />
                    <span className="text-sm font-bold text-blue-600">
                      {student.profileStrength}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Technical Skills */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Technical Skills</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {student.skills.technical.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{skill.name}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= skill.level
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <Progress value={skill.level * 20} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Soft Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Soft Skills</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {student.skills.soft.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-sm">{skill.name}</span>
                  <span className="text-sm font-bold text-blue-600">{skill.level}/5</span>
                </div>
                <Progress value={skill.level * 20} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Areas of Interest */}
      <Card>
        <CardHeader>
          <CardTitle>Areas of Interest</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {student.interests.map((interest) => (
              <Badge key={interest} variant="outline" className="px-3 py-1">
                {interest}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Career Interests */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              Career Interests
            </CardTitle>
            <button
              ref={editInterestsButtonRef}
              onClick={openInterestsModal}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors focus-visible:outline-none focus-visible:underline"
            >
              {careerInterests.length === 0 ? "Add interests" : "Edit interests"}
            </button>
          </div>
        </CardHeader>
        <CardContent>
          {careerInterests.length === 0 ? (
            <div className="py-6 text-center space-y-3">
              <Briefcase className="w-10 h-10 text-[var(--text-muted)] mx-auto" />
              <p className="font-semibold text-[var(--text-main)]">No career interests added yet</p>
              <p className="text-sm text-[var(--text-muted)]">
                Add up to {MAX_INTERESTS} career interests to help companies understand the
                directions you want to grow in.
              </p>
              <button
                onClick={openInterestsModal}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Add career interests
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {careerInterests.map((interest) => (
                <Badge key={interest} variant="blue" className="px-3 py-1">
                  {interest}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Career Interests Modal ── */}
      {showInterestsModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={closeInterestsModal}
        >
          <div
            ref={interestsModalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="interests-modal-title"
            className="bg-[var(--bg-main)] rounded-xl shadow-2xl w-full max-w-[540px] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSaveInterests} className="p-6 sm:p-7 space-y-5">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 id="interests-modal-title" className="text-xl font-bold">
                    Edit career interests
                  </h2>
                  <p className="text-sm text-[var(--text-muted)] mt-1">
                    Select up to {MAX_INTERESTS} areas that best describe your career direction.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeInterestsModal}
                  aria-label="Close"
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg shrink-0 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Live counter */}
              <div
                className={`text-sm font-medium ${
                  draftInterests.length >= MAX_INTERESTS
                    ? "text-blue-600"
                    : "text-[var(--text-muted)]"
                }`}
                aria-live="polite"
              >
                {draftInterests.length} of {MAX_INTERESTS} selected
              </div>

              {/* Options grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="group" aria-label="Career interest options">
                {majorOptions.map((option) => {
                  const selected = draftInterests.includes(option);
                  const atLimit = draftInterests.length >= MAX_INTERESTS;
                  const disabled = !selected && atLimit;
                  return (
                    <label
                      key={option}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border cursor-pointer transition-colors select-none ${
                        selected
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : disabled
                          ? "border-[var(--border-main)] opacity-40 cursor-not-allowed"
                          : "border-[var(--border-main)] hover:border-blue-300 hover:bg-[var(--bg-secondary)]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        disabled={disabled}
                        onChange={() => !disabled && toggleDraftInterest(option)}
                        className="w-4 h-4 accent-blue-600 shrink-0"
                        aria-label={option}
                      />
                      <span className="text-sm font-medium">{option}</span>
                    </label>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="flex gap-3 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={closeInterestsModal}
                  disabled={saveBusy}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={saveBusy}>
                  {saveBusy ? "Saving…" : "Save interests"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
