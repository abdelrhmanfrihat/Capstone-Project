import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { BrainCircuit, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { Card, Button, Input, Label, Select, cn } from './shared/ui';

const steps = [
  'Basic Info', 'Education', 'Technical Skills', 'Soft Skills', 'Interests', 'Behavioral', 'Result'
];

export const StudentAssessment = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        // Simulate AI generation loading
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setCurrentStep(currentStep + 1);
        }, 2000);
      } else {
        setCurrentStep(currentStep + 1);
      }
    } else {
      navigate('/student/dashboard');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 flex flex-col items-center pt-12 pb-24 px-6">
      <div className="w-full max-w-3xl mb-8">
        <h1 className="text-2xl font-bold text-foreground dark:text-white flex items-center gap-2 mb-6">
          <BrainCircuit className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          AI Profile Builder
        </h1>
        
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-2 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted dark:bg-gray-700 rounded-full z-0">
            <div 
              className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
          </div>
          {steps.map((step, idx) => (
            <div key={step} className="relative z-10 flex flex-col items-center gap-2">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm border-2 transition-colors",
                idx < currentStep ? "bg-blue-600 border-blue-600 text-white" : 
                idx === currentStep ? "bg-card dark:bg-gray-800 border-blue-600 text-blue-600 dark:text-blue-400" : 
                "bg-card dark:bg-gray-800 border-border dark:border-gray-600 text-gray-400 dark:text-gray-500"
              )}>
                {idx < currentStep ? <Check className="w-4 h-4" /> : idx + 1}
              </div>
              <span className={cn(
                "text-xs font-medium hidden md:block absolute top-10 w-24 text-center",
                idx <= currentStep ? "text-foreground dark:text-gray-200" : "text-muted-foreground"
              )}>
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Card className="w-full max-w-3xl p-8 relative overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <BrainCircuit className="w-16 h-16 text-blue-600 dark:text-blue-400 animate-pulse mb-6" />
            <h3 className="text-xl font-bold text-foreground dark:text-white mb-2">Analyzing Profile...</h3>
            <p className="text-muted-foreground dark:text-gray-400 text-center max-w-md">
              Our AI is extracting key traits from your responses, matching your skills against industry standards, and building your compatibility graph.
            </p>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            {currentStep === 0 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Basic Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input defaultValue="Alex" />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input defaultValue="Chen" />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input defaultValue="San Francisco, CA" />
                  </div>
                  <div className="space-y-2">
                    <Label>Preferred Role</Label>
                    <Input defaultValue="Frontend Engineer" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Education Background</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>University / Institution</Label>
                    <Input defaultValue="Stanford University" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Major / Field of Study</Label>
                      <Input defaultValue="Computer Science" />
                    </div>
                    <div className="space-y-2">
                      <Label>Graduation Year</Label>
                      <Select defaultValue="2027">
                        <option>2025</option>
                        <option>2026</option>
                        <option>2027</option>
                        <option>2028</option>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Technical Skills</h2>
                <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">Select your core technical skills and your self-assessed proficiency.</p>
                <div className="space-y-4">
                  {['React', 'TypeScript', 'Node.js', 'Python'].map(skill => (
                    <div key={skill} className="flex items-center gap-4">
                      <div className="w-32 font-medium text-foreground dark:text-white">{skill}</div>
                      <input type="range" className="flex-1 accent-blue-600" min="1" max="5" defaultValue="3" />
                      <div className="w-24 text-sm text-muted-foreground text-right">Intermediate</div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full border-dashed">
                    + Add Another Skill
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Soft Skills</h2>
                <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">How would you rate your abilities in these areas?</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Communication', 'Teamwork', 'Problem Solving', 'Leadership'].map(skill => (
                    <Card key={skill} className="p-4 border border-border dark:border-gray-700 bg-background dark:bg-gray-800/50">
                      <Label className="mb-2 block">{skill}</Label>
                      <div className="flex gap-2">
                        {[1,2,3,4,5].map(rating => (
                          <button key={rating} className="w-8 h-8 rounded-full border border-border dark:border-gray-600 hover:border-blue-500 focus:bg-blue-600 focus:text-white dark:text-gray-300 transition-colors">
                            {rating}
                          </button>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Interests & Career Direction</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>What industries interest you most?</Label>
                    <div className="flex flex-wrap gap-2">
                      {['Fintech', 'Healthtech', 'Edtech', 'E-commerce', 'AI/ML', 'Gaming', 'SaaS'].map(tag => (
                        <button key={tag} className="px-3 py-1.5 rounded-full border border-border dark:border-gray-600 text-sm hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors dark:text-gray-300">
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2 pt-4">
                    <Label>Preferred Work Environment</Label>
                    <Select defaultValue="hybrid">
                      <option value="remote">Fully Remote</option>
                      <option value="hybrid">Hybrid (Some days in office)</option>
                      <option value="onsite">On-site</option>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Behavioral & Work Style</h2>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-base font-medium">Scenario: A project deadline is approaching, and a key feature is failing. What is your immediate reaction?</Label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 p-3 border border-border dark:border-gray-700 rounded-lg hover:bg-secondary dark:hover:bg-gray-800 cursor-pointer">
                        <input type="radio" name="q1" className="text-blue-600 w-4 h-4" />
                        <span className="text-sm dark:text-gray-300">Pause development and rewrite the failing part from scratch.</span>
                      </label>
                      <label className="flex items-center gap-3 p-3 border border-border dark:border-gray-700 rounded-lg hover:bg-secondary dark:hover:bg-gray-800 cursor-pointer">
                        <input type="radio" name="q1" className="text-blue-600 w-4 h-4" />
                        <span className="text-sm dark:text-gray-300">Communicate the block to the team and collaborate on a workaround.</span>
                      </label>
                      <label className="flex items-center gap-3 p-3 border border-border dark:border-gray-700 rounded-lg hover:bg-secondary dark:hover:bg-gray-800 cursor-pointer">
                        <input type="radio" name="q1" className="text-blue-600 w-4 h-4" />
                        <span className="text-sm dark:text-gray-300">Work late individually to try and solve the problem myself.</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 6 && (
              <div className="space-y-8 text-center animate-in fade-in zoom-in-95 duration-500">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full mb-4">
                  <Check className="w-12 h-12" />
                </div>
                <h2 className="text-3xl font-bold text-foreground dark:text-white mb-2">Profile Generated!</h2>
                <p className="text-muted-foreground dark:text-gray-400 max-w-lg mx-auto mb-8">
                  Your AI profile is ready. You have a Profile Strength of <strong className="text-blue-600 dark:text-blue-400">92%</strong> based on your responses. We've identified strong matches in Frontend Engineering roles.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <Card className="p-4 bg-background dark:bg-gray-800/50">
                    <div className="text-2xl font-bold text-foreground dark:text-white">92%</div>
                    <div className="text-xs text-muted-foreground uppercase font-semibold">Profile Strength</div>
                  </Card>
                  <Card className="p-4 bg-background dark:bg-gray-800/50">
                    <div className="text-2xl font-bold text-foreground dark:text-white">12</div>
                    <div className="text-xs text-muted-foreground uppercase font-semibold">Matched Roles</div>
                  </Card>
                  <Card className="p-4 bg-background dark:bg-gray-800/50">
                    <div className="text-2xl font-bold text-foreground dark:text-white">React</div>
                    <div className="text-xs text-muted-foreground uppercase font-semibold">Top Skill</div>
                  </Card>
                  <Card className="p-4 bg-background dark:bg-gray-800/50">
                    <div className="text-2xl font-bold text-foreground dark:text-white">Teamwork</div>
                    <div className="text-xs text-muted-foreground uppercase font-semibold">Top Trait</div>
                  </Card>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between mt-8 pt-6 border-t border-border dark:border-gray-700">
          <Button variant="outline" onClick={handlePrev} disabled={currentStep === 0 || loading || currentStep === steps.length - 1}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <Button onClick={handleNext} disabled={loading}>
            {currentStep === steps.length - 1 ? 'Go to Dashboard' : (currentStep === steps.length - 2 ? 'Generate Profile' : 'Continue')}
            {currentStep !== steps.length - 1 && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </Card>
    </div>
  );
};
