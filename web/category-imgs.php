<?php get_header(); ?>
  <div class="bread-wrapper">
    <ol class="breadcrumb">
        <li><a href="index.html">首页</a></li>
        <li class="active">
            <?php
                $category = get_the_category();
                echo $category[0]->cat_name;
            ?>
            <?php the_category(',') ?>
        </li>
    </ol>
</div>
<div class="contrainer">
    <?php while ( have_posts() ) : the_post(); ?>
    <div class="subItem">
        <div class="imgpic imgpic-tk">
        <a href="<?php the_permalink(); ?>" >
            <div class="imgpic-tk-icon"></div>
            <?php post_thumbnail();?>
        </div>
        <p class="footer">
            <span><?php the_title(); ?></span>
        </p>
        </a>
    </div>
    <?php endwhile; ?>    
</div>
<div class="pagination-box" id="pagination-degree" style="height:40px;width:1060px;">
    <div id="pagination" class="M-box1 m-style">
        <a href="#" class="prev"><</a>
        <span class="active">1</span>
        <a href="javascript:;" data-page="2">2</a>
        <a href="javascript:;" data-page="2">3</a>

        <a href="javascript:;" data-page="2">15</a>
        <a href="javascript:;" class="next">></a>
        <input type="text" class="jump-ipt">
        <a href="javascript:;" class="jump-btn">跳转</a>
    </div>
</div>  
<?php get_footer(); ?>
