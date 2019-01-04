export default {
  methods: {
    sayAction( episode, trans ) {
      return ( episode.release_type == 'video' ? 'watch'
               : episode.release_type == 'audio'
               ? ( trans ? 'listen to' : 'listen' )
               : 'see' );
    }
  }
};
