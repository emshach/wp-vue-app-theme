import store from '../../lib/store';
import he from 'he';
export default {
  template: require( './template.html' ),
  props: [ 'post' ],
  data() {
    return {
      sstate: store.state,
      storedPost: {},
      promos: [],
      show: false
    };
  },
  mounted() {
    this.storedPost = Object.assign( {}, this.sstate.nextpost );
    document.title = he.decode( this.title + ' | ' + this.sstate.site.title );
    window.setTimeout(() => {
      this.promos = this.promo_reel;
    }, 3000 );
  },
  updated() {
    document.title = he.decode( this.title + ' | ' + this.sstate.site.title );
    this.promos = [];
    window.setTimeout(() => {
      this.promos = this.promo_reel;
    }, 5000 );
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
      return this.postData.title && this.postData.title.rendered || '';
    },
    img() {
      return this.postData.background_image || '';
    },
    promo_reel() {
      return this.postData.promo_reel || [];
    },
    episodes() {
      return this.postData.releases || [];
    },
    episodesTitle() {
      return this.postData.title_releases || 'Programmes';
    },
    archives() {
      return this.postData.archives || [];
    },
    archivesTitle() {
      return this.postData.title_archives || 'From the Archives';
    },
    content() {
      const user = this.sstate.user;
      if ( this.postData.member_content
           && ( user.as ? user.as.subscriber : user.membership ))
        return this.postData.member_content;
      return this.postData.content && this.postData.content.rendered || '';
    },
    classes() {
      return { small: !!this.promos.length };
    }
  }
};
