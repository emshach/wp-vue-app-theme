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
      default: "transparent"
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
      sliding: null // options: {
      //   pagination: {
      //     direction: 'horizontal',
      //     el: '.swiper-pagination',
      //     speed: 15000,
      //     loop: true
      //   }
      // }

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

module.exports = "<vue-carousel :autoplay=\"true\" :per-page=\"1\" :autoplay-timeout=\"15000\">\n  <vue-slide v-for=\"( slide, index ) in slides\" :key=\"slide.id\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-6\">\n          <template v-if=\"slide.post_type == 'attachment'\">\n            <img v-if=\"slide.media_type == 'image'\" :src=\"slide.source_url\"\n                 class=\"media\" />\n            <video v-else-if=\"slide.mime_type.indexOf( 'video' ) == 0\"\n                   :src=\"slide.source_url\" class=\"media\" controls>\n              {{ slide.alt_text }}\n            </video>\n          </template>\n        </div>\n        <div class=\"col-6\">\n          <h2 v-html=\"slide.title.rendered\"></h2>\n          <div v-if=\"slide.excerpt\" class=\"excerpt\"\n               v-html=\"slide.excerpt.rendered\"></div>\n          <div v-if=\"slide.description\" class=\"description\"\n               v-html=\"slide.description.rendered\"></div>\n          <div v-else-if=\"slide.caption\" class=\"caption\"\n               v-html=\"slide.caption.rendered\"></div>\n          <router-link v-if=\"slide.read_more\"\n                       :to=\"slide.full_content.path\"\n                       class=\"read-more\">read_more</router-link>\n          <router-link v-else-if=\"slide.full_content\"\n                       :to=\"slide.full_content.path\"\n                       class=\"watch-now\">watch now</router-link>\n        </div>\n        <!-- TODO: if paid content, this link should be different, maybe it's\n             own component -->\n      </div>\n    </div>\n  </vue-slide>\n  <vue-slide v-if=\"slides.length == 0\">\n    <flower-spinner :animation-duration=\"2500\" :size=\"70\" color=\"#025\">\n    </flower-spinner>\n  </vue-slide>\n</vue-carousel>\n";

/***/ })

}]);
//# sourceMappingURL=3.js.map