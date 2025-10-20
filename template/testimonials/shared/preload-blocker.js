// Preload blocker: hide page and pause animations until full load
// Usage: include this script as the FIRST script in <head> (no async/defer)
(function () {
    // Create a style element with high specificity to hide content and pause animations
    var style = document.createElement('style');
    style.id = 'preload-blocker-style';
    style.textContent = '\n    html, body { visibility: hidden !important; height: 100% !important; overflow: hidden !important; }\n    * { animation-play-state: paused !important; transition: none !important; }\n  ';
    // Insert into head immediately
    var head = document.getElementsByTagName('head')[0];
    if (head) head.insertBefore(style, head.firstChild);

    function reveal() {
        try {
            var s = document.getElementById('preload-blocker-style');
            if (s && s.parentNode) s.parentNode.removeChild(s);
            // Force reflow and allow animations to restart
            void document.documentElement.offsetWidth;
        } catch (e) { /* ignore */ }
    }

    // Helper: load a single URL via Image and resolve on load or error
    function loadUrl(url) {
        return new Promise(function (resolve) {
            try {
                var img = new Image();
                img.onload = img.onerror = function () { resolve(url); };
                // Prevent caching differences from blocking -- set src last
                img.src = url;
            } catch (e) {
                resolve(url);
            }
        });
    }

    // Collect image URLs from <img> elements and computed background-image values
    function collectImagePromises() {
        var urls = new Set();

        // <img> elements
        var imgs = document.getElementsByTagName('img');
        for (var i = 0; i < imgs.length; i++) {
            var el = imgs[i];
            // prefer src, but handle srcset by taking the first candidate
            if (el.currentSrc) urls.add(el.currentSrc);
            else if (el.src) urls.add(el.src);
        }

        // computed background-image for all elements (may be expensive on very large pages)
        var all = document.getElementsByTagName('*');
        for (var j = 0; j < all.length; j++) {
            try {
                var style = window.getComputedStyle(all[j]);
                if (!style) continue;
                var bg = style.getPropertyValue('background-image');
                if (bg && bg !== 'none') {
                    // background-image can contain multiple urls, like: url("a"), url("b")
                    var matches = bg.match(/url\(([^)]+)\)/g);
                    if (matches) {
                        matches.forEach(function (m) {
                            // strip url(...) and surrounding quotes
                            var u = m.replace(/url\(/i, '').replace(/\)/, '').replace(/^['"]|['"]$/g, '').trim();
                            if (u) urls.add(u);
                        });
                    }
                }
            } catch (e) {
                // getComputedStyle may throw in some cases; ignore
            }
        }

        // Create promises for each unique url
        var promises = [];
        urls.forEach(function (u) { promises.push(loadUrl(u)); });
        return promises;
    }

    // Run image collection after DOM is available
    function startWaitingForImages() {
        var promises = collectImagePromises();

        if (!promises.length) {
            // No images found: reveal on next microtask so page isn't blank for too long
            setTimeout(reveal, 0);
            return;
        }

        var timeout = setTimeout(function () {
            // Fallback: reveal after 15s if images never resolve
            reveal();
        }, 15000);

        Promise.all(promises).then(function () {
            clearTimeout(timeout);
            reveal();
        }).catch(function () {
            // On any unexpected error, reveal anyway
            clearTimeout(timeout);
            reveal();
        });
    }

    // If DOM not ready, wait for DOMContentLoaded to scan for elements, otherwise start now
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startWaitingForImages);
        // Also listen to a load event as a safety net in case images are added after DOMContentLoaded
        window.addEventListener('load', function () { startWaitingForImages(); }, { once: true });
    } else {
        // DOM already parsed
        startWaitingForImages();
    }

})();
