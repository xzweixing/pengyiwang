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
	<div class="sidebar">
		<div class="top1">
			<div class="top1-title">
				<span class="headword">相关城市活动</span>
				<a class="more" href="/html/hdList.html" target="_blank">更多&gt;</a>
			</div>
			<div class="top1-content">
				<div class="act-item">
					<a href="#" target="_blank">
						<img src="http://zxwpic.weiyoutong.com/b2ec914b-4403-4479-a811-cafbc2b90db0.PNG" >
						<p class="act-item-name">
							<span>扎势，开车飞上天？海洋公园VR新体验~</span>
						</p>
					</a>
				</div>
				<div class="act-item">
					<a href="#" target="_blank">
						<img src="http://zxwpic.weiyoutong.com/b2ec914b-4403-4479-a811-cafbc2b90db0.PNG" >
						<p class="act-item-name">
							<span>扎势，开车飞上天？海洋公园VR新体验~</span>
						</p>
					</a>
				</div>
				<div class="act-item">
					<a href="#" target="_blank">
						<img src="http://zxwpic.weiyoutong.com/b2ec914b-4403-4479-a811-cafbc2b90db0.PNG" >
						<p class="act-item-name">
							<span>扎势，开车飞上天？海洋公园VR新体验~</span>
						</p>
					</a>
				</div>
				<div class="act-item">
					<a href="#" target="_blank">
						<img src="http://zxwpic.weiyoutong.com/b2ec914b-4403-4479-a811-cafbc2b90db0.PNG" >
						<p class="act-item-name">
							<span>扎势，开车飞上天？海洋公园VR新体验~</span>
						</p>
					</a>
				</div>
			</div>
		</div>
	</div>
</div>  
<?php get_footer(); ?>