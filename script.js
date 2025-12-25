const form = document.getElementById('cardForm');
const formSection = document.getElementById('formSection');
const cardSection = document.getElementById('cardSection');
const loader = document.getElementById('cardLoader');
const downloadBtn = document.getElementById('downloadCard');
const instagramBtn = document.getElementById('instagramCard');
const whatsappBtn = document.getElementById('whatsappCard');
const linkedinBtn = document.getElementById('linkedinCard');
const newCardBtn = document.getElementById('newCard');
const errorMsg = document.getElementById('formError');

const audio = document.getElementById('jingleAudio');
const musicBtn = document.getElementById('musicToggle');

audio.volume = 0.45;
audio.play().catch(() => {});

let musicPlaying = true;

musicBtn.addEventListener('click', () => {
    if (musicPlaying) {
        audio.pause();
        musicBtn.textContent = '🔇';
    } else {
        audio.play();
        musicBtn.textContent = '🎵';
    }
    musicPlaying = !musicPlaying;
});

const messages = {
    komik: [
        "2026'da bug'lar sana değil, başkalarına çıksın! 😈😂",
        "Yeni yılda kahve hiç bitmesin, kodlar hep çalışsın! ☕💻",
        "Elf'ler bile senin kadar hızlı kod yazamaz! 🧝‍♂️🚀"
    ],
    sicak: [
        "Yeni yıl sana sağlık, huzur ve bol mutluluk getirsin ❤️🎄",
        "En güzel anılar 2026'da seni bulsun, sevgilerle 🎅✨",
        "Sevdiklerinle sıcacık bir yıl olsun ❄️🏠"
    ],
    coder: [
        "2026'da her commit'in clean, her deploy'un sorunsuz olsun! 🚀🔥",
        "Production'a attığın her şey ilk seferde çalışsın! 💚✅",
        "Yeni yılda bug'lar azalsın, kahveler artsın! ☕🛠️"
    ],
    geek: [
        "Stack Overflow'a daha az, kendi zekana daha çok güven! 🤓🧠",
        "2026'da debug etmek yerine celebrate et! 🎉🥂",
        "Kodların akıcı, pull request'lerin hızlı olsun! ⚡📈"
    ],
    ninja: [
        "Merge conflict'lerden kaçan bir ninja ol! 🥷⚔️",
        "2026'da commit'lerin sessiz, hızlı ve kusursuz olsun! 🌙🌟",
        "Kod dojo'sunun en hızlı samurayı sen ol! 🗡️💨"
    ],
    parti: [
        "2026 partilerle, kahkahalarla dolsun! 🎉🎊",
        "Yeni yıl sana dans, müzik ve bol eğlence getirsin! 🕺🎶",
        "Bu yıl en güzel anılar senin olsun, hadi kutla! 🍾🥳"
    ]
};

form.addEventListener('submit', e => {
    e.preventDefault();

    const recipient = document.getElementById('recipient').value.trim();
    const wish = document.getElementById('wish').value.trim();
    const theme = document.getElementById('themeSelect').value;

    if (!recipient || !wish) {
        errorMsg.classList.remove('hidden');
        return;
    }

    errorMsg.classList.add('hidden');
    formSection.classList.add('hidden');
    cardSection.classList.remove('hidden');
    loader.classList.remove('hidden');

    setTimeout(() => {
        loader.classList.add('hidden');

        const themeText = document.getElementById('themeSelect').options[document.getElementById('themeSelect').selectedIndex].text;
        const randomQuote = messages[theme][Math.floor(Math.random() * messages[theme].length)];

        document.getElementById('cardRecipient').textContent = `${recipient},`;
        document.getElementById('cardWish').textContent = wish;
        document.getElementById('cardThemeText').textContent = themeText;
        document.getElementById('cardQuote').textContent = randomQuote;

        confetti({
            particleCount: 300,
            spread: 100,
            origin: { y: 0.5 },
            colors: ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#e9d5ff']
        });
    }, 1200);
});

newCardBtn.addEventListener('click', () => {
    cardSection.classList.add('hidden');
    formSection.classList.remove('hidden');
    form.reset();
});

downloadBtn.addEventListener('click', () => {
    html2canvas(document.getElementById('generatedCard'), { scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'yilbasi-karti-2026.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});

instagramBtn.addEventListener('click', () => {
    html2canvas(document.getElementById('generatedCard'), { scale: 2 }).then(canvas => {
        canvas.toBlob(blob => {
            const file = new File([blob], 'yilbasi-karti.png', { type: 'image/png' });
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                navigator.share({ files: [file], title: 'Yılbaşı Kartım', text: '2026 yılbaşı kartım hazır! 🎄' });
            } else {
                fallbackShare(canvas);
            }
        });
    });
});

whatsappBtn.addEventListener('click', () => {
    html2canvas(document.getElementById('generatedCard'), { scale: 2 }).then(canvas => {
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

linkedinBtn.addEventListener('click', () => {
    const url = encodeURIComponent(window.location.href);
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    window.open(shareUrl, '_blank', 'width=600,height=600');
});

function fallbackShare(canvas) {
    const link = document.createElement('a');
    link.download = 'yilbasi-karti.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

function createSnow() {
    setInterval(() => {
        const snow = document.createElement('div');
        snow.className = 'snowflake';
        snow.textContent = ['❄️', '❅', '❆'][Math.floor(Math.random() * 3)];
        snow.style.left = Math.random() * 100 + 'vw';
        snow.style.fontSize = Math.random() * 1.8 + 2.2 + 'em';
        snow.style.opacity = Math.random() * 0.5 + 0.5;
        snow.style.animationDuration = Math.random() * 10 + 12 + 's';
        document.querySelector('.snow-container').appendChild(snow);
        setTimeout(() => snow.remove(), 22000);
    }, 200);
}

function createSanta() {
    setInterval(() => {
        const santa = document.createElement('img');
        santa.src = 'https://media.tenor.com/jbl-vV2mTrYAAAAM/sleigh-santa-claus.gif';
        santa.className = 'santa-fly';
        santa.alt = '';
        const topPos = Math.random() * 25 + 12 + '%';
        santa.style.top = topPos;
        document.querySelector('.santa-container').appendChild(santa);
        setTimeout(() => santa.remove(), 24000);
    }, Math.random() * 6000 + 10000);
}

createSnow();
createSanta();