import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  BrainCircuit,
  Building2,
  Clock,
  FileText,
  HelpCircle,
  History,
  MessageSquare,
  Search,
  Send,
  ShieldCheck,
  Star,
  Target,
  TrendingUp,
  Unlock,
  Users,
  type LucideIcon,
} from "lucide-react";

type NodeId = string;

export type AuthNetworkRole = "student" | "company" | "admin";
type AuthDiagramNode = { id: string; label: string; caption: string; icon: LucideIcon; point: string; positionClass: string };
export type AuthNetworkConfig = { role: AuthNetworkRole; roleLabel: string; accent: string; centerAccent: string; headline: string; description: string; benefit: string; nodes: AuthDiagramNode[]; journey: string[] };

const rolePositions = ["network-node-students", "network-node-profile", "network-node-matches", "network-node-pipeline", "network-node-feedback", "network-node-companies"];
const studentNodes: AuthDiagramNode[] = [
  { id: "assessment", label: "Assessment", caption: "Answer structured questions about skills, interests, behavior and goals.", icon: FileText, point: "50 12", positionClass: rolePositions[0] },
  { id: "skill-profile", label: "Skill Profile", caption: "A deep AI profile is built from your answers, not a CV.", icon: BrainCircuit, point: "86 31", positionClass: rolePositions[1] },
  { id: "ai-matches", label: "AI Matches", caption: "See match scores with an explanation and the skills you're missing.", icon: Target, point: "86 69", positionClass: rolePositions[2] },
  { id: "apply", label: "Apply", caption: "Apply to opportunities and track Applied, Shortlisted, Interview, Matched and In Training.", icon: Send, point: "50 88", positionClass: rolePositions[3] },
  { id: "interviews", label: "Interviews", caption: "Receive invitations and attend interviews.", icon: Clock, point: "14 69", positionClass: rolePositions[4] },
  { id: "feedback", label: "Feedback", caption: "Use company feedback to improve your profile and future matches.", icon: MessageSquare, point: "14 31", positionClass: rolePositions[5] },
];
const companyNodes: AuthDiagramNode[] = [
  { id: "post-opportunity", label: "Post Opportunity", caption: "Create internships and training posts with detailed requirements.", icon: FileText, point: "50 12", positionClass: rolePositions[0] },
  { id: "ranked-candidates", label: "Ranked Candidates", caption: "Get AI-assisted ranked lists of students for each opportunity.", icon: Star, point: "86 31", positionClass: rolePositions[1] },
  { id: "discovery", label: "Discovery", caption: "Search and filter by skills, interests, availability, and match score.", icon: Search, point: "86 69", positionClass: rolePositions[2] },
  { id: "pipeline", label: "Pipeline", caption: "Manage candidates per opportunity with unique pipelines.", icon: TrendingUp, point: "50 88", positionClass: rolePositions[3] },
  { id: "interviews", label: "Interviews", caption: "Invite students, schedule interviews, and track responses.", icon: Clock, point: "14 69", positionClass: rolePositions[4] },
  { id: "feedback", label: "Feedback", caption: "Provide private or public feedback to support student growth.", icon: MessageSquare, point: "14 31", positionClass: rolePositions[5] },
];
const adminNodes: AuthDiagramNode[] = [
  { id: "verification", label: "Verification", caption: "Every company is verified before posting opportunities.", icon: ShieldCheck, point: "50 12", positionClass: rolePositions[0] },
  { id: "users", label: "Users", caption: "Admins oversee users and platform activity.", icon: Users, point: "86 31", positionClass: rolePositions[1] },
  { id: "questions-skills", label: "Questions & Skills", caption: "Assessment questions are curated and updated regularly.", icon: HelpCircle, point: "86 69", positionClass: rolePositions[2] },
  { id: "status-override", label: "Status Override", caption: "Admins can release students from incorrect training locks.", icon: Unlock, point: "50 88", positionClass: rolePositions[3] },
  { id: "moderation", label: "Moderation", caption: "All public feedback is reviewed for quality and fairness.", icon: MessageSquare, point: "14 69", positionClass: rolePositions[4] },
  { id: "audit-logs", label: "Audit Logs", caption: "Complete transparency with detailed activity logging.", icon: History, point: "14 31", positionClass: rolePositions[5] },
];

