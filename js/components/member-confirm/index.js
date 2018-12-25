import wpapix from '../../lib/wpapi';
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
    var membership = wpapix.Membership({ path: 'my-level' });
    membership.fetch().done( res => {
      this.sstate.user.membership = res;
      this.membership = res;
    });
  },
  methods: {
    showImg() {}
  }
};
