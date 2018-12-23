(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[25],{

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
/* harmony import */ var _lib_wpapi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/wpapi */ "./js/lib/wpapi.js");



/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/subscription-menu/template.html"),
  props: {
    levels: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      sstate: _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state,
      selectedLevel: false,
      storedLevels: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    if (!this.levels.length) wp.api.loadPromise.done(function () {
      var levels = new _lib_wpapi__WEBPACK_IMPORTED_MODULE_2__["default"].Membership({
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
      this.selectedLevel = level;
    },
    unsetLevel: function unsetLevel() {
      this.selectedLevel = false;
    }
  },
  computed: {
    user: function user() {
      return this.sstate.user;
    },
    memberLevels: function memberLevels() {
      return this.levels.length ? this.levels : this.storedLevels;
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

module.exports = "<div class=\"subscription-menu container\">\n  <transition-group name=\"fade-in\">\n    <template v-if=\"selectedLevel\">\n      <h2 class=\"message\">Confirm Order</h2>\n      <div class=\"row\">\n        <div class=\"col-8\">{{ selectedLevel.name }}</div>\n        <!-- TODO: expires -->\n        <div class=\"col-4\">{{ selectedLevel.price }}</div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-4\"></div>\n        <div class=\"col-4\">\n          <a class=\"cancel\" href=\"#\" @click.stop=\"unsetLevel\">go back</a>\n        </div>\n        <div class=\"col-4\">\n          <router-link\n            :to=\"{ name:'membership-checkout', query: {\n                   level: selectedLevel.id,\n                   'submit-checkout': 1,\n                   checkjavascript: 1,\n                   javascriptok: 1\n                 }}\"\n            class=\"submit confirm checkout paypal paypal-express\"\n            target=\"_blank\">checkout</router-link>\n        </div>\n      </div>\n    </template>\n    <template v-else>\n      <div v-for=\"level in memberLevels\" :key=\"level.id\"\n           class=\"member-level col-12 col-md-4\">\n        <h4>{{ level.name }}</h4>\n        <div class=\"description\">{{ level.description }}</div>\n        <div class=\"price\">${{ level.billing_amount }}</div>\n        <div v-if=\"user.membership.id == level.id\" class=\"selected\">\n          expires {{ user.membership.expires }}\n        </div>\n        <div v-else class=\"buy\">\n          <!-- <router-link :to=\"'/members/signup/' + level.id\"></router-link> -->\n          <a href=\"#\" @click.stop=\"setLevel( level.id )\">{{\n              user.membership ? 'switch' : 'sign up'\n            }}</a>\n        </div>\n      </div>\n    </template>\n  </transition-group>\n</div>\n";

/***/ })

}]);
//# sourceMappingURL=25.js.map