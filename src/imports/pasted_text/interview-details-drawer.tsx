Update the Company Portal → Interview Schedule page.

Make the “View Details” button on each interview card fully functional.

Current context:
The company is viewing scheduled interviews.
Each interview card has a “View Details” button.
When clicked, it should open a complete Interview Details drawer or modal.

Keep the current InternMatch AI dark blue SaaS style:
- Dark navy background
- Blue primary action color
- Same sidebar and top navigation
- Same cards, typography, spacing, icons, and rounded corners
- Professional company portal UI

--------------------------------------------------
VIEW DETAILS BUTTON
--------------------------------------------------

When the company clicks “View Details” on an interview card, open a right-side drawer.

Drawer title:
Interview Details

Subtitle:
Review interview information, candidate context, response status, and next actions.

Add close X button.

--------------------------------------------------
INTERVIEW SUMMARY
--------------------------------------------------

Show a top summary card:

Candidate:
Alex Chen

Opportunity:
Frontend Engineering Intern

Interview Status:
Scheduled

Match Score:
94%

Interview Type:
Video Call

Date:
2026-05-18

Time:
10:00 AM

Duration:
60 minutes

Interviewer:
Sarah Park

Meeting Link:
https://meet.example.com/abc123

Status badge colors:
- Scheduled = green
- Pending Response = orange
- Accepted = green
- Rejected = red
- Reschedule Requested = purple/orange
- Completed = blue
- Cancelled = gray/red

--------------------------------------------------
CANDIDATE INFORMATION
--------------------------------------------------

Section title:
Candidate Information

Show:
- Student name: Alex Chen
- University: Stanford University
- Major: Computer Science
- Graduation year: 2026
- Location: California, USA
- Profile strength: 92%
- Availability: Available Now
- Top skills:
  - React
  - TypeScript
  - Node.js
- Soft skills:
  - Communication
  - Teamwork
  - Problem Solving

Buttons:
- View Full Profile
- Message Student

--------------------------------------------------
AI MATCH CONTEXT
--------------------------------------------------

Section title:
AI Match Context

Show:
Overall Match Score:
94%

Breakdown:
- Technical Match: 96%
- Soft Skills Match: 88%
- Interests Match: 92%
- Behavioral Fit: 90%

Why this interview was recommended:
Alex strongly matches the Frontend Engineering Intern role because of React, TypeScript, and Web Development interest.

Possible gaps:
- SQL
- Backend Concepts

--------------------------------------------------
INVITATION DETAILS
--------------------------------------------------

Section title:
Invitation Details

Show:
- Invitation sent: 2026-05-16 14:30
- Sent by: Stellar Cloud
- Student response: Accepted / Pending Response / Rejected
- Response date if available
- Reminder status:
  - 24h reminder scheduled
  - 1h reminder scheduled

Invitation message:
Hello Alex,

We reviewed your profile and would like to invite you to an interview for the Frontend Engineering Intern position. Please review the interview details and confirm whether the time works for you.

Best regards,
Stellar Cloud

--------------------------------------------------
INTERVIEW TIMELINE
--------------------------------------------------

Section title:
Interview Timeline

Show vertical timeline:

- Interview invitation created
  2026-05-16 14:30

- Invitation sent to student
  2026-05-16 14:31

- Student viewed invitation
  2026-05-16 15:10

- Student accepted invitation
  2026-05-16 16:05

- Reminder scheduled
  2026-05-17 10:00

- Interview scheduled
  2026-05-18 10:00

Future faded steps:
- Interview completed
- Feedback submitted
- Candidate moved to next stage

--------------------------------------------------
INTERVIEW NOTES
--------------------------------------------------

Section title:
Interview Notes

Add private notes area:

Internal Notes:
Textarea placeholder:
Add private notes for the interviewer. These notes are not visible to the student.

Button:
Save Notes

Show previous note example:
Sarah Park: Focus on React component structure, API handling, and communication style.

--------------------------------------------------
INTERVIEW EVALUATION AFTER COMPLETION
--------------------------------------------------

If interview status is Completed, show evaluation section:

Section title:
Interview Evaluation

