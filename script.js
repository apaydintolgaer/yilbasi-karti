document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const to = urlParams.get('to');
    const msg = urlParams.get('msg');
    const from = urlParams.get('from');

    const setupSection = document.getElementById('setup-section');
    const cardSection = document.getElementById('card-section');
    const envelope = document.getElementById('envelope');

    // 1. Link Kontrolü: Eğer URL'de veri varsa kartı göster, yoksa formu göster
    if (to) {
        setupSection.classList.add('hidden');
        cardSection.classList.remove('hidden');
        document.getElementById('display-to').innerText = `Sevgili ${decodeURIComponent(to)},`;
        document.getElementById('display-msg').innerText = decodeURIComponent(msg);
        document.getElementById('display-from').innerText = decodeURIComponent(from);
    }

    // 2. Link Oluşturma Fonksiyonu
    document.getElementById('btn-generate').onclick = () => {
        const t = document.getElementById('input-to').value;
        const m = document.getElementById('input-msg').value;
        const f = document.getElementById('input-from').value;

        if (!t || !m || !f) return alert("Lütfen tüm alanları doldur!");

        const baseUrl = window.location.origin + window.location.pathname;
        const finalUrl = `${baseUrl}?to=${encodeURIComponent(t)}&msg=${encodeURIComponent(m)}&from=${encodeURIComponent(f)}`;

        navigator.clipboard.writeText(finalUrl).then(() => {
            alert("Harika! Özel kart linkin kopyalandı. Sevdiklerine gönderebilirsin.");
            window.location.href = finalUrl;
        });
    };

    // 3. Zarf Tıklama
    envelope.onclick = () => envelope.classList.toggle('open');

    // 4. Kar Yağışı (Canvas)
    const canvas = document.getElementById('snow-canvas');
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const particles = Array(120).fill().map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 3 + 1,
        d: Math.random() * 1 + 0.5
    }));

    function paint() {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();
        particles.forEach(p => {
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            p.y += p.d;
            if (p.y > h) p.y = -10;
        });
        ctx.fill();
        requestAnimationFrame(paint);
    }
    paint();

    window.onresize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    };
});
