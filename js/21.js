(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[21],{

/***/ "./js/components/program/index.js":
/*!****************************************!*\
  !*** ./js/components/program/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/store */ "./js/lib/store.js");
/* harmony import */ var he__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! he */ "./node_modules/he/he.js");
/* harmony import */ var he__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(he__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/program/template.html"),
  props: ['post'],
  data: function data() {
    return {
      sstate: _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state,
      storedPost: {},
      show: false
    };
  },
  mounted: function mounted() {
    this.storedPost = Object.assign({}, this.sstate.nextpost);
    document.title = he__WEBPACK_IMPORTED_MODULE_1___default.a.decode(this.title + ' | ' + this.sstate.site.title);
  },
  updated: function updated() {
    document.title = he__WEBPACK_IMPORTED_MODULE_1___default.a.decode(this.title + ' | ' + this.sstate.site.title);
  },
  methods: {
    showImg: function showImg() {
      this.show = true;
    }
  },
  computed: {
    postData: function postData() {
      return this.post || this.storedPost;
    },
    title: function title() {
      return this.postData.title && this.postData.title.rendered || '';
    },
    img: function img() {
      return this.postData.background_image || '';
    },
    promos: function promos() {
      return this.postData.promo_reel || [];
    },
    episodes: function episodes() {
      return this.postData.releases || [];
    },
    archive: function archive() {
      return this.postData.archive || [];
    },
    content: function content() {
      return this.postData.content && this.postData.content.rendered || '';
    },
    classes: function classes() {
      return {
        small: !!this.promos.length
      };
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

module.exports = "<div class=\"program post page\" :key=\"postData.id\">\n  <div id=\"bg-image-wrapper\" :class=\"classes\">\n    <transition name=\"fade-in\" appear>\n      <img id=\"bg-image\" :src=\"img\" :key=\"img\" @load=\"showImg\" v-show=\"show\"/>\n    </transition>\n  </div>\n  <wp-header></wp-header>\n  <down-arrow></down-arrow>\n  <div class=\"featured-wrapper\">\n    <transition name=\"fade-in\">\n      <mrk-carousel v-if=\"promos.length\" id=\"featured\"\n                    :slides=\"promos\"></mrk-carousel>\n    </transition>\n  </div>\n\n  <main role=\"main\">\n    <h1 class=\"title\" v-html=\"title\"></h1>\n    <section class=\"description\"\n             v-html=\"content\"></section>\n    <!-- v-if=\"postData.promo_reel && postData.promo_reel.length\" -->\n    <content-section title=\"Programmes\" :episodes=\"episodes\"></content-section>\n    <content-section title=\"Frome the Archive\" :episodes=\"archive\"\n                     :show-empty=\"false\"></content-section>\n    <comments></comments>\n  </main>\n  <wp-footer></wp-footer>\n</div>\n";

/***/ })

}]);
//# sourceMappingURL=21.js.map