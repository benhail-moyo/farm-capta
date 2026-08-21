# FarmLink Zimbabwe — Prototype / Proof-of-Concept Build Specification

## 1. Purpose

Build a polished, realistic prototype/proof-of-concept for **FarmLink Zimbabwe**, an agricultural verification, financing intelligence, and future agricultural investment platform.

The prototype should demonstrate what the product can eventually become while keeping the current business strategy clear:

1. **Phase 1:** Farm and land verification + B2B agricultural risk/data intelligence.
2. **Phase 2:** Farm monitoring, financing connections, portfolio intelligence and ecosystem content.
3. **Phase 3:** A regulated agricultural investment marketplace operated only after the required legal/regulatory approvals and preferably through a licensed financial partner.

This is a **prototype**, not a production financial platform. Do not imply that users can legally invest, lend, transfer money, or make binding financial commitments through the prototype.

The interface must feel like a legitimate fintech/agritech product rather than a student CRUD application.

---

# 2. Product Positioning

## Core positioning

> **FarmLink helps agriculture become more bankable by making farms, farmers, land information, operational data and agricultural opportunities easier to verify and assess.**

The primary Phase 1 customer is the institutional financing side:

- Banks
- Microfinance institutions
- Agricultural lenders
- Input-financing companies
- Contract farming companies
- Development finance institutions

Farmers and landowners use FarmLink to establish a verified digital farm profile and potentially become more visible to legitimate financing partners.

Future investors should be supported as a **prototype role**, but investment functionality must remain clearly marked as:

> **Coming Soon / Subject to Regulatory Approval**

Do not build a fake investment transaction flow.

---

# 3. Important Legal / Compliance Principles

The prototype must demonstrate responsible onboarding and financial-product UX.

## 3.1 Do not represent the prototype as a licensed investment platform

Every investment-related area should contain appropriate prototype language such as:

> FarmLink is currently developing its agricultural investment infrastructure. Investment products shown in this prototype are illustrative only and are not offers to invest, securities, financial advice, or solicitations to purchase financial products.

Where appropriate:

> Actual investment products will only be made available following applicable regulatory approvals and/or through appropriately licensed financial partners.

Do not fabricate a regulatory licence number.

Do not claim that FarmLink is licensed by SECZ, RBZ, a bank, or any other regulator.

## 3.2 KYC / identity verification

Create a realistic onboarding workflow that demonstrates:

- Identity information
- Date of birth
- Nationality
- Residential address
- Contact information
- Identification document upload
- Selfie/liveness placeholder
- Terms acceptance
- Privacy consent
- Declaration of information accuracy
- Verification status

For an investor prototype, include a suitability/risk questionnaire where appropriate.

Do not ask for unnecessary sensitive information.

## 3.3 AML / source-of-funds awareness

For the investor onboarding prototype include:

- Source of funds
- Employment/business income source
- Expected investment activity
- Politically exposed person (PEP) declaration
- Sanctions/compliance screening status placeholder
- Risk classification placeholder

Clearly mark these as simulated/prototype checks.

## 3.4 Farmer/landowner verification

The farmer onboarding should capture:

- Full legal name
- Contact information
- Farm name
- Farm location
- GPS/location
- Farm size
- Land tenure type
- Available land documentation
- Crops/livestock
- Production history
- Current production status
- Irrigation/access to water
- Equipment/assets
- Existing financing
- Offtaker/buyer relationships
- Supporting documents
- Consent to verification

Land tenure must not be presented as universally equivalent to title ownership. Use terminology appropriate to the actual document supplied by the farmer.

## 3.5 Consent

Use explicit consent screens for:

- Identity verification
- Farm verification
- Data processing
- Sharing relevant information with approved financing partners
- Marketing communications separately from essential service communications

Do not bundle every consent into one checkbox.

---

# 4. User Roles

Implement role-based experiences for:

## A. Farmer / Landowner

Primary objectives:

