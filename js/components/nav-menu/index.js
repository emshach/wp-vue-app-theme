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
      menuOpen: false,
      slider: null
    };
  },
  mounted() {
    this.slider = navSlider;
    this.$nextTick(() => {
      navSlider.init();
    });
  },
  methods: {
    toggleMenu() {
      navSlider.toggleMenu( this.menuOpen = !this.menuOpen );
    },
    closeMenu() {
      navSlider.toggleMenu( this.menuOpen = false, 150 );
    }
  },
  watch: {
    'slider.open' ( val ) {
      this.menuOpen = val;
    }
  }
};
