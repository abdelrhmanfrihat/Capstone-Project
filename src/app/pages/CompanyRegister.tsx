import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import "./CompanyRegister.css";
import {
  Building2,
  Mail,
  Lock,
  User,
  Phone,
  Globe,
  MapPin,
  FileText,
  Upload,
  CheckCircle2,
  X,
  ArrowLeft,
  ArrowRight,
  ChevronDown
} from "lucide-react";

export function CompanyRegister() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1: Account Information
    email: "",
    password: "",
    confirmPassword: "",
    contactName: "",
    jobTitle: "",
    phone: "",

    // Step 2: Company Information
    companyName: "",
    website: "",
    industry: "",
    companySize: "",
    location: "",
    description: "",
    linkedIn: "",
    registrationNumber: "",

    // Step 3: Documents
    businessLicense: null as File | null,
    taxId: null as File | null,
    companyProfile: null as File | null,
    companyLogo: null as File | null,

    // Step 4: Agreements
    accuracyConfirmed: false,
    termsAgreed: false,
    verificationUnderstood: false
  });

  const steps = [
    { number: 1, title: "Account Information" },
    { number: 2, title: "Company Information" },
    { number: 3, title: "Verification Documents" },
    { number: 4, title: "Review & Submit" }
  ];

  const industries = [
    "Software Development",
    "AI / Machine Learning",
    "Cybersecurity",
    "Data Analytics",
    "FinTech",
    "HealthTech",
    "EdTech",
    "E-commerce",
    "Marketing",
    "Other"
  ];

  const companySizes = [
    "1-10 employees",
    "11-50 employees",
    "50-200 employees",
    "201-500 employees",
    "500+ employees"
  ];

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData({ ...formData, [field]: file });
  };

  const handleSubmit = () => {
    // Here you would submit to backend
    console.log("Submitting company registration:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex min-h-svh flex-col bg-background text-foreground">
        <main className="flex flex-1 items-start justify-center px-4 py-8 sm:px-6 sm:py-10">
        <Card className="mx-auto w-full max-w-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>

            <h1 className="text-2xl font-bold mb-2">Company Registration Submitted</h1>

            <p className="text-[var(--text-muted)] mb-4">
              Your company account has been submitted for admin review. You will be notified once your account is approved, rejected, or if more information is required.
            </p>

            <Badge variant="warning" className="mb-6">Pending Review</Badge>

            <div className="flex gap-3 justify-center">
              <Button onClick={() => navigate("/company/login")} className="bg-blue-600 hover:bg-blue-700 text-white">
                Go to Login
              </Button>
              <Button variant="outline">Contact Support</Button>
            </div>
          </CardContent>
        </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <main className="w-full flex-1 px-4 py-6 sm:px-6 sm:py-8">
      <div className={`mx-auto w-full transition-[max-width] duration-[250ms] ease-out motion-reduce:transition-none ${currentStep === 1 ? "max-w-3xl" : "max-w-6xl"}`}>
        {/* Header */}
        <div className="mb-5 text-center sm:mb-6">
          <h2 className="mb-1 text-[clamp(1.5rem,calc(2.6svh_+_0.75rem),2.25rem)] font-bold">Register as Company</h2>
          <p className="mx-auto max-w-3xl text-sm text-[var(--text-muted)]">
            Create your company account and submit verification details so admins can review and approve your organization.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-5 sm:mb-6">
          <div className="mx-auto flex max-w-3xl items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                      currentStep >= step.number
                        ? "bg-blue-600 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {currentStep > step.number ? <CheckCircle2 className="w-5 h-5" /> : step.number}
                  </div>
                  <span className="mt-1.5 hidden text-center text-xs sm:block">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`mx-1.5 h-1 flex-1 sm:mx-2 ${
                      currentStep > step.number ? "bg-blue-600" : "bg-muted"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className={`grid grid-cols-1 gap-4 lg:gap-6 ${currentStep > 1 ? "lg:grid-cols-[minmax(0,1fr)_370px]" : ""}`}>
          {/* Main Form */}
          <div className={`min-w-0 transition-all duration-[250ms] ease-out motion-reduce:transition-none ${currentStep === 1 ? "mx-auto w-full max-w-3xl company-form-to-center" : "w-full company-form-to-left"}`}>
            <Card className="flex max-h-[calc(100svh-240px)] min-h-0 flex-col gap-0 overflow-hidden sm:max-h-[calc(100svh-280px)]">
              <CardHeader className="shrink-0 px-5 pb-4 pt-5">
                <CardTitle className="text-base">Step {currentStep}: {steps[currentStep - 1].title}</CardTitle>
              </CardHeader>
              <CardContent className="min-h-0 flex-1 overflow-y-auto p-5">
                {/* Step 1: Account Information */}
                {currentStep === 1 && (
                  <div className="space-y-3">
                    <p className="mb-3 text-sm text-[var(--text-muted)]">
                      Use an official company email address. This email will be used for login and admin communication.
                    </p>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-semibold">Company Email *</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="hr@company.com"
                          className="h-10 w-full rounded-lg border border-[var(--border-main)] bg-transparent px-3 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-semibold">Contact Person Full Name *</label>
                        <input
                          type="text"
                          value={formData.contactName}
                          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                          placeholder="John Doe"
                          className="h-10 w-full rounded-lg border border-[var(--border-main)] bg-transparent px-3 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-semibold">Password *</label>
                        <input
                          type="password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="h-10 w-full rounded-lg border border-[var(--border-main)] bg-transparent px-3 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-semibold">Confirm Password *</label>
                        <input
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className="h-10 w-full rounded-lg border border-[var(--border-main)] bg-transparent px-3 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-semibold">Job Title *</label>
                        <input
                          type="text"
                          value={formData.jobTitle}
                          onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                          placeholder="HR Manager"
                          className="h-10 w-full rounded-lg border border-[var(--border-main)] bg-transparent px-3 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-semibold">Contact Phone Number *</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 234 567 8900"
                          className="h-10 w-full rounded-lg border border-[var(--border-main)] bg-transparent px-3 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Company Information */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Company Name *</label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="InnovateLabs Inc."
                        className="h-10 w-full rounded-lg border border-[var(--border-main)] bg-transparent px-3 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Company Website *</label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="https://innovatelabs.com"
                        className="h-10 w-full rounded-lg border border-[var(--border-main)] bg-transparent px-3 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Industry *</label>
                        <select
                          value={formData.industry}
                          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                          className="h-10 w-full rounded-lg border border-[var(--border-main)] bg-transparent px-3 focus:border-blue-500 focus:outline-none"
                        >
                          <option value="">Select Industry</option>
                          {industries.map((ind) => (
                            <option key={ind} value={ind}>{ind}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Company Size *</label>
                        <select
                          value={formData.companySize}
                          onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                          className="h-10 w-full rounded-lg border border-[var(--border-main)] bg-transparent px-3 focus:border-blue-500 focus:outline-none"
                        >
                          <option value="">Select Size</option>
                          {companySizes.map((size) => (
                            <option key={size} value={size}>{size}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Company Location *</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="San Francisco, CA"
                        className="h-10 w-full rounded-lg border border-[var(--border-main)] bg-transparent px-3 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Company Description *</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe your company..."
                        rows={4}
                        className="min-h-24 w-full rounded-lg border border-[var(--border-main)] bg-transparent px-3 py-2 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">LinkedIn Page URL</label>
                      <input
                        type="url"
                        value={formData.linkedIn}
                        onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                        placeholder="https://linkedin.com/company/..."
                        className="h-10 w-full rounded-lg border border-[var(--border-main)] bg-transparent px-3 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Registration / License Number *</label>
                      <input
                        type="text"
                        value={formData.registrationNumber}
                        onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                        placeholder="123456789"
                        className="h-10 w-full rounded-lg border border-[var(--border-main)] bg-transparent px-3 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Verification Documents */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        Your company account will remain under "Pending Review" until an admin verifies the submitted information and documents.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Business License * <Badge variant="warning">Required</Badge></label>
                      <FileUploadBox
                        file={formData.businessLicense}
                        onUpload={(file) => handleFileUpload("businessLicense", file)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Tax ID * <Badge variant="warning">Required</Badge></label>
                      <FileUploadBox
                        file={formData.taxId}
                        onUpload={(file) => handleFileUpload("taxId", file)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Company Profile * <Badge variant="warning">Required</Badge></label>
                      <FileUploadBox
                        file={formData.companyProfile}
                        onUpload={(file) => handleFileUpload("companyProfile", file)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Company Logo <Badge variant="default">Optional</Badge></label>
                      <FileUploadBox
                        file={formData.companyLogo}
                        onUpload={(file) => handleFileUpload("companyLogo", file)}
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Review & Submit */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <Card className="bg-muted">
                      <CardHeader>
                        <CardTitle className="text-base">Company Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <span className="text-[var(--text-muted)]">Company Name:</span>
                          <span className="font-semibold">{formData.companyName || "—"}</span>

                          <span className="text-[var(--text-muted)]">Email:</span>
                          <span className="font-semibold">{formData.email || "—"}</span>

                          <span className="text-[var(--text-muted)]">Website:</span>
                          <span className="font-semibold">{formData.website || "—"}</span>

                          <span className="text-[var(--text-muted)]">Industry:</span>
                          <span className="font-semibold">{formData.industry || "—"}</span>

                          <span className="text-[var(--text-muted)]">Company Size:</span>
                          <span className="font-semibold">{formData.companySize || "—"}</span>

                          <span className="text-[var(--text-muted)]">Location:</span>
                          <span className="font-semibold">{formData.location || "—"}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-muted">
                      <CardHeader>
                        <CardTitle className="text-base">Contact Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <span className="text-[var(--text-muted)]">Contact Person:</span>
                          <span className="font-semibold">{formData.contactName || "—"}</span>

                          <span className="text-[var(--text-muted)]">Job Title:</span>
                          <span className="font-semibold">{formData.jobTitle || "—"}</span>

                          <span className="text-[var(--text-muted)]">Phone Number:</span>
                          <span className="font-semibold">{formData.phone || "—"}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-muted">
                      <CardHeader>
                        <CardTitle className="text-base">Uploaded Documents</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          {formData.businessLicense ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <X className="w-4 h-4 text-red-600" />}
                          <span>Business License</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {formData.taxId ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <X className="w-4 h-4 text-red-600" />}
                          <span>Tax ID</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {formData.companyProfile ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <X className="w-4 h-4 text-red-600" />}
                          <span>Company Profile</span>
                        </div>
                        {formData.companyLogo && (
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            <span>Company Logo</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <div className="space-y-3 pt-4 border-t border-[var(--border-main)]">
                      <label className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked={formData.accuracyConfirmed}
                          onChange={(e) => setFormData({ ...formData, accuracyConfirmed: e.target.checked })}
                          className="mt-1"
                        />
                        <span className="text-sm">I confirm that the submitted company information is accurate.</span>
                      </label>

                      <label className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked={formData.termsAgreed}
                          onChange={(e) => setFormData({ ...formData, termsAgreed: e.target.checked })}
                          className="mt-1"
                        />
                        <span className="text-sm">I agree to the Terms of Service and Privacy Policy.</span>
                      </label>

                      <label className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked={formData.verificationUnderstood}
                          onChange={(e) => setFormData({ ...formData, verificationUnderstood: e.target.checked })}
                          className="mt-1"
                        />
                        <span className="text-sm">I understand that my account requires admin verification before posting opportunities.</span>
                      </label>
                    </div>
                  </div>
                )}

                {currentStep > 1 && (
                  <div className="lg:hidden">
                    <button
                      type="button"
                      aria-expanded={previewOpen}
                      onClick={() => setPreviewOpen((open) => !open)}
                      className="flex min-h-11 w-full items-center justify-between rounded-lg border border-[var(--border-main)] px-4 text-sm font-semibold"
                    >
                      Preview
                      <ChevronDown className={`h-4 w-4 transition-transform motion-reduce:transition-none ${previewOpen ? "rotate-180" : ""}`} />
                    </button>
                    {previewOpen && <div className="mt-3"><CompanyPreview formData={formData} /></div>}
                  </div>
                )}
              </CardContent>

                {/* Navigation Buttons */}
                <div className="flex shrink-0 justify-between border-t border-[var(--border-main)] px-5 py-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                    className="flex min-h-11 items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>

                  {currentStep < 4 ? (
                    <Button
                      onClick={() => setCurrentStep(currentStep + 1)}
                      className="flex min-h-11 items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={!formData.accuracyConfirmed || !formData.termsAgreed || !formData.verificationUnderstood}
                      className="min-h-11 bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Submit for Verification
                    </Button>
                  )}
                </div>
            </Card>

          </div>

          {/* Preview Card */}
          {currentStep > 1 && (
            <aside className="company-preview-enter hidden min-w-0 self-start lg:sticky lg:top-6 lg:block">
              <CompanyPreview formData={formData} />
            </aside>
          )}
        </div>
        <div className="mt-4 text-center">
          <button onClick={() => navigate("/company/login")} className="text-sm text-blue-600 hover:underline">
            Already have an account? Sign in
          </button>
        </div>
      </div>
      </main>
    </div>
  );
}

function CompanyPreview({ formData }: { formData: {
  email: string; contactName: string; jobTitle: string; companyName: string; website: string;
  industry: string; companySize: string; location: string; description: string;
  businessLicense: File | null; taxId: File | null; companyProfile: File | null; companyLogo: File | null;
} }) {
  const documents = [formData.businessLicense, formData.taxId, formData.companyProfile, formData.companyLogo].filter((file): file is File => Boolean(file));
  return (
    <Card className="border-purple-200 dark:border-purple-500/30">
      <CardHeader className="px-5 pt-5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Preview</CardTitle>
          <Badge variant="warning">Pending verification</Badge>
        </div>
        <p className="text-xs text-[var(--text-muted)]">This is how admins will see your company.</p>
      </CardHeader>
      <CardContent className="space-y-4 px-5 pb-5 text-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-purple-100 text-lg font-bold text-purple-700 dark:bg-purple-500/15 dark:text-purple-300">
            {(formData.companyName.trim()[0] || "C").toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate font-semibold">{formData.companyName || "Company name"}</p>
            <p className="truncate text-xs text-[var(--text-muted)]">{formData.industry || "Industry"}</p>
          </div>
        </div>
        <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-2">
          <span className="text-[var(--text-muted)]">Company size</span><span className="truncate text-right">{formData.companySize || "Company size"}</span>
          <span className="text-[var(--text-muted)]">Location</span><span className="truncate text-right">{formData.location || "Location"}</span>
          <span className="text-[var(--text-muted)]">Website</span><span className="truncate text-right text-purple-700 dark:text-purple-300">{formData.website || "Website"}</span>
          <span className="text-[var(--text-muted)]">Contact</span><span className="truncate text-right">{formData.contactName || "Contact person"}</span>
          <span className="text-[var(--text-muted)]">Job title</span><span className="truncate text-right">{formData.jobTitle || "Job title"}</span>
        </div>
        <p className="line-clamp-3 text-[var(--text-muted)]">{formData.description || "Short company description"}</p>
        <div className="border-t border-[var(--border-main)] pt-3">
          <p className="mb-2 text-xs font-semibold">Verification documents</p>
          {documents.length ? <ul className="space-y-1 text-xs text-[var(--text-muted)]">{documents.map((file) => <li key={`${file.name}-${file.size}`} className="truncate">{file.name}</li>)}</ul> : <p className="text-xs text-[var(--text-muted)]">Uploaded document names will appear here.</p>}
        </div>
      </CardContent>
    </Card>
  );
}

// File Upload Component
function FileUploadBox({ file, onUpload }: { file: File | null; onUpload: (file: File | null) => void }) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  if (file) {
    return (
      <div className="border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-semibold text-sm">{file.name}</p>
              <p className="text-xs text-[var(--text-muted)]">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
          </div>
          <button
            onClick={() => onUpload(null)}
            className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 border-dashed border-[var(--border-main)] rounded-lg p-6 hover:border-blue-300 transition-colors cursor-pointer">
      <label className="flex flex-col items-center gap-2 cursor-pointer">
        <Upload className="w-8 h-8 text-[var(--text-muted)]" />
        <span className="text-sm font-semibold">Click to upload</span>
        <span className="text-xs text-[var(--text-muted)]">PDF, PNG, JPG (Max 10MB)</span>
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  );
}
