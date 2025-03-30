// active hamburger menu 
let menuIcon = document.querySelector(".menu-icon");

let navlist = document.querySelector(".navlist");
console.log(navlist);
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

let section = document.querySelectorAll("section");
// Updated to select links inside the navlist
let navLink = document.querySelectorAll("header ul.navlist a");

// Get current page filename
let currentPage = window.location.pathname.split("/").pop();

// On DOM load, activate the nav link based on the current file
document.addEventListener("DOMContentLoaded", () => {
    navLink.forEach(link => {
        let href = link.getAttribute("href");
        if(currentPage=="") currentPage="index.html"; // Handle case where current page is root
        // For home page, check explicitly for index.html since section id is "home"
        if (currentPage === "index.html") {
            href === "index.html" ? link.classList.add("active") : link.classList.remove("active");
        } else {
            href.includes(currentPage) ? link.classList.add("active") : link.classList.remove("active");
        }
    });
});

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