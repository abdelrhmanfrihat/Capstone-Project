import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import {
  Bell, Shield, X, ArrowLeft, Settings,
} from "lucide-react";
import {
  useAdminMessages,
  markAdminMessageRead,
  type AdminMessage,
} from "../../data/adminMessages";
import {
  getStaticNotifications,
  useStaticReadState,
  markStaticNotifRead,
  formatRelativeTime,
  formatTimestamp,
} from "../../data/notificationData";

// ── Demo user ID mapping ─────────────────────────────────────────────────────

const DEMO_USER_IDS: Record<"Student" | "Company" | "Admin", string> = {
  Student: "user-1",
  Company: "user-3",
  Admin:   "user-5",
};

// ── Same-portal prefix validation for back navigation ─────────────────────────

const PORTAL_PREFIXES: Record<"Student" | "Company" | "Admin", string> = {
  Student: "/student/",
  Company: "/company/",
  Admin:   "/admin/",
};

const PORTAL_DASHBOARDS: Record<"Student" | "Company" | "Admin", string> = {
  Student: "/student/dashboard",
  Company: "/company/dashboard",
  Admin:   "/admin/dashboard",
};

function getValidFrom(from: unknown, userType: "Student" | "Company" | "Admin"): string | null {
  if (typeof from !== "string") return null;
  if (from.startsWith(PORTAL_PREFIXES[userType])) return from;
  return null;
}

// ── Props ─────────────────────────────────────────────────────────────────────

