const highScoreName = 'snakeHighScore';

function getHighScore(variantName='') {
    return Number(localStorage.getItem(highScoreName + '-' + variantName));
}

function setHighScore(score, variantName='') {
    localStorage.setItem(highScoreName + '-' + variantName, score);
}