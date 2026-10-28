Update the Company Portal → Candidate Discovery page.

When the company clicks “View Profile” on any student card, open a complete Student Profile page or right-side profile drawer.

This profile must show all relevant student information that helps the company decide whether to shortlist, invite, or contact the student.

Important requirement:
The company must be able to view public feedback about students.

Keep the current InternMatch AI dark blue SaaS style:
- Dark navy background
- Blue primary actions
- Same sidebar and top navigation
- Same candidate cards style
- Professional SaaS recruiter UI
- Clean sections, cards, badges, tabs, and charts

--------------------------------------------------
STUDENT PROFILE PAGE / DRAWER
--------------------------------------------------

Page title:
Student Profile

Subtitle:
Review student profile, AI match analysis, skills, status, and public feedback.

Add back button:
Back to Candidates

Add action buttons:
- Invite to Interview
- Mark Interested
- Shortlist
- Add Note
- Message

--------------------------------------------------
TOP PROFILE SUMMARY
--------------------------------------------------

Show a top summary card with:

Student:
Alex Chen

Avatar / initials:
AC

Basic info:
- Computer Science
- Stanford University
- Graduating 2026
- California, USA

Status:
Available Now

Profile Strength:
92%

Match Score:
94%

Badges:
- High Match
- Available
- Verified Student Profile

Quick AI Summary:
Alex is a strong frontend candidate with React, TypeScript, Node.js, teamwork, and web development interest.

--------------------------------------------------
MATCH ANALYSIS SECTION
--------------------------------------------------

Create a section titled:
AI Match Analysis

Show:
- Overall Match Score: 94%
- Technical Match: 96%
- Soft Skills Match: 88%
- Interest Match: 92%
- Behavioral Fit: 90%

Use bars or radial chart.

Add:
Why this candidate matches

Example:
- Strong React and TypeScript skills
- Interested in Web Development
- Strong communication and teamwork profile
- Fits remote frontend internship requirements

Add:
Possible gaps

Example:
- Limited SQL experience
- Needs more API integration practice

--------------------------------------------------
SKILLS SECTION
--------------------------------------------------

Section title:
Skills & Proficiency

Technical Skills:
- React — Advanced
- TypeScript — Intermediate
- Node.js — Intermediate
- Git — Intermediate
- APIs — Beginner

Soft Skills:
- Communication
- Teamwork
- Problem Solving
- Adaptability
- Self Learning

Show skills as chips with level badges.

--------------------------------------------------
INTERESTS & CAREER DIRECTION
--------------------------------------------------

Section title:
Interests & Career Direction

Show:
- Web Development
- AI / Machine Learning
- Frontend Engineering
- SaaS Products
- Remote Work

Preferred roles:
- Frontend Engineering Intern
- Full Stack Trainee
- UI-focused Developer

Preferred work style:
Remote / Hybrid

--------------------------------------------------
EDUCATION SECTION
--------------------------------------------------

Section title:
Education

Show:
- University: Stanford University
- Major: Computer Science
- Graduation Year: 2026
- Location: California, USA

Do not show private sensitive information.

--------------------------------------------------
BEHAVIORAL PROFILE
--------------------------------------------------

Section title:
Behavioral Profile

Show cards:
- Collaborative
- Fast Learner
- Problem Solver
- Comfortable with Feedback
- Detail-Oriented

Add short AI-generated note:
Alex shows strong collaborative behavior and learns quickly from structured feedback.

--------------------------------------------------
PUBLIC FEEDBACK SECTION
--------------------------------------------------

This is required.

Section title:
Public Feedback About This Student

Subtitle:
Professional feedback submitted by companies and approved for public visibility.

Only show feedback that is:
- Public
- Approved / Published
- Not private
- Not hidden
- Not pending review
- Not rejected

Add summary cards:
- Average Public Rating: 4.7 / 5
- Public Feedback Count: 6
- Verified Feedback: 6
- Most Mentioned Strength: Communication

Feedback Card 1:
Company:
Stellar Cloud

Opportunity:
Frontend Engineering Intern

Feedback Type:
Interview Feedback

Rating:
4.8 / 5

Badge:
Verified Public Feedback

Date:
May 18, 2026

Strengths:
- React
- Communication
- Teamwork

Feedback text:
Alex showed strong frontend fundamentals and communicated clearly during the interview. He explained his React project well and showed good learning potential.

Feedback Card 2:
Company:
TechNova

