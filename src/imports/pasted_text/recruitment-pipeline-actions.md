Update the Company Portal → Recruitment Pipeline page.

Make these buttons fully functional inside the selected opportunity header:

- View Opportunity
- Edit Opportunity
- Search Candidates

Current context:
The company selected “Frontend Engineering Intern” inside the Recruitment Pipeline page. Each opportunity has its own pipeline, and the action buttons should work for the currently selected opportunity only.

Keep the current InternMatch AI dark blue SaaS style:
- Dark navy background
- Blue primary color
- Same sidebar and top navigation
- Same cards, typography, spacing, icons, and rounded corners
- Professional company portal UI
- Clear connected flows

--------------------------------------------------
BUTTON 1: VIEW OPPORTUNITY
--------------------------------------------------

When the company clicks “View Opportunity”, open a full Opportunity Details page or right-side drawer for the selected opportunity.

Title:
Opportunity Details

Subtitle:
View the published opportunity, requirements, match analysis, and recruitment activity.

Use selected opportunity:
Frontend Engineering Intern

Show these sections:

1. Opportunity Summary
- Opportunity title: Frontend Engineering Intern
- Company: Stellar Cloud
- Type: Internship
- Work mode: Remote
- Status: Active
- Deadline: June 01, 2026
- Posted date: May 10, 2026
- Available seats: 3
- Applicants: 42
- Avg Match Score: 84%

2. Description
Show a realistic opportunity description:
Students will work with the frontend team to build React components, improve UI performance, and collaborate with designers and backend developers.

3. Requirements
Technical skills:
- React
- TypeScript
- JavaScript
- Git
- APIs

Preferred soft skills:
- Communication
- Teamwork
- Problem Solving
- Self Learning

Academic requirements:
- Computer Science
- Software Engineering
- Any related field

Experience level:
Basic project experience

4. Matching Weights
Show:
- Technical Skills: 40%
- Soft Skills: 25%
- Interests: 15%
- Behavioral Fit: 20%

5. AI Match Analysis
Show:
- Estimated candidate pool: 184
- Strong matches: 42
- Average match score: 84%
- Top matching factors: React, TypeScript, Communication, Remote preference

6. Recruitment Summary
Show:
- Applied: 12
- Interested: 5
- Shortlisted: 8
- Interview: 4
- Matched: 1
- In Training: 0
- Rejected: 3

7. Actions
Buttons:
- Edit Opportunity
- Search Candidates
- Close Opportunity
- Back to Pipeline

Important:
The View Opportunity page should be read-only except for action buttons.
It should show details for the currently selected opportunity only.

--------------------------------------------------
BUTTON 2: EDIT OPPORTUNITY
--------------------------------------------------

When the company clicks “Edit Opportunity”, open an Edit Opportunity page for the selected opportunity.

Title:
Edit Opportunity

Subtitle:
Update opportunity details and matching requirements. The system will recalculate candidate matches after saving changes.

Use the same multi-step structure as Post New Opportunity, but pre-filled with existing data.

Steps:
1. Basic Information
2. Requirements
3. Training Details
4. AI Match Preview
5. Review & Save

--------------------------------------------------
EDIT STEP 1: BASIC INFORMATION
--------------------------------------------------

Pre-filled fields:
- Opportunity Title: Frontend Engineering Intern
- Opportunity Type: Internship
- Field / Category: Software Development
- Short Summary
- Full Description
- Number of Available Seats: 3
- Visibility: Public

Buttons:
- Cancel
- Save Draft
- Continue

--------------------------------------------------
EDIT STEP 2: REQUIREMENTS
--------------------------------------------------

Pre-filled required technical skills:
- React — Advanced
- TypeScript — Intermediate
- JavaScript — Intermediate
- Git — Beginner
- APIs — Beginner

Allow company to:
- Add skill
- Remove skill
- Change skill level

Preferred soft skills:
- Communication
- Teamwork
- Problem Solving
- Self Learning

Academic requirements:
- Computer Science
- Software Engineering
- Any related field

