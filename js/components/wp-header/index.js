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
    this.title = this.sstate.site.title || '';
    this.slogan = this.sstate.site.description || '';
    this.logo = this.sstate.site.logo || '';
  }
};
