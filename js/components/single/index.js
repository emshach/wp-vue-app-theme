import store from '../../lib/store';
import routeEvents from '../../lib/route-events';
export default {
  props: [ 'post', 'path' ],
  beforeRouteUpdate: routeEvents.toPath,
  render(h) {
    var post = this.post || store.state.nextpost;
    console.log( 'post is', post );
    if (! post )
      return h( 'page-not-found', {
        props: {
          path: this.path
        }});
    if ( post.type == 'program' )
      return h( 'program', {
        props: {
          post: post,
          path: this.path
        }
      });
    if ( post.type == 'post' )
      return h( 'post', {
        props: {
          post: post,
          path: this.path
        }
      });
    return h( 'page', {
      props: {
        post: post,
        path: this.path
      }
    });
  }
};
