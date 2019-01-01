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
      }
    };
  },
  methods: {
    login() {
    },
    logout() {
    },
    nolink() {
      this.loginForm.link = false;
    }
  },
  computed: {
    loggedIn() {
      return this.user && this.user.id;
    }
  }
};
