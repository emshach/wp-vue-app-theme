export default {
  template: require( './template.html' ),
  methods : {
    doSearch() { 
      this.$router.push(
        {   name: 'search', 
            query: {    
              term: this.searchTerm
            }}); 
    }
  },
  data() {
    var searchTerm = this.$route.query.term 
        ? this.$route.query.term : ""; 
    return {
      searchTerm : searchTerm          
    };
  }, 
  watch : {
    '$route'( to, from ) {    
      var searchTerm = to.query.term || ""; 
      this.searchTerm = searchTerm;            
    }
  }
};
