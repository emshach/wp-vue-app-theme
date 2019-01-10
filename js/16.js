(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

/***/ "./js/components/login/index.js":
/*!**************************************!*\
  !*** ./js/components/login/index.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/store */ "./js/lib/store.js");
/* harmony import */ var _lib_wpapix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/wpapix */ "./js/lib/wpapix.js");
/* harmony import */ var he__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! he */ "./node_modules/he/he.js");
/* harmony import */ var he__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(he__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/login/template.html"),
  data: function data() {
    return {
      sstate: _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state,
      img: '',
      title: '',
      show: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    document.title = he__WEBPACK_IMPORTED_MODULE_2___default.a.decode(this.sstate.site.title);

    _lib_wpapix__WEBPACK_IMPORTED_MODULE_1__["default"].then(function (wpapix) {
      var path = new wpapix.Path({
        path: 'login'
      });
      path.fetch().done(function (rpost) {
        console.log('got home page', rpost);
        _this.title = rpost.title.rendered;
        _this.img = rpost.background_image || '';
      });
    });
  },
  methods: {
    showImg: function showImg() {
      this.show = true;
    }
  }
});

/***/ }),

/***/ "./js/components/login/template.html":
/*!*******************************************!*\
  !*** ./js/components/login/template.html ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"login page\">\n  <div id=\"bg-image-wrapper\" class=\"small\">\n    <transition name=\"fade-in\">\n      <img id=\"bg-image\" :src=\"img\" @load=\"showImg\" v-show=\"show\"/>\n    </transition>\n  </div>\n  <wp-header></wp-header>\n  <down-arrow></down-arrow>\n  <div class=\"featured-outer\">\n  </div>\n\n  <main role=\"main\">\n    <h1 class=\"title\">{{ title }}</h1>\n    <login-form></login-form>\n  </main>\n  <wp-footer></wp-footer>\n</div>\n";

/***/ })

}]);
//# sourceMappingURL=16.js.map