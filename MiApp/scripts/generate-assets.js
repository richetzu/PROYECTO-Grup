const fs = require('fs');
const path = require('path');

// 1x1 transparent PNG (base64)
const base64Png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAn8B9U3mMAAAAABJRU5ErkJggg==';
const files = ['icon.png', 'splash.png', 'adaptive-icon.png', 'favicon.png'];
const dir = path.join(__dirname, '..', 'assets');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

files.forEach((name) => {
  const filePath = path.join(dir, name);
  fs.writeFileSync(filePath, Buffer.from(base64Png, 'base64'));
  console.log('Written', filePath);
});

console.log('Asset generation complete.');
