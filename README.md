# Snake

Configurable JavaScript snake clone with multiple game modes and AIs.

## Creating variants

#### File setup

All that is needed is a html file and a javascript file for a config. The html file should be called `index.html` and placed in a subdirectory of `variants`, so that the final url ends up being `variants/myawesomevariant`. (AI-controlled snakes should go in the `ai/` directory instead). The config file should be `snakeConfig.js`.

For the contents of the `index.html` file just copy one from another variant and change it as needed. Read the next section for contents of `snakeConfig`.

To add it to the snake hub, edit the script in the root `index.html` of this repo.

#### SnakeConfig

To make this program configurable, important parameters of the game can be controlled through a `snakeConfig`. A `snakeConfig` is a dictionary/object declared in the global scope called `snakeConfig`. Here is an example: (all fields are required)

```javascript
var snakeConfig = {
    variantName : 'MyAmazingVariant',   // Name of this variant, preferably with no spaces. Used for saving scores seperately
    gridSize : spnr.v(20, 20),          // The size of the grid that the snake can go on. A spnr vector with integers for x and y.
    startLength : 3,                    // Starting length of the apple
    maxApples : 1,                      // The maximum amount of apples that can exist at any given time
    appleChance : 0.5,                  // Probability (from 0 to 1) that an apple will spawn on any frame if quantity of apples is less than maxApples.
    fps : 10,                           // Target frames per second of the game. Directly controls the snake movement speed - snake moves 1 unit every frame

    snakeColor : 255,           // Color of the snake, in any format recognised by p5.js. If a single integer is given it is interpreted as a greyscale value (from 0 to 255). An array of three RGB values can also be used 
    appleColor : [255, 0, 0],   // Color of the apples
    bgColor : 0,                // Color of the background

    controllerFactory : () => new CombinedSnakeController() // Function used to generate controllers for the snake. Useful for making AI controllers - see the Controllers section below
};
```

The default `snakeConfig` can be seen in `/scripts/snakeConfig.js`.

## Controllers

To make this usable for experiments with AI-controlled snake, a system of swappable controllers has been implemented. The `Snake` class accepts an `AbstractSnakeController` as a constructor parameter. `AbstractSnakeController.command(snake, gridSize, apples)` is called every frame from which it can determine the board state and choose its next move. To configure which controller the snake is going to use, use an override `snakeConfig` and set `controllerFactory` to a function returning your chosen controller.

## Development notes:

#### Coords vs Positions:
Coords refers to the position on the grid.
Position refers to the position on the canvas.