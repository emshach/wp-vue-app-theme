(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

/***/ "./js/components/member-confirm/index.js":
/*!***********************************************!*\
  !*** ./js/components/member-confirm/index.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_wpapix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/wpapix */ "./js/lib/wpapix.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/member-confirm/template.html"),
  data: function data() {
    return {
      membership: false,
      img: "",
      show: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    window.close();

    _lib_wpapix__WEBPACK_IMPORTED_MODULE_0__["default"].then(function (wpapix) {
      var membership = new wpapix.Membership({
        path: 'my-level'
      });
      membership.fetch().done(function (res) {
        _this.sstate.user.membership = res;
        _this.membership = res;
      });
    });
  },
  methods: {
    showImg: function showImg() {}
  }
});

/***/ }),

/***/ "./js/components/member-confirm/template.html":
/*!****************************************************!*\
  !*** ./js/components/member-confirm/template.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"members page\" key=\"members\">\n  <div id=\"bg-image-wrapper\">\n    <transition name=\"fade-in\" appear>\n      <img id=\"bg-image\" :src=\"img\" :key=\"img\" @load=\"showImg\" v-show=\"show\"/>\n    </transition>\n  </div>\n  <wp-header></wp-header>\n  <div class=\"featured-wrapper\"></div>\n  <wp-footer></wp-footer>\n</div>\n";

/***/ })

}]);
//# sourceMappingURL=15.js.map