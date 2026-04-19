document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

const nav = document.querySelector(".main-nav");
const header = document.querySelector(".site-header");
const slides = document.querySelectorAll(".slide");
const revealElements = document.querySelectorAll(
    ".highlight-card, .specialty-card, .section-header, .footer-inner, .gallery-item"
);

function toggleNav() {
    nav.classList.toggle("nav-open");
    header.classList.toggle("nav-active");
}

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("nav-open");
        header.classList.remove("nav-active");
    });
});

let index = 0;

function showNextSlide() {
    if (slides.length === 0) return;
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
}

if (slides.length > 0) {
    setInterval(showNextSlide, 4000);
}

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.2 }
);

revealElements.forEach(el => observer.observe(el));
