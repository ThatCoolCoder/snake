class Snake {
    directionVectors = {
        [Direction.up] : spnr.v(0, -1),
        [Direction.down] : spnr.v(0, 1),
        [Direction.left] : spnr.v(-1, 0),
        [Direction.right] : spnr.v(1, 0)
    };

    constructor(headCoord, length, controller, color=255) {
        this.segmentCoords = [];

        // Create the snake stretching out to the left
        spnr.doNTimes(length, i => {
            var coord = spnr.v(headCoord.x - (i + 1), headCoord.y);
            this.segmentCoords.push(coord);
        });
        
        this.controller = controller;
        this.color = color;

        this.crntDirection = Direction.right;
        this.ateThisFrame = false;
        this.alive = true;
    }

    get length() {
        return this.segmentCoords.length;
    }

    get headCoord() {
        return this.segmentCoords[0];
    }

    controls(gridSize, apples) {
        if (this.alive) {
            var commandedDirection = this.controller.getCommand(this, gridSize, apples);
            
            if (commandedDirection != null) {
                if (OppositeDirection[commandedDirection]
                    != this.crntDirection) {
                    this.crntDirection = commandedDirection;
                }
            }
        }
    }

    eatApples(apples) {
        // This function doesn't actually make the snake grow.
        // It just sets a flag that the end of the snake shouldn't disappear

        // Use for...in to allow break
        spnr.dom.clearLogPara();
        outerLoop:
        for (var apple of apples) {
            for (var selfCoord of this.segmentCoords) {
                if (spnr.v.equal(apple.coord, selfCoord)) {
                    this.ateThisFrame = true;
                    spnr.arr.removeItem(apples, apple);
                    break outerLoop;
                }
            }
        }
    }

    hitWalls(gridSize) {
        for (var selfCoord of this.segmentCoords) {
            if (selfCoord.x < 0 || selfCoord.x >= gridSize.x ||
                selfCoord.y < 0 || selfCoord.y >= gridSize.y) {
                this.alive = false;
                break;
            }
        }
    }

    hitSelf() {
        for (var selfCoord of this.segmentCoords) {
            for (var selfCoord2 of this.segmentCoords) {
                // This here checks if they have the same value,
                // but aren't the same memory address
                if (spnr.v.equal(selfCoord, selfCoord2) &&
                    selfCoord != selfCoord2) {
                    this.alive = false;
                    break;
                }
            }
        }
    }

    move() {
        var crntHeadCoord = this.segmentCoords[0];
        var newHeadCoord = spnr.v.copyAdd(crntHeadCoord,
            this.directionVectors[this.crntDirection]);
        
        // Add the new coord
        this.segmentCoords.unshift(newHeadCoord);
        // If we don't need to grow, delete the tail
        if (! this.ateThisFrame) this.segmentCoords.pop();
    }

    draw(cellSize) {
        push();
        fill(this.color);
        noStroke();
        scale(cellSize);

        this.segmentCoords.forEach(coord => {
            rect(coord.x, coord.y, 1, 1);
        });

        pop();
    }

    update(cellSize, gridSize, apples) {
        this.controls(gridSize, apples);
        this.eatApples(apples);

        this.hitWalls(gridSize);
        this.hitSelf();

        if (this.alive) this.move();
        this.draw(cellSize);

        this.ateThisFrame = false;
        this.keysPressedThisFrame = [];
    }
}