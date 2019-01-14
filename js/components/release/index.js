import routeEvents from '../../lib/route-events';
import store from '../../lib/store';
import media_actions from '../../mixins/media-actions';
import he from 'he';
import _ from 'lodash';
export default {
  template: require( './template.html' ),
  mixins: [ media_actions ],
  props: [ 'post' ],
  data() {
    return {
      sstate: store.state,
      storedPost: {
        stats: {},
        my_xp: {}
      },
      show: false,
      prev: 0,
      next: 0,
      wideMode: true
    };
  },
  beforeRouteUpdate: routeEvents.toRelease,
  mounted() {
    this.storedPost = Object.assign( {}, this.sstate.nextpost );
    document.title = he.decode( this.title + ' | ' + this.sstate.site.title );
  },
  methods: {
    showImg() {
      this.show = true;
    },
    likePost() {
    },
    dislikePost() {
    },
    favPost() {
    }
  },
  computed: {
    postData() {
      return this.post || this.storedPost;
    },
    title() {
      return this.postData.title && this.postData.title.rendered || '';
    },
    img() {
      return this.postData.background_image || '';
    },
    promos() {
      return [{
        id: this.postData.id,
        excerpt: { rendered: this.content }
      }].concat( this.postData.promo_reel || []);
    },
    episodes() {
      return this.postData.releases || [];
    },
    content() {
      return this.postData.content ? this.postData.content.rendered
         : this.postData.caption ? this.postData.caption.rendered : '';
    },
    classes() {
      return { small: !!this.promos.length };
    },
    series() {
      if ( !this.postData.series || !this.postData.series.length )
        return false;
      var episodes = _.orderBy( this.postData.series, [ 'release_number' ], [ 'asc' ]);
      var series = episodes.filter( x => this.canWatchNow(x) || x.restrictions.show );
      return series.length && series;
    }
  },
  watch: {
    $route( to, from ) {
      this.storedPost = Object.assign( {}, this.sstate.nextpost );
      document.title = he.decode( this.title + ' | ' + this.sstate.site.title );
    }
  }
};
