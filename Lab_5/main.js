'use strict'

//ВИВІД МАТРИЦЬ
import { dirMatrix } from "./graphMatrices.js"
console.group('Матриця напрямленого графа')
console.log(dirMatrix);
console.groupEnd()

// МАЛЮВАННЯ ГРАФІВ
import { drawDirGraph} from "./drawGraphs.js";
drawDirGraph(dirMatrix);
