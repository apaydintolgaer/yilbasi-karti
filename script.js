// DOM Elementleri
const cardForm = document.getElementById('cardForm');
const cardPreview = document.getElementById('cardPreview');
const previewLoading = cardPreview.querySelector('.preview-loading');
const cardContainer = cardPreview.querySelector('.card-container');
const previewActions = cardPreview.querySelector('.preview-actions');

// Input Elementleri
const recipientNameInput = document.getElementById('recipientName');
const cardMessageInput = document.getElementById('cardMessage');
const cardThemeInput = document.getElementById('cardTheme');
const cardStyleSelect = document.getElementById('cardStyle');

// Önizleme Elementleri
const previewRecipient = document.getElementById('previewRecipient');
const previewMessage = document.getElementById('previewMessage');
const previewQuote = document.getElementById('previewQuote');

// Butonlar
const downloadBtn = document.getElementById('downloadCard');
const linkedinBtn = document.getElementById('shareLinkedIn');
const twitterBtn = document.getElementById('shareTwitter');
const copyLinkBtn = document.getElementById('copyLink');
const newCardBtn = document.getElementById('newCard');
const sendEmailBtn = document.getElementById('sendEmail');

// Müzik Kontrol
const backgroundMusic = document.getElementById('backgroundMusic');
const musicBtn = document.getElementById('musicBtn');
const musicText = musicBtn.querySelector('.music-text');

// Bildirim
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');

// Tema Butonları
const themeOptions = document.querySelectorAll('.theme-option');

// Hata Mesajı
const formError = document.getElementById('formError');

// Uygulama Durumu
let appState = {
    musicEnabled: false,
    cardCreated: false,
    currentCardData: null,
    firstInteraction: false
};

// Temalar ve Mesajlar
const themes = {
    warm: {
        name: "Sıcak Dilekler",
        icon: "🔥",
        messages: [
            "Yeni yılın sana ve sevdiklerine sağlık, huzur ve mutluluk getirmesi dileğiyle... 🌟",
            "2026 yılı tüm hayallerinin gerçek olacağı bir yıl olsun! ✨",
            "Sevgi dolu bir yıl geçirmeni dilerim. Kalbinde hep umut olsun. ❤️",
            "Yeni yıl, yeni başlangıçlar, yeni mutluluklar getirsin. 🕊️"
        ],
        colors: {
            primary: "#ef4444",
            secondary: "#f97316",
            accent: "#f59e0b"
        }
    },
    funny: {
        name: "Eğlenceli",
        icon: "😄",
        messages: [
            "2026'da bol bol kahkaha, az az hata! Kahkahaların hiç bitmesin! 😂",
            "Yeni yılda her şey istediğin gibi olsun, hatta daha iyisi! 🍀",
            "2026: Daha çok eğlence, daha az stres! Haydi partiii! 🎉",
            "Yeni yılda tüm dileklerin gerçek olsun, hatta bonus olarak birkaç tane daha! 🎁"
        ],
        colors: {
            primary: "#3b82f6",
            secondary: "#8b5cf6",
            accent: "#10b981"
        }
    },
    tech: {
        name: "Teknoloji",
        icon: "💻",
        messages: [
            "2026'da tüm kodların compile olsun, deploy'ların sorunsuz geçsin! 🚀",
            "Yeni yılda bug'sız bir hayat dilerim! Debug sürelerin kısalsın! 🐛➡️✨",
            "Tüm projelerin başarıya ulaşsın, commit'lerin clean olsun! 💾",
            "2026: Daha hızlı internet, daha güçlü bilgisayarlar ve daha başarılı projeler! ⚡"
        ],
        colors: {
            primary: "#6366f1",
            secondary: "#8b5cf6",
            accent: "#06b6d4"
        }
    },
    party: {
        name: "Parti",
        icon: "🎉",
        messages: [
            "2026 partilerle, eğlenceyle, danslarla dolsun! 🕺💃",
            "Yeni yılda bol bol kutlama, az az uyku! Eğlence hiç bitmesin! 🥳",
            "2026'da her gün bir parti olsun, her an bir kutlama! 🎊",
            "Dans et, şarkı söyle, eğlen! Yeni yılın rengarenk geçsin! 🌈"
        ],
        colors: {
            primary: "#ec4899",
            secondary: "#8b5cf6",
            accent: "#f59e0b"
        }
    }
};

// Kart Stilleri
const cardStyles = {
    classic: {
        background: "linear-gradient(135deg, #ffffff 0%, #fef2f2 100%)",
        border: "2px solid #dc2626",
        fontFamily: "'Playfair Display', serif"
    },
    modern: {
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        border: "2px solid #475569",
        fontFamily: "'Poppins', sans-serif"
    },
    elegant: {
        background: "linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)",
        border: "2px solid #d97706",
        fontFamily: "'Georgia', serif"
    },
    colorful: {
        background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
        border: "2px solid #0ea5e9",
        fontFamily: "'Poppins', sans-serif"
    }
};

