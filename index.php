<?php $template_dir = get_template_directory_uri();
?><!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
    <link rel="stylesheet"
          href="<?php echo $template_dir; ?>/css/dist/bootstrap.css" />
    <link rel="stylesheet"
          href="<?php echo $template_dir; ?>/css/dist/bootstrap-grid.css" />
    <link rel="stylesheet"
          href="<?php echo $template_dir; ?>/css/dist/bootstrap-reboot.css" />
    <link rel="stylesheet" href="<?php echo $template_dir; ?>/css/dist/style.css" />
    <?php wp_head(); ?>
  </head>
  <body>
    <div class="body-wrap wrapper" id="app">
      <transition name="fade-in">
        <router-view></router-view>
      </transition>
      <nav-menu :menu="menu" :logo="site.logo"
                :title="site.title" :url="site.url"></nav-menu>
    </div><!--app-->
    <?php wp_footer(); ?>
  </body>
</html>
