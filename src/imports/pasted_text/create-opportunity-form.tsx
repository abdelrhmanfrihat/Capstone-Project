Update the Company Portal flow for the “Post Opportunity” button.

When the company clicks “Post Opportunity” from the company dashboard, open a complete “Create Internship / Training Opportunity” page.

This page must support these requirements:
1. The system shall allow companies to create and publish internship opportunities.
2. The system shall allow companies to define detailed requirements.
3. The system shall allow companies to edit or close opportunities.

Keep the current InternMatch AI dark blue SaaS style:
- Dark navy background
- Blue primary buttons
- Same sidebar and top navigation
- Same card style, spacing, typography, icons, and rounded corners
- Professional company/recruiter portal UI
- Clear form sections
- Light/dark mode support if available

--------------------------------------------------
PAGE 1: CREATE NEW OPPORTUNITY
--------------------------------------------------

Page title:
Post New Opportunity

Subtitle:
Create an internship or training opportunity and define the ideal student profile for AI-assisted matching.

Add a step-based form with progress indicator:

Step 1: Basic Information
Step 2: Requirements
Step 3: Training Details
Step 4: AI Match Preview
Step 5: Review & Publish

--------------------------------------------------
STEP 1: BASIC INFORMATION
--------------------------------------------------

Fields:
- Opportunity Title
Example: Frontend Engineering Intern

- Opportunity Type
Dropdown:
  - Internship
  - Training

- Field / Category
Dropdown:
  - Software Development
  - Data Science
  - AI / Machine Learning
  - Cybersecurity
  - UI/UX Design
  - Product Management
  - Marketing Analytics
  - Business Development

- Short Summary
Textarea:
Write a short description of the opportunity.

- Full Description
Rich text textarea:
Describe the responsibilities, goals, and what the student will learn.

- Number of Available Seats
Input number

- Opportunity Visibility
Toggle:
  - Public
  - Private / Invite-only

Buttons:
- Save Draft
- Continue

--------------------------------------------------
STEP 2: DETAILED REQUIREMENTS
--------------------------------------------------

Section title:
Candidate Requirements

Add fields:

Technical Skills Required:
Multi-select chips:
- React
- TypeScript
- JavaScript
- Node.js
- Python
- SQL
- APIs
- Git
- Figma
- Tailwind CSS
- Machine Learning
- Data Analysis

For each selected technical skill, allow company to choose level:
- Beginner
- Intermediate
- Advanced

Preferred Soft Skills:
Multi-select chips:
- Communication
- Teamwork
- Problem Solving
- Leadership
- Adaptability
- Time Management
- Critical Thinking
- Self Learning

Academic Requirements:
- Preferred Major
Dropdown:
  - Computer Science
  - Software Engineering
  - Data Science
  - Cybersecurity
  - Design
  - Business
  - Any related field

- Minimum Year Level
Dropdown:
  - First year
  - Second year
  - Third year
  - Fourth year
  - Fresh graduate
  - Any

Experience Level:
Dropdown:
- No experience required
- Basic project experience
- Intermediate project experience
- Previous internship preferred

Work Preferences:
- Remote
- Hybrid
- On-site

Required Traits / Behavior:
Checkboxes:
- Fast learner
- Collaborative
- Detail-oriented
- Creative problem solver
- Independent worker
- Comfortable with feedback

Matching Weight Controls:
Add sliders to let the company define importance:
- Technical Skills: 40%
- Soft Skills: 25%
- Interests: 15%
- Behavioral Fit: 20%

Show note:
These weights help the system calculate compatibility scores and rank the most suitable students.

Buttons:
- Back
- Save Draft
- Continue

--------------------------------------------------
STEP 3: TRAINING DETAILS
--------------------------------------------------

Section title:
Logistics & Timeline

Fields:
- Location
- Work Mode:
  - Remote
  - Hybrid
  - On-site

- City / Country
- Duration
Dropdown:
  - 1 month
  - 2 months
  - 3 months
  - 6 months
  - Custom

- Start Date
- Application Deadline
- Weekly Hours
Dropdown:
  - Part-time
  - Full-time
  - Flexible

