import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { BrainCircuit } from "lucide-react";

export function PublicFooter() {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 120);
    } else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return <footer className="landing-section border-t border-border bg-card dark:bg-[var(--bg-card)] text-foreground">
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8 grid gap-8 md:grid-cols-4">
        <div>
          <Link to="/" className="mb-4 flex items-center gap-2 text-foreground"><BrainCircuit className="h-6 w-6 text-blue-600" /><span className="font-bold">InternMatch AI</span></Link>
          <p className="text-sm text-muted-foreground">AI-assisted internship and training matching platform.</p>
        </div>
        <div>
          <h4 className="mb-4 font-semibold">Platform</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[['How It Works','how-it-works'],['For Students','for-students'],['For Companies','for-companies'],['Features','features']].map(([label,id]) => <li key={id}><button onClick={() => scrollToSection(id)} className="hover:text-blue-600">{label}</button></li>)}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-semibold">Account</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/student/login" className="hover:text-blue-600">Student Login</Link></li>
            <li><Link to="/company/login" className="hover:text-blue-600">Company Login</Link></li>
            <li><Link to="/admin/login" className="hover:text-blue-600">Admin Login</Link></li>
            <li><Link to="/student/assessment" className="hover:text-blue-600">Student Register</Link></li>
            <li><Link to="/register/company" className="hover:text-blue-600">Company Register</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-semibold">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-600">Terms of Service</a></li>
            <li><a href="#" className="hover:text-blue-600">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground"><p>&copy; 2026 InternMatch AI. All rights reserved.</p></div>
    </div>
  </footer>;
}