- Create a farm profile
- Submit verification information
- Track verification status
- Improve farm bankability
- View financing opportunities
- Manage documents
- Track financing applications
- Monitor farm performance
- Read agricultural information
- Follow relevant institutions/farms

## B. Investor

Prototype-only future role.

Objectives:

- Complete KYC onboarding
- Set investment preferences
- Explore illustrative agricultural opportunities
- Review farm/project information
- View risk information
- Save opportunities
- Follow farms/institutions
- View an educational investment section

Actual investment/payment should be disabled or represented as a clearly labelled prototype flow.

## C. Lender / Financial Institution

This is the most commercially important dashboard.

Objectives:

- Discover verified farms
- Search/filter farms
- Review farm verification reports
- Assess risk
- Manage financing pipeline
- Track portfolio
- Monitor funded farms
- Review documents
- Manage applications
- Publish financing products
- Publish agricultural insights/posts

## D. Farm / Agricultural Business

Large farms and agricultural businesses can have an institutional profile.

They should be able to:

- Publish farm updates
- Share production stories
- Share achievements
- Publish verified performance information
- Attract financing/offtake relationships
- Build a public agricultural profile

## E. Admin / Compliance Officer

Objectives:

- Review KYC cases
- Review farm verification cases
- Manage users
- Manage institutions
- Review documents
- Handle verification exceptions
- Manage content
- Manage reports/flags
- View audit logs
- Manage platform configuration

---

# 5. Recommended Technology

Build a modern web application.

Preferred stack:

- Frontend: React + TypeScript
- Styling: Tailwind CSS
- UI primitives: shadcn/ui or equivalent
- Icons: Lucide
- Charts: Recharts
- Backend: Python Flask REST API
- Database: PostgreSQL for the prototype if available; SQLite is acceptable for local/demo mode
- Authentication: secure session/JWT abstraction
- File storage: local development storage abstraction
- Maps: Mapbox/OpenStreetMap abstraction
- State management: React Query + lightweight local state where appropriate

The architecture should allow the backend and frontend to be separated cleanly.

If building a frontend-only proof of concept, create realistic mock services/interfaces so replacing them with Flask endpoints later is straightforward.

---

# 6. Design Direction

## Overall aesthetic

FarmLink should look like a combination of:

- Modern fintech
- Premium agritech
- Institutional banking software
- Professional agricultural marketplace

Avoid:

- Excessive cards
- Crowded dashboards
- Giant gradients
- Overuse of green
- Cartoon farming imagery
- Generic SaaS templates
- Excessive animations
- Dense tables everywhere

## UI principles

- Clean whitespace
- Strong typography hierarchy
- Compact but readable navigation
- Clear status indicators
- Consistent spacing
- Responsive layouts
- Accessible contrast
- Minimal visual noise
- Clear calls to action
- Progressive disclosure
- Professional charts

## Suggested visual language

Primary:
- Deep agricultural green
- Off-white/neutral backgrounds
- Charcoal text
- Muted secondary text

Supporting:
- Amber for warnings
- Blue for informational states
- Red only for serious errors/risk
- Green for verified/success states

Do not use color alone to communicate meaning.

---

# 7. Global Navigation

## Public navigation

- Home
- How FarmLink Works
- Farms
- Financing
- Agri News
- Insights
- About
- Sign In
- Get Started

## Authenticated farmer navigation

- Overview
- My Farm
- Verification
- Financing
- Monitoring
- Documents
- Agri Feed
- Messages
- Profile

## Lender navigation

- Overview
- Farm Discovery
- Applications
- Portfolio
- Monitoring
- Reports
- Financing Products
- Agri Feed
- Messages
- Institution Profile

## Investor navigation

- Overview
- Opportunities
- Saved
- Watchlist
- Portfolio (prototype)
- Education
- Agri Feed
- Profile

Clearly label future investment functionality as prototype/coming soon.

## Admin navigation

