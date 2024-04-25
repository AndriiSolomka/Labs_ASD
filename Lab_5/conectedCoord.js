import { dirVertexCoord,secondVertexCoord, smallCircleCoord } from "./drawVertex.js";

//ЗВ'ЯЗОК КООРДИНАТ ВЕРШИН З МАТРИЦЕЮ
let dirVertexMatrix = {};


dirVertexCoord.forEach((vertex, index) => {
    dirVertexMatrix[index] = vertex;
});


let graphCoords = {};
secondVertexCoord.forEach((vertex, index) => {
    graphCoords[index] = vertex;
});

let smallVertexCoords = {};
smallCircleCoord.forEach((vertex, index) => {
    smallVertexCoords[index] = vertex;
});


export {dirVertexMatrix, graphCoords,smallVertexCoords}