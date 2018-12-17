export default {
  template: require( './template.html' ),
  props: [ 'post' ],
  data() {
    return {
      img: '',
      show: false,
      promos: [],
      episodes: [],
      content:'',
      classes:{ small: false }
    };
  },
  mounted() {
    this.title = this.post.title.rendered;
    this.img = this.post.background_image || '';
    this.promos = this.post.promo_reel || [];
    this.episodes = this.post.releases || [];
    this.content = this.post.content.rendered;
    if (! this.promos.length )
      this.classes.small = true;
  },
  methods: {
    showImg() {
      this.show = true;
    }
  }
};
