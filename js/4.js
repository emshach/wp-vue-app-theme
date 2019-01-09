(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./js/components/nav-menu/index.js":
/*!*****************************************!*\
  !*** ./js/components/nav-menu/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_nav_slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/nav-slider */ "./js/lib/nav-slider.js");
/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/store */ "./js/lib/store.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  template: __webpack_require__(/*! ./template.html */ "./js/components/nav-menu/template.html"),
  props: {
    menu: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    logo: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  data: function data() {
    return {
      sstate: _lib_store__WEBPACK_IMPORTED_MODULE_1__["default"].state,
      menuOpen: false,
      slider: null
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.slider = _lib_nav_slider__WEBPACK_IMPORTED_MODULE_0__["default"];
    this.$nextTick(function () {
      _lib_nav_slider__WEBPACK_IMPORTED_MODULE_0__["default"].init();
      if (window.innerWidth >= 600) _this.menuOpen = true;
    });
  },
  methods: {
    toggleMenu: function toggleMenu() {
      _lib_nav_slider__WEBPACK_IMPORTED_MODULE_0__["default"].toggleMenu(this.menuOpen = !this.menuOpen);
    },
    closeMenu: function closeMenu() {
      _lib_nav_slider__WEBPACK_IMPORTED_MODULE_0__["default"].toggleMenu(this.menuOpen = false, 150);
    }
  },
  watch: {
    'slider.open': function sliderOpen(val) {
      this.menuOpen = val;
    }
  }
});

/***/ }),

/***/ "./js/components/nav-menu/template.html":
/*!**********************************************!*\
  !*** ./js/components/nav-menu/template.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"header-menu\"\n     :class=\"['header-menu', { mobile: sstate.window.width < 601 }]\">\n  <div id=\"feature-tray\"><div id=\"feature-tray-inner\"></div></div>\n  <b-btn class=\"menu-toggle menu-wide nav-menu\" variant=\"link\"\n          :class=\"{ open: menuOpen }\"\n          @click=\"toggleMenu\" aria-label=\"Toggle Navigation\">\n    <transition name=\"fade-fast\" mode=\"out-in\">\n      <span v-if=\"menuOpen\" key=\"menu\"\n            class=\"dashicons dashicons-arrow-down-alt2 navbar-toggle-icon open\"\n            aria-hidden=\"true\"></span>\n      <span v-else key=\"close\"\n            class=\"dashicons dashicons-menu navbar-toggle-icon\"\n            aria-hidden=\"true\"></span>\n    </transition>\n  </b-btn>\n  <!-- nav -->\n  <nav id=\"main-nav\" class=\"nav main-nav\" role=\"navigation\">\n    <div class=\"wrapper\">\n      <div @click.stop=\"closeMenu\" id=\"bg-nav\"></div>\n      <button class=\"menu-toggle toggle-mobile nav-menu\" type=\"button\"\n              @click=\"toggleMenu\" aria-label=\"Toggle Navigation\">\n        <transition name=\"fade-fast\" mode=\"out-in\">\n          <span v-if=\"menuOpen\" key=\"menu\"\n                class=\"dashicons dashicons-arrow-left-alt2 navbar-toggle-icon\"\n                aria-hidden=\"true\"></span>\n          <span v-else key=\"close\"\n                class=\"dashicons dashicons-menu navbar-toggle-icon\"\n                aria-hidden=\"true\"></span>\n        </transition>\n      </button>\n      <div id=\"nav-main-container\" class=\"menu-nav-container\">\n        <ul id=\"menu-nav\" class=\"menu primary-menu nav navbar-nav\">\n          <li v-for=\"( item, index ) in menu\" :key=\"index\" class=\"menu-item\">\n            <router-link :to=\"item.url\" @click.native=\"closeMenu\">\n              <img :src=\"item.thumb\" />\n              <span class=\"text\" v-html=\"item.title\"></span>\n            </router-link>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </nav>\n  <!-- /nav -->\n</div>\n";

/***/ }),

