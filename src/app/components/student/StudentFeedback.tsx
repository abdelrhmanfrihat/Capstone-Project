import React from 'react';
import { MessageSquare, Star, ArrowUpRight, CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, Badge, Button, Select } from '../shared/ui';

const feedbackData = [
  {
    id: 1,
    company: 'TechNova',
    role: 'Backend Systems Intern',
    type: 'Interview Feedback',
    date: 'May 12, 2026',
    rating: 4,
    strengths: ['Problem Solving', 'Node.js Knowledge', 'Communication'],
    improvements: ['Database Optimization', 'AWS basics'],
    comments: "Alex showed excellent problem-solving skills during the technical interview. However, to excel in this specific role, more experience with complex SQL queries and basic AWS deployment would be beneficial."
  },
  {
    id: 2,
    company: 'DataPulse',
    role: 'Data Science Intern',
    type: 'Profile Review',
    date: 'May 05, 2026',
    rating: 3,
    strengths: ['Python', 'Statistics'],
    improvements: ['Data Engineering', 'Spark'],
    comments: "Strong foundational knowledge. We are looking for someone with slightly more data engineering experience to handle our large pipelines."
  }
];

export const StudentFeedback = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground dark:text-white">Company Feedback</h1>
        <p className="text-sm text-muted-foreground dark:text-gray-400">Use insights from companies to improve your profile and increase match scores.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-card dark:bg-gray-800">
          <div className="flex items-center gap-2 text-muted-foreground dark:text-gray-400 mb-2">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold uppercase">Avg Rating</span>
          </div>
          <div className="text-3xl font-bold text-foreground dark:text-white">3.5<span className="text-lg text-muted-foreground">/5</span></div>
        </Card>
        <Card className="p-4 bg-card dark:bg-gray-800">
          <div className="flex items-center gap-2 text-muted-foreground dark:text-gray-400 mb-2">
            <MessageSquare className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-semibold uppercase">Total Reviews</span>
          </div>
          <div className="text-3xl font-bold text-foreground dark:text-white">2</div>
        </Card>
        <Card className="p-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/50">
          <div className="flex items-center gap-2 text-green-700 dark:text-green-400 mb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm font-semibold uppercase">Top Strength</span>
          </div>
          <div className="text-xl font-bold text-green-800 dark:text-green-300">Problem Solving</div>
        </Card>
        <Card className="p-4 bg-amber-50 dark:bg-yellow-900/20 border-amber-200 dark:border-yellow-800/50">
          <div className="flex items-center gap-2 text-amber-700 dark:text-yellow-400 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold uppercase">Focus Area</span>
          </div>
          <div className="text-xl font-bold text-amber-800 dark:text-yellow-300">SQL / DB</div>
        </Card>
      </div>

      {/* AI Action Card */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800/50">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1 space-y-2">
            <h3 className="text-lg font-bold text-foreground dark:text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Turn Feedback Into Action
            </h3>
            <p className="text-muted-foreground dark:text-gray-400 text-sm">
              Companies frequently mention <strong className="text-foreground dark:text-gray-200">Database Optimization / SQL</strong> as an area for improvement. 
              Adding this skill to your profile could unlock 14 new high-match opportunities.
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <Button>Add Skill to Profile</Button>
            <Button variant="outline">View Recommended Courses</Button>
          </div>
        </div>
      </Card>

      {/* Feedback List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-foreground dark:text-white">Recent Feedback</h3>
          <div className="w-48">
            <Select>
              <option>All Feedback Types</option>
              <option>Interview</option>
              <option>Profile Review</option>
              <option>Rejection</option>
            </Select>
          </div>
        </div>

        {feedbackData.map(fb => (
          <Card key={fb.id} className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-foreground dark:text-white text-lg">{fb.company}</h4>
                  <Badge variant="blue">{fb.type}</Badge>
                </div>
                <div className="text-sm text-muted-foreground dark:text-gray-400 font-medium">For: {fb.role}</div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex gap-1 mb-1">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className={`w-4 h-4 ${star <= fb.rating ? 'text-yellow-500 fill-current' : 'text-gray-300 dark:text-gray-600'}`} />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{fb.date}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-green-50/50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-800/30">
                <span className="text-xs font-semibold uppercase tracking-wide text-green-400 block mb-2">STRENGTHS</span>
                <div className="flex flex-wrap gap-1.5">
                  {fb.strengths.map(s => <Badge key={s} variant="success">{s}</Badge>)}
                </div>
              </div>
              <div className="p-3 bg-amber-50 dark:bg-yellow-900/10 rounded-lg border border-amber-200 dark:border-yellow-800/30">
                <span className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400 block mb-2">AREAS TO DEVELOP</span>
                <div className="flex flex-wrap gap-1.5">
                  {fb.improvements.map(s => <Badge key={s} variant="warning">{s}</Badge>)}
                </div>
              </div>
            </div>

            <div className="p-4 bg-background dark:bg-gray-800/50 rounded-lg text-sm text-[var(--text-secondary)] dark:text-gray-300 italic border border-border dark:border-gray-700">
              "{fb.comments}"
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
