const form = document.getElementById('cardForm');
const cardContainer = document.getElementById('cardContainer');
const loadingSpinner = document.getElementById('loadingSpinner');
const downloadBtn = document.getElementById('downloadBtn');
const instagramStoryBtn = document.getElementById('instagramStoryBtn');
const whatsappBtn = document.getElementById('whatsappBtn');
const shareBtn = document.getElementById('shareBtn');
const newCardBtn = document.getElementById('newCardBtn');
const errorMessage = document.getElementById('errorMessage');

const audio = document.getElementById('jingleAudio');
const musicToggle = document.getElementById('musicToggle');

audio.volume = 0.45;
audio.play();

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
        "2026'da bug'lar sana değil, başkalarına çıksın! 😈😂🎉",
        "Yeni yılda kahve hiç bitmesin, kodlar hep çalışsın! ☕💻🚀",
        "Elf'ler bile senin kadar hızlı kod yazamaz! 🧝‍♂️⚡😄"
    ],
    sicak: [
        "Yeni yıl sana sağlık, huzur ve bol mutluluk getirsin ❤️🎄✨",
        "En güzel anılar 2026'da seni bulsun, sevgilerle 🎅🏠❄️",
        "Sevdiklerinle sıcacık bir yıl olsun 🏡❤️🥰"
    ],
    coder: [
        "2026'da her commit'in clean, her deploy'un sorunsuz olsun! 🚀🔥💚",
        "Production'a attığın her şey ilk seferde çalışsın! ✅🛠️🎯",
        "Yeni yılda bug'lar azalsın, kahveler artsın! ☕🖥️😎"
    ],
    geek: [
        "Stack Overflow'a daha az, kendi zekana daha çok güven! 🤓🧠💡",
        "2026'da debug etmek yerine celebrate et! 🎉🥂🍾",
        "Kodların akıcı, pull request'lerin hızlı olsun! ⚡📈🔥"
    ],
    ninja: [
        "Merge conflict'lerden kaçan bir ninja ol! 🥷⚔️🌙",
        "2026'da commit'lerin sessiz, hızlı ve kusursuz olsun! 🌟💨🗡️",
        "Kod dojo'sunun en hızlı samurayı sen ol! 🥋🚀😼"
    ],
    parti: [
        "2026 partilerle, kahkahalarla dolsun! 🎉🎊🥳",
        "Yeni yıl sana dans, müzik ve bol eğlence getirsin! 🕺🎶🍾",
        "Bu yıl en güzel anılar senin olsun, hadi kutla! 🎈🥂🎇"
    ]
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
    form.classList.add('hidden');
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

        confetti({
            particleCount: 300,
            spread: 100,
            origin: { y: 0.5 },
            colors: ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#e9d5ff']
        });
    }, 1200);
});

newCardBtn.addEventListener('click', () => {
    cardContainer.classList.add('hidden');
    form.classList.remove('hidden');
    form.reset();
    document.querySelectorAll('.snowflake').forEach(s => s.remove());
    createSnowflakes();
});

downloadBtn.addEventListener('click', () => {
    html2canvas(document.getElementById('card'), {
        scale: 2,
        backgroundColor: null
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'yilbasi-karti-2026.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});

instagramStoryBtn.addEventListener('click', () => {
    html2canvas(document.getElementById('card'), {
        scale: 2,
        backgroundColor: null
    }).then(canvas => {
        canvas.toBlob(blob => {
            const file = new File([blob], 'yilbasi-karti.png', { type: 'image/png' });
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                navigator.share({ files: [file], title: 'Yılbaşı Kartım', text: '2026 yılbaşı kartım hazır! 🎄' });
            } else {
                fallbackDownload(canvas);
            }
        });
    });
});

whatsappBtn.addEventListener('click', () => {
    html2canvas(document.getElementById('card'), {
        scale: 2,
        backgroundColor: null
    }).then(canvas => {
        canvas.toBlob(blob => {
            const file = new File([blob], 'yilbasi-karti.png', { type: 'image/png' });
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                navigator.share({ files: [file], title: 'Yılbaşı Kartım', text: 'Mutlu yıllar! 🎄' });
            } else {
                const url = canvas.toDataURL('image/png');
                const waUrl = `https://wa.me/?text=${encodeURIComponent('Mutlu yıllar! 🎄')}%0A${encodeURIComponent(url)}`;
                window.open(waUrl, '_blank');
            }
        });
    });
});

shareBtn.addEventListener('click', () => {
    const pageUrl = encodeURIComponent(window.location.href);
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
    window.open(shareUrl, '_blank', 'width=600,height=600');
});

function fallbackDownload(canvas) {
    const link = document.createElement('a');
    link.download = 'yilbasi-karti.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

function createSnowflakes() {
    setInterval(() => {
        const flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.textContent = ['❄️', '❅', '❆'][Math.floor(Math.random() * 3)];
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.fontSize = Math.random() * 1.5 + 2.2 + 'em';
        flake.style.opacity = Math.random() * 0.5 + 0.5;
        flake.style.animationDuration = Math.random() * 10 + 14 + 's';
        flake.style.animationDelay = Math.random() * 5 + 's';

        document.querySelector('.snow-container').appendChild(flake);

        setTimeout(() => flake.remove(), 25000);
    }, 180);
}

function createSantaSleigh() {
    setInterval(() => {
        const sleigh = document.createElement('img');
        sleigh.src = 'https://media.tenor.com/jbl-vV2mTrYAAAAM/sleigh-santa-claus.gif';
        sleigh.className = 'santa-sleigh';
        sleigh.alt = '';
        const randomTop = Math.random() * 25 + 12 + '%';
        sleigh.style.top = randomTop;

        document.querySelector('.santa-container').appendChild(sleigh);

        setTimeout(() => sleigh.remove(), 24000);
    }, Math.random() * 6000 + 10000);
}

createSnowflakes();
createSantaSleigh();