// Sima görgetés a navigációs linkekhez
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        // Sima görgetés a cél elemhez
        targetElement.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Akkordió működés
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', function () {
        const body = this.nextElementSibling;
        const isOpen = body.classList.contains('open');

        if (!isOpen) {
            body.classList.add('open');
            body.style.display = 'block';
            const scrollHeight = body.scrollHeight + "px"; 

            // Kezdjük el az animációt
            requestAnimationFrame(() => {
                body.style.maxHeight = scrollHeight; 
                body.style.opacity = "1"; 
            });
        } else {
            body.classList.remove('open');
            body.style.maxHeight = body.scrollHeight + "px"; // Záráskor beállítjuk a magasságot
            body.style.opacity = "1"; 

            // Záráskor animáció
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    body.style.maxHeight = null; 
                    body.style.opacity = "0"; 
                });
            });

            // Az elem eltüntetése az animáció után
            body.addEventListener('transitionend', () => {
                if (!body.classList.contains('open')) {
                    body.style.display = 'none'; 
                }
            }, { once: true });
        }
    });
});
