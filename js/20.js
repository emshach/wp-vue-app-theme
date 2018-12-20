(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[20],{

/***/ "./js/components/release/index.js":
/*!****************************************!*\
  !*** ./js/components/release/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/release/template.html"),
  props: ['post'],
  data: function data() {
    return {
      img: '',
      show: false,
      prev: 0,
      next: 0,
      content: '',
      views: 0,
      likes: 0,
      dislikes: 0
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

/***/ "./js/components/release/template.html":
/*!*********************************************!*\
  !*** ./js/components/release/template.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "";

/***/ })

}]);
//# sourceMappingURL=20.js.map