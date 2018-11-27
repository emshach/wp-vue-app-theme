import axios from 'axios';
export default {  
  template: require( './template.html' ),
  methods: {
    validEmail( email ) {
      var re = /\S+@\S+/;
      return re.test(email.toLowerCase());
    },
    validate() {       

      this.commenterBlured = true;
      this.emailBlured = true;
      this.contentBlured = true;

      if( this.commenter !== '' 
          && this.validEmail(this.email)
          && this.content !== ''){
        this.valid = true;
      }
    },
    submit() {
      var self = this;       
      self.validate();     
      if(self.valid){
        axios.post( '/wp-json/wp/v2/comments', {
          author_name:  self.commenter,
          author_email: self.email,
          content:      self.content, 
          author_url:   self.website, 
          post:         self.$parent.post[0].id
        }).then(function (response) { 
          self.submitted = true;
        })
           .catch(function (error) {
             console.log(error);
           });
      }
    } //end submit
  },
  data() {
    return {
      commenter:       "", 
      commenterBlured: false,
      email:           "", 
      emailBlured:     false,
      website:         "", 
      content:         "", 
      contentBlured:   false,
      valid:           false, 
      submitted:       false
    };
  }
};
