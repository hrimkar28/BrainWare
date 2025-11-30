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



// ===== FADE-IN ON SCROLL =====
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.2
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});




// ===== SIMPLE NAV ACTIVE ON CLICK =====
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});