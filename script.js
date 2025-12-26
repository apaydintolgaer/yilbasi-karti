const music = document.getElementById('christmasAudio');
const startBtn = document.getElementById('startExperience');
const overlay = document.getElementById('experience-overlay');
const ui = document.querySelector('.main-wrapper');
const santaContainer = document.getElementById('santa-mission-control');

// 1. SİHRİ BAŞLAT (Müzik & Noel Baba)
startBtn.addEventListener('click', () => {
    music.play().catch(e => console.error("Ses çalınamadı:", e));
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        ui.classList.remove('hidden-ui');
        launchSanta();
        initSnow();
    }, 1000);
});

// 2. NOEL BABA & HEDİYE BIRAKMA MOTORU
function launchSanta() {
    const santa = document.createElement('img');
    // Profesyonel Şeffaf Noel Baba GIF
    santa.src = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc29zY3E5ZzB6ZzB6ZzB6ZzB6ZzB6ZzB6ZzB6ZzB6ZzB6ZzB6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1z/H62NM1ab7wzK0/giphy.gif';
    santa.className = 'santa-flyer';
    santaContainer.appendChild(santa);

    let x = -200;
    let y = 100;
    let wave = 0;

    function animate() {
        x += 2.5; 
        wave += 0.02;
        y = 100 + Math.sin(wave) * 40; // Yumuşak dalgalanma

        santa.style.left = x + 'px';
        santa.style.top = y + 'px';

        if (x > window.innerWidth + 200) x = -200;
        requestAnimationFrame(animate);
    }

    // Hediyeleri Noel Baba'nın tam altından bırak
    setInterval(() => {
        if (x > 0 && x < window.innerWidth) {
            const gift = document.createElement('div');
            gift.className = 'falling-gift';
            const giftIcons = ['🎁', '📦', '🍬', '🧸'];
            gift.textContent = giftIcons[Math.floor(Math.random() * giftIcons.length)];
            gift.style.left = (x + 70) + 'px';
            gift.style.top = (y + 70) + 'px';
            santaContainer.appendChild(gift);
            setTimeout(() => gift.remove(), 4000);
        }
    }, 1800);

    animate();
}

// 3. KAR SİSTEMİ
function initSnow() {
    setInterval(() => {
        const flake = document.createElement('div');
        flake.innerHTML = '❄';
        flake.style.cssText = `
            position: fixed; top: -20px; left: ${Math.random() * 100}vw;
            color: white; opacity: ${Math.random()}; pointer-events: none;
            transition: transform 6s linear; font-size: ${Math.random() * 20 + 10}px;
        `;
        document.body.appendChild(flake);
        setTimeout(() => { flake.style.transform = `translateY(110vh) rotate(360deg)`; }, 50);
        setTimeout(() => flake.remove(), 6050);
    }, 200);
}

// 4. KART OLUŞTURMA & KAYDETME
document.getElementById('cardGeneratorForm').addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('finalName').textContent = document.getElementById('recipientName').value + ",";
    document.getElementById('finalMessage').textContent = document.getElementById('personalMessage').value;
    
    document.getElementById('resultArea').classList.remove('hidden');
    document.getElementById('cardGeneratorForm').classList.add('hidden');
    
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ['#d4af37', '#8b0000', '#ffffff'] });
});

document.getElementById('saveImgBtn').addEventListener('click', () => {
    html2canvas(document.getElementById('captureZone')).then(canvas => {
        const link = document.createElement('a');
        link.download = 'yilbasi-kartim-2026.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});

document.getElementById('restartBtn').addEventListener('click', () => location.reload());
