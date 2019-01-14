import media_actions from '../../mixins/media-actions';
export default {
  template: require( './template.html' ),
  mixins: [ media_actions ],
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
