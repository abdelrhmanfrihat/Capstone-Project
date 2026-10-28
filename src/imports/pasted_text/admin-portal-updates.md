Update the Admin Portal and make these admin action buttons fully functional:

1. Add New Question
2. Add Skill
3. Confirm Release & Override Status

Keep the current InternMatch AI Admin Portal style:
- Dark navy dashboard
- Blue primary actions
- Red only for dangerous/critical actions
- Same sidebar and top navigation
- Same cards, typography, spacing, icons, badges, and rounded corners
- Professional admin SaaS UI
- Clear confirmation states and validation messages

==================================================
1. ADD NEW QUESTION BUTTON
==================================================

Context:
Admin Portal → Assessment Questions page.
There is a button called “Add New Question”.

When admin clicks “Add New Question”, open a complete modal or full page for creating a new assessment question.

Modal/Page title:
Add New Assessment Question

Subtitle:
Create a question used to build student AI profiles and improve match accuracy.

--------------------------------------------------
QUESTION FORM FIELDS
--------------------------------------------------

Add these fields:

1. Question Text
Textarea placeholder:
Write the assessment question...

Example:
Which frontend tools are you most comfortable using?

2. Category
Dropdown:
- Technical Skills
- Soft Skills
- Interests
- Behavior
- Work Style
- Career Direction
- Problem Solving

3. Question Type
Dropdown:
- Multiple Choice
- Multi Select
- Rating Scale 1-5
- Long Text
- Scenario Based
- Yes / No

4. Required Toggle
- Required
- Optional

5. Status
Dropdown:
- Active
- Draft
- Archived

6. Options Section
This section changes based on question type.

If Multiple Choice or Multi Select:
Show option inputs:
- Option 1
- Option 2
- Option 3
- Add Option button
- Remove option icon

Example options:
React
TypeScript
Python
Java
SQL

If Rating Scale:
Show:
Minimum label: Not confident
Maximum label: Very confident
Scale: 1 to 5

If Long Text:
Show:
Placeholder text
Minimum characters optional

If Scenario Based:
Show:
Scenario description
Answer options
Skill/trait mapping

7. Skill / Trait Mapping
Allow admin to connect the question to matching logic.

Fields:
- Related skill or trait
Dropdown/multi-select:
  - React
  - Python
  - SQL
  - Communication
  - Teamwork
  - Problem Solving
  - Leadership
  - Adaptability
  - Fast Learner

- Weight
Slider or input:
1 to 10

Helper text:
This weight affects how much the question influences student profile analysis and match score calculation.

8. Preview Section
Show live preview of how the question will appear to students.

--------------------------------------------------
QUESTION FORM ACTIONS
--------------------------------------------------

Buttons:
- Cancel
- Save as Draft
- Add Question

Primary:
Add Question

--------------------------------------------------
QUESTION VALIDATION
--------------------------------------------------

Validation messages:
- Question text is required.
- Category is required.
- Question type is required.
- At least two options are required for multiple choice questions.
- Weight must be between 1 and 10.
- Required questions must have active status before publishing.

--------------------------------------------------
QUESTION SUCCESS STATE
--------------------------------------------------

After clicking Add Question:

Show success modal:
Title:
Question Added Successfully

Message:
The new assessment question has been added to the question bank and can now be used in student profiling.

Buttons:
- Add Another Question
- Back to Questions

After success:
- Add the new question card to the Assessment Questions page.
- Show badge: Active or Draft.
- Show category badge.
- Show question type badge.
- Show Required/Optional badge.
- Add edit and delete icons.

--------------------------------------------------
EDIT / DELETE QUESTION ICONS
--------------------------------------------------

Also make the edit and delete icons functional.

Edit:
Open the same form pre-filled with existing question data.
Button becomes:
Save Changes

Delete:
Show confirmation modal:
Title:
Delete Question?

Message:
This question will be removed from the active assessment flow. Existing student answers will remain stored for history.

Buttons:
- Cancel
- Delete Question

Alternative safer action:
Archive Question

==================================================
2. ADD SKILL BUTTON
==================================================

Context:
Admin Portal → Categories & Skills page.
There is a button called “Add Skill”.

When admin clicks “Add Skill”, open a complete modal or full page for adding a skill/category item.

Modal/Page title:
Add New Skill

Subtitle:
Create and categorize skills used for student profiles, opportunity requirements, filtering, and match scoring.

--------------------------------------------------
ADD SKILL FORM FIELDS
--------------------------------------------------

Fields:

1. Skill Name
Input placeholder:
Enter skill name...

Example:
REST APIs

