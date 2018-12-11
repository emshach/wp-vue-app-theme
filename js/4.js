(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./js/components/carousel/index.js":
/*!*****************************************!*\
  !*** ./js/components/carousel/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var carousels = 0;
/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/carousel/template.html"),
  props: {
    topic: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: function _default() {
        return "carusel-" + ++carousels;
      }
    },
    background: {
      type: String,
      default: "#000810"
    },
    interval: {
      type: Number,
      default: 15000
    }
  },
  data: function data() {
    return {
      loading: true,
      slides: [],
      slide: 0,
      sliding: null
    };
  },
  mounted: function mounted() {
    this.getSlides();
  },
  methods: {
    onSlideStart: function onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd: function onSlideEnd(slide) {
      this.sliding = false;
    },
    getSlides: function getSlides() {}
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
//# sourceMappingURL=4.js.map