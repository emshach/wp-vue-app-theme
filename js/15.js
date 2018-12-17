(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

/***/ "./js/components/post/index.js":
/*!*************************************!*\
  !*** ./js/components/post/index.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
    }
  },
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
    var _this = this;

    wp.api.loadPromise.done(function () {
      var path = new wp.api.models.Path({
        path: _this.id || _this.path
      });
      path.fetch().done(function (rpost) {
        console.log('got post page', rpost);
        _this.title = rpost.title.rendered;
        _this.img = rpost.background_image || '';
        _this.promos = rpost.promo_reel || [];
        _this.content = rpost.content.rendered;
        if (!_this.promos.length) _this.classes.small = true;
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

/***/ "./js/components/post/template.html":
/*!******************************************!*\
  !*** ./js/components/post/template.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"post page\">\n  <div id=\"bg-image-wrapper\" :class=\"classes\">\n    <transition name=\"fade\">\n      <img id=\"bg-image\" :src=\"img\" @load=\"showImg\" v-show=\"show\"/>\n    </transition>\n  </div>\n  <wp-header></wp-header>\n  <div class=\"featured-wrapper\">\n    <transition name=\"fade\">\n      <mrk-carousel v-if=\"promos.length\" id=\"featured\"\n                    :slides=\"promos\"></mrk-carousel>\n    </transition>\n  </div>\n\n  <main role=\"main\">\n    <h1 class=\"title\">{{ title }}</h1>\n    <div class=\"content\" v-html=\"content\"></div>\n  </main>\n  <comments></comments>\n  <wp-footer></wp-footer>\n</div>\n";

/***/ })

}]);
//# sourceMappingURL=15.js.map