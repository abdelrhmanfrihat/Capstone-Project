Update the Company Portal → Candidate Discovery page.

When the company clicks the “Filters” button, open a professional filter drawer or filter panel.

The filter system must support this requirement:
“The system shall support filtering by skills, interests, and match score.”

Keep the current InternMatch AI dark blue SaaS style:
- Dark navy background
- Blue as the primary action color
- Same cards, borders, typography, spacing, and buttons
- Professional recruiter dashboard UI
- Clear filter sections
- Clean badges and chips

--------------------------------------------------
FILTER DRAWER / PANEL
--------------------------------------------------

When clicking “Filters”, open a right-side drawer titled:

Advanced Candidate Filters

Subtitle:
Narrow candidates by skills, interests, availability, and AI match score.

Add buttons at the top:
- Reset Filters
- Apply Filters

--------------------------------------------------
FILTER SECTION 1: MATCH SCORE
--------------------------------------------------

Section title:
Match Score

Add a range slider:
Minimum Match Score

Options:
- 50%+
- 60%+
- 70%+
- 80%+
- 90%+

Default selected:
80%+

Also show small text:
Only show candidates with compatibility score above the selected threshold.

Add visual label:
Current filter: 80% and above

--------------------------------------------------
FILTER SECTION 2: TECHNICAL SKILLS
--------------------------------------------------

Section title:
Technical Skills

Add searchable multi-select skill chips.

Skills:
- React
- TypeScript
- JavaScript
- Node.js
- Python
- Java
- SQL
- APIs
- Git
- AWS
- Docker
- Figma
- Tailwind CSS
- Machine Learning
- Data Analysis

Each skill should be selectable as a chip.

Selected example:
React
TypeScript
Node.js

Add skill level filter for selected skills:
- Any Level
- Beginner
- Intermediate
- Advanced

Add match logic toggle:
- Match any selected skill
- Match all selected skills

--------------------------------------------------
FILTER SECTION 3: SOFT SKILLS
--------------------------------------------------

Section title:
Soft Skills

Add selectable chips:
- Communication
- Teamwork
- Problem Solving
- Leadership
- Adaptability
- Time Management
- Critical Thinking
- Self Learning
- Creativity
- Responsibility

Selected example:
Communication
Teamwork
Problem Solving

--------------------------------------------------
FILTER SECTION 4: INTERESTS
--------------------------------------------------

Section title:
Interests & Career Direction

Add selectable chips:
- Web Development
- Mobile Development
- Data Science
- AI / Machine Learning
- Cybersecurity
- UI/UX Design
- Product Management
- Cloud Computing
- Business Analysis
- Digital Marketing
- Sustainability
- FinTech
- HealthTech
- EdTech

Selected example:
Web Development
AI / Machine Learning

--------------------------------------------------
FILTER SECTION 5: AVAILABILITY STATUS
--------------------------------------------------

Section title:
Availability Status

Add checkboxes:
- Available Now
- Available Soon
- Interview Stage
- Matched
- Not In Training

Important:
In Training students should not appear in normal company candidate discovery results.

Add small note:
Students marked “In Training” are hidden from candidate discovery by default.

--------------------------------------------------
FILTER SECTION 6: EDUCATION
--------------------------------------------------

Section title:
Education

Fields:
- University
Dropdown/search:
  - Stanford University
  - MIT
  - University of Jordan
  - JUST
  - PSUT
  - Any University

- Major
Dropdown:
  - Computer Science
  - Software Engineering
  - Data Science
  - Cybersecurity
  - UI/UX Design
  - Business
  - Any Related Field

- Graduation Year
Dropdown:
  - 2025
  - 2026
  - 2027
  - 2028

--------------------------------------------------
FILTER SECTION 7: LOCATION & WORK MODE
--------------------------------------------------

Section title:
Location & Work Preference

Fields:
- Location
- Remote
- Hybrid
- On-site

Add chips:
- Same country
- Same city
- Open to remote
- Open to relocation

--------------------------------------------------
FILTER SECTION 8: PROFILE STRENGTH
--------------------------------------------------

Section title:
Profile Strength

Add range slider:
Minimum Profile Strength

Options:
- 50%+
- 60%+
- 70%+
- 80%+
- 90%+

Default:
70%+

--------------------------------------------------
ACTIVE FILTERS BAR
--------------------------------------------------

After applying filters, show an active filters bar above the candidate list.

Example:
Active Filters:
React
TypeScript
Match 80%+
Web Development
Available Now

Each active filter should be removable with an X icon.

Add:
Clear All

--------------------------------------------------
RESULT COUNT
--------------------------------------------------

Update the result count based on filters.

Example:
4 High-Match Candidates

After filters:
12 candidates match your filters

Or:
No candidates match your filters

--------------------------------------------------
EMPTY STATE
--------------------------------------------------

If no candidates match the selected filters, show an empty state.

Title:
No candidates found

Message:
Try lowering the match score or removing some skill filters.

Buttons:
- Reset Filters
- Edit Filters

--------------------------------------------------
CANDIDATE CARDS AFTER FILTERING
--------------------------------------------------

Candidate cards should clearly show why each result appears.

Each candidate card should include:
- Student name
- University
- Major
- Graduation year
- Location
- Match score
- Profile strength
- Availability
- Top technical skills
- Top soft skills
- Interests
- Matching reason

Example matching reason:
Strong match because Alex has React, TypeScript, and Web Development interest.

Buttons:
- View Profile
- Invite to Interview

--------------------------------------------------
SORTING
--------------------------------------------------

Keep the sort dropdown.

Sort options:
- Best Match
- Highest Profile Strength
- Most Relevant Skills
- Recently Updated
- Available Soonest

--------------------------------------------------
IMPORTANT UX BEHAVIOR
--------------------------------------------------

The filter panel should feel powerful but not crowded.

Use:
- Collapsible filter sections
- Searchable skill list
- Chips for skills and interests
- Sliders for match score and profile strength
- Checkboxes for availability
- Clear Apply/Reset buttons

Filtering must clearly support:
- Skills
- Interests
- Match score

Also include additional useful filters:
- Soft skills
- Availability
- Education
- Location
- Work preference
- Profile strength

Make sure the page still feels like an AI-assisted matching platform, not a normal candidate database.
Show compatibility score and match explanation on candidate cards.