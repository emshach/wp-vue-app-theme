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
      shown: false
    };
  },
  methods: {
    shown() {
      this.shown = true;
    },
    hiding(e) {
      if ( this.allowHide )
        this.shown = false;
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
    }
  }
};
