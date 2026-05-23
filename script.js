document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Custom Glow Cursor ---
    const cursorGlow = document.getElementById('cursor-glow');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorGlow.style.left = `${mouseX}px`;
        cursorGlow.style.top = `${mouseY}px`;
    });

    // Hover effects for cursor
    const hoverTargets = document.querySelectorAll('.hover-target');
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorGlow.style.background = 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, rgba(124, 58, 237, 0.1) 40%, rgba(3, 3, 5, 0) 70%)';
        });
        target.addEventListener('mouseleave', () => {
            cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorGlow.style.background = 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(6, 182, 212, 0.05) 40%, rgba(3, 3, 5, 0) 70%)';
        });
    });

    // --- 2. Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 3. Interactive FAB Mockup ---
    const demoText = document.getElementById('demo-text');
    const fabMockup = document.getElementById('fab-mockup');

    demoText.addEventListener('mouseup', () => {
        const selection = window.getSelection().toString().trim();
        if (selection.length > 0) {
            fabMockup.classList.add('active');
        } else {
            fabMockup.classList.remove('active');
        }
    });

    document.addEventListener('mousedown', (e) => {
        if (!demoText.contains(e.target) && !fabMockup.contains(e.target)) {
            fabMockup.classList.remove('active');
        }
    });

    const fabButtons = fabMockup.querySelectorAll('button');
    fabButtons.forEach(btn => {
        btn.dataset.originalText = btn.textContent;
        btn.addEventListener('click', () => {
            btn.style.transform = 'scale(0.9)';
            setTimeout(() => btn.style.transform = 'scale(1)', 150);
            
            btn.textContent = '✨ Processing...';
            setTimeout(() => {
                btn.textContent = '✔ Done';
                setTimeout(() => {
                    fabMockup.classList.remove('active');
                    window.getSelection().removeAllRanges();
                    btn.textContent = btn.dataset.originalText;
                }, 1000);
            }, 1200);
        });
    });

    // --- 4. Canvas Particle Network (Safe Swarm) ---
    const canvas = document.getElementById('swarm-canvas');
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let particles = [];
    
    function resizeCanvas() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if(this.x < 0 || this.x > width) this.vx *= -1;
            if(this.y < 0 || this.y > height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(124, 58, 237, 0.5)';
            ctx.fill();
        }
    }

    for(let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        
        for(let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            for(let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                
                if(dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(6, 182, 212, ${1 - dist/150})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

});
