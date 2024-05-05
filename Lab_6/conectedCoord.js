import { dirVertexCoord,unDirVertexCoord } from "./drawVertex.js";

//ЗВ'ЯЗОК КООРДИНАТ ВЕРШИН З МАТРИЦЕЮ
let dirVertexMatrix = {};


dirVertexCoord.forEach((vertex, index) => {
    dirVertexMatrix[index] = vertex;
});


let unDirVertexMatrix = {};
unDirVertexCoord.forEach((vertex, index) => {
    unDirVertexMatrix[index] = vertex;
});

export {dirVertexMatrix, unDirVertexMatrix}