// loader.js

// 1. Inject styles for the loader
const style = document.createElement('style');
style.textContent = `
  #global-loader {
    position: fixed;
    z-index: 99999;
    background: white;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
document.head.appendChild(style);

// 2. Inject the loader markup via iframe
document.write(`
  <div id="global-loader">
    <iframe src="https://lottie.host/embed/3d1aa194-f8cc-4bba-ba02-fbd747b6985f/pKA02lD1Wa.lottie"
            style="width: 200px; height: 200px; border: none;"
            allowfullscreen></iframe>
  </div>
`);

// 3. Remove the loader after page fully loads
window.addEventListener('load', () => {
  const loader = document.getElementById('global-loader');
  if (loader) {
    loader.style.transition = 'opacity 0.4s ease';
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 10000);
  }
});