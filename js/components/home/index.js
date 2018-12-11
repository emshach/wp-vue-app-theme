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
    wp.api.loadPromise.done(() => {
      var path = new wp.api.models.Path();
      console.log( 'path object', path );
      path.fetch().done(( rpost ) => {
        console.log( "got home page", rpost );
        path.getFeaturedMedia().done(( rmedia ) => {
          console.log( 'media object', rmedia );
          // this.img = rmedia.source_url;
        });
      });
    });
  }
};
