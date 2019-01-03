(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./js/components/comment-form/index.js":
/*!*********************************************!*\
  !*** ./js/components/comment-form/index.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/comment-form/template.html"),
  props: {
    first: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    validEmail: function validEmail(email) {
      var re = /\S+@\S+/;
      return re.test(email.toLowerCase());
    },
    validate: function validate() {
      this.commenterBlured = true;
      this.emailBlured = true;
      this.contentBlured = true;

      if (this.commenter !== '' && this.validEmail(this.email) && this.content !== '') {
        this.valid = true;
      }
    },
    submit: function submit() {
      var self = this;
      self.validate();

      if (self.valid) {
        axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/wp-json/wp/v2/comments', {
          author_name: self.commenter,
          author_email: self.email,
          content: self.content,
          author_url: self.website,
          post: self.$parent.post[0].id
        }).then(function (response) {
          self.submitted = true;
        }).catch(function (error) {
          console.log(error);
        });
      }
    } //end submit

  },
  data: function data() {
    return {
      commenter: "",
      commenterBlured: false,
      email: "",
      emailBlured: false,
      website: "",
      content: "",
      contentBlured: false,
      valid: false,
      submitted: false
    };
  }
});

/***/ }),

/***/ "./js/components/comment-form/template.html":
/*!**************************************************!*\
  !*** ./js/components/comment-form/template.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"comment-form-wrap\" v-cloak>\n  <h3 v-if=\"first\">Be the first!</h3>\n  <h3 v-else>Leave a comment</h3>\n\n  <div v-if=\"submitted\" class=\"alert alert-success\" role=\"alert\">\n    Thank you. Your comment has been submitted!\n  </div>\n\n  <div v-if=\"!submitted\">\n    <div class=\"form-group\">\n      <label for=\"commenter\">Name</label>\n      <input\n        v-model=\"commenter\"\n        v-bind:class=\"{'form-control':true, 'is-invalid' : commenter == '' && commenterBlured}\"\n        @blur=\"commenterBlured = true\">\n      <div class=\"invalid-feedback\">This is required</div>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"email\">Email address</label>\n      <input\n        v-model=\"email\"\n        v-bind:class=\"{'form-control':true, 'is-invalid' : !validEmail(email) && emailBlured}\"\n        @blur=\"emailBlured = true\">\n      <div class=\"invalid-feedback\">A valid email is required</div>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"website\">Website <i>(optional)</i></label>\n      <input v-model=\"website\" class=\"form-control\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"content\">Comment</label>\n      <textarea\n        v-model=\"content\"\n        v-bind:class=\"{'form-control':true, 'is-invalid' : content == '' && contentBlured}\"\n        @blur=\"contentBlured = true\"\n        ></textarea>\n      <div class=\"invalid-feedback\">This is required</div>\n    </div>\n    <div class=\"form-group\">\n      <a type=\"submit\" href=\"#\"\n         @click.stop.prevent=\"submit\" class=\"btn btn-lg btn-success\">Submit</a>\n    </div>\n  </div>\n</div>\n";

/***/ })

}]);
//# sourceMappingURL=5.js.map