Update the Company Portal → Feedback page and create a complete two-way feedback system.

The feedback system must support these requirements:

1. The system shall allow companies to submit private feedback to students.
2. The system shall allow companies to submit public feedback about students.
3. The system shall allow companies to view public feedback about students.
4. The system shall allow users to view public feedback about companies.

Important concept:
There are two different types of feedback:

A. Company → Student Feedback
The company writes feedback about a student.
This can be:
- Private feedback: visible only to the student, company, and admin.
- Public feedback: visible on the student public profile after admin moderation if needed.

B. Student → Company Feedback
The student writes feedback about the company after training.
This can be public and visible on the company profile, but should be reviewed/moderated by admin before becoming publicly visible.

Keep the current InternMatch AI style:
- Dark navy SaaS dashboard
- Blue primary color
- Same sidebar and top navigation
- Same cards, buttons, typography, spacing, and rounded corners
- Professional, clean, AI-assisted platform feeling
- Support light and dark mode if available

--------------------------------------------------
COMPANY FEEDBACK PAGE STRUCTURE
--------------------------------------------------

Replace the current simple “Provide Student Feedback” page with a complete Feedback Center.

Page title:
Feedback Center

Subtitle:
Submit feedback to students, publish professional reviews, and view feedback received from students.

Add top tabs:

1. Provide Feedback
2. Student Public Feedback
3. Feedback From Students
4. Feedback History

--------------------------------------------------
TAB 1: PROVIDE FEEDBACK
--------------------------------------------------

Purpose:
Company submits feedback about students after review, interview, rejection, or training completion.

Add an info alert:
Your feedback helps students improve their skills and helps the platform generate better future match recommendations.

Section 1: Select Student

Show selectable student cards:
- Alex Chen
  Opportunity: Frontend Engineering Intern
  Status: Interview Completed
  Match Score: 94%
  Date: 2026-05-16

- Sarah Johnson
  Opportunity: Frontend Engineering Intern
  Status: Training Completed
  Match Score: 91%
  Date: 2026-05-10

- Michael Zhang
  Opportunity: Backend Systems Intern
  Status: Rejected After Interview
  Match Score: 87%
  Date: 2026-05-12

When selecting a student, open/show the feedback form below.

--------------------------------------------------
COMPANY → STUDENT FEEDBACK FORM
--------------------------------------------------

Form title:
Submit Feedback for [Student Name]

Fields:

1. Related Opportunity
Dropdown:
- Frontend Engineering Intern
- Backend Systems Intern
- Product Design Training
- Data Science Intern

2. Feedback Stage
Dropdown:
- Profile Review Feedback
- Interview Feedback
- Rejection Feedback
- Training Feedback
- General Performance Feedback

3. Feedback Visibility
Radio cards:

Option 1:
Private Feedback to Student
Description:
Visible only to the student, this company, and admin. Used for constructive improvement and skill guidance.

Option 2:
Public Feedback About Student
Description:
May appear on the student public profile after review. Use only professional and appropriate feedback.

Important:
Make the selected visibility very clear using badges:
- Private
- Public Pending Review

4. Overall Rating
Star rating or score from 1 to 5

5. Technical Performance
Rating from 1 to 5

6. Soft Skills
Rating from 1 to 5

7. Communication
Rating from 1 to 5

8. Learning Ability
Rating from 1 to 5

9. Strengths Observed
Multi-select chips:
- React
- TypeScript
- Problem Solving
- Communication
- Teamwork
- Fast Learning
- Clean Code
- Design Thinking
- Time Management
- Professional Attitude

10. Improvement Areas
Multi-select chips:
- SQL
- API Integration
- Testing
- Git Workflow
- Time Management
- Communication
- Documentation
- System Design
- Confidence
- Task Estimation

11. Recommended Skills
Multi-select chips:
- PostgreSQL
- REST APIs
- Docker
- Unit Testing
- Agile Workflow
- Cloud Basics
- UI/UX Research
- Data Visualization

12. Written Feedback
Textarea placeholder:
Write clear and constructive feedback that helps the student improve...

13. Private Internal Notes
Textarea placeholder:
Internal company notes, not visible to the student.

14. Checkbox:
I confirm this feedback is professional, respectful, and accurate.

Buttons:
- Cancel
- Save Draft
- Submit Feedback

--------------------------------------------------
FEEDBACK VISIBILITY BEHAVIOR
--------------------------------------------------

If Private Feedback is selected:
After submit, show success modal:

Title:
Private Feedback Sent

Message:
Your feedback has been sent privately to the student and will help improve their future match recommendations.

Buttons:
- View Feedback History
- Submit Another Feedback

Status:
Private / Sent

If Public Feedback is selected:
After submit, show success modal:

Title:
Public Feedback Submitted for Review

