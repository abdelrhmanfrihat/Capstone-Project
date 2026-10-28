import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, BrainCircuit, Moon, Sun } from "lucide-react";
import { useTheme } from "../shared/ThemeContext";
import { NetworkDiagram, authNetworkConfigs, type AuthNetworkRole } from "../landing/NetworkDiagram";

export type AuthRole = AuthNetworkRole;

type AuthShellProps = {
  role: AuthRole;
  children: React.ReactNode;
  contentClassName?: string;
};

export function AuthShell({ role, children, contentClassName = "max-w-md" }: AuthShellProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();
  const [tabHidden, setTabHidden] = useState(false);
  const config = authNetworkConfigs[role];

  useEffect(() => {
    const updateVisibility = () => {
      const hidden = document.visibilityState === "hidden";
      setTabHidden(hidden);
      rootRef.current?.querySelectorAll<SVGSVGElement>("svg").forEach((svg) => {
        if (hidden) svg.pauseAnimations();
        else svg.unpauseAnimations();
      });
    };
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  return (
    <main ref={rootRef} className={`auth-shell h-svh${tabHidden ? " is-tab-hidden" : ""}`} data-role={role} style={{ "--auth-accent": config.accent, "--auth-center-accent": config.centerAccent } as React.CSSProperties}>
      <div className="auth-corner-controls">
        <Link to="/" aria-label="Back to home" className="auth-corner-button"><ArrowLeft className="size-4" /><span>Back to home</span></Link>
        <button type="button" onClick={toggleTheme} aria-label="Toggle theme" className="auth-corner-button">
          {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </button>
      </div>
      <section className="auth-content-panel">
        <div className="auth-content mx-auto w-full px-4 py-3 sm:px-8 lg:px-10">
          <div className={`auth-form-content mx-auto w-full ${contentClassName}`}>{children}</div>
        </div>
      </section>
      <aside className="auth-scene-panel" aria-label={`${config.roleLabel} overview`}>
        <Link to="/" aria-label="InternMatch AI home" className="auth-brand"><BrainCircuit className="size-7" /><span>InternMatch AI</span></Link>
        <div className="auth-scene-copy"><p className="auth-eyebrow">{config.roleLabel} portal</p><h1>{config.headline}</h1><p className="auth-scene-description">{config.description}</p></div>
        <NetworkDiagram config={config} />
        <p className="auth-benefit"><span aria-hidden="true">✓</span>{config.benefit}</p>
      </aside>
    </main>
  );
}
