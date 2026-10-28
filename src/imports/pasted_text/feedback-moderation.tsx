Add a new Admin page called “Feedback Moderation” to the Admin Portal.

Purpose:
The system shall allow admin to review, approve, reject, hide, or remove inappropriate public feedback submitted by students about companies after completing training.

This page is for moderating student feedback before it becomes visible publicly on company profiles or platform pages.

Keep the same current Admin Portal style:
- Dark navy dashboard
- Blue as the primary color
- Same sidebar and top navigation
- Professional SaaS admin UI
- Clean cards, tables, badges, filters, and modals
- Support light/dark mode if available

Add this page to the Admin sidebar:
Feedback Moderation

Place it near:
- Disputes
- Reports
- Audit Logs

--------------------------------------------------
PAGE TITLE
--------------------------------------------------

Title:
Feedback Moderation

Subtitle:
Review student feedback about companies before it becomes publicly visible.

Add a short info alert:
Student feedback submitted after training must be reviewed by admin to prevent inappropriate, unfair, offensive, or misleading public reviews.

--------------------------------------------------
SUMMARY CARDS
--------------------------------------------------

At the top, add 5 summary cards:

1. Pending Reviews
Number: 18
Description: Feedback waiting for admin review

2. Approved This Month
Number: 42
Description: Published feedback

3. Rejected
Number: 6
Description: Not approved for public display

4. Hidden Feedback
Number: 9
Description: Hidden from public view

5. Flagged as Inappropriate
Number: 4
Description: Needs urgent moderation

Use colored badges:
- Pending = blue/orange
- Approved = green
- Rejected = red
- Hidden = gray
- Flagged = red/orange

--------------------------------------------------
FILTERS SECTION
--------------------------------------------------

Add a search and filter section with:

Search input:
Search feedback by student, company, opportunity, or keywords...

Filters:
- Feedback Status
- Rating
- Company
- Opportunity
- Date Range
- Flagged Content
- Visibility

Feedback Status options:
- Pending Review
- Approved
- Rejected
- Hidden
- Removed
- Flagged

Rating options:
- 1 Star
- 2 Stars
- 3 Stars
- 4 Stars
- 5 Stars

Visibility options:
- Public
- Hidden
- Admin Only
- Removed

Add buttons:
- Clear Filters
- Export Feedback Report

--------------------------------------------------
FEEDBACK TABLE
--------------------------------------------------

Create a professional moderation table with these columns:

- Feedback ID
- Student
- Company
- Opportunity
- Rating
- Feedback Preview
- Status
- Visibility
- Submitted Date
- Flags
- Actions

Use realistic sample rows:

Row 1:
Feedback ID: FB-2041
Student: Alex Chen
Company: Stellar Cloud
Opportunity: Frontend Engineering Intern
Rating: 4.5
Feedback Preview: “The training was useful and the mentor helped me improve React and teamwork skills...”
Status: Pending Review
Visibility: Not Published
Submitted Date: May 18, 2026
Flags: None
Actions: View / Approve / Reject

Row 2:
Feedback ID: FB-2042
Student: Sarah Miller
Company: TechNova
Opportunity: Backend Systems Intern
Rating: 2.0
Feedback Preview: “The company was unorganized and the tasks were unclear...”
Status: Flagged
Visibility: Not Published
Submitted Date: May 19, 2026
Flags: Negative Tone
Actions: View / Approve / Reject / Hide

Row 3:
Feedback ID: FB-2043
Student: Marcus Johnson
Company: BrightLabs
Opportunity: Product Design Intern
Rating: 1.0
Feedback Preview: “This company is terrible and nobody should work with them...”
Status: Flagged
Visibility: Not Published
Submitted Date: May 20, 2026
Flags: Possible Inappropriate Language
Actions: View / Reject / Remove

Row 4:
Feedback ID: FB-2044
Student: Elena Rodriguez
Company: DataPulse
Opportunity: Data Science Intern
Rating: 5.0
Feedback Preview: “Great training experience. I learned Python, dashboards, and real data analysis workflows...”
Status: Approved
Visibility: Public
Submitted Date: May 12, 2026
Flags: None
Actions: View / Hide

--------------------------------------------------
BADGES
--------------------------------------------------

Use clear colored badges:

Status badges:
- Pending Review = blue
- Approved = green
- Rejected = red
- Hidden = gray
- Removed = dark red
- Flagged = orange/red

Visibility badges:
- Public = green
- Not Published = orange
- Hidden = gray
- Admin Only = blue/gray
- Removed = red

Flag badges:
- None
- Offensive Language
- Personal Attack
- Misleading Claim
- Negative Tone
- Spam
- Needs Context

--------------------------------------------------
FEEDBACK DETAILS DRAWER / MODAL
--------------------------------------------------

When admin clicks “View”, open a right-side drawer or modal called:

