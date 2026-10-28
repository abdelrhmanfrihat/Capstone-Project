import React from "react";
import { Link, useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { MatchScore } from "../../components/ui/MatchScore";
import { MOCK_STUDENTS, MOCK_OPPORTUNITIES } from "../../data/mockData";
import { TrendingUp, Award, Calendar, AlertCircle, ArrowRight, BrainCircuit, CheckCircle2, Building2 } from "lucide-react";

export function StudentDashboard() {
  const navigate = useNavigate();
  const student = MOCK_STUDENTS[0];
  const topMatch = MOCK_OPPORTUNITIES[0];

  return (
    <div className="space-y-6">
      {/* Welcome & Status Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white border-none shadow-md">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-white">Welcome back, {student.name}!</h2>
              <p className="text-blue-100 max-w-lg">
                Your AI profile is <strong>{student.profileStrength}%</strong> complete. 
                Based on recent industry trends, adding SQL to your profile could unlock 15+ new matching opportunities.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="secondary" className="bg-white dark:bg-white text-blue-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700" onClick={() => navigate("/student/update-profile")}>
                Update Profile
              </Button>
              <Button variant="outline" className="text-gray-900 bg-white hover:bg-gray-50 dark:text-white dark:bg-transparent border-white dark:border-blue-500 dark:hover:bg-blue-900 shadow-sm" onClick={() => navigate("/student/ai-matches")}>
                View Matches
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-[var(--text-muted)] font-medium uppercase tracking-wider">Current Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Workflow</span>
                <Badge variant="blue">{student.status}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Availability</span>
                <Badge variant="success">Available Now</Badge>
              </div>
              <div className="pt-4 border-t border-[var(--border-main)] mt-auto">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--text-muted)]">Active Applications</span>
                  <span className="font-bold">3</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Top AI Matches</h3>
            <Link to="/student/opportunities" className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <Card>
            <CardContent className="p-6 flex flex-col sm:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-lg">{topMatch.title}</h4>
                    <p className="text-[var(--text-muted)]">{topMatch.companyName} • {topMatch.location}</p>
                  </div>
                  <MatchScore score={topMatch.matchScore} />
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                  <div className="flex gap-2 items-start text-sm">
                    <BrainCircuit className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-blue-800 dark:text-blue-300">Why this match?</span>
                      <p className="text-blue-700 dark:text-blue-400 mt-1">{topMatch.matchDetails.explanation}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="success" className="gap-1"><CheckCircle2 className="w-3 h-3"/> React</Badge>
                  <Badge variant="success" className="gap-1"><CheckCircle2 className="w-3 h-3"/> TypeScript</Badge>
                  <Badge variant="danger" className="gap-1"><AlertCircle className="w-3 h-3"/> SQL (Missing)</Badge>
                </div>

                <div className="pt-2">
                  <Button size="sm">Apply Now</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Explore Companies entry point */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="shrink-0 p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[18px] font-semibold text-[var(--text-main)] leading-snug mb-1">
                      Explore Companies
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                      Get to know companies, explore their opportunities, and read public feedback
                      before choosing your next step.
                    </p>
                  </div>
                </div>
                <Link
                  to="/student/companies"
                  className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 min-h-[44px] sm:self-center"
                >
                  Browse Companies
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar widgets */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                Skill Gap Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-[var(--text-muted)]">SQL</span>
                  <span className="text-red-500 font-medium">High Demand</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-1">Missing in 4 of your top matches.</p>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-[var(--text-muted)]">AWS / Cloud</span>
                  <span className="text-amber-700 dark:text-yellow-500 font-medium">Med Demand</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-amber-500 dark:bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-2" size="sm">Explore Learning Paths</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="w-4 h-4 text-blue-600" />
                Upcoming Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex flex-col items-center justify-center border border-blue-100 dark:border-blue-800 shrink-0">
                    <span className="text-xs font-bold text-blue-600">MAY</span>
                    <span className="text-lg font-bold text-blue-700">18</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm">Tech Interview</h5>
                    <p className="text-xs text-[var(--text-muted)]">Stellar Cloud • 10:00 AM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
