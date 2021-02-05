class PlayScene extends wrk.GameEngine.Scene {
    constructor(gridSize) {
        super('play scene');

        this.snake = new Snake(wrk.v(10, 10), gridSize, 3);
        this.addChild(this.snake);

        this.gridSize = gridSize;

        this.frameCount = 0;
    }

    update() {
        this.frameCount += 1;

        if (this.frameCount % fps == 0) {
            this.snake.move();
        }
    }
}