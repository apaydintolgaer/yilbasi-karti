const form = document.getElementById('cardForm');
const cardContainer = document.getElementById('cardContainer');
const downloadBtn = document.getElementById('downloadBtn');
const newCardBtn = document.getElementById('newCardBtn');

const funMessages = [
    "2026'da bug'lar tatil yapsın, sen partile! 🎉",
    "Yeni yılda commit'lerin hep clean olsun! 🚀",
    "Elf'ler bile senin kadar hızlı kod yazamaz! 😄",
    "Kodun akıcı, kahven bol olsun bu yıl! ☕",
    "2026 senin yılın olacak, debug etme bile! 🔥"
];

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();
    const theme = document.getElementById('theme').options[document.getElementById('theme').selectedIndex].text;

    const randomMsg = funMessages[Math.floor(Math.random() * funMessages.length)];

    document.getElementById('cardName').textContent = `Sevgili ${name},`;
    document.getElementById('cardMessage').textContent = message;
    document.getElementById('cardTheme').textContent = theme;
    document.getElementById('funMessage').textContent = randomMsg;

    cardContainer.classList.remove('hidden');
    
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });

    createSnow();
});

newCardBtn.addEventListener('click', function() {
    cardContainer.classList.add('hidden');
    form.reset();
});

downloadBtn.addEventListener('click', function() {
    html2canvas(document.getElementById('card'), {
        backgroundColor: null,
        scale: 2
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'yilbasi-karti-2026.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});

function createSnow() {
    for (let i = 0; i < 60; i++) {
        const snow = document.createElement('div');
        snow.textContent = '❄';
        snow.style.position = 'absolute';
        snow.style.fontSize = Math.random() * 20 + 10 + 'px';
        snow.style.left = Math.random() * 100 + 'vw';
        snow.style.top = '-20px';
        snow.style.pointerEvents = 'none';
        snow.style.animation = `fall ${Math.random() * 5 + 5}s linear infinite`;
        snow.style.animationDelay = Math.random() * 5 + 's';
        snow.style.opacity = Math.random() * 0.7 + 0.3;
        document.body.appendChild(snow);

        setTimeout(() => snow.remove(), 10000);
    }
}

const style = document.createElement('style');
style.textContent = `
@keyframes fall {
    to {
        transform: translateY(100vh);
    }
}
`;
document.head.appendChild(style);