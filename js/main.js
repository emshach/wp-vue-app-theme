import 'babel-polyfill';
import 'es6-promise/auto';
import axios from 'axios';
import Vue from 'vue';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import { FlowerSpinner } from 'epic-spinners';
import VueCarousel from 'vue-carousel';
import VueLazyload from 'vue-lazyload-img';
import VueScrollto from 'vue-scrollto';
import VueRecaptcha from 'vue-recaptcha';
import store from './lib/store';
import wpapix from './lib/wpapix';
import routeEvents from './lib/route-events';

// styles
import 'bootstrap-vue/dist/bootstrap-vue.css';

//partial components
const TheLoop          = () => import( './components/the-loop'          );
const Sidebar          = () => import( './components/sidebar'           );
const WpFooter         = () => import( './components/wp-footer'         );
const NoPost           = () => import( './components/nopost'            );
const WpHeader         = () => import( './components/wp-header'         );
const DownArrow        = () => import( './components/down-arrow'        );
const SearchForm       = () => import( './components/search-form'       );
const CommentForm      = () => import( './components/comment-form'      );
const Comments         = () => import( './components/comments'          );
const Carousel         = () => import( './components/mrk-carousel'      );
const ContentList      = () => import( './components/content-list'      );
const ContentSection   = () => import( './components/content-section'   );
const Filmstrip        = () => import( './components/filmstrip'         );
const NavMenu          = () => import( './components/nav-menu'          );
const SubscriptionMenu = () => import( './components/subscription-menu' );
const ViewSwitcher     = () => import( './components/view-switcher'     );
const UserBlock        = () => import( './components/user-block'        );
const LoginForm        = () => import( './components/login-form'        );
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
const MemberConfirm  = () => import( './components/member-confirm'  );
const Upload         = () => import( './components/upload'          );
const Shop           = () => import( './components/shop'            );

window.Vue = Vue;

// directives
Vue.config.devtools = true;
// Vue.use( Vuex );
Vue.use( VueRouter );
Vue.use( BootstrapVue );
Vue.use( VueCarousel );
Vue.use( VueLazyload, { fade: true });
Vue.use( VueScrollto );

// init components
Vue.component( 'the-loop',          TheLoop          );
Vue.component( 'sidebar',           Sidebar          );
Vue.component( 'wp-footer',         WpFooter         );
Vue.component( 'nopost',            NoPost           );
Vue.component( 'wp-header',         WpHeader         );
Vue.component( 'down-arrow',        DownArrow        );
Vue.component( 'search-form',       SearchForm       );
Vue.component( 'comment-form',      CommentForm      );
Vue.component( 'comments',          Comments         );
Vue.component( 'flower-spinner',    FlowerSpinner    );
Vue.component( 'mrk-carousel',      Carousel         );
Vue.component( 'content-list',      ContentList      );
Vue.component( 'content-section',   ContentSection   );
Vue.component( 'filmstrip',         Filmstrip        );
Vue.component( 'nav-menu',          NavMenu          );
Vue.component( 'subscription-menu', SubscriptionMenu );
Vue.component( 'view-switcher',     ViewSwitcher     );
Vue.component( 'user-block',        UserBlock        );
Vue.component( 'login-form',        LoginForm        );
Vue.component( 'vue-recaptcha',     VueRecaptcha     );
// Vue.component( '',                             );

//components with routes
const VPageNotFound   = Vue.component( 'page-not-found',  PageNotFound   );
const VHome           = Vue.component( 'home',            Home           );
const VLogin          = Vue.component( 'login',           Login          );
const VAbout          = Vue.component( 'about',           About          );
const VContact        = Vue.component( 'contact',         Contact        );
const VSingle         = Vue.component( 'single',          Single         );
const VPage           = Vue.component( 'page',            Page           );
const VPost           = Vue.component( 'post',            Post           );
const VArchive        = Vue.component( 'archive',         Archive        );
const VSearch         = Vue.component( 'search',          Search         );
const VProgram        = Vue.component( 'program',         Program        );
const VRelease        = Vue.component( 'release',         Release        );
const VPreviewProgram = Vue.component( 'preview-program', PreviewProgram );
const VPreviewRelease = Vue.component( 'preview-release', PreviewRelease );
const VMembers        = Vue.component( 'members',         Members        );
const VMemberConfirm  = Vue.component( 'member-confirm',  MemberConfirm  );
const VUpload         = Vue.component( 'upload',          Upload         );
const VShop           = Vue.component( 'shop',            Shop           );

