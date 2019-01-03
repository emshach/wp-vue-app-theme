(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[26],{

/***/ "./js/components/search/index.js":
/*!***************************************!*\
  !*** ./js/components/search/index.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/search/template.html"),
  props: ['posts', 'pagers']
});

/***/ }),

/***/ "./js/components/search/template.html":
/*!********************************************!*\
  !*** ./js/components/search/template.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n  <wp-header></wp-header>\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-lg-12\">\n        <h1 class=\"main-title\">Search Results</h1>\n        <the-loop :posts=\"posts\" :pagers=\"pagers\"></the-loop>\n      </div><!--end col-lg-12-->\n    </div><!--end row-->\n  </div><!--end container-->\n  <wp-footer></wp-footer>\n</div>\n";

/***/ })

}]);
//# sourceMappingURL=26.js.map