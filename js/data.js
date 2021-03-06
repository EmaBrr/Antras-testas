"use strict";
//table content:

const account = [
  { month: 10, income: 150 },
  { month: 1, income: 200, expense: 50 },
  { month: 3, income: 450, expense: 200 },
  { month: 7, expense: 50 },
  { month: 2, income: 50 },
  { month: 5, income: 150, expense: 50 },
  { month: 9, income: 700, expense: 400 },
  { month: 4, income: 10, expense: 300 },
  { month: 6, expense: 50 },
  { month: 11, income: 150, expense: 30 },
  { month: 8, income: 450, expense: 120 },
  { month: 12, expense: 200 },
];

const months = [
  { number: 1, name: "Sausis" },
  { number: 2, name: "Vasaris" },
  { number: 3, name: "Kovas" },
  { number: 4, name: "Balandis" },
  { number: 5, name: "Gegužė" },
  { number: 6, name: "Birželis" },
  { number: 7, name: "Liepa" },
  { number: 8, name: "Rugpjūtis" },
  { number: 9, name: "Rugsėjis" },
  { number: 10, name: "Spalis" },
  { number: 11, name: "Lapkritis" },
  { number: 12, name: "Gruodis" },
];

let arrayForTable = [];

let sortedList = account.sort(
  (firstItem, secondItem) => firstItem.month - secondItem.month
);

for (let index = 0; index < sortedList.length; index++) {
  let counter;
  let income;
  let expense;
  let nameOfMonth;
  let balance;
  let object;
  counter = index + 1;
  nameOfMonth = months[sortedList[index].month - 1].name;
  income = sortedList[index].income ?? 0;
  expense = sortedList[index].expense ?? 0;
  balance = income - expense ?? 0;
  object = { counter, nameOfMonth, income, expense, balance };

  arrayForTable.push(object);
}

function fillTheTable() {
  let HTML = "";
  let whereToPut = document.querySelector(".table-content");
  for (let index = 0; index < arrayForTable.length; index++) {
    HTML += `
        <div class="table-row">
            <div class="cell">${arrayForTable[index].counter}</div>
            <div class="cell">${arrayForTable[index].nameOfMonth}</div>
            <div class="cell">${arrayForTable[index].income ?? "-"}</div>
            <div class="cell">${arrayForTable[index].expense ?? "-"}</div>
            <div class="cell">${arrayForTable[index].balance ?? "-"}</div>
        </div>
        `;
  }
  return (whereToPut.innerHTML = HTML);
}

fillTheTable();

//sum of incomes and expenses:

function lastRow() {
  let incomeSum = 0;
  let expenseSum = 0;
  let balanceSum = 0;
  let whereToPut = document.querySelector(".table-footer");

  for (let i = 0; i < arrayForTable.length; i++) {
    incomeSum += arrayForTable[i].income;
    expenseSum += arrayForTable[i].expense;
    balanceSum += arrayForTable[i].balance;
  }

  let HTML = `
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell">${incomeSum} Eur</div>
        <div class="cell">${expenseSum} Eur</div>
        <div class="cell">${balanceSum} Eur</div>
        `;

  return (whereToPut.innerHTML = HTML);
}

lastRow();


//list of months:

let incomeMonth = [];
let expenseMonth = [];

function listOfMonths() {
    for (let index = 0; index < arrayForTable.length; index++) {
        if (arrayForTable[index].income !== 0) {
            incomeMonth.push(arrayForTable[index].income);
        };
        if (arrayForTable[index].expense !== 0) {
            expenseMonth.push(arrayForTable[index].expense);
        };
    }

    for (let index = 0; index < arrayForTable.length; index++) {
        if (Math.min.apply(Math, incomeMonth) == arrayForTable[index].income) {
            document.getElementById("minIncome").innerHTML = `
            <div  class="value">${arrayForTable[index].nameOfMonth}</div>
            <div class="title">mėnuo, kai buvo mažiausiai uždirbta, bet ne lygu nuliui</div>`;
        }
    }

    for (let index = 0; index < arrayForTable.length; index++) {
        if (Math.max.apply(Math, incomeMonth) == arrayForTable[index].income) {
            document.getElementById("maxIncome").innerHTML = `
            <div  class="value">${arrayForTable[index].nameOfMonth}</div>
            <div class="title">mėnuo, kai buvo daugiausiai uždirbta</div>`;
        }
    }

    for (let index = 0; index < arrayForTable.length; index++) {
        if (Math.min.apply(Math, expenseMonth) == arrayForTable[index].expense) {
            document.getElementById("minExpense").innerHTML = `
            <div  class="value">${arrayForTable[index].nameOfMonth}</div>
            <div class="title">mėnuo, kai buvo mažiausiai išlaidos, bet ne lygios nuliui</div>`;
        }
    }

    for (let index = 0; index < arrayForTable.length; index++) {
        if (Math.max.apply(Math, expenseMonth) == arrayForTable[index].expense) {
            document.getElementById("maxExpense").innerHTML = `
            <div  class="value">${arrayForTable[index].nameOfMonth}</div>
            <div class="title">mėnuo, kai buvo didžiausios išlaidos</div>`;
        }
    }
}

listOfMonths();