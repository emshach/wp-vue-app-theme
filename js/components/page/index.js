import routeEvents from '../../lib/route-events';
export default {
  template: require( './template.html' ),
  props: [ 'post' ],
  beforeRouteUpdate: routeEvents.toPath
};
