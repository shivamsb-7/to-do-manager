const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'app.js',
  'package.json',
  'public/index.html',
  'public/style.css',
  'public/script.js'
];

const missing = requiredFiles.filter(file =>
  !fs.existsSync(path.join(__dirname, file))
);

if (missing.length > 0) {
  console.error('Build failed. Missing files:', missing.join(', '));
  process.exit(1);
}

console.log('Build successful. All required files are present.');