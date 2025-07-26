function startTyping({
    element,
    lines,
    charDelay = 50,
    lineDelay = 500,
    removeCursor = true
}) {
    let lineIndex = 0;
    let charIndex = 0;
    let currentSpan = null;

    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = ' | ';

    element.textContent = ''; // Clear existing content

    function typeLine() {
        if (lineIndex < lines.length) {
            if (!currentSpan) {
                currentSpan = document.createElement('span');
                currentSpan.className = 'line';
                element.appendChild(currentSpan);
                currentSpan.appendChild(cursor);
            }

            const currentLine = lines[lineIndex];

            if (charIndex < currentLine.length) {
                cursor.before(document.createTextNode(currentLine.charAt(charIndex)));
                charIndex++;
                setTimeout(typeLine, charDelay);
            } else {
                lineIndex++;
                charIndex = 0;
                currentSpan.removeChild(cursor);
                currentSpan = null;
                setTimeout(typeLine, lineDelay);
            }
        } else if (removeCursor) {
            cursor.remove();
        }
    }

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
