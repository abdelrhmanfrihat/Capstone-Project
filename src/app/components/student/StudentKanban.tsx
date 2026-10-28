import React from 'react';
import { Kanban, Clock, Calendar as CalendarIcon, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, Badge, MatchScore, StatusBadge, Button } from '../shared/ui';
import { mockData } from '../mockData';

const columns = [
  { id: 'Applied', title: 'Applied' },
  { id: 'Shortlisted', title: 'Shortlisted' },
  { id: 'Interview', title: 'Interview' },
  { id: 'Matched', title: 'Matched' },
  { id: 'In Training', title: 'In Training' }
];

export const StudentKanban = () => {
  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Application Tracking</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Track your workflow. <span className="font-semibold text-blue-600 dark:text-blue-400">You remain available to others until 'In Training'.</span></p>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
        {columns.map(col => {
          const apps = mockData.applications.filter(a => a.status === col.id);
          return (
            <div key={col.id} className="flex-shrink-0 w-80 flex flex-col">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">{col.title}</h3>
                <Badge variant="default">{apps.length}</Badge>
              </div>
              
              <div className="flex-1 bg-gray-100/50 dark:bg-gray-800/30 rounded-xl p-3 space-y-3 overflow-y-auto border border-gray-200 dark:border-gray-700">
                {apps.map(app => {
                  const job = mockData.opportunities.find(o => o.id === app.opportunityId);
                  const company = mockData.companies.find(c => c.id === job?.companyId);
                  
                  return (
                    <Card key={app.id} className="p-4 cursor-pointer hover:border-blue-400 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">{company?.name}</div>
                        <MatchScore score={app.matchScore} size="sm" />
                      </div>
                      <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">{job?.title}</div>
                      
                      {app.status === 'Interview' && (
                        <div className="bg-amber-50 dark:bg-yellow-900/30 border border-amber-200 dark:border-yellow-800 rounded p-2 mb-3 text-xs text-amber-800 dark:text-yellow-400 flex items-center gap-1.5">
                          <CalendarIcon className="w-3.5 h-3.5" /> Scheduled for May 20, 10:00 AM
                        </div>
                      )}
                      {app.status === 'In Training' && (
                        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded p-2 mb-3 text-xs text-red-800 dark:text-red-400 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5" /> Account locked for other applications
                        </div>
                      )}

                      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-500">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {app.date}</span>
                        <StatusBadge status={app.status} />
                      </div>
                    </Card>
                  );
                })}
                {apps.length === 0 && (
                  <div className="h-24 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                    <span className="text-sm text-gray-500 dark:text-gray-400">No applications here</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
