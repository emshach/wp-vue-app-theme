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
      img: '',
      title: '',
      show: false
    };
  },
  mounted() {
    wp.api.loadPromise.done(() => {
      var path = new wp.api.models.Path();
      console.log( 'path object', path );
      path.fetch().done(( rpost ) => {
        console.log( 'got home page', rpost );
        this.title = rpost.title.rendered;
        path.getFeaturedMedia().done(( rmedia ) => {
          // console.log( 'media object', rmedia, rmedia.get( 'source_url' ));
          this.img = rmedia.get( 'source_url' );
        });
      });
    });
  },
  methods: {
    showImg() {
      this.show = true;
    }
  }
};
