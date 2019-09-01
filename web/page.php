<?php get_header(); ?>
<div class="pageny">
  <div class="container">
    <div class="lujing">您当前所在位置：<a href="<?php echo home_url() ?>">主页</a> &gt; <?php the_title(); ?> &gt; </div>
    <div class="clearfix"></div>
    <div class="page-left">
      <div class="fllist">
        <ul>
          
          <li><a href="<?php echo home_url() ?>/about/" title="中心简介">中心简介</a></li>
          
          <li><a href="<?php echo home_url() ?>/news/" title="新闻动态">新闻动态</a></li>
          
          <li><a href="<?php echo home_url() ?>/contact/" title="联系我们">联系我们</a></li>
          
          <li><a href="<?php echo home_url() ?>/tousu/" title="投诉建议">投诉建议</a></li>
          
        </ul>
      </div>
    </div>
    <div class="page-right">
	<?php if (have_posts()) : ?><?php while (have_posts()) : the_post(); ?>	
		<div class="nytit" style="text-align: center;">
        <h1><?php the_title(); ?></h1>
        <div class="sshuomign"><span> </span> <span> </span></div>
      </div>
      <div class="article_txt"><?php the_content(); ?></div>
	  <?php endwhile; ?>
			<?php endif; ?>
    </div>
    <div class="clearfix"></div>
  </div>
</div>
<?php get_footer(); ?>