- Overview
- KYC Queue
- Farm Verification
- Users
- Institutions
- Content
- Reports & Flags
- Audit Logs
- Settings

---

# 8. Public Website Pages

## 8.1 Landing Page

Hero:

> **Making Zimbabwean agriculture more bankable.**

Supporting copy:

> FarmLink verifies agricultural operations, organizes farm intelligence and connects credible agricultural businesses with financing ecosystems.

Primary CTA:

> Get Your Farm Verified

Secondary CTA:

> Explore Farm Opportunities

The investment CTA must include a "Prototype / Coming Soon" label.

Sections:

1. Problem
2. How FarmLink works
3. For farmers
4. For lenders
5. For agricultural businesses
6. Future investment infrastructure
7. Agricultural intelligence
8. Trust and verification
9. Featured farms
10. Featured institutions
11. Agri news
12. Final CTA

---

# 9. Farmer Onboarding

Create a serious multi-step onboarding wizard.

## Step 1 — Account

- Email/phone
- Password
- Account type
- Terms

## Step 2 — Identity

- Full legal name
- Date of birth
- Nationality
- ID type
- ID number
- Document upload
- Residential address

## Step 3 — Farm

- Farm name
- Farm location
- Province
- District
- GPS location
- Farm size
- Agricultural activity

## Step 4 — Land / Tenure

Options:

- Title deed
- Lease
- A1/A2 or other applicable agricultural tenure/documentation
- Communal/customary arrangement
- Other

Do not assume all options establish ownership.

Upload supporting documentation.

## Step 5 — Production

- Crops
- Livestock
- Production area
- Historical yields
- Current season
- Irrigation
- Equipment
- Labour
- Storage

## Step 6 — Market

- Current buyers
- Offtakers
- Contract farming
- Estimated annual production
- Market access

## Step 7 — Financing

- Existing financing
- Amount required
- Purpose
- Desired financing period
- Preferred financing partners

## Step 8 — Consent

Separate checkboxes:

- Identity verification consent
- Farm verification consent
- Data processing consent
- Partner-sharing consent
- Marketing consent

## Step 9 — Review

Show every submitted field.

Allow editing.

## Step 10 — Verification

Display:

> Verification submitted

Status:

- Submitted
- Under Review
- Action Required
- Verified
- Rejected

Never automatically show "Verified" unless the prototype explicitly simulates an approved case.

---

# 10. Farmer Dashboard

Create a calm, useful dashboard.

Top:

> Good morning, Tendai

Farm verification card:

> Farm Verification — 82% complete

CTA:

> Complete Verification

KPIs:

- Verification status
- Farm profile completeness
- Financing opportunities
- Active applications

Sections:

### My Farm

- Farm photo
- Farm name
- location
- acreage
- crops
- tenure status
- verification badge

### Financing Readiness

Use a non-credit-score terminology unless legally appropriate:

> **Financing Readiness: Strong**

Show contributing factors:

- Identity verified
- Farm location verified
- Documentation complete
- Production history available
- Buyer/offtaker information available

### Applications

Table/list:

- Institution
- Product
- Amount
- Status
- Last updated

### Monitoring

- Crop status
- Expected harvest
- Weather placeholder
- Production milestones

### Recommended actions

Examples:

- Upload missing lease document
- Add production records
- Complete buyer information
- Schedule field verification

---

# 11. Farmer Farm Profile

Create a detailed profile page.

Sections:

- Overview
- Verification
- Land & Tenure
- Production
- Infrastructure
- Equipment
- Financial readiness
- Market/offtakers
- Documents
- Monitoring

Use verification badges carefully.

Example:

> Farm location verified

not:

> Farm guaranteed

---

# 12. Lender Dashboard

This should be one of the strongest screens in the entire prototype.

Header:

> Agricultural Finance Intelligence

KPIs:

- Verified Farms
- Financing Applications
- Active Portfolio
- Portfolio at Risk
- Average Verification Time
- Applications Awaiting Review

Charts:

