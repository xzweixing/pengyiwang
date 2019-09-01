<?php

$themename = "徐州老年人才服务中心";
$shortname = "Lwei";

$categories = get_categories('hide_empty=0&orderby=name');
$wp_cats = array();
foreach ($categories as $category_list ) {
       $wp_cats[$category_list->cat_ID] = $category_list->cat_name;
}

$number_entries = array("Select a Number:","1","2","3","4","5","6","7","8","9","10", "12","14", "16", "18", "20" );
$options = array (
 
array( "name" => $themename." Options",
       "type" => "title"),
//首页布局设置开始

	array( "name" => "模板基本设置",
    array( "type" => "close"),    
           "type" => "section"),
    array( "type" => "open"),
		
	array(  "name" => "是否显示搜索",
			"desc" => "默认显示",
            "id" => $shortname."_search",
            "type" => "select",
            "std" => "Display",
            "options" => array("Display", "Hide")),
	
	array(  "name" => "是否显示最新图片",
			"desc" => "默认显示",
            "id" => $shortname."_least_pic",
            "type" => "select",
            "std" => "Display",
            "options" => array("Display", "Hide")),
	
	array(  "name" => "是否显示热门图片",
			"desc" => "默认显示",
            "id" => $shortname."_hot_pic",
            "type" => "select",
            "std" => "Display",
            "options" => array("Display", "Hide")),
	
	array(  "name" => "是否显示随机图片",
			"desc" => "默认显示",
            "id" => $shortname."_random_pic",
            "type" => "select",
            "std" => "Display",
            "options" => array("Display", "Hide")),
			
	
//SEO设置
    array( "type" => "close"),
	array( "name" => "网站SEO设置及流量统计",
       "type" => "section"),
	array( "type" => "open"),

	array(	"name" => "描述（Description）",
			"desc" => "",
			"id" => $shortname."_description",
			"type" => "textarea",
            "std" => "输入你的网站描述，一般不超过200个字符"),

	array(	"name" => "关键词（KeyWords）",
            "desc" => "",
            "id" => $shortname."_keywords",
            "type" => "textarea",
            "std" => "输入你的网站关键字，一般不超过100个字符"),

	array("name" => "统计代码",
            "desc" => "",
            "id" => $shortname."_track_code",
            "type" => "textarea",
            "std" => ""),

	array(	"type" => "close") 
);

function mytheme_add_admin() {

global $themename, $shortname, $options;

if ( $_GET['page'] == basename(__FILE__) ) {

	if ( 'save' == $_REQUEST['action'] ) {

		foreach ($options as $value) {
		update_option( $value['id'], $_REQUEST[ $value['id'] ] ); }

foreach ($options as $value) {
	if( isset( $_REQUEST[ $value['id'] ] ) ) { update_option( $value['id'], $_REQUEST[ $value['id'] ]  ); } else { delete_option( $value['id'] ); } }

	header("Location: admin.php?page=option.php&saved=true");
die;

}
else if( 'reset' == $_REQUEST['action'] ) {

	foreach ($options as $value) {
		delete_option( $value['id'] ); }

	header("Location: admin.php?page=option.php&reset=true");
die;

}
}
 
add_theme_page($themename." Options", "当前主题设置", 'edit_themes', basename(__FILE__), 'mytheme_admin');
}

function mytheme_add_init() {

$file_dir=get_bloginfo('template_directory');
wp_enqueue_style("functions", $file_dir."/includes/options/options.css", false, "1.0", "all");
wp_enqueue_script("rm_script", $file_dir."/includes/options/rm_script.js", false, "1.0");
}
function mytheme_admin() {
 
global $themename, $shortname, $options;
$i=0;
 
if ( $_REQUEST['saved'] ) echo '<div id="message" class="updated fade"><p><strong>'.$themename.' 主题设置已保存</strong></p></div>';
if ( $_REQUEST['reset'] ) echo '<div id="message" class="updated fade"><p><strong>'.$themename.' 主题已重新设置</strong></p></div>';
 
?>
<div class="wrap rm_wrap">
<h2><?php echo $themename; ?> 设置</h2>
<p>当前使用主题: <?php echo $themename; ?> | 设计者:<a href="https://www.weixing.me" target="_blank"> 魏星博客</a> </p>
<div class="rm_opts">
<form method="post">
<?php foreach ($options as $value) {
switch ( $value['type'] ) {
 
case "open":
?>
 
<?php break;
 
case "close":
?>
 
</div>
</div>
<br />

 
<?php break;
 
case "title":
?>

 
<?php break;
 
case 'text':
?>

<div class="rm_input rm_text">
	<label for="<?php echo $value['id']; ?>"><?php echo $value['name']; ?></label>
 	<input name="<?php echo $value['id']; ?>" id="<?php echo $value['id']; ?>" type="<?php echo $value['type']; ?>" value="<?php if ( get_settings( $value['id'] ) != "") { echo stripslashes(get_settings( $value['id'])  ); } else { echo $value['std']; } ?>" />
 <small><?php echo $value['desc']; ?></small><div class="clearfix"></div>
 
 </div>
<?php
break;
 
case 'textarea':
?>

<div class="rm_input rm_textarea">
	<label for="<?php echo $value['id']; ?>"><?php echo $value['name']; ?></label>
 	<textarea name="<?php echo $value['id']; ?>" type="<?php echo $value['type']; ?>" cols="" rows=""><?php if ( get_settings( $value['id'] ) != "") { echo stripslashes(get_settings( $value['id']) ); } else { echo $value['std']; } ?></textarea>
 <small><?php echo $value['desc']; ?></small><div class="clearfix"></div>
 
 </div>
  
<?php
break;
 
case 'select':
?>

<div class="rm_input rm_select">
	<label for="<?php echo $value['id']; ?>"><?php echo $value['name']; ?></label>
	
<select name="<?php echo $value['id']; ?>" id="<?php echo $value['id']; ?>">
<?php foreach ($value['options'] as $option) { ?>
		<option <?php if (get_settings( $value['id'] ) == $option) { echo 'selected="selected"'; } ?>><?php echo $option; ?></option><?php } ?>
</select>

	<small><?php echo $value['desc']; ?></small><div class="clearfix"></div>
</div>
<?php
break;
 
case "checkbox":
?>

<div class="rm_input rm_checkbox">
	<label for="<?php echo $value['id']; ?>"><?php echo $value['name']; ?></label>
	
<?php if(get_option($value['id'])){ $checked = "checked=\"checked\""; }else{ $checked = "";} ?>
<input type="checkbox" name="<?php echo $value['id']; ?>" id="<?php echo $value['id']; ?>" value="true" <?php echo $checked; ?> />


	<small><?php echo $value['desc']; ?></small><div class="clearfix"></div>
 </div>
<?php break; 
case "section":

$i++;

?>

<div class="rm_section">
<div class="rm_title"><h3><img src="<?php bloginfo('template_directory')?>/includes/options/clear.png" class="inactive" alt="""><?php echo $value['name']; ?></h3><span class="submit"><input name="save<?php echo $i; ?>" type="submit" value="保存设置" />
</span><div class="clearfix"></div></div>
<div class="rm_options">

 
<?php break;
 
}
}
?>
 
<input type="hidden" name="action" value="save" />
</form>
<form method="post">
<p class="submit" style="display:none;">
<input name="reset" type="submit" value="恢复默认" />
<input type="hidden" name="action" value="reset" />
</p>
</form>
 </div> 
 <div class="kg"></div>
<?php
}
?>
<?php
add_action('admin_init', 'mytheme_add_init');
add_action('admin_menu', 'mytheme_add_admin');
?>