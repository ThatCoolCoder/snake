class AbstractSnakeController {
    // Class that can be used to control a snake
    // Allows easy transition from user input to AI input

    constructor() {

    }

    getCommand(snake, gridSize, apples) {
        // Returns a Direction or null in the event that no move should be taken

        throw new Error('AbstractSnakeController.getCommand() was not overridden');
    }
}