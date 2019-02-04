(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[21],{

/***/ "./js/components/login-form/index.js":
/*!*******************************************!*\
  !*** ./js/components/login-form/index.js ***!
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
  template: __webpack_require__(/*! ./template.html */ "./js/components/login-form/template.html"),
  props: {
    shown: {
      type: Boolean,
      default: true
    },
    redirect: {
      type: String,
      default: ''
    }
  },
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
      passwordWrong: false,
      emailTaken: false,
      feedbackStyle: {
        minHeight: '',
        minWidth: ''
      },
      messageStyle: {
        minHeight: ''
      },
      formData: {
        action: 'mrklogin',
        login: '',
        email: '',
        pass: '',
        redirect_url: '',
        remember: true,
        'g-recaptcha-response': '',
        token: false,
        sec_token: _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state.ajax.sec
      },
      confirmUser: '',
      confirmPass: '',
      tokenLogin: false,
      ajaxUrl: _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state.ajax.url
    };
  },
  mounted: function mounted() {
    this.formData.redirect_url = this.redirect;
  },
  methods: {
    login: function login(e) {
      var _this = this;

      e.preventDefault();

      if (this.action != 'register' && this.formData.action == 'mrkregister') {
        this.action = 'register';
        this.errors = [];

        if (/.+@.+\..+/.test(this.formData.login)) {
          this.formData.email = this.formData.login;
          this.formData.login = '';
        }

        return false;
      }

      if (!this.recaptcha.response) {
        this.errors.push("captcha: are you a robot?");
        return false;
      }

      this.usernameTaken = false;
      this.passwordWrong = false;
      this.formData['g-recaptcha-response'] = this.recaptcha.response;
      this.formData.token = this.tokenLogin;
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.post(this.ajaxUrl, qs__WEBPACK_IMPORTED_MODULE_2___default.a.stringify(this.formData), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      }).then(function (response) {
        var d = response.data;
        console.log('formData response', d);

        switch (d.next) {
          case 'wrong-password':
            _this.action = 'login';

            _this.errors.push("the password you entered was incorrect");

            _this.passwordWrong = true;
            break;

          case 'unknown-user':
          case 'unknown-email':
          case 'email-exists':
          case 'success-email':
          case 'not-registered':
            var $el = _this.$refs.formData;
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
      this.formData.action = 'mrklogin';
    },
    actionRegister: function actionRegister() {
      this.formData.action = 'mrkregister';

      if (this.action != 'register') {
        this.action = 'register';
        this.errors = [];

        if (/.+@.+\..+/.test(this.formData.login)) {
          this.formData.email = this.formData.login;
          this.formData.login = '';
        }
      }
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
      console.log('formClick', e);
      e.stopPropagation();
    },
    changed: function changed(e) {
      this.$emit('change', {
        orig: e
      });
    },
    clearForm: function clearForm() {
      this.formData = {
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
      this.formData.login = this.formData.email;
      this.formData.email = '';
      this.action = 'login';
    },
    confirm: function confirm(e) {
      this.formData.action = 'mrklogin';
      this.formData.token = true;
      this.login(e);
    },
    register: function register(e) {
      e.stopPropagation();
      this.action = 'login';
      this.formData.action = 'mrkregister';
      this.login(e);
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
    },
    shown: function shown(val) {
      if (val) this.focusFirst();
    }
  }
});

/***/ }),

