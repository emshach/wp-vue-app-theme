(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./js/components/carousel-nav/index.js":
/*!*********************************************!*\
  !*** ./js/components/carousel-nav/index.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/carousel-nav/template.html"),
  props: {
    menu: {
      type: String,
      default: "nav"
    }
  }
});

/***/ }),

/***/ "./js/components/carousel-nav/template.html":
/*!**************************************************!*\
  !*** ./js/components/carousel-nav/template.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<b-carousel>\n  <b-carousel-slide v-for=\"( slide, index) in slides\"\n                    :key=\"index\"\n    ></b-carousel-slide>\n</b-carousel>\n";

/***/ })

}]);
//# sourceMappingURL=2.js.map