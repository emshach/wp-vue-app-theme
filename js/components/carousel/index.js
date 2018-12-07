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
      default: () => "carusel-" + ++carousels
    },
    background: {
      type: String,
      default: "#000810"
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
      sliding: null
    };
  },
  methods: {
    onSlideStart ( slide ) {
      this.sliding = true;
    },
    onSlideEnd ( slide ) {
      this.sliding = false;
    }
  }
};
