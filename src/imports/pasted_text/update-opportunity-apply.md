Update the Student Portal → Discover Opportunities page.

Make the “Apply Now” and “Save Role” buttons fully functional for every opportunity card.

Current screen:
Student is viewing AI-matched opportunities such as:
- Frontend Engineering Intern at Stellar Cloud
- Data Science Intern at DataPulse

The opportunity cards currently have:
- Apply Now
- Save Role

These buttons should not be decorative. They must open complete flows.

Keep the current InternMatch AI dark blue SaaS style:
- Dark navy background
- Blue primary buttons
- Same sidebar and top navigation
- Same opportunity card style
- Same typography, spacing, icons, badges, and rounded corners
- Professional AI-assisted student portal UI

--------------------------------------------------
BUTTON 1: APPLY NOW
--------------------------------------------------

When the student clicks “Apply Now”, open an application confirmation modal.

Modal title:
Apply to [Opportunity Title]?

Subtitle:
Your AI profile and match summary will be shared with [Company Name].

Example:
Apply to Frontend Engineering Intern?

--------------------------------------------------
APPLICATION CONFIRMATION MODAL CONTENT
--------------------------------------------------

Show a summary card inside the modal:

Opportunity:
Frontend Engineering Intern

Company:
Stellar Cloud

Work Mode:
Remote

Opportunity Type:
Internship

Match Score:
94%

AI Match Summary:
Your React and TypeScript experience strongly matches this role. Adding SQL could improve your match even more.

Strong Match:
- React
- TypeScript
- Teamwork

Missing Skills:
- SQL

Application Visibility:
Your profile, assessment-based skills, match score, and public student information will be visible to the company.

--------------------------------------------------
OPTIONAL MESSAGE
--------------------------------------------------

Add textarea:

Message to Company optional

Placeholder:
Write a short message to introduce yourself...

Example:
I’m interested in this opportunity because I want to grow my frontend skills and work on real React projects.

--------------------------------------------------
CHECKBOXES
--------------------------------------------------

Add confirmation checkboxes:

- I confirm that my profile information is up to date.
- I understand that the company will review my AI-generated profile and match score.

--------------------------------------------------
MODAL BUTTONS
--------------------------------------------------

Buttons:
- Cancel
- Submit Application

Primary button:
Submit Application

--------------------------------------------------
APPLICATION VALIDATION
--------------------------------------------------

If checkbox is not selected, show error:
Please confirm that your profile information is up to date before applying.

If the student is already applied to this opportunity:
Disable Apply Now and show:
Already Applied

If the student is In Training:
Disable Apply Now and show warning:
You are currently in training and cannot apply to new opportunities.

If the opportunity is Closed:
Disable Apply Now and show:
This opportunity is no longer accepting applications.

--------------------------------------------------
APPLICATION SUCCESS STATE
--------------------------------------------------

After clicking Submit Application, show success modal:

Title:
Application Submitted Successfully

Message:
Your application has been sent to Stellar Cloud. You can track its progress in the Applications page.

Show summary:
- Opportunity: Frontend Engineering Intern
- Company: Stellar Cloud
- Status: Applied
- Submitted Date: Today
- Match Score: 94%

Buttons:
- View Application Status
- Continue Browsing

After success:
- Change button on the opportunity card from “Apply Now” to “Applied”
- Add status badge: Applied
- Disable duplicate application
- Add this opportunity to Student Portal → Applications page under Applied column
- Add notification:
Application submitted to Stellar Cloud
- Add recent activity on dashboard:
You applied to Frontend Engineering Intern

--------------------------------------------------
APPLICATIONS PAGE CONNECTION
--------------------------------------------------

Update Student Portal → Applications page.

When the student applies, the application should appear in the Applied column/card list.

Application card should show:
- Opportunity title
- Company name
- Match score
- Current status: Applied
- Submitted date
- Next step: Waiting for company review
- View Details button
- Withdraw Application button optional

Status timeline:
- Application submitted
- Waiting for company review
- Shortlisted
- Interview
- Matched
- In Training

Only show completed stage as active.

--------------------------------------------------
WITHDRAW APPLICATION OPTIONAL FLOW
--------------------------------------------------

If adding Withdraw Application:

When clicking Withdraw:
Show confirmation modal:

Title:
Withdraw Application?

Message:
You can withdraw this application before the company moves it to interview or matched stages.

Buttons:
- Cancel
- Withdraw

