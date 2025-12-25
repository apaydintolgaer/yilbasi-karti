const form = document.getElementById('cardForm');
const cardContainer = document.getElementById('cardContainer');
const downloadBtn = document.getElementById('downloadBtn');
const newCardBtn = document.getElementById('newCardBtn');

const funMessages = {
    komik: [
        "2026'da bug'lar sana değil, başkalarına çıksın! 😈",
        "Yeni yılda kahve bitmesin, kodlar hep çalışsın! ☕",
        "Elf'ler bile senin kadar hızlı kod yazamaz! 🧝‍♂️"
    ],
    sicak: [
        "Yeni yıl sana sağlık, huzur ve bolca mutluluk getirsin ❤️",
        "En güzel anılar 2026'da seni bulsun, sevgilerle 🎄",
        "Sevdiklerinle geçireceğin sıcacık bir yıl olsun ❄️"
    ],
    kodcu: [
        "Commit'lerin hep clean, merge conflict'lerin hiç olmasın! 🚀",
        "2026'da production'a deploy ettiğin her şey çalışsın! 🔥",
        "Yeni yılda stack overflow'a daha az düş, daha çok kahve iç! 💻"
    ],
    parti: [
        "2026 partilerle, kahkahalarla dolsun! 🎉",
        "Yeni yıl sana dans, müzik ve bol eğlence getirsin! 🕺",
        "Bu yıl da en güzel anılar senin olsun, hadi kutla! 🍾"
    ]
};

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();
    const themeValue = document.getElementById('theme').value;
    const themeText = document.getElementById('theme').options[document.getElementById('theme').selectedIndex].text;

    const messages = funMessages[themeValue];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];

    document.getElementById('cardName').textContent = `${name},`;
    document.getElementById('cardMessage').textContent = message;
    document.getElementById('cardTheme').textContent = themeText;
    document.getElementById('funMessage').textContent = randomMsg;

    cardContainer.classList.remove('hidden');
    
    // Gösterişli konfeti
    confetti({
        particleCount: 200,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#ff6b6b', '#ffa500', '#48cae4', '#fff']
    });

    // Kar yağışını sürekli hale getir
    createSnowflakes();
});

newCardBtn.addEventListener('click', function() {
    cardContainer.classList.add('hidden');
    form.reset();
    document.querySelectorAll('.snowflake').forEach(s => s.remove());
});

downloadBtn.addEventListener('click', function() {
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

function createSnowflakes() {
    setInterval(() => {
        const snowflake = document.createElement('div');
        snowflake.textContent = ['❄', '✨', '❅'][Math.floor(Math.random() * 3)];
        snowflake.className = 'snowflake';
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.fontSize = Math.random() * 20 + 15 + 'px';
        snowflake.style.opacity = Math.random() * 0.8 + 0.2;
        snowflake.style.animationDuration = Math.random() * 4 + 4 + 's';
        document.querySelector('.snow-container').appendChild(snowflake);

        setTimeout(() => snowflake.remove(), 10000);
    }, 300);
}