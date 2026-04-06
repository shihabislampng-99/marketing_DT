<?php
/**
 * The front page template file
 *
 * @package Juhdi
 */

get_header();
?>

    <main id="primary" class="site-main">

        <!-- Hero Section -->
        <section class="relative overflow-hidden pt-32 pb-40 flex items-center justify-center min-h-[90vh]">
            <!-- Ambient Background Glow -->
            <div class="absolute inset-0 pointer-events-none overflow-hidden bg-background">
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-black/[0.03] rounded-full blur-[100px]"></div>
                <div class="absolute top-0 right-1/4 w-[400px] h-[400px] bg-black/[0.02] rounded-full blur-[80px]"></div>
                <!-- Subtle Grid -->
                <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTM5IDM5VjFIMXYzOGgzOHoiIGZpbGw9InJnYmEoMCwgMCwgMCwgMC4wNCkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')] opacity-50 mask-image-[linear-gradient(to_bottom,black,transparent)]" style="-webkit-mask-image: linear-gradient(to bottom, black, transparent);"></div>
            </div>

            <div class="relative z-10 max-w-5xl mx-auto px-6 text-center">
                <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 bg-black/5 backdrop-blur-sm mb-10 shadow-[0_0_20px_rgba(0,0,0,0.02)]">
                    <div class="flex h-2 w-2 relative">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                    </div>
                    <span class="text-xs font-semibold tracking-wider uppercase text-slate-700">Strategic Growth Partner</span>
                </div>

                <h1 class="text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight text-black mb-8">
                    We Build <br />
                    <span class="text-transparent bg-clip-text bg-gradient-to-b from-black to-black/50">Market Leaders.</span>
                </h1>

                <p class="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-14 font-light">
                    Juhdi translates your genuine organizational value into an undeniable market advantage through absolute clarity, honest positioning, and strategic execution.
                </p>

                <div class="flex flex-col sm:flex-row justify-center gap-4">
                    <a href="#contact" class="bg-black text-white px-8 py-4 text-base font-bold rounded-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group">
                        Schedule Strategy Call
                        <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </a>
                    <a href="#how-we-work" class="border border-black/10 bg-black/5 text-black px-8 py-4 text-base font-bold rounded-lg hover:bg-black/10 transition-all backdrop-blur-sm">
                        Explore Our Methodology
                    </a>
                </div>
            </div>
        </section>

        <!-- Who We Are -->
        <section class="py-32 bg-surface">
            <div class="max-w-4xl mx-auto px-6 text-center">
                <span class="font-bold tracking-[0.2em] text-xs uppercase mb-8 block text-slate-500">Our Identity</span>
                <h2 class="text-4xl md:text-5xl font-bold mb-10 text-black leading-tight">We are a partner,<br />not an agency.</h2>
                <p class="text-xl md:text-2xl text-slate-600 leading-relaxed font-light">
                    At Juhdi, our role is <span class="text-black font-semibold">identifying genuine value</span> within your organization and translating it into market leadership. We focus on long-term health over short-term hacks, building foundations that sustain growth.
                </p>
            </div>
        </section>

        <!-- What We Focus On -->
        <section id="services" class="py-32 relative">
            <div class="max-w-7xl mx-auto px-6 relative z-10">
                <h2 class="text-3xl lg:text-4xl font-bold mb-16 text-black text-center md:text-left">What We Focus On</h2>
                <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <!-- Card 1 -->
                    <div class="p-8 bg-white border border-slate-200 transition-all duration-300 aspect-square flex flex-col justify-center">
                        <h3 class="text-xl font-bold mb-4 text-black">Marketing</h3>
                        <p class="text-slate-600 text-sm leading-relaxed font-light">Targeted campaigns that resonate with your audience and drive measurable results.</p>
                    </div>
                    <!-- Card 2 -->
                    <div class="p-8 bg-white border border-slate-200 transition-all duration-300 aspect-square flex flex-col justify-center">
                        <h3 class="text-xl font-bold mb-4 text-black">Growth</h3>
                        <p class="text-slate-600 text-sm leading-relaxed font-light">Sustainable expansion strategies to unlock new markets and revenue streams.</p>
                    </div>
                    <!-- Card 3 -->
                    <div class="p-8 bg-white border border-slate-200 transition-all duration-300 aspect-square flex flex-col justify-center">
                        <h3 class="text-xl font-bold mb-4 text-black">Scaling</h3>
                        <p class="text-slate-600 text-sm leading-relaxed font-light">Operational optimization to handle increased demand without compromising quality.</p>
                    </div>
                    <!-- Card 4 -->
                    <div class="p-8 bg-white border border-slate-200 transition-all duration-300 aspect-square flex flex-col justify-center">
                        <h3 class="text-xl font-bold mb-4 text-black">Strategy</h3>
                        <p class="text-slate-600 text-sm leading-relaxed font-light">Long-term planning and market analysis to keep you ahead of the competition.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- How We Work - Steps -->
        <section id="how-we-work" class="py-32 bg-background border-t border-black/5 overflow-hidden">
            <div class="max-w-7xl mx-auto px-6">
                <h2 class="text-3xl lg:text-4xl font-bold mb-20 text-black">Our Methodology</h2>
                <div class="grid grid-cols-1 md:grid-cols-5 gap-12 relative">
                    <!-- Connecting Line for Desktop -->
                    <div class="hidden md:block absolute top-[28px] left-0 w-full h-[1px] bg-black/10"></div>

                    <div class="flex flex-col gap-6 relative group">
                        <div class="w-14 h-14 bg-surface flex justify-center items-center rounded-full border border-black/20 text-xl font-black text-black relative z-10 group-hover:bg-black group-hover:text-white transition-colors">1</div>
                        <div>
                            <h4 class="text-xl font-bold text-black mb-2">Research</h4>
                            <p class="text-slate-600 text-sm font-light">Deep dive into your market, competitors, and internal strengths.</p>
                        </div>
                    </div>
                    <div class="flex flex-col gap-6 relative group">
                        <div class="w-14 h-14 bg-surface flex justify-center items-center rounded-full border border-black/20 text-xl font-black text-black relative z-10 group-hover:bg-black group-hover:text-white transition-colors">2</div>
                        <div>
                            <h4 class="text-xl font-bold text-black mb-2">Find Advantage</h4>
                            <p class="text-slate-600 text-sm font-light">Identifying the unique "why" that separates you from the crowd.</p>
                        </div>
                    </div>
                    <div class="flex flex-col gap-6 relative group">
                        <div class="w-14 h-14 bg-surface flex justify-center items-center rounded-full border border-black/20 text-xl font-black text-black relative z-10 group-hover:bg-black group-hover:text-white transition-colors">3</div>
                        <div>
                            <h4 class="text-xl font-bold text-black mb-2">Build Message</h4>
                            <p class="text-slate-600 text-sm font-light">Crafting the narrative that resonates with human logic and emotion.</p>
                        </div>
                    </div>
                    <div class="flex flex-col gap-6 relative group">
                        <div class="w-14 h-14 bg-surface flex justify-center items-center rounded-full border border-black/20 text-xl font-black text-black relative z-10 group-hover:bg-black group-hover:text-white transition-colors">4</div>
                        <div>
                            <h4 class="text-xl font-bold text-black mb-2">Spread Awareness</h4>
                            <p class="text-slate-600 text-sm font-light">Deploying the message through strategic organic and paid channels.</p>
                        </div>
                    </div>
                    <div class="flex flex-col gap-6 relative group">
                        <div class="w-14 h-14 bg-surface flex justify-center items-center rounded-full border border-black/20 text-xl font-black text-black relative z-10 group-hover:bg-black group-hover:text-white transition-colors">5</div>
                        <div>
                            <h4 class="text-xl font-bold text-black mb-2">Create Growth</h4>
                            <p class="text-slate-600 text-sm font-light">Analyzing results and scaling what works for compounded success.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Organic Growth Philosophy -->
        <section id="philosophy" class="py-40 bg-surface text-black relative -mx-[50vw] left-[50vw] w-screen border-y border-black/5">
            <div class="max-w-5xl mx-auto px-6">
                <h2 class="text-xs font-bold tracking-[0.3em] uppercase text-zinc-500 mb-10">Philosophy</h2>
                <div class="relative">
                    <span class="absolute -left-12 -top-10 text-8xl text-zinc-200 font-serif">"</span>
                    <p class="text-4xl md:text-5xl font-medium leading-tight text-black italic relative z-10">
                        We believe honesty isn't just a moral choice; it's the most powerful sales tool in a skeptical world. When marketing aligns with reality, friction disappears and growth becomes organic.
                    </p>
                </div>
            </div>
        </section>

        <!-- Awareness Channels -->
        <section class="py-32 bg-background">
            <div class="max-w-7xl mx-auto px-6">
                <h2 class="text-3xl lg:text-4xl font-bold mb-16 text-center text-black">Multi-Channel Awareness</h2>
                <div class="grid md:grid-cols-2 gap-8 lg:gap-12">
                    <div class="bg-surface p-10 lg:p-12 rounded-2xl border border-black/10 hover:border-black/20 transition-colors shadow-sm">
                        <div class="flex items-center gap-4 mb-10">
                            <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-black/10 shadow-sm">
                                <span class="material-symbols-outlined text-black">language</span>
                            </div>
                            <h3 class="text-2xl font-bold text-black">Online Channels</h3>
                        </div>
                        <ul class="space-y-6">
                            <li class="flex items-start gap-4 text-slate-600 font-light">
                                <span class="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0"></span>
                                <span><strong class="font-medium text-black block mb-1">YouTube & Video Content</strong> Long-form value delivery.</span>
                            </li>
                            <li class="flex items-start gap-4 text-slate-600 font-light">
                                <span class="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0"></span>
                                <span><strong class="font-medium text-black block mb-1">Podcasts & Audio Strategy</strong> Deepening narrative connection.</span>
                            </li>
                            <li class="flex items-start gap-4 text-slate-600 font-light">
                                <span class="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0"></span>
                                <span><strong class="font-medium text-black block mb-1">LinkedIn Authority</strong> Building B2B relationships.</span>
                            </li>
                            <li class="flex items-start gap-4 text-slate-600 font-light">
                                <span class="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0"></span>
                                <span><strong class="font-medium text-black block mb-1">Newsletter Ecosystems</strong> Developing owned audiences.</span>
                            </li>
                        </ul>
                    </div>

                    <div class="bg-surface p-10 lg:p-12 rounded-2xl border border-black/10 hover:border-black/20 transition-colors shadow-sm">
                        <div class="flex items-center gap-4 mb-10">
                            <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-black/10 shadow-sm">
                                <span class="material-symbols-outlined text-black">groups</span>
                            </div>
                            <h3 class="text-2xl font-bold text-black">Offline Channels</h3>
                        </div>
                        <ul class="space-y-6">
                            <li class="flex items-start gap-4 text-slate-600 font-light">
                                <span class="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0"></span>
                                <span><strong class="font-medium text-black block mb-1">Trade Fairs & Exhibitions</strong> Curated physical presence.</span>
                            </li>
                            <li class="flex items-start gap-4 text-slate-600 font-light">
                                <span class="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0"></span>
                                <span><strong class="font-medium text-black block mb-1">Exclusive Networking Elements</strong> Building closed trust circles.</span>
                            </li>
                            <li class="flex items-start gap-4 text-slate-600 font-light">
                                <span class="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0"></span>
                                <span><strong class="font-medium text-black block mb-1">Partnership Development</strong> Cross-business synergistic growth.</span>
                            </li>
                            <li class="flex items-start gap-4 text-slate-600 font-light">
                                <span class="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0"></span>
                                <span><strong class="font-medium text-black block mb-1">Industry Speaking</strong> Establishing definitive authority.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- Why Honesty Wins - Manifesto -->
        <section class="py-32 bg-surface border-y border-black/5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black/[0.02] to-transparent">
            <div class="max-w-3xl mx-auto px-6 text-center">
                <h2 class="text-4xl md:text-6xl font-black mb-12 tracking-tight text-black">Why Honesty Wins</h2>
                <div class="space-y-8 text-xl text-slate-600 font-light leading-relaxed">
                    <p>The market is exhausted by hype. Customers have developed an impeccable filter for exaggeration and artificial "growth hacks."</p>
                    <p class="text-black font-medium text-2xl border-l-2 border-black pl-6 text-left my-10">Honesty is the only shortcut that works long-term.</p>
                    <p>When you speak clearly about what you do, who you serve, and why you exist, you stop competing and start leading. At Juhdi, we help you find that truth and make it your loudest voice.</p>
                </div>
            </div>
        </section>

        <!-- Why Choose Juhdi -->
        <section class="py-32 bg-background">
            <div class="max-w-7xl mx-auto px-6">
                <div class="mb-20 text-center md:text-left">
                    <h2 class="text-3xl lg:text-4xl font-bold text-black">The Juhdi Advantage</h2>
                </div>
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                    <!-- Item -->
                    <div class="flex flex-col gap-3">
                        <h4 class="text-xl font-bold text-black">Strategic Thinking</h4>
                        <p class="text-slate-600 text-sm font-light leading-relaxed">We don't just "do social media" or "run ads." We build holistic ecosystems where every action supports a master plan.</p>
                    </div>
                    <!-- Item -->
                    <div class="flex flex-col gap-3">
                        <h4 class="text-xl font-bold text-black">Trust-Based Marketing</h4>
                        <p class="text-slate-600 text-sm font-light leading-relaxed">Our methodologies are rooted in psychological safety and transparency, leading to higher customer lifetime values.</p>
                    </div>
                    <!-- Item -->
                    <div class="flex flex-col gap-3">
                        <h4 class="text-xl font-bold text-black">Creative Excellence</h4>
                        <p class="text-slate-600 text-sm font-light leading-relaxed">Breaking through the noise requires bold, minimalist creative direction that actually says something meaningful.</p>
                    </div>
                    <!-- Item -->
                    <div class="flex flex-col gap-3">
                        <h4 class="text-xl font-bold text-black">Omni-presence</h4>
                        <p class="text-slate-600 text-sm font-light leading-relaxed">A holistic approach that connects your digital presence with your physical business reality for absolute consistency.</p>
                    </div>
                    <!-- Item -->
                    <div class="flex flex-col gap-3">
                        <h4 class="text-xl font-bold text-black">Clear Communication</h4>
                        <p class="text-slate-600 text-sm font-light leading-relaxed">No buzzwords. No fluff. Just clear business language that your stakeholders, investors, and customers understand.</p>
                    </div>
                    <!-- Item -->
                    <div class="flex flex-col gap-3">
                        <h4 class="text-xl font-bold text-black">Partner Mindset</h4>
                        <p class="text-slate-600 text-sm font-light leading-relaxed">We win when you win. We integrate into your executive team to deeply understand operations, margins, and goals.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact & Final CTA -->
        <section id="contact" class="py-32 bg-surface relative overflow-hidden flex flex-col items-center border-t border-black/5">
            <!-- Background accents -->
            <div class="absolute inset-0 border-y border-black/5"></div>
            <div class="absolute -right-1/4 -top-1/4 w-1/2 h-[150%] bg-gradient-to-l from-black/[0.02] to-transparent transform -skew-x-12 pointer-events-none"></div>

            <div class="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
                <!-- Left Side CTA Text -->
                <div class="flex flex-col gap-8 text-center lg:text-left">
                    <span class="inline-block px-3 py-1 bg-black/5 text-black text-xs font-bold uppercase tracking-widest rounded-full self-center lg:self-start w-max border border-black/10">Take Action</span>
                    <h2 class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black leading-tight">
                        If Your Business Has Real Value,<br />We Can Help More People See It.
                    </h2>
                    <p class="text-xl text-slate-600 font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
                        Take the first step towards honest, sustainable growth. Schedule a complimentary strategy consultation to discuss scaling your vision.
                    </p>

                    <div class="hidden lg:flex flex-col gap-6 mt-8">
                        <div class="flex items-center gap-4 pt-8 border-t border-black/10">
                            <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-black/10 shrink-0 shadow-sm">
                                <span class="material-symbols-outlined text-black/70 text-lg">mail</span>
                            </div>
                            <div>
                                <div class="text-sm font-bold text-black">Direct Email</div>
                                <div class="text-slate-500 text-sm">hello@juhdi.com</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Side Form -->
                <div class="bg-white backdrop-blur-xl border border-black/10 rounded-3xl p-8 sm:p-12 relative shadow-xl">
                    <h3 class="text-2xl font-bold text-black mb-8">Request a Strategy Call</h3>
                    <form class="flex flex-col gap-6" action="#" method="POST">
                        <div class="grid sm:grid-cols-2 gap-6">
                            <div class="flex flex-col gap-2">
                                <label class="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-500">Full Name</label>
                                <input type="text" placeholder="John Doe" class="bg-transparent border-b border-black/20 py-3 text-black placeholder-slate-400 focus:outline-none focus:border-black focus:ring-0 transition-colors w-full" required>
                            </div>
                            <div class="flex flex-col gap-2">
                                <label class="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-500">Work Email</label>
                                <input type="email" placeholder="john@company.com" class="bg-transparent border-b border-black/20 py-3 text-black placeholder-slate-400 focus:outline-none focus:border-black focus:ring-0 transition-colors w-full" required>
                            </div>
                        </div>

                        <div class="grid sm:grid-cols-2 gap-6">
                            <div class="flex flex-col gap-2">
                                <label class="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-500">Company</label>
                                <input type="text" placeholder="Acme Corp" class="bg-transparent border-b border-black/20 py-3 text-black placeholder-slate-400 focus:outline-none focus:border-black focus:ring-0 transition-colors w-full" required>
                            </div>
                            <div class="flex flex-col gap-2">
                                <label class="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-500">Phone Number</label>
                                <input type="tel" placeholder="+1 (555) 000-0000" class="bg-transparent border-b border-black/20 py-3 text-black placeholder-slate-400 focus:outline-none focus:border-black focus:ring-0 transition-colors w-full">
                            </div>
                        </div>

                        <div class="mt-8">
                            <button type="submit" class="bg-black text-white py-4 px-6 font-bold rounded-xl hover:bg-slate-800 transition-colors w-full flex items-center justify-center gap-2 group shadow-md">
                                Submit Inquiry <span class="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">east</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </main>

<?php
get_footer();
