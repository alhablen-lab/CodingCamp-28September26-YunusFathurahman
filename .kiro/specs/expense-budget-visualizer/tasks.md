# Implementation Plan: Expense & Budget Visualizer

## Overview

Build a single-page expense tracker from scratch using plain HTML, CSS, and JavaScript. The app lets users add and delete spending transactions, see a running total, and view a Chart.js pie chart broken down by category. All data persists in `localStorage`. No frameworks, no build tools, no test runners — just three files opened directly in a browser.

## Tasks

- [x] 1. Set up the project file structure
  - Create the root folder containing `index.html`
  - Create the subfolder `css/` and add an empty `css/style.css` file
  - Create the subfolder `js/` and add an empty `js/script.js` file
  - Open `index.html` in a browser to confirm it loads (even blank at this stage)
  - _Requirements: 8.1_

- [ ] 2. Build the HTML skeleton in `index.html`
  - [x] 2.1 Add the document boilerplate and link assets
    - Write the `<!DOCTYPE html>`, `<html>`, `<head>`, and `<body>` tags
    - Add `<meta charset>` and `<meta name="viewport">` in `<head>`
    - Add `<link rel="stylesheet" href="css/style.css">` in `<head>`
    - Add the Chart.js CDN `<script>` tag before the closing `</body>`
    - Add `<script src="js/script.js"></script>` after the Chart.js tag
    - _Requirements: 8.1, 8.2_

  - [ ] 2.2 Add the header and form section
    - Add `<header><h1>Expense & Budget Visualizer</h1></header>`
    - Inside `<main>`, add `<section id="form-section">` containing `<form id="transaction-form">`
    - Inside the form add three `.field-group` divs: one for the name text input (`id="name-input"`), one for the amount number input (`id="amount-input"`, `step="0.01"`), and one for the category select (`id="category-select"`)
    - Give each `.field-group` a `<label>` and a `<span class="error-msg" hidden>` with IDs `name-error`, `amount-error`, `category-error`
    - Add the three `<option>` values inside the select: `value=""` (-- Select --), `value="Food"`, `value="Transport"`, `value="Fun"`
    - Add the submit `<button type="submit">Add Transaction</button>`
    - _Requirements: 1.1, 2.1, 2.2, 2.3_

  - [ ] 2.3 Add the summary, list, and chart sections
    - Add `<section id="summary-section">` with `<p>Total Spending: <strong id="total-spending">0.00</strong></p>`
    - Add `<section id="list-section">` with `<h2>Transactions</h2>`, `<ul id="transaction-list"></ul>`, and `<p id="empty-message">No transactions yet.</p>`
    - Add `<section id="chart-section">` with `<h2>Spending by Category</h2>`, `<canvas id="expense-chart"></canvas>`, and `<p id="chart-placeholder">Add transactions to see the chart.</p>`
    - Open in browser — the page should show all sections with placeholder text
    - _Requirements: 4.1, 4.2, 5.1, 5.3, 6.1, 6.4_

- [ ] 3. Style the app in `css/style.css`
  - [ ] 3.1 Add base and layout styles
    - Add a CSS reset (`box-sizing: border-box`, `margin: 0`, `padding: 0`)
    - Style `body` with a readable font, background colour, and centred max-width container
    - Style `header` and `h1`, `h2` headings
    - _Requirements: 8.1_

  - [ ] 3.2 Style the form and validation messages
    - Style `.field-group` with vertical spacing between label, input, and error span
    - Style `input[type="text"]`, `input[type="number"]`, and `select` with consistent widths and padding
    - Style `.error-msg` in red so validation errors are clearly visible
    - Style the submit `button` with a visible colour and hover state
    - _Requirements: 1.1, 2.1, 2.2, 2.3_

  - [ ] 3.3 Style the transaction list and chart area
    - Remove list bullets from `#transaction-list` and style each `<li>` with padding and a bottom border
    - Style each transaction's name, amount, and category badge inside the `<li>`
    - Style the delete `<button>` inside each `<li>` (small, distinct colour)
    - Add a `max-width` or fixed `height` to `#expense-chart` so the chart is a reasonable size
    - _Requirements: 3.1, 4.1, 6.1_