interface NotificationsProps {
  userType: "Student" | "Company" | "Admin";
  userId?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function Notifications({ userType, userId }: NotificationsProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"all" | "settings">("all");

  // Shared read state — synced with popover
  const staticNotifs = getStaticNotifications(userType);
  const staticReadIds = useStaticReadState(userType);

  // Admin messages — shared store
  const effectiveUserId = userId ?? DEMO_USER_IDS[userType];
  const adminMessages = useAdminMessages(effectiveUserId);

  // Detail modal for admin messages
  const [selectedAdminMsg, setSelectedAdminMsg] = useState<AdminMessage | null>(null);

  const openAdminMsg = (msg: AdminMessage) => {
    setSelectedAdminMsg(msg);
    markAdminMessageRead(msg.id);
  };

  const closeAdminMsg = () => setSelectedAdminMsg(null);

  // Static notification click — mark read
  const handleStaticClick = (id: number) => {
    markStaticNotifRead(userType, id);
  };

  const unreadStaticCount = staticNotifs.filter((n) => !staticReadIds.has(n.id)).length;
  const unreadAdminCount = adminMessages.filter((m) => !m.readAt).length;
  const unreadCount = unreadStaticCount + unreadAdminCount;

  // Back navigation
  const fromPath = getValidFrom((location.state as Record<string, unknown>)?.from, userType);
  const fallbackDashboard = PORTAL_DASHBOARDS[userType];

  const handleBack = () => {
    navigate(fromPath ?? fallbackDashboard);
  };

  return (
    <div className="space-y-6">
      {/* ── Back navigation ── */}
      {fromPath && (
        <div>
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline focus:outline-none focus-visible:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      )}

      {/* ── Page heading ── */}
      <div>
        <h1 className="text-2xl font-bold">Notifications & Settings</h1>
        <p className="text-[var(--text-muted)] mt-0.5">
          {unreadCount > 0
            ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
            : "You're all caught up!"}
        </p>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1 border-b border-[var(--border-main)]">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={
            "px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors " +
            (activeTab === "all"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]")
          }
        >
          All Notifications
          {unreadCount > 0 && (
            <span className="ml-1.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full border border-blue-500/40 bg-blue-500/10 text-xs font-medium text-blue-400">
              {unreadCount}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("settings")}
          className={
            "flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors " +
            (activeTab === "settings"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]")
          }
        >
          <Settings className="w-3.5 h-3.5" />
          Notification Settings
        </button>
      </div>

      {/* ── All Notifications tab ── */}
      {activeTab === "all" && (
        <div className="space-y-2">
          {/* Admin messages first (newest first) */}
          {[...adminMessages]
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((msg) => {
              const isUnread = !msg.readAt;
              return (
                <button
                  key={msg.id}
                  onClick={() => openAdminMsg(msg)}
                  className="w-full text-left"
                >
                  <Card
                    className={
                      isUnread
                        ? "border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/10"
                        : "border-[var(--border-main)]"
                    }
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-amber-100 dark:bg-amber-900/40 rounded-lg shrink-0">
                          <Shield className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h4 className={isUnread ? "font-semibold" : "font-medium"}>
                              {msg.subject}
                            </h4>
                            <Badge variant="warning">
                              Important
                            </Badge>
                          </div>
                          <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-1">
                            Platform Administration
                          </p>
                          <p className="text-sm text-[var(--text-muted)] mb-2 line-clamp-2">
                            {msg.body}
                          </p>
                          <span className="text-xs text-[var(--text-muted)]">
                            {formatRelativeTime(msg.createdAt)}
                          </span>
                        </div>
                        {isUnread && (
                          <div
                            className="w-2 h-2 bg-amber-600 dark:bg-amber-500 rounded-full mt-1.5 shrink-0"
                            aria-label="Unread"
                          />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </button>
              );
            })}

          {/* Static notifications */}
          {staticNotifs.map((notification) => {
            const isUnread = !staticReadIds.has(notification.id);
            const Icon = notification.icon;
            return (
              <button
                key={notification.id}
                onClick={() => handleStaticClick(notification.id)}
                className="w-full text-left cursor-default"
              >
                <Card className={isUnread ? "border-blue-200 dark:border-blue-800" : ""}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg shrink-0">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`mb-1 ${isUnread ? "font-semibold" : "font-medium"}`}>
                          {notification.title}
                        </h4>
                        <p className="text-sm text-[var(--text-muted)] mb-2">{notification.message}</p>
                        <span className="text-xs text-[var(--text-muted)]">{notification.time}</span>
                      </div>
                      {isUnread && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 shrink-0" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </button>
            );
          })}

          {adminMessages.length === 0 && staticNotifs.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Bell className="w-10 h-10 text-[var(--text-muted)] mx-auto mb-3" />
                <p className="font-semibold text-lg mb-1">No notifications</p>
                <p className="text-sm text-[var(--text-muted)]">{"You're all caught up."}</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* ── Notification Settings tab ── */}
      {activeTab === "settings" && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--bg-secondary)] mb-4">
              <Settings className="w-7 h-7 text-[var(--text-muted)]" />
            </div>
            <h3 className="text-base font-semibold text-[var(--text-main)] mb-2">
              No configurable notification preferences are available yet.
            </h3>
            <p className="text-sm text-[var(--text-muted)] max-w-sm mx-auto">
              Notification settings will appear here once they are introduced. Check back in a future update.
            </p>
          </CardContent>
        </Card>
      )}

      {/* ── Admin message detail modal ── */}
      {selectedAdminMsg && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={closeAdminMsg}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-msg-title"
            className="bg-[var(--bg-card)] rounded-xl max-w-lg w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.key === "Escape" && closeAdminMsg()}
            tabIndex={-1}
          >
            <div className="flex items-start justify-between gap-4 p-6 border-b border-[var(--border-main)]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-100 dark:bg-amber-900/40 rounded-lg shrink-0">
                  <Shield className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-0.5">
                    Message from Platform Administration
                  </p>
                  <Badge variant="warning">
                    Important
                  </Badge>
                </div>
              </div>
              <button
                onClick={closeAdminMsg}
                aria-label="Close"
                className="p-1.5 hover:bg-[var(--hover-bg)] rounded-lg transition-colors text-[var(--text-muted)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1">
                  Subject
                </p>
                <p id="admin-msg-title" className="font-bold text-lg leading-snug">
                  {selectedAdminMsg.subject}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1">
                  Message
                </p>
                <p className="text-sm text-[var(--text-main)] leading-relaxed whitespace-pre-wrap">
                  {selectedAdminMsg.body}
                </p>
              </div>
              <p className="text-xs text-[var(--text-muted)] pt-2 border-t border-[var(--border-main)]">
                Sent: {formatTimestamp(selectedAdminMsg.createdAt)}
              </p>
            </div>

            <div className="px-6 pb-6">
              <Button onClick={closeAdminMsg} variant="outline" className="w-full">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
