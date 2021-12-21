# Snake

JavaScript snake clone

## Coords vs Positions:
Coords refers to the position on the grid.
Position refers to the position on the canvas.

## `snakeConfig`

To make this program really customisable and configurable, important parameters of the game can be controlled through a `snakeConfig`. A `snakeConfig` is a dictionary/object declared in the global scope called `snakeConfig`. It has the following parameters (all are required if you are creating a custom snake config):

- `variantName` (string). Name of this variant (preferably no spaces). Used for saving scores seperately
- `gridSize` (spnr vector with x and y as int). Size of the grid that the snake can go on.
- `maxApples` (int). Maximum amount of apples that can exist at any given time.
- `appleChance` (float from 0 to 1). Probability that an apple will spawn on any frame if `quantity of apples < maxApples`.
- `appleColor` (any p5 color format). Color of the apples.
- `bgColor` (any p5 color format). Color of the background.
- `snakeColor` (any p5 color format). Color of the snake.
- `fps` (number). Target frames per second of the game
- `controllerFactory` (function returning an `AbstractSnakeController`). Function used to generate controllers for the snake. Useful for making AI controllers. To use the normal keyboard controller, set it to `() => new CombinedSnakeController()`.

The default `snakeConfig` is in `/scripts/snakeConfig.js`.

## Controllers

To make this usable for experiments with AI-controlled snake, a system of swappable controllers has been implemented. The `Snake` class accepts an `AbstractSnakeController` as a constructor parameter. The `AbstractSnakeController` is then passed the values `(snake, gridSize, apples)` every frame from which it can determine the board state and choose its next move. To configure which controller the snake is going to use, use an override `snakeConfig` and set `controllerFactory` to a function returning your chosen controller.