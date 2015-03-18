<?php

require('wp-blog-header.php');

//global $wpdb;

$offset = 0;
if(isset($_REQUEST["offset"])){
	$offset = $_REQUEST["offset"];
}

$category = '';
if(isset($_REQUEST["category"])){
	$category = $_REQUEST["category"];
}

$pid = '';
if(isset($_REQUEST["pid"])){
	$pid = $_REQUEST["pid"];
}

$results = array();

if($pid==''){
	$args = array(
		'posts_per_page'   => 30,
		'offset'           => $offset,
		'category'         => $category,
		'category_name'    => '',
		'orderby'          => 'post_date',
		'order'            => 'DESC',
		'include'          => '',
		'exclude'          => '',
		'meta_key'         => '',
		'meta_value'       => '',
		'post_type'        => 'post',
		'post_mime_type'   => '',
		'post_parent'      => '',
		'post_status'      => 'publish',
		'suppress_filters' => true 
	);
	$posts_array = get_posts( $args );


	for($i =0; $i<count($posts_array); $i++){
		$row = array();
		$row["ID"] = $posts_array[$i]->ID;
		$row["t"] = $posts_array[$i]->post_date;
		$row["excerpt"] = $posts_array[$i]->post_excerpt;
		$row["title"] = $posts_array[$i]->post_title;
		
		$post_categories = wp_get_post_categories( $posts_array[$i]->ID );
		$cats = array();
			
		foreach($post_categories as $c){
			$cat = get_category( $c );
			$cats[] = array( 'id' => $c, 'name' => $cat->name, 'slug' => $cat->slug );
		}

		$row["categories"] = $cats;

		$row["image"] = '';
		if (has_post_thumbnail( $posts_array[$i]->ID ) ){
			$im = wp_get_attachment_image_src( get_post_thumbnail_id( $posts_array[$i]->ID ), 'single-post-thumbnail' );
			$row["image"] = $im[0];
		}

		$links = get_post_custom_values("link", $posts_array[$i]->ID );
		$link = "";
		if(is_array($links) && count($links)>0 ){
			$link = $links[0];
		}

		$row["link"] = $link;

		$results[] = $row;	

	}

} else {
	$post = get_post($pid);
	$row = array();
	$row["ID"] = $post->ID;
	$row["t"] = $post->post_date;
	$row["excerpt"] = $post->post_excerpt;
	$row["content"] = $post->post_content;
	$row["title"] = $post->post_title;
	
	$post_categories = wp_get_post_categories( $post->ID );
	$cats = array();
		
	foreach($post_categories as $c){
		$cat = get_category( $c );
		$cats[] = array( 'id' => $c, 'name' => $cat->name, 'slug' => $cat->slug );
	}

	$row["categories"] = $cats;

	$row["image"] = '';
	if (has_post_thumbnail( $post->ID ) ){
		$im = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' );
		$row["image"] = $im[0];
	}

	$links = get_post_custom_values("link", $post->ID );
	$link = "";
	if(is_array($links) && count($links)>0 ){
		$link = $links[0];
	}

	$row["link"] = $link;

	$results[] = $row;	
}



echo(  json_encode( $results ) );

?>