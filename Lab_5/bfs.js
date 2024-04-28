import {dirMatrix} from "./graphMatrices.js";
import {AlgorithmsBFS} from "./classDFS&BFS.js";

const BFS = (matrix) => {
    const bfsMatrix = matrix.map(row => [...row]);
    bfsMatrix.forEach(row => row.fill(0));

    const q = new AlgorithmsBFS()
    const bfs = Array.from({ length: matrix.length }, () => 0);
    let k = 1;



    const findRoads = (start) =>{
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
                }
            }
        }
    }

    for (let i = 0; i < matrix.length; i++) {
        if (bfs[i] === 0) {
            (findRoads(i));
        }
    }

    const bfsRoads = q.doRoad()

    console.group('Матриця BFS')
    console.log(bfsMatrix);
    console.groupEnd()

    console.group('Вектор BFS')
    bfs.map((item, index)=>{
        console.log(`The new number of vertex ${index + 1} is ${item}`);
    });
    console.groupEnd()


    return bfsRoads;
}
const bfsResult = BFS(dirMatrix)
export {bfsResult}