export const authNetworkConfigs: Record<AuthNetworkRole, AuthNetworkConfig> = {
  student: { role: "student", roleLabel: "Student", accent: "#2563eb", centerAccent: "#2563eb", headline: "Your potential, matched.", description: "No CV needed. Build a profile from your skills, interests and goals.", benefit: "Skills-first student matching", nodes: studentNodes, journey: studentNodes.map(({ id }) => id) },
  company: { role: "company", roleLabel: "Company", accent: "#9333ea", centerAccent: "#9333ea", headline: "Find students who fit, not just keywords.", description: "Post opportunities and get ranked, explainable candidate matches.", benefit: "Explainable candidate matching", nodes: companyNodes, journey: companyNodes.map(({ id }) => id) },
  admin: { role: "admin", roleLabel: "Admin", accent: "#ea580c", centerAccent: "#c2410c", headline: "Platform control.", description: "Restricted area. Every action is logged.", benefit: "Verified, moderated and audited", nodes: adminNodes, journey: adminNodes.map(({ id }) => id) },
};

type ModuleNode = {
  id: NodeId;
  label: string;
  caption: string;
  icon: LucideIcon;
  positionClass: string;
  tileClass: string;
  iconClass: string;
  lineClass: string;
  accent: string;
  point: string;
};

const defaultNodes: ModuleNode[] = [
  {
    id: "students",
    label: "Students",
    caption: "Students answer a smart assessment about skills, interests, behavior and goals.",
    icon: Users,
    positionClass: "network-node-students",
    tileClass: "bg-blue-100 dark:bg-blue-900/30",
    iconClass: "text-blue-600",
    lineClass: "network-line-blue",
    accent: "#3b82f6",
    point: "50 12",
  },
  {
    id: "profile",
    label: "Skill Profile",
    caption: "A deep AI profile is built from skills, interests, soft skills and behavior, not just a CV.",
    icon: BrainCircuit,
    positionClass: "network-node-profile",
    tileClass: "bg-blue-100 dark:bg-blue-900/30",
    iconClass: "text-blue-600",
    lineClass: "network-line-blue",
    accent: "#3b82f6",
    point: "86 31",
  },
  {
    id: "matches",
    label: "Match Score",
    caption: "Each opportunity gets a match score with an explanation and the skills that are missing.",
    icon: Target,
    positionClass: "network-node-matches",
    tileClass: "bg-green-100 dark:bg-green-900/30",
    iconClass: "text-green-600",
    lineClass: "network-line-green",
    accent: "#22c55e",
    point: "86 69",
  },
  {
    id: "pipeline",
    label: "Pipeline",
    caption: "Applications move from Applied to Shortlisted, Interview, Matched and In Training.",
    icon: TrendingUp,
    positionClass: "network-node-pipeline",
    tileClass: "bg-orange-100 dark:bg-orange-900/30",
    iconClass: "text-orange-600",
    lineClass: "network-line-orange",
    accent: "#f97316",
    point: "50 88",
  },
  {
    id: "feedback",
    label: "Feedback",
    caption: "Companies share feedback that turns into growth insights for the student.",
    icon: MessageSquare,
    positionClass: "network-node-feedback",
    tileClass: "bg-green-100 dark:bg-green-900/30",
    iconClass: "text-green-600",
    lineClass: "network-line-green",
    accent: "#22c55e",
    point: "14 69",
  },
  {
    id: "companies",
    label: "Companies",
    caption: "Companies post opportunities with required skills, soft skills and ideal candidate traits.",
    icon: Building2,
    positionClass: "network-node-companies",
    tileClass: "bg-purple-100 dark:bg-purple-900/30",
    iconClass: "text-purple-600",
    lineClass: "network-line-purple",
    accent: "#a855f7",
    point: "14 31",
  },
];

type Hop = {
  caption: string;
  path: string;
  nodes: NodeId[];
};

const defaultHops: Hop[] = [
  { caption: "Students → InternMatch AI: assessment answers", path: "M50 12 L50 50", nodes: ["students"] },
  { caption: "InternMatch AI → Skill Profile: profile built", path: "M50 50 L86 31", nodes: ["profile"] },
  { caption: "Companies → InternMatch AI: opportunity requirements", path: "M14 31 L50 50", nodes: ["companies"] },
  { caption: "InternMatch AI → Match Score: scores and explanations", path: "M50 50 L86 69", nodes: ["matches"] },
  { caption: "Match Score → InternMatch AI → Pipeline: student applies", path: "M86 69 L50 50 L50 88", nodes: ["matches", "pipeline"] },
  { caption: "Pipeline → InternMatch AI → Feedback: interview outcome", path: "M50 88 L50 50 L14 69", nodes: ["pipeline", "feedback"] },
  { caption: "Feedback → InternMatch AI → Skill Profile: growth insights", path: "M14 69 L50 50 L86 31", nodes: ["feedback", "profile"] },
];

