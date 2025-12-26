class WinterApp {
    constructor() {
        // Element Seçimleri
        this.dom = {
            intro: document.getElementById('intro-layer'),
            startBtn: document.getElementById('start-btn'),
            app: document.querySelector('.app-container'),
            audio: document.getElementById('bg-music'),
            muteBtn: document.getElementById('mute-toggle'),
            form: document.getElementById('card-form'),
            creator: document.getElementById('creator-mode'),
            result: document.getElementById('result-mode'),
            santaLayer: document.getElementById('santa-layer')
        };

        this.isMuted = false;
        this.santaActive = false;
        
        this.init();
    }

    init() {
        // Event Listeners
        this.dom.startBtn.addEventListener('click', () => this.startExperience());
        this.dom.muteBtn.addEventListener('click', () => this.toggleAudio());
        this.dom.form.addEventListener('submit', (e) => this.generateCard(e));
        
        // Kar Yağışını Başlat
        new SnowEffect('snow-canvas');
        
        // PNG İndirme ve Reset butonları
        document.getElementById('download-btn').addEventListener('click', () => this.downloadCard());
        document.getElementById('new-btn').addEventListener('click', () => location.reload());
    }

    startExperience() {
        // Giriş Ekranını Kaldır
        this.dom.intro.style.opacity = '0';
        setTimeout(() => {
            this.dom.intro.style.display = 'none';
            this.dom.app.classList.remove('hidden-ui');
        }, 800);

        // Müzik Başlat (Hata yönetimi ile)
        this.dom.audio.volume = 0.5;
        this.dom.audio.play().catch(err => console.log("Otomatik oynatma engellendi:", err));

        // Noel Baba'yı Uçur
        this.startSantaAnimation();
    }

    toggleAudio() {
        if (this.isMuted) {
            this.dom.audio.muted = false;
            this.dom.muteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        } else {
            this.dom.audio.muted = true;
            this.dom.muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        }
        this.isMuted = !this.isMuted;
    }

    startSantaAnimation() {
        const santa = document.createElement('img');
        // Temiz, yüksek kaliteli şeffaf Sticker
        santa.src = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z5eXAzZGd6a3Z5eXAzZGd6a3Z5eXAzZGd6aw/26tOZ42Mg6pbTUPCM/giphy.gif';
        santa.className = 'santa-unit';
        this.dom.santaLayer.appendChild(santa);

        let x = -300;
        let y = 50;
        let time = 0;

        const animate = () => {
            x += 3; // Hız
            time += 0.02;
            y = 80 + Math.sin(time) * 40; // Sinüs dalgası ile yumuşak hareket

            santa.style.transform = `translate(${x}px, ${y}px) rotate(${Math.sin(time)*5}deg)`;

            // Hediye Atma Mantığı (Rastgele)
            if (Math.random() < 0.01 && x > 0 && x < window.innerWidth) {
                this.dropGift(x + 100, y + 100);
            }

            // Ekran dışına çıkınca başa sar
            if (x > window.innerWidth + 100) {
                x = -300;
            }

            requestAnimationFrame(animate);
        };
        animate();
    }

    dropGift(x, y) {
        const gift = document.createElement('div');
        const icons = ['🎁', '🧸', '🍬', '🎄'];
        gift.textContent = icons[Math.floor(Math.random() * icons.length)];
        gift.className = 'gift-item';
        gift.style.left = x + 'px';
        gift.style.top = y + 'px';
        this.dom.santaLayer.appendChild(gift);

        // Animasyon bitince DOM'dan sil (Memory Leak önleme)
        setTimeout(() => gift.remove(), 3000);
    }

    generateCard(e) {
        e.preventDefault();
        const name = document.getElementById('inp-name').value;
        const msg = document.getElementById('inp-msg').value;
        const theme = document.querySelector('input[name="theme"]:checked').value;

        // Kartı Doldur
        document.getElementById('out-name').textContent = `Sevgili ${name},`;
        document.getElementById('out-msg').textContent = msg;
        
        // Temayı Uygula
        const cardFrame = document.getElementById('capture-area');
        cardFrame.className = `card-frame theme-${theme}`;

        // Arayüz Değişimi
        this.dom.creator.style.display = 'none';
        this.dom.result.classList.remove('hidden');

        // Konfeti Patlat
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#d4af37', '#ffffff']
        });
    }

    downloadCard() {
        const btn = document.getElementById('download-btn');
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Hazırlanıyor...';
        
        html2canvas(document.getElementById('capture-area'), {
            scale: 2, // Retina kalitesi
            backgroundColor: null
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'yilbasi-karti-2026.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
            btn.innerHTML = '<i class="fa-solid fa-download"></i> İndir';
        });
    }
}

// Performanslı Kar Efekti (Canvas API)
class SnowEffect {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.initParticles();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    initParticles() {
        const count = window.innerWidth < 600 ? 50 : 150; // Mobil optimizasyonu
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                r: Math.random() * 3 + 1,
                d: Math.random() * count
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        this.ctx.beginPath();
        
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            this.ctx.moveTo(p.x, p.y);
            this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
        }
        this.ctx.fill();
        this.update();
        requestAnimationFrame(() => this.animate());
    }

    update() {
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            p.y += Math.cos(p.d) + 1 + p.r / 2;
            p.x += Math.sin(0) * 2;

            if (p.x > this.canvas.width + 5 || p.x < -5 || p.y > this.canvas.height) {
                this.particles[i] = { 
                    x: Math.random() * this.canvas.width, 
                    y: -10, 
                    r: p.r, 
                    d: p.d 
                };
            }
        }
    }
}

// Uygulamayı Başlat
document.addEventListener('DOMContentLoaded', () => {
    new WinterApp();
});
