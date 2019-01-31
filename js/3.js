(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "../../../../../../../usr/local/lib/node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./js/components/content-section/index.js":
/*!************************************************!*\
  !*** ./js/components/content-section/index.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/store */ "./js/lib/store.js");
/* harmony import */ var _mixins_media_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/media-actions */ "./js/mixins/media-actions.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/content-section/template.html"),
  mixins: [_mixins_media_actions__WEBPACK_IMPORTED_MODULE_1__["default"]],
  props: {
    title: {
      type: String,
      default: "Episodes"
    },
    episodes: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    showEmpty: {
      type: Boolean,
      default: true
    },
    coming: {
      type: String,
      default: ''
    },
    hideComing: {
      type: Boolean,
      default: false
    },
    labels: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      user: _lib_store__WEBPACK_IMPORTED_MODULE_0__["default"].state.user
    };
  },
  computed: {
    filteredEpisodes: function filteredEpisodes() {
      var _this = this;

      var episodes = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.orderBy(this.episodes, ['release_number'], ['asc']);

      return episodes.filter(function (x) {
        return _this.canWatchNow(x) || x.restrictions.show;
      });
    },
    dateComing: function dateComing() {
      return this.coming ? 'in ' + this.coming : 'Soon';
    }
  }
});

/***/ }),

/***/ "./js/components/content-section/template.html":
/*!*****************************************************!*\
  !*** ./js/components/content-section/template.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"episodes\">\n  <template v-if=\"filteredEpisodes.length || showEmpty\">\n    <h2 class=\"title\" v-html=\"title\"></h2>\n    <transition-group name=\"fade-fast\">\n      <b-card v-for=\"( episode, index ) in filteredEpisodes\" :key=\"episode.id\"\n              :class=\"[ 'media-insert', cardClasses( episode )]\">\n        <b-media no-body>\n          <b-media-aside>\n            <b-img :src=\"episode.thumbnail\" width=\"128\" height=\"96\" />\n            <div class=\"info length\">{{\n              episode.media_details.length_formatted\n              }}</div>\n          </b-media-aside>\n          <b-media-body>\n            <h5 v-if=\"labels && episode.release_number\n                      && typeof episode.release_number == 'number'\"\n                class=\"mt-0 episode-num\">Programme {{\n              episode.release_number }}</h5>\n            <h5 class=\"mt-0\" v-html=\"episode.title.rendered\"></h5>\n            <div class=\"info row\">\n              <div :class=\"[ 'views', 'd-flex',\n                           { active : episode.my_xp.seen }]\">\n                <span class=\"dashicons dashicons-visibility\"></span>\n                <span class=\"count\">{{ episode.stats.views || 0 }}</span>\n              </div>\n              <div :class=\"[ 'likes',  'd-flex',\n                           { active: episode.my_xp.like }]\">\n                <span class=\"dashicons dashicons-thumbs-up\"></span>\n                <span class=\"count\">{{ episode.stats.likes || 0 }}</span>\n              </div>\n              <div :class=\"[ 'dislikes', 'd-flex',\n                           { active: episode.my_xp.dislike }]\">\n                <span class=\"dashicons dashicons-thumbs-down\"></span>\n                <span class=\"count\">{{ episode.stats.dislikes || 0 }}</span>\n              </div>\n              <div :class=\"[ 'favs', 'd-flex', { active: episode.my_xp.fav }]\">\n                <span class=\"dashicons dashicons-star-filled\"></span>\n                <span class=\"count\">{{ episode.stats.favs || 0 }}</span>\n              </div>\n              <div :class=\"[ 'comments', 'd-flex',\n                           { active: episode.my_xp.comment }]\">\n                <span class=\"dashicons dashicons-admin-comments\"></span>\n                <span class=\"count\">{{ episode.stats.comments || 0 }}</span>\n              </div>\n              <template v-if=\"user.as && user.as.admin\">\n                <div v-if=\"episode.restrictions.private\"\n                     class=\"d-flex admin\">private</div>\n                <div v-if=\"episode.restrictions.public\"\n                     class=\"d-flex admin\">public</div>\n                <div v-if=\"episode.restrictions.auth\"\n                     class=\"d-flex admin\">logged-in</div>\n                <div v-if=\"episode.restrictions.payperview\"\n                     class=\"d-flex admin\">payperview</div>\n                <div v-if=\"episode.restrictions.members\"\n                     class=\"d-flex admin\">subscribers</div>\n                <div v-if=\"!episode.restrictions.show\n                           && !episode.restrictions.public\"\n                     class=\"d-flex admin\">hidden</div>\n                <!-- <div v-if=\"episode.restrictions.premium\"\n                     class=\"d-flex admin\">premium</div> -->\n              </template>\n            </div>\n            <div v-html=\"episode.caption.rendered\"></div>\n            <watch-button :target=\"episode\"></watch-button>\n            <b-btn v-if=\"episode.preview\" class=\"watch watch-preview\" size=\"lg\"\n                   :to=\"episode.preview\" variant=\"link\">\n              {{ sayAction( episode, true ) }} preview</b-btn>\n          </b-media-body>\n        </b-media>\n      </b-card>\n    </transition-group>\n    <div v-if=\"!filteredEpisodes.length && !hideComing\"\n         class=\"message\">Coming {{ dateComing }}!</div>\n  </template>\n</section>\n";

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
//# sourceMappingURL=3.js.map