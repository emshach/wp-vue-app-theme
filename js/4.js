(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./js/components/preview-release/index.js":
/*!************************************************!*\
  !*** ./js/components/preview-release/index.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_route_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/route-events */ "./js/lib/route-events.js");
/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/store */ "./js/lib/store.js");
/* harmony import */ var _mixins_media_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/media-actions */ "./js/mixins/media-actions.js");
/* harmony import */ var _lib_scroll_header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/scroll-header */ "./js/lib/scroll-header.js");




/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/preview-release/template.html"),
  mixins: [_mixins_media_actions__WEBPACK_IMPORTED_MODULE_2__["default"]],
  props: ['post'],
  data: function data() {
    return {
      sstate: _lib_store__WEBPACK_IMPORTED_MODULE_1__["default"].state,
      storedPost: {
        stats: {},
        my_xp: {}
      },
      show: false,
      prev: 0,
      next: 0,
      wideMode: false
    };
  },
  beforeRouteUpdate: _lib_route_events__WEBPACK_IMPORTED_MODULE_0__["default"].toPreviewRelease,
  mounted: function mounted() {
    this.storedPost = Object.assign({}, this.sstate.nextpost);
    this.$nextTick(function () {
      _lib_scroll_header__WEBPACK_IMPORTED_MODULE_3__["default"].init('#masthead', "#featured,#app>.page>.featured-outer");
    });
  },
  methods: {
    showImg: function showImg() {
      this.show = true;
    },
    likePost: function likePost() {},
    dislikePost: function dislikePost() {},
    favPost: function favPost() {}
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
    fullContent: function fullContent() {
      return this.postData.full_content;
    },
    promos: function promos() {
      return [{
        id: this.postData.id,
        excerpt: {
          rendered: this.content
        }
      }].concat(this.postData.promo_reel || []);
    },
    episodes: function episodes() {
      return this.postData.releases || [];
    },
    content: function content() {
      return this.postData.content ? this.postData.content.rendered : this.postData.caption ? this.postData.caption.rendered : '';
    },
    classes: function classes() {
      return {
        small: !!this.promos.length
      };
    }
  }
});

/***/ }),

/***/ "./js/components/preview-release/template.html":
/*!*****************************************************!*\
  !*** ./js/components/preview-release/template.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div :class=\"['preview', 'page', postData.release_type]\" :key=\"postData.id\">\n  <div id=\"bg-image-wrapper\" :class=\"classes\">\n    <transition name=\"fade-in\" appear>\n      <img id=\"bg-image\" :src=\"img\" :key=\"img\" @load=\"showImg\" v-show=\"show\"/>\n    </transition>\n  </div>\n  <div id=\"featured\">\n    <div class=\"featured-wrapper\">\n      <div class=\"container\">\n        <div class=\"row\">\n          <div :class=\"[ 'mrk-media-wrapper', 'col', 'col-12',\n                       wideMode ? '' : 'col-md-8']\">\n            <video v-if=\"postData.release_type == 'video'\"\n                   :src=\"postData.source_url\" class=\"mrk-media\"\n                   autoplay controls playsinline controlsList=\"nodownload\">\n              {{ postData.alt_text }}\n            </video>\n            <audio v-else-if=\"postData.release_type == 'audio'\"\n                   :src=\"postData.source_url\" class=\"mrk-media\"\n                   autoplay controls controlsList=\"nodownload\">\n              {{ postData.alt_text }}\n            </audio>\n            <carousel v-else-if=\"postData.release_type == 'gallery'\">\n              <slide v-for=\"( slide, index ) in postData.content\" :key=\"index\"></slide>\n            </carousel>\n          </div>\n          <transition name=\"fade-in\">\n            <div v-if=\"!wideMode\" class=\"col col-12 col-md-4 description\">\n              <div v-html=\"content\"></div>\n              <b-btn v-if=\"postData.full_content\n                           && canWatchNow( postData.full_content )\"\n                     variant=\"primary\" :to=\"postData.full_content.path\" size=\"lg\"\n                     class=\"float-right\">{{\n                sayAction( postData.full_content )}} now</b-btn>\n              <b-btn v-else variant=\"warning\"\n                     size=\"lg\" class=\"float-right\"\n                     v-scroll-to=\"{ el: 'main', container: '.page',\n                                  x: false, y: true }\">\n                subscribe for full content</b-btn>\n            </div>\n          </transition>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <main role=\"main\">\n    <h1 class=\"title\" v-html=\"title\"></h1>\n    <section class=\"info row\">\n      <div :class=\"[ 'views', 'd-flex',\n                   { active : postData.my_xp.seen }]\">\n        <span class=\"dashicons dashicons-visibility\"></span>\n        <span class=\"count\">{{ postData.stats.views || 0 }}</span>\n      </div>\n      <div :class=\"[ 'likes',  'd-flex',\n                   { active: postData.my_xp.like }]\"\n           @click.stop=\"likePost\">\n        <span class=\"dashicons dashicons-thumbs-up\"></span>\n        <span class=\"count\">{{ postData.stats.likes || 0 }}</span>\n      </div>\n      <div :class=\"[ 'dislikes', 'd-flex',\n                   { active: postData.my_xp.dislike }]\"\n           @click.stop=\"dislikePost\">\n        <span class=\"dashicons dashicons-thumbs-down\"></span>\n        <span class=\"count\">{{ postData.stats.dislikes || 0 }}</span>\n      </div>\n      <div :class=\"[ 'favs', 'd-flex', { active: postData.my_xp.fav }]\"\n           @click.stop=\"favPost\">\n        <span class=\"dashicons dashicons-star-filled\"></span>\n        <span class=\"count\">{{ postData.stats.favs || 0 }}</span>\n      </div>\n      <div :class=\"[ 'comments', 'd-flex',\n                             { active: postData.my_xp.comment }]\">\n        <span class=\"dashicons dashicons-admin-comments\"></span>\n        <span class=\"count\">{{ postData.stats.comments || 0 }}</span>\n      </div>\n    </section>\n    <!-- TODO: strips for related, series -->\n    <section class=\"description\" v-if=\"wideMode\" v-html=\"content\"></section>\n    <b-btn v-if=\"postData.full_content\n                 && canWatchNow( postData.full_content )\"\n           variant=\"primary\" :to=\"postData.full_content.path\" size=\"lg\"\n           class=\"float-right\">{{\n      sayAction( postData.full_content )}} now</b-btn>\n    <section v-else class=\"subscriptions\">\n      <subscription-menu :target=\"postData.path\">\n        Select one of the subscription plans to see the full content.\n      </subscription-menu>\n    </section>\n  </main>\n  <wp-footer></wp-footer>\n</div>\n";

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

/***/ }),

