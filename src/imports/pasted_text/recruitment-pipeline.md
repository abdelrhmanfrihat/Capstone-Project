Update the Company Portal → Recruitment Pipeline page.

The pipeline must support this requirement:
“As a company, I want to shortlist or mark students as interesting so that I can manage my recruitment pipeline.”

Important:
Each opportunity/post must have its own unique recruitment pipeline.
Do not show one generic pipeline for all posts.
The company should be able to switch between opportunities and see a separate pipeline for each post.

Keep the current InternMatch AI dark blue SaaS style:
- Dark navy background
- Blue as primary action color
- Same sidebar and top navigation
- Same cards, typography, spacing, icons, and rounded corners
- Professional recruiter/company dashboard UI
- Clean kanban board style

--------------------------------------------------
MAIN PAGE TITLE
--------------------------------------------------

Title:
Recruitment Pipeline

Subtitle:
Manage candidates separately for each internship or training opportunity.

--------------------------------------------------
OPPORTUNITY SELECTOR
--------------------------------------------------

At the top of the page, add an opportunity selector section.

Add label:
Select Opportunity Pipeline

Use tabs or dropdown cards for active opportunities:

1. Frontend Engineering Intern
   Remote
   Active
   42 applicants
   Avg Match: 84%

2. Backend Systems Intern
   Hybrid
   Active
   28 applicants
   Avg Match: 79%

3. Product Design Training
   On-site
   Active
   16 applicants
   Avg Match: 81%

4. Data Science Intern
   Remote
   Draft / Closed depending on sample state

When the company selects an opportunity, the pipeline below must update to show only candidates related to that specific post.

Add small text:
Each opportunity has its own pipeline, candidates, statuses, notes, and interview progress.

--------------------------------------------------
PIPELINE HEADER
--------------------------------------------------

After selecting an opportunity, show a pipeline header card:

Selected Opportunity:
Frontend Engineering Intern

Show:
- Opportunity type: Internship
- Work mode: Remote
- Status: Active
- Applicants: 42
- Shortlisted: 8
- Interviews: 4
- Matched: 1
- Avg Match Score: 84%
- Deadline: June 01, 2026

Actions:
- View Opportunity
- Edit Opportunity
- Search Candidates
- Export Pipeline

--------------------------------------------------
KANBAN PIPELINE COLUMNS
--------------------------------------------------

Create a kanban board with these columns:

1. Applied
2. Interested
3. Shortlisted
4. Interview
5. Matched
6. In Training
7. Rejected

Important:
Add the “Interested” column because the company needs to mark students as interesting before shortlisting.

Each column should show:
- Column name
- Candidate count
- Empty state if no candidates
- Drop area for moving candidates

--------------------------------------------------
CANDIDATE CARD DESIGN
--------------------------------------------------

Each candidate card should include:

- Student avatar / initials
- Student name
- Match score
- University and major
- Top technical skills
- Top soft skills
- Availability status
- Current stage
- Last activity
- Small AI match reason

Example card:

Alex Chen
94% Match
Computer Science • Stanford University
Skills: React, TypeScript, Node.js
Soft Skills: Teamwork, Communication
Status: Available Now
AI Reason: Strong frontend fit with React and TypeScript.

Actions on each card:
- View Profile
- Mark Interested
- Shortlist
- Invite to Interview
- Message
- Add Note
- Move Stage
- Reject

--------------------------------------------------
MARK AS INTERESTING FLOW
--------------------------------------------------

When company clicks “Mark Interested” on a student:

Show confirmation or quick action:
Title:
Mark Student as Interesting?

Message:
This student will be added to the Interested stage for this opportunity so your team can review them later.

Buttons:
- Cancel
- Mark Interested

After confirmation:
- Move the student card to the Interested column
- Add badge: Interested
- Add activity log:
“Marked as interesting by Stellar Cloud”
- Keep the student visible to other opportunities and companies
- Do not notify the student unless the company sends an invitation

Show success toast:
Student marked as interesting.

--------------------------------------------------
SHORTLIST FLOW
--------------------------------------------------

When company clicks “Shortlist”:

Show modal:
Title:
Shortlist Candidate

Message:
Shortlisting helps you organize promising candidates for this opportunity.

Fields:
- Shortlist reason
Dropdown:
  - Strong technical match
  - Strong soft skills
  - Good academic background
  - Strong interest alignment
  - Recommended by AI
  - Other

- Internal note
Textarea:
Add a note for your recruitment team...

Buttons:
- Cancel
- Shortlist Candidate

