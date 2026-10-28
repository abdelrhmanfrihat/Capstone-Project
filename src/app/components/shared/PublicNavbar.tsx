import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { BrainCircuit, Building2, ChevronDown, Menu, Moon, Plus, Shield, Sun, Users, X } from "lucide-react";
import { useTheme } from "./ThemeContext";

const primaryNavigation = [
  { label: "Home", id: "home" },
  { label: "The Gap", id: "gap" },
  { label: "How It Works", id: "how-it-works" },
  { label: "For Students", id: "for-students" },
  { label: "For Companies", id: "for-companies" },
];

const featureNavigation = [
  { label: "Explainable Matching", id: "features" },
  { label: "Status Tracking", id: "status-tracking" },
  { label: "Feedback", id: "feedback" },
  { label: "Trust and Moderation", id: "trust" },
  { label: "Stats", id: "stats" },
  { label: "Ready to start", id: "get-started" },
];

const sectionNavigation = [
  { label: "Home", id: "home" },
  { label: "The Gap", id: "gap" },
  { label: "How It Works", id: "how-it-works" },
  { label: "For Students", id: "for-students" },
  { label: "For Companies", id: "for-companies" },
  ...featureNavigation,
];

const featureIds = new Set(featureNavigation.map(({ id }) => id));

