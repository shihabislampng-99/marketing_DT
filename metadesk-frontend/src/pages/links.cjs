const fs = require('fs');

const fixLinks = (file) => {
  let content = fs.readFileSync(file, 'utf8');

  // We find nav links like:
  // href="#" with ALL CHATS icon
  // and we also need to avoid wiping out the whole file.

  content = content.replace(/<a([^>]+)href="#"([^>]*)>([\s\S]*?)<\/a>/g, (match, p1, p2, p3) => {
    // If it contains "chat", let's assume inbox
    let toUrl = "/";
    if (match.toLowerCase().includes("settings")) toUrl = "/settings";
    if (match.toLowerCase().includes("dashboard") || match.toLowerCase().includes("analytics") || match.toLowerCase().includes("stats")) toUrl = "/stats";
    
    return `<Link${p1}to="${toUrl}"${p2}>${p3}</Link>`;
  });

  fs.writeFileSync(file, content);
};

fixLinks('Inbox.jsx');
fixLinks('Stats.jsx');
fixLinks('Settings.jsx');
