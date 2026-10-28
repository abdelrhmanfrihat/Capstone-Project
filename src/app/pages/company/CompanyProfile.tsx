import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { MOCK_COMPANIES, MOCK_OPPORTUNITIES } from "../../data/mockData";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Edit,
  ExternalLink,
  Globe,
  Link2,
  Mail,
  MapPin,
  Phone,
  Plus,
  Upload,
  X,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface CompanyProfileData {
  id: string;
  name: string;
  tagline: string;
  industry: string;
  city: string;
  country: string;
  size: string;
  yearFounded: string;
  workModel: string;
  address: string;
  description: string;
  website: string;
  contactEmail: string;
  phone: string;
  linkedIn: string;
  logo: string;
  cover: string;
  verified: boolean;
  specialties: string[];
  workEnvironment: string;
  studentLearning: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const INDUSTRY_OPTIONS = [
  "Enterprise Software", "Analytics", "Consumer Tech", "FinTech",
  "HealthTech", "EdTech", "E-Commerce", "Cybersecurity",
  "Cloud Infrastructure", "AI & Machine Learning", "Gaming",
  "Media & Entertainment", "Logistics & Supply Chain", "Other",
];

const SIZE_OPTIONS = [
  "1–10 employees", "11–50 employees", "51–200 employees",
  "201–500 employees", "501–1,000 employees", "1,001–5,000 employees",
  "5,001+ employees",
];

const WORK_MODEL_OPTIONS = ["Remote", "Hybrid", "On-site", "Flexible"];

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];

// ── Prototype data ────────────────────────────────────────────────────────────
// Stellar Cloud is a fictional demo company. Sample descriptions and specialties
// are added to demonstrate the completed design. All fields are editable.

const base = MOCK_COMPANIES[0]; // Stellar Cloud (c1) — verified, Enterprise Software

const INITIAL_PROFILE: CompanyProfileData = {
  id: base.id,
  name: base.name,
  tagline: "Empowering enterprises with intelligent cloud infrastructure.",
  industry: base.industry,
  city: "San Francisco",
  country: "United States",
  size: "51–200 employees",
  yearFounded: "2018",
  workModel: "Hybrid",
  address: "",
  description:
    "Stellar Cloud builds enterprise-grade cloud infrastructure that powers some of the world's most demanding applications. We help organizations scale reliably, cut infrastructure costs, and move faster — without sacrificing security or compliance.\n\nOur platform combines a developer-first API with enterprise-grade observability tools, making it the go-to choice for engineering teams that care about both velocity and uptime.",
  website: "https://stellarcloud.example.com",
  contactEmail: "",
  phone: "",
  linkedIn: "",
  logo: "", // initials fallback — original photo was a generic stock placeholder
  cover: "", // sky gradient placeholder (see CoverPlaceholder below)
  verified: base.verified,
  specialties: [
    "Cloud Architecture",
    "Enterprise SaaS",
    "DevOps & CI/CD",
    "React & TypeScript",
    "Data Engineering",
    "Infrastructure Security",
  ],
  workEnvironment:
    "We believe great work happens when people have autonomy and context. Teams operate in two-week cycles, ship often, and talk directly to customers. Whether remote or in our SF office, you'll have the tools and async culture to do your best work.\n\nInterns are paired with a senior engineer, attend team standups and design reviews, and contribute from day one.",
  studentLearning:
    "Interns at Stellar Cloud own a slice of the product. You won't spend your time on busy work — you'll scope, build, and ship features that real customers use.\n\nMost interns rotate across product engineering and platform teams, picking up modern full-stack practices: React frontends, Node.js services, Kubernetes deployments, and cloud-native observability. You'll leave with a portfolio piece you're proud of.",
};

