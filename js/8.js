(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

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

module.exports = "<section>\n  <h3 class=\"title\" v-if=\"title\">{{ title }}</h3>\n  <swiper v-if=\"contents.length > 0\" :options=\"swiperOptions\">\n    <swiper-slide v-for=\"( slide, index ) in contents\" :key=\"index\">\n      <b-card>\n        <h5 class=\"mt-0 mb-1\">{{ item.title }}</h5>\n        <thumbnail :type=\"item.mediatype\" :src=\"item.src\"></thumbnail>\n        <metadata v-if=\"item.metadata\" :stats=\"item.metadata\"></metadata>\n        <p class=\"card-text\">{{ item.desc }}</p>\n      </b-card>\n    </swiper-slide>\n    <div class=\"swiper-button-prev\" slot=\"button-prev\"></div>\n    <div class=\"swiper-button-next\" slot=\"button-next\"></div>\n    <div class=\"swiper-scrollbar\"   slot=\"scrollbar\"></div>\n  </swiper>\n  <template v-else>\n    <div class=\"message empty-list\">nothing to show</div>\n    <a v-if=\"query\" class=\"loadmore\" href=\"#\"\n       @click.prevent=\"loadMore\">refresh</a>\n  </template>\n</section>\n";

/***/ })

}]);
//# sourceMappingURL=8.js.map