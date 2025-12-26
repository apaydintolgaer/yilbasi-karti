// DOM Elementleri
const cardForm = document.getElementById('cardForm');
const previewActions = document.getElementById('previewActions');
const cardPreview = document.getElementById('cardPreview');
const snowContainer = document.getElementById('snowContainer');
const notification = document.getElementById('notification');

// Input Elementleri
const recipientInput = document.getElementById('recipientName');
const messageInput = document.getElementById('cardMessage');
const designInput = document.getElementById('cardDesign');

// Önizleme Elementleri
const previewRecipient = document.getElementById('previewRecipient');
const previewMessage = document.getElementById('previewMessage');
const previewSignature = document.getElementById('previewSignature');

// Butonlar
const createBtn = document.getElementById('createBtn');
const downloadBtn = document.getElementById('downloadBtn');
const shareBtn = document.getElementById('shareBtn');
const resetBtn = document.getElementById('resetBtn');

// Tasarım Seçenekleri
const designOptions = document.querySelectorAll('.design-option');

// Kar Efekti
let snowflakes = [];

// Uygulama Durumu
const appState = {
    isCardCreated: false,
    currentDesign: 'classic',
    designs: {
        classic: {
            color: '#e63946',
            bgColor: 'linear-gradient(135deg, #ffffff 0%, #fff5f5 100%)',
            borderColor: '#e63946'
        },
        elegant: {
            color: '#2a9d8f',
            bgColor: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
            borderColor: '#2a9d8f'
        },
        modern: {
            color: '#457b9d',
            bgColor: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            borderColor: '#457b9d'
        },
        golden: {
            color: '#e9c46a',
            bgColor: 'linear-gradient(135deg, #ffffff 0%, #fffaf0 100%)',
            borderColor: '#e9c46a'
        }
    }
};

// Sayfa Yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    // Kar efekti başlat
    initSnowEffect();
    
    // Event listener'ları kur
    setupEventListeners();
    
    // Canlı önizleme için input'ları dinle
    setupLivePreview();
    
    // İlk önizlemeyi güncelle
    updatePreview();
    
    // Başlangıç mesajı
    setTimeout(() => {
        showNotification('🎄 Hoş geldin! Yılbaşı kartını hazırlamaya başla.');
    }, 1000);
});

// Kar Efekti Başlatma
function initSnowEffect() {
    // Mevcut kar tanelerini temizle
    snowContainer.innerHTML = '';
    snowflakes = [];
    
    // Yeni kar taneleri oluştur
    for (let i = 0; i < 80; i++) {
        createSnowflake();
    }
    
    // Kar animasyonunu başlat
    animateSnow();
}

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.innerHTML = '❄';
    
    const size = Math.random() * 20 + 10;
    const startX = Math.random() * 100;
    const speed = Math.random() * 2 + 1;
    const opacity = Math.random() * 0.5 + 0.3;
    
    snowflake.style.cssText = `
        left: ${startX}vw;
        font-size: ${size}px;
        opacity: ${opacity};
        animation-duration: ${Math.random() * 10 + 10}s;
        animation-delay: ${Math.random() * 5}s;
    `;
    
    snowContainer.appendChild(snowflake);
    snowflakes.push({
        element: snowflake,
        x: startX,
        y: -50,
        speed: speed,
        wind: Math.random() * 0.5 - 0.25,
        size: size
    });
}

function animateSnow() {
    snowflakes.forEach(flake => {
        flake.y += flake.speed;
        flake.x += flake.wind;
        
        // Ekran dışına çıkarsa resetle
        if (flake.y > 100) {
            flake.y = -10;
            flake.x = Math.random() * 100;
        }
        
        // Yatayda ekran dışına çıkarsa
        if (flake.x > 100) flake.x = 0;
        if (flake.x < 0) flake.x = 100;
        
        flake.element.style.transform = `translate(${flake.x}vw, ${flake.y}vh)`;
    });
    
    requestAnimationFrame(animateSnow);
}

// Event Listener'ları Kurma
function setupEventListeners() {
    // Form gönderimi
    cardForm.addEventListener('submit', handleFormSubmit);
    
    // Tasarım seçimi
    designOptions.forEach(option => {
        option.addEventListener('click', () => {
            designOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            appState.currentDesign = option.dataset.design;
            designInput.value = appState.currentDesign;
            updatePreview();
        });
    });
    
    // İndirme butonu
    downloadBtn.addEventListener('click', downloadCard);
    
    // Paylaş butonu
    shareBtn.addEventListener('click', shareCard);
    
    // Sıfırlama butonu
    resetBtn.addEventListener('click', resetForm);
}

// Canlı Önizleme
function setupLivePreview() {
    recipientInput.addEventListener('input', updatePreview);
    messageInput.addEventListener('input', updatePreview);
}

