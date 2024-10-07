document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        targetElement.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', function () {
        const body = this.nextElementSibling;
        const isOpen = body.classList.contains('open');

        if (!isOpen) {
            body.classList.add('open');
            body.style.display = 'block';
            const scrollHeight = body.scrollHeight + "px"; 

            requestAnimationFrame(() => {
                body.style.maxHeight = scrollHeight; 
                body.style.opacity = "1"; 
            });

           
            if (header.textContent.includes("macskás képet")) {
                fetchRandomCatImage();
            }

        } else {
            body.classList.remove('open');
            body.style.maxHeight = body.scrollHeight + "px";
            body.style.opacity = "1"; 

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    body.style.maxHeight = null; 
                    body.style.opacity = "0"; 
                });
            });

            body.addEventListener('transitionend', () => {
                if (!body.classList.contains('open')) {
                    body.style.display = 'none'; 
                }
            }, { once: true });
        }
    });
});


function fetchRandomCatImage() {
    const catImageElement = document.getElementById('cat-image');
    fetch('https://api.thecatapi.com/v1/images/search')
        .then(response => response.json())
        .then(data => {
            const randomCatImageUrl = data[0].url;
            catImageElement.src = randomCatImageUrl;
        })
        .catch(error => {
            console.error('Hiba történt a macskás kép letöltésekor:', error);
        });
}
