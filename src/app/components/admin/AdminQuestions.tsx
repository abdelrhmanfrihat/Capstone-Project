import React from 'react';
import { Plus, Search, Filter, Edit, Trash2 } from 'lucide-react';
import { Card, Button, Input, Select, Badge } from '../shared/ui';

const questions = [
  { id: 1, text: "A project deadline is approaching, and a key feature is failing. What is your immediate reaction?", category: "Behavioral", type: "Scenario", status: "Active" },
  { id: 2, text: "How would you rate your proficiency in React?", category: "Technical Skills", type: "Rating Scale", status: "Active" },
  { id: 3, text: "What industries interest you most?", category: "Interests", type: "Multiple Choice", status: "Active" },
  { id: 4, text: "Describe a time you disagreed with a team member.", category: "Soft Skills", type: "Text Answer", status: "Draft" },
];

export const AdminQuestions = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground dark:text-white">Assessment Question Bank</h1>
          <p className="text-sm text-muted-foreground dark:text-gray-400">Manage the AI assessment questions that build student profiles.</p>
        </div>
        <Button className="flex items-center gap-2"><Plus className="w-4 h-4"/> Add Question</Button>
      </div>

      <Card className="p-4 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input className="pl-10" placeholder="Search questions..." />
        </div>
        <div className="w-48">
          <Select>
            <option>Category: All</option>
            <option>Behavioral</option>
            <option>Technical Skills</option>
            <option>Soft Skills</option>
          </Select>
        </div>
        <div className="w-48">
          <Select>
            <option>Status: All</option>
            <option>Active</option>
            <option>Draft</option>
          </Select>
        </div>
      </Card>

      <div className="space-y-4">
        {questions.map(q => (
          <Card key={q.id} className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="neutral">{q.category}</Badge>
                <Badge variant="blue">{q.type}</Badge>
                {q.status === 'Draft' && <Badge variant="warning">Draft</Badge>}
              </div>
              <p className="text-foreground dark:text-white font-medium text-lg">{q.text}</p>
              <div className="text-sm text-muted-foreground mt-2">
                {q.type === 'Scenario' ? 'Maps to: Problem Solving, Teamwork, Stress Management' : 'Maps directly to skill profile'}
              </div>
            </div>
            
            <div className="flex gap-2 shrink-0">
              <Button variant="outline" size="sm" className="w-10 h-10 p-0 flex items-center justify-center"><Edit className="w-4 h-4" /></Button>
              <Button variant="outline" size="sm" className="w-10 h-10 p-0 flex items-center justify-center text-red-600 dark:text-red-400 border-red-200 dark:border-red-800/50 hover:bg-red-50 dark:hover:bg-red-900/30"><Trash2 className="w-4 h-4" /></Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
