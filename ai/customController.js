class DumbAI extends AbstractSnakeController {
    moveOrder = [Direction.left, Direction.up, Direction.right, Direction.down];

    constructor() {
        super();
        this.moveIndex = 0;
    }

    getCommand(snake, gridSize, apples) {
        var move = this.moveOrder[this.moveIndex % this.moveOrder.length];
        this.moveIndex ++;
        return move;
    }
}

snakeController = new DumbAI();