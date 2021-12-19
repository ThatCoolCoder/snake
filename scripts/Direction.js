const Direction = {
    up : 'up',
    down : 'down',
    left : 'left',
    right : 'right'
};

const OppositeDirection = {
    [Direction.up] : Direction.down,
    [Direction.down] : Direction.up,
    [Direction.left] : Direction.right,
    [Direction.right] : Direction.left
}