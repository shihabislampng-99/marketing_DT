<?php
/**
 * The main template file
 *
 * @package Juhdi
 */

get_header();
?>

    <main id="primary" class="site-main">
        <section class="py-32 bg-background flex grow items-center justify-center">
            <div class="max-w-5xl mx-auto px-6 text-center">
                <h1 class="text-4xl font-bold mb-6 text-black">Welcome to <?php bloginfo('name'); ?></h1>
                <p class="text-slate-600">Please assign a page to the front page display settings.</p>
            </div>
        </section>
    </main>

<?php
get_footer();
