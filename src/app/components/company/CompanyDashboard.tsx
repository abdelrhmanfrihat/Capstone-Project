import React from 'react';
import { useNavigate } from 'react-router';
import { Users, Briefcase, Calendar, BarChart2, Plus, CheckCircle2 } from 'lucide-react';
import { Card, Button, Badge, MatchScore } from '../shared/ui';
import { mockData } from '../mockData';

export const CompanyDashboard = () => {
  const navigate = useNavigate();
  const topCandidates = mockData.students.filter(s => s.matchScore > 90).slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground dark:text-white flex items-center gap-2">
            Dashboard
            <Badge variant="success" className="ml-2"><CheckCircle2 /> Verified</Badge>
          </h1>
          <p className="text-sm text-muted-foreground dark:text-gray-400">Welcome to Stellar Cloud HR. Here is your pipeline overview.</p>
        </div>
        <Button onClick={() => navigate('/company/opportunities/new')} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Post Opportunity
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-card dark:bg-gray-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="text-sm font-medium text-muted-foreground dark:text-gray-400">Active Roles</div>
          </div>
          <div className="text-2xl font-bold text-foreground dark:text-white">3</div>
        </Card>
        <Card className="p-4 bg-card dark:bg-gray-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-sm font-medium text-muted-foreground dark:text-gray-400">Total Applicants</div>
          </div>
          <div className="text-2xl font-bold text-foreground dark:text-white">52</div>
        </Card>
        <Card className="p-4 bg-card dark:bg-gray-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-yellow-900/50 flex items-center justify-center text-amber-700 dark:text-yellow-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="text-sm font-medium text-muted-foreground dark:text-gray-400">Interviews</div>
          </div>
          <div className="text-2xl font-bold text-foreground dark:text-white">8</div>
        </Card>
        <Card className="p-4 bg-card dark:bg-gray-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div className="text-sm font-medium text-muted-foreground dark:text-gray-400">Avg Match Score</div>
          </div>
          <div className="text-2xl font-bold text-foreground dark:text-white">84%</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-foreground dark:text-white">Top AI-Matched Candidates</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/company/candidates')}>View All</Button>
          </div>
          <div className="space-y-4">
            {topCandidates.map(candidate => (
              <div key={candidate.id} className="flex items-center justify-between p-3 hover:bg-secondary dark:hover:bg-gray-800/50 rounded-lg transition-colors border border-transparent hover:border-border dark:hover:border-gray-700 cursor-pointer" onClick={() => navigate(`/company/candidates/${candidate.id}`)}>
                <div className="flex items-center gap-3">
                  <img src={candidate.avatar} alt={candidate.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <div className="font-semibold text-foreground dark:text-white">{candidate.name}</div>
                    <div className="text-xs text-muted-foreground">{candidate.major} • {candidate.university}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={candidate.status === 'Active' ? 'info' : candidate.status === 'In Training' ? 'training' : 'neutral'}>{candidate.status}</Badge>
                  <MatchScore score={candidate.matchScore} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-foreground dark:text-white">Your Active Opportunities</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/company/opportunities')}>Manage</Button>
          </div>
          <div className="space-y-4">
            {mockData.opportunities.filter(o => o.companyId === 'c1').map(job => (
              <div key={job.id} className="p-3 border border-border dark:border-gray-800 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-semibold text-foreground dark:text-white">{job.title}</div>
                  <Badge variant="info">{job.applicants} Applicants</Badge>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Match Quality: <strong className="text-green-600 dark:text-green-400">Excellent</strong></span>
                  <span className="text-xs">Closes {job.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
