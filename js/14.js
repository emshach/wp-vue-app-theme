(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ "./js/components/page/index.js":
/*!*************************************!*\
  !*** ./js/components/page/index.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/page/template.html"),
  props: ['post']
});

/***/ }),

/***/ "./js/components/page/template.html":
/*!******************************************!*\
  !*** ./js/components/page/template.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n  <wp-header></wp-header>\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-lg-12\">\n        <div v-if=\"post[0]\">\n          <h1>{{ post[0].title.rendered }}</h1>\n          <div class=\"content\" v-html=\"post[0].content.rendered\"></div>\n        </div>\n        <div v-else>\n          <nopost></nopost>\n        </div>\n      </div><!--end col-lg-12-->\n    </div><!--end row-->\n  </div><!--end container-->\n  <wp-footer></wp-footer>\n</div>\n";

/***/ })

}]);
//# sourceMappingURL=14.js.map