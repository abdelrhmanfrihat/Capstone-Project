import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { MatchScore } from "../../components/ui/MatchScore";
import { Button } from "../../components/ui/Button";
import { MOCK_OPPORTUNITIES, MOCK_STUDENTS } from "../../data/mockData";
import { Calendar, MessageSquare, AlertCircle, Star, CheckCircle2, X, Clock, MapPin } from "lucide-react";

type AppStatus = "Applied" | "Shortlisted" | "Interview" | "Matched" | "In Training" | "Rejected";

interface Application {
  id: string;
  opportunityId: string;
  status: AppStatus;
  matchScore: number;
  appliedAt: string;
  interviewDate?: string;
  offerDate?: string;
  trainingStartDate?: string;
  nextAction: string;
  history: StatusHistoryItem[];
}

interface StatusHistoryItem {
  date: string;
  action: string;
  actor: string;
  note?: string;
}

const MOCK_APPLICATIONS: Application[] = [
  {
    id: "app1",
    opportunityId: "opp1",
    status: "Applied",
    matchScore: 65,
    appliedAt: "May 12, 2026",
    nextAction: "Waiting for review",
    history: [
      { date: "May 12, 2026, 10:00 AM", action: "Application submitted", actor: "Student" }
    ]
  },
  {
    id: "app2",
    opportunityId: "opp2",
    status: "Shortlisted",
    matchScore: 89,
    appliedAt: "May 10, 2026",
    nextAction: "Waiting for interview invite",
    history: [
      { date: "May 10, 2026, 2:00 PM", action: "Application submitted", actor: "Student" },
      { date: "May 11, 2026, 9:30 AM", action: "Company reviewed profile", actor: "Company" },
      { date: "May 12, 2026, 3:00 PM", action: "Shortlisted", actor: "Company" }
    ]
  },
  {
    id: "app3",
    opportunityId: "opp3",
    status: "Interview",
    matchScore: 94,
    appliedAt: "May 08, 2026",
    interviewDate: "May 18, 10:00 AM",
    nextAction: "Attend interview",
    history: [
      { date: "May 08, 2026, 11:00 AM", action: "Application submitted", actor: "Student" },
      { date: "May 09, 2026, 10:00 AM", action: "Company reviewed profile", actor: "Company" },
      { date: "May 10, 2026, 2:00 PM", action: "Shortlisted", actor: "Company" },
      { date: "May 12, 2026, 4:00 PM", action: "Interview invited", actor: "Company" },
      { date: "May 12, 2026, 5:00 PM", action: "Interview accepted", actor: "Student" },
      { date: "May 13, 2026, 9:00 AM", action: "Interview scheduled", actor: "System" }
    ]
  },
  {
    id: "app4",
    opportunityId: "opp4",
    status: "Interview",
    matchScore: 82,
    appliedAt: "May 06, 2026",
    interviewDate: "May 22, 11:30 AM",
    nextAction: "Attend interview",
    history: [
      { date: "May 06, 2026, 3:00 PM", action: "Application submitted", actor: "Student" },
      { date: "May 07, 2026, 11:00 AM", action: "Company reviewed profile", actor: "Company" },
      { date: "May 08, 2026, 1:00 PM", action: "Shortlisted", actor: "Company" },
      { date: "May 14, 2026, 10:00 AM", action: "Interview invited", actor: "Company" },
      { date: "May 14, 2026, 2:00 PM", action: "Interview accepted", actor: "Student" }
    ]
  },
  {
    id: "app5",
    opportunityId: "opp5",
    status: "Matched",
    matchScore: 86,
    appliedAt: "April 28, 2026",
    offerDate: "May 21, 2026",
    trainingStartDate: "June 01, 2026",
    nextAction: "Training starts June 1",
    history: [
      { date: "April 28, 2026", action: "Application submitted", actor: "Student" },
      { date: "April 29, 2026", action: "Company reviewed profile", actor: "Company" },
      { date: "May 01, 2026", action: "Shortlisted", actor: "Company" },
      { date: "May 05, 2026", action: "Interview scheduled", actor: "Company" },
      { date: "May 08, 2026", action: "Interview completed", actor: "Student" },
      { date: "May 20, 2026", action: "Offer received", actor: "Company" },
      { date: "May 21, 2026", action: "Offer accepted", actor: "Student", note: "Training starts June 1" }
    ]
  }
];