- [ ] 4. Implement the Storage section in `js/script.js`
  - [ ] 4.1 Write `saveTransactions(transactions)`
    - Add the comment header `// === STORAGE ===` at the top of the file
    - Implement `saveTransactions`: serialise the array with `JSON.stringify` and call `localStorage.setItem("transactions", json)`
    - Wrap the call in a `try/catch` and re-throw the error so callers can handle it
    - _Requirements: 7.1, 7.2, 8.3_

  - [ ] 4.2 Write `loadTransactions()`
    - Implement `loadTransactions`: read `localStorage.getItem("transactions")`
    - Return `[]` if the value is `null`
    - Wrap `JSON.parse` in a `try/catch`; return `[]` if parsing fails
    - _Requirements: 7.3, 7.4, 5.4_

- [ ] 5. Implement the Data / Logic section in `js/script.js`
  - [ ] 5.1 Add the section header and `validateInput`
    - Add the comment header `// === DATA / LOGIC ===`
    - Implement `validateInput(name, amount, category)`: check all three fields at once (no early exit)
    - Name rule: `name.trim().length > 0`
    - Amount rule: parsed float must satisfy `0.01 ≤ value ≤ 999999999.99`
    - Category rule: value must be one of `"Food"`, `"Transport"`, `"Fun"`
    - Return `{ valid: boolean, errors: { name?, amount?, category? } }`
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [ ] 5.2 Write `addTransaction`, `deleteTransaction`, and `formatAmount`
    - Implement `addTransaction(transactions, entry)`: return a new array with the new transaction appended; assign `id` as `Date.now().toString()`; do not mutate the original array
    - Implement `deleteTransaction(transactions, id)`: return a new array with the matching transaction filtered out; do not mutate
    - Implement `formatAmount(amount)`: return `amount.toFixed(2)`
    - _Requirements: 1.2, 3.2, 4.1_

  - [ ] 5.3 Write `calculateTotal` and `aggregateByCategory`
    - Implement `calculateTotal(transactions)`: return the sum of all `amount` values, or `0` for an empty array
    - Implement `aggregateByCategory(transactions)`: return `{ Food: number, Transport: number, Fun: number }` with the summed amounts; categories with no transactions have value `0`
    - _Requirements: 5.1, 5.3, 6.1_

- [ ] 6. Implement the Charts section in `js/script.js`
  - [ ] 6.1 Write `renderChart(categoryTotals)`
    - Add the comment header `// === CHARTS ===`
    - Guard with `if (!window.Chart) return;` at the top
    - On first call, create a new `Chart` instance on `<canvas id="expense-chart">` using the doughnut/pie type
    - On subsequent calls, update `chart.data.labels` and `chart.data.datasets[0].data`, then call `chart.update()`
    - Before building labels/data arrays, filter out categories where `value === 0`
    - When all totals are `0`: hide `<canvas id="expense-chart">` and show `<p id="chart-placeholder">`; reverse when totals exist
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 7. Implement the UI / DOM section in `js/script.js`
  - [ ] 7.1 Write `renderList(transactions)`
    - Add the comment header `// === UI / DOM ===`
    - Clear `<ul id="transaction-list">` and rebuild it from the array
    - Each `<li>` must contain: the transaction name, formatted amount (`formatAmount`), category text, and a delete `<button data-id="...">Delete</button>`
    - When the array is empty, show `<p id="empty-message">` and hide the `<ul>`; reverse when transactions exist
    - _Requirements: 4.1, 4.2, 4.3_

  - [ ] 7.2 Write `renderTotal`, `showErrors`, `clearErrors`, `clearFieldError`, and `resetForm`
    - `renderTotal(total)`: set `document.getElementById("total-spending").textContent` to `formatAmount(total)`
    - `showErrors(errors)`: for each field with an error key, remove `hidden` from its `<span class="error-msg">` and set its text
    - `clearErrors()`: add `hidden` back to all three `<span class="error-msg">` elements
    - `clearFieldError(field)`: add `hidden` to the single error span for the given field (`"name"`, `"amount"`, or `"category"`)
    - `resetForm()`: call `document.getElementById("transaction-form").reset()`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 5.1, 1.3_

