class CombinedSnakeController extends AbstractSnakeController {
    // Controller that uses either a keyboard controller or a mouse controller (but keyboard is prioritised)

    constructor() {
        super();

        this.keyboardController = new KeyboardSnakeController();
        this.mouseController = new MouseSnakeController();
    }

    getCommand(snake, gridSize, apples) {
        var keyboardCommand = this.keyboardController.getCommand(snake, gridSize, apples);
        if (keyboardCommand != null) return keyboardCommand;
        
        return this.mouseController.getCommand(snake, gridSize, apples);
    }
}