"use strict"


//Input
const variant = prompt('Input your variant :)');
const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');
const radius = 20;
const vertexBetweenSpace = 150;
const startDirX = 100;
const startUnDirX = 1100;
const startY = 150;
const vertexCount = 10 + (+variant.charAt(2));
const verticesPerSide = (vertexCount / 2) - 1;


//ГЕНЕРАЦІЯ ЧИСЕЛ У МАТРИЦЯХ
const pseudoRandom = (seed) => {
    let value = seed;
    return function() {
        value = (value * 1103515245 + 12345) % 2147483648;
        return value % 100 < 12;
    };
};


const createDirectMatrix = (strVariant) => {
    const arr = [...String(strVariant)].map(Number);
    const count = 10 + arr[2];
    const generator = pseudoRandom(strVariant);
    const k = 1.0 - arr[2] * 0.01 - arr[3] * 0.01 - 0.3;
    const dirMatrix = [...Array(count)].map(() => Array(count).fill(0));

    for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
            dirMatrix[i][j] = Math.floor(generator() * 2 * k);
        }
    }

    return dirMatrix;
};


const createUndirectedMatrix = (arr) => {
    let unDirMatrix = arr.map(row => row.slice());

    for (let i = 0; i < unDirMatrix.length; i++) {
        for (let j = 0; j < unDirMatrix[i].length; j++) {
            if (unDirMatrix[i][j] === 1) {
                unDirMatrix[j][i] = 1;
            }
        }
    }
    return unDirMatrix;
};


//ВИВЕДЕННЯ МАТРИЦЬ У КОНСОЛЬ
const dirMatrix = createDirectMatrix(variant);
console.log("Directed Matrix:");
console.log(dirMatrix);
const unDirMatrix = createUndirectedMatrix(dirMatrix);
console.log("Undirected Matrix:");
console.log(createUndirectedMatrix(dirMatrix));


//МАЛЮВАННЯ ВЕРШИН ГРАФА
let drawCircle = (ctx, x, y, number) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(number, x, y);

    return { x: x, y: y };
};


let drawDirGraphVertex = (ctx, vertexBetweenSpace, x = startDirX, y = startY) => {
    let curX = x;
    let curY = y;
    let vertexNumber = 1;
    let vertices = [];

    for (let i = 0; i < vertexCount; i++) {
        let vertex = drawCircle(ctx, curX, curY, vertexNumber);
        vertices.push(vertex);

        if (i < verticesPerSide - 1) {
            curX += vertexBetweenSpace;
        } else if (i < verticesPerSide + 1) {
            curY += vertexBetweenSpace;
        } else if (i < verticesPerSide * 2) {
            curX -= vertexBetweenSpace;
        } else {
            curY -= vertexBetweenSpace;
        }
        vertexNumber++;
    }

    return vertices;
};


let drawUnDirGraphVertex = (ctx, vertexBetweenSpace, x = startUnDirX, y = startY) => {
    return drawDirGraphVertex(ctx, vertexBetweenSpace, x , y);
};


//НЕОБОВ'ЯЗКОВИЙ ВИВІД КООРДИНАТ ВЕРШИН ГРАФА
const dirVertexCoord = drawDirGraphVertex(ctx, vertexBetweenSpace);
console.log('Dir. graph vertexCoord', dirVertexCoord);


const unDirVertexCoord = drawUnDirGraphVertex(ctx, vertexBetweenSpace);
console.log('UnDir. graph vertexCoord', unDirVertexCoord);


//ЗВ'ЯЗОК КООРДИНАТ ВЕРШИН З МАТРИЦЕЮ
let dirVertexMatrix = {};


dirVertexCoord.forEach((vertex, index) => {
    dirVertexMatrix[index] = vertex;
});


let unDirVertexMatrix = {};
unDirVertexCoord.forEach((vertex, index) => {
    unDirVertexMatrix[index] = vertex;
});


