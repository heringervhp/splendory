/* ==========================================================
   SPLENDORY SEMIJOIAS
   MAIN.JS
========================================================== */

/* ==========================================================
   HEADER SCROLL
========================================================== */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.background =
            "rgba(4,27,77,0.98)";

        header.style.boxShadow =
            "0 5px 20px rgba(0,0,0,.15)";

    } else {

        header.style.background =
            "rgba(4,27,77,0.95)";

        header.style.boxShadow = "none";

    }

});

/* ==========================================================
   FILTRO DE PRODUTOS
========================================================== */

const filterButtons =
    document.querySelectorAll(
        ".filter-buttons button"
    );

const productCards =
    document.querySelectorAll(
        ".product-card"
    );

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.getAttribute("data-filter");

        productCards.forEach(card => {
            const matches =
                category === "all" ||
                card.classList.contains(category);

            card.classList.toggle("is-hidden", !matches);
        });
    });
});

/* ==========================================================
   SLIDER DEPOIMENTOS
========================================================== */

const testimonialViewport =
    document.querySelector(".testimonial-viewport");

const testimonialTrack =
    document.querySelector(".testimonial-slider");

const testimonialItems =
    Array.from(document.querySelectorAll(".testimonial"));

const testimonialPrev =
    document.querySelector(".testimonial-prev");

const testimonialNext =
    document.querySelector(".testimonial-next");

const testimonialDots =
    document.querySelector(".testimonial-dots");

let testimonialIndex = 0;
let testimonialTimer;
let testimonialVisible = 3;

function getVisibleTestimonials() {
    if (window.innerWidth <= 560) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
}

function getMaxTestimonialIndex() {
    return Math.max(
        0,
        testimonialItems.length - testimonialVisible
    );
}

function renderTestimonialDots() {
    if (!testimonialDots) return;

    testimonialDots.replaceChildren();

    const pageCount =
        getMaxTestimonialIndex() + 1;

    for (let i = 0; i < pageCount; i++) {
        const dot = document.createElement("button");

        dot.type = "button";
        dot.setAttribute(
            "aria-label",
            `Mostrar grupo de depoimentos ${i + 1}`
        );

        dot.classList.toggle(
            "active",
            i === testimonialIndex
        );

        dot.addEventListener("click", () => {
            testimonialIndex = i;
            updateTestimonials();
            restartTestimonialTimer();
        });

        testimonialDots.appendChild(dot);
    }
}

function updateTestimonials() {
    if (!testimonialTrack || testimonialItems.length === 0) {
        return;
    }

    testimonialVisible = getVisibleTestimonials();

    testimonialIndex = Math.min(
        testimonialIndex,
        getMaxTestimonialIndex()
    );

    const item = testimonialItems[0];
    const itemWidth = item.getBoundingClientRect().width;

    const gap = parseFloat(
        getComputedStyle(testimonialTrack).columnGap
    ) || 0;

    testimonialTrack.style.transform =
        `translateX(-${testimonialIndex * (itemWidth + gap)}px)`;

    renderTestimonialDots();

    if (testimonialPrev) {
        testimonialPrev.disabled = testimonialIndex === 0;
    }

    if (testimonialNext) {
        testimonialNext.disabled =
            testimonialIndex === getMaxTestimonialIndex();
    }
}

function nextTestimonial() {
    if (testimonialIndex < getMaxTestimonialIndex()) {
        testimonialIndex++;
    } else {
        testimonialIndex = 0;
    }

    updateTestimonials();
}

function previousTestimonial() {
    if (testimonialIndex > 0) {
        testimonialIndex--;
    } else {
        testimonialIndex = getMaxTestimonialIndex();
    }

    updateTestimonials();
}

function restartTestimonialTimer() {
    clearInterval(testimonialTimer);

    if (getMaxTestimonialIndex() > 0) {
        testimonialTimer = setInterval(
            nextTestimonial,
            5000
        );
    }
}

