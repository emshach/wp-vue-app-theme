export default {
  template: require( './template.html' ),
  props: {
    title: {
      type: String,
      default: "Episodes"
    },
    episodes: {
      type: Array,
      default: () => []
    },
    showEmpty: {
      type: Boolean,
      default: true
    }
  }
};
