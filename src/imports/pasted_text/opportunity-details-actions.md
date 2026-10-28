Make all action buttons inside the Opportunity Details page fully functional.

Current buttons:
- Edit Opportunity
- Close Opportunity
- Search Candidates
- View Pipeline

These buttons are inside the Opportunity Details page for a selected opportunity, for example:
Frontend Engineering Intern.

Do not leave any button inactive.
Do not open placeholder pages.
Each button must open the correct connected flow.

Keep the current InternMatch AI dark mode style:
- Dark navy background
- Blue primary color
- Same cards, typography, spacing, icons, and rounded corners
- Professional company portal UI
- Clean modals, drawers, and connected pages

--------------------------------------------------
1. EDIT OPPORTUNITY BUTTON
--------------------------------------------------

When company clicks “Edit Opportunity”, open a full Edit Opportunity page or drawer.

Title:
Edit Opportunity

Subtitle:
Update opportunity details and matching requirements.

The form should be pre-filled with the selected opportunity data.

For example:
Opportunity:
Frontend Engineering Intern

Pre-filled fields:

Basic Information:
- Opportunity Title: Frontend Engineering Intern
- Type: Internship
- Field: Software Development
- Work Mode: Remote
- Status: Active
- Available Seats: 3
- Deadline: June 01, 2026

Description:
Students will work with the frontend team to build React components, improve UI performance, and collaborate with designers and backend developers.

Requirements:
- React
- TypeScript
- JavaScript
- Git
- APIs

Preferred Skills:
- Tailwind CSS
- Testing
- UI/UX basics

Soft Skills:
- Communication
- Teamwork
- Problem Solving
- Self Learning

Matching Weights:
- Technical Skills: 40%
- Soft Skills: 25%
- Interests: 15%
- Behavioral Fit: 20%

Buttons:
- Cancel
- Save Changes

When clicking Save Changes:
Show confirmation modal:

Title:
Save Opportunity Changes?

Message:
Updating this opportunity will re-analyze requirements and recalculate candidate match scores.

Buttons:
- Cancel
- Save & Recalculate

After confirmation:
Show loading state:
- Updating opportunity
- Re-analyzing requirements
- Recalculating matches
- Updating candidate ranking

Then show success modal:

Title:
Opportunity Updated Successfully

Message:
The opportunity was updated and candidate matches are being recalculated.

Buttons:
- Back to Details
- View Candidates

After save:
- Return to Opportunity Details
- Show updated data
- Add timeline event:
Opportunity edited and matches recalculated

--------------------------------------------------
2. CLOSE OPPORTUNITY BUTTON
--------------------------------------------------

When company clicks “Close Opportunity”, show a confirmation modal.

Title:
Close Opportunity?

Message:
This opportunity will stop accepting new applications and will be hidden from student search results. Existing applications, interviews, and pipeline history will remain available.

Show selected opportunity:
Frontend Engineering Intern

Ask for close reason:

Dropdown:
- Position filled
- Training started
- No longer available
- Requirements changed
- Duplicate opportunity
- Other

Textarea:
Additional note optional

Checkbox:
I understand this opportunity will no longer accept new applications.

Buttons:
- Cancel
- Close Opportunity

Close Opportunity button should be red/danger style.

After confirmation:
Show success modal:

Title:
Opportunity Closed

Message:
Frontend Engineering Intern is now closed. Students can no longer apply, but existing pipeline history is preserved.

Buttons:
- Back to Opportunities
- View Pipeline History

After closing:
- Status changes from Active to Closed
- Apply buttons disappear or become disabled on student side
- Opportunity is hidden from student search
- Existing candidates remain in pipeline history
- Add timeline event:
Opportunity closed by company

--------------------------------------------------
3. SEARCH CANDIDATES BUTTON
--------------------------------------------------

When company clicks “Search Candidates”, navigate to Candidate Discovery page filtered for this selected opportunity.

Page title:
Candidate Discovery

Subtitle:
AI-matched candidates for your Frontend Engineering Intern position.

