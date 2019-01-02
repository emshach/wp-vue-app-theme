import store from '../../lib/store';
import he from 'he';
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
  template: require( './template.html' ),
  data() {
    return {
      user: store.state.user,
      recaptcha: {
        key: store.state.recaptcha_key,
        response: null
      },
      loginForm: {
        log: '',
        pwd: '',
        'g-recaptcha-response':''
      },
      tokenLogin: false
    };
  },
  methods: {
    login() {
      if ( this.tokenLogin ) {
        // passwordless-login
      }
      else {
        axios.post ('/wp-login.php', this.loginForm )
           .then( response => {
             // success!
             Swal( 'Successfully logged in! Welcome!' );
             window.location.reload();
           })
           .catch( error => {
             // sorry! try again
           });
      }
    },
    nolink() {
      this.loginForm.link = false;
    },
    sendLink() {
      this.tokenLogin = true;
    },
    enterPass() {
      this.tokenLogin = false;
    },
    recaptchaSuccess( response ) {
      this.recaptcha.response = response;
    }
  },
  computed: {
    loggedIn() {
      return this.user && this.user.id;
    },
    logoutLink() {
      return he.decode( this.user.logout );
    }
  }
};
