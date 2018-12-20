import routeEvents from '../../lib/route-events';
export default {
  template: require( './template.html' ),
  beforeRouteUpdate: routeEvents.toPreview
};
