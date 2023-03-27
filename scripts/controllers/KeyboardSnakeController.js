class KeyboardSnakeController extends AbstractSnakeController {
    // Basic snake control using arrow keys or WASD
    // It checks keys independently of the (very low) game framerate, preventing keys from being unnoticed. 

    controls = {
        'ArrowUp' : Direction.up,
        'KeyW' : Direction.up,
        'ArrowDown' : Direction.down,
        'KeyS' : Direction.down,
        'ArrowLeft' : Direction.left,
        'KeyA' : Direction.left,
        'ArrowRight' : Direction.right,
        'KeyD' : Direction.right,
    };

    constructor() {
        super();

        // Buffer of commanded directions.
        // Not flushed after each input grab -
        // so if you press two in rapid succession they are both registered
        this.inputBuffer = [];

        document.addEventListener("keydown", e => {
            if (e.code in this.controls) {
                var direction = this.controls[e.code];
                // two presses in the same direction will be merged into one
                if (this.inputBuffer[this.inputBuffer.length - 1] != direction) {
                    this.inputBuffer.push(direction);
                }
            }
        });
    }

    getCommand(snake, gridSize, apples) {
        return this.inputBuffer.shift() ?? null;
    }
}