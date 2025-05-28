
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
    cursor.classList.add('cursor');
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
                cursor.before(currentLine.charAt(charIndex));
                charIndex++;
                setTimeout(typeLine, charDelay);
            } else {
                // Check for the next line or end
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

// Automatically scan and animate elements with data-typed
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('[data-typed]').forEach(el => {
        // Replace <br> with a unique placeholder for empty lines
        let htmlContent = el.innerHTML;

        // Replace <br> tags with a unique placeholder string for empty lines
        const brPlaceholder = '[[BR]]';
        htmlContent = htmlContent.replace(/<br\s*\/?>/g, brPlaceholder);

        // Split content into lines
        const lines = htmlContent.split(brPlaceholder).map(line => line.trim());

        const speed = parseInt(el.dataset.speed) || 50;
        const delay = parseInt(el.dataset.delay) || 500;

        startTyping({
            element: el,
            lines,
            charDelay: speed,
            lineDelay: delay
        });
    });
});


const bgDiv = document.getElementById('bg');
const content = document.getElementById('content');

const images = [
    './pexels-harold-vasquez-853421-2653362.jpg',
    './emmanuel-phaeton--fBaQFX7q8U-unsplash.jpg',
];

const blurImage = './pexels-harold-vasquez-853421-2653362.jpg'; // যদি ব্লার প্রয়োজন হয়
const selectedImage = images[Math.floor(Math.random() * images.length)];

// Preload image before showing content
const img = new Image();
img.src = selectedImage;
img.onload = () => {
    // When image is fully loaded
    bgDiv.style.backgroundImage = `url('${selectedImage}')`;

    // Optional: Apply blur if it's the blurImage
    if (selectedImage === blurImage) {
        bgDiv.style.filter = 'blur(4px)';
    } else {
        bgDiv.style.filter = 'blur(0px)';
    }

    // Show content after image is ready
    content.classList.remove('hidden');
    setTimeout(() => {
        content.classList.add('visible');
    }, 50); // Small delay to allow transition
};
