const form = document.getElementById('cardForm');
const cardContainer = document.getElementById('cardContainer');
const loadingSpinner = document.getElementById('loadingSpinner');
const downloadBtn = document.getElementById('downloadBtn');
const shareBtn = document.getElementById('shareBtn');
const newCardBtn = document.getElementById('newCardBtn');
const errorMessage = document.getElementById('errorMessage');
const audio = document.getElementById('jingleAudio');
const musicToggle = document.getElementById('musicToggle');
const musicOverlay = document.getElementById('musicOverlay');
const startMusicBtn = document.getElementById('startMusicBtn');

audio.volume = 0.4;
let isPlaying = false;

startMusicBtn.addEventListener('click', () => {
    audio.play().then(() => {
        isPlaying = true;
        musicToggle.textContent = '🎵';
        musicOverlay.style.display = 'none';
    }).catch(err => {
        console.log('Müzik çalınamadı:', err);
        musicOverlay.style.display = 'none';
    });
});

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
    sicak: [
        "Yeni yıl sana sağlık, huzur ve mutluluk getirsin.",
        "2026, sevdiklerinle geçireceğin güzel anılarla dolsun.",
        "En içten dileklerimle, mutlu yıllar dilerim."
    ],
    komik: [
        "2026'da bol kahkaha, az hata olsun!",
        "Yeni yılda her şey istediğin gibi gitsin.",
        "Mutlu yıllar, hayatın hep güzel tarafı olsun!"
    ],
    coder: [
        "2026'da tüm kodların sorunsuz çalışsın.",
        "Yeni yılda deploy'ların başarılı olsun.",
        "Başarılarla dolu bir yıl seni bekliyor."
    ],
    parti: [
        "2026 partilerle, eğlenceyle dolsun.",
        "Yeni yıl sana bol dans ve kahkaha getirsin.",
        "Hayatın en güzel anıları bu yıl olsun."
    ]
};

form.addEventListener('submit', e => {
    e.preventDefault();
    const recipient = document.getElementById('name').value.trim();
    const wish = document.getElementById('message').value.trim();
    const theme = document.getElementById('theme').value;

    if (!recipient || !wish) {
        errorMessage.classList.remove('hidden');
        return;
    }

    errorMessage.classList.add('hidden');
    form.classList.add('hidden');
    cardContainer.classList.remove('hidden');
    loadingSpinner.classList.remove('hidden');

    setTimeout(() => {
        loadingSpinner.classList.add('hidden');
        const randomQuote = funMessages[theme][Math.floor(Math.random() * funMessages[theme].length)];
        document.getElementById('cardName').textContent = `${recipient},`;
        document.getElementById('cardMessage').textContent = wish;
        document.getElementById('funMessage').textContent = randomQuote;

        confetti({
            particleCount: 250,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#ffffff', '#6366f1', '#8b5cf6', '#f1f5f9']
        });
    }, 1200);
});

newCardBtn.addEventListener('click', () => {
    cardContainer.classList.add('hidden');
    form.classList.remove('hidden');
    form.reset();
});

downloadBtn.addEventListener('click', () => {
    html2canvas(document.getElementById('card'), { scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'yilbasi-karti-2026.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});

shareBtn.addEventListener('click', () => {
    const url = encodeURIComponent(window.location.href);
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    window.open(shareUrl, '_blank', 'width=600,height=600');
});

function createSnowflakes() {
    setInterval(() => {
        const flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.textContent = ['❄', '❅', '❆'][Math.floor(Math.random() * 3)];
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.fontSize = Math.random() * 1.5 + 1.8 + 'em';
        flake.style.opacity = Math.random() * 0.4 + 0.6;
        flake.style.animationDuration = Math.random() * 10 + 10 + 's';
        flake.style.animationDelay = Math.random() * 3 + 's';
        document.querySelector('.snow-container').appendChild(flake);
        setTimeout(() => flake.remove(), 22000);
    }, 180);
}

function createSantaSleigh() {
    setInterval(() => {
        const santa = document.createElement('div');
        santa.className = 'santa-sleigh';
        santa.textContent = '🎅🛷';
        const topPos = Math.random() * 20 + 8 + '%';
        santa.style.top = topPos;
        document.querySelector('.santa-container').appendChild(santa);
        setTimeout(() => santa.remove(), 25000);
    }, Math.random() * 8000 + 12000);
}

createSnowflakes();
createSantaSleigh();