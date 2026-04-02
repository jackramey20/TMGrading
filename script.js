document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start"});
    });
});

const nav = document.querySelector(".main-nav");
const header = document.querySelector(".site-header");
const form = document.querySelector(".quote-form");
const slides = document.querySelectorAll(".slide");


const nav = document.querySelector(".main-nav");
const header = document.querySelector(".site-header");

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

if (form) {
    form.addEventListener("submit", e => {
        e.preventDefault();

        const name = form.querySelector("#name");
        const phone = form.querySelector("#phone");
        const email = form.querySelector("#email");

        let valid = true;

        [name, phone, email].forEach(field => {
            if (!field.value.trim()) {
                field.classList.add("input-error");
                valid = false;
            } else {
                field.classList.remove("input-error");
            }
        });

        if (!valid) {
            showFormMessage("Please fill out all required fields.", "error");
            return;
        }
// simulate sucess since backend isnt connected yet
        showFormMessage("Your request has been submitted! We'll contact you soon", "success");

        form.reset();
    });
}

function showFormMessage(message, type) {
    let msgBox = document.querySelector(".form-message");

    if (!msgBox) {
        msgBox = document.createElement("div");
        msgBox.className = "form-message";
        form.prepend(msgBox);
    }

    msgBox.textContent = message;
    msgBox.className = `form-message ${type}`;

    setTimeout(() => {
        msgBox.classList.add("fade-out");
        setTimeout(() => msgBox.remove(), 500);
    }, 3000);
}

function showNextSlide() {
    if (slides.length === 0) return;
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
}

if (slides.length > 0) {
    setInterval(showNextSlide, 4000);
}

const revealElements = document.querySelectorAll(
    ".highlight-card, .specialty-card, .section-header, .footer-inner"
);


const slides = document.querySelectorAll('.slide');
let index = 0;

function showNextSlide() {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}

window.addEventListener("scroll", () => {
    const header = document.querySelector(".site-header");

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

setInterval(showNextSlide, 4000); // change every 4 seconds


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
