// ====== Active Hamburger Menu ======
const menuIcon = document.querySelector(".menu-icon");
const navlist = document.querySelector(".navlist");

menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("active");
    navlist.classList.toggle("active");
    document.body.classList.toggle("open");
});

// Remove navlist when clicking a nav link (or anywhere inside navlist)
navlist.addEventListener("click", (e) => {
    // নিশ্চিত করো ক্লিক করা এলিমেন্টটি লিঙ্ক কিনা
    if (e.target.tagName === "A") {
        navlist.classList.remove("active");
        menuIcon.classList.remove("active");
        document.body.classList.remove("open");
    }
});

// ====== Nav Active Link Based on Page ======
const navLinks = document.querySelectorAll("header ul.navlist a");
const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.addEventListener("DOMContentLoaded", () => {
    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (currentPage === "index.html") {
            href === "index.html"
                ? link.classList.add("active")
                : link.classList.remove("active");
        } else {
            href.includes(currentPage)
                ? link.classList.add("active")
                : link.classList.remove("active");
        }
    });
});