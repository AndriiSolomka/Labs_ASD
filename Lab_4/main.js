"use strict"


//Input
const variant = '3122'//prompt('Input your variant :)');
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
    const k = 1.0 - arr[2] * 0.005 - arr[3] * 0.005 - 0.27;
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


/* const dirMatrix = [
    [0,1,0,1,0],
    [0,0,0,0,1],
    [1,0,0,0,0],
    [0,0,1,0,0],
    [0,1,0,0,0],
] */

//console.log("Directed Matrix:");
//console.log(dirMatrix);
const unDirMatrix = createUndirectedMatrix(dirMatrix);
//console.log("Undirected Matrix:");
//console.log(createUndirectedMatrix(dirMatrix));


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
//console.log('Dir. graph vertexCoord', dirVertexCoord);


const unDirVertexCoord = drawUnDirGraphVertex(ctx, vertexBetweenSpace);
//console.log('UnDir. graph vertexCoord', unDirVertexCoord);


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
 





console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')


//ЗНАХОДЖЕННЯ СТЕПЕНІВ
function calculateVertexDegrees(matrix) {
    let vertexDegrees = [];

    for (let i = 0; i < matrix.length; i++) {
        let degree = 0;
        for (let j = 0; j < matrix[i].length; j++) {
            degree += matrix[i][j];
        }
        vertexDegrees.push(degree);
    }

    return vertexDegrees;
}



// Обчислюємо степені вершин
let dirDegrees = calculateVertexDegrees(dirMatrix);
let unDirDegrees = calculateVertexDegrees(unDirMatrix);

// Виводимо результати
const calcDegrees = (degrees) => {
    for (let i = 0; i < degrees.length; i++) {
        console.log("Вершина " + (i + 1) + ": " + degrees[i]);
    }

}
console.log('-------------------------------------------------------')
console.log("Степені вершин напрямленого графа:");
console.log('-------------------------------------------------------')
let dirResult = calcDegrees(dirDegrees);
console.log('-------------------------------------------------------')
console.log("Степені вершин непрямленого графа:");
console.log('-------------------------------------------------------')
let unDirResult = calcDegrees(unDirDegrees);





console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')


// ЗНАХОДЖЕННЯ  НАПІВСТЕПЕНІВ 
function calculateInAndOutDegrees(matrix) {
    let inDegrees = [];
    let outDegrees = [];

    for (let i = 0; i < matrix.length; i++) {
        let inDegree = 0;
        let outDegree = 0;
        for (let j = 0; j < matrix[i].length; j++) {
            outDegree += matrix[i][j];
            inDegree += matrix[j][i];
        }
        outDegrees.push(outDegree);
        inDegrees.push(inDegree);
    }

    return { inDegrees: inDegrees, outDegrees: outDegrees };
}

let halfDegrees = calculateInAndOutDegrees(dirMatrix);

console.log("Напівстепені виходу та заходу напрямленого графа:");
for (let i = 0; i < halfDegrees.inDegrees.length; i++) {
    console.log("Вершина " + (i + 1) + ": Вхідна - " + halfDegrees.inDegrees[i] + ", Вихідна - " + halfDegrees.outDegrees[i]);
}



console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')




const findRegular = (degree) => {
    const set = new Set(degree);

    if (set.size === 1) {
        return { true: true, degree: set };
    } else {
        return false ;
    }
}

let isRegular = findRegular(dirDegrees);

if (isRegular.true === true) {
    console.log("Граф є регулярним зі ступенем однорідності " + Array.from(isRegular.degree));
} else {
    console.log("Граф не є регулярним.");
}

console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')




let findHangingAndIsolatedVertex = (hangingVertex) =>{

    let hanging = [];
    let isolated = [];

    hangingVertex.forEach((item, index) => {
        if (item === 1) {
            hanging.push(index + 1);
        } else if(item === 0){
            isolated.push(index + 1);
        }
    });

    return {hanging:hanging , isolated: isolated}
}

