import media_actions from '../../mixins/media-actions';
var carousels = 0;
export default {
  template: require( './template.html' ),
  mixins: [ media_actions ],
  props: {
    topic: {
      type: String,
      default: ""
    },
    slides: {
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      default: () => "carousel-" + ++carousels
    },
    background: {
      type: String,
      default: "transparent"
    },
    interval: {
      type: Number,
      default: 15000
    }
  },
  data() {
    return {
      loading: true,
      autoplayTimeout: 15000,
      goto: 0,
      slide: 0,
      sliding: null,
      players: {},
      played: {},
      ready: {},
      waiting: {},
      playing: {},
      currentPlaying: false
      // options: {
      //   pagination: {
      //     direction: 'horizontal',
      //     el: '.swiper-pagination',
      //     speed: 15000,
      //     loop: true
      //   }
      // }
    };
  },
  mounted() {
    this.getSlides();
    console.log( this.$refs );
    if ( this.slides.length > 1 ) {
      window.setInterval(() => {
        if ( !this.currentPlaying ) {
          this.goto = ( this.goto + 1 ) % this.slides.length;
        }
      }, this.interval );
    }
  },
  rendered() {
    this.updatePlayers();
  },
  updated() {
    this.updatePlayers();
  },
  methods: {
    getSlides() {
      if (! this.slides.length && this.topic ) {
        // TODO: search using topic, get posts
      }
    },
    updatePlayers() {
      var players = {};
      for ( var p in this.$refs ) {
        if ( p.indexOf( 'player' ) != 0 )
          continue;
        var player = this.$refs[p][0];
        var index = p.substr(6);
        players[ player.id_ ] = index;
      }
      for ( p in this.players ) {
        if (!( p in players )) { // then it got drawn-over
          delete this.waiting[p];
          delete this.ready[p];
          delete this.playing[p];
          delete this.played[p];
          if ( this.currentPlaying == p )
            this.currentPlaying = false;
        }
      }
      this.players = players;
    },
    // events
    pageChanged( page ) {
      console.log( 'pageChanged', page );
      this.sliding = true;
      var slide = this.slide;
      var oldPlayer = this.$refs[ 'player' + slide ];
      var newPlayer = this.$refs[ 'player' + page ];
      if ( oldPlayer ) oldPlayer = oldPlayer[0];
      if ( newPlayer ) newPlayer = newPlayer[0];
      console.log( 'oldPlayer', slide, oldPlayer, oldPlayer.player.id_ );
      console.log( 'newPlayer', page, newPlayer, newPlayer.player.id_ );
      this.slide = page;
      if ( this.playing[ oldPlayer.player.id_ ]) {
        oldPlayer.player.pause();
        this.playing[ oldPlayer.player.id_ ] = false;
        this.currentPlaying = false;
      }
    },
    transitionEnded() {
      console.log( 'transitionEnded' );
      this.sliding = false;
      window.setTimeout(() => {
        var player = this.$refs[ 'player' + this.slide ];
        if ( !player || !player[0] ) return;    // only play present players
        player = player[0].player;
        console.log( 'player', this.slide, player, player.id_ );
        if ( this.ready[ player.id_ ]) {
          if ( !this.played[ player.id_ ])
            player.play();
        } else {
          this.waiting[ player.id_ ] = true;
        }
      }, 500 );
    },
    // event handlers
    playerPlayed( player ) {
      console.log( 'playerPlayed', player, player.id_ );
      this.played[ player.id_ ] = true;
      this.playing[ player.id_ ] = true;
      this.currentPlaying = player;
    },
    playerPaused( player ) {
      console.log( 'playerPaused', player, player.id_ );
      this.playing[ player.id_ ] = false;
    },
    playerEnded( player ) {
      console.log( 'playerEnded', player, player.id_ );
      this.playing[ player.id_ ] = false;
      this.currentPlaying = false;
    },
    playerWaiting( player ) {
      // console.log( 'playerWaiting', player, player.id_ );
    },
    playerPlaying( player ) {
      // console.log( 'playerPlaying', player, player.id_ );
    },
    playerDataLoaded( player ) {
      // console.log( 'playerDataLoaded', player, player.id_ );
    },
    playerTimeupdated( player ) {
      // console.log( 'playerTimeupdated', player, player.id_ );
    },
    playerPlayEnabled( player ) {
      console.log( 'playerPlayEnabled', player, player.id_ );
      this.ready[ player.id_ ] = true;
      var slidePlayer = this.$refs[ 'player' + this.slide ];
      if ( !slidePlayer || !slidePlayer[0] || slidePlayer[0].player != player )
        return;
      if ( this.waiting[ player.id_ ] && !this.played[ player.id_ ]) {
        this.waiting[ player.id_ ] = false;
        player.play();
      }
    },
    playerPlaythroughEnabled( player ) {
      // console.log( 'playerPlaythroughEnabled', player, player.id_ );
    },
    playerStateChanged( player ) {
      // console.log( 'playerStateChanged', player, player.id_ );
    },
    playerReadied( player ) {
      // console.log( 'playerReadied', player, player.id_ );
    }
  },
  watch: {
    goto( slide ) {
      this.pageChanged( slide );
    }
  }
};
