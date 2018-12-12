(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./js/components/nav-menu/index.js":
/*!*****************************************!*\
  !*** ./js/components/nav-menu/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_nav_slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/nav-slider */ "./js/lib/nav-slider.js");

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
  mounted: function mounted() {
    this.$nextTick(function () {
      _lib_nav_slider__WEBPACK_IMPORTED_MODULE_0__["default"].init();
    });
  },
  updated: function updated() {
    this.$nextTick(function () {
      _lib_nav_slider__WEBPACK_IMPORTED_MODULE_0__["default"].init();
    });
  }
});

/***/ }),

/***/ "./js/components/nav-menu/template.html":
/*!**********************************************!*\
  !*** ./js/components/nav-menu/template.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"header-menu\" class=\"header-menu\">\n  <div id=\"feature-tray\"><div id=\"feature-tray-inner\"></div></div>\n  <!-- nav -->\n  <nav id=\"main-nav\" class=\"nav main-nav\" role=\"navigation\">\n    <div class=\"wrapper\">\n      <div id=\"bg-nav\"></div>\n      <button class=\"menu-toggle toggle-mobile nav-menu\" type=\"button\"\n              data-toggle=\"collapse\" data-target=\"#menu-nav\"\n              aria-controls=\"menu-nav\" aria-expanded=\"false\"\n              aria-label=\"Toggle Navigation\">\n        <span class=\"navbar-toggle-icon\" aria-hidden=\"true\">Menu</span>\n      </button>\n      <router-link class=\"navbar-brand\" to=\"/\">\n        <!-- mobile logo -->\n        <img :src=\"logo\" alt=\"Logo\" class=\"logo-img mobile-logo\"/>\n        <!-- /mobile logo -->\n        <!-- mobile site title -->\n        <h1 class=\"site-title\">{{ title }}</h1>\n        <!-- /mobile site title -->\n      </router-link>\n      <div id=\"nav-main-container\" class=\"menu-nav-container\">\n        <ul id=\"menu-nav\" class=\"menu primary-menu nav navbar-nav collapse\">\n          <li v-for=\"( item, index ) in menu\" :key=\"index\" class=\"menu-item\">\n            <router-link :to=\"item.url\">\n              <img :src=\"item.thumb\" />\n              <span class=\"text\">{{ item.title }}</span>\n            </router-link>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </nav>\n  <!-- /nav -->\n</div>\n";

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
}

/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    (function ($) {
      //function to find element Position
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
      var scroll = $("#main-nav > .container");
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
      ts_container.css("margingLeft", ts_margin + "px"); //add margin

      scroll.css("width", ts_width);
      thumb.each(function () {
        var $this = $(this);
        t_count += $this.innerWidth();
        $this.children().children().children(".thumb").fadeTo(dur_out, t_opacity);
      });
      ts_container.css("width", t_count + 10);
      ts_bg.css("width", t_count + 2 * bg_pad);
      scroll.mousemove(function (e) {
        var pos0;

        if (ts_container.width() > ts_width) {
          var cur = e.pageX - pos.left;
          var m_clamp = cur / ts_width;
          var dest = -(t_count + 2 * (ts_margin - ts_width)) * m_clamp;
          pos0 = Math.abs(cur - dest) - ts_margin;
        } else {
          pos0 = (t_count + ts_margin * 2 - ts_width) / 2; // pos0 = ( ts_width - t_count ) / 2;
          // pos0 = ( ts_width - ( t_count - ts_margin * 2 )) / 2;
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
      outer.fadeTo(10000, tc_opacity_out, "easeInOutCubic");
      menu.hover(function () {
        //mouse over
        outer.stop().fadeTo(dur_in, 1);
        menu.stop().animate({
          height: menu_height
        }, ease_in);
        main_title.stop().animate({
          bottom: 110
        }, ts_easing);
      }, function () {
        //mouse out
        outer.stop().fadeTo(dur_out * 3, tc_opacity_out, "easeInOutCubic");
        menu.stop().animate({
          height: 15
        }, ease_out);
        main_title.stop().animate({
          bottom: 0
        }, ts_easing);
      });
      thumb.not(t_current).hover(function () {
        //mouse over
        $(this).stop().fadeTo(dur_in, 1).animate({
          top: -12
        }, t_ease_in).find(".text").stop().animate({
          bottom: "95%"
        }, tt_ease_in).animate({
          opacity: 1
        }, tt_ease_in1);
      }, function () {
        //mouse out
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
        $(this).stop().fadeTo(t_dur_in, 1).animate({
          top: -12
        }, t_ease_in).find(".text").stop().animate({
          bottom: "95%"
        }, tt_ease_in).animate({
          opacity: 1
        }, tt_ease_in1);
      }, function () {
        //mouse out
        $(this).stop().fadeTo(t_dur_out, tcur_opacity).animate({
          top: 0
        }, t_ease_out).find(".text").stop().animate({
          bottom: 0
        }, tt_ease_out1).animate({
          opacity: 0
        }, tt_ease_out);
      }); //on window resize scale image and reset thumbnail scroller

      $(window).resize(function () {
        // FullScreenBackground("#bgimg",$bgimg.data("newImageW"),$bgimg.data("newImageH"));
        ts_container.stop().animate({
          left: ts_left
        }, 400, "easeOutCirc");
        var newWidth = outer.width();
        scroll.css("width", newWidth);
        ts_width = newWidth;
        pos = get_pos($menu);
      }); // TODO: unbind if < 600px
    })(jQuery);
  }
});

/***/ })

}]);
//# sourceMappingURL=0.js.map