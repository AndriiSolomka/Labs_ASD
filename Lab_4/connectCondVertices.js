import { coordsOnCanvas } from "./doSortedCondVertex.js";
import { output } from "./calcStrongItems.js";

function connectVertices(vertices, edges) {
    const connectedVertices = [];

    edges.forEach(edge => {
        const startVertex = vertices[edge[0]];
        const endVertex = vertices[edge[1]];

        connectedVertices.push({
            start: { x: startVertex.x, y: startVertex.y },
            end: { x: endVertex.x, y: endVertex.y }
        });
    });

    return connectedVertices;
}


const connectedVertices = connectVertices(coordsOnCanvas, output);
 export {connectedVertices}