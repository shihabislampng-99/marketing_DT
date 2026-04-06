<>

{/*  TopNavBar  */}
<nav className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-xl shadow-sm flex justify-between items-center w-full px-6 h-16">
<div className="flex items-center gap-8">
<span className="text-xl font-bold tracking-tight text-slate-900 brand-font">Jinn</span>
<div className="hidden md:flex items-center gap-6">
<span className="font-manrope text-sm font-medium text-slate-500">142 conversations</span>
<span className="font-manrope text-sm font-medium text-slate-500">28 active today</span>
<span className="font-manrope text-sm font-medium text-slate-500">89% AI-handled</span>
</div>
</div>
<div className="flex items-center gap-4">
<button className="p-2 rounded-full hover:bg-slate-100/50 transition-colors">
<span className="material-symbols-outlined text-slate-500" data-icon="notifications">notifications</span>
</button>
<button className="p-2 rounded-full hover:bg-slate-100/50 transition-colors text-blue-600 font-semibold">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
</button>
<div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container-highest">
<img alt="User Avatar" data-alt="Close up portrait of a professional man with a friendly expression in clean office lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXK66xynBplB6mY-4F6Zd2TWIScgM0uDccVN-ArGMKYcsD8ycU9E-PBzyC4lhkDt-VS7GY6Fvgqd-5Qx7n8mRCx1vm_bA4kWM6a6_m7sCvM5MGEqwO4oeHifKIEWcJUYcWoq5UE8rhHxy0z114o47aFMwcFH6YoFgSnQ4XCmSP3EMFQttHVmIa4VH57oWGHBH2zmA1aAfoOM4uGFYBF5F7oMPQ1wGRK6wpJLseIr-xkex1CBbzTGmLKG9xIIF0gCBHuWJSBnMPW5ce"/>
</div>
</div>
</nav>
{/*  Main Layout Shell  */}
<main className="pt-16 min-h-screen flex">
{/*  SideNav (Internal Settings Navigation)  */}
<aside className="hidden md:flex flex-col w-[280px] fixed left-0 top-16 bottom-0 bg-[#1a1a2e] py-6 gap-2">
<div className="px-6 mb-6">
<p className="font-manrope uppercase tracking-wider text-[11px] font-bold text-slate-400">Settings Categories</p>
</div>
<a className="mx-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600/10 text-blue-400 border-r-2 border-blue-500 transition-all" href="#api">
<span className="material-symbols-outlined" data-icon="api">api</span>
<span className="font-manrope text-[13px] font-bold uppercase tracking-wider">API Connections</span>
</a>
<a className="mx-4 flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-all" href="#ai">
<span className="material-symbols-outlined" data-icon="smart_toy">smart_toy</span>
<span className="font-manrope text-[13px] font-bold uppercase tracking-wider">AI Configuration</span>
</a>
<a className="mx-4 flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-all" href="#knowledge">
<span className="material-symbols-outlined" data-icon="database">database</span>
<span className="font-manrope text-[13px] font-bold uppercase tracking-wider">Knowledge Base</span>
</a>
<div className="mt-auto px-4">
<a className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-all" href="#help">
<span className="material-symbols-outlined" data-icon="help">help</span>
<span className="font-manrope text-[13px] font-bold uppercase tracking-wider">Support</span>
</a>
</div>
</aside>
{/*  Content Canvas  */}
<section className="flex-1 ml-0 md:ml-[280px] p-8 max-w-5xl mx-auto space-y-12">
{/*  Page Header  */}
<header className="mb-12">
<h1 className="text-3xl font-extrabold tracking-tight text-on-surface">Settings</h1>
<p className="text-on-surface-variant font-body mt-2">Manage your platform integrations, AI behavior, and data sources.</p>
</header>
{/*  API Connections Section  */}
<div className="space-y-6" id="api">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-primary-container" data-icon="hub">hub</span>
<h2 className="text-xl font-bold font-headline uppercase tracking-wide text-on-surface-variant">API Connections</h2>
</div>
<div className="grid grid-cols-1 gap-4">
{/*  Messaging Channels  */}
<div className="bg-surface-container-high rounded-xl p-6 space-y-6">
<h3 className="text-sm font-bold text-on-surface/60 uppercase tracking-widest">Social Channels</h3>
<div className="grid md:grid-cols-2 gap-6">
<div className="space-y-2">
<label className="block text-xs font-bold text-on-surface-variant uppercase ml-1">WhatsApp Token</label>
<div className="flex gap-2">
<input className="flex-1 bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-on-primary-container focus:bg-surface-container-lowest transition-all" type="password" value="••••••••••••••••"/>
<button className="bg-on-primary-container text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">Save</button>
</div>
</div>
<div className="space-y-2">
<label className="block text-xs font-bold text-on-surface-variant uppercase ml-1">Instagram Token</label>
<div className="flex gap-2">
<input className="flex-1 bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-on-primary-container focus:bg-surface-container-lowest transition-all" type="password" value="••••••••••••••••"/>
<button className="bg-on-primary-container text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">Save</button>
</div>
</div>
<div className="space-y-2">
<label className="block text-xs font-bold text-on-surface-variant uppercase ml-1">Messenger Token</label>
<div className="flex gap-2">
<input className="flex-1 bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-on-primary-container focus:bg-surface-container-lowest transition-all" type="password" value="••••••••••••••••"/>
<button className="bg-on-primary-container text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">Save</button>
</div>
</div>
</div>
</div>
{/*  AI Providers  */}
<div className="bg-surface-container-high rounded-xl p-6 space-y-6">
<h3 className="text-sm font-bold text-on-surface/60 uppercase tracking-widest">AI LLM Providers</h3>
<div className="grid md:grid-cols-2 gap-6">
<div className="space-y-2">
<label className="block text-xs font-bold text-on-surface-variant uppercase ml-1">OpenRouter API Key</label>
<div className="flex gap-2">
<input className="flex-1 bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-on-primary-container focus:bg-surface-container-lowest transition-all" placeholder="sk-or-v1-..." type="password"/>
<button className="bg-on-primary-container text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">Save</button>
</div>
</div>
<div className="space-y-2">
<label className="block text-xs font-bold text-on-surface-variant uppercase ml-1">Groq API Key</label>
<div className="flex gap-2">
<input className="flex-1 bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-on-primary-container focus:bg-surface-container-lowest transition-all" placeholder="gsk_..." type="password"/>
<button className="bg-on-primary-container text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">Save</button>
</div>
</div>
</div>
</div>
</div>
</div>
{/*  AI Configuration Section  */}
<div className="space-y-6" id="ai">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-primary-container" data-icon="psychology">psychology</span>
<h2 className="text-xl font-bold font-headline uppercase tracking-wide text-on-surface-variant">AI Configuration</h2>
</div>
<div className="bg-surface-container-high rounded-xl p-6 space-y-8">
<div className="flex flex-col md:flex-row gap-8">
<div className="flex-1 space-y-2">
<label className="block text-xs font-bold text-on-surface-variant uppercase ml-1">Business Name</label>
<input className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-on-primary-container focus:bg-surface-container-lowest transition-all" type="text" value="Jinn Solutions Inc."/>
</div>
<div className="flex items-center gap-4 px-4 py-3 bg-surface-container-low rounded-xl">
<span className="text-sm font-medium text-on-surface">Default AI for new contacts</span>
<div className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-secondary-container rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-on-primary-container"></div>
</div>
</div>
</div>
<div className="space-y-6">
<div className="space-y-2">
<div className="flex items-center gap-2 mb-1">
<span className="material-symbols-outlined text-[18px] text-on-tertiary-container" data-icon="chat">chat</span>
<label className="text-xs font-bold text-on-surface-variant uppercase">WhatsApp System Prompt</label>
</div>
<textarea className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-on-primary-container focus:bg-surface-container-lowest transition-all resize-none" rows="4">You are a professional assistant for Jinn. Keep responses brief and friendly. Use emojis sparingly. Answer based ONLY on the knowledge base provided.</textarea>
</div>
<div className="space-y-2">
<div className="flex items-center gap-2 mb-1">
<span className="material-symbols-outlined text-[18px] text-[#d6249f]" data-icon="photo_camera">photo_camera</span>
<label className="text-xs font-bold text-on-surface-variant uppercase">Instagram System Prompt</label>
</div>
<textarea className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-on-primary-container focus:bg-surface-container-lowest transition-all resize-none" rows="4">Adopt a vibrant, visual, and highly engaging tone. Use relevant hashtags and interactive language. Focus on brand aesthetics.</textarea>
</div>
<div className="space-y-2">
<div className="flex items-center gap-2 mb-1">
<span className="material-symbols-outlined text-[18px] text-blue-500" data-icon="send">send</span>
<label className="text-xs font-bold text-on-surface-variant uppercase">Messenger System Prompt</label>
</div>
<textarea className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-on-primary-container focus:bg-surface-container-lowest transition-all resize-none" rows="4">Focus on rapid support and utility. Use structured lists where helpful. Be direct and concise.</textarea>
</div>
</div>
</div>
</div>
{/*  Knowledge Base Section  */}
<div className="space-y-6 pb-20" id="knowledge">
<div className="flex justify-between items-end">
<div className="space-y-2">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-primary-container" data-icon="auto_stories">auto_stories</span>
<h2 className="text-xl font-bold font-headline uppercase tracking-wide text-on-surface-variant">Knowledge Base</h2>
</div>
<p className="text-sm text-on-surface-variant max-w-md">Provide specific data chunks for the AI to reference when answering customer inquiries.</p>
</div>
<button className="flex items-center gap-2 instagram-gradient text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-pink-500/20 hover:scale-[1.02] transition-transform">
<span className="material-symbols-outlined" data-icon="add">add</span>
                        Add New Chunk
                    </button>
