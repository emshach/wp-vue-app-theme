(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

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
      autoplayTimeout: 15000,
      goto: 0,
      slide: 0,
      sliding: null,
      players: {},
      played: {},
      ready: {},
      waiting: {},
      playing: {},
      currentPlaying: false // options: {
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
    var _this = this;

    this.getSlides();
    console.log(this.$refs);

    if (this.slides.length > 1) {
      window.setInterval(function () {
        if (!_this.currentPlaying) {
          _this.goto = (_this.goto + 1) % _this.slides.length;
        }
      }, this.interval);
    }
  },
  rendered: function rendered() {
    this.updatePlayers();
  },
  updated: function updated() {
    this.updatePlayers();
  },
  methods: {
    getSlides: function getSlides() {
      if (!this.slides.length && this.topic) {// TODO: search using topic, get posts
      }
    },
    updatePlayers: function updatePlayers() {
      var players = {};

      for (var p in this.$refs) {
        if (p.indexOf('player') != 0) continue;
        var player = this.$refs[p][0];
        var index = p.substr(6);
        players[player.id_] = index;
      }

      for (p in this.players) {
        if (!(p in players)) {
          // then it got drawn-over
          delete this.waiting[p];
          delete this.ready[p];
          delete this.playing[p];
          delete this.played[p];
          if (this.currentPlaying == p) this.currentPlaying = false;
        }
      }

      this.players = players;
    },
    // events
    pageChanged: function pageChanged(page) {
      console.log('pageChanged', page);
      this.sliding = true;
      var slide = this.slide;
      var oldPlayer = this.$refs['player' + slide];
      var newPlayer = this.$refs['player' + page];
      if (oldPlayer) oldPlayer = oldPlayer[0];
      if (newPlayer) newPlayer = newPlayer[0];
      console.log('oldPlayer', slide, oldPlayer, oldPlayer.player.id_);
      console.log('newPlayer', page, newPlayer, newPlayer.player.id_);
      this.slide = page;

      if (this.playing[oldPlayer.player.id_]) {
        oldPlayer.player.pause();
        this.playing[oldPlayer.player.id_] = false;
        this.currentPlaying = false;
      }
    },
    transitionEnded: function transitionEnded() {
      console.log('transitionEnded');
      this.sliding = false; // window.setTimeout(() => {
      //   var player = this.$refs[ 'player' + this.slide ];
      //   if ( !player || !player[0] ) return;    // only play present players
      //   player = player[0].player;
      //   console.log( 'player', this.slide, player, player.id_ );
      //   if ( this.ready[ player.id_ ]) {
      //     if ( !this.played[ player.id_ ]) {
      //       var retries = 0;
      //       var tryplay;
      //       tryplay = error => {
      //         if ( ++retries > 3 ) return;
      //         console.warn( 'playback error', error );
      //         console.log( player.id_, 'retry #', retries );
      //         window.setTimeout(() => {
      //           player.play().catch( tryplay );
      //         }, 1500 );
      //       };
      //       player.play();
      //     }
      //   } else {
      //     this.waiting[ player.id_ ] = true;
      //   }
      // }, 3000 );

      var player = this.$refs['player' + this.slide];
      if (!player || !player[0]) return; // only play present players

      player = player[0].player;
      console.log('player', this.slide, player, player.id_);

      if (this.ready[player.id_]) {
        if (!this.played[player.id_]) {
          player.ready(function () {
            player.play();
          });
        }
      }
    },
    // event handlers
    playerPlayed: function playerPlayed(player) {
      console.log('playerPlayed', player, player.id_);
      this.played[player.id_] = true;
      this.playing[player.id_] = true;
      this.currentPlaying = player;
    },
    playerPaused: function playerPaused(player) {
      console.log('playerPaused', player, player.id_);
      this.playing[player.id_] = false;
    },
    playerEnded: function playerEnded(player) {
      console.log('playerEnded', player, player.id_);
      this.playing[player.id_] = false;
      this.currentPlaying = false;
    },
    playerWaiting: function playerWaiting(player) {// console.log( 'playerWaiting', player, player.id_ );
    },
    playerPlaying: function playerPlaying(player) {// console.log( 'playerPlaying', player, player.id_ );
    },
    playerDataLoaded: function playerDataLoaded(player) {// console.log( 'playerDataLoaded', player, player.id_ );
    },
    playerTimeupdated: function playerTimeupdated(player) {// console.log( 'playerTimeupdated', player, player.id_ );
    },
    playerPlayEnabled: function playerPlayEnabled(player) {
      console.log('playerPlayEnabled', player, player.id_);
      this.ready[player.id_] = true;
      var slidePlayer = this.$refs['player' + this.slide];
      if (!slidePlayer || !slidePlayer[0] || slidePlayer[0].player != player) return;

      if (this.waiting[player.id_] && !this.played[player.id_]) {
        this.waiting[player.id_] = false;
        player.play();
      }
    },
    playerPlaythroughEnabled: function playerPlaythroughEnabled(player) {// console.log( 'playerPlaythroughEnabled', player, player.id_ );
    },
    playerStateChanged: function playerStateChanged(player) {// console.log( 'playerStateChanged', player, player.id_ );
    },
    playerReadied: function playerReadied(player) {// console.log( 'playerReadied', player, player.id_ );
    }
  },
  watch: {
    goto: function goto(slide) {
      this.pageChanged(slide);
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

module.exports = "<carousel :autoplay=\"false\"\n          :per-page=\"1\"\n          :loop=\"true\"\n          v-model=\"goto\"\n          pagination-color=\"#000\"\n          pagination-active-color=\"#fff\"\n          id=\"featured\"\n          @pageChange=\"pageChanged\"\n          @transitionEnd=\"transitionEnded\">\n  <slide v-for=\"( slide, index ) in slides\" :key=\"slide.id\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div :class=\"[ 'mrk-media-wrapper', 'col', 'col-12',\n                       { 'col-md-8': slide.show_text }]\">\n          <template v-if=\"slide.type == 'attachment'\">\n            <img v-if=\"slide.release_type == 'image'\" :src=\"slide.source_url\"\n                 class=\"mrk-media\" />\n            <video-player v-else-if=\"slide.release_type == 'video'\"\n                          :ref=\"'player'+index\"\n                          class=\"mrk-media video-player-box vjs-big-play-centered\"\n                          :playsinline=\"true\"\n                          :options=\"videoPlayerOptions( slide )\"\n                          @play=\"playerPlayed\"\n                          @pause=\"playerPaused\"\n                          @ended=\"playerEnded\"\n                          @waiting=\"playerWaiting\"\n                          @playing=\"playerPlaying\"\n                          @loadeddata=\"playerDataLoaded\"\n                          @timeupdate=\"playerTimeupdated\"\n                          @canplay=\"playerPlayEnabled\"\n                          @canplaythrough=\"playerPlaythroughEnabled\"\n                          @statechanged=\"playerStateChanged\"\n                          @ready=\"playerReadied\">\n            </video-player>\n            <audio  v-else-if=\"slide.release_type == 'audio'\"\n                   :src=\"slide.source_url\" class=\"mrk-media\" controls\n                   controlsList=\"nodownload\">\n              {{ slide.alt_text }}\n            </audio>\n          </template>\n        </div>\n        <div v-if=\"slide.show_text\" class=\"col col-12 col-md-4\">\n          <h2 v-if=\"slide.title\" v-html=\"slide.title.rendered\"></h2>\n          <div v-if=\"slide.excerpt\" class=\"excerpt\"\n               v-html=\"slide.excerpt.rendered\"></div>\n          <div v-else-if=\"slide.caption\" class=\"caption\"\n               v-html=\"slide.caption.rendered\"></div>\n          <!-- <div v-if=\"slide.description\" class=\"description\" -->\n          <!--      v-html=\"slide.description.rendered\"></div> -->\n          <router-link v-if=\"slide.read_more\"\n                       :to=\"slide.full_content.path\"\n                       class=\"read-more\">read_more</router-link>\n          <b-btn v-if=\"slide.full_content\n                       && canWatchNow( slide.full_content )\"\n                 variant=\"primary\" :to=\"slide.full_content.path\" size=\"lg\"\n                 class=\"float-right\">{{\n            sayAction( slide.full_content )}} now</b-btn>\n          <b-btn v-else variant=\"warning\"\n                 size=\"lg\" class=\"float-right\"\n                 v-scroll-to=\"{ el: 'main', container: '.page',\n                              x: false, y: true }\">\n            subscribe for full content</b-btn>\n        </div>\n        <!-- TODO: if paid content, this link should be different, maybe it's\n             own component -->\n      </div>\n    </div>\n  </slide>\n  <slide v-if=\"slides.length == 0\">\n    <flower-spinner :animation-duration=\"2500\" :size=\"70\" color=\"#025\">\n    </flower-spinner>\n  </slide>\n</carousel>\n";

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
//# sourceMappingURL=10.js.map