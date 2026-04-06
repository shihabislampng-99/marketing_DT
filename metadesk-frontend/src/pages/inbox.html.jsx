<>

{/*  TopNavBar Shell  */}
<header className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-xl dark:bg-slate-900/70 shadow-sm dark:shadow-none flex justify-between items-center px-6 h-16">
<div className="flex items-center gap-2">
<span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50 font-headline">Jinn</span>
</div>
<nav className="hidden md:flex items-center gap-6 font-manrope text-sm font-medium">
<span className="text-blue-600 dark:text-blue-400 font-semibold">142 conversations</span>
<span className="text-slate-500 dark:text-slate-400">28 active today</span>
<span className="text-slate-500 dark:text-slate-400">89% AI-handled</span>
</nav>
<div className="flex items-center gap-4">
<button className="p-2 text-slate-500 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors rounded-full scale-95 duration-200">
<span className="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button className="p-2 text-slate-500 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors rounded-full scale-95 duration-200">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
</button>
<div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container-highest">
<img alt="User Avatar" className="w-full h-full object-cover" data-alt="Close-up professional portrait of a friendly office manager with neutral background lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWNSdWOrufQcYlAzZlm76ftsSE_Wjqf_r3K1erNVSRml05_ifVhtM141TrFUFoF9GXMHGfjOVgdg20rNW9dIYxzWRNt3AyGwaHhAhniikmUHgYvC0ITjII1Zh_6YGYlOtYDxlr558RTUzlL8wE0ERK5poTAAxoS94X-HArD-gmsGpfFXqrZAY7P2TXDBjhILItHv9fVMudEAHLzueFGzhUoRVAucEJ42ApxKd1EKXYl5_DLlzsReieelIxJgqXLYa2ym9T4ameWRk_"/>
</div>
</div>
</header>
{/*  Main Content Area  */}
<main className="flex-1 mt-16 flex overflow-hidden">
{/*  SideNavBar Shell  */}
<aside className="h-screen w-[280px] bg-[#1a1a2e] flex flex-col py-6 gap-4 z-40">
<div className="px-6 mb-2">
<button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-headline font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all">
<span className="material-symbols-outlined text-sm" data-icon="send">send</span>
                    NEW MESSAGE
                </button>
</div>
<nav className="flex flex-col font-manrope uppercase tracking-wider text-[11px] font-bold">
<a className="px-6 py-4 flex items-center gap-3 bg-blue-600/10 text-blue-400 border-r-2 border-blue-500 transition-all" href="#">
<span className="material-symbols-outlined" data-icon="forum">forum</span>
                    ALL CHATS
                </a>
<a className="px-6 py-4 flex items-center gap-3 text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all" href="#">
<span className="material-symbols-outlined text-green-500" data-icon="chat">chat</span>
                    WHATSAPP
                </a>
<a className="px-6 py-4 flex items-center gap-3 text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all" href="#">
<span className="material-symbols-outlined text-pink-500" data-icon="photo_camera">photo_camera</span>
                    INSTAGRAM
                </a>
<a className="px-6 py-4 flex items-center gap-3 text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all" href="#">
<span className="material-symbols-outlined text-blue-500" data-icon="send">send</span>
                    MESSENGER
                </a>
<a className="px-6 py-4 flex items-center gap-3 text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all" href="#">
<span className="material-symbols-outlined" data-icon="archive">archive</span>
                    ARCHIVED
                </a>
</nav>
<div className="mt-auto px-6 flex flex-col gap-2 font-manrope uppercase tracking-wider text-[11px] font-bold">
<a className="py-3 flex items-center gap-3 text-slate-400 hover:text-slate-200 transition-all" href="#">
<span className="material-symbols-outlined" data-icon="help">help</span>
                    SUPPORT
                </a>