let outputVertex = (hangingVertex) =>{

    console.log('Висячі вершини: ');
    for (const key of hangingVertex.hanging) {
        console.log(`Висяча вершина №${key}`);
    }
    console.log('-------------------------------------------------------')
    console.log('Ізольовані вершини:');
    for (const key of hangingVertex.isolated) {
        console.log(`Ізольована вершина №${key}`);
    }
}


let hangingVertex = findHangingAndIsolatedVertex(calculateVertexDegrees(dirMatrix));
let outputHangingAndIsolatedVertex = outputVertex(hangingVertex)


console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')


console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')

console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('СООООООЗДАНИЕ  СТЕПЕНЕЙ МАТРИЦ')



let createIdentityMatrix = (size) => {
    let identityMatrix = [];
    for (let i = 0; i < size; i++) {
        let row = [];
        for (let j = 0; j < size; j++) {
            row.push(i === j ? 1 : 0);
        }
        identityMatrix.push(row);
    }
    return identityMatrix;
}


// Функция для возведения матрицы в степень
let powerMatrix = (matrix, power) => {
    if (power === 1) {
        return matrix;
    } else {
        let result = matrix;
        for (let i = 1; i < power; i++) {
            result = multiplyMatrices(result, matrix);
        }
        return result;
    }
}



// ФУНКЦІЯ МНОЖЕННЯ МАТРИЦЬ
let multiplyMatrices = (matrix1, matrix2) => {
    let result = [];
    for (let i = 0; i < matrix1.length; i++) {
        result[i] = [];
        for (let j = 0; j < matrix2[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < matrix1[0].length; k++) {
                sum += matrix1[i][k] * matrix2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}


console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')


let halfDegrees2 = calculateInAndOutDegrees(dirMatrix);

console.log("Напівстепені виходу та заходу напрямленого графа:");
for (let i = 0; i < halfDegrees2.inDegrees.length; i++) {
    console.log("Вершина " + (i + 1) + ": Вхідна - " + halfDegrees2.inDegrees[i] + ", Вихідна - " + halfDegrees2.outDegrees[i]);
}


console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')


function findPathsOfLengthTwo(matrix, squareE) {
    const paths = [];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            if (matrix[i][j] === 1) {
                for (let k = 0; k < squareE.length; k++) {
                    if (matrix[j][k] > 0   && (k !== i || k !== j)  ) { 
                        paths.push(`(v${i + 1}, v${j + 1}, v${k + 1})`);
                    }
                }
            }
        }
    }
    return paths;
}


console.log("Маршрути довжини 2:");
console.table(findPathsOfLengthTwo(dirMatrix, powerMatrix(dirMatrix, 2)));

console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')

function findPathsOfLengthThree(matrix, cubedMatrix) {
    const paths = [];
    const size = matrix.length;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (cubedMatrix[i][j] > 0) {
                for (let k = 0; k < size; k++) {
                    if (matrix[i][k] > 0) {
                        for (let l = 0; l < size; l++) {
                            if (matrix[k][l] > 0 && matrix[l][j] > 0  && (l !== i || l !== j || k !== j)) {
                                paths.push(`(v${i + 1}, v${k + 1}, v${l + 1}, v${j + 1})`);
                            }
                        }
                    }
                }
            }
        }
    }
    return paths;
}


console.log("Маршрути довжини 3:");
//console.table(findPathsOfLengthThree(dirMatrix, powerMatrix(dirMatrix, 3)));


console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')




function addIMatrices(matrix1, matrix2) {
    let result = [];
    for (let i = 0; i < matrix1.length; i++) {
        result[i] = [];
        for (let j = 0; j < matrix1[0].length; j++) {
            result[i][j] = matrix1[i][j] + matrix2[i][j];
        }
    }
    return result;
}
// Добавление единичной матрицы в начало
let resultMatrix = addIMatrices(createIdentityMatrix(vertexCount), dirMatrix);



