(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[20],{

/***/ "./js/components/release/index.js":
/*!****************************************!*\
  !*** ./js/components/release/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_route_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/route-events */ "./js/lib/route-events.js");
/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/store */ "./js/lib/store.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/release/template.html"),
  props: ['post'],
  data: function data() {
    return {
      sstate: _lib_store__WEBPACK_IMPORTED_MODULE_1__["default"].state,
      storedPost: {},
      show: false,
      prev: 0,
      next: 0,
      wideMode: 0
    };
  },
  beforeRouteUpdate: _lib_route_events__WEBPACK_IMPORTED_MODULE_0__["default"].toRelease,
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
      return this.postData.content ? this.postData.content.rendered : this.postData.caption ? this.postData.caption : '';
    },
    classes: function classes() {
      return {
        small: !!this.promos.length
      };
    }
  }
});

/***/ }),

/***/ "./js/components/release/template.html":
/*!*********************************************!*\
  !*** ./js/components/release/template.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"['release', 'page', postData.release_type]\" :key=\"postData.id\">\n  <div id=\"bg-image-wrapper\" :class=\"classes\">\n    <transition name=\"fade\">\n      <img id=\"bg-image\" :src=\"img\" :key=\"img\" @load=\"showImg\" v-show=\"show\"/>\n    </transition>\n  </div>\n  <wp-header></wp-header>\n  <div class=\"featured-wrapper\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"['col-12', wideMode ? '' : 'col-md-8']\">\n          <video v-if=\"postData.releaseType == 'video'\"\n                 :src=\"postData.source_url\" class=\"media\" controls>\n            {{ postData.alt_text }}\n          </video>\n          <audio v-if=\"postData.releaseType == 'audio'\"\n                 :src=\"postData.source_url\" class=\"media\" controls>\n            {{ postData.alt_text }}\n          </audio>\n        </div>\n        <transition name=\"fade-in\">\n          <div v-if=\"!wideMode\" class=\"col-12 col-md-4\" v-html=\"content\"></div>\n        </transition>\n      </div>\n    </div>\n  </div>\n\n  <main role=\"main\">\n    <h1 class=\"title\">{{ title }}</h1>\n    <section class=\"info\">\n      <div :class=\"[ 'views', 'd-flex',\n                   { active : postData.my_xp.seen }]\">\n        <span class=\"dashicons dashicons-visibility\"></span>\n        <span class=\"count\">{{ postData.stats.views || 0 }}</span>\n      </div>\n      <div :class=\"[ 'likes',  'd-flex',\n                   { active: postData.my_xp.like }]\">\n        <span class=\"dashicons dashicons-thumbs-up\"></span>\n        <span class=\"count\">{{ postData.stats.likes || 0 }}</span>\n      </div>\n      <div :class=\"[ 'dislikes', 'd-flex',\n                   { active: postData.my_xp.dislike }]\">\n        <span class=\"dashicons dashicons-thumbs-down\"></span>\n        <span class=\"count\">{{ postData.stats.dislikes || 0 }}</span>\n      </div>\n      <div :class=\"[ 'favs', 'd-flex', { active: postData.my_xp.fav }]\">\n        <span class=\"dashicons dashicons-star-filled\"></span>\n        <span class=\"count\">{{ postData.stats.favs || 0 }}</span>\n      </div>\n      <div :class=\"[ 'comments', 'd-flex',\n                             { active: postData.my_xp.comment }]\">\n        <span class=\"dashicons dashicons-admin-comments\"></span>\n        <span class=\"count\">{{ postData.stats.comments || 0 }}</span>\n      </div>\n    </section>\n    <!-- TODO: strips for related, series -->\n    <section class=\"description\" v-if\"wideMode\" v-html=\"content\"></section>\n    <comments></comments>\n  </main>\n  <wp-footer></wp-footer>\n</div>\n";

/***/ })

}]);
//# sourceMappingURL=20.js.map