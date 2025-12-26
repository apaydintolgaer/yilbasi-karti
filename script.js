const audio = document.getElementById('jingleAudio');
const startBtn = document.getElementById('start-magic');
const overlay = document.getElementById('intro-overlay');
const santaWorld = document.querySelector('.santa-world');

// 1. MÜZİK VE BAŞLATMA SİSTEMİ
startBtn.addEventListener('click', () => {
    audio.play();
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        startSantaMission(); // Noel Baba görevine başlar
    }, 800);
});

// 2. NOEL BABA VE HEDİYE ATMA SİSTEMİ
function startSantaMission() {
    const santa = document.createElement('img');
    // Şeffaf Noel Baba GIF
    santa.src = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc29zY3E5ZzB6ZzB6ZzB6ZzB6ZzB6ZzB6ZzB6ZzB6ZzB6ZzB6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1z/H62NM1ab7wzK0/giphy.gif';
    santa.className = 'santa-sleigh';
    santaWorld.appendChild(santa);

    let posX = -200;
    let posY = 50;
    let angle = 0;

    function animateSanta() {
        posX += 3; // İlerleme hızı
        angle += 0.02;
        posY = 50 + Math.sin(angle) * 30; // Dalgalı uçuş

        santa.style.left = posX + 'px';
        santa.style.top = posY + 'px';

        if (posX > window.innerWidth + 200) {
            posX = -200; // Başa dön
        }

        requestAnimationFrame(animateSanta);
    }

    // Hediye Bırakma Döngüsü
    setInterval(() => {
        if (posX > 0 && posX < window.innerWidth) {
            dropGift(posX + 50, posY + 50);
        }
    }, 2000); // Her 2 saniyede bir hediye atar

    animateSanta();
}

function dropGift(x, y) {
    const gifts = ['🎁', '📦', '🧸', '🍬', '🎄'];
    const gift = document.createElement('div');
    gift.className = 'gift-box';
    gift.textContent = gifts[Math.floor(Math.random() * gifts.length)];
    gift.style.left = x + 'px';
    gift.style.top = y + 'px';
    santaWorld.appendChild(gift);

    setTimeout(() => gift.remove(), 4000);
}

// 3. KAR TANELERİ
function createSnow() {
    const container = document.querySelector('.snow-container');
    setInterval(() => {
        const flake = document.createElement('div');
        flake.innerHTML = '❄';
        flake.style.position = 'fixed';
        flake.style.top = '-20px';
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.opacity = Math.random();
        flake.style.color = 'white';
        flake.style.transition = 'transform 5s linear';
        container.appendChild(flake);

        setTimeout(() => {
            flake.style.transform = `translateY(110vh) rotate(360deg)`;
        }, 100);
        setTimeout(() => flake.remove(), 6000);
    }, 150);
}

createSnow();

// 4. FORM İŞLEMLERİ (Önceki kodlarınla aynı mantık)
document.getElementById('cardForm').addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('cardName').textContent = document.getElementById('name').value + ",";
    document.getElementById('cardMessage').textContent = document.getElementById('message').value;
    document.getElementById('cardContainer').classList.remove('hidden');
    document.getElementById('cardForm').classList.add('hidden');
    
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
});
