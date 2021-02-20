var canvasSize;

const padding = 20;
const gridSize = wrk.v(20, 20);
const bgColor = 0;
const fps = 7.5;
const maxApples = 1;
const appleChance = 0.4;

function reset() {
    snake = new Snake(wrk.v.copyDiv(gridSize, 2), 3);
    apples = [];
}

var snake;
var apples;

reset();

var canvas;

function findOptimalCanvasSize() {
    var viewportSize = wrk.dom.viewportSize();
    var viewportAspectRatio = viewportSize.x / viewportSize.y;

    var canvasAspectRatio = gridSize.x / gridSize.y;

    // If the grid is more narrow, then use its height
    if (viewportAspectRatio > canvasAspectRatio) {
        var canvasHeight = viewportSize.y - padding;
        var canvasWidth = canvasHeight / gridSize.y * gridSize.x;
        return wrk.v(canvasWidth, canvasHeight);
    }
    // Else use its width
    else {
        var canvasWidth = viewportSize.x - padding;
        var canvasHeight = canvasWidth / gridSize.x * gridSize.y;
        return wrk.v(canvasWidth, canvasHeight);
    }
}

function setup() {
    console.log('abcdefghijkl')
    canvas = createCanvas(1, 1);
    rectMode(CORNER);
    frameRate(fps);
}

function draw() {
    // The resizing needs to be before background,
    // as resizing clears canvas
    canvasSize = findOptimalCanvasSize();
    resizeCanvas(canvasSize.x, canvasSize.y);

    var cellSize = canvasSize.x / gridSize.x;

    background(0, 0, 0);

    if (apples.length < maxApples &&
        wrk.randflt(0, 1) < appleChance) {
        var coord = wrk.v.random(wrk.v(0, 0), gridSize, false);
        var apple = new Apple(coord);
        apples.push(apple);
    }

    apples.forEach(apple => apple.draw(cellSize));

    snake.update(cellSize, gridSize, apples);
}