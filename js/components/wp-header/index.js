export default {
  template: require( './template.html' ),
  data() {
    return {
      pages : []
    };
  }, 
  mounted() {    
    var _this = this;    
    axios.get('/wp-json/wp/v2/pages?per_page=5')
       .then(function (response) {     
         _this.pages = response.data;
       })
       .catch(function (error) {
         console.log(error);
       });
  }
};
