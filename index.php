<?php $template_dir = get_template_directory_uri();
?><!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
    <?php wp_head(); ?>
  </head>
  <body><?php if( have_posts() ) { the_post(); } ?>
    <div id="top-banner" class="widget-area">
      <?php dynamic_sidebar( 'top-banner' ); ?>
    </div>
    <div class="body-wrap wrapper" id="app">
      <transition name="fade-in" mode="out-in">
        <router-view></router-view>
      </transition>
      <wp-header></wp-header>
      <view-switcher></view-switcher>
      <nav-menu :menu="menu" :logo="site.logo" :title="site.title"></nav-menu>
    </div><!--app-->
    <?php wp_footer(); ?>
  </body>
</html>
