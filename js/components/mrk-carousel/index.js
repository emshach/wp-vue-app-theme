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
      slide: 0,
      sliding: null,
      players: [],
      played: {},
      ready: {},
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
      var oldPlayer = this.$refs[ 'videoPlayer' + slide ];
      var newPlayer = this.$refs[ 'videoPlayer' + page ];
      if ( oldPlayer ) oldPlayer = oldPlayer[0];
      if ( newPlayer ) newPlayer = newPlayer[0];
      console.log( 'oldPlayer', slide, oldPlayer );
      console.log( 'newPlayer', page, newPlayer );
      this.slide = page;
      if ( this.playing[ oldPlayer.player.id_ ])
        oldPlayer.player.pause();
    },
    transitionEnded() {
      console.log( 'transitionEnded' );
      var player = this.$refs[ 'videoPlayer' + this.slide ];
      if ( !player || !player[0] ) return;    // only play present players
      player = player[0];
      console.log( 'player', this.slide, player );
      if ( this.ready[ player.player.id_ ] && !this.played[ player.player.id_ ])
        player.player.play();
    },
    // event handlers
    playerPlayed( player ) {
      console.log( 'playerPlayed', player );
      this.played[ player.id_ ] = true;
    },
    playerPaused( player ) {
      console.log( 'playerPaused', player );
      this.playing[ player.id_ ] = false;
    },
    playerEnded( player ) {
      console.log( 'playerEnded', player );
      this.playing[ player.id_ ] = false;
    },
    playerWaiting( player ) {
      // console.log( 'playerWaiting', player );
    },
    playerPlaying( player ) {
      console.log( 'playerPlaying', player );
      this.playing[ player.id_ ] = true;
    },
    playerDataLoaded( player ) {
      // console.log( 'playerDataLoaded', player );
    },
    playerTimeupdated( player ) {
      // console.log( 'playerTimeupdated', player );
    },
    playerPlayEnabled( player ) {
      // console.log( 'playerPlayEnabled', player );
    },
    playerPlaythroughEnabled( player ) {
      console.log( 'playerPlaythroughEnabled', player );
    },
    playerStateChanged( player ) {
      // console.log( 'playerStateChanged', player );
    },
    playerReadied( player ) {
      console.log( 'playerReadied', player );
      this.ready[ player.id_ ] = true;
      var slidePlayer = this.$refs[ 'videoPlayer'+ this.slide ];
      if ( slidePlayer && slidePlayer[0] && slidePlayer[0].player == player
           && !this.played[ player.player.id_ ])
        player.play();
    }
  }
};
