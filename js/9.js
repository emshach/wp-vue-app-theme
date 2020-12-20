(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./js/components/home/index.js":
/*!*************************************!*\
  !*** ./js/components/home/index.js ***!
  \*************************************/
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
  template: __webpack_require__(/*! ./template.html */ "./js/components/home/template.html"),
  data: function data() {
    return {
      sstate: _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state,
      promos: [],
      latest: [],
      trending: [],
      recent: [],
      history: [],
      discovery: [],
      favs: [],
      img: '',
      title: '',
      show: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    document.title = he__WEBPACK_IMPORTED_MODULE_3___default.a.decode(this.sstate.site.title);

    _lib_wpapix__WEBPACK_IMPORTED_MODULE_1__["default"].then(function (wpapix) {
      var path = new wpapix.Path();
      path.fetch().done(function (rpost) {
        console.log('got home page', rpost);
        _this.title = rpost.title.rendered;
        _this.img = rpost.background_image || '';
        window.setTimeout(function () {
          _this.promos = rpost.promo_reel || [];
        }, 4000);
      });
    });

    this.$nextTick(function () {
      _lib_scroll_header__WEBPACK_IMPORTED_MODULE_2__["default"].init('#masthead', "#featured,#app>.page>.featured-outer");
    });
  },
  updated: function updated() {
    this.$nextTick(function () {
      _lib_scroll_header__WEBPACK_IMPORTED_MODULE_2__["default"].init('#masthead', "#featured,#app>.page>.featured-outer");
    });
  },
  methods: {
    showImg: function showImg() {
      this.show = true;
    }
  },
  computed: {
    user: function user() {
      return this.sstate.user;
    },
    isSubscriber: function isSubscriber() {
      return this.user && (!this.user.as || this.user.as.subscriber) && this.user.membership;
    }
  }
});

/***/ }),

/***/ "./js/components/home/template.html":
/*!******************************************!*\
  !*** ./js/components/home/template.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"home page\">\n  <div id=\"bg-image-wrapper\">\n    <transition name=\"fade-in\">\n      <img id=\"bg-image\" :src=\"img\" @load=\"showImg\" v-show=\"show\"/>\n    </transition>\n  </div>\n  <jln-link></jln-link>\n  <down-arrow></down-arrow>\n  <div class=\"featured-outer\">\n    <transition name=\"fade-slow\" appear>\n      <div v-if=\"promos.length\" class=\"featured-wrapper\" key=\"featured\">\n        <mrk-carousel id=\"featured\"\n                      :slides=\"promos\"></mrk-carousel>\n      </div>\n    </transition>\n  </div>\n\n  <main role=\"main\">\n    <h1 class=\"title\">{{ title }}</h1>\n    <content-list title=\"latest\" :contents=\"latest\"></content-list>\n    <filmstrip title=\"trending\" :contents=\"trending\"></filmstrip>\n    <filmstrip title=\"recent activity\" :contents=\"recent\"></filmstrip>\n    <filmstrip title=\"pull up\" :contents=\"history\"></filmstrip>\n    <filmstrip title=\"you might like\" :contents=\"discovery\"></filmstrip>\n    <filmstrip title=\"my faves\" :contents=\"favs\"></filmstrip>\n  </main>\n  <wp-footer></wp-footer>\n</div>\n";

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
          top: -$head.innerHeight() + 40
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