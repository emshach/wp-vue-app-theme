(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ "./js/components/nav-menu/index.js":
/*!*****************************************!*\
  !*** ./js/components/nav-menu/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/nav-menu/template.html"),
  props: {
    menu: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    logo: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    url: {
      type: String,
      default: ""
    }
  }
});

/***/ }),

/***/ "./js/components/nav-menu/template.html":
/*!**********************************************!*\
  !*** ./js/components/nav-menu/template.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"header-menu\" class=\"header-menu\">\n  <div id=\"feature-tray\"><div id=\"feature-tray-inner\"></div></div>\n  <!-- nav -->\n  <nav id=\"main-nav\" class=\"nav main-nav\" role=\"navigation\">\n    <div class=\"container\">\n      <div id=\"bg-nav\"></div>\n      <button class=\"menu-toggle toggle-mobile nav-menu\" type=\"button\"\n              data-toggle=\"collapse\" data-target=\"#menu-nav\"\n              aria-controls=\"menu-nav\" aria-expanded=\"false\"\n              aria-label=\"Toggle Navigation\">\n        <span class=\"navbar-toggle-icon\" aria-hidden=\"true\">Menu</span>\n      </button>\n      <router-link class=\"navbar-brand\" :to=\"url\">\n        <!-- mobile logo -->\n        <img :src=\"logo\" alt=\"Logo\" class=\"logo-img mobile-logo\"/>\n        <!-- /mobile logo -->\n        <!-- mobile site title -->\n        <h1 class=\"site-title\">{{ title }}</h1>\n        <!-- /mobile site title -->\n      </router-link>\n      <div id=\"nav-main-container\" class=\"menu-nav-container\">\n        <ul class=\"menu primary-menu nav navbar-nav collapse\">\n          <li v-for=\"( item, index ) in menu\" :key=\"index\" class=\"menu-item\">\n            <router-link :to=\"item.url\">\n              <img :src=\"item.thumb\" />\n              <span class=\"text\">{{ item. }}</span>\n            </router-link>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </nav>\n  <!-- /nav -->\n</div>\n";

/***/ })

}]);
//# sourceMappingURL=12.js.map