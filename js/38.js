(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[38],{

/***/ "./js/components/wp-header/index.js":
/*!******************************************!*\
  !*** ./js/components/wp-header/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/store */ "./js/lib/store.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/wp-header/template.html"),
  data: function data() {
    return {
      sstate: _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state,
      title: '',
      description: '',
      logo: ''
    };
  },
  mounted: function mounted() {
    this.title = this.sstate.site.title || '';
    this.description = this.sstate.site.description || '';
    this.logo = this.sstate.site.logo || '';
  },
  computed: {
    user: function user() {
      return this.sstate.user;
    },
    isSubscriber: function isSubscriber() {
      return this.user && (!this.user.as || this.user.as.subscriber) && this.user.membership;
    },
    isMembersRoute: function isMembersRoute() {
      return this.$route.name == 'login' || this.$route.name && this.$route.name.indexOf('members') == 0;
    }
  }
});

/***/ }),

/***/ "./js/components/wp-header/template.html":
/*!***********************************************!*\
  !*** ./js/components/wp-header/template.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header id=\"masthead\" class=\"header clear\">\n  <div id=\"banner-notices\"></div>\n  <div class=\"action-bar\">\n    <b-btn v-if=\"!isSubscriber && !isMembersRoute\" class=\"member-cta\"\n           variant=\"warning\" to=\"/members\">Become A VIP Today!</b-btn>\n    <view-switcher></view-switcher>\n    <user-block></user-block>\n    <search-form></search-form>\n  </div>\n  <nav v-if=\"sstate.menus.site\" class=\"site-menu\">\n    <router-link\n      v-for=\"item in sstate.menus.site\" :key=\"item.id\"\n      :to=\"item.url\" v-html=\"item.title\"></router-link></nav>\n  <div id=\"site-brand\">\n    <div class=\"logo\">\n      <router-link to=\"/\"><img :src=\"logo\" class=\"logo-img\"/></router-link>\n    </div>\n    <h1 class=\"site-title\"><router-link to=\"/\">{{ title }}</router-link></h1>\n    <p class=\"site-description\">{{ description }}</p>\n  </div>\n</header>\n";

/***/ })

}]);
//# sourceMappingURL=38.js.map