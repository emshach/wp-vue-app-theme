import Swal from 'sweetalert2';
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
      data.forEach( d => {
        if ( d.name == '_wp_http_referer' )
          d.value = window.location.href;
      });
      $el.find( 'input,textarea' ).prop( 'disabled', true );
      $.post( $el.attr( 'action' ), data, rsp => {
        // we'll just assume it's okay
        Swal( "Thank you! We'll be in touch." );
        $el.find( 'input,textarea' ).prop( 'disabled', false );
        $el.find( 'textarea' ).val('');
        $el.find( 'input.radio' ).prop( 'checked', false );
      });
    });
  };
  ContactForm.destroy = () => {
    $( ".contact-form" ).off( 'submit' );
  };
})( jQuery );

export default ContactForm;
