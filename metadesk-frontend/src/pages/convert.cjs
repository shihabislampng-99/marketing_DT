const fs = require('fs');

const files = ['inbox.html', 'analytics.html', 'settings.html'];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Extract only the body content
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    content = bodyMatch[1];
  }
  
  // Replace class= with className=
  content = content.replace(/class=/g, 'className=');
  
  // Replace HTML comments with block comments or remove them
  content = content.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
  
  // Fix unclosed img and input tags
  content = content.replace(/<img([^>]*)>/g, (match, p1) => {
    if (p1.trim().endsWith('/')) return match;
    return `<img${p1}/>`;
  });
  
  content = content.replace(/<input([^>]*)>/g, (match, p1) => {
    if (p1.trim().endsWith('/')) return match;
    return `<input${p1}/>`;
  });

  content = content.replace(/<br[^>]*>/gi, '<br/>');
  content = content.replace(/<hr[^>]*>/gi, '<hr/>');

  // Fix SVG / custom tags
  content = content.replace(/stroke-width=/g, 'strokeWidth=');
  content = content.replace(/stroke-linecap=/g, 'strokeLinecap=');
  content = content.replace(/stroke-linejoin=/g, 'strokeLinejoin=');
  content = content.replace(/for=/g, 'htmlFor=');
  
  // Fix style attributes
  content = content.replace(/style="([^"]*)"/g, (match, styles) => {
    return 'style={{ ' + styles.split(';').filter(s => s.trim()).map(s => {
      const parts = s.split(':');
      if (parts.length < 2) return '';
      const key = parts[0].trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
      const value = parts[1].trim();
      return `${key}: '${value}'`;
    }).join(', ') + ' }}';
  });

  fs.writeFileSync(file + '.jsx', `<>\n${content}\n</>`);
}
console.log('Conversion complete!');
