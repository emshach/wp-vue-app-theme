import store from '../../lib/store';
export default {
  template: require( './template.html' ),
  data() {
    return {
      user: store.state.user,
      loginForm: {
        user: '',
        pass: '',
        credType: 'link',
        options: [{ text: 'Send login token', value: 'link' },
                  { text: 'Enter password', value: 'pass' }],
        link: true
      }
    };
  },
  methods: {
    login() {
    },
    logout() {
    }
  },
  computed: {
    loggedIn() {
      return this.user && this.user.id;
    }
  }
};
