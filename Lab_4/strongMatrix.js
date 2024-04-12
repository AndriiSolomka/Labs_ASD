import { attainabilityMat } from "./attainabilityMatrix.js";

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
const transposedMatrix = transposeMatrix(attainabilityMat);



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
const elementWiseProduct = elementWiseMultiply(attainabilityMat, transposedMatrix);


export {elementWiseProduct} 