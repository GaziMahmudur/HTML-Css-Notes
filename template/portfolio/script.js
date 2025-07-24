/*=============================================
=            Portfolio Site Script            =
=============================================*/

/* 1. Global Selectors */
const menuIcon = document.querySelector(".menu-icon");
const navlist = document.querySelector(".navlist");
const section = document.querySelectorAll("section");
const navLink = document.querySelectorAll("header ul.navlist a");
let currentPage = window.location.pathname.split("/").pop() || "index.html";
const headerContainer = document.querySelector(".header-container");
const form = document.getElementById("contact-form");

/* 2. Page Load Handler */
document.addEventListener("DOMContentLoaded", () => {
    // Highlight current nav link on load
    navLink.forEach(link => {
        const href = link.getAttribute("href");
        if (currentPage === "index.html") {
            link.classList.toggle("active", href === "index.html");
        } else {
            link.classList.toggle("active", href.includes(currentPage));
        }
    });

    // Contact form handler
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            try {
                const response = await fetch(form.action, {
                    method: "POST",
                    body: formData,
                    headers: { Accept: "application/json" }
                });
                if (response.ok) {
                    alert("✅ Your message has been sent successfully, Thank you!");
                    form.reset();
                } else {
                    alert("❌ There was a problem sending the message. Please try again later.");
                }
            } catch (error) {
                alert("❌ An error occurred. Please try again later.");
                console.error(error);
            }
        });
    }

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle('animate-active', entry.isIntersecting);
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
});

/* 3. Menu Toggle */
menuIcon.addEventListener("click", () => {
    const isActive = menuIcon.classList.toggle("active");
    navlist.classList.toggle("active");
    document.body.classList.toggle("open");
    headerContainer.style.height = isActive ? "400px" : "58px";
});

/* 4. Remove navlist on nav click (mobile) */
navlist.addEventListener("click", () => {
    navlist.classList.remove("active");
    menuIcon.classList.remove("active");
    document.body.classList.remove("open");
    headerContainer.style.height = "58px";
});

/* 5. Scroll-based active nav highlight */
window.addEventListener("scroll", () => {
    const top = window.scrollY;
    section.forEach(sec => {
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute("id");
        if (top >= offset && top < offset + height) {
            navLink.forEach(link => link.classList.remove("active"));
            let activeLink;
            if (currentPage === "index.html" && id === "home") {
                activeLink = document.querySelector('header ul.navlist a[href="index.html"]');
            } else {
                activeLink = document.querySelector(`header ul.navlist a[href*="${id}"]`);
            }
            if (activeLink) activeLink.classList.add("active");
        }
    });
});
