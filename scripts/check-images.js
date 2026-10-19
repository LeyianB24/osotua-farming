const fs = require('fs');
const path = require('path');

const publicDir = path.resolve('public/images');
const publicImages = new Set(fs.readdirSync(publicDir));

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        results = results.concat(walk(fullPath));
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.json') || file.endsWith('.prisma')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk(path.resolve('src'));
if (fs.existsSync('prisma')) {
  files.push(...walk(path.resolve('prisma')));
}

const missingImages = new Map();
const usedImages = new Set();

const regex1 = /["'`]\/images\/([^"'`?#\${}]+)["'`]/g;
const regex2 = /\bimg\(["']([^"'\${}]+)["']\)/g;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = regex1.exec(content)) !== null) {
    let imgName = decodeURIComponent(match[1]).trim();
    // Ignore input placeholders or url fallbacks
    if (imgName.includes(' or http')) continue;
    usedImages.add(imgName);
    if (!publicImages.has(imgName)) {
      if (!missingImages.has(imgName)) {
        missingImages.set(imgName, []);
      }
      missingImages.get(imgName).push(path.relative(process.cwd(), file));
    }
  }
  while ((match = regex2.exec(content)) !== null) {
    let imgName = decodeURIComponent(match[1]).trim();
    usedImages.add(imgName);
    if (!publicImages.has(imgName)) {
      if (!missingImages.has(imgName)) {
        missingImages.set(imgName, []);
      }
      missingImages.get(imgName).push(path.relative(process.cwd(), file));
    }
  }
});

console.log('=== MISSING / INVALID IMAGE REFERENCES ===');
if (missingImages.size === 0) {
  console.log('None! All /images/* and img(...) references point to valid files on disk.');
} else {
  for (let [img, fileList] of missingImages.entries()) {
    console.log(`Missing: "${img}" in:`, fileList);
  }
}
console.log('\nTotal unique images referenced:', usedImages.size);
console.log('Total files in public/images:', publicImages.size);

const unused = [];
for (let img of publicImages) {
  if (!usedImages.has(img)) {
    unused.push(img);
  }
}
console.log('\n=== UNUSED IMAGES IN public/images (' + unused.length + ') ===');
console.log(unused.join('\n'));
