import store from '../../lib/store';
import he from 'he';
import qs from 'qs';
import axios from 'axios';
export default {
  template: require( './template.html' ),
  props: [ 'shown' ],
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
      feedbackStyle: {
        minHeight: 'auto',
        minWidth: 'auto'
      },
      messageStyle: {
        minHeight: 'auto'
      },
      formData: {
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
      ajaxUrl: store.state.ajax.url
    };
  },
  methods: {
    login(e) {
      e.preventDefault();
      if ( this.action != 'register' && this.formData.action == 'mrkregister' ) {
        this.action = 'register';
        this.errors = [];
        if ( /.+@.+\..+/.test( this.formData.login )) {
          this.formData.email = this.formData.login;
          this.formData.login = '';
        }
        return false;
      }
      if (! this.recaptcha.response ) {
        this.errors.push( "captcha: are you a robot?" );
        return false;
      }
      this.formData['g-recaptcha-response'] = this.recaptcha.response;
      this.formData.token = this.tokenLogin;
      axios.post( this.ajaxUrl, qs.stringify( this.formData ), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }})
         .then( response => {
           var d = response.data;
           console.log( 'formData response', d );
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
             var $el = this.$refs.formData;
             this.feedbackStyle.minHeight = $el.clientHeight + 'px';
             this.messageStyle.minHeight = $el.clientHeight - 60 + 'px';
             this.feedbackStyle.minWidth = $el.clientWidth + 'px';
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
      this.formData.action = 'mrklogin';
    },
    actionRegister() {
      this.formData.action = 'mrkregister';
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
      console.log( 'formClick', e );
      e.stopPropagation();
    },
    changed(e) {
      this.$emit('change', { orig: e });
    },
    clearForm() {
      this.formData = {
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
      this.formData.login = this.formData.email;
      this.formData.email = '';
      this.action = 'login';
    },
    confirm(e) {
      this.formData.action = 'mrklogin';
      this.formData.token = true;
      this.login(e);
    },
    register(e) {
      e.stopPropagation();
      this.action = 'login';
      this.formData.action = 'mrkregister';
      this.login(e);
    },
    focusFirst() {
      window.setTimeout(() => {
        if ( this.$refs.firstInput )
          this.$refs.firstInput.focus();
      }, 150 );
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
  },
  watch: {
    action( newVal, oldVal ) {
      if ( newVal != oldVal )
        this.focusFirst();
    },
    shown( val ) {
      if ( val )
        this.focusFirst();
    }
  }
};
