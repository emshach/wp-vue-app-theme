import store from '../../lib/store';
import wpapix from '../../lib/wpapi';
console.log( wpapix );
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
      console.log( 'path object', wp.api.models.Path );
      var path = wp.api.models.Path();
      console.log( 'path object', path );
      // path.fetch().done(( rpost ) => {
      //   console.log( "got home page", rpost );
      //   rpost.getFeaturedMedia().done(( rmedia ) => {
      //     consale.log( 'media object', rmedia );
      //     // this.img = rmedia.source_url;
      //   });
      // });
    });
  }
};
