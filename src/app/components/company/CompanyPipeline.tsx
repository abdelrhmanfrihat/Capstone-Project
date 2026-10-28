import React from 'react';
import { useNavigate } from 'react-router';
import { Mail, Calendar, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, Badge, MatchScore, Button, Select } from '../shared/ui';
import { mockData } from '../mockData';

const columns = [
  { id: 'Applied', title: 'Applied' },
  { id: 'Shortlisted', title: 'Shortlisted' },
  { id: 'Interview', title: 'Interview' },
  { id: 'Matched', title: 'Matched (Offer)' },
];

export const CompanyPipeline = () => {
  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground dark:text-white">Recruitment Pipeline</h1>
          <p className="text-sm text-muted-foreground dark:text-gray-400">Manage candidates through the workflow stages.</p>
        </div>
        <div className="w-full md:w-64">
          <Select>
            <option>Opportunity: Frontend Intern</option>
            <option>Opportunity: Backend Systems</option>
          </Select>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
        {columns.map(col => {
          const apps = mockData.applications.filter(a => a.status === col.id);
          return (
            <div key={col.id} className="flex-shrink-0 w-80 flex flex-col">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-[var(--text-secondary)] dark:text-gray-300">{col.title}</h3>
                <Badge variant="default">{apps.length}</Badge>
              </div>
              
              <div className="flex-1 bg-muted/50 dark:bg-gray-800/30 rounded-xl p-3 space-y-3 overflow-y-auto border border-border dark:border-gray-700">
                {apps.map(app => {
                  const student = mockData.students.find(s => s.id === app.studentId);
                  
                  return (
                    <Card key={app.id} className="p-4 flex flex-col gap-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <img src={student?.avatar} alt={student?.name} className="w-8 h-8 rounded-full border border-border dark:border-gray-700" />
                          <div>
                            <div className="text-sm font-bold text-foreground dark:text-white">{student?.name}</div>
                            <div className="text-[10px] text-muted-foreground uppercase font-semibold">Available</div>
                          </div>
                        </div>
                        <MatchScore score={app.matchScore} size="sm" />
                      </div>
                      
                      <div className="text-xs text-muted-foreground dark:text-gray-400">
                        {student?.skills.slice(0, 3).join(', ')}
                      </div>

                      <div className="flex gap-1 mt-2">
                        {col.id === 'Applied' && <Button size="sm" className="w-full text-xs h-7">Move to Shortlist</Button>}
                        {col.id === 'Shortlisted' && <Button size="sm" className="w-full text-xs h-7 flex items-center justify-center gap-1"><Calendar className="w-3 h-3"/> Invite</Button>}
                        {col.id === 'Interview' && (
                          <>
                            <Button size="sm" className="flex-1 text-xs h-7 bg-green-600 hover:bg-green-700">Match</Button>
                            <Button size="sm" variant="outline" className="w-8 h-7 p-0 flex items-center justify-center"><MessageSquare className="w-3 h-3"/></Button>
                          </>
                        )}
                        {col.id === 'Matched' && (
                          <Button size="sm" className="w-full text-xs h-7 bg-purple-600 hover:bg-purple-700 flex items-center justify-center gap-1">
                            <CheckCircle className="w-3 h-3"/> Confirm Training Start
                          </Button>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Separated In Training Column */}
        <div className="flex-shrink-0 w-80 flex flex-col border-l-2 border-dashed border-border dark:border-gray-700 pl-6">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-[var(--text-secondary)] dark:text-gray-300">In Training</h3>
              <AlertCircle className="w-4 h-4 text-gray-400" title="Students here are locked and unavailable to others." />
            </div>
            <Badge variant="training">{mockData.applications.filter(a => a.status === 'In Training').length}</Badge>
          </div>
          <div className="flex-1 bg-red-50/50 dark:bg-red-900/10 rounded-xl p-3 space-y-3 overflow-y-auto border border-red-100 dark:border-red-900/50">
             {mockData.applications.filter(a => a.status === 'In Training').map(app => {
                  const student = mockData.students.find(s => s.id === app.studentId);
                  return (
                    <Card key={app.id} className="p-4 border-red-200 dark:border-red-800">
                       <div className="flex items-center gap-2 mb-2">
                          <img src={student?.avatar} alt={student?.name} className="w-8 h-8 rounded-full border border-border dark:border-gray-700" />
                          <div>
                            <div className="text-sm font-bold text-foreground dark:text-white">{student?.name}</div>
                            <Badge variant="danger" className="text-[10px] mt-0.5">Locked</Badge>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="w-full text-xs h-7 mt-2">End Training / Give Feedback</Button>
                    </Card>
                  )
             })}
          </div>
        </div>
      </div>
    </div>
  );
};
