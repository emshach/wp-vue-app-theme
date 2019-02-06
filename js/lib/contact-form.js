const ContactForm = {
  last_scroll: 0,
  scroll_dir: 'none'
};

(function ($) {
  ContactForm.init = ( ) => {
    var _ = ContactForm;
    var $el = $( ".contact-form" );
    $el.off( 'submit' );
    $el.on( 'submit', e => {
      e.preventDefault();
      var data = $el.serializeArray();
      console.log( 'contact form submit', data );
      data[ '_wp_http_referer' ] = window.location.href;
      $.post( $el.attr( 'action' ), data, rsp => {
        console.log( 'contact form submit response', rsp );
      });
    });
  };
  ContactForm.destroy = () => {
    $( ".contact-form" ).off( 'submit' );
  };
})( jQuery );

export default ContactForm;
