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
      favs: []
    };
  },
  mounted() {
  }
};