At the top, show selected opportunity context card:

Selected Opportunity:
Frontend Engineering Intern

Details:
- Type: Internship
- Work Mode: Remote
- Required Skills: React, TypeScript, JavaScript, Git, APIs
- Avg Match Score: 84%
- Status: Active

Buttons:
- Back to Opportunity Details
- Change Opportunity
- View Pipeline

Candidate cards should show candidates matched specifically for this opportunity.

Each candidate card should include:
- Student name
- University
- Major
- Match score
- Profile strength
- Availability
- Technical skills
- Soft skills
- Interests
- AI match reason
- Current pipeline stage for this opportunity

Candidate actions:
- View Profile
- Mark Interested
- Shortlist
- Invite to Interview
- Add Note

Important:
Search Candidates should not show generic candidates.
It must show candidates ranked for the selected opportunity only.

When company marks a candidate as Interested:
- Add candidate to Interested column in this opportunity’s pipeline
- Show success toast:
Candidate added to Frontend Engineering Intern pipeline as Interested.

When company shortlists a candidate:
- Add candidate to Shortlisted column
- Show success toast:
Candidate shortlisted for Frontend Engineering Intern.

--------------------------------------------------
4. VIEW PIPELINE BUTTON
--------------------------------------------------

When company clicks “View Pipeline”, navigate to Recruitment Pipeline page with the selected opportunity already active.

Page title:
Recruitment Pipeline

Selected opportunity:
Frontend Engineering Intern

The opportunity selector should highlight:
Frontend Engineering Intern

The pipeline should show only candidates for this opportunity.

Columns:
- Applied
- Interested
- Shortlisted
- Interview
- Matched
- In Training
- Rejected

The pipeline header should show:
- Opportunity type: Internship
- Work mode: Remote
- Status: Active
- Applicants: 42
- Shortlisted: 8
- Interviews: 4
- Matched: 1
- Avg Match Score: 84%
- Deadline: June 01, 2026

Candidate cards should belong only to this selected opportunity.

Important:
Each opportunity has its own unique pipeline.
Do not mix candidates from other opportunities.

--------------------------------------------------
CONNECTED BEHAVIOR
--------------------------------------------------

All buttons must be connected to the selected opportunity.

If selected opportunity is:
Frontend Engineering Intern

Then:
- Edit Opportunity edits Frontend Engineering Intern
- Close Opportunity closes Frontend Engineering Intern
- Search Candidates shows candidates for Frontend Engineering Intern
- View Pipeline opens the Frontend Engineering Intern pipeline

Do not use unrelated opportunity data.

--------------------------------------------------
BUTTON STATES BY OPPORTUNITY STATUS
--------------------------------------------------

If opportunity status is Active:
Show:
- Edit Opportunity
- Close Opportunity
- Search Candidates
- View Pipeline

If opportunity status is Draft:
Show:
- Edit Opportunity
- Publish Opportunity
- Delete Draft

If opportunity status is Closed:
Show:
- Reactivate Opportunity
- View Pipeline History
- Archive Opportunity

For the current Active opportunity, make these buttons work:
- Edit Opportunity
- Close Opportunity
- Search Candidates
- View Pipeline

--------------------------------------------------
DESIGN QUALITY
--------------------------------------------------

Make the action buttons look organized.

Suggested layout:
Primary:
- Search Candidates

Secondary:
- Edit Opportunity
- View Pipeline

Danger:
- Close Opportunity

Use:
- Blue for primary action
- Outline buttons for secondary actions
- Red outline for Close Opportunity

Do not overcrowd the page.
Do not leave buttons inactive.
Do not use placeholder screens.

The flow should feel complete:
Opportunity Details
→ Edit Opportunity
→ Save & Recalculate

Opportunity Details
→ Close Opportunity
→ Confirmation
→ Status Closed

Opportunity Details
→ Search Candidates
→ Candidate Discovery filtered by this opportunity

Opportunity Details
→ View Pipeline
→ Pipeline opened with this opportunity selected