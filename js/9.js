(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./js/components/members/index.js":
/*!****************************************!*\
  !*** ./js/components/members/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/store */ "./js/lib/store.js");
/* harmony import */ var _lib_scroll_header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/scroll-header */ "./js/lib/scroll-header.js");
/* harmony import */ var _lib_wpapix__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/wpapix */ "./js/lib/wpapix.js");
/* harmony import */ var he__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! he */ "./node_modules/he/he.js");
/* harmony import */ var he__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(he__WEBPACK_IMPORTED_MODULE_3__);




/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/members/template.html"),
  data: function data() {
    return {
      sstate: _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state,
      storedPost: {},
      promos: [],
      show: false,
      scrollheader: null
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.storedPost = Object.assign({}, this.sstate.nextpost);

    _lib_wpapix__WEBPACK_IMPORTED_MODULE_2__["default"].then(function (wpapix) {
      var path = new wpapix.Path({
        path: '/members'
      });
      console.log('path object', path);
      path.fetch().done(function (rpost) {
        console.log('got members page', rpost);
        _this.storedPost = rpost;
        document.title = he__WEBPACK_IMPORTED_MODULE_3___default.a.decode(rpost.title.rendered + ' | ' + _this.sstate.site.title);
        window.setTimeout(function () {
          _this.promos = rpost.promo_reel || [];
        }, 3000);
      });
    });

    window.setTimeout(function () {
      _this.scrollheader = _lib_scroll_header__WEBPACK_IMPORTED_MODULE_1__["default"];
      _lib_scroll_header__WEBPACK_IMPORTED_MODULE_1__["default"].init('#masthead', "#featured,#app>.page>.featured-outer");
    }, 500);
  },
  updated: function updated() {
    document.title = he__WEBPACK_IMPORTED_MODULE_3___default.a.decode(this.title + ' | ' + this.sstate.site.title);
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
    promo_reel: function promo_reel() {
      return this.postData.promo_reel || [];
    },
    content: function content() {
      var user = this.sstate.user;
      if (this.postData.member_content && (user.as ? user.as.subscriber : user.membership)) return this.postData.member_content;
      return this.postData.content && this.postData.content.rendered || '';
    },
    user: function user() {
      return this.sstate.user;
    },
    classes: function classes() {
      return {
        small: !this.promos.length
      };
    }
  }
});

/***/ }),

/***/ "./js/components/members/template.html":
/*!*********************************************!*\
  !*** ./js/components/members/template.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"members post page\" :key=\"postData.id\">\n  <div id=\"bg-image-wrapper\">\n    <transition name=\"fade-in\" appear>\n      <img id=\"bg-image\" :src=\"img\" :key=\"img\" @load=\"showImg\" v-show=\"show\"/>\n    </transition>\n  </div>\n  <down-arrow></down-arrow>\n  <div class=\"featured-outer\" :class=\"classes\">\n    <transition name=\"fade-in\">\n      <div v-if=\"promos.length\" class=\"featured-wrapper\">\n        <mrk-carousel id=\"featured\" :slides=\"promos\"></mrk-carousel>\n      </div>\n    </transition>\n  </div>\n\n  <main role=\"main\">\n    <h1 class=\"title\" v-html=\"title\"></h1>\n    <section class=\"description\" v-html=\"content\"></section>\n    <section class=\"subscriptions\">\n      <subscription-menu\n        v-if=\"user && (!user.as || user.as.subscriber) && user.membership\"\n        :target=\"postData.path\">\n        Change your subscription plan below.\n      </subscription-menu>\n      <subscription-menu v-else :target=\"postData.path\">\n        Select one of the subscription plans to become a member.\n      </subscription-menu>\n    </section>\n  </main>\n  <wp-footer></wp-footer>\n</div>\n";

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