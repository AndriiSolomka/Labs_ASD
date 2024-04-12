import { variant } from "./const.js";


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


const dirMatrix = createDirectMatrix(variant);
const unDirMatrix = createUndirectedMatrix(dirMatrix); 

export {dirMatrix, unDirMatrix}
