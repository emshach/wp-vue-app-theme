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

var NavSlider;
NavSlider = {
  wide: true,
  open: true,
  menu: null,
  init() {
  (function($) {
    const self = NavSlider;
    //function to find element Position
    var ts_margin  = 30; //first and last thumbnail margin (for better cursor interaction) 
    var ts_easing      = { duration: 1000, easing: "easeOutCirc" };
    var t_opacity      = 0.8; //thumbnails default opacity
    var tcur_opacity   = 0.9; //thumbnails default opacity for current element
    var tc_opacity_out = 0.075; //thumbnails area opacity on mouse out
    
  //cache vars
    if ( $( window ).innerWidth() < 600 ) { return; }
    var menu         = $( "#header-menu" );
    var outer        = $( "#main-nav" );
    var scroll       = $( "#main-nav > .wrapper" );
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

    var _init = function () {
      ts_container.css( "margingLeft", ts_margin + "px" ); //add margin
      scroll.css( "width", ts_width );
      outer.fadeTo(10000, tc_opacity_out, "easeInOutCubic");
    };
    self.menu = menu;
    
    thumb.each( function () {
      var $this = $( this );
      t_count += $this.innerWidth();
      $this.children().children().children( ".thumb" ).fadeTo( dur_out, t_opacity );
    });
    ts_container.css( "width", t_count + 10 );
    ts_bg.css( "width", t_count + 2 * bg_pad );

    scroll.mousemove( function(e) {
      if ( !self.wide ) return;
      var pos0;
      if ( ts_container.width() > ts_width ) {
	var cur = ( e.pageX - pos.left );
	var m_clamp = cur / ts_width;
	var dest = -( t_count + 2 * ( ts_margin - ts_width )) * m_clamp;
	pos0 = Math.abs( cur - dest ) - ts_margin;
      } else {
        pos0 = (( t_count + ts_margin * 2 ) - ts_width ) / 2;
      }
      if (Math.abs( pos0 - ts_container.position().left ) > 20 ){
      }});
    
    menu.hover(
      function() { //mouse over
        if ( !self.wide ) return;
        self.open = true;
	outer.stop().fadeTo( dur_in, 1 );
	menu.stop().animate({ height: menu_height }, ease_in );
        var top = $( "#app>.page" ).scrollTop();
        main_title.stop().animate({ bottom: 110 - top }, ease_in );
      },
      function() { //mouse out
        if ( !self.wide ) return;
        self.open = false;
	menu.stop().animate({ height: 15 }, ease_out );
        main_title.stop().animate({ bottom: 0 }, ease_out );
      }
    );

    thumb.not( t_current ).hover(
      function(){ //mouse over
        if ( !self.wide ) return;
        $( this ).stop()
           .fadeTo( dur_in, 1 )
           .animate({ top: -12 }, t_ease_in)
           .find( ".text" ).stop()
           .animate({ bottom: "95%" }, tt_ease_in)
           .animate({ opacity: 1 }, tt_ease_in1 );
      },
      function(){ //mouse out
        if ( !self.wide ) return;
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
        if ( !self.wide ) return;
	$(this).stop()
           .fadeTo( t_dur_in, 1 )
           .animate({ top: -12 }, t_ease_in )
           .find(".text").stop()
           .animate({ bottom: "95%" }, tt_ease_in)
           .animate({ opacity: 1 }, tt_ease_in1 );
      },
      function(){ //mouse out
        if ( !self.wide ) return;
        $(this).stop()
           .fadeTo( t_dur_out, tcur_opacity )
           .animate({ top: 0 }, t_ease_out )
           .find( ".text" ).stop()
           .animate({ bottom: 0 }, tt_ease_out1 )
           .animate({ opacity: 0 }, tt_ease_out );
      }
    );

    //on window resize scale image and reset thumbnail scroller
    $( window ).resize( function() {
      var wwidth = $( window ).width();
      var wasWide = self.wide;
      if (!( self.wide = wwidth >= 600 )) {
        ts_container.css( 'left', null );
        scroll.css( 'width', null );
        return;
      }
      if ( !wasWide ) _init();
      // FullScreenBackground("#bgimg",$bgimg.data("newImageW"),$bgimg.data("newImageH"));
      ts_container.stop().animate({ left: ts_left }, 400, "easeOutCirc" ); 
      var newWidth = outer.width();
      scroll.css( "width", newWidth );
      ts_width = newWidth;
      pos = get_pos($menu);
    });
      if (( self.wide = $( window ).width() >= 600 )) 
        _init();
    else
      self.open = false;

  })( jQuery );
  },
  toggleMenu ( open, duration ) {
    if (! duration )
      duration = 400;
    var $ = jQuery;
    if ( $( window ).innerWidth() >= 600 ) {
      if ( open && NavSlider.menu ) {
        self.menu.mouseenter();
      } else {
        self.menu.mouseleave();
      }
      return;
    }
    $("#main-nav button.toggle-mobile").blur();
    if ( open ) {
      $( "#main-nav" ).stop()
         .animate({ right: 48 }, duration );
      $( "#bg-nav" ).stop().fadeIn( duration );
    } else {
      $( "#main-nav" ).stop()
         .animate({ right: '100%' }, duration );
      $( "#bg-nav" ).stop().fadeOut( duration );
    }
  }
};
export default NavSlider;
