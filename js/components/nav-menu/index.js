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
    },
    slug( item ) {
      var slug = item.url;
      if ( slug == '/' ) return 'home';
      if ( slug.startsWith("/") )
        slug = slug.substr(1);
      if ( slug.endsWith("/") )
        slug = slug.slice( 0, -1 );
      return slug;
    }
  },
  watch: {
    'slider.open' ( val ) {
      this.menuOpen = val;
    }
  }
};
