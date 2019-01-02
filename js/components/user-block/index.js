import store from '../../lib/store';
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
    logout() {
    },
    nolink() {
      this.loginForm.link = false;
    },
    sendLink() {
      this.loginToken = true;
    },
    enterPass() {
      this.loginToken = false;
    }
  },
  computed: {
    loggedIn() {
      return this.user && this.user.id;
    }
  }
};
