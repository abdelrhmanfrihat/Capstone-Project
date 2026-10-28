import React from 'react';
import { useNavigate } from 'react-router';
import { BrainCircuit, Briefcase, FileText, TrendingUp, Target, ArrowRight } from 'lucide-react';
import { Card, Button, Badge, MatchScore, StatusBadge, AIExplanation } from '../shared/ui';
import { mockData } from '../mockData';

export const StudentDashboard = () => {
  const navigate = useNavigate();
  const student = mockData.students[0]; // Alex Chen
  const recommendations = mockData.opportunities.slice(0, 2);

  return (
    <div className="space-y-6">
      {/* Welcome & Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 md:col-span-2 bg-gradient-to-br from-blue-600 to-blue-800 text-white border-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-1 text-white">Welcome back, {student.name}!</h2>
              <p className="text-blue-100 mb-4">Your AI profile is performing well. 3 companies have viewed your profile this week.</p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/40 text-sm font-medium text-blue-50 border border-blue-500/30">
                  Status: <StatusBadge status={student.status} />
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/40 text-sm font-medium text-blue-50 border border-blue-500/30">
                  Profile Strength: {student.profileStrength}%
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-white/10 dark:bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
              <BrainCircuit className="w-8 h-8 text-blue-100 mb-2" />
              <span className="text-xs uppercase font-semibold text-blue-200 tracking-wider">AI Analysis</span>
              <span className="text-lg font-bold text-white">Active</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Skill Gap Analysis</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Adding these skills could increase your match scores by up to 15%.</p>
            <div className="space-y-2">
              {student.missingSkills.map(skill => (
                <div key={skill} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{skill}</span>
                  <Badge variant="warning">High Demand</Badge>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Recommended Opportunities */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Top Recommended Matches
          </h3>
          <Button variant="ghost" size="sm" onClick={() => navigate('/student/opportunities')}>
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recommendations.map(job => (
            <Card key={job.id} className="p-6 flex flex-col transition-all hover:shadow-md border-blue-100 dark:border-blue-900/30">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <img src={mockData.companies.find(c => c.id === job.companyId)?.logo} alt="Company" className="w-12 h-12 rounded-lg border border-gray-200 dark:border-gray-700" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{job.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{mockData.companies.find(c => c.id === job.companyId)?.name} • {job.location}</p>
                  </div>
                </div>
                <MatchScore score={job.matchScore} size="sm" />
              </div>
              
              <div className="mb-4 flex-1">
                <AIExplanation 
                  score={job.matchScore} 
                  strong={job.requiredSkills.filter(s => student.skills.includes(s))} 
                  weak={job.preferredSkills.filter(s => !student.skills.includes(s))} 
                  message="Strong technical fit. Lacking some preferred skills but core requirements are met."
                />
              </div>
              
              <div className="flex gap-3">
                <Button className="flex-1" onClick={() => navigate(`/student/opportunities/${job.id}`)}>View Details</Button>
                <Button variant="outline" className="flex-1">Save</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">4</div>
            <div className="text-xs text-gray-500 font-medium uppercase">Applications</div>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">2</div>
            <div className="text-xs text-gray-500 font-medium uppercase">Interviews</div>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">+5%</div>
            <div className="text-xs text-gray-500 font-medium uppercase">Score Growth</div>
          </div>
        </Card>
      </div>
    </div>
  );
};
