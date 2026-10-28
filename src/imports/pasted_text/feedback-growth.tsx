Update the Student Portal → Feedback & Growth page.

The page must support this requirement:
“The system shall allow students to view private & public feedback received from companies.”

Important:
This page is only for feedback that the student receives from companies.
The student should clearly understand which feedback is private and which feedback is public.

Keep the current InternMatch AI dark blue SaaS style:
- Dark navy background
- Blue primary actions
- Same sidebar and top navigation
- Same card style, typography, spacing, icons, and rounded corners
- Professional AI-assisted student portal UI
- Clear badges for Private, Public, Pending Review, Published, Hidden

--------------------------------------------------
PAGE TITLE
--------------------------------------------------

Keep title:
Feedback & Growth

Update subtitle:
View private and public feedback from companies to improve your profile and match scores.

--------------------------------------------------
TOP FEEDBACK TABS
--------------------------------------------------

Add tabs near the top of the page:

1. All Feedback
2. Private Feedback
3. Public Feedback
4. Feedback Insights

Default selected tab:
All Feedback

--------------------------------------------------
FEEDBACK SUMMARY CARD
--------------------------------------------------

Improve the right-side Feedback Summary card.

Show:

Average Rating:
4.2 / 5.0

Total Feedback:
4

Private Feedback:
3

Public Feedback:
1

Published Public Feedback:
1

Pending Public Review:
0

Most Mentioned Strengths:
- React (3)
- Teamwork (2)
- Communication (2)

Top Improvement Areas:
- SQL (3)
- Backend Concepts (2)

Use badges:
Private = blue
Public = green
Pending Review = orange
Published = green
Hidden = gray

--------------------------------------------------
ALL FEEDBACK TAB
--------------------------------------------------

Show both private and public feedback in the same list.

Add filter dropdown:
- All Feedback
- Private Only
- Public Only
- Interview Feedback
- Profile Review Feedback
- Rejection Feedback
- Training Feedback

Each feedback card should include:

- Company name
- Opportunity title
- Feedback type
- Date
- Rating
- Visibility badge: Private or Public
- Public status badge if public:
  - Pending Review
  - Published
  - Hidden
  - Rejected
- Written feedback
- Strengths observed
- Areas for improvement
- Recommended skills
- Action button:
  - Add Skill to Profile
  - Recalculate Matches
  - View Related Opportunity

--------------------------------------------------
PRIVATE FEEDBACK TAB
--------------------------------------------------

Purpose:
Student can view feedback that is private and only visible to them.

Section title:
Private Feedback From Companies

Subtitle:
This feedback is visible only to you, the company that submitted it, and admin.

Show private feedback cards.

Example card 1:

Company:
Stellar Cloud

Opportunity:
Frontend Engineering Intern

Feedback Type:
Interview Feedback

Visibility Badge:
Private

Rating:
4.2 / 5

Date:
May 14, 2026

Feedback:
Alex has a fantastic grasp of React and React hooks. He communicated ideas very clearly during the pair programming session. We chose another candidate who had slightly more backend experience, but Alex is highly recommended.

Strengths Observed:
- React
- Communication
- Teamwork

Areas for Improvement:
- Backend Concepts
- SQL

Recommended Skills:
- SQL
- REST APIs
- Backend Basics

Actions:
- Add SQL to Profile
- Recalculate Matches

Add info note:
Private feedback is not visible to other companies or public users.

--------------------------------------------------
PUBLIC FEEDBACK TAB
--------------------------------------------------

Purpose:
Student can view public feedback submitted by companies about them.

Section title:
Public Feedback About Me

Subtitle:
Public feedback can appear on your student profile after admin approval.

Show only feedback where visibility is Public.

Public feedback cards should include:

- Company name
- Opportunity title
- Feedback type
- Rating
- Date
- Public status badge:
  - Pending Review
  - Published
  - Hidden
  - Rejected
- Verified Public Feedback badge if published
- Written feedback
- Strengths
- Improvement areas if available

Example card 1:

Company:
DataPulse

Opportunity:
Data Science Intern

Feedback Type:
Profile Review Feedback

Visibility Badge:
Public

Status Badge:
Pending Review

