import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { MatchScore } from "../../components/ui/MatchScore";
import { MOCK_OPPORTUNITIES, MOCK_STUDENTS } from "../../data/mockData";
import { Search, Filter, MapPin, Clock, BrainCircuit, CheckCircle2, AlertCircle, X, ChevronDown, ChevronUp, Bookmark, TrendingUp, Users, Target } from "lucide-react";

type Filters = {
  search: string;
  matchScore: string;
  field: string[];
  company: string[];
  opportunityType: string[];
  workMode: string[];
  missingSkills: boolean;
  duration: string[];
  deadline: string;
};

export function AIMatches() {
  const navigate = useNavigate();
  const student = MOCK_STUDENTS[0];
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [showDetailsDrawer, setShowDetailsDrawer] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);
  const [sortBy, setSortBy] = useState("Best Match");
  const [filters, setFilters] = useState<Filters>({
    search: "",
    matchScore: "",
    field: [],
    company: [],
    opportunityType: [],
    workMode: [],
    missingSkills: false,
    duration: [],
    deadline: ""
  });

  const [expandedSections, setExpandedSections] = useState<string[]>(["matchScore", "opportunityType", "workMode"]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleViewDetails = (opp: any) => {
    setSelectedOpportunity(opp);
    setShowDetailsDrawer(true);
  };

  const handleApply = (opp: any) => {
    alert(`Application flow for ${opp.title} would open here`);
  };

  const handleSave = (opp: any) => {
    alert(`${opp.title} saved to your saved opportunities`);
  };

  // Filter opportunities
  let filteredOpportunities = [...MOCK_OPPORTUNITIES];

  if (filters.search) {
    filteredOpportunities = filteredOpportunities.filter(opp =>
      opp.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      opp.companyName.toLowerCase().includes(filters.search.toLowerCase())
    );
  }

  if (filters.matchScore) {
    const minScore = parseInt(filters.matchScore);
    filteredOpportunities = filteredOpportunities.filter(opp => opp.matchScore >= minScore);
  }

  if (filters.opportunityType.length > 0) {
    filteredOpportunities = filteredOpportunities.filter(opp => filters.opportunityType.includes(opp.type));
  }

  if (filters.workMode.length > 0) {
    filteredOpportunities = filteredOpportunities.filter(opp => filters.workMode.includes(opp.workMode));
  }

  const bestMatch = filteredOpportunities[0] || MOCK_OPPORTUNITIES[0];
  const averageMatch = Math.round(filteredOpportunities.reduce((sum, opp) => sum + opp.matchScore, 0) / filteredOpportunities.length);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">AI Matches</h1>
        <p className="text-[var(--text-muted)]">Opportunities ranked based on your skills, interests, behavior, and profile strength.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs mb-1">
              <Target className="w-3.5 h-3.5" />
              <span className="uppercase tracking-wider font-semibold">Best Match</span>
            </div>
            <div className="font-bold text-lg">{bestMatch.title}</div>
            <MatchScore score={bestMatch.matchScore} showLabel={false} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs mb-1">
              <Users className="w-3.5 h-3.5" />
              <span className="uppercase tracking-wider font-semibold">Total Matches</span>
            </div>
            <div className="font-bold text-2xl">{filteredOpportunities.length}</div>
            <div className="text-xs text-[var(--text-muted)] mt-1">opportunities</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span className="uppercase tracking-wider font-semibold">Avg Match Score</span>
            </div>
            <div className="font-bold text-2xl">{averageMatch}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-[var(--text-muted)] text-xs mb-1 uppercase tracking-wider font-semibold">Profile Strength</div>
            <div className="font-bold text-2xl">{student.profileStrength}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-[var(--text-muted)] text-xs mb-1 uppercase tracking-wider font-semibold">Opportunities Unlocked</div>
            <div className="font-bold text-2xl text-green-600">+15</div>
            <div className="text-xs text-[var(--text-muted)] mt-1">after adding SQL</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Sort */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search opportunities, companies, skills..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--border-main)] bg-[var(--bg-main)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
            <Button variant="outline" className="gap-2" onClick={() => setShowFilterDrawer(!showFilterDrawer)}>
              <Filter className="w-4 h-4" /> Filters
            </Button>
            <select
              className="px-4 py-2 rounded-lg border border-[var(--border-main)] bg-[var(--bg-main)] focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option>Best Match</option>
              <option>Recently Posted</option>
              <option>Deadline Soon</option>
              <option>Highest Skill Fit</option>
              <option>Lowest Skill Gap</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Match Cards */}
      <div className="space-y-4">
        {filteredOpportunities.map((opp) => (
          <Card key={opp.id} className="hover:border-blue-300 transition-colors">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold">{opp.title}</h3>
                        <Badge variant="blue">{opp.type}</Badge>
                        <Badge variant="success" className="gap-1 text-xs">
                          <CheckCircle2 className="w-3 h-3" /> Verified
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
                        <span className="font-medium text-[var(--text-main)]">{opp.companyName}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {opp.location}</span>
                        <span>{opp.workMode}</span>
                      </div>
                    </div>
                    <MatchScore score={opp.matchScore} />
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                    <div className="flex gap-2 items-start mb-3">
                      <BrainCircuit className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-blue-800 dark:text-blue-300 block mb-1">Why this match?</span>
                        <p className="text-sm text-blue-700 dark:text-blue-400">{opp.matchDetails.explanation}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 pt-3 border-t border-blue-100 dark:border-blue-800">
                      <div>
                        <span className="text-xs font-semibold text-green-400 uppercase tracking-wide mb-2 block">STRONG MATCH</span>
                        <div className="flex flex-wrap gap-1">
                          {opp.matchDetails.strong.map((skill: string) => (
                            <Badge key={skill} variant="success" className="font-normal text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {opp.matchDetails.missing.length > 0 && (
                        <div>
                          <span className="text-xs font-semibold text-red-400 uppercase tracking-wide mb-2 block">MISSING SKILLS</span>
                          <div className="flex flex-wrap gap-1">
                            {opp.matchDetails.missing.map((skill: string) => (
                              <Badge key={skill} variant="danger" className="font-normal text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-xs text-[var(--text-muted)] mt-2">
                            Adding these skills could raise your match to {opp.matchScore + 5}%
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex md:flex-col justify-between md:justify-start items-center md:items-end gap-3 min-w-[140px]">
                  <div className="flex flex-col gap-2 w-full">
                    <Button className="w-full" onClick={() => handleApply(opp)}>Apply Now</Button>
                    <Button variant="outline" className="w-full" onClick={() => handleViewDetails(opp)}>View Details</Button>
                    <Button variant="outline" className="w-full gap-2" onClick={() => handleSave(opp)}>
                      <Bookmark className="w-4 h-4" /> Save
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter Drawer */}
      {showFilterDrawer && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end" onClick={() => setShowFilterDrawer(false)}>
          <div className="bg-[var(--bg-main)] w-full max-w-md h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Filters</h2>
                <button onClick={() => setShowFilterDrawer(false)} className="p-2 hover:bg-muted dark:hover:bg-gray-800 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Match Score Filter */}
              <div className="border-b border-[var(--border-main)] pb-4">
                <button
                  onClick={() => toggleSection("matchScore")}
                  className="flex items-center justify-between w-full text-left font-semibold mb-3"
                >
                  <span>Match Score</span>
                  {expandedSections.includes("matchScore") ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {expandedSections.includes("matchScore") && (
                  <div className="space-y-2">
                    {["90", "80", "70", "60"].map((score) => (
                      <label key={score} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="matchScore"
                          value={score}
                          checked={filters.matchScore === score}
                          onChange={(e) => setFilters({ ...filters, matchScore: e.target.value })}
                          className="w-4 h-4"
                        />
                        <span>{score}%+</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Opportunity Type Filter */}
              <div className="border-b border-[var(--border-main)] pb-4">
                <button
                  onClick={() => toggleSection("opportunityType")}
                  className="flex items-center justify-between w-full text-left font-semibold mb-3"
                >
                  <span>Opportunity Type</span>
                  {expandedSections.includes("opportunityType") ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {expandedSections.includes("opportunityType") && (
                  <div className="space-y-2">
                    {["Internship", "Training"].map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.opportunityType.includes(type)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters({ ...filters, opportunityType: [...filters.opportunityType, type] });
                            } else {
                              setFilters({ ...filters, opportunityType: filters.opportunityType.filter(t => t !== type) });
                            }
                          }}
                          className="w-4 h-4"
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Work Mode Filter */}
              <div className="border-b border-[var(--border-main)] pb-4">
                <button
                  onClick={() => toggleSection("workMode")}
                  className="flex items-center justify-between w-full text-left font-semibold mb-3"
                >
                  <span>Work Mode</span>
                  {expandedSections.includes("workMode") ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {expandedSections.includes("workMode") && (
                  <div className="space-y-2">
                    {["Remote", "Hybrid", "On-site"].map((mode) => (
                      <label key={mode} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.workMode.includes(mode)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters({ ...filters, workMode: [...filters.workMode, mode] });
                            } else {
                              setFilters({ ...filters, workMode: filters.workMode.filter(m => m !== mode) });
                            }
                          }}
                          className="w-4 h-4"
                        />
                        <span>{mode}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setFilters({
                  search: "",
                  matchScore: "",
                  field: [],
                  company: [],
                  opportunityType: [],
                  workMode: [],
                  missingSkills: false,
                  duration: [],
                  deadline: ""
                })}>
                  Reset
                </Button>
                <Button className="flex-1" onClick={() => setShowFilterDrawer(false)}>Apply Filters</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Details Drawer */}
      {showDetailsDrawer && selectedOpportunity && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end" onClick={() => setShowDetailsDrawer(false)}>
          <div className="bg-[var(--bg-main)] w-full max-w-2xl h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedOpportunity.title}</h2>
                  <p className="text-[var(--text-muted)]">{selectedOpportunity.companyName}</p>
                </div>
                <button onClick={() => setShowDetailsDrawer(false)} className="p-2 hover:bg-muted dark:hover:bg-gray-800 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Overall Match Score</h3>
                    <MatchScore score={selectedOpportunity.matchScore} size="large" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-[var(--text-muted)] mb-1">Technical Match</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: "96%" }}></div>
                        </div>
                        <span className="font-semibold text-sm">96%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-[var(--text-muted)] mb-1">Soft Skills Match</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: "88%" }}></div>
                        </div>
                        <span className="font-semibold text-sm">88%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-[var(--text-muted)] mb-1">Interests Match</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: "92%" }}></div>
                        </div>
                        <span className="font-semibold text-sm">92%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-[var(--text-muted)] mb-1">Behavioral Fit</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: "90%" }}></div>
                        </div>
                        <span className="font-semibold text-sm">90%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Why Recommended</h4>
                    <p className="text-sm text-[var(--text-muted)]">{selectedOpportunity.matchDetails.explanation}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedOpportunity.matchDetails.strong.map((skill: string) => (
                        <Badge key={skill} variant="success">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  {selectedOpportunity.matchDetails.missing.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Missing Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedOpportunity.matchDetails.missing.map((skill: string) => (
                          <Badge key={skill} variant="danger">{skill}</Badge>
                        ))}
                      </div>
                      <p className="text-sm text-[var(--text-muted)] mt-3">
                        <strong>How to improve:</strong> Adding {selectedOpportunity.matchDetails.missing.join(", ")} to your profile could increase your match score to {selectedOpportunity.matchScore + 5}%.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button className="flex-1" onClick={() => handleApply(selectedOpportunity)}>Apply Now</Button>
                <Button variant="outline" className="flex-1 gap-2" onClick={() => handleSave(selectedOpportunity)}>
                  <Bookmark className="w-4 h-4" /> Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
