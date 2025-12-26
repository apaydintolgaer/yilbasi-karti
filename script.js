// Ana DOM Elementleri
const form = document.getElementById('cardForm');
const previewPanel = document.getElementById('previewPanel');
const loadingAnimation = document.getElementById('loadingAnimation');
const cardDisplay = document.getElementById('cardDisplay');
const actionButtons = document.getElementById('actionButtons');
const formError = document.getElementById('formError');

// Input Elementleri
const recipientInput = document.getElementById('recipientName');
const messageInput = document.getElementById('personalMessage');
const themeInput = document.getElementById('cardTheme');

// Kart Gösterim Elementleri
const displayRecipient = document.getElementById('displayRecipient');
const displayMessage = document.getElementById('displayMessage');
const displayQuote = document.getElementById('displayQuote');

// Butonlar
const downloadBtn = document.getElementById('downloadCard');
const linkedinBtn = document.getElementById('shareLinkedIn');
const newCardBtn = document.getElementById('createNew');
const musicToggle = document.getElementById('musicToggle');
const musicText = document.getElementById('musicText');

// Müzik
const christmasMusic = document.getElementById('christmasMusic');

// Tema Kartları
const themeCards = document.querySelectorAll('.theme-card');

// Uygulama Durumu
let appState = {
    musicPlaying: false,
    hasInteracted: false,
    currentCard: null,
    cardThemes: {
        classic: {
            name: 'Klasik Noel',
            color: '#dc2626',
            bgColor: 'linear-gradient(135deg, #ffffff 0%, #fef2f2 100%)',
            borderColor: '#dc2626',
            quotes: [
                "Yeni yılın size ve sevdiklerinize sağlık, mutluluk ve huzur getirmesi dileğiyle.",
                "2026 yılı tüm hayallerinizin gerçek olduğu bir yıl olsun.",
                "Sevgi, sağlık ve başarı dolu bir yıl geçirmenizi dilerim.",
                "Yeni yıl, yeni umutlar, yeni başlangıçlar getirsin."
            ]
        },
        modern: {
            name: 'Modern',
            color: '#0ea5e9',
            bgColor: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            borderColor: '#0ea5e9',
            quotes: [
                "Modern çağın gerektirdiği hızda, sağlık ve mutlulukla ilerleyin.",
                "2026'da teknoloji ve insanlık bir arada ilerlesin.",
                "Yeni yılda inovasyon ve başarı sizinle olsun.",
                "Geleceğe umutla bakmanız dileğiyle."
            ]
        },
        elegant: {
            name: 'Zarif',
            color: '#7c3aed',
            bgColor: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
            borderColor: '#7c3aed',
            quotes: [
                "Zarafet ve incelikle dolu bir yıl geçirmenizi dilerim.",
                "2026, size güzellikler ve başarılar getirsin.",
                "Yeni yılda her şey en mükemmel şekilde olsun.",
                "İncelik ve zarafetin hiç eksik olmadığı bir yıl dilerim."
            ]
        },
        golden: {
            name: 'Altın',
            color: '#f59e0b',
            bgColor: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)',
            borderColor: '#f59e0b',
            quotes: [
                "Altın gibi parlayan bir yıl geçirmenizi dilerim.",
                "2026, size altın fırsatlar ve başarılar getirsin.",
                "Yeni yılda her gününüz altın değerinde olsun.",
                "Başarı ve mutluluk dolu altın bir yıl dilerim."
            ]
        }
    }
};

// Sayfa Yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    // Müzik ayarlarını yap
    setupMusic();
    
    // Tema seçimini başlat
    setupThemeSelection();
    
    // Event listener'ları ekle
    setupEventListeners();
    
    // İlk input'a odaklan
    recipientInput.focus();
});

// Müzik Sistemi
function setupMusic() {
    christmasMusic.volume = 0.4;
    christmasMusic.loop = true;
    
    // İlk tıklamada müziği başlat
    document.addEventListener('click', () => {
        if (!appState.hasInteracted) {
            appState.hasInteracted = true;
            
            // Müziği başlat
            const playPromise = christmasMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    appState.musicPlaying = true;
                    updateMusicButton();
                    showNotification("🎵 Jingle Bells çalıyor! İyi eğlenceler!");
                }).catch(error => {
                    console.log("Müzik başlatılamadı:", error);
                    appState.musicPlaying = false;
                    updateMusicButton();
                });
            }
        }
    }, { once: true });
    
    // Müzik toggle butonu
    musicToggle.addEventListener('click', toggleMusic);
}

