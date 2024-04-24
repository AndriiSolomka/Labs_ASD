import { dirVertexCoord,secondVertexCoord } from "./drawVertex.js";

//ЗВ'ЯЗОК КООРДИНАТ ВЕРШИН З МАТРИЦЕЮ
let dirVertexMatrix = {};


dirVertexCoord.forEach((vertex, index) => {
    dirVertexMatrix[index] = vertex;
});


let secondVertexMatrix = {};
secondVertexCoord.forEach((vertex, index) => {
    secondVertexMatrix[index] = vertex;
});


export {dirVertexMatrix, secondVertexMatrix}