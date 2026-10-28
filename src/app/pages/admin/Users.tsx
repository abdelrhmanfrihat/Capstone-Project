import React, { useState } from "react";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/input";
import { addAdminMessage } from "../../data/adminMessages";
import {
  Search,
  Users as UsersIcon,
  Building2,
  Shield,
  MoreVertical,
  User,
  FileText,
  RefreshCw,
  Key,
  MessageSquare,
  UserX,
  Ban,
  X,
  AlertCircle,
  Briefcase,
  CheckCircle2,
  Activity,
  ChevronRight,
  Star,
  Clock,
  Calendar,
  MapPin,
  GraduationCap,
  ThumbsUp,
  ThumbsDown,
  CheckSquare
} from "lucide-react";

interface UserRecord {
  id: number;
  name: string;
  email: string;
  type: "Student" | "Company" | "Admin";
  status: string;
  university?: string;
  industry?: string;
  role?: string;
  joinedAt: string;
  profileStrength?: number;
  applications?: number;
  interviews?: number;
  feedbackCount?: number;
  lastActivity?: string;
  opportunities?: number;
  applicants?: number;
  verificationStatus?: string;
  major?: string;
  availability?: string;
}

const MOCK_APPLICATIONS: Record<number, { id: number; role: string; company: string; status: string; appliedAt: string; stage: string }[]> = {
  1: [
    { id: 1, role: "Frontend Engineering Intern", company: "Stellar Cloud", status: "Interview", appliedAt: "2026-05-14", stage: "Technical Interview" },
    { id: 2, role: "Data Science Intern", company: "DataPulse", status: "Applied", appliedAt: "2026-05-10", stage: "Application Review" },
    { id: 3, role: "ML Engineer Intern", company: "NeuralPath", status: "Rejected", appliedAt: "2026-04-28", stage: "Closed" },
    { id: 4, role: "Backend Intern", company: "CloudBase", status: "Applied", appliedAt: "2026-05-18", stage: "Application Review" },
    { id: 5, role: "Product Intern", company: "Launchpad", status: "Withdrawn", appliedAt: "2026-04-20", stage: "Closed" },
  ],
  2: [
    { id: 1, role: "Data Analyst Intern", company: "DataPulse", status: "In Training", appliedAt: "2026-04-05", stage: "Onboarded" },
    { id: 2, role: "Analytics Intern", company: "InsightCo", status: "Rejected", appliedAt: "2026-03-22", stage: "Closed" },
    { id: 3, role: "Research Intern", company: "AcademiaTech", status: "Applied", appliedAt: "2026-05-20", stage: "Application Review" },
  ],
};

const MOCK_STUDENT_FEEDBACK: Record<number, { id: number; from: string; role: string; rating: number; comment: string; date: string; positive: boolean }[]> = {
  1: [
    { id: 1, from: "Stellar Cloud HR", role: "Frontend Engineering Intern", rating: 5, comment: "Exceptional problem-solving ability. Delivered high-quality code on schedule.", date: "2026-05-16", positive: true },
    { id: 2, from: "DataPulse Recruiter", role: "Data Science Intern", rating: 4, comment: "Strong analytical skills. Communication could improve slightly.", date: "2026-05-12", positive: true },
    { id: 3, from: "NeuralPath Interviewer", role: "ML Engineer Intern", rating: 3, comment: "Good foundations but needs more hands-on experience with large datasets.", date: "2026-04-30", positive: false },
  ],
  2: [
    { id: 1, from: "DataPulse Supervisor", role: "Data Analyst Intern", rating: 5, comment: "Elena exceeded expectations on every sprint. Highly recommend.", date: "2026-05-12", positive: true },
    { id: 2, from: "InsightCo Recruiter", role: "Analytics Intern", rating: 3, comment: "Solid technical background but limited real-world project exposure.", date: "2026-03-25", positive: false },
  ],
};

const MOCK_COMPANY_FEEDBACK: Record<number, { id: number; from: string; comment: string; rating: number; date: string; positive: boolean }[]> = {
  3: [
    { id: 1, from: "Alex Chen (Student)", comment: "Great onboarding experience. Mentors were very supportive.", rating: 5, date: "2026-05-17", positive: true },
    { id: 2, from: "Maria Torres (Student)", comment: "Interview process was very smooth and professional.", rating: 5, date: "2026-05-05", positive: true },
    { id: 3, from: "James Wu (Student)", comment: "Offer letter arrived later than expected but team was communicative.", rating: 3, date: "2026-04-22", positive: false },
  ],
  4: [
    { id: 1, from: "Elena Rodriguez (Student)", comment: "Amazing internship. Learned so much about data pipelines.", rating: 5, date: "2026-05-11", positive: true },
    { id: 2, from: "Kevin Park (Student)", comment: "Very structured program. Would recommend to any data science student.", rating: 4, date: "2026-04-30", positive: true },
  ],
};

const MOCK_OPPORTUNITIES: Record<number, { id: number; title: string; type: string; location: string; applicants: number; status: string; postedAt: string }[]> = {
  3: [
    { id: 1, title: "Frontend Engineering Intern", type: "Internship", location: "San Francisco, CA", applicants: 42, status: "Active", postedAt: "2026-03-12" },
    { id: 2, title: "DevOps Intern", type: "Internship", location: "Remote", applicants: 28, status: "Active", postedAt: "2026-04-01" },
    { id: 3, title: "Product Design Intern", type: "Internship", location: "San Francisco, CA", applicants: 35, status: "Closed", postedAt: "2026-02-20" },
    { id: 4, title: "Backend Engineer Intern", type: "Internship", location: "Hybrid", applicants: 51, status: "Active", postedAt: "2026-04-15" },
  ],
  4: [
    { id: 1, title: "Data Science Intern", type: "Internship", location: "New York, NY", applicants: 39, status: "In Training", postedAt: "2026-03-01" },
    { id: 2, title: "Analytics Intern", type: "Internship", location: "Remote", applicants: 27, status: "Active", postedAt: "2026-04-10" },
    { id: 3, title: "ML Research Intern", type: "Internship", location: "New York, NY", applicants: 32, status: "Active", postedAt: "2026-04-20" },
  ],
};