window.store = store;

// Define some routes
const routes = [
  { path: '/',                   component: VHome },
  { path: '/login/:then(.+)?',   component: VLogin,   name: 'login', props: true },
  { path: '/about/',             component: VAbout,   name: 'about' },
  { path: '/contact/',           component: VContact, name: 'contact' },

  { path: '/preview/:program/:release',
    component: VPreviewRelease,
    name: 'preview-release',
    beforeEnter: routeEvents.toPreviewRelease },


  { path: '/preview/:path',     component: VPreviewRelease,
    name: 'preview',
    beforeEnter: routeEvents.toPreview },

  { path: '/page/:path',         component: VPage,    name: 'page',
    beforeEnter: routeEvents.toPath },
  { path: '/post/:path',         component: VPost,    name: 'post',
    beforeEnter: routeEvents.toPath },
  { path: '/category/:category', component: VArchive, name: 'category', props: true },
  { path: '/tag/:tag',           component: VArchive, name: 'tag', props: true },
  { path: '/blog/',              component: VArchive, name: 'blog' },
  { path: '/search/',            component: VSearch,  name: 'search' },
  { path: '/shop/',              component: VShop,    name: 'shop' },
  { path: '/members/checkout',   component: VMembers, name: 'members-checkout',
    meta: { auth: true }},
  { path: '/members/confirmation', component: VMemberConfirm, name: 'members-confirm',
    meta: { auth: true }},
  { path: '/members/',           component: VMembers, name: 'members',
    meta: { auth: true }},
  { path: '/upload/',            component: VUpload,  name: 'upload',
    meta: { auth: true }},
  { path: '/:program/:release',  component: VRelease, name: 'release',
    beforeEnter: routeEvents.toRelease },
  { path: '/:path',              component: VSingle,  name: 'single',
    beforeEnter: routeEvents.toPath },
  { path: "*",                   component: VPageNotFound }
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
    next({ path: '/login' + to.path, query: to.query });
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
    this.hijackHrefs();
  },    
  created() {
    window.addEventListener( 'resize', this.handleResize );
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener( 'resize', this.handleResize );
  },
  methods : {
    handleResize() {
      this.sstate.window.width = window.innerWidth;
      this.sstate.window.height = window.innerHeight;
    },
    getSiteInfo() {
      this.site.title = this.sstate.site.title || "My Blog";
      this.site.url = this.sstate.site.url; // TODO: or?
      this.site.description = this.sstate.site.description;
    },
    getUserData() {
    },
    getMenu() {
      this.menu = this.sstate.menus.nav || [];
    },
    hijackHrefs() {
      window.addEventListener('click', event => {
        const { target } = event;
        // handle only links that do not reference external resources
        if (target && target.matches("a:not([href*='://'])") && target.href) {
          // some sanity checks taken from vue-router:
          // https://github.com/vuejs/vue-router/blob/dev/src/components/link.js#L106
          const { altKey, ctrlKey, metaKey, shiftKey, button, defaultPrevented } = event;
          // don't handle with control keys
          if (metaKey || altKey || ctrlKey || shiftKey) return;
          // don't handle when preventDefault called
          if (defaultPrevented) return;
          // don't handle right clicks
          if (button !== undefined && button !== 0) return;
          // don't handle if `target="_blank"`
          if (target && target.getAttribute) {
            const linkTarget = target.getAttribute('target');
            if (/\b_blank\b/i.test(linkTarget)) return;
          }
          // don't handle same page links/anchors
          const url = new URL(target.href);
          const to = url.pathname;
          if (window.location.pathname !== to && event.preventDefault) {
            event.preventDefault();
            this.$router.push( to + url.search + url.hash );
          }
        }
      });
    }
  }
}).$mount('#app');

// Now the app has started!

