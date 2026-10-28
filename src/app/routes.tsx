import { createBrowserRouter, Navigate } from "react-router";

// Portals
import { StudentPortal } from "./portals/StudentPortal";
import { CompanyPortal } from "./portals/CompanyPortal";
import { AdminPortal } from "./portals/AdminPortal";

// Public
import { Landing } from "./pages/Landing";

// Auth
import { Login } from "./pages/Login";
import { CompanyRegister } from "./pages/CompanyRegister";

// Student Assessment
import { StudentAssessment, ProfileGenerated } from "./pages/student/Assessment";

import { StudentFeedback } from "./pages/student/Feedback";
import { RateCompany } from "./pages/student/RateCompany";
import { StudentProfile } from "./pages/student/Profile";
import { StudentInvitations } from "./pages/student/Invitations";
import { MyActivity } from "./pages/student/MyActivity";
import { StudentNotifications } from "./pages/student/NotificationsPage";
import { StudentSettings } from "./pages/student/SettingsPage";

// Student Pages
import { StudentDashboard } from "./pages/student/Dashboard";
import { StudentOpportunities } from "./pages/student/Opportunities";
import { StudentCompanies } from "./pages/student/Companies";
import { StudentCompanyProfile } from "./pages/student/CompanyProfile";
import { StudentApplications } from "./pages/student/Applications";
import { AIMatches } from "./pages/student/AIMatches";
import { UpdateProfile } from "./pages/student/UpdateProfile";

// Company Pages
import { CompanyDashboard } from "./pages/company/Dashboard";
import { RecruitmentPipeline } from "./pages/company/RecruitmentPipeline";
import { CompanyOpportunities } from "./pages/company/Opportunities";
import { CreateOpportunity } from "./pages/company/CreateOpportunity";
import { CompanyCandidates } from "./pages/company/Candidates";
import { StudentProfile as CompanyStudentProfile } from "./pages/company/StudentProfile";
import { FeedbackCenter } from "./pages/company/FeedbackCenter";
import { CompanyInterviews } from "./pages/company/Interviews";
import { CompanyInsights } from "./pages/company/Insights";
import { CompanyNotifications } from "./pages/company/NotificationsPage";
import { CompanySettings } from "./pages/company/SettingsPage";
import { CompanyProfile } from "./pages/company/CompanyProfile";

// Admin Pages
import { AdminDashboard } from "./pages/admin/Dashboard";
import { AdminStatusOverride } from "./pages/admin/Override";
import { AdminVerification } from "./pages/admin/Verification";
import { AdminUsers } from "./pages/admin/Users";
import { AdminQuestions } from "./pages/admin/Questions";
import { AdminSkills } from "./pages/admin/Skills";
import { AdminFeedbackModeration } from "./pages/admin/FeedbackModeration";
import { AdminLogs } from "./pages/admin/Logs";
import { AdminNotifications } from "./pages/admin/NotificationsPage";
import { AdminSettings } from "./pages/admin/SettingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Navigate to="/student/login" replace />,
  },
  {
    path: "/student/login",
    element: <Login role="student" />,
  },
  {
    path: "/company/login",
    element: <Login role="company" />,
  },
  {
    path: "/admin/login",
    element: <Login role="admin" />,
  },
  { path: "/auth/student/login", element: <Navigate to="/student/login" replace /> },
  { path: "/auth/company/login", element: <Navigate to="/company/login" replace /> },
  { path: "/auth/admin/login", element: <Navigate to="/admin/login" replace /> },
  {
    path: "/register/company",
    element: <CompanyRegister />,
  },
  {
    path: "/student/assessment",
    element: <StudentAssessment />,
  },
  {
    path: "/student/profile-generated",
    element: <ProfileGenerated />,
  },
  {
    path: "/student",
    element: <StudentPortal />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <StudentDashboard /> },
      { path: "opportunities", element: <StudentOpportunities /> },
      { path: "companies", element: <StudentCompanies /> },
      { path: "companies/:id", element: <StudentCompanyProfile /> },
      { path: "applications", element: <Navigate to="/student/my-activity?tab=applications" replace /> },
      { path: "ai-matches", element: <AIMatches /> },
      { path: "update-profile", element: <UpdateProfile /> },
      { path: "invitations", element: <Navigate to="/student/my-activity?tab=invitations" replace /> },
      { path: "my-activity", element: <MyActivity /> },
      { path: "feedback", element: <StudentFeedback /> },
      { path: "rate-company", element: <RateCompany /> },
      { path: "profile", element: <StudentProfile /> },
      { path: "insights", element: <Navigate to="/student/dashboard" replace /> },
      { path: "notifications", element: <StudentNotifications /> },
      { path: "settings", element: <StudentSettings /> },
      { path: "*", element: <div>Student Page Placeholder</div> }
    ]
  },
  {
    path: "/company",
    element: <CompanyPortal />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <CompanyDashboard /> },
      { path: "opportunities", element: <CompanyOpportunities /> },
      { path: "opportunities/create", element: <CreateOpportunity /> },
      { path: "candidates", element: <CompanyCandidates /> },
      { path: "candidates/:id", element: <CompanyStudentProfile /> },
      { path: "pipeline", element: <RecruitmentPipeline /> },
      { path: "interviews", element: <CompanyInterviews /> },
      { path: "feedback", element: <FeedbackCenter /> },
      { path: "insights", element: <CompanyInsights /> },
      { path: "profile", element: <CompanyProfile /> },
      { path: "notifications", element: <CompanyNotifications /> },
      { path: "settings", element: <CompanySettings /> },
      { path: "*", element: <div>Company Page Placeholder</div> }
    ]
  },
  {
    path: "/admin",
    element: <AdminPortal />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "verification", element: <AdminVerification /> },
      { path: "users", element: <AdminUsers /> },
      { path: "questions", element: <AdminQuestions /> },
      { path: "skills", element: <AdminSkills /> },
      { path: "override", element: <AdminStatusOverride /> },
      { path: "feedback-moderation", element: <AdminFeedbackModeration /> },
      { path: "logs", element: <AdminLogs /> },
      { path: "notifications", element: <AdminNotifications /> },
      { path: "settings", element: <AdminSettings /> },
      { path: "*", element: <div>Admin Page Placeholder</div> }
    ]
  }
]);
