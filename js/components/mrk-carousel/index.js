var carousels = 0;
export default {
  template: require( './template.html' ),
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
    onSlideStart ( slide ) {
      this.sliding = true;
    },
    onSlideEnd ( slide ) {
      this.sliding = false;
    },
    getSlides() {
      if (! this.slides.length && this.topic ) {
        // TODO: search using topic, get posts
      }
    },
    sayAction( episode ) {
      return ( episode.mime_type.indexOf( 'video' ) == 0 ? 'watch'
               : episode.mime_type.indexOf( 'audio' ) == 0 ? 'listen'
               : 'see' );
    }
  }
};
