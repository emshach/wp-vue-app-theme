import store from '../../lib/store';
export default {
  template: require( './template.html' ),
  data() {
    return {
      user: {},
      viewingAs: 'admin'
    };
  },
  mounted() {
    this.user = store.state.user;
  },
  methods: {
    setAs ( name ) {
      var as = this.user.as;
      as.logged_in = as.subscriber = as.premium = as.admin = false;
      this.viewingAs = name;
      switch ( name ) {
      case 'admin':
        as.admin = true;
      case 'premium':
        as.premium = true;
      case 'subscriber':
        as.subscriber = true;
      case 'logged-in user':
        as.logged_in = true;
      }
    }
  }
};