export function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);
  const [showActivityDrawer, setShowActivityDrawer] = useState(false);
  const [showApplicationsDrawer, setShowApplicationsDrawer] = useState(false);
  const [showFeedbackDrawer, setShowFeedbackDrawer] = useState(false);
  const [showOpportunitiesDrawer, setShowOpportunitiesDrawer] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [showSendMessageModal, setShowSendMessageModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showBanModal, setShowBanModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [newStatus, setNewStatus] = useState("");
  const [statusReason, setStatusReason] = useState("");
  const [notifyByEmail, setNotifyByEmail] = useState(true);
  const [messageSubject, setMessageSubject] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [suspendReason, setSuspendReason] = useState("");
  const [suspendNote, setSuspendNote] = useState("");
  const [banNote, setBanNote] = useState("");
  const [banReason, setBanReason] = useState("");
  const [banConfirmChecked, setBanConfirmChecked] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [isMessageSending, setIsMessageSending] = useState(false);
  const [messageError, setMessageError] = useState<string | null>(null);

  const [users, setUsers] = useState<UserRecord[]>([
    {
      id: 1,
      name: "Alex Chen",
      email: "alex.c@stanford.edu",
      type: "Student",
      status: "Active",
      university: "Stanford University",
      major: "Computer Science",
      joinedAt: "2026-04-12",
      profileStrength: 92,
      applications: 8,
      interviews: 3,
      feedbackCount: 12,
      lastActivity: "2026-05-22",
      availability: "Available"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@mit.edu",
      type: "Student",
      status: "In Training",
      university: "MIT",
      major: "Data Science",
      joinedAt: "2026-03-20",
      profileStrength: 88,
      applications: 5,
      interviews: 2,
      feedbackCount: 8,
      lastActivity: "2026-05-21",
      availability: "In Training"
    },
    {
      id: 3,
      name: "Stellar Cloud",
      email: "hr@stellarcloud.com",
      type: "Company",
      status: "Verified",
      industry: "Enterprise Software",
      verificationStatus: "Verified",
      joinedAt: "2026-02-15",
      opportunities: 12,
      applicants: 156,
      feedbackCount: 24,
      lastActivity: "2026-05-23"
    },
    {
      id: 4,
      name: "DataPulse",
      email: "jobs@datapulse.com",
      type: "Company",
      status: "Verified",
      industry: "Analytics",
      verificationStatus: "Verified",
      joinedAt: "2026-03-01",
      opportunities: 8,
      applicants: 98,
      feedbackCount: 16,
      lastActivity: "2026-05-22"
    },
    {
      id: 5,
      name: "System Admin",
      email: "admin@internmatch.ai",
      type: "Admin",
      status: "Active",
      role: "Super Admin",
      joinedAt: "2026-01-01",
      lastActivity: "2026-05-23"
    }
  ]);

  const filteredUsers = users.filter(user => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = user.name.toLowerCase().includes(q) || user.email.toLowerCase().includes(q);
    const matchesType = selectedType === "All" || user.type === selectedType;
    return matchesSearch && matchesType;
  });

  const stats = {
    total: users.length,
    students: users.filter(u => u.type === "Student").length,
    companies: users.filter(u => u.type === "Company").length,
    admins: users.filter(u => u.type === "Admin").length
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
      case "Verified":
        return <Badge variant="success">{status}</Badge>;
      case "In Training":
        return <Badge variant="warning">{status}</Badge>;
      case "Suspended":
      case "Banned":
      case "Disabled":
        return <Badge variant="danger">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getUserIcon = (type: string) => {
    switch (type) {
      case "Company": return <Building2 className="w-5 h-5" />;
      case "Admin": return <Shield className="w-5 h-5" />;
      default: return <UsersIcon className="w-5 h-5" />;
    }
  };

  const handleMenuClick = (userId: number) => {
    setOpenMenuId(openMenuId === userId ? null : userId);
  };

  const handleAction = (action: string, user: UserRecord) => {
    setSelectedUser(user);
    setOpenMenuId(null);
    switch (action) {
      case "viewProfile":
        setShowProfileDrawer(true);
        break;
      case "viewActivity":
        setShowActivityDrawer(true);
        break;
      case "viewApplications":
        setShowApplicationsDrawer(true);
        break;
      case "viewFeedback":
        setShowFeedbackDrawer(true);
        break;
      case "viewOpportunities":
        setShowOpportunitiesDrawer(true);
        break;
      case "viewVerification":
        setShowVerificationModal(true);
        break;
      case "changeStatus":
        setNewStatus(user.status);
        setStatusReason("");
        setNotifyByEmail(true);
        setShowChangeStatusModal(true);
        break;
      case "resetPassword":
        setResetSent(false);
        setShowResetPasswordModal(true);
        break;
      case "sendMessage":
        setMessageSubject("");
        setMessageBody("");
        setNotifyByEmail(true);
        setMessageSent(false);
        setIsMessageSending(false);
        setMessageError(null);
        setShowSendMessageModal(true);
        break;
      case "suspend":
        setSuspendReason("");
        setSuspendNote("");
        setNotifyByEmail(true);
        setShowSuspendModal(true);
        break;
      case "ban":
        setBanReason("");
        setBanNote("");
        setBanConfirmChecked(false);
        setShowBanModal(true);
        break;
    }
  };

  const applyUserUpdate = (userId: number, updates: Partial<UserRecord>) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updates } : u));
    setSelectedUser(prev => prev && prev.id === userId ? { ...prev, ...updates } : prev);
  };

  const handleResetPassword = () => {
    setResetSent(true);
    setTimeout(() => setShowResetPasswordModal(false), 1500);
  };

  const handleSendMessage = async () => {
    if (!selectedUser || isMessageSending) return;
    setIsMessageSending(true);
    setMessageError(null);
    // Simulate async dispatch (prototype — synchronous store write with brief loading state)
    await new Promise((resolve) => setTimeout(resolve, 400));
    try {
      addAdminMessage({
        recipientUserId: `user-${selectedUser.id}`,
        senderAdminId: "admin-system",
        senderLabel: "Platform Administration",
        subject: messageSubject,
        body: messageBody,
      });
      setIsMessageSending(false);
      setMessageSent(true);
    } catch {
      setIsMessageSending(false);
      setMessageError("We couldn't send your message. Please try again.");
    }
  };

  const handleChangeStatus = () => {
    if (!selectedUser) return;
    applyUserUpdate(selectedUser.id, { status: newStatus });
    setShowChangeStatusModal(false);
  };

  const handleSuspendUser = () => {
    if (!selectedUser) return;
    applyUserUpdate(selectedUser.id, { status: "Suspended" });
    setShowSuspendModal(false);
  };

  const handleBanUser = () => {
    if (!selectedUser) return;
    applyUserUpdate(selectedUser.id, { status: "Banned" });
    setShowBanModal(false);
  };

  const handleDisableAdmin = () => {
    if (!selectedUser) return;
    applyUserUpdate(selectedUser.id, { status: "Disabled" });
    setShowSuspendModal(false);
  };

  const getMenuActions = (user: UserRecord) => {
    if (user.type === "Student") {
      return [
        { icon: User, label: "View Student Profile", action: "viewProfile" },
        { icon: FileText, label: "View Applications", action: "viewApplications" },
        { icon: Star, label: "View Feedback", action: "viewFeedback" },
        { icon: Activity, label: "View Activity Logs", action: "viewActivity" },
        { divider: true },
        { icon: RefreshCw, label: "Change Status", action: "changeStatus" },
        { icon: Key, label: "Reset Password", action: "resetPassword" },
        { icon: MessageSquare, label: "Send Message", action: "sendMessage" },
        { divider: true },
        { icon: UserX, label: "Suspend Student", action: "suspend", danger: true },
        { icon: Ban, label: "Ban Student", action: "ban", danger: true }
      ];
    } else if (user.type === "Company") {
      return [
        { icon: Building2, label: "View Company Profile", action: "viewProfile" },
        { icon: Briefcase, label: "View Opportunities", action: "viewOpportunities" },
        { icon: CheckCircle2, label: "View Verification Details", action: "viewVerification" },
        { icon: Star, label: "View Feedback", action: "viewFeedback" },
        { icon: Activity, label: "View Activity Logs", action: "viewActivity" },
        { divider: true },
        { icon: RefreshCw, label: "Change Status", action: "changeStatus" },
        { icon: Key, label: "Reset Password", action: "resetPassword" },
        { icon: MessageSquare, label: "Send Message", action: "sendMessage" },
        { divider: true },
        { icon: UserX, label: "Suspend Company", action: "suspend", danger: true },
        { icon: Ban, label: "Ban Company", action: "ban", danger: true }
      ];
    } else {
      return [
        { icon: Shield, label: "View Admin Profile", action: "viewProfile" },
        { icon: Activity, label: "View Activity Logs", action: "viewActivity" },
        { divider: true },
        { icon: RefreshCw, label: "Change Role", action: "changeStatus" },
        { icon: Key, label: "Reset Password", action: "resetPassword" },
        { divider: true },
        { icon: UserX, label: "Disable Admin Account", action: "suspend", danger: true }
      ];
    }
  };

  const appStatusBadge = (status: string) => {
    switch (status) {
      case "Interview": return <Badge variant="blue">{status}</Badge>;
      case "Applied": return <Badge variant="warning">{status}</Badge>;
      case "In Training": return <Badge variant="success">{status}</Badge>;
      case "Rejected": case "Withdrawn": return <Badge variant="danger">{status}</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const oppStatusBadge = (status: string) => {
    switch (status) {
      case "Active": return <Badge variant="success">{status}</Badge>;
      case "In Training": return <Badge variant="blue">{status}</Badge>;
      case "Closed": return <Badge variant="outline">{status}</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Transparent overlay to close open menus */}
      {openMenuId !== null && (
        <div className="fixed inset-0 z-40" onClick={() => setOpenMenuId(null)} />
      )}

      <div>
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="text-[var(--text-muted)]">Manage students, companies, and administrators.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <UsersIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)]">Total Users</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <UsersIcon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)]">Students</p>
                <p className="text-2xl font-bold">{stats.students}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Building2 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)]">Companies</p>
                <p className="text-2xl font-bold">{stats.companies}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 dark:bg-yellow-900/30 rounded-lg">
                <Shield className="w-5 h-5 text-amber-700 dark:text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)]">Admins</p>
                <p className="text-2xl font-bold">{stats.admins}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users by name or email..."
                className="pl-10"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="border rounded-md px-3 py-2 bg-transparent border-[var(--border-main)]"
            >
              <option>All</option>
              <option>Student</option>
              <option>Company</option>
              <option>Admin</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="space-y-3">
        <h3 className="font-bold">{filteredUsers.length} Users</h3>
        {filteredUsers.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center text-[var(--text-muted)]">
              No users match your search.
            </CardContent>
          </Card>
        )}
        {filteredUsers.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg flex-shrink-0">
                    {getUserIcon(user.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h4 className="font-bold">{user.name}</h4>
                      <Badge variant="outline" className="text-xs">{user.type}</Badge>
                      {getStatusBadge(user.status)}
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-[var(--text-muted)]">
                      <span>{user.email}</span>
                      <span>•</span>
                      <span>
                        {user.type === "Student" && user.university}
                        {user.type === "Company" && user.industry}
                        {user.type === "Admin" && user.role}
                      </span>
                      <span>•</span>
                      <span>Joined: {user.joinedAt}</span>
                    </div>
                  </div>
                </div>

                <div className="relative z-50 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2"
                    aria-label={`Actions for ${user.name}`}
                    aria-expanded={openMenuId === user.id}
                    onClick={() => handleMenuClick(user.id)}
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>

                  {openMenuId === user.id && (
                    <div className="absolute right-0 top-full mt-1 w-56 bg-[var(--bg-card)] border border-[var(--border-main)] rounded-lg shadow-lg z-50">
                      <div className="p-2">
                        <div className="px-3 py-2 text-xs font-semibold text-[var(--text-muted)] border-b border-[var(--border-main)] mb-1">
                          User Actions
                        </div>
                        {getMenuActions(user).map((item, idx) => {
                          if ("divider" in item) {
                            return <div key={idx} className="border-b border-[var(--border-main)] my-1" />;
                          }
                          return (
                            <button
                              key={idx}
                              onClick={() => handleAction(item.action, user)}
                              className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-[var(--hover-bg)] transition-colors ${
                                item.danger ? "text-red-600" : ""
                              }`}
                            >
                              <item.icon className="w-4 h-4 flex-shrink-0" />
                              {item.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Profile Drawer ── */}
      {showProfileDrawer && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end" onClick={() => setShowProfileDrawer(false)}>
          <div className="w-full max-w-2xl bg-[var(--bg-card)] h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-[var(--bg-card)] border-b border-[var(--border-main)] p-6 flex justify-between items-start z-10">
              <div>
                <h2 className="text-2xl font-bold">
                  {selectedUser.type === "Student" && "Student Profile"}
                  {selectedUser.type === "Company" && "Company Profile"}
                  {selectedUser.type === "Admin" && "Admin Profile"}
                </h2>
                <p className="text-[var(--text-muted)] text-sm">{selectedUser.name} — read-only view</p>
              </div>
              <button onClick={() => setShowProfileDrawer(false)} className="p-2 hover:bg-[var(--hover-bg)] rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4">Basic Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between"><span className="text-[var(--text-muted)]">Name</span><span className="font-medium">{selectedUser.name}</span></div>
                    <div className="flex justify-between"><span className="text-[var(--text-muted)]">Email</span><span className="font-medium">{selectedUser.email}</span></div>
                    <div className="flex justify-between"><span className="text-[var(--text-muted)]">Role</span><Badge variant="outline">{selectedUser.type}</Badge></div>
                    {selectedUser.type === "Student" && (
                      <>
                        <div className="flex justify-between"><span className="text-[var(--text-muted)]">University</span><span className="font-medium">{selectedUser.university}</span></div>
                        <div className="flex justify-between"><span className="text-[var(--text-muted)]">Major</span><span className="font-medium">{selectedUser.major}</span></div>
                        <div className="flex justify-between"><span className="text-[var(--text-muted)]">Availability</span><span className="font-medium">{selectedUser.availability}</span></div>
                      </>
                    )}
                    {selectedUser.type === "Company" && (
                      <>
                        <div className="flex justify-between"><span className="text-[var(--text-muted)]">Industry</span><span className="font-medium">{selectedUser.industry}</span></div>
                        <div className="flex justify-between"><span className="text-[var(--text-muted)]">Verification</span>{getStatusBadge(selectedUser.verificationStatus || "Pending")}</div>
                      </>
                    )}
                    {selectedUser.type === "Admin" && (
                      <div className="flex justify-between"><span className="text-[var(--text-muted)]">Role Level</span><span className="font-medium">{selectedUser.role}</span></div>
                    )}
                    <div className="flex justify-between"><span className="text-[var(--text-muted)]">Status</span>{getStatusBadge(selectedUser.status)}</div>
                    <div className="flex justify-between"><span className="text-[var(--text-muted)]">Joined</span><span className="font-medium">{selectedUser.joinedAt}</span></div>
                    <div className="flex justify-between"><span className="text-[var(--text-muted)]">Last Activity</span><span className="font-medium">{selectedUser.lastActivity}</span></div>
                  </div>
                </CardContent>
              </Card>

              {selectedUser.type === "Student" && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-4">Activity Overview</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-[var(--bg-secondary)] rounded-lg"><p className="text-sm text-[var(--text-muted)]">Profile Strength</p><p className="text-2xl font-bold">{selectedUser.profileStrength}%</p></div>
                      <div className="p-4 bg-[var(--bg-secondary)] rounded-lg"><p className="text-sm text-[var(--text-muted)]">Applications</p><p className="text-2xl font-bold">{selectedUser.applications}</p></div>
                      <div className="p-4 bg-[var(--bg-secondary)] rounded-lg"><p className="text-sm text-[var(--text-muted)]">Interviews</p><p className="text-2xl font-bold">{selectedUser.interviews}</p></div>
                      <div className="p-4 bg-[var(--bg-secondary)] rounded-lg"><p className="text-sm text-[var(--text-muted)]">Feedback</p><p className="text-2xl font-bold">{selectedUser.feedbackCount}</p></div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {selectedUser.type === "Company" && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-4">Activity Overview</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-[var(--bg-secondary)] rounded-lg"><p className="text-sm text-[var(--text-muted)]">Opportunities</p><p className="text-2xl font-bold">{selectedUser.opportunities}</p></div>
                      <div className="p-4 bg-[var(--bg-secondary)] rounded-lg"><p className="text-sm text-[var(--text-muted)]">Applicants</p><p className="text-2xl font-bold">{selectedUser.applicants}</p></div>
                      <div className="p-4 bg-[var(--bg-secondary)] rounded-lg"><p className="text-sm text-[var(--text-muted)]">Feedback</p><p className="text-2xl font-bold">{selectedUser.feedbackCount}</p></div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex gap-3">
                <Button onClick={() => { setShowProfileDrawer(false); handleAction("sendMessage", selectedUser); }}>Send Message</Button>
                <Button variant="outline" onClick={() => { setShowProfileDrawer(false); handleAction("changeStatus", selectedUser); }}>Change Status</Button>
                <Button variant="outline" onClick={() => setShowProfileDrawer(false)}>Close</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Activity Logs Drawer ── */}
      {showActivityDrawer && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end" onClick={() => setShowActivityDrawer(false)}>
          <div className="w-full max-w-2xl bg-[var(--bg-card)] h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-[var(--bg-card)] border-b border-[var(--border-main)] p-6 flex justify-between items-start z-10">
              <div>
                <h2 className="text-2xl font-bold">Activity Logs</h2>
                <p className="text-[var(--text-muted)] text-sm">{selectedUser.name} — {selectedUser.email}</p>
              </div>
              <button onClick={() => setShowActivityDrawer(false)} className="p-2 hover:bg-[var(--hover-bg)] rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {selectedUser.type === "Student" && (
                <>
                  <div className="flex gap-4 p-4 border-l-4 border-green-500 bg-[var(--bg-secondary)] rounded-r-lg">
                    <div className="flex-1"><p className="font-medium">Account created</p><p className="text-sm text-[var(--text-muted)]">Student joined the platform</p></div>
                    <span className="text-sm text-[var(--text-muted)] whitespace-nowrap">{selectedUser.joinedAt}</span>
                  </div>
                  <div className="flex gap-4 p-4 border-l-4 border-blue-500 bg-[var(--bg-secondary)] rounded-r-lg">
                    <div className="flex-1"><p className="font-medium">Applied to Frontend Engineering Intern</p><p className="text-sm text-[var(--text-muted)]">Application submitted at Stellar Cloud</p></div>
                    <span className="text-sm text-[var(--text-muted)] whitespace-nowrap">May 14, 2026</span>
                  </div>
                  <div className="flex gap-4 p-4 border-l-4 border-blue-500 bg-[var(--bg-secondary)] rounded-r-lg">
                    <div className="flex-1"><p className="font-medium">Interview invitation accepted</p><p className="text-sm text-[var(--text-muted)]">Frontend Engineering Intern — Stellar Cloud</p></div>
                    <span className="text-sm text-[var(--text-muted)] whitespace-nowrap">May 16, 2026</span>
                  </div>
                  <div className="flex gap-4 p-4 border-l-4 border-purple-500 bg-[var(--bg-secondary)] rounded-r-lg">
                    <div className="flex-1"><p className="font-medium">Interview scheduled</p><p className="text-sm text-[var(--text-muted)]">Technical interview scheduled for May 25, 2026</p></div>
                    <span className="text-sm text-[var(--text-muted)] whitespace-nowrap">May 18, 2026</span>
                  </div>
                </>
              )}
              {selectedUser.type === "Company" && (
                <>
                  <div className="flex gap-4 p-4 border-l-4 border-green-500 bg-[var(--bg-secondary)] rounded-r-lg">
                    <div className="flex-1"><p className="font-medium">Company account created</p><p className="text-sm text-[var(--text-muted)]">Verification process initiated</p></div>
                    <span className="text-sm text-[var(--text-muted)] whitespace-nowrap">{selectedUser.joinedAt}</span>
                  </div>
                  <div className="flex gap-4 p-4 border-l-4 border-green-500 bg-[var(--bg-secondary)] rounded-r-lg">
                    <div className="flex-1"><p className="font-medium">Company verified</p><p className="text-sm text-[var(--text-muted)]">Account approved by admin</p></div>
                    <span className="text-sm text-[var(--text-muted)] whitespace-nowrap">Feb 16, 2026</span>
                  </div>
                  <div className="flex gap-4 p-4 border-l-4 border-blue-500 bg-[var(--bg-secondary)] rounded-r-lg">
                    <div className="flex-1"><p className="font-medium">Published Frontend Engineering Intern</p><p className="text-sm text-[var(--text-muted)]">New opportunity posted</p></div>
                    <span className="text-sm text-[var(--text-muted)] whitespace-nowrap">Mar 12, 2026</span>
                  </div>
                </>
              )}
              {selectedUser.type === "Admin" && (
                <>
                  <div className="flex gap-4 p-4 border-l-4 border-green-500 bg-[var(--bg-secondary)] rounded-r-lg">
                    <div className="flex-1"><p className="font-medium">Admin account created</p><p className="text-sm text-[var(--text-muted)]">Full admin privileges granted</p></div>
                    <span className="text-sm text-[var(--text-muted)] whitespace-nowrap">{selectedUser.joinedAt}</span>
                  </div>
                  <div className="flex gap-4 p-4 border-l-4 border-purple-500 bg-[var(--bg-secondary)] rounded-r-lg">
                    <div className="flex-1"><p className="font-medium">Verified company account</p><p className="text-sm text-[var(--text-muted)]">Approved Stellar Cloud verification</p></div>
                    <span className="text-sm text-[var(--text-muted)] whitespace-nowrap">Feb 16, 2026</span>
                  </div>
                  <div className="flex gap-4 p-4 border-l-4 border-blue-500 bg-[var(--bg-secondary)] rounded-r-lg">
                    <div className="flex-1"><p className="font-medium">Status override applied</p><p className="text-sm text-[var(--text-muted)]">Student Alex Chen status updated</p></div>
                    <span className="text-sm text-[var(--text-muted)] whitespace-nowrap">May 02, 2026</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Applications Drawer (Student only) ── */}
      {showApplicationsDrawer && selectedUser && selectedUser.type === "Student" && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end" onClick={() => setShowApplicationsDrawer(false)}>
          <div className="w-full max-w-2xl bg-[var(--bg-card)] h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-[var(--bg-card)] border-b border-[var(--border-main)] p-6 flex justify-between items-start z-10">
              <div>
                <h2 className="text-2xl font-bold">Applications</h2>
                <p className="text-[var(--text-muted)] text-sm">{selectedUser.name} — {selectedUser.university}</p>
              </div>
              <button onClick={() => setShowApplicationsDrawer(false)} className="p-2 hover:bg-[var(--hover-bg)] rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-3">
              {(MOCK_APPLICATIONS[selectedUser.id] || []).length === 0 ? (
                <p className="text-[var(--text-muted)] text-center py-8">No applications on record.</p>
              ) : (
                (MOCK_APPLICATIONS[selectedUser.id] || []).map((app) => (
                  <Card key={app.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold">{app.role}</p>
                          <div className="flex items-center gap-2 mt-1 text-sm text-[var(--text-muted)]">
                            <Building2 className="w-3.5 h-3.5" />
                            <span>{app.company}</span>
                            <span>•</span>
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{app.appliedAt}</span>
                          </div>
                          <p className="text-xs text-[var(--text-muted)] mt-1">Stage: {app.stage}</p>
                        </div>
                        {appStatusBadge(app.status)}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Feedback Drawer (Student & Company) ── */}
      {showFeedbackDrawer && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end" onClick={() => setShowFeedbackDrawer(false)}>
          <div className="w-full max-w-2xl bg-[var(--bg-card)] h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-[var(--bg-card)] border-b border-[var(--border-main)] p-6 flex justify-between items-start z-10">
              <div>
                <h2 className="text-2xl font-bold">Feedback</h2>
                <p className="text-[var(--text-muted)] text-sm">{selectedUser.name}</p>
              </div>
              <button onClick={() => setShowFeedbackDrawer(false)} className="p-2 hover:bg-[var(--hover-bg)] rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-3">
              {(() => {
                const items = selectedUser.type === "Student"
                  ? (MOCK_STUDENT_FEEDBACK[selectedUser.id] || [])
                  : (MOCK_COMPANY_FEEDBACK[selectedUser.id] || []);
                if (items.length === 0) return <p className="text-[var(--text-muted)] text-center py-8">No feedback on record.</p>;
                return items.map((fb) => (
                  <Card key={fb.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${fb.positive ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"}`}>
                          {fb.positive ? <ThumbsUp className="w-3.5 h-3.5 text-green-600" /> : <ThumbsDown className="w-3.5 h-3.5 text-red-600" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <p className="font-medium text-sm">{fb.from}</p>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className={`w-3 h-3 ${i < fb.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                              ))}
                            </div>
                          </div>
                          {"role" in fb && <p className="text-xs text-[var(--text-muted)] mb-1">{(fb as { role: string }).role}</p>}
                          <p className="text-sm">{fb.comment}</p>
                          <p className="text-xs text-[var(--text-muted)] mt-1">{fb.date}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ));
              })()}
            </div>
          </div>
        </div>
      )}

      {/* ── Opportunities Drawer (Company only) ── */}
      {showOpportunitiesDrawer && selectedUser && selectedUser.type === "Company" && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end" onClick={() => setShowOpportunitiesDrawer(false)}>
          <div className="w-full max-w-2xl bg-[var(--bg-card)] h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-[var(--bg-card)] border-b border-[var(--border-main)] p-6 flex justify-between items-start z-10">
              <div>
                <h2 className="text-2xl font-bold">Opportunities</h2>
                <p className="text-[var(--text-muted)] text-sm">{selectedUser.name} — {selectedUser.industry}</p>
              </div>
              <button onClick={() => setShowOpportunitiesDrawer(false)} className="p-2 hover:bg-[var(--hover-bg)] rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-3">
              {(MOCK_OPPORTUNITIES[selectedUser.id] || []).length === 0 ? (
                <p className="text-[var(--text-muted)] text-center py-8">No opportunities on record.</p>
              ) : (
                (MOCK_OPPORTUNITIES[selectedUser.id] || []).map((opp) => (
                  <Card key={opp.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold">{opp.title}</p>
                          <div className="flex items-center gap-3 mt-1 text-sm text-[var(--text-muted)] flex-wrap">
                            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{opp.location}</span>
                            <span className="flex items-center gap-1"><UsersIcon className="w-3.5 h-3.5" />{opp.applicants} applicants</span>
                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{opp.postedAt}</span>
                          </div>
                        </div>
                        {oppStatusBadge(opp.status)}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Verification Details Modal (Company only) ── */}
      {showVerificationModal && selectedUser && selectedUser.type === "Company" && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setShowVerificationModal(false)}>
          <div className="bg-[var(--bg-card)] rounded-lg max-w-lg w-full max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-[var(--bg-card)] border-b border-[var(--border-main)] p-6 flex justify-between items-start z-10">
              <div>
                <h3 className="text-xl font-bold">Verification Details</h3>
                <p className="text-sm text-[var(--text-muted)]">{selectedUser.name}</p>
              </div>
              <button onClick={() => setShowVerificationModal(false)} className="p-1 hover:bg-[var(--hover-bg)] rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-green-700 dark:text-green-400">Verified Company</p>
                  <p className="text-sm text-green-600 dark:text-green-500">This company has passed all verification checks.</p>
                </div>
              </div>
              <Card>
                <CardContent className="p-4 space-y-3">
                  <h4 className="font-semibold text-sm">Verification Summary</h4>
                  <div className="flex justify-between"><span className="text-[var(--text-muted)] text-sm">Company Name</span><span className="font-medium text-sm">{selectedUser.name}</span></div>
                  <div className="flex justify-between"><span className="text-[var(--text-muted)] text-sm">Industry</span><span className="font-medium text-sm">{selectedUser.industry}</span></div>
                  <div className="flex justify-between"><span className="text-[var(--text-muted)] text-sm">Verification Status</span>{getStatusBadge(selectedUser.verificationStatus || "Pending")}</div>
                  <div className="flex justify-between"><span className="text-[var(--text-muted)] text-sm">Verified On</span><span className="font-medium text-sm">Feb 16, 2026</span></div>
                  <div className="flex justify-between"><span className="text-[var(--text-muted)] text-sm">Reviewed By</span><span className="font-medium text-sm">System Admin</span></div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 space-y-3">
                  <h4 className="font-semibold text-sm">Submitted Documents</h4>
                  {["Business Registration Certificate", "Tax Identification Document", "Company Profile / Website"].map((doc) => (
                    <div key={doc} className="flex items-center gap-2 text-sm">
                      <CheckSquare className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <div className="flex justify-end pt-2">
                <Button variant="outline" onClick={() => setShowVerificationModal(false)}>Close</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Change Status Modal ── */}
      {showChangeStatusModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setShowChangeStatusModal(false)}>
          <div className="bg-[var(--bg-card)] rounded-lg max-w-md w-full p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">
                  {selectedUser.type === "Admin" ? "Change Admin Role" : "Change User Status"}
                </h3>
                <p className="text-sm text-[var(--text-muted)]">
                  {selectedUser.type === "Admin" ? "Update the role for this admin account." : "Update the status for this user."}
                </p>
              </div>
              <button onClick={() => setShowChangeStatusModal(false)} className="p-1 hover:bg-[var(--hover-bg)] rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <Card>
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">User</span><span className="font-medium">{selectedUser.name}</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Email</span><span className="text-sm">{selectedUser.email}</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Current Status</span>{getStatusBadge(selectedUser.status)}</div>
              </CardContent>
            </Card>
            <div className="space-y-2">
              <label className="text-sm font-medium">New Status</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)]"
              >
                {selectedUser.type === "Student" && (
                  <>
                    <option>Active</option>
                    <option>In Training</option>
                    <option>Suspended</option>
                    <option>Banned</option>
                  </>
                )}
                {selectedUser.type === "Company" && (
                  <>
                    <option>Verified</option>
                    <option>Pending Review</option>
                    <option>Suspended</option>
                    <option>Banned</option>
                  </>
                )}
                {selectedUser.type === "Admin" && (
                  <>
                    <option>Active</option>
                    <option>Disabled</option>
                  </>
                )}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Reason for change <span className="text-red-500">*</span></label>
              <textarea
                value={statusReason}
                onChange={(e) => setStatusReason(e.target.value)}
                placeholder="Enter reason for this change..."
                className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)] min-h-[80px]"
              />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={notifyByEmail} onChange={(e) => setNotifyByEmail(e.target.checked)} className="w-4 h-4" />
              <span className="text-sm">Notify user by email</span>
            </label>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowChangeStatusModal(false)} className="flex-1">Cancel</Button>
              <Button onClick={handleChangeStatus} className="flex-1" disabled={!statusReason.trim()}>Save Change</Button>
            </div>
          </div>
        </div>
      )}

      {/* ── Reset Password Modal ── */}
      {showResetPasswordModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setShowResetPasswordModal(false)}>
          <div className="bg-[var(--bg-card)] rounded-lg max-w-md w-full p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            {resetSent ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <p className="font-semibold">Reset link sent</p>
                <p className="text-sm text-[var(--text-muted)]">A password reset email was sent to {selectedUser.email}.</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">Send Password Reset?</h3>
                    <p className="text-sm text-[var(--text-muted)]">A reset link will be sent to this user's registered email address.</p>
                  </div>
                  <button onClick={() => setShowResetPasswordModal(false)} className="p-1 hover:bg-[var(--hover-bg)] rounded">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <Card>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex justify-between"><span className="text-[var(--text-muted)]">Name</span><span className="font-medium">{selectedUser.name}</span></div>
                    <div className="flex justify-between"><span className="text-[var(--text-muted)]">Email</span><span className="text-sm">{selectedUser.email}</span></div>
                  </CardContent>
                </Card>
                <div className="flex gap-3 pt-2">
                  <Button variant="outline" onClick={() => setShowResetPasswordModal(false)} className="flex-1">Cancel</Button>
                  <Button onClick={handleResetPassword} className="flex-1">Send Reset Link</Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Send Message Modal ── */}
      {showSendMessageModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => { if (!isMessageSending) setShowSendMessageModal(false); }}>
          <div className="bg-[var(--bg-card)] rounded-lg max-w-md w-full p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            {messageSent ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <p className="font-semibold">Message sent</p>
                <p className="text-sm text-[var(--text-muted)]">
                  Message sent to {selectedUser.name}'s notifications.
                </p>
                <Button variant="outline" onClick={() => setShowSendMessageModal(false)} className="w-full mt-2">
                  Close
                </Button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">Send Message</h3>
                    <p className="text-sm text-[var(--text-muted)]">
                      To: <span className="font-medium text-[var(--text-main)]">{selectedUser.name}</span>
                      {" "}· {selectedUser.type}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowSendMessageModal(false)}
                    disabled={isMessageSending}
                    className="p-1 hover:bg-[var(--hover-bg)] rounded disabled:opacity-50"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Delivery notice */}
                <p className="text-sm text-[var(--text-muted)] bg-[var(--bg-secondary)] rounded-lg px-3 py-2">
                  This message will appear as an important admin notification in this user's account.
                </p>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject <span className="text-red-500">*</span></label>
                  <input
                    value={messageSubject}
                    onChange={(e) => setMessageSubject(e.target.value)}
                    placeholder="Message subject..."
                    disabled={isMessageSending}
                    className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)] disabled:opacity-60"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message <span className="text-red-500">*</span></label>
                  <textarea
                    value={messageBody}
                    onChange={(e) => setMessageBody(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isMessageSending}
                    className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)] min-h-[120px] disabled:opacity-60"
                  />
                </div>

                {/* Inline error — preserved content on failure */}
                {messageError && (
                  <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800 dark:text-red-300">{messageError}</p>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowSendMessageModal(false)}
                    disabled={isMessageSending}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    className="flex-1"
                    disabled={!messageSubject.trim() || !messageBody.trim() || isMessageSending}
                  >
                    {isMessageSending ? "Sending…" : "Send Message"}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Suspend Modal ── */}
      {showSuspendModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setShowSuspendModal(false)}>
          <div className="bg-[var(--bg-card)] rounded-lg max-w-md w-full p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-amber-700 dark:text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold">
                  {selectedUser.type === "Admin" ? "Disable Admin Account?" : "Suspend User?"}
                </h3>
                <p className="text-sm text-[var(--text-muted)]">
                  {selectedUser.type === "Admin"
                    ? "This admin will lose access to the admin portal until re-enabled."
                    : "This user will lose access to platform actions until reactivated."}
                </p>
              </div>
              <button onClick={() => setShowSuspendModal(false)} className="p-1 hover:bg-[var(--hover-bg)] rounded h-fit">
                <X className="w-5 h-5" />
              </button>
            </div>
            <Card>
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">User</span><span className="font-medium">{selectedUser.name}</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Role</span><Badge variant="outline">{selectedUser.type}</Badge></div>
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Current Status</span>{getStatusBadge(selectedUser.status)}</div>
              </CardContent>
            </Card>
            <div className="space-y-2">
              <label className="text-sm font-medium">Reason <span className="text-red-500">*</span></label>
              <select
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)]"
              >
                <option value="">Select reason...</option>
                <option>Policy violation</option>
                <option>Suspicious activity</option>
                <option>Inappropriate feedback</option>
                <option>Company misuse</option>
                <option>Student misuse</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Admin note <span className="text-red-500">*</span></label>
              <textarea
                value={suspendNote}
                onChange={(e) => setSuspendNote(e.target.value)}
                placeholder="Provide details about this suspension..."
                className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)] min-h-[80px]"
              />
            </div>
            {selectedUser.type !== "Admin" && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={notifyByEmail} onChange={(e) => setNotifyByEmail(e.target.checked)} className="w-4 h-4" />
                <span className="text-sm">Notify user</span>
              </label>
            )}
            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowSuspendModal(false)} className="flex-1">Cancel</Button>
              <Button
                onClick={selectedUser.type === "Admin" ? handleDisableAdmin : handleSuspendUser}
                className="flex-1 bg-amber-700 text-white hover:bg-amber-800 dark:bg-yellow-700 dark:hover:bg-yellow-800"
                disabled={!suspendReason || !suspendNote.trim()}
              >
                {selectedUser.type === "Admin" ? "Disable Account" : "Suspend User"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── Ban Modal ── */}
      {showBanModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setShowBanModal(false)}>
          <div className="bg-[var(--bg-card)] rounded-lg max-w-md w-full p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                <Ban className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-red-600">Ban User?</h3>
                <p className="text-sm text-[var(--text-muted)]">This is a permanent action. The user will be blocked from all platform activity.</p>
              </div>
              <button onClick={() => setShowBanModal(false)} className="p-1 hover:bg-[var(--hover-bg)] rounded h-fit">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Reason <span className="text-red-500">*</span></label>
              <select
                value={banReason}
                onChange={(e) => setBanReason(e.target.value)}
                className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)]"
              >
                <option value="">Select reason...</option>
                <option>Severe policy violation</option>
                <option>Fraudulent activity</option>
                <option>Harassment or abuse</option>
                <option>Multiple suspensions</option>
                <option>Legal compliance</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Admin note <span className="text-red-500">*</span></label>
              <textarea
                value={banNote}
                onChange={(e) => setBanNote(e.target.value)}
                placeholder="Provide detailed justification for banning this user..."
                className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)] min-h-[80px]"
              />
            </div>
            <label className="flex items-start gap-2 cursor-pointer p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <input type="checkbox" checked={banConfirmChecked} onChange={(e) => setBanConfirmChecked(e.target.checked)} className="w-4 h-4 mt-0.5" />
              <span className="text-sm font-medium">I understand this will permanently block this user account.</span>
            </label>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowBanModal(false)} className="flex-1">Cancel</Button>
              <Button
                onClick={handleBanUser}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                disabled={!banReason || !banNote.trim() || !banConfirmChecked}
              >
                Ban User
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
