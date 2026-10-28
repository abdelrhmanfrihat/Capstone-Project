import React from "react";
import { Outlet } from "react-router";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { LayoutDashboard, Briefcase, ListTodo, Star, Building2 } from "lucide-react";
import { MOCK_STUDENTS } from "../data/mockData";

export function StudentPortal() {
  const student = MOCK_STUDENTS[0];

  const navItems = [
    { label: "Dashboard",    href: "/student/dashboard",    icon: LayoutDashboard },
    { label: "Companies",    href: "/student/companies",    icon: Building2 },
    { label: "Opportunities", href: "/student/opportunities", icon: Briefcase },
    { label: "My Activity",  href: "/student/my-activity",  icon: ListTodo },
    { label: "Feedback",     href: "/student/feedback",     icon: Star },
  ];

  return (
    <DashboardLayout
      userType="Student"
      userName={student.name}
      userEmail={student.email}
      navItems={navItems}
    >
      <Outlet />
    </DashboardLayout>
  );
}
