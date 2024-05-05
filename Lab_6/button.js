import { minimumSpanningTree } from "./makeConnections.js";
import { drawGraph } from "./drawGraphs.js";
import { colors } from "./const.js";

let ageCount = [];
for (const obj of minimumSpanningTree) {
  let locArr = [];
  for (const key in obj) {
    locArr.push(obj[key]);
  }
  ageCount.push(locArr);
}

const numbers = ageCount.map((item) => item[2]);
let sum = numbers.reduce((total, current) => total + current, 0);
console.log("Сума ваг ребер знайденого мiнiмального кiстяка:", sum);

let step = 0;
const click = document.querySelector(".click");
click.addEventListener("click", () => {
  if (step < ageCount.length) {
    drawGraph(ageCount.at(step), colors);

    step++;
  } else {
    alert("Обхід завершено!");
    location.reload();
  }
});
