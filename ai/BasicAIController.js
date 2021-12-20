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
        if (directionIsHorizontal(snake.crntDirection)) { 
            return apple.coord.x == snake.headCoord.x;
        }
        else {
            return apple.coord.y == snake.headCoord.y;
        }
    }

    willHitTail(snake, direction) {
        if (directionIsHorizontal(direction)) {
            return snake.segmentCoords.some(coord => {
                return coord.x == snake.headCoord.x && coord.y != snake.headCoord.y;
            })
        }
        else {
            return snake.segmentCoords.some(coord => {
                return coord.y == snake.headCoord.y && coord.x != snake.headCoord.x;
            })
        }
    }

    avoidEdges(snake, gridSize) {
        if (directionIsHorizontal(snake.crntDirection))
        {
            if (snake.headCoord.x == 0 || snake.headCoord.x == gridSize.x - 1) {
                return (snake.headCoord.y > gridSize.y / 2) ? Direction.up : Direction.down;
            }
        }
        else
        {
            if (snake.headCoord.y == 0 || snake.headCoord.y == gridSize.y - 1) {
                return (snake.headCoord.x > gridSize.x / 2) ? Direction.left : Direction.right;
            }
        }
        return null;
    }

    getApple(snake, gridSize, apples) {
        var apple = apples[0];

        if (spnr.v.equal(snake.headCoord, apple.coord)) return;

        if (this.isBesideApple(snake, apple)) {
            if (apple.coord.x == snake.headCoord.x && ! this.willHitTail(snake, Direction.left)) {
                return (apple.coord.y < snake.headCoord.y) ? Direction.up : Direction.down;
            }
            else if (apple.coord.y == snake.headCoord.y && ! this.willHitTail(snake, Direction.up)) {
                return (apple.coord.x < snake.headCoord.x) ? Direction.left : Direction.right;
            }
        }
        return this.avoidEdges(snake, gridSize);
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