const fs = require('fs');
const { execSync } = require('child_process');

const text = execSync('python scripts/extract_pdf.py "D:\\\\MLN_WEB\\\\MLN111_SP26\\\\docs\\\\GIAO TRINH TRIET HOC MAC - LENIN (Quoc gia) (1).pdf"', {encoding: 'utf8', cwd: process.cwd()});

const paragraphs = text.split(/\n\n+/).map(p => p.trim()).filter(Boolean);
const chunks = [];
let cur = '';

for (const p of paragraphs) {
  if ((cur + '\n\n' + p).length > 1200) {
    if (cur) chunks.push(cur);
    cur = p;
  } else {
    cur = cur ? cur + '\n\n' + p : p;
  }
}
if (cur) chunks.push(cur);

console.log('Total chunks:', chunks.length);
console.log('First chunk length:', chunks[0]?.length);
