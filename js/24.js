(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[24],{

/***/ "./js/components/sidebar/index.js":
/*!****************************************!*\
  !*** ./js/components/sidebar/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/sidebar/template.html"),
  props: ['blocks']
});

/***/ }),

/***/ "./js/components/sidebar/template.html":
/*!*********************************************!*\
  !*** ./js/components/sidebar/template.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-lg-4 sidebar\">\n  <sidebar-block v-for=\"block in blocks\" :block=\"block\"/>\n</div><!--end sidebar-->\n";

/***/ })

}]);
//# sourceMappingURL=24.js.map