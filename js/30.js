(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[30],{

/***/ "./js/components/subscription-menu/index.js":
/*!**************************************************!*\
  !*** ./js/components/subscription-menu/index.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/store */ "./js/lib/store.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_wpapix__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/wpapix */ "./js/lib/wpapix.js");



/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/subscription-menu/template.html"),
  props: {
    levels: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    target: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      sstate: _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state,
      selectedLevel: false,
      storedLevels: false,
      wait: false,
      confirmed: false,
      fetching: false,
      order_fields: [{
        key: 'item',
        class: 'col-8'
      }, {
        key: 'amount',
        label: 'Amount (USD)',
        class: 'col-4'
      }],
      order: []
    };
  },
  mounted: function mounted() {
    var _this = this;

    if (!this.levels.length) _lib_wpapix__WEBPACK_IMPORTED_MODULE_2__["default"].then(function (wpapix) {
      var levels = new wpapix.Membership({
        path: 'levels'
      });
      levels.fetch().done(function (res) {
        console.log('got membership levels', res);
        _this.storedLevels = res;
      });
    });
  },
  methods: {
    setLevel: function setLevel(level) {
      if (!this.user) {// redirect to login, then continue
      }

      this.selectedLevel = level;
      this.order = [{
        item: level.name,
        amount: level.billing_amount
      }, {
        item: "Total",
        amount: level.billing_amount,
        _rowVariant: 'secondary'
      }];
    },
    unsetLevel: function unsetLevel() {
      this.selectedLevel = false;
    },
    getConfirmation: function getConfirmation(e, level) {
      var _this2 = this;

      window.open('/members/checkout?level=' + this.selectedLevel.id + '&submit-checkout=1&checkjavascript=1&javascriptok=1', '_blank');

      _lib_wpapix__WEBPACK_IMPORTED_MODULE_2__["default"].then(function (wpapix) {
        var membership = new wpapix.Membership({
          path: 'my-level'
        });
        _this2.fetching = false;
        _this2.wait = window.setInterval(function () {
          if (_this2.fetching) return;
          _this2.fetching = true;
          membership.fetch({
            success: function success(model, res, opt) {
              if (res && res.id != _this2.currentLevel.id) {
                _this2.confirmed = true;
                _this2.user.membership = res;
                window.clearInterval(_this2.wait);
                _this2.wait = false;
                window.setTimeout(function () {
                  _this2.fetching = false;
                }, 250);
              } else {
                _this2.fetching = false;
              }
            },
            error: function error(model, res, opt) {
              _this2.fetching = false;
            }
          });
        }, 2500);
      });
    }
  },
  computed: {
    user: function user() {
      return this.sstate.user;
    },
    memberLevels: function memberLevels() {
      return this.levels.length ? this.levels : this.storedLevels;
    },
    currentLevel: function currentLevel() {
      return this.user && this.user.membership || false;
    },
    targetPost: function targetPost() {
      return this.target;
    }
  }
});

/***/ }),

/***/ "./js/components/subscription-menu/template.html":
/*!*******************************************************!*\
  !*** ./js/components/subscription-menu/template.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"subscription-menu container\">\n  <transition name=\"fade-fast\" mode=\"out-in\">\n    <div v-if=\"confirmed\" class=\"row success\" key=\"success\">\n      <h2>Success!</h2>\n      <div class=\"welcome col-12\">You've succesfully signed up for the {{\n        currentLevel.name }} package. <span v-if=\"targetPost\">You can now see\n          the content you were trying to view\n          <router-link :to=\"targetPost\">here</router-link>.</span>\n      </div>\n    </div>\n    <div v-else-if=\"selectedLevel\" class=\"confirm container\" key=\"confirm\">\n      <h2 class=\"message\">Confirm Order</h2>\n      <b-table striped hover :items=\"order\" :fields=\"order_fields\" stacked=\"sm\"\n               class=\"order\"></b-table>\n      <div class=\"actions\">\n        <b-btn class=\"col-2 submit confirm checkout paypal paypal-express\"\n               @click.stop=\"getConfirmation\"\n               variant=\"warning\">checkout</b-btn>\n        <b-btn class=\"col-2 cancel\" @click.stop=\"unsetLevel\"\n               variant=\"link\">go back</b-btn>\n      </div>\n    </div>\n    <div v-else class=\"row\" key=\"select\">\n      <div class=\"description col-12\"><slot></slot></div>\n      <div v-for=\"level in memberLevels\" :key=\"level.id\"\n           class=\"col-12 col-md-4\">\n        <b-card no-body class=\"member-level\" :header=\"level.name\">\n          <b-card-body>\n            <div class=\"description\" v-html=\"level.description\"></div>\n            <div class=\"price\">${{\n              level.initial_payment || level.billing_amount }}</div>\n          </b-card-body>\n          <b-card-footer v-if=\"currentLevel.id == level.id\" class=\"selected\">\n            expires {{ user.membership.expires }}\n          </b-card-footer>\n          <b-card-footer v-else class=\"buy\">\n            <!-- <router-link :to=\"'/members/signup/' + level.id\"></router-link> -->\n            <a href=\"#\" @click.stop=\"setLevel( level )\">{{\n              user ? 'select' : 'sign up'\n              }}</a>\n          </b-card-footer>\n        </b-card>\n      </div>\n    </div>\n  </transition>\n</div>\n";

/***/ })

}]);
//# sourceMappingURL=30.js.map