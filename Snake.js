class Snake extends wrk.GameEngine.Entity {
    constructor(headCoord, gridSize, length) {
        super('snake', wrk.v(0, 0), 0);

        // Create the snake stretching out to the left
        wrk.doNTimes(length, i => {
            var coord = wrk.v(headCoord.x - (i + 1), headCoord.y);
            var segment = new Segment(coord, gridSize);
            this.addChild(segment);
        });

        this.updateGridSize(gridSize);
    }

    get length() {
        return this.segmentCoords.length;
    }

    get headCoord() {
        return this.segmentCoords[0];
    }

    updateGridSize(gridSize) {
        this.gridSize = gridSize;
        this.children.forEach(child => {
            child.updateGridSize(gridSize);
        });
    }

    move() {

    }
}