import {
  drawArc,
  drawArcArrow,
  drawLine,
  drawLineArrow,
  drawLoop,
  drawLoopArrow,
} from "./drawLines.js";
import { dirVertexMatrix, unDirVertexMatrix } from "./conectedCoord.js";
import { dirVertexCoord, unDirVertexCoord } from "./drawVertex.js";

//ЧИ Є МІЖ ДВОМА ВЕРШИНАМИ 3?
let findAdjacentVertices = (v1, v2, coords) => {
  for (let i = 0; i < coords.length; i++) {
    const vertex = coords[i];
    if (
      (vertex.x === v1.x && vertex.y === v1.y) ||
      (vertex.x === v2.x && vertex.y === v2.y)
    )
      continue;

    if (
      (vertex.y - v1.y) * (v2.x - v1.x) === (v2.y - v1.y) * (vertex.x - v1.x) &&
      ((v1.x <= vertex.x && vertex.x <= v2.x) ||
        (v2.x <= vertex.x && vertex.x <= v1.x)) &&
      ((v1.y <= vertex.y && vertex.y <= v2.y) ||
        (v2.y <= vertex.y && vertex.y <= v1.y))
    )
      return true;
  }
  return false;
};

//МАЛЮВАННЯ DirGraph
let drawDirGraph = (dirMatrix) => {};

//МАЛЮВАННЯ UnDirGraph
let drawUnDirGraph = (unDirMatrix, colors) => {
  let unDirMat = unDirMatrix;
  let k = 1;

  for (let i = 0; i < unDirMat.length; i++) {
    for (let j = i; j <= unDirMat.length; j++) {
      if (unDirMat[i][j] > 0 && i === j) {
        drawLoop(unDirVertexMatrix[i]);
      } else if (unDirMat[i][j] > 0 && unDirMat[j][i] > 0) {
        if (
          findAdjacentVertices(
            unDirVertexMatrix[i],
            unDirVertexMatrix[j],
            unDirVertexCoord
          )
        ) {
          drawArc(
            unDirVertexMatrix[i],
            unDirVertexMatrix[j],
            unDirMat[j][i],
            colors[k]
          );
          k++;
        } else {
          drawLine(
            unDirVertexMatrix[i],
            unDirVertexMatrix[j],
            unDirMat[j][i],
            colors[k]
          );
          k++;
        }
      }
    }
  }
};
//[1,2,3]
let k = 0;
const drawGraph = (arr, colors) => {
  const firstEl = arr[0];
  const secondEl = arr[1];
  const thirdEl = arr[2];

  if (firstEl === secondEl) {
    drawLoop(dirVertexMatrix[firstEl]);
  } else if (
    findAdjacentVertices(
      dirVertexMatrix[firstEl],
      dirVertexMatrix[secondEl],
      dirVertexCoord
    )
  ) {
    drawArc(
      dirVertexMatrix[firstEl],
      dirVertexMatrix[secondEl],
      thirdEl,
      colors[k]
    );
    k++;
  } else {
    drawLine(
      dirVertexMatrix[firstEl],
      dirVertexMatrix[secondEl],
      thirdEl,
      colors[k]
    );
    k++;
  }
};

export { drawDirGraph, drawUnDirGraph, drawGraph };
