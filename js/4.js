(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./js/components/comments/index.js":
/*!*****************************************!*\
  !*** ./js/components/comments/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/comments/template.html"),
  props: ['comments']
});

/***/ }),

/***/ "./js/components/comments/template.html":
/*!**********************************************!*\
  !*** ./js/components/comments/template.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"comments-wrap\">\n  <h2 class=\"comments-title\">Comments</h2>\n  <div v-for=\"(comment, index) in comments\" class=\"comment\">\n    <img class=\"gravatar\" :src=\"comment.author_avatar_urls[48]\" />\n    <div class=\"comment-author\">{{ comment.author_name }}</div>\n    <div class=\"comment-content\" v-html=\"comment.content.rendered\"></div>\n  </div>\n</div>\n";

/***/ })

}]);
//# sourceMappingURL=4.js.map