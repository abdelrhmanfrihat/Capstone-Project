import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowRight, BrainCircuit, Eye, EyeOff, LoaderCircle, Lock, ShieldCheck, GraduationCap, Building2 } from "lucide-react";
import { AuthShell, type AuthRole } from "../components/auth/AuthShell";

const roleCopy = {
  student: { title: "Welcome back", subtitle: "Sign in to continue your student journey.", login: "/student/dashboard", icon: GraduationCap, placeholder: "name@university.edu", logoIcon: "text-blue-600", accentText: "text-blue-600 dark:text-blue-400", button: "bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-500", register: { label: "Create an account", to: "/student/assessment" }, secure: "All data is encrypted and secure" },
  company: { title: "Company sign in", subtitle: "Sign in to manage opportunities and candidates.", login: "/company/dashboard", icon: Building2, placeholder: "name@company.com", logoIcon: "text-purple-600", accentText: "text-purple-700 dark:text-purple-400", button: "bg-purple-700 hover:bg-purple-800 focus-visible:ring-purple-500", register: { label: "Create an account", to: "/register/company" }, secure: "All data is encrypted and secure" },
  admin: { title: "Admin sign in", subtitle: "Access the restricted administration portal.", login: "/admin/dashboard", icon: ShieldCheck, placeholder: "admin@internmatch.com", logoIcon: "text-orange-600", accentText: "text-orange-700 dark:text-orange-400", button: "bg-orange-700 hover:bg-orange-800 focus-visible:ring-orange-500", register: null, secure: "Restricted area. Every action is logged." },
} satisfies Record<AuthRole, { title: string; subtitle: string; login: string; icon: typeof GraduationCap; placeholder: string; logoIcon: string; accentText: string; button: string; register: { label: string; to: string } | null; secure: string }>;

const rememberedEmailKey = (role: AuthRole) => `internmatch-remembered-email-${role}`;

export function Login({ role = "student" }: { role?: AuthRole }) {
  const navigate = useNavigate();
  const copy = roleCopy[role];
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState(() => {
    try { return window.localStorage.getItem(rememberedEmailKey(role)) ?? ""; }
    catch { return ""; }
  });
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (window.matchMedia("(min-width: 1024px)").matches) emailRef.current?.focus();
  }, []);

  const submitLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (rememberMe) window.localStorage.setItem(rememberedEmailKey(role), email);
      else window.localStorage.removeItem(rememberedEmailKey(role));
    } catch { /* Storage may be disabled; login should still continue. */ }
    setLoading(true);
    // The current project has no authentication API; keep its existing local mock redirect behavior.
    window.setTimeout(() => navigate(copy.login), 250);
  };

  const labelClass = "text-xs font-medium uppercase tracking-wider text-muted-foreground";
  const inputClass = "h-11 w-full rounded-lg border border-border bg-muted/50 px-3 text-sm text-foreground placeholder:text-muted-foreground/80 focus-visible:outline-none";

  return <AuthShell role={role} contentClassName="max-w-sm">
    <div className="w-full">
      {resetMode ? <>
        <div className="mb-6 flex flex-col items-center text-center">
          <Link to="/" aria-label="InternMatch AI home" className="mb-5 inline-flex items-center gap-2 text-base font-semibold text-foreground"><BrainCircuit className={`size-6 ${copy.logoIcon}`} /><span>InternMatch AI</span></Link>
          <h2 className="text-2xl font-bold">Reset your password</h2>
          <p className="mt-2 text-sm text-muted-foreground">Enter your account email to request a reset link.</p>
        </div>
        {resetSent ? <p className="rounded-lg border border-border bg-muted/50 p-4 text-sm text-foreground" role="status">If an account exists for this email, we've sent a reset link.</p> : <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); setResetSent(true); }}>
          <label className="block space-y-2" htmlFor={`${role}-reset-email`}><span className={labelClass}>Email</span><input id={`${role}-reset-email`} name="email" type="email" autoComplete="email" required className={inputClass} /></label>
          <button type="submit" className={`h-11 w-full rounded-lg px-4 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${copy.button}`}>Send reset link</button>
        </form>}
        <button type="button" onClick={() => { setResetMode(false); setResetSent(false); }} className={`mt-5 min-h-11 text-sm font-medium hover:underline ${copy.accentText}`}>← Back to log in</button>
      </> : <>
        <div className="mb-6 flex flex-col items-center text-center">
          <Link to="/" aria-label="InternMatch AI home" className="mb-5 inline-flex items-center gap-2 text-base font-semibold text-foreground"><BrainCircuit className={`size-6 ${copy.logoIcon}`} /><span>InternMatch AI</span></Link>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">{copy.title}</h2>
          <p className="auth-form-subtitle mt-2 text-sm text-muted-foreground">{copy.subtitle}</p>
        </div>
        <form onSubmit={submitLogin} className="space-y-4">
          <label className="block space-y-2" htmlFor={`${role}-email`}><span className={labelClass}>Email</span><input ref={emailRef} id={`${role}-email`} name="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder={copy.placeholder} className={inputClass} /></label>
          <div>
            <div className="mb-2 flex items-center justify-between"><label className={labelClass} htmlFor={`${role}-password`}>Password</label><button type="button" onClick={() => { setResetMode(true); setResetSent(false); }} className={`text-xs font-medium hover:underline ${copy.accentText}`}>Forgot password?</button></div>
            <div className="relative"><input id={`${role}-password`} name="password" type={passwordVisible ? "text" : "password"} autoComplete="current-password" required placeholder="Enter your password" className={`${inputClass} pr-12`} /><button type="button" aria-label={passwordVisible ? "Hide password" : "Show password"} aria-pressed={passwordVisible} onClick={() => setPasswordVisible((value) => !value)} className="absolute inset-y-0 right-0 grid w-11 place-items-center rounded-r-lg text-muted-foreground hover:text-foreground"><span className="sr-only">{passwordVisible ? "Hide password" : "Show password"}</span>{passwordVisible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button></div>
          </div>
          <div className="flex min-h-6 items-center justify-between gap-3">
            {copy.register ? <Link to={copy.register.to} className={`text-xs font-medium hover:underline ${copy.accentText}`}>{copy.register.label}</Link> : <span />}
            <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-muted-foreground"><input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} className="size-4 rounded border-border accent-blue-600" />Remember me</label>
          </div>
          <div aria-live="polite" className="min-h-0" />
          <button type="submit" disabled={loading} className={`flex h-11 w-full items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold text-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 ${copy.button}`}>{loading ? <><LoaderCircle className="size-4 animate-spin" />Signing in…</> : <>Log in<ArrowRight className="size-4" /></>}</button>
        </form>
        <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground"><Lock className="size-3.5" />{copy.secure}</p>
      </>}
    </div>
  </AuthShell>;
}
