(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[35],{

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
      allowHide: true,
      isShown: false
    };
  },
  methods: {
    shown: function shown() {
      this.isShown = true;
    },
    hiding: function hiding(e) {
      if (this.allowHide) this.isShown = false;else e.preventDefault();
    },
    delayClose: function delayClose(e) {
      var _this = this;

      this.allowHide = false;
      if (this.wait) window.clearTimeout(this.wait);
      this.wait = window.setTimeout(function () {
        _this.allowHide = true;
      }, 1000);
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
    },
    isLoginRoute: function isLoginRoute() {
      return this.$route.name == 'login';
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

module.exports = "<b-dd v-if=\"loggedIn || !isLoginRoute\" id=\"user\" @shown=\"shown\" @hide=\"hiding\">\n  <template slot=\"button-content\">\n    <span class=\"dashicons dashicons-admin-users\"></span>\n    {{ loggedIn ? user.display_name: 'sign in' }}\n  </template>\n  <!-- <transition name=\"fast-fade\">\n    <b-dd-item v-if=\"loggedIn\" :href=\"\"></b-dd-item>\n  </transition> -->\n  <transition name=\"fast-fade\" mode=\"out-in\">\n    <b-dd-item v-if=\"loggedIn\" :href=\"logoutLink\">log out</b-dd-item>\n    <login-form v-else @change=\"delayClose\"></login-form>\n  </transition>\n</b-dd>\n";

/***/ })

}]);
//# sourceMappingURL=35.js.map