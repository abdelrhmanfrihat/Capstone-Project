import React from "react";
import { Outlet } from "react-router";
import { DashboardLayout } from "../layouts/DashboardLayout";
import {
  LayoutDashboard,
  ShieldCheck,
  Users,
  HelpCircle,
  Tags,
  Unlock,
  MessageSquare,
  History,
} from "lucide-react";

export function AdminPortal() {
  // Notifications removed — bell in AdminHeader navigates to /admin/notifications.
  // Settings removed — accessible from the bottom account menu.
  const navItems = [
    { label: "Dashboard",           href: "/admin/dashboard",           icon: LayoutDashboard },
    { label: "Company Verification", href: "/admin/verification",        icon: ShieldCheck },
    { label: "Users",               href: "/admin/users",               icon: Users },
    { label: "Assessment Questions", href: "/admin/questions",           icon: HelpCircle },
    { label: "Categories & Skills", href: "/admin/skills",              icon: Tags },
    { label: "Status Override",     href: "/admin/override",            icon: Unlock },
    { label: "Feedback Moderation", href: "/admin/feedback-moderation", icon: MessageSquare },
    { label: "Audit Logs",          href: "/admin/logs",                icon: History },
  ];

  return (
    <DashboardLayout 
      userType="Admin" 
      userName="System Admin" 
      navItems={navItems}
    >
      <Outlet />
    </DashboardLayout>
  );
}
