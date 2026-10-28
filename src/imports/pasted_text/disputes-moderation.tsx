Replace the current “Admin Page Placeholder” in the Admin → Disputes page with a complete professional “Disputes & Moderation” management screen.

Keep the current dark admin dashboard style:
- Dark navy background
- Blue as the primary color
- Same sidebar and top navigation
- Same spacing, typography, icons, and card style
- Professional SaaS dashboard look

Page title:
Disputes & Moderation

Subtitle:
Review and resolve issues between students and companies.

Create the page content as follows:

1. Summary Cards Section
Add 4 cards at the top:
- Open Disputes: 12
- High Priority: 4
- Pending Review: 7
- Resolved This Month: 28

Each card should have:
- Icon
- Number
- Label
- Small trend/change indicator
- Dark card background
- Blue/green/orange/red accent based on meaning

2. Filters Section
Add a filter/search bar area with:
- Search input: “Search disputes...”
- Dispute Type dropdown
- Priority dropdown
- Status dropdown
- Date range filter
- Clear Filters button

Dispute Type options:
- Status Dispute
- Feedback Dispute
- Company Misuse
- Student Misuse
- Verification Issue
- Training Issue

Priority options:
- Low
- Medium
- High
- Critical

Status options:
- Open
- Under Review
- Waiting Response
- Resolved
- Rejected

3. Disputes Table
Create a professional table with these columns:
- Dispute ID
- Type
- Student
- Company
- Opportunity
- Priority
- Status
- Created Date
- Assigned Admin
- Actions

Use realistic sample data:
Row 1:
Dispute ID: D-1024
Type: Status Dispute
Student: Alex Chen
Company: Stellar Cloud
Opportunity: Frontend Engineering Intern
Priority: High
Status: Under Review
Created Date: May 12, 2026
Assigned Admin: System Admin
Actions: View / Assign / Resolve

Row 2:
Dispute ID: D-1025
Type: Feedback Dispute
Student: Sarah Miller
Company: TechNova
Opportunity: Backend Systems Intern
Priority: Medium
Status: Open
Created Date: May 14, 2026
Assigned Admin: Unassigned
Actions: View / Assign / Resolve

Row 3:
Dispute ID: D-1026
Type: Training Issue
Student: Marcus Johnson
Company: BrightLabs
Opportunity: Product Design Intern
Priority: Critical
Status: Waiting Response
Created Date: May 15, 2026
Assigned Admin: System Admin
Actions: View / Assign / Resolve

Row 4:
Dispute ID: D-1027
Type: Company Misuse
Student: Elena Rodriguez
Company: DataPulse
Opportunity: Data Science Intern
Priority: High
Status: Open
Created Date: May 16, 2026
Assigned Admin: Unassigned
Actions: View / Assign / Resolve

Use colored badges:
- Critical = red
- High = orange/red
- Medium = yellow
- Low = green/gray
- Open = blue
- Under Review = purple/blue
- Waiting Response = orange
- Resolved = green
- Rejected = gray/red

4. Dispute Details Side Panel / Modal
When clicking “View”, create a right-side details drawer or modal.

Title:
Dispute Details

Include these sections:

A. Case Summary
- Dispute ID
- Type
- Priority
- Current Status
- Submitted By
- Submitted Date

B. Student Information
- Name
- Email
- Current status
- Related application status

C. Company Information
- Company name
- Verification status
- Contact person
- Email

D. Related Opportunity
- Opportunity title
- Match score
- Current workflow stage

E. Issue Description
Example text:
“The student says the company marked them as In Training by mistake before the training officially started.”

F. Dispute Timeline
Show a vertical timeline:
- Application submitted
- Student shortlisted
- Interview scheduled
- Offer marked as Matched
- Company changed status to In Training
- Student opened dispute
- Admin started review

G. Admin Notes
Add a textarea:
“Write internal admin notes about this dispute...”
Button: Save Note

H. Resolution Decision Form
Fields:
- Decision dropdown:
  - Resolved in favor of student
  - Resolved in favor of company
  - No action needed
  - Escalate case
- Action Taken dropdown:
  - Student released
  - Company warned
  - Feedback hidden
  - Account suspended
  - Status corrected
- Resolution comment textarea:
  “Explain the final admin decision...”

I. Admin Action Buttons
Add action buttons:
- Resolve Dispute
- Reject Dispute
- Contact Student
- Contact Company
- Release Student Status
- Suspend Company
- Suspend Student
- Change Priority

Important:
Highlight “Release Student Status” as a key action because only “In Training” should hard-lock a student, and admin must be able to release the student if the status was applied unfairly or by mistake.

5. Empty State
Also design an empty state for when there are no disputes:
Title:
No disputes found

Message:
There are currently no active disputes matching your filters.

Button:
Clear Filters

6. UX Best Practices
Make the UI clean, readable, and professional.
Do not make it look like a placeholder.
Do not remove the sidebar or top bar.
Use strong spacing and clear hierarchy.
Use blue as the main action color.
Use badges, cards, table rows, and a details drawer.
Make the page feel like a real admin moderation tool for an AI-assisted internship matching platform.