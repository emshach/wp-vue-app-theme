import 'babel-polyfill';
import 'es6-promise/auto';
import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import { FlowerSpinner } from 'epic-spinners';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import store from './lib/store';
// import wpapix from './lib/wpapi';

// styles
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'swiper/dist/css/swiper.css';

//partial components
const TheLoop     = () => import( './components/the-loop'     );
const Sidebar     = () => import( './components/sidebar'      );
const WpFooter    = () => import( './components/wp-footer'    );
const NoPost      = () => import( './components/nopost'       );
const WpHeader    = () => import( './components/wp-header'    );
const SearchForm  = () => import( './components/search-form'  );
const CommentForm = () => import( './components/comment-form' );
const Comments    = () => import( './components/comments'     );
const Carousel    = () => import( './components/carousel'     );
const ContentList = () => import( './components/content-list' );
const Filmstrip   = () => import( './components/filmstrip'    );
const CarouselNav = () => import( './components/carousel-nav' );
// const             = () => import( './components/'             );

// const components with routes
const PageNotFound   = () => import( './components/pagenotfound'    );
const Home           = () => import( './components/home'            );
const Login          = () => import( './components/login'           );
const About          = () => import( './components/about'           );
const Contact        = () => import( './components/contact'         );
const Single         = () => import( './components/single'          );
const Page           = () => import( './components/page'            );
const Archive        = () => import( './components/archive'         );
const Search         = () => import( './components/search'          );
const Program        = () => import( './components/program'         );
const Episode        = () => import( './components/episode'         );
const PreviewProgram = () => import( './components/preview-program' );
const PreviewEpisode = () => import( './components/preview-episode' );
const Members        = () => import( './components/members'         );
const Upload         = () => import( './components/upload'          );
const Shop           = () => import( './components/shop'            );


// directives
Vue.config.devtools = true;
Vue.use( Vuex );
Vue.use( VueRouter );
Vue.use( BootstrapVue );
Vue.use( VueAwesomeSwiper );

// init components
Vue.component( 'the-loop',       TheLoop       );
Vue.component( 'sidebar',        Sidebar       );
Vue.component( 'wp-footer',      WpFooter      );
Vue.component( 'nopost',         NoPost        );
Vue.component( 'wp-header',      WpHeader      );
Vue.component( 'search-form',    SearchForm    );
Vue.component( 'comment-form',   CommentForm   );
Vue.component( 'comments',       Comments      );
Vue.component( 'flower-spinner', FlowerSpinner );
Vue.component( 'carousel',       Carousel      );
Vue.component( 'content-list',   ContentList   );
Vue.component( 'filmstrip',      Filmstrip     );
Vue.component( 'carousel-nav',   CarouselNav   );
// Vue.component( '',                             );

//components with routes
const VuePageNotFound   = Vue.component( 'pagenotfound',    PageNotFound   );
const VueHome           = Vue.component( 'home',            Home           );
const VueLogin          = Vue.component( 'login',           Login          );
const VueAbout          = Vue.component( 'about',           About          );
const VueContact        = Vue.component( 'contact',         Contact        );
const VueSingle         = Vue.component( 'single',          Single         );
const VuePage           = Vue.component( 'page',            Page           );
const VueArchive        = Vue.component( 'archive',         Archive        );
const VueSearch         = Vue.component( 'search',          Search         );
const VueProgram        = Vue.component( 'program',         Program        );
const VueEpisode        = Vue.component( 'episode',         Episode        );
const VuePreviewProgram = Vue.component( 'preview-program', PreviewProgram );
const VuePreviewEpisode = Vue.component( 'preview-episode', PreviewEpisode );
const VueMembers        = Vue.component( 'members',         Members        );
const VueUpload         = Vue.component( 'upload',          Upload         );
const VueShop           = Vue.component( 'shop',            Shop           );

// Vuex store
// const store = new Vuex.Store({
//   state: {
//     count: 0
//   },
//   mutations: {
//     increment( state ) {
//       state.count++;
//     }
//   }
// });
window.store = store;

// Define some routes
const routes = [
  { path: '/',                   component: VueHome },
  { path: '/login/:to?',         component: VueLogin,   name: 'login' },
  { path: '/about/',             component: VueAbout,   name: 'about' },
  { path: '/contact/',           component: VueContact, name: 'contact' },
  { path: '/post/:slug',         component: VueSingle,  name: 'post', props: true },

  { path: '/preview/:program/',  component: VuePreviewProgram,
    name: 'program-preview',
    props: true },

  { path: '/preview/:program/:episode',
    component: VuePreviewEpisode,
    name: 'episode-preview', 
    props: true },

  { path: '/page/:slug',         component: VuePage,    name: 'page', props: true },
  { path: '/category/:category', component: VueArchive, name: 'category', props: true },
  { path: '/tag/:tag',           component: VueArchive, name: 'tag', props: true },
  { path: '/blog/',              component: VueArchive, name: 'blog' },
  { path: '/search/',            component: VueSearch,  name: 'search' },
  { path: '/shop/',              component: VueShop,    name: 'shop' },
  { path: '/members/',           component: VueMembers, name: 'members' },
  { path: '/upload/',            component: VueUpload,  name: 'upload',
    meta: { auth: true }},
  { path: '/:program/',          component: VueProgram, name: 'program', props: true,
    meta: { paid: true }},
  { path: '/:program/:episode',  component: VueEpisode, name: 'episode', props: true,
    meta: { paid: true }},
  { path: "*",                   component: VuePageNotFound }
];

// Create the router instance and pass the `routes` option
const router = new VueRouter({
  routes: routes, 
  mode: 'history'
});

// global guard, manage redirection based on authentication and payment
router.beforeEach(( to, from, next )  => {
  if ( to.matched.some( r => r.auth )) {
    // TODO: redirect to login
  } else if ( to.matched.some( r => r.paid )) {
    // TODO: redirect to preview
  }
  next();
});

// Create and mount the root instance.
const app = new Vue({
  router : router, 
  data : {
    "site" : {
      "title" : "", 
      "url" : "",
      "description" : ""
    },
    sstate: store.state,
    user: {}
  }, 
  created() {     
    this.getSiteInfo();
    this.getUserData();
    wp.api.loadPromise.done(() => {
      var settings = new wp.api.models.Settings();
      settings.fetch().done(( response ) => {
        this.title = response.title;
        this.url = response.url;
        this.description = response.description;
      });
    });
  },    
  watch : {
  }, 
  methods : {
    getSiteInfo() {
    },
    getUserData() {
    }
  }
}).$mount('#app');

// Now the app has started!

