(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./js/components/login/index.js":
/*!**************************************!*\
  !*** ./js/components/login/index.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/store */ "./js/lib/store.js");
/* harmony import */ var _lib_wpapix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/wpapix */ "./js/lib/wpapix.js");
/* harmony import */ var _lib_scroll_header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/scroll-header */ "./js/lib/scroll-header.js");
/* harmony import */ var he__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! he */ "./node_modules/he/he.js");
/* harmony import */ var he__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(he__WEBPACK_IMPORTED_MODULE_3__);




/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/login/template.html"),
  props: {
    then: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      sstate: _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state,
      img: '',
      title: '',
      show: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    document.title = he__WEBPACK_IMPORTED_MODULE_3___default.a.decode(this.sstate.site.title);

    _lib_wpapix__WEBPACK_IMPORTED_MODULE_1__["default"].then(function (wpapix) {
      var path = new wpapix.Path({
        path: 'login'
      });
      path.fetch().done(function (rpost) {
        console.log('got home page', rpost);
        _this.title = rpost.title.rendered;
        _this.img = rpost.background_image || '';
      });
    });

    this.$nextTick(function () {
      _lib_scroll_header__WEBPACK_IMPORTED_MODULE_2__["default"].init('#masthead', "#featured,#app>.page>.featured-outer");
    });
  },
  methods: {
    showImg: function showImg() {
      this.show = true;
    }
  }
});

/***/ }),

/***/ "./js/components/login/template.html":
/*!*******************************************!*\
  !*** ./js/components/login/template.html ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"login page\">\n  <div id=\"bg-image-wrapper\">\n    <transition name=\"fade-in\">\n      <img id=\"bg-image\" :src=\"img\" @load=\"showImg\" v-show=\"show\"/>\n    </transition>\n  </div>\n  <div class=\"featured-outer small\"></div>\n\n  <main role=\"main\">\n    <h1 class=\"title\">{{ title }}</h1>\n    <login-form :redirect=\"then\"></login-form>\n    <div v-if=\"then\" class=\"message\">Please log in or sign up to access that\n      page/content.</div>\n  </main>\n  <wp-footer></wp-footer>\n</div>\n";

/***/ }),

/***/ "./js/lib/scroll-header.js":
/*!*********************************!*\
  !*** ./js/lib/scroll-header.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var ScrollHeader = {
  last_scroll: 0,
  scroll_dir: 'none'
};

(function ($) {
  ScrollHeader.init = function (header, container) {
    var _ = ScrollHeader;
    var $el = $("#app>.page");
    _.last_scroll = $el.scrollTop();
    $el.off('scroll');
    $el.on('scroll', function (e) {
      var last = _.last_scroll;
      var dir = _.scroll_dir;
      var cur = _.last_scroll = $el.scrollTop();
      var $head = $(header);

      if (last < cur) {
        if (dir != (_.scroll_dir = 'down')) $head.stop().animate({
          top: -$head.innerHeight() - 10
        }, 'slow');
      } else if (last > cur) {
        if (dir != (_.scroll_dir = 'up')) $head.stop().animate({
          top: 0
        }, 'slow');
      } else _.scroll_dir = 'none';

      var topH = $(container).innerHeight() - $head.innerHeight() + 20;
      if (cur > topH) $head.removeClass('mrk-bg-clear').addClass('mrk-bg-dark');else $head.removeClass('mrk-bg-dark').addClass('mrk-bg-clear');
    });
  };

  ScrollHeader.destroy = function () {
    $("#app>.page").off('scroll');
  };
})(jQuery);

/* harmony default export */ __webpack_exports__["default"] = (ScrollHeader);

/***/ })

}]);
//# sourceMappingURL=9.js.map