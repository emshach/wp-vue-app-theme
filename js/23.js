(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[23],{

/***/ "./js/components/wp-header/index.js":
/*!******************************************!*\
  !*** ./js/components/wp-header/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/wp-header/template.html"),
  data: function data() {
    return {
      pages: []
    };
  },
  mounted: function mounted() {
    var _this = this;

    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/wp-json/wp/v2/pages?per_page=5').then(function (response) {
      _this.pages = response.data;
    }).catch(function (error) {
      console.log(error);
    });
  }
});

/***/ }),

/***/ "./js/components/wp-header/template.html":
/*!***********************************************!*\
  !*** ./js/components/wp-header/template.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header>\n  <div class=\"container-fluid top-nav\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <nav class=\"nav\">\n          <router-link class=\"nav-link\" to=\"/\">Home</router-link>\n          <router-link class=\"nav-link\"\n                       :to=\"{path:'/blog/',name:'blog'}\" >Blog</router-link>\n          <router-link class=\"nav-link\"\n                       v-for=\"(page, key, index) in pages\"\n                       :to=\"{ name: 'page', params: { slug: page.slug }}\"\n                       :key=\"key\">\n            {{page.title.rendered}}\n          </router-link>\n        </nav>\n      </div>\n    </div>\n  </div>\n  <div class=\"container-fluid main-header\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-lg-8\">\n          <router-link class=\"blogname\" to=\"/\">{{this.$root.bloginfo.name}}</router-link>\n          <p>{{this.$root.bloginfo.description}}</p>\n        </div>\n        <div class=\"col-lg-2\"></div>\n        <div class=\"col-lg-2 search-wrapper\">\n          <search-form></search-form>\n        </div>\n      </div>\n    </div>\n  </div>\n</header>\n";

/***/ })

}]);
//# sourceMappingURL=23.js.map