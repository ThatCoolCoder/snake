// var not const so it can be overridden
var snakeConfig = {
    variantName : 'fast',
    gridSize : spnr.v(20, 20),
    startLength : 3,
    maxApples : 1,
    appleChance : 1,
    appleColor : [255, 0, 0],
    snakeColor : 255,
    bgColor : 0,
    fps : 60,
    controllerFactory : () => new CombinedSnakeController()
};