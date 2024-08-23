const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// const items = [
//   { id: 1, text: "salary", amount: 1000 },
//   { id: 2, text: "Smartphone", amount: -800 },
//   { id: 3, text: "Headphones", amount: -150 },
//   { id: 4, text: "Tablet", amount: -400 },
//   { id: 5, text: "Smartwatch", amount: -250 },
// ];

let items = JSON.parse(localStorage.getItem('transaction'));


let transactions = items ? items : [{}];

console.log(transactions);
function addTransaction(e) {
  e.preventDefault();

  console.log(text.value);
  console.log(typeof amount.value);

  if (text.value.trim() === "" || amount.value === "")
    alert("You are missing Either of the value to enter");
  else {
    let transaction = {
      id: getId(),
      text: text.value,
      amount: +amount.value,
    };
    console.log(typeof transaction.amount);
    transactions.push(transaction);
    init();

    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }
}

function updateLocalStorage()
{
  localStorage.setItem('transaction', JSON.stringify(transactions));
}

function getId() {
  return Math.random(Math.random() * 100000);
}
function amountValues(transactions) {
  // firstly filter the amount in an array and then total that
  // console.log(typeof transactions[0].amount);
  let total = transactions
    .map((item) => item.amount)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);
  console.log(total);
  balance.innerHTML = `$${Math.abs(total)}`;

  // adding the income and expense

  let income = transactions
    .filter((item) => item.amount > 0)
    .reduce((acc, item) => acc + item.amount, 0)
    .toFixed(2);
  console.log(income);
  money_plus.innerHTML = `$${income}`;

  let expense = transactions
    .filter((item) => item.amount < 0)
    .reduce((acc, item) => acc + item.amount, 0)
    .toFixed(2);
  console.log(expense);

  money_minus.innerHTML = `$${Math.abs(expense)}`;
}
function addElementToDom(transaction) {
  let sign = transaction.amount < 0 ? "-" : "+";

  let item = document.createElement("li");

  // console.log(item);
  item.classList.add(sign === "-" ? "minus" : "plus");

  item.innerHTML = `${transaction.text}<span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" onClick="deleteTrans(${
    transaction.id
  })">X</button>`;
  // console.log(item);
  list.appendChild(item);
  console.log(list);
}

function deleteTrans(id) {
  console.log("jai maata di ", id);

  transactions = transactions.filter((item) => item.id !== id);
  updateLocalStorage();
  init();
}

form.addEventListener("submit", addTransaction);

function init() {
  list.innerHTML = ``;

  transactions.forEach((item) => addElementToDom(item));
  amountValues(transactions);
}
init();
