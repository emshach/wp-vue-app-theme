import axios from 'axios';
import Vue from 'vue';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'babel-polyfill';

//partial components
import TheLoop     from './components/the-loop';
import Sidebar     from './components/sidebar';
import WpFooter    from './components/wp-footer';
import NoPost      from './components/nopost';
import WpHeader    from './components/wp-header';
import SearchForm  from './components/search-form';
import CommentForm from './components/comment-form';
import Comments    from './components/comments';

// import components with routes
import PageNotFound from './components/pagenotfound';
import Home         from './components/home/';
import Single       from './components/single';
import Page         from './components/page';
import Archive      from './components/archive';
import Search       from './components/search';


Vue.config.devtools = true;
Vue.use( BootstrapVue );
// init components

Vue.component( 'the-loop',     TheLoop     );
Vue.component( 'sidebar',      Sidebar     );
Vue.component( 'wp-footer',    WpFooter    );
Vue.component( 'nopost',       NoPost      );
Vue.component( 'wp-header',    WpHeader    );
Vue.component( 'search-form',  SearchForm  );
Vue.component( 'comment-form', CommentForm );
Vue.component( 'comments',     Comments    );

//components with routes

const VuePageNotFound = Vue.component( 'pagenotfound', PageNotFound );
const VueHome         = Vue.component( 'home',         Home         );
const VueSingle       = Vue.component( 'single',       Single       );
const VuePage         = Vue.component( 'page',         Page         );
const VueArchive      = Vue.component( 'archive',      Archive      );
const VueSearch       = Vue.component( 'search',       Search       );

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/',                   component: VueHome },  
  { path: '/post/:slug',         component: VueSingle,  name: 'post' },
  { path: '/preview/:id',        component: VueSingle,  name: 'preview' },
  { path: '/page/:slug',         component: VuePage,    name: 'page' },
  { path: '/category/:category', component: VueArchive, name: 'category' },  
  { path: '/tag/:tag',           component: VueArchive, name: 'tag' }, 
  { path: '/blog/',              component: VueArchive, name: 'blog' }, 
  { path: '/search/',            component: VueSearch,  name: 'search' }, 
  { path: "*",                   component: VuePageNotFound }
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes : routes, 
  mode: 'history'
});

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
  router : router, 
  data : {
    "bloginfo" : {
      "name" : "", 
      "url" : "",
      "description" : ""
    },
    "posts" : [], 
    "comments" : [],
    "post" : {}, 
    "pagers" : []  
  }, 
  created() {     
    this.getBloginfo();   
    this.updateData();
  },    
  watch : {
    '$route' ( to, from ) {    
      this.updateData();
    }
  }, 
  methods : {
    getBloginfo() {
      var self = this;
      var urlStr = "/wp-json/";
      axios.get(urlStr)
         .then(function (response) {     
           self.bloginfo.name = response.data.name;
           self.bloginfo.description = response.data.description;
           self.bloginfo.url = response.data.url;               
         })
         .catch(function (error) {
           console.log(error);
         });
    },
    buildPager ( headers ) {
      var items = headers['x-wp-total'];
      var pages = headers['x-wp-totalpages'];
      var pagers = [];           
      for(var i=0;i<pages;i++){
        pagers.push((i+1));
      }
      return pagers;    
    },

    updateData() {     
      if(this.$route.name == "post" 
         || this.$route.name == "page" 
         || this.$route.name == "preview"){   
        this.posts = [];    
        this.pagers = [];          
        this.fetchSinglePost();             
      }else{
        this.fetchPosts();
      }
    },
    fetchComments() {
      var self = this;
      axios.get('/wp-json/wp/v2/comments?post='+this.post[0].id)
         .then(function (response) {
           self.comments = response.data; 
         })
         .catch(function (error) {
           console.log(error);
         });
    },
    fetchSinglePost() {
      var self = this;      
      var ajax = {};
      var type = self.$route.name;

      switch(type){
      case "post": 
        ajax = axios.get('/wp-json/wp/v2/posts?slug='+self.$route.params.slug);
        break;
      case "page": 
        ajax = axios.get('/wp-json/wp/v2/pages?slug='+self.$route.params.slug);
        break;
      case "preview": 
        ajax = axios.get('/wp-json/wpvue/preview?id='+self.$route.params.id);
        break;
      }

      ajax.then(function (response) {
        self.post = response.data; 
        if(type != 'page' && self.post.length > 0){
          self.fetchComments();
        }
      })
         .catch(function (error) {
           console.log(error);
         });
    }, 
    fetchPosts() {      
      var self = this;    
      var urlStr = '/wp-json/wp/v2/posts?';
      //CATEGORY FILTER
      if(!self.isEmpty(self.$route.params)){                
        if(self.$route.name == 'category'){                    
          urlStr += '&filter[category_name]='+self.$route.params.category; 
        }else if(self.$route.name == 'tag'){
          urlStr += '&filter[tag]='+self.$route.params.tag;                     
        }
      }           
      if(!self.isEmpty(self.$route.query)){
        if(self.$route.query.term){ //SEARCH
          urlStr += '&search=' + self.$route.query.term; 
        }
        if(!isNaN(self.$route.query.page)){  //PAGING    
          urlStr += '&page=' + self.$route.query.page; 
        }
      }

      //LIMIT TO 3 IN HOME - TEMP ONLY!! Find a better way to do this:          
      if(self.$route.path == '/'){
        urlStr += '&per_page=3';
      }

      axios.get(urlStr)
         .then(function (response) {          
           self.posts = response.data; 
           self.pagers = self.buildPager(response.headers);
           self.post = {};
           self.comments = []; 
         })
         .catch(function (error) {
           console.log(error);
         });
    }, 
    isEmpty ( obj ) {
      for(var key in obj) {
        if(obj.hasOwnProperty(key))
          return false;
      }
      return true;
    }
  }
}).$mount('#app');

// Now the app has started!

