import {dirMatrix} from "./graphMatrices.js";
import {Algorithms} from "./classDFS&BFS.js";


const DFS = (matrix) => {

    const dfsMatrix = matrix.map(row => [...row]);
    dfsMatrix.forEach(row => row.fill(0));

    const s = new Algorithms();
    const dfs = Array.from({ length: matrix.length }, () => 0);
    let k = 1;
    const allRoads = [];

    const findRoads = (start) => {

        const roads = {
            res: []
        };

        dfs[start] = 1;
        s.stackAd(start);

        while (!s.empty()) {
            const v = s.peekStack();
            console.log(`active ${v + 1}`);
            let found = false;
            for (let i = 0; i < matrix.length; i++) {

                if (matrix[v][i] === 1 && dfs[i] === 0) {
                    k++;
                    dfsMatrix[v][i] = 1;
                    dfs[i] = k;
                    s.stackAd(i);
                    console.log(`visited ${i + 1}`);
                    roads.res.push([v, i]);
                    found = true;
                    break;
                }
            }

            console.log(`closed ${v + 1}`);

            if (!found) {
                s.stackDel();
            }

           /*  if(roads.res.length === 0){
                s.stackAd(v)
                //console.log(`visited ${i + 1}`);
                roads.res.push([v,0])
            } */

            
        }

        return roads;
    };


    for (let i = 0; i < matrix.length; i++) {
        if (dfs[i] === 0) {
            allRoads.push(findRoads(i));
        }
    }

    console.group('Матриця DFS')
    console.log(dfsMatrix);
    console.groupEnd()


    const dfsResult = allRoads.flatMap(item =>
        Array.isArray(item.res[0]) ? item.res : [item.res]);


    return dfsResult;
};

const dfsResult = DFS(dirMatrix);
export {dfsResult}
