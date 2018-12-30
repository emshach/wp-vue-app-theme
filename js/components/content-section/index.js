import store from '../../lib/store';
export default {
  template: require( './template.html' ),
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
      return !!episode.redirect;
    },
    needsSubscription ( episode ) {
      return ( episode.restrictions.members
               && ( !this.user.as || !this.user.as.subscriber ));
    }
  }
};