Experience level:
Basic project experience

Work preference:
Remote

Matching weight sliders:
- Technical Skills: 40%
- Soft Skills: 25%
- Interests: 15%
- Behavioral Fit: 20%

Buttons:
- Back
- Save Draft
- Continue

--------------------------------------------------
EDIT STEP 3: TRAINING DETAILS
--------------------------------------------------

Pre-filled fields:
- Location: Remote
- Duration: 3 months
- Start Date: June 10, 2026
- Application Deadline: June 01, 2026
- Weekly Hours: Part-time
- Compensation: Stipend
- Mentor: Sarah Park
- Contact Email: hr@stellarcloud.com

Buttons:
- Back
- Save Draft
- Continue

--------------------------------------------------
EDIT STEP 4: AI MATCH PREVIEW
--------------------------------------------------

Show recalculation preview:

Before update:
- Avg Match Score: 84%
- Strong Candidates: 42

After update:
- Estimated Avg Match Score: 87%
- Strong Candidates: 48

AI Suggestions:
- Adding “REST APIs” as a required skill improves backend/frontend alignment.
- Reducing TypeScript level from Advanced to Intermediate increases candidate pool.
- Adding “Communication” improves soft-skill matching.

Buttons:
- Back
- Continue to Review

--------------------------------------------------
EDIT STEP 5: REVIEW & SAVE
--------------------------------------------------

Show summary of changes:
- Added REST APIs
- Updated required level for TypeScript
- Changed deadline
- Updated mentor name

Buttons:
- Cancel
- Save Changes

After clicking Save Changes, show confirmation modal:

Title:
Save Opportunity Changes?

Message:
Updating this opportunity will re-analyze requirements and recalculate match scores for related students.

Buttons:
- Cancel
- Save & Recalculate

After saving, show success modal:

Title:
Opportunity Updated Successfully

Message:
The system is recalculating candidate matches for Frontend Engineering Intern.

Show:
- Status: Active
- Updated date: Today
- Recalculation: In Progress

Buttons:
- Back to Pipeline
- View Updated Opportunity
- Search Candidates

After save:
- Return to pipeline if selected
- Update pipeline AI suggestion
- Show small badge: Matches recalculated
- Keep candidate stages and notes unchanged

--------------------------------------------------
BUTTON 3: SEARCH CANDIDATES
--------------------------------------------------

When the company clicks “Search Candidates”, navigate to Candidate Discovery page filtered for the selected opportunity.

Page title:
Candidate Discovery

Subtitle:
AI-matched candidates for your Frontend Engineering Intern position.

Important:
The page must be context-aware.
It should search candidates specifically for the selected opportunity, not all company posts.

At the top, show selected opportunity context card:

Selected Opportunity:
Frontend Engineering Intern

Details:
- Type: Internship
- Work mode: Remote
- Required skills: React, TypeScript, JavaScript, Git, APIs
- Avg Match: 84%
- Active pipeline: Frontend Engineering Intern

Buttons:
- Change Opportunity
- Back to Pipeline
- View Opportunity

--------------------------------------------------
CANDIDATE SEARCH RESULTS
--------------------------------------------------

Show candidates ranked for this opportunity only.

Each candidate card should show:
- Student name
- University
- Major
- Graduation year
- Location
- Match score for Frontend Engineering Intern
- Profile strength
- Availability status
- Technical skills
- Soft skills
- Interests
- AI match reason
- Current pipeline stage for this opportunity

Example card:

Alex Chen
Computer Science @ Stanford University
Match Score: 94%
Profile Strength: 92%
Availability: Available Now
Stage in this pipeline: Applied

Skills:
React, TypeScript, Node.js

AI Match Reason:
Strong match because Alex has React, TypeScript, and Web Development interest.

Actions:
- View Profile
- Mark Interested
- Shortlist
- Invite to Interview
- Add to Pipeline

--------------------------------------------------
SEARCH CANDIDATES FILTERS
--------------------------------------------------

Keep advanced filters:

