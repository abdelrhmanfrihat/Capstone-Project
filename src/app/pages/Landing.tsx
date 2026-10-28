import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PublicNavbar } from "../components/shared/PublicNavbar";
import { PublicFooter } from "../components/shared/PublicFooter";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { NetworkDiagram } from "@/app/components/landing/NetworkDiagram";
import {
  BrainCircuit,
  Building2,
  Users,
  TrendingUp,
  CheckCircle2,
  Target,
  Lightbulb,
  FileText,
  ChevronRight,
  BarChart3,
  Shield,
  MessageSquare,
  Award,
  Zap,
  Search,
  Clock,
  Star,
  ArrowRight,
  X
} from "lucide-react";

const stepIconColorClasses: Record<string, string> = {
  blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600",
  green: "bg-green-100 dark:bg-green-900/30 text-green-600",
  purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600",
  orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-600",
};

function CountUpValue({ value }: { value: string }) {
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);
  const target = Number(value.replace(/[^0-9]/g, ""));
  const suffix = value.endsWith("%") ? "%" : value.endsWith("+") ? "+" : "";

  useEffect(() => {
    const element = document.getElementById(`count-${value.replace(/[^a-zA-Z0-9]/g, "")}`);
    if (!element || typeof IntersectionObserver === "undefined") { setCount(target); return; }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setStarted(true);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [target, value]);

  useEffect(() => {
    if (!started) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setCount(target); return; }
    const duration = 900;
    let frame = 0;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [started, target]);

  return <span id={`count-${value.replace(/[^a-zA-Z0-9]/g, "")}`}>{count.toLocaleString()}{suffix}</span>;
}

