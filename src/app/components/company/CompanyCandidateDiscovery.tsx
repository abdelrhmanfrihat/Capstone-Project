import React from 'react';
import { useNavigate } from 'react-router';
import { Search, Filter, Mail, Star, BrainCircuit } from 'lucide-react';
import { Card, Button, Input, Select, Badge, MatchScore, StatusBadge } from '../shared/ui';
import { mockData } from '../mockData';

export const CompanyCandidateDiscovery = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground dark:text-white">Candidate Discovery</h1>
          <p className="text-sm text-muted-foreground dark:text-gray-400">Find active students matching your opportunity requirements.</p>
        </div>
      </div>

      <Card className="p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input className="pl-10" placeholder="Search by skills, major, or university..." />
        </div>
        <div className="w-full md:w-64">
          <Select>
            <option>Match for: Frontend Intern</option>
            <option>Match for: Cybersecurity Training</option>
          </Select>
        </div>
        <div className="w-full md:w-48">
          <Select>
            <option>Score: 80%+</option>
            <option>Score: 90%+</option>
            <option>All Scores</option>
          </Select>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" /> Filters
        </Button>
      </Card>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-3 flex items-center gap-3 text-sm text-blue-800 dark:text-blue-300">
        <BrainCircuit className="w-5 h-5 shrink-0" />
        <p>Students marked as <Badge variant="training" className="mx-1">In Training</Badge> are automatically hidden from search results as they are no longer available.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockData.students.filter(s => s.status !== 'In Training').map(student => (
          <Card key={student.id} className="p-5 flex flex-col hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-full border border-border dark:border-gray-700" />
                <div>
                  <h3 className="font-bold text-foreground dark:text-white hover:text-blue-600 cursor-pointer" onClick={() => navigate(`/company/candidates/${student.id}`)}>{student.name}</h3>
                  <p className="text-xs text-muted-foreground">{student.major}</p>
                </div>
              </div>
              <MatchScore score={student.matchScore} size="sm" />
            </div>

            <div className="mb-4">
              <div className="text-xs text-muted-foreground mb-1 flex justify-between">
                <span>{student.university}</span>
                <StatusBadge status={student.status} />
              </div>
            </div>

            <div className="flex-1 space-y-3 mb-4">
              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase block mb-1">Top Matched Skills</span>
                <div className="flex flex-wrap gap-1">
                  {student.skills.slice(0, 3).map(skill => <Badge key={skill} variant="blue">{skill}</Badge>)}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-auto">
              <Button className="flex-1" size="sm">Shortlist</Button>
              <Button variant="outline" size="sm" className="flex-1 flex items-center gap-1">
                <Mail className="w-3 h-3" /> Invite
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