After withdraw:
Status becomes Withdrawn / Archived.

--------------------------------------------------
BUTTON 2: SAVE ROLE
--------------------------------------------------

When the student clicks “Save Role”, save the opportunity to a saved list.

Behavior:
- The button should change from “Save Role” to “Saved”
- Add filled bookmark icon or saved state
- Show success toast:
Role saved successfully.

The saved opportunity should be accessible later.

--------------------------------------------------
SAVE ROLE SUCCESS TOAST
--------------------------------------------------

Toast message:
Frontend Engineering Intern saved to your saved opportunities.

Action link:
View Saved Roles

--------------------------------------------------
UNSAVE FLOW
--------------------------------------------------

If the student clicks “Saved” again:

Show small confirmation or instant toggle:
- Remove from saved roles

Toast:
Removed from saved opportunities.

Button returns to:
Save Role

--------------------------------------------------
SAVED OPPORTUNITIES PAGE / SECTION
--------------------------------------------------

Create or update a saved opportunities section.

Option 1:
Add tab inside Opportunities page:
- All Opportunities
- Saved Roles

Option 2:
Add saved section inside My Profile or Applications page.

Preferred:
Inside Student Portal → Opportunities, create tabs:

Tabs:
1. Discover
2. Saved Roles
3. Applied

Saved Roles tab should show all saved opportunities.

Saved role card should include:
- Opportunity title
- Company name
- Match score
- Work mode
- Opportunity type
- Strong match skills
- Missing skills
- Saved date
- Apply Now button
- Remove Saved button
- View Details button

--------------------------------------------------
EMPTY SAVED STATE
--------------------------------------------------

If there are no saved roles, show empty state:

Title:
No saved roles yet

Message:
Save opportunities you are interested in so you can apply later.

Button:
Browse Opportunities

--------------------------------------------------
OPPORTUNITY DETAILS CONNECTION
--------------------------------------------------

Make sure “Apply Now” and “Save Role” also work from the Opportunity Details page.

Opportunity Details should include:
- Apply Now
- Save Role / Saved
- Match explanation
- Company info
- Requirements
- Strong match skills
- Missing skills

The button states should stay consistent:
If saved from list, details page shows Saved.
If applied from details, list card shows Applied.

--------------------------------------------------
BUSINESS LOGIC
--------------------------------------------------

Apply Now:
- Creates a new application
- Sets application status to Applied
- Adds the opportunity to Applications page
- Prevents duplicate applications
- Shows success confirmation
- Notifies the student
- Allows tracking progress

Save Role:
- Adds the opportunity to saved roles
- Does not create an application
- Student can apply later
- Student can remove it from saved list

Important difference:
Saved does NOT mean applied.
Applied means the company can review the student profile.
Saved only bookmarks the opportunity.

--------------------------------------------------
STATUS RULES
--------------------------------------------------

If student status is Active:
- Apply Now is enabled
- Save Role is enabled

If student status is Interview:
- Apply Now is still enabled
- Save Role is enabled

If student status is Matched:
- Apply Now is still enabled but show small warning:
You are currently matched with another opportunity, but you can still explore options until training starts.

If student status is In Training:
- Apply Now disabled
- Save Role allowed or disabled depending on design, but show note:
You can save roles, but cannot apply while in training.

Only In Training should block applications.

--------------------------------------------------
UI DETAILS ON OPPORTUNITY CARD
--------------------------------------------------

After saving:
Button changes:
Save Role → Saved

After applying:
Button changes:
Apply Now → Applied

Add badges:
- Saved
- Applied

If both saved and applied:
Show:
Applied
Saved

--------------------------------------------------
ERROR STATES
--------------------------------------------------

Create error states:

1. Duplicate application:
You have already applied to this opportunity.

2. Closed opportunity:
This opportunity is no longer accepting applications.

3. In Training restriction:
You are currently in training and cannot apply to new opportunities.

4. Network/system error:
Something went wrong while submitting your application. Please try again.

--------------------------------------------------
DESIGN QUALITY
--------------------------------------------------

Do not leave Apply Now and Save Role inactive.
Do not create placeholder modals.

Create a complete professional flow:
- Apply confirmation modal
- Success modal
- Application status update
- Saved role toggle
- Saved roles tab
- Empty saved state
- Button state changes
- Error states

Keep the product feeling like an AI-assisted matching platform by showing:
- Match score
- Why this match
- Strong skills
- Missing skills
- Profile visibility explanation
- Application status timeline