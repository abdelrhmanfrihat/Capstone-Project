import React from "react";
import { Outlet } from "react-router";
import { DashboardLayout } from "../layouts/DashboardLayout";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Trello,
  Calendar,
  Star,
  BarChart3,
} from "lucide-react";
import { MOCK_COMPANIES } from "../data/mockData";

export function CompanyPortal() {
  const company = MOCK_COMPANIES[0];

  const navItems = [
    { label: "Dashboard",     href: "/company/dashboard",     icon: LayoutDashboard },
    { label: "Opportunities", href: "/company/opportunities", icon: Briefcase },
    { label: "Candidates",    href: "/company/candidates",    icon: Users },
    { label: "Pipeline",      href: "/company/pipeline",      icon: Trello },
    { label: "Interviews",    href: "/company/interviews",    icon: Calendar },
    { label: "Feedback",      href: "/company/feedback",      icon: Star },
    { label: "Insights",      href: "/company/insights",      icon: BarChart3 },
  ];

  return (
    <DashboardLayout 
      userType="Company" 
      userName={company.name} 
      userAvatar={company.logo}
      navItems={navItems}
    >
      <Outlet />
    </DashboardLayout>
  );
}
