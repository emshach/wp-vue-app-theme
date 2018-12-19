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
  props: {
    comments: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    postId: {
      type: Number,
      default: 0
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  mounted: function mounted() {
    if (!this.comments.length && this.postId) {}
  }
});

/***/ }),

/***/ "./js/components/comments/template.html":
/*!**********************************************!*\
  !*** ./js/components/comments/template.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"comments-wrap\">\n  <h2 class=\"comments-title\">Comments</h2>\n  <b-media v-for=\"(comment, index) in comments\" class=\"comment\">\n    <b-img class=\"gravatar\" :src=\"comment.author_avatar_urls[48]\" />\n    <h5 class=\"comment-author\">{{ comment.author_name }}</h5>\n    <div class=\"comment-content\" v-html=\"comment.content.rendered\"></div>\n  </b-media>\n  <comment-form v-if=\"!readOnly\"></comment-form>\n</section>\n";

/***/ })

}]);
//# sourceMappingURL=4.js.map