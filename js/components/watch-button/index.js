import media_actions from '../../mixins/media-actions';
export default {
  template: require( './template.html' ),
  mixins: [ media_actions ],
  props: [ 'target']
};
