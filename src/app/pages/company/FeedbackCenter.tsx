import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import {
  FeedbackBadge,
  feedbackSectionLabelStyles,
  getFeedbackCategoryTone,
  getFeedbackStatusTone,
  getFeedbackVisibilityTone,
} from "../../components/shared/FeedbackBadge";
import {
  Star, AlertCircle, CheckCircle2, Eye, Flag,
  MessageSquare, X, Send, FileText, Lock,
  AlertTriangle, Clock,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

type PrimaryTab = "provide" | "studentPublic" | "fromStudents" | "history";
type StudentSecondaryTab = "public" | "private";

interface FeedbackFormData {
  visibility: "private" | "public";
  overallRating: number;
  technicalRating: number;
  softSkillsRating: number;
  communicationRating: number;
  learningRating: number;
  strengths: string[];
  improvements: string[];
  recommendedSkills: string[];
  writtenFeedback: string;
  internalNotes: string;
  confirmed: boolean;
}

interface PrivateFeedbackRecord {
  id: string;
  studentName: string;
  studentId: string;
  opportunity: string;
  feedbackType: string;
  rating: number;
  feedbackText: string;
  date: string;
}

// ── Static option sets ────────────────────────────────────────────────────────

const STRENGTHS_OPTIONS = [
  "React", "TypeScript", "Problem Solving", "Communication", "Teamwork",
  "Fast Learning", "Clean Code", "Design Thinking", "Time Management", "Professional Attitude",
];

const IMPROVEMENTS_OPTIONS = [
  "SQL", "API Integration", "Testing", "Git Workflow", "Time Management",
  "Communication", "Documentation", "System Design", "Confidence", "Task Estimation",
];

const RECOMMENDED_SKILLS = [
  "PostgreSQL", "REST APIs", "Docker", "Unit Testing", "Agile Workflow",
  "Cloud Basics", "UI/UX Research", "Data Visualization",
];

// ── Prototype data ────────────────────────────────────────────────────────────

const studentsForFeedback = [
  {
    id: 1,
    studentId: "s1",
    name: "Alex Chen",
    opportunity: "Frontend Engineering Intern",
    status: "Interview Completed",
    matchScore: 94,
    date: "2026-05-16",
  },
  {
    id: 2,
    studentId: "s2",
    name: "Sarah Johnson",
    opportunity: "Frontend Engineering Intern",
    status: "Training Completed",
    matchScore: 91,
    date: "2026-05-10",
  },
  {
    id: 3,
    studentId: "s3",
    name: "Michael Zhang",
    opportunity: "Backend Systems Intern",
    status: "Rejected After Interview",
    matchScore: 87,
    date: "2026-05-12",
  },
];

// Public feedback visible to any company with appropriate access scope.
const studentPublicFeedback = [
  {
    id: 1,
    studentName: "Alex Chen",
    studentId: "s1",
    rating: 4.8,
    feedbackBy: "Stellar Cloud",
    opportunity: "Frontend Engineering Intern",
    feedbackType: "Interview Feedback",
    verified: true,
    strengths: ["React", "TypeScript", "Communication"],
    feedbackText:
      "Alex showed strong frontend fundamentals and communicated clearly during the interview. Recommended for frontend-focused opportunities.",
    date: "May 18, 2026",
  },
  {
    id: 2,
    studentName: "Sarah Johnson",
    studentId: "s2",
    rating: 4.6,
    feedbackBy: "TechNova",
    opportunity: "Backend Systems Intern",
    feedbackType: "Training Feedback",
    verified: true,
    strengths: ["Python", "Teamwork", "Fast Learning"],
    feedbackText:
      "Sarah learned quickly during training and handled backend tasks with good attention to detail.",
    date: "May 15, 2026",
  },
];

// Private feedback authored by the signed-in company (Stellar Cloud).
// Not exposed to other companies; pre-filtered to Stellar Cloud records.
const INITIAL_PRIVATE_FEEDBACK: PrivateFeedbackRecord[] = [
  {
    id: "p1",
    studentName: "Alex Chen",
    studentId: "s1",
    opportunity: "Frontend Engineering Intern",
    feedbackType: "Interview Feedback",
    rating: 4.5,
    feedbackText:
      "Strong communicator with solid React fundamentals. Needs further development in API error handling and database awareness before a senior role.",
    date: "May 18, 2026",
  },
  {
    id: "p2",
    studentName: "Michael Zhang",
    studentId: "s3",
    opportunity: "Backend Systems Intern",
    feedbackType: "Rejection Feedback",
    rating: 3.7,
    feedbackText:
      "Demonstrated genuine interest and good problem-solving instincts. The current gap in systems design depth led to the decision not to advance at this stage.",
    date: "May 17, 2026",
  },
];

const feedbackFromStudents = [
  {
    id: 1,
    studentName: "Alex Chen",
    opportunity: "Frontend Engineering Intern",
    trainingStatus: "Completed",
    rating: 5.0,
    status: "Public",
    verified: true,
    feedbackText:
      "The training was very useful. The mentor helped me improve React, TypeScript, and teamwork skills. Tasks were clear and the company environment was professional.",
    categories: { mentorship: 5, taskClarity: 5, learningValue: 5, communication: 4 },
    date: "May 20, 2026",
  },
  {
    id: 2,
    studentName: "Sarah Johnson",
    opportunity: "Backend Systems Intern",
    trainingStatus: "Completed",
    rating: 3.5,
    status: "Pending Admin Review",
    verified: false,
    feedbackText:
      "The training was helpful, but some tasks needed clearer instructions and better scheduling.",
    categories: { mentorship: 4, taskClarity: 3, learningValue: 4, communication: 3 },
    date: "May 21, 2026",
  },
  {
    id: 3,
    studentName: "Anonymous",
    opportunity: "Product Design Training",
    trainingStatus: "Completed",
    rating: 2.0,
    status: "Hidden",
    verified: false,
    feedbackText: "This feedback is hidden from public view after admin moderation.",
    categories: { mentorship: 2, taskClarity: 2, learningValue: 3, communication: 2 },
    date: "May 10, 2026",
  },
];

const feedbackHistory = [
  {
    id: "FB-3001",
    studentName: "Alex Chen",
    opportunity: "Frontend Engineering Intern",
    feedbackType: "Interview Feedback",
    visibility: "Private",
    status: "Sent",
    rating: 4.5,
    submittedDate: "May 18, 2026",
  },
  {
    id: "FB-3002",
    studentName: "Sarah Johnson",
    opportunity: "Backend Systems Intern",
    feedbackType: "Training Feedback",
    visibility: "Public",
    status: "Pending Review",
    rating: 4.8,
    submittedDate: "May 19, 2026",
  },
  {
    id: "FB-3003",
    studentName: "Michael Zhang",
    opportunity: "Product Design Intern",
    feedbackType: "Rejection Feedback",
    visibility: "Private",
    status: "Sent",
    rating: 3.7,
    submittedDate: "May 17, 2026",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function getStatusBadge(status: string) {
  return <FeedbackBadge tone={getFeedbackStatusTone(status)}>{status}</FeedbackBadge>;
}

function StarRatingInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (val: number) => void;
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="transition-transform hover:scale-110"
        >
          <Star
            className={`w-6 h-6 ${
              star <= value
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

const BLANK_FORM: FeedbackFormData = {
  visibility: "private",
  overallRating: 0,
  technicalRating: 0,
  softSkillsRating: 0,
  communicationRating: 0,
  learningRating: 0,
  strengths: [],
  improvements: [],
  recommendedSkills: [],
  writtenFeedback: "",
  internalNotes: "",
  confirmed: false,
};

// ── Main component ────────────────────────────────────────────────────────────

export function FeedbackCenter() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<PrimaryTab>("provide");
  const [studentSecondaryTab, setStudentSecondaryTab] = useState<StudentSecondaryTab>("public");
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successWasPrivate, setSuccessWasPrivate] = useState(false);
  const [showDetailsDrawer, setShowDetailsDrawer] = useState(false);
  const [selectedFeedbackDetail, setSelectedFeedbackDetail] = useState<any>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportExplanation, setReportExplanation] = useState("");

  // Private feedback records — mutable so new submissions append to the list
  const [privateFeedbackRecords, setPrivateFeedbackRecords] =
    useState<PrivateFeedbackRecord[]>(INITIAL_PRIVATE_FEEDBACK);

  // View-submitted-feedback drawer
  const [showViewPrivateDrawer, setShowViewPrivateDrawer] = useState(false);
  const [viewedPrivateRecord, setViewedPrivateRecord] = useState<PrivateFeedbackRecord | null>(null);

  // Form & submission state
  const [formData, setFormData] = useState<FeedbackFormData>({ ...BLANK_FORM });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // ── Derived helpers ──

  const getPrivateRecord = (studentId: string): PrivateFeedbackRecord | undefined =>
    privateFeedbackRecords.find((r) => r.studentId === studentId);

  const hasPrivateFeedback = (studentId: string): boolean =>
    !!getPrivateRecord(studentId);

  const selectedStudentData = selectedStudent !== null
    ? studentsForFeedback.find((s) => s.id === selectedStudent) ?? null
    : null;

  const selectedHasPrivate = selectedStudentData
    ? hasPrivateFeedback(selectedStudentData.studentId)
    : false;

  // ── Handlers ──

  const handleStudentSelect = (id: number) => {
    const student = studentsForFeedback.find((s) => s.id === id);
    if (!student) return;
    const alreadyHasPrivate = hasPrivateFeedback(student.studentId);
    setSelectedStudent(id);
    setSubmitError(null);
    setFormData({
      ...BLANK_FORM,
      // Default to private when private feedback is still outstanding
      visibility: alreadyHasPrivate ? BLANK_FORM.visibility : "private",
    });
  };

  const toggleChip = (value: string, field: keyof FeedbackFormData) => {
    const current = formData[field] as string[];
    setFormData({
      ...formData,
      [field]: current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value],
    });
  };

  const handleSubmit = async () => {
    if (!selectedStudentData || isSubmitting) return;
    setSubmitError(null);
    setIsSubmitting(true);

    // Simulate async submission (900 ms)
    await new Promise((resolve) => setTimeout(resolve, 900));

    // Prototype: always succeeds. In production, wrap in try/catch and set
    // setSubmitError("...") on failure without touching completion indicators.

    const isPrivate = formData.visibility === "private";

    if (isPrivate) {
      const now = new Date();
      const dateStr = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      const newRecord: PrivateFeedbackRecord = {
        id: `p-${Date.now()}`,
        studentName: selectedStudentData.name,
        studentId: selectedStudentData.studentId,
        opportunity: selectedStudentData.opportunity,
        feedbackType: "Feedback",
        rating: formData.overallRating || 0,
        feedbackText: formData.writtenFeedback,
        date: dateStr,
      };
      // Append to private feedback list (drives card badge and Student Feedback → Private tab)
      setPrivateFeedbackRecords((prev) => [...prev, newRecord]);
    }

    setIsSubmitting(false);
    setSuccessWasPrivate(isPrivate);
    setShowSuccessModal(true);
    setFormData({ ...BLANK_FORM, visibility: isPrivate ? "private" : "public" });
  };

  const isFormSubmittable =
    selectedStudentData !== null &&
    formData.overallRating > 0 &&
    formData.writtenFeedback.trim().length > 0 &&
    formData.confirmed &&
    !isSubmitting;

  const PRIMARY_TABS: { key: PrimaryTab; label: string; icon: React.ElementType }[] = [
    { key: "provide",       label: "Provide Feedback",      icon: Send },
    { key: "studentPublic", label: "Student Feedback",       icon: Eye },
    { key: "fromStudents",  label: "Feedback From Students", icon: MessageSquare },
    { key: "history",       label: "Feedback History",       icon: FileText },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Feedback Center</h1>
        <p className="text-[var(--text-muted)]">
          Submit feedback to students, publish professional reviews, and view feedback received from
          students.
        </p>
      </div>

      {/* ── Primary tabs ── */}
      <div className="border-b border-[var(--border-main)] overflow-x-auto">
        <div className="flex gap-6 min-w-max">
          {PRIMARY_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 px-2 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap min-h-[44px] ${
                activeTab === tab.key
                  ? "border-blue-600 text-blue-600 font-semibold"
                  : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab 1: Provide Feedback ── */}
      {activeTab === "provide" && (
        <div className="space-y-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900 dark:text-blue-100">
              Your feedback helps students improve their skills and helps the platform generate
              better future match recommendations.
            </p>
          </div>

          {/* Student selection */}
          <div>
            <h3 className="font-bold mb-4">Select Student</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studentsForFeedback.map((student) => {
                const submitted = hasPrivateFeedback(student.studentId);
                const isSelected = selectedStudent === student.id;
                return (
                  <button
                    key={student.id}
                    onClick={() => handleStudentSelect(student.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      isSelected
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                        : "border-[var(--border-main)] hover:border-blue-300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold">{student.name}</h4>
                        <p className="text-sm text-[var(--text-muted)] mt-1">{student.opportunity}</p>

                        {/* Application status (existing) */}
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <Badge variant={student.status.includes("Completed") ? "success" : "outline"}>
                            {student.status}
                          </Badge>
                          <span className="text-xs text-[var(--text-muted)]">
                            Match: {student.matchScore}%
                          </span>
                        </div>

                        {/* Private feedback status indicator */}
                        <div className="mt-2">
                          {submitted ? (
                            <FeedbackBadge tone="published" icon={CheckCircle2}>
                              Private Feedback Submitted
                            </FeedbackBadge>
                          ) : (
                            <FeedbackBadge tone="pending" icon={AlertTriangle}>
                              Private Feedback Required
                            </FeedbackBadge>
                          )}
                        </div>

                        <p className="text-xs text-[var(--text-muted)] mt-1.5">Date: {student.date}</p>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedStudent !== null && selectedStudentData !== null && (
            <Card>
              <CardHeader>
                <CardTitle>
                  Submit Feedback for {selectedStudentData.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">

                {/* ── Private feedback requirement panel ── */}
                {selectedHasPrivate ? (() => {
                  const record = getPrivateRecord(selectedStudentData.studentId)!;
                  return (
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-green-800 dark:text-green-300">
                            Private feedback submitted
                          </p>
                          <p className="text-sm text-green-700 dark:text-green-400 mt-0.5">
                            You have submitted the required private feedback for this student. Public
                            feedback remains optional.
                          </p>
                          {record.date && (
                            <p className="text-xs text-green-600 dark:text-green-500 mt-1 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              Submitted: {record.date}
                            </p>
                          )}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-shrink-0 text-green-700 border-green-300 hover:bg-green-100 dark:text-green-400 dark:border-green-700 dark:hover:bg-green-900/40"
                        onClick={() => {
                          setViewedPrivateRecord(record);
                          setShowViewPrivateDrawer(true);
                        }}
                      >
                        View Submitted
                      </Button>
                    </div>
                  );
                })() : (
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-700 dark:text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                        Private feedback required
                      </p>
                      <p className="text-sm text-amber-700 dark:text-amber-400 mt-0.5">
                        You must submit private feedback for this student. Public feedback is optional
                        and does not replace the required private feedback.
                      </p>
                    </div>
                  </div>
                )}

                {/* ── Feedback Visibility ── */}
                <div>
                  <label className="text-sm font-semibold mb-3 block">Feedback Visibility</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Private */}
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, visibility: "private" })}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        formData.visibility === "private"
                          ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                          : "border-[var(--border-main)]"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2 gap-2">
                        <h4 className="font-semibold">Private Feedback to Student</h4>
                        <div className="flex gap-1.5 flex-shrink-0">
                          <FeedbackBadge tone={getFeedbackVisibilityTone("Private")} icon={Lock}>Private</FeedbackBadge>
                          <FeedbackBadge tone={getFeedbackStatusTone("Required")}>
                            Required
                          </FeedbackBadge>
                        </div>
                      </div>
                      <p className="text-sm text-[var(--text-muted)]">
                        Visible only to the student, this company, and admin. Used for constructive
                        improvement and skill guidance.
                      </p>
                    </button>

                    {/* Public */}
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, visibility: "public" })}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        formData.visibility === "public"
                          ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                          : "border-[var(--border-main)]"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2 gap-2">
                        <h4 className="font-semibold">Public Feedback About Student</h4>
                        <div className="flex gap-1.5 flex-shrink-0">
                          <FeedbackBadge tone={getFeedbackStatusTone("Pending Review")}>
                            Public Pending Review
                          </FeedbackBadge>
                          <FeedbackBadge tone="neutral">Optional</FeedbackBadge>
                        </div>
                      </div>
                      <p className="text-sm text-[var(--text-muted)]">
                        May appear on the student public profile after review. Use only professional
                        and appropriate feedback.
                      </p>
                    </button>
                  </div>

                  {/* Public-selected warning when private is outstanding */}
                  {formData.visibility === "public" && !selectedHasPrivate && (
                    <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-700 dark:text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-800 dark:text-amber-300">
                        Submitting public feedback will not complete this student's private feedback
                        requirement.
                      </p>
                    </div>
                  )}
                </div>

                {/* ── Ratings ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Overall Rating",        field: "overallRating" },
                    { label: "Technical Performance", field: "technicalRating" },
                    { label: "Soft Skills",           field: "softSkillsRating" },
                    { label: "Communication",         field: "communicationRating" },
                    { label: "Learning Ability",      field: "learningRating" },
                  ].map(({ label, field }) => (
                    <div key={field}>
                      <label className="text-sm font-semibold mb-2 block">
                        {label}
                        {field === "overallRating" && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </label>
                      <StarRatingInput
                        value={formData[field as keyof FeedbackFormData] as number}
                        onChange={(val) => setFormData({ ...formData, [field]: val })}
                      />
                    </div>
                  ))}
                </div>

                {/* ── Strengths ── */}
                <div>
                  <label className={`text-sm font-semibold mb-2 block ${feedbackSectionLabelStyles.strengths}`}>Strengths Observed</label>
                  <div className="flex flex-wrap gap-2">
                    {STRENGTHS_OPTIONS.map((strength) => (
                      <FeedbackBadge
                        key={strength}
                        tone={formData.strengths.includes(strength) ? "strength" : "neutral"}
                        className="cursor-pointer"
                        onClick={() => toggleChip(strength, "strengths")}
                      >
                        {strength}
                      </FeedbackBadge>
                    ))}
                  </div>
                </div>

                {/* ── Improvements ── */}
                <div>
                  <label className={`text-sm font-semibold mb-2 block ${feedbackSectionLabelStyles.areas}`}>Improvement Areas</label>
                  <div className="flex flex-wrap gap-2">
                    {IMPROVEMENTS_OPTIONS.map((improvement) => (
                      <FeedbackBadge
                        key={improvement}
                        tone={formData.improvements.includes(improvement) ? "areas" : "neutral"}
                        className="cursor-pointer"
                        onClick={() => toggleChip(improvement, "improvements")}
                      >
                        {improvement}
                      </FeedbackBadge>
                    ))}
                  </div>
                </div>

                {/* ── Recommended Skills ── */}
                <div>
                  <label className="text-sm font-semibold mb-2 block">Recommended Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {RECOMMENDED_SKILLS.map((skill) => (
                      <Badge
                        key={skill}
                        variant={formData.recommendedSkills.includes(skill) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleChip(skill, "recommendedSkills")}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* ── Written Feedback ── */}
                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Written Feedback <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.writtenFeedback}
                    onChange={(e) => setFormData({ ...formData, writtenFeedback: e.target.value })}
                    placeholder="Write clear and constructive feedback that helps the student improve..."
                    className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)] min-h-[120px] resize-y"
                  />
                </div>

                {/* ── Internal Notes ── */}
                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Private Internal Notes
                  </label>
                  <textarea
                    value={formData.internalNotes}
                    onChange={(e) => setFormData({ ...formData, internalNotes: e.target.value })}
                    placeholder="Internal company notes, not visible to the student."
                    className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)] min-h-[80px] resize-y"
                  />
                </div>

                {/* ── Confirmation ── */}
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={formData.confirmed}
                    onChange={(e) => setFormData({ ...formData, confirmed: e.target.checked })}
                  />
                  <span className="text-sm">
                    I confirm this feedback is professional, respectful, and accurate.
                  </span>
                </label>

                {/* ── Inline error ── */}
                {submitError && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800 dark:text-red-300">{submitError}</p>
                  </div>
                )}

                {/* ── Actions ── */}
                <div className="flex gap-3 pt-4 border-t border-[var(--border-main)]">
                  <Button variant="outline" onClick={() => setSelectedStudent(null)}>
                    Cancel
                  </Button>
                  <Button variant="outline" disabled={isSubmitting}>
                    Save Draft
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!isFormSubmittable}
                    className="min-w-[180px]"
                  >
                    {isSubmitting
                      ? "Submitting…"
                      : formData.visibility === "private"
                      ? "Submit Private Feedback"
                      : "Submit Public Feedback"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* ── Tab 2: Student Feedback ── */}
      {activeTab === "studentPublic" && (
        <div className="space-y-6">
          <div
            role="tablist"
            aria-label="Student feedback views"
            className="flex gap-0 border-b border-[var(--border-main)] overflow-x-auto"
          >
            {(
              [
                { key: "public",  label: "Public Feedback" },
                { key: "private", label: "Private Feedback" },
              ] as { key: StudentSecondaryTab; label: string }[]
            ).map((tab) => (
              <button
                key={tab.key}
                role="tab"
                aria-selected={studentSecondaryTab === tab.key}
                onClick={() => setStudentSecondaryTab(tab.key)}
                className={`px-4 py-2 border-b-2 text-sm font-medium transition-colors whitespace-nowrap min-h-[44px] ${
                  studentSecondaryTab === tab.key
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Public Feedback view */}
          {studentSecondaryTab === "public" && (
            <div role="tabpanel" className="space-y-4">
              {studentPublicFeedback.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <p className="font-semibold text-lg mb-2">No public feedback to display.</p>
                  </CardContent>
                </Card>
              ) : (
                studentPublicFeedback.map((feedback) => (
                  <Card key={feedback.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-lg">{feedback.studentName}</h4>
                            {feedback.verified && (
                              <FeedbackBadge tone="published" icon={CheckCircle2}>
                                Verified Feedback
                              </FeedbackBadge>
                            )}
                          </div>
                          <p className="text-sm text-[var(--text-muted)]">
                            Feedback by {feedback.feedbackBy} · {feedback.opportunity}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                            <span className="font-bold text-lg">{feedback.rating}</span>
                          </div>
                          <FeedbackBadge tone={getFeedbackCategoryTone(feedback.feedbackType)}>{feedback.feedbackType}</FeedbackBadge>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-semibold text-[var(--text-muted)] mb-2">
                            <span className={`${feedbackSectionLabelStyles.strengths} tracking-wide`}>MATCH-RELATED STRENGTHS</span>
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {feedback.strengths.map((s) => (
                              <FeedbackBadge key={s} tone="strength">{s}</FeedbackBadge>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm">{feedback.feedbackText}</p>
                        <div className="flex items-center justify-between pt-3 border-t border-[var(--border-main)]">
                          <span className="text-xs text-[var(--text-muted)]">{feedback.date}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigate(`/company/candidates/${feedback.studentId}`)}
                          >
                            View Student Profile
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}

          {/* Private Feedback view — driven by privateFeedbackRecords so new submissions appear here */}
          {studentSecondaryTab === "private" && (
            <div role="tabpanel" className="space-y-4">
              {privateFeedbackRecords.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Lock className="w-10 h-10 text-[var(--text-muted)] mx-auto mb-3" />
                    <p className="font-semibold text-lg mb-2">No private feedback yet.</p>
                    <p className="text-sm text-[var(--text-muted)]">
                      Private feedback you submit to students will appear here.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                privateFeedbackRecords.map((feedback) => (
                  <Card key={feedback.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-lg">{feedback.studentName}</h4>
                            <FeedbackBadge tone={getFeedbackVisibilityTone("Private")} icon={Lock}>
                              Private
                            </FeedbackBadge>
                          </div>
                          <p className="text-sm text-[var(--text-muted)]">
                            {feedback.opportunity} · {feedback.feedbackType}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="flex items-center gap-1">
                            <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                            <span className="font-bold text-lg">{feedback.rating}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm mb-4">{feedback.feedbackText}</p>

                      <div className="flex items-center justify-between pt-3 border-t border-[var(--border-main)]">
                        <span className="text-xs text-[var(--text-muted)]">{feedback.date}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigate(`/company/candidates/${feedback.studentId}`)}
                        >
                          View Student Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Tab 3: Feedback From Students ── */}
      {activeTab === "fromStudents" && (
        <div className="space-y-6">
          <div>
            <h3 className="font-bold mb-2">Feedback From Students</h3>
            <p className="text-sm text-[var(--text-muted)]">
              See what students said about your company after training experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: "Average Company Rating", value: "4.4" },
              { label: "Public Reviews",         value: "18" },
              { label: "Pending Admin Review",   value: "3" },
              { label: "Improvement Topics",     value: "5" },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-4">
                  <p className="text-sm text-[var(--text-muted)] mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            {feedbackFromStudents.map((feedback) => (
              <Card
                key={feedback.id}
                className={feedback.status === "Hidden" ? "opacity-60" : ""}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold">{feedback.studentName}</h4>
                        {feedback.verified && (
                          <FeedbackBadge tone="published" icon={CheckCircle2}>
                            Verified Training Experience
                          </FeedbackBadge>
                        )}
                      </div>
                      <p className="text-sm text-[var(--text-muted)]">
                        {feedback.opportunity} · {feedback.trainingStatus}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                        <span className="font-bold text-lg">{feedback.rating}</span>
                      </div>
                      {getStatusBadge(feedback.status)}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm">{feedback.feedbackText}</p>

                    <div>
                      <p className="text-xs font-semibold text-[var(--text-muted)] mb-2">
                        CATEGORY RATINGS
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {Object.entries(feedback.categories).map(([key, value]) => (
                          <div
                            key={key}
                            className="text-center p-2 bg-background dark:bg-gray-800/50 rounded"
                          >
                            <p className="text-xs text-[var(--text-muted)] capitalize mb-1">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </p>
                            <p className="text-sm font-bold">{value}/5</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[var(--border-main)]">
                      <span className="text-xs text-[var(--text-muted)]">{feedback.date}</span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedFeedbackDetail(feedback);
                            setShowDetailsDrawer(true);
                          }}
                        >
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600"
                          onClick={() => setShowReportModal(true)}
                        >
                          <Flag className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab 4: Feedback History ── */}
      {activeTab === "history" && (
        <div className="space-y-6">
          <div>
            <h3 className="font-bold mb-2">Feedback History</h3>
            <p className="text-sm text-[var(--text-muted)]">
              View all feedback you have submitted to students.
            </p>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-[var(--border-main)] bg-background dark:bg-gray-800/50">
                    <tr>
                      {[
                        "FEEDBACK ID", "STUDENT", "OPPORTUNITY", "TYPE",
                        "VISIBILITY", "STATUS", "RATING", "SUBMITTED", "ACTIONS",
                      ].map((h) => (
                        <th key={h} className="text-left p-4 text-xs font-semibold text-[var(--text-muted)]">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {feedbackHistory.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-[var(--border-main)] hover:bg-secondary dark:hover:bg-gray-800/50"
                      >
                        <td className="p-4 font-mono text-sm">{item.id}</td>
                        <td className="p-4 font-semibold">{item.studentName}</td>
                        <td className="p-4 text-sm">{item.opportunity}</td>
                        <td className="p-4 text-sm">{item.feedbackType}</td>
                        <td className="p-4">
                          <FeedbackBadge tone={getFeedbackVisibilityTone(item.visibility)} icon={item.visibility === "Private" ? Lock : Globe}>
                            {item.visibility}
                          </FeedbackBadge>
                        </td>
                        <td className="p-4">{getStatusBadge(item.status)}</td>
                        <td className="p-4 font-semibold">{item.rating}</td>
                        <td className="p-4 text-sm text-[var(--text-muted)]">{item.submittedDate}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">View</Button>
                            {item.status === "Draft" && (
                              <Button size="sm" variant="outline">Edit</Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── Success modal ── */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    {successWasPrivate
                      ? "Private Feedback Sent"
                      : "Public Feedback Submitted for Review"}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)]">
                    {successWasPrivate
                      ? "Your private feedback has been sent to the student and will help improve their future match recommendations."
                      : "Your public feedback has been submitted and may require admin review before it appears on the student profile."}
                  </p>
                </div>
                <div className="flex flex-col gap-2 pt-4">
                  <Button
                    onClick={() => {
                      setShowSuccessModal(false);
                      setActiveTab("history");
                    }}
                  >
                    View Feedback History
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowSuccessModal(false);
                      setSelectedStudent(null);
                    }}
                  >
                    Submit Another Feedback
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── View Submitted Private Feedback drawer ── */}
      {showViewPrivateDrawer && viewedPrivateRecord && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/50" onClick={() => setShowViewPrivateDrawer(false)} />
          <div className="w-full max-w-md bg-[var(--bg-main)] shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-[var(--bg-main)] border-b border-[var(--border-main)] p-6 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Submitted Private Feedback</h2>
                  <p className="text-sm text-[var(--text-muted)]">Read-only · {viewedPrivateRecord.date}</p>
                </div>
                <button
                  onClick={() => setShowViewPrivateDrawer(false)}
                  className="p-2 hover:bg-muted dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center gap-2">
                <FeedbackBadge tone={getFeedbackVisibilityTone("Private")} icon={Lock}>
                  Private
                </FeedbackBadge>
                <FeedbackBadge tone={getFeedbackStatusTone("Submitted")} icon={CheckCircle2}>
                  Submitted
                </FeedbackBadge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Student</span>
                  <span className="font-semibold">{viewedPrivateRecord.studentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Opportunity</span>
                  <span className="font-semibold">{viewedPrivateRecord.opportunity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Feedback Type</span>
                  <span className="font-semibold">{viewedPrivateRecord.feedbackType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span className="font-semibold">{viewedPrivateRecord.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Submitted</span>
                  <span className="font-semibold">{viewedPrivateRecord.date}</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">Written Feedback</p>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {viewedPrivateRecord.feedbackText}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border-main)]">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowViewPrivateDrawer(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Details drawer (Feedback From Students) ── */}
      {showDetailsDrawer && selectedFeedbackDetail && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50"
            onClick={() => setShowDetailsDrawer(false)}
          />
          <div className="w-full max-w-md bg-[var(--bg-main)] shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-[var(--bg-main)] border-b border-[var(--border-main)] p-6 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Student Feedback Details</h2>
                <button
                  onClick={() => setShowDetailsDrawer(false)}
                  className="p-2 hover:bg-muted dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-bold mb-3">Feedback Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Student:</span>
                    <span className="font-semibold">{selectedFeedbackDetail.studentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Opportunity:</span>
                    <span className="font-semibold">{selectedFeedbackDetail.opportunity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Rating:</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span className="font-semibold">{selectedFeedbackDetail.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Status:</span>
                    {getStatusBadge(selectedFeedbackDetail.status)}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-3">Category Ratings</h3>
                <div className="space-y-2">
                  {Object.entries(selectedFeedbackDetail.categories).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-sm capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="font-semibold">{value as number}/5</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-3">Written Feedback</h3>
                <p className="text-sm text-[var(--text-muted)]">
                  {selectedFeedbackDetail.feedbackText}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border-main)]">
                <Button
                  variant="outline"
                  className="w-full text-red-600"
                  onClick={() => {
                    setShowDetailsDrawer(false);
                    setShowReportModal(true);
                  }}
                >
                  <Flag className="w-4 h-4 mr-2" />
                  Report to Admin
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Report modal ── */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Report Feedback</h3>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="p-1 hover:bg-muted dark:hover:bg-gray-800 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Reason</label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full p-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                  >
                    <option value="">Select reason...</option>
                    <option>Inappropriate language</option>
                    <option>Misleading claim</option>
                    <option>Personal attack</option>
                    <option>Contains private information</option>
                    <option>Fake or inaccurate feedback</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">Explanation</label>
                  <textarea
                    value={reportExplanation}
                    onChange={(e) => setReportExplanation(e.target.value)}
                    placeholder="Explain why this feedback should be reviewed..."
                    className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)] min-h-[100px] resize-y"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowReportModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => setShowReportModal(false)} className="flex-1">
                    Submit Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
