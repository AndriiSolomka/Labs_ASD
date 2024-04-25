import {dirMatrix} from "./graphMatrices.js";
import {AlgorithmsBFS} from "./classDFS&BFS.js";

const BFS = (matrix) => {
    const bfsMatrix = matrix.map(row => [...row]);
    bfsMatrix.forEach(row => row.fill(0));

    const q = new AlgorithmsBFS()
    const bfs = Array.from({ length: matrix.length }, () => 0);
    let k = 1;

    const allRoads = [];

    const findRoads = (start) =>{

        const roads = {
            res: []
        };

        bfs[start] = 1;
        q.queueAdd(start);

        while (!q.empty()) {
            const v = q.queueDel()
            for (let i = 0; i < matrix.length; i++) {
                if (matrix[v][i] === 1 && bfs[i] === 0) {
                    k++
                    bfsMatrix[v][i] = 1
                    bfs[i] = k;
                    q.queueAdd(i)
                    roads.res.push([v, i])
                }
            }

            if(roads.res.length === 0){
                roads.res.push([v,0])
            }
        }
        return roads;
    }

    for (let i = 0; i < matrix.length; i++) {
        if (bfs[i] === 0) {
            allRoads.push(findRoads(i));
        }
    }

    q.doRoad()

    console.group('Матриця BFS')
    console.log(bfsMatrix)
    console.groupEnd()

    const bfsResult = allRoads.flatMap(item =>
        Array.isArray(item.res[0]) ? item.res : [item.res]);

    return bfsResult;
}
const bfsResult = BFS(dirMatrix)
export {bfsResult}