//МАЛЮВАННЯ ПЕТЛІ
let drawLoop = (startEl, arrowDistance = 30) => {

    let controlX1 = startEl.x - 70;
    let controlY1 = startEl.y - 70;
    let controlX2 = startEl.x + 70;
    let controlY2 = startEl.y - 70;


    let distance = Math.sqrt(2) * 70;
    let ratio = arrowDistance / distance;
    let arrowX = startEl.x + (controlX2 - startEl.x) * ratio;
    let arrowY = startEl.y + (controlY2 - startEl.y) * ratio;


    ctx.beginPath();
    ctx.moveTo(startEl.x, startEl.y);
    ctx.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, startEl.x, startEl.y);
    ctx.stroke();

    return {arrowX, arrowY, controlY2, controlX2}

}


//МАЛЮВАННЯ ПЕТЛІ ЗІ СТРІЛКОЮ
let drawLoopArrow = (startEl, arrowSize = 8, arrowColor = 'green') =>{
    let arrow = drawLoop(startEl);
    let arrowX = arrow.arrowX;
    let arrowY = arrow.arrowY;
    let controlY2 = arrow.controlY2;
    let controlX2 = arrow.controlX2


    let angle = Math.PI / 4;
    ctx.save();
    ctx.translate(arrowX, arrowY);
    ctx.rotate(Math.atan2(controlY2 - startEl.y, controlX2 - startEl.x) + angle);
    ctx.fillStyle = arrowColor;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-arrowSize, arrowSize);
    ctx.lineTo(-arrowSize, -arrowSize);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}


//МАЛЮВАННЯ ЛІНІЇ
let drawLine = (start, end) => {
    let angle = Math.atan2(end.y - start.y, end.x - start.x);
    let arrowEndX = end.x - 20 * Math.cos(angle);
    let arrowEndY = end.y - 20 * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(arrowEndX, arrowEndY);
    ctx.stroke();

    return {angle,arrowEndX,arrowEndY}
}


//МАЛЮВАННЯ ЛІНІЇ ЗІ СТРІЛКОЮ
let drawLineArrow = (start, end) =>{

    let line = drawLine(start, end);
    let angle = line.angle;
    let arrowEndX = line.arrowEndX;
    let arrowEndY = line.arrowEndY
    angle = Math.atan2(end.y - start.y, end.x - start.x);
    arrowEndX = end.x - 20 * Math.cos(angle);
    arrowEndY = end.y - 20 * Math.sin(angle);


    ctx.save();
    ctx.translate(arrowEndX, arrowEndY);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-10, 5);
    ctx.lineTo(-10, -5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

}


//МАЛЮВАННЯ ДУГИ
let drawArc = (start, end, arrowDistance = 20, bendAngle = Math.PI / 8) => {

    let midX = (start.x + end.x) / 2;
    let midY = (start.y + end.y) / 2;

    let distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));

    let newEndX = end.x - (end.x - start.x) / distance * arrowDistance;
    let newEndY = end.y - (end.y - start.y) / distance * arrowDistance;

    let controlX, controlY;
    if (start.x !== end.x && start.y !== end.y) {
        controlX = midX + Math.cos(bendAngle) * (midY - start.y);
        controlY = midY + Math.sin(bendAngle) * (midX - start.x);
    } else if (start.x === end.x) {
        controlX = midX + 100;
        controlY = midY;
    } else {
        controlX = midX;
        controlY = midY + 100;
    }

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.quadraticCurveTo(controlX, controlY, newEndX, newEndY);
    ctx.stroke();

    return { newEndX, newEndY, controlX, controlY};
}


//МАЛЮВАННЯ ДУГИ ЗА СТРІЛКОЮ
let drawArcArrow = (start, end, arrowDistance = 20, arrowSize = 10, arrowColor = 'blue', bendAngle = Math.PI / 1) => {

    let arrow = drawArc(start, end, arrowDistance, bendAngle);
    let newEndX = arrow.newEndX;
    let newEndY = arrow.newEndY;
    let controlX = arrow.controlX;
    let controlY = arrow.controlY;

    let angle = Math.atan2(newEndY - controlY, newEndX - controlX);
    ctx.save();
    ctx.translate(newEndX, newEndY);
    ctx.rotate(angle);
    ctx.fillStyle = arrowColor;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-arrowSize, arrowSize / 2);
    ctx.lineTo(-arrowSize, -arrowSize / 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}


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



drawDirGraph(dirMatrix);
drawUnDirGraph(unDirMatrix);


drawDirGraphVertex(ctx, vertexBetweenSpace);
drawUnDirGraphVertex(ctx, vertexBetweenSpace);

