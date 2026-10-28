Update the Student Portal dashboard so the “View Matches” and “Update Profile” buttons are fully functional.

Current screen:
Student Dashboard for Alex Chen.
There are two main buttons:
- Update Profile
- View Matches

These buttons should not be decorative. They must open real connected flows.

Keep the current InternMatch AI dark blue SaaS style:
- Dark navy background
- Blue primary actions
- Same sidebar and top navigation
- Same cards, typography, spacing, icons, and rounded corners
- Professional AI-assisted student portal UI

--------------------------------------------------
BUTTON 1: VIEW MATCHES
--------------------------------------------------

When the student clicks “View Matches”, navigate to a full page called:

AI Matches

Subtitle:
Explore internship and training opportunities ranked by your compatibility score.

This page should show all recommended opportunities for the student, not just one card.

--------------------------------------------------
AI MATCHES PAGE STRUCTURE
--------------------------------------------------

Page header:
AI Matches

Subtitle:
Opportunities ranked based on your skills, interests, behavior, and profile strength.

Add summary cards at the top:

1. Best Match
Frontend Engineering Intern
94%

2. Total Matches
24 opportunities

3. Average Match Score
82%

4. Profile Strength
92%

5. Opportunities Unlocked
+15 after adding SQL

--------------------------------------------------
MATCH FILTERS
--------------------------------------------------

Add filters:

Search:
Search opportunities, companies, skills...

Filter by:
- Match Score
- Field
- Company
- Opportunity Type
- Work Mode
- Missing Skills
- Duration
- Deadline

Match Score options:
- 90%+
- 80%+
- 70%+
- 60%+

Opportunity Type:
- Internship
- Training

Work Mode:
- Remote
- Hybrid
- On-site

Sort options:
- Best Match
- Recently Posted
- Deadline Soon
- Highest Skill Fit
- Lowest Skill Gap

--------------------------------------------------
MATCH CARDS
--------------------------------------------------

Show multiple opportunity cards.

Each match card must include:
- Opportunity title
- Company name
- Verified company badge
- Work mode
- Location
- Opportunity type
- Match score
- Match breakdown
- Why this match?
- Strong matched skills
- Missing skills
- Estimated improvement
- Apply button
- Save button
- View Details button

Sample cards:

Card 1:
Title: Frontend Engineering Intern
Company: Stellar Cloud
Work mode: Remote
Type: Internship
Match Score: 94%

Why this match?
Your React and TypeScript experience strongly matches this opportunity. Adding SQL could raise your match to 99%.

Strong skills:
React, TypeScript, Teamwork

Missing skills:
SQL

Actions:
Apply Now
View Details
Save

Card 2:
Title: Full Stack Trainee
Company: TechNova
Work mode: Hybrid
Type: Training
Match Score: 89%

Why this match?
Your frontend skills and problem-solving profile fit this training path, but backend API experience could improve your score.

Strong skills:
JavaScript, React, Communication

Missing skills:
REST APIs, Node.js

Actions:
Apply Now
View Details
Save

Card 3:
Title: UI Developer Intern
Company: BrightLabs
Work mode: On-site
Type: Internship
Match Score: 84%

Why this match?
Your web development interest and UI-focused profile are aligned with this role.

Strong skills:
React, CSS, Teamwork

Missing skills:
Figma

Actions:
Apply Now
View Details
Save

--------------------------------------------------
MATCH DETAILS DRAWER
--------------------------------------------------

When clicking “View Details” on a match card, open an opportunity details drawer/page.

Include:
- Opportunity information
- Company profile summary
- Overall match score
- Technical match %
- Soft skills match %
- Interests match %
- Behavioral fit %
- Required skills
- Missing skills
- Why recommended
- How to improve match score
- Apply button
- Save button

--------------------------------------------------
APPLY FLOW FROM MATCHES
--------------------------------------------------

When clicking Apply Now:

If student is Active:
Show confirmation modal:

Title:
Apply to Frontend Engineering Intern?

Message:
Your profile and AI match summary will be shared with Stellar Cloud.

Buttons:
Cancel
Submit Application

After submit:
Show success modal:
Application submitted successfully.

Update application status:
Applied

If student is In Training:
Disable Apply button and show warning:
You are currently in training and cannot apply to new opportunities.

--------------------------------------------------
BUTTON 2: UPDATE PROFILE
--------------------------------------------------

When the student clicks “Update Profile”, navigate to a full page called:

Update AI Profile

Subtitle:
Update your skills, interests, and assessment answers to improve future matches.

This page should let the student update profile data and trigger re-analysis.

--------------------------------------------------
UPDATE PROFILE PAGE STRUCTURE
--------------------------------------------------

Add top profile status card:

Profile Strength:
92%

Last Updated:
May 17, 2026

AI Recommendation:
Adding SQL and AWS / Cloud basics could unlock 15+ new matching opportunities.

Button:
Recalculate Matches

--------------------------------------------------
PROFILE UPDATE TABS
--------------------------------------------------

Use tabs or sections:

1. Basic Information
2. Education
3. Technical Skills
4. Soft Skills
5. Interests
6. Behavioral Profile
7. Work Preferences
8. Review & Recalculate

