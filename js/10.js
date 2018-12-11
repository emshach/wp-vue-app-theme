(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./js/components/home/index.js":
/*!*************************************!*\
  !*** ./js/components/home/index.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/store */ "./js/lib/store.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/home/template.html"),
  data: function data() {
    return {
      sstate: _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state,
      latest: [],
      trending: [],
      recent: [],
      history: [],
      discovery: [],
      favs: [],
      img: ''
    };
  },
  mounted: function mounted() {
    var self = this;
    wp.api.loadPromise.done(function () {
      var path = new wp.api.models.Path();
      console.log('path object', path);
      path.fetch().done(function (rpost) {
        console.log('got home page', rpost);
        path.getFeaturedMedia().done(function (rmedia) {
          console.log('media object', rmedia, rmedia.get('source_url'));
          self.img = rmedia.get('source_url');
        });
      });
    });
  }
});

/***/ }),

/***/ "./js/components/home/template.html":
/*!******************************************!*\
  !*** ./js/components/home/template.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"home page\">\n  <wp-header></wp-header>\n  <transition>\n    <img v-if=\"img\" :src=\"img\" style=\"min-width; 100%; min-height: 100%\"/>\n  </transition>\n  <div class=\"mh-100 mw-100\">\n    <div class=\"container\">\n      <carousel id=\"hero\" topic=\"featured\"></carousel>\n    </div>\n  </div>\n\n  <div class=\"container\">\n    <div class=\"row\">\n      <content-list title=\"latest\" :content=\"latest\"></content-list>\n    </div>\n    <div class=\"row\">\n      <filmstrip title=\"trending\" :content=\"trending\"></filmstrip>\n    </div>\n    <div class=\"row\">\n      <filmstrip title=\"recent activity\" :content=\"recent\"></filmstrip>\n    </div>\n    <div class=\"row\">\n      <filmstrip title=\"pull up\" :content=\"history\"></filmstrip>\n    </div>\n    <div class=\"row\">\n      <filmstrip title=\"you might like\" :content=\"discovery\"></filmstrip>\n    </div>\n    <div class=\"row\">\n      <filmstrip title=\"my faves\" :content=\"favs\"></filmstrip>\n    </div>\n  </div>\n  <carousel-nav></carousel-nav>\n  <wp-footer></wp-footer>\n</div>\n";

/***/ })

}]);
//# sourceMappingURL=10.js.map