</div>
</aside>
{/*  Panel 2: List/Feed View  */}
<section className="w-96 bg-surface-container-low flex flex-col border-r-0">
<div className="p-4">
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline" data-icon="search">search</span>
<input className="w-full bg-surface-container-lowest border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-on-primary-container" placeholder="Search conversations..." type="text"/>
</div>
</div>
<div className="flex-1 overflow-y-auto custom-scrollbar">
{/*  Conversation List  */}
{/*  Active Conversation  */}
<div className="p-3 mx-2 bg-surface-container-high rounded-xl mb-1 cursor-pointer transition-all">
<div className="flex gap-3">
<div className="relative">
<img alt="Contact" className="w-12 h-12 rounded-full object-cover" data-alt="Portrait of a young woman with a friendly expression and colorful professional attire" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXEirmIfFbwXn7XAkdr3HgVQTKyZIcNrpM396Z7kaxg3ACIWOJgOQh-URg3J-UGRIEhXMI48PXl__UnNBVtjC9lj6CQ_NotRdELLvzRVT0BPdYaD3LIHgE0HEg8TaqleWfW21OCu9jDa0-6nHP8HZV_tGXQowIGCySmTIUdKQqD-EpjAw5uT52W5ZX-5kzLRxMDHtO2nBLcBnfJ27pwFFeL7l7SG-IA2vP_JOI7seb-Je6wEX0rOmQQV0ddjcZiaGvyoT7dVP4asV1"/>
<div className="absolute bottom-0 right-0 w-3 h-3 bg-tertiary-fixed rounded-full border-2 border-surface-container-high"></div>
</div>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-start">
<h4 className="font-bold text-sm truncate">Elena Rodriguez</h4>
<span className="text-[10px] text-outline">12:45 PM</span>
</div>
<div className="flex items-center gap-1 mt-0.5">
<span className="material-symbols-outlined text-[14px] text-green-500" data-icon="chat">chat</span>
<p className="text-xs text-on-surface-variant truncate">How much for the bulk order?</p>
</div>
</div>
<div className="flex flex-col items-end gap-2">
<span className="bg-on-primary-container text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">2</span>
</div>
</div>
</div>
{/*  Repeating items for visual depth  */}
<div className="p-3 mx-2 hover:bg-surface-container rounded-xl mb-1 cursor-pointer transition-all">
<div className="flex gap-3">
<div className="relative">
<img alt="Contact" className="w-12 h-12 rounded-full object-cover" data-alt="Close-up of a middle-aged man in a business casual shirt with soft natural lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6LQqn7MpOwqQGwhrHI1iH6TJ-FvDqQ8AHsns1KQhMlXb17Ms3iJGE4Hj0AN6H0gAXUtB6y0xval436Tg3HgNqYOsGuoa8Fgv5QzkEmR2G77ZJ7pG3gN_eNNMPVvicirp3w2td2u5OKoJCgm021-evga-4EV_xy2O17F7QzpUrQv4p9hqKt70i63pJPKCJ4xoOnHpBGuhSzk7j8s6L-LiwI8Vfy2VZDMsxNLHpXvMhEn-o6hTL_AWKAQayEmqbe-JWFYoQrv5rFWYu"/>
</div>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-start">
<h4 className="font-bold text-sm truncate">Marcus Chen</h4>
<span className="text-[10px] text-outline">10:20 AM</span>
</div>
<div className="flex items-center gap-1 mt-0.5">
<span className="material-symbols-outlined text-[14px] text-pink-500" data-icon="photo_camera">photo_camera</span>
<p className="text-xs text-on-surface-variant truncate">Loved the recent post! Can we chat?</p>
</div>
</div>
</div>
</div>
<div className="p-3 mx-2 hover:bg-surface-container rounded-xl mb-1 cursor-pointer transition-all">
<div className="flex gap-3">
<div className="relative">
<img alt="Contact" className="w-12 h-12 rounded-full object-cover" data-alt="Professional woman in a blazer smiling warmly at the camera in an office setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKlBGXN6EeGMHzWN8oDYGaxSkLaYT5TYCx3967xFrsgBoc476g_RTqf2EzCLsgh3qQ3CeO4BIJWPZlvHh8cIp_i7OvGla87NB7npviXM8zthnnNehuUAYg7STMjWzamPU65q0SKvgDvu9x_tUUoHzz-EQLQpwmfe7qdCagGooyB1H4NumQrmQCIob4z-KdfcJ7kfqjBBr__WjRpjTD54ucPKZ5dLZ_eUWRjvWblVKwZRV4A_TCt0b0yvtOBdL0TGtL8rciB_NLljc0"/>
<div className="absolute bottom-0 right-0 w-3 h-3 bg-tertiary-fixed rounded-full border-2 border-white"></div>
</div>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-start">
<h4 className="font-bold text-sm truncate">Sarah Jenkins</h4>
<span className="text-[10px] text-outline">Yesterday</span>
</div>
<div className="flex items-center gap-1 mt-0.5">
<span className="material-symbols-outlined text-[14px] text-blue-500" data-icon="send">send</span>
<p className="text-xs text-on-surface-variant truncate">AI: Hello Sarah, I can certainly help with that!</p>
</div>
</div>
</div>
</div>
{/*  Add more dummy contacts to fill the sidebar  */}
<div className="p-3 mx-2 hover:bg-surface-container rounded-xl mb-1 cursor-pointer transition-all">
<div className="flex gap-3">
<img alt="Contact" className="w-12 h-12 rounded-full object-cover" data-alt="Portrait of a young man with a slight smile and clean background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_sCxsakFjdv0ErGcQoQc0llYhQ6HNpJKRIPi77R4xjP9l9uCTxFONwiN-n0TnR5Q2QgKgzbg523wRDXxBsmE3vFApUz41N9yCwHfwcGl46AvHcQ7al3lkYrBAytWiUCXnOklhb56BO90VG8UMjLwW-0exPhFS42UXTVypZ2NWqoosNe0H9zsMu3jmSY-qJzI2pfqrE6xSLLvYWt2arTd_hNWOSnrFfM2vK6l9VaNrn4ITu3B1an8raqXRmeGviZi-PH2DIILafIie"/>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-start">
<h4 className="font-bold text-sm truncate">David Miller</h4>
<span className="text-[10px] text-outline">Yesterday</span>
</div>
<p className="text-xs text-on-surface-variant truncate">Talk to you later.</p>
</div>
</div>
</div>
</div>
</section>
{/*  Panel 3: Detailed Content/Conversation  */}
<section className="flex-1 flex flex-col bg-white overflow-hidden">
{/*  Chat Header  */}
<header className="h-16 px-6 flex items-center justify-between shadow-sm z-10">
<div className="flex items-center gap-3">
<div className="relative">
<img alt="Contact" className="w-10 h-10 rounded-full object-cover" data-alt="Portrait of a young woman with a friendly expression" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxOp0VSjpa2aAD1DbIAscR5v8qUdNvr8lJghMdHpDlQ3QKzB_IcAqvfUN6nFNZ23cDU-S7NnwOdIlcIi5NDKbGANXP9pieVJpaz61XT2ttCM7VWzcxX-CT9A2sQevqA-s8HPr7TxMstFLNvyOnRGK0w48yIvcGkT7j52ew-QpLtVdqg9Ghy5zEg57Yq7D2Ma8oBHET8_L0p1aIRmypdcI85--0Vdp9JBC4vyuuZKoGdA1ia2dZcqcFeI-mR3EPtLCJxPleida3So88"/>
</div>
<div>
<h3 className="font-bold text-sm font-headline">Elena Rodriguez</h3>
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[14px] text-green-500" data-icon="chat">chat</span>
<span className="text-[10px] text-outline font-medium tracking-wide">WHATSAPP · +1 234 567 8900</span>
</div>
</div>
</div>
<div className="flex items-center gap-6">
<div className="flex items-center gap-3 bg-surface-container-low px-3 py-1.5 rounded-full">
<span className="text-[11px] font-bold text-on-tertiary-container">AI AUTO-REPLY</span>
<div className="w-8 h-4 bg-on-tertiary-container rounded-full relative">
<div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div>
</div>
</div>
<button className="text-outline hover:text-on-surface transition-colors">
<span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</div>
</header>
{/*  Conversation Body  */}
<div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar bg-surface/30">
{/*  Date Separator  */}
<div className="flex items-center gap-4 justify-center">
<div className="h-[1px] flex-1 bg-surface-container"></div>
<span className="text-[11px] font-bold text-outline uppercase tracking-widest">Today</span>
<div className="h-[1px] flex-1 bg-surface-container"></div>
</div>
{/*  Incoming Message  */}
<div className="flex items-start gap-3 max-w-[80%]">
<img alt="Avatar" className="w-8 h-8 rounded-full object-cover mt-2" data-alt="Small avatar of Elena Rodriguez" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuNZeO1ogLejhDQntJyyCk5UwSAc2noAHqdfWq-VjunI27b5SHmlY7A_EP6np-5p5f03ZIxC3rlodtn8Yd7QK33uu2Ktzb0t5UsXin3CruWdB5q99bf-WTjrBVgAIEbY6-V6iv-D06-_0OYnZqBFua04FvoFLoJavxPZZMS4TNfhVuTVUqhq-kYP85Td_vyw9G5YThS2Gzhb9DMDL3XJFgjw7qYwYzwXYjv1E3RPrnTzcrohP9ManIU0ldPW4slOeMcZdY_wuPrUlQ"/>
<div>
<div className="bg-surface-container-highest p-4 rounded-3xl rounded-tl-none shadow-sm">
<p className="text-sm leading-relaxed">Hi Jinn team! I'm interested in placing a bulk order for our annual summit. Can you share the pricing tiers for over 500 units?</p>
</div>
<span className="text-[10px] text-outline mt-1 ml-1">12:30 PM</span>
</div>
</div>
{/*  Outbound Message (AI)  */}
<div className="flex items-end justify-end gap-3 self-end max-w-[80%]">
<div className="flex flex-col items-end">
<div className="bg-primary-container text-white p-4 rounded-3xl rounded-br-none shadow-sm">
<p className="text-sm leading-relaxed">Hello Elena! I'd be happy to assist you with our bulk pricing. For orders over 500 units, we offer a 25% discount on the base price. Would you like me to send over the full PDF catalog?</p>
<div className="flex items-center gap-1 mt-2 py-1 px-2 bg-white/10 rounded-lg w-fit">
<span className="material-symbols-outlined text-[14px]" data-icon="smart_toy">smart_toy</span>
<span className="text-[10px] font-bold">AI ASSISTANT</span>
</div>
</div>
<span className="text-[10px] text-outline mt-1 mr-1">12:31 PM</span>
</div>
</div>
{/*  Incoming Message (Image)  */}
<div className="flex items-start gap-3 max-w-[80%]">
<img alt="Avatar" className="w-8 h-8 rounded-full object-cover mt-2" data-alt="Small avatar of Elena Rodriguez" src="https://lh3.googleusercontent.com/aida-public/AB6AXuARLO2QTHerHu6AdJ5CNAHPxgG2mA0B96rnQw-W9v0h6C_wBVMY9KEsZNEn6Is_o0Qrc8POFzTbBW7ofWALBjAUEpxvr6O1QvfH1Oa8BEyur-fwWX6y-oubiQ9HBTHZ_vDLAk8EL8__JW3kgLzuDv5dBzOnNdFvRnPEURV6r5xgePmoxUZGbOnhzt53UoizZwTCXFtOirDfNgM5iwIHtmX10q8YHpNhJEGM6hEeP7TqlAkk6Mig2PkzwARY-fdonCmIkv9S4l1und2t"/>
<div className="flex flex-col">
<div className="bg-surface-container-highest p-2 rounded-3xl rounded-tl-none shadow-sm overflow-hidden">
<img alt="Data Chart" className="rounded-2xl w-full max-w-sm" data-alt="A clean business data chart showing upward trends with blue and green bar graphs" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQ3lOzD3Ll1sVlc5jcXEw5-ECmdOpGKuiOn4e8csFWk9RzU6dUIZXAkDx9FHXt6vZ1MTVOMBRNdEDp8il30Q4cH2T9VdZkzmWJ8f2r9UBVzNh9AbxaYSRG55Dersq5OrYpvWfLmELA0ospCuUTvie7Evb53lm83rCr0mbLEHGwNpmllz9Nh9IWX1sRFA5SmupifRxxegYKSBFn0bdT0FdyAl8vXrTZ-X-tSwcR1ChGqSgzk2B-osT1RVBstZsqbklB_b7Yj7WVH9MA"/>
<p className="text-sm p-2">Here are our current engagement numbers for context.</p>
</div>
<span className="text-[10px] text-outline mt-1 ml-1">12:45 PM</span>
</div>
</div>
</div>
{/*  AI Banner  */}
<div className="bg-tertiary-fixed/10 px-6 py-2 flex items-center gap-3">
<span className="material-symbols-outlined text-on-tertiary-container text-lg" data-icon="auto_awesome">auto_awesome</span>
<p className="text-xs font-medium text-on-tertiary-container">AI is handling this conversation. You can still send manual messages.</p>
</div>
{/*  Bottom Composer  */}
<footer className="p-4 bg-white border-t-0 shadow-lg">
<div className="flex items-center gap-3">
<button className="p-2 text-outline hover:text-on-surface transition-colors">
<span className="material-symbols-outlined" data-icon="attach_file">attach_file</span>
</button>
<div className="flex-1 bg-surface-container-low rounded-2xl flex items-center px-4 py-2 border border-outline-variant/15">
<input className="flex-1 bg-transparent border-none focus:ring-0 text-sm" placeholder="Type a message..." type="text"/>
<button className="p-1 text-outline hover:text-on-surface">
<span className="material-symbols-outlined" data-icon="sentiment_satisfied">sentiment_satisfied</span>
</button>
</div>
<button className="w-10 h-10 bg-on-primary-container text-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform">
<span className="material-symbols-outlined" data-icon="send">send</span>
</button>
</div>
</footer>
</section>
{/*  Right Sidebar: Contact Details  */}
<aside className="w-[300px] bg-white flex flex-col border-l border-surface-container overflow-y-auto custom-scrollbar">
{/*  Contact Profile  */}
<div className="p-8 flex flex-col items-center text-center">
<div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-blue-500 to-green-400 mb-4">
<img alt="Elena" className="w-full h-full rounded-full object-cover border-4 border-white" data-alt="Detailed portrait of Elena Rodriguez, smiling warmly" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCksKh-GtLptELp6JXgF4sq_hAv5ItQYSelig9BGx7xCBESVhpTKVbVwP9_HbJyPTXCv01WALAuJDnQkweMUk_A_s6F14J5qBxBF_eD0NwsPIwqempPZ04jtiQwg6zgbc5DDYlMLceS7MJq1DGnVJ2rbMsLUhDZE-HdbFByUaMilyzIovQhhOJ_AkBDO9TuAGE7I-7ZUR84VU9_PHkAWZwm7x-Hy9aADG74gaa8f9DrGNNVVXnW6nXsOzVa39RRSDQZmwu_OEW5k76a"/>
</div>
<h2 className="font-bold text-lg font-headline">Elena Rodriguez</h2>
<div className="flex items-center gap-1.5 mt-1 text-outline">
<span className="material-symbols-outlined text-sm" data-icon="location_on">location_on</span>
<span className="text-xs">Mexico City, MX</span>
</div>
<div className="flex gap-2 mt-4">
<span className="px-3 py-1 bg-surface-container-highest rounded-full text-[10px] font-bold text-on-surface">CLIENT</span>
<span className="px-3 py-1 bg-secondary-container rounded-full text-[10px] font-bold text-on-secondary-container">RETAIL</span>
</div>
</div>
{/*  AI Settings  */}
<div className="px-6 py-4">
<h4 className="text-[11px] font-bold text-outline uppercase tracking-widest mb-4">AI Configuration</h4>
<div className="space-y-4">
<div className="flex items-center justify-between">
<span className="text-sm font-medium">Auto-Reply</span>
<div className="w-10 h-5 bg-on-tertiary-container rounded-full relative">
<div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div>
</div>
</div>
<div>
<label className="text-[10px] font-bold text-outline block mb-1">PERSONALITY</label>
<select className="w-full bg-surface-container-low border-none rounded-lg text-xs py-2">
<option>Friendly &amp; Professional</option>
<option>Formal</option>
<option>Casual</option>
</select>
</div>
</div>
</div>
{/*  Conversation Stats  */}
<div className="px-6 py-6 border-t border-surface-container">
<h4 className="text-[11px] font-bold text-outline uppercase tracking-widest mb-4">Engagement Stats</h4>
<div className="grid grid-cols-2 gap-4">
<div className="bg-surface-container-low p-3 rounded-xl text-center">
<span className="text-[10px] text-outline block">MESSAGES</span>
<span className="text-lg font-bold">142</span>
</div>
<div className="bg-surface-container-low p-3 rounded-xl text-center">
<span className="text-[10px] text-outline block">AI RATIO</span>
<span className="text-lg font-bold">94%</span>
</div>
</div>
<div className="mt-4 p-3 bg-surface-container-low rounded-xl">
<div className="flex justify-between items-center mb-1">
<span className="text-[10px] text-outline">RESPONSE TIME</span>
<span className="text-[10px] font-bold text-green-600">FAST</span>
</div>
<div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-green-500 w-[85%]"></div>
</div>
</div>
</div>
{/*  Quick Actions  */}
<div className="px-6 py-6 mt-auto border-t border-surface-container space-y-2">
<button className="w-full py-2.5 bg-surface-container-highest hover:bg-surface-variant text-on-surface text-xs font-bold rounded-xl transition-colors">
                    MARK AS RESOLVED
                </button>
<button className="w-full py-2.5 text-error text-xs font-bold rounded-xl hover:bg-error-container/20 transition-colors flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-sm" data-icon="archive">archive</span>
                    ARCHIVE CHAT
                </button>
</div>
</aside>
</main>

</>