// Müzik Kontrolü
function initializeMusic() {
    backgroundMusic.volume = 0.3;
    backgroundMusic.loop = true;
    
    // İlk tıklamada müziği başlat
    document.addEventListener('click', function initMusic() {
        if (!appState.firstInteraction) {
            appState.firstInteraction = true;
            backgroundMusic.play().then(() => {
                appState.musicEnabled = true;
                updateMusicButton();
                showNotification("🎵 Müzik başlatıldı! Keyfini çıkar!");
            }).catch(error => {
                console.log("Müzik çalınamadı:", error);
            });
            document.removeEventListener('click', initMusic);
        }
    }, { once: true });
    
    // Müzik butonuna tıklama
    musicBtn.addEventListener('click', toggleMusic);
}

function toggleMusic() {
    if (appState.musicEnabled) {
        backgroundMusic.pause();
        appState.musicEnabled = false;
        showNotification("🔇 Müzik durduruldu");
    } else {
        backgroundMusic.play().then(() => {
            appState.musicEnabled = true;
            showNotification("🎵 Müzik başlatıldı");
        }).catch(error => {
            console.log("Müzik çalınamadı:", error);
            showNotification("❌ Müzik başlatılamadı");
        });
    }
    updateMusicButton();
}

function updateMusicButton() {
    const icon = musicBtn.querySelector('i');
    if (appState.musicEnabled) {
        icon.className = "fas fa-volume-up";
        musicText.textContent = "Müziği Kapat";
    } else {
        icon.className = "fas fa-volume-mute";
        musicText.textContent = "Müziği Aç";
    }
}

// Tema Seçimi
function initializeThemeSelection() {
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.dataset.theme;
            
            // Aktif temayı güncelle
            themeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            cardThemeInput.value = theme;
        });
    });
}

// Form Doğrulama
function validateForm() {
    const name = recipientNameInput.value.trim();
    const message = cardMessageInput.value.trim();
    
    let isValid = true;
    
    if (name.length < 3) {
        showError("İsim en az 3 karakter olmalıdır");
        isValid = false;
    }
    
    if (message.length < 10) {
        showError("Mesaj en az 10 karakter olmalıdır");
        isValid = false;
    }
    
    return isValid;
}

function showError(message) {
    formError.querySelector('span').textContent = message;
    formError.style.display = 'flex';
    
    setTimeout(() => {
        formError.style.display = 'none';
    }, 3000);
}

// Kart Oluşturma
cardForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    // Formu gizle, önizlemeyi göster
    cardForm.style.display = 'none';
    cardPreview.style.display = 'block';
    previewLoading.style.display = 'block';
    cardContainer.style.display = 'none';
    previewActions.style.display = 'none';
    
    // Kart verilerini kaydet
    appState.currentCardData = {
        recipient: recipientNameInput.value.trim(),
        message: cardMessageInput.value.trim(),
        theme: cardThemeInput.value,
        style: cardStyleSelect.value,
        timestamp: new Date().toISOString()
    };
    
    // 1.5 saniye bekleyip kartı oluştur
    setTimeout(createCard, 1500);
});

function createCard() {
    const data = appState.currentCardData;
    const theme = themes[data.theme];
    const style = cardStyles[data.style];
    
    // Alıcı adını güncelle
    previewRecipient.textContent = data.recipient + ",";
    
    // Mesajı güncelle
    previewMessage.textContent = data.message;
    
    // Rastgele bir alıntı seç
    const randomQuote = theme.messages[Math.floor(Math.random() * theme.messages.length)];
    previewQuote.textContent = randomQuote;
    
    // Kart stilini uygula
    const card = document.getElementById('generatedCard');
    card.style.background = style.background;
    card.style.border = style.border;
    card.style.fontFamily = style.fontFamily;
    
    // Kart başlığını güncelle
    const cardTitle = card.querySelector('.card-title');
    cardTitle.textContent = `Mutlu Yıllar 2026 ${theme.icon}`;
    
    // Dekorasyon ikonlarını tema rengine göre güncelle
    const decorationIcons = card.querySelectorAll('.decoration-icons span');
    decorationIcons.forEach((icon, index) => {
        icon.style.setProperty('--i', index);
        icon.style.color = theme.colors.primary;
    });
    
    // Yükleme ekranını gizle, kartı göster
    previewLoading.style.display = 'none';
    cardContainer.style.display = 'block';
    previewActions.style.display = 'block';
    
    // Konfeti efekti
    launchConfetti();
    
    // Bildirim göster
    showNotification("🎉 Kartın başarıyla oluşturuldu!");
    
    appState.cardCreated = true;
}

// Konfeti Efekti
function launchConfetti() {
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
    });
    
    setTimeout(() => {
        confetti({
            particleCount: 100,
            angle: 60,
            spread: 80,
            origin: { x: 0 }
        });
        
        confetti({
            particleCount: 100,
            angle: 120,
            spread: 80,
            origin: { x: 1 }
        });
    }, 250);
}

