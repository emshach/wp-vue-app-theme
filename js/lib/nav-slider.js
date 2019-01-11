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

// from https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript/4819886#4819886
function is_touch_device() {
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  var mq = function(query) {
    return window.matchMedia(query).matches;
  };

  if (( 'ontouchstart' in window )
      || window.DocumentTouch && document instanceof DocumentTouch ) {
    return true;
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}

var NavSlider;
NavSlider = {
  wide: true,
  open: true,
  menu: null,
  openMenu: null,
  closeMenu: null,
  opening: false,
  closing: false,
  dragging: false,
  accel: 0,
  init() {
  (function($) {
    const self = NavSlider;
    window.NavSlider = NavSlider;
    //function to find element Position
    var ts_margin  = 30; //first and last thumbnail margin (for better cursor interaction) 
    var ts_easing      = { duration: 1000, easing: "easeOutCirc" };
    var t_opacity      = 0.8; //thumbnails default opacity
    var tcur_opacity   = 0.9; //thumbnails default opacity for current element
    var tc_opacity_out = 0.075; //thumbnails area opacity on mouse out
    
  //cache vars
    var menu         = $( "#header-menu" );
    var outer        = $( "#main-nav" );
    var scroll       = $( "#main-nav > .wrapper" );
    var ts_bg        = $( "#bg-nav" );
    var ts_container = $( "#menu-nav" );
    var thumb        = $( "#menu-nav > .menu-item" );
    var t_current    = $( "#menu-nav > .current-menu-item" );
    var main_title   = "main > h1.title";
    
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
      self.openMenu();
      ts_container.css( "margingLeft", ts_margin + "px" ); //add margin
      scroll.css( "width", ts_width );
      outer.css( 'right', '' ).fadeTo(10000, tc_opacity_out, "easeInOutCubic");
      if ( !t_count )
        thumb.each( function () {
          var $this = $( this );
          t_count += $this.innerWidth();
          $this.children().children().children( ".thumb" ).fadeTo( dur_out, t_opacity );
        });
      ts_container.css( "width", t_count + 10 );
      ts_bg.css( "width", t_count + 2 * bg_pad );
    };
    self.menu = menu;
    self.openMenu = function(e) { //mouse over
      if ( !self.wide ) return;
      outer.stop().fadeTo( dur_in, 1 );
      if ( self.open || self.opening || self.closing ) return;
      self.open = true;
      self.opening = true;
      if ( window.requestAnimationFrame )
        window.requestAnimationFrame( ()=>{} );
      window.setTimeout(() => {
        self.opening = false;
      }, 100);
      menu.stop().animate({ height: menu_height }, ease_in );
      var top = $( "#app>.page" ).scrollTop() + $( window ).height()
          - $( "#app>.page>.featured-outer" ).innerHeight();
      $( main_title ).stop().animate({ bottom: 110 - top }, ease_in );
    };
    self.closeMenu = function(e) { //mouse out
      if ( !self.wide ) return;
      if ( self.opening || self.closing ) return;
      self.open = false;
      self.closing = true;
      if ( window.requestAnimationFrame )
        window.requestAnimationFrame( ()=>{} );
      window.setTimeout(() => {
        self.closing = false;
      }, 100);
      menu.stop().animate({ height: 15 }, ease_out );
      $( main_title ).stop().animate({ bottom: 0 }, ease_out );
    };
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
      if ( Math.abs( pos0 - ts_container.position().left ) > 20 ){
	ts_bg.stop().animate({ left: -pos0/2 - bg_pad }, ts_easing );
	ts_container.stop().animate({ left: -pos0 }, ts_easing );
      }});
    menu.hover( self.openMenu,  self.closeMenu );
    thumb.not( t_current ).hover(
      function(){ //mouse over
        if ( !self.wide ) return;
        $( this ).stop()
           .fadeTo( dur_in, 1 )
           .animate({ top: -12 }, t_ease_in )
           .find( ".text" ).stop()
           .animate({ bottom: "95%" }, tt_ease_in )
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
           .animate({ bottom: "95%" }, tt_ease_in )
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
      console.log ( 'window resized' );
      var wwidth = $( window ).width();
      var wheight = $( window ).height();
      var wasWide = self.wide;
      if (!( self.wide = wwidth >= 600 && wheight >= 600 )) {
        ts_container.css( 'left', '' );
        ts_container.css( "width", '' );
        scroll.css( 'width', '' );
        ts_bg.css( "width", '' );
        thumb.css({ opacity: '', top: '' })
        .find(".text").css({ opacity: '', top: '' });
        return;
      }
      if ( ! menu_height )
        menu_height = menu.innerHeight();
      if ( !wasWide ) _init();
      // FullScreenBackground("#bgimg",$bgimg.data("newImageW"),$bgimg.data("newImageH"));
      ts_container.stop().animate({ left: ts_left }, 400, "easeOutCirc" ); 
      var newWidth = outer.width();
      scroll.css( "width", newWidth );
      ts_width = newWidth;
      pos = get_pos( $menu );
    });
    var wwidth = $( window ).width();
    var wheight = $( window ).height();
    if (( self.wide = wwidth >= 600 && wheight >= 600 )) {
      console.log( 'window width', $( window ).width() );
      _init();}
    else {
      console.log( 'window width', $( window ).width(), self, self.wide );
      self.open = false;
    }
    
  })( jQuery );
  },
  toggleMenu ( open, duration ) {
    const self = NavSlider;
    if ( self.wide ) {
      if ( self.menu ) {
        if ( open ) {
          self.openMenu();
        } else {
          self.closeMenu();
        }
      }
      return;
    }
    const $ = jQuery;
    if (! duration )
      duration = 400;
    $("#main-nav button.toggle-mobile").blur();
    if ( open ) {
      $( "#main-nav" ).stop()
         .animate({ right: 40 }, duration );
      $( "#bg-nav" ).stop().fadeIn( duration );
    } else {
      $( "#main-nav" ).stop()
         .animate({ right: '100%' }, duration );
      $( "#bg-nav" ).stop().fadeOut( duration );
    }
  }
};
export default NavSlider;
