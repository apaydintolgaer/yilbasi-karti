const audio = document.getElementById('jingleAudio');
const startBtn = document.getElementById('startBtn');
const overlay = document.getElementById('welcome-overlay');
const uiElements = document.querySelectorAll('.hidden-ui');

// Tarayıcı engelini aşmak için kullanıcı butona bastığında müziği başlat
startBtn.addEventListener('click', () => {
    audio.play().catch(error => console.log("Müzik çalınamadı:", error));
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        uiElements.forEach(el => el.classList.add('show-ui'));
    }, 800);
});

// Noel Baba Fonksiyonu (Düzeltildi)
function createSantaSleigh() {
    const santa = document.createElement('div');
    santa.className = 'santa-sleigh';
    document.querySelector('.santa-container').appendChild(santa);
    
    santa.style.animation = "santaFly 15s linear forwards";
    
    // Her 20 saniyede bir yeni Noel Baba geçsin
    setTimeout(() => {
        santa.remove();
        createSantaSleigh();
    }, 20000);
}

// Kar Taneleri (Performans için optimize edildi)
function createSnowflakes() {
    const container = document.querySelector('.snow-container');
    const flakes = ['❄', '❅', '❆'];
    
    setInterval(() => {
        const flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.textContent = flakes[Math.floor(Math.random() * flakes.length)];
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.fontSize = Math.random() * 1 + 1 + 'em';
        flake.style.opacity = Math.random();
        
        const duration = Math.random() * 5 + 5;
        flake.style.transition = `top ${duration}s linear, left ${duration}s linear`;
        
        container.appendChild(flake);
        
        setTimeout(() => {
            flake.style.top = '110vh';
            flake.style.left = (parseFloat(flake.style.left) + 10) + 'vw';
        }, 10);

        setTimeout(() => flake.remove(), duration * 1000);
    }, 300);
}

// Başlat
createSnowflakes();
setTimeout(createSantaSleigh, 3000);

// Form ve Kart İşlemleri (Mevcut kodunun üzerine devam edebilirsin)
// ... (Buraya senin form submit ve html2canvas kodlarını ekleyebilirsin)
