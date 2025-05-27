/*=============================================
=            Table of Contents            =
=============================================

1. Global Variables & Selectors
2. Page Load Handlers
3. Navigation & Menu Handlers
4. Scroll Handlers
5. Utility Functions

=============================================*/

/* 1. Global Variables & Selectors */
let menuIcon = document.querySelector(".menu-icon");
let navlist = document.querySelector(".navlist");
let section = document.querySelectorAll("section");
let navLink = document.querySelectorAll("header ul.navlist a");
let currentPage = window.location.pathname.split("/").pop();

/* 2. Page Load Handlers */
document.addEventListener("DOMContentLoaded", () => {
    navLink.forEach(link => {
        let href = link.getAttribute("href");
        if (currentPage == "") currentPage = "index.html"; // Handle case where current page is root
        // For home page, check explicitly for index.html since section id is "home"
        if (currentPage === "index.html") {
            href === "index.html" ? link.classList.add("active") : link.classList.remove("active");
        } else {
            href.includes(currentPage) ? link.classList.add("active") : link.classList.remove("active");
        }
    });

    const menuIcon = document.querySelector(".menu-icon");
    const headerContainer = document.querySelector(".header-container");
    // increase headerContainer's height when menuIcon is clicked
    menuIcon.addEventListener("click", () => {
        if (menuIcon.classList.contains("active")) {
            headerContainer.style.height = "360px"; // Adjust this value as needed
        } else {
            headerContainer.style.height = "58px"; // Adjust this value as needed
        }
    });

});

/* 3. Navigation & Menu Handlers */
// active hamburger menu 
menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("active");
    navlist.classList.toggle("active");
    document.body.classList.toggle("open");
});

// remove navlist
navlist.addEventListener("click", () => {
    navlist.classList.remove("active");
    menuIcon.classList.remove("active");
    document.body.classList.remove("open");
});

/* 4. Scroll Handlers */
window.onscroll = () => {
    section.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");
        if (top > offset && top < offset + height) {
            navLink.forEach(link => link.classList.remove("active"));
            let activeLink;
            if (currentPage === "index.html" && id === "home") {
                activeLink = document.querySelector('header ul.navlist a[href="index.html"]');
            } else {
                activeLink = document.querySelector('header ul.navlist a[href*="' + id + '"]');
            }
            if (activeLink) activeLink.classList.add("active");
        }
    });
};

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {
                alert("✅ Your message has been sent successfully, Thank you!");
                form.reset();
            } else {
                alert("❌ There was a problem sending the message. Please try again later.");
            }
        } catch (error) {
            alert("❌ An error occurred. Please try again later.");
        }
    });
});


