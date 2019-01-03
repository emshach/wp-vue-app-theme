(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[20],{

/***/ "./js/components/post/index.js":
/*!*************************************!*\
  !*** ./js/components/post/index.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/store */ "./js/lib/store.js");
/* harmony import */ var _lib_route_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/route-events */ "./js/lib/route-events.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/post/template.html"),
  props: {
    id: {
      type: Number,
      default: 0
    },
    path: {
      type: String,
      default: ''
    },
    post: {
      type: Object,
      default: function _default() {}
    }
  },
  beforeRouteUpdate: _lib_route_events__WEBPACK_IMPORTED_MODULE_1__["default"].toPath,
  data: function data() {
    return {
      img: '',
      show: false,
      promos: [],
      content: '',
      classes: {
        small: false
      }
    };
  },
  mounted: function mounted() {
    // wp.api.loadPromise.done(() => {
    //   var path = new wp.api.models.Path({ path: this.id || this.path });
    //   path.fetch().done( rpost => {
    //     console.log( 'got post page', rpost );
    if (!this.post) this.post = Object.assign({}, _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state.nextpost);
    this.title = this.post.title.rendered;
    this.img = this.post.background_image || '';
    this.promos = this.post.promo_reel || [];
    this.content = this.post.content.rendered;
    if (!this.promos.length) this.classes.small = true; //   });
    // });
  },
  methods: {
    showImg: function showImg() {
      this.show = true;
    }
  }
});

/***/ }),

/***/ "./js/components/post/template.html":
/*!******************************************!*\
  !*** ./js/components/post/template.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"post page\">\n  <div id=\"bg-image-wrapper\" :class=\"classes\">\n    <transition name=\"fade\">\n      <img id=\"bg-image\" :src=\"img\" @load=\"showImg\" v-show=\"show\"/>\n    </transition>\n  </div>\n  <wp-header></wp-header>\n  <div class=\"featured-wrapper\">\n    <transition name=\"fade\">\n      <mrk-carousel v-if=\"promos.length\" id=\"featured\"\n                    :slides=\"promos\"></mrk-carousel>\n    </transition>\n  </div>\n\n  <main role=\"main\">\n    <h1 class=\"title\">{{ title }}</h1>\n    <div class=\"content\" v-html=\"content\"></div>\n  </main>\n  <comments></comments>\n  <wp-footer></wp-footer>\n</div>\n";

/***/ })

}]);
//# sourceMappingURL=20.js.map