(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./js/components/home/index.js":
/*!*************************************!*\
  !*** ./js/components/home/index.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/home/template.html"),
  props: ['posts', 'pagers']
});

/***/ }),

/***/ "./js/components/home/template.html":
/*!******************************************!*\
  !*** ./js/components/home/template.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"home page\">\n  <wp-header></wp-header>\n  <div class=\"jumbotron\">\n    <div class=\"container\">\n      <carousel id=\"hero\" topic=\"TV\" :slides=\"slides\"></carousel>\n    </div>\n  </div>\n\n  <div class=\"container\">\n    <div class=\"row\">\n      <content-list title=\"latest\" :content=\"latest\"></content-list>\n    </div>\n    <div class=\"row\">\n      <filmstrip title=\"trending\" :content=\"trending\"></content-list>\n    </div>\n    <div class=\"row\">\n      <filmstrip title=\"recent activity\" :content=\"recent\"></content-list>\n    </div>\n    <div class=\"row\">\n      <filmstrip title=\"pull up\" :content=\"history\"></content-list>\n    </div>\n    <div class=\"row\">\n      <filmstrip title=\"you might like\" :content=\"discovery\"></content-list>\n    </div>\n    <div class=\"row\">\n      <filmstrip title=\"my faves\" :content=\"favs\"></content-list>\n    </div>\n  </div>\n  <wp-footer></wp-footer>\n</div>\n";

/***/ })

}]);
//# sourceMappingURL=6.js.map