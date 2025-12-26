// Kar efekti için canvas ayarları
const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');

// Canvas boyutunu ayarla
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Kar taneleri dizisi
const snowflakes = [];
const snowflakeCount = 150;

// Kar tanesi sınıfı
class Snowflake {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.speed = Math.random() * 2 + 0.5;
        this.wind = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.3;
    }
    
    update() {
        this.y += this.speed;
        this.x += this.wind;
        
        // Kar tanesi ekranın dışına çıkarsa yukarıdan tekrar başlat
        if (this.y > canvas.height) {
            this.y = -10;
            this.x = Math.random() * canvas.width;
        }
        
        // Yatayda ekran dışına çıkarsa diğer taraftan devam et
        if (this.x > canvas.width) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = canvas.width;
        }
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    }
}

// Kar tanelerini oluştur
for (let i = 0; i < snowflakeCount; i++) {
    snowflakes.push(new Snowflake());
}

// Kar animasyonu
function animateSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    snowflakes.forEach(snowflake => {
        snowflake.update();
        snowflake.draw();
    });
    
    requestAnimationFrame(animateSnow);
}

// Kar animasyonunu başlat
animateSnow();

// DOM Elementleri
const form = document.getElementById('cardForm');
const loading = document.getElementById('loading');
const card = document.getElementById('card');
const actions = document.getElementById('actions');
const previewTo = document.getElementById('previewTo');
const previewMessage = document.getElementById('previewMessage');
const previewFrom = document.getElementById('previewFrom');
const downloadBtn = document.getElementById('downloadBtn');
const shareBtn = document.getElementById('shareBtn');
const newBtn = document.getElementById('newBtn');
const themeButtons = document.querySelectorAll('.theme-btn');

// Tema butonları
let selectedTheme = 'classic';

themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        themeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        selectedTheme = button.dataset.theme;
        updateCardTheme();
    });
});

// Tema değişikliğini uygula
function updateCardTheme() {
    const cardElement = document.querySelector('.card');
    cardElement.className = 'card';
    cardElement.classList.add(selectedTheme);
    
    // Temaya göre renk değişiklikleri
    switch(selectedTheme) {
        case 'classic':
            cardElement.style.borderColor = '#4ecdc4';
            break;
        case 'elegant':
            cardElement.style.borderColor = '#ffd166';
            break;
        case 'modern':
            cardElement.style.borderColor = '#a8d8ff';
            break;
        case 'gold':
            cardElement.style.borderColor = '#ffb347';
            break;
    }
}

// Form gönderimi
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const toName = document.getElementById('toName').value.trim();
    const message = document.getElementById('message').value.trim();
    const fromName = document.getElementById('fromName').value.trim();
    
    // Validasyon
    if (!toName || !message) {
        alert('Lütfen "Kime" ve "Mesaj" alanlarını doldurun.');
        return;
    }
    
    // Yükleme göster
    loading.style.display = 'flex';
    card.style.display = 'none';
    actions.style.display = 'none';
    
    // 1.5 saniye sonra kartı göster
    setTimeout(() => {
        // Kart içeriğini güncelle
        previewTo.textContent = toName + ',';
        previewMessage.textContent = message;
        previewFrom.textContent = fromName || 'Sevgilerimle';
        
        // Kartı göster
        loading.style.display = 'none';
        card.style.display = 'flex';
        actions.style.display = 'flex';
        
        // Konfeti efekti
        launchConfetti();
        
        // Başarı mesajı
        showMessage('🎉 Kartın hazır! Şimdi indirebilir veya paylaşabilirsin.');
    }, 1500);
});

