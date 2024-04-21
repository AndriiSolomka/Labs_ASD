import { elementWiseProduct } from "./strongMatrix.js";
import { vertexCount } from "./const.js";

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
for (let i = 0; i < vertexCount; i++) {
    if( !duplicateColumns.flat(1).includes(i)){
        strongItems.push([i] )
    }
}

let array = strongItems.concat(duplicateColumns)


array.sort((a, b) => {
    return a[0] - b[0];
});


const strongItemsArr = array;
export {strongItemsArr}