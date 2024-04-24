import {dfsResult} from "./dfs.js";
import {bfsResult} from "./bfs.js";
import {vertexColors} from "./const.js";
import {drawGraph} from "./drawGraphs.js";


const dfsBtn = document.querySelector('.dfs');
let step = 0;

dfsBtn.addEventListener('click', () => {
    if (step < dfsResult.length) {
        drawGraph(dfsResult.at(step), vertexColors);
        step++;
    } else {
        alert('Обхід DFS завершено!')
        location.reload();
    }
});

const bfsBtn = document.querySelector('.bfs');
let bfsPoint = 0;

bfsBtn.addEventListener('click', () => {
    if (step < bfsResult.length) {
        drawGraph(bfsResult.at(step), vertexColors);
        step++;
    } else {
        alert('Обхід BFS завершено!')
        location.reload();
    }
});



