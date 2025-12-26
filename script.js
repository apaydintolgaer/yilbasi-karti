// Kar efekti oluştur
function createSnow() {
    const snowContainer = document.getElementById('snow');
    const snowflakes = ['❄', '❅', '❆', '✨'];
    
    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.innerHTML = snowflakes[Math.floor(Math.random() * snowflakes.length)];
        snowflake.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}vw;
            top: -50px;
            font-size: ${Math.random() * 20 + 15}px;
            color: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3});
            opacity: 0.8;
            animation: snowFall ${Math.random() * 5 + 5}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            pointer-events: none;
        `;
        snowContainer.appendChild(snowflake);
    }
    
    // CSS animasyonu ekle
    const style = document.createElement('style');
    style.textContent = `
        @keyframes snowFall {
            to {
                transform: translateY(100vh) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// DOM yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    // Kar efektini başlat
    createSnow();
    
    // Elementleri seç
    const form = document.getElementById('cardForm');
    const cardPreview = document.getElementById('cardPreview');
    const actions = document.getElementById('actions');
    const themeButtons = document.querySelectorAll('.theme-btn');
    const downloadBtn = document.getElementById('downloadBtn');
    const shareBtn = document.getElementById('shareBtn');
    const newBtn = document.getElementById('newBtn');
    
    // Tema değiştirme
    let currentTheme = 'red';
    
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            themeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentTheme = this.dataset.theme;
            
            // Kart temasını güncelle
            cardPreview.className = 'card ' + currentTheme;
        });
    });
    
    // Form gönderimi
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Değerleri al
        const to = document.getElementById('to').value.trim();
        const message = document.getElementById('message').value.trim();
        const from = document.getElementById('from').value.trim() || 'Sevgilerimle...';
        
        // Validasyon
        if (!to || !message) {
            alert('Lütfen "Kime" ve "Mesaj" alanlarını doldurun!');
            return;
        }
        
        // Önizlemeyi güncelle
        document.getElementById('previewTo').textContent = to + ',';
        document.getElementById('previewMessage').textContent = message;
        document.getElementById('previewFrom').textContent = from;
        
        // Butonları göster
        actions.style.display = 'flex';
        
        // Konfeti efekti
        showConfetti();
        
        // Bildirim
        showMessage('🎉 Kartın hazır!');
    });
    
    // Kartı indir
    downloadBtn.addEventListener('click', function() {
        html2canvas(cardPreview, {
            scale: 2,
            backgroundColor: null,
            useCORS: true
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = `yilbasi-karti-${Date.now()}.png`;
            link.href = canvas.toDataURL();
            link.click();
            showMessage('✅ Kart indirildi!');
        });
    });
    
    // Paylaş butonu
    shareBtn.addEventListener('click', function() {
        const to = document.getElementById('to').value.trim();
        const message = document.getElementById('message').value.trim();
        
        const shareText = `${to} için yılbaşı kartım:\n"${message}"\n\nSen de kendi kartını oluştur: ${window.location.href}`;
        
        // Web Share API dene
        if (navigator.share) {
            navigator.share({
                title: 'Yılbaşı Kartım',
                text: shareText,
                url: window.location.href
            });
        } else {
            // Panoya kopyala
            navigator.clipboard.writeText(shareText).then(() => {
                showMessage('📋 Kopyalandı! Mesajı paylaşabilirsin.');
            });
        }
    });
    
    // Yeni kart butonu
    newBtn.addEventListener('click', function() {
        form.reset();
        document.getElementById('previewTo').textContent = 'Sevgili Ailem,';
        document.getElementById('previewMessage').textContent = 'Mutlu yıllar dilerim! 🎉';
        document.getElementById('previewFrom').textContent = 'Sevgilerimle...';
        actions.style.display = 'none';
        showMessage('🔄 Yeni kart hazır!');
    });
    
    // Canlı güncelleme (opsiyonel)
    document.getElementById('to').addEventListener('input', updatePreview);
    document.getElementById('message').addEventListener('input', updatePreview);
    document.getElementById('from').addEventListener('input', updatePreview);
    
    function updatePreview() {
        const to = document.getElementById('to').value.trim();
        const message = document.getElementById('message').value.trim();
        const from = document.getElementById('from').value.trim() || 'Sevgilerimle...';
        
        if (to) document.getElementById('previewTo').textContent = to + ',';
        if (message) document.getElementById('previewMessage').textContent = message;
        if (from) document.getElementById('previewFrom').textContent = from;
    }
    
    // Konfeti efekti
    function showConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#ffd166', '#3498db'];
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.innerHTML = ['🎉', '✨', '🎄', '🎁'][Math.floor(Math.random() * 4)];
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
                
                setTimeout(() => confetti.remove(), 3000);
            }, i * 100);
        }
        
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
    
    // Mesaj göster
    function showMessage(text) {
        const message = document.createElement('div');
        message.textContent = text;
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 1000;
            border-left: 4px solid #4ecdc4;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => message.remove(), 300);
        }, 3000);
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
});