function toggleMusic() {
    if (appState.musicPlaying) {
        christmasMusic.pause();
        appState.musicPlaying = false;
        showNotification("🔇 Müzik durduruldu");
    } else {
        christmasMusic.play().then(() => {
            appState.musicPlaying = true;
            showNotification("🎵 Müzik başlatıldı");
        }).catch(error => {
            console.log("Müzik çalınamadı:", error);
            showNotification("❌ Müzik başlatılamadı");
        });
    }
    updateMusicButton();
}

function updateMusicButton() {
    const icon = musicToggle.querySelector('i');
    if (appState.musicPlaying) {
        icon.className = "fas fa-volume-up";
        musicText.textContent = "Müziği Kapat";
    } else {
        icon.className = "fas fa-volume-mute";
        musicText.textContent = "Müziği Aç";
    }
}

// Tema Seçimi
function setupThemeSelection() {
    // Aktif tema kartını işaretle
    themeCards[0].classList.add('active');
    
    // Tema kartlarına tıklama
    themeCards.forEach(card => {
        card.addEventListener('click', () => {
            // Tüm kartlardan active class'ını kaldır
            themeCards.forEach(c => c.classList.remove('active'));
            
            // Tıklanan karta active class'ını ekle
            card.classList.add('active');
            
            // Input değerini güncelle
            const theme = card.dataset.theme;
            themeInput.value = theme;
        });
    });
}

// Event Listener'lar
function setupEventListeners() {
    // Form gönderimi
    form.addEventListener('submit', handleFormSubmit);
    
    // Kart indirme
    downloadBtn.addEventListener('click', handleDownload);
    
    // LinkedIn paylaşımı
    linkedinBtn.addEventListener('click', handleLinkedInShare);
    
    // Yeni kart oluşturma
    newCardBtn.addEventListener('click', handleNewCard);
    
    // Input değişikliklerini dinle
    recipientInput.addEventListener('input', validateInput);
    messageInput.addEventListener('input', validateInput);
}

// Form Gönderimi
function handleFormSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    // Formu gizle
    form.style.display = 'none';
    
    // Önizleme panelini göster
    previewPanel.style.display = 'block';
    
    // Yükleme animasyonunu göster
    loadingAnimation.style.display = 'block';
    cardDisplay.style.display = 'none';
    actionButtons.style.display = 'none';
    
    // Kart verilerini kaydet
    appState.currentCard = {
        recipient: recipientInput.value.trim(),
        message: messageInput.value.trim(),
        theme: themeInput.value,
        timestamp: new Date().toISOString()
    };
    
    // 1.5 saniye sonra kartı oluştur
    setTimeout(createCard, 1500);
}

// Form Doğrulama
function validateForm() {
    const recipient = recipientInput.value.trim();
    const message = messageInput.value.trim();
    
    let isValid = true;
    let errorMessage = "";
    
    if (recipient.length < 2 || recipient.length > 50) {
        isValid = false;
        errorMessage = "Alıcı adı 2-50 karakter arasında olmalıdır.";
    } else if (message.length < 10 || message.length > 500) {
        isValid = false;
        errorMessage = "Mesaj 10-500 karakter arasında olmalıdır.";
    }
    
    if (!isValid) {
        showFormError(errorMessage);
    } else {
        hideFormError();
    }
    
    return isValid;
}

function validateInput() {
    const recipient = recipientInput.value.trim();
    const message = messageInput.value.trim();
    
    // İnput border rengini güncelle
    if (recipient.length >= 2 && recipient.length <= 50) {
        recipientInput.style.borderColor = '#10b981';
    } else {
        recipientInput.style.borderColor = 'rgba(255, 255, 255, 0.15)';
    }
    
    if (message.length >= 10 && message.length <= 500) {
        messageInput.style.borderColor = '#10b981';
    } else {
        messageInput.style.borderColor = 'rgba(255, 255, 255, 0.15)';
    }
}

// Hata Mesajları
function showFormError(message) {
    formError.querySelector('span').textContent = message;
    formError.style.display = 'flex';
    
    // 3 saniye sonra gizle
    setTimeout(() => {
        formError.style.display = 'none';
    }, 3000);
}

function hideFormError() {
    formError.style.display = 'none';
}

