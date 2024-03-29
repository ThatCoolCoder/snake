var canvasSize;

const mouseWatcher = new spnr.MouseWatcher(document);
const keyWatcher = new spnr.KeyWatcher(document);

const padding = 20;

var snake;
var apples;

var canvas;

function findOptimalCanvasSize() {
    var viewportSize = spnr.dom.viewportSize();
    var viewportAspectRatio = viewportSize.x / viewportSize.y;

    var canvasAspectRatio = snakeConfig.gridSize.x / snakeConfig.gridSize.y;

    // If the grid is more narrow, then use its height
    if (viewportAspectRatio > canvasAspectRatio) {
        var canvasHeight = viewportSize.y - padding;
        var canvasWidth = canvasHeight / snakeConfig.gridSize.y * snakeConfig.gridSize.x;
        return spnr.v(canvasWidth, canvasHeight);
    }
    // Else use its width
    else {
        var canvasWidth = viewportSize.x - padding;
        var canvasHeight = canvasWidth / snakeConfig.gridSize.x * snakeConfig.gridSize.y;
        return spnr.v(canvasWidth, canvasHeight);
    }
}

function reset() {
    snake = new Snake(spnr.v.copyDiv(snakeConfig.gridSize, 2), snakeConfig.startLength, snakeConfig.controllerFactory(), snakeConfig.snakeColor);
    apples = [];
}

function showStartText() {
    push();

    fill(255);
    stroke(0);
    strokeWeight(4);
    textSize(canvasSize.x / snakeConfig.gridSize.x * 2);

    text('SNAKE', canvasSize.x / 2, canvasSize.y * 0.35);

    textSize(canvasSize.x / snakeConfig.gridSize.x);
    text('PLAY USING ARROW KEYS OR WASD\n(SWIPE ON MOBILE)\n\nPRESS SPACE OR CLICK TO START',
        canvasSize.x / 2, canvasSize.y * 0.5);

    pop();
}

function drawScore() {
    push();
    fill(255);
    stroke(0);
    strokeWeight(2);
    textSize(canvasSize.x / snakeConfig.gridSize.x);

    var textToWrite = `SCORE: ${snake.length}    HI: ${getHighScore(snakeConfig.variantName)}`;
    text(textToWrite, canvasSize.x / 2, canvasSize.y * 0.95);

    pop();
}

function showLoseText() {
    push();

    fill(255);
    stroke(0);
    strokeWeight(4);
    textSize(canvasSize.x / snakeConfig.gridSize.x * 2);

    text(`YOU LOSE`, canvasSize.x / 2, canvasSize.y / 2 - 50 * 2);

    strokeWeight(4);
    textSize(canvasSize.x / snakeConfig.gridSize.x);

    var textToWrite =
`SCORE: ${snake.length}
HIGH SCORE: ${getHighScore(snakeConfig.variantName)}
PRESS SPACE OR CLICK TO RESTART`;

    text(textToWrite, canvasSize.x / 2, canvasSize.y / 2 - 50 / 2);

    pop();
}

function spawnApples() {
    if (apples.length < snakeConfig.maxApples &&
        spnr.randflt(0, 1) < snakeConfig.appleChance) {
        var coord = spnr.v.random(spnr.v(0, 0), snakeConfig.gridSize, false);
        var apple = new Apple(coord, snakeConfig.appleColor);
        apples.push(apple);
    }
}

function setup() {
    canvas = createCanvas(1, 1);
    rectMode(CORNER);
    textAlign(CENTER);
    frameRate(snakeConfig.fps);
    reset();
}

var waitingToStart = true;

function draw() {
    // The resizing needs to be before background,
    // as resizing clears canvas
    canvasSize = findOptimalCanvasSize();
    resizeCanvas(canvasSize.x, canvasSize.y);

    var cellSize = canvasSize.x / snakeConfig.gridSize.x;

    background(snakeConfig.bgColor);

    if (waitingToStart) {
        showStartText();
        if (mouseWatcher.pointerDown || keyWatcher.keyIsDown("Space")) {
            waitingToStart = false;
            reset();
        }

        // We don't want to do anything else, so just exit draw
        return;
    }

    apples.forEach(apple => apple.draw(cellSize));
    snake.update(cellSize, snakeConfig.gridSize, apples);

    if (snake.alive) {
        spawnApples();
        if (snake.length > getHighScore(snakeConfig.variantName)) setHighScore(snake.length, snakeConfig.variantName);
        drawScore();
    }

    else {
        showLoseText();
        if (mouseWatcher.pointerDown || keyWatcher.keyIsDown("Space")) {
            reset();
        }
    }
}