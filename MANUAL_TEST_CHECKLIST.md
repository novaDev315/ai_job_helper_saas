# Manual Testing Checklist & User Guide
## AI Job Helper SaaS Application

**Version:** 1.0.0
**Last Updated:** 2025-11-19
**Test Environment:** Development/Staging
**Tester:** _________________
**Test Date:** _________________

---

## Table of Contents

1. [Pre-Test Setup](#1-pre-test-setup)
2. [Feature Testing Checklists](#2-feature-testing-checklists)
3. [User Journey Testing](#3-user-journey-testing)
4. [Integration Testing](#4-integration-testing)
5. [UI/UX Testing](#5-uiux-testing)
6. [Edge Cases & Error Handling](#6-edge-cases--error-handling)
7. [Performance Testing](#7-performance-testing)
8. [Browser Compatibility](#8-browser-compatibility)
9. [Mobile Responsiveness](#9-mobile-responsiveness)
10. [Bug Report Template](#10-bug-report-template)

---

## 1. Pre-Test Setup

### 1.1 Environment Configuration Checklist

**Backend Setup:**
- [ ] PostgreSQL database running
- [ ] Database migrations executed (`npm run prisma:migrate`)
- [ ] Backend server running on port 3001 (`npm run start:dev`)
- [ ] GraphQL Playground accessible at `http://localhost:3001/graphql`

**Frontend Setup:**
- [ ] Frontend server running on port 3000 (`npm run dev`)
- [ ] Application accessible at `http://localhost:3000`
- [ ] No console errors on page load

**Environment Variables (Optional for full testing):**
- [ ] `OPENAI_API_KEY` configured (for AI features)
- [ ] `STRIPE_SECRET_KEY` configured (for payments)
- [ ] `SENDGRID_API_KEY` configured (for emails)
- [ ] `CLERK_SECRET_KEY` configured (for auth)

**Test Data:**
- [ ] Test user account created
- [ ] Sample CV/resume text file prepared
- [ ] Sample job descriptions saved
- [ ] Test company information ready

---

## 2. Feature Testing Checklists

### 2.1 Landing Page Testing

**File:** `frontend/app/page.tsx`

#### Test Cases

| # | Test Case | Steps | Expected Result | Status | Notes |
|---|-----------|-------|-----------------|--------|-------|
| LP-01 | Landing page loads | 1. Navigate to `http://localhost:3000` | Page loads without errors, hero section visible | ☐ | |
| LP-02 | Header navigation | 1. Click "Features" link<br>2. Click "Pricing" link | Smooth scroll to respective sections | ☐ | |
| LP-03 | CTA buttons work | 1. Click "Get Started" button<br>2. Click "Start Free Trial" | Redirects to `/dashboard` | ☐ | |
| LP-04 | Logo visibility | 1. Check header logo<br>2. Verify Sparkles icon | Logo and app name visible | ☐ | |
| LP-05 | Statistics display | 1. Scroll to stats section | Shows "3x", "75%", "40%" metrics | ☐ | |
| LP-06 | Features section | 1. Scroll to features | Displays 5+ feature cards with icons | ☐ | |
| LP-07 | Pricing section | 1. Scroll to pricing | Shows 4 pricing tiers with features | ☐ | |
| LP-08 | Responsive design | 1. Resize browser to mobile width | Layout adapts, no horizontal scroll | ☐ | |

**Use Case: First-Time Visitor**
```
Scenario: Sarah visits the landing page to learn about the platform
1. Sarah opens the website
2. She reads the hero headline
3. She scrolls to see the 3x interview rate statistic
4. She explores the features section
5. She checks the pricing
6. She clicks "Start Free Trial"
Result: Sarah understands the value proposition and proceeds to sign up
```

---

### 2.2 CV Optimizer Feature Testing

**File:** `frontend/app/dashboard/cv/page.tsx`
**Backend:** `backend/src/cv/cv.service.ts`

#### Test Cases

| # | Test Case | Steps | Expected Result | Status | Notes |
|---|-----------|-------|-----------------|--------|-------|
| CV-01 | Access CV page | 1. Navigate to `/dashboard/cv` | CV optimizer page loads | ☐ | |
| CV-02 | File upload (TXT) | 1. Click file input<br>2. Select .txt file<br>3. Verify upload | CV content appears in textarea, toast notification shows | ☐ | |
| CV-03 | File upload (invalid) | 1. Try uploading .pdf file | Error toast: "Unsupported file type" | ☐ | |
| CV-04 | Paste CV text | 1. Paste CV text into left textarea | Text appears, character count updates | ☐ | |
| CV-05 | Empty CV optimization | 1. Click "Optimize CV" without content | Error toast: "No CV content" | ☐ | |
| CV-06 | Basic CV optimization | 1. Upload/paste CV<br>2. Click "Optimize CV"<br>3. Wait for processing | Loading spinner shows, optimized CV appears on right, ATS score displays (0-100) | ☐ | |
| CV-07 | Job-tailored optimization | 1. Upload CV<br>2. Paste job description<br>3. Click "Optimize CV" | Optimized CV tailored to job, higher ATS score | ☐ | |
| CV-08 | ATS score calculation | 1. Optimize CV<br>2. Check ATS score | Score between 0-100, visual indicator (color) | ☐ | |
| CV-09 | Download optimized CV | 1. Optimize CV<br>2. Click download button | CV downloads as .txt file | ☐ | |
| CV-10 | Clear and restart | 1. Clear textarea<br>2. Upload new CV | Previous content cleared, new CV loaded | ☐ | |
| CV-11 | Loading state | 1. Start optimization<br>2. Observe during processing | Loading spinner, disabled buttons | ☐ | |
| CV-12 | Long CV handling | 1. Upload CV >5000 characters | Handles large text, no performance issues | ☐ | |

**Detailed Test Procedure: CV Optimization**

```
Test: Complete CV Optimization Flow
Preparation:
- Have a sample CV ready (500-2000 words)
- Have a job description ready

Steps:
1. Navigate to Dashboard → CV Optimizer
2. VERIFY: Page displays two panels (Upload Your CV | Optimized CV)
3. Click on file upload input
4. Select a .txt file with CV content
5. VERIFY: Toast notification "CV uploaded"
6. VERIFY: CV text appears in left textarea
7. (Optional) Paste job description in "Job Description" field
8. Click "Optimize CV" button
9. VERIFY: Button shows loading state
10. VERIFY: Button is disabled during processing
11. Wait 2-3 seconds for optimization
12. VERIFY: Success toast appears
13. VERIFY: Optimized CV appears in right panel
14. VERIFY: ATS Score displays (e.g., "ATS Score: 78/100")
15. VERIFY: Score has visual indicator (color/badge)
16. Click download button (if available)
17. VERIFY: File downloads with .txt extension

Expected ATS Score Calculation:
- Base score: 50 points
- Keywords found (+5 each): experience, skills, achievement, project, education
- Quantifiable metrics (+15): Contains "5+ years", "20%", etc.
- Proper length (+10): 500-5000 characters
- Maximum: 100 points
```

**Use Case: Job Seeker Optimizing CV**
```
Scenario: Alex wants to optimize his CV for a Software Engineer role

1. Alex navigates to CV Optimizer
2. He uploads his current CV (2 pages, PDF - gets error)
3. He converts to .txt and uploads successfully
4. He pastes the job description from the posting
5. He clicks "Optimize CV"
6. System processes with AI (GPT-4)
7. Optimized CV appears with ATS score of 85/100
8. Alex reviews suggestions:
   - Added keywords: "Agile", "CI/CD", "microservices"
   - Quantified achievements: "Led team of 5 engineers"
   - Improved formatting for ATS parsing
9. He downloads the optimized version
10. He uses it for his application

Result: Alex has an ATS-optimized CV tailored to the specific job
```

---

### 2.3 Job Applications Tracker Testing

**File:** `frontend/app/dashboard/applications/page.tsx`
**Backend:** `backend/src/jobs/jobs.service.ts`

#### Test Cases

| # | Test Case | Steps | Expected Result | Status | Notes |
|---|-----------|-------|-----------------|--------|-------|
| APP-01 | Access applications page | 1. Navigate to `/dashboard/applications` | Applications page loads with stats cards | ☐ | |
| APP-02 | View statistics | 1. Check top section | Shows 5 stat cards: Total, Applied, Interview, Offer, Rejected | ☐ | |
| APP-03 | Add application button | 1. Click "+ Add Application" | Form modal/section appears | ☐ | |
| APP-04 | Add application (valid) | 1. Fill company name<br>2. Fill position<br>3. Click "Add Application" | Application added, appears in list, success toast | ☐ | |
| APP-05 | Add application (invalid) | 1. Click "Add Application" without filling required fields | Error toast: "Missing information" | ☐ | |
| APP-06 | Application list display | 1. View applications list | Shows cards with company, position, status, date | ☐ | |
| APP-07 | Status badges | 1. Check application status | Each status has distinct color badge | ☐ | |
| APP-08 | Update status | 1. Click status dropdown<br>2. Select new status (e.g., INTERVIEW) | Status updates, toast notification, stats update | ☐ | |
| APP-09 | Edit application | 1. Click edit icon<br>2. Modify fields<br>3. Save | Application updated successfully | ☐ | |
| APP-10 | Delete application | 1. Click delete icon<br>2. Confirm deletion | Application removed, success toast | ☐ | |
| APP-11 | Search functionality | 1. Type company/position in search<br>2. Observe results | List filters in real-time | ☐ | |
| APP-12 | Filter by status | 1. Select status filter (e.g., "Interview")<br>2. Observe list | Shows only matching applications | ☐ | |
| APP-13 | Empty state | 1. Delete all applications<br>2. View empty list | Shows empty state message or prompt | ☐ | |
| APP-14 | Application notes | 1. Add application with notes<br>2. View notes | Notes display correctly | ☐ | |
| APP-15 | Date tracking | 1. Check applied date | Shows correct date format | ☐ | |

**Detailed Test Procedure: Adding Job Application**

```
Test: Add and Manage Job Application
Steps:
1. Navigate to Dashboard → Applications
2. VERIFY: Statistics cards show:
   - Total: 0 (or existing count)
   - Applied: 0
   - Interview: 0
   - Offer: 0
   - Rejected: 0
3. Click "+ Add Application" button
4. VERIFY: Form appears with fields:
   - Company (required)
   - Position (required)
   - Location (optional)
   - Salary (optional)
   - Job URL (optional)
   - Notes (optional)
5. Fill in form:
   - Company: "TechCorp Inc"
   - Position: "Senior Software Engineer"
   - Location: "San Francisco, CA"
   - Salary: "$150K - $180K"
   - Notes: "Applied via LinkedIn"
6. Click "Add Application" button
7. VERIFY: Success toast appears
8. VERIFY: Application appears in list with:
   - Company name: "TechCorp Inc"
   - Position: "Senior Software Engineer"
   - Status badge: "APPLIED" (blue/gray color)
   - Applied date: Today's date
9. VERIFY: Statistics update:
   - Total: +1
   - Applied: +1
10. Click on status dropdown for the application
11. Select "INTERVIEW"
12. VERIFY: Status badge changes to "INTERVIEW"
13. VERIFY: Statistics update:
    - Applied: -1
    - Interview: +1
14. Click delete icon
15. VERIFY: Application removed from list
16. VERIFY: Statistics update back to original
```

**Use Case: Tracking Job Hunt Progress**
```
Scenario: Maria is actively job hunting and wants to track her applications

Day 1:
1. Maria adds her first application:
   - Company: "Google"
   - Position: "Product Manager"
   - Status: Applied
2. She adds notes: "Referred by John from networking event"
3. She sets a follow-up reminder for 1 week

Day 3:
4. Maria receives interview invitation
5. She updates status to "INTERVIEW"
6. She adds interview date in notes
7. Dashboard shows: 1 total, 0 applied, 1 interview

Week 2:
8. Maria adds 4 more applications
9. She uses search to find "Google" application
10. She updates it to "OFFER" status
11. Dashboard now shows: 5 total, 4 applied, 0 interview, 1 offer

Week 3:
12. Maria filters by "APPLIED" status
13. She follows up on pending applications
14. She updates 2 to "REJECTED"
15. She sees her success rate improving

Result: Maria has complete visibility of her job search pipeline
```

---

### 2.4 Cover Letter Generator Testing

**File:** `frontend/app/dashboard/cover-letters/page.tsx`
**Backend:** `backend/src/cover-letter/cover-letter.service.ts`

#### Test Cases

| # | Test Case | Steps | Expected Result | Status | Notes |
|---|-----------|-------|-----------------|--------|-------|
| CL-01 | Access cover letter page | 1. Navigate to `/dashboard/cover-letters` | Cover letter generator page loads | ☐ | |
| CL-02 | Form validation | 1. Click "Generate" without input | Error toast: "Missing information" | ☐ | |
| CL-03 | Generate letter (professional) | 1. Fill company, position, job desc<br>2. Select "Professional" tone<br>3. Click "Generate" | Letter generated with formal language | ☐ | |
| CL-04 | Generate letter (creative) | 1. Fill form<br>2. Select "Creative" tone<br>3. Click "Generate" | Letter generated with creative flair | ☐ | |
| CL-05 | Generate letter (casual) | 1. Fill form<br>2. Select "Casual" tone<br>3. Click "Generate" | Letter generated with friendly tone | ☐ | |
| CL-06 | Loading state | 1. Click "Generate"<br>2. Observe during processing | Loading spinner, disabled buttons | ☐ | |
| CL-07 | Generated content quality | 1. Generate letter<br>2. Review content | Includes company name, position, relevant skills | ☐ | |
| CL-08 | Copy to clipboard | 1. Generate letter<br>2. Click "Copy" button | Content copied, success toast | ☐ | |
| CL-09 | Download letter | 1. Generate letter<br>2. Click "Download" button | Letter downloads as .txt or .docx | ☐ | |
| CL-10 | Regenerate letter | 1. Generate letter<br>2. Click "Regenerate" | New variation created | ☐ | |
| CL-11 | Edit generated letter | 1. Generate letter<br>2. Edit in textarea<br>3. Save changes | Edits preserved | ☐ | |
| CL-12 | Previous letters history | 1. Generate multiple letters<br>2. View history | Shows previously generated letters | ☐ | |

**Detailed Test Procedure: Cover Letter Generation**

```
Test: Generate Tailored Cover Letter
Preparation:
- Have job posting details ready
- Company: "Innovative Tech Solutions"
- Position: "Full Stack Developer"
- Job description ready to paste

Steps:
1. Navigate to Dashboard → Cover Letters
2. VERIFY: Form displays with fields:
   - Company Name
   - Position
   - Job Description
   - Tone selector (dropdown)
3. Fill in Company Name: "Innovative Tech Solutions"
4. Fill in Position: "Full Stack Developer"
5. Paste job description (50+ words)
6. VERIFY: Character count updates (if shown)
7. Select tone: "Professional"
8. Click "Generate Cover Letter" button
9. VERIFY: Loading state appears
10. VERIFY: Button shows "Generating..." or spinner
11. Wait 2-3 seconds for AI generation
12. VERIFY: Success toast appears
13. VERIFY: Generated letter appears in right panel
14. VERIFY: Letter includes:
    - Greeting (e.g., "Dear Hiring Manager,")
    - Company name mentioned
    - Position mentioned
    - Relevant skills/experience
    - Professional closing
15. Check letter structure:
    - Introduction paragraph
    - 2-3 body paragraphs
    - Closing paragraph
    - Sign-off
16. Click "Copy to Clipboard" button
17. VERIFY: Success toast "Copied!"
18. Paste in notepad to verify
19. Test different tones:
    - Change to "Creative"
    - Regenerate
    - VERIFY: Different greeting ("Hello there!")
    - Change to "Casual"
    - Regenerate
    - VERIFY: More casual language ("Hi!")

Expected Letter Format (Professional):
Dear Hiring Manager,

I am writing to express my strong interest in the Full Stack Developer
position at Innovative Tech Solutions...

[Body with relevant experience and skills]

I would welcome the opportunity to discuss how my experience...

Best regards,
[Your Name]
```

**Use Case: Tailoring Cover Letters**
```
Scenario: James needs to write cover letters for 3 different job applications

Application 1: Startup (Creative approach)
1. James inputs company: "CoolStartup"
2. Position: "Frontend Developer"
3. Pastes job description emphasizing innovation
4. Selects "Creative" tone
5. Generates letter with engaging, innovative language
6. Copies and saves for application

Application 2: Corporate (Professional approach)
1. Company: "Fortune 500 Bank"
2. Position: "Senior Engineer"
3. Formal job description
4. Selects "Professional" tone
5. Gets formal, business-appropriate letter
6. Downloads as .docx

Application 3: Remote company (Casual approach)
1. Company: "RemoteFirst Co"
2. Position: "Developer"
3. Casual job posting
4. Selects "Casual" tone
5. Receives friendly, approachable letter
6. Edits to add personal touch

Result: James has 3 tailored letters in 15 minutes vs. 3 hours manually
```

---

### 2.5 Interview Preparation Testing

**File:** `frontend/app/dashboard/interview/page.tsx`
**Backend:** `backend/src/interview/interview.service.ts`

#### Test Cases

| # | Test Case | Steps | Expected Result | Status | Notes |
|---|-----------|-------|-----------------|--------|-------|
| INT-01 | Access interview prep page | 1. Navigate to `/dashboard/interview` | Interview prep page loads | ☐ | |
| INT-02 | Form validation | 1. Click "Generate Questions" without input | Error toast: "Missing information" | ☐ | |
| INT-03 | Generate questions | 1. Fill company & position<br>2. Click "Generate Questions" | 10+ questions generated | ☐ | |
| INT-04 | Question categories | 1. Generate questions<br>2. Review list | Questions categorized (General, Behavioral, Technical) | ☐ | |
| INT-05 | Difficulty levels | 1. Check questions | Each has difficulty (Easy, Medium, Hard) | ☐ | |
| INT-06 | Question tips | 1. Click/expand question<br>2. View tips | Shows STAR method tips or guidance | ☐ | |
| INT-07 | Practice mode | 1. Click "Practice" on a question<br>2. Enter answer | Answer recorded, timer tracks duration | ☐ | |
| INT-08 | Question navigation | 1. Navigate through questions<br>2. Use next/previous | Can browse all questions | ☐ | |
| INT-09 | Save practice notes | 1. Enter answer<br>2. Save notes | Notes saved for later review | ☐ | |
| INT-10 | Company research | 1. View company research section | Shows company info/tips | ☐ | |
| INT-11 | STAR method guide | 1. Check for STAR guidance | Displays STAR framework explanation | ☐ | |
| INT-12 | Question quality | 1. Review generated questions | Relevant to position, realistic | ☐ | |

**Detailed Test Procedure: Interview Preparation**

```
Test: Generate and Practice Interview Questions
Preparation:
- Company: "Amazon"
- Position: "Software Development Engineer"
- Job description (optional)

Steps:
1. Navigate to Dashboard → Interview Prep
2. VERIFY: Form displays with fields:
   - Company Name
   - Position
   - Job Description (optional)
3. Enter Company: "Amazon"
4. Enter Position: "Software Development Engineer"
5. (Optional) Paste job description
6. Click "Generate Interview Questions" button
7. VERIFY: Loading state appears
8. Wait 2-3 seconds for AI generation
9. VERIFY: Success toast appears
10. VERIFY: Question list appears with 8-10 questions
11. Check first few questions for relevance:
    - "Tell me about yourself and your background"
    - "What interests you about Amazon?"
    - "Describe a challenging project..."
12. VERIFY each question shows:
    - Question text
    - Category badge (General/Behavioral/Technical)
    - Difficulty badge (Easy/Medium/Hard)
13. Click on first question to expand
14. VERIFY: Tips section appears with guidance
15. Check for STAR method guidance:
    - Situation
    - Task
    - Action
    - Result
16. Click "Practice" button
17. VERIFY: Answer textarea appears
18. Type practice answer (100+ words)
19. VERIFY: Timer tracks time (if implemented)
20. Click "Save Answer"
21. VERIFY: Answer saved, success feedback
22. Navigate to next question
23. Repeat practice for 2-3 questions
24. Check "Company Research" section
25. VERIFY: Shows relevant company info/tips

Expected Question Examples:
Easy (General):
- "Tell me about yourself and your background."
- "What interests you about this position?"

Medium (Behavioral):
- "Describe a challenging project you worked on."
- "How do you handle conflicts with team members?"

Hard (Technical):
- "Explain your approach to system design."
- "How would you optimize a slow database query?"
```

**Use Case: Preparing for Big Tech Interview**
```
Scenario: Lisa has an upcoming interview at Google for SWE role

Week before interview:
1. Lisa opens Interview Prep
2. Enters: Company "Google", Position "Software Engineer"
3. Pastes job description from email
4. Generates 10 interview questions
5. Questions include:
   - "Why Google?" (Motivation)
   - "Design a URL shortener" (Technical)
   - "Tell me about a time you failed" (Behavioral)
6. She reviews tips for each question

Day before interview:
7. Lisa enters Practice Mode
8. She practices answering each question
9. She uses STAR method for behavioral questions:
   - Situation: "In my last project..."
   - Task: "I was responsible for..."
   - Action: "I implemented..."
   - Result: "This resulted in 30% improvement"
10. She times her responses (2-3 minutes each)
11. She saves notes for key points

Interview day:
12. Lisa reviews her practice answers
13. She feels confident with prepared responses
14. She aces the behavioral questions
15. She's ready for technical questions

Result: Lisa is well-prepared and confident in her interview
```

---

### 2.6 Billing & Subscription Testing

**File:** `frontend/app/dashboard/billing/page.tsx`
**Backend:** `backend/src/stripe/stripe.service.ts`

#### Test Cases

| # | Test Case | Steps | Expected Result | Status | Notes |
|---|-----------|-------|-----------------|--------|-------|
| BILL-01 | Access billing page | 1. Navigate to `/dashboard/billing` | Billing page loads with pricing tiers | ☐ | |
| BILL-02 | View current plan | 1. Check "Current Plan" section | Shows current tier (Free by default) | ☐ | |
| BILL-03 | View pricing tiers | 1. Review pricing section | Shows 4 tiers: Free, Pro, Premium, Enterprise | ☐ | |
| BILL-04 | Pricing tier details | 1. Check each tier | Shows price, features list, CTA button | ☐ | |
| BILL-05 | Popular tier highlight | 1. Check Pro tier | Marked as "Popular" or highlighted | ☐ | |
| BILL-06 | Feature comparison | 1. Compare tier features | Clear differentiation between tiers | ☐ | |
| BILL-07 | Upgrade button (Free) | 1. Click "Upgrade to Pro" from Free | Shows loading, simulates redirect | ☐ | |
| BILL-08 | Upgrade button (current) | 1. Click current plan button | Shows "Already on X Plan" toast | ☐ | |
| BILL-09 | Usage statistics | 1. View usage section | Shows CV optimizations, letters used | ☐ | |
| BILL-10 | Usage progress bars | 1. Check progress indicators | Shows used/remaining with visual bar | ☐ | |
| BILL-11 | FAQ section | 1. Scroll to FAQ | Shows 4+ common questions | ☐ | |
| BILL-12 | Billing history | 1. Check billing history (if exists) | Shows past invoices/payments | ☐ | |

**Pricing Tiers Reference:**

```
Free - $0/month:
✓ 3 CV optimizations per month
✓ 5 cover letters per month
✓ Basic application tracking
✓ 10 interview questions
✓ Community support
✓ Basic analytics

Pro - $29/month (Most Popular):
✓ Unlimited CV optimizations
✓ Unlimited cover letters
✓ Advanced application tracking
✓ Unlimited interview prep
✓ Priority email support
✓ Advanced analytics & insights
✓ Export to PDF/DOCX
✓ Job match recommendations
✓ Follow-up reminders

Premium - $49/month:
✓ Everything in Pro
✓ LinkedIn profile optimization
✓ Salary negotiation coach
✓ 1-on-1 career coaching session
✓ Resume review by experts
✓ Priority support (24/7)
✓ Custom CV templates
✓ API access
✓ Early access to new features

Enterprise - $299/month:
✓ Everything in Premium
✓ Multi-user accounts (up to 10 users)
✓ Bulk CV processing
✓ Team analytics dashboard
✓ Custom integrations
✓ Dedicated account manager
✓ SLA guarantee
✓ Custom contract terms
✓ Volume discounts available
```

**Detailed Test Procedure: Subscription Flow**

```
Test: Subscription Upgrade Simulation
Steps:
1. Navigate to Dashboard → Billing
2. VERIFY: Page layout shows:
   - Current Plan card at top
   - Usage statistics section
   - 4 pricing tier cards
   - FAQ section at bottom
3. Check Current Plan card:
   - Shows "Free" plan
   - Shows renewal date (if applicable)
   - Shows "Upgrade" CTA
4. Check Usage Statistics:
   - CV Optimizations: X/3 used
   - Cover Letters: X/5 used
   - Progress bars show percentage
5. Review pricing tiers from left to right:
   Tier 1: Free ($0)
   Tier 2: Pro ($29) - marked "Popular"
   Tier 3: Premium ($49)
   Tier 4: Enterprise ($299)
6. Click "Upgrade to Pro" button
7. VERIFY: Loading state appears on button
8. VERIFY: Button text changes to "Processing..."
9. Wait 2 seconds (simulated Stripe checkout)
10. VERIFY: Toast notification appears
11. (With Stripe configured): Would redirect to Stripe Checkout
12. Scroll to FAQ section
13. VERIFY: Questions include:
    - "Can I cancel anytime?"
    - "What payment methods?"
    - "Is there a refund policy?"
    - "Can I change plans?"
14. Click on FAQ item
15. VERIFY: Answer expands/displays

Note: Full Stripe integration requires:
- STRIPE_SECRET_KEY environment variable
- Stripe products created in Stripe Dashboard
- Webhook endpoint configured
```

---

### 2.7 Settings & Profile Testing

**File:** `frontend/app/dashboard/settings/page.tsx`

#### Test Cases

| # | Test Case | Steps | Expected Result | Status | Notes |
|---|-----------|-------|-----------------|--------|-------|
| SET-01 | Access settings page | 1. Navigate to `/dashboard/settings` | Settings page loads | ☐ | |
| SET-02 | View profile info | 1. Check profile section | Shows user name, email | ☐ | |
| SET-03 | Edit profile | 1. Click edit<br>2. Change name<br>3. Save | Profile updated, success toast | ☐ | |
| SET-04 | Email preferences | 1. Toggle email notifications<br>2. Save | Preferences saved | ☐ | |
| SET-05 | Theme settings | 1. Toggle dark/light mode (if available) | Theme changes | ☐ | |
| SET-06 | Language settings | 1. Change language (if available) | Language updates | ☐ | |
| SET-07 | Password change | 1. Enter new password<br>2. Save | Password updated (if applicable) | ☐ | |
| SET-08 | Account deletion | 1. Click delete account<br>2. Confirm | Shows confirmation modal | ☐ | |

---

## 3. User Journey Testing

### 3.1 New User Onboarding Journey

**Complete Flow Test:**

```
Scenario: Complete first-time user experience
Duration: 15-20 minutes

Step 1: Landing & Sign Up (0-2 min)
□ User visits homepage
□ Reads value proposition
□ Checks pricing
□ Clicks "Get Started"
□ Creates account (simulated without Clerk)
□ Receives welcome message

Step 2: Dashboard Overview (2-4 min)
□ Lands on dashboard home
□ Sees welcome message
□ Views navigation menu (7 items)
□ Understands layout

Step 3: First CV Optimization (4-8 min)
□ Clicks "CV Optimizer" in nav
□ Uploads sample CV
□ Reviews ATS score
□ Reads optimization tips
□ Downloads optimized version
□ Feels value delivered

Step 4: Track First Application (8-11 min)
□ Navigates to Applications
□ Clicks "Add Application"
□ Fills in company details
□ Adds notes
□ Saves application
□ Views in dashboard

Step 5: Generate Cover Letter (11-14 min)
□ Goes to Cover Letters
□ Enters company and position
□ Selects "Professional" tone
□ Generates letter
□ Copies to clipboard
□ Plans to use for application

Step 6: Interview Prep (14-17 min)
□ Navigates to Interview Prep
□ Generates questions
□ Practices one answer
□ Saves notes for later

Step 7: Check Billing (17-19 min)
□ Views Billing page
□ Sees Free tier limitations
□ Considers Pro upgrade
□ Checks features

Step 8: Return Visit (19-20 min)
□ User bookmarks dashboard
□ Plans to return
□ Feels confident about value

Success Criteria:
✓ User completes 3+ features in first session
✓ User understands core value proposition
✓ No blocking errors encountered
✓ User likely to return
```

### 3.2 Active Job Seeker Journey (1 Week)

```
Day 1: Setup
□ Optimizes main CV
□ Creates 3 CV variations
□ ATS scores improve from 60 to 85

Day 2: Applications
□ Adds 5 job applications
□ Generates 5 cover letters
□ Tracks application dates

Day 3: Follow-up
□ Updates 1 application to "INTERVIEW"
□ Generates interview questions
□ Practices answers

Day 4: Preparation
□ Reviews company research
□ Practices 10 interview questions
□ Takes notes on STAR responses

Day 5: Interview Day
□ Reviews saved prep notes
□ Aces interview
□ Updates status to "OFFER"

Day 6: Analytics
□ Reviews application stats
□ Sees 20% interview rate
□ Adjusts strategy

Day 7: Upgrade
□ Reaches Free tier limits
□ Upgrades to Pro
□ Continues job search

Success Metrics:
✓ 5+ applications tracked
✓ 80+ ATS score achieved
✓ Interview secured
✓ User upgrades to paid tier
```

---

## 4. Integration Testing

### 4.1 OpenAI Integration Testing

**Prerequisites:** `OPENAI_API_KEY` configured

| # | Test | Steps | Expected Result | Status |
|---|------|-------|-----------------|--------|
| AI-01 | CV optimization API call | Optimize CV | Receives GPT-4 response | ☐ |
| AI-02 | Cover letter generation | Generate letter | Receives GPT-4 response | ☐ |
| AI-03 | Interview questions | Generate questions | Receives JSON array | ☐ |
| AI-04 | API error handling | Use invalid API key | Shows graceful error | ☐ |
| AI-05 | Rate limit handling | Make 10+ rapid requests | Handles rate limits | ☐ |
| AI-06 | Response quality | Check AI responses | Relevant, coherent content | ☐ |

### 4.2 Stripe Integration Testing

**Prerequisites:** `STRIPE_SECRET_KEY` and products configured

| # | Test | Steps | Expected Result | Status |
|---|------|-------|-----------------|--------|
| STR-01 | Checkout session creation | Click upgrade | Creates Stripe session | ☐ |
| STR-02 | Redirect to Stripe | Complete checkout | Redirects to Stripe page | ☐ |
| STR-03 | Successful payment | Complete test payment | Returns to success URL | ☐ |
| STR-04 | Webhook handling | Trigger webhook event | Processes correctly | ☐ |
| STR-05 | Subscription sync | Check database | Subscription updated | ☐ |
| STR-06 | Customer portal | Access portal | Opens Stripe portal | ☐ |

### 4.3 SendGrid Integration Testing

**Prerequisites:** `SENDGRID_API_KEY` configured

| # | Test | Steps | Expected Result | Status |
|---|------|-------|-----------------|--------|
| EMAIL-01 | Welcome email | New user signup | Email sent successfully | ☐ |
| EMAIL-02 | Application reminder | Set reminder | Email sent on time | ☐ |
| EMAIL-03 | Interview notification | Schedule interview | Email sent with details | ☐ |
| EMAIL-04 | Weekly digest | Wait for weekly trigger | Digest email sent | ☐ |
| EMAIL-05 | Email formatting | Check inbox | HTML renders correctly | ☐ |
| EMAIL-06 | Mobile rendering | Check on mobile | Responsive design works | ☐ |

### 4.4 Database Integration Testing

| # | Test | Steps | Expected Result | Status |
|---|------|-------|-----------------|--------|
| DB-01 | User creation | Create user | Record in users table | ☐ |
| DB-02 | Resume storage | Save CV | Record in resumes table | ☐ |
| DB-03 | Relationships | Create application | Foreign keys valid | ☐ |
| DB-04 | Cascading deletes | Delete user | Related records deleted | ☐ |
| DB-05 | Transactions | Multi-step operation | Atomic completion | ☐ |
| DB-06 | Query performance | Load dashboard | Loads in <500ms | ☐ |

---

## 5. UI/UX Testing

### 5.1 Navigation & Layout

| # | Test | Expected Result | Status |
|---|------|-----------------|--------|
| UI-01 | Dashboard sidebar visible | Shows 7 menu items | ☐ |
| UI-02 | Active menu item highlighted | Current page highlighted | ☐ |
| UI-03 | Logo click returns home | Navigates to dashboard | ☐ |
| UI-04 | Breadcrumbs (if any) | Shows current location | ☐ |
| UI-05 | Footer displays | Shows copyright, links | ☐ |
| UI-06 | Consistent spacing | Proper padding/margins | ☐ |

### 5.2 Forms & Inputs

| # | Test | Expected Result | Status |
|---|------|-----------------|--------|
| FORM-01 | Input focus states | Blue border on focus | ☐ |
| FORM-02 | Required field indicators | Asterisk or label | ☐ |
| FORM-03 | Validation messages | Red text below input | ☐ |
| FORM-04 | Success states | Green checkmark/border | ☐ |
| FORM-05 | Disabled states | Grayed out, not clickable | ☐ |
| FORM-06 | Placeholder text | Helpful hints visible | ☐ |
| FORM-07 | Label association | Clicking label focuses input | ☐ |

### 5.3 Buttons & CTAs

| # | Test | Expected Result | Status |
|---|------|-----------------|--------|
| BTN-01 | Primary button style | Blue bg, white text | ☐ |
| BTN-02 | Hover states | Darker shade on hover | ☐ |
| BTN-03 | Loading states | Spinner, disabled | ☐ |
| BTN-04 | Disabled states | Grayed out | ☐ |
| BTN-05 | Button sizes | Consistent across app | ☐ |
| BTN-06 | Icon buttons | Icons centered, clear | ☐ |

### 5.4 Notifications & Feedback

| # | Test | Expected Result | Status |
|---|------|-----------------|--------|
| TOAST-01 | Success toast | Green, checkmark icon | ☐ |
| TOAST-02 | Error toast | Red, X icon | ☐ |
| TOAST-03 | Info toast | Blue, info icon | ☐ |
| TOAST-04 | Toast auto-dismiss | Disappears after 3-5s | ☐ |
| TOAST-05 | Toast positioning | Top-right or top-center | ☐ |
| TOAST-06 | Multiple toasts | Stack properly | ☐ |

---

## 6. Edge Cases & Error Handling

### 6.1 Input Validation Edge Cases

| # | Test Case | Input | Expected Behavior | Status |
|---|-----------|-------|-------------------|--------|
| EDGE-01 | Empty CV upload | Empty file | Error: "No content" | ☐ |
| EDGE-02 | Very long CV | 10,000+ characters | Handles without crash | ☐ |
| EDGE-03 | Special characters | CV with emojis, symbols | Processes correctly | ☐ |
| EDGE-04 | SQL injection attempt | `'; DROP TABLE--` in input | Sanitized, no DB impact | ☐ |
| EDGE-05 | XSS attempt | `<script>alert('XSS')</script>` | Escaped, not executed | ☐ |
| EDGE-06 | Invalid email | `notanemail` | Validation error | ☐ |
| EDGE-07 | Negative numbers | -5 in number field | Rejected or converted | ☐ |
| EDGE-08 | Future dates | Year 2099 | Accepts or warns | ☐ |

### 6.2 Network & API Errors

| # | Test Case | How to Test | Expected Behavior | Status |
|---|-----------|-------------|-------------------|--------|
| NET-01 | Backend offline | Stop backend server | Error toast, retry option | ☐ |
| NET-02 | Slow network | Throttle to 3G | Loading states, no freeze | ☐ |
| NET-03 | Timeout | Delay API response 30s | Timeout error message | ☐ |
| NET-04 | 500 server error | Trigger server error | User-friendly error | ☐ |
| NET-05 | 404 not found | Invalid API endpoint | Error handling | ☐ |
| NET-06 | API rate limit | Rapid requests | Queue or error message | ☐ |

### 6.3 Data Edge Cases

| # | Test Case | Scenario | Expected Behavior | Status |
|---|-----------|----------|-------------------|--------|
| DATA-01 | Empty dashboard | New user, no data | Empty states with CTAs | ☐ |
| DATA-02 | Maximum data | 100+ applications | Pagination or scroll | ☐ |
| DATA-03 | Duplicate entries | Add same job twice | Allows or warns | ☐ |
| DATA-04 | Deleted user data | Delete then access | Proper cleanup | ☐ |
| DATA-05 | Concurrent edits | Edit same item twice | Last write wins or merge | ☐ |

---

## 7. Performance Testing

### 7.1 Load Time Testing

| # | Metric | Target | Actual | Status |
|---|--------|--------|--------|--------|
| PERF-01 | Landing page load | <2s | ___s | ☐ |
| PERF-02 | Dashboard load | <2s | ___s | ☐ |
| PERF-03 | CV page load | <2s | ___s | ☐ |
| PERF-04 | API response time | <200ms | ___ms | ☐ |
| PERF-05 | CV optimization | <5s | ___s | ☐ |
| PERF-06 | Letter generation | <5s | ___s | ☐ |
| PERF-07 | Question generation | <5s | ___s | ☐ |

**How to Test:**
1. Open Chrome DevTools
2. Go to Network tab
3. Refresh page
4. Check "Load" time at bottom
5. Record result

### 7.2 Resource Usage

| # | Metric | Target | Actual | Status |
|---|--------|--------|--------|--------|
| RES-01 | Initial bundle size | <500KB | ___KB | ☐ |
| RES-02 | Memory usage | <100MB | ___MB | ☐ |
| RES-03 | CPU usage (idle) | <5% | __% | ☐ |
| RES-04 | API calls per page | <10 | ___ | ☐ |

---

## 8. Browser Compatibility

### 8.1 Desktop Browsers

| Browser | Version | Landing Page | Dashboard | CV Optimizer | Applications | Status |
|---------|---------|--------------|-----------|--------------|--------------|--------|
| Chrome | Latest | ☐ | ☐ | ☐ | ☐ | ☐ |
| Firefox | Latest | ☐ | ☐ | ☐ | ☐ | ☐ |
| Safari | Latest | ☐ | ☐ | ☐ | ☐ | ☐ |
| Edge | Latest | ☐ | ☐ | ☐ | ☐ | ☐ |

**Test Each:**
- Page loads correctly
- All features work
- Styling consistent
- No console errors

### 8.2 Mobile Browsers

| Browser | Device | Landing Page | Dashboard | Features | Status |
|---------|--------|--------------|-----------|----------|--------|
| Chrome | Android | ☐ | ☐ | ☐ | ☐ |
| Safari | iOS | ☐ | ☐ | ☐ | ☐ |
| Firefox | Android | ☐ | ☐ | ☐ | ☐ |

---

## 9. Mobile Responsiveness

### 9.1 Breakpoint Testing

| Breakpoint | Width | Layout Test | Status |
|------------|-------|-------------|--------|
| Mobile S | 320px | ☐ All content visible, no horizontal scroll | ☐ |
| Mobile M | 375px | ☐ Proper spacing, readable text | ☐ |
| Mobile L | 425px | ☐ Buttons accessible, forms usable | ☐ |
| Tablet | 768px | ☐ Sidebar collapses (if applicable) | ☐ |
| Laptop | 1024px | ☐ Full layout, all features | ☐ |
| Desktop | 1440px+ | ☐ Optimal spacing, no stretching | ☐ |

**How to Test:**
1. Open Chrome DevTools (F12)
2. Click device toolbar icon (Ctrl+Shift+M)
3. Select device or set custom width
4. Test all pages at each breakpoint

### 9.2 Touch Interface Testing

| # | Test | Expected Behavior | Status |
|---|------|-------------------|--------|
| TOUCH-01 | Button tap targets | Minimum 44x44px | ☐ |
| TOUCH-02 | Swipe gestures | No interference with scrolling | ☐ |
| TOUCH-03 | Pinch zoom | Allowed on text, disabled on UI | ☐ |
| TOUCH-04 | Dropdown menus | Open on tap, not hover | ☐ |
| TOUCH-05 | Text selection | Works properly | ☐ |

---

## 10. Bug Report Template

When you find a bug, use this template:

```markdown
## Bug Report #___

**Date:** _________________
**Tester:** _________________
**Priority:** ☐ Critical  ☐ High  ☐ Medium  ☐ Low
**Status:** ☐ Open  ☐ In Progress  ☐ Fixed  ☐ Closed

### Environment
- **Browser:**
- **OS:**
- **Screen Size:**
- **User Type:**

### Bug Description
**Summary:** (One-line description)

**Expected Behavior:**
(What should happen)

**Actual Behavior:**
(What actually happened)

### Steps to Reproduce
1.
2.
3.
4.

### Screenshots/Videos
(Attach if applicable)

### Console Errors
```
(Paste console errors here)
```

### Additional Notes
(Any other relevant information)

### Suggested Fix
(If you have ideas)
```

---

## Test Summary Report

**Test Session Date:** _________________
**Tester Name:** _________________
**Environment:** ☐ Development  ☐ Staging  ☐ Production

### Overall Results

| Category | Total Tests | Passed | Failed | Blocked | Pass Rate |
|----------|-------------|--------|--------|---------|-----------|
| Landing Page | 8 | ___ | ___ | ___ | ___% |
| CV Optimizer | 12 | ___ | ___ | ___ | ___% |
| Applications | 15 | ___ | ___ | ___ | ___% |
| Cover Letters | 12 | ___ | ___ | ___ | ___% |
| Interview Prep | 12 | ___ | ___ | ___ | ___% |
| Billing | 12 | ___ | ___ | ___ | ___% |
| Settings | 8 | ___ | ___ | ___ | ___% |
| Integration | 18 | ___ | ___ | ___ | ___% |
| UI/UX | 25 | ___ | ___ | ___ | ___% |
| Edge Cases | 20 | ___ | ___ | ___ | ___% |
| Performance | 11 | ___ | ___ | ___ | ___% |
| Compatibility | 12 | ___ | ___ | ___ | ___% |
| **TOTAL** | **165** | ___ | ___ | ___ | ___% |

### Critical Issues Found
1.
2.
3.

### Major Issues Found
1.
2.
3.

### Recommendations
1.
2.
3.

### Sign-off
- [ ] All critical issues resolved
- [ ] All major issues documented
- [ ] App ready for next phase
- [ ] Documentation updated

**Tester Signature:** _________________
**Date:** _________________
