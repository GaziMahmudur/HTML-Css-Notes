/*=============================================
=            Portfolio Site Script            =
=============================================*/

const menuIcon = document.querySelector(".menu-icon");
const navlist = document.querySelector(".navlist");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header ul.navlist a");
const headerContainer = document.querySelector(".header-container");
const form = document.getElementById("contact-form");

// Get current page filename (default: index.html)
const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.addEventListener("DOMContentLoaded", () => {
    // Highlight current nav link on load
    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        const isActive = (currentPage === "index.html") ? href === "index.html" : href.includes(currentPage);
        link.classList.toggle("active", isActive);
    });

    // Contact form submit handler (if form exists)
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

    // IntersectionObserver for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle('animate-active', entry.isIntersecting);
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
});

// Menu toggle (for mobile)
menuIcon.addEventListener("click", () => {
    const isActive = menuIcon.classList.toggle("active");
    navlist.classList.toggle("active");
    document.body.classList.toggle("open");
    headerContainer.style.height = isActive ? "400px" : "58px";
});

// Close navlist on nav click (mobile)
navlist.addEventListener("click", () => {
    navlist.classList.remove("active");
    menuIcon.classList.remove("active");
    document.body.classList.remove("open");
    headerContainer.style.height = "58px";
});

// Scroll-based nav highlight
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    sections.forEach(sec => {
        const offsetTop = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute("id");
        if (scrollY >= offsetTop && scrollY < offsetTop + height) {
            navLinks.forEach(link => link.classList.remove("active"));
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
