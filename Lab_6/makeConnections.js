import { weightMatrix } from "./calcW.js";

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  add(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }
  printValues() {
    let edge = [];
    let current = this.head;
    while (current) {
      edge.push(current.data);
      current = current.next;
    }
    return edge;
  }
}

function hasCycle(matrix, selectedEdges) {
  const graph = buildGraph(matrix, selectedEdges);
  const visited = new Array(graph.length).fill(false);

  for (let i = 0; i < graph.length; i++) {
    if (!visited[i] && hasCycleUtil(graph, i, visited, -1)) {
      return true;
    }
  }

  return false;
}

function buildGraph(matrix, selectedEdges) {
  const n = matrix.length;
  const graph = new Array(n).fill(null).map(() => []);

  for (const edge of selectedEdges) {
    const { u, v } = edge;
    graph[u].push(v);
    graph[v].push(u);
  }

  return graph;
}

function hasCycleUtil(graph, v, visited, parent) {
  visited[v] = true;

  for (const neighbor of graph[v]) {
    if (!visited[neighbor]) {
      if (hasCycleUtil(graph, neighbor, visited, v)) {
        return true;
      }
    } else if (neighbor !== parent) {
      return true;
    }
  }

  return false;
}

function sortByWeight(matrix) {
  const edges = [];
  const n = matrix.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] > 0) {
        if (!isReverseEdge(edges, i, j)) {
          edges.push({ u: i, v: j, weight: matrix[i][j] });
        }
      }
    }
  }
  edges.sort((a, b) => a.weight - b.weight);
  return edges;
}

function isReverseEdge(edges, u, v) {
  for (const edge of edges) {
    if (edge.u === v && edge.v === u) {
      return true;
    }
  }
  return false;
}

function kruskal(matrix) {
  const n = matrix.length;
  const edges = sortByWeight(matrix);
  const selectedEdges = new LinkedList();

  let edgeCount = 0;
  let edgeIndex = 0;

  while (edgeCount < n - 1 && edgeIndex < edges.length) {
    const edge = edges[edgeIndex];
    edgeIndex++;
    const selectedEdge = selectedEdges.printValues();

    if (!hasCycle(matrix, selectedEdge.concat(edge))) {
      selectedEdges.add(edge);
      edgeCount++;
    }
  }

  return selectedEdges;
}

const result = kruskal(weightMatrix);
console.log("List", result);
const minimumSpanningTree = result.printValues();
console.log("minimumSpanningTree", minimumSpanningTree);
export { minimumSpanningTree };
