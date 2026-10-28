import React from 'react';
import { useNavigate } from 'react-router';
import { ShieldCheck, Users, Briefcase, AlertOctagon, Activity, Building2 } from 'lucide-react';
import { Card, Badge, Button, StatusBadge } from '../shared/ui';
import { mockData } from '../mockData';

export const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground dark:text-white">Admin Control Center</h1>
          <p className="text-sm text-muted-foreground dark:text-gray-400">Platform health, verifications, and moderation.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="p-4 flex flex-col justify-between">
          <div className="text-muted-foreground dark:text-gray-400 mb-2"><Building2 className="w-5 h-5" /></div>
          <div>
            <div className="text-2xl font-bold text-foreground dark:text-white">1</div>
            <div className="text-xs font-semibold uppercase text-amber-700 dark:text-yellow-500 mt-1">Pending Verif.</div>
          </div>
        </Card>
        <Card className="p-4 flex flex-col justify-between">
          <div className="text-muted-foreground dark:text-gray-400 mb-2"><Users className="w-5 h-5" /></div>
          <div>
            <div className="text-2xl font-bold text-foreground dark:text-white">1,204</div>
            <div className="text-xs font-semibold uppercase text-muted-foreground mt-1">Active Students</div>
          </div>
        </Card>
        <Card className="p-4 flex flex-col justify-between">
          <div className="text-muted-foreground dark:text-gray-400 mb-2"><Briefcase className="w-5 h-5" /></div>
          <div>
            <div className="text-2xl font-bold text-foreground dark:text-white">342</div>
            <div className="text-xs font-semibold uppercase text-muted-foreground mt-1">Active Roles</div>
          </div>
        </Card>
        <Card className="p-4 flex flex-col justify-between bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/50">
          <div className="text-red-500 dark:text-red-400 mb-2"><AlertOctagon className="w-5 h-5" /></div>
          <div>
            <div className="text-2xl font-bold text-red-700 dark:text-red-400">2</div>
            <div className="text-xs font-semibold uppercase text-red-600 dark:text-red-500 mt-1">Open Disputes</div>
          </div>
        </Card>
        <Card className="p-4 flex flex-col justify-between bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/50">
          <div className="text-blue-500 dark:text-blue-400 mb-2"><Activity className="w-5 h-5" /></div>
          <div>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">86%</div>
            <div className="text-xs font-semibold uppercase text-blue-600 dark:text-blue-500 mt-1">Avg Match Score</div>
          </div>
        </Card>
        <Card className="p-4 flex flex-col justify-between">
          <div className="text-muted-foreground dark:text-gray-400 mb-2"><ShieldCheck className="w-5 h-5" /></div>
          <div>
            <div className="text-2xl font-bold text-foreground dark:text-white">156</div>
            <div className="text-xs font-semibold uppercase text-muted-foreground mt-1">In Training Locked</div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-foreground dark:text-white">Pending Company Verifications</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/admin/verifications')}>View All</Button>
          </div>
          <div className="space-y-4">
            {mockData.companies.filter(c => c.status === 'Pending').map(company => (
              <div key={company.id} className="flex items-center justify-between p-4 border border-amber-200 dark:border-yellow-900/50 bg-amber-50 dark:bg-yellow-900/10 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-card dark:bg-gray-800 rounded border border-border dark:border-gray-700 flex items-center justify-center font-bold text-gray-400">?</div>
                  <div>
                    <div className="font-bold text-foreground dark:text-white">{company.name}</div>
                    <div className="text-sm text-muted-foreground">Registered today</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">Approve</Button>
                  <Button size="sm" variant="outline">Review</Button>
                </div>
              </div>
            ))}
            {mockData.companies.filter(c => c.status === 'Pending').length === 0 && (
              <div className="text-center py-6 text-muted-foreground">No pending verifications.</div>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-foreground dark:text-white">System Audit Logs</h2>
            <Button variant="ghost" size="sm">View Logs</Button>
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-background dark:bg-gray-800/50 rounded-lg border border-border dark:border-gray-700 text-sm">
              <span className="text-muted-foreground">10 mins ago</span> • <strong>System</strong> locked <span className="text-blue-600">Marcus Johnson</span> to <Badge variant="training">In Training</Badge> status.
            </div>
            <div className="p-3 bg-background dark:bg-gray-800/50 rounded-lg border border-border dark:border-gray-700 text-sm">
              <span className="text-muted-foreground">1 hour ago</span> • <strong>Admin A</strong> approved company <span className="text-blue-600">Stellar Cloud</span>.
            </div>
            <div className="p-3 bg-background dark:bg-gray-800/50 rounded-lg border border-border dark:border-gray-700 text-sm">
              <span className="text-muted-foreground">2 hours ago</span> • <strong>AI Engine</strong> recalculated match scores. Avg shift: +1.2%.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