/***/ "./js/components/login-form/template.html":
/*!************************************************!*\
  !*** ./js/components/login-form/template.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"login-container\">\n  <transition name=\"fast-fade\" mode=\"out-in\">\n    <div v-if=\"action == 'success'\" id=\"login\" class=\"feedback\"\n         :style=\"feedbackStyle\">\n      <div class=\"message\" :style=\"messageStyle\">Success! The page should reload\n        with you logged in. If it takes too long, click the button to\n        reload.</div>\n      <b-btn variant=\"primary\" @click=\"reload\"\n             class=\"mid-button\">reload</b-btn>\n      <!-- <b-btn type=\"submit\" variant=\"success\" name=\"wp-submit\" -->\n      <!--        class=\"register-button\" value=\"Register\" -->\n      <!--        @click=\"actionRegister\">sign-up</b-btn> -->\n    </div>\n    <div v-else-if=\"action == 'success-email'\" id=\"login\" class=\"feedback\"\n         :style=\"feedbackStyle\">\n      <div class=\"message\" :style=\"messageStyle\">Success! Please check your mail\n        and follow the confirmation link to complete registration</div>\n      <div class=\"login-actions\">\n        <b-btn variant=\"primary\" @click=\"reload\" class=\"mid-button\">OK</b-btn>\n      </div>\n    </div>\n    <div v-else-if=\"action == 'link-sent'\" id=\"login\" class=\"feedback\"\n         :style=\"feedbackStyle\">\n      <div class=\"message\" :style=\"messageStyle\">Your login link has been sent.\n        This page should reload once you've been logged in. If not, click the\n        button to reload</div>\n      <div class=\"login-actions\">\n        <b-btn variant=\"primary\" @click=\"reload\" class=\"mid-button\">reload</b-btn>\n      </div>\n    </div>\n    <div v-else-if=\"action == 'not-registered'\" id=\"login\" class=\"feedback\"\n         :style=\"feedbackStyle\">\n      <div class=\"message\" :style=\"messageStyle\">The username <strong>{{\n          formData.login }}</strong> is not registered. Would you like to sign\n        up?</div>\n      <div class=\"login-actions\">\n        <b-btn variant=\"link\" @click=\"goBack\"\n               class=\"login-button\">go back</b-btn>\n        <b-btn variant=\"success\" @click=\"register\"\n               class=\"register-button\">sign-up</b-btn>\n      </div>\n    </div>\n    <div v-else-if=\"action == 'email-exists'\" id=\"login\" class=\"feedback\"\n         :style=\"feedbackStyle\">\n      <template v-if=\"formData.token\">\n        <div class=\"message\" :style=\"messageStyle\">The email\n          <strong>{{ formData.email }}</strong> is already registered. If this\n          email is correct, click confirm to get your login link, or go back to\n          change it</div>\n        <div class=\"login-actions\">\n          <b-btn variant=\"link\" @click=\"goBack\"\n                 class=\"login-button\">go back</b-btn>\n          <b-btn variant=\"success\" @click=\"confirm\"\n                 class=\"register-button\">confirm</b-btn>\n        </div>\n      </template>\n      <template v-else>\n        <div class=\"message\" :style=\"messageStyle\">The email\n          <strong>{{ formData.email }}</strong> is already registered but does\n          not match the password given. If this email is correct, click login to\n          try again, or click forgot password and a login link will be sent to\n          you.</div>\n        <div class=\"login-actions\">\n          <b-btn variant=\"link\" @click=\"goToLogin\"\n                 class=\"login-button\">login</b-btn>\n          <b-btn variant=\"success\" @click=\"confirm\"\n                 class=\"register-button\">forgot password</b-btn>\n        </div>\n      </template>\n    </div>\n    <b-form v-else-if=\"action == 'unknown-user'\" @submit=\"login\"\n            id=\"login\" ref=\"formData\"\n            @click=\"formClick\"\n            :class=\"[ 'login', action ]\">\n      <b-alert show variant=\"warning\">We're sorry, we don't have that username\n        on record. Please check and re-enter the username or use your email\n        address. Hit sign-up to create a new account.</b-alert>\n      <b-form-group id=\"login-username\"\n                    label=\"email address\"\n                    label-for=\"username\">\n        <b-form-input id=\"username\" ref=\"firstInput\"\n                      type=\"text\"\n                      v-model=\"formData.login\"\n                      @change=\"changed\"\n                      required></b-form-input>\n      </b-form-group>\n      <b-form-group class=\"login-actions\">\n        <b-btn type=\"submit\" variant=\"primary\"\n               name=\"wp-submit\" class=\"login-button\" value=\"Log in\"\n               @click=\"actionLogin\">try again</b-btn>\n        <b-btn type=\"submit\" variant=\"success\" name=\"wp-submit\"\n               class=\"register-button\" value=\"Register\"\n               @click=\"actionRegister\">sign-up</b-btn>\n      </b-form-group>\n    </b-form>\n    <b-form v-else-if=\"action == 'unknown-email'\" @submit=\"login\"\n            id=\"login\" ref=\"formData\"\n            @click=\"formClick\"\n            :class=\"[ 'login', action ]\">\n      <b-alert show variant=\"warning\">We're sorry, we have no record of that\n        email address. If you entered the email incorrectly you can re-enter it\n        below to retry. or hit sign-up to create an account</b-alert>\n      <b-form-group id=\"login-email\"\n                    label=\"email address\"\n                    label-for=\"email\">\n        <b-form-input id=\"email\" ref=\"firstInput\"\n                      type=\"email\"\n                      v-model=\"formData.email\"\n                      @change=\"changed\"\n                      required></b-form-input>\n      </b-form-group>\n      <b-form-group class=\"login-actions\">\n        <b-btn type=\"submit\" variant=\"primary\"\n               name=\"wp-submit\" class=\"login-button\" value=\"Log in\"\n               @click=\"actionLogin\">try again</b-btn>\n        <b-btn type=\"submit\" variant=\"success\" name=\"wp-submit\"\n               class=\"register-button\" value=\"Register\"\n               @click=\"actionRegister\">sign-up</b-btn>\n      </b-form-group>\n    </b-form>\n    <b-form v-else @submit=\"login\"\n            id=\"login\" ref=\"formData\"\n            @click=\"formClick\"\n            :class=\"[ 'login', action ]\">\n      <transition name=\"fade-fast\">\n        <b-form-group v-if=\"errors.length\">\n          <b-alert v-for=\"( error, index ) in errors\" variant=\"danger\" show\n                   :key=\"index\" v-html=\"error\"></b-alert>\n        </b-form-group>\n      </transition>\n      <b-form-group id=\"login-username\"\n                    :label=\"action == 'register' ? 'username'\n                            : 'username or email address'\"\n                    label-for=\"username\">\n        <b-form-input id=\"username\" ref=\"firstInput\"\n                      type=\"text\"\n                      v-model=\"formData.login\"\n                      @change=\"changed\"\n                      required></b-form-input>\n      </b-form-group>\n      <transition name=\"fade-fast\">\n        <b-form-group v-if=\"action == 'register'\"\n                      id=\"login-email\"\n                      label=\"email address\"\n                      label-for=\"email\">\n          <b-form-input id=\"email\"\n                        type=\"email\"\n                        v-model=\"formData.email\"\n                      @change=\"changed\"\n                        required></b-form-input>\n        </b-form-group>\n      </transition>\n      <transition name=\"fade-fast\" mode=\"out-in\">\n        <div id=\"login-password\" v-if=\"tokenLogin\">\n          <template v-if=\"action == 'register'\">\n            <b-alert show>A password will be generated\n              for you and sent with your confirmation email.</b-alert>\n            <b-btn variant=\"link\" @click=\"enterPass\">set password now</b-btn>\n          </template>\n          <template v-else>\n            <b-alert show>An email will be sent with a link that will log\n              you in when you click it. This link will expire in 10\n              minutes.</b-alert>\n            <b-btn v-if=\"passwordWrong\" variant=\"link\"\n                   @click=\"enterPass\">try enter password again</b-btn>\n            <b-btn v-else variant=\"link\"\n                   @click=\"enterPass\">enter password instead</b-btn>\n          </template>\n        </div>\n        <b-form-group v-else-if=\"action == 'register'\"\n                      id=\"login-password\">\n          <b-form-group id=\"login-password1\"\n                        label=\"password\"\n                        label-for=\"password1\">\n            <b-form-input id=\"password1\"\n                          type=\"password\"\n                          v-model=\"formData.pass\"\n                          @change=\"changed\"\n                          required></b-form-input>\n          </b-form-group>\n          <b-form-group id=\"login-password2\"\n                        label=\"confirm password\"\n                        label-for=\"password2\">\n            <b-form-input id=\"password2\"\n                          type=\"password\"\n                          v-model=\"confirmPass\"\n                          @change=\"changed\"\n                          required></b-form-input>\n          </b-form-group>\n          <b-btn variant=\"link\" @click=\"sendLink\">don't set password now</b-btn>\n        </b-form-group>\n        <b-form-group v-else\n                      id=\"login-password\"\n                      label=\"password\"\n                      label-for=\"password\">\n          <b-form-input id=\"password\"\n                        type=\"password\"\n                        v-model=\"formData.pass\"\n                        @change=\"changed\"\n                        required></b-form-input>\n          <b-btn v-if=\"passwordWrong\" variant=\"link\"\n                 @click=\"sendLink\">forgot password</b-btn>\n          <b-btn v-else variant=\"link\"\n                 @click=\"sendLink\">email login link instead</b-btn>\n        </b-form-group>\n      </transition>\n      <transition name=\"fade-in\">\n        <b-form-group v-if=\"recaptcha.show || !recaptcha.response\"\n                      id=\"login-recaptcha\">\n          <vue-recaptcha :sitekey=\"recaptcha.key\"\n                         @rendered=\"recaptchaShow\"\n                         @verify=\"recaptchaSuccess\"\n                         @expired=\"recaptchaExpired\"\n                         theme=\"dark\"></vue-recaptcha>\n        </b-form-group>\n      </transition>\n      <b-form-group class=\"login-actions\">\n        <b-btn v-if=\"action != 'register'\" type=\"submit\" variant=\"primary\"\n               name=\"wp-submit\" class=\"login-button\" value=\"Log in\"\n               @click=\"actionLogin\">login</b-btn>\n        <b-btn v-else variant=\"link\" @click=\"clearForm\"\n               class=\"login-button\">cancel</b-btn>\n        <span v-if=\"action != 'register'\">or</span>\n        <b-btn type=\"submit\" variant=\"success\" name=\"wp-submit\"\n               class=\"register-button\" value=\"Register\"\n               @click=\"actionRegister\">sign-up</b-btn>\n      </b-form-group>\n    </b-form>\n  </transition>\n</div>\n";

/***/ })

}]);
//# sourceMappingURL=21.js.map