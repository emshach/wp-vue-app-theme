(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./js/components/content-list/index.js":
/*!*********************************************!*\
  !*** ./js/components/content-list/index.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/content-list/template.html"),
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

/***/ "./js/components/content-list/template.html":
/*!**************************************************!*\
  !*** ./js/components/content-list/template.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"content-list\">\n  <h3 class=\"title\" v-if=\"title\">{{ title }}</h3>\n  <template v-if=\"contents.length > 0\">\n    <ul class=\"list-unstyled content\">\n      <b-media v-for=\"( item, index ) in contents\" tag=\"li\" :item=\"item\"\n               :key=\"index\">\n        <b-img slot=\"aside\" blank-color=\"#abc\" width=\"64\" :alt=\"item.alt\" />\n        <h5 class=\"mt-0 mb-1\">{{ item.title }}</h5>\n        {{ item.desc }}\n      </b-media>\n    </ul>\n    <a v-if=\"query && more\" class=\"loadmore\" href=\"#\"\n       @click.prevent=\"loadMore\">more</a>\n  </template>\n  <template v-else>\n    <div class=\"message empty-list\">nothing to show yet</div>\n    <a v-if=\"query\" class=\"loadmore\" href=\"#\"\n       @click.prevent=\"loadMore\">refresh</a>\n  </template>\n</section>\n";

/***/ })

}]);
//# sourceMappingURL=9.js.map