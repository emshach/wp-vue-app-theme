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
    current: {
      type: Number,
      default: 0
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
