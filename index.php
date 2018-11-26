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
    <link rel="stylesheet" href="<?php echo $template_dir; ?>/css/dist/main.css" />
    <?php wp_head(); ?>
  </head>
  <body>
    <div id="app">
      <transition name="fade-in">
        <router-view
          v-bind:posts="posts"
          v-bind:post="post"
          v-bind:comments="comments"
          v-bind:pagers="pagers">
        </router-view>
      </transition>
    </div><!--app-->
    <script src="<?php echo $template_dir; ?>/js/moonraker.js"></script>
    <?php wp_footer(); ?>
  </body>
</html>
