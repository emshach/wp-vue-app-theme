import 'babel-polyfill';
import 'es6-promise/auto';
import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import { FlowerSpinner } from 'epic-spinners';
import VueCarousel from 'vue-carousel';
import VueLazyload from 'vue-lazyload-img';
import VueSweetalert2 from 'vue-sweetalert2';
import store from './lib/store';
import wpapix from './lib/wpapi';

// styles
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
// import 'swiper/dist/css/swiper.css';

//partial components
const TheLoop     = () => import( './components/the-loop'     );
const Sidebar     = () => import( './components/sidebar'      );
const WpFooter    = () => import( './components/wp-footer'    );
const NoPost      = () => import( './components/nopost'       );
const WpHeader    = () => import( './components/wp-header'    );
const SearchForm  = () => import( './components/search-form'  );
const CommentForm = () => import( './components/comment-form' );
const Comments    = () => import( './components/comments'     );
const Carousel    = () => import( './components/mrk-carousel' );
const ContentList = () => import( './components/content-list' );
const Filmstrip   = () => import( './components/filmstrip'    );
const NavMenu     = () => import( './components/nav-menu'     );
// const             = () => import( './components/'             );

// const components with routes
const PageNotFound   = () => import( './components/page-not-found'  );
const Home           = () => import( './components/home'            );
const Login          = () => import( './components/login'           );
const About          = () => import( './components/about'           );
const Contact        = () => import( './components/contact'         );
const Single         = () => import( './components/single'          );
const Page           = () => import( './components/page'            );
const Post           = () => import( './components/post'            );
const Archive        = () => import( './components/archive'         );
const Search         = () => import( './components/search'          );
const Program        = () => import( './components/program'         );
const Release        = () => import( './components/release'         );
const PreviewProgram = () => import( './components/preview-program' );
const PreviewRelease = () => import( './components/preview-release' );
const Members        = () => import( './components/members'         );
const Upload         = () => import( './components/upload'          );
const Shop           = () => import( './components/shop'            );


// directives
Vue.config.devtools = true;
Vue.use( Vuex );
Vue.use( VueRouter );
Vue.use( BootstrapVue );
Vue.use( VueCarousel );
Vue.use( VueLazyload, { fade: true });
Vue.use( VueSweetalert2 );

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
Vue.component( 'mrk-carousel',   Carousel      );
Vue.component( 'content-list',   ContentList   );
Vue.component( 'filmstrip',      Filmstrip     );
Vue.component( 'nav-menu',       NavMenu       );
// Vue.component( '',                             );

//components with routes
const VuePageNotFound   = Vue.component( 'page-not-found',  PageNotFound   );
const VueHome           = Vue.component( 'home',            Home           );
const VueLogin          = Vue.component( 'login',           Login          );
const VueAbout          = Vue.component( 'about',           About          );
const VueContact        = Vue.component( 'contact',         Contact        );
const VueSingle         = Vue.component( 'single',          Single         );
const VuePage           = Vue.component( 'page',            Page           );
const VuePost           = Vue.component( 'post',            Post           );
const VueArchive        = Vue.component( 'archive',         Archive        );
const VueSearch         = Vue.component( 'search',          Search         );
const VueProgram        = Vue.component( 'program',         Program        );
const VueRelease        = Vue.component( 'release',         Release        );
const VuePreviewProgram = Vue.component( 'preview-program', PreviewProgram );
const VuePreviewRelease = Vue.component( 'preview-release', PreviewRelease );
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

const mkApiRequest = ( object, arg ) => {
  return ( to, from, next ) => {
    console.log( 'this is', this );
    console.log( 'also', { to, from, next });
    wp.api.loadPromise.done(() => {
      var handle = new object( arg ? arg( to ): to.params );
      handle.fetch({
        success: result => {
          console.log( 'got', object, result );
          if ( object.members_only && ! store.state.user.membership ) {
            if ( object.preview ) {
              next({ path: '/preview/' + object.preview });
            } else
              next({ path: '/shop/membership', then: to.path });
          }
          store.state.nextpost = object;
          next();
        },
        error: result => {
          Vue.swal( "Sorry! We couldn't get you that page.<br/>Please try again later" );
          next( false );
        }});
      // TODO: handle specific errors
    });
  };
};

// Define some routes
const routes = [
  { path: '/',                   component: VueHome },
  { path: '/login/:then?',       component: VueLogin,   name: 'login' },
  { path: '/about/',             component: VueAbout,   name: 'about' },
  { path: '/contact/',           component: VueContact, name: 'contact' },

  { path: '/preview/:path/',     component: VuePreviewProgram,
    name: 'preview-program',
    beforeEnter: mkApiRequest( wpapix.Preview )},

  { path: '/preview/:program/:release',
    component: VuePreviewRelease,
    name: 'preview-release',
    beforeEnter: mkApiRequest( wpapix.Preview, to => {
      return { path: to.params.preview + '/' + to.params.release };
    })},

  { path: '/page/:path',         component: VuePage,    name: 'page',
    beforeEnter: mkApiRequest( wpapix.Path )},
  { path: '/post/:path',         component: VuePost,    name: 'post',
    beforeEnter: mkApiRequest( wpapix.Path )},
  { path: '/category/:category', component: VueArchive, name: 'category', props: true },
  { path: '/tag/:tag',           component: VueArchive, name: 'tag', props: true },
  { path: '/blog/',              component: VueArchive, name: 'blog' },
  { path: '/search/',            component: VueSearch,  name: 'search' },
  { path: '/shop/',              component: VueShop,    name: 'shop' },
  { path: '/members/',           component: VueMembers, name: 'members',
    meta: { auth: true }},
  { path: '/upload/',            component: VueUpload,  name: 'upload',
    meta: { auth: true }},
  { path: '/:program/:release',  component: VueRelease, name: 'release',
    beforeEnter: mkApiRequest( wpapix.Release )},
  { path: '/:path',              component: VueSingle,  name: 'single',
    beforeEnter: mkApiRequest( wpapix.Path )},
  { path: "*",                   component: VuePageNotFound }
];

// Create the router instance and pass the `routes` option
const router = new VueRouter({
  routes: routes, 
  mode: 'history'
});

// global guard, manage redirection based on authentication and payment
// fetch post first so we can decide some more specific routing
router.beforeEach(( to, from, next )  => {
  if ( to.meta.auth && ! store.state.user ) {
    next({ path: '/login' + to.path });
  } else {
    next();
  }
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
    user: {},
    menu: []
  },
  mounted() { 
    this.getSiteInfo();
    this.getUserData();
    this.getMenu();
  },    
  watch : {
  }, 
  methods : {
    getSiteInfo() {
      this.site.title = this.sstate.site.title || "My Blog";
      this.site.url = this.sstate.site.url; // TODO: or?
      this.site.description = this.sstate.site.description;
    },
    getUserData() {
    },
    getMenu() {
      this.menu = this.sstate.menus.nav || [];
    }
  }
}).$mount('#app');

// Now the app has started!

