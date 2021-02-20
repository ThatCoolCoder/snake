class Snake {
    controls = {
        up : ['ArrowUp', 'KeyW'],
        down : ['ArrowDown', 'KeyS'],
        right : ['ArrowRight', 'KeyD'],
        left : ['ArrowLeft', 'KeyA']
    };

    directions = {
        up : wrk.v(0, -1),
        down : wrk.v(0, 1),
        left : wrk.v(-1, 0),
        right : wrk.v(1, 0)
    };

    oppositeDirections = {
        up : 'down',
        down : 'up',
        right : 'left',
        left : 'right'
    };

    constructor(headCoord, length) {
        this.segmentCoords = [];

        // Create the snake stretching out to the left
        wrk.doNTimes(length, i => {
            var coord = wrk.v(headCoord.x - (i + 1), headCoord.y);
            this.segmentCoords.push(coord);
        });

        this.keyWatcher = new wrk.KeyWatcher(document);

        this.crntDirection = 'right';
        this.ateThisFrame = false;
        this.alive = true;
    }

    get length() {
        return this.segmentCoords.length;
    }

    get headCoord() {
        return this.segmentCoords[0];
    }

    keybinds() {
        // This uses a for...of so that we can break
        var directions = wrk.obj.keys(this.controls);
        outerLoop:
        for (var direction of directions) {
            var keys = this.controls[direction];
            for (var key of keys) {
                if (this.keyWatcher.keyIsDown(key)) {
                    // Don't let the snake turn back into the direction it came from
                    if (this.oppositeDirections[direction]
                        != this.crntDirection) {
                        this.crntDirection = direction;
                        break outerLoop;
                    }
                }
            }
        }
    }

    eatApples(apples) {
        // This function doesn't actually make the snake grow.
        // It just sets a flag that the end of the snake shouldn't disappear

        // Use for...in to allow break
        wrk.dom.clearLogPara();
        outerLoop:
        for (var apple of apples) {
            for (var selfCoord of this.segmentCoords) {
                if (wrk.v.equal(apple.coord, selfCoord)) {
                    this.ateThisFrame = true;
                    wrk.arr.removeItem(apples, apple);
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
                if (wrk.v.equal(selfCoord, selfCoord2) &&
                    selfCoord != selfCoord2) {
                    this.alive = false;
                    break;
                }
            }
        }
    }

    move() {
        var crntHeadCoord = this.segmentCoords[0];
        var newHeadCoord = wrk.v.copyAdd(crntHeadCoord,
            this.directions[this.crntDirection]);
        
        // Add the new coord
        this.segmentCoords.unshift(newHeadCoord);
        // If we don't need to grow, delete the tail
        if (! this.ateThisFrame) this.segmentCoords.pop();
    }

    draw(cellSize) {
        push();
        fill(255);
        noStroke();
        scale(cellSize);

        this.segmentCoords.forEach(coord => {
            rect(coord.x, coord.y, 1, 1);
        });

        pop();
    }

    update(cellSize, gridSize, apples) {
        this.keybinds();
        this.eatApples(apples);

        this.hitWalls(gridSize);
        this.hitSelf();

        if (this.alive) this.move();
        this.draw(cellSize);

        this.ateThisFrame = false;
    }
}