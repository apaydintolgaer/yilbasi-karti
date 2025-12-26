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
const cardTypeSelect = document.getElementById('cardType');

// Kart Gösterim Elementleri
const displayRecipient = document.getElementById('displayRecipient');
const displayMessage = document.getElementById('displayMessage');
const displayQuote = document.getElementById('displayQuote');

// Butonlar
const downloadBtn = document.getElementById('downloadCard');
const linkedinBtn = document.getElementById('shareLinkedIn');
const newCardBtn = document.getElementById('createNew');
const copyLinkBtn = document.getElementById('copyCardLink');
const scrollTopBtn = document.getElementById('scrollTop');

// Tema Kartları
const themeCards = document.querySelectorAll('.theme-card');

// Uygulama Durumu
const appState = {
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
            ],
            cardTypes: {
                professional: "İş dünyasında başarılar dilerim",
                corporate: "Kurumsal başarılarınız daim olsun",
                friendly: "Dostluk ve işbirliğiyle dolu bir yıl",
                creative: "Yaratıcı fikirlerinizle parlayın"
            }
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
            ],
            cardTypes: {
                professional: "Teknolojik ilerlemeniz daim olsun",
                corporate: "Modern çözümlerle büyümeniz sürsün",
                friendly: "Modern iletişim gücünüz artsın",
                creative: "İnovatif projelerinizle fark yaratın"
            }
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
            ],
            cardTypes: {
                professional: "Zarif liderliğinizle ilham verin",
                corporate: "Şık ve etkili çözümler üretin",
                friendly: "Nezaketiniz her zaman hatırlansın",
                creative: "Estetik bakış açınız parlıyor"
            }
        },
        golden: {
            name: 'Premium',
            color: '#f59e0b',
            bgColor: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)',
            borderColor: '#f59e0b',
            quotes: [
                "Altın gibi parlayan bir yıl geçirmenizi dilerim.",
                "2026, size altın fırsatlar ve başarılar getirsin.",
                "Yeni yılda her gününüz altın değerinde olsun.",
                "Başarı ve mutluluk dolu altın bir yıl dilerim."
            ],
            cardTypes: {
                professional: "Altın değerinde başarılar dilerim",
                corporate: "Premium hizmet anlayışınız sürsün",
                friendly: "Değerli dostluklarınız hep kalsın",
                creative: "Altın çağınız başlıyor"
            }
        }
    },
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
};

// Sayfa Yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    // Tema seçimini başlat
    setupThemeSelection();
    
    // Event listener'ları ekle
    setupEventListeners();
    
    // İlk input'a odaklan
    recipientInput.focus();
    
    // Scroll top butonu
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Sayfa yüklendiğinde bildirim göster
    setTimeout(() => {
        showNotification("🎄 2026 yılbaşı kartınızı oluşturmaya başlayın!");
    }, 1000);
});

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
    
    // LinkedIn paylaşımı (mobil uyumlu)
    linkedinBtn.addEventListener('click', handleLinkedInShare);
    
    // Yeni kart oluşturma
    newCardBtn.addEventListener('click', handleNewCard);
    
    // Link kopyalama
    copyLinkBtn.addEventListener('click', handleCopyLink);
    
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
        type: cardTypeSelect.value,
        timestamp: new Date().toISOString(),
        cardId: generateCardId()
    };
    
    // 2 saniye sonra kartı oluştur (animasyon için)
    setTimeout(createCard, 2000);
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
    recipientInput.style.borderColor = recipient.length >= 2 && recipient.length <= 50 
        ? '#10b981' 
        : 'rgba(255, 255, 255, 0.15)';
    
    messageInput.style.borderColor = message.length >= 10 && message.length <= 500 
        ? '#10b981' 
        : 'rgba(255, 255, 255, 0.15)';
}