Message:
Your public feedback about this student has been submitted and may require admin review before it appears publicly on the student profile.

Buttons:
- View Feedback History
- Submit Another Feedback

Status:
Public / Pending Review

--------------------------------------------------
TAB 2: STUDENT PUBLIC FEEDBACK
--------------------------------------------------

Purpose:
Company can view public feedback/reviews about students before inviting or hiring them.

Title:
Student Public Feedback

Subtitle:
View professional public feedback submitted by companies about students.

Add search and filters:
- Search by student name, skill, company, opportunity
- Rating
- Skill
- Feedback type
- Date
- Visibility status

Create public feedback cards:

Card 1:
Student: Alex Chen
Public Rating: 4.8
Feedback By: Stellar Cloud
Opportunity: Frontend Engineering Intern
Feedback Type: Interview Feedback
Badge: Verified Feedback
Match-related strengths:
- React
- TypeScript
- Communication
Feedback text:
Alex showed strong frontend fundamentals and communicated clearly during the interview. Recommended for frontend-focused opportunities.
Date: May 18, 2026
Actions:
- View Student Profile
- Invite to Interview

Card 2:
Student: Sarah Johnson
Public Rating: 4.6
Feedback By: TechNova
Opportunity: Backend Systems Intern
Feedback Type: Training Feedback
Badge: Verified Training Feedback
Strengths:
- Python
- Teamwork
- Fast Learning
Feedback text:
Sarah learned quickly during training and handled backend tasks with good attention to detail.
Actions:
- View Student Profile
- Invite to Interview

Important:
Do not show private feedback in this tab.
Only show feedback marked Public and approved/published.

--------------------------------------------------
TAB 3: FEEDBACK FROM STUDENTS
--------------------------------------------------

Purpose:
Company can view feedback submitted by students about this company after training.

Title:
Feedback From Students

Subtitle:
See what students said about your company after training experiences.

Add summary cards:
- Average Company Rating: 4.4
- Public Reviews: 18
- Pending Admin Review: 3
- Improvement Topics: 5

Add filters:
- Rating
- Opportunity
- Feedback status
- Date
- Public / Hidden / Pending Review

Create feedback cards from students:

Card 1:
Student: Alex Chen
Student visibility: First name + last initial or anonymous option
Opportunity: Frontend Engineering Intern
Training Status: Completed
Rating: 5.0
Status: Public
Badge: Verified Training Experience
Feedback:
The training was very useful. The mentor helped me improve React, TypeScript, and teamwork skills. Tasks were clear and the company environment was professional.
Categories:
- Mentorship: 5/5
- Task Clarity: 5/5
- Learning Value: 5/5
- Company Communication: 4/5
Date: May 20, 2026

Card 2:
Student: Sarah Johnson
Opportunity: Backend Systems Intern
Training Status: Completed
Rating: 3.5
Status: Pending Admin Review
Feedback:
The training was helpful, but some tasks needed clearer instructions and better scheduling.
Categories:
- Mentorship: 4/5
- Task Clarity: 3/5
- Learning Value: 4/5
- Company Communication: 3/5
Date: May 21, 2026

Card 3:
Student: Anonymous
Opportunity: Product Design Training
Training Status: Completed
Rating: 2.0
Status: Hidden
Feedback:
This feedback is hidden from public view after admin moderation.
Date: May 10, 2026

Actions for company:
- View Details
- Respond Publicly
- Contact Admin
- Report Feedback

Important:
Company can view feedback received from students.
Company cannot directly delete student feedback.
If feedback is unfair or inappropriate, company can report it to admin.

--------------------------------------------------
STUDENT → COMPANY FEEDBACK DETAILS
--------------------------------------------------

When company clicks “View Details”, open a drawer:

Title:
Student Feedback Details

Sections:
1. Feedback Summary
- Student name or anonymous label
- Opportunity
- Training completion date
- Rating
- Status
- Visibility

2. Category Ratings
- Training quality
- Mentorship
- Task clarity
- Learning value
- Communication
- Professionalism

3. Written Feedback
Show full student review.

4. Company Response
Textarea:
Write a professional response to this feedback...

Button:
Submit Response

5. Report Feedback
Button:
Report to Admin

If company clicks Report to Admin, open modal:
Title:
Report Feedback

Reason dropdown:
- Inappropriate language
- Misleading claim
- Personal attack
- Contains private information
- Fake or inaccurate feedback
- Other

Textarea:
Explain why this feedback should be reviewed.

Button:
Submit Report

After submit:
Show success:
Your report has been sent to admin for review.

--------------------------------------------------
TAB 4: FEEDBACK HISTORY
--------------------------------------------------

Purpose:
Company sees all feedback it has submitted to students.

Create table columns:
- Feedback ID
- Student
- Opportunity
- Feedback Type
- Visibility
- Status
- Rating
- Submitted Date
- Actions

