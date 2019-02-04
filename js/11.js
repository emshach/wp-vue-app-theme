(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./js/components/program/index.js":
/*!****************************************!*\
  !*** ./js/components/program/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/store */ "./js/lib/store.js");
/* harmony import */ var _lib_scroll_header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/scroll-header */ "./js/lib/scroll-header.js");
/* harmony import */ var he__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! he */ "./node_modules/he/he.js");
/* harmony import */ var he__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(he__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/program/template.html"),
  props: ['post'],
  data: function data() {
    return {
      sstate: _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state,
      storedPost: {},
      promos: [],
      show: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.storedPost = Object.assign({}, this.sstate.nextpost);
    document.title = he__WEBPACK_IMPORTED_MODULE_2___default.a.decode(this.title + ' | ' + this.sstate.site.title);
    window.setTimeout(function () {
      _this.promos = _this.promo_reel;
    }, 1500);
    this.$nextTick(function () {
      _lib_scroll_header__WEBPACK_IMPORTED_MODULE_1__["default"].init('#masthead', "#featured,#app>.page>.featured-outer");
    });
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
    episodes: function episodes() {
      return this.postData.releases || [];
    },
    episodesTitle: function episodesTitle() {
      return this.postData.title_releases || 'Programmes';
    },
    archives: function archives() {
      return this.postData.archives || [];
    },
    archivesTitle: function archivesTitle() {
      return this.postData.title_archives || 'From the Archives';
    },
    content: function content() {
      var user = this.sstate.user;
      if (this.postData.member_content && (user.as ? user.as.subscriber : user.membership)) return this.postData.member_content;
      return this.postData.content && this.postData.content.rendered || '';
    },
    classes: function classes() {
      return {
        small: !this.promos.length
      };
    }
  },
  watch: {
    $route: function $route(to, from) {
      var _this2 = this;

      this.promos = [];
      this.storedPost = Object.assign({}, this.sstate.nextpost);
      document.title = he__WEBPACK_IMPORTED_MODULE_2___default.a.decode(this.title + ' | ' + this.sstate.site.title);
      window.setTimeout(function () {
        _this2.promos = _this2.promo_reel;
      }, 1500);
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

module.exports = "<div class=\"program post page\" :key=\"postData.id\">\n  <div id=\"bg-image-wrapper\" :class=\"classes\">\n    <transition name=\"fade-in\" appear>\n      <img id=\"bg-image\" :src=\"img\" :key=\"img\" @load=\"showImg\" v-show=\"show\"/>\n    </transition>\n  </div>\n  <down-arrow></down-arrow>\n  <div class=\"featured-outer\">\n    <transition name=\"fade-slow\">\n      <div v-if=\"promos.length\" class=\"featured-wrapper\">\n        <mrk-carousel id=\"featured\" :slides=\"promos\"></mrk-carousel>\n      </div>\n    </transition>\n  </div>\n\n  <main role=\"main\">\n    <h1 class=\"title\" v-html=\"title\"></h1>\n    <section class=\"description\" v-html=\"content\"></section>\n    <content-section v-if=\"!postData.hide_programs\"\n                     :title=\"episodesTitle\"\n                     :coming=\"postData.release_date\"\n                     :hide-coming=\"postData.hide_coming\"\n                     :labels=\"postData.episode_labels\"\n                     :episodes=\"episodes\"></content-section>\n    <content-section :title=\"archivesTitle\"\n                     :episodes=\"archives\"\n                     :labels=\"postData.episode_labels\"\n                     :show-empty=\"false\"></content-section>\n    <comments></comments>\n  </main>\n  <wp-footer></wp-footer>\n</div>\n";

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
  ScrollHeader.init = function (header, top) {
    var _ = ScrollHeader;
    var $el = $("#app>.page");
    _.last_scroll = $el.scrollTop();
    $el.off('scroll').scroll(function (e) {
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

      var topH = $(top).innerHeight() - $head.innerHeight() + 20;
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
//# sourceMappingURL=11.js.map