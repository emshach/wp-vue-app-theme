import store from '../../lib/store';
import _wpapix from '../../lib/wpapix';
import he from 'he';
export default {
  template: require( './template.html' ),
  data () {
    return {
      sstate: store.state,
      promos: [],
      latest: [],
      trending: [],
      recent: [],
      history: [],
      discovery: [],
      favs: [],
      img: '',
      title: '',
      show: false
    };
  },
  mounted() {
    document.title = he.decode( this.sstate.site.title );
    _wpapix.then( wpapix => {
      var path = new wpapix.Path();
      console.log( 'path object', path );
      path.fetch().done(( rpost ) => {
        console.log( 'got home page', rpost );
        this.title = rpost.title.rendered;
        this.img = rpost.background_image || '';
        window.setTimeout(() => {
          this.promos = rpost.promo_reel || [];
        }, 10000 );
      });
    });
  },
  methods: {
    showImg() {
      this.show = true;
    }
  }
};