Sample rows:

FB-3001
Student: Alex Chen
Opportunity: Frontend Engineering Intern
Feedback Type: Interview Feedback
Visibility: Private
Status: Sent
Rating: 4.5
Submitted Date: May 18, 2026
Actions: View / Edit Draft

FB-3002
Student: Sarah Johnson
Opportunity: Backend Systems Intern
Feedback Type: Training Feedback
Visibility: Public
Status: Pending Review
Rating: 4.8
Submitted Date: May 19, 2026
Actions: View

FB-3003
Student: Michael Zhang
Opportunity: Product Design Intern
Feedback Type: Rejection Feedback
Visibility: Private
Status: Sent
Rating: 3.7
Submitted Date: May 17, 2026
Actions: View

Status badges:
- Draft = gray
- Sent = green
- Pending Review = orange
- Published = blue/green
- Rejected by Admin = red
- Hidden = gray

Visibility badges:
- Private = blue
- Public = green
- Admin Review = orange

--------------------------------------------------
STUDENT PORTAL CONNECTION
--------------------------------------------------

Also update Student Portal → Feedback page.

Student should see feedback received from companies.

Create sections:
1. Private Feedback From Companies
2. Public Feedback About Me
3. Feedback I Gave to Companies

Private Feedback From Companies:
- Visible only to the student
- Includes strengths, improvement areas, recommended skills, written comments
- Used for improvement and match recalculation

Public Feedback About Me:
- Shows public approved feedback about the student
- Visible on public student profile
- Can be reported if inaccurate

Feedback I Gave to Companies:
- Shows student’s feedback submitted about companies
- Status:
  - Pending Admin Review
  - Published
  - Rejected
  - Hidden

--------------------------------------------------
PUBLIC COMPANY PROFILE CONNECTION
--------------------------------------------------

Create/update company public profile page to show public feedback from students.

Section title:
Student Reviews

Show:
- Average rating
- Review count
- Verified Training Experience badges
- Feedback cards from students
- Category ratings:
  - Mentorship
  - Task clarity
  - Learning value
  - Communication
  - Professionalism

Important:
Only show student feedback that is approved/published by admin.
Do not show pending, rejected, hidden, or removed feedback publicly.

--------------------------------------------------
PUBLIC STUDENT PROFILE CONNECTION
--------------------------------------------------

Create/update student public profile page to show public feedback from companies.

Section title:
Company Feedback

Show:
- Average public rating
- Verified feedback cards
- Feedback type
- Company name
- Opportunity
- Strengths
- Written feedback
- Date

Important:
Only show public feedback approved/published by admin.
Do not show private feedback publicly.

--------------------------------------------------
ADMIN CONNECTION
--------------------------------------------------

Connect public feedback to Admin → Feedback Moderation.

Admin should be able to review:
1. Public feedback submitted by companies about students
2. Public feedback submitted by students about companies

Admin moderation actions:
- Approve & Publish
- Reject
- Hide
- Remove
- Request Edit
- Add Admin Note

Private feedback should not require public moderation unless reported.
Public feedback should require moderation before appearing publicly.

--------------------------------------------------
BUSINESS LOGIC
--------------------------------------------------

Feedback visibility rules:

Private company feedback to student:
- Visible to student
- Visible to company that submitted it
- Visible to admin
- Not visible publicly
- Helps student improvement and AI recommendations

Public company feedback about student:
- Submitted by company
- Requires admin review before publishing
- Visible on student public profile only after approval
- Can be viewed by companies/users if public

Student feedback about company:
- Submitted by student after training completion
- Requires admin review before publishing
- Visible on company profile only after approval
- Company can view received feedback
- Company can respond or report feedback
- Company cannot delete it directly

Public feedback about companies:
- Visible to users after admin approval
- Helps students judge company quality
- Shows verified training experience badge

--------------------------------------------------
UX STATES
--------------------------------------------------

Create states:
- No students available for feedback
- No feedback received yet
- Private feedback sent
- Public feedback pending review
- Feedback published
- Feedback rejected by admin
- Feedback hidden
- Feedback reported to admin
- Company response submitted

--------------------------------------------------
DESIGN QUALITY
--------------------------------------------------

Do not keep the Feedback page as only a simple student selection list.
Make it a complete Feedback Center with tabs, forms, cards, history, and received feedback.

The page must clearly support:
- Company submits private feedback to students
- Company submits public feedback about students
- Company views public feedback about students
- Company views feedback from students about the company
- Users view public feedback about companies
- Admin moderates public feedback before it appears publicly

Use clear badges:
- Private
- Public
- Pending Review
- Published
- Hidden
- Rejected
- Reported

Make feedback feel constructive, professional, and connected to the AI-assisted matching system.