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
      var path = wp.api.models.Path();
      path.fetch().done(( rpost ) => {
        console.log( "got home page", rpost );
        rpost.getFeaturedMedia().done(( rmedia ) => {
          this.img = rmedia.source_url;
        });
      });
    });
  }
};
