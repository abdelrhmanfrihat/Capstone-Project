import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Star, User, CheckCircle2, Send } from "lucide-react";
import { FeedbackBadge, feedbackSelectableChipStyles, getFeedbackStatusTone } from "../../components/shared/FeedbackBadge";

export function CompanyFeedback() {
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [strengths, setStrengths] = useState<string[]>([]);
  const [improvements, setImprovements] = useState<string[]>([]);
  const [comments, setComments] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Students who completed interviews or training
  const studentsToRate = [
    {
      id: 1,
      name: "Alex Chen",
      role: "Frontend Engineering Intern",
      status: "Interview Completed",
      interviewDate: "2026-05-16"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Frontend Engineering Intern",
      status: "Training Completed",
      completedDate: "2026-05-10"
    }
  ];

  const availableStrengths = [
    "Problem Solving",
    "React",
    "TypeScript",
    "Communication",
    "Teamwork",
    "Creativity",
    "Time Management",
    "Technical Writing"
  ];

  const availableImprovements = [
    "SQL",
    "Backend Concepts",
    "System Design",
    "Testing",
    "DevOps",
    "Data Structures",
    "Algorithms",
    "API Design"
  ];

  const toggleSkill = (skill: string, list: string[], setter: (val: string[]) => void) => {
    if (list.includes(skill)) {
      setter(list.filter(s => s !== skill));
    } else {
      setter([...list, skill]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStudent || rating === 0) {
      alert("Please select a student and provide a rating");
      return;
    }

    console.log({
      studentId: selectedStudent,
      rating,
      strengths,
      improvements,
      comments
    });

    setSubmitted(true);
    setTimeout(() => {
      // Reset form
      setSelectedStudent(null);
      setRating(0);
      setStrengths([]);
      setImprovements([]);
      setComments("");
      setSubmitted(false);
    }, 2000);
  };

  const StarRating = ({
    value,
    onChange,
    hover,
    onHover
  }: {
    value: number;
    onChange: (val: number) => void;
    hover?: number;
    onHover?: (val: number) => void;
  }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => onHover?.(star)}
          onMouseLeave={() => onHover?.(0)}
          className="transition-transform hover:scale-110"
        >
          <Star
            className={`w-7 h-7 ${
              star <= (hover || value)
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        </button>
      ))}
    </div>
  );

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Feedback Submitted!</h2>
            <p className="text-[var(--text-muted)]">
              Your feedback has been sent to the student and will help them improve their skills.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Provide Student Feedback</h1>
        <p className="text-[var(--text-muted)]">
          Help students grow by sharing constructive feedback on their performance.
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 flex items-start gap-3">
        <Star className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800 dark:text-blue-300">
          <p className="font-semibold mb-1">Why your feedback matters</p>
          <p>
            Detailed feedback helps students understand their strengths and areas for improvement,
            and our AI uses this data to provide better match recommendations in the future.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Select Student */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Select Student to Rate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {studentsToRate.map((student) => (
              <button
                key={student.id}
                type="button"
                onClick={() => setSelectedStudent(student.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  selectedStudent === student.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-[var(--border-main)] hover:border-blue-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                    {student.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">{student.name}</h4>
                    <p className="text-sm text-[var(--text-muted)]">{student.role}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <FeedbackBadge tone={getFeedbackStatusTone(student.status)}>
                        {student.status}
                      </FeedbackBadge>
                      <span className="text-xs text-[var(--text-muted)]">
                        {student.status.includes("Interview") ? student.interviewDate : (student as any).completedDate}
                      </span>
                    </div>
                  </div>
                  {selectedStudent === student.id && (
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  )}
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {selectedStudent && (
          <>
            {/* Overall Rating */}
            <Card>
              <CardHeader>
                <CardTitle>Overall Performance Rating</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <StarRating
                    value={rating}
                    onChange={setRating}
                    hover={hoverRating}
                    onHover={setHoverRating}
                  />
                  <span className="text-lg font-bold">
                    {rating > 0 ? `${rating}.0 / 5.0` : "Select rating"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Strengths */}
            <Card>
              <CardHeader>
                <CardTitle>Strengths Observed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-muted)] mb-3">
                  Select skills and qualities where this student excelled:
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableStrengths.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill, strengths, setStrengths)}
                      className={`px-3 py-1.5 rounded-md border-2 text-sm font-medium transition-all ${
                        strengths.includes(skill)
                        ? feedbackSelectableChipStyles.strengthSelected
                          : feedbackSelectableChipStyles.strengthIdle
                      }`}
                    >
                      {strengths.includes(skill) && "✓ "}
                      {skill}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Areas for Improvement */}
            <Card>
              <CardHeader>
                <CardTitle>Areas for Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-muted)] mb-3">
                  Select skills this student should focus on developing:
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableImprovements.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill, improvements, setImprovements)}
                      className={`px-3 py-1.5 rounded-md border-2 text-sm font-medium transition-all ${
                        improvements.includes(skill)
                        ? feedbackSelectableChipStyles.areasSelected
                          : feedbackSelectableChipStyles.areasIdle
                      }`}
                    >
                      {improvements.includes(skill) && "! "}
                      {skill}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Written Feedback */}
            <Card>
              <CardHeader>
                <CardTitle>Written Feedback (Optional but Recommended)</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Share specific observations, examples of good work, or constructive advice..."
                  className="w-full min-h-[150px] p-3 border rounded-lg bg-transparent border-[var(--border-main)] focus:border-blue-500 focus:outline-none"
                />
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSelectedStudent(null)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={rating === 0}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="w-4 h-4" />
                Submit Feedback
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
