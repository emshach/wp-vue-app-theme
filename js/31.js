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
      }
    };
  },
  methods: {
    login: function login() {},
    logout: function logout() {},
    nolink: function nolink() {
      this.loginForm.link = false;
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

module.exports = "<b-dd id=\"user\">\n  <template slot=\"button-content\">\n    <span class=\"dashicons dashicons-admin-users\"></span>\n    {{ loggedIn ? user.display_name: 'sign in' }}\n  </template>\n  <b-dd-item v-if=\"loggedIn\" @click=\"logout\">log out</b-dd-item>\n  <b-form v-else>\n    <b-form-group id=\"login-username\"\n                  label=\"username or email address\"\n                  label-for=\"username\">\n      <b-form-input id=\"username\"\n                    type=\"email\"\n                    v-model=\"loginForm.user\"\n                    required></b-form-input>\n    </b-form-group>\n    <b-form-group id=\"login-password\"\n                  label=\"password\"\n                  label-for=\"username\">\n      <b-form-input id=\"password\"\n                    type=\"password\"\n                    :disabled=\"loginForm.link\"\n                    @click=\"nolink\"\n                    v-model=\"loginForm.pass\"\n                    required></b-form-input>\n    </b-form-group>\n    <b-form-checkbox v-model=\"loginForm.link\">\n      or send login link</b-form-checkbox>\n    <b-form-group class=\"login-actions\">\n      <b-btn type=\"submit\" variant=\"primary\">login</b-btn>\n      or\n      <b-btn type=\"submit\" variant=\"success\">sign-up</b-btn>\n    </b-form-group>\n  </b-form>\n</b-dd>\n";

/***/ })

}]);
//# sourceMappingURL=31.js.map