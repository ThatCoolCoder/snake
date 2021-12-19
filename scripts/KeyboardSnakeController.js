class KeyboardSnakeController extends AbstractSnakeController {
    // Basic snake control using arrow keys or WASD

    controls = {
        [Direction.up] : ['ArrowUp', 'KeyW'],
        [Direction.down] : ['ArrowDown', 'KeyS'],
        [Direction.right] : ['ArrowRight', 'KeyD'],
        [Direction.left] : ['ArrowLeft', 'KeyA']
    };

    constructor() {
        super();

        // Create a high-frequency key-checking loop
        // To avoid keys not being recorded if they are pressed between frames
        // We need to use an arrow function to preserve scope
        setInterval(() => this.checkKeysDown(), 10);
        this.keyWatcher = new spnr.KeyWatcher(document);
        this.keysPressedThisFrame = [];
    }

    checkKeysDown() {
        // For all of the keys that we care about:
        spnr.obj.values(this.controls).forEach(listOfkeys => {
            listOfkeys.forEach(key => {
                // If it's down and we haven't already listed it,
                // list it
                if (this.keyWatcher.keyIsDown(key) &&
                    ! this.keysPressedThisFrame.includes(key)) {
                    this.keysPressedThisFrame.push(key);
                }
            });
        });
    }

    getCommand(snake, gridSize, apples) {
        var directions = spnr.obj.keys(this.controls);
        var command = null;
        if (this.keysPressedThisFrame.length > 0) {
            for (var direction of directions) {
                var keys = this.controls[direction];
                if (keys.includes(this.keysPressedThisFrame[0])) {
                    command = direction;
                    break;
                }
            }
        }
        this.keysPressedThisFrame = [];
        return command;
    }
}