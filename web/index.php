<?php get_header(); ?>
    <div class="main">
        <div class="slider">
            <div class="pic">
                <div class="swiper-container swiper1 ft-carousel" id="carousel_1">
                    <ul class="swiper-wrapper carousel-inner" >
                        <li class="swiper-slide carousel-item">
                            <a href="#"><img src="<?php echo home_url() ?>/wp-content/themes/xzdapeng/images/banner.png" ></a>
                        </li>

                    </ul>                      
                    <div class="carousel-indicators"></div>
                    <div class="left swiper-left">
                        <div class="ico"></div>
                        <div class="mask"></div>
                    </div>
                    <div class="right swiper-right">
                        <div class="ico"></div>
                        <div class="mask"></div>
                    </div>
                    <div class="swiper-scrollbar"></div>
                </div>
            </div>
        </div>  
        <div class="pzwh">
            <div class="content">
                <div class="title animate-box">彭祖文化</div>
                <div class="content-l animate-box">
                    <div class="swiper-container newsSwiper">
                        <div class="swiper-wrapper"></div>
                            <div class="swiper-slide">
                                <a href="#"><img src="<?php echo home_url() ?>/wp-content/themes/xzdapeng/images/pzwh.png" ></a>
                            </div>
                        <div class="swiper-pagination"></div>
                    </div>
                </div>
                <div class="content-r animate-box">
                    <?php query_posts('showposts=4&cat=2'); ?>
                    <?php if (have_posts()):while ( have_posts() ) : the_post(); ?> 
                    <div class="items">
                        <div class="items-l">
                            <div class="items-date"><?php the_time('d'); ?>/</div>
                            <div class="items-year"><?php the_time('Y.m'); ?></div>
                        </div>
                        <div class="items-r">
                            <div class="items-title">
                                <a href="<?php the_permalink(); ?>" target="_blank"><?php the_title(); ?></a>
                            </div>
                            <div class="items-content"><?php echo cut_str($post->post_content,116) ?>..</div>
                        </div>
                    </div>
                    <?php endwhile; endif;?>
                </div>
                <a target="_blank" href="<?php echo home_url() ?>/wenhua/"><button class="morenews animate-box">查看更多彭祖文化</button></a>
            </div>
        </div>
        <div class="dpjd parallax">
            <div class="content">
                <div class="title animate-box">大彭景点</div>
                <div class="contentimg animate-box fadeInUp">
                    <?php query_posts('showposts=4&cat=1'); ?>
                    <?php if (have_posts()):while ( have_posts() ) : the_post(); ?> 
                    <div class="img" >
                        <a target="_blank" href="<?php the_permalink(); ?>">
                            <?php post_thumbnail();?>"
                            <span class="imgtitle"><?php the_title(); ?></span>
                        </a>
                    </div>  
                    <?php endwhile; endif;?>
                </div>
                <div class="morejd">
                    <a href="<?php echo home_url() ?>/jingdian/" target="_blank">更多旅游景点</a>
                </div>
            </div>                    
        </div>
        <div class="pzwh">
            <div class="content">
                <div class="title animate-box">大彭资讯</div>
                <div class="content-l animate-box">
                    <div class="swiper-container newsSwiper">
                        <div class="swiper-wrapper"></div>
                            <div class="swiper-slide">
                                <a href="#"><img src="<?php echo home_url() ?>/wp-content/themes/xzdapeng/images/pzwh.png" ></a>
                            </div>
                        <div class="swiper-pagination"></div>
                    </div>
                </div>
                <div class="content-r animate-box">
                    <?php query_posts('showposts=4&cat=3'); ?>
                    <?php if (have_posts()):while ( have_posts() ) : the_post(); ?> 
                    <div class="items">
                        <div class="items-l">
                            <div class="items-date"><?php the_time('d'); ?>/</div>
                            <div class="items-year"><?php the_time('Y.m'); ?></div>
                        </div>
                        <div class="items-r">
                            <div class="items-title">
                                <a href="<?php the_permalink(); ?>" target="_blank"><?php the_title(); ?></a>
                            </div>
                            <div class="items-content"><?php echo wp_trim_words( get_the_content(),50); ?></div>
                        </div>
                    </div>
                    <?php endwhile; endif;?>                    
                </div>
                <a target="_blank" href="<?php echo home_url() ?>/zixun/"><button class="morenews animate-box">查看更多资讯</button></a>
            </div>
        </div>
        <div class="wjzd parallax">
            <div class="content">
                <div class="title animate-box">网架之都</div>
                <div class="contentimg animate-box fadeInUp">
                    <a href="#">
                        <img src="<?php echo home_url() ?>/wp-content/themes/xzdapeng/images/wjzd.png">
                    </a>
                </div>
                <div class="morejd">
                    <a href="<?php echo home_url() ?>/wangjia/" target="_blank">更多网架信息</a>
                </div>
            </div>                    
        </div>
        <div class="dpjd nytc">
            <div class="content">
                <div class="title animate-box">农业特产</div>
                <div class="nyimg">
                    <ul>
                        <?php query_posts('showposts=6&cat=4'); ?>
                        <?php if (have_posts()):while ( have_posts() ) : the_post(); ?> 
                        <li>
                            <a href="<?php the_permalink(); ?>" >
                                <?php post_thumbnail();?>
                                <span><?php the_title(); ?></span>
                            </a>
                        </li>
                        <?php endwhile; endif;?>     
                    </ul>
                </div>
                <div class="morejd clear">
                    <a href="<?php echo home_url() ?>/nongye/" target="_blank">更多农业特产</a>
                </div>
            </div>
        </div>
        <div class="dpjd parallax yxdp">
            <div class="content">
                <div class="title animate-box">影像大彭</div>
                <div class="tablist animate-box fadeInUp animated">
                <?php $sticky = get_option('sticky_posts'); rsort( $sticky );  
                      $sticky = array_slice( $sticky, 0, 2);query_posts( array( 'post__in' => $sticky, 'caller_get_posts' => 1,'cat'=>6,'showposts'=>1 ) );        
                ?>
                    <?php if (have_posts()):while ( have_posts() ) : the_post(); ?> 
                    <div class="item big">
                        <a href="<?php the_permalink(); ?>" class="animation-fadeIn">
                            <?php post_thumbnail();?>
                            <span class="txt"><?php the_title(); ?></span>
                        </a>
                        <div class="overlay"></div>
                    </div>
                    <?php endwhile; endif; ?>  
                    <?php $sticky = get_option('sticky_posts'); rsort( $sticky );  
                      $sticky = array_slice( $sticky, 0, 2);query_posts( array( 'post__not_in' => $sticky, 'cat'=>6,'showposts'=>4 ) );        
                ?>
                    <?php if (have_posts()):while ( have_posts() ) : the_post(); ?> 
                    <div class="item">
                        <a href="<?php the_permalink(); ?>" class="animation-fadeIn">
                            <?php post_thumbnail();?>
                            <span class="txt"><?php the_title(); ?></span>
                        </a>
                        <div class="overlay"></div>
                    </div>
                    <?php endwhile; endif; ?>                     
                </div>
                <div class="morejd">
                    <a href="<?php echo home_url() ?>/yingxiang/" target="_blank">更多大彭影像</a>
                </div>
            </div>                    
        </div>
        <div class="dpjd nytc pzcp">
            <div class="content">
                <div class="title animate-box">彭祖菜谱</div>
                <div class="nyimg cpimg">
                    <ul>
                        <?php query_posts('showposts=8&cat=8'); ?>
                        <?php if (have_posts()):while ( have_posts() ) : the_post(); ?> 
                        <li>
                            <a href="<?php the_permalink(); ?>" >
                                <?php post_thumbnail();?>
                                <span><?php the_title(); ?></span>
                            </a>
                        </li>
                        <?php endwhile; endif; ?>           
                    </ul>
                </div>
                <div class="morejd clear">
                    <a href="<?php echo home_url() ?>/caipu/" target="_blank">更多彭祖菜谱</a>
                </div>
            </div>
        </div>
        <div class="dpjd parallax yqtj">
            <div class="content">
                <div class="title animate-box">友情推荐</div>
                <div class="">
                    <div class="company">
                        <div class="content-top">
                            <div class="item">
                                <p><?php wp_list_bookmarks('categorize=0&category=9&title_li=&before=&after='); ?></p>                                
                            </div>
                            <div class="item">
                                <p><?php wp_list_bookmarks('categorize=0&category=10&title_li=&before=&after='); ?></p>   
                            </div>
                            <div class="item">
                                <p><?php wp_list_bookmarks('categorize=0&category=11&title_li=&before=&after='); ?></p>   
                            </div>
                        </div>
                        <div class="content-bottom" style="display:none;">
                            <div class="swiper-container J_YouQingTuiJian">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide slide-first">
                                        <a href="http://www.shanwentou.com.cn/" target="_blank"></a>
                                        <a href="http://www.qinlvjt.com/" target="_blank"></a>
                                        <a href="http://www.sxtourgroup.com/" target="_blank"></a>
                                        <a href="http://www.qjculture.com/" target="_blank"></a>
                                        <a href="http://www.xibugroup.com/" target="_blank"></a>
                                        <a href="http://www.xatourismgroup.com/" target="_blank"></a>
                                        <a href="http://www.ctrip.com" target="_blank"></a>
                                        <a href="http://www.lvmama.com" target="_blank"></a>
                                        <a href="https://www.ly.com" target="_blank"></a>
                                        <a href="https://www.qunar.com/" target="_blank"></a>
                                    </div>
                                </div>                                    
                            </div>                
                        </div>                 
                    </div>
                </div>
            </div>                    
        </div>            
    </div>
<?php get_footer(); ?>
