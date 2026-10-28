import React from 'react';
import { useNavigate } from 'react-router';
import { Search, Filter, Briefcase, MapPin, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, Button, Input, Select, Badge, MatchScore, StatusBadge } from '../shared/ui';
import { mockData } from '../mockData';

export const StudentOpportunities = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground dark:text-white">Opportunities</h1>
          <p className="text-sm text-muted-foreground dark:text-gray-400">Discover roles matched to your AI profile.</p>
        </div>
      </div>

      <Card className="p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input className="pl-10" placeholder="Search roles, skills, or companies..." />
        </div>
        <div className="w-full md:w-48">
          <Select>
            <option>All Types</option>
            <option>Internship</option>
            <option>Training</option>
          </Select>
        </div>
        <div className="w-full md:w-48">
          <Select>
            <option>Sort by: Best Match</option>
            <option>Newest</option>
            <option>Deadline</option>
          </Select>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" /> Filters
        </Button>
      </Card>

      <div className="space-y-4">
        {mockData.opportunities.map(job => (
          <Card key={job.id} className="p-6 transition-all hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer" onClick={() => navigate(`/student/opportunities/${job.id}`)}>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-16 h-16 rounded-xl border border-border dark:border-gray-700 overflow-hidden shrink-0">
                <img src={mockData.companies.find(c => c.id === job.companyId)?.logo} alt="Company logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-foreground dark:text-white">{job.title}</h3>
                      <Badge variant={job.type === 'Training' ? 'purple' : 'info'}>{job.type}</Badge>
                    </div>
                    <div className="text-muted-foreground dark:text-gray-400 font-medium">{mockData.companies.find(c => c.id === job.companyId)?.name}</div>
                  </div>
                  <MatchScore score={job.matchScore} size="md" />
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground dark:text-gray-400 mb-4">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                  <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.requiredSkills[0]} required</span>
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Apply by {job.deadline}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase flex items-center mr-2">Why match:</span>
                  {job.requiredSkills.map(s => <Badge key={s} variant="success"><CheckCircle2 /> Strong: {s}</Badge>)}
                  {job.preferredSkills.slice(0,1).map(s => <Badge key={s} variant="danger"><AlertCircle /> Missing: {s}</Badge>)}
                </div>
              </div>
              
              <div className="flex md:flex-col gap-2 shrink-0 md:w-32 justify-center">
                <Button className="w-full">Apply Now</Button>
                <Button variant="outline" className="w-full">Save</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