After shortlisting:
- Move candidate to Shortlisted column
- Add badge: Shortlisted
- Add timeline event:
“Candidate shortlisted for Frontend Engineering Intern”
- Student remains available to other companies
- Student may receive notification depending on settings

Show success toast:
Candidate shortlisted successfully.

--------------------------------------------------
MOVE STAGE FLOW
--------------------------------------------------

When company clicks “Move” or drags a card between columns:

Open a small modal:
Title:
Move Candidate

Fields:
- New stage
Dropdown:
  - Applied
  - Interested
  - Shortlisted
  - Interview
  - Matched
  - In Training
  - Rejected

- Reason / note
Textarea

Important warning:
If moving to In Training, show a strong warning:
“This will hard-lock the student. They will no longer appear in other company searches and cannot apply to new opportunities.”

Buttons:
- Cancel
- Move Candidate

Only “In Training” should hard-lock the student.
Applied, Interested, Shortlisted, Interview, and Matched should NOT hide the student.

--------------------------------------------------
UNIQUE PIPELINE BEHAVIOR
--------------------------------------------------

Make it clear that each opportunity has its own separate pipeline.

Example:
If “Frontend Engineering Intern” is selected:
Show candidates:
- Alex Chen
- Sarah Johnson
- Michael Zhang

If “Backend Systems Intern” is selected:
Show different candidates:
- David Kim
- Elena Rodriguez
- Maya Patel

Candidates can appear in multiple opportunity pipelines if they applied or were recommended for multiple posts, but their stage should be tracked separately per opportunity.

Example:
Alex Chen:
- Frontend Engineering Intern: Interview
- Backend Systems Intern: Interested

Do not mix all candidates into one generic pipeline.

--------------------------------------------------
FILTERS AND SEARCH
--------------------------------------------------

Add filters above the kanban:

- Search candidate
- Match score
- Skills
- Availability
- Stage
- University
- Last activity

Add sort:
- Best match
- Recently updated
- Highest profile strength
- Newest applicants

--------------------------------------------------
PIPELINE INSIGHTS
--------------------------------------------------

Add a right-side or top insight panel:

Pipeline Health

Show:
- Total candidates
- Average match score
- Strong matches
- Candidates needing review
- Interviews scheduled
- Feedback pending

Add AI suggestion:
“5 high-match candidates are still in Applied. Consider marking them as Interested or Shortlisting them.”

--------------------------------------------------
CANDIDATE DETAILS DRAWER
--------------------------------------------------

When clicking a candidate card, open a right-side drawer.

Title:
Candidate Pipeline Details

Sections:
1. Candidate Summary
- Name
- University
- Major
- Match score
- Availability
- Profile strength

2. Match Explanation
- Technical match
- Soft skills match
- Interest match
- Behavior match
- Strong areas
- Missing areas

3. Pipeline Status for This Opportunity
- Current stage
- Stage history
- Last updated
- Assigned recruiter

4. Internal Notes
- Add note
- Previous notes

5. Actions
- Mark Interested
- Shortlist
- Invite to Interview
- Move to Matched
- Confirm Training Start
- Reject Candidate
- Provide Feedback

--------------------------------------------------
EMPTY STATES
--------------------------------------------------

For empty columns, show meaningful empty states.

Applied:
No applicants yet.

Interested:
No students marked as interesting yet.

Shortlisted:
No shortlisted candidates yet.

Interview:
No interviews scheduled yet.

Matched:
No matched candidates yet.

In Training:
No student has started training yet.

Rejected:
No rejected candidates.

--------------------------------------------------
BUSINESS LOGIC
--------------------------------------------------

Company can:
- View pipeline per opportunity
- Mark student as Interested
- Shortlist candidate
- Invite candidate to interview
- Move candidate between stages
- Add internal notes
- Reject candidate
- Confirm training start
- View candidate profile

System should:
- Track pipeline stage per opportunity
- Keep status history
- Recalculate match score if opportunity requirements change
- Keep candidates visible unless they become In Training
- Show warning before In Training
- Support multiple interviews before student is locked

Important:
Interested and Shortlisted are not final decisions.
They are recruitment organization stages.
They do not block the student from other opportunities.

--------------------------------------------------
DESIGN QUALITY
--------------------------------------------------

Do not keep the pipeline as one simple generic board.
Make it a complete opportunity-specific recruitment management page.

The page must clearly show:
- Each post has its own pipeline
- Company can switch between pipelines
- Company can mark students as interesting
- Company can shortlist candidates
- Company can move candidates through stages
- Candidate status is tracked per opportunity

Keep the UI clean, dark, blue, professional, and AI-assisted.
Show match scores and AI match reasons on candidate cards.