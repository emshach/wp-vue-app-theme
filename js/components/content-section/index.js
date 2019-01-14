import store from '../../lib/store';
import media_actions from '../../mixins/media-actions';
import _ from 'lodash';
export default {
  template: require( './template.html' ),
  mixins: [ media_actions ],
  props: {
    title: {
      type: String,
      default: "Episodes"
    },
    episodes: {
      type: Array,
      default: () => []
    },
    showEmpty: {
      type: Boolean,
      default: true
    },
    coming: {
      type: String,
      default: ''
    },
    hideComing: {
      type: Boolean,
      default: false
    },
    labels: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      user: store.state.user
    };
  },
  computed: {
    filteredEpisodes() {
      var episodes = _.orderBy( this.episodes, [ 'release_number' ], [ 'asc' ]);
      return episodes.filter( x => this.canWatchNow(x) || x.restrictions.show );
    },
    dateComing() {
      return this.coming ? ( 'in ' + this.coming ) : 'Soon';
    }
  },
};
