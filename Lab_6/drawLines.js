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
} from "./const.js";

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
  ctx.bezierCurveTo(
    controlX1,
    controlY1,
    controlX2,
    controlY2,
    startEl.x,
    startEl.y
  );
  ctx.stroke();

  return { arrowX, arrowY, controlY2, controlX2 };
};

//МАЛЮВАННЯ ПЕТЛІ ЗІ СТРІЛКОЮ
let drawLoopArrow = (startEl, arrowSize = 8, arrowColor = "green") => {
  let arrow = drawLoop(startEl);
  let arrowX = arrow.arrowX;
  let arrowY = arrow.arrowY;
  let controlY2 = arrow.controlY2;
  let controlX2 = arrow.controlX2;

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
};

//МАЛЮВАННЯ ЛІНІЇ
let drawLine = (start, end, text, color) => {
  let angle = Math.atan2(end.y - start.y, end.x - start.x);
  let startX = start.x + radius * Math.cos(angle);
  let startY = start.y + radius * Math.sin(angle);
  let arrowEndX = end.x - 20 * Math.cos(angle);
  let arrowEndY = end.y - 20 * Math.sin(angle);

  ctx.beginPath();
  ctx.strokeStyle = color || "red";
  ctx.moveTo(startX, startY);
  ctx.strokeStyle = color;
  ctx.lineTo(arrowEndX, arrowEndY);
  ctx.stroke();

  let midX = (start.x + arrowEndX) / 2;
  let midY = (start.y + arrowEndY) / 2;

  let offsetX = 6;
  let offsetY = 20;
  ctx.fillStyle = color || "black";

  if (text) {
    ctx.font = "16px Arial";
    ctx.fillText(text, midX + offsetX, midY + offsetY);
  }

  return { angle, arrowEndX, arrowEndY };
};

//МАЛЮВАННЯ ЛІНІЇ ЗІ СТРІЛКОЮ
let drawLineArrow = (start, end) => {
  let line = drawLine(start, end);
  let angle = line.angle;
  let arrowEndX = line.arrowEndX;
  let arrowEndY = line.arrowEndY;
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
};

//МАЛЮВАННЯ ДУГИ
let drawArc = (
  start,
  end,
  text,
  color,
  arcAngle = 2,
  arrowDistance = 20,
  bendAngle = Math.PI / 8
) => {
  let angle = Math.atan2(end.y - start.y, end.x - start.x);
  let startX = start.x + radius * Math.cos(angle);
  let startY = start.y + radius * Math.sin(angle);

  let midX = (start.x + end.x) / arcAngle;
  let midY = (start.y + end.y) / arcAngle;

  let distance = Math.sqrt(
    Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
  );

  let newEndX = end.x - ((end.x - start.x) / distance) * arrowDistance;
  let newEndY = end.y - ((end.y - start.y) / distance) * arrowDistance;

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
  ctx.strokeStyle = color || "black";
  ctx.moveTo(startX, startY);
  ctx.quadraticCurveTo(controlX, controlY, newEndX, newEndY);
  ctx.strokeStyle = color;
  ctx.stroke();

  let arcMidX = (start.x + controlX + newEndX) / 3;
  let arcMidY = (start.y + controlY + newEndY) / 3;
  ctx.fillStyle = color || "black";
  if (text) {
    ctx.font = "16px Arial";
    ctx.fillText(text, arcMidX, arcMidY);
  }

  return { newEndX, newEndY, controlX, controlY };
};

//МАЛЮВАННЯ ДУГИ ЗА СТРІЛКОЮ
let drawArcArrow = (
  start,
  end,
  arrowDistance = 20,
  arrowSize = 10,
  arrowColor = "blue",
  bendAngle = Math.PI / 1
) => {
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
};

export {
  drawArc,
  drawArcArrow,
  drawLine,
  drawLineArrow,
  drawLoop,
  drawLoopArrow,
};
