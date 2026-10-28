import React, { useState } from 'react';
import { Search, AlertTriangle, Unlock, ArrowRight } from 'lucide-react';
import { Card, Button, Input, Label, Select, StatusBadge, Badge } from '../shared/ui';
import { mockData } from '../mockData';

export const AdminStatusOverride = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const student = mockData.students.find(s => s.status === 'In Training' || s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground dark:text-white">Status Override</h1>
          <p className="text-sm text-muted-foreground dark:text-gray-400">Release students from locked states or fix workflow errors.</p>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex gap-4 items-end mb-8">
          <div className="flex-1 space-y-2">
            <Label>Search Student by Name or ID</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input className="pl-10" placeholder="e.g. Marcus Johnson" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
          <Button>Search</Button>
        </div>

        {student && (
          <div className="space-y-6 animate-in fade-in">
            <div className="p-4 border border-border dark:border-gray-700 rounded-lg flex justify-between items-center bg-background dark:bg-gray-800/50">
              <div className="flex items-center gap-4">
                <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-full" />
                <div>
                  <h3 className="font-bold text-foreground dark:text-white text-lg">{student.name}</h3>
                  <div className="text-sm text-muted-foreground">{student.major} • {student.university}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground uppercase font-semibold mb-1">Current Status</div>
                <StatusBadge status={student.status} tone="admin" />
              </div>
            </div>

            {student.status === 'In Training' && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-lg p-4 flex gap-3 text-red-800 dark:text-red-400">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <div>
                  <h4 className="font-bold">Student is locked.</h4>
                  <p className="text-sm">They are currently marked as in training with <strong className="font-bold">Stellar Cloud</strong>. They cannot apply to other roles. Only use override if the training was cancelled or there is a dispute.</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>New Status</Label>
                  <Select defaultValue="Active">
                    <option value="Active">Active (Available)</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Interview">Interview</option>
                    <option value="Matched">Matched</option>
                    <option value="In Training">In Training (Locked)</option>
                    <option value="Suspended">Suspended</option>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Reason for Override</Label>
                  <textarea 
                    className="w-full h-24 rounded-md border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:ring-blue-400"
                    placeholder="Provide a detailed reason for the audit log..."
                    required
                  ></textarea>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Status Timeline Preview</Label>
                  <div className="p-4 bg-background dark:bg-gray-800/50 rounded-lg border border-border dark:border-gray-700 space-y-3 relative">
                    <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
                    
                    <div className="relative flex gap-4 text-sm text-muted-foreground">
                      <div className="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600 z-10 mt-1 ring-4 ring-gray-50 dark:ring-gray-800"></div>
                      <div>Matched <span className="text-xs ml-2">April 15</span></div>
                    </div>
                    <div className="relative flex gap-4 text-sm text-muted-foreground">
                      <div className="w-4 h-4 rounded-full bg-red-400 dark:bg-red-500 z-10 mt-1 ring-4 ring-gray-50 dark:ring-gray-800"></div>
                      <div>In Training <span className="text-xs ml-2">April 20</span></div>
                    </div>
                    <div className="relative flex gap-4 text-sm font-bold text-blue-600 dark:text-blue-400">
                      <div className="w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-400 z-10 mt-1 ring-4 ring-blue-100 dark:ring-blue-900/50"></div>
                      <div className="flex items-center gap-2">Active (Override) <Badge variant="info" className="text-[10px]">Pending</Badge></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-border dark:border-gray-700">
              <Button variant="danger" className="flex items-center gap-2">
                <Unlock className="w-4 h-4" /> Confirm Override
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
