import { dirMatrix } from "./graphMatrices.js";


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


let getHalfDegrees = (halfDegrees) =>{
    let arr = [];
    for (let i = 0; i < halfDegrees.inDegrees.length; i++) {
        arr.push("Вершина " + (i + 1) + ": Вхідна - " + halfDegrees.inDegrees[i] + ", Вихідна - " + halfDegrees.outDegrees[i]);
    }
    
    return arr
}
let getFinalHalfDegrees = getHalfDegrees(halfDegrees)


export {getFinalHalfDegrees}
