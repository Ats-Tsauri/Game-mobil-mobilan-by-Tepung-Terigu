// menu.js

// Elemen untuk layar menu
const menuScreen = document.createElement('div');
menuScreen.style.position = 'absolute';
menuScreen.style.top = '0';
menuScreen.style.left = '0';
menuScreen.style.width = '100%';
menuScreen.style.height = '100%';
menuScreen.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
menuScreen.style.display = 'flex';
menuScreen.style.flexDirection = 'column';
menuScreen.style.justifyContent = 'center';
menuScreen.style.alignItems = 'center';

const menuTitle = document.createElement('h1');
menuTitle.textContent = '2D Car Game';
menuTitle.style.color = 'white';

const nameInput = document.createElement('input');
nameInput.type = 'text';
nameInput.placeholder = 'Enter your name';
nameInput.style.padding = '10px';
nameInput.style.fontSize = '18px';
nameInput.style.marginBottom = '20px';

const startButton = document.createElement('button');
startButton.textContent = 'Start Game';
startButton.style.padding = '10px 20px';
startButton.style.fontSize = '18px';

const hallOfFameButton = document.createElement('button');
hallOfFameButton.textContent = 'Hall of Fame';
hallOfFameButton.style.padding = '10px 20px';
hallOfFameButton.style.marginTop = '10px';
hallOfFameButton.style.fontSize = '18px';

menuScreen.appendChild(menuTitle);
menuScreen.appendChild(nameInput);
menuScreen.appendChild(startButton);
menuScreen.appendChild(hallOfFameButton);
document.body.appendChild(menuScreen);

// Function untuk memulai game saat tombol start diklik
startButton.addEventListener('click', () => {
    if (nameInput.value === '') {
        alert('Please enter your name');
    } else {
        playerName = nameInput.value;
        menuScreen.style.display = 'none'; // Sembunyikan menu
        reset(); // Panggil fungsi reset dari script.js untuk memulai game
    }
});

// Tombol untuk menampilkan Hall of Fame (Leaderboard)
hallOfFameButton.addEventListener('click', () => {
    window.location.href = 'leaderboard.html'; // Arahkan ke halaman leaderboard
});
