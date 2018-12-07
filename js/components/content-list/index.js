export default {
  template: require( './template.html' ),
  props: {
    title: {
      type: String,
      default: ""
    },
    contents: {
      type: Array,
      default: () => []
    },
    query: {
      type: String,
      default: ""
    },
    more: {
      type: Boolean,
      default: false
    }
  }
};
// TODO: add more
