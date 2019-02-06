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
      var data = $( this ).serialize();
      console.log( 'contact form submit', data );
    });
  };
  ContactForm.destroy = () => {
    $( ".contact-form" ).off( 'submit' );
  };
})( jQuery );

export default ContactForm;
