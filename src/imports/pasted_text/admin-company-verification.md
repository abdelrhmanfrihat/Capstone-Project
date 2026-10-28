Update the Admin Portal → Dashboard page.

Make the buttons inside “Pending Company Verifications” fully functional:

- View All
- Review

Current context:
The Admin Dashboard shows a card called “Pending Company Verifications” with companies such as:
- Quantum Data
- Global Finance Systems

Each company row has a “Review” button.
The card also has a “View All” link/button.

These actions should not be decorative. Make them open the correct admin verification flows.

Keep the current InternMatch AI dark mode style:
- Dark navy background
- Blue primary color
- Same sidebar and top navigation
- Same cards, typography, spacing, icons, and rounded corners
- Professional admin SaaS UI

--------------------------------------------------
1. VIEW ALL BUTTON
--------------------------------------------------

When admin clicks “View All” in the Pending Company Verifications card, navigate to:

Admin → Company Verification

Page title:
Company Verification

Subtitle:
Review, approve, reject, or request more information from companies waiting for verification.

The page should show all pending company verification requests, not only the two shown on the dashboard.

Show a full verification management page with:

Top summary cards:
- Pending Reviews
- Approved Companies
- Rejected Companies
- High Risk Requests

Search and filters:
- Search by company name, email, industry, or website
- Filter by risk level
- Filter by submitted date
- Filter by status
- Filter by industry

Verification table/cards should show:
- Company name
- Contact email
- Website
- Industry
- Company size
- Submitted date
- Documents submitted
- Risk level
- Status
- Actions

Sample companies:
1. Quantum Data
Industry: AI Startup
Risk: Low Risk
Status: Pending Review

2. Global Finance Systems
Industry: Enterprise Finance
Risk: Medium Risk
Status: Pending Review

3. InnovateLabs Inc.
Industry: Software Development
Risk: Low Risk
Status: Pending Review

4. CloudBridge Solutions
Industry: Cloud Services
Risk: High Risk
Status: Needs Review

Each row/card action:
- Review
- View Details

--------------------------------------------------
2. REVIEW BUTTON
--------------------------------------------------

When admin clicks “Review” beside a company on the dashboard or on the Company Verification page, open a full Company Verification Review drawer or page for that specific company.

Do not open a placeholder.

Drawer/page title:
Company Verification Review

Subtitle:
Review submitted company information and decide whether to approve, reject, or request more information.

Use the selected company data.

Example selected company:
Quantum Data

--------------------------------------------------
REVIEW PAGE / DRAWER CONTENT
--------------------------------------------------

Section 1: Company Summary

Show:
- Company name
- Verification status: Pending Review
- Risk level: Low Risk / Medium Risk / High Risk
- Submitted date
- Industry
- Company size
- Website
- Contact email
- Contact person
- Location
- Company description

Example:
Company: Quantum Data
Industry: AI Startup
Email: hr@quantumdata.com
Website: https://quantumdata.com
Company Size: 11-50 employees
Submitted: 2026-05-18
Risk Level: Low Risk

--------------------------------------------------
Section 2: Submitted Documents

Show document cards:
- Business License
- Tax ID
- Company Profile
- Optional Authorization Letter if available

Each document card should include:
- Document name
- File type
- Upload date
- Status
- View button
- Download button
- Mark as Verified checkbox

Document statuses:
- Submitted
- Verified
- Missing
- Needs Clarification

--------------------------------------------------
Section 3: Verification Checklist

Add checklist items:

- Official company email verified
- Website is reachable
- Business license reviewed
- Tax ID reviewed
- Company profile reviewed
- Contact person information valid
- Company appears legitimate
- No suspicious activity detected

Each item should have:
- Checkbox
- Optional note

--------------------------------------------------
Section 4: Risk Assessment

Show risk indicators:
- Email domain matches company website
- Documents complete
- Company information consistent
- No duplicate company detected
- No suspicious reports

Risk badge:
Low Risk / Medium Risk / High Risk

Add admin note:
Risk notes textarea

--------------------------------------------------
Section 5: Admin Decision

Decision dropdown:
- Approve & Verify
- Reject
- Request More Information
- Suspend / Flag for Investigation

Reason / admin note:
Textarea required for Reject or Request More Information.

If Request More Information:
Show message box:
Write what information or documents the company needs to provide.

If Reject:
Show rejection reason:
- Invalid documents
- Suspicious company
- Incomplete information
- Website/email mismatch
- Duplicate account
- Other

Checkboxes:
- Notify company by email
- Add decision to audit log

--------------------------------------------------
ACTION BUTTONS
--------------------------------------------------

At the bottom of the review drawer/page, show:

Primary:
- Approve & Verify

Secondary:
- Request More Info

Danger:
- Reject

Other:
- Close

Button behavior:

Approve & Verify:
Show confirmation modal:

Title:
Approve Company?

Message:
This company will become verified and will be allowed to post internship and training opportunities.

Buttons:
- Cancel
- Approve & Verify

After approval:
- Company status becomes Verified
- Company receives Verified badge
- Company can post opportunities
- Dashboard pending count decreases
- Add audit log entry
- Show success toast:
Company verified successfully.

Request More Info:
Show confirmation modal:

Title:
Request More Information?

Message:
The company will be notified to update missing or unclear verification details.

Buttons:
- Cancel
- Send Request

After request:
- Company status becomes More Information Required
- Add audit log entry
- Show success toast:
Information request sent.

Reject:
Show danger confirmation modal:

Title:
Reject Company?

Message:
This company will not be verified and cannot post opportunities.

Buttons:
- Cancel
- Reject Company

After rejection:
- Company status becomes Rejected
- Add audit log entry
- Show success toast:
Company rejected.

--------------------------------------------------
DASHBOARD CONNECTION
--------------------------------------------------

After taking action:

If approved:
- Remove company from Pending Company Verifications card
- Decrease Action Required count if relevant
- Add Recent System Activity:
Company Approved — Company “Quantum Data” verified.

If rejected:
- Remove or update company status
- Add Recent System Activity:
Company Rejected — Company “Quantum Data” rejected.

If more info requested:
- Keep company visible but status becomes More Information Required
- Add activity log

--------------------------------------------------
VIEW ALL CONNECTION
--------------------------------------------------

The View All button should always navigate to the full Company Verification page.

The Review button should always open the review drawer/page for the selected company.

Both actions should feel connected:
Admin Dashboard
→ View All
→ Company Verification page

Admin Dashboard
→ Review
→ Company Verification Review details

--------------------------------------------------
DESIGN QUALITY
--------------------------------------------------

Do not leave “View All” or “Review” inactive.
Do not create placeholder pages.

Make the flow feel like a real admin verification process:
- Dashboard summary
- View all pending companies
- Review company details
- Check documents
- Approve / reject / request more info
- Update dashboard and audit logs

Keep the UI clean, dark, blue, professional, and admin-grade.