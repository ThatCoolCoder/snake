class Apple {
    constructor(coord, color=[255, 0, 0]) {
        this.coord = spnr.v.copy(coord);
        this.color = color.concat([]);
    }

    draw(cellSize) {
        push();
        fill(this.color);
        noStroke();
        scale(cellSize);

        rect(this.coord.x, this.coord.y, 1, 1);

        pop();
    }
}