// Benzersiz Kart ID Üret
function generateCardId() {
    return 'card_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Hata Mesajları
function showFormError(message) {
    formError.querySelector('span').textContent = message;
    formError.style.display = 'flex';
    
    // 4 saniye sonra gizle
    setTimeout(() => {
        formError.style.display = 'none';
    }, 4000);
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
    
    // Kart tipine göre özel mesaj + rastgele alıntı
    const typeMessage = theme.cardTypes[data.type];
    const randomQuote = theme.quotes[Math.floor(Math.random() * theme.quotes.length)];
    displayQuote.textContent = `${typeMessage}. ${randomQuote}`;
    
    // Kart stilini uygula
    const card = document.getElementById('christmasCard');
    card.style.background = theme.bgColor;
    card.style.border = `2px solid ${theme.borderColor}`;
    
    // Kart yıl rengini güncelle
    const cardYear = card.querySelector('.card-year');
    cardYear.style.color = theme.color;
    
    // Başlık çizgisi rengini güncelle
    const titleLine = card.querySelector('.title-line');
    titleLine.style.background = `linear-gradient(90deg, ${theme.color}, #f59e0b, #0ea5e9)`;
    
    // Mesaj border rengini güncelle
    card.querySelector('.card-message').style.borderLeftColor = theme.color;
    
    // Alıntı alanı border rengini güncelle
    card.querySelector('.quote-area').style.borderLeftColor = theme.color;
    
    // Alıntı işaret rengini güncelle
    card.querySelectorAll('.quote-mark').forEach(mark => {
        mark.style.color = theme.color;
    });
    
    // İmza çizgisi rengini güncelle
    card.querySelector('.signature-line').style.background = `linear-gradient(90deg, ${theme.color}, #f59e0b)`;
    
    // Yükleme animasyonunu gizle, kartı göster
    loadingAnimation.style.display = 'none';
    cardDisplay.style.display = 'block';
    actionButtons.style.display = 'flex';
    
    // Konfeti efekti
    launchConfetti();
    
    // Bildirim göster
    showNotification("🎉 Profesyonel kartınız hazır! Şimdi LinkedIn'de paylaşabilirsiniz.");
}

// Konfeti Efekti
function launchConfetti() {
    const colors = ['#dc2626', '#0ea5e9', '#7c3aed', '#f59e0b', '#10b981'];
    
    // Ana konfeti
    confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 },
        colors: colors,
        shapes: ['circle', 'square'],
        scalar: 1.2
    });
    
    // Yanlardan konfeti
    setTimeout(() => {
        confetti({
            particleCount: 120,
            angle: 60,
            spread: 80,
            origin: { x: 0 },
            colors: colors,
            shapes: ['star']
        });
        
        confetti({
            particleCount: 120,
            angle: 120,
            spread: 80,
            origin: { x: 1 },
            colors: colors,
            shapes: ['star']
        });
    }, 300);
}

// Kart İndirme
function handleDownload() {
    const card = document.getElementById('christmasCard');
    
    // Butonu loading durumuna getir
    const originalContent = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>İndiriliyor...</span>';
    downloadBtn.disabled = true;
    
    html2canvas(card, {
        scale: 3, // 3x kalite
        backgroundColor: null,
        useCORS: true,
        logging: false,
        allowTaint: true,
        imageTimeout: 0,
        onclone: function(clonedDoc) {
            // Klonlanan elementte stilleri koru
            const clonedCard = clonedDoc.getElementById('christmasCard');
            clonedCard.style.transform = 'none';
            clonedCard.style.boxShadow = 'none';
        }
    }).then(canvas => {
        // Canvas'ı optimize et
        const optimizedCanvas = document.createElement('canvas');
        optimizedCanvas.width = canvas.width;
        optimizedCanvas.height = canvas.height;
        const ctx = optimizedCanvas.getContext('2d');
        
        // Beyaz arkaplan ekle (transparan sorunları için)
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, optimizedCanvas.width, optimizedCanvas.height);
        ctx.drawImage(canvas, 0, 0);
        
        const link = document.createElement('a');
        const timestamp = new Date().getTime();
        const fileName = `yilbasi-karti-${appState.currentCard.cardId}-${timestamp}.png`;
        
        link.download = fileName;
        link.href = optimizedCanvas.toDataURL('image/png', 1.0); // Maksimum kalite
        link.click();
        
        // Butonu eski haline getir
        downloadBtn.innerHTML = originalContent;
        downloadBtn.disabled = false;
        
        showNotification("✅ Kartınız yüksek kalitede indirildi! LinkedIn'de paylaşabilirsiniz.");
        
        // LinkedIn engagement için analytics (isteğe bağlı)
        logEvent('card_downloaded', {
            cardId: appState.currentCard.cardId,
            theme: appState.currentCard.theme,
            type: appState.currentCard.type
        });
        
    }).catch(error => {
        console.error("İndirme hatası:", error);
        
        // Butonu eski haline getir
        downloadBtn.innerHTML = originalContent;
        downloadBtn.disabled = false;
        
        showNotification("❌ İndirme sırasında bir hata oluştu. Lütfen tekrar deneyin.");
    });
}

