// ============================================================
// Script Node.js per generare le icone PNG dell'app
// Richiede: npm install canvas
// Esegui con: node generate-icons.js
// ============================================================
//
// In alternativa, usa uno strumento online come:
//   https://realfavicongenerator.net
//   https://maskable.app/editor
//
// Oppure crea manualmente file PNG con sfondo #6c63ff
// e il simbolo del bilanciere centrato, nelle dimensioni richieste.
//
// ============================================================

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

sizes.forEach(size => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Sfondo con gradiente
  const grad = ctx.createLinearGradient(0, 0, size, size);
  grad.addColorStop(0, '#6c63ff');
  grad.addColorStop(1, '#4f48cc');
  ctx.fillStyle = grad;

  // Bordi arrotondati
  const r = size * 0.22;
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.lineTo(size - r, 0);
  ctx.arcTo(size, 0, size, r, r);
  ctx.lineTo(size, size - r);
  ctx.arcTo(size, size, size - r, size, r);
  ctx.lineTo(r, size);
  ctx.arcTo(0, size, 0, size - r, r);
  ctx.lineTo(0, r);
  ctx.arcTo(0, 0, r, 0, r);
  ctx.closePath();
  ctx.fill();

  // Disegna bilanciere stilizzato
  const scale = size / 512;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 28 * scale;
  ctx.lineCap = 'round';

  // Barra centrale
  ctx.beginPath();
  ctx.moveTo(80 * scale, 256 * scale);
  ctx.lineTo(432 * scale, 256 * scale);
  ctx.stroke();

  // Dischi sinistra
  ctx.lineWidth = 20 * scale;
  [[80, 55, 85],[80, 80, 60]].forEach(([cx, h, w]) => {
    ctx.beginPath();
    ctx.moveTo((cx - w/2) * scale, (256 - h) * scale);
    ctx.lineTo((cx - w/2) * scale, (256 + h) * scale);
    ctx.stroke();
  });

  // Dischi destra (simmetrico)
  [[432, 55, 85],[432, 80, 60]].forEach(([cx, h, w]) => {
    ctx.beginPath();
    ctx.moveTo((cx + w/2) * scale, (256 - h) * scale);
    ctx.lineTo((cx + w/2) * scale, (256 + h) * scale);
    ctx.stroke();
  });

  const buffer = canvas.toBuffer('image/png');
  const filename = path.join(__dirname, `icon-${size}x${size}.png`);
  fs.writeFileSync(filename, buffer);
  console.log(`✓ Creata: icon-${size}x${size}.png`);
});

console.log('\n✅ Tutte le icone generate con successo!');