1. Applications over time
2. Financing by crop
3. Geographic distribution
4. Portfolio performance
5. Verification pipeline

---

# 13. Farm Discovery for Lenders

Create a powerful search interface.

Filters:

- Province
- District
- Crop
- Farm size
- Production scale
- Verification status
- Financing requirement
- Tenure/documentation type
- Offtaker availability
- Irrigation
- Risk/readiness category

Each farm result should show:

- Farm name
- Location
- Crop
- Size
- Verification status
- Financing requirement
- Production information
- Financing readiness
- Last verified date

CTA:

> View Farm Report

---

# 14. Lender Farm Due-Diligence Report

This should feel like a professional underwriting interface.

Sections:

## Identity

- Farmer identity verification
- Verification status

## Land

- Location
- Land size
- Tenure documentation
- Document status

## Operations

- Crops
- Production
- Equipment
- Labour
- Infrastructure

## Market

- Offtakers
- Contracts
- Historical buyers

## Financial Information

- Existing obligations
- Requested financing
- Financing purpose

## Verification Evidence

Show:

- Photos
- GPS
- uploaded documents
- field verification notes

## Risk / Readiness Summary

Use transparent factors instead of an unexplained black-box score.

Example:

> Financing Readiness: Strong

Factors:

- Documentation completeness: Strong
- Production evidence: Moderate
- Market evidence: Strong
- Verification confidence: Strong

Add:

> This information supports assessment and does not constitute a credit decision.

---

# 15. Lender Applications Pipeline

Use a Kanban or clean table:

- New
- Screening
- Due Diligence
- Approved
- Declined
- Funded
- Monitoring

Application detail:

- Farmer
- Farm
- Amount
- Purpose
- Documents
- Assessment
- Notes
- Activity log

---

# 16. Lender Portfolio Dashboard

Show:

- Total financed
- Number of farms
- Active facilities
- Repayment performance
- Geographic exposure
- Crop exposure
- Risk distribution

Include portfolio concentration warnings.

Example:

> 42% of current agricultural exposure is concentrated in maize.

---

# 17. Investor Onboarding

Investor onboarding must feel like legitimate financial onboarding.

Steps:

1. Account creation
2. Identity
3. Residential information
4. Employment/business information
5. Source of funds
6. Investment experience
7. Risk tolerance
8. Investment objectives
9. PEP declaration
10. Terms
11. Privacy consent
12. Verification

At the end:

> Profile submitted for verification.

Do not show a fictional instant approval.

---

# 18. Investor Dashboard

Since this is a prototype, create an illustrative dashboard.

Top banner:

> **Investment Marketplace — Prototype**

KPIs:

- Saved opportunities
- Watchlist
- Illustrative exposure
- Upcoming harvest cycles

Sections:

### Featured Opportunities

Each opportunity:

- Farm/business
- Crop
- Region
- Target amount
- Season
- Duration
- Historical performance
- Risk information
- Verification status

CTA:

> View Opportunity

Do not provide a "Invest Now" button unless it clearly opens a prototype-only simulation.

Use:

> View Details

or

> Notify Me When Available

---

# 19. Agricultural Opportunity Detail

Create a high-quality investment-style detail page.

Sections:

- Farm overview
- Farmer/business
- Location
- Crop
- Season
- Funding requirement
- Use of funds
- Production plan
- Historical performance
- Market/offtaker
- Verification
- Risks
- Insurance
- Monitoring plan
- Expected timeline

Important disclaimer:

> Illustrative opportunity for prototype demonstration only. Not an offer, solicitation, financial product or investment recommendation.

---

# 20. Farm / Agricultural Business Public Profiles

Allow high-quality agricultural businesses to build profiles.

Profile:

- Cover image
- Farm/business name
- Verification badge
- Region
- Established year
- Crops/livestock
- Farm size
- Production
- Certifications
- Offtakers
- Financing relationships
- Posts
- Updates

This creates a social/professional layer.

---

