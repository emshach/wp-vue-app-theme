(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

/***/ "./js/components/filmstrip/index.js":
/*!******************************************!*\
  !*** ./js/components/filmstrip/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/filmstrip/template.html"),
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

module.exports = "<section class=\"filmstrip\">\n  <h3 class=\"title\" v-if=\"title\">{{ title }}</h3>\n  <div class=\"content\" v-if=\"contents.length > 0\">\n    <carousel :per-page=\"5\"\n              :navigation-enabled=\"true\"\n              :pagination-enabled=\"false\"\n              :scroll-per-page=\"false\">\n      <slide v-for=\"( item, index ) in contents\" :key=\"index\">\n        <b-card :title=\"item.title ? item.title.rendered: ''\"\n                :img-src=\"item.thumbnail\" img-top >\n          <p class=\"card-text\"\n             v-html=\"item.content ? item.content.rendered\n                     : item.caption ? item.caption.rendered : ''\"></p>\n          <watch-button :target=\"item\"></watch-button>\n        </b-card>\n      </slide>\n      <div class=\"swiper-button-prev\" slot=\"button-prev\"></div>\n      <div class=\"swiper-button-next\" slot=\"button-next\"></div>\n      <div class=\"swiper-scrollbar\"   slot=\"scrollbar\"></div>\n    </carousel>\n  </div>\n  <template v-else>\n    <div class=\"message empty-list\">nothing to show yet</div>\n    <a v-if=\"query\" class=\"loadmore\" href=\"#\"\n       @click.prevent=\"loadMore\">refresh</a>\n  </template>\n</section>\n";

/***/ })

}]);
//# sourceMappingURL=16.js.map