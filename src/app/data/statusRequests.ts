import { useState, useEffect } from "react";

export interface StatusRequest {
  id: string;
  studentId: string;
  studentName: string;
  requestType: "Release from Training" | "Correct My Status";
  currentStatus: string;
  requestedStatus: string;
  relatedCompany: string;
  relatedOpportunity: string;
  reason: string;
  explanation: string;
  requestStatus: "Pending Review" | "Approved" | "Rejected";
  submittedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  decisionMessage?: string;
}

// Prototype: module-level store — shared across all components in the same browser session.
type Listener = () => void;
const _listeners = new Set<Listener>();

let _store: StatusRequest[] = [
  {
    id: "req-2026-001",
    studentId: "s1",
    studentName: "Alex Chen",
    requestType: "Correct My Status",
    currentStatus: "Active / Available",
    requestedStatus: "In Training",
    relatedCompany: "—",
    relatedOpportunity: "—",
    reason: "My current status is incorrect.",
    explanation:
      "My dashboard shows Active but I accepted an internship offer from Stellar Cloud two weeks ago. The company should have moved me to In Training but my status was never updated. I tried contacting their HR team but have not received a response.",
    requestStatus: "Rejected",
    submittedAt: "2026-05-01T09:00:00Z",
    reviewedBy: "System Admin",
    reviewedAt: "2026-05-02T14:30:00Z",
    decisionMessage:
      "After reviewing with Stellar Cloud, the offer was cancelled by the company before your training began. Your current Active / Available status is correct. No change has been applied.",
  },
  {
    id: "req-2026-002",
    studentId: "s2",
    studentName: "Elena Rodriguez",
    requestType: "Release from Training",
    currentStatus: "In Training",
    requestedStatus: "Active / Available",
    relatedCompany: "DataPulse",
    relatedOpportunity: "Data Science Intern",
    reason: "Training or internship has ended but my status was not updated.",
    explanation:
      "My training at DataPulse officially ended on May 10th 2026. I completed all required deliverables and received sign-off from my supervisor, Michael Torres. Despite this, my status has not been updated and I am unable to appear in searches or apply to new opportunities. Please release me from In Training so I can continue my job search.",
    requestStatus: "Pending Review",
    submittedAt: "2026-05-14T10:30:00Z",
  },
];

function _notify() {
  _listeners.forEach((fn) => fn());
}

export function getRequests(): StatusRequest[] {
  return [..._store];
}

export function getStudentRequests(studentId: string): StatusRequest[] {
  return _store.filter((r) => r.studentId === studentId);
}

export function addRequest(req: StatusRequest): void {
  _store = [req, ..._store];
  _notify();
}

export function updateRequest(id: string, updates: Partial<StatusRequest>): void {
  _store = _store.map((r) => (r.id === id ? { ...r, ...updates } : r));
  _notify();
}

export function subscribe(fn: Listener): () => void {
  _listeners.add(fn);
  return () => {
    _listeners.delete(fn);
  };
}

export function useStatusRequests(): StatusRequest[] {
  const [requests, setRequests] = useState<StatusRequest[]>(() => getRequests());
  useEffect(() => subscribe(() => setRequests(getRequests())), []);
  return requests;
}

export function useStudentRequests(studentId: string): StatusRequest[] {
  const [requests, setRequests] = useState<StatusRequest[]>(() =>
    getStudentRequests(studentId)
  );
  useEffect(
    () => subscribe(() => setRequests(getStudentRequests(studentId))),
    [studentId]
  );
  return requests;
}