- [ ] 8. Implement the Init section in `js/script.js`
  - [ ] 8.1 Wire up the app inside `DOMContentLoaded`
    - Add the comment header `// === INIT ===`
    - Declare a `let transactions` variable and assign `loadTransactions()` to it
    - Call `renderList(transactions)`, `renderTotal(calculateTotal(transactions))`, and `renderChart(aggregateByCategory(transactions))`
    - _Requirements: 7.3, 7.4, 4.4, 5.3, 6.1_

  - [ ] 8.2 Attach the form submit event listener
    - Listen for `"submit"` on `<form id="transaction-form">`; call `event.preventDefault()`
    - Read the three field values, call `validateInput`
    - If invalid: call `showErrors(result.errors)` and return early
    - If valid: call `clearErrors()`, then `addTransaction`, assign the result back to `transactions`
    - Wrap `saveTransactions(transactions)` in a `try/catch`; on catch, show an error message and revert `transactions`
    - On success: call `renderList`, `renderTotal`, `renderChart`, and `resetForm`
    - _Requirements: 1.2, 1.3, 1.4, 2.4, 7.1_

  - [ ] 8.3 Attach the delete event listener (event delegation)
    - Listen for `"click"` on `<ul id="transaction-list">`
    - Check `event.target.dataset.id`; if present, proceed with deletion
    - Call `deleteTransaction(transactions, id)` and assign the result back to `transactions`
    - Wrap `saveTransactions(transactions)` in a `try/catch`; on catch, show an error message and revert `transactions`
    - On success: call `renderList`, `renderTotal`, and `renderChart`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 7.2_

  - [ ] 8.4 Attach per-field input/change listeners to clear errors on correction
    - Add an `"input"` listener on `<input id="name-input">` that calls `clearFieldError("name")`
    - Add an `"input"` listener on `<input id="amount-input">` that calls `clearFieldError("amount")`
    - Add a `"change"` listener on `<select id="category-select">` that calls `clearFieldError("category")`
    - _Requirements: 2.5_

- [ ] 9. Checkpoint — Manual browser verification
  - Open `index.html` directly in a browser (no server needed)
  - Work through the testing checklist in `design.md` in order: initial load, form validation, adding transactions, deleting transactions, amount formatting, localStorage persistence, and edge cases
  - Open DevTools → Console to confirm there are no JS errors
  - Open DevTools → Application → Local Storage to confirm the `"transactions"` key is written and updated correctly
  - Fix any issues found before considering the feature complete
  - _Requirements: 1.1–1.4, 2.1–2.5, 3.1–3.4, 4.1–4.4, 5.1–5.4, 6.1–6.4, 7.1–7.4, 8.1–8.3_

## Notes

- All tasks are implementation tasks — there are no automated tests in this project (plain browser, no Node.js or test runners)
- Open `index.html` directly with `File → Open` in your browser; no local server is required
- Keep DevTools open while building so you catch JS errors early
- The comment section headers (`// === STORAGE ===`, etc.) in `js/script.js` are a submission requirement — do not skip them
- Each task references the specific acceptance criteria it satisfies for traceability

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["2.1"] },
    { "id": 1, "tasks": ["2.2", "3.1"] },
    { "id": 2, "tasks": ["2.3", "3.2", "3.3"] },
    { "id": 3, "tasks": ["4.1", "4.2"] },
    { "id": 4, "tasks": ["5.1"] },
    { "id": 5, "tasks": ["5.2", "5.3"] },
    { "id": 6, "tasks": ["6.1"] },
    { "id": 7, "tasks": ["7.1", "7.2"] },
    { "id": 8, "tasks": ["8.1"] },
    { "id": 9, "tasks": ["8.2", "8.3", "8.4"] }
  ]
}
```
