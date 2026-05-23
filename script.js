document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mockup Etkileşimi (FAB) ---
    const demoText = document.getElementById('demo-text');
    const fabMockup = document.getElementById('fab-mockup');
    const fabAriaBtn = document.querySelector('.fab-aria');
    
    // Metin seçildiğinde simülasyon yap
    demoText.addEventListener('mouseup', () => {
        const selection = window.getSelection().toString().trim();
        if (selection.length > 0) {
            // FAB'ı göster
            fabMockup.classList.add('active');
        } else {
            // Seçim yoksa FAB'ı gizle
            fabMockup.classList.remove('active');
        }
    });

    // Boşluğa tıklanınca FAB'ı gizle
    document.addEventListener('mousedown', (e) => {
        if (!demoText.contains(e.target) && !fabMockup.contains(e.target)) {
            fabMockup.classList.remove('active');
        }
    });

    // Butonlara tıklanınca havalı bir log veya efekt verebiliriz
    const buttons = fabMockup.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.style.transform = 'scale(0.9)';
            setTimeout(() => btn.style.transform = 'scale(1)', 150);
            
            // Eğer "❓ ARIA" ise
            if (btn.classList.contains('fab-aria')) {
                btn.textContent = '✨ Yanıtlanıyor...';
                setTimeout(() => {
                    btn.textContent = '❓ ARIA';
                    fabMockup.classList.remove('active');
                    window.getSelection().removeAllRanges();
                }, 1500);
            } else {
                btn.textContent = '⏳ İşleniyor...';
                setTimeout(() => {
                    btn.textContent = '✔ Tamamlandı';
                    setTimeout(() => {
                        fabMockup.classList.remove('active');
                        window.getSelection().removeAllRanges();
                        // Reset text
                        btn.textContent = btn.dataset.originalText || btn.textContent;
                    }, 1000);
                }, 1500);
            }
        });
        
        // Orijinal metni kaydet
        if(!btn.dataset.originalText) {
            btn.dataset.originalText = btn.textContent;
        }
    });

    // --- Scroll Animasyonları (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.2, // Elemanın %20'si göründüğünde tetikle
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Sadece bir kere çalışsın
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

});
