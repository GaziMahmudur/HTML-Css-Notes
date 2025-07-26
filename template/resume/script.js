// Intersection Observer to reveal elements on scroll (repeatable)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        } else {
            entry.target.classList.remove("visible"); // Remove when out of view
        }
    });
}, {
    threshold: 0.1,
});

// Observe all elements with .reveal
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
