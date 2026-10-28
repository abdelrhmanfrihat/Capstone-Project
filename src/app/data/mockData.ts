export const MOCK_STUDENTS = [
  {
    id: "s1",
    name: "Alex Chen",
    email: "alex.c@stanford.edu",
    university: "Stanford University",
    major: "Computer Science",
    graduationYear: 2026,
    status: "Active",
    profileStrength: 92,
    skills: {
      technical: [
        { name: "React", level: 5 },
        { name: "TypeScript", level: 4 },
        { name: "Node.js", level: 3 },
      ],
      soft: [
        { name: "Communication", level: 4 },
        { name: "Teamwork", level: 5 },
      ],
    },
    interests: ["Frontend Development", "UI/UX", "Web3"],
    availability: "Available Now"
  },
  {
    id: "s2",
    name: "Elena Rodriguez",
    email: "elena.r@mit.edu",
    university: "MIT",
    major: "Data Science",
    graduationYear: 2025,
    status: "In Training",
    profileStrength: 88,
    skills: {
      technical: [
        { name: "Python", level: 5 },
        { name: "SQL", level: 4 },
        { name: "Machine Learning", level: 3 },
      ],
      soft: [
        { name: "Problem Solving", level: 5 },
        { name: "Adaptability", level: 4 },
      ],
    },
    interests: ["Data Engineering", "AI Research"],
    availability: "Unavailable"
  }
];

export const MOCK_COMPANIES = [
  {
    id: "c1",
    name: "Stellar Cloud",
    verified: true,
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=64&h=64&q=80",
    industry: "Enterprise Software"
  },
  {
    id: "c2",
    name: "DataPulse",
    verified: true,
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=64&h=64&q=80",
    industry: "Analytics"
  },
  {
    id: "c3",
    name: "TechNova",
    verified: false,
    logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=64&h=64&q=80",
    industry: "Consumer Tech"
  }
];

export const MOCK_OPPORTUNITIES = [
  {
    id: "o1",
    companyId: "c1",
    companyName: "Stellar Cloud",
    title: "Frontend Engineering Intern",
    type: "Internship",
    location: "Remote",
    matchScore: 94,
    matchDetails: {
      strong: ["React", "TypeScript", "Teamwork"],
      missing: ["SQL"],
      explanation: "Your deep React experience perfectly aligns with Stellar Cloud's stack. Adding basic SQL knowledge would make this a 99% match."
    },
    status: "Published",
    applicantsCount: 42,
    postedAt: "2026-05-10"
  },
  {
    id: "o2",
    companyId: "c2",
    companyName: "DataPulse",
    title: "Data Science Intern",
    type: "Internship",
    location: "Hybrid (New York)",
    matchScore: 65,
    matchDetails: {
      strong: ["Problem Solving"],
      missing: ["Python", "Machine Learning"],
      explanation: "While your soft skills match the team culture, this role heavily requires Python data pipelines which are currently missing from your profile."
    },
    status: "Published",
    applicantsCount: 18,
    postedAt: "2026-05-12"
  },
  {
    id: "o3",
    companyId: "c1",
    companyName: "Stellar Cloud",
    title: "Backend Systems Intern",
    type: "Internship",
    location: "Hybrid",
    matchScore: 72,
    matchDetails: {
      strong: ["Node.js", "TypeScript", "Teamwork"],
      missing: ["Kubernetes", "PostgreSQL"],
      explanation: "Your Node.js and TypeScript skills are a solid foundation for our platform team. Adding distributed-systems and database experience would push you to a 90%+ match."
    },
    status: "Published",
    applicantsCount: 28,
    postedAt: "2026-05-11",
  },
  {
    id: "o4",
    companyId: "c1",
    companyName: "Stellar Cloud",
    title: "Product Design Training",
    type: "Training",
    location: "On-site",
    matchScore: 68,
    matchDetails: {
      strong: ["Communication", "Teamwork"],
      missing: ["Figma", "User Research"],
      explanation: "Your communication skills and UI/UX interest are great foundations. This eight-week training program is designed to build your design toolkit from scratch."
    },
    status: "Published",
    applicantsCount: 15,
    postedAt: "2026-05-08",
  },
  {
    id: "o5",
    companyId: "c2",
    companyName: "DataPulse",
    title: "Analytics Engineer Intern",
    type: "Internship",
    location: "Remote",
    matchScore: 45,
    matchDetails: {
      strong: ["Problem Solving"],
      missing: ["SQL", "dbt", "Snowflake"],
      explanation: "This role requires strong SQL and data-modeling skills that are currently missing from your profile. Building those would significantly improve your match."
    },
    status: "Published",
    applicantsCount: 22,
    postedAt: "2026-05-13",
  },
  {
    id: "o6",
    companyId: "c3",
    companyName: "TechNova",
    title: "Mobile Development Intern",
    type: "Internship",
    location: "Remote",
    matchScore: 71,
    matchDetails: {
      strong: ["React", "TypeScript", "Teamwork"],
      missing: ["React Native", "iOS/Android"],
      explanation: "Your React and TypeScript experience transfers well to mobile development. You would need to pick up React Native patterns — easily achievable given your existing frontend skills."
    },
    status: "Published",
    applicantsCount: 31,
    postedAt: "2026-05-14",
  },
  {
    id: "o7",
    companyId: "c4",
    companyName: "BrightLabs",
    title: "EdTech Product Intern",
    type: "Internship",
    location: "Hybrid (Boston)",
    matchScore: 78,
    matchDetails: {
      strong: ["React", "TypeScript", "Communication", "Teamwork"],
      missing: ["Accessibility (WCAG)", "Python"],
      explanation: "Your React and TypeScript skills are a strong match for our frontend needs. Learning WCAG accessibility standards would make this a near-perfect fit for your profile."
    },
    status: "Published",
    applicantsCount: 19,
    postedAt: "2026-05-12",
  },
  {
    id: "o8",
    companyId: "c4",
    companyName: "BrightLabs",
    title: "Curriculum Data Analyst",
    type: "Part-time",
    location: "Remote",
    matchScore: 38,
    matchDetails: {
      strong: ["Communication"],
      missing: ["Python", "SQL", "Data Analysis"],
      explanation: "This part-time analyst role requires data skills your profile does not currently show. Strong communication is a plus, but the core technical requirements are not yet present."
    },
    status: "Published",
    applicantsCount: 12,
    postedAt: "2026-05-15",
  },
];

export type MockOpportunity = (typeof MOCK_OPPORTUNITIES)[number];

export const MOCK_APPLICATIONS = [
  {
    id: "a1",
    studentId: "s1",
    opportunityId: "o1",
    status: "Interview",
    appliedAt: "2026-05-14",
    lastUpdated: "2026-05-16",
    matchScore: 94,
  },
  {
    id: "a2",
    studentId: "s1",
    opportunityId: "o2",
    status: "Completed",
    appliedAt: "2026-03-01",
    lastUpdated: "2026-05-10",
    matchScore: 65,
  }
];
