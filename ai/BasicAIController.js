class BasicAIController extends AbstractSnakeController {
    State = {
        waitingForApple : 'waitingForApple',
        gettingApple : 'gettingApple',
        goingToEdge : 'goingToEdge'
    }

    constructor() {
        super();

        this.crntState = this.State.waitingForApple;
    }

    isOnEdge(snake, gridSize) {
        return (snake.headCoord.x == 0 || snake.headCoord.x == gridSize.x - 1 ||
            snake.headCoord.y == 0 || snake.headCoord.y == gridSize.y - 1);
    }

    isBesideApple(snake, apple) {
        if (snake.crntDirection == Direction.left || snake.crntDirection == Direction.right) { 
            return apple.coord.x == snake.headCoord.x;
        }
        else {
            return apple.coord.y == snake.headCoord.y;
        }
    }

    avoidEdges(snake, gridSize) {
        if (snake.crntDirection == Direction.left || snake.crntDirection == Direction.right)
        {
            if (snake.headCoord.x == 0 || snake.headCoord.x == gridSize.x - 1) {
                return (snake.headCoord.y > gridSize.y / 2) ? Direction.up : Direction.down;
            }
        }
        if (snake.crntDirection == Direction.up || snake.crntDirection == Direction.down)
        {
            if (snake.headCoord.y == 0 || snake.headCoord.y == gridSize.y - 1) {
                return (snake.headCoord.x > gridSize.x / 2) ? Direction.left : Direction.right;
            }
        }
        return null;
    }

    getApple(snake, gridSize, apples) {
        var apple = apples[0];
        if (this.isBesideApple(snake, apple)) {
            if (apple.coord.x == snake.headCoord.x) {
                return (apple.coord.y < snake.headCoord.y) ? Direction.up : Direction.down;
            }
            else if (apple.coord.y == snake.headCoord.y) {
                return (apple.coord.x < snake.headCoord.x) ? Direction.left : Direction.right;
            }
        }
        else {
            return this.avoidEdges(snake, gridSize);
        }
    }

    getCommand(snake, gridSize, apples) {
        // Prioritise avoiding the edges over more advanced moves
        var avoidEdgeResult = this.avoidEdges(snake, gridSize);
        if (avoidEdgeResult != null) return avoidEdgeResult;

        if (! this.isOnEdge(snake, gridSize) && this.crntState != this.State.gettingApple) {
            this.crntState = this.State.goingToEdge;
        }
        else if (apples.length == 0) {
            this.crntState = this.State.waitingForApple;
        }
        else if (apples.length >= 1 && this.isOnEdge(snake, gridSize)) {
            this.crntState = this.State.gettingApple;
        }

        switch (this.crntState)
        {
            case this.State.waitingForApple:
                return this.avoidEdges(snake, gridSize);
            case this.State.goingToEdge:
                return null;
            case this.State.gettingApple:
                return this.getApple(snake, gridSize, apples);
        }
    }
}