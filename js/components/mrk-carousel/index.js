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
  },
  methods: {
    getSlides() {
      if (! this.slides.length && this.topic ) {
        // TODO: search using topic, get posts
      }
    },
    pageChanged( page ) {
      console.log( 'pageChanged', page );
    },
    transitionEnded() {
      console.log( 'transitionEnded' );
    },
    // event handlers
    playerPlayed( player ) {
      console.log( 'playerPlayed', player );
    },
    playerPaused( player ) {
      console.log( 'playerPaused', player );
    },
    playerEnded( player ) {
      console.log( 'playerEnded', player );
    },
    playerWaiting( player ) {
      console.log( 'playerWaiting', player );
    },
    playerPlaying( player ) {
      console.log( 'playerPlaying', player );
    },
    playerDataLoaded( player ) {
      console.log( 'playerDataLoaded', player );
    },
    playerTimeupdated( player ) {},
    playerPlayEnabled( player ) {
      console.log( 'playerPlayEnabled', player );
    },
    playerPlaythroughEnabled( player ) {
      console.log( 'playerPlaythroughEnabled', player );
    },
    playerStateChanged( player ) {
      console.log( 'playerStateChanged', player );
    },
    playerReadied( player ) {
      console.log( 'playerReadied', player );
    }
  }
};
