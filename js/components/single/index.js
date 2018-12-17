export default {
  props: [ 'post', 'path' ],
  render(h) {
    if (! this.post )
      return h( 'PageNotFound', {
        props: {
          path: this.path
        }});
    if ( this.post.type == 'program' )
      return h( 'Program', {
        props: {
          post: this.post,
          path: this.path
        }
      });
    if ( this.post.type == 'post' )
      return h( 'Post', {
        props: {
          post: this.post,
          path: this.path
        }
      });
    return h( 'Page', {
      props: {
        post: this.post,
        path: this.path
      }
    });
  }
};