// Opportunities for Stellar Cloud — merges MOCK_OPPORTUNITIES with pipeline data
const PROFILE_OPPORTUNITIES = [
  ...MOCK_OPPORTUNITIES.filter((o) => o.companyId === "c1").map((o) => ({
    id: o.id,
    title: o.title,
    type: o.type,
    location: o.location,
    deadline: "June 01, 2026",
    status: "Active",
  })),
  { id: "be-intern", title: "Backend Systems Intern",  type: "Internship", location: "Hybrid",   deadline: "June 05, 2026", status: "Active" },
  { id: "design-training", title: "Product Design Training", type: "Training",   location: "On-site", deadline: "May 30, 2026",  status: "Active" },
].slice(0, 3);

// ── Helpers ───────────────────────────────────────────────────────────────────

function isValidUrl(v: string) {
  try { const u = new URL(v); return u.protocol === "http:" || u.protocol === "https:"; }
  catch { return false; }
}
function isValidEmail(v: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
function isValidYear(v: string) {
  const n = parseInt(v, 10);
  return !isNaN(n) && n >= 1800 && n <= new Date().getFullYear();
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SkyCoverPlaceholder() {
  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0369a1 0%, #0284c7 20%, #0ea5e9 50%, #38bdf8 75%, #7dd3fc 100%)",
      }}
    >
      {/* Cloud 1 */}
      <svg
        className="absolute"
        style={{ left: "6%", top: "28%", opacity: 0.35 }}
        width="320" height="100" viewBox="0 0 320 100" fill="none"
        aria-hidden="true"
      >
        <ellipse cx="160" cy="72" rx="160" ry="44" fill="white" />
        <ellipse cx="100" cy="52" rx="90" ry="52" fill="white" />
        <ellipse cx="220" cy="56" rx="80" ry="44" fill="white" />
      </svg>
      {/* Cloud 2 */}
      <svg
        className="absolute"
        style={{ right: "12%", top: "18%", opacity: 0.28 }}
        width="240" height="78" viewBox="0 0 240 78" fill="none"
        aria-hidden="true"
      >
        <ellipse cx="120" cy="58" rx="120" ry="32" fill="white" />
        <ellipse cx="72" cy="40" rx="66" ry="40" fill="white" />
        <ellipse cx="172" cy="44" rx="60" ry="34" fill="white" />
      </svg>
      {/* Cloud 3 */}
      <svg
        className="absolute"
        style={{ right: "3%", bottom: "18%", opacity: 0.22 }}
        width="160" height="54" viewBox="0 0 160 54" fill="none"
        aria-hidden="true"
      >
        <ellipse cx="80" cy="40" rx="80" ry="24" fill="white" />
        <ellipse cx="48" cy="28" rx="46" ry="28" fill="white" />
        <ellipse cx="116" cy="30" rx="42" ry="22" fill="white" />
      </svg>
    </div>
  );
}

function FieldError({ message, id }: { message: string; id: string }) {
  return (
    <p id={id} role="alert" className="text-xs text-red-500 dark:text-red-400 mt-1">
      {message}
    </p>
  );
}

function InfoValue({ value, href }: { value: string; href?: string }) {
  if (!value) return <span className="text-[var(--text-muted)] italic text-sm">Not provided</span>;
  if (href) return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="text-sm text-blue-600 hover:underline break-all"
    >{value}</a>
  );
  return <span className="text-sm text-[var(--text-main)] break-words">{value}</span>;
}

function FactItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
        {label}
      </dt>
      <dd className="text-sm font-medium text-[var(--text-main)]">
        {value || <span className="text-[var(--text-muted)] font-normal">—</span>}
      </dd>
    </div>
  );
}

function SectionEmpty({
  prompt, action, onAdd,
}: { prompt: string; action: string; onAdd: () => void }) {
  return (
    <div className="py-5 text-center">
      <p className="text-sm text-[var(--text-muted)] mb-3">{prompt}</p>
      <button
        type="button"
        onClick={onAdd}
        className="text-sm font-medium text-blue-600 hover:underline focus-visible:outline-none focus-visible:underline"
      >
        {action}
      </button>
    </div>
  );
}

