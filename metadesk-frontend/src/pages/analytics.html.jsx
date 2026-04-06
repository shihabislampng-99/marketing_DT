<>

{/*  TopNavBar (Shared Component)  */}
<header className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-xl shadow-sm h-16 flex justify-between items-center px-6">
<div className="flex items-center gap-8">
<h1 className="font-headline text-xl font-bold tracking-tight text-on-surface">Jinn</h1>
<nav className="hidden md:flex gap-6 items-center">
<span className="font-headline text-sm font-semibold text-on-primary-container">142 conversations</span>
<span className="font-headline text-sm font-medium text-slate-500">28 active today</span>
<span className="font-headline text-sm font-medium text-slate-500">89% AI-handled</span>
</nav>
</div>
<div className="flex items-center gap-4">
<button className="p-2 hover:bg-slate-100/50 transition-colors rounded-full text-slate-500">
<span className="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button className="p-2 hover:bg-slate-100/50 transition-colors rounded-full text-slate-500">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
</button>
<div className="h-8 w-8 rounded-full overflow-hidden ml-2 ring-2 ring-surface-container-highest">
<img alt="User Avatar" data-alt="professional portrait of a high-tech executive woman with soft studio lighting and clean blurred background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2krWSxiVSu-bEGLsDph_QolNC3FsUkGCkFKxHpkK2hByRKA7x6RBuYUq4gat5EEpFxt2cK7cLfFCameBPW8iATVXx-yPmnvjASDF5xuHzUmg5J6gTnjXbUObt88-Ia2RC1_vfOgDsZrBq-y8ddS_xmdrBt-rUFEVi0nJUc6zxE8NKp8BuyPTHze09zaV7Oa8CJ6Exm1xg_8IAQbjWopn29KIt1ujhWhirJaT8MtFiaRLDJosysEJvJRYUeBoS30JhJM8MaY2HuOqH"/>
</div>
</div>
</header>
{/*  SideNavBar (Shared Component)  */}
<aside className="hidden lg:flex flex-col py-6 gap-8 h-screen w-[280px] fixed left-0 top-0 bg-[#1a1a2e] z-40">
<div className="px-6 mb-4 flex items-center gap-3">
<div className="w-8 h-8 rounded bg-on-primary-container flex items-center justify-center">
<span className="material-symbols-outlined text-white text-sm" data-icon="forum">forum</span>
</div>
<div>
<div className="text-white font-black text-lg font-headline leading-tight">Jinn</div>
<div className="font-label uppercase tracking-wider text-[11px] font-bold text-slate-400">Unified Messaging</div>
</div>
</div>
<div className="flex flex-col gap-1 px-3">
<a className="flex items-center gap-4 px-3 py-3 rounded-xl transition-all text-slate-400 hover:text-slate-200 hover:bg-white/5 font-label uppercase tracking-wider text-[11px] font-bold" href="#">
<span className="material-symbols-outlined" data-icon="forum">forum</span>
                All Chats
            </a>
<a className="flex items-center gap-4 px-3 py-3 rounded-xl transition-all text-slate-400 hover:text-slate-200 hover:bg-white/5 font-label uppercase tracking-wider text-[11px] font-bold" href="#">
<span className="material-symbols-outlined" data-icon="chat">chat</span>
                WhatsApp
            </a>
<a className="flex items-center gap-4 px-3 py-3 rounded-xl transition-all text-slate-400 hover:text-slate-200 hover:bg-white/5 font-label uppercase tracking-wider text-[11px] font-bold" href="#">
<span className="material-symbols-outlined" data-icon="photo_camera">photo_camera</span>
                Instagram
            </a>
<a className="flex items-center gap-4 px-3 py-3 rounded-xl transition-all text-slate-400 hover:text-slate-200 hover:bg-white/5 font-label uppercase tracking-wider text-[11px] font-bold" href="#">
<span className="material-symbols-outlined" data-icon="send">send</span>
                Messenger
            </a>
