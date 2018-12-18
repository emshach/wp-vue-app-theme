export default {
  template: require( './template.html' ),
  props: {
    comments: {
      type: Array,
      default: () => []
    },
    postId: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    if (! this.comments.length && this.postId ) {
      
    }
  }
};