2. Skill Type
Dropdown:
- Technical
- Soft Skill
- Interest
- Behavior Trait
- Work Style
- Opportunity Field
- Company Type

3. Category
Dropdown:
- Frontend
- Backend
- Data Science
- AI / Machine Learning
- Cybersecurity
- UI/UX
- General
- Cloud
- Mobile
- Business
- Marketing

4. Description
Textarea:
Describe what this skill represents...

5. Aliases / Related Keywords
Tag input:
Example:
API, REST, Backend Integration, HTTP

6. Matching Weight
Slider:
1 to 10

Helper text:
Higher weight means this skill has stronger impact on compatibility scoring.

7. Trending Skill Toggle
Checkbox:
Mark as trending skill

8. Skill Status
Dropdown:
- Active
- Draft
- Archived

9. Used In
Checkboxes:
- Student Assessment
- Company Opportunity Requirements
- Candidate Filters
- Opportunity Filters
- Match Explanation
- AI Insights

10. Duplicate Check
Show warning if skill already exists:
A similar skill already exists: APIs

Actions:
- Merge with existing skill
- Continue anyway

--------------------------------------------------
ADD SKILL ACTIONS
--------------------------------------------------

Buttons:
- Cancel
- Save as Draft
- Add Skill

Primary:
Add Skill

--------------------------------------------------
ADD SKILL VALIDATION
--------------------------------------------------

Validation:
- Skill name is required.
- Skill type is required.
- Category is required.
- Matching weight is required.
- Skill name must be unique or manually confirmed if duplicate.

--------------------------------------------------
ADD SKILL SUCCESS STATE
--------------------------------------------------

After clicking Add Skill:

Show success modal:
Title:
Skill Added Successfully

Message:
The skill has been added and can now be used in assessments, opportunity requirements, filters, and matching logic.

Buttons:
- Add Another Skill
- Back to Skills

After success:
- Add the new skill card to Categories & Skills page.
- Show:
  - Skill name
  - Skill type badge
  - Category badge
  - Used by 0 users
  - Trending badge if selected
  - Edit icon
  - Delete/archive icon

--------------------------------------------------
EDIT / DELETE SKILL ICONS
--------------------------------------------------

Make edit and delete icons functional.

Edit:
Open Add Skill form pre-filled.
Button:
Save Changes

Delete:
If skill is used by users, do not hard delete.
Show warning modal:

Title:
Archive Skill?

Message:
This skill is used by student profiles and opportunity requirements. To protect data history, it will be archived instead of deleted.

Buttons:
- Cancel
- Archive Skill

If skill is unused:
Allow Delete Skill.

==================================================
3. CONFIRM RELEASE & OVERRIDE STATUS BUTTON
==================================================

Context:
Admin Portal → Status Override page.
There is a critical red button:
Confirm Release & Override Status

Current example:
Student: Elena Rodriguez
Current Status: In Training
Related Company: DataPulse
Related Opportunity: Data Science Intern
New Status: Active / Available
Reason for Override is required.

This button must be fully functional and safe because it changes student availability.

--------------------------------------------------
BEFORE CONFIRMATION VALIDATION
--------------------------------------------------

When admin clicks “Confirm Release & Override Status”, validate:

Required:
- Student selected
- New status selected
- Reason for override filled
- Reason must be at least 10 characters

If reason is empty:
Show error:
Reason for override is required.

If new status is same as current status:
Show error:
New status must be different from current status.

--------------------------------------------------
CRITICAL CONFIRMATION MODAL
--------------------------------------------------

After validation, show a strong confirmation modal.

Modal title:
Confirm Status Override?

Warning message:
You are about to override this student’s workflow status. This action may change whether the student can apply to opportunities or appear in company searches.

Show before/after:

Student:
Elena Rodriguez

Related Company:
DataPulse

Related Opportunity:
Data Science Intern

Current Status:
In Training

New Status:
Active / Available

Effect:
- Student will be released from In Training.
- Student will become visible in company search again.
- Student will be able to apply to new opportunities.
- Current training lock will be removed.

Reason:
Show the admin’s written reason.

Notification options:
- Notify student via email
- Notify company via email

Add confirmation checkbox:
I understand this action will override the student’s current workflow status and will be recorded in audit logs.

Buttons:
- Cancel
- Confirm Override

Primary dangerous button:
Confirm Override

Use red for final confirm because it is a critical admin action.

--------------------------------------------------
OVERRIDE LOADING STATE
--------------------------------------------------

After confirming, show loading modal:

Title:
Updating Student Status

Steps:
- Validating admin permission
- Releasing student from In Training
- Updating availability
- Restoring search visibility
- Updating workflow history
- Sending notifications
- Writing audit log

