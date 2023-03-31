// var not const so it can be overridden
var snakeConfig = {
    variantName : 'lessfast',
    gridSize : spnr.v(20, 20),
    startLength : 3,
    maxApples : 1,
    appleChance : 1,
    appleColor : [255, 0, 0],
    snakeColor : 255,
    bgColor : 0,
    fps : 30,
    controllerFactory : () => new CombinedSnakeController()
};