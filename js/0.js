(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./js/lib/wpapi.js":
/*!*************************!*\
  !*** ./js/lib/wpapi.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Path = wp.api.models.Post.extend({
  defaults: {
    path: ""
  },
  url: function url() {
    return wpApiSettings.root + 'mrk/v1/path/' + this.get('path');
  }
});
var Paths = wp.api.collections.Posts.extend({
  url: function url() {
    return wpApiSettings.root + 'mrk/v1/paths';
  },
  model: Path
});
wp.api.models.Path = Path;
wp.api.collections.Paths = Paths;
/* harmony default export */ __webpack_exports__["default"] = (wp.api);

/***/ })

}]);
//# sourceMappingURL=0.js.map