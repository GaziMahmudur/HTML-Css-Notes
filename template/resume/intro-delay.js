(function () {
  function ready(fn) {
    if (document.readyState === "loading")
      document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  ready(function () {
    const reveals = Array.from(document.querySelectorAll(".reveal"));
    if (!reveals.length) return;
    // base stagger (ms)
    const base = 100;
    // apply per-element transition-delay then add visible class staggered
    reveals.forEach((el, i) => {
      el.style.transitionDelay = i * base + "ms";
      setTimeout(() => el.classList.add("visible"), i * base + 40);
    });
  });
})();
