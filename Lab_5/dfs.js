import {dirMatrix} from "./graphMatrices.js";
import {AlgorithmsDFS} from "./classDFS&BFS.js";


const DFS = (matrix) => {

    const dfsMatrix = matrix.map(row => [...row]);
    dfsMatrix.forEach(row => row.fill(0));

    const s = new AlgorithmsDFS();
    const dfs = Array.from({ length: matrix.length }, () => 0);
    let k = 1;

    const findRoads = (start) => {
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
                    found = true;
                    break;
                }
            }
            if (!found) {
                s.stackDel();
            }
            
        }

    };

    for (let i = 0; i < matrix.length; i++) {
        if (dfs[i] === 0) {
            (findRoads(i));
        }
    }

    const myDFSroads = s.doRoads()
    console.log('roadsDFS', myDFSroads)


    console.group('Матриця DFS')
    console.log(dfsMatrix);
    console.groupEnd()


    return myDFSroads;
};

const dfsResult = DFS(dirMatrix);
export {dfsResult}
