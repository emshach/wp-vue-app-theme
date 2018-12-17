(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[28],{

/***/ "./js/components/single/index.js":
/*!***************************************!*\
  !*** ./js/components/single/index.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['post', 'path'],
  render: function render(h) {
    if (!this.post) return h('PageNotFound', {
      props: {
        path: this.path
      }
    });
    if (this.post.type == 'program') return h('Program', {
      props: {
        post: this.post,
        path: this.path
      }
    });
    if (this.post.type == 'post') return h('Post', {
      props: {
        post: this.post,
        path: this.path
      }
    });
    return h('Page', {
      props: {
        post: this.post,
        path: this.path
      }
    });
  }
});

/***/ })

}]);
//# sourceMappingURL=28.js.map