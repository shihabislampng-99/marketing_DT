    <!-- Footer -->
    <footer class="py-20 bg-surface border-t border-black/5 mt-auto">
        <div class="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <div class="lg:col-span-1">
                <div class="flex items-center gap-2 mb-6">
                    <span class="material-symbols-outlined text-black text-2xl">deployed_code</span>
                    <span class="text-xl font-black tracking-tighter uppercase text-black"><?php bloginfo('name'); ?></span>
                </div>
                <p class="text-slate-600 text-sm leading-relaxed max-w-xs">
                    <?php bloginfo('description'); ?>
                </p>
            </div>
            
            <div>
                <h5 class="text-xs font-bold tracking-[0.2em] uppercase text-black mb-6">Navigation</h5>
                <ul class="space-y-4 text-slate-500 text-sm">
                    <li><a class="hover:text-black transition-colors" href="#how-we-work">Methodology</a></li>
                    <li><a class="hover:text-black transition-colors" href="#philosophy">Philosophy</a></li>
                    <li><a class="hover:text-black transition-colors" href="#services">Focus Areas</a></li>
                </ul>
            </div>
            
            <div>
                <h5 class="text-xs font-bold tracking-[0.2em] uppercase text-black mb-6">Connect</h5>
                <ul class="space-y-4 text-slate-500 text-sm">
                    <li><a class="hover:text-black transition-colors" href="#">LinkedIn</a></li>
                    <li><a class="hover:text-black transition-colors" href="#">Twitter / X</a></li>
                    <li><a class="hover:text-black transition-colors" href="#">Insights Newsletter</a></li>
                </ul>
            </div>
            
            <div>
                <h5 class="text-xs font-bold tracking-[0.2em] uppercase text-black mb-6">Contact</h5>
                <ul class="space-y-4 text-slate-500 text-sm">
                    <li><a href="mailto:<?php echo get_option('admin_email'); ?>" class="hover:text-black transition-colors"><?php echo get_option('admin_email'); ?></a></li>
                    <li>Dhaka, Bangladesh</li>
                </ul>
            </div>
        </div>
        
        <div class="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. All rights reserved.</p>
            <div class="flex gap-8">
                <a class="hover:text-black transition-colors" href="#">Privacy Policy</a>
                <a class="hover:text-black transition-colors" href="#">Terms of Service</a>
            </div>
        </div>
    </footer>
    <?php wp_footer(); ?>
</body>
</html>