Rating:
3.8 / 5

Feedback:
Alex shows strong problem-solving ability, but Python and Machine Learning skills need more evidence before moving forward.

Strengths:
- Problem Solving

Recommended Skills:
- Python
- Machine Learning

Note:
This feedback is not visible publicly until admin approves it.

Example card 2:

Company:
TechNova

Opportunity:
Frontend Training Program

Feedback Type:
Training Feedback

Visibility Badge:
Public

Status Badge:
Published

Rating:
4.6 / 5

Badge:
Verified Public Feedback

Feedback:
Alex adapted quickly during training tasks and responded well to mentor feedback. He is recommended for frontend-focused internships.

Strengths:
- Fast Learning
- Teamwork
- Professional Attitude

--------------------------------------------------
PUBLIC FEEDBACK STATUS EXPLANATION
--------------------------------------------------

Add a small explanation box:

Public Feedback Status:

Pending Review:
Submitted by company but waiting for admin approval.

Published:
Visible on your public student profile.

Hidden:
Hidden by admin and not visible publicly.

Rejected:
Not approved for public display.

--------------------------------------------------
FEEDBACK INSIGHTS TAB
--------------------------------------------------

Purpose:
Student sees AI analysis from all received feedback.

Show:

AI Growth Insight:
Multiple companies mentioned SQL as a missing skill. Learning basic SQL and updating your profile could improve your average match score by 12%.

Most Mentioned Strengths:
- React
- Communication
- Teamwork
- Problem Solving

Repeated Improvement Areas:
- SQL
- Backend Concepts
- Python
- Machine Learning

Recommended Learning Paths:
1. SQL Basics for Developers
Estimated: +12% match potential

2. Intro to Backend APIs
Estimated: +8% match potential

3. Python for Data Projects
Estimated: +10% match potential

Buttons:
- Add Skills to Profile
- Recalculate Matches
- Update Profile

--------------------------------------------------
FEEDBACK CARD DESIGN
--------------------------------------------------

Each card should have a clear visual structure:

Top:
- Company name
- Feedback type badge
- Visibility badge
- Rating stars

Middle:
- Opportunity title
- Date
- Written feedback

Bottom:
- Strengths observed
- Areas for improvement
- Recommended skills
- Action buttons

Use colors:
Private badge = blue
Public badge = green
Pending Review = orange
Published = green
Hidden = gray
Rejected = red

--------------------------------------------------
FEEDBACK DETAILS DRAWER
--------------------------------------------------

When student clicks any feedback card, open a details drawer.

Title:
Feedback Details

Sections:

1. Feedback Summary
- Company
- Opportunity
- Feedback type
- Visibility
- Status
- Rating
- Date

2. Full Feedback
- Written feedback
- Strengths observed
- Areas for improvement
- Recommended skills

3. Match Impact
Show:
- Related match score before feedback
- Suggested improvement
- Possible match score increase

Example:
Adding SQL could improve your match with frontend roles by up to 12%.

4. Actions
- Add Recommended Skill
- Update Profile
- Recalculate Matches
- View Related Opportunity

--------------------------------------------------
EMPTY STATES
--------------------------------------------------

Private Feedback empty state:

Title:
No private feedback yet

Message:
Private feedback from companies will appear here after interviews, profile reviews, or training interactions.

Public Feedback empty state:

Title:
No public feedback yet

Message:
Public feedback submitted by companies will appear here after admin approval.

All Feedback empty state:

Title:
No feedback received yet

Message:
Once companies review your profile, interview you, or complete training with you, feedback will appear here.

--------------------------------------------------
BUSINESS LOGIC
--------------------------------------------------

Feedback received from companies:

Private Feedback:
- Visible to student
- Visible to submitting company
- Visible to admin
- Not visible to other companies
- Not visible publicly
- Used for student improvement and match recalculation

Public Feedback:
- Submitted by company about student
- May require admin approval
- Visible to student immediately with status
- Visible publicly only if admin approves/publishes it
- Appears on student public profile only when Published

Do not show private feedback publicly.
Do not show hidden/rejected public feedback on public profiles.
Student should still be able to see their own public feedback status.

