import React from 'react';
import { Star, MessageSquare, AlertCircle } from 'lucide-react';
import { Card, Button, Badge, Select } from '../shared/ui';

export const CompanyFeedback = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Feedback Dashboard</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Provide feedback to help candidates improve their AI profiles.</p>
        </div>
        <Button>Give Feedback</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300 mb-2">
            <MessageSquare className="w-5 h-5" />
            <span className="font-semibold">Feedback Given</span>
          </div>
          <div className="text-3xl font-bold text-blue-900 dark:text-white">12</div>
        </Card>
        <Card className="p-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2 text-green-800 dark:text-green-300 mb-2">
            <Star className="w-5 h-5" />
            <span className="font-semibold">Impact Score</span>
          </div>
          <div className="text-3xl font-bold text-green-900 dark:text-white">High</div>
        </Card>
        <Card className="p-4 bg-amber-50 dark:bg-yellow-900/20 border-amber-200 dark:border-yellow-800">
          <div className="flex items-center gap-2 text-amber-800 dark:text-yellow-300 mb-2">
            <AlertCircle className="w-5 h-5" />
            <span className="font-semibold">Pending Requests</span>
          </div>
          <div className="text-3xl font-bold text-amber-800 dark:text-white">3</div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Pending Feedback Requests</h2>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex flex-col md:flex-row justify-between items-center p-4 border border-gray-100 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="flex items-center gap-4 mb-4 md:mb-0 w-full md:w-auto">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">Candidate {i}</div>
                  <div className="text-sm text-gray-500">Interviewed for: Frontend Intern</div>
                </div>
              </div>
              <Button size="sm" variant="outline">Provide Feedback</Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
