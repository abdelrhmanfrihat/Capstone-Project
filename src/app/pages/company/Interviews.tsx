import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { MatchScore } from "../../components/ui/MatchScore";
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  User,
  CheckCircle2,
  XCircle,
  Edit,
  Plus,
  X,
  Search,
  Phone,
  Mail,
  GraduationCap,
  Briefcase,
  TrendingUp,
  MessageSquare,
  AlertCircle,
  ExternalLink
} from "lucide-react";

interface ScheduleFormData {
  studentId: number | null;
  opportunityId: string;
  interviewType: string;
  date: string;
  time: string;
  duration: string;
  interviewer: string;
  meetingLink: string;
  location: string;
  phoneNumber: string;
  timezone: string;
  invitationMessage: string;
  internalNotes: string;
  focusAreas: string[];
  notifications: {
    emailStudent: boolean;
    platformNotification: boolean;
    addToCalendar: boolean;
    reminder24h: boolean;
    reminder1h: boolean;
  };
}

const FOCUS_AREAS = [
  "Technical skills",
  "Soft skills",
  "Project experience",
  "Problem solving",
  "Motivation and goals",
  "Culture fit"
];

const STUDENTS = [
  { id: 1, name: "Alex Chen", matchScore: 94, major: "Computer Science", university: "Stanford University", availability: "Available Now", skills: ["React", "TypeScript", "Node.js"], softSkills: ["Communication", "Teamwork", "Problem Solving"], profileStrength: 92, location: "California, USA", graduationYear: "2026" },
  { id: 2, name: "Sarah Johnson", matchScore: 91, major: "Software Engineering", university: "MIT", availability: "Available Soon", skills: ["Python", "Java", "AWS"], softSkills: ["Leadership", "Problem Solving", "Adaptability"], profileStrength: 88, location: "Massachusetts, USA", graduationYear: "2026" },
  { id: 3, name: "Michael Zhang", matchScore: 87, major: "Computer Science", university: "UC Berkeley", availability: "Available Now", skills: ["JavaScript", "React", "GraphQL"], softSkills: ["Creativity", "Self Learning", "Communication"], profileStrength: 85, location: "California, USA", graduationYear: "2027" },
  { id: 4, name: "Elena Rodriguez", matchScore: 84, major: "Data Science", university: "University of Jordan", availability: "Available Soon", skills: ["Python", "ML", "Data Analysis"], softSkills: ["Analytical", "Detail-oriented", "Teamwork"], profileStrength: 81, location: "Jordan", graduationYear: "2026" }
];

