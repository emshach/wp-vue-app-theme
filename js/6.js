(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./js/components/filmstrip/index.js":
/*!******************************************!*\
  !*** ./js/components/filmstrip/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mixins_media_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../mixins/media-actions */ "./js/mixins/media-actions.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/filmstrip/template.html"),
  mixins: [_mixins_media_actions__WEBPACK_IMPORTED_MODULE_0__["default"]],
  props: {
    title: {
      type: String,
      default: ""
    },
    contents: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    current: {
      type: Number,
      default: 0
    },
    query: {
      type: String,
      default: ""
    },
    more: {
      type: Boolean,
      default: false
    }
  }
}); // TODO: add more

/***/ }),

/***/ "./js/components/filmstrip/template.html":
/*!***********************************************!*\
  !*** ./js/components/filmstrip/template.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"filmstrip\">\n  <h3 class=\"title\" v-if=\"title\">{{ title }}</h3>\n  <div class=\"content\" v-if=\"contents.length > 0\">\n    <carousel :per-page=\"1\"\n              :per-page-custom=\"[[350,2],[700,3],[950,4],[1200,5],[1450,6],\n                                [2700,7],[1950,8],[2200,9],[2450,11],[2700,12]]\"\n              :navigation-enabled=\"true\"\n              :pagination-enabled=\"false\"\n              :scroll-per-page=\"false\">\n      <slide v-for=\"( item, index ) in contents\" :key=\"index\">\n        <b-card :title=\"item.title ? item.title.rendered: ''\"\n                :img-src=\"item.thumbnail\"\n                :class=\"[ 'item', { current: item.id == current },\n                          cardClasses( item )]\"\n                img-top >\n          <p class=\"card-text\"\n             v-html=\"item.content ? item.content.rendered\n                     : item.caption ? item.caption.rendered : ''\"></p>\n          <b-btn v-if=\"item.id == current\" variant=\"link\"\n                 size=\"lg\" class=\"float-right watching\"\n                 v-scroll-to=\"{ el: '#featured', container: '.page',\n                                x: false, y: true }\">now {{\n            sayAction( item )}}ing</b-btn>\n          <watch-button v-else :target=\"item\"></watch-button>\n        </b-card>\n      </slide>\n      <div class=\"swiper-button-prev\" slot=\"button-prev\"></div>\n      <div class=\"swiper-button-next\" slot=\"button-next\"></div>\n      <div class=\"swiper-scrollbar\"   slot=\"scrollbar\"></div>\n    </carousel>\n  </div>\n  <template v-else>\n    <div class=\"message empty-list\">nothing to show yet</div>\n    <a v-if=\"query\" class=\"loadmore\" href=\"#\"\n       @click.prevent=\"loadMore\">refresh</a>\n  </template>\n</section>\n";

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
      return episode.release_type == 'video' ? 'watch' : episode.release_type == 'audio' ? trans ? 'listen to' : 'listen' : 'view';
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
//# sourceMappingURL=6.js.map