"use strict";

//КОНСТАНТИ
import {
  variant,
  canvas,
  ctx,
  radius,
  vertexBetweenSpace,
  startDirX,
  startUnDirX,
  startY,
  vertexCount,
  verticesPerSide,
  colors,
} from "./const.js";

import { dirMatrix, unDirMatrix } from "./graphMatrices.js";
console.log("unDirMatrix", unDirMatrix);

// МАЛЮВАННЯ ГРАФІВ
import { drawDirGraph, drawUnDirGraph } from "./drawGraphs.js";
import { weightMatrix } from "./calcW.js";

drawDirGraph(dirMatrix);
drawUnDirGraph(weightMatrix, colors);

import { drawDirGraphVertex, drawUnDirGraphVertex } from "./drawVertex.js";
drawDirGraphVertex(ctx, vertexBetweenSpace);
drawUnDirGraphVertex(ctx, vertexBetweenSpace);
