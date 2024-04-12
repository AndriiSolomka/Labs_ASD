import { dirMatrix } from "./graphMatrices.js";
import { calculateVertexDegrees } from "./calcDegrees.js";


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


let outputIsolatedVertex = (hangingVertex) =>{
    let isolated = [];
    

    for (const key of hangingVertex.isolated) {
        isolated.push(`Ізольована вершина №${key}`);
    }

    return isolated
}


 let outputHangingVertex = (hangingVertex) => {
    let hanging = [];

    for (const key of hangingVertex.hanging) {
        hanging.push(`Висяча вершина №${key}`);
    }

    return hanging
 }


let hangingVertex = findHangingAndIsolatedVertex(calculateVertexDegrees(dirMatrix));


export {hangingVertex, outputIsolatedVertex, outputHangingVertex}