(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[18],{

/***/ "./js/components/program/index.js":
/*!****************************************!*\
  !*** ./js/components/program/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/program/template.html"),
  props: ['post'],
  data: function data() {
    return {
      img: '',
      show: false,
      promos: [],
      episodes: [],
      content: '',
      classes: {
        small: false
      }
    };
  },
  mounted: function mounted() {
    this.title = this.post.title.rendered;
    this.img = this.post.background_image || '';
    this.promos = this.post.promo_reel || [];
    this.episodes = this.post.releases || [];
    this.content = this.post.content.rendered;
    if (!this.promos.length) this.classes.small = true;
  },
  methods: {
    showImg: function showImg() {
      this.show = true;
    }
  }
});

/***/ }),

/***/ "./js/components/program/template.html":
/*!*********************************************!*\
  !*** ./js/components/program/template.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"post page\">\n  <div id=\"bg-image-wrapper\" :class=\"classes\">\n    <transition name=\"fade\">\n      <img id=\"bg-image\" :src=\"img\" @load=\"showImg\" v-show=\"show\"/>\n    </transition>\n  </div>\n  <wp-header></wp-header>\n  <div class=\"featured-wrapper\">\n    <transition name=\"fade\">\n      <mrk-carousel v-if=\"promos.length\" id=\"featured\"\n                    :slides=\"promos\"></mrk-carousel>\n    </transition>\n  </div>\n\n  <main role=\"main\">\n    <h1 class=\"title\">{{ title }}</h1>\n    <section class=\"content description\" v-html=\"content\"></section>\n    <section class=\"episodes\">\n      <b-card v-for=\"( episode, index ) in episodes\"></b-card>\n    </section>\n    <comments></comments>\n  </main>\n  <wp-footer></wp-footer>\n</div>\n";

/***/ })

}]);
//# sourceMappingURL=18.js.map