Update the Company Portal → Interviews page.

When the company clicks the “Schedule Interview” button, create a complete interview invitation flow.

This flow must satisfy the requirement:
“The system shall allow companies to invite students to interviews.”

Keep the current InternMatch AI dark blue SaaS style:
- Dark navy background
- Blue as primary action color
- Same sidebar and top navigation
- Same cards, spacing, typography, icons, and rounded corners
- Professional recruiter/company portal UI

--------------------------------------------------
SCHEDULE INTERVIEW MODAL
--------------------------------------------------

When clicking “Schedule Interview”, open a centered modal or right-side drawer.

Modal title:
Schedule Interview

Subtitle:
Invite a student to an interview for one of your opportunities.

Add close X button.

--------------------------------------------------
SECTION 1: SELECT STUDENT
--------------------------------------------------

Field:
Student

Use searchable dropdown:
Search by student name, university, skill, or match score...

Sample options:
- Alex Chen — 94% match — Computer Science — Stanford University
- Sarah Johnson — 91% match — Software Engineering — MIT
- Michael Zhang — 87% match — Computer Science — UC Berkeley
- Elena Rodriguez — 84% match — Data Science — University of Jordan

When student is selected, show a small candidate preview card:
- Avatar initials
- Student name
- University / major
- Match score
- Availability status
- Top skills
- View profile link

--------------------------------------------------
SECTION 2: SELECT OPPORTUNITY
--------------------------------------------------

Field:
Opportunity

Dropdown options:
- Frontend Engineering Intern
- Backend Systems Intern
- Data Science Intern
- Product Design Training

When opportunity is selected, show:
- Opportunity type: Internship / Training
- Current status: Active
- Required skills
- Match score with selected student

--------------------------------------------------
SECTION 3: INTERVIEW DETAILS
--------------------------------------------------

Fields:
Interview Type:
- Video Call
- On-site
- Phone Call

Interview Date:
Date picker

Interview Time:
Time picker

Duration:
Dropdown:
- 30 minutes
- 45 minutes
- 60 minutes
- 90 minutes

Interviewer:
Dropdown:
- Sarah Park
- John Smith
- Hiring Team
- Add new interviewer

Location / Meeting Link:
If Video Call:
- Meeting link input
Placeholder: https://meet.example.com/abc123

If On-site:
- Office location input
Placeholder: Building A, Room 301

If Phone Call:
- Phone number input

Timezone:
Dropdown:
- Company timezone
- Student timezone
- UTC

--------------------------------------------------
SECTION 4: INVITATION MESSAGE
--------------------------------------------------

Textarea title:
Invitation Message

Default message:
Hello [Student Name],

We reviewed your profile and would like to invite you to an interview for the [Opportunity Title] position. Please review the interview details and confirm whether the time works for you.

Best regards,
[Company Name]

Allow company to edit the message.

--------------------------------------------------
SECTION 5: INTERVIEW AGENDA / NOTES
--------------------------------------------------

Optional textarea:
Internal Interview Notes

Placeholder:
Add private notes for the interviewer. These notes are not visible to the student.

Optional checklist:
Interview Focus Areas:
- Technical skills
- Soft skills
- Project experience
- Problem solving
- Motivation and goals
- Culture fit

--------------------------------------------------
SECTION 6: NOTIFICATION SETTINGS
--------------------------------------------------

Checkboxes:
- Send email notification to student
- Send platform notification to student
- Add interview to company calendar
- Send reminder 24 hours before interview
- Send reminder 1 hour before interview

--------------------------------------------------
ACTION BUTTONS
--------------------------------------------------

Buttons:
- Cancel
- Save as Draft
- Send Interview Invitation

Primary button:
Send Interview Invitation

--------------------------------------------------
VALIDATION
--------------------------------------------------

Add validation messages:
- Student is required
- Opportunity is required
- Interview type is required
- Date is required
- Time is required
- Meeting link is required for video calls
- Location is required for on-site interviews
- Invitation message cannot be empty

