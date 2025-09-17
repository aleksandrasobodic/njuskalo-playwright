# Njuškalo & Bolha Playwright Tests


## Description
This project contains Playwright tests that cover vehicle search functionality on the following platforms:
- [www.njuskalo.hr](https://www.njuskalo.hr)
- [www.bolha.com](https://www.bolha.com)

The tests use:
- TypeScript
- Page Object Model (POM)
- Parameterized test data from `test-data.json`

---
## 1. Prerequisites

- Node.js >= 18.x  
- npm
- Git 


---
## 2. Installation
1. Clone the repository:
```bash
git clone https://github.com/aleksandrasobodic/njuskalo-playwright.git
cd njuskalo-playwright
```

2. Install project dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```


---
## 3. Running the tests
- Run all tests in headless mode:
```bash
npx playwright test
```

- Run tests with browser UI:
```bash
npx playwright test --headed
```


---
## 4. Project structure
```
njuskalo-playwright/
├─ pages/           # Page Objects (Njuskalo, Bolha)
├─ helpers/         # Help functions (cookie popup, filters...)
├─ tests/           # Test spec file
├─ test-data.json   # Test data
├─ playwright.config.ts
├─ tsconfig.json
└─ README.md
```

---

## 5. Test Structure

- A single test covers both platforms: Njuskalo and Bolha  
- The test fills the search input, selects the category, applies filters, and checks that results are displayed  
- Variable data is read from `test-data.json`  
- Page Object pattern is used for better readability and maintainability

---

## 6. Notes 

- Each test automatically accepts the cookie popup  
- Ad results are verified by counting the displayed elements  
- Browser cache is automatically cleared for each test 

---

## 7. References

- [Playwright Docs](https://playwright.dev/docs/intro)
- [Playwright TypeScript](https://playwright.dev/docs/intro#typescript)
