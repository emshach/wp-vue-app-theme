(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./js/components/archive/index.js":
/*!****************************************!*\
  !*** ./js/components/archive/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/archive/template.html"),
  props: ['post', 'pagers']
});

/***/ }),

/***/ "./js/components/archive/template.html":
/*!*********************************************!*\
  !*** ./js/components/archive/template.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n  <wp-header></wp-header>\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-lg-8\">\n        <h1 class=\"main-title\">{{ $route.name }}</h1>\n        <the-loop :posts=\"posts\" :pagers=\"pagers\"></the-loop>\n      </div>\n      <sidebar></sidebar>\n    </div>\n\n  </div><!--end container-->\n  <wp-footer></wp-footer>\n</div>\n";

/***/ })

}]);
//# sourceMappingURL=6.js.map