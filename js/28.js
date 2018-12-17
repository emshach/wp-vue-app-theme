(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[28],{

/***/ "./js/components/single/index.js":
/*!***************************************!*\
  !*** ./js/components/single/index.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/store */ "./js/lib/store.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['post', 'path'],
  render: function render(h) {
    if (!this.post) this.post = _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state.nextpost;
    if (!this.post) return h('page-not-found', {
      props: {
        path: this.path
      }
    });
    if (this.post.type == 'program') return h('program', {
      props: {
        post: this.post,
        path: this.path
      }
    });
    if (this.post.type == 'post') return h('post', {
      props: {
        post: this.post,
        path: this.path
      }
    });
    return h('page', {
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