--------------------------------------------------
RECALCULATE MATCHES BUTTON
--------------------------------------------------

Make the “Recalculate Matches” button functional.

When clicked:
Show loading modal:

Title:
Recalculating Matches

Steps:
- Reading company feedback
- Extracting skill gaps
- Updating improvement suggestions
- Comparing your profile with opportunities
- Refreshing match scores

Then show success modal:

Title:
Matches Updated

Message:
Your feedback insights were used to refresh your recommendations.

Buttons:
- View Matches
- Update Profile

--------------------------------------------------
DESIGN QUALITY
--------------------------------------------------

Do not keep the page as only recent feedback cards.

Make it clear that the page supports:
- Viewing all company feedback
- Viewing private feedback
- Viewing public feedback
- Understanding public feedback status
- Turning feedback into profile improvements

Keep the UI clean, dark, blue, professional, and connected to the AI-assisted matching system.



Update the Student Portal → Application Tracking page.

This page must fully support the workflow/status requirements:

1. The system shall track student workflow status.
2. The system shall allow multiple simultaneous interviews.
3. The system shall mark students as “Matched” upon offer acceptance.
4. The system shall mark students as “In Training” when training begins.
5. The system shall restrict students in training from applying or appearing in search.
6. The system shall display status clearly to students and companies.

Keep the current InternMatch AI dark blue SaaS style:
- Dark navy background
- Blue primary color
- Same sidebar and top navigation
- Same typography, cards, spacing, icons, and rounded corners
- Professional AI-assisted internship platform UI
- Clear status badges and workflow explanations

--------------------------------------------------
PAGE TITLE
--------------------------------------------------

Keep page title:
Application Tracking

Subtitle:
Track your workflow status across all opportunities.

--------------------------------------------------
TOP STATUS SUMMARY
--------------------------------------------------

Add a top summary section above the kanban board.

Cards:
1. Current Availability
Value: Available Now / In Training
Badge color:
- Available Now = green
- Matched = orange
- In Training = red

2. Active Applications
Value: 3

3. Interviews Scheduled
Value: 2

4. Current Main Status
Value: Interview / Matched / In Training

5. Next Action
Example:
Accept or reject pending interview invitation

--------------------------------------------------
WORKFLOW RULES ALERT
--------------------------------------------------

Keep the current Workflow Rules alert but improve it.

Text:
You can apply to multiple opportunities and attend multiple interviews at the same time. You are only locked when training officially begins and your status becomes “In Training”.

Add status rule chips:
- Applied = Still available
- Shortlisted = Still available
- Interview = Multiple allowed
- Matched = Not locked yet
- In Training = Locked

--------------------------------------------------
KANBAN BOARD
--------------------------------------------------

Create a horizontal kanban board with these columns:

1. Applied
2. Shortlisted
3. Interview
4. Matched
5. In Training
6. Rejected / Archived

Each column should show:
- Column title
- Count badge
- Empty state message if no cards

Column empty states:
Applied:
No active applications.

Shortlisted:
No shortlisted opportunities yet.

Interview:
No interviews scheduled.

Matched:
No accepted offers yet.

In Training:
No active training.

Rejected / Archived:
No rejected or archived applications.

--------------------------------------------------
APPLICATION CARD DESIGN
--------------------------------------------------

Each application card should show:

- Opportunity title
- Company name
- Company verified badge
- Match score
- Current status badge
- Work mode
- Application date
- Next step
- Deadline or interview date if relevant
- Small status timeline progress
- Actions

Example card in Interview column:

Frontend Engineering Intern
Company: Stellar Cloud
Match Score: 94%
Status: Interview
Interview Date: May 18, 10:00 AM
Work Mode: Remote
Applied: 2026-05-14
Next Step: Attend interview

Actions:
- View Details
- View Timeline
- Message Company
- Reschedule if available

--------------------------------------------------
MULTIPLE SIMULTANEOUS INTERVIEWS
--------------------------------------------------

The Interview column must support multiple cards at the same time.

Show examples:

Card 1:
Frontend Engineering Intern
Company: Stellar Cloud
Match Score: 94%
Interview: May 18, 10:00 AM
Status: Interview