// Kart İndirme
downloadBtn.addEventListener('click', function() {
    const card = document.getElementById('generatedCard');
    
    html2canvas(card, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
        logging: false
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `yilbasi-karti-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        showNotification("✅ Kart başarıyla indirildi!");
    }).catch(error => {
        console.error("İndirme hatası:", error);
        showNotification("❌ İndirme sırasında bir hata oluştu");
    });
});

// LinkedIn Paylaşımı
linkedinBtn.addEventListener('click', function() {
    const data = appState.currentCardData;
    
    // LinkedIn paylaşım URL'si
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(`2026 Yılbaşı Kartım: ${data.recipient}`);
    const summary = encodeURIComponent(`${data.message}\n\n${data.recipient} için hazırladığım özel yılbaşı kartı.`);
    const source = encodeURIComponent("Yılbaşı Kartı Oluşturucu");
    
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}&source=${source}`;
    
    // Yeni pencerede aç
    window.open(linkedinUrl, '_blank', 'width=600,height=600');
    
    showNotification("🔗 LinkedIn paylaşım sayfası açılıyor...");
});

// Twitter Paylaşımı
twitterBtn.addEventListener('click', function() {
    const data = appState.currentCardData;
    const text = encodeURIComponent(`${data.recipient} için özel bir 2026 yılbaşı kartı hazırladım! 🎄✨\n\n${data.message}\n\n#Yılbaşı2026 #YeniYıl #MutluYıllar`);
    const url = encodeURIComponent(window.location.href);
    
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    
    window.open(twitterUrl, '_blank', 'width=550,height=420');
    
    showNotification("🐦 Twitter'da paylaşılıyor...");
});

// Link Kopyalama
copyLinkBtn.addEventListener('click', function() {
    const url = window.location.href;
    
    navigator.clipboard.writeText(url).then(() => {
        showNotification("📋 Link panoya kopyalandı!");
    }).catch(err => {
        console.error("Kopyalama hatası:", err);
        showNotification("❌ Link kopyalanamadı");
    });
});

// Yeni Kart Oluştur
newCardBtn.addEventListener('click', function() {
    // Formu sıfırla ve göster
    cardForm.style.display = 'block';
    cardPreview.style.display = 'none';
    
    // Form alanlarını temizle
    recipientNameInput.value = '';
    cardMessageInput.value = '';
    recipientNameInput.focus();
    
    showNotification("🔄 Yeni kart oluşturmaya başlayabilirsin!");
});

// E-posta Gönder
sendEmailBtn.addEventListener('click', function() {
    const data = appState.currentCardData;
    
    const subject = encodeURIComponent(`2026 Yılbaşı Kartım - ${data.recipient}`);
    const body = encodeURIComponent(`Merhaba,\n\n${data.recipient} için hazırladığım yılbaşı kartını görmek ister misin?\n\nMesajım: ${data.message}\n\nKartı buradan görüntüleyebilirsin: ${window.location.href}\n\nMutlu yıllar! 🎄`);
    
    const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoUrl;
});

// Bildirim Sistemi
function showNotification(message) {
    notificationText.textContent = message;
    notification.style.display = 'block';
    
    // 3 saniye sonra bildirimi gizle
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Sayfa Yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    // Müzik sistemini başlat
    initializeMusic();
    
    // Tema seçimini başlat
    initializeThemeSelection();
    
    // İlk input'a odaklan
    recipientNameInput.focus();
    
    // Form gönderimini dinle
    cardForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            createCard();
        }
    });
    
    // Enter tuşu ile form gönderme
    cardForm.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            cardForm.dispatchEvent(new Event('submit'));
        }
    });
    
    // Input değişikliklerini dinle
    recipientNameInput.addEventListener('input', function() {
        if (this.value.trim().length >= 3) {
            this.style.borderColor = '#10b981';
        } else {
            this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }
    });
    
    cardMessageInput.addEventListener('input', function() {
        if (this.value.trim().length >= 10) {
            this.style.borderColor = '#10b981';
        } else {
            this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }
    });
    
    // Sayfa yüklendiğinde bildirim göster
    setTimeout(() => {
        showNotification("🎄 Hoş geldin! Mükemmel bir yılbaşı kartı hazırlamaya başla!");
    }, 1000);
});

// PWA desteği (isteğe bağlı)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(error => {
            console.log('Service Worker kayıt hatası:', error);
        });
    });
}

// Çevrimdışı destek
window.addEventListener('online', () => {
    showNotification("🌐 İnternet bağlantısı geri geldi");
});

window.addEventListener('offline', () => {
    showNotification("⚠️ İnternet bağlantısı yok. Çevrimdışı moddasın.");
});

// Sayfa görünürlüğü değiştiğinde müziği kontrol et
document.addEventListener('visibilitychange', () => {
    if (document.hidden && appState.musicEnabled) {
        backgroundMusic.pause();
    } else if (!document.hidden && appState.musicEnabled) {
        backgroundMusic.play().catch(console.error);
    }
});