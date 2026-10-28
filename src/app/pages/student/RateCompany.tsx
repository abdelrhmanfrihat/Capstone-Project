import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Star, Building2, AlertCircle, CheckCircle2, Briefcase } from "lucide-react";

export function RateCompany() {
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [cultureFit, setCultureFit] = useState(0);
  const [learning, setLearning] = useState(0);
  const [mentorship, setMentorship] = useState(0);
  const [workEnvironment, setWorkEnvironment] = useState(0);
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);
  const [review, setReview] = useState("");
  const [strengths, setStrengths] = useState("");
  const [improvements, setImprovements] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Mock completed internships/trainings
  const completedOpportunities = [
    { id: 1, company: "TechNova Solutions", role: "Frontend Developer Intern", endDate: "May 10, 2026", logo: "🏢" },
    { id: 2, company: "DataPulse Analytics", role: "Data Science Trainee", endDate: "April 28, 2026", logo: "📊" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCompany || rating === 0) {
      alert("Please select a company and provide an overall rating");
      return;
    }

    // Here you would submit to API
    console.log({
      company: selectedCompany,
      rating,
      cultureFit,
      learning,
      mentorship,
      workEnvironment,
      wouldRecommend,
      review,
      strengths,
      improvements,
    });

    setSubmitted(true);
    setTimeout(() => navigate("/student/my-activity?tab=applications"), 2000);
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
            className={`w-6 h-6 ${
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
            <h2 className="text-2xl font-bold mb-2">شكراً على تقييمك!</h2>
            <p className="text-[var(--text-muted)] mb-4">
              تم إرسال تقييمك بنجاح. سيساعد رأيك الطلاب الآخرين في اتخاذ قرارات أفضل.
            </p>
            <p className="text-sm text-[var(--text-muted)]">
              جاري التحويل إلى صفحة الطلبات...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Rate Your Experience</h1>
        <p className="text-[var(--text-muted)]">
          Help other students by sharing your honest feedback about companies you've worked with.
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800 dark:text-blue-300">
          <p className="font-semibold mb-1">Your feedback matters</p>
          <p>Your review will be visible to other students and will help them make informed decisions. Please be honest and constructive.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Select Company */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              Select Company to Rate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {completedOpportunities.map((opp) => (
              <button
                key={opp.id}
                type="button"
                onClick={() => setSelectedCompany(opp.company)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  selectedCompany === opp.company
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-[var(--border-main)] hover:border-blue-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{opp.logo}</div>
                  <div className="flex-1">
                    <h4 className="font-bold">{opp.company}</h4>
                    <p className="text-sm text-[var(--text-muted)]">{opp.role}</p>
                    <p className="text-xs text-[var(--text-muted)]">Completed: {opp.endDate}</p>
                  </div>
                  {selectedCompany === opp.company && (
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  )}
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {selectedCompany && (
          <>
            {/* Overall Rating */}
            <Card>
              <CardHeader>
                <CardTitle>Overall Rating</CardTitle>
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

            {/* Detailed Ratings */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Ratings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Culture Fit</label>
                  <StarRating value={cultureFit} onChange={setCultureFit} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Learning Opportunities</label>
                  <StarRating value={learning} onChange={setLearning} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Mentorship Quality</label>
                  <StarRating value={mentorship} onChange={setMentorship} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Work Environment</label>
                  <StarRating value={workEnvironment} onChange={setWorkEnvironment} />
                </div>
              </CardContent>
            </Card>

            {/* Recommendation */}
            <Card>
              <CardHeader>
                <CardTitle>Would you recommend this company to other students?</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setWouldRecommend(true)}
                  className={`flex-1 p-4 rounded-lg border-2 font-semibold transition-all ${
                    wouldRecommend === true
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                      : "border-[var(--border-main)] hover:border-green-300"
                  }`}
                >
                  ✓ Yes, I recommend
                </button>
                <button
                  type="button"
                  onClick={() => setWouldRecommend(false)}
                  className={`flex-1 p-4 rounded-lg border-2 font-semibold transition-all ${
                    wouldRecommend === false
                      ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                      : "border-[var(--border-main)] hover:border-red-300"
                  }`}
                >
                  ✗ No, I don't recommend
                </button>
              </CardContent>
            </Card>

            {/* Written Review */}
            <Card>
              <CardHeader>
                <CardTitle>Written Review</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Overall Experience (Required)
                  </label>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Describe your overall experience with this company..."
                    className="w-full min-h-[120px] p-3 border rounded-lg bg-transparent border-[var(--border-main)] focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    What were the company's strengths?
                  </label>
                  <textarea
                    value={strengths}
                    onChange={(e) => setStrengths(e.target.value)}
                    placeholder="What did this company do well?"
                    className="w-full min-h-[80px] p-3 border rounded-lg bg-transparent border-[var(--border-main)] focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    What could be improved?
                  </label>
                  <textarea
                    value={improvements}
                    onChange={(e) => setImprovements(e.target.value)}
                    placeholder="Constructive feedback on areas for improvement..."
                    className="w-full min-h-[80px] p-3 border rounded-lg bg-transparent border-[var(--border-main)] focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/student/my-activity?tab=applications")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={rating === 0 || !review.trim()}>
                Submit Review
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
