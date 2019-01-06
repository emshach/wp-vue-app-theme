import store from '../../lib/store';
import he from 'he';
import qs from 'qs';
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
  template: require( './template.html' ),
  data() {
    return {
      sstate: store.state,
      action: 'login',
      userExists: false,
      recaptcha: {
        key: store.state.recaptcha_key,
        response: null,
        show: false
      },
      errors: [],
      usernameTaken: false,
      emailTaken: false,
      messageStyle: {
        height: 'auto',
        width: 'auto'
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
        this.errors = [];
        if ( /.+@.+\..+/.test( this.loginForm.login )) {
          this.loginForm.email = this.loginForm.login;
          this.loginForm.login = '';
        }
        return false;
      }
      if (! this.recaptcha.response ) {
        this.errors.push( "captcha: are you a robot?" );
        return false;
      }
      this.loginForm['g-recaptcha-response'] = this.recaptcha.response;
      this.loginForm.token = this.tokenLogin;
      axios.post( this.ajaxUrl, qs.stringify( this.loginForm ), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }})
         .then( response => {
           var d = response.data;
           console.log( 'loginForm response', d );
           switch ( d.next ) {
           case 'wrong-password':
             this.action = 'login';
             this.errors.push( "the password you entered was incorrect" );
             break;
           case 'unknown-user':
           case 'unknown-email':
           case 'email-exists':
           case 'success-email':
           case 'not-registered':
             var $el = this.$refs.loginForm;
             this.messageStyle.height = $el.clientHeight + 'px';
             this.messageStyle.width = $el.clientWidth + 'px';
             this.action = d.next;
             break;
           case 'link-sent':
             this.action = 'link-sent';
             this.waitLogin();
             // TODO: close form
             break;
           case 'user-exists':
             this.usernameTaken = true;
             break;
           case 'forgot-password':
             break;
           case 'error':
             break;
           case 'success':
             // success!
             this.action = 'success';
             this.reload();
           }
           this.focusFirst();
         })
         .catch( error => {
           console.warn( 'server error', error );
           this.action = 'system-error';
           // Swal( "We're sorry! There was some problem. Please try again later" );
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
    recaptchaShow() {
      this.recaptcha.response = '';
      this.recaptcha.show = true;
    },
    recaptchaSuccess( response ) {
      this.errors = this.errors.filter( x => !/captcha/.test(x) );
      this.recaptcha.response = response;
      window.setTimeout( () => { this.recaptcha.show = false; }, 2000 );
      window.setTimeout( () => { this.recaptcha.response = ''; }, 100000 );
    },
    recaptchaExpired() {
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
    },
    formClick(e) {
      e.stopPropagation();
    },
    clearForm() {
      this.loginForm = {
        action: 'mrklogin',
        login: '',
        email: '',
        pass: '',
        remember: true,
        'g-recaptcha-response': '',
        token: false,
        sec_token: store.state.ajax.sec
      };
      this.action = 'login';
      this.confirmUser = '';
      this.confirmPass = '';
      this.tokenLogin = false;
    },
    reload() {
      window.location.reload();
    },
    goBack(e) {
      e.stopPropagation();
      if ( this.action == 'not-registered' )
        this.action = 'login';
      else 
        this.action = 'register';
    },
    goToLogin(e) {
      e.stopPropagation();
      this.loginForm.login = this.loginForm.email;
      this.loginForm.email = '';
      this.action = 'login';
    },
    confirm(e) {
      this.loginForm.action = 'mrklogin';
      this.loginForm.token = true;
      this.login(e);
    },
    register(e) {
      e.stopPropagation();
      this.action = 'register';
    },
    focusFirst() {
      this.$nextTick(() => {
        if ( this.$refs.firstInput )
          this.$refs.firstInput.focus();
      });
    }
  },
  computed: {
    user() {
      return store.state.user;
    },
    loggedIn() {
      return this.user && this.user.id;
    },
    logoutLink() {
      return he.decode( this.user.logout );
    }
  }
};
