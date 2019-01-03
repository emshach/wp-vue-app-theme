import store from '../../lib/store';
import he from 'he';
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
  template: require( './template.html' ),
  data() {
    return {
      user: store.state.user,
      action: 'login',
      userExists: false,
      recaptcha: {
        key: store.state.recaptcha_key,
        response: null
      },
      loginForm: {
        action: 'mrklogin',
        login: '',
        email: '',
        pass: '',
        remember: true,
        'g-recaptcha-response': '',
        token: false,
        sec_token: store.state.ajax.sec
      },
      confirmUser: '',
      confirmPass: '',
      tokenLogin: false,
      // urlLogin: store.state.login,
      // urlRegister: store.state.register
      ajaxUrl: store.state.ajax.url
    };
  },
  methods: {
    login(e) {
      e.preventDefault();
      if ( this.action != 'register' && this.loginForm.action == 'mrkregister' ) {
        this.action = 'register';
        if ( /.+@.+\..+/.test( this.loginForm.login )) {
          this.loginForm.email = this.loginForm.login;
          this.loginForm.login = '';
        }
        return false;
      }
      if (! this.recaptcha.response ) {
        // TODO: warn
        return false;
      }
      this.loginForm['g-recaptcha-response'] = this.recaptcha.response;
      this.loginForm.token = this.tokenLogin;
      axios.post( this.ajaxUrl, this.loginForm )
         .then( response => {
           switch ( response.next ) {
           case 'wrong-password':
             this.action = 'login';
             break;
           case 'unknown-user':
             this.action = 'unknown-user';
             break;
           case 'unknown-email':
             this.action = 'unknown-email';
             break;
           case 'link-sent':
             this.waitLogin();
             // TODO: close form
             break;
           case 'success':
             // success!
             Swal( 'Successfully logged in! Welcome!' );
             window.location.reload();
           }
         })
         .catch( error => {
           // sorry! try again
           // if user doesn't exist, do register instead
           // if (! /.+@.+\..+/.test( this.loginForm.log ))
           //   Swal(  "email address please" ); // .then( x => this.loginForm.log = x )
           Swal( "We're sorry! There was some problem. Please try again later" );
         });
      return false;
    },
    waitLogin() {
    },
    sendLink() {
      this.tokenLogin = true;
    },
    enterPass() {
      this.tokenLogin = false;
    },
    recaptchaSuccess( response ) {
      this.recaptcha.response = response;
    },
    recaptchaExpire( response ) {
      this.recaptcha.response = '';
    },
    actionLogin() {
      this.loginForm.action = 'mrklogin';
    },
    actionRegister() {
      this.loginForm.action = 'mrkregister';
    },
    showFormRegister() {
      this.action = 'register';
    },
    showFormLogin() {
      this.action = 'login';
    },
    showFormUser() {
      this.action = 'unknown-user';
    },
    showFormEmail() {
      this.action = 'unknown-email';
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
