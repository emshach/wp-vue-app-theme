export default {
  template: require( './template.html' ),
  props: {
    slides: {
      type: Array,
      default: () => []
    },
    latest: {
      type: Array,
      default: () => []
    },
    trending: {
      type: Array,
      default: () => []
    },
    recent: {
      type: Array,
      default: () => []
    },
    history: {
      type: Array,
      default: () => []
    },
    discovery: {
      type: Array,
      default: () => []
    },
    favs: {
      type: Array,
      default: () => []
    }
  }
};
