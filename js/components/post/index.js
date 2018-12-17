export default {
  template: require( './template.html' ),
  props: {
    id: {
      type: Number,
      default: 0
    },
    path: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      img: '',
      show: false,
      promos: [],
      content:'',
      classes:{ small: false }
    };
  },
  mounted() {
    wp.api.loadPromise.done(() => {
      var path = new wp.api.models.Path({ path: this.id || this.path });
      path.fetch().done( rpost => {
        console.log( 'got post page', rpost );
        this.title = rpost.title.rendered;
        this.img = rpost.background_image || '';
        this.promos = rpost.promo_reel || [];
        this.content = rpost.content.rendered;
        if (! this.promos.length )
          this.classes.small = true;
      });
    });
  },
  methods: {
    showImg() {
      this.show = true;
    }
  }
};