if (testimonialViewport && testimonialTrack &&
    testimonialItems.length > 0) {

    testimonialNext?.addEventListener("click", () => {
        nextTestimonial();
        restartTestimonialTimer();
    });

    testimonialPrev?.addEventListener("click", () => {
        previousTestimonial();
        restartTestimonialTimer();
    });

    window.addEventListener("resize", updateTestimonials);

    updateTestimonials();
    restartTestimonialTimer();
}

/* ==========================================================
   LIGHTBOX
========================================================== */

const lightbox = document.getElementById("lightbox");

const galleryImages = document.querySelectorAll(
    ".product-card img, .masonry img, .instagram-grid img"
);

function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    lightbox.innerHTML = "";
}

galleryImages.forEach(image => {
    image.addEventListener("click", () => {
        if (!lightbox) return;

        const enlargedImage = document.createElement("img");
        enlargedImage.src = image.src;
        enlargedImage.alt = image.alt || "Semijoia Splendory";
        enlargedImage.className = "lightbox-image";

        const closeButton = document.createElement("button");
        closeButton.type = "button";
        closeButton.className = "close-lightbox";
        closeButton.setAttribute("aria-label", "Fechar imagem");
        closeButton.textContent = "×";
        closeButton.addEventListener("click", closeLightbox);

        lightbox.replaceChildren(closeButton, enlargedImage);
        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("lightbox-open");
    });
});

if (lightbox) {
    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeLightbox();
    }
});
/* ==========================================================
   REVEAL ON SCROLL
========================================================== */

const revealElements =
    document.querySelectorAll(
        ".feature-card, .product-card, .about-text, .about-image, .testimonial"
    );

const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if(entry.isIntersecting){

                    entry.target.classList.add(
                        "revealed"
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );

revealElements.forEach(element => {

    revealObserver.observe(
        element
    );

});

/* ==========================================================
   SCROLL SUAVE MENU
========================================================== */

document
.querySelectorAll(
    'a[href^="#"]'
)
.forEach(link => {

    link.addEventListener(

        "click",

        function(event){

            event.preventDefault();

            const target =
                document.querySelector(
                    this.getAttribute(
                        "href"
                    )
                );

            if(target){

                target.scrollIntoView({

                    behavior:
                        "smooth"

                });

            }

        }

    );

});

/* ==========================================================
   PARALLAX HERO
========================================================== */

const hero =
    document.querySelector(
        ".hero"
    );

window.addEventListener(
    "scroll",
    () => {

        const scrollTop =
            window.pageYOffset;

        if(hero){

            hero.style.backgroundPositionY =
                scrollTop * 0.4 + "px";

        }

    }
);

/* ==========================================================
   CTA INSTAGRAM
========================================================== */

const instagramFloating =
    document.querySelector(
        ".floating-instagram"
    );

if(instagramFloating){

    instagramFloating.addEventListener(
        "mouseenter",
        () => {

            instagramFloating.style.transform =
                "scale(1.08)";

        }
    );

    instagramFloating.addEventListener(
        "mouseleave",
        () => {

            instagramFloating.style.transform =
                "scale(1)";

        }
    );

}

/* ==========================================================
   CONTADOR DE VISUALIZAÇÃO DAS PEÇAS
   (OPCIONAL)
========================================================== */

const productViewCounter =
    document.querySelectorAll(
        ".product-card"
    );

productViewCounter.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            console.log(
                "Produto visualizado:",
                card.querySelector(
                    "h3"
                ).innerText
            );

        }
    );

});

/* ==========================================================
   ANIMAÇÃO DE ENTRADA GERAL
========================================================== */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );

    }
);

/* ==========================================================
   PREPARADO PARA FUTURAS INTEGRAÇÕES
========================================================== */

// Instagram API
// WhatsApp
// Google Analytics
// Facebook Pixel
// Meta Ads Conversion API
// Catálogo Dinâmico
// Checkout
// CRM

console.log(
    "Splendory Premium carregado com sucesso."
);