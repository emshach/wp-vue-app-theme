(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./js/components/carousel/index.js":
/*!*****************************************!*\
  !*** ./js/components/carousel/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/carousel/template.html"),
  props: ['topic', 'slides', 'id', 'background', 'interval'],
  data: function data() {
    return {
      background: '#00810',
      interval: 15000,
      loading: true,
      slide: 0,
      sliding: null
    };
  },
  methods: {
    onSlideStart: function onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd: function onSlideEnd(slide) {
      this.sliding = false;
    }
  }
});

/***/ }),

/***/ "./js/components/carousel/template.html":
/*!**********************************************!*\
  !*** ./js/components/carousel/template.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<b-carousel :id=\"id\"\n            controls\n            indicators\n            :background=\"background\"\n            :interval=\"interval\">\n  <b-carousel-slide v-for=\"( slide, index ) in slides\"\n                    :key=\"slide.id\"\n                    :text=\"slide.text\"\n                    :img-src=\"slide.src\"\n                    :caption=\"slide.caption\">{{ slide.html }}</b-carousel-slide>\n  <b-carousel-slide v-if=\"slides.length == 0\">\n    <flower-spinner :animation-duration=\"2500\" :size=\"70\" color=\"#025\">\n    </flower-spinner>\n  </b-carousel-slide>\n</b-carousel>\n";

/***/ })

}]);
//# sourceMappingURL=2.js.map