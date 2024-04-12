import { strongItemsArr } from "./strongItems.js"
import { dirVertexCoord } from "./drawVertex.js"
import { drawCircle } from "./drawVertex.js"
import { ctx } from "./const.js"


const doSortedCondVertex = (array) =>{
    let correctVertexes = []

    for (const correctVertex of array) {
        correctVertexes.push(correctVertex[0])
    }

    return correctVertexes
}

let sortedCondVertex = doSortedCondVertex(strongItemsArr)



let newCondCoords = (sortedCondVertex, dirVertexCoord) =>{
    const indexCoordinateMapping = {};

    sortedCondVertex.forEach(index => {
        indexCoordinateMapping[index] = dirVertexCoord[index];
    });

    return indexCoordinateMapping
}

const condVertexCoords = newCondCoords(sortedCondVertex, dirVertexCoord)


let num = 1
let coordsOnCanvas = []
for (const pos in condVertexCoords) {
    coordsOnCanvas.push(drawCircle(ctx, condVertexCoords[pos].x + 500, condVertexCoords[pos].y + 300, num))
    num++
}



export {coordsOnCanvas, newCondCoords, condVertexCoords}