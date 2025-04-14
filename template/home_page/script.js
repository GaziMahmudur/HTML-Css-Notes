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

// Fireflies effect
function createFirefly() {
    const firefly = document.createElement('div');
    firefly.className = 'firefly';
    
    // Random positions and timings
    const x1 = Math.random() * window.innerWidth;
    const y1 = Math.random() * window.innerHeight;
    const x2 = Math.random() * window.innerWidth;
    const y2 = Math.random() * window.innerHeight;
    
    firefly.style.setProperty('--x1', `${x1}px`);
    firefly.style.setProperty('--y1', `${y1}px`);
    firefly.style.setProperty('--x2', `${x2}px`);
    firefly.style.setProperty('--y2', `${y2}px`);
    firefly.style.setProperty('--move-time', `${15 + Math.random() * 15}s`);
    firefly.style.setProperty('--flash-time', `${3 + Math.random() * 4}s`);
    
    return firefly;
}

function initFireflies(count = 20) {
    const container = document.createElement('div');
    container.className = 'fireflies-container';
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    for (let i = 0; i < count; i++) {
        container.appendChild(createFirefly());
    }
    
    document.body.appendChild(container);
}

// Initialize fireflies after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    initFireflies();
});