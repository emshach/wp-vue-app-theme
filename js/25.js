(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[25],{

/***/ "./js/components/search-form/index.js":
/*!********************************************!*\
  !*** ./js/components/search-form/index.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/search-form/template.html"),
  data: function data() {
    var searchTerm = this.$route.query.term ? this.$route.query.term : "";
    return {
      searchTerm: searchTerm,
      open: !!searchTerm
    };
  },
  methods: {
    doSearch: function doSearch() {
      this.$router.push({
        name: 'search',
        query: {
          term: this.searchTerm
        }
      });
    },
    toggle: function toggle() {
      this.open = !this.open;
    }
  },
  watch: {
    '$route': function $route(to, from) {
      var searchTerm = to.query.term || "";
      this.searchTerm = searchTerm;
    }
  }
});

/***/ }),

/***/ "./js/components/search-form/template.html":
/*!*************************************************!*\
  !*** ./js/components/search-form/template.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div :class=\"[ 'search-form', 'search-wrapper', { open: open }]\">\n  <a class=\"icon\" href=\"#\" @click.stop=\"toggle\">\n    <span class=\"dashicons dashicons-search\"></span>\n  </a>\n  <input class=\"form-control input-sm search-box\"\n         type=\"text\" name=\"search\"\n         placeholder=\"search term...\"\n         @keyup.enter=\"doSearch\"\n         v-model=\"searchTerm\" />\n</div>\n<!-- TODO: make into select-list -->\n";

/***/ })

}]);
//# sourceMappingURL=25.js.map