Opportunity:
Frontend Training Program

Feedback Type:
Training Feedback

Rating:
4.6 / 5

Badge:
Verified Training Feedback

Date:
April 28, 2026

Strengths:
- Fast Learning
- Problem Solving
- Professional Attitude

Feedback text:
Alex adapted quickly during training tasks and responded well to mentor feedback. He is recommended for frontend-focused internships.

Feedback Card 3:
Company:
BrightLabs

Opportunity:
UI Development Workshop

Feedback Type:
Project Feedback

Rating:
4.5 / 5

Badge:
Verified Public Feedback

Date:
March 20, 2026

Strengths:
- Design Thinking
- Teamwork
- Documentation

Feedback text:
Alex worked well with the team and showed good attention to UI details.

Important:
Add a small note:
Private feedback is not visible here. Only approved public feedback is shown.

--------------------------------------------------
PRIVATE FEEDBACK RULE
--------------------------------------------------

Do not show private company feedback to other companies.

Add a locked/private note if needed:
Private feedback is only visible to the student, the submitting company, and admin.

--------------------------------------------------
PUBLIC FEEDBACK FILTERS
--------------------------------------------------

Inside the Public Feedback section, add small filters:

- All Feedback
- Interview Feedback
- Training Feedback
- Project Feedback
- Highest Rating
- Most Recent

--------------------------------------------------
RECRUITMENT HISTORY WITH THIS COMPANY
--------------------------------------------------

Section title:
Your Recruitment Activity

Show this company’s relationship with the student for the selected opportunity:

- Current stage: Not yet contacted / Interested / Shortlisted / Interview / Matched
- Last action: Viewed profile
- Internal note count
- Related opportunity: Frontend Engineering Intern

Buttons:
- Mark Interested
- Shortlist
- Invite to Interview
- Add Internal Note

--------------------------------------------------
INTERNAL COMPANY NOTES
--------------------------------------------------

Section title:
Internal Notes

These notes are private to the company.

Show:
- Add note textarea
- Previous notes if any

Placeholder:
Add a private note about this candidate...

Button:
Save Note

Important:
Internal notes are not visible to the student.

--------------------------------------------------
APPLICATION / STATUS TIMELINE
--------------------------------------------------

Section title:
Status Timeline

Show timeline:
- Profile discovered by AI recommendation
- Company viewed profile
- Marked as interested
- Shortlisted
- Interview invited
- Interview completed
- Matched
- In Training

Only show stages that happened. Future stages can be faded.

--------------------------------------------------
ACTION BUTTONS
--------------------------------------------------

At bottom or sticky header, include:

Primary:
- Invite to Interview

Secondary:
- Mark Interested
- Shortlist
- Message Student
- Add Note

Danger/negative:
- Not a Fit

--------------------------------------------------
VIEW PROFILE FROM DIFFERENT PLACES
--------------------------------------------------

Make sure this same Student Profile view opens when clicking View Profile from:
- Candidate Discovery
- Dashboard top AI-matched candidates
- Recruitment Pipeline candidate card
- Interview page candidate card

--------------------------------------------------
BUSINESS LOGIC
--------------------------------------------------

Companies can view:
- Student public profile info
- Match score for the selected opportunity
- Skill and interest data
- Availability status
- Public approved feedback about the student
- Their own internal notes
- Their own recruitment activity with the student

Companies cannot view:
- Private feedback submitted by other companies
- Hidden feedback
- Pending review feedback
- Rejected feedback
- Sensitive private student data

Public feedback rules:
- Public feedback about students must be approved/published before appearing here.
- Private feedback is never shown publicly.
- Public feedback helps companies evaluate student professionalism and past training/interview performance.

--------------------------------------------------
EMPTY STATE FOR PUBLIC FEEDBACK
--------------------------------------------------

If the student has no public feedback, show:

Title:
No public feedback yet

Message:
This student does not have approved public feedback from companies yet.

Do not make the profile look empty. Still show skills, match analysis, education, interests, and actions.

--------------------------------------------------
DESIGN QUALITY
--------------------------------------------------

Do not create a simple profile popup.
Create a professional candidate profile page/drawer with clear sections.

The profile must feel useful for company decision-making.

It should clearly show:
- Student identity and education
- Availability
- AI match score
- Match explanation
- Skills
- Interests
- Behavioral profile
- Public feedback about the student
- Recruitment actions

Keep the UI clean, dark, blue, professional, and connected to the AI-assisted matching concept.