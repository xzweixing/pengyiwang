<?php get_header(); ?>
<div class="bread-wrapper">
	<ol class="breadcrumb">
		<li><a href="<?php echo home_url() ?>">首页</a></li>
		<li class="active"><?php
					$category = get_the_category();
					echo $category[0]->cat_name;
					?></li>
	</ol>
</div>
<div class="contrainer" style=" margin-top:20px; margin-bottom:120px; width:1180px">
	<div class="leftBox">
		<div class="wrap-content wrap-post-content">
			<?php if (have_posts()) : ?><?php while (have_posts()) : the_post(); ?>	
			<div class="post-title">
				<h2><?php the_title(); ?></h2>
			</div>
			<div class="post-info">
				<span>类别：
					<?php
					$category = get_the_category();
					echo $category[0]->cat_name;
					?>
				</span>
				<span>发布日期：<?php the_time('Y-m-d'); ?></span>
				<span>浏览：2299</span>
			</div>
			<div class="bshare">
					
			</div>
			<div class="post-content">
				<?php the_content(); ?>
			</div>
			<?php endwhile; ?>
			<?php endif; ?>
		</div>
		
	</div>
	<?php get_sidebar(); ?>    
</div>  
<?php get_footer(); ?>