import store from '../../lib/store';
import routeEvents from '../../lib/route-events';
export default {
  template: require( './template.html' ),
  props: {
    id: {
      type: Number,
      default: 0
    },
    path: {
      type: String,
      default: ''
    },
    post: {
      type: Object,
      default: () => {}
    }
  },
  beforeRouteUpdate: routeEvents.toPath,
  data() {
    return {
      img: '',
      show: false,
      promos: [],
      content:'',
      classes:{ small: false }
    };
  },
  mounted() {
    // wp.api.loadPromise.done(() => {
    //   var path = new wp.api.models.Path({ path: this.id || this.path });
    //   path.fetch().done( rpost => {
    //     console.log( 'got post page', rpost );
    if (! this.post )
      this.post = Object.assign( {}, store.state.nextpost );
    this.title = this.post.title.rendered;
    this.img = this.post.background_image || '';
    this.promos = this.post.promo_reel || [];
    this.content = this.post.content.rendered;
    if (! this.promos.length )
      this.classes.small = true;
    //   });
    // });
  },
  methods: {
    showImg() {
      this.show = true;
    }
  }
};
