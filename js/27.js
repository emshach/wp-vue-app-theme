(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[27],{

/***/ "./js/components/wp-header/index.js":
/*!******************************************!*\
  !*** ./js/components/wp-header/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/store */ "./js/lib/store.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/wp-header/template.html"),
  data: function data() {
    return {
      sstate: _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state,
      title: '',
      description: '',
      logo: ''
    };
  },
  mounted: function mounted() {
    this.title = this.sstate.site.title || '';
    this.description = this.sstate.site.description || '';
    this.logo = this.sstate.site.logo || '';
  }
});

/***/ }),

/***/ "./js/components/wp-header/template.html":
/*!***********************************************!*\
  !*** ./js/components/wp-header/template.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header id=\"masthead\" class=\"header clear\">\n  <div class=\"logo\">\n    <router-link to=\"/\"><img :src=\"logo\" class=\"logo-img\"/></router-link>\n  </div>\n  <h1 class=\"site-title\"><router-link to=\"/\">{{ title }}</router-link></h1>\n  <p class=\"site-description\">{{ description }}</p>\n  <div class=\"search-wrapper float-right\">\n    <search-form></search-form>\n  </div>\n</header>\n";

/***/ })

}]);
//# sourceMappingURL=27.js.map