--------------------------------------------------
SUCCESS STATE
--------------------------------------------------

After clicking “Send Interview Invitation”, show success modal:

Title:
Interview Invitation Sent

Message:
The student has been invited to the interview. They can accept, reject, or request a reschedule from their portal.

Show summary:
- Student name
- Opportunity
- Date
- Time
- Interview type
- Match score

Buttons:
- View Interview
- Schedule Another
- Back to Interviews

--------------------------------------------------
UPDATE INTERVIEW LIST
--------------------------------------------------

After sending the invitation, add the new interview card to the Interviews page.

Interview card should show:
- Student avatar
- Student name
- Opportunity title
- Status badge: Pending Response
- Interview date
- Interview time
- Duration
- Interview type
- Meeting link or location
- Interviewer
- Match score
- Invitation sent timestamp

Actions:
- View Details
- Reschedule
- Cancel
- Send Reminder

--------------------------------------------------
INTERVIEW STATUS LOGIC
--------------------------------------------------

Use these interview statuses:
- Draft
- Invitation Sent
- Pending Response
- Accepted
- Rejected
- Reschedule Requested
- Scheduled
- Completed
- Cancelled

Status badge colors:
- Draft = gray
- Invitation Sent = blue
- Pending Response = orange
- Accepted = green
- Rejected = red
- Reschedule Requested = purple/orange
- Scheduled = green
- Completed = blue/green
- Cancelled = gray/red

--------------------------------------------------
STUDENT SIDE CONNECTION
--------------------------------------------------

Also create/update the Student Portal → Invitations page.

When a company sends an interview invitation, the student should see an invitation card.

Student invitation card should show:
- Company name
- Opportunity title
- Match score
- Interview type
- Date
- Time
- Duration
- Meeting link or location
- Company message
- Interviewer name

Student actions:
- Accept Invitation
- Reject Invitation
- Request Reschedule
- View Opportunity

If student clicks Accept:
Show confirmation:
Interview accepted. The company will be notified.

If student clicks Reject:
Ask for optional reason:
- Time not suitable
- Not interested
- Already accepted another opportunity
- Other

If student clicks Request Reschedule:
Show form:
- Preferred date
- Preferred time
- Message to company

--------------------------------------------------
COMPANY INTERVIEW DETAILS
--------------------------------------------------

When company clicks “View Details” on an interview card, open details drawer.

Include:
- Student information
- Opportunity information
- Match score
- Interview status
- Date/time
- Type
- Meeting link/location
- Interviewer
- Invitation message
- Student response status
- Timeline

Timeline example:
- Company sent interview invitation
- Student viewed invitation
- Student accepted invitation
- Reminder sent
- Interview completed

Actions:
- Reschedule
- Cancel Interview
- Mark as Completed
- Add Interview Notes
- Give Feedback

--------------------------------------------------
BUSINESS LOGIC
--------------------------------------------------

The company can invite students to interviews from:
- Candidate Discovery page
- Candidate Profile page
- Recruitment Pipeline page
- Interviews page

After invitation is sent:
- Student receives notification
- Student invitation appears in Student Portal
- Interview appears in Company Interviews page
- Student application/workflow status updates to Interview only after student accepts or when company confirms scheduling
- Student remains available to other companies
- Multiple interviews are allowed at the same time
- Student is NOT locked by interview invitation

Important:
Interview status should not make the student unavailable.
Only “In Training” hard-locks the student.

--------------------------------------------------
DESIGN QUALITY
--------------------------------------------------

Do not make the Schedule Interview button do nothing.
Do not create a placeholder.
Create a complete professional interview invitation workflow.

The flow must clearly show:
- Company selects a student
- Company selects an opportunity
- Company chooses interview details
- Company sends invitation
- Student receives invitation
- Student can accept/reject/reschedule
- Company can track interview status

Make the UI feel like a real AI-assisted hiring workflow, not just a calendar page.
Keep compatibility scores and candidate context visible during scheduling.