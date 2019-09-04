<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<?php include (TEMPLATEPATH . '/seo.php'); ?>
<link rel="stylesheet" type="text/css" media="all" href="<?php bloginfo( 'stylesheet_url' ); ?>" /> 
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
</head>
<body>
  <header>
      <div id="header-wrapper">
          <div class="header-top">
              <ul>
                  <li><a href="about">关于大彭</a></li>
                  <li>|</li>
                  <li><a href="contact">联系我们</a></li>
                  <li>|</li>
                  <li><a href="#">官方微博</a></li>
              </ul>
          </div>
          <div class="header">
              <div class="w">
                  <div class="logo">
                      <a href="#"><img src="<?php echo home_url() ?>/wp-content/themes/xzdapeng/images/logo.png" ></a>
                  </div>
                  <ul class="menu">
                  <?php if(function_exists('wp_nav_menu')) wp_nav_menu(array('container' => false, 'items_wrap' => '%3$s', 'theme_location' => 'primary', 'menu_class' => '' )); ?>
                      <li>
                          <a href="#" ><button class="searchbtn"></button></a>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  </header>