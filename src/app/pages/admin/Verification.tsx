import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/input";
import {
  ShieldCheck,
  Clock,
  CheckCircle2,
  XCircle,
  Building2,
  Mail,
  Globe,
  FileText,
  X,
  Download,
  Eye,
  Phone,
  MapPin,
  Linkedin,
  FileCheck,
  AlertTriangle,
  Search,
  Filter
} from "lucide-react";

interface Company {
  id: number;
  name: string;
  email: string;
  website: string;
  industry: string;
  size: string;
  submittedAt: string;
  documents?: Array<{
    name: string;
    fileName: string;
    uploadedAt: string;
    verified: boolean;
    optional?: boolean;
  }>;
  status: string;
  contactPerson?: string;
  jobTitle?: string;
  phone?: string;
  location?: string;
  description?: string;
  linkedinUrl?: string;
  registrationNumber?: string;
  verifiedAt?: string;
  rejectedAt?: string;
  reason?: string;
  riskLevel?: string;
}

export function AdminVerification() {
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRisk, setFilterRisk] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showRequestInfoModal, setShowRequestInfoModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectionNote, setRejectionNote] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [notifyByEmail, setNotifyByEmail] = useState(true);
  const [decision, setDecision] = useState("");
  const [decisionNote, setDecisionNote] = useState("");
  const [showViewDetailsModal, setShowViewDetailsModal] = useState(false);
  const [viewDetailsCompanyId, setViewDetailsCompanyId] = useState<number | null>(null);
  const viewDetailsTriggerRef = useRef<HTMLButtonElement | null>(null);
  const viewDetailsModalRef = useRef<HTMLDivElement>(null);

  const pendingCompanies: Company[] = [
    {
      id: 1,
      name: "Quantum Data",
      email: "hr@quantumdata.com",
      website: "https://quantumdata.com",
      industry: "AI Startup",
      size: "11-50 employees",
      submittedAt: "2026-05-18",
      riskLevel: "Low Risk",
      documents: [
        { name: "Business License", fileName: "business_license.pdf", uploadedAt: "2026-05-18", verified: false },
        { name: "Tax ID", fileName: "tax_id_document.pdf", uploadedAt: "2026-05-18", verified: false },
        { name: "Company Profile", fileName: "company_profile.pdf", uploadedAt: "2026-05-18", verified: false }
      ],
      status: "Pending Review",
      contactPerson: "Dr. Sarah Chen",
      jobTitle: "Chief Technology Officer",
      phone: "+1 (617) 555-0123",
      location: "Boston, MA, USA",
      description: "Quantum Data is an AI startup focused on quantum computing applications for enterprise data analysis.",
      linkedinUrl: "https://linkedin.com/company/quantumdata",
      registrationNumber: "REG-2026-MA-1234"
    },
    {
      id: 2,
      name: "Global Finance Systems",
      email: "recruiting@globalfinance.com",
      website: "https://globalfinance.com",
      industry: "Enterprise Finance",
      size: "500+ employees",
      submittedAt: "2026-05-17",
      riskLevel: "Medium Risk",
      documents: [
        { name: "Business License", fileName: "business_license.pdf", uploadedAt: "2026-05-17", verified: false },
        { name: "Tax ID", fileName: "tax_registration.pdf", uploadedAt: "2026-05-17", verified: false },
        { name: "Company Profile", fileName: "company_profile.pdf", uploadedAt: "2026-05-17", verified: false }
      ],
      status: "Pending Review",
      contactPerson: "Michael Roberts",
      jobTitle: "VP of Talent Acquisition",
      phone: "+1 (212) 555-0456",
      location: "New York, NY, USA",
      description: "Global Finance Systems provides enterprise financial software and consulting services.",
      linkedinUrl: "https://linkedin.com/company/globalfinance",
      registrationNumber: "REG-2025-NY-7890"
    },
    {
      id: 3,
      name: "InnovateLabs Inc.",
      email: "hr@innovatelabs.com",
      website: "https://innovatelabs.com",
      industry: "Software Development",
      size: "50-200 employees",
      submittedAt: "2026-05-16",
      riskLevel: "Low Risk",
      documents: [
        { name: "Business License", fileName: "business_license.pdf", uploadedAt: "2026-05-16", verified: false },
        { name: "Tax ID", fileName: "tax_id_document.pdf", uploadedAt: "2026-05-16", verified: false },
        { name: "Company Profile", fileName: "company_profile.pdf", uploadedAt: "2026-05-16", verified: false },
        { name: "Company Logo", fileName: "logo.png", uploadedAt: "2026-05-16", verified: false, optional: true }
      ],
      status: "Pending Review",
      contactPerson: "Sarah Johnson",
      jobTitle: "HR Director",
      phone: "+1 (415) 555-1234",
      location: "San Francisco, CA, USA",
      description: "InnovateLabs is a cutting-edge software development company specializing in AI-powered solutions for enterprise clients.",
      linkedinUrl: "https://linkedin.com/company/innovatelabs",
      registrationNumber: "REG-2024-CA-9845"
    },
    {
      id: 4,
      name: "CloudBridge Solutions",
      email: "talent@cloudbridge.io",
      website: "https://cloudbridge.io",
      industry: "Cloud Services",
      size: "100-200 employees",
      submittedAt: "2026-05-15",
      riskLevel: "High Risk",
      documents: [
        { name: "Business License", fileName: "business_license.pdf", uploadedAt: "2026-05-15", verified: false },
        { name: "Tax ID", fileName: "tax_document.pdf", uploadedAt: "2026-05-15", verified: false }
      ],
      status: "Needs Review",
      contactPerson: "Alex Martinez",
      jobTitle: "Recruitment Manager",
      phone: "+1 (206) 555-7890",
      location: "Seattle, WA, USA",
      description: "CloudBridge Solutions provides cloud infrastructure and migration services for mid-market companies.",
      linkedinUrl: "https://linkedin.com/company/cloudbridge",
      registrationNumber: "REG-2025-WA-3456"
    }
  ];

  const verifiedCompanies: Company[] = [
    {
      id: 5,
      name: "Stellar Cloud",
      email: "talent@stellarcloud.com",
      website: "https://stellarcloud.com",
      industry: "Enterprise Software",
      size: "200-500 employees",
      verifiedAt: "2026-05-10",
      status: "Verified",
      submittedAt: "2026-04-28"
    },
    {
      id: 6,
      name: "DataPulse",
      email: "jobs@datapulse.com",
      website: "https://datapulse.com",
      industry: "Analytics",
      size: "50-200 employees",
      verifiedAt: "2026-05-08",
      status: "Verified",
      submittedAt: "2026-04-25"
    }
  ];

  const rejectedCompanies: Company[] = [
    {
      id: 7,
      name: "QuickHire Agency",
      email: "contact@quickhire.co",
      website: "https://quickhire.co",
      industry: "Recruiting",
      size: "10-50 employees",
      rejectedAt: "2026-05-12",
      reason: "Incomplete documentation",
      status: "Rejected",
      submittedAt: "2026-05-05"
    }
  ];

  const filteredPendingCompanies = pendingCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = filterRisk === "All" || company.riskLevel === filterRisk;
    const matchesStatus = filterStatus === "All" || company.status === filterStatus;
    return matchesSearch && matchesRisk && matchesStatus;
  });

  const handleReview = (companyId: number) => {
    setSelectedCompany(companyId);
    setShowDetails(true);
  };

  const handleApprove = () => {
    setShowApproveModal(false);
    setShowDetails(false);
    // Update company status to Verified in real implementation
  };

  const handleReject = () => {
    setShowRejectModal(false);
    setShowDetails(false);
    // Update company status to Rejected in real implementation
  };

  const handleRequestInfo = () => {
    setShowRequestInfoModal(false);
    setShowDetails(false);
    // Update company status to More Information Required in real implementation
  };

  const handleViewDetails = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    viewDetailsTriggerRef.current = e.currentTarget;
    setViewDetailsCompanyId(id);
    setShowViewDetailsModal(true);
  };

  const closeViewDetails = () => {
    setShowViewDetailsModal(false);
    setTimeout(() => viewDetailsTriggerRef.current?.focus(), 10);
  };

  const getStatusBadge = (status: string) => {
    if (status === "Verified") return <Badge variant="success">{status}</Badge>;
    if (status === "Rejected") return <Badge variant="danger">{status}</Badge>;
    if (status === "Pending Review" || status === "Needs Review")
      return <Badge variant="warning">{status}</Badge>;
    return <Badge>{status}</Badge>;
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "Low Risk":
        return <Badge variant="success">{risk}</Badge>;
      case "Medium Risk":
        return <Badge variant="warning">{risk}</Badge>;
      case "High Risk":
        return <Badge variant="danger">{risk}</Badge>;
      default:
        return <Badge>{risk}</Badge>;
    }
  };

  useEffect(() => {
    if (!showViewDetailsModal) return;
    const modal = viewDetailsModalRef.current;
    if (!modal) return;
    const focusables = Array.from(
      modal.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
    focusables[0]?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { closeViewDetails(); return; }
      if (e.key === "Tab" && focusables.length) {
        const first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showViewDetailsModal]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Company Verification</h1>
        <p className="text-[var(--text-muted)]">Review, approve, reject, or request more information from companies waiting for verification.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 dark:bg-yellow-900/30 rounded-lg">
                <Clock className="w-5 h-5 text-amber-700 dark:text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)]">Pending Reviews</p>
                <p className="text-2xl font-bold">{pendingCompanies.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)]">Approved Companies</p>
                <p className="text-2xl font-bold">{verifiedCompanies.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)]">Rejected Companies</p>
                <p className="text-2xl font-bold">{rejectedCompanies.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 dark:bg-orange-900/30 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-amber-700 dark:text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)]">High Risk Requests</p>
                <p className="text-2xl font-bold">{pendingCompanies.filter(c => c.riskLevel === "High Risk").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by company name, email, industry, or website..."
                className="pl-10"
              />
            </div>

            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="border rounded-md px-3 py-2 bg-transparent border-[var(--border-main)]"
            >
              <option>All</option>
              <option>Low Risk</option>
              <option>Medium Risk</option>
              <option>High Risk</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border rounded-md px-3 py-2 bg-transparent border-[var(--border-main)]"
            >
              <option>All</option>
              <option>Pending Review</option>
              <option>Needs Review</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Pending Reviews */}
      <div className="space-y-4">
        <h3 className="font-bold flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-700 dark:text-yellow-600" />
          Pending Review ({filteredPendingCompanies.length})
        </h3>

        {filteredPendingCompanies.map((company) => (
          <Card key={company.id} className="border-amber-200 dark:border-yellow-800">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Building2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{company.name}</h4>
                      <div className="space-y-1 mt-2 text-sm text-[var(--text-muted)]">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {company.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {company.website}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 items-end">
                    <Badge variant="warning">{company.status}</Badge>
                    {company.riskLevel && getRiskBadge(company.riskLevel)}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-background dark:bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-muted)] mb-1">INDUSTRY</p>
                    <p className="text-sm">{company.industry}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-muted)] mb-1">COMPANY SIZE</p>
                    <p className="text-sm">{company.size}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-muted)] mb-1">SUBMITTED</p>
                    <p className="text-sm">{company.submittedAt}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-muted)] mb-1">DOCUMENTS</p>
                    <div className="flex flex-wrap gap-1">
                      {company.documents && company.documents.filter(d => !d.optional).map((doc, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          <FileText className="w-3 h-3 mr-1" />
                          {doc.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2 border-t border-[var(--border-main)]">
                  <Button
                    onClick={() => handleReview(company.id)}
                  >
                    Review
                  </Button>
                  <Button variant="outline" onClick={(e) => handleViewDetails(e, company.id)}>
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Verified Companies */}
      <div className="space-y-4">
        <h3 className="font-bold flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-green-600" />
          Verified Companies ({verifiedCompanies.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {verifiedCompanies.map((company) => (
            <Card key={company.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold">{company.name}</h4>
                      <Badge variant="success">
                        <ShieldCheck className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    <p className="text-xs text-[var(--text-muted)]">{company.industry}</p>
                  </div>
                </div>
                <p className="text-xs text-[var(--text-muted)]">Verified: {company.verifiedAt}</p>
                <div className="mt-3 pt-3 border-t border-[var(--border-main)]">
                  <Button variant="outline" size="sm" onClick={(e) => handleViewDetails(e, company.id)}>
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Rejected */}
      {rejectedCompanies.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-bold flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-600" />
            Rejected ({rejectedCompanies.length})
          </h3>

          <div className="grid grid-cols-1 gap-4">
            {rejectedCompanies.map((company) => (
              <Card key={company.id} className="border-red-200 dark:border-red-800">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold">{company.name}</h4>
                        <Badge variant="danger">Rejected</Badge>
                      </div>
                      <p className="text-sm text-[var(--text-muted)] mb-2">{company.industry}</p>
                      <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
                        <p className="text-xs font-semibold text-red-700 dark:text-red-400">
                          Reason: {company.reason}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">
                      <p>{company.rejectedAt}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={(e) => handleViewDetails(e, company.id)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Review Drawer */}
      {showDetails && selectedCompany && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end" onClick={() => setShowDetails(false)}>
          <div className="w-full max-w-3xl bg-[var(--bg-card)] h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-[var(--bg-card)] border-b border-[var(--border-main)] p-6 flex justify-between items-start z-10">
              <div>
                <h2 className="text-2xl font-bold">Company Verification Review</h2>
                <p className="text-[var(--text-muted)] text-sm">Review submitted company information and decide whether to approve, reject, or request more information.</p>
              </div>
              <button onClick={() => setShowDetails(false)} className="p-2 hover:bg-[var(--hover-bg)] rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {(() => {
                const company = [...pendingCompanies, ...verifiedCompanies, ...rejectedCompanies].find(c => c.id === selectedCompany);
                if (!company) return null;

                return (
                  <>
                    {/* Company Summary */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Company Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-[var(--text-muted)]">Company Name</span>
                          <span className="font-medium">{company.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[var(--text-muted)]">Verification Status</span>
                          <Badge variant="warning">{company.status}</Badge>
                        </div>
                        {company.riskLevel && (
                          <div className="flex justify-between">
                            <span className="text-[var(--text-muted)]">Risk Level</span>
                            {getRiskBadge(company.riskLevel)}
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-[var(--text-muted)]">Submitted Date</span>
                          <span className="font-medium">{company.submittedAt}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[var(--text-muted)]">Industry</span>
                          <span className="font-medium">{company.industry}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[var(--text-muted)]">Company Size</span>
                          <span className="font-medium">{company.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[var(--text-muted)]">Website</span>
                          <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{company.website}</a>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[var(--text-muted)]">Contact Email</span>
                          <span className="font-medium">{company.email}</span>
                        </div>
                        {company.contactPerson && (
                          <div className="flex justify-between">
                            <span className="text-[var(--text-muted)]">Contact Person</span>
                            <span className="font-medium">{company.contactPerson}</span>
                          </div>
                        )}
                        {company.location && (
                          <div className="flex justify-between">
                            <span className="text-[var(--text-muted)]">Location</span>
                            <span className="font-medium">{company.location}</span>
                          </div>
                        )}
                        {company.description && (
                          <div className="pt-3 border-t border-[var(--border-main)]">
                            <p className="text-[var(--text-muted)] text-sm mb-2">Company Description</p>
                            <p className="text-sm">{company.description}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Submitted Documents */}
                    {company.documents && company.documents.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Submitted Documents</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {company.documents.map((doc, idx) => (
                            <div key={idx} className="p-4 border border-[var(--border-main)] rounded-lg">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <p className="font-medium">{doc.name}</p>
                                    {doc.optional && <Badge variant="outline" className="text-xs">Optional</Badge>}
                                  </div>
                                  <p className="text-xs text-[var(--text-muted)]">{doc.fileName}</p>
                                  <p className="text-xs text-[var(--text-muted)]">Uploaded: {doc.uploadedAt}</p>
                                </div>
                                <Badge variant="outline">Submitted</Badge>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="w-3 h-3 mr-1" />
                                  View
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Download className="w-3 h-3 mr-1" />
                                  Download
                                </Button>
                              </div>
                              <label className="flex items-center gap-2 cursor-pointer mt-3 pt-3 border-t border-[var(--border-main)]">
                                <input type="checkbox" className="w-4 h-4" />
                                <span className="text-sm">Mark as Verified</span>
                              </label>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    )}

                    {/* Verification Checklist */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Verification Checklist</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {[
                          "Official company email verified",
                          "Website is reachable",
                          "Business license reviewed",
                          "Tax ID reviewed",
                          "Company profile reviewed",
                          "Contact person information valid",
                          "Company appears legitimate",
                          "No suspicious activity detected"
                        ].map((item, idx) => (
                          <label key={idx} className="flex items-start gap-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 mt-0.5" />
                            <div className="flex-1">
                              <span className="text-sm">{item}</span>
                              <input
                                type="text"
                                placeholder="Optional note..."
                                className="w-full mt-1 px-2 py-1 text-xs border rounded border-[var(--border-main)] bg-[var(--bg-main)]"
                              />
                            </div>
                          </label>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Risk Assessment */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Risk Assessment</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-2">
                          {[
                            { label: "Email domain matches company website", status: true },
                            { label: "Documents complete", status: true },
                            { label: "Company information consistent", status: true },
                            { label: "No duplicate company detected", status: true },
                            { label: "No suspicious reports", status: true }
                          ].map((indicator, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 bg-[var(--bg-secondary)] rounded">
                              <span className="text-sm">{indicator.label}</span>
                              {indicator.status ? (
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-600" />
                              )}
                            </div>
                          ))}
                        </div>
                        {company.riskLevel && (
                          <div className="pt-3 border-t border-[var(--border-main)]">
                            <p className="text-sm text-[var(--text-muted)] mb-2">Risk Badge</p>
                            {getRiskBadge(company.riskLevel)}
                          </div>
                        )}
                        <div className="pt-3">
                          <label className="text-sm font-medium block mb-2">Risk Notes</label>
                          <textarea
                            placeholder="Add any risk assessment notes..."
                            className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)] min-h-[80px]"
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Admin Decision */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Admin Decision</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="text-sm font-medium block mb-2">Decision</label>
                          <select
                            value={decision}
                            onChange={(e) => setDecision(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)]"
                          >
                            <option value="">Select decision...</option>
                            <option value="approve">Approve & Verify</option>
                            <option value="reject">Reject</option>
                            <option value="request">Request More Information</option>
                            <option value="suspend">Suspend / Flag for Investigation</option>
                          </select>
                        </div>

                        {decision === "reject" && (
                          <div>
                            <label className="text-sm font-medium block mb-2">Rejection Reason</label>
                            <select
                              value={rejectionReason}
                              onChange={(e) => setRejectionReason(e.target.value)}
                              className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)] mb-3"
                            >
                              <option value="">Select reason...</option>
                              <option>Invalid documents</option>
                              <option>Suspicious company</option>
                              <option>Incomplete information</option>
                              <option>Website/email mismatch</option>
                              <option>Duplicate account</option>
                              <option>Other</option>
                            </select>
                            <textarea
                              value={rejectionNote}
                              onChange={(e) => setRejectionNote(e.target.value)}
                              placeholder="Provide detailed reason for rejection..."
                              className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)] min-h-[80px]"
                            />
                          </div>
                        )}

                        {decision === "request" && (
                          <div>
                            <label className="text-sm font-medium block mb-2">Request Message</label>
                            <textarea
                              value={requestMessage}
                              onChange={(e) => setRequestMessage(e.target.value)}
                              placeholder="Write what information or documents the company needs to provide..."
                              className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)] min-h-[100px]"
                            />
                          </div>
                        )}

                        {decision && (
                          <>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={notifyByEmail}
                                onChange={(e) => setNotifyByEmail(e.target.checked)}
                                className="w-4 h-4"
                              />
                              <span className="text-sm">Notify company by email</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input type="checkbox" defaultChecked className="w-4 h-4" />
                              <span className="text-sm">Add decision to audit log</span>
                            </label>
                          </>
                        )}
                      </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <Button onClick={() => setShowApproveModal(true)} className="bg-green-600 hover:bg-green-700">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Approve & Verify
                      </Button>
                      <Button variant="outline" onClick={() => setShowRequestInfoModal(true)}>
                        <Mail className="w-4 h-4 mr-2" />
                        Request More Info
                      </Button>
                      <Button variant="outline" onClick={() => setShowRejectModal(true)} className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20">
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                      <Button variant="outline" onClick={() => setShowDetails(false)}>
                        Close
                      </Button>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Approve Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setShowApproveModal(false)}>
          <div className="bg-[var(--bg-card)] rounded-lg max-w-md w-full p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold">Approve Company?</h3>
                <p className="text-sm text-[var(--text-muted)] mt-1">This company will become verified and will be allowed to post internship and training opportunities.</p>
              </div>
              <button onClick={() => setShowApproveModal(false)} className="p-1 hover:bg-[var(--hover-bg)] rounded h-fit">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowApproveModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleApprove} className="flex-1 bg-green-600 hover:bg-green-700">
                Approve & Verify
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setShowRejectModal(false)}>
          <div className="bg-[var(--bg-card)] rounded-lg max-w-md w-full p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-red-600">Reject Company?</h3>
                <p className="text-sm text-[var(--text-muted)] mt-1">This company will not be verified and cannot post opportunities.</p>
              </div>
              <button onClick={() => setShowRejectModal(false)} className="p-1 hover:bg-[var(--hover-bg)] rounded h-fit">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowRejectModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleReject} className="flex-1 bg-red-600 hover:bg-red-700">
                Reject Company
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Request Info Modal */}
      {showRequestInfoModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setShowRequestInfoModal(false)}>
          <div className="bg-[var(--bg-card)] rounded-lg max-w-md w-full p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold">Request More Information?</h3>
                <p className="text-sm text-[var(--text-muted)] mt-1">The company will be notified to update missing or unclear verification details.</p>
              </div>
              <button onClick={() => setShowRequestInfoModal(false)} className="p-1 hover:bg-[var(--hover-bg)] rounded h-fit">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowRequestInfoModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleRequestInfo} className="flex-1">
                Send Request
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showViewDetailsModal && viewDetailsCompanyId !== null && (() => {
        const companyId = viewDetailsCompanyId;
        const company = [...pendingCompanies, ...verifiedCompanies, ...rejectedCompanies].find(
          (c) => c.id === companyId
        );
        if (!company) return null;
        return (
          <div
            className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4"
            onClick={closeViewDetails}
          >
            <div
              className="bg-[var(--bg-card)] rounded-xl w-full max-w-[880px] max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="view-details-title"
              ref={viewDetailsModalRef}
            >
              {/* Modal Header */}
              <div className="flex items-start gap-4 px-6 py-5 border-b border-[var(--border-main)] shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shrink-0 select-none">
                  {company.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-0.5">
                    Company Verification Details
                  </p>
                  <h2
                    id="view-details-title"
                    className="text-xl font-bold text-[var(--text-main)] truncate"
                  >
                    {company.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    {getStatusBadge(company.status)}
                    {company.riskLevel && getRiskBadge(company.riskLevel)}
                  </div>
                </div>
                <button
                  onClick={closeViewDetails}
                  className="p-2 hover:bg-[var(--hover-bg)] rounded-lg shrink-0 text-[var(--text-muted)]"
                  aria-label="Close details"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

                {/* A. Company Overview */}
                <div>
                  <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5" /> Company Overview
                  </h3>
                  {company.description && (
                    <p className="text-sm text-[var(--text-main)] mb-4 leading-relaxed">
                      {company.description}
                    </p>
                  )}
                  <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {([
                      { label: "Industry", value: company.industry },
                      { label: "Company Size", value: company.size },
                      { label: "Location", value: company.location },
                      { label: "Registration No.", value: company.registrationNumber },
                    ] as { label: string; value?: string }[]).filter((f) => f.value).map(({ label, value }) => (
                      <div key={label}>
                        <dt className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">{label}</dt>
                        <dd className="text-sm text-[var(--text-main)]">{value}</dd>
                      </div>
                    ))}
                    {company.website && (
                      <div>
                        <dt className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">Website</dt>
                        <dd>
                          <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline truncate block">
                            {company.website}
                          </a>
                        </dd>
                      </div>
                    )}
                    {company.linkedinUrl && (
                      <div>
                        <dt className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">LinkedIn</dt>
                        <dd>
                          <a href={company.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline truncate block">
                            {company.linkedinUrl}
                          </a>
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>

                <div className="h-px bg-[var(--border-main)]" />

                {/* B. Contact Information */}
                <div>
                  <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5" /> Submitted Contact Information
                  </h3>
                  <dl className="grid grid-cols-2 gap-4">
                    {([
                      { label: "Contact Person", value: company.contactPerson },
                      { label: "Job Title", value: company.jobTitle },
                      { label: "Email", value: company.email },
                      { label: "Phone", value: company.phone },
                    ] as { label: string; value?: string }[]).map(({ label, value }) => (
                      <div key={label}>
                        <dt className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">{label}</dt>
                        <dd className="text-sm text-[var(--text-main)]">
                          {value || <span className="italic text-[var(--text-muted)]">Not provided</span>}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="h-px bg-[var(--border-main)]" />

                {/* C. Verification Submission */}
                <div>
                  <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <FileCheck className="w-3.5 h-3.5" /> Verification Submission
                  </h3>
                  <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                      <dt className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">Submitted Date</dt>
                      <dd className="text-sm">{company.submittedAt}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">Current Status</dt>
                      <dd>{getStatusBadge(company.status)}</dd>
                    </div>
                    {company.verifiedAt && (
                      <div>
                        <dt className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">Verified Date</dt>
                        <dd className="text-sm">{company.verifiedAt}</dd>
                      </div>
                    )}
                    {company.rejectedAt && (
                      <div>
                        <dt className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">Rejected Date</dt>
                        <dd className="text-sm">{company.rejectedAt}</dd>
                      </div>
                    )}
                    {company.reason && (
                      <div className="col-span-full">
                        <dt className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">Rejection Reason</dt>
                        <dd className="text-sm text-red-600 dark:text-red-400">{company.reason}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                {/* D. Submitted Documents */}
                {company.documents && company.documents.length > 0 && (
                  <>
                    <div className="h-px bg-[var(--border-main)]" />
                    <div>
                      <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-3 flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5" /> Submitted Documents
                      </h3>
                      <div className="space-y-2">
                        {company.documents.map((doc, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 border border-[var(--border-main)] rounded-lg bg-[var(--bg-secondary)]"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded">
                                <FileText className="w-4 h-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium flex items-center gap-2">
                                  {doc.name}
                                  {doc.optional && (
                                    <Badge variant="outline" className="text-[10px] py-0">
                                      Optional
                                    </Badge>
                                  )}
                                </p>
                                <p className="text-xs text-[var(--text-muted)]">
                                  {doc.fileName} · Uploaded {doc.uploadedAt}
                                </p>
                              </div>
                            </div>
                            <span className="text-xs text-[var(--text-muted)] italic">
                              Document unavailable
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <div className="h-px bg-[var(--border-main)]" />

                {/* E. Review History */}
                <div>
                  <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5" /> Review History
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] italic">
                    No review activity recorded yet.
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[var(--border-main)] bg-[var(--bg-secondary)] shrink-0">
                <Button variant="outline" onClick={closeViewDetails}>
                  Close
                </Button>
                {(company.status === "Pending Review" || company.status === "Needs Review") && (
                  <Button
                    onClick={() => {
                      closeViewDetails();
                      setTimeout(() => {
                        setSelectedCompany(companyId);
                        setShowDetails(true);
                      }, 50);
                    }}
                  >
                    Review Company
                  </Button>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