- Compensation
Dropdown:
  - Paid
  - Unpaid
  - Stipend
  - Not specified

- Training Mentor / Supervisor Name
- Contact Email

Add optional section:
What the student will learn:
- Skill 1
- Skill 2
- Skill 3

Buttons:
- Back
- Save Draft
- Continue

--------------------------------------------------
STEP 4: AI MATCH PREVIEW
--------------------------------------------------

Section title:
AI Match Preview

This screen should show how the system will understand the opportunity and estimate matching quality.

Include cards:
1. Estimated Candidate Pool
Example:
184 suitable students found

2. Predicted Match Quality
Example:
86% strong match quality

3. Most Important Matching Factors
- React
- TypeScript
- Communication
- Problem Solving
- Remote work preference

4. Candidate Distribution Chart
Show bars:
- Excellent Match: 42
- Good Match: 76
- Moderate Match: 51
- Low Match: 15

5. Requirement Strength Card
Show:
- Technical clarity: Strong
- Soft skills clarity: Medium
- Description clarity: Strong
- Missing detail: Start date or mentor info if empty

6. AI Suggestions
Examples:
- Add “Git” as a required skill to improve match accuracy.
- Add soft skill expectations to improve behavioral matching.
- Clarify whether this is remote, hybrid, or on-site.

Buttons:
- Back
- Improve Requirements
- Continue to Review

--------------------------------------------------
STEP 5: REVIEW & PUBLISH
--------------------------------------------------

Section title:
Review Opportunity

Show a full summary before publishing:

Opportunity Information:
- Title
- Type
- Field
- Description
- Seats
- Visibility

Requirements:
- Required technical skills with levels
- Preferred soft skills
- Academic requirements
- Experience level
- Behavior traits
- Matching weights

Training Details:
- Location
- Work mode
- Duration
- Start date
- Deadline
- Weekly hours
- Compensation
- Mentor/supervisor

AI Match Preview:
- Estimated candidate pool
- Predicted match quality
- Top matching factors

Add checkboxes:
- I confirm the opportunity details are accurate.
- I understand that students will be matched based on these requirements.
- I agree that I can edit or close this opportunity later.

Buttons:
- Back
- Save as Draft
- Publish Opportunity

After publishing, show success modal:

Title:
Opportunity Published Successfully

Message:
Your opportunity is now live. The system will start recommending suitable students based on your requirements.

Buttons:
- View Opportunity
- View Matched Candidates
- Back to Dashboard

--------------------------------------------------
PAGE 2: MANAGE OPPORTUNITIES
--------------------------------------------------

Create/update the Company → Opportunities page to handle editing and closing opportunities.

Page title:
Manage Opportunities

Subtitle:
View, edit, close, or reactivate your internship and training opportunities.

Include top actions:
- Post New Opportunity
- Export CSV

Include filters:
- Search by title
- Status
- Opportunity type
- Field/category
- Date posted
- Match quality

Create an opportunities table with columns:
- Opportunity Title
- Type
- Field
- Posted Date
- Deadline
- Status
- Applicants
- Interviews
- Avg Match Score
- Actions

Use sample rows:

Row 1:
Title: Frontend Engineering Intern
Type: Internship
Field: Software Development
Posted Date: May 10, 2026
Deadline: June 01, 2026
Status: Active
Applicants: 42
Interviews: 8
Avg Match Score: 84%
Actions: View / Edit / Close

Row 2:
Title: Backend Systems Intern
Type: Internship
Field: Software Development
Posted Date: May 12, 2026
Deadline: June 05, 2026
Status: Draft
Applicants: 0
Interviews: 0
Avg Match Score: Not calculated
Actions: Edit / Publish / Delete

Row 3:
Title: Product Design Training
Type: Training
Field: UI/UX Design
Posted Date: Apr 28, 2026
Deadline: May 20, 2026
Status: Closed
Applicants: 28
Interviews: 4
Avg Match Score: 78%
Actions: View / Reactivate / Archive

Status badges:
- Draft = gray
- Active = green
- Closed = red/gray
- Archived = gray
- Expired = orange

--------------------------------------------------
EDIT OPPORTUNITY FLOW
--------------------------------------------------

When company clicks “Edit”, open an Edit Opportunity page.

