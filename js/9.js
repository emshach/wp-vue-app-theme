(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./js/components/mrk-carousel/index.js":
/*!*********************************************!*\
  !*** ./js/components/mrk-carousel/index.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mixins_media_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../mixins/media-actions */ "./js/mixins/media-actions.js");

var carousels = 0;
/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/mrk-carousel/template.html"),
  mixins: [_mixins_media_actions__WEBPACK_IMPORTED_MODULE_0__["default"]],
  props: {
    topic: {
      type: String,
      default: ""
    },
    slides: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    id: {
      type: String,
      default: function _default() {
        return "carousel-" + ++carousels;
      }
    },
    background: {
      type: String,
      default: "transparent"
    },
    interval: {
      type: Number,
      default: 15000
    }
  },
  data: function data() {
    return {
      loading: true,
      slide: 0,
      sliding: null,
      players: [],
      played: {},
      ready: {},
      playing: {} // options: {
      //   pagination: {
      //     direction: 'horizontal',
      //     el: '.swiper-pagination',
      //     speed: 15000,
      //     loop: true
      //   }
      // }

    };
  },
  mounted: function mounted() {
    this.getSlides();
    console.log(this.$refs);
  },
  methods: {
    getSlides: function getSlides() {
      if (!this.slides.length && this.topic) {// TODO: search using topic, get posts
      }
    },
    pageChanged: function pageChanged(page) {
      console.log('pageChanged', page);
      var slide = this.slide;
      var oldPlayer = this.$refs['videoPlayer' + slide];
      var newPlayer = this.$refs['videoPlayer' + page];
      console.log('oldPlayer', oldPlayer);
      console.log('newPlayer', newPlayer);
      this.slide = page;
      if (this.playing[newPlayer.player.id_]) newPlayer.player.pause();
    },
    transitionEnded: function transitionEnded() {
      console.log('transitionEnded');
      var player = this.$refs['videoPlayer' + this.slide];
      console.log('player', player);
      if (!player) return; // only play present players

      if (this.ready[player.player.id_] && !this.played[player.player.id_]) player.player.play();
    },
    // event handlers
    playerPlayed: function playerPlayed(player) {
      console.log('playerPlayed', player);
      this.played[player.id_] = true;
    },
    playerPaused: function playerPaused(player) {
      console.log('playerPaused', player);
      this.playing[player.id_] = false;
    },
    playerEnded: function playerEnded(player) {
      console.log('playerEnded', player);
      this.playing[player.id_] = false;
    },
    playerWaiting: function playerWaiting(player) {// console.log( 'playerWaiting', player );
    },
    playerPlaying: function playerPlaying(player) {
      console.log('playerPlaying', player);
      this.playing[player.id_] = true;
    },
    playerDataLoaded: function playerDataLoaded(player) {// console.log( 'playerDataLoaded', player );
    },
    playerTimeupdated: function playerTimeupdated(player) {// console.log( 'playerTimeupdated', player );
    },
    playerPlayEnabled: function playerPlayEnabled(player) {// console.log( 'playerPlayEnabled', player );
    },
    playerPlaythroughEnabled: function playerPlaythroughEnabled(player) {
      console.log('playerPlaythroughEnabled', player);
    },
    playerStateChanged: function playerStateChanged(player) {// console.log( 'playerStateChanged', player );
    },
    playerReadied: function playerReadied(player) {
      console.log('playerReadied', player);
      this.ready[player.id_] = true;
      var slidePlayer = this.$refs['videoPlayer' + this.slide];
      if (slidePlayer && slidePlayer.player == player && !this.played[player.player.id_]) player.play();
    }
  }
});

/***/ }),

