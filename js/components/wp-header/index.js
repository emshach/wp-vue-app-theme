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
    this.title = this.sstore.state.site.title || '';
    this.slogan = this.sstore.state.site.description || '';
    this.logo = this.sstore.state.site.logo || '';
  }
};
