const highScoreName = 'snakeHighScore';

function getHighScore() {
    return Number(localStorage.getItem(highScoreName));
}

function setHighScore(score) {
    localStorage.setItem(highScoreName, score);
}