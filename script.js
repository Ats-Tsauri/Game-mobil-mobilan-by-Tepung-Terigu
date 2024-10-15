
// script.js

const playerName = localStorage.getItem('playerName') || 'Player';
const backToMenuButton = document.getElementById('backToMenuButton');

// Fungsi untuk kembali ke menu utama
backToMenuButton.addEventListener('click', () => {
    window.location.href = 'menu.html'; // Kembali ke halaman menu
});

// Tambahkan logika lainnya yang sudah ada...

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gameContainer = document.getElementById('gameContainer');
canvas.width = gameContainer.clientWidth;
canvas.height = gameContainer.clientHeight;

let score = 0;
let gameOver = false;
let baseSpeed = 5; // Kecepatan awal
let speed = baseSpeed;
let resetGame = false;
const playerWidth = 50;
const playerHeight = 100;

// Definisikan tiga jalur tetap: kiri, tengah, dan kanan
const lanes = [
    canvas.width / 6 - playerWidth / 2,    // Jalur kiri
    canvas.width / 2 - playerWidth / 2,    // Jalur tengah
    5 * canvas.width / 6 - playerWidth / 2 // Jalur kanan
];

let currentLane = 1; // Start di jalur tengah (index 1)
const obstacles = [];

// Elemen untuk tampilan UI
const scoreDisplay = document.getElementById('scoreValue');
const gameOverScreen = document.getElementById('gameOverScreen');
const finalScoreDisplay = document.getElementById('finalScore');
const restartButton = document.getElementById('restartButton');

// Objek mobil pemain
class Car {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    updatePosition(laneIndex) {
        this.x = lanes[laneIndex];
        this.draw();
    }
}

// Player car
const playerCar = new Car(lanes[currentLane], canvas.height - playerHeight - 10, playerWidth, playerHeight, 'blue');

// Obstacles (mobil musuh)
function createObstacles(numberOfObstacles) {
    const availableLanes = [0, 1, 2]; // Tiga jalur: kiri, tengah, kanan
    for (let i = 0; i < numberOfObstacles; i++) {
        const laneIndex = availableLanes.splice(Math.floor(Math.random() * availableLanes.length), 1)[0];
        const obstacleCar = new Car(lanes[laneIndex], -100, playerWidth, playerHeight, 'red');
        obstacles.push(obstacleCar);
    }
}

// Handle keydown events
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentLane > 0) {
        currentLane--; // Pindah ke jalur kiri
    }
    if (e.key === 'ArrowRight' && currentLane < 2) {
        currentLane++; // Pindah ke jalur kanan
    }
    if (e.key === ' ' && gameOver) {
        reset(); // Reset game jika tombol spasi ditekan saat game over
    }
});

// Tombol restart (Play Again)
restartButton.addEventListener('click', () => {
    reset(); // Reset game jika tombol "Play Again" diklik
});

// Cek tabrakan antara player dan obstacle
function checkCollision(player, obstacle) {
    return (
        player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y
    );
}

// Menampilkan layar game over sebagai overlay
function showGameOverScreen() {
    finalScoreDisplay.textContent = score; // Tampilkan skor akhir
    gameOverScreen.style.display = 'flex'; // Tampilkan overlay game over
}

// Reset layar game over dan kembali ke permainan
function hideGameOverScreen() {
    gameOverScreen.style.display = 'none'; // Sembunyikan layar game over
}

// Reset Game
function reset() {
    score = 0;
    gameOver = false;
    speed = baseSpeed; // Kembalikan kecepatan awal
    currentLane = 1;
    obstacles.length = 0; // Hapus semua musuh
    playerCar.x = lanes[currentLane]; // Reset posisi pemain ke tengah
    createObstacles(2); // Buat dua musuh pertama
    hideGameOverScreen(); // Sembunyikan layar game over
    gameLoop(); // Mulai game loop
}

// Game loop
function gameLoop() {
    if (gameOver) {
        showGameOverScreen(); // Tampilkan layar game over
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update posisi player di jalur yang sesuai
    playerCar.updatePosition(currentLane);

    // Update dan gambar obstacles
    obstacles.forEach((obstacle, index) => {
        obstacle.y += speed;
        obstacle.draw();

        // Hapus obstacle yang sudah keluar dari layar
        if (obstacle.y > canvas.height) {
            obstacles.splice(index, 1);
        }

        // Cek tabrakan
        if (checkCollision(playerCar, obstacle)) {
            gameOver = true;
        }
    });

    // Tambah skor berdasarkan waktu bertahan
    score++;
    scoreDisplay.textContent = score;

    // Buat musuh baru saat musuh berkurang
    if (obstacles.length < 2) {
        createObstacles(2); // Tambah dua musuh
    }

    // Peningkatan kecepatan berdasarkan kelipatan skor
    if (score % 250 === 0) {
        speed += baseSpeed * 0.1; // Tingkatkan kecepatan 10%
    }

    requestAnimationFrame(gameLoop);
}

// Mulai game
reset(); // Mulai game dengan reset untuk setup awal