function OpportunityCard({ opp }: { opp: (typeof PROFILE_OPPORTUNITIES)[number] }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate("/company/opportunities")}
      className="w-full text-left p-4 rounded-xl border border-[var(--border-main)] hover:border-blue-400 hover:bg-[var(--hover-bg)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className="text-sm font-semibold text-[var(--text-main)] leading-snug">{opp.title}</span>
        <Badge variant="success" className="shrink-0 text-[10px]">{opp.status}</Badge>
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-[var(--text-muted)]">
        <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{opp.type}</span>
        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{opp.location}</span>
        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Deadline: {opp.deadline}</span>
      </div>
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function CompanyProfile() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState<CompanyProfileData>(INITIAL_PROFILE);
  const [draft, setDraft] = useState<CompanyProfileData>(INITIAL_PROFILE);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof CompanyProfileData | "specialtyInput", string>>>({});
  const [draftLogoPreview, setDraftLogoPreview] = useState<string | null>(null);
  const [draftCoverPreview, setDraftCoverPreview] = useState<string | null>(null);
  const [specialtyInput, setSpecialtyInput] = useState("");

  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // ── Derived display values ─────────────────────────────────────────────────
  const displayLogo  = editing ? (draftLogoPreview  ?? draft.logo)  : saved.logo;
  const displayCover = editing ? (draftCoverPreview ?? draft.cover) : saved.cover;
  const displayData  = editing ? draft : saved;
  const initials = displayData.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "SC";

  // ── Edit helpers ───────────────────────────────────────────────────────────

  function startEdit() {
    setDraft({ ...saved });
    setDraftLogoPreview(null);
    setDraftCoverPreview(null);
    setSpecialtyInput("");
    setErrors({});
    setEditing(true);
  }

  function cancelEdit() {
    setDraft({ ...saved });
    setDraftLogoPreview(null);
    setDraftCoverPreview(null);
    setSpecialtyInput("");
    setErrors({});
    setEditing(false);
  }

  function setField<K extends keyof CompanyProfileData>(key: K, value: CompanyProfileData[K]) {
    setDraft((p) => ({ ...p, [key]: value }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
  }

  // ── Image uploads ──────────────────────────────────────────────────────────

  function handleImageFile(
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (dataUrl: string) => void
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error("Upload a PNG, JPG, or WebP image.");
      e.target.value = "";
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      toast.error("The image must be 5MB or smaller.");
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => onSuccess(ev.target?.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  // ── Specialties ────────────────────────────────────────────────────────────

  function addSpecialty() {
    const val = specialtyInput.trim();
    if (!val) return;
    if (draft.specialties.includes(val)) {
      setErrors((p) => ({ ...p, specialtyInput: "This specialty is already added." }));
      return;
    }
    setDraft((p) => ({ ...p, specialties: [...p.specialties, val] }));
    setSpecialtyInput("");
    setErrors((p) => ({ ...p, specialtyInput: undefined }));
  }

  function removeSpecialty(spec: string) {
    setDraft((p) => ({ ...p, specialties: p.specialties.filter((s) => s !== spec) }));
  }

  // ── Validation ─────────────────────────────────────────────────────────────

  function validate(): Partial<Record<keyof CompanyProfileData, string>> {
    const e: Partial<Record<keyof CompanyProfileData, string>> = {};
    if (!draft.name.trim()) e.name = "Enter your company name.";
    if (draft.contactEmail.trim() && !isValidEmail(draft.contactEmail.trim()))
      e.contactEmail = "Enter a valid email address.";
    if (draft.website.trim() && !isValidUrl(draft.website.trim()))
      e.website = "Enter a valid URL.";
    if (draft.linkedIn.trim() && !isValidUrl(draft.linkedIn.trim()))
      e.linkedIn = "Enter a valid URL.";
    if (draft.yearFounded.trim() && !isValidYear(draft.yearFounded.trim()))
      e.yearFounded = "Enter a valid year that is not in the future.";
    return e;
  }

  // ── Save ───────────────────────────────────────────────────────────────────

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setTimeout(() => {
        document.querySelector<HTMLElement>("[data-first-error]")?.focus();
      }, 10);
      return;
    }
    setSaving(true);
    try {
      await new Promise<void>((res) => setTimeout(res, 900));
      const logo  = draftLogoPreview  ?? draft.logo;
      const cover = draftCoverPreview ?? draft.cover;
      setSaved({ ...draft, logo, cover });
      setDraftLogoPreview(null);
      setDraftCoverPreview(null);
      setEditing(false);
      toast.success("Company profile updated successfully.");
    } catch {
      toast.error("We couldn't save your changes. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  // ── Input helper ───────────────────────────────────────────────────────────

  function textInput(
    id: string,
    field: keyof CompanyProfileData,
    label: string,
    opts: {
      placeholder?: string;
      type?: string;
      required?: boolean;
      optional?: boolean;
      icon?: React.ReactNode;
      hint?: string;
    } = {}
  ) {
    const err = errors[field] as string | undefined;
    const isFirst = err && Object.keys(errors)[0] === field;
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-semibold mb-1.5">
          {label}
          {opts.required && <span className="text-red-500 ml-0.5">*</span>}
          {opts.optional && <span className="text-[var(--text-muted)] font-normal ml-1">(optional)</span>}
        </label>
        <div className={opts.icon ? "relative" : ""}>
          {opts.icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none flex items-center">
              {opts.icon}
            </span>
          )}
          <input
            id={id}
            type={opts.type ?? "text"}
            value={(draft[field] as string) ?? ""}
            onChange={(e) => setField(field, e.target.value as CompanyProfileData[typeof field])}
            placeholder={opts.placeholder}
            aria-describedby={err ? `err-${id}` : opts.hint ? `hint-${id}` : undefined}
            aria-invalid={!!err}
            {...(isFirst ? { "data-first-error": "" } : {})}
            className={`w-full ${opts.icon ? "pl-9 pr-3" : "px-3"} py-2 text-sm border rounded-lg bg-[var(--bg-main)] focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              err ? "border-red-500" : "border-[var(--border-main)]"
            }`}
          />
        </div>
        {opts.hint && !err && (
          <p id={`hint-${id}`} className="text-xs text-[var(--text-muted)] mt-1">{opts.hint}</p>
        )}
        {err && <FieldError message={err} id={`err-${id}`} />}
      </div>
    );
  }

  function selectInput(
    id: string,
    field: keyof CompanyProfileData,
    label: string,
    options: string[],
    placeholder = "Select…"
  ) {
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-semibold mb-1.5">{label}</label>
        <select
          id={id}
          value={(draft[field] as string) ?? ""}
          onChange={(e) => setField(field, e.target.value as CompanyProfileData[typeof field])}
          className="w-full px-3 py-2 text-sm border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)] focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">{placeholder}</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    );
  }

  function textareaInput(
    id: string,
    field: keyof CompanyProfileData,
    label: string,
    placeholder: string,
    rows = 5
  ) {
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-semibold mb-1.5">{label}</label>
        <textarea
          id={id}
          value={(draft[field] as string) ?? ""}
          onChange={(e) => setField(field, e.target.value as CompanyProfileData[typeof field])}
          placeholder={placeholder}
          rows={rows}
          className="w-full px-3 py-2.5 text-sm border border-[var(--border-main)] rounded-lg bg-[var(--bg-main)] resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[var(--text-muted)]"
        />
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <form onSubmit={handleSave} noValidate className="space-y-6 pb-8">
      {/* Hidden file inputs */}
      <input ref={logoInputRef}  type="file" accept="image/png,image/jpeg,image/webp"
        onChange={(e) => handleImageFile(e, setDraftLogoPreview)}
        className="sr-only" aria-label="Upload company logo"
      />
      <input ref={coverInputRef} type="file" accept="image/png,image/jpeg,image/webp"
        onChange={(e) => handleImageFile(e, setDraftCoverPreview)}
        className="sr-only" aria-label="Upload cover image"
      />

      {/* A. Page heading */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Company Profile</h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">
            Manage your company information and how students see your organization.
          </p>
        </div>
        {!editing ? (
          <Button type="button" onClick={startEdit} className="shrink-0 min-h-[44px]">
            <Edit className="w-4 h-4 mr-1.5" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex items-center gap-2 shrink-0">
            <Button type="button" variant="outline" onClick={cancelEdit} disabled={saving} className="min-h-[44px]">
              Cancel
            </Button>
            <Button type="submit" disabled={saving} className="min-h-[44px]">
              {saving ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        )}
      </div>

      {/* B. Cover + Identity */}
      <Card className="overflow-hidden">
        {/* Cover image */}
        <div className="relative h-[200px] md:h-[228px] overflow-hidden">
          {displayCover ? (
            <img
              src={displayCover}
              alt="Company cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <SkyCoverPlaceholder />
          )}

          {/* Change Cover button */}
          {editing && (
            <button
              type="button"
              onClick={() => coverInputRef.current?.click()}
              className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 text-white text-xs font-medium hover:bg-black/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white backdrop-blur-sm"
            >
              <Upload className="w-3.5 h-3.5" />
              Change Cover
            </button>
          )}
        </div>

        {/* Identity bar */}
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start gap-5 -mt-14">
            {/* Logo */}
            <div className="relative shrink-0 z-10">
              <div className="w-[88px] h-[88px] rounded-xl border-2 border-[var(--bg-main)] overflow-hidden bg-[var(--bg-main)]">
                {displayLogo ? (
                  <img src={displayLogo} alt={displayData.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                    {initials}
                  </div>
                )}
              </div>
              {editing && (
                <button
                  type="button"
                  onClick={() => logoInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  aria-label="Change company logo"
                >
                  <Upload className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Name + meta */}
            <div className="flex-1 min-w-0 sm:mt-10">
              {editing ? (
                <div className="space-y-3">
                  {textInput("company-name", "name", "Company Name", { required: true, placeholder: "Your company name" })}
                  {textInput("tagline", "tagline", "Tagline", { placeholder: "A short description of what you do" })}
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-[26px] font-semibold leading-tight text-[var(--text-main)]">
                      {saved.name}
                    </h2>
                    {saved.verified && (
                      <Badge variant="success" className="flex items-center gap-1 shrink-0">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  {saved.tagline && (
                    <p className="text-[15px] text-[var(--text-muted)] mb-2">{saved.tagline}</p>
                  )}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-[var(--text-muted)]">
                    {saved.industry && <span>{saved.industry}</span>}
                    {(saved.city || saved.country) && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {[saved.city, saved.country].filter(Boolean).join(", ")}
                      </span>
                    )}
                    {saved.website && (
                      <a
                        href={saved.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-600 hover:underline"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        Website
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* C. About + Facts */}
      <Card>
        <CardContent className="p-6 space-y-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold">About the Company</h2>
          </div>

          {editing ? (
            textareaInput(
              "description", "description", "Company Description",
              "Describe your company, what you do, and the work environment students can expect.",
              6
            )
          ) : saved.description ? (
            <p className="text-sm text-[var(--text-main)] whitespace-pre-wrap leading-relaxed break-words">
              {saved.description}
            </p>
          ) : (
            <SectionEmpty
              prompt="Introduce your company and explain what you do."
              action="Add company description"
              onAdd={startEdit}
            />
          )}

          {/* Facts grid */}
          {editing ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-[var(--border-main)]">
              {selectInput("industry", "industry", "Industry", INDUSTRY_OPTIONS)}
              {selectInput("size", "size", "Company Size", SIZE_OPTIONS)}
              {textInput("year-founded", "yearFounded", "Year Founded", { placeholder: "e.g. 2018" })}
              {textInput("city", "city", "City", { placeholder: "e.g. San Francisco" })}
              {textInput("country", "country", "Country", { placeholder: "e.g. United States" })}
              {selectInput("work-model", "workModel", "Work Model", WORK_MODEL_OPTIONS)}
            </div>
          ) : (
            <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-5 pt-4 border-t border-[var(--border-main)]">
              <FactItem label="Industry"       value={saved.industry} />
              <FactItem label="Company Size"   value={saved.size} />
              <FactItem label="Year Founded"   value={saved.yearFounded} />
              <FactItem label="Headquarters"   value={[saved.city, saved.country].filter(Boolean).join(", ")} />
              <FactItem label="Work Model"     value={saved.workModel} />
            </dl>
          )}
        </CardContent>
      </Card>

      {/* D. Areas of Expertise */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-base font-semibold mb-4">Areas of Expertise</h2>

          {editing ? (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {draft.specialties.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-blue-500/40 bg-blue-500/10 text-xs font-medium text-blue-400"
                  >
                    {s}
                    <button
                      type="button"
                      onClick={() => removeSpecialty(s)}
                      className="hover:text-blue-900 dark:hover:text-blue-100 focus-visible:outline-none"
                      aria-label={`Remove ${s}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label htmlFor="specialty-input" className="block text-sm font-semibold mb-1.5">
                    Add an area of expertise
                  </label>
                  <input
                    id="specialty-input"
                    type="text"
                    value={specialtyInput}
                    onChange={(e) => { setSpecialtyInput(e.target.value); setErrors((p) => ({ ...p, specialtyInput: undefined })); }}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSpecialty(); } }}
                    placeholder="e.g. Machine Learning, API Design…"
                    aria-describedby={errors.specialtyInput ? "err-specialty" : undefined}
                    className={`w-full px-3 py-2 text-sm border rounded-lg bg-[var(--bg-main)] focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.specialtyInput ? "border-red-500" : "border-[var(--border-main)]"
                    }`}
                  />
                  {errors.specialtyInput && (
                    <FieldError message={errors.specialtyInput} id="err-specialty" />
                  )}
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={addSpecialty}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    aria-label="Add specialty"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ) : saved.specialties.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {saved.specialties.map((s) => (
                <Badge key={s} variant="blue" className="px-3 py-1 text-sm">
                  {s}
                </Badge>
              ))}
            </div>
          ) : (
            <SectionEmpty
              prompt="Add the specialties that define your company."
              action="Add areas of expertise"
              onAdd={startEdit}
            />
          )}
        </CardContent>
      </Card>

      {/* E. Work environment + Student learning — side by side on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Life at the Company */}
        <Card>
          <CardHeader>
            <CardTitle>Life at the Company</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {editing ? (
              textareaInput(
                "work-environment", "workEnvironment", "Work Culture & Environment",
                "Describe your team culture, working style, and what interns can expect day-to-day.",
                7
              )
            ) : saved.workEnvironment ? (
              <p className="text-sm text-[var(--text-main)] whitespace-pre-wrap leading-relaxed break-words">
                {saved.workEnvironment}
              </p>
            ) : (
              <SectionEmpty
                prompt="Describe your team culture and working environment."
                action="Add culture details"
                onAdd={startEdit}
              />
            )}
          </CardContent>
        </Card>

        {/* What Students Can Learn */}
        <Card>
          <CardHeader>
            <CardTitle>What Students Can Learn</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {editing ? (
              textareaInput(
                "student-learning", "studentLearning", "Student Learning Experience",
                "Explain the training, mentorship, and types of projects students will contribute to.",
                7
              )
            ) : saved.studentLearning ? (
              <p className="text-sm text-[var(--text-main)] whitespace-pre-wrap leading-relaxed break-words">
                {saved.studentLearning}
              </p>
            ) : (
              <SectionEmpty
                prompt="Explain the learning experience your company offers."
                action="Add learning details"
                onAdd={startEdit}
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* F. Current Opportunities */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="text-base font-semibold">Current Opportunities</h2>
            <button
              type="button"
              onClick={() => navigate("/company/opportunities")}
              className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline focus-visible:outline-none focus-visible:underline shrink-0"
            >
              View All
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          {PROFILE_OPPORTUNITIES.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {PROFILE_OPPORTUNITIES.map((opp) => (
                <OpportunityCard key={opp.id} opp={opp} />
              ))}
            </div>
          ) : (
            <div className="py-5 text-center">
              <Briefcase className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-2" />
              <p className="text-sm font-semibold text-[var(--text-main)] mb-1">No current opportunities.</p>
              <p className="text-sm text-[var(--text-muted)]">Published opportunities will appear here.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* G. Contact & Links */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-base font-semibold mb-4">Contact &amp; Links</h2>

          {editing ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {textInput("website", "website", "Website", {
                type: "url",
                placeholder: "https://yourcompany.com",
                icon: <Globe className="w-4 h-4" />,
              })}
              {textInput("contact-email", "contactEmail", "Public Contact Email", {
                type: "email",
                placeholder: "contact@yourcompany.com",
                icon: <Mail className="w-4 h-4" />,
                hint: "This is your company's public contact email. Changing it will not change your sign-in email.",
              })}
              {textInput("phone", "phone", "Phone Number", {
                type: "tel",
                optional: true,
                placeholder: "+1 (555) 000-0000",
                icon: <Phone className="w-4 h-4" />,
              })}
              {textInput("address", "address", "Address", {
                optional: true,
                placeholder: "Street address, suite, floor…",
                icon: <MapPin className="w-4 h-4" />,
              })}
              <div className="sm:col-span-2">
                {textInput("linkedin", "linkedIn", "LinkedIn URL", {
                  type: "url",
                  optional: true,
                  placeholder: "https://linkedin.com/company/yourcompany",
                  icon: <Link2 className="w-4 h-4" />,
                })}
              </div>
            </div>
          ) : (
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {[
                { label: "Website",              icon: <Globe  className="w-4 h-4 shrink-0 mt-0.5" />, value: saved.website,      href: saved.website || undefined },
                { label: "Public Contact Email", icon: <Mail   className="w-4 h-4 shrink-0 mt-0.5" />, value: saved.contactEmail, href: saved.contactEmail ? `mailto:${saved.contactEmail}` : undefined },
                { label: "Phone Number",         icon: <Phone  className="w-4 h-4 shrink-0 mt-0.5" />, value: saved.phone },
                { label: "Address",              icon: <MapPin className="w-4 h-4 shrink-0 mt-0.5" />, value: saved.address },
                { label: "LinkedIn",             icon: <Link2  className="w-4 h-4 shrink-0 mt-0.5" />, value: saved.linkedIn,    href: saved.linkedIn || undefined },
              ].map(({ label, icon, value, href }) => (
                <div key={label} className="flex items-start gap-2.5">
                  <span className="text-[var(--text-muted)] mt-0.5">{icon}</span>
                  <div className="min-w-0">
                    <dt className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-0.5">{label}</dt>
                    <dd><InfoValue value={value} href={href} /></dd>
                  </div>
                </div>
              ))}
            </dl>
          )}
        </CardContent>
      </Card>

      {/* Bottom Save/Cancel — visible when editing, convenient for long pages */}
      {editing && (
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={cancelEdit} disabled={saving} className="min-h-[44px]">
            Cancel
          </Button>
          <Button type="submit" disabled={saving} className="min-h-[44px]">
            {saving ? "Saving…" : "Save Changes"}
          </Button>
        </div>
      )}

      {/* Prototype notice */}
      <p className="text-xs text-[var(--text-muted)] text-center pb-2">
        Profile changes are stored in local session state and will not persist after a page refresh.
        Sample content is included for this fictional demo company.
      </p>
    </form>
  );
}
