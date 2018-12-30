(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[31],{

/***/ "./js/components/view-switcher/index.js":
/*!**********************************************!*\
  !*** ./js/components/view-switcher/index.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/store */ "./js/lib/store.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/view-switcher/template.html"),
  data: function data() {
    return {
      user: {},
      viewingAs: 'admin'
    };
  },
  mounted: function mounted() {
    this.user = _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state.user;
  },
  methods: {
    setAs: function setAs(name) {
      var as = this.user.as;
      as.logged_in = as.subscriber = as.premium = as.admin = false;
      this.viewingAs = name;

      switch (name) {
        case 'admin':
          as.admin = true;

        case 'premium':
          as.premium = true;

        case 'subscriber':
          as.subscriber = true;

        case 'logged-in user':
          as.logged_in = true;
      }
    }
  }
});

/***/ }),

/***/ "./js/components/view-switcher/template.html":
/*!***************************************************!*\
  !*** ./js/components/view-switcher/template.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<b-dd id=\"view-switcher\" :text=\"'Viewing as ' + viewingAs\"\n      :class=\"{ hidden : !user.as }\">\n  <b-dd-item @click=\"setAs('public')\">public</b-dd-item>\n  <b-dd-item @click=\"setAs('logged-in user')\">logged-in user</b-dd-item>\n  <b-dd-item @click=\"setAs('subscriber')\">subscriber</b-dd-item>\n  <b-dd-item @click=\"setAs('admin')\">admin</b-dd-item>\n</b-dd>\n";

/***/ })

}]);
//# sourceMappingURL=31.js.map