# 21. Agri Feed

Build an agricultural social/news feed.

Users can see:

- Farm updates
- Agricultural businesses
- Banks
- Microfinance institutions
- Input suppliers
- Agronomists
- NGOs
- Government/agricultural organizations

Posts can contain:

- Text
- Images
- Videos
- Farm milestones
- Harvest updates
- Market information
- Educational content

Actions:

- Like
- Comment
- Save
- Share
- Follow

Avoid making this look like a generic social network.

It should be **professional agricultural intelligence + community**.

---

# 22. Agri News

Create a dedicated news page.

Categories:

- Zimbabwe Agriculture
- Markets
- Commodities
- Weather
- Policy
- Finance
- Technology
- Agribusiness
- International Agriculture

Cards:

- Headline
- Category
- Date
- Source
- Summary
- Read More

For the prototype, use clearly labelled mock/sample content if external news integration is not implemented.

Do not fabricate quotes or claim a real institution published something when it did not.

---

# 23. Institutional Pages

Banks and agricultural finance institutions should have profiles.

Example categories:

- Commercial Bank
- Microfinance
- Input Financier
- Insurance
- Development Finance
- Offtaker

Institution page:

- Logo
- Name
- Verification status
- Description
- Financing products
- Eligibility
- Agriculture focus
- Regions served
- Posts
- Contact/application CTA

Example CTA:

> View Agricultural Financing Products

---

# 24. Financing Marketplace

Create a non-transactional financing discovery marketplace.

Farmers can browse:

- Working capital
- Input finance
- Equipment finance
- Irrigation finance
- Livestock finance
- Crop finance

Each product:

- Provider
- Financing type
- Amount range
- Duration
- Eligibility
- Required documents
- Region
- Application process

CTA:

> Check Eligibility

or

> Start Application

The prototype can simulate the application flow but must not pretend to transfer funds.

---

# 25. Messaging

Create role-aware messaging.

Farmer ↔ Lender

Farmer ↔ Institution

Farmer ↔ FarmLink support

Investor ↔ FarmLink support

Do not allow unrestricted financial solicitation.

Include reporting/blocking.

---

# 26. Notifications

Notification types:

- Verification update
- Missing document
- Application status
- New financing opportunity
- Farm monitoring update
- Institution post
- News alert

---

# 27. Admin / Compliance Console

Admin dashboard should be highly functional.

Sections:

## KYC Queue

Columns:

- User
- Role
- Submission date
- Verification status
- Risk flag
- Reviewer
- Action

## Farm Verification Queue

- Farm
- Farmer
- Location
- Documents
- Verification stage
- Field agent
- Reviewer

## Document Review

Show:

- document
- type
- status
- uploader
- verification notes

## Content Moderation

Review:

- posts
- comments
- reports

## Audit Log

Track:

- login
- profile updates
- KYC review
- document review
- verification decisions
- administrative changes

Use immutable-looking audit records in the UI, but make it clear this is a prototype.

---

# 28. Verification Status System

Standardize statuses.

User KYC:

- Not Started
- In Progress
- Submitted
- Under Review
- Action Required
- Verified
- Rejected

Farm:

- Draft
- Submitted
- Document Review
- Field Verification
- Verified
- Action Required
- Rejected

Application:

- Draft
- Submitted
- Screening
- Due Diligence
- Approved
- Declined
- Funded
- Monitoring
- Completed

---

# 29. Trust Layer

FarmLink's strongest UI feature should be trust.

Create consistent verification badges:

### Identity Verified

Identity information reviewed.

### Farm Location Verified

Farm location evidence reviewed.

### Documents Reviewed

Submitted documentation reviewed.

### Operational Profile Verified

Operational information reviewed.

### Institutional Account Verified

Institutional identity and profile reviewed.

Never imply that verification means:

- guaranteed repayment
- profitable farming
- guaranteed returns
- government endorsement

---

# 30. Data Model

Design entities around:

