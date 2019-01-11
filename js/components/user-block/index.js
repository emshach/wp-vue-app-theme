import store from '../../lib/store';
import he from 'he';
import qs from 'qs';
import axios from 'axios';
export default {
  template: require( './template.html' ),
  data() {
    return {
      sstate: store.state,
      wait: null,
      allowHide: true,
      isShown: false
    };
  },
  methods: {
    shown() {
      this.isShown = true;
    },
    hiding(e) {
      if ( this.allowHide )
        this.isShown = false;
      else
        e.preventDefault();
    },
    delayClose(e) {
      this.allowHide = false;
      if ( this.wait )
        window.clearTimeout( this.wait );
      this.wait = window.setTimeout(() => {
        this.allowHide = true;
      }, 1000 );
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
    },
    isLoginRoute() {
      return this.$route.name == 'login';
    }
  }
};
