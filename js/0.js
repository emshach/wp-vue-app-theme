(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./js/components/nav-menu/index.js":
/*!*****************************************!*\
  !*** ./js/components/nav-menu/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_nav_slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/nav-slider */ "./js/lib/nav-slider.js");
/* harmony import */ var _lib_nav_slider__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_nav_slider__WEBPACK_IMPORTED_MODULE_0__);

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
    }
  },
  mounted: function mounted() {
    _lib_nav_slider__WEBPACK_IMPORTED_MODULE_0___default.a.init();
  },
  updated: function updated() {
    _lib_nav_slider__WEBPACK_IMPORTED_MODULE_0___default.a.init();
  }
});

/***/ }),

/***/ "./js/components/nav-menu/template.html":
/*!**********************************************!*\
  !*** ./js/components/nav-menu/template.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"header-menu\" class=\"header-menu\">\n  <div id=\"feature-tray\"><div id=\"feature-tray-inner\"></div></div>\n  <!-- nav -->\n  <nav id=\"main-nav\" class=\"nav main-nav\" role=\"navigation\">\n    <div class=\"container\">\n      <div id=\"bg-nav\"></div>\n      <button class=\"menu-toggle toggle-mobile nav-menu\" type=\"button\"\n              data-toggle=\"collapse\" data-target=\"#menu-nav\"\n              aria-controls=\"menu-nav\" aria-expanded=\"false\"\n              aria-label=\"Toggle Navigation\">\n        <span class=\"navbar-toggle-icon\" aria-hidden=\"true\">Menu</span>\n      </button>\n      <router-link class=\"navbar-brand\" to=\"/\">\n        <!-- mobile logo -->\n        <img :src=\"logo\" alt=\"Logo\" class=\"logo-img mobile-logo\"/>\n        <!-- /mobile logo -->\n        <!-- mobile site title -->\n        <h1 class=\"site-title\">{{ title }}</h1>\n        <!-- /mobile site title -->\n      </router-link>\n      <div id=\"nav-main-container\" class=\"menu-nav-container\">\n        <ul class=\"menu primary-menu nav navbar-nav collapse\">\n          <li v-for=\"( item, index ) in menu\" :key=\"index\" class=\"menu-item\">\n            <router-link :to=\"item.url\">\n              <img :src=\"item.thumb\" />\n              <span class=\"text\">{{ item.title }}</span>\n            </router-link>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </nav>\n  <!-- /nav -->\n</div>\n";

/***/ }),

/***/ "./js/lib/nav-slider.js":
/*!******************************!*\
  !*** ./js/lib/nav-slider.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /home/rain/projects/web/wordpress/themes/wp-vue-app-theme/js/lib/nav-slider.js: Unexpected token, expected \",\" (144:1)\n\n\u001b[0m \u001b[90m 142 | \u001b[39m    })\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 143 | \u001b[39m  })\u001b[33m;\u001b[39m                           \u001b[90m// TODO: unbind if < 600px\u001b[39m\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 144 | \u001b[39m})( jQuery )\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m     | \u001b[39m \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 145 | \u001b[39m  }\u001b[0m\n\u001b[0m \u001b[90m 146 | \u001b[39m}\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 147 | \u001b[39m\u001b[0m\n    at Parser.raise (/home/rain/projects/web/wordpress/themes/wp-vue-app-theme/node_modules/@babel/parser/lib/index.js:4028:15)\n    at Parser.unexpected (/home/rain/projects/web/wordpress/themes/wp-vue-app-theme/node_modules/@babel/parser/lib/index.js:5359:16)\n    at Parser.expect (/home/rain/projects/web/wordpress/themes/wp-vue-app-theme/node_modules/@babel/parser/lib/index.js:5347:28)\n    at Parser.parseObj (/home/rain/projects/web/wordpress/themes/wp-vue-app-theme/node_modules/@babel/parser/lib/index.js:6838:14)\n    at Parser.parseExprAtom (/home/rain/projects/web/wordpress/themes/wp-vue-app-theme/node_modules/@babel/parser/lib/index.js:6464:21)\n    at Parser.parseExprSubscripts (/home/rain/projects/web/wordpress/themes/wp-vue-app-theme/node_modules/@babel/parser/lib/index.js:6081:21)\n    at Parser.parseMaybeUnary (/home/rain/projects/web/wordpress/themes/wp-vue-app-theme/node_modules/@babel/parser/lib/index.js:6060:21)\n    at Parser.parseExprOps (/home/rain/projects/web/wordpress/themes/wp-vue-app-theme/node_modules/@babel/parser/lib/index.js:5945:21)\n    at Parser.parseMaybeConditional (/home/rain/projects/web/wordpress/themes/wp-vue-app-theme/node_modules/@babel/parser/lib/index.js:5917:21)\n    at Parser.parseMaybeAssign (/home/rain/projects/web/wordpress/themes/wp-vue-app-theme/node_modules/@babel/parser/lib/index.js:5864:21)\n    at Parser.parseExportDefaultExpression (/home/rain/projects/web/wordpress/themes/wp-vue-app-theme/node_modules/@babel/parser/lib/index.js:8592:22)\n    at Parser.parseExport (/home/rain/projects/web/wordpress/themes/wp-vue-app-theme/node_modules/@babel/parser/lib/index.js:8532:31)\n    at Parser.parseStatementContent (/home/rain/projects/web/wordpress/themes/wp-vue-app-theme/node_modules/@babel/parser/lib/index.js:7565:27)\n    at Parser.parseStatement (/home/rain/projects/web/wordpress/themes/wp-vue-app-theme/node_modules/@babel/parser/lib/index.js:7478:17)\n    at Parser.parseBlockOrModuleBlockBody (/home/rain/projects/web/wordpress/themes/wp-vue-app-theme/node_modules/@babel/parser/lib/index.js:8046:23)\n    at Parser.parseBlockBody (/home/rain/projects/web/wordpress/themes/wp-vue-app-theme/node_modules/@babel/parser/lib/index.js:8033:10)\n    at Parser.parseTopLevel (/home/rain/projects/web/wordpress/themes/wp-vue-app-theme/node_modules/@babel/parser/lib/index.js:7443:10)\n    at Parser.parse (/home/rain/projects/web/wordpress/themes/wp-vue-app-theme/node_modules/@babel/parser/lib/index.js:8876:17)\n    at parse (/home/rain/projects/web/wordpress/themes/wp-vue-app-theme/node_modules/@babel/parser/lib/index.js:10907:38)\n    at parser (/home/rain/projects/web/wordpress/themes/wp-vue-app-theme/node_modules/@babel/core/lib/transformation/normalize-file.js:170:34)\n    at normalizeFile (/home/rain/projects/web/wordpress/themes/wp-vue-app-theme/node_modules/@babel/core/lib/transformation/normalize-file.js:138:11)\n    at runSync (/home/rain/projects/web/wordpress/themes/wp-vue-app-theme/node_modules/@babel/core/lib/transformation/index.js:44:43)\n    at runAsync (/home/rain/projects/web/wordpress/themes/wp-vue-app-theme/node_modules/@babel/core/lib/transformation/index.js:35:14)\n    at process.nextTick (/home/rain/projects/web/wordpress/themes/wp-vue-app-theme/node_modules/@babel/core/lib/transform.js:34:34)\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ })

}]);
//# sourceMappingURL=0.js.map