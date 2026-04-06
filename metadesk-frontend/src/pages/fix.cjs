const fs = require('fs');
const files = ['Stats.jsx', 'Settings.jsx', 'Inbox.jsx'];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/''FILL' 1'/g, `"'FILL' 1"`);
  fs.writeFileSync(file, content);
}
console.log('Fixed');
