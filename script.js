const audio = document.getElementById('jingleAudio');
const startBtn = document.getElementById('startBtn');
const overlay = document.getElementById('intro-overlay');
const cardForm = document.getElementById('cardForm');
const santaWorld = document.querySelector('.santa-world');

// 1. Başlatma Fonksiyonu
startBtn.addEventListener('click', () => {
    audio.play();
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        initSantaMission();
        initSnowflakes();
    }, 800);
});

// 2. Noel Baba ve Hediye Atma Mekanizması
function initSantaMission() {
    const santa = document.createElement('img');
    santa.src = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc29zY3E5ZzB6ZzB6ZzB6ZzB6ZzB6ZzB6ZzB6ZzB6ZzB6ZzB6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1z/H62NM1ab7wzK0/giphy.gif';
    santa.className = 'santa-img';
    santaWorld.appendChild(santa);

    let x = -200;
    let y = 100;
    let angle = 0;

    function fly() {
        x += 2.5;
        angle += 0.02;
        y = 80 + Math.sin(angle) * 30; // Dalgalı uçuş
        
        santa.style.left = x + 'px';
        santa.style.top = y + 'px';

        if (x > window.innerWidth + 200) x = -200;
        requestAnimationFrame(fly);
    }

    // Her 2 saniyede bir hediye bırak
    setInterval(() => {
        if (x > 0 && x < window.innerWidth) {
            const gift = document.createElement('div');
            gift.className = 'gift-box';
            const gifts = ['🎁', '🧸', '🍬', '🎄', '📦'];
            gift.textContent = gifts[Math.floor(Math.random() * gifts.length)];
            gift.style.left = (x + 60) + 'px';
            gift.style.top = (y + 60) + 'px';
            santaWorld.appendChild(gift);
            setTimeout(() => gift.remove(), 3500);
        }
    }, 2000);

    fly();
}

// 3. Kar Yağışı
function initSnowflakes() {
    setInterval(() => {
        const flake = document.createElement('div');
        flake.innerHTML = '❄';
        flake.style.position = 'fixed';
        flake.style.top = '-20px';
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.color = 'white';
        flake.style.opacity = Math.random();
        flake.style.pointerEvents = 'none';
        flake.style.transition = 'transform 5s linear';
        document.body.appendChild(flake);

        setTimeout(() => {
            flake.style.transform = `translateY(110vh) rotate(360deg)`;
        }, 100);
        setTimeout(() => flake.remove(), 6000);
    }, 200);
}

// 4. Kart Oluşturma
cardForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const msg = document.getElementById('message').value;

    document.getElementById('cardName').textContent = name + ",";
    document.getElementById('cardMessage').textContent = msg;
    
    document.getElementById('cardContainer').classList.remove('hidden');
    cardForm.classList.add('hidden');

    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
});

// PNG İndirme
document.getElementById('downloadBtn').addEventListener('click', () => {
    html2canvas(document.getElementById('card')).then(canvas => {
        const link = document.createElement('a');
        link.download = '2026-yilbasi-kartim.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});

document.getElementById('newCardBtn').addEventListener('click', () => location.reload());
