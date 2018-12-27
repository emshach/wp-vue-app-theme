import store from '../../lib/store';
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
    wp.api.loadPromise.done(() => {
      var path = new wp.api.models.Path();
      console.log( 'path object', path );
      path.fetch().done(( rpost ) => {
        console.log( 'got home page', rpost );
        this.title = rpost.title.rendered;
        this.img = rpost.background_image || '';
        this.promos = rpost.promo_reel || [];
      });
    });
  },
  methods: {
    showImg() {
      this.show = true;
    }
  }
};
