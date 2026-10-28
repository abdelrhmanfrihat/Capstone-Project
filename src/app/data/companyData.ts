// Shared company profile data used across the Student Portal.
// The company portal (CompanyProfile.tsx) manages its own local editing state;
// this module provides read-only data that students see.
//
// Opportunities are owned by MOCK_OPPORTUNITIES in mockData.ts — this module
// imports from there so both the Student Directory and Opportunities page
// use a single source of truth with stable IDs.

import { MOCK_OPPORTUNITIES } from "./mockData";

export interface CompanyFullProfile {
  id: string;
  name: string;
  tagline: string;
  industry: string;
  city: string;
  country: string;
  size: string;
  yearFounded: string;
  workModel: string;
  description: string;
  website: string;
  linkedIn: string;
  logo: string;
  verified: boolean;
  specialties: string[];
  workEnvironment: string;
  studentLearning: string;
  openOpportunityCount: number;
}

// ── Student-to-company reviews ─────────────────────────────────────────────

export interface CompanyReview {
  id: string;
  companyId: string;
  studentName: string;
  opportunity: string;
  year: string;
  overallRating: number;
  writtenFeedback: string;
  skills: string[];
}

// ── Company-authored public feedback about students ────────────────────────
// Only records with isPublic === true may be shown to students.
// Private, pending, rejected, and moderation-only records must never be exposed.

export interface CompanyStudentFeedback {
  id: string;
  companyId: string;
  companyName: string;
  studentName: string; // first name + last initial (anonymized)
  studentId: string;
  opportunity: string;
  year: string;
  writtenFeedback: string;
  isPublic: boolean;   // must be true before displaying to students
}

// ── Company profiles ───────────────────────────────────────────────────────

export const COMPANY_PROFILES: CompanyFullProfile[] = [
  {
    id: "c1",
    name: "Stellar Cloud",
    tagline: "Empowering enterprises with intelligent cloud infrastructure.",
    industry: "Enterprise Software",
    city: "San Francisco",
    country: "United States",
    size: "51–200 employees",
    yearFounded: "2018",
    workModel: "Hybrid",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=128&h=128&q=80",
    verified: true,
    description:
      "Stellar Cloud builds enterprise-grade cloud infrastructure that powers some of the world's most demanding applications. We help organizations scale reliably, cut infrastructure costs, and move faster — without sacrificing security or compliance.\n\nOur platform combines a developer-first API with enterprise-grade observability tools, making it the go-to choice for engineering teams that care about both velocity and uptime.",
    website: "https://stellarcloud.example.com",
    linkedIn: "",
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
    openOpportunityCount: 3,
  },
  {
    id: "c2",
    name: "DataPulse",
    tagline: "Turn raw data into strategic advantage.",
    industry: "Analytics",
    city: "New York",
    country: "United States",
    size: "11–50 employees",
    yearFounded: "2020",
    workModel: "Hybrid",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=128&h=128&q=80",
    verified: true,
    description:
      "DataPulse helps mid-market companies unlock the value buried in their data. We build end-to-end analytics pipelines — from ingestion to insight — that slot into existing workflows without a six-month implementation project.\n\nOur team of data engineers and ML practitioners works closely with customers to define what 'useful insight' actually means for their business, then builds the tooling that delivers it reliably at scale.",
    website: "https://datapulse.example.com",
    linkedIn: "",
    specialties: [
      "Data Engineering",
      "Machine Learning",
      "Python",
      "SQL",
      "Tableau",
      "Cloud Analytics",
    ],
    workEnvironment:
      "DataPulse runs lean and moves fast. Every data engineer owns their pipeline end-to-end, from schema design to production monitoring. Weekly all-hands, monthly customer demos, and a culture of documenting decisions rather than holding long meetings.\n\nHybrid schedule — two days in Manhattan, rest remote. Flexible hours once you're ramped.",
    studentLearning:
      "Interns work directly with senior data engineers from week one. You'll own a data pipeline or ML feature, writing production Python and SQL that feeds dashboards used by real customers.\n\nExpect to learn modern data stack tooling: dbt, Airflow, Snowflake, and whatever cloud provider your team runs. You'll also present your work to customers at the end of the term — great for communication skills.",
    openOpportunityCount: 2,
  },
  {
    id: "c3",
    name: "TechNova",
    tagline: "Consumer apps that people actually love.",
    industry: "Consumer Tech",
    city: "Austin",
    country: "United States",
    size: "11–50 employees",
    yearFounded: "2021",
    workModel: "Remote",
    logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=128&h=128&q=80",
    verified: false,
    description:
      "TechNova builds mobile-first consumer apps for health, productivity, and social connection. We focus obsessively on craft and UX — our apps have been featured in both the App Store and Google Play's \"Editor's Choice\" sections.\n\nSmall team, big ambitions. We move quickly, cut scope ruthlessly, and ship things people talk about.",
    website: "https://technova.example.com",
    linkedIn: "",
    specialties: [
      "React Native",
      "iOS Development",
      "Android Development",
      "UX Research",
      "Growth Analytics",
      "Product Design",
    ],
    workEnvironment:
      "Fully remote, async-first culture with one optional weekly video sync. Everyone works flexible hours within a shared 10 am–3 pm overlap window (US time zones). We use Notion, Linear, and Figma as our main collaboration tools.\n\nInterns are treated as junior product engineers — not support staff. You'll have a dedicated mentor and a real project to ship.",
    studentLearning:
      "Interns ship features to tens of thousands of users within their first few weeks. Expect hands-on experience with React Native, platform-specific native modules, and A/B testing frameworks.\n\nYou'll also get exposure to product thinking: user research sessions, sprint planning, and post-launch analysis. By the end of the term you'll have contributed to a published app and learned what production mobile development actually looks like.",
    openOpportunityCount: 1,
  },
  {
    id: "c4",
    name: "BrightLabs",
    tagline: "Education technology that closes the gap.",
    industry: "EdTech",
    city: "Boston",
    country: "United States",
    size: "11–50 employees",
    yearFounded: "2019",
    workModel: "Hybrid",
    logo: "",
    verified: false,
    description:
      "BrightLabs builds adaptive learning tools used by K-12 schools and community colleges across the country. Our platform personalizes curriculum delivery based on each student's pace, gaps, and learning style — helping educators focus time where it matters most.\n\nWe're a mission-driven company: our team includes former teachers, curriculum designers, and engineers who believe technology should amplify great instruction, not replace it.",
    website: "https://brightlabs.example.com",
    linkedIn: "",
    specialties: [
      "Learning Management Systems",
      "React",
      "Python",
      "Curriculum Design",
      "Accessibility (WCAG 2.1)",
      "Data Visualization",
    ],
    workEnvironment:
      "Small, cross-functional teams where engineers work alongside educators and designers. Two days in our Boston office, rest remote. Quarterly product demos open to the whole company — everyone sees how their work affects real classrooms.\n\nWe take accessibility seriously: every feature goes through a screen-reader review before it ships.",
    studentLearning:
      "BrightLabs interns work on features used by students in real classrooms. You'll build accessible React components, write Python data pipelines, and collaborate with curriculum designers on product decisions.\n\nBy the end of your term you'll have a strong understanding of accessibility-first front-end development and the unique constraints of building for K-12 environments. Many interns go on to full-time roles.",
    openOpportunityCount: 2,
  },
];

