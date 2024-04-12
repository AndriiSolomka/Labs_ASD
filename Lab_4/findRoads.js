import { dirMatrix } from "./graphMatrices.js";
import { powerMatrix } from "./calcMatrix.js";

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



const twoLength = (findPathsOfLengthTwo(dirMatrix, powerMatrix(dirMatrix, 2)));


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
const threeLength = findPathsOfLengthThree(dirMatrix, powerMatrix(dirMatrix, 3))

export {twoLength, threeLength}