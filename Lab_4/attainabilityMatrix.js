import { createIdentityMatrix, powerMatrix } from "./calcMatrix.js";
import { vertexCount } from "./const.js";
import { dirMatrix } from "./graphMatrices.js";

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
// Додавання одиничної матриці
let resultMatrix = addIMatrices(createIdentityMatrix(vertexCount), dirMatrix);



for (let i = 0; i <= vertexCount-1; i++) {
    const poweredMatrix = powerMatrix(dirMatrix, i);
    resultMatrix = addIMatrices(resultMatrix, poweredMatrix);
}


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

// Булеве відображення
const attainabilityMat = applyBooleanMap(resultMatrix);


export {attainabilityMat}