--------------------------------------------------
OVERRIDE SUCCESS STATE
--------------------------------------------------

After completed, show success modal:

Title:
Status Override Completed

Message:
Elena Rodriguez has been released from In Training and is now Active / Available.

Show updated effects:
- Availability: Available Now
- Search visibility: Restored
- Applications: Enabled
- Audit log: Recorded

Buttons:
- View Student Profile
- Back to Status Override
- View Audit Log

--------------------------------------------------
AFTER OVERRIDE PAGE UPDATE
--------------------------------------------------

Update the Status Override page:

Current Status Details should now show:
Current Status:
Active / Available

Remove the warning:
This student is currently locked to In Training...

Replace it with:
This student is now available and can apply to opportunities.

Status History Logs should add a new timeline event:

Status: Active / Available
Date: Today
Changed by: System Admin
Reason: [admin reason]
Previous status: In Training
Action: Release & Override Status

--------------------------------------------------
CONNECTED SYSTEM BEHAVIOR
--------------------------------------------------

After override:

Student side:
- Student dashboard shows Availability: Available Now
- Student can apply to opportunities again
- Student Opportunities page enables Apply Now buttons
- Student status timeline shows admin release event
- Student receives notification:
Your status has been updated to Active / Available by admin.

Company side:
- Student appears again in Candidate Discovery
- Related company receives notification if selected:
Elena Rodriguez was released from In Training by admin.
- Previous pipeline history remains preserved

Admin side:
- Audit Logs page receives new entry:
Admin released Elena Rodriguez from In Training to Active / Available.
- Status Override page shows updated status
- Student profile moderation/history shows override record

--------------------------------------------------
AUDIT LOG ENTRY
--------------------------------------------------

Create/update Admin → Audit Logs with this new record:

Date/time:
Today

Actor:
System Admin

Action:
Status Override

Entity:
Elena Rodriguez

Old Value:
In Training

New Value:
Active / Available

Related Company:
DataPulse

Related Opportunity:
Data Science Intern

Reason:
[Admin reason]

Notifications:
Student notified / Company notified

--------------------------------------------------
BUSINESS LOGIC
--------------------------------------------------

Admin can override student status when:
- Training ended early
- Company marked In Training by mistake
- Student dispute was resolved
- Company dispute was resolved
- Admin needs to release student from lock

Important rules:
- In Training is the only hard-lock state.
- Releasing from In Training restores student visibility and application ability.
- Override must always require a reason.
- Override must always be logged.
- Admin action should not delete pipeline history.
- Admin action should not delete previous training record.
- It only changes current availability/status.

--------------------------------------------------
DESIGN QUALITY
--------------------------------------------------

Do not leave these buttons inactive:
- Add New Question
- Add Skill
- Confirm Release & Override Status

Do not use placeholders.

Each button must create a complete flow:
- Form/modal
- Validation
- Confirmation
- Success state
- Page update
- Connected system behavior

Keep the UI dark, blue, professional, and admin-grade.
Use red only for dangerous confirmation actions.
Make every action feel safe, traceable, and connected to the platform logic.


Fix the portal selection screen button colors and visual hierarchy.

Current issue:
The buttons have inconsistent colors and styles. Some primary and secondary actions look random and not balanced.

Keep the dark navy InternMatch AI style, but make the buttons consistent, professional, and easier to understand.

Use this button hierarchy:

1. Primary actions:
- Register as Student (Assessment)
- Register as Company

Style:
- Solid blue background
- White text
- Same height
- Same border radius
- Same width
- Strong hover/focus state

2. Secondary actions:
- Login as Student (Dashboard)
- Login as Company
- Login as Admin

Style:
- Transparent or dark card background
- Blue border or subtle gray-blue border
- White text
- Same height
- Same border radius
- Same width
- On hover: slightly brighter blue border and subtle blue background

Important:
Do not make “Login as Company” look like plain text.
It should be a real button like the other login buttons.

Spacing:
- Keep equal vertical spacing between all buttons
- Add slightly larger gap between Register buttons and Login buttons
- Align all buttons perfectly

Suggested final layout:

Primary section:
- Register as Student (Assessment) — solid blue
- Register as Company — solid blue

Divider text:
Already have an account?

Secondary section:
- Login as Student (Dashboard) — outline button
- Login as Company — outline button
- Login as Admin — outline button

Color rules:
- Use one primary blue only for main buttons
- Use consistent outline style for login buttons
- Avoid mixing random shades of blue
- Avoid one button looking disabled unless it is actually disabled

Make the screen look polished, balanced, and consistent with the rest of the dark blue SaaS design.