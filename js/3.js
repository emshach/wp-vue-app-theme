(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

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
    slides: {
      type: Array,
      default: function _default() {
        return [];
      }
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
    getSlides: function getSlides() {
      if (!this.slides.length && this.topic) {// TODO: search using topic, get posts
      }
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

module.exports = "<b-carousel :id=\"id\"\n            controls\n            indicators\n            :background=\"background\"\n            :interval=\"interval\">\n  <b-carousel-slide v-for=\"( slide, index ) in slides\"\n                    :key=\"slide.id\"\n                    :text=\"slide.text\"\n                    :img-src=\"slide.src\"\n                    :caption=\"slide.caption\">\n    <h2>{{{ slide.title.rendered }}}</h2>\n    <img v-if=\"slide.media_type == 'image'\" :src=\"slide.source_url\" />\n    <video v-else-if\"slide.mime_type.indexOf( 'video' ) == 0\"\n           :src=\"slide.source_url\" controls>\n      {{ slide.alt_text }}\n    </video>\n    <div v-if=\"slide.caption\" class=\"caption\">\n      {{{ slide.caption.rendered }}}\n    </div>\n    <div v-if=\"slide.description\" class=\"description\">\n      {{{ slide.description.rendered }}}\n    </div>\n    <router-link v-if=\"slide.full_content\" :to=\"slide.full_content.path\"\n                 class=\"watch-now\">watch now</router-link>\n    <!-- TODO: if paid content, this link should be different, maybe it's own\n         component -->\n  </b-carousel-slide>\n  <b-carousel-slide v-if=\"slides.length == 0\">\n    <flower-spinner :animation-duration=\"2500\" :size=\"70\" color=\"#025\">\n    </flower-spinner>\n  </b-carousel-slide>\n</b-carousel>\n";

/***/ })

}]);
//# sourceMappingURL=3.js.map