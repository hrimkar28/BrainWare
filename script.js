// Simple Expense Tracker with localStorage

const form = document.getElementById("expenseForm");
const nameInput = document.getElementById("expenseName");
const amountInput = document.getElementById("expenseAmount");
const categorySelect = document.getElementById("expenseCategory");
const listEl = document.getElementById("expenseList");
const totalEl = document.getElementById("totalAmount");

let expenses = [];

// Load from localStorage on start
const saved = localStorage.getItem("faxfeed-expenses");
if (saved) {
  expenses = JSON.parse(saved);
  renderExpenses();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = nameInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const category = categorySelect.value;

  if (!title || !amount || amount <= 0) return;

  const newExpense = {
    id: Date.now(),
    title,
    amount,
    category,
    date: new Date().toLocaleDateString()
  };

  expenses.unshift(newExpense); // latest on top
  saveAndRender();

  form.reset();
  nameInput.focus();
});

function saveAndRender() {
  localStorage.setItem("faxfeed-expenses", JSON.stringify(expenses));
  renderExpenses();
}

function renderExpenses() {
  // Clear list
  listEl.innerHTML = "";

  let total = 0;

  expenses.forEach((exp) => {
    total += exp.amount;

    const li = document.createElement("li");
    li.className = "expense-item";

    li.innerHTML = `
      <div class="expense-main">
        <span class="expense-title">${exp.title}</span>
        <span class="expense-meta">${exp.category} • ${exp.date}</span>
      </div>
      <div style="display:flex; align-items:center; gap:8px;">
        <span class="expense-amount">₹${exp.amount}</span>
        <button class="expense-delete" aria-label="Delete">✕</button>
      </div>
    `;

    const deleteBtn = li.querySelector(".expense-delete");
    deleteBtn.addEventListener("click", () => {
      expenses = expenses.filter((e) => e.id !== exp.id);
      saveAndRender();
    });

    listEl.appendChild(li);
  });

  totalEl.textContent = total.toString();
}


// ===== NAV ACTIVE LINK ON SCROLL (simple + reliable) =====
const navLinks = document.querySelectorAll(".nav-link");
const navSections = [
  document.getElementById("home"),
  document.getElementById("about"),
  document.getElementById("projects"),
  document.getElementById("contact"),
].filter(Boolean);

function setActiveNav() {
  let currentId = navSections[0]?.id || "home";
  const scrollY = window.scrollY + 150; // navbar height + thoda offset

  navSections.forEach((section) => {
    if (scrollY >= section.offsetTop) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const targetId = link.getAttribute("href").slice(1); // "#about" -> "about"
    if (targetId === currentId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", setActiveNav);
window.addEventListener("load", setActiveNav);