Title:
Edit Opportunity

Subtitle:
Update opportunity details and matching requirements.

Use the same form structure as Create Opportunity, but pre-filled with existing data.

Allow editing:
- Title
- Description
- Required skills
- Skill levels
- Soft skills
- Academic requirements
- Experience level
- Matching weights
- Location
- Work mode
- Duration
- Start date
- Deadline
- Seats
- Visibility

Important:
After saving edits, show a modal:

Title:
Opportunity Updated

Message:
The system will re-analyze this opportunity and recalculate match scores for related students.

Buttons:
- View Updated Opportunity
- View Recalculated Matches

Add a small AI recalculation indicator:
“Recalculating candidate matches...”

--------------------------------------------------
CLOSE OPPORTUNITY FLOW
--------------------------------------------------

When company clicks “Close”, show a confirmation modal.

Title:
Close Opportunity?

Message:
This opportunity will no longer accept new applications and will be hidden from student search results. Existing applications and pipeline history will remain available.

Ask for close reason:
Dropdown:
- Position filled
- Training started
- No longer available
- Requirements changed
- Duplicate opportunity
- Other

Textarea:
Additional note...

Buttons:
- Cancel
- Close Opportunity

After closing:
- Change status to Closed
- Disable Apply button for students
- Hide opportunity from student search
- Keep it visible in company manage opportunities
- Keep application history and pipeline records
- Allow Reactivate if needed

Show success message:
Opportunity closed successfully.

--------------------------------------------------
REACTIVATE OPPORTUNITY FLOW
--------------------------------------------------

For closed opportunities, add Reactivate action.

When company clicks “Reactivate”, show modal:

Title:
Reactivate Opportunity?

Message:
This opportunity will become visible to students again and will accept new applications.

Buttons:
- Cancel
- Reactivate

After reactivation:
- Status becomes Active
- Recalculate matches
- Show success message:
Opportunity reactivated and matches are being updated.

--------------------------------------------------
STUDENT SIDE CONNECTION
--------------------------------------------------

Update student opportunity behavior:

If opportunity is Active:
- Show Apply button

If opportunity is Closed:
- Show badge: Closed
- Disable Apply button
- Message: This opportunity is no longer accepting applications.

If opportunity is Draft:
- Do not show it to students

If opportunity is Reactivated:
- Show again in search and recommendations
- Recalculate match score

--------------------------------------------------
BUSINESS LOGIC
--------------------------------------------------

Company can:
- Create opportunity
- Save as draft
- Publish opportunity
- Edit opportunity
- Close opportunity
- Reactivate closed opportunity
- View applications and matched candidates

System should:
- Analyze opportunity description
- Extract required skills
- Compare requirements with student profiles
- Calculate compatibility scores
- Rank students for each opportunity
- Recalculate matches when opportunity is edited
- Hide closed opportunities from student search
- Keep historical application data

Company cannot:
- Publish opportunity if company is not verified
- Publish opportunity without required fields
- Delete active opportunity if it has active applicants; allow close/archive instead

If company is not verified:
Show warning:
Your company must be verified before posting opportunities.

Disable Publish Opportunity button.

--------------------------------------------------
VALIDATION STATES
--------------------------------------------------

Add form validation:
- Title is required
- Type is required
- Field/category is required
- Description is required
- At least one technical skill is required
- Deadline is required
- Start date must be after current date
- Deadline must be before start date
- Seats must be at least 1

Add error messages under fields.

--------------------------------------------------
DESIGN QUALITY
--------------------------------------------------

Do not make this a simple one-page form.
Make it a complete professional opportunity management workflow.

Use:
- Stepper form
- Cards
- Skill chips
- Dropdowns
- Sliders for matching weights
- AI match preview
- Review page
- Success modal
- Manage opportunities table
- Edit flow
- Close confirmation modal
- Reactivate flow

Keep the app clearly AI-assisted:
- Show match preview
- Show extracted requirements
- Show candidate pool estimate
- Show compatibility impact
- Show recalculation after edits

The final flow should clearly satisfy:
- Companies can create and publish internship opportunities.
- Companies can define detailed requirements.
- Companies can edit or close opportunities.