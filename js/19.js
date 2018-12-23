(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[19],{

/***/ "./js/components/program/index.js":
/*!****************************************!*\
  !*** ./js/components/program/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/store */ "./js/lib/store.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/program/template.html"),
  props: ['post'],
  data: function data() {
    return {
      sstate: _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state,
      storedPost: {},
      show: false
    };
  },
  mounted: function mounted() {
    this.storedPost = Object.assign({}, this.sstate.nextpost);
  },
  methods: {
    showImg: function showImg() {
      this.show = true;
    }
  },
  computed: {
    postData: function postData() {
      return this.post || this.storedPost;
    },
    title: function title() {
      return this.postData.title && this.postData.title.rendered || '';
    },
    img: function img() {
      return this.postData.background_image || '';
    },
    promos: function promos() {
      return [{
        id: this.postData.id,
        excerpt: {
          rendered: this.content
        }
      }].concat(this.postData.promo_reel || []);
    },
    episodes: function episodes() {
      return this.postData.releases || [];
    },
    content: function content() {
      return this.postData.content && this.postData.content.rendered || '';
    },
    classes: function classes() {
      return {
        small: !!this.promos.length
      };
    }
  }
});

/***/ }),

/***/ "./js/components/program/template.html":
/*!*********************************************!*\
  !*** ./js/components/program/template.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"program post page\" :key=\"postData.id\">\n  <div id=\"bg-image-wrapper\" :class=\"classes\">\n    <transition name=\"fade-in\" appear>\n      <img id=\"bg-image\" :src=\"img\" :key=\"img\" @load=\"showImg\" v-show=\"show\"/>\n    </transition>\n  </div>\n  <wp-header></wp-header>\n  <down-arrow></down-arrow>\n  <div class=\"featured-wrapper\">\n    <transition name=\"fade-in\">\n      <mrk-carousel v-if=\"promos.length\" id=\"featured\"\n                    :slides=\"promos\"></mrk-carousel>\n    </transition>\n  </div>\n\n  <main role=\"main\">\n    <h1 class=\"title\">{{ title }}</h1>\n    <section class=\"episodes\">\n      <h2 class=\"title\">Programmes</h2>\n      <b-card v-for=\"( episode, index ) in episodes\" :key=\"episode.id\">\n        <router-link :to=\"episode.redirect || episode.path\">\n          <b-media no-body>\n            <b-media-aside>\n              <b-img :src=\"episode.thumbnail\" width=\"128\" height=\"96\" />\n              <div class=\"info length\">{{\n                episode.media_details.length_formatted\n                }}</div>\n            </b-media-aside>\n            <b-media-body>\n              <h5 class=\"mt-0\">{{ episode.title.rendered }}</h5>\n              <div class=\"info row\">\n                <div :class=\"[ 'views', 'd-flex',\n                             { active : episode.my_xp.seen }]\">\n                  <span class=\"dashicons dashicons-visibility\"></span>\n                  <span class=\"count\">{{ episode.stats.views || 0 }}</span>\n                </div>\n                <div :class=\"[ 'likes',  'd-flex',\n                             { active: episode.my_xp.like }]\">\n                  <span class=\"dashicons dashicons-thumbs-up\"></span>\n                  <span class=\"count\">{{ episode.stats.likes || 0 }}</span>\n                </div>\n                <div :class=\"[ 'dislikes', 'd-flex',\n                             { active: episode.my_xp.dislike }]\">\n                  <span class=\"dashicons dashicons-thumbs-down\"></span>\n                  <span class=\"count\">{{ episode.stats.dislikes || 0 }}</span>\n                </div>\n                <div :class=\"[ 'favs', 'd-flex', { active: episode.my_xp.fav }]\">\n                  <span class=\"dashicons dashicons-star-filled\"></span>\n                  <span class=\"count\">{{ episode.stats.favs || 0 }}</span>\n                </div>\n                <div :class=\"[ 'comments', 'd-flex',\n                             { active: episode.my_xp.comment }]\">\n                  <span class=\"dashicons dashicons-admin-comments\"></span>\n                  <span class=\"count\">{{ episode.stats.comments || 0 }}</span>\n                </div>\n              </div>\n              <div v-html=\"episode.caption.rendered\"></div>\n            </b-media-body>\n          </b-media>\n        </router-link>\n      </b-card>\n      <div class=\"message\" v-if=\"!episodes.length\">Coming Soon!</div>\n    </section>\n    <comments></comments>\n  </main>\n  <wp-footer></wp-footer>\n</div>\n";

/***/ })

}]);
//# sourceMappingURL=19.js.map