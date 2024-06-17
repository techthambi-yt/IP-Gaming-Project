// Existing variables and functions...

// New variables for game over menu
const gameOverMenu = document.createElement('div');
gameOverMenu.classList.add('game-over-menu');
gameOverMenu.innerHTML = `
    <h2>Game Over!</h2>
    <p>Your score is <span id="final-score"></span></p>
    <button id="restart-button">Restart</button>
    <button id="quit-button">Quit</button>
`;
document.body.appendChild(gameOverMenu);
const finalScore = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');
const quitButton = document.getElementById('quit-button');

// Show game over menu
function showGameOverMenu() {
    finalScore.innerText = score;
    gameOverMenu.style.display = 'block';
}

// Hide game over menu
function hideGameOverMenu() {
    gameOverMenu.style.display = 'none';
}

// Restart game
restartButton.addEventListener('click', () => {
    hideGameOverMenu();
    resetGame();
    updateGame();
});

// Quit game
quitButton.addEventListener('click', () => {
    hideGameOverMenu();
    // You can redirect to a different page or show a message
    alert('Thanks for playing!');
});

// Modified resetGame function to include hiding the game over menu
function resetGame() {
    score = 0;
    health = 3;
    enemySpeed = 2;
    scoreDisplay.innerText = 'Score: ' + score;
    healthDisplay.innerText = 'Health: ' + health;
    enemies.forEach(enemy => enemy.remove());
    enemies = [];
    hideGameOverMenu(); // Ensure the menu is hidden on restart
    createEnemy();
}

// Modified updateGame function to show game over menu
function updateGame() {
    if (health === 0) {
        showGameOverMenu();
        return;
    }

    enemies.forEach(enemy => {
        const currentRight = parseInt(enemy.style.right);
        enemy.style.right = (currentRight + enemySpeed) + 'px';

        if (currentRight + enemy.clientWidth >= gameArea.clientWidth) {
            health--;
            healthDisplay.innerText = 'Health: ' + health;
            enemy.remove();
            enemies.shift();
            if (health === 0) {
                showGameOverMenu();
                return;
            }
        }
    });

    requestAnimationFrame(updateGame);
}

// Initialize the game
resetGame();
updateGame();
