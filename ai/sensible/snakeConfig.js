var snakeConfig = {
    variantName : 'sensibleai',
    gridSize : spnr.v(20, 20),
    maxApples : 1,
    appleChance : 0.4,
    appleColor : [255, 0, 0],
    snakeColor : 255,
    bgColor : 0,
    fps : 60,
    controllerFactory : () => new BasicAIController()
};