for (let i = 2; i <= vertexCount-1; i++) {
    const poweredMatrix = powerMatrix(dirMatrix, i);
    resultMatrix = addIMatrices(resultMatrix, poweredMatrix);
}

// Вывод результата
console.log('Сума');
console.log(resultMatrix);


function applyBooleanMap(matrix) {
    const result = [];
    for (let i = 0; i < matrix.length; i++) {
        result[i] = [];
        for (let j = 0; j < matrix[i].length; j++) {
            result[i][j] = matrix[i][j] ? 1 : 0;
        }
    }
    return result;
}

// Применение булева отображения к результатной матрице
const booleanMappedMatrix = applyBooleanMap(resultMatrix);

// Вывод результата
console.log("Матриця досяжності:");
console.log(booleanMappedMatrix);

console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')



function transposeMatrix(matrix) {
    const transposed = [];
    for (let i = 0; i < matrix[0].length; i++) {
        transposed[i] = [];
        for (let j = 0; j < matrix.length; j++) {
            transposed[i][j] = matrix[j][i];
        }
    }
    return transposed;
}

// Нахождение транспонированной матрицы
const transposedMatrix = transposeMatrix(booleanMappedMatrix);

// Вывод результата



function elementWiseMultiply(matrix1, matrix2) {
    const result = [];
    for (let i = 0; i < matrix1.length; i++) {
        result[i] = [];
        for (let j = 0; j < matrix1[i].length; j++) {
            result[i][j] = matrix1[i][j] * matrix2[i][j];
        }
    }
    return result;
}

// Нахождение поэлементного произведения матриц
const elementWiseProduct = elementWiseMultiply(booleanMappedMatrix, transposedMatrix);

// Вывод результата
console.log("Матриця сильної зв'язносоті:");
console.log(elementWiseProduct); 

console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')

const findDuplicateColumns = (matrix) => {
    const columnIndices = {};

    for (let i = 0; i < matrix[0].length; i++) {
        const columnKey = matrix.map(row => row[i]).join('');
        if (columnIndices[columnKey]) {
            columnIndices[columnKey].push(i);
        } else {
            columnIndices[columnKey] = [i];
        }
    }

    const duplicates = Object.values(columnIndices).filter(indices => indices.length > 1);

    return duplicates;
}
const duplicateColumns = findDuplicateColumns(elementWiseProduct);


let strongItems = []
for (let i = 0; i < vertexCount-1; i++) {
    if( !duplicateColumns.flat(1).includes(i)){
        strongItems.push([i] )
    }
}

let array = strongItems.concat(duplicateColumns)


array.sort((a, b) => {
    if (a[0] === undefined) return 1;
    if (b[0] === undefined) return -1;
    return a[0] - b[0];
});

console.log('Компоненти сильної зв\'язності:');
console.log(array);

console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')



const findConnections = (graph, arrays) => {
    const connections = {
        start: [],
        end: [],
    };

    for (let i = 0; i < arrays.length; i++) {
        const subArray = arrays[i];
        for (const vertex of subArray) {
            for (let k = 0; k < graph.length; k++) {
                const adjacentVertices = graph[k];
                if (adjacentVertices[vertex] === 1 && vertex !== k) {
                    for (let h = 0; h < arrays.length; h++) {
                        if (h !== i && arrays[h].includes(k)) {
                            connections.start.push(h + 1);
                            connections.end.push(i + 1);
                        }
                    }
                }
            }
        }
    }

    return connections;
};


let result1 = findConnections(dirMatrix, array)

let condGraph = []
condGraph.push(result1.start, result1.end)

function removeDuplicates(arr) {
    let result = [];
    for (let i = 0; i < arr[0].length; i++) {
        if (arr[0][i] !== arr[0][i + 1] || arr[1][i] !== arr[1][i + 1]) {
            result.push([arr[0][i], arr[1][i]]);
        }
    }
    return result;
}

console.log('Напрямок конекту вершин');
let output = removeDuplicates(condGraph);
console.log(output);

console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')
console.log('-------------------------------------------------------')


