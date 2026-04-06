<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">

    <?php wp_head(); ?>
    
    <script id="tailwind-config">
        tailwind.config = {
            theme: {
                 extend: {
                    colors: {
                        "primary": "#000000",
                        "background": "#ffffff",
                        "surface": "#fafafa",
                        "surface-light": "#ffffff",
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"]
                    },
                    backgroundImage: {
                        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                    }
                },
            },
        }
    </script>
</head>

<body <?php body_class("bg-background text-slate-600 font-display antialiased flex flex-col min-h-screen"); ?>>
<?php wp_body_open(); ?>

    <!-- Header -->
    <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5 transition-all">
        <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div class="flex items-center gap-3 cursor-pointer">
                <span class="material-symbols-outlined text-[28px] text-black">deployed_code</span>
                <span class="text-2xl font-black tracking-tighter uppercase text-black"><?php bloginfo('name'); ?></span>
            </div>
            <nav class="hidden md:flex items-center gap-10">
                <a class="text-xs font-semibold tracking-wide uppercase text-slate-500 hover:text-black transition-colors" href="#how-we-work">Process</a>
                <a class="text-xs font-semibold tracking-wide uppercase text-slate-500 hover:text-black transition-colors" href="#philosophy">Philosophy</a>
                <a class="text-xs font-semibold tracking-wide uppercase text-slate-500 hover:text-black transition-colors" href="#services">Focus</a>
            </nav>
            <div class="flex items-center gap-4">
                <a href="#contact" class="bg-black text-white px-6 py-2.5 text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors">
                    Book a Call
                </a>
            </div>
        </div>
    </header>