<a className="flex items-center gap-4 px-3 py-3 rounded-xl transition-all bg-blue-600/10 text-blue-400 border-r-2 border-blue-500 font-label uppercase tracking-wider text-[11px] font-bold" href="#">
<span className="material-symbols-outlined" data-icon="analytics" style={{ fontVariationSettings: ''FILL' 1' }}>analytics</span>
                Analytics
            </a>
</div>
<div className="mt-auto px-3 flex flex-col gap-1">
<a className="flex items-center gap-4 px-3 py-3 rounded-xl transition-all text-slate-400 hover:text-slate-200 hover:bg-white/5 font-label uppercase tracking-wider text-[11px] font-bold" href="#">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
                Settings
            </a>
<a className="flex items-center gap-4 px-3 py-3 rounded-xl transition-all text-slate-400 hover:text-slate-200 hover:bg-white/5 font-label uppercase tracking-wider text-[11px] font-bold" href="#">
<span className="material-symbols-outlined" data-icon="help">help</span>
                Support
            </a>
</div>
</aside>
{/*  Main Canvas  */}
<main className="lg:ml-[280px] pt-24 px-6 pb-12 min-h-screen">
<header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<div className="font-label uppercase tracking-wider text-[12px] font-bold text-on-primary-container mb-1">Performance Overview</div>
<h2 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight">Analytics Dashboard</h2>
</div>
<div className="flex items-center gap-3">
<div className="bg-surface-container-high px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium">
<span className="material-symbols-outlined text-sm" data-icon="calendar_today">calendar_today</span>
                    Last 30 Days
                    <span className="material-symbols-outlined text-sm" data-icon="expand_more">expand_more</span>
</div>
<button className="bg-on-primary-container text-white px-5 py-2 rounded-xl text-sm font-semibold hover:shadow-lg transition-all flex items-center gap-2">
<span className="material-symbols-outlined text-sm" data-icon="download">download</span>
                    Export Report
                </button>
