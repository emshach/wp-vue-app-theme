(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[39],{

/***/ "./js/components/single/index.js":
/*!***************************************!*\
  !*** ./js/components/single/index.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/store */ "./js/lib/store.js");
/* harmony import */ var _lib_route_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/route-events */ "./js/lib/route-events.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['post', 'path'],
  beforeRouteUpdate: _lib_route_events__WEBPACK_IMPORTED_MODULE_1__["default"].toPath,
  render: function render(h) {
    var post = this.post || _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state.nextpost;
    console.log('post is', post);
    if (!post) return h('page-not-found', {
      props: {
        path: this.path
      }
    });
    if (post.type == 'program') return h('program', {
      props: {
        post: post,
        path: this.path
      }
    });
    if (post.type == 'post') return h('post', {
      props: {
        post: post,
        path: this.path
      }
    });
    return h('page', {
      props: {
        post: post,
        path: this.path
      }
    });
  }
});

/***/ })

}]);
//# sourceMappingURL=39.js.map