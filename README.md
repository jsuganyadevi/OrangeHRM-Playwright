# OrangeHRM Playwright E2E Automation

## Overview
End-to-end UI automation framework for the OrangeHRM demo application using **Playwright + TypeScript** and a **Component Page Object Model (CPOM)**.

The suite covers authentication, Dashboard/PIM verification, employee creation, employee search, deletion, and deletion verification.

## Tech Stack
- Playwright
- TypeScript
- Node.js / npm
- Component Page Object Model (CPOM)
- Playwright Fixtures
- GitHub Actions
- Playwright HTML Report

## Framework Structure

```text
OrangeHRM-Playwright/
├── .github/workflows/playwright.yml
├── components/
│   ├── EmployeeForm.ts
│   └── EmployeeList.ts
├── fixtures/
│   └── testFixtures.ts
├── pages/
│   ├── DashboardPage.ts
│   ├── EmployeeDetailsPage.ts
│   ├── LoginPage.ts
│   └── PIMPage.ts
├── test-data/
│   └── employeeData.ts
├── tests/
│   ├── auth.setup.ts
│   └── employee/employee.spec.ts
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

### Page Objects
- `LoginPage.ts` — login interaction
- `DashboardPage.ts` — Dashboard verification and PIM navigation
- `PIMPage.ts` — PIM verification and Add Employee navigation
- `EmployeeDetailsPage.ts` — saved employee details and URL verification

### Components
- `EmployeeForm.ts` — employee form fields, Employee ID retrieval, and Save
- `EmployeeList.ts` — search, row verification, deletion, and failure cleanup

### Fixtures
`fixtures/testFixtures.ts` creates reusable Page Object and component instances so tests focus on business workflow.

### Test Data
`test-data/employeeData.ts` keeps employee input data separate from test logic. Employee test data uses a unique last name per execution.

## Authentication and Session Management

Authentication is handled by `tests/auth.setup.ts`.

```text
auth.setup.ts
    ↓
Read environment variables
    ↓
Login
    ↓
Verify Dashboard
    ↓
Save storageState
    ↓
playwright/.auth/admin.json
    ↓
Authenticated employee tests
```

### Local environment

Create a local `.env` file:

```text
BASE_URL=https://opensource-demo.orangehrmlive.com/
ORANGE_USERNAME=<your username>
ORANGE_PASSWORD=<your password>
```

Do not commit `.env` or authentication state.

## Test Workflow

```text
Authenticated Session
        ↓
Verify Dashboard
        ↓
Navigate to PIM
        ↓
Verify PIM
        ↓
Add Employee
        ↓
Capture generated Employee ID
        ↓
Save Employee
        ↓
Verify Save Success
        ↓
Verify Employee Details
        ↓
Search by Employee ID
        ↓
Verify Employee Row
        ↓
Delete Employee using table action
        ↓
Search again
        ↓
Verify No Records Found
```

The generated Employee ID is used as the primary correlation key throughout the workflow.

## Locator Strategy

The framework prefers reliable Playwright locators such as:
- `getByRole()`
- `getByPlaceholder()`
- `getByText()`
- Scoped DOM locators where the application does not expose a reliable accessible locator
- `filter({ hasText })` for dynamic row identification

Dynamic employee rows are scoped using Employee ID and employee names.

The framework avoids unnecessary `nth()`, XPath, forced actions, and hard-coded waits.

## Failure Cleanup

A Playwright `afterEach` cleanup protects the application from test data left behind by a failed test.

When an employee has been successfully created and the test subsequently fails:

```text
Test failure
    ↓
afterEach
    ↓
Navigate to Employee List
    ↓
Search by Employee ID
    ↓
Delete created employee
```

The cleanup mechanism was intentionally tested by forcing a failure after employee creation and verifying that the employee was removed successfully.

## Running Locally

Install dependencies:

```bash
npm ci
```

Install Playwright browsers:

```bash
npx playwright install
```

Run the complete suite:

```bash
npm test
```

Run headed:

```bash
npm run test:headed
```

Open the HTML report:

```bash
npm run test:report
```

## CI/CD — GitHub Actions

Workflow file:

```text
.github/workflows/playwright.yml
```

Pipeline:

```text
Push / Pull Request
        ↓
Checkout
        ↓
Setup Node.js
        ↓
npm ci
        ↓
Install Playwright browsers
        ↓
Run Playwright tests
        ↓
Upload HTML report
```

### CI configuration

Repository Secrets:
- `ORANGE_USERNAME`
- `ORANGE_PASSWORD`

Repository Variable:
- `BASE_URL`

Credentials are never hard-coded in the source code or workflow.

## Test Reporting

GitHub Actions uploads the `playwright-report` directory as an artifact.

To view it:

```text
GitHub → Actions → Playwright Tests → Workflow Run → Artifacts
```

Download the `playwright-report` artifact and open `index.html`.

## Security and Repository Hygiene

The following are excluded from source control:

```text
.env
playwright/.auth/
test-results/
playwright-report/
```

Never commit application credentials or authentication state.

## Assignment Coverage

| Requirement | Status |
|---|---|
| Playwright + TypeScript | ✅ |
| Component Page Object Model | ✅ |
| Login automation | ✅ |
| `storageState` authentication | ✅ |
| Reusable authenticated session | ✅ |
| Dashboard verification | ✅ |
| PIM navigation and verification | ✅ |
| Add Employee | ✅ |
| Employee details verification | ✅ |
| Search Employee | ✅ |
| Verify correct employee | ✅ |
| Delete using table action | ✅ |
| Verify employee deletion | ✅ |
| Failure cleanup | ✅ |
| GitHub Actions CI | ✅ |

## Key Design Decisions

### CPOM
Page-level behavior and reusable employee UI components are separated for maintainability.

### `storageState`
Authentication is performed once in the setup project and reused by authenticated tests.

### Employee ID correlation
The application generates the Employee ID. The test captures it dynamically and uses it for subsequent verification, search, and deletion.

### Synchronization
The framework uses Playwright auto-waiting and web-first assertions rather than arbitrary `waitForTimeout()` delays.

### Fixtures
Custom fixtures centralize Page Object and component initialization while keeping the test focused on business behavior.

## Project Status

- Local Playwright suite: **Passing**
- Failure cleanup scenario: **Validated**
- GitHub Actions CI: **Passing**
- Playwright HTML report: **Available as CI artifact**
