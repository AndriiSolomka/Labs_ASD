import { dirMatrix, unDirMatrix } from "./graphMatrices.js";


//ЗНАХОДЖЕННЯ СТЕПЕНІВ
function calculateVertexDegrees(matrix) {
    const degrees = [];

    for (let i = 0; i < matrix.length; i++) {
        let degree = 0;
        for (let j = 0; j < matrix[i].length; j++) {
            
            if (matrix[i][j] === 1) {
                degree++;
            }
            if (matrix[j][i] === 1) {
                degree++;
            }
        }
        degrees.push(degree);
    }

    return degrees;
}

function calculateUndirVertexDegrees(matrix) {
    const degrees = [];

    for (let i = 0; i < matrix.length; i++) {
        let degree = 0;
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 1) {
                degree++;
            }
        }
        degrees.push(degree);
    }

    return degrees;
}
// Обчислюємо степені вершин
let dirDegrees = calculateVertexDegrees(dirMatrix);
let unDirDegrees = calculateUndirVertexDegrees(unDirMatrix);



const calcDegrees = (degrees) => {
    let arr = []
    for (let i = 0; i < degrees.length; i++) {
        arr.push("Вершина " + (i + 1) + ": " + degrees[i]);
    }
    return arr
}



let dirResult = calcDegrees(dirDegrees);
let unDirResult = calcDegrees(unDirDegrees);


export {dirResult, unDirResult, dirDegrees, calculateVertexDegrees, calculateUndirVertexDegrees}
