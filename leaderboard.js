// leaderboard.js

// Ambil leaderboard dari localStorage atau buat array kosong jika belum ada
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

// Fungsi untuk menambahkan skor ke leaderboard
function addScoreToLeaderboard(name, score) {
    leaderboard.push({ name, score });
    leaderboard.sort((a, b) => b.score - a.score); // Urutkan berdasarkan skor tertinggi
    leaderboard = leaderboard.slice(0, 5); // Simpan hanya 5 skor tertinggi
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard)); // Simpan ke localStorage
}

// Ambil elemen leaderboard container dari HTML
const leaderboardContainer = document.getElementById('leaderboardContainer');

function displayLeaderboard() {
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';

    // Buat header tabel
    const headerRow = document.createElement('tr');
    const rankHeader = document.createElement('th');
    rankHeader.textContent = 'Rank';
    rankHeader.style.border = '1px solid #fff';
    rankHeader.style.padding = '10px';
    const nameHeader = document.createElement('th');
    nameHeader.textContent = 'Name';
    nameHeader.style.border = '1px solid #fff';
    nameHeader.style.padding = '10px';
    const scoreHeader = document.createElement('th');
    scoreHeader.textContent = 'Score';
    scoreHeader.style.border = '1px solid #fff';
    scoreHeader.style.padding = '10px';

    headerRow.appendChild(rankHeader);
    headerRow.appendChild(nameHeader);
    headerRow.appendChild(scoreHeader);
    table.appendChild(headerRow);

    // Isi tabel dengan data leaderboard dan tambahkan rank
    leaderboard.forEach((entry, index) => {
        const row = document.createElement('tr');
        
        const rankCell = document.createElement('td');
        rankCell.textContent = index + 1; // Peringkat berdasarkan urutan
        rankCell.style.border = '1px solid #fff';
        rankCell.style.padding = '10px';

        const nameCell = document.createElement('td');
        nameCell.textContent = entry.name;
        nameCell.style.border = '1px solid #fff';
        nameCell.style.padding = '10px';

        const scoreCell = document.createElement('td');
        scoreCell.textContent = entry.score;
        scoreCell.style.border = '1px solid #fff';
        scoreCell.style.padding = '10px';

        row.appendChild(rankCell);
        row.appendChild(nameCell);
        row.appendChild(scoreCell);
        table.appendChild(row);
    });

    leaderboardContainer.appendChild(table);
}

// Panggil fungsi untuk menampilkan leaderboard saat halaman dimuat
window.onload = displayLeaderboard;
