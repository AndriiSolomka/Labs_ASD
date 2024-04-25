import {dirMatrix} from "./graphMatrices.js";
import {AlgorithmsDFS} from "./classDFS&BFS.js";


const DFS = (matrix) => {

    const dfsMatrix = matrix.map(row => [...row]);
    dfsMatrix.forEach(row => row.fill(0));

    const s = new AlgorithmsDFS();
    const dfs = Array.from({ length: matrix.length }, () => 0);
    let k = 1;

    const findRoads = (start) => {

        const roads = {
            res: []
        };

        dfs[start] = 1;
        s.stackAd(start);

        while (!s.empty()) {
            const v = s.peekStack();
            let found = false;
            for (let i = 0; i < matrix.length; i++) {

                if (matrix[v][i] === 1 && dfs[i] === 0) {
                    k++;
                    dfsMatrix[v][i] = 1;
                    dfs[i] = k;
                    s.stackAd(i);
                    roads.res.push([v, i]);
                    found = true;
                    break;
                }
            }
            if (!found) {
                s.stackDel();
            }
            
        }

        return roads;
    };

    for (let i = 0; i < matrix.length; i++) {
        if (dfs[i] === 0) {
            (findRoads(i));
        }
    }

     s.doRoads()


    console.group('Матриця DFS')
    console.log(dfsMatrix);
    console.groupEnd()





    return 1;
};

const dfsResult = DFS(dirMatrix);
export {dfsResult}
