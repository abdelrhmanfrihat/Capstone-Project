import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { cn } from "../utils/cn";
import {
  Bell, Sun, Moon, Menu, User, Settings, LogOut,
  ChevronDown, ChevronLeft, ChevronRight, Building2,
  Shield, ArrowRight, X,
} from "lucide-react";
import { useTheme } from "../components/shared/ThemeContext";
import {
  getStaticNotifications,
  useStaticReadState,
  markStaticNotifRead,
  formatRelativeTime,
  formatTimestamp,
  type StaticNotification,
  type NotifUserType,
} from "../data/notificationData";
import {
  useAdminMessages,
  markAdminMessageRead,
  type AdminMessage,
} from "../data/adminMessages";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  navItems: NavItem[];
  userType: "Student" | "Company" | "Admin";
  userName: string;
  userEmail?: string;
  userAvatar?: string;
}

// ── Route → page title mappings ──────────────────────────────────────────────

const STUDENT_TITLES: Record<string, string> = {
  "/student/dashboard":      "Dashboard",
  "/student/opportunities":  "Opportunities",
  "/student/my-activity":    "My Activity",
  "/student/feedback":       "Feedback",
  "/student/profile":        "My Profile",
  "/student/update-profile": "My Profile",
  "/student/notifications":  "Notifications & Settings",
  "/student/settings":       "Settings",
  "/student/ai-matches":     "AI Matches",
  "/student/rate-company":   "Feedback",
  "/student/assessment":     "Assessment",
};

const COMPANY_TITLES: Record<string, string> = {
  "/company/dashboard":      "Dashboard",
  "/company/opportunities":  "Opportunities",
  "/company/candidates":     "Candidates",
  "/company/pipeline":       "Pipeline",
  "/company/interviews":     "Interviews",
  "/company/feedback":       "Feedback",
  "/company/insights":       "Insights",
  "/company/profile":        "Company Profile",
  "/company/notifications":  "Notifications & Settings",
  "/company/settings":       "Settings",
};

const ADMIN_TITLES: Record<string, string> = {
  "/admin/dashboard":           "Dashboard",
  "/admin/verification":        "Company Verification",
  "/admin/users":               "Users",
  "/admin/questions":           "Assessment Questions",
  "/admin/skills":              "Categories & Skills",
  "/admin/override":            "Status Override",
  "/admin/feedback-moderation": "Feedback Moderation",
  "/admin/logs":                "Audit Logs",
  "/admin/notifications":       "Notifications & Settings",
  "/admin/settings":            "Settings",
};

