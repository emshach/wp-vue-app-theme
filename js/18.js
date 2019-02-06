(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[18],{

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

module.exports = "<section class=\"comments-wrap\">\n  <h2 class=\"comments-title\">Comments</h2>\n  <b-media v-for=\"(comment, index) in comments\" class=\"comment\"\n           :key=\"comment.id\">\n    <b-img class=\"gravatar\" :src=\"comment.author_avatar_urls[48]\" />\n    <h5 class=\"comment-author\">{{ comment.author_name }}</h5>\n    <div class=\"comment-content\" v-html=\"comment.content.rendered\"></div>\n  </b-media>\n  <div class=\"message\" v-if=\"!comments.length\">none yet</div>\n  <comment-form v-if=\"!readOnly\" :first=\"!comments.length\"></comment-form>\n</section>\n";

/***/ })

}]);
//# sourceMappingURL=18.js.map