export function NetworkDiagram({ config }: { config?: AuthNetworkConfig } = {}) {
  const roleColors = config?.role === "student"
    ? { tile: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400", line: "network-line-blue" }
    : config?.role === "company"
      ? { tile: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-600 dark:text-purple-400", line: "network-line-purple" }
      : { tile: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-600 dark:text-orange-400", line: "network-line-orange" };
  const nodes: ModuleNode[] = config
    ? config.nodes.map((node) => ({ ...node, tileClass: roleColors.tile, iconClass: roleColors.text, lineClass: roleColors.line, accent: config.accent }))
    : defaultNodes;
  const hops: Hop[] = config
    ? config.journey.map((id) => {
        const node = config.nodes.find((item) => item.id === id)!;
        return { caption: `${node.label}: ${node.caption}`, path: `M50 50 L${node.point}`, nodes: [node.id] };
      })
    : defaultHops;
  const nodeById = (id: NodeId) => nodes.find((node) => node.id === id)!;
  const [activeHop, setActiveHop] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<NodeId | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const resumeRef = useRef<number | null>(null);
  const inViewRef = useRef(true);
  const hiddenRef = useRef(false);
  const reducedMotionRef = useRef(typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const hoveredRef = useRef<NodeId | null>(null);
  const pinnedRef = useRef(false);
  const compactRef = useRef(true);
  const measuredLayoutRef = useRef(false);
  const scheduleRef = useRef<() => void>(() => undefined);

  hoveredRef.current = hoveredNode;

  const clearTimers = useCallback(() => {
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    if (resumeRef.current !== null) window.clearTimeout(resumeRef.current);
    timeoutRef.current = null;
    resumeRef.current = null;
  }, []);

  const scheduleNext = useCallback(() => {
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    if (hoveredRef.current || hiddenRef.current || !inViewRef.current || reducedMotionRef.current || compactRef.current) return;
    timeoutRef.current = window.setTimeout(() => {
      setActiveHop((current) => (current + 1) % hops.length);
    }, 1700);
  }, []);

  scheduleRef.current = scheduleNext;

  const pauseSvg = useCallback((pause: boolean) => {
    rootRef.current?.classList.toggle("network-paused", pause);
    const svg = svgRef.current;
    if (!svg) return;
    if (pause) svg.pauseAnimations();
    else svg.unpauseAnimations();
  }, []);

  const pauseForInteraction = (id: NodeId) => {
    clearTimers();
    pinnedRef.current = false;
    setHoveredNode(id);
  };

  const resumeAfterDelay = () => {
    if (pinnedRef.current) return;
    if (rootRef.current?.contains(document.activeElement) && document.activeElement !== document.body) return;
    if (resumeRef.current !== null) window.clearTimeout(resumeRef.current);
    resumeRef.current = window.setTimeout(() => {
      if (pinnedRef.current) return;
      hoveredRef.current = null;
      setHoveredNode(null);
      scheduleRef.current();
    }, 600);
  };

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      const changed = reducedMotionRef.current !== motionQuery.matches;
      reducedMotionRef.current = motionQuery.matches;
      if (changed) setActiveHop((current) => (current + 1) % hops.length);
      if (motionQuery.matches) {
        clearTimers();
        pauseSvg(true);
      } else if (!hiddenRef.current && inViewRef.current && !hoveredRef.current) {
        pauseSvg(false);
        scheduleRef.current();
      }
    };
    const updateVisibility = () => {
      hiddenRef.current = document.visibilityState === "hidden";
      pauseSvg(hiddenRef.current || !inViewRef.current || reducedMotionRef.current);
      if (hiddenRef.current) clearTimers();
      else scheduleRef.current();
    };
    const clearPinnedNodeOutside = (event: PointerEvent) => {
      if (!pinnedRef.current || rootRef.current?.contains(event.target as Node)) return;
      pinnedRef.current = false;
      hoveredRef.current = null;
      setHoveredNode(null);
      scheduleRef.current();
    };
    const updateLayoutMode = () => {
      const hex = rootRef.current?.querySelector<HTMLElement>(".network-diagram");
      const compact = !hex || window.getComputedStyle(hex).display === "none";
      if (!measuredLayoutRef.current) {
        measuredLayoutRef.current = true;
        compactRef.current = compact;
        return;
      }
      if (compactRef.current === compact) return;
      compactRef.current = compact;
      clearTimers();
      setActiveHop((current) => (current + 1) % hops.length);
      if (!compact) scheduleRef.current();
    };

    updateMotionPreference();
    motionQuery.addEventListener("change", updateMotionPreference);
    document.addEventListener("visibilitychange", updateVisibility);
    document.addEventListener("pointerdown", clearPinnedNodeOutside);
    window.addEventListener("resize", updateLayoutMode);
    const resizeObserver = new ResizeObserver(updateLayoutMode);
    if (rootRef.current) resizeObserver.observe(rootRef.current);
    updateLayoutMode();

    const observer = new IntersectionObserver(([entry]) => {
      inViewRef.current = entry.isIntersecting;
      pauseSvg(!entry.isIntersecting || hiddenRef.current || reducedMotionRef.current);
      if (entry.isIntersecting) scheduleRef.current();
      else clearTimers();
    }, { threshold: 0.1 });
    if (rootRef.current) observer.observe(rootRef.current);

    return () => {
      clearTimers();
      observer.disconnect();
      resizeObserver.disconnect();
      motionQuery.removeEventListener("change", updateMotionPreference);
      document.removeEventListener("visibilitychange", updateVisibility);
      document.removeEventListener("pointerdown", clearPinnedNodeOutside);
      window.removeEventListener("resize", updateLayoutMode);
    };
  }, [clearTimers, pauseSvg]);

  useEffect(() => {
    clearTimers();
    if (hiddenRef.current || !inViewRef.current || reducedMotionRef.current) {
      pauseSvg(true);
      return;
    }
    pauseSvg(false);
    if (!hoveredNode) scheduleRef.current();
    return clearTimers;
  }, [activeHop, hoveredNode, clearTimers, pauseSvg]);

  const currentHop = hops[activeHop];
  const activeNodeIds = hoveredNode ? [hoveredNode] : currentHop.nodes;
  const caption = hoveredNode
    ? nodeById(hoveredNode).caption
    : config
      ? currentHop.caption
      : reducedMotionRef.current
      ? "Hover a module to see how it connects."
      : compactRef.current
        ? "Hover a module to see how it connects."
        : currentHop.caption;

  const onRootPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!(event.target as HTMLElement).closest("[data-network-node]")) {
      pinnedRef.current = false;
      clearTimers();
      hoveredRef.current = null;
      setHoveredNode(null);
      scheduleRef.current();
    }
  };

  const onRootKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Tab") pinnedRef.current = false;
    if (event.key === "Escape") {
      pinnedRef.current = false;
      clearTimers();
      hoveredRef.current = null;
      setHoveredNode(null);
      (document.activeElement as HTMLElement | null)?.blur?.();
      scheduleRef.current();
    }
  };

  const onTouchNode = (event: React.PointerEvent<HTMLButtonElement>, id: NodeId) => {
    if (event.pointerType !== "touch") return;
    event.preventDefault();
    clearTimers();
    if (hoveredRef.current === id && pinnedRef.current) {
      pinnedRef.current = false;
      hoveredRef.current = null;
      setHoveredNode(null);
      scheduleRef.current();
    } else {
      pinnedRef.current = true;
      hoveredRef.current = id;
      setHoveredNode(id);
    }
  };

  return (
    <div
      ref={rootRef}
      className={`network-diagram-host relative mx-auto w-full min-w-0${config ? " auth-network-container" : ""}`}
      data-auth-network={config ? config.role : undefined}
      onPointerDownCapture={onRootPointerDown}
      onKeyDown={onRootKeyDown}
    >
      <div className="network-diagram mx-auto" aria-label="InternMatch AI module connections">
        <div className="network-glow" aria-hidden="true" />
        <div className="network-orbit" aria-hidden="true" />
        <svg ref={svgRef} className="network-lines" viewBox="0 0 100 100" role="presentation" aria-hidden="true">
          {nodes.map((node) => {
            const isActive = activeNodeIds.includes(node.id);
            return (
              <path
                key={node.id}
                d={`M50 50 L${node.point}`}
                className={`network-spoke ${node.lineClass}${isActive ? " is-active" : ""}`}
              />
            );
          })}
          {!reducedMotionRef.current && (
            <g className="network-traveler" style={{ "--network-accent": config ? config.centerAccent : hoveredNode ? nodeById(hoveredNode).accent : nodeById(currentHop.nodes[0]).accent } as React.CSSProperties}>
              <circle className="network-traveler-halo" r="1.25" />
              <circle className="network-traveler-dot" r="0.6">
              <animateMotion
                key={`${activeHop}-${hoveredNode ?? "auto"}`}
                path={hoveredNode
                  ? `M50 50 L${nodeById(hoveredNode).point} L50 50`
                  : currentHop.path}
                dur={hoveredNode ? "1.8s" : "1.4s"}
                repeatCount={hoveredNode ? "indefinite" : "1"}
                fill="freeze"
              />
              </circle>
            </g>
          )}
        </svg>
        <div className={`network-center${config ? " auth-network-center" : ""}`} aria-label="InternMatch AI">
          <span className="network-center-ring" aria-hidden="true" />
          <BrainCircuit className="network-center-icon" aria-hidden="true" />
          <span>InternMatch AI</span>
          {config && <small>{config.roleLabel}</small>}
        </div>
        {nodes.map(({ icon: Icon, ...node }) => (
          <button
            key={node.id}
            type="button"
            data-network-node
            aria-label={`${node.label}. ${node.caption}`}
            className={`network-node ${node.positionClass}${activeNodeIds.includes(node.id) ? " is-active" : ""}`}
            style={{ "--network-accent": node.accent } as React.CSSProperties}
            onPointerEnter={(event) => { if (event.pointerType === "mouse") pauseForInteraction(node.id); }}
            onPointerLeave={(event) => { if (event.pointerType === "mouse") resumeAfterDelay(); }}
            onPointerDown={(event) => onTouchNode(event, node.id)}
            onFocus={() => { if (!pinnedRef.current) pauseForInteraction(node.id); }}
            onBlur={(event) => {
              if (!event.currentTarget.parentElement?.contains(event.relatedTarget as Node | null)) resumeAfterDelay();
            }}
            onClick={(event) => { if (event.detail === 0) pauseForInteraction(node.id); }}
          >
            <span className={`network-node-icon ${node.tileClass}`}><Icon className={`network-node-glyph ${node.iconClass}`} aria-hidden="true" /></span>
            <span className="network-node-label">{node.label}</span>
          </button>
        ))}
      </div>

      <div className="network-compact">
        <div className="network-compact-layout">
          <div className="network-compact-source">
            <div className="network-center network-center-compact">
              <span className="network-center-ring" aria-hidden="true" />
              <BrainCircuit className="network-center-icon" aria-hidden="true" />
              <span>InternMatch AI</span>
            </div>
            <div className="network-compact-link" aria-hidden="true"><span /></div>
          </div>
          <div className="network-compact-grid">
            {nodes.map(({ icon: Icon, ...node }) => (
              <button
                key={node.id}
                type="button"
                data-network-node
                aria-label={`${node.label}. ${node.caption}`}
                className={`network-compact-node border border-border bg-card text-card-foreground shadow-sm${hoveredNode === node.id ? " is-active" : ""}`}
                style={{ "--network-accent": node.accent } as React.CSSProperties}
                onPointerDown={(event) => onTouchNode(event, node.id)}
                onFocus={() => { if (!pinnedRef.current) pauseForInteraction(node.id); }}
                onBlur={resumeAfterDelay}
                onPointerEnter={(event) => { if (event.pointerType === "mouse") pauseForInteraction(node.id); }}
                onPointerLeave={(event) => { if (event.pointerType === "mouse") resumeAfterDelay(); }}
                onClick={(event) => { if (event.detail === 0) pauseForInteraction(node.id); }}
              >
                <span className={`network-compact-icon ${node.tileClass}`}><Icon className={`size-4 ${node.iconClass}`} aria-hidden="true" /></span>
                <span>{node.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="network-caption rounded-xl border border-border bg-card px-4 py-3 text-center text-sm text-muted-foreground shadow-sm" aria-live="polite">
        {caption}
      </p>
    </div>
  );
}