function updatePreview() {
    const recipient = recipientInput.value.trim() || 'Sevgili Ailem,';
    const message = messageInput.value.trim() || 'Yeni yılın size sağlık, mutluluk ve başarı getirmesini dilerim';
    const design = appState.designs[appState.currentDesign];
    
    // Önizlemeyi güncelle
    previewRecipient.textContent = recipient + (recipient.endsWith(',') ? '' : ',');
    previewMessage.textContent = message;
    previewSignature.textContent = 'Sevgilerimle';
    
    // Tasarımı güncelle
    cardPreview.style.background = design.bgColor;
    cardPreview.style.borderColor = design.borderColor;
    
    const title = cardPreview.querySelector('.card-title');
    title.style.color = design.color;
    
    const signature = cardPreview.querySelector('.signature-preview');
    signature.style.color = design.color;
    
    const year = cardPreview.querySelector('.year');
    year.style.color = design.borderColor;
}

// Form Gönderimi
function handleFormSubmit(e) {
    e.preventDefault();
    
    const recipient = recipientInput.value.trim();
    const message = messageInput.value.trim();
    
    if (!recipient || !message) {
        showNotification('⚠️ Lütfen tüm alanları doldurun.');
        return;
    }
    
    // Önizlemeyi güncelle
    updatePreview();
    
    // Aksiyon butonlarını göster
    previewActions.style.display = 'flex';
    appState.isCardCreated = true;
    
    // Konfeti efekti
    createConfetti();
    
    // Başarı mesajı
    showNotification('🎉 Kartın hazır! İndirebilir veya paylaşabilirsin.');
}

// Kart İndirme
function downloadCard() {
    if (!appState.isCardCreated) {
        showNotification('⚠️ Önce bir kart oluşturmalısın.');
        return;
    }
    
    // Butonu loading durumuna getir
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<span>⏳</span> Hazırlanıyor...';
    downloadBtn.disabled = true;
    
    // Kartı yakala ve indir
    html2canvas(cardPreview, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
        allowTaint: true
    }).then(canvas => {
        const link = document.createElement('a');
        const timestamp = new Date().toISOString().slice(0, 10);
        link.download = `yilbasi-karti-${timestamp}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        // Butonu eski haline getir
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
        
        showNotification('✅ Kartın başarıyla indirildi!');
    }).catch(error => {
        console.error('İndirme hatası:', error);
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
        showNotification('❌ İndirme sırasında bir hata oluştu.');
    });
}

// Kart Paylaşma
function shareCard() {
    if (!appState.isCardCreated) {
        showNotification('⚠️ Önce bir kart oluşturmalısın.');
        return;
    }
    
    const recipient = recipientInput.value.trim();
    const message = messageInput.value.trim();
    const shareText = `${recipient} için hazırladığım yılbaşı kartı:\n\n"${message}"\n\nSen de kendi kartını oluşturmak ister misin? ${window.location.href}`;
    
    // Modern tarayıcı paylaşım API'si
    if (navigator.share) {
        navigator.share({
            title: 'Yılbaşı Kartım',
            text: shareText,
            url: window.location.href
        }).then(() => {
            showNotification('✨ Paylaşıldı!');
        }).catch(err => {
            if (err.name !== 'AbortError') {
                copyToClipboard(shareText);
            }
        });
    } else {
        // Fallback: panoya kopyala
        copyToClipboard(shareText);
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('📋 Link panoya kopyalandı!');
    }).catch(err => {
        // Fallback metodu
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('📋 Link kopyalandı!');
    });
}

// Formu Sıfırlama
function resetForm() {
    // Formu temizle
    cardForm.reset();
    
    // Önizlemeyi sıfırla
    recipientInput.value = '';
    messageInput.value = '';
    appState.currentDesign = 'classic';
    designInput.value = 'classic';
    
    // Tasarım seçeneklerini sıfırla
    designOptions.forEach((option, index) => {
        option.classList.toggle('active', index === 0);
    });
    
    // Önizlemeyi güncelle
    updatePreview();
    
    // Aksiyon butonlarını gizle
    previewActions.style.display = 'none';
    appState.isCardCreated = false;
    
    showNotification('🔄 Yeni kart oluşturmaya hazırsın!');
}

// Konfeti Efekti
function createConfetti() {
    const colors = ['#e63946', '#2a9d8f', '#457b9d', '#e9c46a', '#f4a261'];
    const icons = ['🎄', '✨', '🎁', '⭐', '🎉', '🔔', '🦌'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.innerHTML = icons[Math.floor(Math.random() * icons.length)];
            confetti.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}vw;
                top: -50px;
                font-size: ${Math.random() * 20 + 15}px;
                color: ${colors[Math.floor(Math.random() * colors.length)]};
                z-index: 1000;
                pointer-events: none;
                opacity: 0.9;
                animation: confettiFall ${Math.random() * 3 + 2}s ease-out forwards;
                transform: rotate(${Math.random() * 360}deg);
            `;
            
            document.body.appendChild(confetti);
            
            // Animasyon bittikten sonra sil
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, 5000);
        }, i * 50);
    }
    
    // CSS animasyonu ekle
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Bildirim Sistemi
function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Responsive Güncellemeler
function updateResponsive() {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        // Mobil için optimizasyonlar
        snowflakes.forEach(flake => {
            flake.element.style.fontSize = `${flake.size * 0.7}px`;
        });
    }
}

// Window resize event'i
window.addEventListener('resize', updateResponsive);

// İlk responsive güncelleme
updateResponsive();