Fields:
- Technical Performance: 1-5
- Communication: 1-5
- Problem Solving: 1-5
- Culture Fit: 1-5
- Recommendation:
  - Move to Matched
  - Keep in Interview
  - Reject
  - Request second interview

Button:
Submit Evaluation

If interview is not completed yet, show disabled message:
Evaluation becomes available after the interview is marked as completed.

--------------------------------------------------
ACTION BUTTONS
--------------------------------------------------

At bottom of drawer, add action buttons depending on status.

For Scheduled / Accepted:
- Join Meeting
- Reschedule
- Cancel Interview
- Mark as Completed
- Message Student

For Pending Response:
- Send Reminder
- Reschedule
- Cancel Interview
- Message Student

For Reschedule Requested:
- Review Reschedule Request
- Accept New Time
- Propose Different Time
- Cancel Interview

For Completed:
- Provide Feedback
- Move to Matched
- Reject Candidate
- View Evaluation

For Cancelled:
- Schedule Again
- View History

--------------------------------------------------
RESCHEDULE FLOW
--------------------------------------------------

When clicking Reschedule:

Open modal:
Title:
Reschedule Interview

Fields:
- New Date
- New Time
- Duration
- Interview Type
- Meeting link/location
- Message to student

Buttons:
- Cancel
- Send Reschedule Request

After submit:
Status becomes Reschedule Requested or Pending Response.
Add timeline event:
Company requested interview reschedule.

--------------------------------------------------
CANCEL FLOW
--------------------------------------------------

When clicking Cancel Interview:

Show confirmation modal:

Title:
Cancel Interview?

Message:
This interview will be cancelled and the student will be notified.

Reason dropdown:
- Schedule conflict
- Candidate no longer suitable
- Position closed
- Interviewer unavailable
- Other

Textarea:
Additional message to student optional

Buttons:
- Keep Interview
- Cancel Interview

After cancel:
Status becomes Cancelled.
Add timeline event:
Interview cancelled by company.

--------------------------------------------------
MARK AS COMPLETED FLOW
--------------------------------------------------

When clicking Mark as Completed:

Show confirmation modal:

Title:
Mark Interview as Completed?

Message:
This will mark the interview as completed and allow you to submit feedback or move the candidate to the next stage.

Buttons:
- Cancel
- Mark Completed

After confirmation:
- Status becomes Completed
- Completed count increases
- Evaluation section becomes active
- Show action buttons:
  - Provide Feedback
  - Move to Matched
  - Reject Candidate

--------------------------------------------------
SEND REMINDER FLOW
--------------------------------------------------

When clicking Send Reminder:

Show confirmation modal:

Title:
Send Interview Reminder?

Message:
A reminder will be sent to the student with the interview date, time, and meeting/location details.

Buttons:
- Cancel
- Send Reminder

After send:
Show success toast:
Reminder sent successfully.

Add timeline event:
Reminder sent to student.

--------------------------------------------------
VIEW FULL PROFILE CONNECTION
--------------------------------------------------

When clicking “View Full Profile” inside the details drawer:
Open the student profile drawer/page.

The profile should include:
- Student info
- Match analysis
- Skills
- Interests
- Behavioral profile
- Public feedback about student
- Recruitment activity
- Internal notes

--------------------------------------------------
BUSINESS LOGIC
--------------------------------------------------

The View Details drawer should show:
- Interview information
- Candidate information
- Match score and explanation
- Invitation status
- Timeline
- Notes
- Actions based on status

The system should:
- Track interview status
- Allow reschedule
- Allow cancellation
- Allow reminders
- Allow completion
- Allow feedback after completion
- Keep timeline history
- Keep student available unless they become In Training

Important:
Interview status does not lock the student.
Multiple interviews are allowed at the same time.
Only In Training locks the student.

--------------------------------------------------
DESIGN QUALITY
--------------------------------------------------

Do not make View Details open a placeholder.
Make it a complete interview management drawer.

The drawer should help the company answer:
- Who is this candidate?
- Why are they a good match?
- What is the interview status?
- Has the student responded?
- What actions can I take next?
- What happened in the timeline?

Keep the UI clean, dark, blue, professional, and connected to the AI-assisted matching system.

