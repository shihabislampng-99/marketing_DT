const fs = require('fs');

const fixScroll = (file) => {
  let content = fs.readFileSync(file, 'utf8');
  // Add h-full overflow-y-auto custom-scrollbar to the main content section
  content = content.replace(
    /className="flex-1 ml-0 md:ml-\[280px\] p-8 max-w-5xl mx-auto space-y-12"/,
    'className="flex-1 ml-0 md:ml-[280px] p-8 max-w-5xl mx-auto space-y-12 h-screen overflow-y-auto custom-scrollbar pb-32"'
  );
  content = content.replace(
    /className="flex-1 ml-0 md:ml-\[280px\] p-8 overflow-y-auto custom-scrollbar"/, // analytics might have it?
    'className="flex-1 ml-0 md:ml-[280px] p-8 h-[calc(100vh-64px)] overflow-y-auto custom-scrollbar pb-32"'
  );
  
  // also fix <main className="pt-16 min-h-screen flex"> to h-screen
  content = content.replace(/className="pt-16 min-h-screen flex"/, 'className="pt-16 h-screen flex"');

  fs.writeFileSync(file, content);
};

fixScroll('Settings.jsx');
fixScroll('Stats.jsx');