Card 2:
Backend Systems Intern
Company: TechNova
Match Score: 89%
Interview: May 20, 2:00 PM
Status: Interview

Card 3:
Product Design Training
Company: BrightLabs
Match Score: 82%
Interview: May 22, 11:30 AM
Status: Interview

Add note inside Interview column:
You can attend multiple interviews before accepting one training opportunity.

Important:
Interview status should NOT lock the student.
Student should remain available and searchable.

--------------------------------------------------
APPLICATION DETAILS DRAWER
--------------------------------------------------

When student clicks “View Details” on any application card, open a right-side drawer.

Title:
Application Details

Sections:

1. Opportunity Summary
- Opportunity title
- Company
- Work mode
- Opportunity type
- Match score
- Required skills

2. Current Workflow Status
- Current status badge
- Status meaning

Example:
Interview — You are still available and can continue applying to other opportunities.

3. Status Timeline
Show vertical timeline:
- Application Submitted
- Company Reviewed Profile
- Shortlisted
- Interview Invited
- Interview Accepted
- Interview Completed
- Offer Received
- Offer Accepted
- Matched
- Training Started
- In Training

Only completed steps are active.
Future steps are faded.

4. Next Action
Examples:
- Attend interview
- Accept or reject offer
- Wait for company response
- Training begins soon

5. Company Message / Notes
Show latest message from company if any.

6. Actions
Depending on current status:
- View Opportunity
- Message Company
- Accept Interview
- Reject Interview
- Request Reschedule
- Accept Offer
- Reject Offer
- Withdraw Application
- View Feedback

--------------------------------------------------
STATUS MEANINGS
--------------------------------------------------

Add a small “Status Guide” panel or modal.

Statuses:

Applied:
Your application was submitted. You are still available.

Shortlisted:
The company marked you as promising. You are still available.

Interview:
An interview is scheduled or in progress. You can have multiple interviews.

Matched:
You accepted an offer or reached initial agreement. You are still not locked until training officially starts.

In Training:
Training officially started. You cannot apply to new opportunities and you will not appear in company searches.

Rejected:
The company did not continue with your application.

Released:
Admin or company released you from training/hold status.

--------------------------------------------------
MATCHED FLOW
--------------------------------------------------

When a student receives an offer, show the card in a new state:

Status:
Offer Received

Actions:
- Accept Offer
- Decline Offer
- Ask Question

When student clicks “Accept Offer”, show confirmation modal:

Title:
Accept Offer?

Message:
Accepting this offer will mark this opportunity as Matched. You can still attend other interviews until training officially starts.

Buttons:
- Cancel
- Accept Offer

After accepting:
- Move card to Matched column
- Status badge becomes Matched
- Add timeline event:
Offer accepted
- Show message:
You are matched, but not locked yet. You remain available until training starts.

Important:
Matched does NOT restrict applications.
Matched does NOT hide student from company search.
Matched should be clearly different from In Training.

--------------------------------------------------
IN TRAINING FLOW
--------------------------------------------------

When company confirms training start, or student confirms start date, the status becomes In Training.

Show strong confirmation / status screen:

Title:
Training Started

Message:
You are now marked as In Training with [Company Name]. You cannot apply to new opportunities and your profile will be hidden from company search until training ends or admin releases you.

After In Training:
- Move card to In Training column
- Current Availability card changes to: In Training
- Apply buttons across Opportunities page become disabled
- Student should not appear in company candidate discovery/search
- Student profile should show In Training badge
- Other active applications should show limited status:
Paused / Not available due to training

Show warning badge:
Locked while in training

--------------------------------------------------
RESTRICTION STATE FOR IN TRAINING
--------------------------------------------------

If student is In Training, update these pages:

1. Opportunities page:
- Apply Now button disabled
- Show warning:
You are currently in training and cannot apply to new opportunities.

2. Opportunity Details:
- Apply button disabled
- Show same warning

3. Student Dashboard:
- Current status: In Training
- Availability: Not Available
- Show company and opportunity name

4. Company Candidate Discovery:
- Student should not appear in normal search results
- If viewed from history, show badge:
Unavailable — In Training

5. Student Profile:
- Show In Training status badge

--------------------------------------------------
COMPANY SIDE STATUS VISIBILITY
--------------------------------------------------

