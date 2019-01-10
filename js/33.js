(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[33],{

/***/ "./js/components/user-block/index.js":
/*!*******************************************!*\
  !*** ./js/components/user-block/index.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/store */ "./js/lib/store.js");
/* harmony import */ var he__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! he */ "./node_modules/he/he.js");
/* harmony import */ var he__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(he__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! qs */ "./node_modules/qs/lib/index.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);




/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/user-block/template.html"),
  data: function data() {
    return {
      sstate: _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state,
      wait: null,
      allowHide: true
    };
  },
  methods: {
    ddHide: function ddHide(e) {
      console.log('dd hide', e);
      if (!this.allowHide) e.preventDefault();
    },
    delayClose: function delayClose(e) {
      var _this = this;

      console.log('delay close', e);
      this.allowHide = false;
      if (this.wait) window.clearTimeout(this.wait);
      this.wait = window.setTimeout(function () {
        _this.allowHide = true;
      }, 500);
    }
  },
  computed: {
    user: function user() {
      return _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state.user;
    },
    loggedIn: function loggedIn() {
      return this.user && this.user.id;
    },
    logoutLink: function logoutLink() {
      return he__WEBPACK_IMPORTED_MODULE_1___default.a.decode(this.user.logout);
    }
  }
});

/***/ }),

/***/ "./js/components/user-block/template.html":
/*!************************************************!*\
  !*** ./js/components/user-block/template.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<b-dd id=\"user\" @hide=\"ddHide\">\n  <template slot=\"button-content\">\n    <span class=\"dashicons dashicons-admin-users\"></span>\n    {{ loggedIn ? user.display_name: 'sign in' }}\n  </template>\n  <!-- <transition name=\"fast-fade\">\n    <b-dd-item v-if=\"loggedIn\" :href=\"\"></b-dd-item>\n  </transition> -->\n  <transition name=\"fast-fade\" mode=\"out-in\">\n    <b-dd-item v-if=\"loggedIn\" :href=\"logoutLink\">log out</b-dd-item>\n    <login-form v-else @change=\"delayClose\"></login-form>\n  </transition>\n</b-dd>\n";

/***/ })

}]);
//# sourceMappingURL=33.js.map