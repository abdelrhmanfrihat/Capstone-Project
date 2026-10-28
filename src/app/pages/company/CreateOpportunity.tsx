import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import {
  CheckCircle2,
  Briefcase,
  Settings,
  Calendar,
  Brain,
  FileCheck,
  ChevronRight,
  Users,
  TrendingUp,
  Lightbulb,
  X,
  Building2,
  Mail,
  Globe
} from "lucide-react";

interface FormData {
  // Step 1: Basic Information
  title: string;
  type: string;
  field: string;
  shortSummary: string;
  fullDescription: string;
  seats: number;
  visibility: string;

  // Step 2: Requirements
  technicalSkills: Array<{ skill: string; level: string }>;
  softSkills: string[];
  preferredMajor: string;
  minYearLevel: string;
  experienceLevel: string;
  workMode: string;
  requiredTraits: string[];
  matchingWeights: {
    technical: number;
    soft: number;
    interests: number;
    behavioral: number;
  };

  // Step 3: Training Details
  location: string;
  city: string;
  duration: string;
  startDate: string;
  deadline: string;
  weeklyHours: string;
  compensation: string;
  mentorName: string;
  contactEmail: string;
  learningOutcomes: string[];
}

const TECHNICAL_SKILLS = [
  "React", "TypeScript", "JavaScript", "Node.js", "Python", "SQL",
  "APIs", "Git", "Figma", "Tailwind CSS", "Machine Learning", "Data Analysis"
];

const SOFT_SKILLS = [
  "Communication", "Teamwork", "Problem Solving", "Leadership",
  "Adaptability", "Time Management", "Critical Thinking", "Self Learning"
];

const TRAITS = [
  "Fast learner", "Collaborative", "Detail-oriented",
  "Creative problem solver", "Independent worker", "Comfortable with feedback"
];

