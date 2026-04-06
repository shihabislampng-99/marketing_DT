const fs = require('fs');

const files = ['Stats.jsx', 'Settings.jsx', 'Inbox.jsx'];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace the Settings icon button in the TopNavBar with a React Router Link
  content = content.replace(
    /(<button[^>]*>\s*<span[^>]*data-icon="settings"[^>]*>settings<\/span>\s*<\/button>)/,
    `<Link to="/settings" className="p-2 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors rounded-full duration-200 block">\n<span className="material-symbols-outlined text-slate-500 hover:text-blue-600 transition-colors" data-icon="settings">settings</span>\n</Link>`
  );

  // Stats navigation
  // Is there a dashboard/analytics icon in TopBar? No. It's usually a left nav.
  // Wait, let's look at the left nav links. 
  // Stitch often creates 'forum' for all chats, 'chat' for WhatsApp, etc.
  
  // We already replaced <a href="#"> with <Link> but let's just make the whole text "MetaDesk" go to "/"
  content = content.replace(
    /(<span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50 font-headline[^>]*>MetaDesk<\/span>)/,
    `<Link to="/"> $1 </Link>`
  );

  fs.writeFileSync(file, content);
}
console.log('Fixed Top Nav Links');
