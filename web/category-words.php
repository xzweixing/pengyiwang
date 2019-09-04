<?php get_header(); ?>
<div class="bread-wrapper">
    <ol class="breadcrumb">
        <li><a href="index.html">首页</a></li>
        <li class="active">
            <?php
                $category = get_the_category();
                echo $category[0]->cat_name;
            ?>
        </li>
    </ol>
</div>
<div class="contrainer" style=" margin-top:0px; margin-bottom:120px; width:1180px">
    <div class="leftBox">
        <div class="wrap-content">
            <ul class="l-box">
            <?php while ( have_posts() ) : the_post(); ?>
                <li class="l-items">
                    <div class="imgbox pointer">
                        <a href="<?php the_permalink(); ?>">
                        <?php post_thumbnail();?>
                        </a>                                
                    </div>
                    <div class="descriptiveText">
                        <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                        <div class="posts-gallery-text">
                            <?php echo wp_trim_words( get_the_content(),100); ?>
                        </div>
                        <div class="posts-gallery-info">
                            <ul>
                                <li class="ico-time">
                                    发布日期：<?php the_time('Y-m-d'); ?>
                                </li>
                                <li class="ico-eye">
                                    浏览22次
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
                <?php endwhile; ?>                    
            </ul>
        </div>
        <div class="pagination-box" id="pagination-degree" style="height:40px;width:777px;">
            <div id="pagination" class="M-box1 m-style">
                <a href="javascript:;" class="prev">&lt;</a>
                <span class="active">1</span>
                <a href="javascript:;" data-page="2">2</a>
                <a href="javascript:;" data-page="3">3</a>
                <span>...</span>
                <a href="javascript:;" data-page="113">113</a>
                <a href="javascript:;" class="next">&gt;</a>
                <input type="text" class="jump-ipt">
                <a href="javascript:;" class="jump-btn">跳转</a>
            </div>
        </div>
    </div>
    <?php get_sidebar(); ?>    
</div>   
<?php get_footer(); ?>
