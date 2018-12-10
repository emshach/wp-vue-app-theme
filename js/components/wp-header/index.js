import store from '../../lib/store';
export default {
  template: require( './template.html' ),
  data() {
    return {
      sstate: store.state,
      title: '',
      slogan: '',
      logo: ''
    };
  },
  mounted() {    
    this.title = this.sstore.site.title || '';
    this.slogan = this.sstore.site.description || '';
    this.logo = this.sstore.site.logo || '';
  }
};
