import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { MatchScore } from "../../components/ui/MatchScore";
import { Input } from "../../components/ui/input";
import { Search, Filter, Mail, Calendar, Star, GraduationCap, MapPin, X, ChevronDown, ChevronUp, Lightbulb } from "lucide-react";

const TECHNICAL_SKILLS = [
  "React", "TypeScript", "JavaScript", "Node.js", "Python", "Java",
  "SQL", "APIs", "Git", "AWS", "Docker", "Figma", "Tailwind CSS",
  "Machine Learning", "Data Analysis"
];

const SOFT_SKILLS = [
  "Communication", "Teamwork", "Problem Solving", "Leadership",
  "Adaptability", "Time Management", "Critical Thinking", "Self Learning",
  "Creativity", "Responsibility"
];

const INTERESTS = [
  "Web Development", "Mobile Development", "Data Science", "AI / Machine Learning",
  "Cybersecurity", "UI/UX Design", "Product Management", "Cloud Computing",
  "Business Analysis", "Digital Marketing", "Sustainability", "FinTech",
  "HealthTech", "EdTech"
];

interface Filters {
  matchScore: number;
  technicalSkills: string[];
  skillLevel: string;
  skillMatchLogic: string;
  softSkills: string[];
  interests: string[];
  availability: string[];
  university: string;
  major: string;
  graduationYear: string;
  location: string[];
  profileStrength: number;
}