- User
- Role
- KYCProfile
- Farm
- LandTenure
- FarmDocument
- VerificationCase
- VerificationEvidence
- Crop
- ProductionRecord
- Offtaker
- FinancingProduct
- FinancingApplication
- LenderInstitution
- FarmMonitoringRecord
- InvestorProfile
- Opportunity
- Watchlist
- Post
- Comment
- Like
- NewsArticle
- Notification
- Message
- Report
- AuditLog

Use relationships properly.

Example:

User
→ owns/manages Farm

Farm
→ has Documents

Farm
→ has VerificationCase

Farm
→ has ProductionRecords

Institution
→ publishes FinancingProducts

Farmer
→ submits FinancingApplications

Institution
→ reviews FinancingApplications

Farm
→ may appear as an illustrative Opportunity

---

# 31. Sample Prototype Data

Create realistic but fictional Zimbabwean data.

Examples:

## Farms

- Nyika Plains Farm
- Mupfure Agri Estate
- Green Valley Produce
- Umfuli Grain & Livestock
- Mazowe Horticulture Estate

Use fictional names unless clearly sourced from public information.

Locations can include:

- Mashonaland Central
- Mashonaland East
- Mashonaland West
- Midlands
- Manicaland
- Matabeleland
- Masvingo

Crops:

- Maize
- Wheat
- Soybeans
- Tobacco
- Cotton
- Horticulture
- Groundnuts

Do not represent fictional farms as real businesses.

---

# 32. Analytics

Add realistic charts.

Farmer:

- production trend
- financing application status
- profile completion

Lender:

- application volume
- financing by crop
- geographic distribution
- verification turnaround
- portfolio performance

Admin:

- KYC volume
- verification queue
- platform activity
- user growth
- content moderation

Investor prototype:

- watchlist
- opportunity distribution
- illustrative portfolio

---

# 33. Search

Global search should support:

- Farms
- Farmers
- Institutions
- Financing products
- News
- Posts

Search results should be categorized.

---

# 34. Responsive Design

The application must work well on:

- Desktop
- Laptop
- Tablet
- Mobile

Farmers in rural environments may use lower-end mobile devices, so:

- Keep pages lightweight.
- Avoid excessive animations.
- Use compressed images.
- Design touch-friendly controls.
- Ensure forms are mobile-first.
- Avoid huge JavaScript bundles where possible.

---

# 35. Accessibility

Implement:

- semantic HTML
- keyboard navigation
- visible focus states
- accessible labels
- adequate contrast
- error messages
- form validation
- screen-reader-friendly status indicators

---

# 36. Authentication

Prototype authentication should support:

- Sign up
- Sign in
- Forgot password
- Email/phone verification
- Role selection
- Session persistence
- Logout

Do not store passwords in plaintext.

If authentication is mocked, make the abstraction production-replaceable.

---

# 37. Form Validation

Every onboarding form should have meaningful validation.

Examples:

- required fields
- valid email
- valid phone
- document type
- file type
- file size
- numeric farm size
- financing amount
- consent requirements

Show useful inline errors.

---

# 38. Empty States

Every dashboard should have thoughtful empty states.

Examples:

> You haven't submitted a financing application yet.

CTA:

> Explore Financing

For lenders:

> No applications match your filters.

For investors:

> Your watchlist is empty.

---

# 39. Loading States

Use:

- Skeleton loaders
- Progress indicators
- Upload progress
- Verification progress

Avoid arbitrary spinners everywhere.

---

# 40. Error States

Provide:

- Network error
- Upload failure
- Validation error
- Permission denied
- Session expired

Messages should explain what the user can do next.

---

# 41. Security Requirements for the Prototype

Even in prototype mode:

- Never expose passwords.
- Never hardcode secrets.
- Validate uploads.
- Restrict access by role.
- Prevent users from viewing other users' private documents.
- Separate public and private profile information.
- Protect API endpoints with authorization.
- Log sensitive administrative actions.
- Avoid putting ID numbers or sensitive documents into public URLs.
- Use environment variables for configuration.

