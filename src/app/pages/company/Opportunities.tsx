import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import {
  Briefcase, Plus, Users, Eye, Edit, Trash2, BarChart3, Search, Filter, Download, X,
  XCircle, RotateCcw, Archive, MapPin, Calendar, Clock, TrendingUp, BrainCircuit,
  CheckCircle2, AlertCircle, ExternalLink, Check
} from "lucide-react";

interface Opportunity {
  id: number;
  title: string;
  type: string;
  field: string;
  postedDate: string;
  deadline: string;
  status: string;
  applicants: number;
  interviews: number;
  avgMatchScore: number;
  description?: string;
  workMode?: string;
  location?: string;
  seats?: number;
  requiredSkills?: string[];
  preferredSkills?: string[];
  softSkills?: string[];
  experience?: string;
  estimatedPool?: number;
  strongMatches?: number;
  technicalWeight?: number;
  softSkillsWeight?: number;
  interestsWeight?: number;
  behavioralWeight?: number;
}

export function CompanyOpportunities() {
  const navigate = useNavigate();
  const [showDetailsDrawer, setShowDetailsDrawer] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);

  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [showEditConfirm, setShowEditConfirm] = useState(false);
  const [showEditLoading, setShowEditLoading] = useState(false);
  const [showEditSuccess, setShowEditSuccess] = useState(false);
  const [showCloseSuccess, setShowCloseSuccess] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReactivateModal, setShowReactivateModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);

  const [closeReason, setCloseReason] = useState("");
  const [closeNote, setCloseNote] = useState("");
  const [closeConfirmChecked, setCloseConfirmChecked] = useState(false);
  const [editLoadingStep, setEditLoadingStep] = useState(0);

  const [editFormData, setEditFormData] = useState({
    title: "",
    type: "",
    field: "",
    workMode: "",
    status: "",
    seats: 0,
    deadline: "",
    description: "",
    requiredSkills: [] as string[],
    preferredSkills: [] as string[],
    softSkills: [] as string[],
    technicalWeight: 40,
    softSkillsWeight: 25,
    interestsWeight: 15,
    behavioralWeight: 20
  });

  const opportunities: Opportunity[] = [
    {
      id: 1,
      title: "Frontend Engineering Intern",
      type: "Internship",
      field: "Software Development",
      postedDate: "May 10, 2026",
      deadline: "June 01, 2026",
      status: "Active",
      applicants: 42,
      interviews: 8,
      avgMatchScore: 84,
      description: "Students will work with the frontend team to build React components, improve UI performance, and collaborate with designers and backend developers.",
      workMode: "Remote",
      location: "San Francisco, CA",
      seats: 3,
      requiredSkills: ["React", "TypeScript", "JavaScript", "Git", "APIs"],
      preferredSkills: ["Tailwind CSS", "Testing", "UI/UX basics"],
      softSkills: ["Communication", "Teamwork", "Problem Solving", "Self Learning"],
      experience: "0-1 years",
      estimatedPool: 184,
      strongMatches: 42,
      technicalWeight: 40,
      softSkillsWeight: 25,
      interestsWeight: 15,
      behavioralWeight: 20
    },
    {
      id: 2,
      title: "Backend Systems Intern",
      type: "Internship",
      field: "Software Development",
      postedDate: "May 12, 2026",
      deadline: "June 05, 2026",
      status: "Draft",
      applicants: 0,
      interviews: 0,
      avgMatchScore: 0,
      description: "Join our backend team to build scalable systems and APIs.",
      workMode: "Hybrid",
      location: "Seattle, WA",
      seats: 2,
      requiredSkills: ["Python", "SQL", "REST APIs"],
      preferredSkills: ["AWS", "Docker"],
      softSkills: ["Collaboration", "Adaptability"],
      experience: "0-2 years",
      estimatedPool: 0,
      strongMatches: 0,
      technicalWeight: 45,
      softSkillsWeight: 20,
      interestsWeight: 15,
      behavioralWeight: 20
    },
    {
      id: 3,
      title: "Product Design Training",
      type: "Training",
      field: "UI/UX Design",
      postedDate: "Apr 28, 2026",
      deadline: "May 20, 2026",
      status: "Closed",
      applicants: 28,
      interviews: 4,
      avgMatchScore: 78,
      description: "A comprehensive training program for aspiring product designers.",
      workMode: "On-site",
      location: "Austin, TX",
      seats: 1,
      requiredSkills: ["Figma", "UI Design", "UX Research"],
      preferredSkills: ["Prototyping", "User Testing"],
      softSkills: ["Creativity", "Communication"],
      experience: "0-1 years",
      estimatedPool: 89,
      strongMatches: 18,
      technicalWeight: 35,
      softSkillsWeight: 30,
      interestsWeight: 20,
      behavioralWeight: 15
    },
    {
      id: 4,
      title: "Data Science Intern",
      type: "Internship",
      field: "Data Science",
      postedDate: "May 14, 2026",
      deadline: "June 10, 2026",
      status: "Active",
      applicants: 35,
      interviews: 6,
      avgMatchScore: 79,
      description: "Work with our data science team to analyze large datasets and build predictive models.",
      workMode: "Remote",
      location: "New York, NY",
      seats: 2,
      requiredSkills: ["Python", "Machine Learning", "Statistics"],
      preferredSkills: ["TensorFlow", "SQL"],
      softSkills: ["Analytical Thinking", "Communication"],
      experience: "1-2 years",
      estimatedPool: 156,
      strongMatches: 28,
      technicalWeight: 50,
      softSkillsWeight: 20,
      interestsWeight: 15,
      behavioralWeight: 15
    }
  ];

  const loadingSteps = [
    "Updating opportunity",
    "Re-analyzing requirements",
    "Recalculating matches",
    "Updating candidate ranking"
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge variant="success">Active</Badge>;
      case "Draft":
        return <Badge variant="warning">Draft</Badge>;
      case "Closed":
        return <Badge variant="default">Closed</Badge>;
      case "Archived":
        return <Badge variant="outline">Archived</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleViewDetails = (opp: Opportunity) => {
    setSelectedOpportunity(opp);
    setShowDetailsDrawer(true);
  };

  const handleEditOpportunity = () => {
    if (selectedOpportunity) {
      setEditFormData({
        title: selectedOpportunity.title,
        type: selectedOpportunity.type,
        field: selectedOpportunity.field,
        workMode: selectedOpportunity.workMode || "",
        status: selectedOpportunity.status,
        seats: selectedOpportunity.seats || 0,
        deadline: selectedOpportunity.deadline,
        description: selectedOpportunity.description || "",
        requiredSkills: selectedOpportunity.requiredSkills || [],
        preferredSkills: selectedOpportunity.preferredSkills || [],
        softSkills: selectedOpportunity.softSkills || [],
        technicalWeight: selectedOpportunity.technicalWeight || 40,
        softSkillsWeight: selectedOpportunity.softSkillsWeight || 25,
        interestsWeight: selectedOpportunity.interestsWeight || 15,
        behavioralWeight: selectedOpportunity.behavioralWeight || 20
      });
      setShowEditDrawer(true);
    }
  };

  const handleSaveEdit = () => {
    setShowEditConfirm(true);
  };

  const confirmEditSave = () => {
    setShowEditConfirm(false);
    setShowEditDrawer(false);
    setShowEditLoading(true);
    setEditLoadingStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setEditLoadingStep(step);
      if (step >= loadingSteps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setShowEditLoading(false);
          setShowEditSuccess(true);
        }, 500);
      }
    }, 600);
  };

  const handleCloseOpportunity = () => {
    setShowCloseModal(true);
  };

  const handleCloseNext = () => {
    if (!closeReason) return;
    setShowCloseModal(false);
    setShowCloseConfirm(true);
  };

  const confirmClose = () => {
    setShowCloseConfirm(false);
    setShowCloseSuccess(true);
    setCloseReason("");
    setCloseNote("");
    setCloseConfirmChecked(false);
  };

  const handleSearchCandidates = () => {
    if (selectedOpportunity) {
      navigate(`/company/candidates?opportunity=${selectedOpportunity.id}&title=${encodeURIComponent(selectedOpportunity.title)}`);
    }
  };

  const handleViewPipeline = () => {
    if (selectedOpportunity) {
      navigate(`/company/pipeline?opportunity=${selectedOpportunity.id}&title=${encodeURIComponent(selectedOpportunity.title)}`);
    }
  };

  const handlePublish = () => {
    setShowPublishModal(true);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleReactivate = () => {
    setShowReactivateModal(true);
  };

  const handleArchive = () => {
    setShowArchiveModal(true);
  };

  const confirmPublish = () => {
    setShowPublishModal(false);
  };

  const confirmDelete = () => {
    setShowDeleteModal(false);
  };

  const confirmReactivate = () => {
    setShowReactivateModal(false);
  };

  const confirmArchive = () => {
    setShowArchiveModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Manage Opportunities</h1>
          <p className="text-[var(--text-muted)]">View, edit, close, or reactivate your internship and training opportunities.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
          <Button
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => navigate("/company/opportunities/create")}
          >
            <Plus className="w-4 h-4" />
            Post New Opportunity
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                <input
                  type="text"
                  placeholder="Search by title..."
                  className="w-full pl-10 pr-4 py-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                />
              </div>
            </div>
            <select className="p-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]">
              <option value="">All Status</option>
              <option>Active</option>
              <option>Draft</option>
              <option>Closed</option>
              <option>Archived</option>
            </select>
            <select className="p-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]">
              <option value="">All Types</option>
              <option>Internship</option>
              <option>Training</option>
            </select>
            <select className="p-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]">
              <option value="">All Fields</option>
              <option>Software Development</option>
              <option>Data Science</option>
              <option>UI/UX Design</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Opportunities Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-[var(--border-main)] bg-background dark:bg-gray-800/50">
                <tr>
                  <th className="text-left p-4 text-xs font-semibold text-[var(--text-muted)]">TITLE</th>
                  <th className="text-left p-4 text-xs font-semibold text-[var(--text-muted)]">TYPE</th>
                  <th className="text-left p-4 text-xs font-semibold text-[var(--text-muted)]">FIELD</th>
                  <th className="text-left p-4 text-xs font-semibold text-[var(--text-muted)]">POSTED</th>
                  <th className="text-left p-4 text-xs font-semibold text-[var(--text-muted)]">DEADLINE</th>
                  <th className="text-left p-4 text-xs font-semibold text-[var(--text-muted)]">STATUS</th>
                  <th className="text-left p-4 text-xs font-semibold text-[var(--text-muted)]">APPLICANTS</th>
                  <th className="text-left p-4 text-xs font-semibold text-[var(--text-muted)]">INTERVIEWS</th>
                  <th className="text-left p-4 text-xs font-semibold text-[var(--text-muted)]">AVG MATCH</th>
                  <th className="text-left p-4 text-xs font-semibold text-[var(--text-muted)]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {opportunities.map((opp) => (
                  <tr key={opp.id} className="border-b border-[var(--border-main)] hover:bg-secondary dark:hover:bg-gray-800/50">
                    <td className="p-4">
                      <p className="font-semibold">{opp.title}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm">{opp.type}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm">{opp.field}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-[var(--text-muted)]">{opp.postedDate}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-[var(--text-muted)]">{opp.deadline}</p>
                    </td>
                    <td className="p-4">{getStatusBadge(opp.status)}</td>
                    <td className="p-4">
                      <p className="text-sm font-semibold">{opp.applicants}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-semibold">{opp.interviews}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-semibold">
                        {opp.avgMatchScore > 0 ? `${opp.avgMatchScore}%` : "N/A"}
                      </p>
                    </td>
                    <td className="p-4">
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => handleViewDetails(opp)}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Opportunity Details Drawer */}
      {showDetailsDrawer && selectedOpportunity && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-end z-50">
          <div className="w-full max-w-3xl h-full bg-[var(--bg-card)] overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-[var(--bg-card)] border-b border-[var(--border-main)] p-6 flex justify-between items-start z-10">
              <div>
                <h2 className="text-2xl font-bold">Opportunity Details</h2>
                <p className="text-[var(--text-muted)] text-sm mt-1">
                  View, manage, and update this internship or training opportunity.
                </p>
              </div>
              <button
                onClick={() => setShowDetailsDrawer(false)}
                className="p-2 hover:bg-muted dark:hover:bg-gray-800 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Opportunity Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Opportunity Summary</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[var(--text-muted)] mb-1">Opportunity Title</p>
                    <p className="font-semibold">{selectedOpportunity.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)] mb-1">Type</p>
                    <Badge variant="blue">{selectedOpportunity.type}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)] mb-1">Field</p>
                    <p className="font-medium">{selectedOpportunity.field}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)] mb-1">Status</p>
                    {getStatusBadge(selectedOpportunity.status)}
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)] mb-1">Posted Date</p>
                    <p className="font-medium">{selectedOpportunity.postedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)] mb-1">Deadline</p>
                    <p className="font-medium">{selectedOpportunity.deadline}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)] mb-1">Work Mode</p>
                    <p className="font-medium">{selectedOpportunity.workMode}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)] mb-1">Location</p>
                    <p className="font-medium flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-[var(--text-muted)]" />
                      {selectedOpportunity.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)] mb-1">Available Seats</p>
                    <p className="font-semibold">{selectedOpportunity.seats}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)] mb-1">Applicants</p>
                    <p className="font-semibold text-blue-600">{selectedOpportunity.applicants}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)] mb-1">Interviews</p>
                    <p className="font-semibold text-green-600">{selectedOpportunity.interviews}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)] mb-1">Avg Match Score</p>
                    <p className="font-semibold text-purple-600">
                      {selectedOpportunity.avgMatchScore > 0 ? `${selectedOpportunity.avgMatchScore}%` : "N/A"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[var(--text-body)]">{selectedOpportunity.description}</p>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold mb-2">Required Technical Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedOpportunity.requiredSkills?.map((skill, idx) => (
                        <Badge key={idx} variant="danger"><AlertCircle /> {skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2">Preferred Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedOpportunity.preferredSkills?.map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2">Soft Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedOpportunity.softSkills?.map((skill, idx) => (
                        <Badge key={idx} variant="blue" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2">Experience Level</p>
                    <p className="text-[var(--text-body)]">{selectedOpportunity.experience}</p>
                  </div>
                </CardContent>
              </Card>

              {/* AI Match Overview */}
              {selectedOpportunity.status !== "Draft" && (
                <Card className="bg-[var(--ai-bg)] border-[var(--ai-border)]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-[var(--ai-text)]">
                      <BrainCircuit className="w-5 h-5" />
                      AI Match Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-[var(--text-muted)] mb-1">Avg Match Score</p>
                      <p className="text-2xl font-bold">{selectedOpportunity.avgMatchScore}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--text-muted)] mb-1">Estimated Candidate Pool</p>
                      <p className="text-2xl font-bold">{selectedOpportunity.estimatedPool}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--text-muted)] mb-1">Strong Matches (80%+)</p>
                      <p className="text-2xl font-bold text-green-600">{selectedOpportunity.strongMatches}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--text-muted)] mb-1">Top Matching Factors</p>
                      <p className="text-sm font-medium">Technical Skills, Location</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Recruitment Activity */}
              {selectedOpportunity.status !== "Draft" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Recruitment Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-[var(--bg-secondary)] rounded-lg">
                        <p className="text-sm text-[var(--text-muted)] mb-1">Applicants</p>
                        <p className="text-2xl font-bold">{selectedOpportunity.applicants}</p>
                      </div>
                      <div className="text-center p-3 bg-[var(--bg-secondary)] rounded-lg">
                        <p className="text-sm text-[var(--text-muted)] mb-1">Shortlisted</p>
                        <p className="text-2xl font-bold">12</p>
                      </div>
                      <div className="text-center p-3 bg-[var(--bg-secondary)] rounded-lg">
                        <p className="text-sm text-[var(--text-muted)] mb-1">Interviews</p>
                        <p className="text-2xl font-bold">{selectedOpportunity.interviews}</p>
                      </div>
                      <div className="text-center p-3 bg-[var(--bg-secondary)] rounded-lg">
                        <p className="text-sm text-[var(--text-muted)] mb-1">Matched</p>
                        <p className="text-2xl font-bold">2</p>
                      </div>
                      <div className="text-center p-3 bg-[var(--bg-secondary)] rounded-lg">
                        <p className="text-sm text-[var(--text-muted)] mb-1">In Training</p>
                        <p className="text-2xl font-bold">0</p>
                      </div>
                      <div className="text-center p-3 bg-[var(--bg-secondary)] rounded-lg">
                        <p className="text-sm text-[var(--text-muted)] mb-1">Rejected</p>
                        <p className="text-2xl font-bold">8</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Timeline/History */}
              <Card>
                <CardHeader>
                  <CardTitle>Timeline / History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">Opportunity Created</p>
                        <p className="text-xs text-[var(--text-muted)]">{selectedOpportunity.postedDate}</p>
                      </div>
                    </div>
                    {selectedOpportunity.status === "Active" && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">Published</p>
                          <p className="text-xs text-[var(--text-muted)]">{selectedOpportunity.postedDate}</p>
                        </div>
                      </div>
                    )}
                    {selectedOpportunity.status === "Closed" && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted dark:bg-gray-900/30 flex items-center justify-center shrink-0">
                          <XCircle className="w-4 h-4 text-[var(--text-body)]" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">Closed</p>
                          <p className="text-xs text-[var(--text-muted)]">May 20, 2026</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Actions Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {selectedOpportunity.status === "Active" && (
                      <>
                        <Button variant="outline" onClick={handleEditOpportunity}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Opportunity
                        </Button>
                        <Button variant="outline" onClick={handleCloseOpportunity} className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20">
                          <XCircle className="w-4 h-4 mr-2" />
                          Close Opportunity
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSearchCandidates}>
                          <Search className="w-4 h-4 mr-2" />
                          Search Candidates
                        </Button>
                        <Button variant="outline" onClick={handleViewPipeline}>
                          <BarChart3 className="w-4 h-4 mr-2" />
                          View Pipeline
                        </Button>
                      </>
                    )}

                    {selectedOpportunity.status === "Draft" && (
                      <>
                        <Button variant="outline" onClick={handleEditOpportunity}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Opportunity
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handlePublish}>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Publish Opportunity
                        </Button>
                        <Button variant="outline" onClick={handleDelete} className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Draft
                        </Button>
                      </>
                    )}

                    {selectedOpportunity.status === "Closed" && (
                      <>
                        <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleReactivate}>
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Reactivate Opportunity
                        </Button>
                        <Button variant="outline" onClick={handleArchive} className="text-orange-600 border-orange-200 hover:bg-orange-50 dark:border-orange-800 dark:hover:bg-orange-900/20">
                          <Archive className="w-4 h-4 mr-2" />
                          Archive Opportunity
                        </Button>
                        <Button variant="outline" onClick={handleViewPipeline}>
                          <BarChart3 className="w-4 h-4 mr-2" />
                          View Pipeline History
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Edit Opportunity Drawer */}
      {showEditDrawer && selectedOpportunity && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-end z-[60]">
          <div className="w-full max-w-3xl h-full bg-[var(--bg-card)] overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-[var(--bg-card)] border-b border-[var(--border-main)] p-6 flex justify-between items-start z-10">
              <div>
                <h2 className="text-2xl font-bold">Edit Opportunity</h2>
                <p className="text-[var(--text-muted)] text-sm mt-1">
                  Update opportunity details and matching requirements.
                </p>
              </div>
              <button
                onClick={() => setShowEditDrawer(false)}
                className="p-2 hover:bg-muted dark:hover:bg-gray-800 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Opportunity Title</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                      value={editFormData.title}
                      onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Type</label>
                      <select
                        className="w-full px-3 py-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                        value={editFormData.type}
                        onChange={(e) => setEditFormData({ ...editFormData, type: e.target.value })}
                      >
                        <option>Internship</option>
                        <option>Training</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Field</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                        value={editFormData.field}
                        onChange={(e) => setEditFormData({ ...editFormData, field: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Work Mode</label>
                      <select
                        className="w-full px-3 py-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                        value={editFormData.workMode}
                        onChange={(e) => setEditFormData({ ...editFormData, workMode: e.target.value })}
                      >
                        <option>Remote</option>
                        <option>On-site</option>
                        <option>Hybrid</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Available Seats</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                        value={editFormData.seats}
                        onChange={(e) => setEditFormData({ ...editFormData, seats: parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Deadline</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                        value={editFormData.deadline}
                        onChange={(e) => setEditFormData({ ...editFormData, deadline: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <textarea
                    className="w-full px-3 py-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)] min-h-[120px]"
                    value={editFormData.description}
                    onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  />
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Required Skills</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {editFormData.requiredSkills.map((skill, idx) => (
                        <Badge key={idx} variant="danger"><AlertCircle /> {skill}</Badge>
                      ))}
                    </div>
                    <p className="text-xs text-[var(--text-muted)]">Current: {editFormData.requiredSkills.join(", ")}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Preferred Skills</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {editFormData.preferredSkills.map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                    <p className="text-xs text-[var(--text-muted)]">Current: {editFormData.preferredSkills.join(", ")}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Soft Skills</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {editFormData.softSkills.map((skill, idx) => (
                        <Badge key={idx} variant="blue" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                    <p className="text-xs text-[var(--text-muted)]">Current: {editFormData.softSkills.join(", ")}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Matching Weights */}
              <Card>
                <CardHeader>
                  <CardTitle>Matching Weights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Technical Skills: {editFormData.technicalWeight}%</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      className="w-full"
                      value={editFormData.technicalWeight}
                      onChange={(e) => setEditFormData({ ...editFormData, technicalWeight: parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Soft Skills: {editFormData.softSkillsWeight}%</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      className="w-full"
                      value={editFormData.softSkillsWeight}
                      onChange={(e) => setEditFormData({ ...editFormData, softSkillsWeight: parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Interests: {editFormData.interestsWeight}%</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      className="w-full"
                      value={editFormData.interestsWeight}
                      onChange={(e) => setEditFormData({ ...editFormData, interestsWeight: parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Behavioral Fit: {editFormData.behavioralWeight}%</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      className="w-full"
                      value={editFormData.behavioralWeight}
                      onChange={(e) => setEditFormData({ ...editFormData, behavioralWeight: parseInt(e.target.value) })}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="sticky bottom-0 bg-[var(--bg-card)] border-t border-[var(--border-main)] p-6 flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowEditDrawer(false)}>
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSaveEdit}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Confirmation Modal */}
      {showEditConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70] p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Save Opportunity Changes?</h3>
                <p className="text-sm text-[var(--text-muted)]">
                  Updating this opportunity will re-analyze requirements and recalculate candidate match scores.
                </p>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowEditConfirm(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" onClick={confirmEditSave}>
                    Save & Recalculate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Loading Modal */}
      {showEditLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70] p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6 text-center">Processing Changes</h2>
              <div className="space-y-3">
                {loadingSteps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    {idx < editLoadingStep ? (
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    ) : idx === editLoadingStep ? (
                      <div className="w-6 h-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin shrink-0" />
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-[var(--border-main)] shrink-0" />
                    )}
                    <span className={`text-sm ${idx <= editLoadingStep ? "text-[var(--text-main)]" : "text-[var(--text-muted)]"}`}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Success Modal */}
      {showEditSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70] p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="w-6 h-6 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold">Opportunity Updated Successfully</h3>
                </div>
                <p className="text-sm text-[var(--text-muted)]">
                  The opportunity was updated and candidate matches are being recalculated.
                </p>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => { setShowEditSuccess(false); setShowDetailsDrawer(true); }} className="flex-1">
                    Back to Details
                  </Button>
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => { setShowEditSuccess(false); handleSearchCandidates(); }}>
                    View Candidates
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Close Opportunity Modal */}
      {showCloseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Close Opportunity?</h3>
                <p className="text-sm text-[var(--text-muted)]">
                  This opportunity will stop accepting new applications and will be hidden from student search results.
                  Existing applications, interviews, and pipeline history will remain available.
                </p>
                <div className="p-3 bg-[var(--bg-secondary)] rounded-lg">
                  <p className="text-sm font-semibold mb-1">Selected Opportunity:</p>
                  <p className="font-bold">{selectedOpportunity?.title}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Close Reason</label>
                  <select
                    value={closeReason}
                    onChange={(e) => setCloseReason(e.target.value)}
                    className="w-full p-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                  >
                    <option value="">Select reason...</option>
                    <option>Position filled</option>
                    <option>Training started</option>
                    <option>No longer available</option>
                    <option>Requirements changed</option>
                    <option>Duplicate opportunity</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Additional Note (Optional)</label>
                  <textarea
                    value={closeNote}
                    onChange={(e) => setCloseNote(e.target.value)}
                    placeholder="Add any additional details..."
                    className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)] min-h-[80px]"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowCloseModal(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    onClick={handleCloseNext}
                    disabled={!closeReason}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Close Confirmation Modal */}
      {showCloseConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70] p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-xl font-bold">Confirm Close</h3>
                </div>
                <p className="text-sm text-[var(--text-muted)]">
                  Are you sure you want to close this opportunity? Students will no longer be able to apply.
                </p>
                <label className="flex items-start gap-2 p-3 border border-[var(--border-main)] rounded-lg cursor-pointer hover:bg-[var(--bg-secondary)]">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={closeConfirmChecked}
                    onChange={(e) => setCloseConfirmChecked(e.target.checked)}
                  />
                  <span className="text-sm">
                    I understand this opportunity will no longer accept new applications.
                  </span>
                </label>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => { setShowCloseConfirm(false); setCloseConfirmChecked(false); }} className="flex-1">
                    Cancel
                  </Button>
                  <Button
                    variant="danger"
                    onClick={confirmClose}
                    disabled={!closeConfirmChecked}
                    className="flex-1"
                  >
                    Close Opportunity
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Close Success Modal */}
      {showCloseSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70] p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-background0/20 flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">Opportunity Closed</h3>
                </div>
                <p className="text-sm text-[var(--text-muted)]">
                  {selectedOpportunity?.title} is now closed. Students can no longer apply, but existing pipeline history is preserved.
                </p>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => { setShowCloseSuccess(false); setShowDetailsDrawer(false); }} className="flex-1">
                    Back to Opportunities
                  </Button>
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => { setShowCloseSuccess(false); handleViewPipeline(); }}>
                    View Pipeline History
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Publish Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Publish Opportunity?</h3>
                <p className="text-sm text-[var(--text-muted)]">
                  This opportunity will become visible to students and the system will start recommending matched candidates.
                </p>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowPublishModal(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" onClick={confirmPublish}>
                    Publish Opportunity
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Delete Draft?</h3>
                <p className="text-sm text-[var(--text-muted)]">
                  This draft will be permanently removed.
                </p>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowDeleteModal(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button variant="danger" onClick={confirmDelete} className="flex-1">
                    Delete Draft
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reactivate Modal */}
      {showReactivateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Reactivate Opportunity?</h3>
                <p className="text-sm text-[var(--text-muted)]">
                  This opportunity will become visible to students again and will accept new applications.
                </p>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowReactivateModal(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white" onClick={confirmReactivate}>
                    Reactivate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Archive Modal */}
      {showArchiveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Archive Opportunity?</h3>
                <p className="text-sm text-[var(--text-muted)]">
                  This opportunity will be archived. Its history will remain available, but it will be removed from active management views.
                </p>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowArchiveModal(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button variant="danger" onClick={confirmArchive} className="flex-1">
                    Archive
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
