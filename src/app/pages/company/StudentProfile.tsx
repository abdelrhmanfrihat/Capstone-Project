import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { MatchScore } from "../../components/ui/MatchScore";
import {
  ArrowLeft,
  Video,
  Heart,
  MessageSquare,
  FileText,
  Star,
  GraduationCap,
  MapPin,
  Briefcase,
  CheckCircle2,
  TrendingUp,
  Users,
  Lightbulb,
  Target,
  Eye,
  Building2,
  Calendar,
  Award
} from "lucide-react";

interface PublicFeedback {
  id: number;
  companyName: string;
  opportunity: string;
  feedbackType: string;
  rating: number;
  verified: boolean;
  date: string;
  strengths: string[];
  feedbackText: string;
}

export function StudentProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "feedback">("overview");

  // Mock student data
  const student = {
    name: "Alex Chen",
    initials: "AC",
    major: "Computer Science",
    university: "Stanford University",
    graduationYear: 2026,
    location: "California, USA",
    availability: "Available Now",
    profileStrength: 92,
    matchScore: 94,
    verified: true,
    aiSummary: "Alex is a strong frontend candidate with React, TypeScript, Node.js, teamwork, and web development interest."
  };

  const matchAnalysis = {
    overall: 94,
    technical: 96,
    softSkills: 88,
    interest: 92,
    behavioral: 90
  };

  const whyMatches = [
    "Strong React and TypeScript skills",
    "Interested in Web Development",
    "Strong communication and teamwork profile",
    "Fits remote frontend internship requirements"
  ];

  const possibleGaps = [
    "Limited SQL experience",
    "Needs more API integration practice"
  ];

  const technicalSkills = [
    { name: "React", level: "Advanced" },
    { name: "TypeScript", level: "Intermediate" },
    { name: "Node.js", level: "Intermediate" },
    { name: "Git", level: "Intermediate" },
    { name: "APIs", level: "Beginner" }
  ];

  const softSkills = [
    "Communication",
    "Teamwork",
    "Problem Solving",
    "Adaptability",
    "Self Learning"
  ];

  const interests = [
    "Web Development",
    "AI / Machine Learning",
    "Frontend Engineering",
    "SaaS Products",
    "Remote Work"
  ];

  const preferredRoles = [
    "Frontend Engineering Intern",
    "Full Stack Trainee",
    "UI-focused Developer"
  ];

  const behavioralProfile = [
    "Collaborative",
    "Fast Learner",
    "Problem Solver",
    "Comfortable with Feedback",
    "Detail-Oriented"
  ];

  const publicFeedback: PublicFeedback[] = [
    {
      id: 1,
      companyName: "Stellar Cloud",
      opportunity: "Frontend Engineering Intern",
      feedbackType: "Interview Feedback",
      rating: 4.8,
      verified: true,
      date: "May 18, 2026",
      strengths: ["React", "Communication", "Teamwork"],
      feedbackText: "Alex showed strong frontend fundamentals and communicated clearly during the interview. He explained his React project well and showed good learning potential."
    },
    {
      id: 2,
      companyName: "TechNova",
      opportunity: "Frontend Training Program",
      feedbackType: "Training Feedback",
      rating: 4.6,
      verified: true,
      date: "April 28, 2026",
      strengths: ["Fast Learning", "Problem Solving", "Professional Attitude"],
      feedbackText: "Alex adapted quickly during training tasks and responded well to mentor feedback. He is recommended for frontend-focused internships."
    },
    {
      id: 3,
      companyName: "BrightLabs",
      opportunity: "UI Development Workshop",
      feedbackType: "Project Feedback",
      rating: 4.5,
      verified: true,
      date: "March 20, 2026",
      strengths: ["Design Thinking", "Teamwork", "Documentation"],
      feedbackText: "Alex worked well with the team and showed good attention to UI details."
    }
  ];

  const averageRating = publicFeedback.reduce((sum, f) => sum + f.rating, 0) / publicFeedback.length;

  const recruitmentActivity = {
    currentStage: "Not yet contacted",
    lastAction: "Viewed profile",
    noteCount: 0,
    relatedOpportunity: "Frontend Engineering Intern"
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Advanced":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Intermediate":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "Beginner":
        return "bg-amber-50 border border-amber-200 text-amber-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-muted text-[var(--text-secondary)] dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Candidates
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Student Profile</h1>
            <p className="text-sm text-[var(--text-muted)]">
              Review student profile, AI match analysis, skills, status, and public feedback.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Video className="w-4 h-4 mr-2" />
            Invite to Interview
          </Button>
          <Button variant="outline">
            <Heart className="w-4 h-4 mr-2" />
            Mark Interested
          </Button>
        </div>
      </div>

      {/* Top Profile Summary */}
      <Card className="border-blue-200 dark:border-blue-800">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {student.initials}
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold">{student.name}</h2>
                    {student.verified && (
                      <Badge variant="success" className="gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified Student Profile
                      </Badge>
                    )}
                    <Badge variant="success">{student.availability}</Badge>
                  </div>

                  <div className="flex flex-wrap gap-3 text-sm text-[var(--text-muted)]">
                    <div className="flex items-center gap-1">
                      <GraduationCap className="w-4 h-4" />
                      {student.major} • {student.university}
                    </div>
                    <span>•</span>
                    <span>Graduating {student.graduationYear}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {student.location}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-4 mb-2">
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">Match Score</p>
                      <MatchScore score={student.matchScore} size="lg" />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">Profile Strength</p>
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                        <span className="text-xl font-bold">{student.profileStrength}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Quick AI Summary</p>
                    <p className="text-sm text-blue-800 dark:text-blue-200">{student.aiSummary}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="border-b border-[var(--border-main)]">
        <div className="flex gap-6">
          {[
            { key: "overview" as const, label: "Overview & Skills" },
            { key: "feedback" as const, label: "Public Feedback" }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 px-2 border-b-2 transition-colors ${
                activeTab === tab.key
                  ? "border-blue-600 text-blue-600 font-semibold"
                  : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Match Analysis */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  AI Match Analysis
                </h3>

                <div className="space-y-4">
                  {[
                    { label: "Overall Match Score", value: matchAnalysis.overall, color: "blue" },
                    { label: "Technical Match", value: matchAnalysis.technical, color: "green" },
                    { label: "Soft Skills Match", value: matchAnalysis.softSkills, color: "purple" },
                    { label: "Interest Match", value: matchAnalysis.interest, color: "yellow" },
                    { label: "Behavioral Fit", value: matchAnalysis.behavioral, color: "teal" }
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">{label}</span>
                        <span className="text-sm font-bold">{value}%</span>
                      </div>
                      <div className="w-full bg-muted dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2">Why this candidate matches</h4>
                    <ul className="space-y-1">
                      {whyMatches.map((reason, idx) => (
                        <li key={idx} className="text-xs text-green-800 dark:text-green-200 flex items-start gap-2">
                          <CheckCircle2 className="w-3 h-3 flex-shrink-0 mt-0.5" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-amber-50 dark:bg-yellow-900/20 rounded-lg border border-amber-200 dark:border-yellow-800">
                    <h4 className="text-sm font-semibold text-amber-800 dark:text-yellow-100 mb-2">Possible gaps</h4>
                    <ul className="space-y-1">
                      {possibleGaps.map((gap, idx) => (
                        <li key={idx} className="text-xs text-amber-800 dark:text-yellow-200 flex items-start gap-2">
                          <span className="flex-shrink-0">•</span>
                          {gap}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Skills & Proficiency</h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text-muted)] mb-3">TECHNICAL SKILLS</h4>
                    <div className="space-y-2">
                      {technicalSkills.map(skill => (
                        <div key={skill.name} className="flex items-center justify-between p-3 bg-background dark:bg-gray-800/50 rounded-lg">
                          <span className="font-medium">{skill.name}</span>
                          <Badge className={getLevelColor(skill.level)}>{skill.level}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text-muted)] mb-3">SOFT SKILLS</h4>
                    <div className="flex flex-wrap gap-2">
                      {softSkills.map(skill => (
                        <Badge key={skill} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interests & Career Direction */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Interests & Career Direction</h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text-muted)] mb-2">INTERESTS</h4>
                    <div className="flex flex-wrap gap-2">
                      {interests.map(interest => (
                        <Badge key={interest} variant="blue">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text-muted)] mb-2">PREFERRED ROLES</h4>
                    <div className="space-y-2">
                      {preferredRoles.map(role => (
                        <div key={role} className="flex items-center gap-2 text-sm">
                          <Briefcase className="w-4 h-4 text-blue-600" />
                          {role}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text-muted)] mb-2">PREFERRED WORK STYLE</h4>
                    <p className="text-sm">Remote / Hybrid</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Behavioral Profile */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Behavioral Profile</h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                  {behavioralProfile.map(trait => (
                    <div key={trait} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 text-center">
                      <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">{trait}</p>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-background dark:bg-gray-800/50 rounded-lg">
                  <p className="text-sm text-[var(--text-muted)]">
                    <strong>AI Note:</strong> Alex shows strong collaborative behavior and learns quickly from structured feedback.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Education */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">Education</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-xs text-[var(--text-muted)] mb-1">UNIVERSITY</p>
                    <p className="font-semibold">{student.university}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)] mb-1">MAJOR</p>
                    <p className="font-semibold">{student.major}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)] mb-1">GRADUATION YEAR</p>
                    <p className="font-semibold">{student.graduationYear}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)] mb-1">LOCATION</p>
                    <p className="font-semibold">{student.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recruitment Activity */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">Your Recruitment Activity</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-xs text-[var(--text-muted)] mb-1">CURRENT STAGE</p>
                    <Badge variant="outline">{recruitmentActivity.currentStage}</Badge>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)] mb-1">LAST ACTION</p>
                    <p>{recruitmentActivity.lastAction}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)] mb-1">RELATED OPPORTUNITY</p>
                    <p className="font-semibold">{recruitmentActivity.relatedOpportunity}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  <Button size="sm">Invite to Interview</Button>
                  <Button size="sm" variant="outline">Mark Interested</Button>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Add Note
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Internal Notes */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">Internal Notes</h3>
                <p className="text-xs text-[var(--text-muted)] mb-3">
                  Private notes are not visible to the student.
                </p>
                <textarea
                  placeholder="Add a private note about this candidate..."
                  className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)] min-h-[100px] resize-y text-sm"
                />
                <Button size="sm" className="w-full mt-3">Save Note</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Public Feedback Tab */}
      {activeTab === "feedback" && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold mb-2">Public Feedback About This Student</h3>
            <p className="text-sm text-[var(--text-muted)]">
              Professional feedback submitted by companies and approved for public visibility.
            </p>
          </div>

          {/* Feedback Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-[var(--text-muted)] mb-1">Average Public Rating</p>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
                  <span className="text-sm text-[var(--text-muted)]">/ 5</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-[var(--text-muted)] mb-1">Public Feedback Count</p>
                <p className="text-2xl font-bold">{publicFeedback.length}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-[var(--text-muted)] mb-1">Verified Feedback</p>
                <p className="text-2xl font-bold">{publicFeedback.filter(f => f.verified).length}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-[var(--text-muted)] mb-1">Most Mentioned</p>
                <Badge variant="default">Communication</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <Button size="sm" variant="outline">All Feedback</Button>
            <Button size="sm" variant="outline">Interview</Button>
            <Button size="sm" variant="outline">Training</Button>
            <Button size="sm" variant="outline">Project</Button>
            <Button size="sm" variant="outline">Highest Rating</Button>
            <Button size="sm" variant="outline">Most Recent</Button>
          </div>

          {/* Feedback Cards */}
          <div className="space-y-4">
            {publicFeedback.map(feedback => (
              <Card key={feedback.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Building2 className="w-4 h-4 text-blue-600" />
                        <h4 className="font-bold">{feedback.companyName}</h4>
                        {feedback.verified && (
                          <Badge variant="success" className="gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified Public Feedback
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-[var(--text-muted)]">
                        {feedback.opportunity} • {feedback.feedbackType}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                        <span className="font-bold text-lg">{feedback.rating}</span>
                      </div>
                      <p className="text-xs text-[var(--text-muted)]">{feedback.date}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-green-400 uppercase tracking-wide mb-2">STRENGTHS</p>
                      <div className="flex flex-wrap gap-2">
                        {feedback.strengths.map(strength => (
                          <Badge key={strength} variant="success">{strength}</Badge>
                        ))}
                      </div>
                    </div>

                    <p className="text-sm">{feedback.feedbackText}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="p-4 bg-background dark:bg-gray-800/50 rounded-lg border border-[var(--border-main)]">
            <p className="text-sm text-[var(--text-muted)]">
              <strong>Note:</strong> Private feedback is not visible here. Only approved public feedback is shown.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
