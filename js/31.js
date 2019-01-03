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
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_3__);




/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/user-block/template.html"),
  data: function data() {
    return {
      sstate: _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state,
      action: 'login',
      userExists: false,
      recaptcha: {
        key: _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state.recaptcha_key,
        response: null
      },
      loginForm: {
        action: 'mrklogin',
        login: '',
        email: '',
        pass: '',
        remember: true,
        'g-recaptcha-response': '',
        token: false,
        sec_token: _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state.ajax.sec
      },
      confirmUser: '',
      confirmPass: '',
      tokenLogin: false,
      // urlLogin: store.state.login,
      // urlRegister: store.state.register
      ajaxUrl: _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state.ajax.url
    };
  },
  methods: {
    login: function login(e) {
      var _this = this;

      e.preventDefault();

      if (this.action != 'register' && this.loginForm.action == 'mrkregister') {
        this.action = 'register';

        if (/.+@.+\..+/.test(this.loginForm.login)) {
          this.loginForm.email = this.loginForm.login;
          this.loginForm.login = '';
        }

        return false;
      }

      if (!this.recaptcha.response) {
        // TODO: warn
        return false;
      }

      this.loginForm['g-recaptcha-response'] = this.recaptcha.response;
      this.loginForm.token = this.tokenLogin;
      axios__WEBPACK_IMPORTED_MODULE_2___default.a.post(this.ajaxUrl, this.loginForm).then(function (response) {
        console.log('login response', response);
        return;

        switch (response.next) {
          case 'wrong-password':
            _this.action = 'login';
            break;

          case 'unknown-user':
            _this.action = 'unknown-user';
            break;

          case 'unknown-email':
            _this.action = 'unknown-email';
            break;

          case 'link-sent':
            _this.waitLogin(); // TODO: close form


            break;

          case 'success':
            // success!
            sweetalert2__WEBPACK_IMPORTED_MODULE_3___default()('Successfully logged in! Welcome!');
            window.location.reload();
        }
      }).catch(function (error) {
        // sorry! try again
        // if user doesn't exist, do register instead
        // if (! /.+@.+\..+/.test( this.loginForm.log ))
        //   Swal(  "email address please" ); // .then( x => this.loginForm.log = x )
        sweetalert2__WEBPACK_IMPORTED_MODULE_3___default()("We're sorry! There was some problem. Please try again later");
      });
      return false;
    },
    waitLogin: function waitLogin() {},
    sendLink: function sendLink() {
      this.tokenLogin = true;
    },
    enterPass: function enterPass() {
      this.tokenLogin = false;
    },
    recaptchaSuccess: function recaptchaSuccess(response) {
      this.recaptcha.response = response;
    },
    recaptchaExpire: function recaptchaExpire(response) {
      this.recaptcha.response = '';
    },
    actionLogin: function actionLogin() {
      this.loginForm.action = 'mrklogin';
    },
    actionRegister: function actionRegister() {
      this.loginForm.action = 'mrkregister';
    },
    showFormRegister: function showFormRegister() {
      this.action = 'register';
    },
    showFormLogin: function showFormLogin() {
      this.action = 'login';
    },
    showFormUser: function showFormUser() {
      this.action = 'unknown-user';
    },
    showFormEmail: function showFormEmail() {
      this.action = 'unknown-email';
    },
    clearForm: function clearForm() {
      this.loginForm = {
        action: 'mrklogin',
        login: '',
        email: '',
        pass: '',
        remember: true,
        'g-recaptcha-response': '',
        token: false,
        sec_token: _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state.ajax.sec
      };
      this.action = 'login';
      this.confirmUser = '';
      this.confirmPass = '';
      this.tokenLogin = false;
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

module.exports = "<b-dd id=\"user\">\n  <template slot=\"button-content\">\n    <span class=\"dashicons dashicons-admin-users\"></span>\n    {{ loggedIn ? user.display_name: 'sign in' }}\n  </template>\n  <!-- <transition name=\"fast-fade\">\n    <b-dd-item v-if=\"loggedIn\" :href=\"\"></b-dd-item>\n  </transition> -->\n  <transition name=\"fast-fade\" mode=\"out-in\">\n    <b-dd-item v-if=\"loggedIn\" :href=\"logoutLink\">log out</b-dd-item>\n    <b-form v-else-if=\"action == 'unknown-user'\" @submit=\"login\"\n            :class=\"[ 'login', action ]\">\n      <b-alert show variant=\"warning\">We're sorry, we don't have that username\n\n        on record. Please check and re-enter the username or use your email\n        address. Hit sign-up to create a new account.</b-alert>\n      <b-form-group id=\"login-username\"\n                    label=\"email address\"\n                    label-for=\"username\">\n        <b-form-input id=\"username\"\n                      type=\"text\"\n                      v-model=\"loginForm.login\"\n                      required></b-form-input>\n      </b-form-group>\n      <b-form-group class=\"login-actions\">\n        <b-btn v-if=\"action != 'register'\" type=\"submit\" variant=\"primary\"\n               name=\"wp-submit\" class=\"login-button\" value=\"Log in\"\n               @click=\"actionLogin\">try again</b-btn>\n        <span v-if=\"action != 'register'\">or</span>\n        <b-btn type=\"submit\" variant=\"success\" name=\"wp-submit\"\n               class=\"register-button\" value=\"Register\"\n               @click=\"actionRegister\">sign-up</b-btn>\n      </b-form-group>\n    </b-form>\n    <b-form v-else-if=\"action == 'unknown-email'\" @submit=\"login\"\n            :class=\"[ 'login', action ]\">\n      <b-alert show variant=\"warning\">We're sorry, we have no record of that\n      email address. If you entered the email incorrectly you can re-enter it\n      below to retry. or hit sign-up to create an account</b-alert>\n      <b-form-group id=\"login-email\"\n                    label=\"email address\"\n                    label-for=\"email\">\n        <b-form-input id=\"email\"\n                      type=\"email\"\n                      v-model=\"loginForm.email\"\n                      required></b-form-input>\n      </b-form-group>\n      <b-form-group class=\"login-actions\">\n        <b-btn v-if=\"action != 'register'\" type=\"submit\" variant=\"primary\"\n               name=\"wp-submit\" class=\"login-button\" value=\"Log in\"\n               @click=\"actionLogin\">try again</b-btn>\n        <span v-if=\"action != 'register'\">or</span>\n        <b-btn type=\"submit\" variant=\"success\" name=\"wp-submit\"\n               class=\"register-button\" value=\"Register\"\n               @click=\"actionRegister\">sign-up</b-btn>\n      </b-form-group>\n    </b-form>\n    <b-form v-else @submit=\"login\"\n            :class=\"[ 'login', action ]\">\n      <b-form-group id=\"login-username\"\n                    :label=\"action == 'register' ? 'username'\n                            : 'username or email address'\"\n                    label-for=\"username\">\n        <b-form-input id=\"username\"\n                      type=\"text\"\n                      v-model=\"loginForm.login\"\n                      required></b-form-input>\n      </b-form-group>\n      <transition name=\"fade-fast\">\n        <b-form-group v-if=\"action == 'register'\"\n                      id=\"login-email\"\n                      label=\"email address\"\n                      label-for=\"email\">\n          <b-form-input id=\"email\"\n                        type=\"email\"\n                        v-model=\"loginForm.email\"\n                        required></b-form-input>\n        </b-form-group>\n      </transition>\n      <transition name=\"fade-fast\" mode=\"out-in\">\n        <div id=\"login-password\" v-if=\"tokenLogin\">\n          <b-alert v-if=\"action == 'register'\" show>A password will be generated\n          for you and sent with your confirmation email.</b-alert>\n          <b-alert v-else show>An email will be sent with a link that will log\n            you in when you click it. This link will expire in 10\n            minutes.</b-alert>\n          <b-btn variant=\"link\" @click=\"enterPass\">set password now</b-btn>\n        </div>\n        <b-form-group v-else-if=\"action == 'register'\"\n                      id=\"login-password\">\n          <b-form-group id=\"login-password1\"\n                        label=\"password\"\n                        label-for=\"password1\">\n            <b-form-input id=\"password1\"\n                          type=\"password\"\n                          v-model=\"loginForm.pass\"\n                          required></b-form-input>\n          </b-form-group>\n          <b-form-group id=\"login-password1\"\n                        label=\"confirm password\"\n                        label-for=\"password2\">\n            <b-form-input id=\"password2\"\n                          type=\"password\"\n                          v-model=\"confirmPass\"\n                          required></b-form-input>\n          </b-form-group>\n          <b-btn variant=\"link\" @click=\"sendLink\">don't set password now</b-btn>\n        </b-form-group>\n        <b-form-group v-else\n                      id=\"login-password\"\n                      label=\"password\"\n                      label-for=\"password\">\n          <b-form-input id=\"password\"\n                        type=\"password\"\n                        v-model=\"loginForm.pass\"\n                        required></b-form-input>\n          <b-btn variant=\"link\" @click=\"sendLink\">email login link instead</b-btn>\n        </b-form-group>\n      </transition>\n      <b-form-group>\n        <vue-recaptcha :sitekey=\"recaptcha.key\"\n                       @verify=\"recaptchaSuccess\"\n                       theme=\"dark\"></vue-recaptcha>\n      </b-form-group>\n      <b-form-group class=\"login-actions\">\n        <b-btn v-if=\"action != 'register'\" type=\"submit\" variant=\"primary\"\n               name=\"wp-submit\" class=\"login-button\" value=\"Log in\"\n               @click=\"actionLogin\">login</b-btn>\n        <b-btn v-else variant=\"link\" @click=\"clearForm\"\n               class=\"login-button\">cancel</b-btn>\n        <span v-if=\"action != 'register'\">or</span>\n        <b-btn type=\"submit\" variant=\"success\" name=\"wp-submit\"\n               class=\"register-button\" value=\"Register\"\n               @click=\"actionRegister\">sign-up</b-btn>\n      </b-form-group>\n    </b-form>\n  </transition>\n</b-dd>\n";

/***/ })

}]);
//# sourceMappingURL=31.js.map