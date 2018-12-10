(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./js/components/home/index.js":
/*!*************************************!*\
  !*** ./js/components/home/index.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/store */ "./js/lib/store.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/home/template.html"),
  data: function data() {
    return {
      sstate: _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state,
      trending: [],
      recent: [],
      history: [],
      discovery: [],
      favs: []
    };
  },
  mounted: function mounted() {}
});

/***/ }),

/***/ "./js/components/home/template.html":
/*!******************************************!*\
  !*** ./js/components/home/template.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"home page\">\n  <wp-header></wp-header>\n  <div class=\"mh-100 mw-100\">\n    <div class=\"container\">\n      <carousel id=\"hero\" topic=\"featured\"></carousel>\n    </div>\n  </div>\n\n  <div class=\"container\">\n    <div class=\"row\">\n      <content-list title=\"latest\" :content=\"latest\"></content-list>\n    </div>\n    <div class=\"row\">\n      <filmstrip title=\"trending\" :content=\"trending\"></filmstrip>\n    </div>\n    <div class=\"row\">\n      <filmstrip title=\"recent activity\" :content=\"recent\"></filmstrip>\n    </div>\n    <div class=\"row\">\n      <filmstrip title=\"pull up\" :content=\"history\"></filmstrip>\n    </div>\n    <div class=\"row\">\n      <filmstrip title=\"you might like\" :content=\"discovery\"></filmstrip>\n    </div>\n    <div class=\"row\">\n      <filmstrip title=\"my faves\" :content=\"favs\"></filmstrip>\n    </div>\n  </div>\n  <wp-footer></wp-footer>\n</div>\n";

/***/ }),

/***/ "./js/lib/store.js":
/*!*************************!*\
  !*** ./js/lib/store.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  state: Object.assign({}, moonraker_local_vars)
});

/***/ })

}]);
//# sourceMappingURL=0.js.map