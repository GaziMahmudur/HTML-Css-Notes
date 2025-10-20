function startTyping({
    element,
    lines,
    charDelay = 50,
    lineDelay = 500,
    removeCursor = true
}) {
    // Clean and filter lines before processing
    lines = lines
        .map(line => {
            // Normalize spaces and trim
            return line
                .replace(/\s+/g, ' ')
                .trim();
        })
        .filter(line => line.length > 0); // Skip empty lines

    let lineIndex = 0;
    let charIndex = 0;
    let currentWrapper = null;
    let currentTextSpan = null;
    let currentBg = null;

    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = '|';

    element.textContent = ''; // Clear existing content

    function updateBgSize() {
        if (!currentTextSpan || !currentBg) return;
        const rect = currentTextSpan.getBoundingClientRect();
        const width = Math.max(rect.width, 0);
        const height = Math.max(rect.height, 0);

        currentBg.style.width = '100%';
        currentBg.style.height = '100%';

        if (!currentTextSpan.classList.contains('visible')) {
            requestAnimationFrame(() => {
                currentTextSpan.classList.add('visible');
            });
        }
    }

    function moveCursor() {
        // Remove cursor from its current location
        if (cursor.parentNode) {
            cursor.parentNode.removeChild(cursor);
        }
        // Append to current text span
        if (currentTextSpan) {
            currentTextSpan.appendChild(cursor);
        }
    }

    function createNewLine() {
        currentWrapper = document.createElement('span');
        currentWrapper.className = 'line-wrapper';

        currentBg = document.createElement('span');
        currentBg.className = 'line-bg';

        currentTextSpan = document.createElement('span');
        currentTextSpan.className = 'line';

        currentWrapper.appendChild(currentBg);
        currentWrapper.appendChild(currentTextSpan);
        element.appendChild(currentWrapper);

        // Initialize background
        currentBg.style.width = '0';
        currentBg.style.height = '0';
        currentBg.style.opacity = '1';

        moveCursor();
    }

    function typeLine() {
        if (lineIndex < lines.length) {
            if (!currentWrapper) {
                createNewLine();
            }

            const currentLine = lines[lineIndex];

            if (charIndex < currentLine.length) {
                const ch = currentLine.charAt(charIndex);
                // Insert character before cursor
                const textNode = document.createTextNode(ch);
                currentTextSpan.insertBefore(textNode, cursor);
                charIndex++;

                requestAnimationFrame(() => {
                    updateBgSize();
                    // Ensure cursor stays at end after size update
                    moveCursor();
                });

                setTimeout(typeLine, charDelay);
            } else {
                // Line complete
                lineIndex++;
                charIndex = 0;
                currentWrapper = null;
                currentTextSpan = null;
                currentBg = null;
                setTimeout(typeLine, lineDelay);
            }
        } else if (removeCursor) {
            cursor.remove();
        }
    }

    // Initialize typed elements
    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll('[data-typed]').forEach(el => {
            const rawHTML = el.innerHTML;

            // Process HTML breaks properly
            const lines = rawHTML
                .split(/<br\s*\/?>/)  // Split on BR tags
                .map(line => {
                    // Clean each line
                    return line
                        .replace(/<[^>]+>/g, '') // Remove any other HTML tags
                        .replace(/\s+/g, ' ')    // Normalize spaces
                        .trim();                 // Remove edge whitespace
                })
                .filter(line => line.length > 0); // Remove empty lines

            const speed = parseInt(el.dataset.speed, 10) || 50;
            const delay = parseInt(el.dataset.delay, 10) || 500;

            startTyping({
                element: el,
                lines,
                charDelay: speed,
                lineDelay: delay
            });
        });
    });

    typeLine();
}

// Initialize typed elements on DOM load
document.addEventListener("DOMContentLoaded", () => {
    const brPlaceholder = '[[BR]]';

    document.querySelectorAll('[data-typed]').forEach(el => {
        const rawHTML = el.innerHTML;
        const lines = rawHTML
            .replace(/<br\s*\/?>/g, brPlaceholder)
            .split(brPlaceholder)
            .map(line => line.trim());

        const speed = parseInt(el.dataset.speed, 10) || 50;
        const delay = parseInt(el.dataset.delay, 10) || 500;

        startTyping({
            element: el,
            lines,
            charDelay: speed,
            lineDelay: delay
        });
    });
});