- Search by name, university, or skills
- Match score
- Technical skills
- Soft skills
- Interests
- Availability
- University
- Major
- Graduation year
- Location
- Profile strength

Default filters should match the selected opportunity:
- React
- TypeScript
- Match score 80%+
- Available or Available Soon

--------------------------------------------------
ADD TO PIPELINE / MARK INTERESTED
--------------------------------------------------

When company clicks “Mark Interested” from Candidate Discovery:

Show confirmation modal:

Title:
Mark Student as Interested?

Message:
This student will be added to the Interested stage for the Frontend Engineering Intern pipeline.

Buttons:
- Cancel
- Mark Interested

After confirmation:
- Candidate stage becomes Interested
- Candidate appears in the Interested column on the Frontend Engineering Intern pipeline
- Show success toast:
Student added to this opportunity pipeline as Interested.

--------------------------------------------------
SHORTLIST FROM SEARCH
--------------------------------------------------

When company clicks “Shortlist”:

Show modal:
Title:
Shortlist Candidate

Fields:
- Shortlist reason
- Internal note

Buttons:
- Cancel
- Shortlist Candidate

After confirmation:
- Candidate appears in the Shortlisted column for this specific opportunity
- Show success toast:
Candidate shortlisted for Frontend Engineering Intern.

--------------------------------------------------
CONNECTION BACK TO PIPELINE
--------------------------------------------------

After actions from Candidate Discovery:
- Back to Pipeline button should return to the Recruitment Pipeline page
- The selected opportunity should remain Frontend Engineering Intern
- Pipeline columns should update based on actions performed

Example:
If Sarah Johnson is marked Interested:
Frontend Engineering Intern pipeline → Interested column count increases by 1.

If Michael Zhang is shortlisted:
Frontend Engineering Intern pipeline → Shortlisted column count increases by 1.

--------------------------------------------------
IMPORTANT BUSINESS LOGIC
--------------------------------------------------

The three buttons must be connected to the selected opportunity:

View Opportunity:
- Opens read-only details for selected opportunity

Edit Opportunity:
- Opens editable form for selected opportunity
- Saves changes
- Triggers match recalculation
- Keeps existing pipeline history

Search Candidates:
- Opens Candidate Discovery filtered for selected opportunity
- Allows adding candidates to this opportunity’s unique pipeline
- Shows match scores specific to this opportunity

Do not use generic data.
Do not show unrelated opportunity details.
Do not mix pipelines between different posts.

Each opportunity has its own:
- Candidate list
- Pipeline stages
- Match scores
- Notes
- Interview progress
- Recruitment history

--------------------------------------------------
CLOSE OPPORTUNITY OPTIONAL ACTION
--------------------------------------------------

Inside View Opportunity, make “Close Opportunity” functional too.

When clicked, show modal:

Title:
Close Opportunity?

Message:
This opportunity will stop accepting new applications and will be hidden from student search results. Existing pipeline history will remain available.

Reason dropdown:
- Position filled
- Training started
- No longer available
- Requirements changed
- Duplicate opportunity
- Other

Buttons:
- Cancel
- Close Opportunity

After closing:
- Status becomes Closed
- Opportunity no longer appears to students
- Pipeline remains visible to company
- Candidate history is preserved

--------------------------------------------------
DESIGN QUALITY
--------------------------------------------------

Do not leave these buttons inactive.
Do not create placeholder pages.

Make the flow feel complete:
Pipeline → View Opportunity
Pipeline → Edit Opportunity → Save & Recalculate
Pipeline → Search Candidates → Add to this pipeline

Keep the UI clean, dark, blue, professional, and clearly connected to the AI-assisted matching system.



Update the Company Portal → Insights page.

Make the “Update Requirements” button inside the Top AI Recommendation card fully functional.

Current context:
The company is on Company Insights & Analytics page.
There is an AI recommendation card saying:
“Adjust Required Skills for Better Matches”
It recommends changing SQL from a must-have skill to a nice-to-have skill for the Frontend Engineering Intern opportunity.

