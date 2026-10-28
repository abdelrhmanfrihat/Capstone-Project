import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { BrainCircuit, Info } from 'lucide-react';
import { Card, Button, Input, Label, Select, Badge } from '../shared/ui';

export const CompanyPostOpportunity = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState<string[]>(['React', 'TypeScript']);

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      e.preventDefault();
      if (!skills.includes(e.currentTarget.value)) {
        setSkills([...skills, e.currentTarget.value]);
      }
      e.currentTarget.value = '';
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-foreground dark:text-white">Post New Opportunity</h1>
          <p className="text-sm text-muted-foreground dark:text-gray-400">Define the role to find the best AI-matched candidates.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
          <Button onClick={() => navigate('/company/opportunities')}>Publish Opportunity</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6 space-y-6">
            <h2 className="text-lg font-bold text-foreground dark:text-white border-b border-border dark:border-gray-800 pb-2">Basic Details</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Opportunity Title</Label>
                <Input placeholder="e.g. Frontend Engineering Intern" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select>
                    <option>Internship</option>
                    <option>Training Program</option>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Location Model</Label>
                  <Select>
                    <option>Remote</option>
                    <option>Hybrid</option>
                    <option>On-site</option>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Application Deadline</Label>
                  <Input type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <textarea 
                  className="w-full h-32 rounded-md border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:ring-blue-400"
                  placeholder="Describe the role, responsibilities, and learning outcomes..."
                ></textarea>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-6">
            <h2 className="text-lg font-bold text-foreground dark:text-white border-b border-border dark:border-gray-800 pb-2">Requirements for AI Matching</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Required Technical Skills</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {skills.map(skill => (
                    <Badge key={skill} variant="blue" className="flex items-center gap-1">
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="hover:text-red-500">&times;</button>
                    </Badge>
                  ))}
                </div>
                <Input 
                  placeholder="Type a skill and press Enter..." 
                  onKeyDown={handleAddSkill}
                />
                <p className="text-xs text-muted-foreground">The AI uses these to calculate the core technical match score.</p>
              </div>

              <div className="space-y-2">
                <Label>Required Behavioral Traits (Soft Skills)</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['Problem Solving', 'Teamwork', 'Communication', 'Adaptability'].map(trait => (
                    <label key={trait} className="flex items-center gap-2 p-2 border border-border dark:border-gray-700 rounded-lg cursor-pointer hover:bg-secondary dark:hover:bg-gray-800">
                      <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm dark:text-gray-300">{trait}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-4">
              <BrainCircuit className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="font-bold text-foreground dark:text-white">AI Match Prediction</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground dark:text-gray-400 mb-1">Estimated Candidate Pool</div>
                <div className="text-2xl font-bold text-foreground dark:text-white">~1,250</div>
                <div className="text-xs text-green-600 dark:text-green-400 mt-1">Excellent reach</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium text-[var(--text-secondary)] dark:text-gray-300">Match Distribution Prediction</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-16">High (&gt;85%)</div>
                    <div className="flex-1 h-2 bg-muted dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-1/4"></div>
                    </div>
                    <div className="w-8 text-right">25%</div>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-16">Med (70-84%)</div>
                    <div className="flex-1 h-2 bg-muted dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 dark:bg-yellow-500 w-1/2"></div>
                    </div>
                    <div className="w-8 text-right">50%</div>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-16">Low (&lt;70%)</div>
                    <div className="flex-1 h-2 bg-muted dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 w-1/4"></div>
                    </div>
                    <div className="w-8 text-right">25%</div>
                  </div>
                </div>
              </div>

              <div className="bg-card dark:bg-gray-800 p-3 rounded-lg border border-blue-100 dark:border-blue-800 text-sm text-[var(--text-body)] dark:text-gray-300">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <p>Tip: Adding more than 5 required technical skills significantly drops the high-match candidate pool. Consider moving some to "Preferred".</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
