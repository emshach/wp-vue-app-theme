const ScrollHeader = {
  last_scroll: 0,
  scroll_dir: 'none'
};

(function ($) {
  ScrollHeader.init = ( header, top ) => {
    var _ = ScrollHeader;
    var $el = $( "#app>.page" );
    _.last_scroll = $el.scrollTop();
    $el.off( 'scroll' ).scroll( e => {
      var last = _.last_scroll;
      var cur = _.last_scroll = $el.scrollTop();
      var $head = $( header );
      
      if ( last < cur ) {
        _.scroll_dir = 'down';
        $head.stop().animate( { top: - $head.innerHeight() - 10 }, 1000 );
      } else if ( last > cur ) {
        _.scroll_dir = 'up';
        $head.stop().animate( { top: 0 }, 1000 );
      } else
        _.scroll_dir = 'none';
      var topH = $( top ).innerHeight() - $head.innerHeight() + 20;
      if ( cur > topH ) 
        $head.removeClass( 'mrk-bg-clear' ).addClass( 'mrk-bg-dark' );
      else
        $head.removeClass( 'mrk-bg-dark' ).addClass( 'mrk-bg-clear' );
    });
  };
  ScrollHeader.destroy = () => {
    $( "#app>.page" ).off( 'scroll' );
  };
})( jQuery );

export default ScrollHeader;