Feedback Review Details

Include these sections:

A. Feedback Summary
- Feedback ID
- Current status
- Visibility
- Submitted date
- Rating
- Flag status

B. Student Information
- Student name
- University / major
- Email
- Training status
- Previous feedback count

C. Company Information
- Company name
- Verification status
- Contact person
- Company rating average
- Previous public feedback count

D. Related Training Opportunity
- Opportunity title
- Training start date
- Training end date
- Final workflow status
- Match score

E. Public Feedback Content
Show the full feedback submitted by the student.

Fields:
- Overall rating
- Training quality rating
- Mentorship rating
- Task clarity rating
- Learning value rating
- Written feedback
- Strengths of company
- Improvement suggestions
- Would recommend this company? Yes/No

F. Moderation Flags
Show any detected issues:
- Offensive language
- Personal attack
- Too vague
- Misleading claim
- Contains private information
- Aggressive tone
- Needs admin review

G. Admin Notes
Textarea:
Write internal moderation notes...

Button:
Save Note

--------------------------------------------------
ADMIN ACTIONS
--------------------------------------------------

Add clear admin action buttons:

Primary actions:
- Approve & Publish
- Reject Feedback
- Hide Feedback
- Remove Feedback

Secondary actions:
- Request Edit from Student
- Contact Student
- Contact Company
- Mark as Safe
- Mark as Inappropriate

Important action behavior:

Approve & Publish:
Makes the feedback visible publicly on the company profile.

Reject Feedback:
Feedback is not published, but remains stored in admin records.

Hide Feedback:
Feedback was previously public but is now hidden from public view.

Remove Feedback:
Feedback is removed from public/admin moderation view except audit logs.

Request Edit from Student:
Sends feedback back to the student to rewrite it in a more professional way.

--------------------------------------------------
MODERATION DECISION FORM
--------------------------------------------------

Add a decision form inside the drawer/modal:

Decision:
- Approve and publish
- Reject
- Hide
- Remove
- Request edit from student

Reason:
- Inappropriate language
- Personal attack
- Misleading or unverified claim
- Contains private information
- Spam or irrelevant
- Too vague
- Approved as appropriate

Admin comment:
Explain the moderation decision...

Checkbox:
Notify student about this decision

Checkbox:
Notify company if feedback is approved and published

Button:
Submit Decision

--------------------------------------------------
PUBLIC PREVIEW CARD
--------------------------------------------------

Inside the details drawer, add a “Public Preview” card showing how the feedback will appear on the company profile if approved.

Preview should include:
- Student first name only
- Company name
- Opportunity title
- Rating
- Feedback text
- Date
- “Verified Training Experience” badge

Important:
Do not show private student contact information in the public preview.

--------------------------------------------------
EMPTY STATE
--------------------------------------------------

If there is no feedback to review, show an empty state:

Title:
No feedback waiting for review

Message:
All public feedback submissions have been reviewed.

Button:
View Approved Feedback

--------------------------------------------------
SUCCESS / WARNING MODALS
--------------------------------------------------

Create confirmation modals for important actions:

Approve confirmation:
Title:
Publish feedback?

Message:
This feedback will become publicly visible on the company profile.

Buttons:
Cancel / Approve & Publish

Reject confirmation:
Title:
Reject feedback?

Message:
This feedback will not be visible publicly, but it will remain stored for admin records.

Buttons:
Cancel / Reject Feedback

Remove confirmation:
Title:
Remove feedback?

Message:
This action will remove the feedback from moderation views and keep only an audit log record.

Buttons:
Cancel / Remove Feedback

Request edit confirmation:
Title:
Request student edit?

Message:
The student will be asked to rewrite the feedback before it can be reviewed again.

Buttons:
Cancel / Send Request

--------------------------------------------------
AUDIT LOG CONNECTION
--------------------------------------------------

Show a small audit history section in the feedback details:

Audit History:
- Feedback submitted by student
- Flagged by system
- Reviewed by admin
- Decision submitted
- Visibility changed

Each log item should show:
- Date/time
- Actor
- Action
- Note

--------------------------------------------------
IMPORTANT DESIGN REQUIREMENTS
--------------------------------------------------

This page must feel like a real admin moderation tool.

Do not make it a placeholder.
Do not make it only a simple table.
Include:
- Summary cards
- Filters
- Feedback table
- Details drawer/modal
- Moderation decision form
- Public preview
- Admin notes
- Audit history
- Confirmation modals
- Empty state

Use blue as the primary action color.
Use red carefully for dangerous actions like Remove or Reject.
Use green for Approve/Published.
Use orange for Pending/Flagged.
Use gray for Hidden.

The page should clearly support this requirement:
“The system shall allow admin to review, hide, or remove inappropriate public feedback.”

Make the page consistent with the existing InternMatch AI Admin Portal design.