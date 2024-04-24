import { variant, canvas, ctx, radius, vertexBetweenSpace, startDirX,
    startUnDirX, startY,vertexCount,verticesPerSide } from "./const.js";

//МАЛЮВАННЯ ПЕТЛІ
let drawLoop = (startEl, arrowDistance = 4) => {
    let startX = startEl.x ;
    let startY = startEl.y - radius;

    let controlX1 = startX - 50;
    let controlY1 = startY - 50;
    let controlX2 = startX + 50;
    let controlY2 = startY - 50;

    let distance = Math.sqrt(2) * 70;
    let ratio = arrowDistance / distance;
    let arrowX = startX + (controlX2 - startX) * ratio;
    let arrowY = startY + (controlY2 - startY) * ratio;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, startX, startY);
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


    let angle = Math.PI ;
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
    let startX = start.x + radius * Math.cos(angle);
    let startY = start.y + radius * Math.sin(angle);
    let arrowEndX = end.x - 20 * Math.cos(angle);
    let arrowEndY = end.y - 20 * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(arrowEndX, arrowEndY);
    ctx.stroke();

    return {angle,arrowEndX,arrowEndY}
}



//МАЛЮВАННЯ ЛІНІЇ ЗІ СТРІЛКОЮ
let drawLineArrow = (start, end) =>{

    let line = drawLine(start, end);
    let angle = line.angle;

    angle = Math.atan2(end.y - start.y, end.x - start.x);
    let arrowEndX = end.x - 20 * Math.cos(angle);
    let arrowEndY = end.y - 20 * Math.sin(angle);


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
let drawArc = (start, end,arcAngle = 2, arrowDistance = 20, bendAngle = Math.PI / 8) => {
    let angle = Math.atan2(end.y - start.y, end.x - start.x);
    let startX = start.x + radius * Math.cos(angle);
    let startY = start.y + radius * Math.sin(angle);

    let midX = (start.x + end.x) / arcAngle;
    let midY = (start.y + end.y) / arcAngle;

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
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(controlX, controlY, newEndX, newEndY);
    ctx.stroke();

    return { newEndX, newEndY, controlX, controlY};
}


//МАЛЮВАННЯ ДУГИ ЗА СТРІЛКОЮ
let drawArcArrow = (start, end, arcAngle = 2, arrowDistance = 20, arrowSize = 10, arrowColor = 'blue', bendAngle = Math.PI / 1) => {

    let arrow = drawArc(start, end,arcAngle, arrowDistance, bendAngle);
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


export {drawArc,drawArcArrow,drawLine,drawLineArrow,drawLoop,drawLoopArrow}