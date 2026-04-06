<?php
/**
 * Juhdi functions and definitions
 *
 * @package Juhdi
 */

if ( ! function_exists( 'juhdi_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 */
	function juhdi_setup() {
		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		// Let WordPress manage the document title.
		add_theme_support( 'title-tag' );

		// Enable support for Post Thumbnails on posts and pages.
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'menu-1' => esc_html__( 'Primary', 'juhdi' ),
		) );

		// Switch default core markup for search form, comment form, and comments to output valid HTML5.
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );
	}
endif;
add_action( 'after_setup_theme', 'juhdi_setup' );

/**
 * Enqueue scripts and styles.
 */
function juhdi_scripts() {
	wp_enqueue_style( 'juhdi-style', get_stylesheet_uri(), array(), wp_get_theme()->get('Version') );

	// Enqueue Google Fonts
	wp_enqueue_style( 'juhdi-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap', array(), null );
	
	// Enqueue Material Icons
	wp_enqueue_style( 'juhdi-icons', 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700,0..1&display=swap', array(), null );
	wp_enqueue_style( 'juhdi-icons-fill', 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap', array(), null );

    // Enqueue Tailwind CSS via CDN (Development Only)
    wp_enqueue_script( 'tailwindcss', 'https://cdn.tailwindcss.com?plugins=forms,container-queries', array(), null, false );

    // Inline script for Tailwind config setup based on code.html
    $tailwind_config = "
        tailwind.config = {
            theme: {
                 extend: {
                    colors: {
                        'primary': '#000000',
                        'background': '#ffffff',
                        'surface': '#fafafa',
                        'surface-light': '#ffffff',
                    },
                    fontFamily: {
                        'display': ['Inter', 'sans-serif']
                    },
                    backgroundImage: {
                        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                    }
                },
            },
        }
    ";
    wp_add_inline_script( 'tailwindcss', $tailwind_config );

}
add_action( 'wp_enqueue_scripts', 'juhdi_scripts' );

/**
 * Add inline CSS to the header for styles that were in code.html head block.
 */
function juhdi_inline_styles() {
    echo "<style>
        body { font-family: 'Inter', sans-serif; }
        /* Smooth scrolling */
        html { scroll-behavior: smooth; }
        /* Selection styling */
        ::selection { background-color: rgba(0,0,0,0.1); color: black; }
    </style>";
}
add_action('wp_head', 'juhdi_inline_styles');
