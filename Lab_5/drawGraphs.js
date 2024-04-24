
import {drawArc,drawArcArrow,drawLine,drawLineArrow,drawLoop,drawLoopArrow} from './drawLines.js'
import { dirVertexMatrix, secondVertexMatrix } from './conectedCoord.js';
import { dirVertexCoord, secondVertexCoord } from './drawVertex.js';
import {drawCircle} from "./drawVertex.js";
import {ctx} from "./const.js";

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

function drawGraph(element, color){
    const firstEl = element[0]
    const secondEl = element[1]

    const values = {
        x: (secondVertexMatrix[firstEl].x),
        y: (secondVertexMatrix[firstEl].y),
        x2 : (secondVertexMatrix[secondEl].x),
        y2 : (secondVertexMatrix[secondEl].y),
        color: color[firstEl],
        number1: firstEl+1,
    }

   drawCircle(ctx, values.x, values.y, values.number1, values.color)

    if(element[1] === 0){
        drawCircle(ctx, values.x, values.y, values.number1, values.color)

    } else if(findAdjacentVertices(secondVertexMatrix[firstEl], secondVertexMatrix[secondEl], secondVertexCoord)){
        drawArcArrow(secondVertexMatrix[firstEl], secondVertexMatrix[secondEl]);
        drawCircle(ctx, values.x2, values.y2, secondEl+1, values.color)

    } else {
        drawLineArrow(secondVertexMatrix[firstEl], secondVertexMatrix[secondEl]);
        drawCircle(ctx, values.x2, values.y2, secondEl+1, values.color)
    }

}


export {drawDirGraph, drawGraph}