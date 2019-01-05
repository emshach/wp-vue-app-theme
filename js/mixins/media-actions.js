export default {
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
    sayAction( episode, trans ) {
      return ( episode.release_type == 'video' ? 'watch'
               : episode.release_type == 'audio'
               ? ( trans ? 'listen to' : 'listen' )
               : 'see' );
    }
  }
};