// LinkedIn Paylaşımı (Mobil Uyumlu)
function handleLinkedInShare() {
    const data = appState.currentCard;
    
    if (!data) {
        showNotification("⚠️ Önce bir kart oluşturmalısınız.");
        return;
    }
    
    // Butonu loading durumuna getir
    const originalContent = linkedinBtn.innerHTML;
    linkedinBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Hazırlanıyor...</span>';
    linkedinBtn.disabled = true;
    
    // LinkedIn paylaşım URL'si (mobil ve desktop uyumlu)
    const baseUrl = 'https://www.linkedin.com';
    const sharePath = '/sharing/share-offsite/';
    
    // Paylaşım parametreleri
    const params = new URLSearchParams({
        url: window.location.href + '?card=' + data.cardId,
        mini: 'true',
        title: `2026 Yılbaşı Kartım: ${data.recipient}`,
        summary: `${data.message}\n\n${data.recipient} için hazırladığım özel yılbaşı kartı. Siz de kendi kartınızı oluşturmak ister misiniz?`,
        source: 'Yılbaşı Kartı Oluşturucu'
    });
    
    // LinkedIn URL'sini oluştur
    let linkedinUrl;
    
    if (appState.isMobile) {
        // Mobil için: linkedin:// URL şemasını dene, fallback olarak web
        linkedinUrl = `linkedin://sharing/share-offsite?${params.toString()}`;
        
        // LinkedIn uygulamasını açmayı dene
        const appIntent = setTimeout(() => {
            // Uygulama açılmazsa web sayfasına yönlendir
            linkedinUrl = `${baseUrl}${sharePath}?${params.toString()}`;
            window.open(linkedinUrl, '_blank', 'width=600,height=600');
        }, 500);
        
        // LinkedIn app linkini aç
        window.location.href = linkedinUrl;
        
        // 450ms sonra app açılmadıysa clear
        setTimeout(() => {
            clearTimeout(appIntent);
        }, 450);
        
    } else {
        // Desktop için direkt web URL
        linkedinUrl = `${baseUrl}${sharePath}?${params.toString()}`;
        window.open(linkedinUrl, '_blank', 'width=600,height=600');
    }
    
    // Butonu eski haline getir
    setTimeout(() => {
        linkedinBtn.innerHTML = originalContent;
        linkedinBtn.disabled = false;
    }, 2000);
    
    showNotification("🔗 LinkedIn paylaşım sayfası açılıyor...");
    
    // LinkedIn engagement analytics
    logEvent('linkedin_share_clicked', {
        cardId: data.cardId,
        isMobile: appState.isMobile,
        theme: data.theme
    });
}

// Link Kopyalama
function handleCopyLink() {
    const cardUrl = window.location.href + (appState.currentCard ? '?card=' + appState.currentCard.cardId : '');
    
    // Modern clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(cardUrl).then(() => {
            showNotification("📋 Kart linki panoya kopyalandı!");
            
            // Orjinal buton text'ini sakla
            const originalText = copyLinkBtn.innerHTML;
            copyLinkBtn.innerHTML = '<i class="fas fa-check"></i><span>Kopyalandı!</span>';
            
            // 2 saniye sonra eski haline döndür
            setTimeout(() => {
                copyLinkBtn.innerHTML = originalText;
            }, 2000);
            
        }).catch(err => {
            console.error("Clipboard hatası:", err);
            fallbackCopyText(cardUrl);
        });
    } else {
        // Fallback için eski yöntem
        fallbackCopyText(cardUrl);
    }
}

// Fallback copy fonksiyonu
function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification("📋 Link kopyalandı!");
        
        const originalText = copyLinkBtn.innerHTML;
        copyLinkBtn.innerHTML = '<i class="fas fa-check"></i><span>Kopyalandı!</span>';
        
        setTimeout(() => {
            copyLinkBtn.innerHTML = originalText;
        }, 2000);
    } catch (err) {
        console.error('Fallback copy hatası:', err);
        showNotification("❌ Link kopyalanamadı. Manuel olarak kopyalayın: " + text);
    } finally {
        document.body.removeChild(textArea);
    }
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
        card.classList.toggle('active', index === 0);
    });
    
    // Input border rengini sıfırla
    recipientInput.style.borderColor = 'rgba(255, 255, 255, 0.15)';
    messageInput.style.borderColor = 'rgba(255, 255, 255, 0.15)';
    
    // İlk input'a odaklan
    recipientInput.focus();
    
    showNotification("🔄 Yeni kart oluşturmaya başlayabilirsiniz!");
    
    // Analytics
    logEvent('new_card_started');
}