/***/ "./js/components/mrk-carousel/template.html":
/*!**************************************************!*\
  !*** ./js/components/mrk-carousel/template.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<carousel :autoplay=\"true\" :per-page=\"1\" :autoplay-timeout=\"15000\" :loop=\"true\"\n          pagination-color=\"#000\" pagination-active-color=\"#fff\"\n          id=\"featured\"\n          @pageChange=\"pageChanged\" @transitionEnd=\"transitionEnded\">\n  <slide v-for=\"( slide, index ) in slides\" :key=\"slide.id\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div :class=\"[ 'mrk-media-wrapper', 'col', 'col-12',\n                       { 'col-md-8': slide.show_text }]\">\n          <template v-if=\"slide.type == 'attachment'\">\n            <img v-if=\"slide.release_type == 'image'\" :src=\"slide.source_url\"\n                 class=\"mrk-media\" />\n            <video-player v-else-if=\"slide.release_type == 'video'\"\n                          :ref=\"'videoPlayer'+index\"\n                          class=\"mrk-media video-player-box vjs-big-play-centered\"\n                          :playsinline=\"true\"\n                          :options=\"videoPlayerOptions( slide )\"\n                          @play=\"playerPlayed\"\n                          @pause=\"playerPaused\"\n                          @ended=\"playerEnded\"\n                          @waiting=\"playerWaiting\"\n                          @playing=\"playerPlaying\"\n                          @loadeddata=\"playerDataLoaded\"\n                          @timeupdate=\"playerTimeupdated\"\n                          @canplay=\"playerPlayEnabled\"\n                          @canplaythrough=\"playerPlaythroughEnabled\"\n                          @statechanged=\"playerStateChanged\"\n                          @ready=\"playerReadied\">\n            </video-player>\n            <audio  v-else-if=\"slide.release_type == 'audio'\"\n                   :src=\"slide.source_url\" class=\"mrk-media\" controls\n                   controlsList=\"nodownload\">\n              {{ slide.alt_text }}\n            </audio>\n          </template>\n        </div>\n        <div v-if=\"slide.show_text\" class=\"col col-12 col-md-4\">\n          <h2 v-if=\"slide.title\" v-html=\"slide.title.rendered\"></h2>\n          <div v-if=\"slide.excerpt\" class=\"excerpt\"\n               v-html=\"slide.excerpt.rendered\"></div>\n          <div v-else-if=\"slide.caption\" class=\"caption\"\n               v-html=\"slide.caption.rendered\"></div>\n          <!-- <div v-if=\"slide.description\" class=\"description\" -->\n          <!--      v-html=\"slide.description.rendered\"></div> -->\n          <router-link v-if=\"slide.read_more\"\n                       :to=\"slide.full_content.path\"\n                       class=\"read-more\">read_more</router-link>\n          <b-btn v-if=\"slide.full_content\n                       && canWatchNow( slide.full_content )\"\n                 variant=\"primary\" :to=\"slide.full_content.path\" size=\"lg\"\n                 class=\"float-right\">{{\n            sayAction( slide.full_content )}} now</b-btn>\n          <b-btn v-else variant=\"warning\"\n                 size=\"lg\" class=\"float-right\"\n                 v-scroll-to=\"{ el: 'main', container: '.page',\n                              x: false, y: true }\">\n            subscribe for full content</b-btn>\n        </div>\n        <!-- TODO: if paid content, this link should be different, maybe it's\n             own component -->\n      </div>\n    </div>\n  </slide>\n  <slide v-if=\"slides.length == 0\">\n    <flower-spinner :animation-duration=\"2500\" :size=\"70\" color=\"#025\">\n    </flower-spinner>\n  </slide>\n</carousel>\n";

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
        autoplay: false,
        playsinline: true,
        aspectRatio: "16:9",
        controlBar: {// children: [
          //   'playToggle',
          //   'volumeMenuButton',
          //   'currentTimeDisplay',
          //   'durationDisplay',
          //   'progressControl',
          //   'remainingTimeDisplay',
          //   'playbackRateMenuButton',
          //   'subtitlesButton',
          //   'captionsButton',
          //   'fullscreenToggle'
          // ],
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
//# sourceMappingURL=9.js.map