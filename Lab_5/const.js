"use strict"


//Input
const variant = '3122'//prompt('Input your variant :)');
const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');
const radius = 20;
const vertexBetweenSpace = 100;
const startDirX = 100;
const startUnDirX = 1100;
const startY = 150;
const vertexCount = 10 + (+variant.charAt(2));
const verticesPerSide = (vertexCount / 2) - 1;

const vertexColors = [
    "blue",
    "black",
    "green",
    "yellow",
    "magenta",
    "purple",
    "orange",
    "gray",
    "aqua",
    "teal",
    "lime",
    "brown"
];


export {variant, canvas, ctx, radius, vertexBetweenSpace, startDirX,
startUnDirX, startY,vertexCount,verticesPerSide, vertexColors}
