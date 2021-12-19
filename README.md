# Snake

JavaScript snake clone

## Coords vs Positions:
Coords refers to the position on the grid.
Position refers to the position on the canvas.

## Controllers

To make this usable for experiments with AI-controlled snake, a system of swappable controllers has been implemented. The `Snake` class accepts an `AbstractSnakeController` as a constructor parameter. The `AbstractSnakeController` is then passed the values `(snake, gridSize, apples)` every frame from which it can determine the board state and choose its next move. To configure which controller the snake is going to use, set a global variable `snakeController`. If this isn't found then a `KeyboardSnakeController` will be used.