</div>
</header>
{/*  Key Metrics Grid  */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
{/*  Metric 1  */}
<div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm ring-1 ring-on-surface/5 transition-transform hover:-translate-y-1">
<div className="flex items-center justify-between mb-4">
<div className="p-2 bg-on-primary-container/10 rounded-lg text-on-primary-container">
<span className="material-symbols-outlined" data-icon="forum">forum</span>
</div>
<div className="text-on-tertiary-container flex items-center text-xs font-bold bg-tertiary-fixed/20 px-2 py-1 rounded-full">
<span className="material-symbols-outlined text-[14px] mr-1" data-icon="trending_up">trending_up</span>
                        +12%
                    </div>
</div>
<div className="text-slate-500 text-sm font-medium mb-1">Total Conversations</div>
<div className="font-headline text-2xl font-bold text-on-surface">12,482</div>
</div>
{/*  Metric 2  */}
<div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm ring-1 ring-on-surface/5 transition-transform hover:-translate-y-1">
<div className="flex items-center justify-between mb-4">
<div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
<span className="material-symbols-outlined" data-icon="chat_bubble">chat_bubble</span>
</div>
<div className="text-on-tertiary-container flex items-center text-xs font-bold bg-tertiary-fixed/20 px-2 py-1 rounded-full">
<span className="material-symbols-outlined text-[14px] mr-1" data-icon="trending_up">trending_up</span>
                        +8%
                    </div>
</div>
<div className="text-slate-500 text-sm font-medium mb-1">Messages Today</div>
<div className="font-headline text-2xl font-bold text-on-surface">842</div>
</div>
{/*  Metric 3  */}
<div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm ring-1 ring-on-surface/5 transition-transform hover:-translate-y-1">
<div className="flex items-center justify-between mb-4">
<div className="p-2 bg-on-tertiary-container/10 rounded-lg text-on-tertiary-container">
<span className="material-symbols-outlined" data-icon="smart_toy" style={{ fontVariationSettings: ''FILL' 1' }}>smart_toy</span>
</div>
<div className="text-on-tertiary-container flex items-center text-xs font-bold bg-tertiary-fixed/20 px-2 py-1 rounded-full">
<span className="material-symbols-outlined text-[14px] mr-1" data-icon="trending_up">trending_up</span>
                        +24%
                    </div>
</div>
<div className="text-slate-500 text-sm font-medium mb-1">AI Replies Today</div>
<div className="font-headline text-2xl font-bold text-on-surface">754</div>
</div>
{/*  Metric 4  */}
<div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm ring-1 ring-on-surface/5 transition-transform hover:-translate-y-1">
<div className="flex items-center justify-between mb-4">
<div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
<span className="material-symbols-outlined" data-icon="timer">timer</span>
</div>
<div className="text-red-500 flex items-center text-xs font-bold bg-red-100 px-2 py-1 rounded-full">
<span className="material-symbols-outlined text-[14px] mr-1" data-icon="trending_down">trending_down</span>
                        -4%
                    </div>
</div>
<div className="text-slate-500 text-sm font-medium mb-1">Avg. Response Time</div>
<div className="font-headline text-2xl font-bold text-on-surface">1.2m</div>
</div>
</div>
{/*  Charts Bento Grid  */}
<div className="grid grid-cols-12 gap-6">
{/*  Messages per Day (Line Chart)  */}
<div className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-8 rounded-xl shadow-sm ring-1 ring-on-surface/5">
<div className="flex items-center justify-between mb-8">
<div>
<h3 className="font-headline text-lg font-bold text-on-surface">Messages Activity</h3>
<p className="text-xs text-slate-400 font-medium">Daily volume over the last 30 days</p>
</div>
<div className="flex gap-2">
<span className="w-3 h-3 rounded-full bg-on-primary-container self-center"></span>
<span className="text-xs font-semibold text-slate-500">Incoming</span>
</div>
</div>
<div className="relative h-[300px] w-full mt-4">
<div className="absolute inset-0 flex items-end justify-between px-2">
{/*  Simulated Chart Content  */}
<div className="w-full h-full relative flex items-end gap-1">
<div className="flex-1 bg-on-primary-container/20 h-[40%] rounded-t-sm relative group">
<div className="absolute inset-0 bg-on-primary-container h-1 -top-0.5 rounded-full"></div>
</div>
<div className="flex-1 bg-on-primary-container/20 h-[45%] rounded-t-sm relative">
<div className="absolute inset-0 bg-on-primary-container h-1 -top-0.5 rounded-full"></div>
</div>
<div className="flex-1 bg-on-primary-container/20 h-[38%] rounded-t-sm relative">
<div className="absolute inset-0 bg-on-primary-container h-1 -top-0.5 rounded-full"></div>
</div>
<div className="flex-1 bg-on-primary-container/20 h-[52%] rounded-t-sm relative">
<div className="absolute inset-0 bg-on-primary-container h-1 -top-0.5 rounded-full"></div>
</div>
<div className="flex-1 bg-on-primary-container/20 h-[60%] rounded-t-sm relative">
<div className="absolute inset-0 bg-on-primary-container h-1 -top-0.5 rounded-full"></div>
</div>
<div className="flex-1 bg-on-primary-container/20 h-[75%] rounded-t-sm relative">
<div className="absolute inset-0 bg-on-primary-container h-1 -top-0.5 rounded-full"></div>
</div>
<div className="flex-1 bg-on-primary-container/20 h-[68%] rounded-t-sm relative">
<div className="absolute inset-0 bg-on-primary-container h-1 -top-0.5 rounded-full"></div>
</div>
<div className="flex-1 bg-on-primary-container/20 h-[82%] rounded-t-sm relative">
<div className="absolute inset-0 bg-on-primary-container h-1 -top-0.5 rounded-full shadow-[0_-4px_10px_rgba(93,120,255,0.4)]"></div>
</div>
<div className="flex-1 bg-on-primary-container/20 h-[78%] rounded-t-sm relative">
<div className="absolute inset-0 bg-on-primary-container h-1 -top-0.5 rounded-full"></div>
</div>
<div className="flex-1 bg-on-primary-container/20 h-[85%] rounded-t-sm relative">
<div className="absolute inset-0 bg-on-primary-container h-1 -top-0.5 rounded-full"></div>
</div>
</div>
</div>
{/*  Y-Axis markers  */}
<div className="absolute inset-0 flex flex-col justify-between text-[10px] text-slate-300 font-bold pointer-events-none">
<div className="border-b border-slate-100 w-full pb-1">1000</div>
<div className="border-b border-slate-100 w-full pb-1">750</div>
<div className="border-b border-slate-100 w-full pb-1">500</div>
<div className="border-b border-slate-100 w-full pb-1">250</div>
<div className="w-full">0</div>
</div>
</div>
<div className="flex justify-between mt-4 px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
<span>Oct 01</span>
<span>Oct 10</span>
<span>Oct 20</span>
<span>Today</span>
</div>
</div>
{/*  Platform Distribution (Donut Chart)  */}
<div className="col-span-12 lg:col-span-4 bg-surface-container-lowest p-8 rounded-xl shadow-sm ring-1 ring-on-surface/5 flex flex-col">
<h3 className="font-headline text-lg font-bold text-on-surface mb-1">Platform Mix</h3>
<p className="text-xs text-slate-400 font-medium mb-8">Traffic by source channel</p>
<div className="relative w-48 h-48 mx-auto mb-8">
{/*  Custom SVG Donut  */}
<svg className="w-full h-full transform -rotate-90" viewbox="0 0 36 36">
<circle cx="18" cy="18" fill="transparent" r="15.915" stroke="#e2e0fc" strokeWidth="3"></circle>
{/*  WhatsApp  */}
<circle cx="18" cy="18" fill="transparent" r="15.915" stroke="#009945" stroke-dasharray="45 55" stroke-dashoffset="0" strokeWidth="4"></circle>
{/*  Instagram  */}
<circle cx="18" cy="18" fill="transparent" r="15.915" stroke="#dc2743" stroke-dasharray="35 65" stroke-dashoffset="-45" strokeWidth="4"></circle>
{/*  Messenger  */}
<circle cx="18" cy="18" fill="transparent" r="15.915" stroke="#00125a" stroke-dasharray="20 80" stroke-dashoffset="-80" strokeWidth="4"></circle>
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<span className="text-2xl font-bold text-on-surface leading-none">100%</span>
<span className="text-[10px] text-slate-400 font-bold uppercase mt-1">Total Share</span>
</div>
</div>
<div className="mt-auto space-y-3">
<div className="flex items-center justify-between text-sm">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-[#009945]"></span>
<span className="font-medium">WhatsApp</span>
</div>
<span className="font-bold">45%</span>
</div>
<div className="flex items-center justify-between text-sm">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-[#dc2743]"></span>
<span className="font-medium">Instagram</span>
</div>
<span className="font-bold">35%</span>
</div>
<div className="flex items-center justify-between text-sm">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-[#00125a]"></span>
<span className="font-medium">Messenger</span>
</div>
<span className="font-bold">20%</span>
</div>
</div>
</div>
{/*  AI vs Manual Replies (Bar Chart)  */}
<div className="col-span-12 bg-surface-container-lowest p-8 rounded-xl shadow-sm ring-1 ring-on-surface/5">
<div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
<div>
<h3 className="font-headline text-lg font-bold text-on-surface">Automation Efficiency</h3>
<p className="text-xs text-slate-400 font-medium">AI vs Human manual interactions</p>
</div>
<div className="flex items-center gap-6">
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded bg-on-primary-container"></span>
<span className="text-xs font-bold text-slate-500 uppercase">AI Automated</span>
</div>
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded bg-surface-container-highest"></span>
<span className="text-xs font-bold text-slate-500 uppercase">Manual Reply</span>
</div>
</div>
</div>
<div className="grid grid-cols-7 gap-4 md:gap-8 h-[250px] items-end px-2">
{/*  Day 1  */}
<div className="flex flex-col items-center gap-2 group h-full justify-end">
<div className="w-full flex flex-col gap-1 max-w-[60px] h-[85%]">
<div className="bg-on-primary-container w-full h-[90%] rounded-t-md relative"></div>
<div className="bg-surface-container-highest w-full h-[10%] rounded-b-md"></div>
</div>
<span className="text-[10px] font-bold text-slate-400">MON</span>
</div>
{/*  Day 2  */}
<div className="flex flex-col items-center gap-2 group h-full justify-end">
<div className="w-full flex flex-col gap-1 max-w-[60px] h-[78%]">
<div className="bg-on-primary-container w-full h-[85%] rounded-t-md"></div>
<div className="bg-surface-container-highest w-full h-[15%] rounded-b-md"></div>
</div>
<span className="text-[10px] font-bold text-slate-400">TUE</span>
</div>
{/*  Day 3  */}
<div className="flex flex-col items-center gap-2 group h-full justify-end">
<div className="w-full flex flex-col gap-1 max-w-[60px] h-[92%]">
<div className="bg-on-primary-container w-full h-[95%] rounded-t-md"></div>
<div className="bg-surface-container-highest w-full h-[5%] rounded-b-md"></div>
</div>
<span className="text-[10px] font-bold text-slate-400">WED</span>
</div>
{/*  Day 4  */}
<div className="flex flex-col items-center gap-2 group h-full justify-end">
<div className="w-full flex flex-col gap-1 max-w-[60px] h-[80%]">
<div className="bg-on-primary-container w-full h-[88%] rounded-t-md"></div>
<div className="bg-surface-container-highest w-full h-[12%] rounded-b-md"></div>
</div>
<span className="text-[10px] font-bold text-slate-400">THU</span>
</div>
{/*  Day 5  */}
<div className="flex flex-col items-center gap-2 group h-full justify-end">
<div className="w-full flex flex-col gap-1 max-w-[60px] h-[95%]">
<div className="bg-on-primary-container w-full h-[92%] rounded-t-md shadow-[0_0_15px_rgba(93,120,255,0.2)]"></div>
<div className="bg-surface-container-highest w-full h-[8%] rounded-b-md"></div>
</div>
<span className="text-[10px] font-bold text-on-primary-container">FRI</span>
</div>
{/*  Day 6  */}
<div className="flex flex-col items-center gap-2 group h-full justify-end opacity-50">
<div className="w-full flex flex-col gap-1 max-w-[60px] h-[40%]">
<div className="bg-on-primary-container w-full h-[70%] rounded-t-md"></div>
<div className="bg-surface-container-highest w-full h-[30%] rounded-b-md"></div>
</div>
<span className="text-[10px] font-bold text-slate-400">SAT</span>
</div>
{/*  Day 7  */}
<div className="flex flex-col items-center gap-2 group h-full justify-end opacity-50">
<div className="w-full flex flex-col gap-1 max-w-[60px] h-[35%]">
<div className="bg-on-primary-container w-full h-[65%] rounded-t-md"></div>
<div className="bg-surface-container-highest w-full h-[35%] rounded-b-md"></div>
</div>
<span className="text-[10px] font-bold text-slate-400">SUN</span>
</div>
</div>
</div>
</div>
{/*  Recent Insights / Asymmetric Section  */}
<section className="mt-10 grid grid-cols-1 xl:grid-cols-3 gap-6">
<div className="xl:col-span-1 bg-[#1a1a2e] text-white p-8 rounded-xl flex flex-col relative overflow-hidden">
<div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/20 blur-[80px] rounded-full"></div>
<div className="font-label uppercase tracking-widest text-[10px] font-bold text-blue-400 mb-6">Pro Insight</div>
<h4 className="font-headline text-2xl font-bold mb-4 leading-tight">Your AI efficiency peaked on Wednesday.</h4>
<p className="text-slate-400 text-sm leading-relaxed mb-8">Implementing automated responses for "Shipping Status" saved your team approximately 12.4 hours of manual labor this week.</p>
<div className="mt-auto">
<button className="flex items-center gap-2 text-sm font-bold text-white hover:text-blue-400 transition-colors">
                        View optimization tips
                        <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
</div>
<div className="xl:col-span-2 bg-surface-container-lowest p-8 rounded-xl shadow-sm ring-1 ring-on-surface/5">
<div className="flex items-center justify-between mb-6">
<h3 className="font-headline text-lg font-bold text-on-surface">Top Performing Keywords</h3>
<button className="text-xs font-bold text-on-primary-container hover:underline">View All</button>
</div>
<div className="flex flex-wrap gap-3">
<div className="px-4 py-2 bg-background border border-surface-container-highest rounded-full text-sm font-medium flex items-center gap-2">
<span className="text-xs text-slate-400">#1</span> Pricing Inquiry <span className="text-on-tertiary-container font-bold">+18%</span>
</div>
<div className="px-4 py-2 bg-background border border-surface-container-highest rounded-full text-sm font-medium flex items-center gap-2">
<span className="text-xs text-slate-400">#2</span> Order Status <span className="text-on-tertiary-container font-bold">+12%</span>
</div>
<div className="px-4 py-2 bg-background border border-surface-container-highest rounded-full text-sm font-medium flex items-center gap-2">
<span className="text-xs text-slate-400">#3</span> Returns <span className="text-red-400 font-bold">-5%</span>
</div>
<div className="px-4 py-2 bg-background border border-surface-container-highest rounded-full text-sm font-medium flex items-center gap-2">
<span className="text-xs text-slate-400">#4</span> Technical Support <span className="font-bold">0%</span>
</div>
<div className="px-4 py-2 bg-background border border-surface-container-highest rounded-full text-sm font-medium flex items-center gap-2">
<span className="text-xs text-slate-400">#5</span> Features <span className="text-on-tertiary-container font-bold">+22%</span>
</div>
</div>
<div className="mt-8 flex items-center gap-4 p-4 bg-surface-container-low rounded-xl">
<div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-on-primary-container">
<span className="material-symbols-outlined" data-icon="auto_awesome" style={{ fontVariationSettings: ''FILL' 1' }}>auto_awesome</span>
</div>
<div>
<div className="text-sm font-bold text-on-surface">Smart Suggestion</div>
<p className="text-xs text-slate-500">Based on 'Features' inquiries, we recommend creating an automated FAQ tour.</p>
</div>
</div>
</div>
</section>
</main>
{/*  Mobile Bottom Nav (Suppressed per rule because this is deep analytics, but kept for core shell structure if required by platform responsive pivot)  */}
<nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-md px-6 py-3 flex justify-between items-center z-50">
<button className="flex flex-col items-center gap-1 text-slate-400">
<span className="material-symbols-outlined" data-icon="forum">forum</span>
<span className="text-[10px] font-bold">CHATS</span>
</button>
<button className="flex flex-col items-center gap-1 text-on-primary-container">
<span className="material-symbols-outlined" data-icon="analytics" style={{ fontVariationSettings: ''FILL' 1' }}>analytics</span>
<span className="text-[10px] font-bold">DATA</span>
</button>
<button className="flex flex-col items-center gap-1 text-slate-400">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
<span className="text-[10px] font-bold">MORE</span>
</button>
</nav>

</>
