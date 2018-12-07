export default {
  template: require( './template.html' ),
  props: [ 'topic', 'slides', 'id', 'background', 'interval' ],
  data() {
    return {
      background: '#00810',
      interval: 15000,
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
