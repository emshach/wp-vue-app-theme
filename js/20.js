(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[20],{

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
  methods: {
    doSearch: function doSearch() {
      this.$router.push({
        name: 'search',
        query: {
          term: this.searchTerm
        }
      });
    }
  },
  data: function data() {
    var searchTerm = this.$route.query.term ? this.$route.query.term : "";
    return {
      searchTerm: searchTerm
    };
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

module.exports = "<input class=\"form-control input-sm search-box\"\n       type=\"text\" name=\"search\"\n       placeholder=\"search term...\"\n       @keyup.enter=\"doSearch\"\n       v-model=\"searchTerm\"\n/>\n<!-- TODO: make into select-list -->\n";

/***/ })

}]);
//# sourceMappingURL=20.js.map