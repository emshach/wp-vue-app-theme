(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[32],{

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
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/user-block/template.html"),
  data: function data() {
    return {
      sstate: _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state,
      action: 'login',
      userExists: false,
      recaptcha: {
        key: _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state.recaptcha_key,
        response: null,
        show: false
      },
      errors: [],
      usernameTaken: false,
      emailTaken: false,
      feedbackStyle: {
        minHeight: 'auto',
        minWidth: 'auto'
      },
      messageStyle: {
        minHeight: 'auto'
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
        this.errors = [];

        if (/.+@.+\..+/.test(this.loginForm.login)) {
          this.loginForm.email = this.loginForm.login;
          this.loginForm.login = '';
        }

        return false;
      }

      if (!this.recaptcha.response) {
        this.errors.push("captcha: are you a robot?");
        return false;
      }

      this.loginForm['g-recaptcha-response'] = this.recaptcha.response;
      this.loginForm.token = this.tokenLogin;
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.post(this.ajaxUrl, qs__WEBPACK_IMPORTED_MODULE_2___default.a.stringify(this.loginForm), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      }).then(function (response) {
        var d = response.data;
        console.log('loginForm response', d);

        switch (d.next) {
          case 'wrong-password':
            _this.action = 'login';

            _this.errors.push("the password you entered was incorrect");

            break;

          case 'unknown-user':
          case 'unknown-email':
          case 'email-exists':
          case 'success-email':
          case 'not-registered':
            var $el = _this.$refs.loginForm;
            _this.feedbackStyle.minHeight = $el.clientHeight + 'px';
            _this.messageStyle.minHeight = $el.clientHeight - 60 + 'px';
            _this.feedbackStyle.minWidth = $el.clientWidth + 'px';
            _this.action = d.next;
            break;

          case 'link-sent':
            _this.action = 'link-sent';

            _this.waitLogin(); // TODO: close form


            break;

          case 'user-exists':
            _this.usernameTaken = true;
            break;

          case 'forgot-password':
            break;

          case 'error':
            break;

          case 'success':
            // success!
            _this.action = 'success';

            _this.reload();

        }
      }).catch(function (error) {
        console.warn('server error', error);
        _this.action = 'system-error'; // Swal( "We're sorry! There was some problem. Please try again later" );
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
    recaptchaShow: function recaptchaShow() {
      this.recaptcha.response = '';
      this.recaptcha.show = true;
    },
    recaptchaSuccess: function recaptchaSuccess(response) {
      var _this2 = this;

      this.errors = this.errors.filter(function (x) {
        return !/captcha/.test(x);
      });
      this.recaptcha.response = response;
      window.setTimeout(function () {
        _this2.recaptcha.show = false;
      }, 2000);
      window.setTimeout(function () {
        _this2.recaptcha.response = '';
      }, 100000);
    },
    recaptchaExpired: function recaptchaExpired() {
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
    formClick: function formClick(e) {
      e.stopPropagation();
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
    },
    reload: function reload() {
      window.location.reload();
    },
    goBack: function goBack(e) {
      e.stopPropagation();
      if (this.action == 'not-registered') this.action = 'login';else this.action = 'register';
    },
    goToLogin: function goToLogin(e) {
      e.stopPropagation();
      this.loginForm.login = this.loginForm.email;
      this.loginForm.email = '';
      this.action = 'login';
    },
    confirm: function confirm(e) {
      this.loginForm.action = 'mrklogin';
      this.loginForm.token = true;
      this.login(e);
    },
    register: function register(e) {
      e.stopPropagation();
      this.action = 'login';
      this.loginForm.action = 'mrkregister';
    },
    focusFirst: function focusFirst() {
      var _this3 = this;

      window.setTimeout(function () {
        if (_this3.$refs.firstInput) _this3.$refs.firstInput.focus();
      }, 150);
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
  },
  watch: {
    action: function action(newVal, oldVal) {
      if (newVal != oldVal) this.focusFirst();
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

module.exports = "<b-dd id=\"user\" @shown=\"focusFirst\">\n  <template slot=\"button-content\">\n    <span class=\"dashicons dashicons-admin-users\"></span>\n    {{ loggedIn ? user.display_name: 'sign in' }}\n  </template>\n  <!-- <transition name=\"fast-fade\">\n    <b-dd-item v-if=\"loggedIn\" :href=\"\"></b-dd-item>\n  </transition> -->\n  <transition name=\"fast-fade\" mode=\"out-in\">\n    <b-dd-item v-if=\"loggedIn\" :href=\"logoutLink\">log out</b-dd-item>\n    <div v-else-if=\"action == 'success'\" id=\"login\" class=\"feedback\"\n         :style=\"feedbackStyle\">\n      <div class=\"message\" :style=\"messageStyle\">Success! The page should reload\n        with you logged in. If it takes too long, click the button to\n        reload.</div>\n      <b-btn variant=\"primary\" @click=\"reload\"\n             class=\"mid-button\">reload</b-btn>\n      <!-- <b-btn type=\"submit\" variant=\"success\" name=\"wp-submit\" -->\n      <!--        class=\"register-button\" value=\"Register\" -->\n      <!--        @click=\"actionRegister\">sign-up</b-btn> -->\n    </div>\n    <div v-else-if=\"action == 'success-email'\" id=\"login\" class=\"feedback\"\n         :style=\"feedbackStyle\">\n      <div class=\"message\" :style=\"messageStyle\">Success! Please check your mail\n        and follow the confirmation link to complete registration</div>\n      <div class=\"login-actions\">\n        <b-btn v-if=\"loginConfirmed\" variant=\"primary\"\n               class=\"mid-button\">OK</b-btn>\n      </div>\n    </div>\n    <div v-else-if=\"action == 'link-sent'\" id=\"login\" class=\"feedback\"\n         :style=\"feedbackStyle\">\n      <div class=\"message\" :style=\"messageStyle\">Your login link has been sent.\n        This page should reload once you've been logged in. If not, click the\n        button to reload</div>\n      <div class=\"login-actions\">\n        <b-btn v-if=\"loginConfirmed\" variant=\"primary\" @click=\"reload\"\n               class=\"mid-button\">reload</b-btn>\n      </div>\n    </div>\n    <div v-else-if=\"action == 'not-registered'\" id=\"login\" class=\"feedback\"\n         :style=\"feedbackStyle\">\n      <div class=\"message\" :style=\"messageStyle\">The username <strong>{{\n        loginForm.login }}</strong> is not registered. Would you like to sign\n        up?</div>\n      <div class=\"login-actions\">\n        <b-btn variant=\"link\" @click=\"goBack\"\n               class=\"login-button\">go back</b-btn>\n        <b-btn variant=\"success\" @click=\"register\"\n               class=\"register-button\">sign-up</b-btn>\n      </div>\n    </div>\n    <div v-else-if=\"action == 'email-exists'\" id=\"login\" class=\"feedback\"\n         :style=\"feedbackStyle\">\n      <template v-if=\"loginForm.token\">\n        <div class=\"message\" :style=\"messageStyle\">The email\n          <strong>{{ loginForm.email }}</strong> is already registered. If this\n          email is correct, click confirm to get your login link, or go back to\n          change it</div>\n        <div class=\"login-actions\">\n          <b-btn variant=\"link\" @click=\"goBack\"\n                 class=\"login-button\">go back</b-btn>\n          <b-btn variant=\"success\" @click=\"confirm\"\n                 class=\"register-button\">confirm</b-btn>\n        </div>\n      </template>\n      <template v-else>\n        <div class=\"message\" :style=\"messageStyle\">The email\n          <strong>{{ loginForm.email }}</strong> is already registered but does\n          not match the password given. If this email is correct, click login to\n          try again, or click forgot password and a login link will be sent to\n          you.</div>\n        <div class=\"login-actions\">\n          <b-btn variant=\"link\" @click=\"goToLogin\"\n                 class=\"login-button\">login</b-btn>\n          <b-btn variant=\"success\" @click=\"confirm\"\n                 class=\"register-button\">forgot password</b-btn>\n        </div>\n      </template>\n    </div>\n    <b-form v-else-if=\"action == 'unknown-user'\" @submit=\"login\"\n            id=\"login\" ref=\"loginForm\"\n            @click=\"formClick\"\n            :class=\"[ 'login', action ]\">\n      <b-alert show variant=\"warning\">We're sorry, we don't have that username\n        on record. Please check and re-enter the username or use your email\n        address. Hit sign-up to create a new account.</b-alert>\n      <b-form-group id=\"login-username\"\n                    label=\"email address\"\n                    label-for=\"username\">\n        <b-form-input id=\"username\" ref=\"firstInput\"\n                      type=\"text\"\n                      v-model=\"loginForm.login\"\n                      required></b-form-input>\n      </b-form-group>\n      <b-form-group class=\"login-actions\">\n        <b-btn type=\"submit\" variant=\"primary\"\n               name=\"wp-submit\" class=\"login-button\" value=\"Log in\"\n               @click=\"actionLogin\">try again</b-btn>\n        <b-btn type=\"submit\" variant=\"success\" name=\"wp-submit\"\n               class=\"register-button\" value=\"Register\"\n               @click=\"actionRegister\">sign-up</b-btn>\n      </b-form-group>\n    </b-form>\n    <b-form v-else-if=\"action == 'unknown-email'\" @submit=\"login\"\n            id=\"login\" ref=\"loginForm\"\n            @click=\"formClick\"\n            :class=\"[ 'login', action ]\">\n      <b-alert show variant=\"warning\">We're sorry, we have no record of that\n      email address. If you entered the email incorrectly you can re-enter it\n      below to retry. or hit sign-up to create an account</b-alert>\n      <b-form-group id=\"login-email\"\n                    label=\"email address\"\n                    label-for=\"email\">\n        <b-form-input id=\"email\" ref=\"firstInput\"\n                      type=\"email\"\n                      v-model=\"loginForm.email\"\n                      required></b-form-input>\n      </b-form-group>\n      <b-form-group class=\"login-actions\">\n        <b-btn type=\"submit\" variant=\"primary\"\n               name=\"wp-submit\" class=\"login-button\" value=\"Log in\"\n               @click=\"actionLogin\">try again</b-btn>\n        <b-btn type=\"submit\" variant=\"success\" name=\"wp-submit\"\n               class=\"register-button\" value=\"Register\"\n               @click=\"actionRegister\">sign-up</b-btn>\n      </b-form-group>\n    </b-form>\n    <b-form v-else @submit=\"login\"\n            id=\"login\" ref=\"loginForm\"\n            @click=\"formClick\"\n            :class=\"[ 'login', action ]\">\n      <transition name=\"fade-fast\">\n        <b-form-group v-if=\"errors.length\">\n          <b-alert v-for=\"( error, index ) in errors\" variant=\"danger\" show\n                   :key=\"index\" v-html=\"error\"></b-alert>\n        </b-form-group>\n      </transition>\n      <b-form-group id=\"login-username\"\n                    :label=\"action == 'register' ? 'username'\n                            : 'username or email address'\"\n                    label-for=\"username\">\n        <b-form-input id=\"username\" ref=\"firstInput\"\n                      type=\"text\"\n                      v-model=\"loginForm.login\"\n                      required></b-form-input>\n      </b-form-group>\n      <transition name=\"fade-fast\">\n        <b-form-group v-if=\"action == 'register'\"\n                      id=\"login-email\"\n                      label=\"email address\"\n                      label-for=\"email\">\n          <b-form-input id=\"email\"\n                        type=\"email\"\n                        v-model=\"loginForm.email\"\n                        required></b-form-input>\n        </b-form-group>\n      </transition>\n      <transition name=\"fade-fast\" mode=\"out-in\">\n        <div id=\"login-password\" v-if=\"tokenLogin\">\n          <template v-if=\"action == 'register'\">\n            <b-alert show>A password will be generated\n              for you and sent with your confirmation email.</b-alert>\n            <b-btn variant=\"link\" @click=\"enterPass\">set password now</b-btn>\n          </template>\n          <template v-else>\n            <b-alert show>An email will be sent with a link that will log\n              you in when you click it. This link will expire in 10\n              minutes.</b-alert>\n            <b-btn variant=\"link\" @click=\"enterPass\">enter password instead</b-btn>\n          </template>\n        </div>\n        <b-form-group v-else-if=\"action == 'register'\"\n                      id=\"login-password\">\n          <b-form-group id=\"login-password1\"\n                        label=\"password\"\n                        label-for=\"password1\">\n            <b-form-input id=\"password1\"\n                          type=\"password\"\n                          v-model=\"loginForm.pass\"\n                          required></b-form-input>\n          </b-form-group>\n          <b-form-group id=\"login-password1\"\n                        label=\"confirm password\"\n                        label-for=\"password2\">\n            <b-form-input id=\"password2\"\n                          type=\"password\"\n                          v-model=\"confirmPass\"\n                          required></b-form-input>\n          </b-form-group>\n          <b-btn variant=\"link\" @click=\"sendLink\">don't set password now</b-btn>\n        </b-form-group>\n        <b-form-group v-else\n                      id=\"login-password\"\n                      label=\"password\"\n                      label-for=\"password\">\n          <b-form-input id=\"password\"\n                        type=\"password\"\n                        v-model=\"loginForm.pass\"\n                        required></b-form-input>\n          <b-btn variant=\"link\" @click=\"sendLink\">email login link instead</b-btn>\n        </b-form-group>\n      </transition>\n      <transition name=\"fade-in\">\n        <b-form-group v-if=\"recaptcha.show || !recaptcha.response\">\n          <vue-recaptcha :sitekey=\"recaptcha.key\"\n                         @rendered=\"recaptchaShow\"\n                         @verify=\"recaptchaSuccess\"\n                         @expired=\"recaptchaExpired\"\n                         theme=\"dark\"></vue-recaptcha>\n        </b-form-group>\n      </transition>\n      <b-form-group class=\"login-actions\">\n        <b-btn v-if=\"action != 'register'\" type=\"submit\" variant=\"primary\"\n               name=\"wp-submit\" class=\"login-button\" value=\"Log in\"\n               @click=\"actionLogin\">login</b-btn>\n        <b-btn v-else variant=\"link\" @click=\"clearForm\"\n               class=\"login-button\">cancel</b-btn>\n        <span v-if=\"action != 'register'\">or</span>\n        <b-btn type=\"submit\" variant=\"success\" name=\"wp-submit\"\n               class=\"register-button\" value=\"Register\"\n               @click=\"actionRegister\">sign-up</b-btn>\n      </b-form-group>\n    </b-form>\n  </transition>\n</b-dd>\n";

/***/ })

}]);
//# sourceMappingURL=32.js.map