<?php if ( is_home() ) { ?><title><?php bloginfo('name'); ?> - <?php bloginfo('description'); ?></title><?php } ?>
<?php if ( is_single() && $page<2 ) { ?><title><?php echo trim(wp_title('',0)); ?> - <?php bloginfo('name'); ?></title><?php } ?>
<?php if ( is_single() && ( $paged >= 2 || $page >= 2 ) ) { ?><title><?php echo trim(wp_title('',0)); ?><?php echo sprintf( __( '%s', 'twentyten' ), max( $paged, $page ) ); ?> - <?php bloginfo('name'); ?></title><?php } ?>
<?php if ( is_page() ) { ?><title><?php echo trim(wp_title('',0)); ?> - <?php bloginfo('name'); ?></title><?php } ?>
<?php if ( is_category() && $paged<2 ) { ?><title><?php single_cat_title(); ?> - <?php bloginfo('name'); ?></title><?php } ?>
<?php if ( is_category() && ( $paged >= 2 || $page >= 2 ) ) { ?><title><?php single_cat_title(); ?> <?php echo ' - ' . sprintf( __( 'Page %s', 'twentyten' ), max( $paged, $page ) ); ?> - <?php bloginfo('name'); ?></title><?php } ?>
<?php
if (!function_exists('utf8Substr')) {
 function utf8Substr($str, $from, $len)
 {
     return preg_replace('#^(?:[\x00-\x7F]|[\xC0-\xFF][\x80-\xBF]+){0,'.$from.'}'.
          '((?:[\x00-\x7F]|[\xC0-\xFF][\x80-\xBF]+){0,'.$len.'}).*#s',
          '$1',$str);
 }
}
if ( is_single() ){
    if ($post->post_excerpt) {
        $description  = $post->post_excerpt;
    } else {
   if(preg_match('/<p>(.*)<\/p>/iU',trim(strip_tags($post->post_content,"<p>")),$result)){
    $post_content = $result['1'];
   } else {
    $post_content_r = explode("\n",trim(strip_tags($post->post_content)));
    $post_content = $post_content_r['0'];
   }
         $description = utf8Substr($post_content,0,220);  
  } 
    $keywords = "";     
    $tags = wp_get_post_tags($post->ID);
    foreach ($tags as $tag ) {
        $keywords = $keywords . $tag->name . ",";
    }
}
?>
<?php echo "\n"; ?>
<?php if ( is_single() ) { ?>
<meta name="description" content="<?php echo trim(wp_title('',0)); ?>-<?php echo rtrim($keywords,','); ?>" />
<meta name="keywords" content="<?php echo rtrim($keywords,','); ?>" />
<?php } ?>

<?php if ( is_category() ) { ?>
<meta name="description" content="<?php single_cat_title(); ?>" />
<meta name="keywords" content="<?php single_cat_title(); ?>" />
<?php } ?>

<?php if ( is_home() ) { ?>
<meta name="description" content="<?php echo get_option('woallf_description'); ?>" />
<meta name="keywords" content="<?php echo get_option('woallf_keywords'); ?>" />
<?php } ?>