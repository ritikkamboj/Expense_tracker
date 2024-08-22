const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const items = [
  { id: 1, text: "salary", amount: 1000 },
  { id: 2, text: "Smartphone", amount: -800 },
  { id: 3, text: "Headphones", amount: -150 },
  { id: 4, text: "Tablet", amount: -400 },
  { id: 5, text: "Smartwatch", amount: -250 },
];

let transactions = items;
console.log(transactions);

function addElementToDom(transaction) {
  let sign = transaction.amount < 0 ? "-" : "+";

  let item = document.createElement("li");

  // console.log(item);
  item.classList.add(sign === "-" ? "minus" : "plus");

  item.innerHTML = `${transaction.text}<span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn">X</button>`;
  // console.log(item);
  list.appendChild(item);
  console.log(list);
}

function init() {
  list.innerHTML = ``;

  transactions.forEach((item) => addElementToDom(item));
}
init();
