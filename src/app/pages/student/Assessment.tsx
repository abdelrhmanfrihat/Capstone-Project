import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { BrainCircuit, CheckCircle2, ArrowRight, Eye, EyeOff } from "lucide-react";
import "./Assessment.css";

const STEPS = [
  "Basic Info",
  "Education",
  "Technical Skills",
  "Soft Skills",
  "Interests",
  "Behavioral / Work Style",
];

export function StudentAssessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    linkedIn: "",
  });
  const [touched, setTouched] = useState({ email: false, password: false, confirmPassword: false });
  const [showErrors, setShowErrors] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const passwordValid = formData.password.length >= 8 && /[A-Za-z]/.test(formData.password) && /\d/.test(formData.password);
  const confirmPasswordValid = formData.confirmPassword.length > 0 && formData.confirmPassword === formData.password;
  const errors = {
    email: emailValid ? "" : "Enter a valid email address.",
    password: passwordValid ? "" : "Use at least 8 characters with a letter and a number.",
    confirmPassword: confirmPasswordValid ? "" : "Passwords don't match.",
  };
  const strength = formData.password.length === 0 ? 0 : passwordValid ? 3 : formData.password.length >= 8 || (/[A-Za-z]/.test(formData.password) && /\d/.test(formData.password)) ? 2 : 1;
  const strengthClasses = [
    strength === 1 ? "bg-red-500" : "bg-muted",
    strength === 2 ? "bg-amber-500" : "bg-muted",
    strength === 3 ? "bg-green-500" : "bg-muted",
  ];
  const updateField = (field: keyof typeof formData, value: string) => setFormData((current) => ({ ...current, [field]: value }));

  const advanceStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(c => c + 1);
    } else {
      // TODO: connect to backend registration
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        navigate("/student/profile-generated");
      }, 2000);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentStep === 0) {
      setShowErrors(true);
      setTouched({ email: true, password: true, confirmPassword: true });
      const firstInvalidId = !emailValid ? "student-email" : !passwordValid ? "student-password" : !confirmPasswordValid ? "student-confirm-password" : null;
      if (firstInvalidId) {
        document.getElementById(firstInvalidId)?.focus();
        return;
      }
    }
    advanceStep();
  };

  const shouldShowError = (field: keyof typeof touched) => showErrors || touched[field];

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label htmlFor="student-first-name" className="text-sm font-medium">First Name</label>
                <input id="student-first-name" name="given-name" autoComplete="given-name" value={formData.firstName} onChange={(event) => updateField("firstName", event.target.value)} className="w-full rounded-md border border-[var(--border-main)] bg-[var(--bg-main)] px-3 py-2" placeholder="Alex" />
              </div>
              <div className="space-y-1">
                <label htmlFor="student-last-name" className="text-sm font-medium">Last Name</label>
                <input id="student-last-name" name="family-name" autoComplete="family-name" value={formData.lastName} onChange={(event) => updateField("lastName", event.target.value)} className="w-full rounded-md border border-[var(--border-main)] bg-[var(--bg-main)] px-3 py-2" placeholder="Chen" />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="student-email" className="text-sm font-medium">Email *</label>
              <input
                id="student-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(event) => updateField("email", event.target.value)}
                onBlur={() => setTouched((current) => ({ ...current, email: true }))}
                aria-invalid={shouldShowError("email") && !emailValid}
                aria-describedby={shouldShowError("email") && errors.email ? "student-email-error" : undefined}
                className="w-full rounded-md border border-[var(--border-main)] bg-[var(--bg-main)] px-3 py-2"
                placeholder="name@university.edu"
              />
              {shouldShowError("email") && errors.email && <p id="student-email-error" aria-live="polite" className="text-sm text-red-700 dark:text-red-300">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label htmlFor="student-password" className="text-sm font-medium">Password *</label>
                <div className="relative">
                  <input
                    id="student-password"
                    name="password"
                    type={passwordVisible ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={(event) => updateField("password", event.target.value)}
                    onBlur={() => setTouched((current) => ({ ...current, password: true }))}
                    aria-invalid={shouldShowError("password") && !passwordValid}
                    aria-describedby={shouldShowError("password") && errors.password ? "student-password-hint student-password-strength student-password-error" : "student-password-hint student-password-strength"}
                    className="w-full rounded-md border border-[var(--border-main)] bg-[var(--bg-main)] px-3 py-2 pr-12"
                  />
                  <button type="button" aria-label={passwordVisible ? "Hide password" : "Show password"} aria-pressed={passwordVisible} onClick={() => setPasswordVisible((visible) => !visible)} className="absolute inset-y-0 right-0 grid h-11 w-11 place-items-center rounded-r-md text-[var(--text-muted)] hover:text-[var(--text-main)]">
                    {passwordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p id="student-password-hint" className="text-xs text-[var(--text-muted)]">At least 8 characters, with a letter and a number.</p>
                <div id="student-password-strength" role="meter" aria-label="Password strength" aria-valuemin={0} aria-valuemax={3} aria-valuenow={strength} aria-valuetext={strength === 0 ? "No password" : strength === 1 ? "Weak" : strength === 2 ? "Medium" : "Strong"} className="flex h-1 gap-1">
                  {strengthClasses.map((className, index) => <span key={index} className={`flex-1 rounded-full ${className}`} />)}
                </div>
                {shouldShowError("password") && errors.password && <p id="student-password-error" aria-live="polite" className="text-sm text-red-700 dark:text-red-300">{errors.password}</p>}
              </div>

              <div className="space-y-1">
                <label htmlFor="student-confirm-password" className="text-sm font-medium">Confirm Password *</label>
                <div className="relative">
                  <input
                    id="student-confirm-password"
                    name="confirmPassword"
                    type={confirmPasswordVisible ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={(event) => updateField("confirmPassword", event.target.value)}
                    onBlur={() => setTouched((current) => ({ ...current, confirmPassword: true }))}
                    aria-invalid={shouldShowError("confirmPassword") && !confirmPasswordValid}
                    aria-describedby={shouldShowError("confirmPassword") && errors.confirmPassword ? "student-confirm-password-error" : undefined}
                    className="w-full rounded-md border border-[var(--border-main)] bg-[var(--bg-main)] px-3 py-2 pr-12"
                  />
                  <button type="button" aria-label={confirmPasswordVisible ? "Hide password" : "Show password"} aria-pressed={confirmPasswordVisible} onClick={() => setConfirmPasswordVisible((visible) => !visible)} className="absolute inset-y-0 right-0 grid h-11 w-11 place-items-center rounded-r-md text-[var(--text-muted)] hover:text-[var(--text-main)]">
                    {confirmPasswordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {shouldShowError("confirmPassword") && errors.confirmPassword && <p id="student-confirm-password-error" aria-live="polite" className="text-sm text-red-700 dark:text-red-300">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="student-linkedin" className="text-sm font-medium">LinkedIn/Portfolio (Optional)</label>
              <input id="student-linkedin" name="url" type="url" value={formData.linkedIn} onChange={(event) => updateField("linkedIn", event.target.value)} className="w-full rounded-md border border-[var(--border-main)] bg-[var(--bg-main)] px-3 py-2" placeholder="https://" />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Technical Skills</h3>
              <Badge variant="blue" className="gap-1"><BrainCircuit className="w-3 h-3"/> AI Assisted</Badge>
            </div>
            <p className="text-sm text-[var(--text-muted)]">Type skills and rate your proficiency. Our AI will map them to industry standards.</p>
            <div className="space-y-3 mt-4">
              {["React", "TypeScript", "Node.js"].map(skill => (
                <div key={skill} className="flex items-center justify-between p-3 border rounded-lg border-[var(--border-main)]">
                  <span className="font-medium">{skill}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(level => (
                      <button key={level} className={`w-8 h-8 rounded-full ${level <= 4 ? "bg-blue-600 text-white" : "bg-muted dark:bg-gray-700 text-muted-foreground"}`}>
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full border-dashed border-2">
                + Add Another Skill
              </Button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Behavioral Scenario</h3>
            <p className="text-sm text-[var(--text-muted)]">How would you respond to this situation?</p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800 text-sm mb-4">
              "You are assigned a task but realize halfway through that the proposed solution won't scale. What do you do?"
            </div>
            <textarea 
              className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)] min-h-[100px]" 
              placeholder="I would..."
            ></textarea>
            <div className="text-xs text-[var(--text-muted)] flex items-center gap-1">
              <BrainCircuit className="w-3 h-3" />
              AI analyzes sentiment, problem-solving approach, and communication style.
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{STEPS[currentStep]}</h3>
            <p className="text-sm text-[var(--text-muted)]">Please complete the required fields to build your profile.</p>
            <div className="h-40 flex items-center justify-center border-2 border-dashed border-[var(--border-main)] rounded-lg text-[var(--text-muted)]">
              Form inputs for {STEPS[currentStep]}
            </div>
          </div>
        );
    }
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-[var(--bg-main)]">
      <main className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-8 text-center sm:px-6 sm:py-12">
        <BrainCircuit className="w-16 h-16 text-blue-600 animate-pulse mb-6" />
        <h2 className="text-2xl font-bold mb-2">Analyzing Profile...</h2>
        <p className="text-[var(--text-muted)] max-w-md text-center">
          Our AI is mapping your skills, behavioral traits, and interests to thousands of active opportunities.
        </p>
        <div className="w-64 bg-muted dark:bg-gray-700 rounded-full h-2 mt-8 overflow-hidden">
          <div className="bg-blue-600 h-2 rounded-full w-2/3 animate-pulse"></div>
        </div>
      </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="w-full flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-3xl">
      <div className="mb-8 w-full">
        <h1 className="text-2xl font-bold text-center mb-2">Build Your AI Profile</h1>
        <p className="text-center text-[var(--text-muted)]">No CV required. We match based on true capabilities and potential.</p>
        
        <div className="flex justify-between mt-8 relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2 z-0"></div>
          <div 
            className="absolute top-1/2 left-0 h-1 bg-blue-600 -translate-y-1/2 z-0 transition-all duration-300"
            style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
          ></div>
          
          {STEPS.map((step, i) => (
            <div key={step} className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                i < currentStep ? "bg-blue-600 text-white" : 
                i === currentStep ? "bg-blue-100 text-blue-700 border-2 border-blue-600 dark:bg-blue-900 dark:text-blue-300" : 
                "bg-muted text-muted-foreground"
              }`}>
                {i < currentStep ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      <form noValidate onSubmit={handleSubmit} className="w-full student-assessment-form">
      <Card className={`w-full shadow-lg border-[var(--border-main)] ${currentStep === 0 ? "flex max-h-[calc(100svh-300px)] min-h-0 flex-col gap-0 overflow-hidden" : ""}`}>
        <CardContent className={currentStep === 0 ? "min-h-0 flex-1 overflow-y-auto p-5" : "p-8"}>
          {renderStepContent()}
        </CardContent>
        <CardFooter className={`flex justify-between p-6 bg-muted rounded-b-xl border-t border-[var(--border-main)] ${currentStep === 0 ? "shrink-0 p-4" : ""}`}>
          <Button type="button" variant="ghost" disabled={currentStep === 0} onClick={() => setCurrentStep(c => c - 1)}>
            Back
          </Button>
          <Button type="submit" className="gap-2">
            {currentStep === STEPS.length - 1 ? "Generate Profile" : "Continue"} <ArrowRight className="w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>
      </form>
      </div>
      </main>
    </div>
  );
}

export function ProfileGenerated() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="w-full flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
      <Card className="w-full max-w-2xl text-center shadow-lg border-green-200 dark:border-green-900/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 z-0"></div>
        <CardContent className="relative z-10 p-8 flex flex-col items-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Profile Generated Successfully!</h1>
          <p className="text-[var(--text-muted)] mb-8">
            Our AI has processed your assessment. Your profile strength is <strong className="text-green-600">92%</strong>. 
            You are ready to be matched with top companies.
          </p>
          
          <div className="w-full bg-[var(--bg-card)] rounded-xl p-6 border border-[var(--border-main)] shadow-sm mb-8 text-left space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-[var(--border-main)]">
              <span className="font-semibold text-lg flex items-center gap-2"><BrainCircuit className="w-5 h-5 text-blue-600" /> AI Summary</span>
            </div>
            <p className="text-sm">
              "Strong technical foundation in modern web technologies. Excellent team collaborator based on behavioral scenario responses. Best suited for fast-paced agile environments."
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="blue">Frontend Focused</Badge>
              <Badge variant="blue">Collaborative</Badge>
              <Badge variant="blue">Problem Solver</Badge>
            </div>
          </div>
          
          <Button size="lg" onClick={() => navigate("/student/dashboard")}>
            Go to Dashboard
          </Button>
        </CardContent>
      </Card>
      </div>
      </main>
    </div>
  );
}
