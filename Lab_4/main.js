'use strict'

//КОНСТАНТИ
import {variant, canvas, ctx, radius, vertexBetweenSpace, startDirX,
    startUnDirX, startY,vertexCount,verticesPerSide} from "./const.js";

console.group('Частина №1')    
//ВИВІД МАТРИЦЬ
import { dirMatrix, unDirMatrix } from "./graphMatrices.js"
console.group('Матриця напрямленого графа')
console.log(dirMatrix);
console.groupEnd()

console.group('Матриця ненапрямленого графа')
console.log(unDirMatrix);
console.groupEnd()


// МАЛЮВАННЯ ГРАФІВ
import { drawDirGraph, drawUnDirGraph } from "./drawGraphs.js";
drawDirGraph(dirMatrix);
drawUnDirGraph(unDirMatrix)


//МАЛЮВАННЯ ВЕРШИН 
import {drawDirGraphVertex, drawUnDirGraphVertex } from './drawVertex.js'
drawDirGraphVertex(ctx, vertexBetweenSpace);
drawUnDirGraphVertex(ctx, vertexBetweenSpace);


//ЗНАХОДЖЕННЯ СТЕПЕНІВ
import { dirResult, unDirResult } from "./calcDegrees.js";
console.group("Степені вершин напрямленого графа:")
console.log(dirResult);
console.groupEnd()

console.group("Степені вершин непрямленого графа:");
console.log(unDirResult);
console.groupEnd()


// ЗНАХОДЖЕННЯ  НАПІВСТЕПЕНІВ
import { getFinalHalfDegrees } from "./calcHalfDegrees.js";

console.group("Напівстепені виходу та заходу напрямленого графа:");
console.log(getFinalHalfDegrees);
console.groupEnd()


//ЧИ РЕГУЛЯРНИЙ ГРАФ?
import { isRegular } from "./findRegular.js";
console.group('Чи є граф регулярним?');
if (isRegular.true === true) {
    console.log("Граф є регулярним зі ступенем однорідності " + Array.from(isRegular.degree));
} else {
    console.log("Граф не є регулярним.");
}
console.groupEnd()


//ЗНАХОДЖЕННЯ ВИСЯЧИХ І ІЗОЛЬОВАНИХ ВЕРШИН
import {hangingVertex,outputIsolatedVertex, outputHangingVertex} from "./hangingAndIsolated.js"

const outputIsolated = outputIsolatedVertex(hangingVertex)
const outputHanging = outputHangingVertex(hangingVertex)

console.group('Ізольовані вершини: ');
console.log(outputIsolated);
console.groupEnd();

console.group('Висячі вершини: ');
console.log(outputHanging);
console.groupEnd();
console.groupEnd();


//НОВИЙ ОРГРАФ
//ЗНАХОДЖЕННЯ  НАПІВСТЕПЕНІВ
console.group('Частина №2');
console.group("Напівстепені виходу та заходу напрямленого ОРГРАФА:");
console.log(getFinalHalfDegrees);
console.groupEnd()

//ЗНАХОДЖЕННЯ ШЛЯХІВ ДОВЖИНИ 2
import { twoLength, threeLength } from "./findRoads.js";

console.group("Маршрути довжини 2:");
console.table(twoLength);
console.groupEnd()


console.group("Маршрути довжини 3:");
console.table(threeLength);
console.groupEnd()

//ЗНАХОДЖЕННЯ МАТРИЦІ ДОСЯЖНОСТІ
import { attainabilityMat } from "./attainabilityMatrix.js";
console.group('Матриця досяжності');
console.log(attainabilityMat);
console.groupEnd();


//ЗНАХОДЖЕННЯ МАТРИЦІ СИЛЬНОЇ ЗВ'ЯЗНОСТІ
import { elementWiseProduct } from "./strongMatrix.js";
console.group('Матриця сильної зв`язносоті:');
console.log(elementWiseProduct);
console.groupEnd()


//КОМПОНЕНТИ СИЛЬНОЇ ЗВ'ЯЗНОСТІ
import { strongItemsArr } from "./strongItems.js";
console.group('Компоненти сильної зв\'язності:');
console.log(strongItemsArr);
console.groupEnd()


//ПЕРЕЛІК КОМПОНЕНТ СИЛЬНОЇ ЗВ'ЯЗНОСТІ
import { drawCondGraph } from "./drawGraphs.js";
import { connectedVertices } from "./connectCondVertices.js";
drawCondGraph(connectedVertices)
console.groupEnd()