---

# 42. Demo Mode

Build a powerful demo mode.

Create demo accounts:

### Farmer Demo

Email:

`farmer.demo@farmlink.local`

Role:

Farmer

### Lender Demo

`lender.demo@farmlink.local`

Role:

Lender

### Investor Demo

`investor.demo@farmlink.local`

Role:

Investor

### Admin Demo

`admin.demo@farmlink.local`

Role:

Admin

These are local prototype accounts only.

Allow switching between demo roles from a development/demo control without compromising role authorization.

---

# 43. Prototype Scenarios

The completed application must demonstrate these end-to-end flows.

## Scenario A — Farmer

1. Create account
2. Select Farmer
3. Complete identity onboarding
4. Create farm
5. Upload land document
6. Submit verification
7. See verification status
8. Complete farm profile
9. Browse financing
10. Start financing application
11. Read Agri News
12. Follow an institution
13. View dashboard

## Scenario B — Lender

1. Sign in
2. View lender dashboard
3. Discover farms
4. Filter farms
5. Open farm report
6. Review evidence
7. Review financing application
8. Move application through pipeline
9. View portfolio
10. Publish financing product
11. Publish agricultural post

## Scenario C — Investor

1. Sign up
2. Complete KYC prototype
3. Complete suitability questionnaire
4. Enter dashboard
5. Browse illustrative opportunities
6. Save an opportunity
7. Review opportunity details
8. Read risk disclosures
9. Join waitlist/notify-me
10. View educational content

## Scenario D — Admin

1. Sign in
2. View KYC queue
3. Review farmer
4. Review farm verification
5. Approve/reject/request changes
6. Moderate a post
7. View audit log

---

# 44. Landing Page Copy Direction

Use confident but responsible language.

Avoid:

> Guaranteed agricultural returns.

Use:

> Better agricultural information. Better financing decisions.

Avoid:

> Invest in Zimbabwe's farms today.

Use:

> Building the infrastructure for trusted agricultural investment.

Avoid:

> FarmLink guarantees verified farms.

Use:

> FarmLink helps create standardized, evidence-based farm profiles.

---

# 45. Key Product Differentiator

The interface should repeatedly reinforce:

> **Verified information → Better decisions → More productive capital**

Visualize this as:

Farmer
→ Verification
→ Farm Intelligence
→ Financing
→ Monitoring
→ Performance

Future:

Performance
→ Investment infrastructure

---

# 46. Recommended Dashboard Information Architecture

Do not put everything on one screen.

Use progressive disclosure.

For example, the lender home page should show:

1. KPI summary
2. Priority actions
3. Application pipeline
4. Portfolio chart
5. Recommended farms
6. Recent activity

Detailed information belongs on dedicated pages.

This is essential for maintaining the requested **clean, unclustered UI**.

---

# 47. Navigation Behavior

Desktop:

- Persistent left sidebar for authenticated users
- Top bar with search, notifications and profile

Mobile:

- Bottom navigation for primary sections
- Drawer for secondary sections

Do not duplicate every desktop navigation item on mobile.

---

# 48. Component System

Create reusable components:

- Button
- Input
- Select
- DatePicker
- FileUploader
- Stepper
- StatusBadge
- VerificationBadge
- MetricCard
- ChartCard
- FarmCard
- InstitutionCard
- FinancingProductCard
- OpportunityCard
- NewsCard
- PostCard
- DataTable
- FilterBar
- EmptyState
- Alert
- Modal
- Drawer
- Timeline
- ActivityFeed
- DocumentViewer
- ProfileHeader

Maintain consistent component behavior throughout the product.

---

# 49. Important UX Rule

Do not make every element a card.

Use:

- cards for summaries
- tables for structured datasets
- timelines for processes
- lists for feeds
- tabs for related information
- full-width sections for important reports

The goal is **information hierarchy**, not card accumulation.

