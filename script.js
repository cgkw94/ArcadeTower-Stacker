"use strict";

//create 21 rows
for (let i = 20; i > 0; i--) {
  let row = document.createElement("div");
  row.setAttribute("class", "all-rows sliding");
  row.setAttribute("id", `row${i}`);
  document.querySelector(".game-container").append(row);
}
//assign medium-speed class to middle rows
for (let i = 12; i > 5; i--) {
  document.querySelectorAll(".all-rows")[i].classList.add("medium-speed");
}
//assign fast-speed class to upper rows
for (let i = 5; i > 0; i--) {
  document.querySelectorAll(".all-rows")[i].classList.add("fast-speed");
}
//assign fastest-speed class to top row
document.querySelectorAll(".all-rows")[0].classList.add("fastest-speed");

///////////////////////////////////////////////////
////////////////// GAME LOGIC ////////////////////
//////////////////////////////////////////////////

let counter = 0;
let rowWidth = 480;

const stopRow = (row) => {
  ////// setting row values
  let currentRow = document.querySelector("#row" + row);
  let belowRow = document.querySelector("#row" + (row - 1));
  let aboveRow = document.querySelector("#row" + (row + 1));
  if (row === 1) {
    belowRow = currentRow;
  } else {
    belowRow = belowRow;
  }

  ///calculate current row left position of row
  let currentLeft = window
    .getComputedStyle(currentRow)
    .getPropertyValue("left");

  //removing sliding animation
  currentRow.classList.remove("sliding");
  currentRow.classList.remove("medium-speed");
  currentRow.classList.remove("fast-speed");
  currentRow.classList.remove("fastest-speed");
  //assign left position to current row
  currentRow.style.left = currentLeft;

  //calculate below row left position & current width
  let belowLeft = window.getComputedStyle(belowRow).getPropertyValue("left");
  let currentWidth = window
    .getComputedStyle(currentRow)
    .getPropertyValue("width");

  //convert string to numbers
  currentLeft = parseFloat(currentLeft);
  currentWidth = parseFloat(currentWidth);
  belowLeft = parseFloat(belowLeft);

  //calculate difference in left position of current vs below
  let leftDifference = currentLeft - belowLeft;
  let absLeftDifference = Math.abs(leftDifference);

  //player miss stack
  if (leftDifference < -currentWidth || leftDifference > currentWidth) {
    //hide score
    document.querySelector("#score").style.visibility = "hidden";
    //lose alert
    Swal.fire({
      title: "YOU LOSE!",
      text: `Score: ${counter}`,
      icon: "error",
      confirmButtonText: "OK",
    }).then(function () {
      window.location.reload();
    });
  } else {
    //find left over width & add px to string
    let leftOverWidth = (currentWidth - absLeftDifference).toString();
    leftOverWidth = leftOverWidth + "px";
    //change width of current & above
    currentRow.style.width = leftOverWidth;
    aboveRow.style.width = leftOverWidth;
    aboveRow.style.visibility = "visible";

    //extends the animation so it fits in game-container
    rowWidth = rowWidth + absLeftDifference;
    if (currentRow != document.querySelector("#row1")) {
      document.documentElement.style.setProperty("--width", `${rowWidth}px`);
    }
  }

  //re-assign function & button to above row
  let aboveRowClick = `stopRow(${row + 1})`;
  document.querySelector("#stop-btn").setAttribute("onclick", aboveRowClick);

  //track score
  counter++;
  //update score in html
  document.querySelector("#score").innerText = counter;

  //player win
  if (
    counter === 20 &&
    (leftDifference > -currentWidth || leftDifference < currentWidth)
  ) {
    Swal.fire({
      title: "YOU WIN!",
      text: `Score: ${counter}`,
      icon: "success",
      confirmButtonText: "OK",
    }).then(function () {
      window.location.reload();
    });
  }
};
