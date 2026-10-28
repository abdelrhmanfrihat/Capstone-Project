import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import {
  Users,
  Building2,
  ShieldAlert,
  Activity,
  AlertOctagon,
  ArrowRight,
  Database,
  X,
  CheckCircle2,
  XCircle,
  Mail,
  AlertCircle
} from "lucide-react";

export function AdminDashboard() {
  const navigate = useNavigate();
  const [showReviewDrawer, setShowReviewDrawer] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showRequestInfoModal, setShowRequestInfoModal] = useState(false);
  const [decision, setDecision] = useState("");
  const [decisionNote, setDecisionNote] = useState("");
  const [notifyByEmail, setNotifyByEmail] = useState(true);
  const [rejectionReason, setRejectionReason] = useState("");
  const [requestMessage, setRequestMessage] = useState("");

  const pendingCompanies = [
    {
      id: 1,
      name: "Quantum Data",
      type: "AI Startup",
      risk: "Low",
      email: "hr@quantumdata.com",
      website: "https://quantumdata.com",
      industry: "AI Startup",
      size: "11-50 employees",
      submitted: "2026-05-18",
      description: "Quantum Data is an AI startup focused on quantum computing applications for enterprise data analysis.",
      contactPerson: "Dr. Sarah Chen",
      location: "Boston, MA, USA"
    },
    {
      id: 2,
      name: "Global Finance Systems",
      type: "Enterprise",
      risk: "Med",
      email: "recruiting@globalfinance.com",
      website: "https://globalfinance.com",
      industry: "Enterprise Finance",
      size: "500+ employees",
      submitted: "2026-05-17",
      description: "Global Finance Systems provides enterprise financial software and consulting services.",
      contactPerson: "Michael Roberts",
      location: "New York, NY, USA"
    }
  ];

  const handleReview = (company: any) => {
    setSelectedCompany(company);
    setShowReviewDrawer(true);
  };

  const handleApprove = () => {
    setShowApproveModal(false);
    setShowReviewDrawer(false);
    // Update company status in real implementation
  };

  const handleReject = () => {
    setShowRejectModal(false);
    setShowReviewDrawer(false);
    // Update company status in real implementation
  };

  const handleRequestInfo = () => {
    setShowRequestInfoModal(false);
    setShowReviewDrawer(false);
    // Update company status in real implementation
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Admin Platform Control</h1>
          <p className="text-[var(--text-muted)]">System overview and critical actions.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success" className="px-3 py-1">System Health: Optimal</Badge>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-[var(--text-muted)]">Active Students</p>
                <h3 className="text-2xl font-bold mt-1">1,248</h3>
              </div>
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                <Users className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-[var(--text-muted)]">Verified Companies</p>
                <h3 className="text-2xl font-bold mt-1">45</h3>
              </div>
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                <Building2 className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-[var(--text-muted)]">Active Matches</p>
                <h3 className="text-2xl font-bold mt-1">3,892</h3>
              </div>
              <div className="p-2 bg-green-50 dark:bg-green-900/30 text-green-600 rounded-lg">
                <Activity className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 dark:border-red-900/50">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-red-600 dark:text-red-400">Action Required</p>
                <h3 className="text-2xl font-bold mt-1 text-red-700 dark:text-red-300">12</h3>
              </div>
              <div className="p-2 bg-red-50 dark:bg-red-900/30 text-red-600 rounded-lg">
                <AlertOctagon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-red-600 dark:text-red-400 mt-2">Disputes & Pending Verifications</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verification Queue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-700 dark:text-yellow-600" />
              Pending Company Verifications
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin/verification")}>
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingCompanies.map((co, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-[var(--border-main)] bg-background dark:bg-gray-800/50">
                  <div>
                    <h4 className="font-semibold text-sm">{co.name}</h4>
                    <p className="text-xs text-[var(--text-muted)]">{co.type}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={co.risk === "Low" ? "success" : "warning"}>{co.risk} Risk</Badge>
                    <Button size="sm" variant="outline" onClick={() => handleReview(co)}>
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Logs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-[var(--text-body)]" />
              Recent System Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[var(--border-main)] before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-4 h-4 rounded-full border border-white bg-blue-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-[var(--bg-card)] p-3 rounded border border-[var(--border-main)] shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">Status Override</span>
                    <time className="text-xs text-[var(--text-muted)]">2m ago</time>
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">Admin 'System Admin' released student 'Elena R.' from In Training status.</p>
                </div>
              </div>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-4 h-4 rounded-full border border-white bg-green-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-[var(--bg-card)] p-3 rounded border border-[var(--border-main)] shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">Company Approved</span>
                    <time className="text-xs text-[var(--text-muted)]">15m ago</time>
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">Company 'DataPulse' verified.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Review Drawer */}
      {showReviewDrawer && selectedCompany && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end" onClick={() => setShowReviewDrawer(false)}>
          <div className="w-full max-w-3xl bg-[var(--bg-card)] h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-[var(--bg-card)] border-b border-[var(--border-main)] p-6 flex justify-between items-start z-10">
              <div>
                <h2 className="text-2xl font-bold">Company Verification Review</h2>
                <p className="text-[var(--text-muted)] text-sm">Review submitted company information and decide whether to approve, reject, or request more information.</p>
              </div>
              <button onClick={() => setShowReviewDrawer(false)} className="p-2 hover:bg-[var(--hover-bg)] rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Company Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Company Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Company Name</span>
                    <span className="font-medium">{selectedCompany.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Verification Status</span>
                    <Badge variant="warning">Pending Review</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Risk Level</span>
                    <Badge variant={selectedCompany.risk === "Low" ? "success" : "warning"}>{selectedCompany.risk} Risk</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Submitted Date</span>
                    <span className="font-medium">{selectedCompany.submitted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Industry</span>
                    <span className="font-medium">{selectedCompany.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Company Size</span>
                    <span className="font-medium">{selectedCompany.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Website</span>
                    <a href={selectedCompany.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{selectedCompany.website}</a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Contact Email</span>
                    <span className="font-medium">{selectedCompany.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Contact Person</span>
                    <span className="font-medium">{selectedCompany.contactPerson}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Location</span>
                    <span className="font-medium">{selectedCompany.location}</span>
                  </div>
                  <div className="pt-3 border-t border-[var(--border-main)]">
                    <p className="text-[var(--text-muted)] text-sm mb-2">Company Description</p>
                    <p className="text-sm">{selectedCompany.description}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Submitted Documents */}
              <Card>
                <CardHeader>
                  <CardTitle>Submitted Documents</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {["Business License", "Tax ID", "Company Profile"].map((doc, idx) => (
                    <div key={idx} className="p-4 border border-[var(--border-main)] rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{doc}</p>
                          <p className="text-xs text-[var(--text-muted)]">{doc.toLowerCase().replace(/ /g, "_")}.pdf</p>
                          <p className="text-xs text-[var(--text-muted)]">Uploaded: {selectedCompany.submitted}</p>
                        </div>
                        <Badge variant="outline">Submitted</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Download</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Verification Checklist */}
              <Card>
                <CardHeader>
                  <CardTitle>Verification Checklist</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    "Official company email verified",
                    "Website is reachable",
                    "Business license reviewed",
                    "Tax ID reviewed",
                    "Company profile reviewed",
                    "Contact person information valid",
                    "Company appears legitimate",
                    "No suspicious activity detected"
                  ].map((item, idx) => (
                    <label key={idx} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">{item}</span>
                    </label>
                  ))}
                </CardContent>
              </Card>

              {/* Risk Assessment */}
              <Card>
                <CardHeader>
                  <CardTitle>Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    {[
                      { label: "Email domain matches company website", status: true },
                      { label: "Documents complete", status: true },
                      { label: "Company information consistent", status: true },
                      { label: "No duplicate company detected", status: true },
                      { label: "No suspicious reports", status: true }
                    ].map((indicator, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-[var(--bg-secondary)] rounded">
                        <span className="text-sm">{indicator.label}</span>
                        {indicator.status ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="pt-3">
                    <label className="text-sm font-medium block mb-2">Risk Notes</label>
                    <textarea
                      placeholder="Add any risk assessment notes..."
                      className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)] min-h-[80px]"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Admin Decision */}
              <Card>
                <CardHeader>
                  <CardTitle>Admin Decision</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium block mb-2">Decision</label>
                    <select
                      value={decision}
                      onChange={(e) => setDecision(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)]"
                    >
                      <option value="">Select decision...</option>
                      <option value="approve">Approve & Verify</option>
                      <option value="reject">Reject</option>
                      <option value="request">Request More Information</option>
                      <option value="suspend">Suspend / Flag for Investigation</option>
                    </select>
                  </div>

                  {decision === "reject" && (
                    <div>
                      <label className="text-sm font-medium block mb-2">Rejection Reason</label>
                      <select
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)] mb-3"
                      >
                        <option value="">Select reason...</option>
                        <option>Invalid documents</option>
                        <option>Suspicious company</option>
                        <option>Incomplete information</option>
                        <option>Website/email mismatch</option>
                        <option>Duplicate account</option>
                        <option>Other</option>
                      </select>
                      <textarea
                        value={decisionNote}
                        onChange={(e) => setDecisionNote(e.target.value)}
                        placeholder="Provide detailed reason for rejection..."
                        className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)] min-h-[80px]"
                      />
                    </div>
                  )}

                  {decision === "request" && (
                    <div>
                      <label className="text-sm font-medium block mb-2">Request Message</label>
                      <textarea
                        value={requestMessage}
                        onChange={(e) => setRequestMessage(e.target.value)}
                        placeholder="Write what information or documents the company needs to provide..."
                        className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)] min-h-[100px]"
                      />
                    </div>
                  )}

                  {decision && (
                    <>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifyByEmail}
                          onChange={(e) => setNotifyByEmail(e.target.checked)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">Notify company by email</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span className="text-sm">Add decision to audit log</span>
                      </label>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button onClick={() => setShowApproveModal(true)} className="bg-green-600 hover:bg-green-700">
                  Approve & Verify
                </Button>
                <Button variant="outline" onClick={() => setShowRequestInfoModal(true)}>
                  Request More Info
                </Button>
                <Button variant="outline" onClick={() => setShowRejectModal(true)} className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20">
                  Reject
                </Button>
                <Button variant="outline" onClick={() => setShowReviewDrawer(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Approve Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setShowApproveModal(false)}>
          <div className="bg-[var(--bg-card)] rounded-lg max-w-md w-full p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold">Approve Company?</h3>
                <p className="text-sm text-[var(--text-muted)] mt-1">This company will become verified and will be allowed to post internship and training opportunities.</p>
              </div>
              <button onClick={() => setShowApproveModal(false)} className="p-1 hover:bg-[var(--hover-bg)] rounded h-fit">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowApproveModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleApprove} className="flex-1 bg-green-600 hover:bg-green-700">
                Approve & Verify
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setShowRejectModal(false)}>
          <div className="bg-[var(--bg-card)] rounded-lg max-w-md w-full p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-red-600">Reject Company?</h3>
                <p className="text-sm text-[var(--text-muted)] mt-1">This company will not be verified and cannot post opportunities.</p>
              </div>
              <button onClick={() => setShowRejectModal(false)} className="p-1 hover:bg-[var(--hover-bg)] rounded h-fit">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowRejectModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleReject} className="flex-1 bg-red-600 hover:bg-red-700">
                Reject Company
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Request Info Modal */}
      {showRequestInfoModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setShowRequestInfoModal(false)}>
          <div className="bg-[var(--bg-card)] rounded-lg max-w-md w-full p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold">Request More Information?</h3>
                <p className="text-sm text-[var(--text-muted)] mt-1">The company will be notified to update missing or unclear verification details.</p>
              </div>
              <button onClick={() => setShowRequestInfoModal(false)} className="p-1 hover:bg-[var(--hover-bg)] rounded h-fit">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowRequestInfoModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleRequestInfo} className="flex-1">
                Send Request
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
