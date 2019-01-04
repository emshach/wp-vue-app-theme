import store from '../../lib/store';
import media_actions from '../../mixins/media-actions';
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
    }
  },
  data () {
    return {
      user: store.state.user
    };
  },
  computed: {
    filteredEpisodes() {
      return this.episodes.filter( x => this.canWatchNow(x) || x.restrictions.show );
    },
    dateComing() {
      return this.coming ? ( 'in ' + this.coming ) : 'Soon';
    }
  },
  methods: {
    canWatchNow ( episode ) {
      if ( this.user.as ) {
        var as  = this.user.as;
        var rst = episode.restrictions;
        if ( as.admin || rst.public )
          return true;
        if ( as.subscriber && rst.members )
          return true;
        if ( as.logged_in && rst.auth )
          return true;
        return false;
      }
      return !episode.redirect;
    },
    needsSubscription ( episode ) {
      return ( episode.restrictions.members
               && ( !this.user.as || !this.user.as.subscriber ));
    }
  }
};