--------------------------------------------------
TAB 1: BASIC INFORMATION
--------------------------------------------------

Fields:
- Full Name
- Email
- Location
- Phone Number optional
- Short Bio

--------------------------------------------------
TAB 2: EDUCATION
--------------------------------------------------

Fields:
- University
- Major
- Graduation Year
- Current academic level
- GPA optional
- Current location

--------------------------------------------------
TAB 3: TECHNICAL SKILLS
--------------------------------------------------

Show current skills:
- React — Advanced
- TypeScript — Intermediate
- Node.js — Intermediate
- SQL — Missing / Suggested
- AWS / Cloud — Suggested

Allow:
- Add skill
- Remove skill
- Change proficiency level

Skill levels:
- Beginner
- Intermediate
- Advanced

Add suggested skills section:
Based on your top matches, consider adding:
- SQL
- AWS / Cloud
- REST APIs
- Docker

Each suggested skill should have:
- Add to Profile button

--------------------------------------------------
TAB 4: SOFT SKILLS
--------------------------------------------------

Show editable soft skills:
- Communication
- Teamwork
- Problem Solving
- Leadership
- Adaptability
- Time Management
- Self Learning

Use rating sliders from 1 to 5.

Add note:
Soft skill updates may affect compatibility scores with company requirements.

--------------------------------------------------
TAB 5: INTERESTS
--------------------------------------------------

Use selectable chips:
- Web Development
- Mobile Development
- AI / Machine Learning
- Data Science
- Cybersecurity
- UI/UX Design
- Cloud Computing
- Product Management
- Business Analysis

Allow:
- Add interests
- Remove interests

--------------------------------------------------
TAB 6: BEHAVIORAL PROFILE
--------------------------------------------------

Show short scenario questions or editable traits.

Traits:
- Collaborative
- Fast Learner
- Independent Worker
- Detail-Oriented
- Comfortable with Feedback
- Creative Problem Solver

Allow student to retake behavioral questions.

Button:
Retake Behavioral Assessment

--------------------------------------------------
TAB 7: WORK PREFERENCES
--------------------------------------------------

Fields:
- Preferred work mode:
  - Remote
  - Hybrid
  - On-site

- Preferred opportunity type:
  - Internship
  - Training
  - Both

- Preferred duration:
  - 1 month
  - 2 months
  - 3 months
  - 6 months

- Preferred fields:
  - Software Development
  - Data Science
  - UI/UX
  - Cybersecurity
  - AI

--------------------------------------------------
TAB 8: REVIEW & RECALCULATE
--------------------------------------------------

Show profile update summary:

Changed:
- Added SQL as Beginner
- Added AWS / Cloud interest
- Updated Communication from 4/5 to 5/5

Estimated impact:
- Profile strength: 92% → 96%
- Frontend Engineering Intern match: 94% → 99%
- New opportunities unlocked: +15
- Better matches in: Backend, Cloud, Full Stack

Buttons:
- Save Changes
- Save & Recalculate Matches

--------------------------------------------------
RECALCULATION FLOW
--------------------------------------------------

When student clicks “Save & Recalculate Matches”:

Show loading modal:
Title:
Recalculating Your Matches

Steps:
- Updating profile
- Re-analyzing skills
- Comparing with opportunity requirements
- Updating compatibility scores
- Generating new recommendations

Then show success modal:

Title:
Profile Updated Successfully

Message:
Your AI profile has been updated and your match scores were recalculated.

Show:
- Profile Strength: 92% → 96%
- New Matches: +15
- Improved Match: Frontend Engineering Intern 94% → 99%

Buttons:
- View Updated Matches
- Back to Dashboard

--------------------------------------------------
DASHBOARD UPDATE AFTER PROFILE UPDATE
--------------------------------------------------

After profile update, update the dashboard:

Welcome card text:
Your AI profile is 96% complete. Your recent update improved several match scores.

Top AI Match:
Frontend Engineering Intern
Match Score: 99%

Skill Gap Analysis:
SQL should no longer appear as missing if added.
Show next missing skill:
AWS / Cloud

Recent Activity:
Profile updated
Matches recalculated
15 new opportunities unlocked

--------------------------------------------------
BUSINESS LOGIC
--------------------------------------------------

View Matches button:
- Opens full AI Matches page
- Shows ranked opportunities
- Shows match score and explanation
- Allows apply/save/view details
- Applies status rules

Update Profile button:
- Opens profile update flow
- Allows editing skills, soft skills, interests, behavior, education, and work preferences
- Allows adding suggested missing skills
- Re-analyzes profile after update
- Recalculates match scores
- Updates dashboard and AI insights

Important:
The system must re-analyze profiles after updates.
The system must re-calculate matches whenever a student updates their profile.
The UI must clearly show that updating the profile improves recommendations.

--------------------------------------------------
DESIGN QUALITY
--------------------------------------------------

Do not make the buttons inactive.
Do not create placeholder pages.

The “View Matches” flow should feel like a smart recommendation engine.
The “Update Profile” flow should feel like an AI profile improvement system.

Keep everything visually consistent with the current Student Portal dark mode.
Use blue as the primary color.
Show match scores, profile strength, skill gaps, and AI explanations clearly.