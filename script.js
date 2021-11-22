"use strict";

//create 25 rows
for (let i = 20; i > 0; i--) {
  let row = document.createElement("div");
  row.setAttribute("class", "all-rows sliding");
  row.setAttribute("id", `row${i}`);
  document.querySelector(".game-container").append(row);
}