const portals = [
  { name: "Student", icon: Users, items: [{ label: "Login", to: "/student/login" }, { label: "Register", to: "/student/assessment" }] },
  { name: "Company", icon: Building2, items: [{ label: "Login", to: "/company/login" }, { label: "Register", to: "/register/company" }] },
  { name: "Admin", icon: Shield, items: [{ label: "Login", to: "/admin/login" }] },
];

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function scrollToSection(id: string, focusHeading = true) {
  const element = document.getElementById(id);
  if (!element) return;
  const heading = element.querySelector<HTMLElement>("h1, h2");
  if (focusHeading) heading?.focus({ preventScroll: true });
  if (prefersReducedMotion()) {
    const top = window.scrollY + element.getBoundingClientRect().top - (parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 64);
    const rootStyle = document.documentElement.style;
    const previousScrollBehavior = rootStyle.scrollBehavior;
    rootStyle.scrollBehavior = "auto";
    window.scrollTo(0, top);
    rootStyle.scrollBehavior = previousScrollBehavior;
  } else {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function PublicNavbar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState<"navigation" | "portals">("navigation");
  const [expandedPortal, setExpandedPortal] = useState<string | null>(null);
  const [portalMenu, setPortalMenu] = useState(false);
  const [featuresMenu, setFeaturesMenu] = useState(false);
  const [compactDesktop, setCompactDesktop] = useState(() => typeof window !== "undefined" && window.innerWidth < 1280);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const featuresTriggerRef = useRef<HTMLButtonElement>(null);
  const featuresMenuRef = useRef<HTMLDivElement>(null);
  const openedFromAuth = location.pathname !== "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1280px)");
    const update = () => setCompactDesktop(!media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") return;
    let frame = 0;
    let scheduled = false;
    const updateActiveSection = () => {
      scheduled = false;
      const sections = sectionNavigation.map(({ id }) => document.getElementById(id)).filter((node): node is HTMLElement => Boolean(node));
      if (window.scrollY < 2) { setActiveSection("home"); return; }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        setActiveSection(sectionNavigation[sectionNavigation.length - 1].id);
        return;
      }
      const threshold = window.innerHeight * 0.35;
      let current = sections[0]?.id ?? "home";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= threshold) current = section.id;
        else break;
      }
      setActiveSection(current);
    };
    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      frame = window.requestAnimationFrame(updateActiveSection);
    };
    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/" || !location.hash) return;
    const id = decodeURIComponent(location.hash.slice(1));
    const frame = window.requestAnimationFrame(() => scrollToSection(id));
    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    setDrawerOpen(false);
    setPortalMenu(false);
    setFeaturesMenu(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!featuresMenu) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!featuresRef.current?.contains(event.target as Node)) setFeaturesMenu(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFeaturesMenu(false);
        featuresTriggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [featuresMenu]);

  useEffect(() => {
    if (!drawerOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
      if (event.key !== "Tab" || !drawerRef.current) return;
      const focusable = Array.from(drawerRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    drawerRef.current?.querySelector<HTMLElement>("button, a")?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      hamburgerRef.current?.focus();
    };
  }, [drawerOpen]);

  const goToSection = (id: string) => {
    setDrawerOpen(false);
    setPortalMenu(false);
    setFeaturesMenu(false);
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }
    window.history.pushState(null, "", `${location.pathname}${location.search}#${id}`);
    setActiveSection(id);
    scrollToSection(id);
  };

  const activePortal = location.pathname.startsWith("/register/company") || location.pathname.startsWith("/company/login")
    ? "Company"
    : location.pathname.startsWith("/student/assessment") || location.pathname.startsWith("/student/login")
      ? "Student"
      : location.pathname.startsWith("/admin/login") ? "Admin" : null;
  const featuresActive = featureIds.has(activeSection) || (compactDesktop && activeSection === "for-companies");
  const linkStyle = (active: boolean) => `relative whitespace-nowrap rounded-md px-2 py-2 text-sm transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-blue-600 after:transition-opacity ${active ? "text-blue-600 after:opacity-100" : "text-foreground after:opacity-0"}`;
  const menuItemStyle = (id: string) => `flex min-h-10 w-full items-center rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-muted hover:text-blue-600 ${activeSection === id ? "bg-muted font-medium text-blue-600" : "text-popover-foreground"}`;
  const openFeaturesFromKeyboard = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setFeaturesMenu(true);
      window.requestAnimationFrame(() => {
        const items = featuresMenuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]');
        (event.key === "ArrowUp" ? items?.[items.length - 1] : items?.[0])?.focus();
      });
    }
  };
  const moveFeatureFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('[role="menuitem"]'));
    const currentIndex = items.indexOf(document.activeElement as HTMLElement);
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const delta = event.key === "ArrowDown" ? 1 : -1;
      items[(currentIndex + delta + items.length) % items.length]?.focus();
    } else if (event.key === "Home") { event.preventDefault(); items[0]?.focus(); }
    else if (event.key === "End") { event.preventDefault(); items[items.length - 1]?.focus(); }
  };

  return (
    <>
      <nav className={`sticky top-0 z-50 h-16 border-b border-border bg-background/85 backdrop-blur-xl transition-shadow ${scrolled ? "shadow-md shadow-black/5" : ""}`} style={{ "--nav-h": "4rem" } as React.CSSProperties}>
        <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" aria-label="InternMatch AI home" className="flex shrink-0 items-center gap-2 rounded-md text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
            <BrainCircuit className="h-8 w-8 text-blue-600" />
            <span className="text-lg font-bold sm:text-xl">InternMatch AI</span>
          </Link>

          <div className="hidden min-w-0 items-center gap-0.5 lg:flex xl:gap-1">
            {primaryNavigation.map((item) => {
              const active = item.id === "for-companies" && compactDesktop ? false : activeSection === item.id;
              return <button key={item.id} type="button" onClick={() => goToSection(item.id)} aria-current={active ? "location" : undefined} className={`${linkStyle(active)}${item.id === "for-companies" ? " hidden xl:inline-flex" : ""}`}>{item.label}</button>;
            })}
            <div ref={featuresRef} className="relative">
              <button ref={featuresTriggerRef} type="button" aria-expanded={featuresMenu} aria-haspopup="menu" onKeyDown={openFeaturesFromKeyboard} onClick={() => { setFeaturesMenu((open) => !open); setPortalMenu(false); }} className={`inline-flex items-center gap-1 ${linkStyle(featuresActive)}`}>Features<ChevronDown className={`size-4 transition-transform ${featuresMenu ? "rotate-180" : ""}`} /></button>
              {featuresMenu && <div ref={featuresMenuRef} role="menu" aria-label="Features" onKeyDown={moveFeatureFocus} className="absolute left-0 top-full z-50 mt-2 w-64 rounded-xl border border-border bg-popover p-2 text-popover-foreground shadow-xl">
                {compactDesktop && <button type="button" role="menuitem" tabIndex={-1} onClick={() => goToSection("for-companies")} className={menuItemStyle("for-companies")}>For Companies</button>}
                {featureNavigation.map((item) => <button key={item.id} type="button" role="menuitem" tabIndex={-1} aria-current={activeSection === item.id ? "location" : undefined} onClick={() => goToSection(item.id)} className={menuItemStyle(item.id)}>{item.label}</button>)}
              </div>}
            </div>
          </div>

          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <button type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} className="rounded-lg p-2 text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <div className="relative">
              <button type="button" aria-expanded={portalMenu} onClick={() => { setPortalMenu(!portalMenu); setFeaturesMenu(false); }} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">Portals <ChevronDown className="h-4 w-4" /></button>
              {portalMenu && <div className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-border bg-popover p-2 text-popover-foreground shadow-xl">
                {portals.map(({ name, icon: Icon, items }) => <div key={name} className="p-2">
                  <div className={`mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide ${activePortal === name ? "text-blue-600" : "text-muted-foreground"}`}><Icon className="h-4 w-4" />{name}</div>
                  <div className="flex gap-2 pl-6">{items.map((item) => <Link key={`${name}-${item.label}`} to={item.to} onClick={() => setPortalMenu(false)} className="rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-muted hover:text-blue-600">{item.label}</Link>)}</div>
                </div>)}
              </div>}
            </div>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <button type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} className="rounded-lg p-2 text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">{theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}</button>
            <button ref={hamburgerRef} type="button" onClick={() => setDrawerOpen(true)} aria-expanded={drawerOpen} aria-controls="public-navigation-drawer" aria-label="Open navigation menu" className="rounded-lg p-2 text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"><Menu className="h-6 w-6" /></button>
          </div>
        </div>
      </nav>

      {drawerOpen && <div className="fixed inset-0 z-[60] lg:hidden" role="presentation">
        <button aria-label="Close navigation menu" className="absolute inset-0 h-full w-full bg-black/55 motion-safe:animate-[fade-in_200ms_ease-out]" onClick={() => setDrawerOpen(false)} />
        <aside ref={drawerRef} id="public-navigation-drawer" role="dialog" aria-modal="true" aria-label="Site navigation" className="absolute right-0 top-0 flex h-[100dvh] w-[85vw] max-w-[420px] flex-col border-l border-border bg-background shadow-2xl motion-safe:animate-[drawer-in_250ms_ease-out]">
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4">
            <Link to="/" onClick={() => setDrawerOpen(false)} className="flex items-center gap-2 text-foreground"><BrainCircuit className="h-7 w-7 text-blue-600" /><span className="font-bold">InternMatch AI</span></Link>
            <button type="button" onClick={() => setDrawerOpen(false)} aria-label="Close menu" className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"><X className="h-5 w-5" /></button>
          </div>
          <div role="tablist" aria-label="Menu sections" className="grid shrink-0 grid-cols-2 border-b border-border px-4">
            {(["navigation", "portals"] as const).map((tab) => <button key={tab} id={`drawer-tab-${tab}`} role="tab" aria-controls={`drawer-panel-${tab}`} aria-selected={drawerTab === tab} onClick={() => setDrawerTab(tab)} className={`border-b-2 px-2 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${drawerTab === tab ? "border-blue-600 text-foreground" : "border-transparent text-muted-foreground"}`}>{tab}</button>)}
          </div>
          <div id={`drawer-panel-${drawerTab}`} role="tabpanel" aria-labelledby={`drawer-tab-${drawerTab}`} className="flex-1 overflow-y-auto px-4 py-3">
            {drawerTab === "navigation" ? <div>{sectionNavigation.map((item) => <button key={item.id} type="button" aria-current={activeSection === item.id ? "location" : undefined} onClick={() => goToSection(item.id)} className={`flex min-h-12 w-full items-center border-b border-border py-4 text-left text-base font-medium transition-colors hover:text-blue-600 ${activeSection === item.id ? "text-blue-600" : "text-foreground"}`}>{item.label}</button>)}</div> : <div className="divide-y divide-border">
              {portals.map(({ name, icon: Icon, items }) => <div key={name}>
                <button type="button" aria-expanded={expandedPortal === name} onClick={() => setExpandedPortal(expandedPortal === name ? null : name)} className={`flex w-full items-center justify-between py-5 text-left font-semibold ${activePortal === name ? "text-blue-600" : "text-foreground"}`}><span className="flex items-center gap-3"><Icon className="h-5 w-5 text-blue-600" />{name}</span>{expandedPortal === name ? <span aria-hidden="true" className="text-xl">−</span> : <Plus className="h-5 w-5" />}</button>
                {expandedPortal === name && <div className="flex gap-3 pb-4 pl-8">{items.map((item) => <Link key={`${name}-${item.label}`} to={item.to} onClick={() => setDrawerOpen(false)} className="rounded-lg border border-border px-4 py-2 text-sm text-foreground hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10">{item.label}</Link>)}</div>}
              </div>)}
            </div>}
          </div>
          {openedFromAuth && <span className="sr-only">Portal navigation</span>}
        </aside>
      </div>}
    </>
  );
}