When the company clicks “Update Requirements”, open a connected opportunity requirements update flow.

Keep the current InternMatch AI dark blue SaaS style:
- Dark navy background
- Blue primary action color
- Same sidebar and top navigation
- Same cards, buttons, typography, spacing, and rounded corners
- Professional company analytics UI
- Clear AI recommendation and update flow

--------------------------------------------------
BUTTON: UPDATE REQUIREMENTS
--------------------------------------------------

When clicking “Update Requirements”, open a modal or right-side drawer.

Title:
Update Opportunity Requirements

Subtitle:
Apply AI recommendations to improve candidate match quality.

Show selected opportunity:
Frontend Engineering Intern

Status:
Active

Current average match score:
76%

Predicted after update:
89%

Potential impact:
+56 qualified applicants

--------------------------------------------------
AI RECOMMENDATION SUMMARY
--------------------------------------------------

Add a recommendation card:

Recommendation:
Change SQL from “Required Skill” to “Nice-to-Have Skill”

Reason:
78% of high-quality React candidates on the platform do not list SQL, but they strongly match the frontend requirements. Making SQL nice-to-have can increase the candidate pool without reducing frontend fit.

Impact:
- Qualified applicants: +56
- Avg match score: 76% → 89%
- Candidate pool quality: Improved
- Requirement strictness: More balanced

--------------------------------------------------
CURRENT REQUIREMENTS SECTION
--------------------------------------------------

Show current requirements before applying changes:

Required Technical Skills:
- React — Required
- TypeScript — Required
- SQL — Required
- Git — Required
- APIs — Required

Preferred Skills:
- Tailwind CSS
- Testing
- UI/UX basics

Soft Skills:
- Communication
- Teamwork
- Problem Solving

Matching Weights:
- Technical Skills: 40%
- Soft Skills: 25%
- Interests: 15%
- Behavioral Fit: 20%

Highlight SQL with warning badge:
Too restrictive

--------------------------------------------------
PROPOSED CHANGES SECTION
--------------------------------------------------

Show proposed updated requirements:

Required Technical Skills:
- React — Required
- TypeScript — Required
- Git — Required
- APIs — Required

Nice-to-Have Skills:
- SQL — Nice-to-have
- Tailwind CSS
- Testing
- UI/UX basics

Show clear before/after:

Before:
SQL = Required

After:
SQL = Nice-to-have

Add badge:
AI Recommended

--------------------------------------------------
EDIT OPTIONS
--------------------------------------------------

Allow the company to manually adjust before applying.

For each skill, allow dropdown:
- Required
- Nice-to-have
- Optional
- Remove

Allow adding new skill:
Add skill input

Allow changing skill level:
- Beginner
- Intermediate
- Advanced

Allow matching weight sliders:
- Technical Skills
- Soft Skills
- Interests
- Behavioral Fit

Add note:
Changing requirements will trigger match recalculation for this opportunity.

--------------------------------------------------
IMPACT PREVIEW
--------------------------------------------------

Add an “Impact Preview” section.

Cards:
1. Candidate Pool
Before: 128
After: 184
Change: +56

2. Avg Match Score
Before: 76%
After: 89%
Change: +13%

3. High-Match Candidates
Before: 18
After: 42
Change: +24

4. Requirement Strictness
Before: High
After: Balanced

Add small chart:
Candidate pool before vs after

Add AI explanation:
This change keeps the frontend skill focus while reducing unnecessary filtering caused by SQL.

--------------------------------------------------
ACTION BUTTONS
--------------------------------------------------

Buttons:
- Cancel
- Preview Candidates
- Apply Recommendation

Primary button:
Apply Recommendation

Secondary:
Preview Candidates

--------------------------------------------------
PREVIEW CANDIDATES FLOW
--------------------------------------------------

When clicking “Preview Candidates”, show a preview list of candidates that would become stronger matches after this update.

Title:
New Potential Matches