/***/ "./js/lib/nav-slider.js":
/*!******************************!*\
  !*** ./js/lib/nav-slider.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function get_pos(obj) {
  var curleft = 0,
      curtop = 0;

  if (obj.offsetParent) {
    curleft = obj.offsetLeft;
    curtop = obj.offsetTop;

    while (obj = obj.offsetParent) {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
    }
  }

  return {
    top: curtop,
    left: curleft
  };
} // from https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript/4819886#4819886


function is_touch_device() {
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');

  var mq = function mq(query) {
    return window.matchMedia(query).matches;
  };

  if ('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch) {
    return true;
  } // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH


  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}

var NavSlider;
NavSlider = {
  wide: true,
  open: true,
  menu: null,
  openMenu: null,
  closeMenu: null,
  opening: false,
  closing: false,
  dragging: false,
  accel: 0,
  init: function init() {
    (function ($) {
      var self = NavSlider;
      window.NavSlider = NavSlider; //function to find element Position

      var ts_margin = 30; //first and last thumbnail margin (for better cursor interaction) 

      var ts_easing = {
        duration: 1000,
        easing: "easeOutCirc"
      };
      var t_opacity = 0.8; //thumbnails default opacity

      var tcur_opacity = 0.9; //thumbnails default opacity for current element

      var tc_opacity_out = 0.075; //thumbnails area opacity on mouse out
      //cache vars

      if ($(window).innerWidth() < 600) {
        return;
      }

      var menu = $("#header-menu");
      var outer = $("#main-nav");
      var scroll = $("#main-nav > .wrapper");
      var ts_bg = $("#bg-nav");
      var ts_container = $("#menu-nav");
      var thumb = $("#menu-nav > .menu-item");
      var t_current = $("#menu-nav > .current-menu-item");
      var main_title = $("main > h1.title");
      var $menu = menu.get(0);
      var menu_height = menu.innerHeight(); //thumbnail scroller

      var ts_left = ts_container.position().left;
      var ts_width = outer.width();
      var t_count = 0;
      var dur_in = 200;
      var dur_out = 1000;
      var t_dur_in = 350;
      var t_dur_out = 500;
      var pos = get_pos($menu);
      var bg_pad = 400;
      var ease_in = {
        duration: dur_in,
        easing: "easeOutBack",
        queue: false
      };
      var ease_out = {
        duration: dur_out,
        easing: "easeOutExpo",
        queue: false
      };
      var t_ease_in = {
        duration: t_dur_in,
        easing: "easeOutElastic",
        queue: false
      };
      var t_ease_out = {
        duration: t_dur_out,
        easing: "easeOutBounce",
        queue: false
      };
      var tt_ease_in = {
        duration: t_dur_in,
        easing: "easeOutCubic",
        queue: false
      };
      var tt_ease_out = {
        duration: t_dur_out,
        easing: "easeOutCubic",
        queue: false
      };
      var tt_ease_in1 = {
        duration: t_dur_in,
        easing: "easeInCubic",
        queue: false
      };
      var tt_ease_out1 = {
        duration: t_dur_out,
        easing: "easeInCubic",
        queue: false
      };

      var _init = function _init() {
        ts_container.css("margingLeft", ts_margin + "px"); //add margin

        scroll.css("width", ts_width);
        outer.fadeTo(10000, tc_opacity_out, "easeInOutCubic");
        ts_container.css("width", t_count + 10);
        ts_bg.css("width", t_count + 2 * bg_pad);
      };

      self.menu = menu;

      self.openMenu = function (e) {
        //mouse over
        console.log('openMenu', {
          event: e,
          opening: self.opening,
          closing: self.closing
        });
        if (!self.wide) return;
        if (self.open || self.opening || self.closing) return;
        self.open = true;
        self.opening = true;
        if (window.requestAnimationFrame) window.requestAnimationFrame(function () {});
        window.setTimeout(function () {
          self.opening = false;
        }, 100);
        outer.stop().fadeTo(dur_in, 1);
        menu.stop().animate({
          height: menu_height
        }, ease_in);
        var top = $("#app>.page").scrollTop();
        main_title.stop().animate({
          bottom: 110 - top
        }, ease_in);
      };

      self.closeMenu = function (e) {
        //mouse out
        console.log('closeMenu', {
          event: e,
          opening: self.opening,
          closing: self.closing
        });
        if (!self.wide) return;
        if (self.opening || self.closing) return;
        self.open = false;
        self.closing = true;
        if (window.requestAnimationFrame) window.requestAnimationFrame(function () {});
        window.setTimeout(function () {
          self.closing = false;
        }, 100);
        menu.stop().animate({
          height: 15
        }, ease_out);
        main_title.stop().animate({
          bottom: 0
        }, ease_out);
      };

      thumb.each(function () {
        var $this = $(this);
        t_count += $this.innerWidth();
        $this.children().children().children(".thumb").fadeTo(dur_out, t_opacity);
      });
      scroll.mousemove(function (e) {
        if (!self.wide) return;
        var pos0;

        if (ts_container.width() > ts_width) {
          var cur = e.pageX - pos.left;
          var m_clamp = cur / ts_width;
          var dest = -(t_count + 2 * (ts_margin - ts_width)) * m_clamp;
          pos0 = Math.abs(cur - dest) - ts_margin;
        } else {
          pos0 = (t_count + ts_margin * 2 - ts_width) / 2;
        }

        if (Math.abs(pos0 - ts_container.position().left) > 20) {
          ts_bg.stop().animate({
            left: -pos0 / 2 - bg_pad
          }, ts_easing);
          ts_container.stop().animate({
            left: -pos0
          }, ts_easing);
        }
      });
      menu.hover(self.openMenu, self.closeMenu);
      thumb.not(t_current).hover(function () {
        //mouse over
        if (!self.wide) return;
        $(this).stop().fadeTo(dur_in, 1).animate({
          top: -12
        }, t_ease_in).find(".text").stop().animate({
          bottom: "95%"
        }, tt_ease_in).animate({
          opacity: 1
        }, tt_ease_in1);
      }, function () {
        //mouse out
        if (!self.wide) return;
        $(this).stop().fadeTo(t_dur_out, t_opacity).animate({
          top: 0
        }, t_ease_out).find(".text").stop().animate({
          bottom: 0
        }, tt_ease_out1).animate({
          opacity: 0
        }, tt_ease_out);
      });
      t_current.hover(function () {
        //mouse over
        if (!self.wide) return;
        $(this).stop().fadeTo(t_dur_in, 1).animate({
          top: -12
        }, t_ease_in).find(".text").stop().animate({
          bottom: "95%"
        }, tt_ease_in).animate({
          opacity: 1
        }, tt_ease_in1);
      }, function () {
        //mouse out
        if (!self.wide) return;
        $(this).stop().fadeTo(t_dur_out, tcur_opacity).animate({
          top: 0
        }, t_ease_out).find(".text").stop().animate({
          bottom: 0
        }, tt_ease_out1).animate({
          opacity: 0
        }, tt_ease_out);
      }); //on window resize scale image and reset thumbnail scroller

      $(window).resize(function () {
        console.log('window resized');
        var wwidth = $(window).width();
        var wasWide = self.wide;

        if (!(self.wide = wwidth >= 600)) {
          ts_container.css('left', '');
          ts_container.css("width", '');
          scroll.css('width', '');
          ts_bg.css("width", '');
          return;
        }

        if (!wasWide) _init(); // FullScreenBackground("#bgimg",$bgimg.data("newImageW"),$bgimg.data("newImageH"));

        ts_container.stop().animate({
          left: ts_left
        }, 400, "easeOutCirc");
        var newWidth = outer.width();
        scroll.css("width", newWidth);
        ts_width = newWidth;
        pos = get_pos($menu);
      });
      if (self.wide = $(window).width() >= 600) _init();else self.open = false;
    })(jQuery);
  },
  toggleMenu: function toggleMenu(open, duration) {
    var self = NavSlider;
    if (!duration) duration = 400;
    var $ = jQuery;

    if ($(window).innerWidth() >= 600) {
      if (self.menu) {
        if (open) {
          self.openMenu();
        } else {
          self.closeMenu();
        }
      }

      return;
    }

    $("#main-nav button.toggle-mobile").blur();

    if (open) {
      $("#main-nav").stop().animate({
        right: 40
      }, duration);
      $("#bg-nav").stop().fadeIn(duration);
    } else {
      $("#main-nav").stop().animate({
        right: '100%'
      }, duration);
      $("#bg-nav").stop().fadeOut(duration);
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (NavSlider);

/***/ })

}]);
//# sourceMappingURL=4.js.map