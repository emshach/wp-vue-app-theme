import store from '../../lib/store';
import axios from 'axios';
import wpapix from '../../lib/wpapi';
export default {
  template: require( './template.html' ),
  props: {
    levels: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      sstate: store.state,
      selectedLevel: false,
      storedLevels: false
    };
  },
  mounted() {
    if (! this.levels.length )
      wp.api.loadPromise.done(() => {
        var levels = new wpapix.Membership({ path: 'levels' });
        levels.fetch().done( res => {
          console.log( 'got membership levels', res );
          this.storedLevels = res;
        });
      });
  },
  methods: {
    setLevel( level ) {
      this.selectedLevel = level;
    },
    unsetLevel() {
      this.selectedLevel = false;
    }
  },
  computed: {
    user() {
      return this.sttate.user;
    },
    memberLevels() {
      return ( this.levels.length ? this.levels : this.storedLevels );
    }
  }
};