Update the Company Portal → Interview Schedule page.

Make the “Reschedule” button on each interview card fully functional.

Current context:
The company is viewing interview cards in the Interview Schedule page.
Each scheduled interview has a “Reschedule” button.
When clicked, it should open a professional reschedule interview flow.

This must support the company’s ability to manage interview invitations and update interview details.

Keep the current InternMatch AI dark blue SaaS style:
- Dark navy background
- Blue primary action color
- Same sidebar and top navigation
- Same cards, typography, spacing, icons, and rounded corners
- Professional company portal UI

--------------------------------------------------
RESCHEDULE BUTTON
--------------------------------------------------

When the company clicks “Reschedule”, open a centered modal or right-side drawer.

Title:
Reschedule Interview

Subtitle:
Choose a new interview time and notify the student.

Show selected interview summary at the top:

Candidate:
Alex Chen

Opportunity:
Frontend Engineering Intern

Current Status:
Scheduled

Current Interview:
May 18, 2026 — 10:00 AM — 60 minutes

Interview Type:
Video Call

Interviewer:
Sarah Park

Current Meeting Link:
https://meet.example.com/abc123

Match Score:
94%

--------------------------------------------------
RESCHEDULE FORM
--------------------------------------------------

Fields:

1. New Interview Date
Date picker

2. New Interview Time
Time picker

3. Duration
Dropdown:
- 30 minutes
- 45 minutes
- 60 minutes
- 90 minutes

Default:
60 minutes

4. Interview Type
Dropdown:
- Video Call
- On-site
- Phone Call

Default:
Video Call

5. Interviewer
Dropdown:
- Sarah Park
- John Smith
- Hiring Team
- Add new interviewer

6. Meeting Link / Location

If Video Call is selected:
Show input:
New meeting link

Placeholder:
https://meet.example.com/new-link

If On-site is selected:
Show input:
Office location

Placeholder:
Building A, Room 301

If Phone Call is selected:
Show input:
Phone number

7. Timezone
Dropdown:
- Company timezone
- Student timezone
- UTC

8. Reason for Rescheduling
Dropdown:
- Interviewer unavailable
- Schedule conflict
- Student requested new time
- Need more preparation time
- Company calendar change
- Other

9. Message to Student
Textarea with default message:

Hello Alex,

We need to reschedule your interview for the Frontend Engineering Intern position. Please review the updated interview details and confirm whether the new time works for you.

Best regards,
Stellar Cloud

10. Notification Options
Checkboxes:
- Send email notification to student
- Send platform notification to student
- Update company calendar
- Send reminder 24 hours before interview
- Send reminder 1 hour before interview

--------------------------------------------------
VALIDATION
--------------------------------------------------

Add validation messages:

- New date is required.
- New time is required.
- Duration is required.
- Meeting link is required for video calls.
- Location is required for on-site interviews.
- Phone number is required for phone interviews.
- Reason for rescheduling is required.
- Message to student cannot be empty.

Also show warning if the selected new time is in the past:
Interview time must be in the future.

--------------------------------------------------
ACTION BUTTONS
--------------------------------------------------

Buttons:
- Cancel
- Preview Changes
- Send Reschedule Request

Primary button:
Send Reschedule Request

--------------------------------------------------
PREVIEW CHANGES
--------------------------------------------------

When clicking “Preview Changes”, show a before/after comparison inside the modal:

Before:
May 18, 2026 — 10:00 AM — 60 minutes
Video Call
Sarah Park
https://meet.example.com/abc123

After:
May 20, 2026 — 2:00 PM — 60 minutes
Video Call
Sarah Park
https://meet.example.com/new-link

Show note:
The student will be notified and asked to confirm the new time.

--------------------------------------------------
SEND RESCHEDULE REQUEST FLOW
--------------------------------------------------

When clicking “Send Reschedule Request”, show confirmation modal:

Title:
Send Reschedule Request?

Message:
This will update the interview status to “Reschedule Requested” and notify the student with the new proposed time.

Buttons:
- Cancel
- Send Request

After confirmation:
Show success modal:

Title:
Reschedule Request Sent

Message:
The student has been notified about the proposed new interview time. The interview will remain pending until the student accepts or requests another time.

