import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js'

const app = LiquidBackground(document.getElementById('canvas'))

app.loadImage('./bg4.jpg').then(() => {
    app.start()
})
app.liquidPlane.material.metalness = 0.75
app.liquidPlane.material.roughness = 0.9
app.liquidPlane.uniforms.displacementScale.value = 10
app.setRain(false)