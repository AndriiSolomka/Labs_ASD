import {condVertexCoords} from './doSortedCondVertex.js'
import { drawCircle } from './drawVertex.js'
import { ctx } from './const.js'

let num2 = 1
for (const pos in condVertexCoords) {
    drawCircle(ctx, condVertexCoords[pos].x + 500, condVertexCoords[pos].y + 300, num2)
    num2++
} 
