
import {drawArc,drawArcArrow,drawLine,drawLineArrow,drawLoop,drawLoopArrow} from './drawLines.js'
import { dirVertexMatrix, graphCoords, smallVertexCoords } from './conectedCoord.js';
import { dirVertexCoord, secondVertexCoord} from './drawVertex.js';
import {drawCircle, statusVertex, smallCircleCoord} from "./drawVertex.js";
import {ctx, radius} from "./const.js";


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
                    drawArcArrow(dirVertexMatrix[j], dirVertexMatrix[i],1.9);

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

let activeArr = []

function drawGraphDFS(element, color){

    const firstEl = element[0];
    const secondEl = element[1];


        if(secondEl === 'active'){
            activeArr.push(firstEl)
            statusVertex(ctx, smallVertexCoords[firstEl].x, smallVertexCoords[firstEl].y, 'a')
            drawCircle(ctx, graphCoords[firstEl].x, graphCoords[firstEl].y, firstEl+1, color[firstEl])

        }

        if(secondEl === 'visited' ) {
            statusVertex(ctx, smallVertexCoords[firstEl].x, smallVertexCoords[firstEl].y, 'v');
        }

        if(activeArr.length === 2){

            if(findAdjacentVertices(graphCoords[activeArr[0]], graphCoords[activeArr[1]], secondVertexCoord)){
                drawArcArrow(graphCoords[activeArr[0]], graphCoords[activeArr[1]], color[activeArr[0]]);

            } else {
                drawLineArrow(graphCoords[activeArr[0]], graphCoords[activeArr[1]], color[activeArr[0]])
            }
            activeArr.shift()

        }

        if(secondEl === 'closed'){
            statusVertex(ctx, smallVertexCoords[firstEl].x, smallVertexCoords[firstEl].y, 'c');
            activeArr = []
        }


}


function drawGraphBFS (element, color){
    const firstEl = element[0];
    const secondEl = element[1];


    if(secondEl === 'active'){

        statusVertex(ctx, smallVertexCoords[firstEl].x, smallVertexCoords[firstEl].y, 'a')
        drawCircle(ctx, graphCoords[firstEl].x, graphCoords[firstEl].y, firstEl+1, color[firstEl])
        activeArr.push(firstEl)
    }

    if(secondEl === 'visited' && activeArr.length !== 0) {

        if(findAdjacentVertices(graphCoords[activeArr[0]], graphCoords[firstEl], secondVertexCoord)){
            drawArcArrow(graphCoords[activeArr[0]], graphCoords[firstEl], color[activeArr[0]]);

        } else {
            drawCircle(ctx, graphCoords[firstEl].x, graphCoords[firstEl].y, firstEl+1, color[activeArr])
            drawLineArrow(graphCoords[activeArr[0]], graphCoords[firstEl], color[activeArr[0]])
            statusVertex(ctx, smallVertexCoords[firstEl].x, smallVertexCoords[firstEl].y, 'v');
        }

    }

    if(secondEl === 'closed'){
        statusVertex(ctx, smallVertexCoords[firstEl].x, smallVertexCoords[firstEl].y, 'c');
        activeArr = []
    }

}



export {drawDirGraph, drawGraphDFS, drawGraphBFS}

