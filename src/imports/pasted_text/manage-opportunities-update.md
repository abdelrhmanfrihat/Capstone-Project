Update the Company Portal → Manage Opportunities page.

Current issue:
The Actions column is too crowded because each row has many buttons like View, Edit, Close, Publish, Delete, Reactivate, Archive.

I want to simplify the table.

Important:
In the Actions column, show only one main button for every opportunity:

Button:
View Details

Style:
- Blue primary/outline button
- Same style for all rows
- Clear and easy to click
- Not crowded
- Keep it aligned nicely in the last column

Remove the extra action buttons from the table rows:
- Edit
- Close
- Publish
- Delete
- Reactivate
- Archive

Do not remove these actions completely.
Move them inside the Opportunity Details page/drawer.

--------------------------------------------------
MANAGE OPPORTUNITIES TABLE
--------------------------------------------------

Keep the table columns:

- Title
- Type
- Field
- Posted
- Deadline
- Status
- Applicants
- Interviews
- Avg Match
- Actions

But in Actions, show only:

View Details

For all rows:
- Active opportunity → View Details
- Draft opportunity → View Details
- Closed opportunity → View Details

Use blue button style:
- Background: #2563EB
- Text: white
- Hover: darker blue
or use blue outline if it fits the current dark mode better.

Make the Actions column clean and not crowded.

--------------------------------------------------
VIEW DETAILS FLOW
--------------------------------------------------

When company clicks “View Details”, open a full Opportunity Details page or right-side drawer for that specific opportunity.

Title:
Opportunity Details

Subtitle:
View, manage, and update this internship or training opportunity.

The details page/drawer should show all information about the selected opportunity.

--------------------------------------------------
OPPORTUNITY DETAILS CONTENT
--------------------------------------------------

Show these sections:

1. Opportunity Summary
- Opportunity title
- Type: Internship / Training
- Field
- Status: Active / Draft / Closed
- Posted date
- Deadline
- Work mode
- Location
- Available seats
- Applicants count
- Interviews count
- Average match score

2. Description
Show the opportunity description.

3. Requirements
Show:
- Required technical skills
- Preferred skills
- Soft skills
- Academic requirements
- Experience level
- Work preferences

4. AI Match Overview
Show:
- Avg match score
- Estimated candidate pool
- Strong matches count
- Top matching factors
- Missing skills trend
- AI recommendation if available

5. Recruitment Activity
Show:
- Applicants
- Shortlisted
- Interviews
- Matched
- In Training
- Rejected

6. Timeline / History
Show:
- Opportunity created
- Published
- Edited
- Closed
- Reactivated
- Match recalculated

--------------------------------------------------
ACTIONS INSIDE DETAILS PAGE
--------------------------------------------------

Move all actions into the details page/drawer.

Show actions based on opportunity status:

If Status = Active:
Show buttons:
- Edit Opportunity
- Close Opportunity
- Search Candidates
- View Pipeline

If Status = Draft:
Show buttons:
- Edit Opportunity
- Publish Opportunity
- Delete Draft

If Status = Closed:
Show buttons:
- Reactivate Opportunity
- Archive Opportunity
- View Pipeline History

Use clear button hierarchy:
- Primary blue for main action
- Outline buttons for secondary actions
- Red only for dangerous actions like Delete or Archive

--------------------------------------------------
ACTIVE OPPORTUNITY DETAILS EXAMPLE
--------------------------------------------------

For:
Frontend Engineering Intern

Status:
Active

Actions:
- Edit Opportunity
- Close Opportunity
- Search Candidates
- View Pipeline

Close Opportunity button should open confirmation modal:

Title:
Close Opportunity?

Message:
This opportunity will stop accepting new applications and will be hidden from student search results. Existing applications and pipeline history will remain available.

Reason dropdown:
- Position filled
- Training started
- No longer available
- Requirements changed
- Duplicate opportunity
- Other

Buttons:
- Cancel
- Close Opportunity

--------------------------------------------------
DRAFT OPPORTUNITY DETAILS EXAMPLE
--------------------------------------------------

For:
Backend Systems Intern

Status:
Draft

Actions:
- Edit Opportunity
- Publish Opportunity
- Delete Draft

Publish Opportunity button should open confirmation modal:

Title:
Publish Opportunity?

Message:
This opportunity will become visible to students and the system will start recommending matched candidates.

Buttons:
- Cancel
- Publish Opportunity

Delete Draft button should open warning modal:

Title:
Delete Draft?

Message:
This draft will be permanently removed.

Buttons:
- Cancel
- Delete Draft

--------------------------------------------------
CLOSED OPPORTUNITY DETAILS EXAMPLE
--------------------------------------------------

For:
Product Design Training

Status:
Closed

Actions:
- Reactivate Opportunity
- Archive Opportunity
- View Pipeline History

Reactivate button should open confirmation modal:

Title:
Reactivate Opportunity?

Message:
This opportunity will become visible to students again and will accept new applications.

Buttons:
- Cancel
- Reactivate

Archive button should open warning modal:

Title:
Archive Opportunity?

Message:
This opportunity will be archived. Its history will remain available, but it will be removed from active management views.

Buttons:
- Cancel
- Archive

--------------------------------------------------
EDIT OPPORTUNITY CONNECTION
--------------------------------------------------

When clicking Edit Opportunity inside the details page:
Open the Edit Opportunity form for the selected opportunity.

The form should be pre-filled with the opportunity data.

After saving:
Show success modal:
Opportunity updated successfully. Match scores are being recalculated.

Then return to Opportunity Details.

--------------------------------------------------
SEARCH CANDIDATES CONNECTION
--------------------------------------------------

When clicking Search Candidates:
Navigate to Candidate Discovery filtered for this selected opportunity.

Example:
If viewing Frontend Engineering Intern, Candidate Discovery should show:
AI-matched candidates for Frontend Engineering Intern.

--------------------------------------------------
VIEW PIPELINE CONNECTION
--------------------------------------------------

When clicking View Pipeline:
Navigate to Recruitment Pipeline with this opportunity selected.

Example:
Frontend Engineering Intern pipeline should open directly.

--------------------------------------------------
DESIGN REQUIREMENTS
--------------------------------------------------

Do not keep many action buttons inside the table.
The table should stay clean and readable.

The table is for overview only.
The details page/drawer is for actions.

Make the interaction feel like this:

Manage Opportunities table
→ click View Details
→ see full opportunity info
→ manage actions from details page

This reduces clutter and makes the UI more professional.

Keep the current dark mode style.
Use blue as the primary action color.
Make View Details easy to see.