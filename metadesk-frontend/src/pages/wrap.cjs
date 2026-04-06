const fs = require('fs');

const wrap = (file, componentName) => {
  let content = fs.readFileSync(file, 'utf8');
  // It starts with <> and ends with </>
  let final = `import React from 'react';\nimport { Link } from 'react-router-dom';\n\nexport default function ${componentName}() {\n  return (\n    ${content}\n  );\n}\n`;
  
  // Also we want to change generic <a href="#"> to <Link to="..."> for navigation!
  // In Stitch they used <a> tags for the nav. Let's make them Links.
  // We can't perfectly regex the Links without breaking things, so we'll just wrap it for now.
  fs.writeFileSync(file, final);
}

wrap('Inbox.jsx', 'Inbox');
wrap('Stats.jsx', 'Stats');
wrap('Settings.jsx', 'Settings');
