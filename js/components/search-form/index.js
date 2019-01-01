export default {
  template: require( './template.html' ),
  data() {
    var searchTerm = this.$route.query.term 
        ? this.$route.query.term : ""; 
    return {
      searchTerm : searchTerm,
      open: !!searchTerm
    };
  }, 
  methods : {
    doSearch() { 
      this.$router.push(
        {   name: 'search', 
            query: {    
              term: this.searchTerm
            }}); 
    },
    toggle() {
      this.open = !this.open;
    }
  },
  watch : {
    '$route'( to, from ) {    
      var searchTerm = to.query.term || ""; 
      this.searchTerm = searchTerm;            
    }
  }
};
