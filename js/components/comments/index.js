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
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (! this.comments.length && this.postId ) {
    }
  }
};
