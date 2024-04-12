
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

export {createIdentityMatrix, powerMatrix, multiplyMatrices}