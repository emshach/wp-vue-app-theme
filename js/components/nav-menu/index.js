import navSlider from '../../lib/nav-slider';
import store from '../../lib/store';
export default {
  template: require( './template.html' ),
  props: {
    menu: {
      type: Array,
      default: () => []
    },
    logo: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      sstate: store.state,
      menuOpen: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      navSlider.init();
    });
  },
  updated() {
    this.$nextTick(() => {
      navSlider.init();
    });
  },
  methods: {
    toggleMenu() {
      navSlider.toggleMenu( this.menuOpen = !this.menuOpen );
    }
  }
};
