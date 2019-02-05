(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./js/components/about/index.js":
/*!**************************************!*\
  !*** ./js/components/about/index.js ***!
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
  template: __webpack_require__(/*! ./template.html */ "./js/components/about/template.html"),
  props: ['post', 'path'],
  data: function data() {
    return {
      sstate: _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state,
      loading: true,
      storedPost: {},
      show: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    document.title = he__WEBPACK_IMPORTED_MODULE_3___default.a.decode(this.title + ' | ' + this.sstate.site.title);

    _lib_wpapix__WEBPACK_IMPORTED_MODULE_1__["default"].then(function (wpapix) {
      var path = new wpapix.Path({
        path: 'about-us'
      });
      path.fetch().done(function (rpost) {
        console.log('got about page', rpost);
        _this.storedPost = rpost;
      });
    });

    this.$nextTick(function () {
      _lib_scroll_header__WEBPACK_IMPORTED_MODULE_2__["default"].init('#masthead', "#featured,#app>.page>.featured-outer");
    });
  },
  methods: {
    showImg: function showImg() {
      this.show = true;
    },
    postTitle: function postTitle(post) {
      return post.title && post.title.rendered || '';
    },
    postContent: function postContent(post) {
      var user = this.sstate.user;
      if (post.member_content && (user.as ? user.as.subscriber : user.membership)) return post.member_content;
      return post.content && post.content.rendered || '';
    }
  },
  computed: {
    postData: function postData() {
      return this.post || this.storedPost;
    },
    title: function title() {
      return this.postData.title && this.postData.title.rendered || '';
    },
    posts: function posts() {
      return this.postData.post || [];
    },
    img: function img() {
      return this.postData.background_image || '';
    },
    content: function content() {
      var user = this.sstate.user;
      if (this.postData.member_content && (user.as ? user.as.subscriber : user.membership)) return this.postData.member_content;
      return this.postData.content && this.postData.content.rendered || '';
    }
  },
  watch: {
    $route: function $route(to, from) {// TODO: scroll to post (and maybe fetch)
    }
  }
});

/***/ }),

/***/ "./js/components/about/template.html":
/*!*******************************************!*\
  !*** ./js/components/about/template.html ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"about post page\" :key=\"postData.id\">\n  <div id=\"bg-image-wrapper\">\n    <transition name=\"fade-in\" appear>\n      <img id=\"bg-image\" :src=\"img\" :key=\"img\" @load=\"showImg\" v-show=\"show\"/>\n    </transition>\n  </div>\n  <down-arrow></down-arrow>\n  <div class=\"featured-outer small\">\n  </div>\n\n  <main role=\"main\">\n    <h1 class=\"title\" v-html=\"title\"></h1>\n    <section class=\"description\" v-html=\"content\"></section>\n    <section v-for=\"( post, index ) in posts\" :key=\"post.id\"\n             class=\"post\">\n      <h2 class=\"title\" v-html=\"postTitle( post )\"></h2>\n      <div class=\"content\" v-html=\"postContent( post )\"></div>\n    </section>\n  </main>\n  <wp-footer></wp-footer>\n</div>\n";

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
//# sourceMappingURL=6.js.map