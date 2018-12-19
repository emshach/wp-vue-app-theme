(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

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
      promos: [],
      latest: [],
      trending: [],
      recent: [],
      history: [],
      discovery: [],
      favs: [],
      img: '',
      title: '',
      show: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    wp.api.loadPromise.done(function () {
      var path = new wp.api.models.Path();
      console.log('path object', path);
      path.fetch().done(function (rpost) {
        console.log('got home page', rpost);
        _this.title = rpost.title.rendered;
        _this.img = rpost.background_image || '';
        _this.promos = rpost.promo_reel || [];
      });
    });
  },
  methods: {
    showImg: function showImg() {
      this.show = true;
    }
  }
});

/***/ }),

/***/ "./js/components/home/template.html":
/*!******************************************!*\
  !*** ./js/components/home/template.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"home page\">\n  <div id=\"bg-image-wrapper\">\n    <transition name=\"fade\">\n      <img id=\"bg-image\" :src=\"img\" @load=\"showImg\" v-show=\"show\"/>\n    </transition>\n  </div>\n  <wp-header></wp-header>\n  <div class=\"featured-wrapper\">\n    <transition name=\"fade-in\">\n      <mrk-carousel v-if=\"promos.length\" id=\"featured\"\n                    :slides=\"promos\"></mrk-carousel>\n    </transition>\n  </div>\n\n  <main role=\"main\">\n    <h1 class=\"title\">{{ title }}</h1>\n    <content-list title=\"latest\" :contents=\"latest\"></content-list>\n    <filmstrip title=\"trending\" :contents=\"trending\"></filmstrip>\n    <filmstrip title=\"recent activity\" :contents=\"recent\"></filmstrip>\n    <filmstrip title=\"pull up\" :contents=\"history\"></filmstrip>\n    <filmstrip title=\"you might like\" :contents=\"discovery\"></filmstrip>\n    <filmstrip title=\"my faves\" :contents=\"favs\"></filmstrip>\n  </main>\n  <wp-footer></wp-footer>\n</div>\n";

/***/ })

}]);
//# sourceMappingURL=8.js.map