// Konfeti efekti
function launchConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#ffd166', '#a8d8ff'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.innerHTML = ['❄', '✨', '🎄', '🎁'][Math.floor(Math.random() * 4)];
            confetti.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}vw;
                top: -50px;
                font-size: ${Math.random() * 20 + 15}px;
                color: ${colors[Math.floor(Math.random() * colors.length)]};
                z-index: 1000;
                pointer-events: none;
                animation: confettiFall ${Math.random() * 2 + 2}s linear forwards;
            `;
            
            document.body.appendChild(confetti);
            
            // Animasyon bittikten sonra sil
            setTimeout(() => confetti.remove(), 3000);
        }, i * 30);
    }
    
    // CSS animasyonu ekle
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Kart indirme
downloadBtn.addEventListener('click', () => {
    const cardElement = document.querySelector('.card');
    const originalDisplay = cardElement.style.display;
    
    // Geçici olarak kartı daha büyük göster
    cardElement.style.transform = 'scale(1.05)';
    cardElement.style.transition = 'transform 0.3s ease';
    
    setTimeout(() => {
        // Canvas kullanarak görüntüyü oluştur
        html2canvas(cardElement, {
            scale: 2,
            backgroundColor: null,
            useCORS: true
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = `yilbasi-karti-${Date.now()}.png`;
            link.href = canvas.toDataURL();
            link.click();
            
            // Orjinal boyuta dön
            cardElement.style.transform = 'scale(1)';
            cardElement.style.display = originalDisplay;
            
            showMessage('✅ Kartın indirildi!');
        }).catch(error => {
            console.error('İndirme hatası:', error);
            showMessage('❌ İndirme sırasında hata oluştu.');
            cardElement.style.transform = 'scale(1)';
        });
    }, 300);
});

// Paylaş butonu
shareBtn.addEventListener('click', () => {
    const toName = document.getElementById('toName').value.trim();
    const message = document.getElementById('message').value.trim();
    
    const shareText = `${toName} için hazırladığım yılbaşı kartı:\n\n"${message}"\n\nSen de kendi kartını oluşturmak ister misin?`;
    
    if (navigator.share) {
        // Web Share API destekliyorsa
        navigator.share({
            title: 'Yılbaşı Kartım',
            text: shareText,
            url: window.location.href
        }).then(() => {
            showMessage('✨ Paylaşıldı!');
        }).catch(error => {
            console.log('Paylaşım iptal edildi:', error);
        });
    } else {
        // Web Share API desteklemiyorsa
        navigator.clipboard.writeText(`${shareText}\n\n${window.location.href}`).then(() => {
            showMessage('📋 Link panoya kopyalandı!');
        }).catch(err => {
            // Fallback
            const textArea = document.createElement('textarea');
            textArea.value = `${shareText}\n\n${window.location.href}`;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showMessage('📋 Link kopyalandı!');
        });
    }
});

// Yeni kart butonu
newBtn.addEventListener('click', () => {
    // Formu temizle
    form.reset();
    
    // Kart önizlemesini sıfırla
    previewTo.textContent = 'Sevgili Ailem,';
    previewMessage.textContent = 'Yeni yılın sağlık, mutluluk ve başarı getirmesi dileğiyle...';
    previewFrom.textContent = 'Sevgilerimle';
    
    // Kart görünümünü sıfırla
    loading.style.display = 'flex';
    card.style.display = 'none';
    actions.style.display = 'none';
    
    // Temayı sıfırla
    themeButtons.forEach((btn, index) => {
        btn.classList.toggle('active', index === 0);
    });
    selectedTheme = 'classic';
    updateCardTheme();
    
    showMessage('🔄 Yeni kart oluşturmaya hazırsın!');
});

// Mesaj göster
function showMessage(text) {
    // Mevcut mesajı temizle
    const existingMessage = document.querySelector('.message-toast');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Yeni mesaj oluştur
    const message = document.createElement('div');
    message.className = 'message-toast';
    message.textContent = text;
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-family: 'Inter', sans-serif;
        border-left: 4px solid #4ecdc4;
        max-width: 300px;
    `;
    
    document.body.appendChild(message);
    
    // 3 saniye sonra sil
    setTimeout(() => {
        message.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => message.remove(), 300);
    }, 3000);
    
    // Animasyon stilleri
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    // İlk temayı uygula
    updateCardTheme();
    
    // İlk mesajı göster
    setTimeout(() => {
        showMessage('🎄 Hoş geldin! Yeni yıl için kartını hazırla.');
    }, 1000);
});

// Sayfa kapanırken animasyonları temizle
window.addEventListener('beforeunload', () => {
    // CSS animasyonlarını temizle
    const styles = document.querySelectorAll('style[data-animation]');
    styles.forEach(style => style.remove());
});