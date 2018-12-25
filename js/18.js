(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[18],{

/***/ "./js/components/preview-program/index.js":
/*!************************************************!*\
  !*** ./js/components/preview-program/index.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_route_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/route-events */ "./js/lib/route-events.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/preview-program/template.html"),
  beforeRouteUpdate: _lib_route_events__WEBPACK_IMPORTED_MODULE_0__["default"].toPreview
});

/***/ }),

/***/ "./js/components/preview-program/template.html":
/*!*****************************************************!*\
  !*** ./js/components/preview-program/template.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"preview program post page\">\n  <div id=\"bg-image-wrapper\" :class=\"classes\">\n    <transition name=\"fade-in\">\n      <img id=\"bg-image\" :src=\"img\" @load=\"showImg\" v-show=\"show\"/>\n    </transition>\n  </div>\n  <wp-header></wp-header>\n  <div class=\"featured-wrapper\">\n    <transition name=\"fade\">\n      <mrk-carousel v-if=\"promos.length\" id=\"featured\"\n                    :slides=\"promos\"></mrk-carousel>\n    </transition>\n  </div>\n\n  <main role=\"main\">\n    <h1 class=\"title\">{{ title }}</h1>\n    <section class=\"content description\" v-html=\"content\"></section>\n    <membership-order-menu></membership-order-menu>\n    <comments read-only></comments>\n  </main>\n  <wp-footer></wp-footer>\n</div>\n";

/***/ })

}]);
//# sourceMappingURL=18.js.map