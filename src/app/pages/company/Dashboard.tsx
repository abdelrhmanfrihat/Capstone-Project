import React from "react";
import { Link, useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { MatchScore } from "../../components/ui/MatchScore";
import { MOCK_COMPANIES, MOCK_STUDENTS } from "../../data/mockData";
import { Users, Briefcase, Calendar, CheckCircle2, ArrowRight, Activity, Zap } from "lucide-react";

export function CompanyDashboard() {
  const navigate = useNavigate();
  const company = MOCK_COMPANIES[0];
  const topCandidate = MOCK_STUDENTS[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold">{company.name} Dashboard</h1>
            {company.verified && (
              <Badge variant="success" className="gap-1"><CheckCircle2 /> Verified</Badge>
            )}
          </div>
          <p className="text-[var(--text-muted)]">Manage your AI-matched talent pipeline.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Search Candidates</Button>
          <Button onClick={() => navigate("/company/opportunities/create")}>Post Opportunity</Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-[var(--text-muted)]">Active Opportunities</p>
                <h3 className="text-2xl font-bold mt-1">4</h3>
              </div>
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                <Briefcase className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">+1 this week</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-[var(--text-muted)]">Total Applicants</p>
                <h3 className="text-2xl font-bold mt-1">128</h3>
              </div>
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-[var(--text-muted)]">Across all active roles</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-[var(--text-muted)]">Avg Match Quality</p>
                <h3 className="text-2xl font-bold mt-1 text-green-600">84%</h3>
              </div>
              <div className="p-2 bg-green-50 dark:bg-green-900/30 text-green-600 rounded-lg">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-[var(--text-muted)]">Based on AI profiling</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-[var(--text-muted)]">Interviews Scheduled</p>
                <h3 className="text-2xl font-bold mt-1">12</h3>
              </div>
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-blue-600 hover:underline cursor-pointer">
              View Calendar
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Matches */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Top AI-Matched Candidates</h3>
            <Link to="/company/candidates" className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-[var(--border-main)]">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 flex flex-col sm:flex-row items-start gap-4 hover:bg-secondary dark:hover:bg-gray-800/50 transition-colors">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(topCandidate.name)}&background=random`} 
                      alt="Avatar" 
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h4 className="font-semibold">{topCandidate.name}</h4>
                          <p className="text-sm text-[var(--text-muted)]">{topCandidate.university} • {topCandidate.major}</p>
                        </div>
                        <MatchScore score={94 - (i * 3)} />
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {topCandidate.skills.technical.map(s => (
                          <Badge key={s.name} variant="outline" className="text-xs">{s.name}</Badge>
                        ))}
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <Button size="sm">Invite</Button>
                        <Button size="sm" variant="outline">View Profile</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action needed / Insights */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Zap className="w-4 h-4 text-blue-600" />
                Pipeline Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border border-[var(--border-main)] bg-background dark:bg-gray-800/50">
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">Review 5 Candidates</span>
                  <span className="text-xs text-[var(--text-muted)]">Frontend Intern role</span>
                </div>
                <Button size="sm" variant="ghost">Review</Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-[var(--border-main)] bg-background dark:bg-gray-800/50">
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">Provide Feedback</span>
                  <span className="text-xs text-[var(--text-muted)]">For 3 rejected candidates</span>
                </div>
                <Button size="sm" variant="ghost">Review</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