export function Landing() {
  const navigate = useNavigate();
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".landing-section-header, .landing-section [data-slot='card']"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") return;
    elements.forEach((element) => element.classList.add("landing-reveal"));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        (entry.target as HTMLElement).classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12, rootMargin: "0px 0px -4% 0px" });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNavbar />

      {/* Hero Section */}
      <section id="home" className="landing-hero relative flex min-h-[calc(100svh-var(--nav-h,4rem))] items-center overflow-hidden py-8 lg:py-12">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-[var(--background)] to-[var(--accent)] dark:from-blue-600/10 dark:via-transparent dark:to-purple-600/10"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid items-center gap-6 lg:grid-cols-[1.08fr_.92fr] lg:gap-10">
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-full">
                <Zap className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">AI-Powered Matching Platform</span>
              </div>

              <h1 tabIndex={-1} className="max-w-[20ch] text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05] tracking-tight">
                AI-Powered Internship Matching for Students and Companies
              </h1>

              <p className="max-w-2xl text-base text-[var(--text-muted)] sm:text-lg">
                InternMatch AI helps students and companies connect through deep profiling, compatibility scores, and explainable AI-assisted recommendations — without relying on traditional CVs.
              </p>

              <div className="flex flex-wrap gap-2 sm:gap-4">
                <Button size="lg" onClick={() => navigate("/login")} className="gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection("how-it-works")}>
                  See How It Works
                </Button>
              </div>

              <p className="flex items-center gap-2 text-xs text-[var(--text-muted)] sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                No CV required for students. Built around skills, interests, behavior, and potential.
              </p>
            </div>

            <NetworkDiagram />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="gap" className="landing-section bg-[var(--bg-secondary)] dark:bg-[var(--bg-secondary)]">
        <div className="landing-container">
          <div className="landing-section-header text-center">
            <h2 tabIndex={-1} className="text-3xl lg:text-4xl font-bold mb-4">The Internship Discovery Gap</h2>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
              Traditional internship matching fails both students and companies
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">For Students</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    Weak CVs make it hard to stand out
                  </li>
                  <li className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    Skills and potential are often hidden
                  </li>
                  <li className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    Searching manually wastes time
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold">For Companies</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    Too many applications to review
                  </li>
                  <li className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    Hard to compare students fairly
                  </li>
                  <li className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    Skills, interests, and behavior are difficult to evaluate
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full">
              <BrainCircuit className="w-5 h-5" />
              <span className="font-semibold">InternMatch AI closes the gap with compatibility-based matching</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="landing-section">
        <div className="landing-container">
          <div className="landing-section-header text-center">
            <h2 tabIndex={-1} className="text-3xl lg:text-4xl font-bold mb-4">How InternMatch AI Works</h2>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
              A simple 4-step process that connects the right students with the right opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "1",
                title: "Student completes smart assessment",
                description: "Students answer structured questions about skills, interests, behavior, work style, and goals.",
                icon: FileText,
                color: "blue"
              },
              {
                step: "2",
                title: "Company posts opportunity",
                description: "Companies define technical skills, soft skills, training details, and ideal candidate traits.",
                icon: Building2,
                color: "purple"
              },
              {
                step: "3",
                title: "System calculates compatibility",
                description: "The platform compares both sides and generates match scores with explanations.",
                icon: BrainCircuit,
                color: "green"
              },
              {
                step: "4",
                title: "Both sides move through workflow",
                description: "Students apply, companies shortlist, interviews happen, offers are matched, and training begins.",
                icon: TrendingUp,
                color: "orange"
              }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <Card className="h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stepIconColorClasses[item.color]}`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <span className="text-3xl font-bold text-[var(--text-muted)]/20">{item.step}</span>
                    </div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm text-[var(--text-muted)]">{item.description}</p>
                  </CardContent>
                </Card>
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ChevronRight className="w-8 h-8 text-blue-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Students */}
      <section id="for-students" className="landing-section bg-[var(--bg-secondary)] dark:bg-[var(--bg-secondary)]">
        <div className="landing-container">
          <div className="landing-section-header text-center">
            <h2 tabIndex={-1} className="text-3xl lg:text-4xl font-bold mb-4">Built for Students Without Strong CVs</h2>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
              Your profile is built from your potential, not only your past experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { icon: BrainCircuit, title: "Deep AI Profile", description: "Build a profile from your skills, interests, soft skills, and behavior." },
              { icon: Target, title: "Match Scores", description: "See which opportunities fit you best and why." },
              { icon: Lightbulb, title: "Skill Gap Insights", description: "Know which skills can improve your match score." },
              { icon: Building2, title: "Company Invitations", description: "Receive interest and interview invitations from companies." },
              { icon: BarChart3, title: "Application Tracking", description: "Track Applied, Shortlisted, Interview, Matched, and In Training stages." },
              { icon: MessageSquare, title: "Feedback & Growth", description: "Use feedback from companies to improve your profile and future matches." }
            ].map((feature, idx) => (
              <Card key={idx}>
                <CardContent className="p-6 space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-bold">{feature.title}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" onClick={() => navigate("/student/assessment")}>
              Start as Student
            </Button>
          </div>
        </div>
      </section>

      {/* For Companies */}
      <section id="for-companies" className="landing-section">
        <div className="landing-container">
          <div className="landing-section-header text-center">
            <h2 tabIndex={-1} className="text-3xl lg:text-4xl font-bold mb-4">Find the Most-Fit Students Faster</h2>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
              Discover candidates based on compatibility, not just keywords.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { icon: FileText, title: "Post Opportunities", description: "Create internships and training posts with detailed requirements." },
              { icon: Star, title: "Ranked Candidates", description: "Get AI-assisted ranked lists of students for each opportunity." },
              { icon: Search, title: "Candidate Discovery", description: "Search and filter by skills, interests, availability, and match score." },
              { icon: TrendingUp, title: "Recruitment Pipeline", description: "Manage candidates per opportunity with unique pipelines." },
              { icon: Clock, title: "Interview Management", description: "Invite students, schedule interviews, and track responses." },
              { icon: MessageSquare, title: "Feedback System", description: "Provide private or public feedback to support student growth." }
            ].map((feature, idx) => (
              <Card key={idx}>
                <CardContent className="p-6 space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="font-bold">{feature.title}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" onClick={() => navigate("/register/company")}>
              Register as Company
            </Button>
          </div>
        </div>
      </section>

      {/* AI Matching Explanation */}
      <section id="features" className="landing-section bg-[var(--bg-secondary)] dark:bg-[var(--bg-secondary)]">
        <div className="landing-container">
          <div className="landing-section-header text-center">
            <h2 tabIndex={-1} className="text-3xl lg:text-4xl font-bold mb-4">Explainable Matching, Not Black-Box AI</h2>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
              InternMatch AI uses rule-based intelligent matching and NLP-inspired analysis to compare student profiles with opportunity requirements.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-blue-500">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">Frontend Engineering Intern</h3>
                    <p className="text-sm text-[var(--text-muted)]">Stellar Cloud</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[var(--text-muted)]">Match Score</p>
                    <p className="text-4xl font-bold text-blue-600">94%</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Technical Skills</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-600 rounded-full" style={{ width: "96%" }}></div>
                      </div>
                      <span className="text-sm font-semibold">96%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Soft Skills</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: "88%" }}></div>
                      </div>
                      <span className="text-sm font-semibold">88%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Interests</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-600 rounded-full" style={{ width: "92%" }}></div>
                      </div>
                      <span className="text-sm font-semibold">92%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Behavioral Fit</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-600 rounded-full" style={{ width: "90%" }}></div>
                      </div>
                      <span className="text-sm font-semibold">90%</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--border-main)] space-y-3">
                  <div>
                    <p className="text-sm font-semibold mb-2">Why this match?</p>
                    <p className="text-sm text-[var(--text-muted)]">
                      Strong React and TypeScript skills, excellent teamwork profile, and clear web development interest.
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold mb-2">Missing skills:</p>
                    <Badge variant="outline" className="text-xs">SQL basics</Badge>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      <strong>Recommendation:</strong> Adding SQL could improve this match to 99%.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Workflow Preview */}
      <section id="status-tracking" className="landing-section">
        <div className="landing-container">
          <div className="landing-section-header text-center">
            <h2 tabIndex={-1} className="text-3xl lg:text-4xl font-bold mb-4">Clear Status Tracking from Application to Training</h2>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
              Students can apply to multiple opportunities and attend multiple interviews. They are only locked when training officially begins.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {["Active", "Applied", "Shortlisted", "Interview", "Matched", "In Training"].map((status, idx) => (
                <div key={idx} className="flex items-center gap-2">
                <Badge variant={status === "In Training" ? "warning" : status === "Active" ? "success" : "outline"} className="px-4 py-2">
                    {status}
                  </Badge>
                  {idx < 5 && <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />}
                </div>
              ))}
            </div>

            <Card className="border-amber-200 dark:border-yellow-800">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-amber-700 dark:text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Important: In Training Status</p>
                    <p className="text-sm text-[var(--text-muted)]">
                      Only "In Training" blocks new applications and hides the student from company search. Students remain visible and active until training officially begins.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Feedback & Growth */}
      <section id="feedback" className="landing-section bg-[var(--bg-secondary)] dark:bg-[var(--bg-secondary)]">
        <div className="landing-container">
          <div className="landing-section-header text-center">
            <h2 tabIndex={-1} className="text-3xl lg:text-4xl font-bold mb-4">Feedback That Actually Helps Students Grow</h2>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
              Companies can provide private feedback to students and public feedback about students. Students can also review companies after training.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { title: "Private Feedback", description: "Visible only to student, company, and admin.", icon: MessageSquare },
              { title: "Public Feedback", description: "Can appear publicly after admin approval.", icon: Star },
              { title: "Company Reviews", description: "Students can rate companies after training completion.", icon: Award },
              { title: "Growth Insights", description: "The system turns repeated feedback into skill improvement suggestions.", icon: Lightbulb }
            ].map((item, idx) => (
              <Card key={idx}>
                <CardContent className="p-6 space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <BrainCircuit className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-2">Example Growth Insight</p>
                    <p className="text-sm text-[var(--text-muted)]">
                      "Multiple companies mentioned SQL as a missing skill. Learning SQL could improve your average match score by 12%."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust & Admin Control */}
      <section id="trust" className="landing-section">
        <div className="landing-container">
          <div className="landing-section-header text-center">
            <h2 tabIndex={-1} className="text-3xl lg:text-4xl font-bold mb-4">Built with Trust and Moderation</h2>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
              Admins verify companies, manage assessment questions, moderate feedback, handle disputes, and release students from incorrect training locks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Manual Company Verification", description: "Every company is verified before posting opportunities." },
              { icon: MessageSquare, title: "Feedback Moderation", description: "All public feedback is reviewed for quality and fairness." },
              { icon: Target, title: "Dispute Resolution", description: "Admin team handles conflicts between students and companies." },
              { icon: CheckCircle2, title: "Status Override", description: "Admins can release students from incorrect training locks." },
              { icon: FileText, title: "Question Bank Management", description: "Assessment questions are curated and updated regularly." },
              { icon: BarChart3, title: "Audit Logs", description: "Complete transparency with detailed activity logging." }
            ].map((feature, idx) => (
              <Card key={idx}>
                <CardContent className="p-6 space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-bold">{feature.title}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Statistics */}
      <section id="stats" className="landing-section landing-stats bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="landing-container">
          <div className="landing-section-header text-center">
            <h2 tabIndex={-1} className="text-3xl lg:text-4xl font-bold mb-4">Platform Statistics</h2>
            <p className="text-lg opacity-90">
              Join thousands of students and companies already using InternMatch AI
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6">
            {[
              { value: "1,248", label: "Active Students" },
              { value: "45", label: "Verified Companies" },
              { value: "3,892", label: "AI Matches" },
              { value: "84%", label: "Avg Match Quality" },
              { value: "500+", label: "Interview Invitations" },
              { value: "92%", label: "Profile Completion" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-4xl font-bold mb-2"><CountUpValue value={stat.value} /></p>
                <p className="text-sm opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="get-started" className="landing-section bg-[var(--bg-secondary)] dark:bg-[var(--bg-secondary)]">
        <div className="landing-container text-center">
          <div className="landing-section-header text-center">
            <h2 tabIndex={-1} className="text-3xl lg:text-4xl font-bold mb-4">Ready to find your best match?</h2>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
              Whether you are a student looking for the right training opportunity or a company searching for high-potential interns, InternMatch AI helps both sides make smarter decisions.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" onClick={() => navigate("/login")}>
              Get Started
            </Button>
          </div>
        </div>
      </section>

      <PublicFooter />

    </div>
  );
}
