(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[24],{

/***/ "./js/components/single/index.js":
/*!***************************************!*\
  !*** ./js/components/single/index.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/single/template.html"),
  props: ['post', 'comments']
});

/***/ }),

/***/ "./js/components/single/template.html":
/*!********************************************!*\
  !*** ./js/components/single/template.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n  <wp-header></wp-header>\n  <div class=\"container\">\n    <div class=\"row single\">\n      <div class=\"col-lg-8 content-area\">\n        <div v-if=\"post[0]\">\n          <h1 class=\"post-title\">{{ post[0].title.rendered }}</h1>\n          <div class=\"content\" v-html=\"post[0].content.rendered\"></div>\n          <comments :comments=\"comments\"></comments>\n          <comment-form></comment-form>\n        </div><!--end v-if-->\n        <div v-else>\n          <nopost></nopost>\n        </div>\n      </div><!--end content-area-->\n      <sidebar></sidebar>\n    </div><!--end single-->\n  </div><!--end container-->\n  <wp-footer></wp-footer>\n</div>\n";

/***/ })

}]);
//# sourceMappingURL=24.js.map