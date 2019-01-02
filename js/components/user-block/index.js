import store from '../../lib/store';
import he from 'he';
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
        user: '',
        pass: '',
        link: true
      },
      tokenLogin: false
    };
  },
  methods: {
    login() {
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