function resolvePageTitle(pathname: string, titles: Record<string, string>): string {
  const exact = titles[pathname];
  if (exact) return exact;
  for (const [key, title] of Object.entries(titles)) {
    if (pathname.startsWith(key + "/")) return title;
  }
  const segment = pathname.split("/").filter(Boolean).pop() ?? "";
  return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// ── Demo user ID mapping ──────────────────────────────────────────────────────

const DEMO_USER_IDS: Record<NotifUserType, string> = {
  Student: "user-1",
  Company: "user-3",
  Admin:   "user-5",
};

// ── Notification routes per portal ────────────────────────────────────────────

const NOTIF_ROUTES: Record<NotifUserType, string> = {
  Student: "/student/notifications",
  Company: "/company/notifications",
  Admin:   "/admin/notifications",
};

// ── Student account menu ──────────────────────────────────────────────────────

function StudentAccountMenuContent({
  userName,
  userEmail,
  avatarSrc,
  menuRef,
  onAction,
}: {
  userName: string;
  userEmail?: string;
  avatarSrc: string;
  menuRef: React.RefObject<HTMLDivElement>;
  onAction: (fn: () => void) => void;
}) {
  const navigate = useNavigate();
  return (
    <div
      ref={menuRef}
      role="menu"
      className="w-[280px] max-w-[calc(100vw-32px)] rounded-2xl border border-[var(--border-main)] bg-[var(--bg-main)]"
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
    >
      <div className="flex items-center gap-3 px-4 py-4">
        <img
          src={avatarSrc}
          alt={userName}
          className="w-10 h-10 rounded-full border border-[var(--border-main)] shrink-0"
        />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[var(--text-main)] break-words">{userName}</p>
          {userEmail && (
            <p className="text-xs text-[var(--text-muted)] truncate">{userEmail}</p>
          )}
        </div>
      </div>
      <div className="mx-4 h-px bg-[var(--border-main)]" />
      <div className="py-2">
        <button
          role="menuitem"
          className="flex items-center gap-3 w-full px-4 h-11 text-sm text-[var(--text-main)] hover:bg-[var(--hover-bg)] transition-colors"
          onClick={() => onAction(() => navigate("/student/profile"))}
        >
          <User className="w-5 h-5 text-[var(--text-secondary)] shrink-0" />
          View Profile
        </button>
        <button
          role="menuitem"
          className="flex items-center gap-3 w-full px-4 h-11 text-sm text-[var(--text-main)] hover:bg-[var(--hover-bg)] transition-colors"
          onClick={() => onAction(() => navigate("/student/settings"))}
        >
          <Settings className="w-5 h-5 text-[var(--text-secondary)] shrink-0" />
          Account Settings
        </button>
        <button
          role="menuitem"
          className="flex items-center gap-3 w-full px-4 h-11 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          onClick={() => onAction(() => navigate("/"))}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

// ── Company account menu ──────────────────────────────────────────────────────

function CompanyAccountMenuContent({
  companyName,
  avatarSrc,
  menuRef,
  onAction,
}: {
  companyName: string;
  avatarSrc: string;
  menuRef: React.RefObject<HTMLDivElement>;
  onAction: (fn: () => void) => void;
}) {
  const navigate = useNavigate();
  return (
    <div
      ref={menuRef}
      role="menu"
      className="w-[280px] max-w-[calc(100vw-32px)] rounded-2xl border border-[var(--border-main)] bg-[var(--bg-main)]"
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
    >
      <div className="flex items-center gap-3 px-4 py-4">
        <img
          src={avatarSrc}
          alt={companyName}
          className="w-10 h-10 rounded-lg border border-[var(--border-main)] object-cover shrink-0"
        />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[var(--text-main)] truncate" title={companyName}>
            {companyName}
          </p>
          <p className="text-xs text-[var(--text-muted)]">Company</p>
        </div>
      </div>
      <div className="mx-4 h-px bg-[var(--border-main)]" />
      <div className="py-2">
        <button
          role="menuitem"
          className="flex items-center gap-3 w-full px-4 h-11 text-sm text-[var(--text-main)] hover:bg-[var(--hover-bg)] transition-colors"
          onClick={() => onAction(() => navigate("/company/profile"))}
        >
          <Building2 className="w-5 h-5 text-[var(--text-secondary)] shrink-0" />
          Company Profile
        </button>
        <button
          role="menuitem"
          className="flex items-center gap-3 w-full px-4 h-11 text-sm text-[var(--text-main)] hover:bg-[var(--hover-bg)] transition-colors"
          onClick={() => onAction(() => navigate("/company/settings"))}
        >
          <Settings className="w-5 h-5 text-[var(--text-secondary)] shrink-0" />
          Settings
        </button>
        <div className="mx-4 my-1 h-px bg-[var(--border-main)]" />
        <button
          role="menuitem"
          className="flex items-center gap-3 w-full px-4 h-11 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          onClick={() => onAction(() => navigate("/"))}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

// ── Admin account menu ────────────────────────────────────────────────────────

function AdminAccountMenuContent({
  menuRef,
  onAction,
}: {
  menuRef: React.RefObject<HTMLDivElement>;
  onAction: (fn: () => void) => void;
}) {
  const navigate = useNavigate();
  return (
    <div
      ref={menuRef}
      role="menu"
      className="w-[200px] max-w-[calc(100vw-32px)] rounded-2xl border border-[var(--border-main)] bg-[var(--bg-main)]"
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
    >
      <div className="py-2">
        <button
          role="menuitem"
          className="flex items-center gap-3 w-full px-4 h-11 text-sm text-[var(--text-main)] hover:bg-[var(--hover-bg)] transition-colors"
          onClick={() => onAction(() => navigate("/admin/settings"))}
        >
          <Settings className="w-5 h-5 text-[var(--text-secondary)] shrink-0" />
          Settings
        </button>
        <div className="mx-4 my-1 h-px bg-[var(--border-main)]" />
        <button
          role="menuitem"
          className="flex items-center gap-3 w-full px-4 h-11 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          onClick={() => onAction(() => navigate("/"))}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

// ── Notifications popover ─────────────────────────────────────────────────────
// Fixed-position panel anchored below the header. Closes on Escape, outside
// click, or second bell press. Clicking a notification opens an in-place detail
// view without changing the route. The footer button is the only navigation path.

type PopoverView = "list" | "detail-static" | "detail-admin";

function NotificationsPopover({
  userType,
  userId,
  onClose,
  onNavigateToFull,
  bellRef,
}: {
  userType: NotifUserType;
  userId: string;
  onClose: () => void;
  onNavigateToFull: () => void;
  bellRef: React.RefObject<HTMLButtonElement>;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [view, setView] = useState<PopoverView>("list");
  const [detailStaticId, setDetailStaticId] = useState<number | null>(null);
  const [detailAdminId, setDetailAdminId] = useState<string | null>(null);

  const staticNotifs = getStaticNotifications(userType);
  const readIds = useStaticReadState(userType);
  const adminMessages = useAdminMessages(userId);

  const detailAdmin = detailAdminId
    ? adminMessages.find((m) => m.id === detailAdminId) ?? null
    : null;
  const detailStatic =
    detailStaticId != null
      ? staticNotifs.find((n) => n.id === detailStaticId) ?? null
      : null;

  // Combine: admin messages newest-first, then static, capped at 5
  const sortedAdmin = [...adminMessages].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const combined = [
    ...sortedAdmin.map((m) => ({ type: "admin" as const, item: m })),
    ...staticNotifs.map((n) => ({ type: "static" as const, item: n })),
  ].slice(0, 5);

  const unreadCount =
    staticNotifs.filter((n) => !readIds.has(n.id)).length +
    adminMessages.filter((m) => !m.readAt).length;

  // Focus close button when popover opens
  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  // Escape closes and returns focus to bell
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        bellRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, bellRef]);

  // Outside-click closes — bell button excluded so the toggle works correctly
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        bellRef.current &&
        !bellRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [onClose, bellRef]);

  function openStaticDetail(id: number) {
    markStaticNotifRead(userType, id);
    setDetailStaticId(id);
    setView("detail-static");
  }

  function openAdminDetail(msg: AdminMessage) {
    markAdminMessageRead(msg.id);
    setDetailAdminId(msg.id);
    setView("detail-admin");
  }

  function backToList() {
    setView("list");
    setDetailStaticId(null);
    setDetailAdminId(null);
  }

  return (
    <div
      ref={panelRef}
      id="notifications-popover"
      role="dialog"
      aria-modal="false"
      aria-label="Notifications"
      className={cn(
        "fixed top-[64px] right-4 z-[90]",
        "w-[calc(100vw-32px)] sm:w-[420px]",
        "max-h-[min(560px,calc(100dvh-80px))]",
        "flex flex-col",
        "rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)]",
        "shadow-2xl overflow-hidden"
      )}
    >
      {/* ── Panel header ── */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-main)] shrink-0">
        {view === "list" ? (
          <>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-[var(--text-main)]">Notifications</h2>
              {unreadCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full border border-blue-500/40 bg-blue-500/10 text-xs font-bold text-blue-400">
                  {unreadCount}
                </span>
              )}
            </div>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close notifications"
              className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--hover-bg)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={backToList}
              className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline focus:outline-none focus-visible:underline"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to notifications
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close notifications"
              className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--hover-bg)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        {/* List view */}
        {view === "list" && (
          <ul className="p-3 space-y-2" role="list">
            {combined.length === 0 && (
              <li className="py-10 text-center">
                <Bell className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-2" />
                <p className="text-sm font-medium text-[var(--text-main)]">
                  {"You're all caught up."}
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  New notifications will appear here.
                </p>
              </li>
            )}

            {combined.map(({ type, item }) => {
              if (type === "admin") {
                const msg = item as AdminMessage;
                const isUnread = !msg.readAt;
                return (
                  <li key={`adm-${msg.id}`}>
                    <button
                      type="button"
                      onClick={() => openAdminDetail(msg)}
                      className={cn(
                        "w-full text-left p-3 rounded-xl border transition-colors hover:bg-[var(--hover-bg)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                        isUnread
                          ? "border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/10"
                          : "border-[var(--border-main)]"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-lg shrink-0">
                          <Shield className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                            <p className={cn("text-sm", isUnread ? "font-semibold" : "font-medium")}>
                              {msg.subject}
                            </p>
                            <span className="inline-flex shrink-0 items-center px-2.5 py-0.5 rounded-full border border-amber-200 bg-amber-50 text-xs font-medium text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-400">
                              Important
                            </span>
                          </div>
                          <p className="text-xs text-amber-700 dark:text-amber-400 mb-0.5">
                            Platform Administration
                          </p>
                          <p className="text-xs text-[var(--text-muted)] line-clamp-1">{msg.body}</p>
                          <p className="text-xs text-[var(--text-muted)] mt-1">
                            {formatRelativeTime(msg.createdAt)}
                          </p>
                        </div>
                        {isUnread && (
                          <div
                            className="w-2 h-2 rounded-full bg-amber-600 dark:bg-amber-500 shrink-0 mt-1"
                            aria-label="Unread"
                          />
                        )}
                      </div>
                    </button>
                  </li>
                );
              }

              const notif = item as StaticNotification;
              const isUnread = !readIds.has(notif.id);
              const Icon = notif.icon;
              return (
                <li key={`sta-${notif.id}`}>
                  <button
                    type="button"
                    onClick={() => openStaticDetail(notif.id)}
                    className={cn(
                      "w-full text-left p-3 rounded-xl border transition-colors hover:bg-[var(--hover-bg)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                      isUnread
                        ? "border-blue-200 dark:border-blue-800"
                        : "border-[var(--border-main)]"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg shrink-0">
                        <Icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn("text-sm mb-0.5", isUnread ? "font-semibold" : "font-medium")}>
                          {notif.title}
                        </p>
                        <p className="text-xs text-[var(--text-muted)] line-clamp-1">
                          {notif.message}
                        </p>
                        <p className="text-xs text-[var(--text-muted)] mt-1">{notif.time}</p>
                      </div>
                      {isUnread && (
                        <div
                          className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1"
                          aria-label="Unread"
                        />
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {/* Static notification detail */}
        {view === "detail-static" && detailStatic && (
          <div className="p-5 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg shrink-0">
                {React.createElement(detailStatic.icon as React.ElementType, {
                  className: "w-5 h-5 text-blue-600",
                })}
              </div>
              <div>
                <p className="font-semibold text-[var(--text-main)] text-base leading-snug">
                  {detailStatic.title}
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{detailStatic.time}</p>
              </div>
            </div>
            <p className="text-sm text-[var(--text-main)] leading-relaxed">{detailStatic.message}</p>
          </div>
        )}

        {/* Admin message detail */}
        {view === "detail-admin" && detailAdmin && (
          <div className="p-5 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-amber-100 dark:bg-amber-900/40 rounded-lg shrink-0">
                <Shield className="w-5 h-5 text-amber-700 dark:text-amber-400" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <p className="font-semibold text-[var(--text-main)] text-base leading-snug">
                    {detailAdmin.subject}
                  </p>
                  <span className="inline-flex shrink-0 items-center px-2.5 py-0.5 rounded-full border border-amber-200 bg-amber-50 text-xs font-medium text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-400">
                    Important
                  </span>
                </div>
                <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
                  Platform Administration
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  {formatTimestamp(detailAdmin.createdAt)}
                </p>
              </div>
            </div>
            {/* Plain text render — no HTML execution */}
            <p className="text-sm text-[var(--text-main)] leading-relaxed whitespace-pre-wrap">
              {detailAdmin.body}
            </p>
          </div>
        )}
      </div>

      {/* ── Fixed footer ── */}
      <div className="shrink-0 p-3 border-t border-[var(--border-main)] bg-[var(--bg-secondary)]">
        <button
          type="button"
          onClick={onNavigateToFull}
          className="w-full flex items-center justify-center gap-2 h-10 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          View All Notifications & Settings
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ── Shared bell button ────────────────────────────────────────────────────────

function BellButton({
  bellRef,
  bellOpen,
  onBellToggle,
  unreadCount,
}: {
  bellRef: React.RefObject<HTMLButtonElement>;
  bellOpen: boolean;
  onBellToggle: () => void;
  unreadCount: number;
}) {
  return (
    <button
      ref={bellRef}
      type="button"
      aria-label="Notifications"
      aria-expanded={bellOpen}
      aria-controls="notifications-popover"
      onClick={onBellToggle}
      className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[var(--hover-bg)] transition-colors text-[var(--text-secondary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <Bell className="w-[18px] h-[18px]" />
      {unreadCount > 0 && (
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[var(--bg-topbar)]" />
      )}
    </button>
  );
}

// ── Student sidebar ──────────────────────────────────────────────────────────

function StudentSidebar({
  isExpanded,
  isMobileOpen,
  onToggleExpanded,
  onMobileClose,
  onCollapseForNav,
  navItems,
  userName,
  userEmail,
  userAvatar,
}: {
  isExpanded: boolean;
  isMobileOpen: boolean;
  onToggleExpanded: () => void;
  onMobileClose: () => void;
  onCollapseForNav: () => void;
  navItems: NavItem[];
  userName: string;
  userEmail?: string;
  userAvatar?: string;
}) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [fixedTooltip, setFixedTooltip] = useState<{ label: string; y: number } | null>(null);

  const avatarSrc =
    userAvatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=2563eb&color=fff`;

  useEffect(() => {
    if (!menuOpen) return;
    function handleOutside(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  // Account menu navigation: close menu, collapse sidebar, then navigate
  const handleMenuAction = (fn: () => void) => {
    setMenuOpen(false);
    onCollapseForNav();
    fn();
  };

  // Nav link click: collapse desktop sidebar + close mobile drawer
  const handleNavClick = () => {
    onCollapseForNav();
    onMobileClose();
  };

  const collapsedDesktop = !isExpanded;

  return (
    <aside
      className={cn(
        "flex flex-col bg-[var(--bg-sidebar)] border-r border-[var(--border-main)]",
        "fixed inset-y-0 left-0 z-50 w-[264px]",
        "md:relative md:inset-auto md:z-auto",
        isExpanded ? "md:w-[264px]" : "md:w-[76px]",
        isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        "transition-[transform,width] motion-reduce:transition-none duration-200"
      )}
    >
      {/* ── Branding area ── */}
      <div
        className={cn(
          "shrink-0 border-b border-[var(--border-main)]",
          "flex items-center h-16 px-4 gap-2",
          collapsedDesktop && "md:flex-col md:h-auto md:items-center md:justify-start md:py-3 md:px-2 md:gap-3"
        )}
      >
        <div
          className="w-8 h-8 rounded flex items-center justify-center text-sm font-bold text-white shrink-0"
          style={{ backgroundColor: "var(--primary)" }}
          aria-hidden="true"
        >
          I
        </div>
        <span
          className={cn("flex-1 min-w-0 text-lg font-bold truncate", collapsedDesktop && "md:hidden")}
          style={{ color: "var(--primary)" }}
        >
          InternMatch AI
        </span>
        <button
          onClick={onToggleExpanded}
          className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg hover:bg-[var(--hover-bg)] transition-colors text-[var(--text-secondary)] shrink-0"
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          aria-expanded={isExpanded}
        >
          {isExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
        <button
          onClick={onMobileClose}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-[var(--hover-bg)] transition-colors text-[var(--text-secondary)] shrink-0"
          aria-label="Close navigation"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* ── Navigation ── */}
      <div
        className={cn(
          "flex-1 overflow-y-auto overflow-x-hidden py-4 min-h-0",
          collapsedDesktop ? "md:px-2" : "px-3"
        )}
      >
        <p
          className={cn(
            "px-3 mb-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider",
            collapsedDesktop && "md:hidden"
          )}
        >
          Student Portal
        </p>

        <nav className="space-y-2" aria-label="Student navigation">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.href ||
              location.pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={(e) => {
                  if (!collapsedDesktop) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  setFixedTooltip({ label: item.label, y: rect.top + rect.height / 2 });
                }}
                onMouseLeave={() => setFixedTooltip(null)}
                onFocus={(e) => {
                  if (!collapsedDesktop) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  setFixedTooltip({ label: item.label, y: rect.top + rect.height / 2 });
                }}
                onBlur={() => setFixedTooltip(null)}
              >
                <Link
                  to={item.href}
                  aria-label={item.label}
                  onClick={handleNavClick}
                  className={cn(
                    "flex items-center h-11 rounded-lg transition-colors font-medium text-sm",
                    collapsedDesktop ? "md:justify-center md:px-0 gap-3 px-3" : "gap-3 px-3",
                    isActive
                      ? "bg-[var(--active-bg)] text-[var(--primary)]"
                      : "text-[var(--text-main)] hover:bg-[var(--hover-bg)]"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 shrink-0",
                      isActive ? "text-[var(--primary)]" : "text-[var(--text-secondary)]"
                    )}
                  />
                  <span className={cn("truncate", collapsedDesktop && "md:hidden")}>
                    {item.label}
                  </span>
                </Link>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Fixed-position tooltip for collapsed nav items */}
      {collapsedDesktop && fixedTooltip && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed z-[200] px-2.5 py-1.5 rounded-lg bg-gray-900 dark:bg-gray-700 text-white text-xs whitespace-nowrap -translate-y-1/2"
          style={{ left: 86, top: fixedTooltip.y }}
        >
          {fixedTooltip.label}
        </div>
      )}

      {/* ── Account footer ── */}
      <div
        className={cn(
          "shrink-0 border-t border-[var(--border-main)]",
          collapsedDesktop ? "md:p-2" : "p-3"
        )}
      >
        <div className="relative">
          <button
            ref={triggerRef}
            onClick={() => setMenuOpen((o) => !o)}
            aria-haspopup="true"
            aria-expanded={menuOpen}
            aria-label="Open account menu"
            className={cn(
              "w-full flex items-center rounded-lg transition-colors hover:bg-[var(--hover-bg)]",
              collapsedDesktop ? "md:justify-center p-2" : "gap-3 p-2",
              menuOpen && "bg-[var(--hover-bg)]"
            )}
          >
            <img src={avatarSrc} alt={userName} className="w-9 h-9 rounded-full shrink-0" />
            <div
              className={cn("flex-1 min-w-0 flex items-center gap-2", collapsedDesktop && "md:hidden")}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--text-main)] leading-snug break-words">
                  {userName}
                </p>
                <p className="text-xs text-[var(--text-muted)] leading-tight">Student</p>
              </div>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-[var(--text-muted)] shrink-0 transition-transform duration-150",
                  menuOpen && "rotate-180"
                )}
              />
            </div>
          </button>

          {menuOpen && (
            <div className="absolute bottom-full mb-2 left-0 z-[60]">
              <StudentAccountMenuContent
                userName={userName}
                userEmail={userEmail}
                avatarSrc={avatarSrc}
                menuRef={menuRef}
                onAction={handleMenuAction}
              />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

// ── Company sidebar ───────────────────────────────────────────────────────────

function CompanySidebar({
  isExpanded,
  isMobileOpen,
  onToggleExpanded,
  onMobileClose,
  onCollapseForNav,
  navItems,
  companyName,
  companyAvatar,
}: {
  isExpanded: boolean;
  isMobileOpen: boolean;
  onToggleExpanded: () => void;
  onMobileClose: () => void;
  onCollapseForNav: () => void;
  navItems: NavItem[];
  companyName: string;
  companyAvatar?: string;
}) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [fixedTooltip, setFixedTooltip] = useState<{ label: string; y: number } | null>(null);

  const avatarSrc =
    companyAvatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&background=2563eb&color=fff`;

  useEffect(() => {
    if (!menuOpen) return;
    function handleOutside(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  const handleMenuAction = (fn: () => void) => {
    setMenuOpen(false);
    onCollapseForNav();
    fn();
  };

  const handleNavClick = () => {
    onCollapseForNav();
    onMobileClose();
  };

  const collapsedDesktop = !isExpanded;

  return (
    <aside
      className={cn(
        "flex flex-col bg-[var(--bg-sidebar)] border-r border-[var(--border-main)]",
        "fixed inset-y-0 left-0 z-50 w-[264px]",
        "md:relative md:inset-auto md:z-auto",
        isExpanded ? "md:w-[264px]" : "md:w-[76px]",
        isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        "transition-[transform,width] motion-reduce:transition-none duration-200"
      )}
    >
      {/* ── Branding area ── */}
      <div
        className={cn(
          "shrink-0 border-b border-[var(--border-main)]",
          "flex items-center h-16 px-4 gap-2",
          collapsedDesktop && "md:flex-col md:h-auto md:items-center md:justify-start md:py-3 md:px-2 md:gap-3"
        )}
      >
        <div
          className="w-8 h-8 rounded flex items-center justify-center text-sm font-bold text-white shrink-0"
          style={{ backgroundColor: "var(--primary)" }}
          aria-hidden="true"
        >
          I
        </div>
        <span
          className={cn("flex-1 min-w-0 text-lg font-bold truncate", collapsedDesktop && "md:hidden")}
          style={{ color: "var(--primary)" }}
        >
          InternMatch AI
        </span>
        <button
          onClick={onToggleExpanded}
          className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg hover:bg-[var(--hover-bg)] transition-colors text-[var(--text-secondary)] shrink-0"
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          aria-expanded={isExpanded}
        >
          {isExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
        <button
          onClick={onMobileClose}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-[var(--hover-bg)] transition-colors text-[var(--text-secondary)] shrink-0"
          aria-label="Close navigation"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* ── Navigation ── */}
      <div
        className={cn(
          "flex-1 overflow-y-auto overflow-x-hidden py-4 min-h-0",
          collapsedDesktop ? "md:px-2" : "px-3"
        )}
      >
        <p
          className={cn(
            "px-3 mb-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider",
            collapsedDesktop && "md:hidden"
          )}
        >
          Company Portal
        </p>

        <nav className="space-y-2" aria-label="Company navigation">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.href ||
              location.pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={(e) => {
                  if (!collapsedDesktop) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  setFixedTooltip({ label: item.label, y: rect.top + rect.height / 2 });
                }}
                onMouseLeave={() => setFixedTooltip(null)}
                onFocus={(e) => {
                  if (!collapsedDesktop) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  setFixedTooltip({ label: item.label, y: rect.top + rect.height / 2 });
                }}
                onBlur={() => setFixedTooltip(null)}
              >
                <Link
                  to={item.href}
                  aria-label={item.label}
                  onClick={handleNavClick}
                  className={cn(
                    "flex items-center h-11 rounded-lg transition-colors font-medium text-sm",
                    collapsedDesktop ? "md:justify-center md:px-0 gap-3 px-3" : "gap-3 px-3",
                    isActive
                      ? "bg-[var(--active-bg)] text-[var(--primary)]"
                      : "text-[var(--text-main)] hover:bg-[var(--hover-bg)]"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 shrink-0",
                      isActive ? "text-[var(--primary)]" : "text-[var(--text-secondary)]"
                    )}
                  />
                  <span className={cn("truncate", collapsedDesktop && "md:hidden")}>
                    {item.label}
                  </span>
                </Link>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Fixed-position tooltip for collapsed nav items */}
      {collapsedDesktop && fixedTooltip && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed z-[200] px-2.5 py-1.5 rounded-lg bg-gray-900 dark:bg-gray-700 text-white text-xs whitespace-nowrap -translate-y-1/2"
          style={{ left: 86, top: fixedTooltip.y }}
        >
          {fixedTooltip.label}
        </div>
      )}

      {/* ── Company account footer ── */}
      <div
        className={cn(
          "shrink-0 border-t border-[var(--border-main)]",
          collapsedDesktop ? "md:p-2" : "p-3"
        )}
      >
        <div className="relative">
          <button
            ref={triggerRef}
            onClick={() => setMenuOpen((o) => !o)}
            aria-haspopup="true"
            aria-expanded={menuOpen}
            aria-label={`${companyName} — open company menu`}
            title={companyName}
            className={cn(
              "w-full flex items-center rounded-lg transition-colors hover:bg-[var(--hover-bg)] relative",
              collapsedDesktop ? "md:justify-center p-2" : "gap-3 p-2",
              menuOpen && "bg-[var(--hover-bg)]"
            )}
          >
            <img
              src={avatarSrc}
              alt={companyName}
              className="w-9 h-9 rounded-lg border border-[var(--border-main)] object-cover shrink-0"
            />
            <div
              className={cn(
                "flex-1 min-w-0 flex items-center gap-2",
                collapsedDesktop && "md:hidden"
              )}
            >
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-semibold text-[var(--text-main)] leading-snug truncate"
                  title={companyName}
                >
                  {companyName}
                </p>
                <p className="text-xs text-[var(--text-muted)] leading-tight">Company</p>
              </div>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-[var(--text-muted)] shrink-0 transition-transform duration-150",
                  menuOpen && "rotate-180"
                )}
              />
            </div>
          </button>

          {menuOpen && (
            <div className="absolute bottom-full mb-2 left-0 z-[60]">
              <CompanyAccountMenuContent
                companyName={companyName}
                avatarSrc={avatarSrc}
                menuRef={menuRef}
                onAction={handleMenuAction}
              />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

// ── Admin sidebar ─────────────────────────────────────────────────────────────

function AdminSidebar({
  isExpanded,
  isMobileOpen,
  onToggleExpanded,
  onMobileClose,
  onCollapseForNav,
  navItems,
  userName,
  userAvatar,
}: {
  isExpanded: boolean;
  isMobileOpen: boolean;
  onToggleExpanded: () => void;
  onMobileClose: () => void;
  onCollapseForNav: () => void;
  navItems: NavItem[];
  userName: string;
  userAvatar?: string;
}) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [fixedTooltip, setFixedTooltip] = useState<{ label: string; y: number } | null>(null);

  const avatarSrc =
    userAvatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=2563eb&color=fff`;

  useEffect(() => {
    if (!menuOpen) return;
    function handleOutside(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  const handleMenuAction = (fn: () => void) => {
    setMenuOpen(false);
    onCollapseForNav();
    fn();
  };

  const handleNavClick = () => {
    onCollapseForNav();
    onMobileClose();
  };

  const collapsedDesktop = !isExpanded;

  return (
    <aside
      className={cn(
        "flex flex-col bg-[var(--bg-sidebar)] border-r border-[var(--border-main)]",
        "fixed inset-y-0 left-0 z-50 w-[264px]",
        "md:relative md:inset-auto md:z-auto",
        isExpanded ? "md:w-[264px]" : "md:w-[76px]",
        isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        "transition-[transform,width] motion-reduce:transition-none duration-200"
      )}
    >
      {/* ── Branding area ── */}
      <div
        className={cn(
          "shrink-0 border-b border-[var(--border-main)]",
          "flex items-center h-16 px-4 gap-2",
          collapsedDesktop && "md:flex-col md:h-auto md:items-center md:justify-start md:py-3 md:px-2 md:gap-3"
        )}
      >
        <div
          className="w-8 h-8 rounded flex items-center justify-center text-sm font-bold text-white shrink-0"
          style={{ backgroundColor: "var(--primary)" }}
          aria-hidden="true"
        >
          I
        </div>
        <span
          className={cn("flex-1 min-w-0 text-lg font-bold truncate", collapsedDesktop && "md:hidden")}
          style={{ color: "var(--primary)" }}
        >
          InternMatch AI
        </span>
        <button
          onClick={onToggleExpanded}
          className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg hover:bg-[var(--hover-bg)] transition-colors text-[var(--text-secondary)] shrink-0"
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          aria-expanded={isExpanded}
        >
          {isExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
        <button
          onClick={onMobileClose}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-[var(--hover-bg)] transition-colors text-[var(--text-secondary)] shrink-0"
          aria-label="Close navigation"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* ── Navigation ── */}
      <div
        className={cn(
          "flex-1 overflow-y-auto overflow-x-hidden py-4 min-h-0",
          collapsedDesktop ? "md:px-2" : "px-3"
        )}
      >
        <p
          className={cn(
            "px-3 mb-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider",
            collapsedDesktop && "md:hidden"
          )}
        >
          Admin Portal
        </p>

        <nav className="space-y-2" aria-label="Admin navigation">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.href ||
              location.pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={(e) => {
                  if (!collapsedDesktop) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  setFixedTooltip({ label: item.label, y: rect.top + rect.height / 2 });
                }}
                onMouseLeave={() => setFixedTooltip(null)}
                onFocus={(e) => {
                  if (!collapsedDesktop) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  setFixedTooltip({ label: item.label, y: rect.top + rect.height / 2 });
                }}
                onBlur={() => setFixedTooltip(null)}
              >
                <Link
                  to={item.href}
                  aria-label={item.label}
                  onClick={handleNavClick}
                  className={cn(
                    "flex items-center h-11 rounded-lg transition-colors font-medium text-sm",
                    collapsedDesktop ? "md:justify-center md:px-0 gap-3 px-3" : "gap-3 px-3",
                    isActive
                      ? "bg-[var(--active-bg)] text-[var(--primary)]"
                      : "text-[var(--text-main)] hover:bg-[var(--hover-bg)]"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 shrink-0",
                      isActive ? "text-[var(--primary)]" : "text-[var(--text-secondary)]"
                    )}
                  />
                  <span className={cn("truncate", collapsedDesktop && "md:hidden")}>
                    {item.label}
                  </span>
                </Link>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Fixed-position tooltip for collapsed nav items */}
      {collapsedDesktop && fixedTooltip && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed z-[200] px-2.5 py-1.5 rounded-lg bg-gray-900 dark:bg-gray-700 text-white text-xs whitespace-nowrap -translate-y-1/2"
          style={{ left: 86, top: fixedTooltip.y }}
        >
          {fixedTooltip.label}
        </div>
      )}

      {/* ── Account footer ── */}
      <div
        className={cn(
          "shrink-0 border-t border-[var(--border-main)]",
          collapsedDesktop ? "md:p-2" : "p-3"
        )}
      >
        <div className="relative">
          <button
            ref={triggerRef}
            onClick={() => setMenuOpen((o) => !o)}
            aria-haspopup="true"
            aria-expanded={menuOpen}
            aria-label="Open admin account menu"
            className={cn(
              "w-full flex items-center rounded-lg transition-colors hover:bg-[var(--hover-bg)]",
              collapsedDesktop ? "md:justify-center p-2" : "gap-3 p-2",
              menuOpen && "bg-[var(--hover-bg)]"
            )}
          >
            <img
              src={avatarSrc}
              alt={userName}
              className="w-9 h-9 rounded-full border border-[var(--border-main)] shrink-0"
            />
            <div
              className={cn(
                "flex-1 min-w-0 flex items-center gap-2",
                collapsedDesktop && "md:hidden"
              )}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--text-main)] leading-snug truncate">
                  {userName}
                </p>
                <p className="text-xs text-[var(--text-muted)] leading-tight">Admin</p>
              </div>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-[var(--text-muted)] shrink-0 transition-transform duration-150",
                  menuOpen && "rotate-180"
                )}
              />
            </div>
          </button>

          {menuOpen && (
            <div className="absolute bottom-full mb-2 left-0 z-[60]">
              <AdminAccountMenuContent menuRef={menuRef} onAction={handleMenuAction} />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

// ── Per-portal header components ──────────────────────────────────────────────

interface HeaderProps {
  pageTitle: string;
  onMobileToggle: () => void;
  bellRef: React.RefObject<HTMLButtonElement>;
  bellOpen: boolean;
  onBellToggle: () => void;
  unreadCount: number;
}

function StudentHeader({ pageTitle, onMobileToggle, bellRef, bellOpen, onBellToggle, unreadCount }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-[var(--border-main)] bg-[var(--bg-topbar)] shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMobileToggle}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[var(--hover-bg)] transition-colors text-[var(--text-secondary)]"
          aria-label="Open navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl sm:text-[22px] font-semibold leading-7 text-[var(--text-main)] truncate">
          {pageTitle}
        </h1>
      </div>
      <div className="flex items-center gap-1 ml-4 shrink-0">
        <BellButton
          bellRef={bellRef}
          bellOpen={bellOpen}
          onBellToggle={onBellToggle}
          unreadCount={unreadCount}
        />
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[var(--hover-bg)] transition-colors text-[var(--text-secondary)]"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
        </button>
      </div>
    </header>
  );
}

function CompanyHeader({ pageTitle, onMobileToggle, bellRef, bellOpen, onBellToggle, unreadCount }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-[var(--border-main)] bg-[var(--bg-topbar)] shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMobileToggle}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[var(--hover-bg)] transition-colors text-[var(--text-secondary)]"
          aria-label="Open navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl sm:text-[22px] font-semibold leading-7 text-[var(--text-main)] truncate">
          {pageTitle}
        </h1>
      </div>
      <div className="flex items-center gap-1 ml-4 shrink-0">
        <BellButton
          bellRef={bellRef}
          bellOpen={bellOpen}
          onBellToggle={onBellToggle}
          unreadCount={unreadCount}
        />
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[var(--hover-bg)] transition-colors text-[var(--text-secondary)]"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
        </button>
      </div>
    </header>
  );
}

function AdminHeader({ pageTitle, onMobileToggle, bellRef, bellOpen, onBellToggle, unreadCount }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-[var(--border-main)] bg-[var(--bg-topbar)] shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMobileToggle}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[var(--hover-bg)] transition-colors text-[var(--text-secondary)]"
          aria-label="Open navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl sm:text-[22px] font-semibold leading-7 text-[var(--text-main)] truncate">
          {pageTitle}
        </h1>
      </div>
      <div className="flex items-center gap-1 ml-4 shrink-0">
        <BellButton
          bellRef={bellRef}
          bellOpen={bellOpen}
          onBellToggle={onBellToggle}
          unreadCount={unreadCount}
        />
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[var(--hover-bg)] transition-colors text-[var(--text-secondary)]"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
        </button>
      </div>
    </header>
  );
}

// ── Main layout ───────────────────────────────────────────────────────────────

export function DashboardLayout({
  children,
  navItems,
  userType,
  userName,
  userEmail,
  userAvatar,
}: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const pageTitle =
    userType === "Company"
      ? resolvePageTitle(location.pathname, COMPANY_TITLES)
      : userType === "Admin"
      ? resolvePageTitle(location.pathname, ADMIN_TITLES)
      : resolvePageTitle(location.pathname, STUDENT_TITLES);

  // ── Sidebar state ──
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const storageKey =
    userType === "Student" ? "studentSidebarExpanded"
    : userType === "Company" ? "companySidebarExpanded"
    : userType === "Admin" ? "adminSidebarExpanded"
    : null;

  const [isExpanded, setIsExpanded] = useState(() => {
    if (!storageKey) return true;
    try { return localStorage.getItem(storageKey) !== "false"; } catch { return true; }
  });

  const toggleExpanded = () => {
    setIsExpanded((prev) => {
      const next = !prev;
      if (storageKey) { try { localStorage.setItem(storageKey, String(next)); } catch {} }
      return next;
    });
  };

  // Collapse for nav: only collapses (never expands), persists to localStorage
  const collapseForNav = () => {
    setIsExpanded((prev) => {
      if (!prev) return prev;
      if (storageKey) { try { localStorage.setItem(storageKey, "false"); } catch {} }
      return false;
    });
  };

  // ── Notifications popover state ──
  const [bellOpen, setBellOpen] = useState(false);
  const bellRef = useRef<HTMLButtonElement>(null);

  const effectiveUserId = DEMO_USER_IDS[userType];
  const staticNotifs = getStaticNotifications(userType);
  const staticReadIds = useStaticReadState(userType);
  const adminMessages = useAdminMessages(effectiveUserId);

  const unreadCount =
    staticNotifs.filter((n) => !staticReadIds.has(n.id)).length +
    adminMessages.filter((m) => !m.readAt).length;

  const handleBellToggle = () => setBellOpen((o) => !o);
  const handleBellClose = () => {
    setBellOpen(false);
    bellRef.current?.focus();
  };

  // Navigate to full notification center, recording the current page for back nav
  const handleNavigateToFull = () => {
    setBellOpen(false);
    navigate(NOTIF_ROUTES[userType], {
      state: { from: location.pathname + location.search },
    });
  };

  // Close popover on route change (e.g. sidebar nav, account menu action)
  const prevPath = useRef(location.pathname);
  useEffect(() => {
    if (location.pathname !== prevPath.current) {
      setBellOpen(false);
      prevPath.current = location.pathname;
    }
  }, [location.pathname]);

  // Shared header + popover renderer
  function renderPopover() {
    if (!bellOpen) return null;
    return (
      <NotificationsPopover
        userType={userType}
        userId={effectiveUserId}
        onClose={handleBellClose}
        onNavigateToFull={handleNavigateToFull}
        bellRef={bellRef}
      />
    );
  }

  const sharedHeaderProps = {
    pageTitle,
    bellRef,
    bellOpen,
    onBellToggle: handleBellToggle,
    unreadCount,
  };

  // ── Student layout ──
  if (userType === "Student") {
    return (
      <div className="flex h-screen bg-[var(--bg-main)] text-[var(--text-main)] overflow-hidden">
        {isMobileOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileOpen(false)}
            aria-hidden="true"
          />
        )}
        <StudentSidebar
          isExpanded={isExpanded}
          isMobileOpen={isMobileOpen}
          onToggleExpanded={toggleExpanded}
          onMobileClose={() => setIsMobileOpen(false)}
          onCollapseForNav={collapseForNav}
          navItems={navItems}
          userName={userName}
          userEmail={userEmail}
          userAvatar={userAvatar}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <StudentHeader
            {...sharedHeaderProps}
            onMobileToggle={() => setIsMobileOpen((o) => !o)}
          />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
        {renderPopover()}
      </div>
    );
  }

  // ── Company layout ──
  if (userType === "Company") {
    return (
      <div className="flex h-screen bg-[var(--bg-main)] text-[var(--text-main)] overflow-hidden">
        {isMobileOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileOpen(false)}
            aria-hidden="true"
          />
        )}
        <CompanySidebar
          isExpanded={isExpanded}
          isMobileOpen={isMobileOpen}
          onToggleExpanded={toggleExpanded}
          onMobileClose={() => setIsMobileOpen(false)}
          onCollapseForNav={collapseForNav}
          navItems={navItems}
          companyName={userName}
          companyAvatar={userAvatar}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <CompanyHeader
            {...sharedHeaderProps}
            onMobileToggle={() => setIsMobileOpen((o) => !o)}
          />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
        {renderPopover()}
      </div>
    );
  }

  // ── Admin layout ──
  return (
    <div className="flex h-screen bg-[var(--bg-main)] text-[var(--text-main)] overflow-hidden">
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}
      <AdminSidebar
        isExpanded={isExpanded}
        isMobileOpen={isMobileOpen}
        onToggleExpanded={toggleExpanded}
        onMobileClose={() => setIsMobileOpen(false)}
        onCollapseForNav={collapseForNav}
        navItems={navItems}
        userName={userName}
        userAvatar={userAvatar}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          {...sharedHeaderProps}
          onMobileToggle={() => setIsMobileOpen((o) => !o)}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
      {renderPopover()}
    </div>
  );
}
