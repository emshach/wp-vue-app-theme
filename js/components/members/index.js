import store from '../../lib/store';
import ScrollHeader from '../../lib/scroll-header';
import _wpapix from '../../lib/wpapix';
import he from 'he';
export default {
  template: require( './template.html' ),
  data () {
    return {
      sstate: store.state,
      storedPost: {},
      promos: [],
      show: false,
      scrollheader: null
    };
  },
  mounted() {
    this.storedPost = Object.assign( {}, this.sstate.nextpost );
    _wpapix.then( wpapix => {
      var path = new wpapix.Path({ path: '/members' });
      console.log( 'path object', path );
      path.fetch().done(( rpost ) => {
        console.log( 'got members page', rpost );
        this.storedPost = rpost;
        document.title = he.decode( rpost.title.rendered + ' | '
                                    + this.sstate.site.title );
        window.setTimeout(() => {
          this.promos = rpost.promo_reel || [];
        }, 3000 );
      });
    });
    this.$nextTick(() => {
      window.setTimeout(() => {
        this.scrollheader = ScrollHeader;
        ScrollHeader.init( '#masthead', "#featured,#app>.page>.featured-outer" );
      }, 500 );
    });
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
      return this.postData.title && this.postData.title.rendered || '';
    },
    img() {
      return this.postData.background_image || '';
    },
    promo_reel() {
      return this.postData.promo_reel || [];
    },
    content() {
      const user = this.sstate.user;
      if ( this.postData.member_content
           && ( user.as ? user.as.subscriber : user.membership ))
        return this.postData.member_content;
      return this.postData.content && this.postData.content.rendered || '';
    },
    user() {
      return this.sstate.user;
    },
    classes() {
      return { small: !this.promos.length };
    }
  }
};
