(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

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
/* harmony import */ var _mixins_media_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/media-actions */ "./js/mixins/media-actions.js");
/* harmony import */ var he__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! he */ "./node_modules/he/he.js");
/* harmony import */ var he__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(he__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/release/template.html"),
  mixins: [_mixins_media_actions__WEBPACK_IMPORTED_MODULE_2__["default"]],
  props: ['post'],
  data: function data() {
    return {
      sstate: _lib_store__WEBPACK_IMPORTED_MODULE_1__["default"].state,
      storedPost: {
        stats: {},
        my_xp: {}
      },
      show: false,
      prev: 0,
      next: 0,
      wideMode: true
    };
  },
  beforeRouteUpdate: _lib_route_events__WEBPACK_IMPORTED_MODULE_0__["default"].toRelease,
  mounted: function mounted() {
    this.storedPost = Object.assign({}, this.sstate.nextpost);
    document.title = he__WEBPACK_IMPORTED_MODULE_3___default.a.decode(this.title + ' | ' + this.sstate.site.title);
  },
  updated: function updated() {
    document.title = he__WEBPACK_IMPORTED_MODULE_3___default.a.decode(this.title + ' | ' + this.sstate.site.title);
  },
  methods: {
    showImg: function showImg() {
      this.show = true;
    },
    likePost: function likePost() {},
    dislikePost: function dislikePost() {},
    favPost: function favPost() {}
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
      return this.postData.content ? this.postData.content.rendered : this.postData.caption ? this.postData.caption.rendered : '';
    },
    classes: function classes() {
      return {
        small: !!this.promos.length
      };
    },
    series: function series() {
      var _this = this;

      if (!this.postData.series || !this.postData.series.length) return false;

      var episodes = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.orderBy(this.postData.series, ['release_number'], ['asc']);

      var series = episodes.filter(function (x) {
        return _this.canWatchNow(x) || x.restrictions.show;
      });
      return series.length && series;
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

module.exports = "<div :class=\"['release', 'page', postData.release_type]\" :key=\"postData.id\">\n  <div id=\"bg-image-wrapper\" :class=\"classes\">\n    <transition name=\"fade-in\" appear>\n      <img id=\"bg-image\" :src=\"img\" :key=\"img\" @load=\"showImg\" v-show=\"show\"/>\n    </transition>\n  </div>\n  <wp-header></wp-header>\n  <div id=\"featured\">\n    <div class=\"featured-wrapper\">\n      <div class=\"container\">\n        <div class=\"row\">\n          <div :class=\"[ 'media-wrapper', 'col-12', wideMode ? '' : 'col-md-8']\">\n            <video v-if=\"postData.release_type == 'video'\"\n                   :src=\"postData.source_url\" class=\"media\" autoplay controls\n                   controlsList=\"nodownload\">\n              {{ postData.alt_text }}\n            </video>\n            <audio v-if=\"postData.release_type == 'audio'\"\n                   :src=\"postData.source_url\" class=\"media\" autoplay controls\n                   controlsList=\"nodownload\">\n              {{ postData.alt_text }}\n            </audio>\n          </div>\n          <transition name=\"fade-in\">\n            <div v-if=\"!wideMode\" class=\"col-12 col-md-4\" v-html=\"content\"></div>\n          </transition>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <main role=\"main\">\n    <h1 class=\"title\" v-html=\"title\"></h1>\n    <section class=\"info row\">\n      <div :class=\"[ 'views', 'd-flex',\n                   { active : postData.my_xp.seen }]\">\n        <span class=\"dashicons dashicons-visibility\"></span>\n        <span class=\"count\">{{ postData.stats.views || 0 }}</span>\n      </div>\n      <div :class=\"[ 'likes',  'd-flex',\n                   { active: postData.my_xp.like }]\"\n           @click.stop=\"likePost\">\n        <span class=\"dashicons dashicons-thumbs-up\"></span>\n        <span class=\"count\">{{ postData.stats.likes || 0 }}</span>\n      </div>\n      <div :class=\"[ 'dislikes', 'd-flex',\n                   { active: postData.my_xp.dislike }]\"\n           @click.stop=\"dislikePost\">\n        <span class=\"dashicons dashicons-thumbs-down\"></span>\n        <span class=\"count\">{{ postData.stats.dislikes || 0 }}</span>\n      </div>\n      <div :class=\"[ 'favs', 'd-flex', { active: postData.my_xp.fav }]\"\n           @click.stop=\"favPost\">\n        <span class=\"dashicons dashicons-star-filled\"></span>\n        <span class=\"count\">{{ postData.stats.favs || 0 }}</span>\n      </div>\n      <div :class=\"[ 'comments', 'd-flex',\n                             { active: postData.my_xp.comment }]\">\n        <span class=\"dashicons dashicons-admin-comments\"></span>\n        <span class=\"count\">{{ postData.stats.comments || 0 }}</span>\n      </div>\n    </section>\n    <!-- TODO: strips for related, series -->\n    <section class=\"description\" v-if=\"wideMode\" v-html=\"content\"></section>\n    <filmstrip v-if=\"series\" title=\"in this series\" :contents=\"series\"\n               :current=\"postData.id\"></filmstrip>\n    <comments></comments>\n  </main>\n  <wp-footer></wp-footer>\n</div>\n";

/***/ }),

/***/ "./js/mixins/media-actions.js":
/*!************************************!*\
  !*** ./js/mixins/media-actions.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/store */ "./js/lib/store.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  methods: {
    canWatchNow: function canWatchNow(episode) {
      var user = _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state.user;

      if (user.as) {
        var as = user.as;
        var rst = episode.restrictions;
        if (as.admin || rst.public) return true;
        if (as.subscriber && rst.members) return true;
        if (as.logged_in && rst.auth) return true;
        return false;
      }

      return !episode.redirect;
    },
    sayAction: function sayAction(episode, trans) {
      return episode.release_type == 'video' ? 'watch' : episode.release_type == 'audio' ? trans ? 'listen to' : 'listen' : 'see';
    },
    cardClasses: function cardClasses(episode) {
      if (!episode || !episode.restrictions) return {};
      return {
        private: episode.restrictions.private,
        public: episode.restrictions.public,
        auth: episode.restrictions.auth,
        payperview: episode.restrictions.payperview,
        members: episode.restrictions.members,
        hidden: !episode.restrictions.show && !episode.restrictions.public
      };
    },
    needsSubscription: function needsSubscription(episode) {
      var user = _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state.user;
      return episode.restrictions.members && (!user.as || !user.as.subscriber);
    }
  }
});

/***/ })

}]);
//# sourceMappingURL=7.js.map