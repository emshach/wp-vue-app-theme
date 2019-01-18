(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./js/components/watch-button/index.js":
/*!*********************************************!*\
  !*** ./js/components/watch-button/index.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mixins_media_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../mixins/media-actions */ "./js/mixins/media-actions.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/watch-button/template.html"),
  mixins: [_mixins_media_actions__WEBPACK_IMPORTED_MODULE_0__["default"]],
  props: ['target']
});

/***/ }),

/***/ "./js/components/watch-button/template.html":
/*!**************************************************!*\
  !*** ./js/components/watch-button/template.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<b-btn v-if=\"target && canWatchNow( target )\"\n       variant=\"primary\" :to=\"target.path\" size=\"lg\"\n       class=\"float-right\">{{ sayAction( target )}} now</b-btn>\n<b-btn v-else-if=\"needsSubscription( target )\" size=\"lg\"\n       :to=\"target.preview ||{ path: '/members', query: { then: target.path }}\"\n       class=\"watch subscribe-to-watch\"\n       variant=\"warning\">subscribe to {{ sayAction( target ) }}</b-btn>\n";

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
    }
  }
});

/***/ })

}]);
//# sourceMappingURL=9.js.map