export function CompanyInterviews() {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [scheduledInterview, setScheduledInterview] = useState<any>(null);
  const [showViewDetailsDrawer, setShowViewDetailsDrawer] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<any>(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showRescheduleConfirm, setShowRescheduleConfirm] = useState(false);
  const [showRescheduleSuccess, setShowRescheduleSuccess] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showMarkCompletedModal, setShowMarkCompletedModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [interviewNotes, setInterviewNotes] = useState("");

  const [formData, setFormData] = useState<ScheduleFormData>({
    studentId: null,
    opportunityId: "",
    interviewType: "Video Call",
    date: "",
    time: "",
    duration: "60 minutes",
    interviewer: "",
    meetingLink: "",
    location: "",
    phoneNumber: "",
    timezone: "Company timezone",
    invitationMessage: "",
    internalNotes: "",
    focusAreas: [],
    notifications: {
      emailStudent: true,
      platformNotification: true,
      addToCalendar: true,
      reminder24h: true,
      reminder1h: true
    }
  });

  const [rescheduleData, setRescheduleData] = useState({
    date: "",
    time: "",
    duration: "60 minutes",
    interviewType: "Video Call",
    interviewer: "",
    meetingLink: "",
    location: "",
    phoneNumber: "",
    reason: "",
    message: ""
  });

  const interviews = [
    {
      id: 1,
      candidate: "Alex Chen",
      candidateId: 1,
      role: "Frontend Engineering Intern",
      matchScore: 94,
      date: "2026-05-18",
      time: "10:00 AM",
      duration: "60 min",
      type: "Video Call",
      status: "Scheduled",
      meetingLink: "https://meet.example.com/abc123",
      interviewer: "Sarah Park",
      invitationSent: "2026-05-16 14:30"
    },
    {
      id: 2,
      candidate: "Michael Zhang",
      candidateId: 3,
      role: "Frontend Engineering Intern",
      matchScore: 87,
      date: "2026-05-18",
      time: "2:00 PM",
      duration: "45 min",
      type: "On-site",
      status: "Pending Response",
      location: "Building A, Room 301",
      interviewer: "John Smith",
      invitationSent: "2026-05-16 09:00"
    },
    {
      id: 3,
      candidate: "Emily Williams",
      candidateId: 1,
      role: "Frontend Engineering Intern",
      matchScore: 89,
      date: "2026-05-19",
      time: "11:00 AM",
      duration: "60 min",
      type: "Video Call",
      status: "Accepted",
      meetingLink: "https://meet.example.com/xyz789",
      interviewer: "Sarah Park",
      invitationSent: "2026-05-15 16:00"
    },
    {
      id: 4,
      candidate: "Sarah Johnson",
      candidateId: 2,
      role: "Frontend Engineering Intern",
      matchScore: 91,
      date: "2026-05-16",
      time: "3:00 PM",
      duration: "60 min",
      type: "Video Call",
      status: "Completed",
      interviewer: "John Smith",
      invitationSent: "2026-05-14 11:00"
    }
  ];

  const upcomingCount = interviews.filter(i => i.status === "Scheduled" || i.status === "Accepted").length;
  const pendingCount = interviews.filter(i => i.status === "Pending Response").length;
  const completedCount = interviews.filter(i => i.status === "Completed").length;

  const getStatusBadge = (status: string) => {
    const badges: Record<string, JSX.Element> = {
      "Scheduled": <Badge variant="success">Scheduled</Badge>,
      "Pending Response": <Badge variant="warning">Pending Response</Badge>,
      "Accepted": <Badge variant="success">Accepted</Badge>,
      "Rejected": <Badge variant="danger">Rejected</Badge>,
      "Completed": <Badge variant="success">Completed</Badge>,
      "Cancelled": <Badge variant="outline">Cancelled</Badge>
    };
    return badges[status] || <Badge>{status}</Badge>;
  };

  const selectedStudent = STUDENTS.find(s => s.id === formData.studentId);

  const toggleFocusArea = (area: string) => {
    setFormData(prev => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(area)
        ? prev.focusAreas.filter(a => a !== area)
        : [...prev.focusAreas, area]
    }));
  };

  const handleScheduleInterview = () => {
    const student = STUDENTS.find(s => s.id === formData.studentId);
    if (!student) return;

    setScheduledInterview({
      student: student.name,
      opportunity: formData.opportunityId,
      date: formData.date,
      time: formData.time,
      type: formData.interviewType,
      matchScore: student.matchScore
    });

    setShowScheduleModal(false);
    setShowSuccessModal(true);
  };

  const resetForm = () => {
    setFormData({
      studentId: null,
      opportunityId: "",
      interviewType: "Video Call",
      date: "",
      time: "",
      duration: "60 minutes",
      interviewer: "",
      meetingLink: "",
      location: "",
      phoneNumber: "",
      timezone: "Company timezone",
      invitationMessage: "",
      internalNotes: "",
      focusAreas: [],
      notifications: {
        emailStudent: true,
        platformNotification: true,
        addToCalendar: true,
        reminder24h: true,
        reminder1h: true
      }
    });
  };

  const handleViewDetails = (interview: any) => {
    setSelectedInterview(interview);
    setShowViewDetailsDrawer(true);
  };

  const handleReschedule = (interview: any) => {
    setSelectedInterview(interview);
    setRescheduleData({
      date: interview.date,
      time: interview.time,
      duration: interview.duration,
      interviewType: interview.type,
      interviewer: interview.interviewer,
      meetingLink: interview.meetingLink || "",
      location: interview.location || "",
      phoneNumber: "",
      reason: "",
      message: `Hello ${interview.candidate},\n\nWe need to reschedule your interview for the ${interview.role} position. Please review the updated interview details and confirm whether the new time works for you.\n\nBest regards,\nStellar Cloud`
    });
    setShowRescheduleModal(true);
  };

  const handleSendReschedule = () => {
    setShowRescheduleModal(false);
    setShowRescheduleConfirm(true);
  };

  const handleConfirmReschedule = () => {
    setShowRescheduleConfirm(false);
    setShowRescheduleSuccess(true);
  };

  const candidateDetails = selectedInterview ? STUDENTS.find(s => s.id === selectedInterview.candidateId) : null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Interview Schedule</h1>
          <p className="text-[var(--text-muted)]">Manage and track all candidate interviews.</p>
        </div>
        <Button
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setShowScheduleModal(true)}
        >
          <Plus className="w-4 h-4" />
          Schedule Interview
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)]">Upcoming</p>
                <p className="text-2xl font-bold">{upcomingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 dark:bg-yellow-900/30 rounded-lg">
                <Clock className="w-5 h-5 text-amber-700 dark:text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)]">Pending</p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)]">Completed</p>
                <p className="text-2xl font-bold">{completedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interviews List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">All Interviews</h3>
          <select className="border rounded-md px-3 py-1.5 text-sm bg-transparent border-[var(--border-main)]">
            <option>All Statuses</option>
            <option>Scheduled</option>
            <option>Pending Response</option>
            <option>Accepted</option>
            <option>Completed</option>
          </select>
        </div>

        {interviews.map((interview) => (
          <Card
            key={interview.id}
            className={interview.status === "Scheduled" || interview.status === "Accepted" ? "border-blue-200 dark:border-blue-800" : ""}
          >
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg font-bold shrink-0">
                  {interview.candidate.split(" ").map(n => n[0]).join("")}
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold">{interview.candidate}</h3>
                        {getStatusBadge(interview.status)}
                      </div>
                      <p className="text-sm text-[var(--text-muted)] mb-2">{interview.role}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span>{interview.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span>{interview.time} ({interview.duration})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {interview.type === "Video Call" ? (
                            <>
                              <Video className="w-4 h-4 text-blue-600" />
                              <span>Video Call</span>
                            </>
                          ) : (
                            <>
                              <MapPin className="w-4 h-4 text-blue-600" />
                              <span>{interview.location}</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-blue-600" />
                          <span>Interviewer: {interview.interviewer}</span>
                        </div>
                      </div>

                      {interview.invitationSent && (
                        <p className="text-xs text-[var(--text-muted)] mt-2">Invitation sent: {interview.invitationSent}</p>
                      )}
                    </div>

                    <MatchScore score={interview.matchScore} />
                  </div>

                  {interview.meetingLink && (interview.status === "Scheduled" || interview.status === "Accepted") && (
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="text-xs font-semibold text-blue-800 dark:text-blue-300 mb-1">MEETING LINK</p>
                      <a
                        href={interview.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline break-all"
                      >
                        {interview.meetingLink}
                      </a>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3 pt-2 border-t border-[var(--border-main)]">
                    {(interview.status === "Scheduled" || interview.status === "Accepted") && (
                      <>
                        <Button size="sm" variant="outline" onClick={() => handleViewDetails(interview)}>View Details</Button>
                        {interview.type === "Video Call" && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1">
                            <Video className="w-4 h-4" />
                            Join Meeting
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={() => handleReschedule(interview)}>
                          <Edit className="w-4 h-4" />
                          Reschedule
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-1 text-red-600 hover:text-red-700"
                          onClick={() => { setSelectedInterview(interview); setShowCancelModal(true); }}
                        >
                          <XCircle className="w-4 h-4" />
                          Cancel
                        </Button>
                      </>
                    )}

                    {interview.status === "Pending Response" && (
                      <>
                        <Button size="sm" variant="outline" onClick={() => handleViewDetails(interview)}>View Details</Button>
                        <Button size="sm" variant="outline">Send Reminder</Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                        >
                          Cancel
                        </Button>
                      </>
                    )}

                    {interview.status === "Completed" && (
                      <Button size="sm" variant="outline" onClick={() => handleViewDetails(interview)}>
                        View Notes & Feedback
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Details Drawer */}
      {showViewDetailsDrawer && selectedInterview && candidateDetails && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end" onClick={() => setShowViewDetailsDrawer(false)}>
          <div className="bg-[var(--bg-main)] w-full max-w-3xl h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between sticky top-0 bg-[var(--bg-main)] pb-4 border-b border-[var(--border-main)] z-10">
                <div>
                  <h2 className="text-2xl font-bold">Interview Details</h2>
                  <p className="text-[var(--text-muted)]">Review interview information, candidate context, response status, and next actions.</p>
                </div>
                <button onClick={() => setShowViewDetailsDrawer(false)} className="p-2 hover:bg-muted dark:hover:bg-gray-800 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Interview Summary */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Interview Summary</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-[var(--text-muted)] mb-1">Candidate</div>
                      <div className="font-semibold">{selectedInterview.candidate}</div>
                    </div>
                    <div>
                      <div className="text-[var(--text-muted)] mb-1">Opportunity</div>
                      <div className="font-semibold">{selectedInterview.role}</div>
                    </div>
                    <div>
                      <div className="text-[var(--text-muted)] mb-1">Interview Status</div>
                      {getStatusBadge(selectedInterview.status)}
                    </div>
                    <div>
                      <div className="text-[var(--text-muted)] mb-1">Match Score</div>
                      <MatchScore score={selectedInterview.matchScore} showLabel={false} />
                    </div>
                    <div>
                      <div className="text-[var(--text-muted)] mb-1">Interview Type</div>
                      <div className="font-semibold">{selectedInterview.type}</div>
                    </div>
                    <div>
                      <div className="text-[var(--text-muted)] mb-1">Date & Time</div>
                      <div className="font-semibold">{selectedInterview.date} {selectedInterview.time}</div>
                    </div>
                    <div>
                      <div className="text-[var(--text-muted)] mb-1">Duration</div>
                      <div className="font-semibold">{selectedInterview.duration}</div>
                    </div>
                    <div>
                      <div className="text-[var(--text-muted)] mb-1">Interviewer</div>
                      <div className="font-semibold">{selectedInterview.interviewer}</div>
                    </div>
                    {selectedInterview.meetingLink && (
                      <div className="col-span-2">
                        <div className="text-[var(--text-muted)] mb-1">Meeting Link</div>
                        <a href={selectedInterview.meetingLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                          {selectedInterview.meetingLink}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Candidate Information */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-bold text-lg">Candidate Information</h3>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0">
                      {candidateDetails.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-[var(--text-muted)]">Student Name</div>
                        <div className="font-semibold">{candidateDetails.name}</div>
                      </div>
                      <div>
                        <div className="text-[var(--text-muted)]">University</div>
                        <div className="font-semibold">{candidateDetails.university}</div>
                      </div>
                      <div>
                        <div className="text-[var(--text-muted)]">Major</div>
                        <div className="font-semibold">{candidateDetails.major}</div>
                      </div>
                      <div>
                        <div className="text-[var(--text-muted)]">Graduation Year</div>
                        <div className="font-semibold">{candidateDetails.graduationYear}</div>
                      </div>
                      <div>
                        <div className="text-[var(--text-muted)]">Location</div>
                        <div className="font-semibold">{candidateDetails.location}</div>
                      </div>
                      <div>
                        <div className="text-[var(--text-muted)]">Profile Strength</div>
                        <div className="font-semibold">{candidateDetails.profileStrength}%</div>
                      </div>
                      <div>
                        <div className="text-[var(--text-muted)]">Availability</div>
                        <Badge variant="success" className="text-xs">{candidateDetails.availability}</Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold mb-2">Top Skills</div>
                    <div className="flex flex-wrap gap-2">
                      {candidateDetails.skills.map(skill => (
                        <Badge key={skill} variant="blue">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold mb-2">Soft Skills</div>
                    <div className="flex flex-wrap gap-2">
                      {candidateDetails.softSkills.map(skill => (
                        <Badge key={skill} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">View Full Profile</Button>
                    <Button size="sm" variant="outline" className="gap-1">
                      <MessageSquare className="w-4 h-4" />
                      Message Student
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* AI Match Context */}
              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-bold text-lg">AI Match Context</h3>
                  <div>
                    <div className="text-sm text-[var(--text-muted)] mb-2">Overall Match Score</div>
                    <MatchScore score={selectedInterview.matchScore} size="large" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm mb-1">Technical Match</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: "96%" }}></div>
                        </div>
                        <span className="text-sm font-semibold">96%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm mb-1">Soft Skills Match</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: "88%" }}></div>
                        </div>
                        <span className="text-sm font-semibold">88%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm mb-1">Interests Match</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: "92%" }}></div>
                        </div>
                        <span className="text-sm font-semibold">92%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm mb-1">Behavioral Fit</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: "90%" }}></div>
                        </div>
                        <span className="text-sm font-semibold">90%</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-blue-200 dark:border-blue-800">
                    <div className="text-sm font-semibold mb-2">Why this interview was recommended:</div>
                    <p className="text-sm">
                      {candidateDetails.name} strongly matches the {selectedInterview.role} role because of {candidateDetails.skills.slice(0, 2).join(", ")}, and Web Development interest.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-blue-200 dark:border-blue-800">
                    <div className="text-sm font-semibold mb-2">Possible gaps:</div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="danger"><AlertCircle /> SQL</Badge>
                      <Badge variant="danger"><AlertCircle /> Backend Concepts</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Invitation Details */}
              <Card>
                <CardContent className="p-6 space-y-3">
                  <h3 className="font-bold text-lg">Invitation Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-[var(--text-muted)]">Invitation Sent</div>
                      <div className="font-semibold">{selectedInterview.invitationSent}</div>
                    </div>
                    <div>
                      <div className="text-[var(--text-muted)]">Sent By</div>
                      <div className="font-semibold">Stellar Cloud</div>
                    </div>
                    <div>
                      <div className="text-[var(--text-muted)]">Student Response</div>
                      {getStatusBadge(selectedInterview.status)}
                    </div>
                    {selectedInterview.status === "Accepted" && (
                      <div>
                        <div className="text-[var(--text-muted)]">Response Date</div>
                        <div className="font-semibold">2026-05-16 16:05</div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[var(--border-main)]">
                    <div className="text-sm font-semibold mb-2">Invitation Message</div>
                    <div className="bg-[var(--bg-secondary)] p-3 rounded-lg text-sm">
                      <p>Hello {selectedInterview.candidate},</p>
                      <p className="mt-2">We reviewed your profile and would like to invite you to an interview for the {selectedInterview.role} position. Please review the interview details and confirm whether the time works for you.</p>
                      <p className="mt-2">Best regards,<br />Stellar Cloud</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Interview Timeline */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Interview Timeline</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Interview invitation created", time: "2026-05-16 14:30", done: true },
                      { label: "Invitation sent to student", time: "2026-05-16 14:31", done: true },
                      { label: "Student viewed invitation", time: "2026-05-16 15:10", done: true },
                      { label: "Student accepted invitation", time: "2026-05-16 16:05", done: selectedInterview.status === "Accepted" || selectedInterview.status === "Scheduled" },
                      { label: "Reminder scheduled", time: "2026-05-17 10:00", done: true },
                      { label: "Interview scheduled", time: selectedInterview.date + " " + selectedInterview.time, done: false },
                      { label: "Interview completed", time: "", done: false },
                      { label: "Feedback submitted", time: "", done: false }
                    ].map((event, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className={`w-3 h-3 rounded-full mt-1 ${event.done ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"}`}></div>
                        <div className="flex-1">
                          <div className={`text-sm font-medium ${event.done ? "" : "text-[var(--text-muted)]"}`}>{event.label}</div>
                          {event.time && <div className="text-xs text-[var(--text-muted)]">{event.time}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Interview Notes */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-bold text-lg">Interview Notes</h3>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Internal Notes</label>
                    <textarea
                      value={interviewNotes}
                      onChange={(e) => setInterviewNotes(e.target.value)}
                      placeholder="Add private notes for the interviewer. These notes are not visible to the student."
                      className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)] min-h-[100px] resize-y"
                    />
                    <Button size="sm" className="mt-2">Save Notes</Button>
                  </div>

                  <div className="pt-3 border-t border-[var(--border-main)]">
                    <div className="text-sm font-semibold mb-2">Previous Notes</div>
                    <div className="bg-[var(--bg-secondary)] p-3 rounded-lg text-sm">
                      <span className="font-semibold">Sarah Park:</span> Focus on React component structure, API handling, and communication style.
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Interview Evaluation (if completed) */}
              {selectedInterview.status === "Completed" ? (
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-bold text-lg">Interview Evaluation</h3>
                    <div className="space-y-3">
                      {["Technical Performance", "Communication", "Problem Solving", "Culture Fit"].map(criteria => (
                        <div key={criteria}>
                          <label className="text-sm font-semibold mb-2 block">{criteria}</label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map(rating => (
                              <button
                                key={rating}
                                className="w-10 h-10 rounded-lg border-2 border-[var(--border-main)] hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                              >
                                {rating}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}

                      <div>
                        <label className="text-sm font-semibold mb-2 block">Recommendation</label>
                        <select className="w-full p-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]">
                          <option>Select recommendation...</option>
                          <option>Move to Matched</option>
                          <option>Keep in Interview</option>
                          <option>Reject</option>
                          <option>Request second interview</option>
                        </select>
                      </div>

                      <Button className="w-full">Submit Evaluation</Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">Interview Evaluation</h3>
                    <p className="text-sm text-[var(--text-muted)]">Evaluation becomes available after the interview is marked as completed.</p>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 sticky bottom-0 bg-[var(--bg-main)] py-4 border-t border-[var(--border-main)]">
                {(selectedInterview.status === "Scheduled" || selectedInterview.status === "Accepted") && (
                  <>
                    {selectedInterview.type === "Video Call" && (
                      <Button className="gap-1">
                        <Video className="w-4 h-4" />
                        Join Meeting
                      </Button>
                    )}
                    <Button variant="outline" onClick={() => {
                      setShowViewDetailsDrawer(false);
                      handleReschedule(selectedInterview);
                    }}>Reschedule</Button>
                    <Button variant="outline" onClick={() => { setShowViewDetailsDrawer(false); setShowCancelModal(true); }}>Cancel Interview</Button>
                    <Button variant="outline" onClick={() => { setShowViewDetailsDrawer(false); setShowMarkCompletedModal(true); }}>Mark as Completed</Button>
                    <Button variant="outline" className="gap-1">
                      <MessageSquare className="w-4 h-4" />
                      Message Student
                    </Button>
                  </>
                )}

                {selectedInterview.status === "Pending Response" && (
                  <>
                    <Button>Send Reminder</Button>
                    <Button variant="outline" onClick={() => {
                      setShowViewDetailsDrawer(false);
                      handleReschedule(selectedInterview);
                    }}>Reschedule</Button>
                    <Button variant="outline" onClick={() => { setShowViewDetailsDrawer(false); setShowCancelModal(true); }}>Cancel Interview</Button>
                  </>
                )}

                {selectedInterview.status === "Completed" && (
                  <>
                    <Button>Provide Feedback</Button>
                    <Button variant="outline">Move to Matched</Button>
                    <Button variant="outline" className="text-red-600">Reject Candidate</Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && selectedInterview && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <Card className="w-full max-w-3xl my-8">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Reschedule Interview</h2>
                  <p className="text-[var(--text-muted)]">Choose a new interview time and notify the student.</p>
                </div>
                <button onClick={() => setShowRescheduleModal(false)} className="p-2 hover:bg-muted dark:hover:bg-gray-800 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <Card className="bg-[var(--bg-secondary)]">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Current Interview</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-[var(--text-muted)]">Candidate:</span>
                      <span className="font-semibold ml-2">{selectedInterview.candidate}</span>
                    </div>
                    <div>
                      <span className="text-[var(--text-muted)]">Opportunity:</span>
                      <span className="font-semibold ml-2">{selectedInterview.role}</span>
                    </div>
                    <div>
                      <span className="text-[var(--text-muted)]">Current Time:</span>
                      <span className="font-semibold ml-2">{selectedInterview.date} {selectedInterview.time}</span>
                    </div>
                    <div>
                      <span className="text-[var(--text-muted)]">Type:</span>
                      <span className="font-semibold ml-2">{selectedInterview.type}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h3 className="font-bold">New Interview Details</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">New Date</label>
                    <input
                      type="date"
                      value={rescheduleData.date}
                      onChange={(e) => setRescheduleData({ ...rescheduleData, date: e.target.value })}
                      className="w-full p-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">New Time</label>
                    <input
                      type="time"
                      value={rescheduleData.time}
                      onChange={(e) => setRescheduleData({ ...rescheduleData, time: e.target.value })}
                      className="w-full p-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Duration</label>
                    <select
                      value={rescheduleData.duration}
                      onChange={(e) => setRescheduleData({ ...rescheduleData, duration: e.target.value })}
                      className="w-full p-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                    >
                      <option>30 minutes</option>
                      <option>45 minutes</option>
                      <option>60 minutes</option>
                      <option>90 minutes</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">Reason for Rescheduling</label>
                  <select
                    value={rescheduleData.reason}
                    onChange={(e) => setRescheduleData({ ...rescheduleData, reason: e.target.value })}
                    className="w-full p-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                  >
                    <option value="">Select reason...</option>
                    <option>Interviewer unavailable</option>
                    <option>Schedule conflict</option>
                    <option>Student requested new time</option>
                    <option>Need more preparation time</option>
                    <option>Company calendar change</option>
                    <option>Other</option>
                  </select>
                </div>

                {selectedInterview.type === "Video Call" && (
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Meeting Link</label>
                    <input
                      type="url"
                      value={rescheduleData.meetingLink}
                      onChange={(e) => setRescheduleData({ ...rescheduleData, meetingLink: e.target.value })}
                      placeholder="https://meet.example.com/new-link"
                      className="w-full p-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                    />
                  </div>
                )}

                <div>
                  <label className="text-sm font-semibold mb-2 block">Message to Student</label>
                  <textarea
                    value={rescheduleData.message}
                    onChange={(e) => setRescheduleData({ ...rescheduleData, message: e.target.value })}
                    className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)] min-h-[120px] resize-y"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowRescheduleModal(false)} className="flex-1">Cancel</Button>
                <Button onClick={handleSendReschedule} className="flex-1">Send Reschedule Request</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reschedule Confirm Modal */}
      {showRescheduleConfirm && selectedInterview && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">Send Reschedule Request?</h3>
              <p className="text-sm text-[var(--text-muted)] mb-6">
                This will update the interview status to "Reschedule Requested" and notify the student with the new proposed time.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowRescheduleConfirm(false)} className="flex-1">Cancel</Button>
                <Button onClick={handleConfirmReschedule} className="flex-1">Send Request</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reschedule Success Modal */}
      {showRescheduleSuccess && selectedInterview && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Reschedule Request Sent</h3>
              <p className="text-[var(--text-muted)] mb-6">
                The student has been notified about the proposed new interview time. The interview will remain pending until the student accepts or requests another time.
              </p>

              <Card className="bg-[var(--bg-secondary)] mb-6">
                <CardContent className="p-4 text-sm space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Candidate:</span>
                    <span className="font-semibold">{selectedInterview.candidate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">New Date:</span>
                    <span className="font-semibold">{rescheduleData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">New Time:</span>
                    <span className="font-semibold">{rescheduleData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Status:</span>
                    <Badge variant="warning">Reschedule Requested</Badge>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowRescheduleSuccess(false)} className="flex-1">Back to Interviews</Button>
                <Button onClick={() => { setShowRescheduleSuccess(false); handleViewDetails(selectedInterview); }} className="flex-1">View Interview</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Cancel Interview Modal */}
      {showCancelModal && selectedInterview && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">Cancel Interview?</h3>
              <p className="text-sm text-[var(--text-muted)] mb-4">
                This interview will be cancelled and the student will be notified.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Reason</label>
                  <select
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="w-full p-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                  >
                    <option value="">Select reason...</option>
                    <option>Schedule conflict</option>
                    <option>Candidate no longer suitable</option>
                    <option>Position closed</option>
                    <option>Interviewer unavailable</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">Additional Message (optional)</label>
                  <textarea
                    placeholder="Add a message to the student..."
                    className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)] min-h-[80px] resize-y"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button variant="outline" onClick={() => setShowCancelModal(false)} className="flex-1">Keep Interview</Button>
                <Button className="flex-1 bg-red-600 hover:bg-red-700" onClick={() => {
                  setShowCancelModal(false);
                  alert("Interview cancelled");
                }}>Cancel Interview</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Mark as Completed Modal */}
      {showMarkCompletedModal && selectedInterview && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">Mark Interview as Completed?</h3>
              <p className="text-sm text-[var(--text-muted)] mb-6">
                This will mark the interview as completed and allow you to submit feedback or move the candidate to the next stage.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowMarkCompletedModal(false)} className="flex-1">Cancel</Button>
                <Button onClick={() => {
                  setShowMarkCompletedModal(false);
                  alert("Interview marked as completed");
                }} className="flex-1">Mark Completed</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Schedule Interview Modal - keeping existing modal code */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-[var(--bg-main)] rounded-lg shadow-xl w-full max-w-3xl my-8">
            <div className="sticky top-0 bg-[var(--bg-main)] border-b border-[var(--border-main)] p-6 rounded-t-lg z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Schedule Interview</h2>
                  <p className="text-sm text-[var(--text-muted)] mt-1">
                    Invite a student to an interview for one of your opportunities.
                  </p>
                </div>
                <button
                  onClick={() => { setShowScheduleModal(false); resetForm(); }}
                  className="p-2 hover:bg-muted dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Existing schedule modal content */}
              <div>
                <h3 className="font-bold mb-3">Select Student</h3>
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    placeholder="Search by student name, university, skill, or match score..."
                    className="w-full pl-10 pr-4 py-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {STUDENTS.map(student => (
                    <button
                      key={student.id}
                      onClick={() => setFormData({ ...formData, studentId: student.id })}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        formData.studentId === student.id
                          ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                          : "border-[var(--border-main)] hover:border-blue-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{student.name}</span>
                        <MatchScore score={student.matchScore} size="sm" />
                      </div>
                      <p className="text-xs text-[var(--text-muted)]">{student.major} — {student.university}</p>
                    </button>
                  ))}
                </div>

                {selectedStudent && (
                  <Card className="mt-3 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          {selectedStudent.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold">{selectedStudent.name}</h4>
                          <p className="text-sm text-[var(--text-muted)]">{selectedStudent.university} • {selectedStudent.major}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="success">{selectedStudent.availability}</Badge>
                            <div className="flex flex-wrap gap-1">
                              {selectedStudent.skills.slice(0, 3).map(skill => (
                                <Badge key={skill} variant="blue" className="text-xs">{skill}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div>
                <h3 className="font-bold mb-3">Select Opportunity</h3>
                <select
                  value={formData.opportunityId}
                  onChange={(e) => setFormData({ ...formData, opportunityId: e.target.value })}
                  className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                >
                  <option value="">Select opportunity...</option>
                  <option>Frontend Engineering Intern</option>
                  <option>Backend Systems Intern</option>
                  <option>Data Science Intern</option>
                  <option>Product Design Training</option>
                </select>
              </div>

              <div>
                <h3 className="font-bold mb-3">Interview Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Interview Type</label>
                    <div className="grid grid-cols-3 gap-3">
                      {["Video Call", "On-site", "Phone Call"].map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, interviewType: type })}
                          className={`p-3 rounded-lg border-2 text-center transition-all ${
                            formData.interviewType === type
                              ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                              : "border-[var(--border-main)]"
                          }`}
                        >
                          {type === "Video Call" && <Video className="w-5 h-5 mx-auto mb-1" />}
                          {type === "On-site" && <MapPin className="w-5 h-5 mx-auto mb-1" />}
                          {type === "Phone Call" && <Phone className="w-5 h-5 mx-auto mb-1" />}
                          <span className="text-sm font-medium">{type}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Interview Date</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full p-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Interview Time</label>
                      <input
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full p-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Duration</label>
                      <select
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full p-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                      >
                        <option>30 minutes</option>
                        <option>45 minutes</option>
                        <option>60 minutes</option>
                        <option>90 minutes</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block">Interviewer</label>
                    <select
                      value={formData.interviewer}
                      onChange={(e) => setFormData({ ...formData, interviewer: e.target.value })}
                      className="w-full p-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                    >
                      <option value="">Select interviewer...</option>
                      <option>Sarah Park</option>
                      <option>John Smith</option>
                      <option>Hiring Team</option>
                      <option>Add new interviewer</option>
                    </select>
                  </div>

                  {formData.interviewType === "Video Call" && (
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Meeting Link</label>
                      <input
                        type="url"
                        value={formData.meetingLink}
                        onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                        placeholder="https://meet.example.com/abc123"
                        className="w-full p-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                      />
                    </div>
                  )}

                  {formData.interviewType === "On-site" && (
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Building A, Room 301"
                        className="w-full p-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                      />
                    </div>
                  )}

                  {formData.interviewType === "Phone Call" && (
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        placeholder="+1 (555) 123-4567"
                        className="w-full p-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                      />
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-semibold mb-2 block">Timezone</label>
                    <select
                      value={formData.timezone}
                      onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                      className="w-full p-2 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)]"
                    >
                      <option>Company timezone</option>
                      <option>Student timezone</option>
                      <option>UTC</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-3">Invitation Message</h3>
                <textarea
                  value={formData.invitationMessage}
                  onChange={(e) => setFormData({ ...formData, invitationMessage: e.target.value })}
                  placeholder={`Hello ${selectedStudent?.name || "[Student Name]"},\n\nWe reviewed your profile and would like to invite you to an interview for the ${formData.opportunityId || "[Opportunity Title]"} position. Please review the interview details and confirm whether the time works for you.\n\nBest regards,\nCompany Name`}
                  className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)] min-h-[150px] resize-y"
                />
              </div>

              <div>
                <h3 className="font-bold mb-3">Internal Interview Notes (Optional)</h3>
                <textarea
                  value={formData.internalNotes}
                  onChange={(e) => setFormData({ ...formData, internalNotes: e.target.value })}
                  placeholder="Add private notes for the interviewer. These notes are not visible to the student."
                  className="w-full p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)] min-h-[80px] resize-y"
                />

                <div className="mt-4">
                  <label className="text-sm font-semibold mb-2 block">Interview Focus Areas</label>
                  <div className="grid grid-cols-2 gap-2">
                    {FOCUS_AREAS.map(area => (
                      <label key={area} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.focusAreas.includes(area)}
                          onChange={() => toggleFocusArea(area)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{area}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-3">Notification Settings</h3>
                <div className="space-y-2">
                  {Object.entries({
                    emailStudent: "Send email notification to student",
                    platformNotification: "Send platform notification to student",
                    addToCalendar: "Add interview to company calendar",
                    reminder24h: "Send reminder 24 hours before interview",
                    reminder1h: "Send reminder 1 hour before interview"
                  }).map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.notifications[key as keyof typeof formData.notifications]}
                        onChange={(e) => setFormData({
                          ...formData,
                          notifications: { ...formData.notifications, [key]: e.target.checked }
                        })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-[var(--bg-main)] border-t border-[var(--border-main)] p-6 rounded-b-lg">
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => { setShowScheduleModal(false); resetForm(); }} className="flex-1">
                  Cancel
                </Button>
                <Button variant="outline" className="flex-1">Save as Draft</Button>
                <Button onClick={handleScheduleInterview} className="flex-1">
                  Send Interview Invitation
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && scheduledInterview && (
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
                  <h3 className="text-xl font-bold mb-2">Interview Invitation Sent</h3>
                  <p className="text-sm text-[var(--text-muted)]">
                    The student has been invited to the interview. They can accept, reject, or request a reschedule from their portal.
                  </p>
                </div>

                <div className="p-4 bg-background dark:bg-gray-800/50 rounded-lg text-left space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Student:</span>
                    <span className="font-semibold">{scheduledInterview.student}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Opportunity:</span>
                    <span className="font-semibold">{scheduledInterview.opportunity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Date:</span>
                    <span className="font-semibold">{scheduledInterview.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Time:</span>
                    <span className="font-semibold">{scheduledInterview.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Type:</span>
                    <span className="font-semibold">{scheduledInterview.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Match Score:</span>
                    <span className="font-semibold">{scheduledInterview.matchScore}%</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-4">
                  <Button onClick={() => setShowSuccessModal(false)}>View Interview</Button>
                  <Button variant="outline" onClick={() => { setShowSuccessModal(false); setShowScheduleModal(true); }}>
                    Schedule Another
                  </Button>
                  <Button variant="outline" onClick={() => setShowSuccessModal(false)}>
                    Back to Interviews
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