// Kart Oluşturma
function createCard() {
    const data = appState.currentCard;
    const theme = appState.cardThemes[data.theme];
    
    // Kart içeriğini güncelle
    displayRecipient.textContent = data.recipient + ",";
    displayMessage.textContent = data.message;
    
    // Rastgele bir alıntı seç
    const randomIndex = Math.floor(Math.random() * theme.quotes.length);
    displayQuote.textContent = theme.quotes[randomIndex];
    
    // Kart stilini uygula
    const card = document.getElementById('christmasCard');
    card.style.background = theme.bgColor;
    card.style.border = `2px solid ${theme.borderColor}`;
    
    // Kart başlık rengini güncelle
    const cardTitle = card.querySelector('.card-title');
    cardTitle.style.color = theme.color;
    
    // Alıntı alanı border rengini güncelle
    const quoteArea = card.querySelector('.quote-area');
    quoteArea.style.borderLeftColor = theme.color;
    
    // Alıntı ikon rengini güncelle
    const quoteIcons = card.querySelectorAll('.quote-icon');
    quoteIcons.forEach(icon => {
        icon.style.color = theme.color;
    });
    
    // Yükleme animasyonunu gizle, kartı göster
    loadingAnimation.style.display = 'none';
    cardDisplay.style.display = 'block';
    actionButtons.style.display = 'flex';
    
    // Konfeti efekti
    launchConfetti();
    
    // Bildirim göster
    showNotification("🎉 Kartınız başarıyla oluşturuldu!");
}

// Konfeti Efekti
function launchConfetti() {
    const colors = ['#dc2626', '#0ea5e9', '#7c3aed', '#f59e0b', '#10b981'];
    
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: colors
    });
    
    setTimeout(() => {
        confetti({
            particleCount: 100,
            angle: 60,
            spread: 80,
            origin: { x: 0 },
            colors: colors
        });
        
        confetti({
            particleCount: 100,
            angle: 120,
            spread: 80,
            origin: { x: 1 },
            colors: colors
        });
    }, 250);
}

// Kart İndirme
function handleDownload() {
    const card = document.getElementById('christmasCard');
    
    html2canvas(card, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
        logging: false,
        allowTaint: true
    }).then(canvas => {
        const link = document.createElement('a');
        const timestamp = new Date().getTime();
        link.download = `yilbasi-karti-2026-${timestamp}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        showNotification("✅ Kartınız başarıyla indirildi!");
    }).catch(error => {
        console.error("İndirme hatası:", error);
        showNotification("❌ İndirme sırasında bir hata oluştu");
    });
}

// LinkedIn Paylaşımı
function handleLinkedInShare() {
    const data = appState.currentCard;
    
    if (!data) return;
    
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(`2026 Yılbaşı Kartım: ${data.recipient}`);
    const summary = encodeURIComponent(`${data.message}\n\n${data.recipient} için hazırladığım özel yılbaşı kartı. Siz de kendi kartınızı oluşturmak ister misiniz?`);
    
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`;
    
    window.open(linkedinUrl, '_blank', 'width=600,height=600');
    
    showNotification("🔗 LinkedIn paylaşım sayfası açılıyor...");
}

// Yeni Kart Oluşturma
function handleNewCard() {
    // Önizleme panelini gizle
    previewPanel.style.display = 'none';
    
    // Formu göster
    form.style.display = 'block';
    
    // Formu temizle
    form.reset();
    
    // İlk temayı aktif yap
    themeCards.forEach((card, index) => {
        if (index === 0) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
    
    // Input border rengini sıfırla
    recipientInput.style.borderColor = 'rgba(255, 255, 255, 0.15)';
    messageInput.style.borderColor = 'rgba(255, 255, 255, 0.15)';
    
    // İlk input'a odaklan
    recipientInput.focus();
    
    showNotification("🔄 Yeni kart oluşturmaya başlayabilirsiniz!");
}

// Bildirim Sistemi
function showNotification(message) {
    // Mevcut bir bildirim varsa kaldır
    const existingNotification = document.querySelector('.notification-toast');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Yeni bildirim oluştur
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
        </div>
    `;
    
    // Stil ekle
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(14, 165, 233, 0.4);
        animation: slideIn 0.3s ease-out;
        font-family: 'Montserrat', sans-serif;
        font-weight: 500;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // 3 saniye sonra kaldır
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
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

// Sayfa Görünürlüğü Değiştiğinde Müziği Kontrol Et
document.addEventListener('visibilitychange', () => {
    if (document.hidden && appState.musicPlaying) {
        christmasMusic.pause();
    } else if (!document.hidden && appState.musicPlaying) {
        christmasMusic.play().catch(console.error);
    }
});

// Çevrimdışı Destek
window.addEventListener('online', () => {
    showNotification("🌐 İnternet bağlantınız geri geldi.");
});

window.addEventListener('offline', () => {
    showNotification("⚠️ İnternet bağlantınız kesildi.");
});

// PWA için Service Worker (isteğe bağlı)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(error => {
            console.log('Service Worker kaydı başarısız:', error);
        });
    });
}