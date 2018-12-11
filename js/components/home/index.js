import store from '../../lib/store';
export default {
  template: require( './template.html' ),
  data () {
    return {
      sstate: store.state,
      latest: [],
      trending: [],
      recent: [],
      history: [],
      discovery: [],
      favs: [],
      img: ''
    };
  },
  mounted() {
    var self = this;
    wp.api.loadPromise.done(() => {
      var path = new wp.api.models.Path();
      console.log( 'path object', path );
      path.fetch().done(( rpost ) => {
        console.log( 'got home page', rpost );
        path.getFeaturedMedia().done(( rmedia ) => {
          console.log( 'media object', rmedia, rmedia.get( 'source_url' ));
          self.img = rmedia.get( 'source_url' );
        });
      });
    });
  }
};