export function CompanyCandidates() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "matchScore", "technicalSkills", "interests"
  ]);

  const [filters, setFilters] = useState<Filters>({
    matchScore: 80,
    technicalSkills: [],
    skillLevel: "Any Level",
    skillMatchLogic: "Match any selected skill",
    softSkills: [],
    interests: [],
    availability: [],
    university: "",
    major: "",
    graduationYear: "",
    location: [],
    profileStrength: 70
  });

  const allCandidates = [
    {
      id: 1,
      name: "Alex Chen",
      university: "Stanford University",
      major: "Computer Science",
      graduationYear: 2026,
      matchScore: 94,
      profileStrength: 92,
      topSkills: ["React", "TypeScript", "Node.js"],
      softSkills: ["Communication", "Teamwork", "Problem Solving"],
      interests: ["Web Development", "AI / Machine Learning"],
      availability: "Available Now",
      location: "California, USA",
      matchReason: "Strong match because Alex has React, TypeScript, and Web Development interest."
    },
    {
      id: 2,
      name: "Sarah Johnson",
      university: "MIT",
      major: "Software Engineering",
      graduationYear: 2026,
      matchScore: 91,
      profileStrength: 88,
      topSkills: ["Python", "Java", "AWS"],
      softSkills: ["Leadership", "Problem Solving", "Adaptability"],
      interests: ["Cloud Computing", "Data Science"],
      availability: "Available Soon",
      location: "Massachusetts, USA",
      matchReason: "Excellent technical foundation with Python and AWS, strong problem-solving skills."
    },
    {
      id: 3,
      name: "Michael Zhang",
      university: "UC Berkeley",
      major: "Computer Science",
      graduationYear: 2027,
      matchScore: 87,
      profileStrength: 85,
      topSkills: ["JavaScript", "React", "GraphQL"],
      softSkills: ["Creativity", "Self Learning", "Time Management"],
      interests: ["Web Development", "Mobile Development"],
      availability: "Available Now",
      location: "California, USA",
      matchReason: "Great fit with React and JavaScript expertise, creative problem solver."
    },
    {
      id: 4,
      name: "Emily Williams",
      university: "Carnegie Mellon",
      major: "Human-Computer Interaction",
      graduationYear: 2026,
      matchScore: 89,
      profileStrength: 90,
      topSkills: ["UI/UX", "React", "Figma"],
      softSkills: ["Communication", "Creativity", "Critical Thinking"],
      interests: ["UI/UX Design", "Web Development"],
      availability: "Available Soon",
      location: "Pennsylvania, USA",
      matchReason: "Perfect blend of design and development skills with strong UI/UX background."
    },
    {
      id: 5,
      name: "David Park",
      university: "University of Jordan",
      major: "Software Engineering",
      graduationYear: 2026,
      matchScore: 82,
      profileStrength: 78,
      topSkills: ["TypeScript", "Node.js", "Docker"],
      softSkills: ["Teamwork", "Responsibility", "Self Learning"],
      interests: ["Web Development", "Cloud Computing"],
      availability: "Available Now",
      location: "Jordan",
      matchReason: "Solid backend skills with TypeScript and Node.js, strong team player."
    }
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const toggleFilter = (category: keyof Filters, value: string) => {
    setFilters(prev => {
      const current = prev[category] as string[];
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter(v => v !== value) };
      } else {
        return { ...prev, [category]: [...current, value] };
      }
    });
  };

  const resetFilters = () => {
    setFilters({
      matchScore: 80,
      technicalSkills: [],
      skillLevel: "Any Level",
      skillMatchLogic: "Match any selected skill",
      softSkills: [],
      interests: [],
      availability: [],
      university: "",
      major: "",
      graduationYear: "",
      location: [],
      profileStrength: 70
    });
  };

  const applyFilters = () => {
    setShowFilterDrawer(false);
  };

  const removeActiveFilter = (category: keyof Filters, value: string) => {
    if (Array.isArray(filters[category])) {
      setFilters(prev => ({
        ...prev,
        [category]: (prev[category] as string[]).filter(v => v !== value)
      }));
    }
  };

  const getActiveFilters = () => {
    const active: Array<{ category: keyof Filters; value: string; label: string }> = [];

    if (filters.matchScore !== 80) {
      active.push({ category: "matchScore", value: String(filters.matchScore), label: `Match ${filters.matchScore}%+` });
    }

    filters.technicalSkills.forEach(skill => {
      active.push({ category: "technicalSkills", value: skill, label: skill });
    });

    filters.softSkills.forEach(skill => {
      active.push({ category: "softSkills", value: skill, label: skill });
    });

    filters.interests.forEach(interest => {
      active.push({ category: "interests", value: interest, label: interest });
    });

    filters.availability.forEach(status => {
      active.push({ category: "availability", value: status, label: status });
    });

    return active;
  };

  const activeFilters = getActiveFilters();

  // Filter candidates based on active filters
  const candidates = allCandidates.filter(candidate => {
    if (candidate.matchScore < filters.matchScore) return false;
    if (candidate.profileStrength < filters.profileStrength) return false;

    if (filters.technicalSkills.length > 0) {
      const hasSkill = filters.technicalSkills.some(skill =>
        candidate.topSkills.includes(skill)
      );
      if (!hasSkill) return false;
    }

    if (filters.softSkills.length > 0) {
      const hasSoftSkill = filters.softSkills.some(skill =>
        candidate.softSkills.includes(skill)
      );
      if (!hasSoftSkill) return false;
    }

    if (filters.interests.length > 0) {
      const hasInterest = filters.interests.some(interest =>
        candidate.interests.includes(interest)
      );
      if (!hasInterest) return false;
    }

    if (filters.availability.length > 0 && !filters.availability.includes(candidate.availability)) {
      return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Candidate Discovery</h1>
        <p className="text-[var(--text-muted)]">
          AI-matched candidates for your Frontend Engineering Intern position.
        </p>
      </div>

      {/* Search & Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, university, or skills..."
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setShowFilterDrawer(true)}
            >
              <Filter className="w-4 h-4" />
              Filters
              {activeFilters.length > 0 && (
                <Badge variant="default" className="ml-1">{activeFilters.length}</Badge>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Filters Bar */}
      {activeFilters.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-[var(--text-muted)]">Active Filters:</span>
              {activeFilters.map((filter, idx) => (
                <Badge key={idx} variant="default" className="gap-2">
                  {filter.label}
                  <button
                    onClick={() => removeActiveFilter(filter.category, filter.value)}
                    className="hover:bg-card/20 rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={resetFilters}
                className="ml-2"
              >
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Candidates List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">
            {candidates.length > 0
              ? activeFilters.length > 0
                ? `${candidates.length} candidates match your filters`
                : `${candidates.length} High-Match Candidates`
              : "No candidates found"}
          </h3>
          <select className="border rounded-md px-3 py-1.5 text-sm bg-transparent border-[var(--border-main)]">
            <option>Sort by: Best Match</option>
            <option>Sort by: Highest Profile Strength</option>
            <option>Sort by: Most Relevant Skills</option>
            <option>Sort by: Recently Updated</option>
            <option>Sort by: Available Soonest</option>
          </select>
        </div>

        {candidates.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-muted dark:bg-gray-800 rounded-full">
                  <Search className="w-12 h-12 text-[var(--text-muted)]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">No candidates found</h3>
                  <p className="text-[var(--text-muted)] mb-6">
                    Try lowering the match score or removing some skill filters.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button onClick={resetFilters}>Reset Filters</Button>
                  <Button variant="outline" onClick={() => setShowFilterDrawer(true)}>
                    Edit Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          candidates.map((candidate) => (
          <Card key={candidate.id} className="hover:border-blue-300 transition-colors">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar */}
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0">
                  {candidate.name.split(" ").map(n => n[0]).join("")}
                </div>

                {/* Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1">{candidate.name}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-[var(--text-muted)]">
                        <div className="flex items-center gap-1">
                          <GraduationCap className="w-4 h-4" />
                          {candidate.major} @ {candidate.university}
                        </div>
                        <span>•</span>
                        <span>Graduating {candidate.graduationYear}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-[var(--text-muted)] mt-1">
                        <MapPin className="w-4 h-4" />
                        {candidate.location}
                      </div>
                    </div>
                    <MatchScore score={candidate.matchScore} />
                  </div>

                  {/* Skills & Interests */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-[var(--text-muted)] mb-2">TECHNICAL SKILLS</p>
                      <div className="flex flex-wrap gap-2">
                        {candidate.topSkills.map((skill) => (
                          <Badge key={skill} variant="blue">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[var(--text-muted)] mb-2">SOFT SKILLS</p>
                      <div className="flex flex-wrap gap-2">
                        {candidate.softSkills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[var(--text-muted)] mb-2">INTERESTS</p>
                      <div className="flex flex-wrap gap-2">
                        {candidate.interests.map((interest) => (
                          <Badge key={interest} variant="blue">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="text-sm flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-blue-900 dark:text-blue-100">{candidate.matchReason}</span>
                      </p>
                    </div>
                  </div>

                  {/* Bottom Row */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-3 border-t border-[var(--border-main)]">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="font-semibold">Profile: {candidate.profileStrength}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="text-[var(--text-muted)]">{candidate.availability}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/company/candidates/${candidate.id}`)}
                      >
                        View Profile
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        Invite to Interview
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          ))
        )}
      </div>

      {/* Filter Drawer */}
      {showFilterDrawer && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50"
            onClick={() => setShowFilterDrawer(false)}
          />
          <div className="w-full max-w-md bg-[var(--bg-main)] shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-[var(--bg-main)] border-b border-[var(--border-main)] p-6 z-10">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold">Advanced Candidate Filters</h2>
                <button
                  onClick={() => setShowFilterDrawer(false)}
                  className="p-2 hover:bg-muted dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-[var(--text-muted)] mb-4">
                Narrow candidates by skills, interests, availability, and AI match score.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={resetFilters} className="flex-1">
                  Reset Filters
                </Button>
                <Button onClick={applyFilters} className="flex-1">
                  Apply Filters
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Match Score */}
              <div className="space-y-3">
                <button
                  onClick={() => toggleSection("matchScore")}
                  className="w-full flex items-center justify-between font-semibold"
                >
                  <span>Match Score</span>
                  {expandedSections.includes("matchScore") ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {expandedSections.includes("matchScore") && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-[var(--text-muted)] mb-2 block">
                        Minimum Match Score
                      </label>
                      <input
                        type="range"
                        min="50"
                        max="95"
                        step="5"
                        value={filters.matchScore}
                        onChange={(e) => setFilters({ ...filters, matchScore: parseInt(e.target.value) })}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1">
                        <span>50%</span>
                        <span>95%</span>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                        Current filter: {filters.matchScore}% and above
                      </p>
                      <p className="text-xs text-[var(--text-muted)] mt-1">
                        Only show candidates with compatibility score above the selected threshold.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Technical Skills */}
              <div className="space-y-3 border-t border-[var(--border-main)] pt-6">
                <button
                  onClick={() => toggleSection("technicalSkills")}
                  className="w-full flex items-center justify-between font-semibold"
                >
                  <span>Technical Skills</span>
                  {expandedSections.includes("technicalSkills") ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {expandedSections.includes("technicalSkills") && (
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {TECHNICAL_SKILLS.map(skill => (
                        <Badge
                          key={skill}
                          variant={filters.technicalSkills.includes(skill) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleFilter("technicalSkills", skill)}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    {filters.technicalSkills.length > 0 && (
                      <>
                        <div>
                          <label className="text-sm text-[var(--text-muted)] mb-2 block">Skill Level</label>
                          <select
                            value={filters.skillLevel}
                            onChange={(e) => setFilters({ ...filters, skillLevel: e.target.value })}
                            className="w-full p-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                          >
                            <option>Any Level</option>
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm text-[var(--text-muted)] mb-2 block">Match Logic</label>
                          <select
                            value={filters.skillMatchLogic}
                            onChange={(e) => setFilters({ ...filters, skillMatchLogic: e.target.value })}
                            className="w-full p-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                          >
                            <option>Match any selected skill</option>
                            <option>Match all selected skills</option>
                          </select>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Soft Skills */}
              <div className="space-y-3 border-t border-[var(--border-main)] pt-6">
                <button
                  onClick={() => toggleSection("softSkills")}
                  className="w-full flex items-center justify-between font-semibold"
                >
                  <span>Soft Skills</span>
                  {expandedSections.includes("softSkills") ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {expandedSections.includes("softSkills") && (
                  <div className="flex flex-wrap gap-2">
                    {SOFT_SKILLS.map(skill => (
                      <Badge
                        key={skill}
                        variant={filters.softSkills.includes(skill) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleFilter("softSkills", skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Interests */}
              <div className="space-y-3 border-t border-[var(--border-main)] pt-6">
                <button
                  onClick={() => toggleSection("interests")}
                  className="w-full flex items-center justify-between font-semibold"
                >
                  <span>Interests & Career Direction</span>
                  {expandedSections.includes("interests") ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {expandedSections.includes("interests") && (
                  <div className="flex flex-wrap gap-2">
                    {INTERESTS.map(interest => (
                      <Badge
                        key={interest}
                        variant={filters.interests.includes(interest) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleFilter("interests", interest)}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Availability Status */}
              <div className="space-y-3 border-t border-[var(--border-main)] pt-6">
                <button
                  onClick={() => toggleSection("availability")}
                  className="w-full flex items-center justify-between font-semibold"
                >
                  <span>Availability Status</span>
                  {expandedSections.includes("availability") ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {expandedSections.includes("availability") && (
                  <div className="space-y-2">
                    {["Available Now", "Available Soon", "Interview Stage", "Matched", "Not In Training"].map(status => (
                      <label key={status} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.availability.includes(status)}
                          onChange={() => toggleFilter("availability", status)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{status}</span>
                      </label>
                    ))}
                    <p className="text-xs text-[var(--text-muted)] mt-3 p-2 bg-amber-50 dark:bg-yellow-900/20 rounded border border-amber-200 dark:border-yellow-800">
                      Students marked "In Training" are hidden from candidate discovery by default.
                    </p>
                  </div>
                )}
              </div>

              {/* Education */}
              <div className="space-y-3 border-t border-[var(--border-main)] pt-6">
                <button
                  onClick={() => toggleSection("education")}
                  className="w-full flex items-center justify-between font-semibold"
                >
                  <span>Education</span>
                  {expandedSections.includes("education") ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {expandedSections.includes("education") && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-[var(--text-muted)] mb-2 block">University</label>
                      <select
                        value={filters.university}
                        onChange={(e) => setFilters({ ...filters, university: e.target.value })}
                        className="w-full p-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                      >
                        <option value="">Any University</option>
                        <option>Stanford University</option>
                        <option>MIT</option>
                        <option>University of Jordan</option>
                        <option>JUST</option>
                        <option>PSUT</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-[var(--text-muted)] mb-2 block">Major</label>
                      <select
                        value={filters.major}
                        onChange={(e) => setFilters({ ...filters, major: e.target.value })}
                        className="w-full p-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                      >
                        <option value="">Any Related Field</option>
                        <option>Computer Science</option>
                        <option>Software Engineering</option>
                        <option>Data Science</option>
                        <option>Cybersecurity</option>
                        <option>UI/UX Design</option>
                        <option>Business</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-[var(--text-muted)] mb-2 block">Graduation Year</label>
                      <select
                        value={filters.graduationYear}
                        onChange={(e) => setFilters({ ...filters, graduationYear: e.target.value })}
                        className="w-full p-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                      >
                        <option value="">Any Year</option>
                        <option>2025</option>
                        <option>2026</option>
                        <option>2027</option>
                        <option>2028</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Location & Work Mode */}
              <div className="space-y-3 border-t border-[var(--border-main)] pt-6">
                <button
                  onClick={() => toggleSection("location")}
                  className="w-full flex items-center justify-between font-semibold"
                >
                  <span>Location & Work Preference</span>
                  {expandedSections.includes("location") ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {expandedSections.includes("location") && (
                  <div className="flex flex-wrap gap-2">
                    {["Same country", "Same city", "Open to remote", "Open to relocation"].map(pref => (
                      <Badge
                        key={pref}
                        variant={filters.location.includes(pref) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleFilter("location", pref)}
                      >
                        {pref}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Profile Strength */}
              <div className="space-y-3 border-t border-[var(--border-main)] pt-6">
                <button
                  onClick={() => toggleSection("profileStrength")}
                  className="w-full flex items-center justify-between font-semibold"
                >
                  <span>Profile Strength</span>
                  {expandedSections.includes("profileStrength") ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {expandedSections.includes("profileStrength") && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-[var(--text-muted)] mb-2 block">
                        Minimum Profile Strength
                      </label>
                      <input
                        type="range"
                        min="50"
                        max="95"
                        step="5"
                        value={filters.profileStrength}
                        onChange={(e) => setFilters({ ...filters, profileStrength: parseInt(e.target.value) })}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1">
                        <span>50%</span>
                        <span>95%</span>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                        Current filter: {filters.profileStrength}% and above
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="sticky bottom-0 bg-[var(--bg-main)] border-t border-[var(--border-main)] p-6">
              <div className="flex gap-3">
                <Button variant="outline" onClick={resetFilters} className="flex-1">
                  Reset All
                </Button>
                <Button onClick={applyFilters} className="flex-1">
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
