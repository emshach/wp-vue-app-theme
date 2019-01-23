import routeEvents from '../../lib/route-events';
import store from '../../lib/store';
import media_actions from '../../mixins/media-actions';
import ScrollHeader from '../../lib/scroll-header';
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
      wideMode: false
    };
  },
  beforeRouteUpdate: routeEvents.toPreviewRelease,
  mounted() {
    this.storedPost = Object.assign( {}, this.sstate.nextpost );
    this.$nextTick(() => {
      ScrollHeader.init( '#masthead', "#featured,#app>.page>.featured-outer" );
    });
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
    fullContent() {
      return this.postData.full_content;
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
    }
  }
};
