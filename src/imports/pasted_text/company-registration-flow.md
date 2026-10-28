Create a complete “Register as Company” flow for InternMatch AI.

The goal:
Companies should be able to create an account and submit verification information during registration. After submission, the company information should appear in the Admin Portal under “Company Verification” as a pending review card similar to the current admin verification card.

Keep the same InternMatch AI design style:
- Dark navy / blue SaaS style
- Blue as the primary color
- Professional, clean, trustworthy
- Rounded cards
- Clear form fields
- Light and dark mode support
- Strong spacing and readable layout

--------------------------------------------------
COMPANY REGISTRATION PAGE
--------------------------------------------------

Page title:
Register as Company

Subtitle:
Create your company account and submit verification details so admins can review and approve your organization.

Add a step-based registration form with progress indicator:

Step 1: Account Information
Step 2: Company Information
Step 3: Verification Documents
Step 4: Review & Submit

--------------------------------------------------
STEP 1: ACCOUNT INFORMATION
--------------------------------------------------

Fields:
- Company Email
- Password
- Confirm Password
- Contact Person Full Name
- Contact Person Job Title
- Contact Phone Number

Add helper text:
Use an official company email address. This email will be used for login and admin communication.

Buttons:
- Continue
- Already have an account? Sign in

--------------------------------------------------
STEP 2: COMPANY INFORMATION
--------------------------------------------------

Fields:
- Company Name
Example: InnovateLabs Inc.

- Company Website
Example: https://innovatelabs.com

- Industry
Dropdown options:
  - Software Development
  - AI / Machine Learning
  - Cybersecurity
  - Data Analytics
  - FinTech
  - HealthTech
  - EdTech
  - E-commerce
  - Marketing
  - Other

- Company Size
Dropdown options:
  - 1-10 employees
  - 11-50 employees
  - 50-200 employees
  - 201-500 employees
  - 500+ employees

- Company Location
- Company Description
- LinkedIn Page URL
- Registration / License Number

Add a preview card on the right side that updates live while the company fills the form.

Preview card should show:
- Company icon
- Company name
- Company email
- Website link
- Industry
- Company size
- Submitted date placeholder
- Status badge: Pending Review

--------------------------------------------------
STEP 3: VERIFICATION DOCUMENTS
--------------------------------------------------

Create a document upload section.

Required documents:
1. Business License
2. Tax ID
3. Company Profile

Optional documents:
4. Company Logo
5. Authorization Letter
6. Additional Supporting Document

Each upload field should show:
- Upload area
- Accepted file types: PDF, PNG, JPG
- File size limit
- Uploaded file chip
- Remove file button
- Success checkmark after upload

Add info box:
Your company account will remain under “Pending Review” until an admin verifies the submitted information and documents.

--------------------------------------------------
STEP 4: REVIEW & SUBMIT
--------------------------------------------------

Create a final review page before submission.

Show a review summary card with:

Company:
- Company Name
- Company Email
- Website
- Industry
- Company Size
- Location

Contact:
- Contact Person
- Job Title
- Phone Number

Documents:
- Business License
- Tax ID
- Company Profile
- Optional documents if uploaded

Add checkboxes:
- I confirm that the submitted company information is accurate.
- I agree to the Terms of Service and Privacy Policy.
- I understand that my account requires admin verification before posting opportunities.

Buttons:
- Back
- Submit for Verification

After submission, show success screen:

Title:
Company Registration Submitted

Message:
Your company account has been submitted for admin review. You will be notified once your account is approved, rejected, or if more information is required.

Status badge:
Pending Review

Buttons:
- Go to Login
- Contact Support

--------------------------------------------------
ADMIN PORTAL CONNECTION
--------------------------------------------------

After company registration submission, create/update the Admin → Company Verification page to show the submitted company as a pending verification request.

The admin verification card should display exactly this kind of information:

Company name:
InnovateLabs Inc.

Company email:
hr@innovatelabs.com

Company website:
https://innovatelabs.com

Industry:
Software Development

Company Size:
50-200 employees

Submitted:
2026-05-16

Documents:
- Business License
- Tax ID
- Company Profile

Status badge:
Pending Review

Actions:
- Approve & Verify
- Reject
- View Details

Use the same card structure as the current design:
- Company icon on the left
- Company name and contact information
- Status badge on the top right
- Industry and submitted date on the left
- Company size and documents on the right
- Divider line
- Action buttons at the bottom

--------------------------------------------------
ADMIN COMPANY DETAILS MODAL / PAGE
--------------------------------------------------

When admin clicks “View Details”, open a details modal or page.

Title:
Company Verification Details

Sections:

1. Company Information
- Company name
- Website
- Industry
- Company size
- Location
- Company description
- LinkedIn page
- Registration/license number

2. Contact Information
- Contact person name
- Job title
- Email
- Phone number

3. Submitted Documents
Display document cards:
- Business License
- Tax ID
- Company Profile
Each document card should include:
- File name
- Upload date
- View button
- Download button
- Verification status

4. Admin Review
Fields:
- Review status dropdown:
  - Pending Review
  - Approved
  - Rejected
  - More Information Required
- Admin notes textarea
- Rejection reason textarea if rejected
- Request more info message if needed

5. Admin Actions
Buttons:
- Approve & Verify
- Reject
- Request More Info
- Suspend
- Close

--------------------------------------------------
IMPORTANT BUSINESS LOGIC
--------------------------------------------------

Before admin approval:
- Company status is Pending Review
- Company can log in but cannot post opportunities yet
- Show message: “Your account is under admin review.”
- Disable “Post Opportunity” button
- Allow company to edit submitted information if admin requests more info

After admin approval:
- Company status becomes Verified
- Company receives Verified badge
- Company can post internship/training opportunities
- Company appears trusted to students

If rejected:
- Company status becomes Rejected
- Show rejection reason
- Allow company to resubmit only if admin permits

If more information required:
- Company status becomes More Information Required
- Show admin message
- Let company upload missing documents or edit fields

--------------------------------------------------
UX STATES
--------------------------------------------------

Create these states:
- Empty upload state
- Uploaded document state
- Upload error state
- Pending review state
- Approved state
- Rejected state
- More information required state
- Disabled post opportunity state for unverified companies

--------------------------------------------------
DESIGN REQUIREMENTS
--------------------------------------------------

Make the company registration flow look trustworthy and official.

Do not make it just a simple sign-up form.

The registration must clearly collect the same information that appears in the Admin Company Verification card:
- Company name
- Email
- Website
- Industry
- Company size
- Submitted date
- Verification documents
- Pending Review status

Make the flow feel connected:
Company submits registration → Admin sees pending verification → Admin reviews details/documents → Admin approves/rejects/request more info → Company status updates.

Use blue as the primary color.
Keep the current InternMatch AI admin/company portal style.
Make the page professional and capstone-ready.