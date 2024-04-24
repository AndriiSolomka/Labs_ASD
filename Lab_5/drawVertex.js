import {variant, canvas, ctx, radius, vertexBetweenSpace, startDirX,
    startUnDirX, startY,vertexCount,verticesPerSide} from "./const.js";

//МАЛЮВАННЯ ВЕРШИН ГРАФА
let drawCircle = (ctx, x, y, number, color = 'red') => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = color;
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


 let drawBFSGraphVertex = (ctx, vertexBetweenSpace, x = startUnDirX, y = startY) => {
    const drawnDirGraphVertex = drawDirGraphVertex(ctx, vertexBetweenSpace, x , y);
    return drawnDirGraphVertex
}; 

//НЕОБОВ'ЯЗКОВИЙ ВИВІД КООРДИНАТ ВЕРШИН ГРАФА
const dirVertexCoord = drawDirGraphVertex(ctx, vertexBetweenSpace);
const secondVertexCoord = drawBFSGraphVertex(ctx, vertexBetweenSpace);


export {drawCircle, drawDirGraphVertex, drawBFSGraphVertex,dirVertexCoord, secondVertexCoord}