Show candidates:
1. Alex Chen
Current Match: 84%
After Update: 94%
Reason: Strong React and TypeScript, missing SQL

2. Sarah Johnson
Current Match: 79%
After Update: 91%
Reason: Strong frontend skills, good communication

3. Michael Zhang
Current Match: 74%
After Update: 87%
Reason: Strong UI development background

Buttons:
- Back
- Apply Recommendation

--------------------------------------------------
APPLY RECOMMENDATION CONFIRMATION
--------------------------------------------------

When clicking “Apply Recommendation”, show confirmation modal:

Title:
Apply AI Recommendation?

Message:
This will update the requirements for Frontend Engineering Intern and recalculate match scores for related students.

Show changes:
- SQL will move from Required to Nice-to-have
- Candidate pool expected to increase by 56
- Average match score expected to improve from 76% to 89%

Checkbox:
I understand that this change will update opportunity requirements and recalculate matches.

Buttons:
- Cancel
- Apply & Recalculate

--------------------------------------------------
SUCCESS STATE
--------------------------------------------------

After applying:

Show loading modal:
Title:
Updating Requirements

Steps:
- Updating opportunity requirements
- Re-analyzing skill criteria
- Recalculating candidate match scores
- Refreshing candidate recommendations
- Updating pipeline insights

Then show success modal:

Title:
Requirements Updated Successfully

Message:
SQL is now marked as a nice-to-have skill for Frontend Engineering Intern. Candidate matches are being recalculated.

Show:
- Avg Match Score: 76% → 89%
- Qualified Applicants: +56
- High-Match Candidates: +24

Buttons:
- View Updated Candidates
- Back to Insights
- View Opportunity

--------------------------------------------------
AFTER UPDATE BEHAVIOR
--------------------------------------------------

After update:
- The Top AI Recommendation card should change to a completed state
- Show badge: Applied
- Show message:
Recommendation applied. Match quality improved.

Update metrics:
- Avg Match Score changes from 76% to 89%
- Total Applicants / qualified pool increases
- Opportunity Performance updates for Frontend Engineering Intern
- Candidate Quality Trends update
- Candidate Discovery ranking recalculates

--------------------------------------------------
CONNECTED PAGES
--------------------------------------------------

Update these connected pages:

1. Company → Opportunities
Frontend Engineering Intern should now show:
SQL under Nice-to-have skills, not Required.

2. Company → Candidate Discovery
Candidates missing SQL should no longer be penalized heavily.
Show improved match scores.

3. Company → Pipeline
Existing candidate match scores should update after recalculation.

4. Student → Opportunity Details
Students should see:
SQL listed as Nice-to-have instead of Required.

5. Student → AI Match Explanation
Explain:
SQL is recommended but not required.

--------------------------------------------------
BUSINESS LOGIC
--------------------------------------------------

The company can:
- Review AI recommendation
- Compare current vs proposed requirements
- Preview impact
- Preview affected candidates
- Apply recommendation
- Trigger match recalculation

The system should:
- Update opportunity requirements
- Recalculate match scores
- Improve candidate ranking
- Keep pipeline stages unchanged
- Log this change in opportunity history / audit log

Do not:
- Delete existing candidates
- Reset pipeline stages
- Remove applications
- Change opportunity status

--------------------------------------------------
AUDIT / HISTORY
--------------------------------------------------

Add a small history log after update:

Opportunity Requirement History:
- May 20, 2026 — SQL changed from Required to Nice-to-have by Stellar Cloud
- Match recalculation triggered by system
- Avg match score improved from 76% to 89%

--------------------------------------------------
DESIGN QUALITY
--------------------------------------------------

Do not make the Update Requirements button inactive.
Do not simply navigate to a blank edit page.

Create a smart AI-assisted update flow:
- Recommendation summary
- Current requirements
- Proposed changes
- Impact preview
- Candidate preview
- Confirmation
- Recalculation loading
- Success state
- Connected updates across opportunity/candidates/pipeline

The flow should clearly show that the platform is intelligent and helps companies optimize their requirements for better matching.