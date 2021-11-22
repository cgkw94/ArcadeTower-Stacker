"use strict";

//create 20 rows
for (let i = 20; i > 0; i--) {
  let row = document.createElement("div");
  row.setAttribute("class", "all-rows sliding");
  row.setAttribute("id", `row${i}`);
  document.querySelector(".game-container").append(row);
}

const stopRow1 = () => {
  //select row
  let currentRow = document.querySelector("#row1");

  //retrieve CSS left position
  let currentLeftPosition = window
    .getComputedStyle(currentRow)
    .getPropertyValue("left");
  //   console.log(currentLeftPosition);

  //remove sliding animation
  currentRow.classList.remove("sliding");

  //assign left position it to current row CSS
  currentRow.style.left = currentLeftPosition;
};

const stopRow2 = () => {
  //select row
  let currentRow = document.querySelector("#row2");

  //retrieve CSS left position
  let currentLeftPosition = window
    .getComputedStyle(currentRow)
    .getPropertyValue("left");
  //   console.log(currentLeftPosition);

  //remove sliding animation
  currentRow.classList.remove("sliding");

  //assign left position it to current row CSS
  currentRow.style.left = currentLeftPosition;
};

document.querySelector("#stop-btn").addEventListener("click", stopRow1);
document.querySelector("#stop-btn2").addEventListener("click", stopRow2);