Show summary:
- Candidate: Alex Chen
- Opportunity: Frontend Engineering Intern
- New Date: May 20, 2026
- New Time: 2:00 PM
- Interview Type: Video Call
- Status: Reschedule Requested

Buttons:
- View Interview
- Back to Interviews

--------------------------------------------------
UPDATE INTERVIEW CARD AFTER RESCHEDULE
--------------------------------------------------

After sending the request, update the interview card:

Status badge:
Reschedule Requested

Show:
- Proposed new date
- Proposed new time
- Interview type
- Interviewer
- Message:
Waiting for student confirmation

Actions:
- View Details
- Send Reminder
- Cancel

Do not show “Join Meeting” until the student accepts the new time.

--------------------------------------------------
STUDENT SIDE CONNECTION
--------------------------------------------------

Also update the Student Portal → Invitations page.

When a company sends a reschedule request, the student should see a card:

Title:
Interview Reschedule Request

Company:
Stellar Cloud

Opportunity:
Frontend Engineering Intern

Current Interview:
May 18, 2026 — 10:00 AM

Proposed New Time:
May 20, 2026 — 2:00 PM

Company Message:
We need to reschedule your interview. Please review the updated details and confirm whether the new time works for you.

Student actions:
- Accept New Time
- Reject Request
- Propose Another Time

--------------------------------------------------
STUDENT ACCEPT NEW TIME
--------------------------------------------------

When student clicks “Accept New Time”:

Show confirmation:
Accept rescheduled interview time?

After confirmation:
- Student status remains Interview
- Interview status becomes Scheduled / Accepted
- Company gets notification:
Student accepted the rescheduled interview time.
- Interview card updates with new time
- Join Meeting button becomes visible again

--------------------------------------------------
STUDENT REJECT REQUEST
--------------------------------------------------

When student clicks “Reject Request”:

Ask for optional reason:
- Time not suitable
- No longer interested
- Already have another interview
- Other

After submit:
- Interview status becomes Reschedule Rejected
- Company gets notification
- Company can propose another time or cancel

--------------------------------------------------
STUDENT PROPOSE ANOTHER TIME
--------------------------------------------------

When student clicks “Propose Another Time”:

Open form:
- Preferred date
- Preferred time
- Message to company

After submit:
- Interview status becomes Student Proposed New Time
- Company gets notification
- Company can accept or propose another time

--------------------------------------------------
INTERVIEW DETAILS TIMELINE
--------------------------------------------------

Update the Interview Details drawer timeline.

Add events:

- Interview originally scheduled
- Company requested reschedule
- Student notified
- Student accepted new time
or
- Student rejected request
or
- Student proposed another time

Each timeline item should show:
- Date/time
- Actor: Company / Student / System
- Action
- Note

--------------------------------------------------
STATUS BADGES
--------------------------------------------------

Use these status badges:

- Scheduled = green
- Pending Response = orange
- Reschedule Requested = purple/orange
- Student Proposed New Time = purple
- Reschedule Rejected = red
- Accepted = green
- Cancelled = gray/red
- Completed = blue/green

--------------------------------------------------
BUSINESS LOGIC
--------------------------------------------------

The company can:
- Reschedule scheduled interviews
- Propose a new date/time
- Notify student
- Wait for student confirmation
- Send reminder
- Cancel if needed

The student can:
- Accept new time
- Reject request
- Propose another time

The system should:
- Update interview status
- Keep old and new interview details in history
- Notify both sides
- Prevent joining until new time is accepted
- Keep student in Interview workflow stage
- Keep student available to other opportunities

Important:
Rescheduling an interview does not lock the student.
Interview status does not make the student unavailable.
Only In Training locks the student.

--------------------------------------------------
DESIGN QUALITY
--------------------------------------------------

Do not make the Reschedule button inactive.
Do not open a placeholder.

Create a complete rescheduling flow:
- Reschedule modal/drawer
- Current interview summary
- New interview form
- Preview changes
- Confirmation
- Success state
- Updated interview card
- Student response actions
- Timeline update

Keep the UI clean, dark, blue, professional, and connected to the interview management workflow.