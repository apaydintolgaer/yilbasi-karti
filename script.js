const form = document.getElementById('cardForm');
const cardContainer = document.getElementById('cardContainer');
const loadingSpinner = document.getElementById('loadingSpinner');
const downloadBtn = document.getElementById('downloadBtn');
const shareBtn = document.getElementById('shareBtn');
const newCardBtn = document.getElementById('newCardBtn');
const errorMessage = document.getElementById('errorMessage');
const themeIcon = document.getElementById('themeIcon');

const audio = document.getElementById('jingleAudio');
const musicToggle = document.getElementById('musicToggle');

audio.volume = 0.45;
audio.play().catch(() => {});

let isPlaying = true;

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        musicToggle.textContent = '🔇';
    } else {
        audio.play();
        musicToggle.textContent = '🎵';
    }
    isPlaying = !isPlaying;
});

const funMessages = {
    komik: [
        "2026'da bug'lar sana değil, başkalarına çıksın! 😈",
        "Yeni yılda kahve hiç bitmesin, kodlar hep çalışsın! ☕",
        "Elf'ler bile senin kadar hızlı kod yazamaz! 🧝‍♂️"
    ],
    sicak: [
        "Yeni yıl sana sağlık, huzur ve bol mutluluk getirsin ❤️",
        "En güzel anılar 2026'da seni bulsun, sevgilerle 🎄",
        "Sevdiklerinle sıcacık bir yıl olsun ❄️"
    ],
    kodcu: [
        "Commit'lerin hep clean, merge conflict hiç olmasın! 🚀",
        "2026'da production'a attığın her şey sorunsuz çalışsın! 🔥",
        "Stack Overflow'a daha az düş, kahveye daha çok sarıl! 💻"
    ],
    parti: [
        "2026 partilerle, kahkahalarla dolsun! 🎉",
        "Yeni yıl sana dans, müzik ve bol eğlence getirsin! 🕺",
        "Bu yıl en güzel anılar senin olsun, hadi kutla! 🍾"
    ]
};

const themeIcons = {
    komik: 'https://www.clipartmax.com/png/middle/242-2422254_snowman-icon-snow-man-vector-png.png',
    parti: 'https://www.clipartmax.com/png/middle/337-3373160_christmas-reindeer-clipart-reindeer-santa-claus-clip-christmas-reindeer-icon.png',
    sicak: '',
    kodcu: ''
};

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();
    const themeValue = document.getElementById('theme').value;

    if (!name || !message) {
        errorMessage.classList.remove('hidden');
        return;
    }

    errorMessage.classList.add('hidden');
    cardContainer.classList.remove('hidden');
    loadingSpinner.classList.remove('hidden');

    setTimeout(() => {
        loadingSpinner.classList.add('hidden');

        const themeText = document.getElementById('theme').options[document.getElementById('theme').selectedIndex].text;
        const randomMsg = funMessages[themeValue][Math.floor(Math.random() * funMessages[themeValue].length)];

        document.getElementById('cardName').textContent = `${name},`;
        document.getElementById('cardMessage').textContent = message;
        document.getElementById('cardTheme').textContent = themeText;
        document.getElementById('funMessage').textContent = randomMsg;

        themeIcon.src = themeIcons[themeValue] || '';

        confetti({
            particleCount: 250,
            spread: 100,
            origin: { y: 0.5 },
            colors: ['#228B22', '#c41e3a', '#ffffff', '#ffd700']
        });
    }, 1000);
});

newCardBtn.addEventListener('click', () => {
    cardContainer.classList.add('hidden');
    form.reset();
    themeIcon.src = '';
    document.querySelectorAll('.snowflake').forEach(s => s.remove());
    createSnowflakes();
});

downloadBtn.addEventListener('click', () => {
    html2canvas(document.getElementById('card'), {
        scale: 2,
        backgroundColor: null
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'mutlu-yillar-2026.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});

shareBtn.addEventListener('click', () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Yılbaşı kartımı oluşturdum, sen de dene! 🎄');
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`, '_blank');
});

function createSnowflakes() {
    setInterval(() => {
        const flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.textContent = ['❄️', '❅', '❆'][Math.floor(Math.random() * 3)];
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.fontSize = Math.random() * 1.5 + 2 + 'em';
        flake.style.opacity = Math.random() * 0.6 + 0.4;
        flake.style.animationDuration = Math.random() * 6 + 8 + 's';

        document.querySelector('.snow-container').appendChild(flake);

        setTimeout(() => flake.remove(), 14000);
    }, 400);
}

createSnowflakes();