// ── Student-to-company reviews (public) ───────────────────────────────────

export const COMPANY_REVIEWS: CompanyReview[] = [
  {
    id: "rev-c1-1",
    companyId: "c1",
    studentName: "Alex T.",
    opportunity: "Frontend Engineering Intern",
    year: "2025",
    overallRating: 5,
    writtenFeedback:
      "Stellar Cloud gave me the most meaningful internship experience I could have asked for. From week one I was in production sprints, attending design reviews, and building features that real customers use. My mentor was generous with feedback and never made me feel like a burden for asking questions. I left with a portfolio piece I'm genuinely proud of.",
    skills: ["React", "TypeScript", "Code Review", "System Design"],
  },
  {
    id: "rev-c1-2",
    companyId: "c1",
    studentName: "Jamie L.",
    opportunity: "DevOps Intern",
    year: "2025",
    overallRating: 5,
    writtenFeedback:
      "The work culture is exactly what they advertise — autonomous, async-friendly, and trusting. I owned a Kubernetes migration task that initially felt way above my level, but with the right support I shipped it cleanly. The team genuinely wanted me to succeed, not just look busy. Would intern here again without a second thought.",
    skills: ["Kubernetes", "CI/CD", "Docker", "Observability"],
  },
  {
    id: "rev-c1-3",
    companyId: "c1",
    studentName: "Sam K.",
    opportunity: "Backend Systems Intern",
    year: "2024",
    overallRating: 4,
    writtenFeedback:
      "Great company overall — strong engineers, good tooling, and a respectful culture. The project I was assigned was a bit under-scoped at the start so I spent the first two weeks figuring out what I was actually building. Once that was sorted, the work was excellent and I learned a ton about Node.js microservices and distributed systems.",
    skills: ["Node.js", "PostgreSQL", "REST APIs", "Testing"],
  },
  {
    id: "rev-c2-1",
    companyId: "c2",
    studentName: "Priya M.",
    opportunity: "Data Science Intern",
    year: "2025",
    overallRating: 5,
    writtenFeedback:
      "DataPulse is the real deal for data engineering experience. I built and shipped a production Airflow DAG in my third week, and by the end of the term I had contributed to three live customer dashboards. The team is small enough that you actually matter — your work ships and customers notice it. Strong recommend for anyone serious about data.",
    skills: ["Python", "Airflow", "dbt", "Snowflake"],
  },
  {
    id: "rev-c2-2",
    companyId: "c2",
    studentName: "Chris W.",
    opportunity: "Analytics Engineer Intern",
    year: "2025",
    overallRating: 4,
    writtenFeedback:
      "Solid internship with great technical depth. The SQL-heavy work was exactly what I wanted, and I came out of it much more confident in data modeling and pipeline design. The hybrid schedule worked well and the team was welcoming. My one note: onboarding documentation could be clearer — took a while to understand all the internal tooling.",
    skills: ["SQL", "Tableau", "Data Modeling", "dbt"],
  },
];

