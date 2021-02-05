class Segment extends wrk.GameEngine.DrawableEntity {
    static texture = PIXI.Texture.WHITE;

    constructor(coord, gridSize, leader=null, follower=null) {
        super('snake segment', wrk.v(0, 0), 0, Segment.texture, wrk.v(1, 1), wrk.v(1, 1));

        this.coord = wrk.v.copy(coord);
        this.leader = leader;
        this.follower = follower;
        this.updateGridSize(gridSize);
    }

    updateGridSize(gridSize) {
        this.gridSize = gridSize;
        this.setLocalPosition(wrk.v.copyMult(this.coord, this.gridSize));
        this.setTextureSize(wrk.v(this.gridSize, this.gridSize));
    }
}