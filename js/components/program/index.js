import store from '../../lib/store';
import he from 'he';
export default {
  template: require( './template.html' ),
  props: [ 'post' ],
  data() {
    return {
      sstate: store.state,
      storedPost: {},
      show: false
    };
  },
  mounted() {
    this.storedPost = Object.assign( {}, this.sstate.nextpost );
    document.title = he.decode( this.title + ' | ' + this.sstate.site.title );
  },
  updated() {
    document.title = he.decode( this.title + ' | ' + this.sstate.site.title );
  },
  methods: {
    showImg() {
      this.show = true;
    }
  },
  computed: {
    postData() {
      return this.post || this.storedPost;
    },
    title() {
      return this.postData.title && he.decode( this.postData.title.rendered ) || '';
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
      return this.postData.content && this.postData.content.rendered || '';
    },
    classes() {
      return { small: !!this.promos.length };
    }
  }
};
