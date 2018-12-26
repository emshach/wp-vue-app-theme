function get_pos( obj ) {
  var curleft = 0, curtop = 0;
  if (obj.offsetParent) {
    curleft = obj.offsetLeft;
    curtop = obj.offsetTop;
    while ((obj = obj.offsetParent)) {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
    }
  }
  return { top: curtop, left: curleft };
}
    
export default {
  init() {
  (function($) {
    //function to find element Position
    var ts_margin  = 30; //first and last thumbnail margin (for better cursor interaction) 
    var ts_easing      = { duration: 1000, easing: "easeOutCirc" };
    var t_opacity      = 0.8; //thumbnails default opacity
    var tcur_opacity   = 0.9; //thumbnails default opacity for current element
    var tc_opacity_out = 0.075; //thumbnails area opacity on mouse out
    
  //cache vars
    if ( $( window ).innerWidth() < 600 ) {
      $("#main-nav button.toggle-mobile").click( function () {
        var t = $(this);
        t.toggleClass( 'open' );
        if ( t.hasClass( 'open' )) {
          $( "#main-nav" ).stop()
             .animate({ right: 48 });
          $( "bg-nav" ).stop().fadeIn();
        } else {
          $( "#main-nav" ).stop()
             .animate({ right: '100%' });
          $( "bg-nav" ).stop().fadeOut();
        }
      });
      return;
    }
    var menu         = $( "#header-menu" );
    var outer        = $( "#main-nav" );
    var scroll       = $( "#main-nav > .container" );
    var ts_bg        = $( "#bg-nav" );
    var ts_container = $( "#menu-nav" );
    var thumb        = $( "#menu-nav > .menu-item" );
    var t_current    = $( "#menu-nav > .current-menu-item" );
    var main_title   = $( "main > h1.title" );
    
    var $menu       = menu.get(0);
    var menu_height = menu.innerHeight();
    
    //thumbnail scroller
    var ts_left   = ts_container.position().left;
    var ts_width  = outer.width();
    var t_count   = 0;
    var dur_in    = 200;
    var dur_out   = 1000;
    var t_dur_in  = 350;
    var t_dur_out = 500;
    var pos       = get_pos( $menu );
    var bg_pad    = 400;

    var ease_in = { duration: dur_in, easing: "easeOutBack", queue: false };
    var ease_out = { duration: dur_out, easing: "easeOutExpo", queue: false };
    var t_ease_in = { duration: t_dur_in, easing: "easeOutElastic", queue: false };
    var t_ease_out = { duration: t_dur_out, easing: "easeOutBounce", queue: false };
    var tt_ease_in = { duration: t_dur_in, easing: "easeOutCubic", queue: false };
    var tt_ease_out = { duration: t_dur_out, easing: "easeOutCubic", queue: false };
    var tt_ease_in1 = { duration: t_dur_in, easing: "easeInCubic", queue: false };
    var tt_ease_out1 = { duration: t_dur_out, easing: "easeInCubic", queue: false };
    
    ts_container.css( "margingLeft", ts_margin + "px" ); //add margin
    scroll.css( "width", ts_width );

    thumb.each( function () {
      var $this = $( this );
      t_count += $this.innerWidth();
      $this.children().children().children( ".thumb" ).fadeTo( dur_out, t_opacity );
    });
    ts_container.css( "width", t_count + 10 );
    ts_bg.css( "width", t_count + 2 * bg_pad );

    scroll.mousemove( function(e) {
      var pos0;
      if ( ts_container.width() > ts_width ) {
	var cur = ( e.pageX - pos.left );
	var m_clamp = cur / ts_width;
	var dest = -( t_count + 2 * ( ts_margin - ts_width )) * m_clamp;
	pos0 = Math.abs( cur - dest ) - ts_margin;
      } else {
        pos0 = (( t_count + ts_margin * 2 ) - ts_width ) / 2;
        // pos0 = ( ts_width - t_count ) / 2;
        // pos0 = ( ts_width - ( t_count - ts_margin * 2 )) / 2;
      }
      if (Math.abs( pos0 - ts_container.position().left ) > 20 ){
	ts_bg.stop().animate({ left: -pos0/2 - bg_pad }, ts_easing );
	ts_container.stop().animate({ left: -pos0 }, ts_easing );
      }});
    
    outer.fadeTo(10000, tc_opacity_out, "easeInOutCubic");
    
    menu.hover(
      function() { //mouse over
	outer.stop().fadeTo( dur_in, 1 );
	menu.stop().animate({ height: menu_height }, ease_in );
        var top = $( "#app>.page" ).scrollTop();
        main_title.stop().animate({ bottom: 110 - top }, ease_in );
      },
      function() { //mouse out
	outer.stop().fadeTo( dur_out * 3, tc_opacity_out, "easeInOutCubic");
	menu.stop().animate({ height: 15 }, ease_out );
        main_title.stop().animate({ bottom: 0 }, ease_out );
      }
    );

    thumb.not( t_current ).hover(
      function(){ //mouse over
        $( this ).stop()
           .fadeTo( dur_in, 1 )
           .animate({ top: -12 }, t_ease_in)
           .find( ".text" ).stop()
           .animate({ bottom: "95%" }, tt_ease_in)
           .animate({ opacity: 1 }, tt_ease_in1 );
      },
      function(){ //mouse out
	$( this ).stop()
           .fadeTo( t_dur_out, t_opacity )
           .animate({ top: 0 }, t_ease_out )
           .find( ".text" ).stop()
           .animate({ bottom: 0 }, tt_ease_out1 )
           .animate({ opacity: 0 }, tt_ease_out );
      }
    );
    t_current.hover(
      function(){ //mouse over
	$(this).stop()
           .fadeTo( t_dur_in, 1 )
           .animate({ top: -12 }, t_ease_in )
           .find(".text").stop()
           .animate({ bottom: "95%" }, tt_ease_in)
           .animate({ opacity: 1 }, tt_ease_in1 );
      },
      function(){ //mouse out
        $(this).stop()
           .fadeTo( t_dur_out, tcur_opacity )
           .animate({ top: 0 }, t_ease_out )
           .find( ".text" ).stop()
           .animate({ bottom: 0 }, tt_ease_out1 )
           .animate({ opacity: 0 }, tt_ease_out );
      }
    );
    //on window resize scale image and reset thumbnail scroller
    $(window).resize(function() {
      // FullScreenBackground("#bgimg",$bgimg.data("newImageW"),$bgimg.data("newImageH"));
      ts_container.stop().animate({ left: ts_left }, 400, "easeOutCirc" ); 
      var newWidth = outer.width();
      scroll.css( "width", newWidth );
      ts_width = newWidth;
      pos = get_pos($menu);
    });                         // TODO: unbind if < 600px
  })( jQuery );
  }
};
