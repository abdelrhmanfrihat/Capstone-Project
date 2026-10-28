import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { MOCK_STUDENTS } from "../../data/mockData";
import { TrendingUp, Plus, X, Loader2 } from "lucide-react";

type TabType = "basic" | "education" | "technical" | "soft" | "interests" | "behavioral" | "preferences" | "review";

export function UpdateProfile() {
  const navigate = useNavigate();
  const student = MOCK_STUDENTS[0];
  const [activeTab, setActiveTab] = useState<TabType>("basic");
  const [showRecalculateModal, setShowRecalculateModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
    name: student.name,
    email: "alex.chen@example.com",
    location: student.location,
    phone: "",
    bio: "Passionate frontend developer with strong interest in modern web technologies",
    university: student.university,
    major: student.major,
    graduationYear: student.graduationYear,
    academicLevel: "Junior",
    gpa: "3.8",
    technicalSkills: student.skills.technical,
    softSkills: {
      Communication: 4,
      Teamwork: 5,
      ProblemSolving: 4,
      Leadership: 3,
      Adaptability: 4,
      TimeManagement: 4,
      SelfLearning: 5
    },
    interests: ["Web Development", "AI / Machine Learning", "UI/UX Design"],
    behavioralTraits: ["Collaborative", "Fast Learner", "Detail-Oriented"],
    workMode: "Remote",
    opportunityType: "Both",
    preferredDuration: "3 months",
    preferredFields: ["Software Development", "UI/UX"]
  });

  const [changes, setChanges] = useState<string[]>([]);

  const tabs: { id: TabType; label: string }[] = [
    { id: "basic", label: "Basic Info" },
    { id: "education", label: "Education" },
    { id: "technical", label: "Technical Skills" },
    { id: "soft", label: "Soft Skills" },
    { id: "interests", label: "Interests" },
    { id: "behavioral", label: "Behavioral" },
    { id: "preferences", label: "Work Preferences" },
    { id: "review", label: "Review & Recalculate" }
  ];

  const suggestedSkills = [
    { name: "SQL", reason: "Required for 4 top matches" },
    { name: "AWS / Cloud", reason: "High demand in industry" },
    { name: "REST APIs", reason: "Core backend skill" },
    { name: "Docker", reason: "DevOps opportunity alignment" }
  ];

  const recalculationSteps = [
    "Updating profile",
    "Re-analyzing skills",
    "Comparing with opportunity requirements",
    "Updating compatibility scores",
    "Generating new recommendations"
  ];

  const addTechnicalSkill = (skillName: string) => {
    const newSkill = { name: skillName, level: "Beginner" as const };
    setFormData({ ...formData, technicalSkills: [...formData.technicalSkills, newSkill] });
    setChanges([...changes, `Added ${skillName} as Beginner`]);
  };

  const removeTechnicalSkill = (skillName: string) => {
    setFormData({
      ...formData,
      technicalSkills: formData.technicalSkills.filter(s => s.name !== skillName)
    });
    setChanges([...changes, `Removed ${skillName}`]);
  };

  const updateSkillLevel = (skillName: string, level: "Beginner" | "Intermediate" | "Advanced") => {
    setFormData({
      ...formData,
      technicalSkills: formData.technicalSkills.map(s =>
        s.name === skillName ? { ...s, level } : s
      )
    });
    setChanges([...changes, `Updated ${skillName} to ${level}`]);
  };

  const toggleInterest = (interest: string) => {
    if (formData.interests.includes(interest)) {
      setFormData({ ...formData, interests: formData.interests.filter(i => i !== interest) });
    } else {
      setFormData({ ...formData, interests: [...formData.interests, interest] });
    }
  };

  const toggleTrait = (trait: string) => {
    if (formData.behavioralTraits.includes(trait)) {
      setFormData({ ...formData, behavioralTraits: formData.behavioralTraits.filter(t => t !== trait) });
    } else {
      setFormData({ ...formData, behavioralTraits: [...formData.behavioralTraits, trait] });
    }
  };

  const handleRecalculate = () => {
    setShowRecalculateModal(true);
    setIsRecalculating(true);
    setCurrentStep(0);

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= recalculationSteps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setIsRecalculating(false);
            setShowRecalculateModal(false);
            setShowSuccessModal(true);
          }, 500);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
  };

  const availableInterests = [
    "Web Development",
    "Mobile Development",
    "AI / Machine Learning",
    "Data Science",
    "Cybersecurity",
    "UI/UX Design",
    "Cloud Computing",
    "Product Management",
    "Business Analysis"
  ];

  const availableTraits = [
    "Collaborative",
    "Fast Learner",
    "Independent Worker",
    "Detail-Oriented",
    "Comfortable with Feedback",
    "Creative Problem Solver"
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Update AI Profile</h1>
        <p className="text-[var(--text-muted)]">Update your skills, interests, and assessment answers to improve future matches.</p>
      </div>

      {/* Profile Status Card */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white border-none">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-blue-100 mb-1">Profile Strength</div>
              <div className="text-3xl font-bold">{student.profileStrength}%</div>
            </div>
            <div>
              <div className="text-sm text-blue-100 mb-1">Last Updated</div>
              <div className="text-xl font-semibold">May 17, 2026</div>
            </div>
            <div>
              <div className="text-sm text-blue-100 mb-1 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                AI Recommendation
              </div>
              <div className="text-sm">Adding SQL and AWS / Cloud basics could unlock 15+ new matching opportunities.</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? "bg-blue-600 text-white"
                : "bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <Card>
        <CardContent className="p-6">
          {activeTab === "basic" && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg mb-4">Basic Information</h3>
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border-main)] bg-[var(--bg-main)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border-main)] bg-[var(--bg-main)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border-main)] bg-[var(--bg-main)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number <span className="text-[var(--text-muted)]">(optional)</span></label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border-main)] bg-[var(--bg-main)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Short Bio</label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border-main)] bg-[var(--bg-main)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
              </div>
            </div>
          )}

          {activeTab === "education" && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg mb-4">Education</h3>
              <div>
                <label className="block text-sm font-medium mb-1">University</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border-main)] bg-[var(--bg-main)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Major</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border-main)] bg-[var(--bg-main)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.major}
                  onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Graduation Year</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border-main)] bg-[var(--bg-main)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.graduationYear}
                  onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Current Academic Level</label>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border-main)] bg-[var(--bg-main)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.academicLevel}
                  onChange={(e) => setFormData({ ...formData, academicLevel: e.target.value })}
                >
                  <option>Freshman</option>
                  <option>Sophomore</option>
                  <option>Junior</option>
                  <option>Senior</option>
                  <option>Graduate</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">GPA <span className="text-[var(--text-muted)]">(optional)</span></label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border-main)] bg-[var(--bg-main)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.gpa}
                  onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                />
              </div>
            </div>
          )}

          {activeTab === "technical" && (
            <div className="space-y-6">
              <h3 className="font-bold text-lg mb-4">Technical Skills</h3>

              <div>
                <h4 className="font-semibold mb-3">Current Skills</h4>
                <div className="space-y-3">
                  {formData.technicalSkills.map(skill => (
                    <div key={skill.name} className="flex items-center justify-between p-3 bg-[var(--bg-secondary)] rounded-lg">
                      <span className="font-medium">{skill.name}</span>
                      <div className="flex items-center gap-3">
                        <select
                          className="px-3 py-1 rounded-lg border border-[var(--border-main)] bg-[var(--bg-main)] text-sm"
                          value={skill.level}
                          onChange={(e) => updateSkillLevel(skill.name, e.target.value as any)}
                        >
                          <option>Beginner</option>
                          <option>Intermediate</option>
                          <option>Advanced</option>
                        </select>
                        <button
                          onClick={() => removeTechnicalSkill(skill.name)}
                          className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-main)]">
                <h4 className="font-semibold mb-2">Suggested Skills</h4>
                <p className="text-sm text-[var(--text-muted)] mb-3">Based on your top matches, consider adding:</p>
                <div className="space-y-2">
                  {suggestedSkills.map(skill => (
                    <div key={skill.name} className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                      <div>
                        <div className="font-medium">{skill.name}</div>
                        <div className="text-xs text-[var(--text-muted)]">{skill.reason}</div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => addTechnicalSkill(skill.name)}>
                        <Plus className="w-4 h-4 mr-1" /> Add
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "soft" && (
            <div className="space-y-6">
              <h3 className="font-bold text-lg mb-4">Soft Skills</h3>
              <p className="text-sm text-[var(--text-muted)]">Soft skill updates may affect compatibility scores with company requirements.</p>

              {Object.entries(formData.softSkills).map(([skill, rating]) => (
                <div key={skill}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{skill}</span>
                    <span className="text-sm font-semibold text-blue-600">{rating}/5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setFormData({
                      ...formData,
                      softSkills: { ...formData.softSkills, [skill]: parseInt(e.target.value) }
                    })}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === "interests" && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg mb-4">Interests & Career Direction</h3>
              <div className="flex flex-wrap gap-2">
                {availableInterests.map(interest => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      formData.interests.includes(interest)
                        ? "bg-blue-600 text-white"
                        : "bg-[var(--bg-secondary)] text-[var(--text-main)] hover:bg-gray-100 dark:hover:bg-gray-800 border border-[var(--border-main)]"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === "behavioral" && (
            <div className="space-y-6">
              <h3 className="font-bold text-lg mb-4">Behavioral Profile</h3>
              <p className="text-sm text-[var(--text-muted)]">Select traits that describe your work style and approach.</p>

              <div className="flex flex-wrap gap-2">
                {availableTraits.map(trait => (
                  <button
                    key={trait}
                    onClick={() => toggleTrait(trait)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      formData.behavioralTraits.includes(trait)
                        ? "bg-blue-600 text-white"
                        : "bg-[var(--bg-secondary)] text-[var(--text-main)] hover:bg-gray-100 dark:hover:bg-gray-800 border border-[var(--border-main)]"
                    }`}
                  >
                    {trait}
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-[var(--border-main)]">
                <Button variant="outline" className="w-full">Retake Behavioral Assessment</Button>
              </div>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="space-y-6">
              <h3 className="font-bold text-lg mb-4">Work Preferences</h3>

              <div>
                <label className="block text-sm font-medium mb-2">Preferred Work Mode</label>
                <div className="space-y-2">
                  {["Remote", "Hybrid", "On-site"].map(mode => (
                    <label key={mode} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="workMode"
                        value={mode}
                        checked={formData.workMode === mode}
                        onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}
                        className="w-4 h-4"
                      />
                      <span>{mode}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Preferred Opportunity Type</label>
                <div className="space-y-2">
                  {["Internship", "Training", "Both"].map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="opportunityType"
                        value={type}
                        checked={formData.opportunityType === type}
                        onChange={(e) => setFormData({ ...formData, opportunityType: e.target.value })}
                        className="w-4 h-4"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Preferred Duration</label>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border-main)] bg-[var(--bg-main)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.preferredDuration}
                  onChange={(e) => setFormData({ ...formData, preferredDuration: e.target.value })}
                >
                  <option>1 month</option>
                  <option>2 months</option>
                  <option>3 months</option>
                  <option>6 months</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Preferred Fields</label>
                <div className="flex flex-wrap gap-2">
                  {["Software Development", "Data Science", "UI/UX", "Cybersecurity", "AI"].map(field => (
                    <button
                      key={field}
                      onClick={() => {
                        if (formData.preferredFields.includes(field)) {
                          setFormData({ ...formData, preferredFields: formData.preferredFields.filter(f => f !== field) });
                        } else {
                          setFormData({ ...formData, preferredFields: [...formData.preferredFields, field] });
                        }
                      }}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        formData.preferredFields.includes(field)
                          ? "bg-blue-600 text-white"
                          : "bg-[var(--bg-secondary)] text-[var(--text-main)] hover:bg-gray-100 dark:hover:bg-gray-800 border border-[var(--border-main)]"
                      }`}
                    >
                      {field}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "review" && (
            <div className="space-y-6">
              <h3 className="font-bold text-lg mb-4">Review & Recalculate</h3>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                <h4 className="font-semibold mb-3">Profile Update Summary</h4>
                {changes.length > 0 ? (
                  <ul className="space-y-1 text-sm">
                    {changes.slice(-5).map((change, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                        {change}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-[var(--text-muted)]">No changes made yet</p>
                )}
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
                <h4 className="font-semibold mb-3">Estimated Impact</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Profile strength:</span>
                    <span className="font-semibold">92% → 96%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frontend Engineering Intern match:</span>
                    <span className="font-semibold">94% → 99%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>New opportunities unlocked:</span>
                    <span className="font-semibold text-green-600">+15</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Better matches in:</span>
                    <span className="font-semibold">Backend, Cloud, Full Stack</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1">Save Changes</Button>
                <Button className="flex-1" onClick={handleRecalculate}>Save & Recalculate Matches</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recalculating Modal */}
      {showRecalculateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-6 text-center">Recalculating Your Matches</h3>
              <div className="space-y-3">
                {recalculationSteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {index < currentStep ? (
                      <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : index === currentStep ? (
                      <Loader2 className="w-5 h-5 text-blue-600 animate-spin shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 shrink-0"></div>
                    )}
                    <span className={index <= currentStep ? "font-medium" : "text-[var(--text-muted)]"}>{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Profile Updated Successfully</h3>
              <p className="text-[var(--text-muted)] mb-6">Your AI profile has been updated and your match scores were recalculated.</p>

              <div className="bg-[var(--bg-secondary)] p-4 rounded-lg mb-6 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Profile Strength:</span>
                  <span className="font-semibold">92% → 96%</span>
                </div>
                <div className="flex justify-between">
                  <span>New Matches:</span>
                  <span className="font-semibold text-green-600">+15</span>
                </div>
                <div className="flex justify-between">
                  <span>Improved Match:</span>
                  <span className="font-semibold">Frontend Engineering Intern 94% → 99%</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => navigate("/student/dashboard")}>
                  Back to Dashboard
                </Button>
                <Button className="flex-1" onClick={() => navigate("/student/ai-matches")}>
                  View Updated Matches
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
