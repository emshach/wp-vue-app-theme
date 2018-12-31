(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./js/components/content-section/index.js":
/*!************************************************!*\
  !*** ./js/components/content-section/index.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/store */ "./js/lib/store.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/content-section/template.html"),
  props: {
    title: {
      type: String,
      default: "Episodes"
    },
    episodes: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    showEmpty: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      user: _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state.user
    };
  },
  computed: {
    filteredEpisodes: function filteredEpisodes() {
      var _this = this;

      return this.episodes.filter(function (x) {
        return _this.canWatchNow(x) || x.restrictions.show;
      });
    }
  },
  methods: {
    canWatchNow: function canWatchNow(episode) {
      if (this.user.as) {
        var as = this.user.as;
        var rst = episode.restrictions;
        if (as.admin || rst.public) return true;
        if (as.subscriber && rst.members) return true;
        if (as.logged_in && rst.auth) return true;
        return false;
      }

      return !!episode.redirect;
    },
    needsSubscription: function needsSubscription(episode) {
      return episode.restrictions.members && (!this.user.as || !this.user.as.subscriber);
    }
  }
});

/***/ }),

/***/ "./js/components/content-section/template.html":
/*!*****************************************************!*\
  !*** ./js/components/content-section/template.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"episodes\">\n  <template v-if=\"filteredEpisodes.length || showEmpty\">\n    <h2 class=\"title\" v-html=\"title\"></h2>\n    <transition-group name=\"fade-fast\">\n      <b-card v-for=\"( episode, index ) in filteredEpisodes\" :key=\"episode.id\">\n        <b-media no-body>\n          <b-media-aside>\n            <b-img :src=\"episode.thumbnail\" width=\"128\" height=\"96\" />\n            <div class=\"info length\">{{\n              episode.media_details.length_formatted\n              }}</div>\n          </b-media-aside>\n          <b-media-body>\n            <h5 class=\"mt-0\" v-html=\"episode.title.rendered\"></h5>\n            <div class=\"info row\">\n              <div :class=\"[ 'views', 'd-flex',\n                           { active : episode.my_xp.seen }]\">\n                <span class=\"dashicons dashicons-visibility\"></span>\n                <span class=\"count\">{{ episode.stats.views || 0 }}</span>\n              </div>\n              <div :class=\"[ 'likes',  'd-flex',\n                           { active: episode.my_xp.like }]\">\n                <span class=\"dashicons dashicons-thumbs-up\"></span>\n                <span class=\"count\">{{ episode.stats.likes || 0 }}</span>\n              </div>\n              <div :class=\"[ 'dislikes', 'd-flex',\n                           { active: episode.my_xp.dislike }]\">\n                <span class=\"dashicons dashicons-thumbs-down\"></span>\n                <span class=\"count\">{{ episode.stats.dislikes || 0 }}</span>\n              </div>\n              <div :class=\"[ 'favs', 'd-flex', { active: episode.my_xp.fav }]\">\n                <span class=\"dashicons dashicons-star-filled\"></span>\n                <span class=\"count\">{{ episode.stats.favs || 0 }}</span>\n              </div>\n              <div :class=\"[ 'comments', 'd-flex',\n                           { active: episode.my_xp.comment }]\">\n                <span class=\"dashicons dashicons-admin-comments\"></span>\n                <span class=\"count\">{{ episode.stats.comments || 0 }}</span>\n              </div>\n              <template v-if=\"user.as\">\n                <div v-if=\"episode.restrictions.private\"\n                     class=\"d-flex admin\">private</div>\n                <div v-if=\"episode.restrictions.public\"\n                     class=\"d-flex admin\">public</div>\n                <div v-if=\"episode.restrictions.auth\"\n                     class=\"d-flex admin\">logged-in</div>\n                <div v-if=\"episode.restrictions.payperview\"\n                     class=\"d-flex admin\">payperview</div>\n                <div v-if=\"episode.restrictions.members\"\n                     class=\"d-flex admin\">subscribers</div>\n                <!-- <div v-if=\"episode.restrictions.premium\"\n                     class=\"d-flex admin\">premium</div> -->\n              </template>\n            </div>\n            <div v-html=\"episode.caption.rendered\"></div>\n            <b-btn v-if=\"canWatchNow( episode )\" :to=\"episode.path\" size=\"lg\"\n                   class=\"watch watch-now\" variant=\"primary\">watch now</b-btn>\n            <b-btn v-else-if=\"needsSubscription( episode )\" size=\"lg\"\n                   :to=\"episode.preview\n                        ||{ path: '/members', query: { then: episode.path }}\"\n                   class=\"watch subscribe-to-watch\"\n                   variant=\"warning\">subscribe to watch</b-btn>\n            <b-btn v-if=\"episode.preview\" class=\"watch watch-preview\" size=\"lg\"\n                   :to=\"episode.preview\" variant=\"link\">watch preview</b-btn>\n          </b-media-body>\n        </b-media>\n      </b-card>\n    </transition-group>\n    <div class=\"message\" v-if=\"!filteredEpisodes.length\">Coming Soon!</div>\n  </template>\n</section>\n";

/***/ })

}]);
//# sourceMappingURL=8.js.map