export function CreateOpportunity() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    type: "Internship",
    field: "",
    shortSummary: "",
    fullDescription: "",
    seats: 1,
    visibility: "Public",
    technicalSkills: [],
    softSkills: [],
    preferredMajor: "",
    minYearLevel: "",
    experienceLevel: "",
    workMode: "",
    requiredTraits: [],
    matchingWeights: {
      technical: 40,
      soft: 25,
      interests: 15,
      behavioral: 20
    },
    location: "",
    city: "",
    duration: "",
    startDate: "",
    deadline: "",
    weeklyHours: "",
    compensation: "",
    mentorName: "",
    contactEmail: "",
    learningOutcomes: ["", "", ""]
  });

  const steps = [
    { num: 1, label: "Basic Information", icon: Briefcase },
    { num: 2, label: "Requirements", icon: Settings },
    { num: 3, label: "Training Details", icon: Calendar },
    { num: 4, label: "AI Match Preview", icon: Brain },
    { num: 5, label: "Review & Publish", icon: FileCheck }
  ];

  const toggleTechnicalSkill = (skill: string) => {
    const existing = formData.technicalSkills.find(s => s.skill === skill);
    if (existing) {
      setFormData({
        ...formData,
        technicalSkills: formData.technicalSkills.filter(s => s.skill !== skill)
      });
    } else {
      setFormData({
        ...formData,
        technicalSkills: [...formData.technicalSkills, { skill, level: "Intermediate" }]
      });
    }
  };

  const updateSkillLevel = (skill: string, level: string) => {
    setFormData({
      ...formData,
      technicalSkills: formData.technicalSkills.map(s =>
        s.skill === skill ? { ...s, level } : s
      )
    });
  };

  const toggleSoftSkill = (skill: string) => {
    if (formData.softSkills.includes(skill)) {
      setFormData({
        ...formData,
        softSkills: formData.softSkills.filter(s => s !== skill)
      });
    } else {
      setFormData({
        ...formData,
        softSkills: [...formData.softSkills, skill]
      });
    }
  };

  const toggleTrait = (trait: string) => {
    if (formData.requiredTraits.includes(trait)) {
      setFormData({
        ...formData,
        requiredTraits: formData.requiredTraits.filter(t => t !== trait)
      });
    } else {
      setFormData({
        ...formData,
        requiredTraits: [...formData.requiredTraits, trait]
      });
    }
  };

  const handlePublish = () => {
    setShowSuccessModal(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Post New Opportunity</h1>
        <p className="text-[var(--text-muted)]">
          Create an internship or training opportunity and define the ideal student profile for AI-assisted matching.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {steps.map((step, idx) => (
          <React.Fragment key={step.num}>
            <div className="flex items-center gap-3 min-w-fit">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentStep === step.num
                  ? "bg-blue-600 text-white"
                  : currentStep > step.num
                  ? "bg-green-600 text-white"
                  : "bg-muted dark:bg-gray-800 text-[var(--text-muted)]"
              }`}>
                {currentStep > step.num ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <step.icon className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">{step.label}</span>
              </div>
            </div>
            {idx < steps.length - 1 && (
              <ChevronRight className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <Card>
          <CardContent className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-4">Basic Information</h3>
            </div>

            <div>
              <label className="text-sm font-semibold mb-2 block">Opportunity Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Frontend Engineering Intern"
                className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold mb-2 block">Opportunity Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                >
                  <option>Internship</option>
                  <option>Training</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Field / Category *</label>
                <select
                  value={formData.field}
                  onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                  className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                >
                  <option value="">Select a field...</option>
                  <option>Software Development</option>
                  <option>Data Science</option>
                  <option>AI / Machine Learning</option>
                  <option>Cybersecurity</option>
                  <option>UI/UX Design</option>
                  <option>Product Management</option>
                  <option>Marketing Analytics</option>
                  <option>Business Development</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold mb-2 block">Short Summary *</label>
              <textarea
                value={formData.shortSummary}
                onChange={(e) => setFormData({ ...formData, shortSummary: e.target.value })}
                placeholder="Write a short description of the opportunity..."
                className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)] min-h-[80px] resize-y"
              />
            </div>

            <div>
              <label className="text-sm font-semibold mb-2 block">Full Description *</label>
              <textarea
                value={formData.fullDescription}
                onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                placeholder="Describe the responsibilities, goals, and what the student will learn..."
                className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)] min-h-[150px] resize-y"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold mb-2 block">Number of Available Seats *</label>
                <input
                  type="number"
                  value={formData.seats}
                  onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) || 1 })}
                  min="1"
                  className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                />
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Opportunity Visibility</label>
                <select
                  value={formData.visibility}
                  onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                  className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                >
                  <option>Public</option>
                  <option>Private / Invite-only</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-[var(--border-main)]">
              <Button variant="outline">Save Draft</Button>
              <Button onClick={() => setCurrentStep(2)}>Continue</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Requirements */}
      {currentStep === 2 && (
        <Card>
          <CardContent className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-4">Candidate Requirements</h3>
            </div>

            <div>
              <label className="text-sm font-semibold mb-2 block">Technical Skills Required *</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {TECHNICAL_SKILLS.map(skill => (
                  <Badge
                    key={skill}
                    variant={formData.technicalSkills.find(s => s.skill === skill) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleTechnicalSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>

              {formData.technicalSkills.length > 0 && (
                <div className="space-y-3 mt-4">
                  <p className="text-xs text-[var(--text-muted)]">Set required proficiency level for each skill:</p>
                  {formData.technicalSkills.map(({ skill, level }) => (
                    <div key={skill} className="flex items-center justify-between gap-4 p-3 bg-background dark:bg-gray-800/50 rounded-lg">
                      <span className="text-sm font-medium">{skill}</span>
                      <select
                        value={level}
                        onChange={(e) => updateSkillLevel(skill, e.target.value)}
                        className="p-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)] text-sm"
                      >
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold mb-2 block">Preferred Soft Skills</label>
              <div className="flex flex-wrap gap-2">
                {SOFT_SKILLS.map(skill => (
                  <Badge
                    key={skill}
                    variant={formData.softSkills.includes(skill) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleSoftSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold mb-2 block">Preferred Major</label>
                <select
                  value={formData.preferredMajor}
                  onChange={(e) => setFormData({ ...formData, preferredMajor: e.target.value })}
                  className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                >
                  <option value="">Any field</option>
                  <option>Computer Science</option>
                  <option>Software Engineering</option>
                  <option>Data Science</option>
                  <option>Cybersecurity</option>
                  <option>Design</option>
                  <option>Business</option>
                  <option>Any related field</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Minimum Year Level</label>
                <select
                  value={formData.minYearLevel}
                  onChange={(e) => setFormData({ ...formData, minYearLevel: e.target.value })}
                  className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                >
                  <option value="">Any</option>
                  <option>First year</option>
                  <option>Second year</option>
                  <option>Third year</option>
                  <option>Fourth year</option>
                  <option>Fresh graduate</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold mb-2 block">Experience Level</label>
              <select
                value={formData.experienceLevel}
                onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
              >
                <option value="">Select experience level...</option>
                <option>No experience required</option>
                <option>Basic project experience</option>
                <option>Intermediate project experience</option>
                <option>Previous internship preferred</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold mb-2 block">Work Preferences</label>
              <select
                value={formData.workMode}
                onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}
                className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
              >
                <option value="">Select work mode...</option>
                <option>Remote</option>
                <option>Hybrid</option>
                <option>On-site</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold mb-2 block">Required Traits / Behavior</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {TRAITS.map(trait => (
                  <label key={trait} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.requiredTraits.includes(trait)}
                      onChange={() => toggleTrait(trait)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">{trait}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold mb-4 block">Matching Weight Controls</label>
              <p className="text-xs text-[var(--text-muted)] mb-4">
                These weights help the system calculate compatibility scores and rank the most suitable students.
              </p>

              <div className="space-y-4">
                {[
                  { key: "technical", label: "Technical Skills" },
                  { key: "soft", label: "Soft Skills" },
                  { key: "interests", label: "Interests" },
                  { key: "behavioral", label: "Behavioral Fit" }
                ].map(({ key, label }) => (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">{label}</span>
                      <span className="text-sm font-bold">{formData.matchingWeights[key as keyof typeof formData.matchingWeights]}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.matchingWeights[key as keyof typeof formData.matchingWeights]}
                      onChange={(e) => setFormData({
                        ...formData,
                        matchingWeights: {
                          ...formData.matchingWeights,
                          [key]: parseInt(e.target.value)
                        }
                      })}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-[var(--border-main)]">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>Back</Button>
              <Button variant="outline">Save Draft</Button>
              <Button onClick={() => setCurrentStep(3)}>Continue</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Training Details */}
      {currentStep === 3 && (
        <Card>
          <CardContent className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-4">Logistics & Timeline</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold mb-2 block">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Main Office"
                  className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                />
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">City / Country</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g., San Francisco, USA"
                  className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold mb-2 block">Work Mode *</label>
                <select
                  value={formData.workMode}
                  onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}
                  className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                >
                  <option value="">Select work mode...</option>
                  <option>Remote</option>
                  <option>Hybrid</option>
                  <option>On-site</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Duration *</label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                >
                  <option value="">Select duration...</option>
                  <option>1 month</option>
                  <option>2 months</option>
                  <option>3 months</option>
                  <option>6 months</option>
                  <option>Custom</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold mb-2 block">Start Date *</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                />
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Application Deadline *</label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold mb-2 block">Weekly Hours</label>
                <select
                  value={formData.weeklyHours}
                  onChange={(e) => setFormData({ ...formData, weeklyHours: e.target.value })}
                  className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                >
                  <option value="">Select hours...</option>
                  <option>Part-time</option>
                  <option>Full-time</option>
                  <option>Flexible</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Compensation</label>
                <select
                  value={formData.compensation}
                  onChange={(e) => setFormData({ ...formData, compensation: e.target.value })}
                  className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                >
                  <option value="">Select compensation...</option>
                  <option>Paid</option>
                  <option>Unpaid</option>
                  <option>Stipend</option>
                  <option>Not specified</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold mb-2 block">Training Mentor / Supervisor Name</label>
                <input
                  type="text"
                  value={formData.mentorName}
                  onChange={(e) => setFormData({ ...formData, mentorName: e.target.value })}
                  placeholder="e.g., John Smith"
                  className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                />
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Contact Email</label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  placeholder="e.g., mentor@company.com"
                  className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold mb-2 block">What the student will learn (Optional)</label>
              {formData.learningOutcomes.map((outcome, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={outcome}
                  onChange={(e) => {
                    const newOutcomes = [...formData.learningOutcomes];
                    newOutcomes[idx] = e.target.value;
                    setFormData({ ...formData, learningOutcomes: newOutcomes });
                  }}
                  placeholder={`Learning outcome ${idx + 1}`}
                  className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)] mb-2"
                />
              ))}
            </div>

            <div className="flex gap-3 pt-4 border-t border-[var(--border-main)]">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>Back</Button>
              <Button variant="outline">Save Draft</Button>
              <Button onClick={() => setCurrentStep(4)}>Continue</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: AI Match Preview */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-600" />
                AI Match Preview
              </h3>
              <p className="text-sm text-[var(--text-muted)] mb-6">
                See how the system will understand your opportunity and estimate matching quality.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-2 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-[var(--text-muted)]">Estimated Candidate Pool</p>
                        <p className="text-2xl font-bold">184 students</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-200 dark:border-green-800">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-[var(--text-muted)]">Predicted Match Quality</p>
                        <p className="text-2xl font-bold">86%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h4 className="font-bold mb-4">Most Important Matching Factors</h4>
              <div className="flex flex-wrap gap-2">
                {formData.technicalSkills.slice(0, 3).map(({ skill }) => (
                  <Badge key={skill} variant="blue">{skill}</Badge>
                ))}
                {formData.softSkills.slice(0, 2).map(skill => (
                  <Badge key={skill} variant="outline">{skill}</Badge>
                ))}
                {formData.workMode && <Badge variant="outline">{formData.workMode} work</Badge>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h4 className="font-bold mb-4">Candidate Distribution</h4>
              <div className="space-y-3">
                {[
                  { label: "Excellent Match (85-100%)", count: 42, color: "bg-green-600" },
                  { label: "Good Match (70-84%)", count: 76, color: "bg-blue-600" },
                  { label: "Moderate Match (50-69%)", count: 51, color: "bg-amber-500 dark:bg-yellow-600" },
                  { label: "Low Match (<50%)", count: 15, color: "bg-gray-400" }
                ].map(({ label, count, color }) => (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">{label}</span>
                      <span className="text-sm font-bold">{count} students</span>
                    </div>
                    <div className="w-full bg-muted dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`${color} h-2 rounded-full transition-all`}
                        style={{ width: `${(count / 184) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h4 className="font-bold mb-4">Requirement Strength</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Technical clarity", value: "Strong", color: "text-green-600" },
                  { label: "Soft skills clarity", value: "Medium", color: "text-amber-700 dark:text-yellow-600" },
                  { label: "Description clarity", value: "Strong", color: "text-green-600" },
                  { label: "Timeline clarity", value: formData.startDate ? "Strong" : "Needs attention", color: formData.startDate ? "text-green-600" : "text-red-600" }
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex items-center justify-between p-3 bg-background dark:bg-gray-800/50 rounded-lg">
                    <span className="text-sm">{label}</span>
                    <span className={`text-sm font-bold ${color}`}>{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20">
            <CardContent className="p-6">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-purple-600" />
                AI Suggestions
              </h4>
              <ul className="space-y-2 text-sm">
                {formData.technicalSkills.length < 3 && (
                  <li className="flex gap-2">
                    <span className="text-purple-600">•</span>
                    <span>Add more technical skills to improve match accuracy.</span>
                  </li>
                )}
                {formData.softSkills.length === 0 && (
                  <li className="flex gap-2">
                    <span className="text-purple-600">•</span>
                    <span>Add soft skill expectations to improve behavioral matching.</span>
                  </li>
                )}
                {!formData.workMode && (
                  <li className="flex gap-2">
                    <span className="text-purple-600">•</span>
                    <span>Clarify whether this is remote, hybrid, or on-site.</span>
                  </li>
                )}
                {formData.technicalSkills.length >= 3 && formData.softSkills.length > 0 && formData.workMode && (
                  <li className="flex gap-2">
                    <span className="text-purple-600">•</span>
                    <span>Your opportunity is well-defined and ready to attract strong matches!</span>
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setCurrentStep(3)}>Back</Button>
            <Button variant="outline" onClick={() => setCurrentStep(2)}>Improve Requirements</Button>
            <Button onClick={() => setCurrentStep(5)}>Continue to Review</Button>
          </div>
        </div>
      )}

      {/* Step 5: Review & Publish */}
      {currentStep === 5 && (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-4">Review Opportunity</h3>
                <p className="text-sm text-[var(--text-muted)]">
                  Review all details before publishing your opportunity.
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-3">Opportunity Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-background dark:bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-muted)] mb-1">TITLE</p>
                    <p className="text-sm">{formData.title || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-muted)] mb-1">TYPE</p>
                    <p className="text-sm">{formData.type}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-muted)] mb-1">FIELD</p>
                    <p className="text-sm">{formData.field || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-muted)] mb-1">SEATS</p>
                    <p className="text-sm">{formData.seats}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-xs font-semibold text-[var(--text-muted)] mb-1">DESCRIPTION</p>
                    <p className="text-sm text-[var(--text-muted)]">{formData.fullDescription || "Not specified"}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-3">Requirements</h4>
                <div className="space-y-3 p-4 bg-background dark:bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-muted)] mb-2">TECHNICAL SKILLS</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.technicalSkills.map(({ skill, level }) => (
                        <Badge key={skill} variant="blue">
                          {skill} ({level})
                        </Badge>
                      ))}
                      {formData.technicalSkills.length === 0 && (
                        <span className="text-sm text-[var(--text-muted)]">None specified</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-muted)] mb-2">SOFT SKILLS</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.softSkills.map(skill => (
                        <Badge key={skill} variant="outline">{skill}</Badge>
                      ))}
                      {formData.softSkills.length === 0 && (
                        <span className="text-sm text-[var(--text-muted)]">None specified</span>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-[var(--text-muted)] mb-1">EXPERIENCE LEVEL</p>
                      <p className="text-sm">{formData.experienceLevel || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[var(--text-muted)] mb-1">PREFERRED MAJOR</p>
                      <p className="text-sm">{formData.preferredMajor || "Any"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-3">Training Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-background dark:bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-muted)] mb-1">LOCATION</p>
                    <p className="text-sm">{formData.city || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-muted)] mb-1">WORK MODE</p>
                    <p className="text-sm">{formData.workMode || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-muted)] mb-1">DURATION</p>
                    <p className="text-sm">{formData.duration || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-muted)] mb-1">COMPENSATION</p>
                    <p className="text-sm">{formData.compensation || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-muted)] mb-1">START DATE</p>
                    <p className="text-sm">{formData.startDate || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-muted)] mb-1">DEADLINE</p>
                    <p className="text-sm">{formData.deadline || "Not specified"}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-3">AI Match Preview</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-muted)] mb-1">CANDIDATE POOL</p>
                    <p className="text-sm font-bold">184 students</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-muted)] mb-1">MATCH QUALITY</p>
                    <p className="text-sm font-bold">86%</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-muted)] mb-1">EXCELLENT MATCHES</p>
                    <p className="text-sm font-bold">42 students</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[var(--border-main)]">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">I confirm the opportunity details are accurate.</span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">I understand that students will be matched based on these requirements.</span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">I agree that I can edit or close this opportunity later.</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-[var(--border-main)]">
                <Button variant="outline" onClick={() => setCurrentStep(4)}>Back</Button>
                <Button variant="outline">Save as Draft</Button>
                <Button onClick={handlePublish}>Publish Opportunity</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Opportunity Published Successfully</h3>
                  <p className="text-sm text-[var(--text-muted)]">
                    Your opportunity is now live. The system will start recommending suitable students based on your requirements.
                  </p>
                </div>
                <div className="flex flex-col gap-2 pt-4">
                  <Button onClick={() => navigate("/company/opportunities")}>View Opportunity</Button>
                  <Button variant="outline" onClick={() => navigate("/company/candidates")}>
                    View Matched Candidates
                  </Button>
                  <Button variant="outline" onClick={() => navigate("/company/dashboard")}>
                    Back to Dashboard
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
