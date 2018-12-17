export default {
  template: require( './template.html' ),
  props: {
    comments: {
      type: Array,
      default: () => []
    },
    post_id: {
      type: Number,
      default: 0
    }
  }
};
