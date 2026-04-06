const fs = require('fs');

const files = ['Stats.jsx', 'Settings.jsx', 'Inbox.jsx'];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/stroke-dasharray/g, 'strokeDasharray');
  content = content.replace(/stroke-dashoffset/g, 'strokeDashoffset');
  content = content.replace(/clip-path/g, 'clipPath');
  content = content.replace(/fill-opacity/g, 'fillOpacity');
  content = content.replace(/fill-rule/g, 'fillRule');
  content = content.replace(/clip-rule/g, 'clipRule');
  fs.writeFileSync(file, content);
}
console.log('Fixed DOM Warnings');