// Analytics Logging (isteğe bağlı)
function logEvent(eventName, data = {}) {
    // Bu fonksiyon Google Analytics veya başka bir analytics servisi için kullanılabilir
    console.log(`[Analytics] ${eventName}:`, {
        ...data,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        referrer: document.referrer
    });
    
    // Örnek Google Analytics event (GA4)
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, data);
    }
}

// Bildirim Sistemi
function showNotification(message, type = 'info') {
    // Mevcut bir bildirim varsa kaldır
    const existingNotification = document.querySelector('.notification-toast');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Tip'e göre icon ve renk
    const icons = {
        info: '🔔',
        success: '✅',
        warning: '⚠️',
        error: '❌'
    };
    
    const colors = {
        info: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
        success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        error: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)'
    };
    
    // Yeni bildirim oluştur
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${icons[type] || icons.info}</span>
            <span class="notification-text">${message}</span>
        </div>
    `;
    
    // Stil ekle
    notification.style.cssText = `
        position: fixed;
        top: 25px;
        right: 25px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 18px 28px;
        border-radius: 14px;
        z-index: 10000;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        animation: notificationSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        font-family: 'Montserrat', sans-serif;
        font-weight: 500;
        max-width: 350px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    document.body.appendChild(notification);
    
    // Animasyon stilleri ekle (henüz yoksa)
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes notificationSlideIn {
                from {
                    transform: translateX(100%) translateY(-20px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0) translateY(0);
                    opacity: 1;
                }
            }
            @keyframes notificationSlideOut {
                from {
                    transform: translateX(0) translateY(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%) translateY(-20px);
                    opacity: 0;
                }
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 15px;
                font-size: 16px;
            }
            
            .notification-icon {
                font-size: 20px;
                flex-shrink: 0;
            }
            
            .notification-text {
                flex: 1;
                line-height: 1.5;
            }
        `;
        document.head.appendChild(style);
    }
    
    // 4 saniye sonra kaldır
    setTimeout(() => {
        notification.style.animation = 'notificationSlideOut 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 400);
    }, 4000);
}

// Sayfa Görünürlüğü Değiştiğinde Analytics
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && appState.currentCard) {
        logEvent('page_hidden', { cardId: appState.currentCard.cardId });
    }
});

// Online/Offline Durumu
window.addEventListener('online', () => {
    showNotification("🌐 İnternet bağlantınız geri geldi.", 'success');
});

window.addEventListener('offline', () => {
    showNotification("⚠️ İnternet bağlantınız kesildi. Bazı özellikler çalışmayabilir.", 'warning');
});

// Sayfa Scroll'unda header efekti
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const header = document.querySelector('.main-header');
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Aşağı scroll
        header.style.opacity = '0.9';
        header.style.transform = 'translateY(-10px)';
    } else {
        // Yukarı scroll
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
    
    // Scroll top butonunu göster/gizle
    if (currentScroll > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
        scrollTopBtn.style.transform = 'translateY(0)';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
        scrollTopBtn.style.transform = 'translateY(10px)';
    }
});

// PWA için Service Worker (isteğe bağlı)
if ('serviceWorker' in navigator && location.hostname !== 'localhost') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('Service Worker registered:', registration);
        }).catch(error => {
            console.log('Service Worker registration failed:', error);
        });
    });
}

// Kart URL parametrelerini kontrol et (paylaşılan kartları açmak için)
function checkUrlForCard() {
    const urlParams = new URLSearchParams(window.location.search);
    const cardId = urlParams.get('card');
    
    if (cardId) {
        // Burada paylaşılan kartı yükleyebilirsiniz
        // Örneğin: fetchCardData(cardId);
        showNotification("👋 Paylaşılan kart görüntüleniyor!", 'info');
    }
}

// Sayfa yüklendiğinde URL'yi kontrol et
setTimeout(checkUrlForCard, 500);