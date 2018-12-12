export default {
  template: require( './template.html' ),
  props: {
    menu: {
      type: Array,
      default: () => []
    },
    logo: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    url: {
      type: String,
      default: ""
    }
  }
};
