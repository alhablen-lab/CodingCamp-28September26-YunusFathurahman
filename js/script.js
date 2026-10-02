// ==================== VARIABLES ====================

let transactions = [];
let expenseChart = null;

const form = document.getElementById("transaction-form");
const nameInput = document.getElementById("name-input");
const amountInput = document.getElementById("amount-input");
const categorySelect = document.getElementById("category-select");
const transactionList = document.getElementById("transaction-list");
const totalAmount = document.getElementById("total-amount");
const sortSelect = document.getElementById("sort-select");
const limitInput = document.getElementById("limit-input");
const limitMessage = document.getElementById("limit-message");
const nameError = document.getElementById("name-error");
const amountError = document.getElementById("amount-error");
const categoryError = document.getElementById("category-error");
const themeToggle = document.getElementById("theme-toggle");

// ==================== VALIDATION ====================

function validateInput() {
    let isValid = true;

    nameError.textContent = "";
    amountError.textContent = "";
    categoryError.textContent = "";

    if (nameInput.value.trim() === "") {
        nameError.textContent = "Item Name is required.";
        isValid = false;
    }

    if (amountInput.value === "" || Number(amountInput.value) <= 0) {
        amountError.textContent = "Amount must be greater than 0.";
        isValid = false;
    }

    if (categorySelect.value === "") {
        categoryError.textContent = "Please select a category.";
        isValid = false;
    }

    return isValid;
}

// ==================== ADD TRANSACTION ====================

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const isValid = validateInput();

    if (!isValid) {
        return;
    }

    const transaction = {
        id: Date.now(),
        name: nameInput.value.trim(),
        amount: Number(amountInput.value),
        category: categorySelect.value
    };

    transactions.push(transaction);

    saveTransactions();
    renderTransactions();
    calculateTotal();
    renderChart();
    checkSpendingLimit();

    form.reset();
});

// ==================== DISPLAY TRANSACTIONS ====================

function renderTransactions() {
    transactionList.innerHTML = "";

    let sortedTransactions = [...transactions];

    if (sortSelect.value === "amount-low") {
        sortedTransactions.sort(function (a, b) {
            return a.amount - b.amount;
        });
    }

    if (sortSelect.value === "amount-high") {
        sortedTransactions.sort(function (a, b) {
            return b.amount - a.amount;
        });
    }

    if (sortSelect.value === "category") {
        sortedTransactions.sort(function (a, b) {
            return a.category.localeCompare(b.category);
        });
    }

    sortedTransactions.forEach(function (transaction) {
        const listItem = document.createElement("li");

        listItem.textContent =
            transaction.name + " - Rp " +
            transaction.amount.toLocaleString("id-ID") +
            " - " + transaction.category;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            transactions = transactions.filter(function (item) {
                return item.id !== transaction.id;
            });

            saveTransactions();
            renderTransactions();
            calculateTotal();
            renderChart();
            checkSpendingLimit();
        });

        listItem.appendChild(deleteButton);
        transactionList.appendChild(listItem);
    });
}

// ==================== TOTAL SPENDING ====================

function calculateTotal() {
    let total = 0;

    transactions.forEach(function (transaction) {
        total += transaction.amount;
    });

    totalAmount.textContent = "Rp " + total.toLocaleString("id-ID");
}

// ==================== SPENDING LIMIT ====================

function checkSpendingLimit() {
    const limit = Number(limitInput.value);

    const total = transactions.reduce(function (sum, transaction) {
        return sum + transaction.amount;
    }, 0);

    if (limitInput.value === "") {
        limitMessage.textContent = "";
        limitMessage.className = "";
        return;
    }

    if (total > limit) {
        limitMessage.textContent = "Warning: Spending limit exceeded!";
        limitMessage.className = "limit-warning";
    } else {
        limitMessage.textContent = "Spending is within the limit.";
        limitMessage.className = "limit-safe";
    }
}

// ==================== CHART DATA ====================

function getCategoryTotals() {
    const categoryTotals = {
        Food: 0,
        Transport: 0,
        Fun: 0
    };

    transactions.forEach(function (transaction) {
        categoryTotals[transaction.category] += transaction.amount;
    });

    return categoryTotals;
}

// ==================== SPENDING CHART ====================

function renderChart() {
    const categoryTotals = getCategoryTotals();

    const chartCanvas = document.getElementById("expense-chart");
    const chartPlaceholder = document.getElementById("chart-placeholder");

    if (transactions.length === 0) {
        chartCanvas.style.display = "none";
        chartPlaceholder.style.display = "block";

        if (expenseChart) {
            expenseChart.destroy();
            expenseChart = null;
        }

        return;
    }

    chartCanvas.style.display = "block";
    chartPlaceholder.style.display = "none";

    const labels = ["Food", "Transport", "Fun"];

    const data = [
        categoryTotals.Food,
        categoryTotals.Transport,
        categoryTotals.Fun
    ];

    if (expenseChart) {
        expenseChart.destroy();
    }

    expenseChart = new Chart(chartCanvas, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [{
                data: data
            }]
        }
    });
}

// ==================== LOCAL STORAGE ====================

function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function loadTransactions() {
    const savedTransactions = localStorage.getItem("transactions");

    if (savedTransactions) {
        transactions = JSON.parse(savedTransactions);
    }
}

// ==================== INITIAL DISPLAY ====================

loadTransactions();
renderTransactions();
calculateTotal();
renderChart();
checkSpendingLimit();

// ==================== SORT ====================

sortSelect.addEventListener("change", function () {
    renderTransactions();
});

// ==================== SPENDING LIMIT INPUT ====================

limitInput.addEventListener("input", function () {
    checkSpendingLimit();
});

// ==================== DARK / LIGHT MODE ====================

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeToggle.textContent = "Light Mode";
    } else {
        themeToggle.textContent = "Dark Mode";
    }
});