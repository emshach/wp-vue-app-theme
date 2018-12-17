import store from '../../lib/store';
export default {
  props: [ 'post', 'path' ],
  render(h) {
    if (! this.post )
      this.post = store.state.nextpost;
    if (! this.post )
      return h( 'page-not-found', {
        props: {
          path: this.path
        }});
    if ( this.post.type == 'program' )
      return h( 'program', {
        props: {
          post: this.post,
          path: this.path
        }
      });
    if ( this.post.type == 'post' )
      return h( 'post', {
        props: {
          post: this.post,
          path: this.path
        }
      });
    return h( 'page', {
      props: {
        post: this.post,
        path: this.path
      }
    });
  }
};
