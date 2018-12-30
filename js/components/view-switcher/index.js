import store from '../../lib/store';
export default {
  template: require( './template.html' ),
  data: {
    user: {}
  },
  mounted() {
    this.user = store.state.user;
  },
  methods: {
    setAs ( name ) {
      var as = this.user.as;
      as.logged_in = as.subscriber = as.premium = as.admin = false;
      switch ( name ) {
      case 'admin':
        as.admin = true;
      case 'premium':
        as.premium = true;
      case 'subscriber':
        as.subscriber = true;
      case 'logged-in':
        as.logged_in = true;
      }
    }
  }
};
