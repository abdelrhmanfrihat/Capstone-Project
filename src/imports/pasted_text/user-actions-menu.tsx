Update the Admin Portal → User Management page.

Make the three-dot menu button beside each user fully functional.

Current context:
Each user row has a three-dot actions icon on the far right.
When the admin clicks the three-dot icon beside a user, show a small professional action menu / dropdown.

Do not navigate immediately.
Do not open a big page directly.
First show a small contextual menu beside the clicked user row.

Keep the current InternMatch AI dark mode style:
- Dark navy background
- Blue primary color
- Same typography, spacing, icons, and rounded corners
- Professional admin dashboard UI

--------------------------------------------------
THREE-DOT USER ACTION MENU
--------------------------------------------------

When admin clicks the three-dot icon beside any user, open a small dropdown menu aligned to the right side of that row.

Menu style:
- Dark card background
- Soft border
- Rounded corners
- Light shadow
- Clear hover states
- Small icons beside each action
- Width around 220px
- Should appear above other content

Menu title optional:
User Actions

Menu actions:

1. View Profile
2. View Activity
3. Change Status
4. Reset Password
5. Send Message
6. Suspend User
7. Ban User

Use separators:
- Normal actions first
- Dangerous actions at the bottom

Dangerous actions:
- Suspend User
- Ban User

Danger actions should use red text or red icon.

--------------------------------------------------
MENU ACTIONS BY USER TYPE
--------------------------------------------------

If user is Student:
Show:
- View Student Profile
- View Applications
- View Feedback
- View Activity Logs
- Change Status
- Reset Password
- Send Message
- Suspend Student
- Ban Student

If user is Company:
Show:
- View Company Profile
- View Opportunities
- View Verification Details
- View Feedback
- View Activity Logs
- Change Status
- Reset Password
- Send Message
- Suspend Company
- Ban Company

If user is Admin:
Show:
- View Admin Profile
- View Activity Logs
- Change Role
- Reset Password
- Disable Admin Account

Do not show student-specific actions for companies.
Do not show company-specific actions for students.

--------------------------------------------------
VIEW PROFILE ACTION
--------------------------------------------------

When clicking View Profile, open a right-side drawer.

Drawer title depends on user type:

For student:
Student Profile Details

For company:
Company Profile Details

For admin:
Admin Profile Details

Student profile drawer should show:
- Name
- Email
- Role
- University
- Major
- Current status
- Availability
- Joined date
- Profile strength
- Applications count
- Interviews count
- Feedback count
- Last activity

Company profile drawer should show:
- Company name
- Email
- Industry
- Verification status
- Joined date
- Active opportunities
- Applicants count
- Feedback count
- Last activity

Admin profile drawer should show:
- Admin name
- Email
- Role level
- Joined date
- Last activity
- Recent admin actions

Drawer actions:
- View Full Details
- Send Message
- Change Status
- Close

--------------------------------------------------
VIEW ACTIVITY ACTION
--------------------------------------------------

When clicking View Activity, open a modal or drawer.

Title:
User Activity Logs

Show:
- Login activity
- Profile updates
- Applications submitted
- Feedback submitted
- Status changes
- Admin actions if relevant

Each activity item should include:
- Date/time
- Action
- Actor
- Details

Example for Alex Chen:
- Apr 12, 2026 — Account created
- May 14, 2026 — Applied to Frontend Engineering Intern
- May 16, 2026 — Interview invitation accepted
- May 18, 2026 — Interview scheduled

--------------------------------------------------
CHANGE STATUS ACTION
--------------------------------------------------

When clicking Change Status, open a modal.

Title:
Change User Status

Show selected user:
- Name
- Email
- Current status

New Status dropdown:

For students:
- Active
- In Training
- Suspended
- Banned

For companies:
- Verified
- Pending Review
- Suspended
- Banned

For admins:
- Active
- Disabled

Reason textarea:
Reason for status change required

Checkbox:
Notify user by email

Buttons:
- Cancel
- Save Status Change

If status change is dangerous, show confirmation before applying.

After success:
- Update status badge in user list
- Add event to activity logs
- Add record to audit logs

--------------------------------------------------
RESET PASSWORD ACTION
--------------------------------------------------

When clicking Reset Password:

Show confirmation modal:

Title:
Send Password Reset?

Message:
A password reset link will be sent to this user’s email address.

Show:
- User name
- Email

Buttons:
- Cancel
- Send Reset Link

After success:
Show toast:
Password reset link sent successfully.

--------------------------------------------------
SEND MESSAGE ACTION
--------------------------------------------------

When clicking Send Message:

Open modal:
Title:
Send Message to User

Fields:
- Subject
- Message

Checkbox:
Also send by email

Buttons:
- Cancel
- Send Message

After success:
Show toast:
Message sent successfully.

--------------------------------------------------
SUSPEND USER ACTION
--------------------------------------------------

When clicking Suspend User:

Open warning modal:

Title:
Suspend User?

Message:
This user will lose access to platform actions until reactivated.

Show selected user:
- Name
- Role
- Current status

Reason dropdown:
- Policy violation
- Suspicious activity
- Inappropriate feedback
- Company misuse
- Student misuse
- Other

Textarea:
Additional admin note required

Checkbox:
Notify user

Buttons:
- Cancel
- Suspend User

After success:
- User status becomes Suspended
- Badge updates
- Audit log is created
- User cannot perform main actions

--------------------------------------------------
BAN USER ACTION
--------------------------------------------------

When clicking Ban User:

Open stronger danger modal:

Title:
Ban User?

Message:
This is a serious action. The user will be blocked from using the platform.

Require:
- Reason
- Admin note
- Confirmation checkbox:
I understand this action will block the user account.

Buttons:
- Cancel
- Ban User

After success:
- User status becomes Banned
- Badge updates
- Audit log is created

--------------------------------------------------
OUTSIDE CLICK BEHAVIOR
--------------------------------------------------

The dropdown menu should close when:
- Admin clicks outside it
- Admin selects an action
- Admin opens another user menu

Only one menu should be open at a time.

--------------------------------------------------
DESIGN QUALITY
--------------------------------------------------

Do not leave the three-dot icon inactive.
Do not open a blank placeholder.

The interaction should be:

Admin clicks three dots
→ small action menu opens
→ admin selects action
→ drawer/modal opens if needed
→ action updates user row and logs

Make it feel like a real admin user management tool.