// ── Company-authored public feedback about students ────────────────────────
// isPublic: false records exist in a real system but must never reach the UI.
// Only filter(f => f.isPublic) entries are displayed to students.

export const COMPANY_STUDENT_FEEDBACK: CompanyStudentFeedback[] = [
  {
    id: "csf-c1-1",
    companyId: "c1",
    companyName: "Stellar Cloud",
    studentName: "Jordan M.",
    studentId: "ext-1",
    opportunity: "Frontend Engineering Intern",
    year: "2025",
    writtenFeedback:
      "Jordan joined us as a frontend intern and made an immediate impact. They took full ownership of our onboarding redesign, completed it on schedule, and wrote clean, well-reviewed TypeScript throughout. A reliable, collaborative contributor — we would welcome Jordan back in any capacity.",
    isPublic: true,
  },
  {
    id: "csf-c1-2",
    companyId: "c1",
    companyName: "Stellar Cloud",
    studentName: "Riley T.",
    studentId: "ext-2",
    opportunity: "DevOps Intern",
    year: "2025",
    writtenFeedback:
      "Riley ramped quickly on Kubernetes and took on a production infrastructure task in their third week. The work was completed on time with strong documentation. Would confidently recommend Riley for infrastructure or platform engineering roles.",
    isPublic: true,
  },
  {
    id: "csf-c1-3",
    companyId: "c1",
    companyName: "Stellar Cloud",
    studentName: "Morgan P.",
    studentId: "ext-3",
    opportunity: "Backend Systems Intern",
    year: "2024",
    writtenFeedback:
      "Morgan was proactive, communicated blockers early, and delivered a clean Node.js service by the end of the placement. Strong technical instincts with room to grow on production-readiness practices.",
    isPublic: true,
  },
  {
    id: "csf-c2-1",
    companyId: "c2",
    companyName: "DataPulse",
    studentName: "Taylor K.",
    studentId: "ext-4",
    opportunity: "Data Science Intern",
    year: "2025",
    writtenFeedback:
      "Taylor delivered a production Airflow DAG that is still running in our pipeline today. Their SQL work was accurate and well-documented. Communication was proactive throughout the placement. A strong data engineering candidate.",
    isPublic: true,
  },
  {
    id: "csf-c2-2",
    companyId: "c2",
    companyName: "DataPulse",
    studentName: "Casey R.",
    studentId: "ext-5",
    opportunity: "Analytics Engineer Intern",
    year: "2025",
    writtenFeedback:
      "Casey brought a strong analytical mindset and asked great clarifying questions before diving into work. The data models they built are clean and well-documented. Recommend for any data-heavy role.",
    isPublic: true,
  },
];

// ── Lookup helpers ─────────────────────────────────────────────────────────

export function getCompanyById(id: string): CompanyFullProfile | undefined {
  return COMPANY_PROFILES.find((c) => c.id === id);
}

/** Returns Published opportunities for a company from the shared MOCK_OPPORTUNITIES store. */
export function getOpportunitiesForCompany(companyId: string) {
  return MOCK_OPPORTUNITIES.filter(
    (o) => o.companyId === companyId && o.status === "Published"
  );
}

export function getReviewsForCompany(companyId: string): CompanyReview[] {
  return COMPANY_REVIEWS.filter((r) => r.companyId === companyId);
}

/** Returns only public company-to-student feedback. Private records are excluded. */
export function getPublicStudentFeedbackByCompany(companyId: string): CompanyStudentFeedback[] {
  return COMPANY_STUDENT_FEEDBACK.filter(
    (f) => f.companyId === companyId && f.isPublic
  );
}

export function getAverageRating(companyId: string): number {
  const reviews = getReviewsForCompany(companyId);
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, r) => sum + r.overallRating, 0) / reviews.length;
}
