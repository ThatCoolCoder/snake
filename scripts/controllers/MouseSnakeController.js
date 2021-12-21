class MouseSnakeController extends AbstractSnakeController {
    // Controller using touch screen swipes to move snake

    constructor() {
        super();
        this.canvas = spnr.dom.id('defaultCanvas0');
        
        this.canvas.addEventListener('touchstart', e => {
            this.touchStartPos = spnr.v(e.touches[0].clientX, e.touches[0].clientY);
        });
        this.canvas.addEventListener('touchmove', e => {
            this.touchEndPos = spnr.v(e.touches[0].clientX, e.touches[0].clientY);
        });
        this.canvas.addEventListener('touchend', e => {
            if (this.touchStartPos != null && this.touchEndPos != null) {
                var delta = spnr.v.copySub(this.touchEndPos, this.touchStartPos);
                var heading = spnr.v.heading(delta, true) + 180;
                if (heading > 315 || heading < 45) this.commands.push(Direction.left);
                else if (heading < 135) this.commands.push(Direction.up);
                else if (heading < 225) this.commands.push(Direction.right);
                else this.commands.push(Direction.down);
            }
        });
        this.touchStartPos = null;
        this.touchEndPos = null;
        this.commands = []
    }

    getCommand(snake, gridSize, apples) {
        var command = this.commands.length > 0 ? this.commands[0] : null;
        this.commands = [];
        return command;
    }
}