
import {drawArc,drawArcArrow,drawLine,drawLineArrow,drawLoop,drawLoopArrow} from './drawLines.js'
import { dirVertexMatrix, unDirVertexMatrix } from './conectedCoord.js';
import { dirVertexCoord, unDirVertexCoord } from './drawVertex.js';
import { connectedVertices } from './connectCondVertices.js';
import { coordsOnCanvas } from './doSortedCondVertex.js';


//ЧИ Є МІЖ ДВОМА ВЕРШИНАМИ 3?
let findAdjacentVertices = (v1, v2, coords) => {

    for (let i = 0; i < coords.length; i++) {

        const vertex = coords[i];
        if ((vertex.x === v1.x && vertex.y === v1.y) || (vertex.x === v2.x && vertex.y === v2.y))
            continue;


        if ((vertex.y - v1.y) * (v2.x - v1.x) === (v2.y - v1.y) * (vertex.x - v1.x) &&
            (v1.x <= vertex.x && vertex.x <= v2.x || v2.x <= vertex.x && vertex.x <= v1.x) &&
            (v1.y <= vertex.y && vertex.y <= v2.y || v2.y <= vertex.y && vertex.y <= v1.y))
            return true ;
    }
    return false;
}


//МАЛЮВАННЯ DirGraph
let drawDirGraph = (dirMatrix) =>{
    let dirMat = dirMatrix;

    for(let i = 0; i < dirMat.length; i++){
        for(let j = i; j < dirMat.length; j++){

            if((dirMat[i][j] === 1 || dirMat[j][i] === 1)  && !(dirMat[i][j] === 1 && dirMat[j][i] === 1) ){

                if(findAdjacentVertices(dirVertexMatrix[i], dirVertexMatrix[j], dirVertexCoord)){

                    if(dirMat[i][j] === 1 && i < j){
                        drawArcArrow(dirVertexMatrix[i], dirVertexMatrix[j]);

                    } else{
                        drawArcArrow(dirVertexMatrix[j], dirVertexMatrix[i]);
                    }

                } else if(dirMat[i][j] === 1 && i < j){
                    drawLineArrow(dirVertexMatrix[i], dirVertexMatrix[j]);
                } else{
                    drawLineArrow(dirVertexMatrix[j], dirVertexMatrix[i]);
                }

            }else if(dirMat[i][j] === 1 && dirMat[j][i] === 1){

                if((findAdjacentVertices(dirVertexMatrix[i], dirVertexMatrix[j], dirVertexCoord))){

                    drawArcArrow(dirVertexMatrix[i], dirVertexMatrix[j]);
                    drawArcArrow(dirVertexMatrix[j], dirVertexMatrix[i]);

                } else if(dirMat[i][j] === 1 && i === j){
                    drawLoopArrow(dirVertexMatrix[i]);

                }else {

                    drawArcArrow(dirVertexMatrix[j], dirVertexMatrix[i]);
                    drawLineArrow(dirVertexMatrix[i], dirVertexMatrix[j]);

                }
            }
        }
    }
}



 //МАЛЮВАННЯ UnDirGraph
 let drawUnDirGraph = (unDirMatrix) =>{
    let unDirMat = unDirMatrix;

    for(let i = 0; i < unDirMat.length; i++){
        for(let j = i; j <= unDirMat.length; j++){

            if(unDirMat[i][j] === 1 && i === j){
                drawLoop(unDirVertexMatrix[i]);

            } else if(unDirMat[i][j] === 1 && unDirMat[j][i] === 1){

                if(findAdjacentVertices(unDirVertexMatrix[i], unDirVertexMatrix[j], unDirVertexCoord)){

                    drawArc(unDirVertexMatrix[i], unDirVertexMatrix[j]);

                } else drawLine(unDirVertexMatrix[i], unDirVertexMatrix[j])
            }

        }
    }
} 


//МАЛЮВАННЯ ГРАФА КОНДЕНСАЦІЇ

const drawCondGraph = (connectedVertices) => {
    for (const connectedVertex of connectedVertices) {
        if(findAdjacentVertices(connectedVertex.start, connectedVertex.end, coordsOnCanvas)){
            drawArcArrow(connectedVertex.start, connectedVertex.end)
        } else{
            drawLineArrow(connectedVertex.start, connectedVertex.end)
        }
    
    }
    
}


export {drawDirGraph, drawUnDirGraph, drawCondGraph}