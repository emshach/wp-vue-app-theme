(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[31],{

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


/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/user-block/template.html"),
  data: function data() {
    return {
      user: _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state.user,
      recaptcha: {
        key: _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state.recaptcha_key
      },
      loginForm: {
        user: '',
        pass: '',
        link: true
      },
      tokenLogin: false
    };
  },
  methods: {
    login: function login() {},
    nolink: function nolink() {
      this.loginForm.link = false;
    },
    sendLink: function sendLink() {
      this.tokenLogin = true;
    },
    enterPass: function enterPass() {
      this.tokenLogin = false;
    }
  },
  computed: {
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

module.exports = "<b-dd id=\"user\">\n  <template slot=\"button-content\">\n    <span class=\"dashicons dashicons-admin-users\"></span>\n    {{ loggedIn ? user.display_name: 'sign in' }}\n  </template>\n  <b-dd-item v-if=\"loggedIn\" :href=\"logoutLink\">log out</b-dd-item>\n  <b-form v-else @submit=\"login\">\n    <b-form-group id=\"login-username\"\n                  label=\"username or email address\"\n                  label-for=\"username\">\n      <b-form-input id=\"username\"\n                    type=\"email\"\n                    v-model=\"loginForm.user\"\n                    required></b-form-input>\n    </b-form-group>\n    <transition name=\"fade-fast\" mode=\"out-in\">\n      <div v-if=\"tokenLogin\">\n        <b-alert show>An email will be sent with a link that will log you in\n          when you click it. This link will expire in 10 minutes.</b-alert>\n        <b-btn variant=\"link\" @click=\"enterPass\">enter password instead</b-btn>\n      </div>\n      <b-form-group v-else\n                    id=\"login-password\"\n                    label=\"password\"\n                    label-for=\"username\">\n        <b-form-input id=\"password\"\n                      type=\"password\"\n                      @click=\"nolink\"\n                      v-model=\"loginForm.pass\"\n                      required></b-form-input>\n        <b-btn variant=\"link\" @click=\"sendLink\">email login link instead</b-btn>\n      </b-form-group>\n      <b-form-group>\n        <vue-recaptcha sitekey=\"recaptcha.key\"></vue-recaptcha>\n    </transition>\n    <b-form-group class=\"login-actions\">\n      <b-btn type=\"submit\" variant=\"primary\">login</b-btn>\n      or\n      <b-btn type=\"submit\" variant=\"success\">sign-up</b-btn>\n    </b-form-group>\n  </b-form>\n</b-dd>\n";

/***/ })

}]);
//# sourceMappingURL=31.js.map