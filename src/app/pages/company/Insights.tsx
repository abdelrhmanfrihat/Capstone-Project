import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Progress } from "../../components/ui/progress";
import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  Clock,
  Star,
  Briefcase,
  Eye,
  UserCheck,
  X,
  CheckCircle2,
  Loader2
} from "lucide-react";

export function CompanyInsights() {
  const [showUpdateRequirementsModal, setShowUpdateRequirementsModal] = useState(false);
  const [showPreviewCandidates, setShowPreviewCandidates] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [recommendationApplied, setRecommendationApplied] = useState(false);

  const recalculationSteps = [
    "Updating opportunity requirements",
    "Re-analyzing skill criteria",
    "Recalculating candidate match scores",
    "Refreshing candidate recommendations",
    "Updating pipeline insights"
  ];

  const newPotentialCandidates = [
    {
      name: "Alex Chen",
      currentMatch: 84,
      afterMatch: 94,
      reason: "Strong React and TypeScript, missing SQL"
    },
    {
      name: "Sarah Johnson",
      currentMatch: 79,
      afterMatch: 91,
      reason: "Strong frontend skills, good communication"
    },
    {
      name: "Michael Zhang",
      currentMatch: 74,
      afterMatch: 87,
      reason: "Strong UI development background"
    }
  ];

  const handleApplyRecommendation = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmApply = () => {
    if (!confirmChecked) {
      alert("Please confirm that you understand the changes");
      return;
    }
    setShowConfirmModal(false);
    setShowLoadingModal(true);
    setCurrentStep(0);

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= recalculationSteps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setShowLoadingModal(false);
            setShowSuccessModal(true);
            setRecommendationApplied(true);
          }, 500);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Company Insights & Analytics</h1>
        <p className="text-[var(--text-muted)]">
          AI-powered insights to optimize your hiring and match quality.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-[var(--text-muted)]">Total Applicants</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold">{recommendationApplied ? 165 : 109}</p>
                  <span className="text-xs text-green-600 dark:text-green-400">↑ {recommendationApplied ? 51 : 23}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Target className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-[var(--text-muted)]">Avg Match Score</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold">{recommendationApplied ? 89 : 76}%</p>
                  <span className="text-xs text-green-600 dark:text-green-400">↑ {recommendationApplied ? 17 : 8}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <UserCheck className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-[var(--text-muted)]">Interview Rate</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold">42%</p>
                  <span className="text-xs text-green-600 dark:text-green-400">↑ 12%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 dark:bg-yellow-900/30 rounded-lg">
                <Clock className="w-5 h-5 text-amber-700 dark:text-yellow-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-[var(--text-muted)]">Avg Time to Hire</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold">18d</p>
                  <span className="text-xs text-green-600 dark:text-green-400">↓ 3d</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      {recommendationApplied ? (
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Recommendation Applied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--text-muted)]">
              SQL is now marked as nice-to-have for Frontend Engineering Intern. Match quality improved.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Top AI Recommendation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-card dark:bg-gray-800 rounded-lg border border-blue-100 dark:border-blue-800">
              <h4 className="font-semibold mb-2">Adjust Required Skills for Better Matches</h4>
              <p className="text-sm text-[var(--text-muted)] mb-3">
                Your Frontend Engineering role requires <strong>SQL</strong> as a must-have skill, but 78% of high-quality
                React developers in the platform don't list SQL. Making SQL "nice-to-have" instead could increase your
                candidate pool by <strong>56 qualified applicants (avg match 89%)</strong>.
              </p>
              <div className="flex gap-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowUpdateRequirementsModal(true)}>
                  Update Requirements
                </Button>
                <Button size="sm" variant="outline">View Analysis</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Opportunity Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              Opportunity Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-semibold text-sm">Frontend Engineering Intern</p>
                    <p className="text-xs text-[var(--text-muted)]">{recommendationApplied ? 98 : 42} applicants</p>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--text-muted)]">Profile Views</span>
                    <span className="font-semibold">{recommendationApplied ? 492 : 328}</span>
                  </div>
                  <Progress value={82} className="h-2" />
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--text-muted)]">Avg Match Score</span>
                    <span className="font-semibold text-green-600">{recommendationApplied ? 89 : 76}%</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-main)]">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-semibold text-sm">Backend Developer Trainee</p>
                    <p className="text-xs text-[var(--text-muted)]">0 applicants</p>
                  </div>
                  <Badge variant="warning">Draft</Badge>
                </div>
                <p className="text-xs text-[var(--text-muted)]">
                  Publish to start receiving applications
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Candidate Quality Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Candidate Quality Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold">Match Score 90%+</span>
                <span className="text-lg font-bold text-green-600">{recommendationApplied ? 32 : 8}</span>
              </div>
              <Progress value={recommendationApplied ? 33 : 19} className="h-2" />
              <p className="text-xs text-[var(--text-muted)] mt-1">{recommendationApplied ? 33 : 19}% of total applicants</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold">Match Score 80-89%</span>
                <span className="text-lg font-bold text-blue-600">{recommendationApplied ? 45 : 21}</span>
              </div>
              <Progress value={50} className="h-2" />
              <p className="text-xs text-[var(--text-muted)] mt-1">50% of total applicants</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold">Match Score 70-79%</span>
                <span className="text-lg font-bold text-amber-700 dark:text-yellow-600">13</span>
              </div>
              <Progress value={31} className="h-2" />
              <p className="text-xs text-[var(--text-muted)] mt-1">31% of total applicants</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills Gap Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Most In-Demand Skills (Missing from Candidates)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg border-[var(--border-main)]">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold">SQL</h4>
                <Badge variant={recommendationApplied ? "success" : "danger"}>{recommendationApplied ? "Nice-to-have" : "Missing: 78%"}</Badge>
              </div>
              <p className="text-xs text-[var(--text-muted)] mb-3">
                {recommendationApplied ? "Now marked as nice-to-have" : "Required by you, but missing from most applicants"}
              </p>
              {!recommendationApplied && (
                <Button size="sm" variant="outline" className="w-full" onClick={() => setShowUpdateRequirementsModal(true)}>
                  Make Optional
                </Button>
              )}
            </div>

            <div className="p-4 border rounded-lg border-[var(--border-main)]">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold">AWS</h4>
                <Badge variant="warning">Missing: 45%</Badge>
              </div>
              <p className="text-xs text-[var(--text-muted)] mb-3">
                Nice-to-have, but could widen your pool
              </p>
              <Button size="sm" variant="outline" className="w-full">
                View Alternatives
              </Button>
            </div>

            <div className="p-4 border rounded-lg border-[var(--border-main)]">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold">TypeScript</h4>
                <Badge variant="success">Strong: 89%</Badge>
              </div>
              <p className="text-xs text-[var(--text-muted)] mb-3">
                Most candidates have this skill
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Keep as Required
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competitive Intelligence */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-600" />
            Competitive Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Market Demand Rising</h4>
                <p className="text-sm text-[var(--text-muted)]">
                  Frontend developer opportunities increased by 35% this month. Your current compensation
                  offering is <strong>12% below market average</strong> for similar roles. Consider adjusting
                  to attract top talent.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 border rounded-lg border-[var(--border-main)]">
              <p className="text-xs font-semibold text-[var(--text-muted)] mb-1">YOUR AVG RESPONSE TIME</p>
              <p className="text-2xl font-bold">2.4 days</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                ↓ 18% faster than industry
              </p>
            </div>

            <div className="p-3 border rounded-lg border-[var(--border-main)]">
              <p className="text-xs font-semibold text-[var(--text-muted)] mb-1">CANDIDATE RATING</p>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= 4 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xl font-bold">4.2</span>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-1">Based on 8 reviews</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Update Requirements Modal */}
      {showUpdateRequirementsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <Card className="w-full max-w-4xl my-8">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Update Opportunity Requirements</h2>
                  <p className="text-[var(--text-muted)]">Apply AI recommendations to improve candidate match quality.</p>
                </div>
                <button onClick={() => setShowUpdateRequirementsModal(false)} className="p-2 hover:bg-muted dark:hover:bg-gray-800 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-[var(--text-muted)] mb-1">Selected Opportunity</div>
                  <div className="font-semibold">Frontend Engineering Intern</div>
                </div>
                <div>
                  <div className="text-sm text-[var(--text-muted)] mb-1">Status</div>
                  <Badge variant="success">Active</Badge>
                </div>
                <div>
                  <div className="text-sm text-[var(--text-muted)] mb-1">Current Avg Match Score</div>
                  <div className="font-semibold">76%</div>
                </div>
                <div>
                  <div className="text-sm text-[var(--text-muted)] mb-1">Predicted After Update</div>
                  <div className="font-semibold text-green-600">89%</div>
                </div>
              </div>

              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-4">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <Badge variant="blue">AI Recommended</Badge>
                    AI Recommendation
                  </h3>
                  <h4 className="font-semibold mb-2">Change SQL from "Required Skill" to "Nice-to-Have Skill"</h4>
                  <p className="text-sm text-[var(--text-muted)] mb-4">
                    78% of high-quality React candidates on the platform do not list SQL, but they strongly match the frontend requirements. Making SQL nice-to-have can increase the candidate pool without reducing frontend fit.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-card dark:bg-gray-800 rounded-lg">
                      <div className="text-[var(--text-muted)] mb-1">Qualified Applicants</div>
                      <div className="text-2xl font-bold text-green-600">+56</div>
                    </div>
                    <div className="p-3 bg-card dark:bg-gray-800 rounded-lg">
                      <div className="text-[var(--text-muted)] mb-1">Avg Match Score</div>
                      <div className="text-xl font-bold">76% → 89%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Current Requirements</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <div className="text-xs font-semibold text-[var(--text-muted)] mb-1">REQUIRED TECHNICAL SKILLS</div>
                        <div className="flex flex-wrap gap-1">
                          {["React", "TypeScript", "Git", "APIs"].map(skill => (
                            <Badge key={skill} variant="blue" className="text-xs">{skill}</Badge>
                          ))}
                          <Badge variant="danger" className="text-xs gap-1">SQL <span className="text-[10px]">Too restrictive</span></Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Proposed Changes</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <div className="text-xs font-semibold text-[var(--text-muted)] mb-1">REQUIRED TECHNICAL SKILLS</div>
                        <div className="flex flex-wrap gap-1">
                          {["React", "TypeScript", "Git", "APIs"].map(skill => (
                            <Badge key={skill} variant="blue" className="text-xs">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[var(--text-muted)] mb-1">NICE-TO-HAVE SKILLS</div>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="success" className="text-xs gap-1">SQL <span className="text-[10px]">AI Recommended</span></Badge>
                          {["Tailwind CSS", "Testing", "UI/UX basics"].map(skill => (
                            <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Impact Preview</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-sm text-[var(--text-muted)] mb-1">Candidate Pool</div>
                      <div className="text-xs text-[var(--text-muted)]">Before: 128</div>
                      <div className="text-2xl font-bold text-blue-600">184</div>
                      <div className="text-xs text-green-600">+56</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-[var(--text-muted)] mb-1">Avg Match Score</div>
                      <div className="text-xs text-[var(--text-muted)]">Before: 76%</div>
                      <div className="text-2xl font-bold text-blue-600">89%</div>
                      <div className="text-xs text-green-600">+13%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-[var(--text-muted)] mb-1">High-Match Candidates</div>
                      <div className="text-xs text-[var(--text-muted)]">Before: 18</div>
                      <div className="text-2xl font-bold text-blue-600">42</div>
                      <div className="text-xs text-green-600">+24</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-[var(--text-muted)] mb-1">Requirement Strictness</div>
                      <div className="text-xs text-[var(--text-muted)]">Before: High</div>
                      <div className="text-lg font-bold text-green-600">Balanced</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowUpdateRequirementsModal(false)} className="flex-1">Cancel</Button>
                <Button variant="outline" onClick={() => setShowPreviewCandidates(true)} className="flex-1">Preview Candidates</Button>
                <Button onClick={handleApplyRecommendation} className="flex-1">Apply Recommendation</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Preview Candidates Modal */}
      {showPreviewCandidates && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold">New Potential Matches</h3>
                <button onClick={() => setShowPreviewCandidates(false)} className="p-2 hover:bg-muted dark:hover:bg-gray-800 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 mb-6">
                {newPotentialCandidates.map((candidate, i) => (
                  <Card key={i} className="bg-[var(--bg-secondary)]">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{candidate.name}</h4>
                        <div className="flex gap-2 text-sm">
                          <span className="text-[var(--text-muted)]">Current: {candidate.currentMatch}%</span>
                          <span className="text-green-600 font-semibold">→ After: {candidate.afterMatch}%</span>
                        </div>
                      </div>
                      <p className="text-sm text-[var(--text-muted)]">{candidate.reason}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowPreviewCandidates(false)} className="flex-1">Back</Button>
                <Button onClick={() => {
                  setShowPreviewCandidates(false);
                  handleApplyRecommendation();
                }} className="flex-1">Apply Recommendation</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">Apply AI Recommendation?</h3>
              <p className="text-sm text-[var(--text-muted)] mb-4">
                This will update the requirements for Frontend Engineering Intern and recalculate match scores for related students.
              </p>

              <Card className="bg-[var(--bg-secondary)] mb-4">
                <CardContent className="p-4 text-sm space-y-2">
                  <div>• SQL will move from Required to Nice-to-have</div>
                  <div>• Candidate pool expected to increase by 56</div>
                  <div>• Average match score expected to improve from 76% to 89%</div>
                </CardContent>
              </Card>

              <label className="flex items-start gap-2 mb-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmChecked}
                  onChange={(e) => setConfirmChecked(e.target.checked)}
                  className="w-4 h-4 mt-1"
                />
                <span className="text-sm">I understand that this change will update opportunity requirements and recalculate matches.</span>
              </label>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowConfirmModal(false)} className="flex-1">Cancel</Button>
                <Button onClick={handleConfirmApply} className="flex-1">Apply & Recalculate</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Loading Modal */}
      {showLoadingModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-6 text-center">Updating Requirements</h3>
              <div className="space-y-3">
                {recalculationSteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {index < currentStep ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    ) : index === currentStep ? (
                      <Loader2 className="w-5 h-5 text-blue-600 animate-spin shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-border dark:border-gray-600 shrink-0"></div>
                    )}
                    <span className={index <= currentStep ? "font-medium" : "text-[var(--text-muted)]"}>{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Requirements Updated Successfully</h3>
              <p className="text-[var(--text-muted)] mb-6">
                SQL is now marked as a nice-to-have skill for Frontend Engineering Intern. Candidate matches are being recalculated.
              </p>

              <Card className="bg-[var(--bg-secondary)] mb-6">
                <CardContent className="p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Avg Match Score:</span>
                    <span className="font-semibold">76% → 89%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Qualified Applicants:</span>
                    <span className="font-semibold text-green-600">+56</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">High-Match Candidates:</span>
                    <span className="font-semibold text-green-600">+24</span>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowSuccessModal(false)} className="flex-1">Back to Insights</Button>
                <Button onClick={() => {
                  setShowSuccessModal(false);
                  window.location.href = "/company/candidates";
                }} className="flex-1">View Updated Candidates</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
