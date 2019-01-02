import store from '../../lib/store';
import he from 'he';
export default {
  template: require( './template.html' ),
  data() {
    return {
      user: store.state.user,
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
