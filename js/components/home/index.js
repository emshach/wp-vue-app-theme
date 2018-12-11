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
    var path = wp.api.models.Path();
    path.fetch().done(( rpost ) => {
      console.log( "got home page", rpost );
      // if ( rpost.featured_media ) {
      //   media = wp.api.models.Media();
      //   this.img = rmedia.source_url;
      // }
    });
  }
};
