import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import {
  FeedbackBadge,
  feedbackSectionLabelStyles,
  getFeedbackStatusTone,
  getFeedbackVisibilityTone,
} from "../../components/shared/FeedbackBadge";
import {
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Trash2,
  Star,
  Search,
  Filter,
  Download,
  Edit,
  X,
  Lock,
  Globe,
} from "lucide-react";

export function AdminFeedbackModeration() {
  const [selectedFeedback, setSelectedFeedback] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const feedbackList = [
    {
      id: "FB-2041",
      studentName: "Alex Chen",
      companyName: "Stellar Cloud",
      opportunity: "Frontend Engineering Intern",
      rating: 4.5,
      preview: "The training was useful and the mentor helped me improve React and teamwork skills...",
      status: "Pending Review",
      visibility: "Not Published",
      submittedDate: "May 18, 2026",
      flags: [],
      fullFeedback: {
        overallRating: 4.5,
        trainingQuality: 5,
        mentorship: 4,
        taskClarity: 4,
        learningValue: 5,
        writtenFeedback: "The training was useful and the mentor helped me improve React and teamwork skills. I worked on real projects and learned a lot about modern frontend development practices.",
        strengths: "Great mentorship, Real-world projects, Good learning environment",
        improvements: "Could provide more backend integration training",
        wouldRecommend: true
      }
    },
    {
      id: "FB-2042",
      studentName: "Sarah Miller",
      companyName: "TechNova",
      opportunity: "Backend Systems Intern",
      rating: 2.0,
      preview: "The company was unorganized and the tasks were unclear...",
      status: "Flagged",
      visibility: "Not Published",
      submittedDate: "May 19, 2026",
      flags: ["Negative Tone"],
      fullFeedback: {
        overallRating: 2.0,
        trainingQuality: 2,
        mentorship: 1,
        taskClarity: 2,
        learningValue: 3,
        writtenFeedback: "The company was unorganized and the tasks were unclear. I didn't get proper mentorship and felt lost most of the time.",
        strengths: "Some interesting technical challenges",
        improvements: "Better organization, Clear task assignments, Dedicated mentor",
        wouldRecommend: false
      }
    },
    {
      id: "FB-2043",
      studentName: "Marcus Johnson",
      companyName: "BrightLabs",
      opportunity: "Product Design Intern",
      rating: 1.0,
      preview: "This company is terrible and nobody should work with them...",
      status: "Flagged",
      visibility: "Not Published",
      submittedDate: "May 20, 2026",
      flags: ["Possible Inappropriate Language"],
      fullFeedback: {
        overallRating: 1.0,
        trainingQuality: 1,
        mentorship: 1,
        taskClarity: 1,
        learningValue: 1,
        writtenFeedback: "This company is terrible and nobody should work with them. Complete waste of time.",
        strengths: "None",
        improvements: "Everything",
        wouldRecommend: false
      }
    },
    {
      id: "FB-2044",
      studentName: "Elena Rodriguez",
      companyName: "DataPulse",
      opportunity: "Data Science Intern",
      rating: 5.0,
      preview: "Great training experience. I learned Python, dashboards, and real data analysis workflows...",
      status: "Approved",
      visibility: "Public",
      submittedDate: "May 12, 2026",
      flags: [],
      fullFeedback: {
        overallRating: 5.0,
        trainingQuality: 5,
        mentorship: 5,
        taskClarity: 5,
        learningValue: 5,
        writtenFeedback: "Great training experience. I learned Python, dashboards, and real data analysis workflows. The mentorship was excellent and I feel confident in my new skills.",
        strengths: "Excellent mentorship, Real projects, Supportive team",
        improvements: "None really, everything was great",
        wouldRecommend: true
      }
    }
  ];

  const getStatusBadge = (status: string) => {
    return <FeedbackBadge tone={getFeedbackStatusTone(status)}>{status}</FeedbackBadge>;
  };

  const getVisibilityBadge = (visibility: string) => {
    const icon = visibility === "Private" ? Lock : visibility === "Public" ? Globe : undefined;
    return <FeedbackBadge tone={getFeedbackVisibilityTone(visibility)} icon={icon}>{visibility}</FeedbackBadge>;
  };

  const selectedFeedbackData = feedbackList.find(f => f.id === selectedFeedback);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Feedback Moderation</h1>
        <p className="text-[var(--text-muted)]">
          Review student feedback about companies before it becomes publicly visible.
        </p>
      </div>

      {/* Info Alert */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800 dark:text-blue-300">
          Student feedback submitted after training must be reviewed by admin to prevent inappropriate, unfair, offensive, or misleading public reviews.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)]">Pending Reviews</p>
                <p className="text-2xl font-bold">18</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)]">Approved This Month</p>
                <p className="text-2xl font-bold">42</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <X className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)]">Rejected</p>
                <p className="text-2xl font-bold">6</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-muted dark:bg-gray-800 rounded-lg">
                <EyeOff className="w-5 h-5 text-[var(--text-body)]" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)]">Hidden Feedback</p>
                <p className="text-2xl font-bold">9</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 dark:bg-amber-500/10 rounded-lg">
                <AlertCircle className="w-5 h-5 text-amber-700 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)]">Flagged</p>
                <p className="text-2xl font-bold">4</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                placeholder="Search feedback by student, company, opportunity, or keywords..."
                className="w-full pl-10 pr-3 py-2 border rounded-md bg-transparent border-[var(--border-main)] focus:border-blue-500 focus:outline-none"
              />
            </div>
            <select className="border rounded-md px-3 py-2 bg-transparent border-[var(--border-main)]">
              <option>All Statuses</option>
              <option>Pending Review</option>
              <option>Approved</option>
              <option>Rejected</option>
              <option>Flagged</option>
            </select>
            <select className="border rounded-md px-3 py-2 bg-transparent border-[var(--border-main)]">
              <option>All Ratings</option>
              <option>5 Stars</option>
              <option>4 Stars</option>
              <option>3 Stars</option>
              <option>2 Stars</option>
              <option>1 Star</option>
            </select>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-[var(--border-main)] bg-background dark:bg-gray-800/50">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold">Feedback ID</th>
                  <th className="text-left p-4 text-sm font-semibold">Student</th>
                  <th className="text-left p-4 text-sm font-semibold">Company</th>
                  <th className="text-left p-4 text-sm font-semibold">Rating</th>
                  <th className="text-left p-4 text-sm font-semibold">Preview</th>
                  <th className="text-left p-4 text-sm font-semibold">Status</th>
                  <th className="text-left p-4 text-sm font-semibold">Submitted</th>
                  <th className="text-left p-4 text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {feedbackList.map((feedback) => (
                  <tr key={feedback.id} className="border-b border-[var(--border-main)] hover:bg-secondary dark:hover:bg-gray-800/30">
                    <td className="p-4 font-semibold text-sm">{feedback.id}</td>
                    <td className="p-4 text-sm">{feedback.studentName}</td>
                    <td className="p-4 text-sm">{feedback.companyName}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold">{feedback.rating}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-[var(--text-muted)] max-w-xs truncate">
                      {feedback.preview}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        {getStatusBadge(feedback.status)}
                        {feedback.flags.length > 0 && (
                          <FeedbackBadge tone="pending" className="text-xs">
                            {feedback.flags[0]}
                          </FeedbackBadge>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-[var(--text-muted)]">
                      {feedback.submittedDate}
                    </td>
                    <td className="p-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedFeedback(feedback.id);
                          setShowDetails(true);
                        }}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Details Modal/Drawer */}
      {showDetails && selectedFeedbackData && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card dark:bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[var(--border-main)] flex justify-between items-center sticky top-0 bg-card dark:bg-gray-900">
              <h2 className="text-xl font-bold">Feedback Review Details</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="p-2 hover:bg-muted dark:hover:bg-gray-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Feedback Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Feedback Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">FEEDBACK ID</p>
                      <p className="font-semibold">{selectedFeedbackData.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">STATUS</p>
                      {getStatusBadge(selectedFeedbackData.status)}
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">VISIBILITY</p>
                      {getVisibilityBadge(selectedFeedbackData.visibility)}
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">SUBMITTED</p>
                      <p className="font-semibold">{selectedFeedbackData.submittedDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Full Feedback Content */}
              <Card>
                <CardHeader>
                  <CardTitle>Public Feedback Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-xs text-[var(--text-muted)] mb-1">Overall</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-bold">{selectedFeedbackData.fullFeedback.overallRating}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)] mb-1">Training Quality</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-bold">{selectedFeedbackData.fullFeedback.trainingQuality}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)] mb-1">Mentorship</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-bold">{selectedFeedbackData.fullFeedback.mentorship}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)] mb-1">Task Clarity</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-bold">{selectedFeedbackData.fullFeedback.taskClarity}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)] mb-1">Learning Value</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-bold">{selectedFeedbackData.fullFeedback.learningValue}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-[var(--text-muted)] mb-2">WRITTEN FEEDBACK</p>
                    <p className="p-4 bg-background dark:bg-gray-800/50 rounded-lg">
                      {selectedFeedbackData.fullFeedback.writtenFeedback}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className={`text-xs uppercase tracking-wide mb-2 ${feedbackSectionLabelStyles.strengths}`}>STRENGTHS</p>
                      <p className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-sm">
                        {selectedFeedbackData.fullFeedback.strengths}
                      </p>
                    </div>
                    <div>
                      <p className={`text-xs uppercase tracking-wide mb-2 ${feedbackSectionLabelStyles.areas}`}>IMPROVEMENTS</p>
                      <p className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-sm">
                        {selectedFeedbackData.fullFeedback.improvements}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-[var(--text-muted)] mb-2">WOULD RECOMMEND?</p>
                    <FeedbackBadge tone={selectedFeedbackData.fullFeedback.wouldRecommend ? "published" : "rejected"}>
                      {selectedFeedbackData.fullFeedback.wouldRecommend ? "Yes, I recommend" : "No, I don't recommend"}
                    </FeedbackBadge>
                  </div>
                </CardContent>
              </Card>

              {/* Public Preview */}
              <Card className="border-2 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="text-blue-600">Public Preview</CardTitle>
                  <p className="text-sm text-[var(--text-muted)]">How this feedback will appear on the company profile</p>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-background dark:bg-gray-800/50 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                          {selectedFeedbackData.studentName.split(' ')[0][0]}
                        </div>
                        <div>
                          <p className="font-semibold">{selectedFeedbackData.studentName.split(' ')[0]}</p>
                          <p className="text-xs text-[var(--text-muted)]">{selectedFeedbackData.opportunity}</p>
                        </div>
                      </div>
                      <FeedbackBadge tone="published">Verified Training Experience</FeedbackBadge>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= selectedFeedbackData.rating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 font-bold">{selectedFeedbackData.rating}</span>
                    </div>
                    <p className="text-sm">{selectedFeedbackData.fullFeedback.writtenFeedback}</p>
                    <p className="text-xs text-[var(--text-muted)]">{selectedFeedbackData.submittedDate}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Moderation Decision */}
              <Card>
                <CardHeader>
                  <CardTitle>Moderation Decision</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Decision</label>
                    <select className="w-full border rounded-md px-3 py-2 bg-transparent border-[var(--border-main)]">
                      <option>Approve and publish</option>
                      <option>Reject</option>
                      <option>Hide</option>
                      <option>Remove</option>
                      <option>Request edit from student</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Reason</label>
                    <select className="w-full border rounded-md px-3 py-2 bg-transparent border-[var(--border-main)]">
                      <option>Approved as appropriate</option>
                      <option>Inappropriate language</option>
                      <option>Personal attack</option>
                      <option>Misleading or unverified claim</option>
                      <option>Contains private information</option>
                      <option>Too vague</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Admin Comment</label>
                    <textarea
                      placeholder="Explain the moderation decision..."
                      className="w-full min-h-[100px] p-3 border rounded-lg bg-transparent border-[var(--border-main)] focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Notify student about this decision</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Notify company if feedback is approved and published</span>
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end pt-4 border-t border-[var(--border-main)]">
                <Button variant="outline" onClick={() => setShowDetails(false)}>
                  Cancel
                </Button>
                <Button variant="outline" className="text-red-600">
                  Reject
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Approve & Publish
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