export function StudentApplications() {
  const navigate = useNavigate();
  const student = MOCK_STUDENTS[0];
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [showDetailsDrawer, setShowDetailsDrawer] = useState(false);
  const [showStatusGuide, setShowStatusGuide] = useState(false);

  const studentStatus = student.status; // "Active", "Interview", "Matched", "In Training"
  const isInTraining = studentStatus === "In Training";

  const columns: { id: AppStatus; label: string; emptyMessage: string }[] = [
    { id: "Applied", label: "Applied", emptyMessage: "No active applications." },
    { id: "Shortlisted", label: "Shortlisted", emptyMessage: "No shortlisted opportunities yet." },
    { id: "Interview", label: "Interview", emptyMessage: "No interviews scheduled." },
    { id: "Matched", label: "Matched", emptyMessage: "No accepted offers yet." },
    { id: "In Training", label: "In Training", emptyMessage: "No active training." },
    { id: "Rejected", label: "Rejected / Archived", emptyMessage: "No rejected or archived applications." }
  ];

  const handleViewDetails = (app: Application) => {
    setSelectedApp(app);
    setShowDetailsDrawer(true);
  };

  const interviewCount = MOCK_APPLICATIONS.filter(a => a.status === "Interview").length;
  const activeAppCount = MOCK_APPLICATIONS.filter(a => a.status !== "Rejected" && a.status !== "In Training").length;

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Top Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 shrink-0">
        <Card>
          <CardContent className="p-4">
            <div className="text-[var(--text-muted)] text-xs mb-1 uppercase tracking-wider font-semibold">Current Availability</div>
            <Badge variant={
              studentStatus === "In Training" ? "danger" :
              studentStatus === "Matched" ? "warning" : "success"
            } className="text-sm">
              {studentStatus === "In Training" ? "In Training" :
               studentStatus === "Matched" ? "Matched" : "Available Now"}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-[var(--text-muted)] text-xs mb-1 uppercase tracking-wider font-semibold">Active Applications</div>
            <div className="font-bold text-2xl">{activeAppCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-[var(--text-muted)] text-xs mb-1 uppercase tracking-wider font-semibold">Interviews Scheduled</div>
            <div className="font-bold text-2xl">{interviewCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-[var(--text-muted)] text-xs mb-1 uppercase tracking-wider font-semibold">Current Main Status</div>
            <Badge variant="blue">{studentStatus}</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-[var(--text-muted)] text-xs mb-1 uppercase tracking-wider font-semibold">Next Action</div>
            <div className="text-sm font-medium">
              {interviewCount > 0 ? `Attend ${interviewCount} scheduled interview${interviewCount > 1 ? 's' : ''}` : "Continue browsing opportunities"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compact Controls Row */}
      <div className="flex flex-wrap items-center gap-3 shrink-0">
        <Button size="sm" variant="outline" onClick={() => setShowStatusGuide(true)}>
          Status Guide
        </Button>
        <div className="flex flex-wrap gap-3 ml-auto">
          <select className="px-4 py-2 rounded-lg border border-[var(--border-main)] bg-[var(--bg-main)] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
            <option>Recently Updated</option>
            <option>Highest Match</option>
            <option>Interview Date</option>
            <option>Application Date</option>
          </select>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 flex gap-4 overflow-x-auto pb-4 pr-2">
        {columns.map(col => {
          const columnApps = MOCK_APPLICATIONS.filter(a => a.status === col.id);

          return (
            <div key={col.id} className="w-80 shrink-0 flex flex-col gap-3">
              <div className="flex items-center justify-between font-semibold text-sm text-[var(--text-muted)] px-1">
                <span>{col.label}</span>
                <span className="bg-muted dark:bg-gray-800 px-2 py-0.5 rounded-full text-xs">
                  {columnApps.length}
                </span>
              </div>

              <div className="flex-1 rounded-xl border border-slate-200 bg-slate-100/70 p-2 space-y-3 min-h-[200px] dark:bg-gray-800/20 dark:border-dashed dark:border-[var(--border-main)]">
                {col.id === "Interview" && columnApps.length > 0 && (
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg text-xs text-blue-700 dark:text-blue-300 font-medium mb-2">
                    You can attend multiple interviews before accepting one training opportunity.
                  </div>
                )}

                {columnApps.length > 0 ? (
                  columnApps.map(app => {
                    const opp = MOCK_OPPORTUNITIES.find(o => o.id === app.opportunityId);
                    if (!opp) return null;

                    return (
                      <Card key={app.id} className="bg-white border-slate-200 dark:bg-card dark:border-border shadow-sm cursor-pointer hover:border-blue-300 transition-colors" onClick={() => handleViewDetails(app)}>
                        <CardContent className="p-4 space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="font-semibold text-sm leading-tight flex-1">{opp.title}</div>
                            <MatchScore score={app.matchScore} showLabel={false} />
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                              <span className="font-medium text-[var(--text-main)]">{opp.companyName}</span>
                              <Badge variant="success"><CheckCircle2 /> Verified</Badge>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                              <MapPin className="w-3 h-3" />
                              {opp.workMode}
                            </div>
                          </div>

                          <Badge variant={
                            app.status === "Interview" ? "blue" :
                            app.status === "Matched" ? "warning" :
                            app.status === "In Training" ? "training" :
                            app.status === "Rejected" ? "outline" : "success"
                          } className="text-xs">
                            {app.status}
                          </Badge>

                          {app.interviewDate && (
                            <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-md border border-blue-100 dark:border-blue-800 flex items-center gap-2 text-xs text-blue-700 dark:text-blue-300 font-medium">
                              <Calendar className="w-3.5 h-3.5" />
                              {app.interviewDate}
                            </div>
                          )}

                          {app.status === "Matched" && app.trainingStartDate && (
                            <div className="bg-amber-50 dark:bg-orange-900/30 p-2 rounded-md border border-amber-200 dark:border-orange-800 text-xs text-amber-800 dark:text-orange-300 font-medium">
                              Training starts: {app.trainingStartDate}
                            </div>
                          )}

                          {app.status === "In Training" && (
                            <div className="bg-red-50 dark:bg-red-900/30 p-2 rounded-md border border-red-100 dark:border-red-800 text-xs text-red-700 dark:text-red-300 font-semibold">
                              🔒 Locked while in training
                            </div>
                          )}

                          <div className="text-xs text-[var(--text-muted)] pt-2 border-t border-[var(--border-main)]">
                            <div className="flex justify-between items-center">
                              <span>Applied: {app.appliedAt}</span>
                            </div>
                            <div className="mt-1">Next: {app.nextAction}</div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
                ) : (
                  <div className="flex items-center justify-center h-32 text-center p-4">
                    <p className="text-sm text-[var(--text-muted)]">{col.emptyMessage}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Application Details Drawer */}
      {showDetailsDrawer && selectedApp && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end" onClick={() => setShowDetailsDrawer(false)}>
          <div className="bg-[var(--bg-main)] w-full max-w-2xl h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                <h2 className="text-2xl font-bold">Application Details</h2>
                <button onClick={() => setShowDetailsDrawer(false)} className="p-2 hover:bg-muted dark:hover:bg-gray-800 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {(() => {
                const opp = MOCK_OPPORTUNITIES.find(o => o.id === selectedApp.opportunityId);
                if (!opp) return null;

                return (
                  <>
                    {/* Opportunity Summary */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Opportunity Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-[var(--text-muted)] mb-1">Opportunity</div>
                            <div className="font-semibold">{opp.title}</div>
                          </div>
                          <div>
                            <div className="text-[var(--text-muted)] mb-1">Company</div>
                            <div className="font-semibold">{opp.companyName}</div>
                          </div>
                          <div>
                            <div className="text-[var(--text-muted)] mb-1">Work Mode</div>
                            <div className="font-semibold">{opp.workMode}</div>
                          </div>
                          <div>
                            <div className="text-[var(--text-muted)] mb-1">Type</div>
                            <Badge variant="blue">{opp.type}</Badge>
                          </div>
                          <div>
                            <div className="text-[var(--text-muted)] mb-1">Match Score</div>
                            <MatchScore score={selectedApp.matchScore} showLabel={false} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Current Workflow Status */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Current Workflow Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant={
                            selectedApp.status === "Interview" ? "blue" :
                            selectedApp.status === "Matched" ? "warning" :
                            selectedApp.status === "In Training" ? "training" : "success"
                          }>
                            {selectedApp.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-[var(--text-muted)]">
                          {selectedApp.status === "Applied" && "Your application was submitted. You are still available."}
                          {selectedApp.status === "Shortlisted" && "The company marked you as promising. You are still available."}
                          {selectedApp.status === "Interview" && "An interview is scheduled or in progress. You can have multiple interviews. You are still available and can continue applying to other opportunities."}
                          {selectedApp.status === "Matched" && "You accepted an offer or reached initial agreement. You are still not locked until training officially starts."}
                          {selectedApp.status === "In Training" && "Training officially started. You cannot apply to new opportunities and you will not appear in company searches."}
                          {selectedApp.status === "Rejected" && "The company did not continue with your application."}
                        </p>
                      </CardContent>
                    </Card>

                    {/* Status Timeline */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Status Timeline</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {selectedApp.history.map((item, index) => (
                            <div key={index} className="flex gap-3">
                              <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                                  {index + 1}
                                </div>
                                {index < selectedApp.history.length - 1 && (
                                  <div className="w-0.5 h-full bg-blue-300 dark:bg-blue-700 my-1"></div>
                                )}
                              </div>
                              <div className="flex-1 pb-4">
                                <div className="font-semibold text-sm">{item.action}</div>
                                <div className="text-xs text-[var(--text-muted)]">{item.date}</div>
                                <div className="text-xs text-[var(--text-muted)]">By: {item.actor}</div>
                                {item.note && (
                                  <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">{item.note}</div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Next Action */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Next Action</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm font-medium">{selectedApp.nextAction}</p>
                      </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="space-y-2">
                      <Button className="w-full" onClick={() => navigate(`/student/opportunities`)}>
                        View Opportunity
                      </Button>
                      <Button variant="outline" className="w-full gap-2">
                        <MessageSquare className="w-4 h-4" /> Message Company
                      </Button>
                      {selectedApp.status === "Interview" && (
                        <Button variant="outline" className="w-full">Request Reschedule</Button>
                      )}
                      {selectedApp.status !== "In Training" && selectedApp.status !== "Rejected" && (
                        <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                          Withdraw Application
                        </Button>
                      )}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Status Guide Modal */}
      {showStatusGuide && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-foreground">Status Guide</h3>
                <button onClick={() => setShowStatusGuide(false)} className="p-2 hover:bg-muted dark:hover:bg-gray-800 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {[
                  {
                    status: "Applied",
                    description: "Your application was submitted. You are still available.",
                    badgeClass: "bg-green-100 border-green-300 text-green-800 dark:bg-green-500/10 dark:border-green-500/30 dark:text-green-400"
                  },
                  {
                    status: "Shortlisted",
                    description: "The company marked you as promising. You are still available.",
                    badgeClass: "bg-green-100 border-green-300 text-green-800 dark:bg-green-500/10 dark:border-green-500/30 dark:text-green-400"
                  },
                  {
                    status: "Interview",
                    description: "An interview is scheduled or in progress. You can have multiple interviews.",
                    badgeClass: "bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-500/10 dark:border-blue-500/40 dark:text-blue-400"
                  },
                  {
                    status: "Matched",
                    description: "You accepted an offer or reached initial agreement. You are still not locked until training officially starts.",
                    badgeClass: "bg-amber-100 border-amber-300 text-amber-800 dark:bg-amber-500/10 dark:border-amber-500/30 dark:text-amber-400"
                  },
                  {
                    status: "In Training",
                    description: "Training officially started. You cannot apply to new opportunities and you will not appear in company searches.",
                    badgeClass: "bg-red-100 border-red-300 text-red-800 dark:bg-red-500/10 dark:border-red-500/40 dark:text-red-400"
                  },
                  {
                    status: "Rejected",
                    description: "The company did not continue with your application.",
                    badgeClass: "bg-slate-100 border-slate-300 text-slate-700 dark:bg-transparent dark:border-border dark:text-foreground"
                  },
                  {
                    status: "Released",
                    description: "Admin or company released you from training/hold status.",
                    badgeClass: "bg-slate-100 border-slate-300 text-slate-700 dark:bg-transparent dark:border-border dark:text-foreground"
                  }
                ].map((item) => (
                  <div key={item.status} className="p-4 bg-white border border-slate-200 dark:bg-background/60 dark:border-border rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${item.badgeClass}`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-[var(--text-muted)]">{item.description}</p>
                  </div>
                ))}
              </div>

              <Button className="w-full mt-6" onClick={() => setShowStatusGuide(false)}>
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
