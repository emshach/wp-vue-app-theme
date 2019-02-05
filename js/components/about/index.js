import store from '../../lib/store';
import _wpapix from '../../lib/wpapix';
import ScrollHeader from '../../lib/scroll-header';
import he from 'he';
export default {
  template: require( './template.html' ),
  props: [ 'post', 'path' ],
  data() {
    return {
      sstate: store.state,
      loading: true,
      storedPost: {},
      show: false
    };
  },
  mounted() {
    document.title = he.decode( this.title + ' | ' + this.sstate.site.title );
    _wpapix.then( wpapix => {
      var path = new wpapix.Path({ path: 'about-us' });
      path.fetch().done(( rpost ) => {
        console.log( 'got about page', rpost );
        this.storedPost = rpost;
      });
    });
    window.setTimeout(() => {
      ScrollHeader.init( '#masthead', "#app>.page>.featured-outer" );
    }, 500 );
  },
  methods: {
    showImg() {
      this.show = true;
    },
    postTitle( post ) {
      return post.title && post.title.rendered || '';
    },
    postContent( post ) {
      const user = this.sstate.user;
      if ( post.member_content && ( user.as ? user.as.subscriber : user.membership ))
        return post.member_content;
      return post.content && post.content.rendered || '';
    }
  },
  computed: {
    postData() {
      return this.post || this.storedPost;
    },
    title() {
      return this.postData.title && this.postData.title.rendered || '';
    },
    posts() {
      return this.postData.posts || [];
    },
    img() {
      return this.postData.background_image || '';
    },
    content() {
      const user = this.sstate.user;
      if ( this.postData.member_content
           && ( user.as ? user.as.subscriber : user.membership ))
        return this.postData.member_content;
      return this.postData.content && this.postData.content.rendered || '';
    }
  },
  watch: {
    $route( to, from ) {
      // TODO: scroll to post (and maybe fetch)
    }
  }
};
