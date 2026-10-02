# Requirements Document

## Introduction

The Expense & Budget Visualizer is a simple, single-page web app built with plain HTML, CSS, and JavaScript. It lets users record their spending by entering a transaction name, amount, and category. All data is saved in the browser using localStorage so it persists between page visits. The app shows a list of all transactions, the total amount spent, and a pie chart that breaks down spending by category.

This project is built for a CodingCamp exercise. It uses no frameworks or build tools — just one HTML file, one CSS file (`css/style.css`), and one JavaScript file (`js/script.js`), plus Chart.js loaded from a CDN.

---

## Glossary

- **App**: The Expense & Budget Visualizer web application.
- **Transaction**: A single spending entry made up of a name, a positive amount, and a category.
- **Category**: One of three fixed labels for a transaction — Food, Transport, or Fun.
- **Transaction List**: The visible list on the page showing all saved transactions.
- **Total Spending**: The sum of all transaction amounts currently stored.
- **Pie Chart**: A Chart.js doughnut/pie chart that shows how much was spent per category.
- **localStorage**: The browser's built-in key-value storage used to save and load transactions without a backend.
- **Validator**: The part of the app that checks user input before a transaction is saved.

---

## Requirements

### Requirement 1: Add a Transaction

**User Story:** As a user, I want to fill in a form and add a new transaction, so that I can record what I spent money on.

#### Acceptance Criteria

1. THE App SHALL display a form with three fields: a text input for the transaction name, a number input for the amount, and a dropdown to select a category (Food, Transport, Fun).
2. WHEN the user clicks the submit button with all fields valid, THE App SHALL save the transaction, update the Transaction List, update the Total Spending, and update the Pie Chart.
3. WHEN the form is successfully submitted, THE App SHALL clear all form fields so the user can enter the next transaction.
4. WHEN the user clicks the submit button with one or more invalid fields, THE App SHALL display validation error messages and SHALL NOT save the transaction.

---

### Requirement 2: Input Validation

**User Story:** As a user, I want to see a clear error message when I fill the form incorrectly, so that I know what to fix before saving.

#### Acceptance Criteria

1. WHEN the user submits the form with an empty name field, THE Validator SHALL display an error message indicating the name is required.
2. WHEN the user submits the form with an amount that is not a number greater than 0, THE Validator SHALL display an error message indicating a valid positive amount is required. The amount SHALL be between 0.01 and 999,999,999.99.
3. WHEN the user submits the form without selecting a category, THE Validator SHALL display an error message indicating a category must be selected.
4. IF any validation rule fails, THEN THE Validator SHALL display all applicable error messages at the same time, SHALL NOT save the transaction, and SHALL preserve the values already entered in the other fields.
5. WHEN the user corrects a field that previously showed a validation error, THE Validator SHALL hide that field's error message.

---

### Requirement 3: Delete a Transaction

**User Story:** As a user, I want to remove a transaction from the list, so that I can correct mistakes.

#### Acceptance Criteria

1. THE App SHALL display a delete button next to each transaction in the Transaction List.
2. WHEN the user clicks a delete button, THE App SHALL remove that transaction from localStorage and from the Transaction List within 500 ms.
3. WHEN a transaction is deleted, THE App SHALL recalculate and update the Total Spending to the new sum of remaining transactions, and SHALL update the Pie Chart to exclude the deleted transaction's amount.
4. IF updating localStorage fails during deletion, THEN THE App SHALL display an error message and SHALL NOT remove the transaction from the Transaction List.

---

### Requirement 4: Transaction List

**User Story:** As a user, I want to see all my transactions on the page, so that I have a clear overview of what I spent.

#### Acceptance Criteria

1. THE App SHALL display each transaction's name, amount (formatted as a number with exactly 2 decimal places), and category in the Transaction List.
2. WHILE there are no transactions saved, THE App SHALL display a message indicating the list is empty.
3. WHEN a new transaction is added, THE App SHALL append it to the end of the Transaction List without refreshing the page.
4. WHEN the page loads and transactions exist in localStorage, THE App SHALL display them in the order they were originally added.

---

### Requirement 5: Total Spending Display

**User Story:** As a user, I want to see the total amount I have spent, so that I can keep track of my overall expenses.

#### Acceptance Criteria

1. THE App SHALL display the Total Spending as the sum of all stored transaction amounts, formatted as a numeric value with exactly 2 decimal places.
2. WHEN a transaction is added or deleted, THE App SHALL recalculate and update the Total Spending display within 1 second.
3. WHILE there are no transactions, THE App SHALL display a total of 0.00.
4. IF transaction data cannot be loaded from localStorage, THEN THE App SHALL display 0.00 as the Total Spending.

---

### Requirement 6: Pie Chart by Category

**User Story:** As a user, I want to see a pie chart of my spending per category, so that I can quickly understand where my money goes.

#### Acceptance Criteria

1. THE App SHALL display a pie chart using Chart.js (loaded via CDN) where each slice represents a category (Food, Transport, Fun) and its value equals the sum of amounts for all transactions in that category.
2. WHEN a transaction is added or deleted, THE App SHALL immediately update the Pie Chart to reflect the current totals per category.
3. WHILE a category has no transactions, THE App SHALL not show that category as a slice in the Pie Chart.
4. WHILE there are no transactions at all, THE App SHALL hide the Pie Chart and display a placeholder message.

---

### Requirement 7: localStorage Persistence

**User Story:** As a user, I want my transactions to still be there when I reopen the page, so that I do not lose my data.

#### Acceptance Criteria

1. WHEN a transaction is added, THE App SHALL serialize the full Transaction List to JSON and write it to localStorage under the key "transactions", overwriting any previous value.
2. WHEN a transaction is deleted, THE App SHALL serialize the updated Transaction List to JSON and overwrite the "transactions" key in localStorage.
3. WHEN the page loads and localStorage contains valid JSON under the "transactions" key, THE App SHALL parse it, display the transactions in the Transaction List, update the Total Spending, and render the Pie Chart.
4. IF localStorage is empty or contains invalid JSON under the "transactions" key, THEN THE App SHALL initialize with an empty Transaction List and display a total of 0.00 without showing an error to the user.

---

### Requirement 8: Project File Structure

**User Story:** As a developer following CodingCamp rules, I want the project to follow the required file structure, so that the submission is valid.

#### Acceptance Criteria

1. THE App SHALL be structured with exactly these files: `index.html` as the entry point, `css/style.css` as the single stylesheet, and `js/script.js` as the single JavaScript file.
2. THE App SHALL load Chart.js from a CDN `<script>` tag inside `index.html` and SHALL NOT use any build tools or JavaScript frameworks.
3. THE `js/script.js` file SHALL include at minimum the following comment section headers, appearing in this order: `// === STORAGE ===`, `// === DATA / LOGIC ===`, `// === CHARTS ===`, `// === UI / DOM ===`, `// === INIT ===`.
