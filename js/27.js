(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[27],{

/***/ "./js/components/the-loop/index.js":
/*!*****************************************!*\
  !*** ./js/components/the-loop/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/the-loop/template.html"),
  props: ['posts', 'pagers']
});

/***/ }),

/***/ "./js/components/the-loop/template.html":
/*!**********************************************!*\
  !*** ./js/components/the-loop/template.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div><!--div wrapper-->\n  <div v-if=\"posts.length > 0\">\n    <!--loop starts here-->\n    <ul class=\"the-loop\">\n      <li v-for=\"post in posts\">\n        <div class=\"title\">\n          <router-link v-bind:to=\"{ name: 'post', params: { slug: post.slug }}\">\n            {{post.title.rendered}}\n          </router-link>\n        </div>\n        <div class=\"meta\">\n          Categories:\n          <router-link v-for=\"(cat, index) in post.cats\" :key=\"cat.id\"\n                       :to=\"{name:'category', params: { category: cat.slug }}\">\n            {{ cat.name }}<span v-if=\"index < post.cats.length - 1\">,&nbsp;</span>\n          </router-link>\n        </div>\n        <div class=\"excerpt\" v-html=\"post.excerpt.rendered\"></div>\n      </li>\n    </ul>\n    <!--the loop ends-->\n    <!--paging starts here-->\n    <ul v-if=\"pagers.length > 1\" class=\"pagination\">\n      <li v-for=\"(pager,index) in pagers\" class=\"page-item\">\n        <router-link class=\"page-link\"\n                     v-bind:to=\"{path:$route.fullPath, query: {page : pager}}\">\n          {{pager}}\n        </router-link>\n      </li>\n    </ul>\n    <!--paging ends-->\n  </div><!--end v-if-->\n  <div v-else>\n    <nopost></nopost>\n  </div>\n</div><!--end div wrapper-->\n\n";

/***/ })

}]);
//# sourceMappingURL=27.js.map