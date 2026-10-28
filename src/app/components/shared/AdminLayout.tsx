import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router';
import { LayoutDashboard, ShieldCheck, Users, HelpCircle, Tags, Unlock, AlertOctagon, FileBarChart, ScrollText, Bell, Settings, LogOut, Moon, Sun, BrainCircuit } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { cn } from './ui';

const NavItem = ({ to, icon: Icon, children }: { to: string, icon: React.ElementType, children: React.ReactNode }) => (
  <NavLink
    to={to}
    className={({ isActive }) => cn(
      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
      isActive 
        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" 
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
    )}
  >
    <Icon className="w-5 h-5" />
    {children}
  </NavLink>
);

export const AdminLayout = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 flex flex-col md:flex-row transition-colors duration-200">
      <aside className="w-full md:w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col md:min-h-screen sticky top-0 md:h-screen">
        <div className="p-6 border-b border-border dark:border-gray-700">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold text-foreground dark:text-white">InternMatch AI</span>
          </div>
          <p className="text-xs text-muted-foreground dark:text-gray-400 mt-1 uppercase font-semibold tracking-wider">Admin Portal</p>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <NavItem to="/admin/dashboard" icon={LayoutDashboard}>Dashboard</NavItem>
          <NavItem to="/admin/verifications" icon={ShieldCheck}>Verifications</NavItem>
          <NavItem to="/admin/users" icon={Users}>Users</NavItem>
          <NavItem to="/admin/questions" icon={HelpCircle}>Questions Bank</NavItem>
          <NavItem to="/admin/categories" icon={Tags}>Categories & Skills</NavItem>
          <NavItem to="/admin/status-override" icon={Unlock}>Status Override</NavItem>
          <NavItem to="/admin/disputes" icon={AlertOctagon}>Disputes</NavItem>
          <NavItem to="/admin/reports" icon={FileBarChart}>Reports</NavItem>
          <NavItem to="/admin/audit-logs" icon={ScrollText}>Audit Logs</NavItem>
          <NavItem to="/admin/notifications" icon={Bell}>Notifications</NavItem>
          <NavItem to="/admin/settings" icon={Settings}>Settings</NavItem>
        </nav>

        <div className="p-4 border-t border-border dark:border-gray-700">
          <button onClick={() => navigate('/')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-[var(--text-body)] dark:text-gray-600 hover:bg-red-50 hover:text-red-700 dark:text-gray-400 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-colors w-full">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-h-screen max-w-full overflow-hidden">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-white rounded-full hover:bg-muted dark:hover:bg-gray-700 transition-colors">
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-border dark:border-gray-700">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-700 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800">A</div>
              <span className="text-sm font-medium text-[var(--text-secondary)] dark:text-gray-200 hidden sm:block">System Admin</span>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto bg-background/50 dark:bg-gray-900/50 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
