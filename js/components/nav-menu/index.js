import navSlider from '../../lib/nav-slider';
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
  mounted() {
    this.$nextTick(() => {
      navSlider.init();
    });
  },
  updated() {
    this.$nextTick(() => {
      navSlider.init();
    });
  }
};
