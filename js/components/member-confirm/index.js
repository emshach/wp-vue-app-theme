import _wpapix from '../../lib/wpapix';
export default {
  template: require( './template.html' ),
  data() {
    return {
      membership: false,
      img: "",
      show: false
    };
  }, 
  mounted() {
    window.close();
    _wpapix.then( wpapix => {
      var membership = new wpapix.Membership({ path: 'my-level' });
      membership.fetch().done( res => {
        this.sstate.user.membership = res;
        this.membership = res;
      });
    });
  },
  methods: {
    showImg() {}
  }
};