Update company portal so companies clearly see student workflow status.

In Candidate Discovery:
- Show Available Now badge for available students
- Hide In Training students from normal search
- Show Matched badge if student is matched but still visible

In Candidate Profile:
Show:
- Current student status
- Availability
- Related application status if any

In Recruitment Pipeline:
Show status per opportunity:
- Applied
- Interested
- Shortlisted
- Interview
- Matched
- In Training
- Rejected

Before company marks a student as In Training, show warning:
This action will hard-lock the student and hide them from other company searches.

--------------------------------------------------
STATUS HISTORY / AUDIT LOG
--------------------------------------------------

Each application should have a status history log.

Show in Application Details drawer:

Status History:
- May 14, 2026 — Application submitted
- May 15, 2026 — Company reviewed profile
- May 16, 2026 — Shortlisted
- May 18, 2026 — Interview scheduled
- May 18, 2026 — Interview completed
- May 20, 2026 — Offer accepted
- June 01, 2026 — Training started

Each log item should show:
- Date/time
- Action
- Actor: Student / Company / System / Admin
- Note if available

--------------------------------------------------
FILTERS AND VIEW OPTIONS
--------------------------------------------------

Add filters above the kanban:

- All Applications
- Active Only
- Interviews
- Matched
- In Training
- Archived

Add search:
Search by company, opportunity, or status...

Add sort:
- Recently Updated
- Highest Match
- Interview Date
- Application Date

--------------------------------------------------
NOTIFICATIONS CONNECTION
--------------------------------------------------

Create/update notifications for status changes:

Student notifications:
- Application submitted
- You were shortlisted
- Interview invitation received
- Interview scheduled
- Offer received
- Offer accepted
- You are now matched
- Training started
- You are now In Training
- Admin released your status

Company notifications:
- Student applied
- Student accepted interview
- Student accepted offer
- Student started training
- Student status changed

--------------------------------------------------
SAMPLE DATA
--------------------------------------------------

Use these sample cards:

Applied:
Data Science Intern
Company: DataPulse
Match Score: 65%
Applied: May 12, 2026
Next Step: Waiting for review

Shortlisted:
Backend Systems Intern
Company: TechNova
Match Score: 89%
Status: Shortlisted
Next Step: Waiting for interview invite

Interview:
Frontend Engineering Intern
Company: Stellar Cloud
Match Score: 94%
Interview: May 18, 10:00 AM

Interview:
Product Design Training
Company: BrightLabs
Match Score: 82%
Interview: May 22, 11:30 AM

Matched:
UX Research Intern
Company: GreenSoft
Match Score: 86%
Offer accepted: May 21, 2026
Training start: June 01, 2026

In Training:
Only show in example state if toggled:
Frontend Engineering Intern
Company: Stellar Cloud
Training started: June 01, 2026
Status: In Training

--------------------------------------------------
BUSINESS LOGIC
--------------------------------------------------

The system must track workflow status for each student application.

Allowed normal flow:
Applied → Shortlisted → Interview → Matched → In Training

Other possible paths:
Applied → Rejected
Shortlisted → Rejected
Interview → Rejected
Matched → Released
In Training → Released / Completed

Rules:
- Multiple interviews are allowed at the same time.
- Student can apply to multiple opportunities while Active, Applied, Shortlisted, Interview, or Matched.
- Matched means offer accepted or initial agreement, but not locked yet.
- In Training means official training started and student is locked.
- Only In Training blocks applications.
- Only In Training hides student from company search.
- Admin can release student if needed.

--------------------------------------------------
DESIGN QUALITY
--------------------------------------------------

Do not keep the page as a simple empty kanban board.

Make it a complete workflow tracking page with:
- Status summary
- Clear workflow rule alert
- Kanban columns
- Multiple interview cards
- Application details drawer
- Status timeline
- Status guide
- Matched flow
- In Training restriction flow
- Company visibility rules
- Notifications connection

The student should immediately understand:
- Where each application stands
- What actions are available
- Whether they are still available
- When they become locked
- Why In Training is different from Matched

Keep the UI clean, dark, blue, professional, and connected to the AI-assisted matching system.

