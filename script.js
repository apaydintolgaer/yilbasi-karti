document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const CONFIG = {
        snowParticleCount: 100,
        musicVolume: 0.4
    };

    // --- DOM Elements ---
    const elements = {
        envelopeWrapper: document.getElementById('envelope-wrapper'),
        btnOpen: document.getElementById('btn-open'),
        btnReset: document.getElementById('btn-reset'),
        audio: document.getElementById('bg-music'),
        canvas: document.getElementById('snow-canvas')
    };

    // --- Audio Handler ---
    elements.audio.volume = CONFIG.musicVolume;

    const toggleMusic = (play) => {
        if (play) {
            elements.audio.play().catch(e => console.warn('Audio autoplay blocked:', e));
        } else {
            elements.audio.pause();
            elements.audio.currentTime = 0;
        }
    };

    // --- Interaction Handlers ---
    elements.btnOpen.addEventListener('click', () => {
        elements.envelopeWrapper.classList.add('open');
        elements.btnOpen.classList.add('hidden');
        elements.btnReset.classList.remove('hidden');
        toggleMusic(true);
    });

    elements.btnReset.addEventListener('click', () => {
        elements.envelopeWrapper.classList.remove('open');
        elements.btnOpen.classList.remove('hidden');
        elements.btnReset.classList.add('hidden');
        toggleMusic(false);
    });

    // --- Canvas Snow Effect ---
    const ctx = elements.canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    const particles = [];

    elements.canvas.width = width;
    elements.canvas.height = height;

    class Snowflake {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * -height;
            this.speed = Math.random() * 1 + 0.5;
            this.radius = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.3;
            this.drift = Math.random() * 0.5 - 0.25;
        }

        update() {
            this.y += this.speed;
            this.x += this.drift;

            if (this.y > height) {
                this.reset();
                this.y = -10; // Reset to just above screen
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Initialize Particles
    for (let i = 0; i < CONFIG.snowParticleCount; i++) {
        particles.push(new Snowflake());
    }

    // Animation Loop
    const animate = () => {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        elements.canvas.width = width;
        elements.canvas.height = height;
    });
});