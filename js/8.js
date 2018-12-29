(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./js/components/content-section/index.js":
/*!************************************************!*\
  !*** ./js/components/content-section/index.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
  }
});

/***/ }),

/***/ "./js/components/content-section/template.html":
/*!*****************************************************!*\
  !*** ./js/components/content-section/template.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"episodes\">\n  <template v-if=\"episodes.length || showEmpty\">\n    <h2 class=\"title\">{{ title }}</h2>\n    <b-card v-for=\"( episode, index ) in episodes\" :key=\"episode.id\">\n      <router-link :to=\"episode.redirect || episode.path\">\n        <b-media no-body>\n          <b-media-aside>\n            <b-img :src=\"episode.thumbnail\" width=\"128\" height=\"96\" />\n            <div class=\"info length\">{{\n              episode.media_details.length_formatted\n              }}</div>\n          </b-media-aside>\n          <b-media-body>\n            <h5 class=\"mt-0\" v-html=\"episode.title.rendered\"></h5>\n            <div class=\"info row\">\n              <div :class=\"[ 'views', 'd-flex',\n                           { active : episode.my_xp.seen }]\">\n                <span class=\"dashicons dashicons-visibility\"></span>\n                <span class=\"count\">{{ episode.stats.views || 0 }}</span>\n              </div>\n              <div :class=\"[ 'likes',  'd-flex',\n                           { active: episode.my_xp.like }]\">\n                <span class=\"dashicons dashicons-thumbs-up\"></span>\n                <span class=\"count\">{{ episode.stats.likes || 0 }}</span>\n              </div>\n              <div :class=\"[ 'dislikes', 'd-flex',\n                           { active: episode.my_xp.dislike }]\">\n                <span class=\"dashicons dashicons-thumbs-down\"></span>\n                <span class=\"count\">{{ episode.stats.dislikes || 0 }}</span>\n              </div>\n              <div :class=\"[ 'favs', 'd-flex', { active: episode.my_xp.fav }]\">\n                <span class=\"dashicons dashicons-star-filled\"></span>\n                <span class=\"count\">{{ episode.stats.favs || 0 }}</span>\n              </div>\n              <div :class=\"[ 'comments', 'd-flex',\n                           { active: episode.my_xp.comment }]\">\n                <span class=\"dashicons dashicons-admin-comments\"></span>\n                <span class=\"count\">{{ episode.stats.comments || 0 }}</span>\n              </div>\n            </div>\n            <div v-html=\"episode.caption.rendered\"></div>\n          </b-media-body>\n        </b-media>\n      </router-link>\n    </b-card>\n    <div class=\"message\" v-if=\"!episodes.length\">Coming Soon!</div>\n  </template>\n</section>\n";

/***/ })

}]);
//# sourceMappingURL=8.js.map