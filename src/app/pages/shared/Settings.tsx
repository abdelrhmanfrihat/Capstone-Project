import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { MOCK_STUDENTS } from "../../data/mockData";
import {
  User, Bell, LogOut, AlertCircle, RefreshCw,
  Clock, CheckCircle2, XCircle, Plus, X, ArrowRight,
} from "lucide-react";
import {
  useStudentRequests, addRequest, type StatusRequest,
} from "../../data/statusRequests";

interface SettingsProps {
  userType: "Student" | "Company" | "Admin";
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

function ReqStatusBadge({ status }: { status: StatusRequest["requestStatus"] }) {
  if (status === "Pending Review")
    return (
      <Badge variant="warning" className="text-xs gap-1 whitespace-nowrap">
        <Clock className="w-3 h-3" /> Pending Review
      </Badge>
    );
  if (status === "Approved")
    return (
      <Badge variant="success" className="text-xs gap-1 whitespace-nowrap">
        <CheckCircle2 className="w-3 h-3" /> Approved
      </Badge>
    );
  return (
    <Badge variant="danger" className="text-xs gap-1 whitespace-nowrap">
      <XCircle className="w-3 h-3" /> Rejected
    </Badge>
  );
}

function getPermittedStatuses(displayStatus: string, requestType: string): string[] {
  if (requestType === "Release from Training") return ["Active / Available"];
  if (displayStatus === "Active / Available") return ["In Training"];
  if (displayStatus === "In Training") return ["Active / Available"];
  if (displayStatus === "Suspended") return ["Active / Available", "In Training"];
  return ["Active / Available"];
}

export function Settings({ userType }: SettingsProps) {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Student-specific
  const student = MOCK_STUDENTS[0];
  const displayStatus =
    student.status === "Active" ? "Active / Available" : student.status;
  const studentRequests = useStudentRequests("s1");
  const hasPending = studentRequests.some((r) => r.requestStatus === "Pending Review");

  const [showRequestModal, setShowRequestModal] = useState(false);
  const [reqType, setReqType] = useState<"Release from Training" | "Correct My Status">(
    "Correct My Status"
  );
  const [reqStatus, setReqStatus] = useState("");
  const [reqReason, setReqReason] = useState("");
  const [reqExplanation, setReqExplanation] = useState("");
  const [reqErrors, setReqErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRequestDetail, setShowRequestDetail] = useState<string | null>(null);

  function openRequestModal() {
    const defaultType: "Release from Training" | "Correct My Status" =
      displayStatus === "In Training" ? "Release from Training" : "Correct My Status";
    const permitted = getPermittedStatuses(displayStatus, defaultType);
    setReqType(defaultType);
    setReqStatus(permitted[0] || "");
    setReqReason("");
    setReqExplanation("");
    setReqErrors({});
    setShowRequestModal(true);
  }

  function closeRequestModal() {
    setShowRequestModal(false);
  }

  function validateRequest(): boolean {
    const errors: Record<string, string> = {};
    if (!reqType) errors.type = "Request type is required.";
    if (!reqStatus) errors.status = "Requested status is required.";
    if (!reqReason) errors.reason = "Please select a reason.";
    if (reqExplanation.trim().length < 20)
      errors.explanation = "Explanation must be at least 20 characters.";
    if (reqExplanation.trim().length > 2000)
      errors.explanation = "Explanation must be 2000 characters or fewer.";
    setReqErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmitRequest() {
    if (!validateRequest()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    const newRequest: StatusRequest = {
      id: `req-${Date.now()}`,
      studentId: "s1",
      studentName: student.name,
      requestType: reqType,
      currentStatus: displayStatus,
      requestedStatus: reqStatus,
      relatedCompany: "—",
      relatedOpportunity: "—",
      reason: reqReason,
      explanation: reqExplanation.trim(),
      requestStatus: "Pending Review",
      submittedAt: new Date().toISOString(),
    };
    addRequest(newRequest);
    setIsSubmitting(false);
    closeRequestModal();
  }

  const handleLogout = () => {
    setShowLogoutModal(false);
    navigate("/");
  };

  const permittedStatuses = getPermittedStatuses(displayStatus, reqType);
  const detailRequest = showRequestDetail
    ? studentRequests.find((r) => r.id === showRequestDetail)
    : null;

  return (
    <div className="mx-auto w-full max-w-none space-y-6 py-6 pb-10 sm:py-8 sm:pb-10">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-[var(--text-muted)]">
          Manage your account preferences and settings.
        </p>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-6 xl:grid-cols-2">
      {/* Account Settings */}
      <Card>
        <CardHeader className="px-5 pt-5 sm:px-6 sm:pt-6">
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-5 pb-5 sm:px-6 sm:pb-6">
          <div className="flex items-center justify-between py-3 border-b border-[var(--border-main)]">
            <div>
              <h4 className="font-semibold mb-1">Email Address</h4>
              <p className="text-sm text-[var(--text-muted)]">
                {userType === "Student" && "alex.c@stanford.edu"}
                {userType === "Company" && "hr@stellarcloud.com"}
                {userType === "Admin" && "admin@internmatch.ai"}
              </p>
            </div>
            <Button size="sm" variant="outline">
              Change
            </Button>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <h4 className="font-semibold mb-1">Password</h4>
              <p className="text-sm text-[var(--text-muted)]">
                Last changed 30 days ago
              </p>
            </div>
            <Button size="sm" variant="outline">
              Update
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader className="px-5 pt-5 sm:px-6 sm:pt-6">
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-5 pb-5 sm:px-6 sm:pb-6">
          <div className="flex items-center justify-between py-3">
            <div>
              <h4 className="font-semibold mb-1">Email Notifications</h4>
              <p className="text-sm text-[var(--text-muted)]">
                Receive important updates via email
              </p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4" />
          </div>
        </CardContent>
      </Card>

      {/* Student Status Change Requests */}
      {userType === "Student" && (
        <Card className="xl:col-span-2">
          <CardHeader className="px-5 pt-5 sm:px-6 sm:pt-6">
            <div className="flex items-start justify-between gap-4">
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-blue-600" />
                Status Change Requests
              </CardTitle>
              {!hasPending && (
                <Button size="sm" onClick={openRequestModal}>
                  <Plus className="w-4 h-4 mr-1.5" />
                  Request Change
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4 px-5 pb-5 sm:px-6 sm:pb-6">
            {/* Current status panel */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-[var(--bg-secondary)]">
              <div>
                <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                  Current Status
                </p>
                <Badge
                  variant={
                    displayStatus === "Active / Available"
                      ? "success"
                      : displayStatus === "In Training"
                      ? "warning"
                      : "default"
                  }
                >
                  {displayStatus}
                </Badge>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                  Student
                </p>
                <p className="text-sm font-medium">{student.name}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                  Related Company
                </p>
                <p className="text-sm text-[var(--text-muted)]">—</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                  Related Opportunity
                </p>
                <p className="text-sm text-[var(--text-muted)]">—</p>
              </div>
            </div>

            {hasPending && (
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50 dark:bg-yellow-900/10 border border-amber-200 dark:border-yellow-800">
                <Clock className="w-4 h-4 text-amber-700 dark:text-yellow-400 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-700 dark:text-yellow-400">
                  You have a status change request awaiting admin review. New requests
                  cannot be submitted while one is pending.
                </p>
              </div>
            )}

            {/* Request history */}
            {studentRequests.length === 0 ? (
              <p className="text-sm text-[var(--text-muted)] italic py-2">
                No status change requests submitted yet.
              </p>
            ) : (
              <div>
                <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                  Request History
                </p>
                <div className="space-y-2">
                  {studentRequests.map((req) => (
                    <div
                      key={req.id}
                      className="flex items-start justify-between gap-3 p-3 border border-[var(--border-main)] rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <p className="text-sm font-medium">{req.requestType}</p>
                          <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
                          <p className="text-sm text-[var(--text-main)]">
                            {req.requestedStatus}
                          </p>
                        </div>
                        <p className="text-xs text-[var(--text-muted)]">
                          From: {req.currentStatus} · Submitted{" "}
                          {formatDate(req.submittedAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <ReqStatusBadge status={req.requestStatus} />
                        <button
                          onClick={() =>
                            setShowRequestDetail(
                              showRequestDetail === req.id ? null : req.id
                            )
                          }
                          className="text-xs text-blue-600 hover:underline whitespace-nowrap"
                        >
                          {showRequestDetail === req.id ? "Hide" : "Details"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!hasPending && studentRequests.length > 0 && (
              <div className="pt-1">
                <Button variant="outline" size="sm" onClick={openRequestModal}>
                  <Plus className="w-4 h-4 mr-1.5" />
                  New Request
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Account Actions */}
      <Card>
        <CardHeader className="px-5 pt-5 sm:px-6 sm:pt-6">
          <CardTitle className="flex items-center gap-2">
            <LogOut className="w-5 h-5 text-[var(--text-muted)]" />
            Account Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5 sm:px-6 sm:pb-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold mb-1">Logout</h4>
              <p className="text-sm text-[var(--text-muted)]">
                Sign out and return to the InternMatch AI landing page.
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20"
              onClick={() => setShowLogoutModal(true)}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 dark:border-red-800">
        <CardHeader className="px-5 pt-5 sm:px-6 sm:pt-6">
          <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5 sm:px-6 sm:pb-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold mb-1">Delete Account</h4>
              <p className="text-sm text-[var(--text-muted)]">
                Permanently delete your account and all data
              </p>
            </div>
            <Button size="sm" variant="outline" className="text-red-600">
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--bg-card)] rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-xl font-bold">Log out?</h2>
            </div>
            <p className="text-[var(--text-muted)] mb-6">
              You will be signed out and returned to the InternMatch AI landing page.
            </p>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowLogoutModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Request Status Change Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--bg-card)] rounded-xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="flex items-start justify-between px-6 py-5 border-b border-[var(--border-main)] shrink-0">
              <div>
                <h2 className="text-lg font-bold">Request Status Change</h2>
                <p className="text-sm text-[var(--text-muted)]">
                  Submit a request for admin review. You will be notified of the
                  decision.
                </p>
              </div>
              <button
                onClick={closeRequestModal}
                className="p-2 hover:bg-[var(--hover-bg)] rounded-lg text-[var(--text-muted)]"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {/* Context */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-[var(--bg-secondary)] rounded-lg">
                <div>
                  <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
                    Student
                  </p>
                  <p className="text-sm font-medium">{student.name}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
                    Current Status
                  </p>
                  <Badge
                    variant={
                      displayStatus === "Active / Available" ? "success" : "warning"
                    }
                    className="text-xs"
                  >
                    {displayStatus}
                  </Badge>
                </div>
              </div>

              {/* Request Type */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Request Type</label>
                <select
                  value={reqType}
                  onChange={(e) => {
                    const t = e.target.value as typeof reqType;
                    setReqType(t);
                    const permitted = getPermittedStatuses(displayStatus, t);
                    setReqStatus(permitted[0] || "");
                    setReqErrors({});
                  }}
                  className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)] text-sm"
                >
                  {displayStatus === "In Training" && (
                    <option value="Release from Training">
                      Release from Training
                    </option>
                  )}
                  <option value="Correct My Status">Correct My Status</option>
                </select>
                {reqErrors.type && (
                  <p className="text-xs text-red-500">{reqErrors.type}</p>
                )}
              </div>

              {/* Requested Status */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Requested Status</label>
                <select
                  value={reqStatus}
                  onChange={(e) => setReqStatus(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)] text-sm"
                >
                  {permittedStatuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {reqErrors.status && (
                  <p className="text-xs text-red-500">{reqErrors.status}</p>
                )}
              </div>

              {/* Reason */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Reason</label>
                <select
                  value={reqReason}
                  onChange={(e) => setReqReason(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)] text-sm"
                >
                  <option value="">Select a reason...</option>
                  <option>My current status is incorrect.</option>
                  <option>A company updated my status without my consent.</option>
                  <option>
                    Training or internship has ended but my status was not updated.
                  </option>
                  <option>Technical error or system issue.</option>
                  <option>Other</option>
                </select>
                {reqErrors.reason && (
                  <p className="text-xs text-red-500">{reqErrors.reason}</p>
                )}
              </div>

              {/* Explanation */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Explanation</label>
                  <span
                    className={`text-xs ${
                      reqExplanation.length > 1900
                        ? "text-amber-700 dark:text-orange-500"
                        : "text-[var(--text-muted)]"
                    }`}
                  >
                    {reqExplanation.length}/2000
                  </span>
                </div>
                <textarea
                  value={reqExplanation}
                  onChange={(e) => setReqExplanation(e.target.value)}
                  placeholder="Provide a detailed explanation (at least 20 characters)..."
                  className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)] text-sm min-h-[100px] resize-y"
                  maxLength={2000}
                />
                {reqErrors.explanation && (
                  <p className="text-xs text-red-500">{reqErrors.explanation}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[var(--border-main)] bg-[var(--bg-secondary)] shrink-0">
              <Button
                variant="outline"
                onClick={closeRequestModal}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmitRequest} disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  "Submit Request"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Request Detail Modal */}
      {detailRequest && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowRequestDetail(null)}
        >
          <div
            className="bg-[var(--bg-card)] rounded-xl max-w-lg w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border-main)]">
              <div>
                <h2 className="text-lg font-bold">Request Details</h2>
                <p className="text-xs text-[var(--text-muted)]">
                  Submitted {formatDate(detailRequest.submittedAt)}
                </p>
              </div>
              <button
                onClick={() => setShowRequestDetail(null)}
                className="p-2 hover:bg-[var(--hover-bg)] rounded-lg text-[var(--text-muted)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
                    Request Type
                  </p>
                  <p className="text-sm">{detailRequest.requestType}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
                    Status
                  </p>
                  <ReqStatusBadge status={detailRequest.requestStatus} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
                    From
                  </p>
                  <p className="text-sm">{detailRequest.currentStatus}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
                    Requested
                  </p>
                  <p className="text-sm">{detailRequest.requestedStatus}</p>
                </div>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
                  Reason
                </p>
                <p className="text-sm">{detailRequest.reason}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
                  Explanation
                </p>
                <p className="text-sm leading-relaxed">{detailRequest.explanation}</p>
              </div>
              {detailRequest.decisionMessage && (
                <div
                  className={`p-3 rounded-lg ${
                    detailRequest.requestStatus === "Rejected"
                      ? "bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800"
                      : "bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800"
                  }`}
                >
                  <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
                    Admin Decision
                  </p>
                  <p className="text-sm">{detailRequest.decisionMessage}</p>
                  {detailRequest.reviewedBy && (
                    <p className="text-xs text-[var(--text-muted)] mt-2">
                      Reviewed by {detailRequest.reviewedBy}
                      {detailRequest.reviewedAt
                        ? ` on ${formatDate(detailRequest.reviewedAt)}`
                        : ""}
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="flex justify-end px-6 py-4 border-t border-[var(--border-main)]">
              <Button variant="outline" onClick={() => setShowRequestDetail(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
