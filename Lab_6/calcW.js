import { createDirectMatrix, unDirMatrix } from "./graphMatrices.js";

const WMatrix = (matrix) => {
  const length = matrix.length;
  const b = createDirectMatrix("3122", true);
  const w = Array.from({ length }, () => Array(length).fill(0));

  // Calculating c
  const c = [];
  for (let i = 0; i < length; i++) {
    c[i] = [];
    for (let j = 0; j < length; j++) {
      c[i][j] = Math.ceil(100 * b[i][j] * matrix[i][j]);
    }
  }

  // Calculating d
  const d = [];
  for (let i = 0; i < length; i++) {
    d[i] = [];
    for (let j = 0; j < length; j++) {
      d[i][j] = c[i][j] === 0 ? 0 : 1;
    }
  }

  // Calculating h
  const h = [];
  for (let i = 0; i < length; i++) {
    h[i] = [];
    for (let j = 0; j < length; j++) {
      h[i][j] = d[i][j] !== d[j][i] ? 1 : 0;
    }
  }

  // Calculating tr
  const tr = [];
  for (let i = 0; i < length; i++) {
    tr[i] = [];
    for (let j = 0; j < length; j++) {
      tr[i][j] = i <= j ? 1 : 0;
    }
  }

  // Calculating w
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < i; j++) {
      w[i][j] = w[j][i] = (d[i][j] + h[i][j] * tr[i][j]) * c[i][j];
    }
  }

  return w;
};

const weightMatrix = WMatrix(unDirMatrix);
console.log("weightMatrix", weightMatrix);
export { weightMatrix };
