import store from '../../lib/store';
import _wpapix from '../../lib/wpapix';
import ScrollHeader from '../../lib/scroll-header';
import he from 'he';
export default {
  template: require( './template.html' ),
  props: {
    then: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      sstate: store.state,
      img: '',
      title: '',
      show: false
    };
  },
  mounted() {
    document.title = he.decode( this.sstate.site.title );
    _wpapix.then( wpapix => {
      var path = new wpapix.Path({ path: 'login' });
      path.fetch().done(( rpost ) => {
        console.log( 'got home page', rpost );
        this.title = rpost.title.rendered;
        this.img = rpost.background_image || '';
      });
    });
    this.$nextTick(() => {
      ScrollHeader.init( '#masthead', "#featured,#app>.page>.featured-outer" );
    });
  },
  methods: {
    showImg() {
      this.show = true;
    }
  }
};