</div>
<div className="bg-surface-container-high rounded-xl overflow-hidden">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-highest/50">
<th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Topic</th>
<th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Preview</th>
<th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-center">Status</th>
<th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-variant/30">
<tr className="hover:bg-surface-container/50 transition-colors">
<td className="px-6 py-4 font-semibold text-sm">Pricing Plans 2024</td>
<td className="px-6 py-4 text-sm text-on-surface-variant">Jinn offers three tiers: Starter ($29/mo), Pro ($99/mo), and...</td>
<td className="px-6 py-4">
<div className="flex justify-center">
<span className="px-3 py-1 rounded-full bg-on-tertiary-container/10 text-on-tertiary-container text-[10px] font-bold uppercase tracking-widest">Active</span>
</div>
</td>
<td className="px-6 py-4 text-right">
<div className="flex justify-end gap-2">
<button className="p-2 text-on-surface-variant hover:text-on-primary-container hover:bg-surface-container-highest rounded-lg transition-all">
<span className="material-symbols-outlined text-[20px]" data-icon="edit">edit</span>
</button>
<button className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/20 rounded-lg transition-all">
<span className="material-symbols-outlined text-[20px]" data-icon="delete">delete</span>
</button>
</div>
</td>
</tr>
<tr className="hover:bg-surface-container/50 transition-colors">
<td className="px-6 py-4 font-semibold text-sm">Return Policy</td>
<td className="px-6 py-4 text-sm text-on-surface-variant">Customers can request a full refund within 14 days of purchase if...</td>
<td className="px-6 py-4">
<div className="flex justify-center">
<span className="px-3 py-1 rounded-full bg-on-tertiary-container/10 text-on-tertiary-container text-[10px] font-bold uppercase tracking-widest">Active</span>
</div>
</td>
<td className="px-6 py-4 text-right">
<div className="flex justify-end gap-2">
<button className="p-2 text-on-surface-variant hover:text-on-primary-container hover:bg-surface-container-highest rounded-lg transition-all">
<span className="material-symbols-outlined text-[20px]" data-icon="edit">edit</span>
</button>
<button className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/20 rounded-lg transition-all">
<span className="material-symbols-outlined text-[20px]" data-icon="delete">delete</span>
</button>
</div>
</td>
</tr>
<tr className="hover:bg-surface-container/50 transition-colors">
<td className="px-6 py-4 font-semibold text-sm">New Product Launch Q3</td>
<td className="px-6 py-4 text-sm text-on-surface-variant">The upcoming Jinn Mobile App is scheduled for release on Sept 15...</td>
<td className="px-6 py-4">
<div className="flex justify-center">
<span className="px-3 py-1 rounded-full bg-on-secondary-container/10 text-on-secondary-container text-[10px] font-bold uppercase tracking-widest">Inactive</span>
</div>
</td>
<td className="px-6 py-4 text-right">
<div className="flex justify-end gap-2">
<button className="p-2 text-on-surface-variant hover:text-on-primary-container hover:bg-surface-container-highest rounded-lg transition-all">
<span className="material-symbols-outlined text-[20px]" data-icon="edit">edit</span>
</button>
<button className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/20 rounded-lg transition-all">
<span className="material-symbols-outlined text-[20px]" data-icon="delete">delete</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</section>
</main>
{/*  Modal Mockup (Add New Chunk) - Rendered as part of canvas for layout demonstration  */}
<div className="fixed inset-0 z-[60] bg-on-surface/40 backdrop-blur-sm flex items-center justify-center p-4 hidden">
<div className="bg-surface-container-lowest w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden">
<div className="p-6 border-b border-surface-variant/30 flex justify-between items-center">
<h3 className="text-lg font-bold font-headline">Add Knowledge Chunk</h3>
<button className="material-symbols-outlined text-on-surface-variant hover:text-on-surface" data-icon="close">close</button>
</div>
<div className="p-6 space-y-6">
<div className="space-y-2">
<label className="block text-xs font-bold text-on-surface-variant uppercase ml-1">Topic</label>
<input className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-on-primary-container focus:bg-surface-container-lowest transition-all" placeholder="e.g. Shipping Details" type="text"/>
</div>
<div className="space-y-2">
<label className="block text-xs font-bold text-on-surface-variant uppercase ml-1">Content</label>
<textarea className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-on-primary-container focus:bg-surface-container-lowest transition-all resize-none" placeholder="Paste your knowledge base text here..." rows="8"></textarea>
</div>
</div>
<div className="p-6 bg-surface-container-low flex justify-end gap-3">
<button className="px-6 py-2 rounded-xl text-sm font-semibold text-on-surface-variant hover:bg-surface-container-highest transition-colors">Cancel</button>
<button className="bg-on-primary-container text-white px-8 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:opacity-90 transition-opacity">Save Chunk</button>
</div>
</div>
</div>

</>
