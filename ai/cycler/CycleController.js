class CycleController extends AbstractSnakeController {
    constructor() {
        super();
    }

    getCommand(snake, gridSize, apples) {
        if (snake.headCoord.x == gridSize.x - 1 && snake.crntDirection != Direction.up) return Direction.up;
        if (snake.headCoord.y == gridSize.y - 1 && snake.crntDirection == Direction.down) return Direction.right;
        // if (snake.headCoord.y == gridSize.y - 1 && snake.headCoord.x == gridSize.x - 1) return Direction.up;
        if (snake.headCoord.y == gridSize.y - 2 && snake.crntDirection == Direction.down && snake.headCoord.x != 0) return Direction.left;
        if (snake.headCoord.y == gridSize.y - 2 && snake.crntDirection == Direction.left) return Direction.up;
        if (snake.headCoord.y == 0 && snake.crntDirection == Direction.up) return Direction.left;
        if (snake.headCoord.y == 0 && snake.crntDirection == Direction.left) return Direction.down;
    }
}