---

# 50. Implementation Order

Build in this order:

## Milestone 1

- App shell
- Authentication
- Role selection
- Design system
- Responsive layout

## Milestone 2

- Farmer onboarding
- Farmer dashboard
- Farm profile
- Verification workflow

## Milestone 3

- Lender dashboard
- Farm discovery
- Farm due-diligence report
- Financing application pipeline

## Milestone 4

- Investor onboarding
- Investor prototype dashboard
- Illustrative opportunities
- Risk disclosures

## Milestone 5

- Financing marketplace
- Institution profiles
- Agricultural feed
- Agri News

## Milestone 6

- Admin/compliance console
- KYC queue
- Verification queue
- Audit logs

## Milestone 7

- Analytics
- Notifications
- Messaging
- Search
- Demo scenarios

## Milestone 8

- UX polish
- Accessibility
- Responsive QA
- Security review
- Empty/error/loading states

---

# 51. Definition of Done

The prototype is complete when:

- All four major roles work.
- Farmer onboarding is multi-step and realistic.
- KYC is represented responsibly.
- Farm verification has a complete workflow.
- Lenders can discover and evaluate farms.
- Lenders have a portfolio/dashboard experience.
- Investors have a compliant prototype onboarding flow.
- Investment functionality is clearly non-live.
- Financing products can be browsed.
- Agricultural businesses have public profiles.
- Agri News exists.
- Agricultural social/feed functionality exists.
- Institutions can publish content.
- Admin can manage verification and content.
- Role-based access works.
- Mobile UI works.
- Loading/error/empty states exist.
- The UI is clean and not overcrowded.
- Demo accounts make the prototype easy to demonstrate.

---

# 52. What NOT to Build

Do not waste prototype time on:

- Real money transfers
- Real investment transactions
- Cryptocurrency
- Complex AI credit scoring
- Full accounting
- Payroll
- Blockchain land registry
- Full ERP functionality
- Complex satellite analytics
- Real regulatory integrations without credentials
- Real KYC vendor integration without approval
- Real payment gateway integration

The prototype should prove the **product experience and business workflow**, not solve every technical problem.

---

# 53. Success Criteria

A person seeing the prototype should immediately understand:

### For a farmer:

> "FarmLink can help me build a credible digital farm profile and discover financing."

### For a lender:

> "FarmLink can help me find and assess agricultural businesses more efficiently."

### For an agricultural business:

> "FarmLink gives me a professional presence and access to financing/offtake opportunities."

### For an investor:

> "FarmLink is building a trusted agricultural investment ecosystem, but it is not pretending to be a live investment platform before regulatory readiness."

### For an investor evaluating FarmLink as a startup:

> "This company is building agricultural verification and risk infrastructure first, with investment as a future expansion."

---

# 54. Final Product Vision

The prototype should feel like the first version of a future platform that combines:

**LinkedIn + agricultural intelligence + lender underwriting tools + verified farm profiles + financing marketplace + future regulated investment infrastructure.**

However, do not make it feel like five unrelated products.

The core product should always revolve around:

> **Verified agricultural information.**

Everything else should connect to that core.

---

# 55. Final AI Agent Instruction

Build the application as a polished, investor-demo-quality proof of concept.

Prioritize:

1. UX quality
2. Clear information architecture
3. Trust and verification
4. Realistic onboarding
5. Role-specific dashboards
6. Financial/legal responsibility
7. Responsive design
8. Reusable components
9. Realistic mock data
10. Demonstrable end-to-end workflows

Before considering the build complete, manually test every primary user journey.

The final result should look like a serious Zimbabwean agritech/fintech startup preparing for institutional partnerships—not like a generic admin dashboard or university project.

When there is a conflict between visual complexity and clarity, choose clarity.

When there is a conflict between a flashy investment feature and regulatory responsibility, choose regulatory responsibility.

When there is a conflict between building many features and making the core workflow excellent, choose the core workflow.
