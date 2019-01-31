import store from '../lib/store';
export default {
  methods: {
    canWatchNow ( episode ) {
      const user = store.state.user;
      if ( user.as ) {
        var as  = user.as;
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
    sayAction( episode, trans ) {
      return ( episode.release_type == 'video' ? 'watch'
               : episode.release_type == 'audio'
               ? ( trans ? 'listen to' : 'listen' )
               : 'view' );
    },
    cardClasses( episode ) {
      if ( !episode || !episode.restrictions )
        return {};
      return {
        private: episode.restrictions.private,
        public: episode.restrictions.public,
        auth: episode.restrictions.auth,
        payperview: episode.restrictions.payperview,
        members: episode.restrictions.members,
        hidden: !episode.restrictions.show && !episode.restrictions.public
      };
    },
    needsSubscription ( episode ) {
      const user = store.state.user;
      return ( episode.restrictions.members && ( !user.as || !user.as.subscriber ));
    },
    getSources( episode ) {
      return Object.values( episode.sources );
    },
    videoPlayerOptions( episode, defaults ) {
      var opts = Object.assign( {
        controls: true,
        autoplay: 'play',
        playsinline: true,
        aspectRatio: "16:9",
        controlBar: {
          // children: [
          //   'playToggle',
          //   'volumeMenuButton',
          //   'currentTimeDisplay',
          //   'durationDisplay',
          //   'progressControl',
          //   'remainingTimeDisplay',
          //   'playbackRateMenuButton',
          //   'subtitlesButton',
          //   'captionsButton',
          //   'fullscreenToggle'
          // ],
          volumePanel: {
            inline: true
          }
        }
      }, defaults || {});
      if ( episode.kgvid_meta && episode.kgvid_meta.poster )
        opts.poster = episode.kgvid_meta.poster;
      opts.sources = this.getSources( episode );
      return opts;
  }
  }
};
