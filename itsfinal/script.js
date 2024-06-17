const gameArea = document.getElementById('game-area');
const wordInput = document.getElementById('word-input');
const scoreDisplay = document.getElementById('score');
const healthDisplay = document.getElementById('health');

let score = 0;
let health = 3;
let enemies = [];
let enemySpeed = 2; // pixels per frame
ene=0

function setRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

function createEnemy() {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    const word = setRandomWord();
    enemy.innerHTML = `<span>${word}</span>`;
    enemy.style.right = '0px';
    enemy.dataset.word = word;
    gameArea.appendChild(enemy);
    enemies.push(enemy);
}

function updateGame() {
    enemies.forEach(enemy => {
        const currentRight = parseInt(enemy.style.right);
        enemy.style.right = (currentRight + enemySpeed) + 'px';

        if (currentRight + enemy.clientWidth >= gameArea.clientWidth) {
            health--;
            healthDisplay.innerText = 'Health: ' + health;
            enemy.remove();
            enemies.shift();
            if (health === 0) {
                alert('Game Over! Your score is ' + score);
                resetGame();
            }
        }
    });

    requestAnimationFrame(updateGame);
}

function resetGame() {
    score = 0;
    health = 3;
    enemySpeed = 2;
    scoreDisplay.innerText = 'Score: ' + score;
    healthDisplay.innerText = 'Health: ' + health;
    enemies.forEach(enemy => enemy.remove());
    enemies = [];
    createEnemy();
}

function updateEnemyText(enemy, typedText) {
    const word = enemy.dataset.word;
    let displayText = '';

    for (let i = 0; i < word.length; i++) {
        if (i < typedText.length) {
            displayText += `<span style="color: red;">${word[i]}</span>`;
        } else {
            displayText += word[i];
        }
    }

    enemy.innerHTML = `<span>${displayText}</span>`;
}

wordInput.addEventListener('input', () => {
    const inputText = wordInput.value;
    enemies.forEach((enemy, index) => {
        const enemyWord = enemy.dataset.word;
        if (enemyWord.startsWith(inputText)) {
            updateEnemyText(enemy, inputText);

            if (inputText === enemyWord) {
                score++;
                ene+=1 // Increase speed for difficulty
                scoreDisplay.innerText = 'Score: ' + score;
                wordInput.value = ''; // Clear the input box
                enemy.remove();
                enemies.splice(index, 1);
                createEnemy();
            }
        }
        if (ene>=5)
            {
            enemySpeed += 0.5;
            ene=0;
            }
        
    });
});

// Spawn enemies at intervals
setInterval(createEnemy, 30000); // Spawns a new enemy every 3 seconds

// Initialize the game
resetGame();
updateGame();
