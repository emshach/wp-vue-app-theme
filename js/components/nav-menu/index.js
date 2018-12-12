import store from '../../lib/store';
export default {
  template: require( './template.html' ),
  props: {
    menu: {
      type: String,
      default: "nav"
    }
  },
  data() {
    return {
      sstate: store.state,
      slides: [],
      slide: 0
    };
  },
  created() {
    this.slides = this.sstate.menus.nav || [];
  }
};
