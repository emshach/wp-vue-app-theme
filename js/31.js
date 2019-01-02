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

/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/user-block/template.html"),
  data: function data() {
    return {
      user: _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state.user,
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
    logout: function logout() {},
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

module.exports = "<b-dd id=\"user\">\n  <template slot=\"button-content\">\n    <span class=\"dashicons dashicons-admin-users\"></span>\n    {{ loggedIn ? user.display_name: 'sign in' }}\n  </template>\n  <b-dd-item v-if=\"loggedIn\" @click=\"logout\">log out</b-dd-item>\n  <b-form v-else>\n    <b-form-group id=\"login-username\"\n                  label=\"username or email address\"\n                  label-for=\"username\">\n      <b-form-input id=\"username\"\n                    type=\"email\"\n                    v-model=\"loginForm.user\"\n                    required></b-form-input>\n    </b-form-group>\n    <transition-group name=\"fade-fast\" mode=\"out-in\">\n      <template v-if=\"tokenLogin\">\n        <b-alert show key=\"alert\">An email will be sent with a link that will\n          log you in when you click it. This link will expire in 10\n          minutes.</b-alert>\n        <b-btn variant=\"link\" @click=\"enterPass\" key=\"passlink\">\n          enter password instead</b-btn>\n      </template>\n      <template v-else>\n        <b-form-group key=\"password\"\n                      id=\"login-password\"\n                      label=\"password\"\n                      label-for=\"username\">\n          <b-form-input id=\"password\"\n                        type=\"password\"\n                        @click=\"nolink\"\n                        v-model=\"loginForm.pass\"\n                        required></b-form-input>\n        </b-form-group>\n        <b-btn variant=\"link\" @click=\"sendLink\" key=\"tokenlink\">\n          email login link instead</b-btn>\n      </template>\n    </transition-group>\n    <b-form-group class=\"login-actions\">\n      <b-btn type=\"submit\" variant=\"primary\">login</b-btn>\n      or\n      <b-btn type=\"submit\" variant=\"success\">sign-up</b-btn>\n    </b-form-group>\n  </b-form>\n</b-dd>\n";

/***/ })

}]);
//# sourceMappingURL=31.js.map