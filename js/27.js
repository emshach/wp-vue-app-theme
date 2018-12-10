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
      slogan: '',
      logo: ''
    };
  },
  mounted: function mounted() {
    this.title = this.sstate.site.title || '';
    this.slogan = this.sstate.site.description || '';
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

module.exports = "<header>\n  <div class=\"container-fluid main-header\">\n    <div class=\"row\">\n      <div class=\"col-lg-8\">\n        <router-link class=\"blogname\" to=\"/\">\n          <img v-if=\"logo\" :src=\"logo\" />{{ title }}\n        </router-link><br />\n        <span class=\"blogslogan\">{{ slogan }}</span>\n      </div>\n      <div class=\"col-lg-2\"></div>\n      <div class=\"col-lg-2 search-wrapper\">\n        <search-form></search-form>\n      </div>\n    </div>\n  </div>\n</header>\n";

/***/ })

}]);
//# sourceMappingURL=27.js.map