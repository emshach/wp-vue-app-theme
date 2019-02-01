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
      autoplay: true,
      slide: 0,
      sliding: null,
      players: [],
      played: {},
      ready: {},
      waiting: {},
      playing: {},
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
  },
  methods: {
    getSlides() {
      if (! this.slides.length && this.topic ) {
        // TODO: search using topic, get posts
      }
    },
    pageChanged( page ) {
      console.log( 'pageChanged', page );
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
      }
    },
    transitionEnded() {
      console.log( 'transitionEnded' );
      var player = this.$refs[ 'player' + this.slide ];
      if ( !player || !player[0] ) return;    // only play present players
      player = player[0];
      console.log( 'player', this.slide, player, player.id_ );
      if ( this.ready[ player.player.id_ ] ) {
        if ( !this.played[ player.player.id_ ]) 
          player.player.play();
      } else {
        this.waiting[ player.player.id_ ] = true;
      }
    },
    // event handlers
    playerPlayed( player ) {
      console.log( 'playerPlayed', player, player.id_ );
      this.played[ player.id_ ] = true;
      this.playing[ player.id_ ] = true;
      this.autoplay = false;
    },
    playerPaused( player ) {
      console.log( 'playerPaused', player, player.id_ );
      this.playing[ player.id_ ] = false;
      this.autoplay = true;
    },
    playerEnded( player ) {
      console.log( 'playerEnded', player, player.id_ );
      this.playing[ player.id_ ] = false;
      this.autoplay = true;
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
      var slidePlayer = this.$refs[ 'player'+ this.slide ];
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
  computed: {
    currentPlaying() {
      var player = this.$refs[ 'player' + this.slide ];
      if ( player && player[0] && player[0].player )
        return this.playing[ player[0].player.id_ ];
      return false;
    }
  }
};