/***/ "./js/mixins/media-actions.js":
/*!************************************!*\
  !*** ./js/mixins/media-actions.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/store */ "./js/lib/store.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  methods: {
    canWatchNow: function canWatchNow(episode) {
      var user = _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state.user;

      if (user.as) {
        var as = user.as;
        var rst = episode.restrictions;
        if (as.admin || rst.public) return true;
        if (as.subscriber && rst.members) return true;
        if (as.logged_in && rst.auth) return true;
        return false;
      }

      return !episode.redirect;
    },
    sayAction: function sayAction(episode, trans) {
      return episode.release_type == 'video' ? 'watch' : episode.release_type == 'audio' ? trans ? 'listen to' : 'listen' : 'view';
    },
    cardClasses: function cardClasses(episode) {
      if (!episode || !episode.restrictions) return {};
      return {
        private: episode.restrictions.private,
        public: episode.restrictions.public,
        auth: episode.restrictions.auth,
        payperview: episode.restrictions.payperview,
        members: episode.restrictions.members,
        hidden: !episode.restrictions.show && !episode.restrictions.public
      };
    },
    needsSubscription: function needsSubscription(episode) {
      var user = _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state.user;
      return episode.restrictions.members && (!user.as || !user.as.subscriber);
    },
    getSources: function getSources(episode) {
      return Object.values(episode.sources);
    },
    videoPlayerOptions: function videoPlayerOptions(episode, defaults) {
      var opts = Object.assign({
        controls: true,
        autoplay: 'play',
        playsinline: true,
        aspectRatio: "16:9",
        controlBar: {
          children: ['playToggle', 'volumeMenuButton', 'currentTimeDisplay', 'timeDivider', 'durationDisplay', 'progressControl', 'remainingTimeDisplay', 'playbackRateMenuButton', 'subtitlesButton', 'captionsButton', 'fullscreenToggle'],
          volumeMenuButton: {
            inline: false
          }
        }
      }, defaults || {});
      if (episode.kgvid_meta && episode.kgvid_meta.poster) opts.poster = episode.kgvid_meta.poster;
      opts.sources = this.getSources(episode);
      return opts;
    }
  }
});

/***/ })

}]);
//# sourceMappingURL=4.js.map