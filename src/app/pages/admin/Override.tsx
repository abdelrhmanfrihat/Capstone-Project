import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { MOCK_STUDENTS } from "../../data/mockData";
import {
  Search, AlertTriangle, ShieldAlert, CheckCircle2, X, Check, User,
  Clock, XCircle, ClipboardList, ArrowRight,
} from "lucide-react";
import {
  useStatusRequests, updateRequest, type StatusRequest,
} from "../../data/statusRequests";

type StudentStatus = "Active / Available" | "In Training" | "Suspended" | "Rejected";
type RequestsFilter = "Pending Review" | "Approved" | "Rejected" | "All";

interface StatusEvent {
  status: string;
  date: string;
  changedBy: string;
  reason?: string;
  previousStatus?: string;
  action?: string;
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

export function AdminStatusOverride() {
  const [search, setSearch] = useState("");
  const student = MOCK_STUDENTS.find((s) => s.status === "In Training");

  const [currentStatus, setCurrentStatus] = useState<StudentStatus>("In Training");
  const [newStatus, setNewStatus] = useState<StudentStatus>("Active / Available");
  const [reason, setReason] = useState("");
  const [notifyStudent, setNotifyStudent] = useState(true);
  const [notifyCompany, setNotifyCompany] = useState(true);
  const [confirmChecked, setConfirmChecked] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const [statusHistory, setStatusHistory] = useState<StatusEvent[]>([
    {
      status: "In Training",
      date: "May 15, 2026",
      changedBy: "DataPulse",
      reason: "Confirmed by company DataPulse.",
    },
    {
      status: "Matched",
      date: "May 12, 2026",
      changedBy: "DataPulse",
      reason: "Moved to matched by DataPulse.",
    },
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Student Status Requests
  const allRequests = useStatusRequests();
  const [requestsFilter, setRequestsFilter] = useState<RequestsFilter>("Pending Review");
  const filteredRequests =
    requestsFilter === "All"
      ? allRequests
      : allRequests.filter((r) => r.requestStatus === requestsFilter);
  const pendingCount = allRequests.filter((r) => r.requestStatus === "Pending Review").length;
  const approvedCount = allRequests.filter((r) => r.requestStatus === "Approved").length;
  const rejectedCount = allRequests.filter((r) => r.requestStatus === "Rejected").length;

  // Review modal
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRequestId, setReviewRequestId] = useState<string | null>(null);
  const [reviewDecision, setReviewDecision] = useState("");
  const [reviewDecisionError, setReviewDecisionError] = useState("");
  const [showApproveConfirmStep, setShowApproveConfirmStep] = useState(false);
  const [reviewProcessing, setReviewProcessing] = useState(false);
  const [reviewDone, setReviewDone] = useState(false);

  const reviewRequest = reviewRequestId
    ? allRequests.find((r) => r.id === reviewRequestId)
    : null;

  function openReviewModal(id: string) {
    setReviewRequestId(id);
    setReviewDecision("");
    setReviewDecisionError("");
    setShowApproveConfirmStep(false);
    setReviewProcessing(false);
    setReviewDone(false);
    setShowReviewModal(true);
  }

  function closeReviewModal() {
    setShowReviewModal(false);
    setReviewRequestId(null);
    setReviewDecision("");
    setReviewDecisionError("");
    setShowApproveConfirmStep(false);
    setReviewProcessing(false);
    setReviewDone(false);
  }

  function handleRejectRequest() {
    if (!reviewDecision.trim()) {
      setReviewDecisionError("Please enter a decision message to explain the rejection.");
      return;
    }
    updateRequest(reviewRequestId!, {
      requestStatus: "Rejected",
      reviewedBy: "System Admin",
      reviewedAt: new Date().toISOString(),
      decisionMessage: reviewDecision,
    });
    closeReviewModal();
  }

  function handleApproveRequest() {
    setShowApproveConfirmStep(false);
    setReviewProcessing(true);
    setTimeout(() => {
      updateRequest(reviewRequestId!, {
        requestStatus: "Approved",
        reviewedBy: "System Admin",
        reviewedAt: new Date().toISOString(),
        decisionMessage: reviewDecision,
      });
      setReviewProcessing(false);
      setReviewDone(true);
    }, 1500);
  }

  // Override form
  const loadingSteps = [
    "Validating admin permission",
    "Releasing student from In Training",
    "Updating availability",
    "Restoring search visibility",
    "Updating workflow history",
    "Sending notifications",
    "Writing audit log",
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!reason.trim()) newErrors.reason = "Reason for override is required.";
    if (reason.trim().length < 10)
      newErrors.reason = "Reason must be at least 10 characters.";
    if (newStatus === currentStatus)
      newErrors.status = "New status must be different from current status.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmOverride = () => {
    if (!validateForm()) return;
    setShowConfirmModal(true);
  };

  const handleProceedWithOverride = () => {
    if (!confirmChecked) return;
    setShowConfirmModal(false);
    setShowLoadingModal(true);
    setCurrentStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCurrentStep(step);
      if (step >= loadingSteps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setShowLoadingModal(false);
          completeOverride();
        }, 500);
      }
    }, 600);
  };

  const completeOverride = () => {
    setCurrentStatus(newStatus);
    const newEvent: StatusEvent = {
      status: newStatus,
      date: "May 17, 2026",
      changedBy: "System Admin",
      reason: reason,
      previousStatus: currentStatus,
      action: "Release & Override Status",
    };
    setStatusHistory([newEvent, ...statusHistory]);
    setReason("");
    setConfirmChecked(false);
    setShowSuccessModal(true);
  };

  const getStatusEffect = () => {
    if (newStatus === "Active / Available") {
      return [
        "Student will be released from In Training.",
        "Student will become visible in company search again.",
        "Student will be able to apply to new opportunities.",
        "Current training lock will be removed.",
      ];
    } else if (newStatus === "Suspended") {
      return [
        "Student account will be suspended.",
        "Student will not appear in searches.",
        "Student will not be able to apply to opportunities.",
        "All pending applications will be paused.",
      ];
    } else {
      return ["Student status will be updated."];
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Status Override & Release</h1>
        <p className="text-[var(--text-muted)]">
          Force status changes or release students from In Training lock.
        </p>
      </div>

      {/* Student Status Requests */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-blue-600" />
              Student Status Requests
            </CardTitle>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="warning" className="gap-1">
                <Clock className="w-3 h-3" />
                {pendingCount} Pending
              </Badge>
              <Badge variant="success" className="gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {approvedCount} Approved
              </Badge>
              <Badge variant="danger" className="gap-1">
                <XCircle className="w-3 h-3" />
                {rejectedCount} Rejected
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filter tabs */}
          <div className="flex gap-1 p-1 bg-[var(--bg-secondary)] rounded-lg mb-4 w-fit">
            {(["Pending Review", "Approved", "Rejected", "All"] as RequestsFilter[]).map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setRequestsFilter(tab)}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    requestsFilter === tab
                      ? "bg-[var(--bg-card)] shadow text-[var(--text-main)] font-medium"
                      : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>

          {filteredRequests.length === 0 ? (
            <p className="text-sm text-[var(--text-muted)] italic text-center py-6">
              No requests found.
            </p>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block rounded-lg border border-[var(--border-main)] overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-[var(--bg-secondary)]">
                    <tr>
                      {["Student", "Type", "Status Change", "Company", "Submitted", "Status", ""].map(
                        (h) => (
                          <th
                            key={h}
                            className="text-left px-4 py-3 font-semibold text-[var(--text-muted)] text-xs uppercase tracking-wider last:text-right"
                          >
                            {h}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-main)]">
                    {filteredRequests.map((req) => (
                      <tr
                        key={req.id}
                        className="hover:bg-[var(--bg-secondary)] transition-colors"
                      >
                        <td className="px-4 py-3 font-medium">{req.studentName}</td>
                        <td className="px-4 py-3 text-[var(--text-muted)] text-xs">
                          {req.requestType}
                        </td>
                        <td className="px-4 py-3">
                          <span className="flex items-center gap-1.5 text-xs">
                            <span className="text-[var(--text-muted)]">
                              {req.currentStatus}
                            </span>
                            <ArrowRight className="w-3 h-3 shrink-0 text-[var(--text-muted)]" />
                            <span className="font-medium">{req.requestedStatus}</span>
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[var(--text-muted)] text-xs">
                          {req.relatedCompany}
                        </td>
                        <td className="px-4 py-3 text-[var(--text-muted)] text-xs whitespace-nowrap">
                          {formatDate(req.submittedAt)}
                        </td>
                        <td className="px-4 py-3">
                          <ReqStatusBadge status={req.requestStatus} />
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openReviewModal(req.id)}
                          >
                            Review
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden space-y-3">
                {filteredRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-4 border border-[var(--border-main)] rounded-lg space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{req.studentName}</p>
                      <ReqStatusBadge status={req.requestStatus} />
                    </div>
                    <p className="text-xs text-[var(--text-muted)]">{req.requestType}</p>
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="text-[var(--text-muted)]">{req.currentStatus}</span>
                      <ArrowRight className="w-3 h-3 text-[var(--text-muted)]" />
                      <span className="font-medium">{req.requestedStatus}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                      <span>{req.relatedCompany}</span>
                      <span>{formatDate(req.submittedAt)}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      onClick={() => openReviewModal(req.id)}
                    >
                      Review Request
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search student by name, email, or ID..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--border-main)] bg-[var(--bg-main)] focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {student && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="border-b border-[var(--border-main)] pb-4 mb-4">
              <CardTitle>Current Status Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Student</span>
                <span className="font-bold">{student.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Current Status</span>
                <Badge
                  variant={
                    currentStatus === "In Training"
                      ? "warning"
                      : currentStatus === "Active / Available"
                      ? "success"
                      : "default"
                  }
                  className={`gap-1 ${
                    currentStatus === "In Training" ? "bg-amber-50 border-amber-200 text-amber-800 dark:bg-yellow-100 dark:text-yellow-800" : ""
                  }`}
                >
                  {currentStatus === "In Training" && (
                    <ShieldAlert className="w-3.5 h-3.5" />
                  )}
                  {currentStatus === "Active / Available" && (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  )}
                  {currentStatus}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Related Company</span>
                <span>DataPulse</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Related Opportunity</span>
                <span>Data Science Intern</span>
              </div>
              <div className="pt-4 border-t border-[var(--border-main)]">
                {currentStatus === "In Training" ? (
                  <p className="text-sm text-amber-700 dark:text-yellow-400 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    This student is currently locked to "In Training". They cannot appear
                    in searches or apply to new opportunities.
                  </p>
                ) : (
                  <p className="text-sm text-green-600 dark:text-green-400 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    This student is now available and can apply to opportunities.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 dark:border-red-900/50">
            <CardHeader className="border-b border-[var(--border-main)] pb-4 mb-4">
              <CardTitle className="text-red-700 dark:text-red-400 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5" /> Execute Override
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">New Status</label>
                <select
                  className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)]"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as StudentStatus)}
                >
                  <option>Active / Available</option>
                  <option>Suspended</option>
                  <option>Rejected</option>
                </select>
                {errors.status && (
                  <p className="text-sm text-red-500">{errors.status}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Reason for Override (Required)
                </label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)] min-h-[80px]"
                  placeholder="e.g. Training ended early, company dispute, etc."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
                {errors.reason && (
                  <p className="text-sm text-red-500">{errors.reason}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="rounded"
                    checked={notifyStudent}
                    onChange={(e) => setNotifyStudent(e.target.checked)}
                  />
                  Notify student via email
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="rounded"
                    checked={notifyCompany}
                    onChange={(e) => setNotifyCompany(e.target.checked)}
                  />
                  Notify company via email
                </label>
              </div>
            </CardContent>
            <CardFooter className="bg-red-50 dark:bg-red-900/10 border-t border-red-100 dark:border-red-900/30 p-4">
              <Button
                variant="danger"
                className="w-full"
                onClick={handleConfirmOverride}
              >
                Confirm Release & Override Status
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* History timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Status History Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[var(--border-main)] before:to-transparent">
            {statusHistory.map((event, idx) => (
              <div
                key={idx}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-[var(--bg-main)] ${
                    event.status === "In Training"
                      ? "bg-amber-500 dark:bg-yellow-500"
                      : event.status === "Active / Available"
                      ? "bg-green-500"
                      : event.status === "Matched"
                      ? "bg-blue-500"
                      : "bg-gray-500"
                  } text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2`}
                >
                  {event.status === "In Training" ? (
                    <ShieldAlert className="w-5 h-5" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5" />
                  )}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[var(--bg-card)] p-4 rounded border border-[var(--border-main)] shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">Status: {event.status}</span>
                    <time className="text-xs text-[var(--text-muted)]">{event.date}</time>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] mb-1">{event.reason}</p>
                  {event.action && (
                    <div className="text-xs text-[var(--text-muted)] mt-2 pt-2 border-t border-[var(--border-main)]">
                      <p>
                        <span className="font-medium">Changed by:</span> {event.changedBy}
                      </p>
                      <p>
                        <span className="font-medium">Previous status:</span>{" "}
                        {event.previousStatus}
                      </p>
                      <p>
                        <span className="font-medium">Action:</span> {event.action}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Review Request Modal */}
      {showReviewModal && reviewRequest && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => {
            if (!reviewProcessing) closeReviewModal();
          }}
        >
          <div
            className="bg-[var(--bg-card)] rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-6 py-5 border-b border-[var(--border-main)] shrink-0">
              <div>
                <h2 className="text-lg font-bold">Review Status Change Request</h2>
                <p className="text-sm text-[var(--text-muted)]">
                  {reviewRequest.studentName} · Submitted{" "}
                  {formatDate(reviewRequest.submittedAt)}
                </p>
              </div>
              {!reviewProcessing && (
                <button
                  onClick={closeReviewModal}
                  className="p-2 hover:bg-[var(--hover-bg)] rounded-lg text-[var(--text-muted)]"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {reviewDone ? (
              /* Success view */
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Request Approved</h3>
                  <p className="text-[var(--text-muted)]">
                    {reviewRequest.studentName}'s status change request has been approved
                    and applied. The student will be notified.
                  </p>
                </div>
                <Button onClick={closeReviewModal} className="mt-2">
                  Done
                </Button>
              </div>
            ) : reviewProcessing ? (
              /* Processing view */
              <div className="flex-1 flex flex-col items-center justify-center p-8 gap-4">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-[var(--text-muted)]">Applying status change...</p>
              </div>
            ) : (
              <>
                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                  {/* Request details */}
                  <div className="p-4 bg-[var(--bg-secondary)] rounded-lg grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
                        Student
                      </p>
                      <p className="font-medium">{reviewRequest.studentName}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
                        Request Type
                      </p>
                      <p>{reviewRequest.requestType}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
                        Status Change
                      </p>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[var(--text-muted)]">
                          {reviewRequest.currentStatus}
                        </span>
                        <ArrowRight className="w-3 h-3 text-[var(--text-muted)] shrink-0" />
                        <span className="font-medium">{reviewRequest.requestedStatus}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
                        Request Status
                      </p>
                      <ReqStatusBadge status={reviewRequest.requestStatus} />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
                        Company
                      </p>
                      <p>{reviewRequest.relatedCompany}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
                        Opportunity
                      </p>
                      <p>{reviewRequest.relatedOpportunity}</p>
                    </div>
                  </div>

                  <div className="h-px bg-[var(--border-main)]" />

                  <div>
                    <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
                      Reason
                    </p>
                    <p className="text-sm">{reviewRequest.reason}</p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
                      Student Explanation
                    </p>
                    <div className="p-3 bg-[var(--bg-secondary)] rounded-lg text-sm leading-relaxed">
                      {reviewRequest.explanation}
                    </div>
                  </div>

                  <div className="h-px bg-[var(--border-main)]" />

                  {/* Decision message */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">
                        Decision Message{" "}
                        {reviewRequest.requestStatus === "Pending Review" && (
                          <span className="text-red-500">*</span>
                        )}
                      </label>
                      {reviewRequest.requestStatus !== "Pending Review" && (
                        <Badge variant="outline" className="text-xs">
                          Already reviewed
                        </Badge>
                      )}
                    </div>
                    {reviewRequest.requestStatus === "Pending Review" ? (
                      <>
                        <textarea
                          value={reviewDecision}
                          onChange={(e) => {
                            setReviewDecision(e.target.value);
                            setReviewDecisionError("");
                          }}
                          placeholder="Enter a message explaining your decision to the student..."
                          className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)] text-sm min-h-[80px]"
                        />
                        {reviewDecisionError && (
                          <p className="text-xs text-red-500">{reviewDecisionError}</p>
                        )}
                      </>
                    ) : (
                      <div
                        className={`p-3 rounded-lg text-sm ${
                          reviewRequest.requestStatus === "Rejected"
                            ? "bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800"
                            : "bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800"
                        }`}
                      >
                        {reviewRequest.decisionMessage || (
                          <span className="italic text-[var(--text-muted)]">
                            No message provided.
                          </span>
                        )}
                        {reviewRequest.reviewedBy && (
                          <p className="text-xs text-[var(--text-muted)] mt-2">
                            Reviewed by {reviewRequest.reviewedBy}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Approve confirmation step */}
                  {showApproveConfirmStep && (
                    <div className="p-4 bg-amber-50 dark:bg-yellow-900/10 border border-amber-200 dark:border-yellow-700 rounded-lg space-y-3">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-700 dark:text-yellow-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-amber-800 dark:text-yellow-400">
                            Confirm Approval
                          </p>
                          <p className="text-sm text-amber-700 dark:text-yellow-500 mt-0.5">
                            Approving will change{" "}
                            <strong>{reviewRequest.studentName}</strong>'s status from{" "}
                            <strong>{reviewRequest.currentStatus}</strong> to{" "}
                            <strong>{reviewRequest.requestedStatus}</strong>. This will be
                            recorded in audit logs.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setShowApproveConfirmStep(false)}
                        >
                          Go Back
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={handleApproveRequest}
                        >
                          Confirm Approval
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--border-main)] bg-[var(--bg-secondary)] shrink-0">
                  <Button variant="outline" onClick={closeReviewModal}>
                    Cancel
                  </Button>
                  {reviewRequest.requestStatus === "Pending Review" &&
                    !showApproveConfirmStep && (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20"
                          onClick={handleRejectRequest}
                        >
                          Reject Request
                        </Button>
                        <Button
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => {
                            if (!reviewDecision.trim()) {
                              setReviewDecisionError(
                                "Please enter a decision message before approving."
                              );
                              return;
                            }
                            setShowApproveConfirmStep(true);
                          }}
                        >
                          Approve & Apply Change
                        </Button>
                      </div>
                    )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--bg-card)] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[var(--border-main)]">
              <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
                Confirm Status Override?
              </h2>
            </div>

            <div className="p-6 space-y-6">
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-600 dark:text-red-400">
                  You are about to override this student's workflow status. This action
                  may change whether the student can apply to opportunities or appear in
                  company searches.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-[var(--bg-secondary)] rounded-lg">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-[var(--text-muted)] font-medium mb-1">
                      Student
                    </p>
                    <p className="font-bold">{student?.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)] font-medium mb-1">
                      Related Company
                    </p>
                    <p>DataPulse</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)] font-medium mb-1">
                      Related Opportunity
                    </p>
                    <p>Data Science Intern</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-[var(--text-muted)] font-medium mb-1">
                      Current Status
                    </p>
                    <Badge
                      variant="warning"
                      className="bg-amber-50 border-amber-200 text-amber-800"
                    >
                      {currentStatus}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)] font-medium mb-1">
                      New Status
                    </p>
                    <Badge variant="success">{newStatus}</Badge>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Effect:</p>
                <ul className="space-y-1">
                  {getStatusEffect().map((effect, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-[var(--text-muted)] flex items-start gap-2"
                    >
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{effect}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-[var(--bg-secondary)] rounded-lg">
                <p className="text-xs text-[var(--text-muted)] font-medium mb-1">
                  Reason:
                </p>
                <p className="text-sm">{reason}</p>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-[var(--text-muted)] font-medium">
                  Notification options:
                </p>
                <div className="flex gap-4">
                  {notifyStudent && (
                    <Badge variant="outline" className="text-xs">
                      Notify student via email
                    </Badge>
                  )}
                  {notifyCompany && (
                    <Badge variant="outline" className="text-xs">
                      Notify company via email
                    </Badge>
                  )}
                </div>
              </div>

              <label className="flex items-start gap-2 p-3 border border-[var(--border-main)] rounded-lg cursor-pointer hover:bg-[var(--bg-secondary)]">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={confirmChecked}
                  onChange={(e) => setConfirmChecked(e.target.checked)}
                />
                <span className="text-sm">
                  I understand this action will override the student's current workflow
                  status and will be recorded in audit logs.
                </span>
              </label>
            </div>

            <div className="p-6 border-t border-[var(--border-main)] flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setShowConfirmModal(false);
                  setConfirmChecked(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleProceedWithOverride}
                disabled={!confirmChecked}
              >
                Confirm Override
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Modal */}
      {showLoadingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--bg-card)] rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-6 text-center">
              Updating Student Status
            </h2>
            <div className="space-y-3">
              {loadingSteps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  {idx < currentStep ? (
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  ) : idx === currentStep ? (
                    <div className="w-6 h-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin shrink-0" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-[var(--border-main)] shrink-0" />
                  )}
                  <span
                    className={`text-sm ${
                      idx <= currentStep ? "text-white" : "text-[var(--text-muted)]"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--bg-card)] rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-6 h-6 text-green-500" />
              </div>
              <h2 className="text-xl font-bold">Status Override Completed</h2>
            </div>
            <p className="text-[var(--text-muted)] mb-6">
              {student?.name} has been released from In Training and is now {newStatus}.
            </p>

            <div className="space-y-2 p-4 bg-[var(--bg-secondary)] rounded-lg mb-6">
              <p className="text-sm font-medium mb-2">Updated effects:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[var(--text-muted)]">Availability:</span>
                  <p className="font-medium text-green-600">Available Now</p>
                </div>
                <div>
                  <span className="text-[var(--text-muted)]">Search visibility:</span>
                  <p className="font-medium text-green-600">Restored</p>
                </div>
                <div>
                  <span className="text-[var(--text-muted)]">Applications:</span>
                  <p className="font-medium text-green-600">Enabled</p>
                </div>
                <div>
                  <span className="text-[var(--text-muted)]">Audit log:</span>
                  <p className="font-medium text-blue-600">Recorded</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowSuccessModal(false)}>
                View Student Profile
              </Button>
              <Button variant="outline" onClick={() => setShowSuccessModal(false)}>
                View Audit Log
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setShowSuccessModal(false)}
              >
                Back to Status Override
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
