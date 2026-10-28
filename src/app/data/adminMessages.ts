import { useState, useEffect } from "react";

// Admin-to-user in-app messages.
// Keyed by recipientUserId so switching demo accounts shows only that account's messages.
// Module-level store — shared across all components in the same browser session.

export interface AdminMessage {
  id: string;
  recipientUserId: string;
  senderAdminId: string;
  senderLabel: string;
  subject: string;
  body: string;
  createdAt: string;
  readAt?: string;
}

type Listener = () => void;
const _listeners = new Set<Listener>();
let _store: AdminMessage[] = [];

function _notify(): void {
  _listeners.forEach((fn) => fn());
}

export function getMessagesForUser(userId: string): AdminMessage[] {
  return _store.filter((m) => m.recipientUserId === userId);
}

export function addAdminMessage(
  msg: Omit<AdminMessage, "id" | "createdAt">
): AdminMessage {
  const record: AdminMessage = {
    ...msg,
    id: `adm-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
  };
  _store = [record, ..._store];
  _notify();
  return record;
}

export function markAdminMessageRead(id: string): void {
  const msg = _store.find((m) => m.id === id);
  if (!msg || msg.readAt) return;
  _store = _store.map((m) =>
    m.id === id ? { ...m, readAt: new Date().toISOString() } : m
  );
  _notify();
}

export function subscribe(fn: Listener): () => void {
  _listeners.add(fn);
  return () => {
    _listeners.delete(fn);
  };
}

export function useAdminMessages(userId: string): AdminMessage[] {
  const [msgs, setMsgs] = useState<AdminMessage[]>(() =>
    getMessagesForUser(userId)
  );
  useEffect(
    () => subscribe(() => setMsgs(getMessagesForUser(userId))),
    [userId]
  );
  return msgs;
}
