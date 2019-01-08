(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[23],{

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
      promos: [],
      show: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.storedPost = Object.assign({}, this.sstate.nextpost);
    document.title = he__WEBPACK_IMPORTED_MODULE_1___default.a.decode(this.title + ' | ' + this.sstate.site.title);
    window.setTimeout(function () {
      _this.promos = _this.promo_reel;
    }, 3000);
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
        small: !!this.promos.length
      };
    },
    watch: {
      $route: function $route(to, from) {
        var _this2 = this;

        document.title = he__WEBPACK_IMPORTED_MODULE_1___default.a.decode(this.title + ' | ' + this.sstate.site.title);
        this.promos = [];
        window.setTimeout(function () {
          _this2.promos = _this2.promo_reel;
        }, 5000);
      }
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

module.exports = "<div class=\"program post page\" :key=\"postData.id\">\n  <div id=\"bg-image-wrapper\" :class=\"classes\">\n    <transition name=\"fade-in\" appear>\n      <img id=\"bg-image\" :src=\"img\" :key=\"img\" @load=\"showImg\" v-show=\"show\"/>\n    </transition>\n  </div>\n  <wp-header></wp-header>\n  <down-arrow></down-arrow>\n  <div class=\"featured-outer\">\n    <transition name=\"fade-in\">\n      <div v-if=\"promos.length\" class=\"featured-wrapper\">\n        <mrk-carousel id=\"featured\" :slides=\"promos\"></mrk-carousel>\n      </div>\n    </transition>\n  </div>\n\n  <main role=\"main\">\n    <h1 class=\"title\" v-html=\"title\"></h1>\n    <section class=\"description\" v-html=\"content\"></section>\n    <content-section :title=\"episodesTitle\" :coming=\"postData.release_date\"\n                     :labels=\"postData.episode_labels\"\n                     :episodes=\"episodes\"></content-section>\n    <content-section :title=\"archivesTitle\" :episodes=\"archives\"\n                     :labels=\"postData.episode_labels\"\n                     :show-empty=\"false\"></content-section>\n    <comments></comments>\n  </main>\n  <wp-footer></wp-footer>\n</div>\n";

/***/ })

}]);
//# sourceMappingURL=23.js.map