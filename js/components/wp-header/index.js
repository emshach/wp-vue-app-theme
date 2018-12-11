import store from '../../lib/store';
export default {
  template: require( './template.html' ),
  data() {
    return {
      sstate: store.state,
      title: '',
      description: '',
      logo: ''
    };
  },
  mounted() {    
    this.title = this.sstate.site.title || '';
    this.description = this.sstate.site.description || '';
    this.logo = this.sstate.site.logo || '';
  }
};
