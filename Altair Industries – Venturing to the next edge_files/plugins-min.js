! function(e) { "use strict"; "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery) }(function(c) {
    "use strict";
    var r = window.Slick || {};
    (r = function() {
        function e(e, t) {
            var i, o = this;
            o.defaults = { accessibility: !0, adaptiveHeight: !1, appendArrows: c(e), appendDots: c(e), arrows: !0, asNavFor: null, prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>', nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>', autoplay: !1, autoplaySpeed: 3e3, centerMode: !1, centerPadding: "50px", cssEase: "ease", customPaging: function(e, t) { return c('<button type="button" data-role="none" role="button" tabindex="0" />').text(t + 1) }, dots: !1, dotsClass: "slick-dots", draggable: !0, easing: "linear", edgeFriction: .35, fade: !1, focusOnSelect: !1, infinite: !0, initialSlide: 0, lazyLoad: "ondemand", mobileFirst: !1, pauseOnHover: !0, pauseOnFocus: !0, pauseOnDotsHover: !1, respondTo: "window", responsive: null, rows: 1, rtl: !1, slide: "", slidesPerRow: 1, slidesToShow: 1, slidesToScroll: 1, speed: 500, swipe: !0, swipeToSlide: !1, touchMove: !0, touchThreshold: 5, useCSS: !0, useTransform: !0, variableWidth: !1, vertical: !1, verticalSwiping: !1, waitForAnimate: !0, zIndex: 1e3 }, o.initials = { animating: !1, dragging: !1, autoPlayTimer: null, currentDirection: 0, currentLeft: null, currentSlide: 0, direction: 1, $dots: null, listWidth: null, listHeight: null, loadIndex: 0, $nextArrow: null, $prevArrow: null, slideCount: null, slideWidth: null, $slideTrack: null, $slides: null, sliding: !1, slideOffset: 0, swipeLeft: null, $list: null, touchObject: {}, transformsEnabled: !1, unslicked: !1 }, c.extend(o, o.initials), o.activeBreakpoint = null, o.animType = null, o.animProp = null, o.breakpoints = [], o.breakpointSettings = [], o.cssTransitions = !1, o.focussed = !1, o.interrupted = !1, o.hidden = "hidden", o.paused = !0, o.positionProp = null, o.respondTo = null, o.rowCount = 1, o.shouldClick = !0, o.$slider = c(e), o.$slidesCache = null, o.transformType = null, o.transitionType = null, o.visibilityChange = "visibilitychange", o.windowWidth = 0, o.windowTimer = null, i = c(e).data("slick") || {}, o.options = c.extend({}, o.defaults, t, i), o.currentSlide = o.options.initialSlide, o.originalSettings = o.options, void 0 !== document.mozHidden ? (o.hidden = "mozHidden", o.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (o.hidden = "webkitHidden", o.visibilityChange = "webkitvisibilitychange"), o.autoPlay = c.proxy(o.autoPlay, o), o.autoPlayClear = c.proxy(o.autoPlayClear, o), o.autoPlayIterator = c.proxy(o.autoPlayIterator, o), o.changeSlide = c.proxy(o.changeSlide, o), o.clickHandler = c.proxy(o.clickHandler, o), o.selectHandler = c.proxy(o.selectHandler, o), o.setPosition = c.proxy(o.setPosition, o), o.swipeHandler = c.proxy(o.swipeHandler, o), o.dragHandler = c.proxy(o.dragHandler, o), o.keyHandler = c.proxy(o.keyHandler, o), o.instanceUid = n++, o.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, o.registerBreakpoints(), o.init(!0)
        }
        var n = 0;
        return e
    }()).prototype.activateADA = function() {
        var e;
        this.$slideTrack.find(".slick-active").attr({ "aria-hidden": "false" }).find("a, input, button, select").attr({ tabindex: "0" })
    }, r.prototype.addSlide = r.prototype.slickAdd = function(e, t, i) {
        var o = this;
        if ("boolean" == typeof t) i = t, t = null;
        else if (t < 0 || t >= o.slideCount) return !1;
        o.unload(), "number" == typeof t ? 0 === t && 0 === o.$slides.length ? c(e).appendTo(o.$slideTrack) : i ? c(e).insertBefore(o.$slides.eq(t)) : c(e).insertAfter(o.$slides.eq(t)) : !0 === i ? c(e).prependTo(o.$slideTrack) : c(e).appendTo(o.$slideTrack), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slides.each(function(e, t) { c(t).attr("data-slick-index", e) }), o.$slidesCache = o.$slides, o.reinit()
    }, r.prototype.animateHeight = function() {
        var e = this;
        if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.animate({ height: t }, e.options.speed)
        }
    }, r.prototype.animateSlide = function(e, t) {
        var i = {},
            o = this;
        o.animateHeight(), !0 === o.options.rtl && !1 === o.options.vertical && (e = -e), !1 === o.transformsEnabled ? !1 === o.options.vertical ? o.$slideTrack.animate({ left: e }, o.options.speed, o.options.easing, t) : o.$slideTrack.animate({ top: e }, o.options.speed, o.options.easing, t) : !1 === o.cssTransitions ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft), c({ animStart: o.currentLeft }).animate({ animStart: e }, { duration: o.options.speed, easing: o.options.easing, step: function(e) { e = Math.ceil(e), !1 === o.options.vertical ? i[o.animType] = "translate(" + e + "px, 0px)" : i[o.animType] = "translate(0px," + e + "px)", o.$slideTrack.css(i) }, complete: function() { t && t.call() } })) : (o.applyTransition(), e = Math.ceil(e), !1 === o.options.vertical ? i[o.animType] = "translate3d(" + e + "px, 0px, 0px)" : i[o.animType] = "translate3d(0px," + e + "px, 0px)", o.$slideTrack.css(i), t && setTimeout(function() { o.disableTransition(), t.call() }, o.options.speed))
    }, r.prototype.getNavTarget = function() {
        var e = this,
            t = e.options.asNavFor;
        return t && null !== t && (t = c(t).not(e.$slider)), t
    }, r.prototype.asNavFor = function(t) {
        var e, i = this.getNavTarget();
        null !== i && "object" == typeof i && i.each(function() {
            var e = c(this).slick("getSlick");
            e.unslicked || e.slideHandler(t, !0)
        })
    }, r.prototype.applyTransition = function(e) {
        var t = this,
            i = {};
        !1 === t.options.fade ? i[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : i[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase, !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i)
    }, r.prototype.autoPlay = function() {
        var e = this;
        e.autoPlayClear(), e.slideCount > e.options.slidesToShow && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
    }, r.prototype.autoPlayClear = function() {
        var e = this;
        e.autoPlayTimer && clearInterval(e.autoPlayTimer)
    }, r.prototype.autoPlayIterator = function() {
        var e = this,
            t = e.currentSlide + e.options.slidesToScroll;
        e.paused || e.interrupted || e.focussed || (!1 === e.options.infinite && (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1 ? e.direction = 0 : 0 === e.direction && (t = e.currentSlide - e.options.slidesToScroll, e.currentSlide - 1 == 0 && (e.direction = 1))), e.slideHandler(t))
    }, r.prototype.buildArrows = function() { var e = this;!0 === e.options.arrows && (e.$prevArrow = c(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = c(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({ "aria-disabled": "true", tabindex: "-1" })) }, r.prototype.buildDots = function() {
        var e, t, i = this;
        if (!0 === i.options.dots && i.slideCount > i.options.slidesToShow) {
            for (i.$slider.addClass("slick-dotted"), t = c("<ul />").addClass(i.options.dotsClass), e = 0; e <= i.getDotCount(); e += 1) t.append(c("<li />").append(i.options.customPaging.call(this, i, e)));
            i.$dots = t.appendTo(i.options.appendDots), i.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    }, r.prototype.buildOut = function() {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, t) { c(t).attr("data-slick-index", e).data("originalStyling", c(t).attr("style") || "") }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? c('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), (!0 === e.options.centerMode || !0 === e.options.swipeToSlide) && (e.options.slidesToScroll = 1), c("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
    }, r.prototype.buildRows = function() {
        var e, t, i, o, n, s, a, r = this;
        if (o = document.createDocumentFragment(), s = r.$slider.children(), 1 < r.options.rows) {
            for (a = r.options.slidesPerRow * r.options.rows, n = Math.ceil(s.length / a), e = 0; e < n; e++) {
                var l = document.createElement("div");
                for (t = 0; t < r.options.rows; t++) {
                    var d = document.createElement("div");
                    for (i = 0; i < r.options.slidesPerRow; i++) {
                        var c = e * a + (t * r.options.slidesPerRow + i);
                        s.get(c) && d.appendChild(s.get(c))
                    }
                    l.appendChild(d)
                }
                o.appendChild(l)
            }
            r.$slider.empty().append(o), r.$slider.children().children().children().css({ width: 100 / r.options.slidesPerRow + "%", display: "inline-block" })
        }
    }, r.prototype.checkResponsive = function(e, t) {
        var i, o, n, s = this,
            a = !1,
            r = s.$slider.width(),
            l = window.innerWidth || c(window).width();
        if ("window" === s.respondTo ? n = l : "slider" === s.respondTo ? n = r : "min" === s.respondTo && (n = Math.min(l, r)), s.options.responsive && s.options.responsive.length && null !== s.options.responsive) {
            for (i in o = null, s.breakpoints) s.breakpoints.hasOwnProperty(i) && (!1 === s.originalSettings.mobileFirst ? n < s.breakpoints[i] && (o = s.breakpoints[i]) : n > s.breakpoints[i] && (o = s.breakpoints[i]));
            null !== o ? null !== s.activeBreakpoint ? (o !== s.activeBreakpoint || t) && (s.activeBreakpoint = o, "unslick" === s.breakpointSettings[o] ? s.unslick(o) : (s.options = c.extend({}, s.originalSettings, s.breakpointSettings[o]), !0 === e && (s.currentSlide = s.options.initialSlide), s.refresh(e)), a = o) : (s.activeBreakpoint = o, "unslick" === s.breakpointSettings[o] ? s.unslick(o) : (s.options = c.extend({}, s.originalSettings, s.breakpointSettings[o]), !0 === e && (s.currentSlide = s.options.initialSlide), s.refresh(e)), a = o) : null !== s.activeBreakpoint && (s.activeBreakpoint = null, s.options = s.originalSettings, !0 === e && (s.currentSlide = s.options.initialSlide), s.refresh(e), a = o), e || !1 === a || s.$slider.trigger("breakpoint", [s, a])
        }
    }, r.prototype.changeSlide = function(e, t) {
        var i, o, n, s = this,
            a = c(e.currentTarget);
        switch (a.is("a") && e.preventDefault(), a.is("li") || (a = a.closest("li")), i = (n = s.slideCount % s.options.slidesToScroll != 0) ? 0 : (s.slideCount - s.currentSlide) % s.options.slidesToScroll, e.data.message) {
            case "previous":
                o = 0 === i ? s.options.slidesToScroll : s.options.slidesToShow - i, s.slideCount > s.options.slidesToShow && s.slideHandler(s.currentSlide - o, !1, t);
                break;
            case "next":
                o = 0 === i ? s.options.slidesToScroll : i, s.slideCount > s.options.slidesToShow && s.slideHandler(s.currentSlide + o, !1, t);
                break;
            case "index":
                var r = 0 === e.data.index ? 0 : e.data.index || a.index() * s.options.slidesToScroll;
                s.slideHandler(s.checkNavigable(r), !1, t), a.children().trigger("focus");
                break;
            default:
                return
        }
    }, r.prototype.checkNavigable = function(e) {
        var t, i, o;
        if (i = 0, e > (t = this.getNavigableIndexes())[t.length - 1]) e = t[t.length - 1];
        else
            for (var n in t) {
                if (e < t[n]) { e = i; break }
                i = t[n]
            }
        return e
    }, r.prototype.cleanUpEvents = function() {
        var e = this;
        e.options.dots && null !== e.$dots && c("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", c.proxy(e.interrupt, e, !0)).off("mouseleave.slick", c.proxy(e.interrupt, e, !1)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide)), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), c(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && c(e.$slideTrack).children().off("click.slick", e.selectHandler), c(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), c(window).off("resize.slick.slick-" + e.instanceUid, e.resize), c("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), c(window).off("load.slick.slick-" + e.instanceUid, e.setPosition), c(document).off("ready.slick.slick-" + e.instanceUid, e.setPosition)
    }, r.prototype.cleanUpSlideEvents = function() {
        var e = this;
        e.$list.off("mouseenter.slick", c.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", c.proxy(e.interrupt, e, !1))
    }, r.prototype.cleanUpRows = function() {
        var e, t = this;
        1 < t.options.rows && ((e = t.$slides.children().children()).removeAttr("style"), t.$slider.empty().append(e))
    }, r.prototype.clickHandler = function(e) { var t;!1 === this.shouldClick && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault()) }, r.prototype.destroy = function(e) {
        var t = this;
        t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), c(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() { c(this).attr("style", c(this).data("originalStyling")) }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t])
    }, r.prototype.disableTransition = function(e) {
        var t = this,
            i = {};
        i[t.transitionType] = "", !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i)
    }, r.prototype.fadeSlide = function(e, t) { var i = this;!1 === i.cssTransitions ? (i.$slides.eq(e).css({ zIndex: i.options.zIndex }), i.$slides.eq(e).animate({ opacity: 1 }, i.options.speed, i.options.easing, t)) : (i.applyTransition(e), i.$slides.eq(e).css({ opacity: 1, zIndex: i.options.zIndex }), t && setTimeout(function() { i.disableTransition(e), t.call() }, i.options.speed)) }, r.prototype.fadeSlideOut = function(e) { var t = this;!1 === t.cssTransitions ? t.$slides.eq(e).animate({ opacity: 0, zIndex: t.options.zIndex - 2 }, t.options.speed, t.options.easing) : (t.applyTransition(e), t.$slides.eq(e).css({ opacity: 0, zIndex: t.options.zIndex - 2 })) }, r.prototype.filterSlides = r.prototype.slickFilter = function(e) {
        var t = this;
        null !== e && (t.$slidesCache = t.$slides, t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(e).appendTo(t.$slideTrack), t.reinit())
    }, r.prototype.focusHandler = function() {
        var i = this;
        i.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(e) {
            e.stopImmediatePropagation();
            var t = c(this);
            setTimeout(function() { i.options.pauseOnFocus && (i.focussed = t.is(":focus"), i.autoPlay()) }, 0)
        })
    }, r.prototype.getCurrent = r.prototype.slickCurrentSlide = function() { var e; return this.currentSlide }, r.prototype.getDotCount = function() {
        var e = this,
            t = 0,
            i = 0,
            o = 0;
        if (!0 === e.options.infinite)
            for (; t < e.slideCount;) ++o, t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        else if (!0 === e.options.centerMode) o = e.slideCount;
        else if (e.options.asNavFor)
            for (; t < e.slideCount;) ++o, t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        else o = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll);
        return o - 1
    }, r.prototype.getLeft = function(e) {
        var t, i, o, n = this,
            s = 0;
        return n.slideOffset = 0, i = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = i * n.options.slidesToShow * -1), n.slideCount % n.options.slidesToScroll != 0 && e + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (s = e > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (e - n.slideCount)) * n.slideWidth * -1, (n.options.slidesToShow - (e - n.slideCount)) * i * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, n.slideCount % n.options.slidesToScroll * i * -1))) : e + n.options.slidesToShow > n.slideCount && (n.slideOffset = (e + n.options.slidesToShow - n.slideCount) * n.slideWidth, s = (e + n.options.slidesToShow - n.slideCount) * i), n.slideCount <= n.options.slidesToShow && (s = n.slideOffset = 0), !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), t = !1 === n.options.vertical ? e * n.slideWidth * -1 + n.slideOffset : e * i * -1 + s, !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(e) : n.$slideTrack.children(".slick-slide").eq(e + n.options.slidesToShow), t = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(e) : n.$slideTrack.children(".slick-slide").eq(e + n.options.slidesToShow + 1), t = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, t += (n.$list.width() - o.outerWidth()) / 2)), t
    }, r.prototype.getOption = r.prototype.slickGetOption = function(e) { var t; return this.options[e] }, r.prototype.getNavigableIndexes = function() {
        var e, t = this,
            i = 0,
            o = 0,
            n = [];
        for (e = !1 === t.options.infinite ? t.slideCount : (i = -1 * t.options.slidesToScroll, o = -1 * t.options.slidesToScroll, 2 * t.slideCount); i < e;) n.push(i), i = o + t.options.slidesToScroll, o += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
        return n
    }, r.prototype.getSlick = function() { return this }, r.prototype.getSlideCount = function() { var e, i, o, n = this; return o = !0 === n.options.centerMode ? n.slideWidth * Math.floor(n.options.slidesToShow / 2) : 0, !0 === n.options.swipeToSlide ? (n.$slideTrack.find(".slick-slide").each(function(e, t) { return t.offsetLeft - o + c(t).outerWidth() / 2 > -1 * n.swipeLeft ? (i = t, !1) : void 0 }), e = Math.abs(c(i).attr("data-slick-index") - n.currentSlide) || 1) : n.options.slidesToScroll }, r.prototype.goTo = r.prototype.slickGoTo = function(e, t) {
        var i;
        this.changeSlide({ data: { message: "index", index: parseInt(e) } }, t)
    }, r.prototype.init = function(e) {
        var t = this;
        c(t.$slider).hasClass("slick-initialized") || (c(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
    }, r.prototype.initADA = function() {
        var t = this;
        t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({ "aria-hidden": "true", tabindex: "-1" }).find("a, input, button, select").attr({ tabindex: "-1" }), t.$slideTrack.attr("role", "listbox"), t.$slides.not(t.$slideTrack.find(".slick-cloned")).each(function(e) { c(this).attr({ role: "option", "aria-describedby": "slick-slide" + t.instanceUid + e }) }), null !== t.$dots && t.$dots.attr("role", "tablist").find("li").each(function(e) { c(this).attr({ role: "presentation", "aria-selected": "false", "aria-controls": "navigation" + t.instanceUid + e, id: "slick-slide" + t.instanceUid + e }) }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), t.activateADA()
    }, r.prototype.initArrowEvents = function() { var e = this;!0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.off("click.slick").on("click.slick", { message: "previous" }, e.changeSlide), e.$nextArrow.off("click.slick").on("click.slick", { message: "next" }, e.changeSlide)) }, r.prototype.initDotEvents = function() { var e = this;!0 === e.options.dots && e.slideCount > e.options.slidesToShow && c("li", e.$dots).on("click.slick", { message: "index" }, e.changeSlide), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && c("li", e.$dots).on("mouseenter.slick", c.proxy(e.interrupt, e, !0)).on("mouseleave.slick", c.proxy(e.interrupt, e, !1)) }, r.prototype.initSlideEvents = function() {
        var e = this;
        e.options.pauseOnHover && (e.$list.on("mouseenter.slick", c.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", c.proxy(e.interrupt, e, !1)))
    }, r.prototype.initializeEvents = function() {
        var e = this;
        e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", { action: "start" }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", { action: "move" }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", { action: "end" }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", { action: "end" }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), c(document).on(e.visibilityChange, c.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && c(e.$slideTrack).children().on("click.slick", e.selectHandler), c(window).on("orientationchange.slick.slick-" + e.instanceUid, c.proxy(e.orientationChange, e)), c(window).on("resize.slick.slick-" + e.instanceUid, c.proxy(e.resize, e)), c("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), c(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), c(document).on("ready.slick.slick-" + e.instanceUid, e.setPosition)
    }, r.prototype.initUI = function() { var e = this;!0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(), e.$nextArrow.show()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.show() }, r.prototype.keyHandler = function(e) {
        var t = this;
        e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode && !0 === t.options.accessibility ? t.changeSlide({ data: { message: !0 === t.options.rtl ? "next" : "previous" } }) : 39 === e.keyCode && !0 === t.options.accessibility && t.changeSlide({ data: { message: !0 === t.options.rtl ? "previous" : "next" } }))
    }, r.prototype.lazyLoad = function() {
        function e(e) {
            c("img[data-lazy]", e).each(function() {
                var e = c(this),
                    t = c(this).attr("data-lazy"),
                    i = document.createElement("img");
                i.onload = function() { e.animate({ opacity: 0 }, 100, function() { e.attr("src", t).animate({ opacity: 1 }, 200, function() { e.removeAttr("data-lazy").removeClass("slick-loading") }), s.$slider.trigger("lazyLoaded", [s, e, t]) }) }, i.onerror = function() { e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), s.$slider.trigger("lazyLoadError", [s, e, t]) }, i.src = t
            })
        }
        var t, i, o, n, s = this;
        !0 === s.options.centerMode ? n = !0 === s.options.infinite ? (o = s.currentSlide + (s.options.slidesToShow / 2 + 1)) + s.options.slidesToShow + 2 : (o = Math.max(0, s.currentSlide - (s.options.slidesToShow / 2 + 1)), s.options.slidesToShow / 2 + 1 + 2 + s.currentSlide) : (o = s.options.infinite ? s.options.slidesToShow + s.currentSlide : s.currentSlide, n = Math.ceil(o + s.options.slidesToShow), !0 === s.options.fade && (0 < o && o--, n <= s.slideCount && n++)), e(t = s.$slider.find(".slick-slide").slice(o, n)), s.slideCount <= s.options.slidesToShow ? e(i = s.$slider.find(".slick-slide")) : s.currentSlide >= s.slideCount - s.options.slidesToShow ? e(i = s.$slider.find(".slick-cloned").slice(0, s.options.slidesToShow)) : 0 === s.currentSlide && e(i = s.$slider.find(".slick-cloned").slice(-1 * s.options.slidesToShow))
    }, r.prototype.loadSlider = function() {
        var e = this;
        e.setPosition(), e.$slideTrack.css({ opacity: 1 }), e.$slider.removeClass("slick-loading"), e.initUI(), "progressive" === e.options.lazyLoad && e.progressiveLazyLoad()
    }, r.prototype.next = r.prototype.slickNext = function() {
        var e;
        this.changeSlide({ data: { message: "next" } })
    }, r.prototype.orientationChange = function() {
        var e = this;
        e.checkResponsive(), e.setPosition()
    }, r.prototype.pause = r.prototype.slickPause = function() {
        var e = this;
        e.autoPlayClear(), e.paused = !0
    }, r.prototype.play = r.prototype.slickPlay = function() {
        var e = this;
        e.autoPlay(), e.options.autoplay = !0, e.paused = !1, e.focussed = !1, e.interrupted = !1
    }, r.prototype.postSlide = function(e) {
        var t = this;
        t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && t.initADA())
    }, r.prototype.prev = r.prototype.slickPrev = function() {
        var e;
        this.changeSlide({ data: { message: "previous" } })
    }, r.prototype.preventDefault = function(e) { e.preventDefault() }, r.prototype.progressiveLazyLoad = function(e) {
        e = e || 1;
        var t, i, o, n = this,
            s = c("img[data-lazy]", n.$slider);
        s.length ? (t = s.first(), i = t.attr("data-lazy"), (o = document.createElement("img")).onload = function() { t.attr("src", i).removeAttr("data-lazy").removeClass("slick-loading"), !0 === n.options.adaptiveHeight && n.setPosition(), n.$slider.trigger("lazyLoaded", [n, t, i]), n.progressiveLazyLoad() }, o.onerror = function() { e < 3 ? setTimeout(function() { n.progressiveLazyLoad(e + 1) }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, t, i]), n.progressiveLazyLoad()) }, o.src = i) : n.$slider.trigger("allImagesLoaded", [n])
    }, r.prototype.refresh = function(e) {
        var t, i, o = this;
        i = o.slideCount - o.options.slidesToShow, !o.options.infinite && o.currentSlide > i && (o.currentSlide = i), o.slideCount <= o.options.slidesToShow && (o.currentSlide = 0), t = o.currentSlide, o.destroy(!0), c.extend(o, o.initials, { currentSlide: t }), o.init(), e || o.changeSlide({ data: { message: "index", index: t } }, !1)
    }, r.prototype.registerBreakpoints = function() {
        var e, t, i, o = this,
            n = o.options.responsive || null;
        if ("array" === c.type(n) && n.length) {
            for (e in o.respondTo = o.options.respondTo || "window", n)
                if (i = o.breakpoints.length - 1, t = n[e].breakpoint, n.hasOwnProperty(e)) {
                    for (; 0 <= i;) o.breakpoints[i] && o.breakpoints[i] === t && o.breakpoints.splice(i, 1), i--;
                    o.breakpoints.push(t), o.breakpointSettings[t] = n[e].settings
                }
            o.breakpoints.sort(function(e, t) { return o.options.mobileFirst ? e - t : t - e })
        }
    }, r.prototype.reinit = function() {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && c(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
    }, r.prototype.resize = function() {
        var e = this;
        c(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() { e.windowWidth = c(window).width(), e.checkResponsive(), e.unslicked || e.setPosition() }, 50))
    }, r.prototype.removeSlide = r.prototype.slickRemove = function(e, t, i) { var o = this; return e = "boolean" == typeof e ? !0 === (t = e) ? 0 : o.slideCount - 1 : !0 === t ? --e : e, !(o.slideCount < 1 || e < 0 || e > o.slideCount - 1) && (o.unload(), !0 === i ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(e).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, void o.reinit()) }, r.prototype.setCSS = function(e) {
        var t, i, o = this,
            n = {};
        !0 === o.options.rtl && (e = -e), t = "left" == o.positionProp ? Math.ceil(e) + "px" : "0px", i = "top" == o.positionProp ? Math.ceil(e) + "px" : "0px", n[o.positionProp] = e, !1 === o.transformsEnabled || (!(n = {}) === o.cssTransitions ? n[o.animType] = "translate(" + t + ", " + i + ")" : n[o.animType] = "translate3d(" + t + ", " + i + ", 0px)"), o.$slideTrack.css(n)
    }, r.prototype.setDimensions = function() { var e = this;!1 === e.options.vertical ? !0 === e.options.centerMode && e.$list.css({ padding: "0px " + e.options.centerPadding }) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), !0 === e.options.centerMode && e.$list.css({ padding: e.options.centerPadding + " 0px" })), e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), !1 === e.options.vertical && !1 === e.options.variableWidth ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length))) : !0 === e.options.variableWidth ? e.$slideTrack.width(5e3 * e.slideCount) : (e.slideWidth = Math.ceil(e.listWidth), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length))); var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();!1 === e.options.variableWidth && e.$slideTrack.children(".slick-slide").width(e.slideWidth - t) }, r.prototype.setFade = function() {
        var i, o = this;
        o.$slides.each(function(e, t) { i = o.slideWidth * e * -1, !0 === o.options.rtl ? c(t).css({ position: "relative", right: i, top: 0, zIndex: o.options.zIndex - 2, opacity: 0 }) : c(t).css({ position: "relative", left: i, top: 0, zIndex: o.options.zIndex - 2, opacity: 0 }) }), o.$slides.eq(o.currentSlide).css({ zIndex: o.options.zIndex - 1, opacity: 1 })
    }, r.prototype.setHeight = function() {
        var e = this;
        if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.css("height", t)
        }
    }, r.prototype.setOption = r.prototype.slickSetOption = function(e, t, i) {
        var o, n, s, a, r, l = this,
            d = !1;
        if ("object" === c.type(e) ? (s = e, d = t, r = "multiple") : "string" === c.type(e) && (a = t, d = i, "responsive" === (s = e) && "array" === c.type(t) ? r = "responsive" : void 0 !== t && (r = "single")), "single" === r) l.options[s] = a;
        else if ("multiple" === r) c.each(s, function(e, t) { l.options[e] = t });
        else if ("responsive" === r)
            for (n in a)
                if ("array" !== c.type(l.options.responsive)) l.options.responsive = [a[n]];
                else {
                    for (o = l.options.responsive.length - 1; 0 <= o;) l.options.responsive[o].breakpoint === a[n].breakpoint && l.options.responsive.splice(o, 1), o--;
                    l.options.responsive.push(a[n])
                }
        d && (l.unload(), l.reinit())
    }, r.prototype.setPosition = function() {
        var e = this;
        e.setDimensions(), e.setHeight(), !1 === e.options.fade ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(), e.$slider.trigger("setPosition", [e])
    }, r.prototype.setProps = function() {
        var e = this,
            t = document.body.style;
        e.positionProp = !0 === e.options.vertical ? "top" : "left", "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"), (void 0 !== t.WebkitTransition || void 0 !== t.MozTransition || void 0 !== t.msTransition) && !0 === e.options.useCSS && (e.cssTransitions = !0), e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults.zIndex), void 0 !== t.OTransform && (e.animType = "OTransform", e.transformType = "-o-transform", e.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.MozTransform && (e.animType = "MozTransform", e.transformType = "-moz-transform", e.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)), void 0 !== t.webkitTransform && (e.animType = "webkitTransform", e.transformType = "-webkit-transform", e.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.msTransform && (e.animType = "msTransform", e.transformType = "-ms-transform", e.transitionType = "msTransition", void 0 === t.msTransform && (e.animType = !1)), void 0 !== t.transform && !1 !== e.animType && (e.animType = "transform", e.transformType = "transform", e.transitionType = "transition"), e.transformsEnabled = e.options.useTransform && null !== e.animType && !1 !== e.animType
    }, r.prototype.setSlideClasses = function(e) {
        var t, i, o, n, s = this;
        i = s.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), s.$slides.eq(e).addClass("slick-current"), !0 === s.options.centerMode ? (t = Math.floor(s.options.slidesToShow / 2), !0 === s.options.infinite && (t <= e && e <= s.slideCount - 1 - t ? s.$slides.slice(e - t, e + t + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = s.options.slidesToShow + e, i.slice(o - t + 1, o + t + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === e ? i.eq(i.length - 1 - s.options.slidesToShow).addClass("slick-center") : e === s.slideCount - 1 && i.eq(s.options.slidesToShow).addClass("slick-center")), s.$slides.eq(e).addClass("slick-center")) : 0 <= e && e <= s.slideCount - s.options.slidesToShow ? s.$slides.slice(e, e + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= s.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (n = s.slideCount % s.options.slidesToShow, o = !0 === s.options.infinite ? s.options.slidesToShow + e : e, s.options.slidesToShow == s.options.slidesToScroll && s.slideCount - e < s.options.slidesToShow ? i.slice(o - (s.options.slidesToShow - n), o + n).addClass("slick-active").attr("aria-hidden", "false") : i.slice(o, o + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === s.options.lazyLoad && s.lazyLoad()
    }, r.prototype.setupInfinite = function() {
        var e, t, i, o = this;
        if (!0 === o.options.fade && (o.options.centerMode = !1), !0 === o.options.infinite && !1 === o.options.fade && (t = null, o.slideCount > o.options.slidesToShow)) {
            for (i = !0 === o.options.centerMode ? o.options.slidesToShow + 1 : o.options.slidesToShow, e = o.slideCount; e > o.slideCount - i; e -= 1) t = e - 1, c(o.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
            for (e = 0; e < i; e += 1) t = e, c(o.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
            o.$slideTrack.find(".slick-cloned").find("[id]").each(function() { c(this).attr("id", "") })
        }
    }, r.prototype.interrupt = function(e) {
        var t = this;
        e || t.autoPlay(), t.interrupted = e
    }, r.prototype.selectHandler = function(e) {
        var t = this,
            i = c(e.target).is(".slick-slide") ? c(e.target) : c(e.target).parents(".slick-slide"),
            o = parseInt(i.attr("data-slick-index"));
        return o || (o = 0), t.slideCount <= t.options.slidesToShow ? (t.setSlideClasses(o), void t.asNavFor(o)) : void t.slideHandler(o)
    }, r.prototype.slideHandler = function(e, t, i) {
        var o, n, s, a, r, l = null,
            d = this;
        return t = t || !1, !0 === d.animating && !0 === d.options.waitForAnimate || !0 === d.options.fade && d.currentSlide === e || d.slideCount <= d.options.slidesToShow ? void 0 : (!1 === t && d.asNavFor(e), o = e, l = d.getLeft(o), a = d.getLeft(d.currentSlide), d.currentLeft = null === d.swipeLeft ? a : d.swipeLeft, !1 === d.options.infinite && !1 === d.options.centerMode && (e < 0 || e > d.getDotCount() * d.options.slidesToScroll) ? void(!1 === d.options.fade && (o = d.currentSlide, !0 !== i ? d.animateSlide(a, function() { d.postSlide(o) }) : d.postSlide(o))) : !1 === d.options.infinite && !0 === d.options.centerMode && (e < 0 || e > d.slideCount - d.options.slidesToScroll) ? void(!1 === d.options.fade && (o = d.currentSlide, !0 !== i ? d.animateSlide(a, function() { d.postSlide(o) }) : d.postSlide(o))) : (d.options.autoplay && clearInterval(d.autoPlayTimer), n = o < 0 ? d.slideCount % d.options.slidesToScroll != 0 ? d.slideCount - d.slideCount % d.options.slidesToScroll : d.slideCount + o : o >= d.slideCount ? d.slideCount % d.options.slidesToScroll != 0 ? 0 : o - d.slideCount : o, d.animating = !0, d.$slider.trigger("beforeChange", [d, d.currentSlide, n]), s = d.currentSlide, d.currentSlide = n, d.setSlideClasses(d.currentSlide), d.options.asNavFor && ((r = (r = d.getNavTarget()).slick("getSlick")).slideCount <= r.options.slidesToShow && r.setSlideClasses(d.currentSlide)), d.updateDots(), d.updateArrows(), !0 === d.options.fade ? (!0 !== i ? (d.fadeSlideOut(s), d.fadeSlide(n, function() { d.postSlide(n) })) : d.postSlide(n), void d.animateHeight()) : void(!0 !== i ? d.animateSlide(l, function() { d.postSlide(n) }) : d.postSlide(n))))
    }, r.prototype.startLoad = function() { var e = this;!0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.hide(), e.$slider.addClass("slick-loading") }, r.prototype.swipeDirection = function() { var e, t, i, o, n = this; return e = n.touchObject.startX - n.touchObject.curX, t = n.touchObject.startY - n.touchObject.curY, i = Math.atan2(t, e), (o = Math.round(180 * i / Math.PI)) < 0 && (o = 360 - Math.abs(o)), o <= 45 && 0 <= o ? !1 === n.options.rtl ? "left" : "right" : o <= 360 && 315 <= o ? !1 === n.options.rtl ? "left" : "right" : 135 <= o && o <= 225 ? !1 === n.options.rtl ? "right" : "left" : !0 === n.options.verticalSwiping ? 35 <= o && o <= 135 ? "down" : "up" : "vertical" }, r.prototype.swipeEnd = function(e) {
        var t, i, o = this;
        if (o.dragging = !1, o.interrupted = !1, o.shouldClick = !(10 < o.touchObject.swipeLength), void 0 === o.touchObject.curX) return !1;
        if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
            switch (i = o.swipeDirection()) {
                case "left":
                case "down":
                    t = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    t = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1
            }
            "vertical" != i && (o.slideHandler(t), o.touchObject = {}, o.$slider.trigger("swipe", [o, i]))
        } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
    }, r.prototype.swipeHandler = function(e) {
        var t = this;
        if (!(!1 === t.options.swipe || "ontouchend" in document && !1 === t.options.swipe || !1 === t.options.draggable && -1 !== e.type.indexOf("mouse"))) switch (t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1, t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold, !0 === t.options.verticalSwiping && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold), e.data.action) {
            case "start":
                t.swipeStart(e);
                break;
            case "move":
                t.swipeMove(e);
                break;
            case "end":
                t.swipeEnd(e)
        }
    }, r.prototype.swipeMove = function(e) { var t, i, o, n, s, a = this; return s = void 0 !== e.originalEvent ? e.originalEvent.touches : null, !(!a.dragging || s && 1 !== s.length) && (t = a.getLeft(a.currentSlide), a.touchObject.curX = void 0 !== s ? s[0].pageX : e.clientX, a.touchObject.curY = void 0 !== s ? s[0].pageY : e.clientY, a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))), !0 === a.options.verticalSwiping && (a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curY - a.touchObject.startY, 2)))), "vertical" !== (i = a.swipeDirection()) ? (void 0 !== e.originalEvent && 4 < a.touchObject.swipeLength && e.preventDefault(), n = (!1 === a.options.rtl ? 1 : -1) * (a.touchObject.curX > a.touchObject.startX ? 1 : -1), !0 === a.options.verticalSwiping && (n = a.touchObject.curY > a.touchObject.startY ? 1 : -1), o = a.touchObject.swipeLength, (a.touchObject.edgeHit = !1) === a.options.infinite && (0 === a.currentSlide && "right" === i || a.currentSlide >= a.getDotCount() && "left" === i) && (o = a.touchObject.swipeLength * a.options.edgeFriction, a.touchObject.edgeHit = !0), !1 === a.options.vertical ? a.swipeLeft = t + o * n : a.swipeLeft = t + o * (a.$list.height() / a.listWidth) * n, !0 === a.options.verticalSwiping && (a.swipeLeft = t + o * n), !0 !== a.options.fade && !1 !== a.options.touchMove && (!0 === a.animating ? (a.swipeLeft = null, !1) : void a.setCSS(a.swipeLeft))) : void 0) }, r.prototype.swipeStart = function(e) { var t, i = this; return i.interrupted = !0, 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow ? !(i.touchObject = {}) : (void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (t = e.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== t ? t.pageX : e.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== t ? t.pageY : e.clientY, void(i.dragging = !0)) }, r.prototype.unfilterSlides = r.prototype.slickUnfilter = function() {
        var e = this;
        null !== e.$slidesCache && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.appendTo(e.$slideTrack), e.reinit())
    }, r.prototype.unload = function() {
        var e = this;
        c(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, r.prototype.unslick = function(e) {
        var t = this;
        t.$slider.trigger("unslick", [t, e]), t.destroy()
    }, r.prototype.updateArrows = function() {
        var e, t = this;
        e = Math.floor(t.options.slidesToShow / 2), !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && !t.options.infinite && (t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === t.currentSlide ? (t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - t.options.slidesToShow && !1 === t.options.centerMode ? (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - 1 && !0 === t.options.centerMode && (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, r.prototype.updateDots = function() {
        var e = this;
        null !== e.$dots && (e.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
    }, r.prototype.visibility = function() {
        var e = this;
        e.options.autoplay && (document[e.hidden] ? e.interrupted = !0 : e.interrupted = !1)
    }, c.fn.slick = function(e) {
        var t, i, o = this,
            n = e,
            s = Array.prototype.slice.call(arguments, 1),
            a = o.length;
        for (t = 0; t < a; t++)
            if ("object" == typeof n || void 0 === n ? o[t].slick = new r(o[t], n) : i = o[t].slick[n].apply(o[t].slick, s), void 0 !== i) return i;
        return o
    }
}),
function(h) {
    var i = !0;
    h.flexslider = function(g, e) {
        var m = h(g);
        m.vars = h.extend({}, h.flexslider.defaults, e);
        var c = m.vars.namespace,
            y = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            p = ("ontouchstart" in window || y || window.DocumentTouch && document instanceof DocumentTouch) && m.vars.touch,
            r = "click touchend MSPointerUp keyup",
            l = "",
            t, w = "vertical" === m.vars.direction,
            b = m.vars.reverse,
            S = 0 < m.vars.itemWidth,
            k = "fade" === m.vars.animation,
            u = "" !== m.vars.asNavFor,
            f = {};
        h.data(g, "flexslider", m), f = {
            init: function() {
                m.animating = !1, m.currentSlide = parseInt(m.vars.startAt ? m.vars.startAt : 0, 10), isNaN(m.currentSlide) && (m.currentSlide = 0), m.animatingTo = m.currentSlide, m.atEnd = 0 === m.currentSlide || m.currentSlide === m.last, m.containerSelector = m.vars.selector.substr(0, m.vars.selector.search(" ")), m.slides = h(m.vars.selector, m), m.container = h(m.containerSelector, m), m.count = m.slides.length, m.syncExists = 0 < h(m.vars.sync).length, "slide" === m.vars.animation && (m.vars.animation = "swing"), m.prop = w ? "top" : "marginLeft", m.args = {}, m.manualPause = !1, m.stopped = !1, m.started = !1, m.startTimeout = null, m.transitions = !m.vars.video && !k && m.vars.useCSS && function() {
                    var e = document.createElement("div"),
                        t = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (var i in t)
                        if (void 0 !== e.style[t[i]]) return m.pfx = t[i].replace("Perspective", "").toLowerCase(), m.prop = "-" + m.pfx + "-transform", !0;
                    return !1
                }(), (m.ensureAnimationEnd = "") !== m.vars.controlsContainer && (m.controlsContainer = 0 < h(m.vars.controlsContainer).length && h(m.vars.controlsContainer)), "" !== m.vars.manualControls && (m.manualControls = 0 < h(m.vars.manualControls).length && h(m.vars.manualControls)), "" !== m.vars.customDirectionNav && (m.customDirectionNav = 2 === h(m.vars.customDirectionNav).length && h(m.vars.customDirectionNav)), m.vars.randomize && (m.slides.sort(function() { return Math.round(Math.random()) - .5 }), m.container.empty().append(m.slides)), m.doMath(), m.setup("init"), m.vars.controlNav && f.controlNav.setup(), m.vars.directionNav && f.directionNav.setup(), m.vars.keyboard && (1 === h(m.containerSelector).length || m.vars.multipleKeyboard) && h(document).bind("keyup", function(e) {
                    var t = e.keyCode;
                    if (!m.animating && (39 === t || 37 === t)) {
                        var i = 39 === t ? m.getTarget("next") : 37 === t && m.getTarget("prev");
                        m.flexAnimate(i, m.vars.pauseOnAction)
                    }
                }), m.vars.mousewheel && m.bind("mousewheel", function(e, t, i, o) {
                    e.preventDefault();
                    var n = t < 0 ? m.getTarget("next") : m.getTarget("prev");
                    m.flexAnimate(n, m.vars.pauseOnAction)
                }), m.vars.pausePlay && f.pausePlay.setup(), m.vars.slideshow && m.vars.pauseInvisible && f.pauseInvisible.init(), m.vars.slideshow && (m.vars.pauseOnHover && m.hover(function() { m.manualPlay || m.manualPause || m.pause() }, function() { m.manualPause || m.manualPlay || m.stopped || m.play() }), m.vars.pauseInvisible && f.pauseInvisible.isHidden() || (0 < m.vars.initDelay ? m.startTimeout = setTimeout(m.play, m.vars.initDelay) : m.play())), u && f.asNav.setup(), p && m.vars.touch && f.touch(), (!k || k && m.vars.smoothHeight) && h(window).bind("resize orientationchange focus", f.resize), m.find("img").attr("draggable", "false"), setTimeout(function() { m.vars.start(m) }, 200)
            },
            asNav: {
                setup: function() {
                    m.asNav = !0, m.animatingTo = Math.floor(m.currentSlide / m.move), m.currentItem = m.currentSlide, m.slides.removeClass(c + "active-slide").eq(m.currentItem).addClass(c + "active-slide"), y ? (g._slider = m).slides.each(function() {
                        var e = this;
                        e._gesture = new MSGesture, (e._gesture.target = e).addEventListener("MSPointerDown", function(e) { e.preventDefault(), e.currentTarget._gesture && e.currentTarget._gesture.addPointer(e.pointerId) }, !1), e.addEventListener("MSGestureTap", function(e) {
                            e.preventDefault();
                            var t = h(this),
                                i = t.index();
                            h(m.vars.asNavFor).data("flexslider").animating || t.hasClass("active") || (m.direction = m.currentItem < i ? "next" : "prev", m.flexAnimate(i, m.vars.pauseOnAction, !1, !0, !0))
                        })
                    }) : m.slides.on(r, function(e) {
                        e.preventDefault();
                        var t = h(this),
                            i = t.index(),
                            o;
                        t.offset().left - h(m).scrollLeft() <= 0 && t.hasClass(c + "active-slide") ? m.flexAnimate(m.getTarget("prev"), !0) : h(m.vars.asNavFor).data("flexslider").animating || t.hasClass(c + "active-slide") || (m.direction = m.currentItem < i ? "next" : "prev", m.flexAnimate(i, m.vars.pauseOnAction, !1, !0, !0))
                    })
                }
            },
            controlNav: {
                setup: function() { m.manualControls ? f.controlNav.setupManual() : f.controlNav.setupPaging() },
                setupPaging: function() {
                    var e = "thumbnails" === m.vars.controlNav ? "control-thumbs" : "control-paging",
                        t = 1,
                        i, o;
                    if (m.controlNavScaffold = h('<ol class="' + c + "control-nav " + c + e + '"></ol>'), 1 < m.pagingCount)
                        for (var n = 0; n < m.pagingCount; n++) {
                            void 0 === (o = m.slides.eq(n)).attr("data-thumb-alt") && o.attr("data-thumb-alt", "");
                            var s = "" !== o.attr("data-thumb-alt") ? s = ' alt="' + o.attr("data-thumb-alt") + '"' : "";
                            if (i = "thumbnails" === m.vars.controlNav ? '<img src="' + o.attr("data-thumb") + '"' + s + "/>" : '<a href="#">' + t + "</a>", "thumbnails" === m.vars.controlNav && !0 === m.vars.thumbCaptions) { var a = o.attr("data-thumbcaption"); "" !== a && void 0 !== a && (i += '<span class="' + c + 'caption">' + a + "</span>") }
                            m.controlNavScaffold.append("<li>" + i + "</li>"), t++
                        }
                    m.controlsContainer ? h(m.controlsContainer).append(m.controlNavScaffold) : m.append(m.controlNavScaffold), f.controlNav.set(), f.controlNav.active(), m.controlNavScaffold.delegate("a, img", r, function(e) {
                        if (e.preventDefault(), "" === l || l === e.type) {
                            var t = h(this),
                                i = m.controlNav.index(t);
                            t.hasClass(c + "active") || (m.direction = i > m.currentSlide ? "next" : "prev", m.flexAnimate(i, m.vars.pauseOnAction))
                        }
                        "" === l && (l = e.type), f.setToClearWatchedEvent()
                    })
                },
                setupManual: function() {
                    m.controlNav = m.manualControls, f.controlNav.active(), m.controlNav.bind(r, function(e) {
                        if (e.preventDefault(), "" === l || l === e.type) {
                            var t = h(this),
                                i = m.controlNav.index(t);
                            t.hasClass(c + "active") || (i > m.currentSlide ? m.direction = "next" : m.direction = "prev", m.flexAnimate(i, m.vars.pauseOnAction))
                        }
                        "" === l && (l = e.type), f.setToClearWatchedEvent()
                    })
                },
                set: function() {
                    var e = "thumbnails" === m.vars.controlNav ? "img" : "a";
                    m.controlNav = h("." + c + "control-nav li " + e, m.controlsContainer ? m.controlsContainer : m)
                },
                active: function() { m.controlNav.removeClass(c + "active").eq(m.animatingTo).addClass(c + "active") },
                update: function(e, t) { 1 < m.pagingCount && "add" === e ? m.controlNavScaffold.append(h('<li><a href="#">' + m.count + "</a></li>")) : 1 === m.pagingCount ? m.controlNavScaffold.find("li").remove() : m.controlNav.eq(t).closest("li").remove(), f.controlNav.set(), 1 < m.pagingCount && m.pagingCount !== m.controlNav.length ? m.update(t, e) : f.controlNav.active() }
            },
            directionNav: {
                setup: function() {
                    var e = h('<ul class="' + c + 'direction-nav"><li class="' + c + 'nav-prev"><a class="' + c + 'prev" href="#">' + m.vars.prevText + '</a></li><li class="' + c + 'nav-next"><a class="' + c + 'next" href="#">' + m.vars.nextText + "</a></li></ul>");
                    m.customDirectionNav ? m.directionNav = m.customDirectionNav : m.controlsContainer ? (h(m.controlsContainer).append(e), m.directionNav = h("." + c + "direction-nav li a", m.controlsContainer)) : (m.append(e), m.directionNav = h("." + c + "direction-nav li a", m)), f.directionNav.update(), m.directionNav.bind(r, function(e) {
                        var t;
                        e.preventDefault(), "" !== l && l !== e.type || (t = h(this).hasClass(c + "next") ? m.getTarget("next") : m.getTarget("prev"), m.flexAnimate(t, m.vars.pauseOnAction)), "" === l && (l = e.type), f.setToClearWatchedEvent()
                    })
                },
                update: function() {
                    var e = c + "disabled";
                    1 === m.pagingCount ? m.directionNav.addClass(e).attr("tabindex", "-1") : m.vars.animationLoop ? m.directionNav.removeClass(e).removeAttr("tabindex") : 0 === m.animatingTo ? m.directionNav.removeClass(e).filter("." + c + "prev").addClass(e).attr("tabindex", "-1") : m.animatingTo === m.last ? m.directionNav.removeClass(e).filter("." + c + "next").addClass(e).attr("tabindex", "-1") : m.directionNav.removeClass(e).removeAttr("tabindex")
                }
            },
            pausePlay: {
                setup: function() {
                    var e = h('<div class="' + c + 'pauseplay"><a href="#"></a></div>');
                    m.controlsContainer ? (m.controlsContainer.append(e), m.pausePlay = h("." + c + "pauseplay a", m.controlsContainer)) : (m.append(e), m.pausePlay = h("." + c + "pauseplay a", m)), f.pausePlay.update(m.vars.slideshow ? c + "pause" : c + "play"), m.pausePlay.bind(r, function(e) { e.preventDefault(), "" !== l && l !== e.type || (h(this).hasClass(c + "pause") ? (m.manualPause = !0, m.manualPlay = !1, m.pause()) : (m.manualPause = !1, m.manualPlay = !0, m.play())), "" === l && (l = e.type), f.setToClearWatchedEvent() })
                },
                update: function(e) { "play" === e ? m.pausePlay.removeClass(c + "pause").addClass(c + "play").html(m.vars.playText) : m.pausePlay.removeClass(c + "play").addClass(c + "pause").html(m.vars.pauseText) }
            },
            touch: function() {
                function e(e) { e.stopPropagation(), m.animating ? e.preventDefault() : (m.pause(), g._gesture.addPointer(e.pointerId), v = 0, r = w ? m.h : m.w, d = Number(new Date), a = S && b && m.animatingTo === m.last ? 0 : S && b ? m.limit - (m.itemW + m.vars.itemMargin) * m.move * m.animatingTo : S && m.currentSlide === m.last ? m.limit : S ? (m.itemW + m.vars.itemMargin) * m.move * m.currentSlide : b ? (m.last - m.currentSlide + m.cloneOffset) * r : (m.currentSlide + m.cloneOffset) * r) }

                function t(e) {
                    e.stopPropagation();
                    var t = e.target._slider;
                    if (t) {
                        var i = -e.translationX,
                            o = -e.translationY;
                        return l = v += w ? o : i, u = w ? Math.abs(v) < Math.abs(-i) : Math.abs(v) < Math.abs(-o), e.detail === e.MSGESTURE_FLAG_INERTIA ? void setImmediate(function() { g._gesture.stop() }) : void((!u || 500 < Number(new Date) - d) && (e.preventDefault(), !k && t.transitions && (t.vars.animationLoop || (l = v / (0 === t.currentSlide && v < 0 || t.currentSlide === t.last && 0 < v ? Math.abs(v) / r + 2 : 1)), t.setProps(a + l, "setTouch"))))
                    }
                }

                function i(e) {
                    e.stopPropagation();
                    var t = e.target._slider;
                    if (t) {
                        if (t.animatingTo === t.currentSlide && !u && null !== l) {
                            var i = b ? -l : l,
                                o = 0 < i ? t.getTarget("next") : t.getTarget("prev");
                            t.canAdvance(o) && (Number(new Date) - d < 550 && 50 < Math.abs(i) || Math.abs(i) > r / 2) ? t.flexAnimate(o, t.vars.pauseOnAction) : k || t.flexAnimate(t.currentSlide, t.vars.pauseOnAction, !0)
                        }
                        a = l = s = n = null, v = 0
                    }
                }
                var n, s, a, r, l, d, o, c, p, u = !1,
                    f = 0,
                    h = 0,
                    v = 0;
                y ? (g.style.msTouchAction = "none", g._gesture = new MSGesture, (g._gesture.target = g).addEventListener("MSPointerDown", e, !1), g._slider = m, g.addEventListener("MSGestureChange", t, !1), g.addEventListener("MSGestureEnd", i, !1)) : (o = function(e) { m.animating ? e.preventDefault() : (window.navigator.msPointerEnabled || 1 === e.touches.length) && (m.pause(), r = w ? m.h : m.w, d = Number(new Date), f = e.touches[0].pageX, h = e.touches[0].pageY, a = S && b && m.animatingTo === m.last ? 0 : S && b ? m.limit - (m.itemW + m.vars.itemMargin) * m.move * m.animatingTo : S && m.currentSlide === m.last ? m.limit : S ? (m.itemW + m.vars.itemMargin) * m.move * m.currentSlide : b ? (m.last - m.currentSlide + m.cloneOffset) * r : (m.currentSlide + m.cloneOffset) * r, n = w ? h : f, s = w ? f : h, g.addEventListener("touchmove", c, !1), g.addEventListener("touchend", p, !1)) }, c = function(e) {
                    f = e.touches[0].pageX, h = e.touches[0].pageY, l = w ? n - h : n - f;
                    var t = 500;
                    (!(u = w ? Math.abs(l) < Math.abs(f - s) : Math.abs(l) < Math.abs(h - s)) || Number(new Date) - d > t) && (e.preventDefault(), !k && m.transitions && (m.vars.animationLoop || (l /= 0 === m.currentSlide && l < 0 || m.currentSlide === m.last && 0 < l ? Math.abs(l) / r + 2 : 1), m.setProps(a + l, "setTouch")))
                }, p = function(e) {
                    if (g.removeEventListener("touchmove", c, !1), m.animatingTo === m.currentSlide && !u && null !== l) {
                        var t = b ? -l : l,
                            i = 0 < t ? m.getTarget("next") : m.getTarget("prev");
                        m.canAdvance(i) && (Number(new Date) - d < 550 && 50 < Math.abs(t) || Math.abs(t) > r / 2) ? m.flexAnimate(i, m.vars.pauseOnAction) : k || m.flexAnimate(m.currentSlide, m.vars.pauseOnAction, !0)
                    }
                    g.removeEventListener("touchend", p, !1), a = l = s = n = null
                }, g.addEventListener("touchstart", o, !1))
            },
            resize: function() {!m.animating && m.is(":visible") && (S || m.doMath(), k ? f.smoothHeight() : S ? (m.slides.width(m.computedW), m.update(m.pagingCount), m.setProps()) : w ? (m.viewport.height(m.h), m.setProps(m.h, "setTotal")) : (m.vars.smoothHeight && f.smoothHeight(), m.newSlides.width(m.computedW), m.setProps(m.computedW, "setTotal"))) },
            smoothHeight: function(e) {
                if (!w || k) {
                    var t = k ? m : m.viewport;
                    e ? t.animate({ height: m.slides.eq(m.animatingTo).innerHeight() }, e) : t.innerHeight(m.slides.eq(m.animatingTo).innerHeight())
                }
            },
            sync: function(e) {
                var t = h(m.vars.sync).data("flexslider"),
                    i = m.animatingTo;
                switch (e) {
                    case "animate":
                        t.flexAnimate(i, m.vars.pauseOnAction, !1, !0);
                        break;
                    case "play":
                        t.playing || t.asNav || t.play();
                        break;
                    case "pause":
                        t.pause()
                }
            },
            uniqueID: function(e) {
                return e.filter("[id]").add(e.find("[id]")).each(function() {
                    var e = h(this);
                    e.attr("id", e.attr("id") + "_clone")
                }), e
            },
            pauseInvisible: {
                visProp: null,
                init: function() {
                    var e = f.pauseInvisible.getHiddenProp();
                    if (e) {
                        var t = e.replace(/[H|h]idden/, "") + "visibilitychange";
                        document.addEventListener(t, function() { f.pauseInvisible.isHidden() ? m.startTimeout ? clearTimeout(m.startTimeout) : m.pause() : m.started ? m.play() : 0 < m.vars.initDelay ? setTimeout(m.play, m.vars.initDelay) : m.play() })
                    }
                },
                isHidden: function() { var e = f.pauseInvisible.getHiddenProp(); return !!e && document[e] },
                getHiddenProp: function() {
                    var e = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document) return "hidden";
                    for (var t = 0; t < e.length; t++)
                        if (e[t] + "Hidden" in document) return e[t] + "Hidden";
                    return null
                }
            },
            setToClearWatchedEvent: function() { clearTimeout(t), t = setTimeout(function() { l = "" }, 3e3) }
        }, m.flexAnimate = function(e, t, i, o, n) {
            if (m.vars.animationLoop || e === m.currentSlide || (m.direction = e > m.currentSlide ? "next" : "prev"), u && 1 === m.pagingCount && (m.direction = m.currentItem < e ? "next" : "prev"), !m.animating && (m.canAdvance(e, n) || i) && m.is(":visible")) {
                if (u && o) {
                    var s = h(m.vars.asNavFor).data("flexslider");
                    if (m.atEnd = 0 === e || e === m.count - 1, s.flexAnimate(e, !0, !1, !0, n), m.direction = m.currentItem < e ? "next" : "prev", s.direction = m.direction, Math.ceil((e + 1) / m.visible) - 1 === m.currentSlide || 0 === e) return m.currentItem = e, m.slides.removeClass(c + "active-slide").eq(e).addClass(c + "active-slide"), !1;
                    m.currentItem = e, m.slides.removeClass(c + "active-slide").eq(e).addClass(c + "active-slide"), e = Math.floor(e / m.visible)
                }
                if (m.animating = !0, m.animatingTo = e, t && m.pause(), m.vars.before(m), m.syncExists && !n && f.sync("animate"), m.vars.controlNav && f.controlNav.active(), S || m.slides.removeClass(c + "active-slide").eq(e).addClass(c + "active-slide"), m.atEnd = 0 === e || e === m.last, m.vars.directionNav && f.directionNav.update(), e === m.last && (m.vars.end(m), m.vars.animationLoop || m.pause()), k) p ? (m.slides.eq(m.currentSlide).css({ opacity: 0, zIndex: 1 }), m.slides.eq(e).css({ opacity: 1, zIndex: 2 }), m.wrapup(a)) : (m.slides.eq(m.currentSlide).css({ zIndex: 1 }).animate({ opacity: 0 }, m.vars.animationSpeed, m.vars.easing), m.slides.eq(e).css({ zIndex: 2 }).animate({ opacity: 1 }, m.vars.animationSpeed, m.vars.easing, m.wrapup));
                else {
                    var a = w ? m.slides.filter(":first").height() : m.computedW,
                        r, l, d;
                    l = S ? (r = m.vars.itemMargin, (d = (m.itemW + r) * m.move * m.animatingTo) > m.limit && 1 !== m.visible ? m.limit : d) : 0 === m.currentSlide && e === m.count - 1 && m.vars.animationLoop && "next" !== m.direction ? b ? (m.count + m.cloneOffset) * a : 0 : m.currentSlide === m.last && 0 === e && m.vars.animationLoop && "prev" !== m.direction ? b ? 0 : (m.count + 1) * a : b ? (m.count - 1 - e + m.cloneOffset) * a : (e + m.cloneOffset) * a, m.setProps(l, "", m.vars.animationSpeed), m.transitions ? (m.vars.animationLoop && m.atEnd || (m.animating = !1, m.currentSlide = m.animatingTo), m.container.unbind("webkitTransitionEnd transitionend"), m.container.bind("webkitTransitionEnd transitionend", function() { clearTimeout(m.ensureAnimationEnd), m.wrapup(a) }), clearTimeout(m.ensureAnimationEnd), m.ensureAnimationEnd = setTimeout(function() { m.wrapup(a) }, m.vars.animationSpeed + 100)) : m.container.animate(m.args, m.vars.animationSpeed, m.vars.easing, function() { m.wrapup(a) })
                }
                m.vars.smoothHeight && f.smoothHeight(m.vars.animationSpeed)
            }
        }, m.wrapup = function(e) { k || S || (0 === m.currentSlide && m.animatingTo === m.last && m.vars.animationLoop ? m.setProps(e, "jumpEnd") : m.currentSlide === m.last && 0 === m.animatingTo && m.vars.animationLoop && m.setProps(e, "jumpStart")), m.animating = !1, m.currentSlide = m.animatingTo, m.vars.after(m) }, m.animateSlides = function() {!m.animating && i && m.flexAnimate(m.getTarget("next")) }, m.pause = function() { clearInterval(m.animatedSlides), m.animatedSlides = null, m.playing = !1, m.vars.pausePlay && f.pausePlay.update("play"), m.syncExists && f.sync("pause") }, m.play = function() { m.playing && clearInterval(m.animatedSlides), m.animatedSlides = m.animatedSlides || setInterval(m.animateSlides, m.vars.slideshowSpeed), m.started = m.playing = !0, m.vars.pausePlay && f.pausePlay.update("pause"), m.syncExists && f.sync("play") }, m.stop = function() { m.pause(), m.stopped = !0 }, m.canAdvance = function(e, t) { var i = u ? m.pagingCount - 1 : m.last; return !!t || (!(!u || m.currentItem !== m.count - 1 || 0 !== e || "prev" !== m.direction) || (!u || 0 !== m.currentItem || e !== m.pagingCount - 1 || "next" === m.direction) && (!(e === m.currentSlide && !u) && (!!m.vars.animationLoop || (!m.atEnd || 0 !== m.currentSlide || e !== i || "next" === m.direction) && (!m.atEnd || m.currentSlide !== i || 0 !== e || "next" !== m.direction)))) }, m.getTarget = function(e) { return "next" === (m.direction = e) ? m.currentSlide === m.last ? 0 : m.currentSlide + 1 : 0 === m.currentSlide ? m.last : m.currentSlide - 1 }, m.setProps = function(e, t, i) {
            var o = (n = e || (m.itemW + m.vars.itemMargin) * m.move * m.animatingTo, -1 * function() {
                    if (S) return "setTouch" === t ? e : b && m.animatingTo === m.last ? 0 : b ? m.limit - (m.itemW + m.vars.itemMargin) * m.move * m.animatingTo : m.animatingTo === m.last ? m.limit : n;
                    switch (t) {
                        case "setTotal":
                            return b ? (m.count - 1 - m.currentSlide + m.cloneOffset) * e : (m.currentSlide + m.cloneOffset) * e;
                        case "setTouch":
                            return e;
                        case "jumpEnd":
                            return b ? e : m.count * e;
                        case "jumpStart":
                            return b ? m.count * e : e;
                        default:
                            return e
                    }
                }() + "px"),
                n, s;
            m.transitions && (o = w ? "translate3d(0," + o + ",0)" : "translate3d(" + o + ",0,0)", i = void 0 !== i ? i / 1e3 + "s" : "0s", m.container.css("-" + m.pfx + "-transition-duration", i), m.container.css("transition-duration", i)), m.args[m.prop] = o, (m.transitions || void 0 === i) && m.container.css(m.args), m.container.css("transform", o)
        }, m.setup = function(e) {
            var t, i;
            k ? (m.slides.css({ width: "100%", float: "left", marginRight: "-100%", position: "relative" }), "init" === e && (p ? m.slides.css({ opacity: 0, display: "block", webkitTransition: "opacity " + m.vars.animationSpeed / 1e3 + "s ease", zIndex: 1 }).eq(m.currentSlide).css({ opacity: 1, zIndex: 2 }) : 0 == m.vars.fadeFirstSlide ? m.slides.css({ opacity: 0, display: "block", zIndex: 1 }).eq(m.currentSlide).css({ zIndex: 2 }).css({ opacity: 1 }) : m.slides.css({ opacity: 0, display: "block", zIndex: 1 }).eq(m.currentSlide).css({ zIndex: 2 }).animate({ opacity: 1 }, m.vars.animationSpeed, m.vars.easing)), m.vars.smoothHeight && f.smoothHeight()) : ("init" === e && (m.viewport = h('<div class="' + c + 'viewport"></div>').css({ overflow: "hidden", position: "relative" }).appendTo(m).append(m.container), m.cloneCount = 0, m.cloneOffset = 0, b && (i = h.makeArray(m.slides).reverse(), m.slides = h(i), m.container.empty().append(m.slides))), m.vars.animationLoop && !S && (m.cloneCount = 2, m.cloneOffset = 1, "init" !== e && m.container.find(".clone").remove(), m.container.append(f.uniqueID(m.slides.first().clone().addClass("clone")).attr("aria-hidden", "true")).prepend(f.uniqueID(m.slides.last().clone().addClass("clone")).attr("aria-hidden", "true"))), m.newSlides = h(m.vars.selector, m), t = b ? m.count - 1 - m.currentSlide + m.cloneOffset : m.currentSlide + m.cloneOffset, w && !S ? (m.container.height(200 * (m.count + m.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function() { m.newSlides.css({ display: "block" }), m.doMath(), m.viewport.height(m.h), m.setProps(t * m.h, "init") }, "init" === e ? 100 : 0)) : (m.container.width(200 * (m.count + m.cloneCount) + "%"), m.setProps(t * m.computedW, "init"), setTimeout(function() { m.doMath(), m.newSlides.css({ width: m.computedW, marginRight: m.computedM, float: "left", display: "block" }), m.vars.smoothHeight && f.smoothHeight() }, "init" === e ? 100 : 0)));
            S || m.slides.removeClass(c + "active-slide").eq(m.currentSlide).addClass(c + "active-slide"), m.vars.init(m)
        }, m.doMath = function() {
            var e = m.slides.first(),
                t = m.vars.itemMargin,
                i = m.vars.minItems,
                o = m.vars.maxItems;
            m.w = void 0 === m.viewport ? m.width() : m.viewport.width(), m.h = e.height(), m.boxPadding = e.outerWidth() - e.width(), S ? (m.itemT = m.vars.itemWidth + t, m.itemM = t, m.minW = i ? i * m.itemT : m.w, m.maxW = o ? o * m.itemT - t : m.w, m.itemW = m.minW > m.w ? (m.w - t * (i - 1)) / i : m.maxW < m.w ? (m.w - t * (o - 1)) / o : m.vars.itemWidth > m.w ? m.w : m.vars.itemWidth, m.visible = Math.floor(m.w / m.itemW), m.move = 0 < m.vars.move && m.vars.move < m.visible ? m.vars.move : m.visible, m.pagingCount = Math.ceil((m.count - m.visible) / m.move + 1), m.last = m.pagingCount - 1, m.limit = 1 === m.pagingCount ? 0 : m.vars.itemWidth > m.w ? m.itemW * (m.count - 1) + t * (m.count - 1) : (m.itemW + t) * m.count - m.w - t) : (m.itemW = m.w, m.itemM = t, m.pagingCount = m.count, m.last = m.count - 1), m.computedW = m.itemW - m.boxPadding, m.computedM = m.itemM
        }, m.update = function(e, t) { m.doMath(), S || (e < m.currentSlide ? m.currentSlide += 1 : e <= m.currentSlide && 0 !== e && (m.currentSlide -= 1), m.animatingTo = m.currentSlide), m.vars.controlNav && !m.manualControls && ("add" === t && !S || m.pagingCount > m.controlNav.length ? f.controlNav.update("add") : ("remove" === t && !S || m.pagingCount < m.controlNav.length) && (S && m.currentSlide > m.last && (m.currentSlide -= 1, m.animatingTo -= 1), f.controlNav.update("remove", m.last))), m.vars.directionNav && f.directionNav.update() }, m.addSlide = function(e, t) {
            var i = h(e);
            m.count += 1, m.last = m.count - 1, w && b ? void 0 !== t ? m.slides.eq(m.count - t).after(i) : m.container.prepend(i) : void 0 !== t ? m.slides.eq(t).before(i) : m.container.append(i), m.update(t, "add"), m.slides = h(m.vars.selector + ":not(.clone)", m), m.setup(), m.vars.added(m)
        }, m.removeSlide = function(e) {
            var t = isNaN(e) ? m.slides.index(h(e)) : e;
            m.count -= 1, m.last = m.count - 1, isNaN(e) ? h(e, m.slides).remove() : w && b ? m.slides.eq(m.last).remove() : m.slides.eq(e).remove(), m.doMath(), m.update(t, "remove"), m.slides = h(m.vars.selector + ":not(.clone)", m), m.setup(), m.vars.removed(m)
        }, f.init()
    }, h(window).blur(function(e) { i = !1 }).focus(function(e) { i = !0 }), h.flexslider.defaults = { namespace: "flex-", selector: ".slides > li", animation: "fade", easing: "swing", direction: "horizontal", reverse: !1, animationLoop: !0, smoothHeight: !1, startAt: 0, slideshow: !0, slideshowSpeed: 7e3, animationSpeed: 600, initDelay: 0, randomize: !1, fadeFirstSlide: !0, thumbCaptions: !1, pauseOnAction: !0, pauseOnHover: !1, pauseInvisible: !0, useCSS: !0, touch: !0, video: !1, controlNav: !0, directionNav: !0, prevText: "Previous", nextText: "Next", keyboard: !0, multipleKeyboard: !1, mousewheel: !1, pausePlay: !1, pauseText: "Pause", playText: "Play", controlsContainer: "", manualControls: "", customDirectionNav: "", sync: "", asNavFor: "", itemWidth: 0, itemMargin: 0, minItems: 1, maxItems: 0, move: 0, allowOneSlide: !0, start: function() {}, before: function() {}, after: function() {}, end: function() {}, added: function() {}, removed: function() {}, init: function() {} }, h.fn.flexslider = function(o) {
        if (void 0 === o && (o = {}), "object" == typeof o) return this.each(function() {
            var e = h(this),
                t = o.selector ? o.selector : ".slides > li",
                i = e.find(t);
            1 === i.length && !1 === o.allowOneSlide || 0 === i.length ? (i.fadeIn(400), o.start && o.start(e)) : void 0 === e.data("flexslider") && new h.flexslider(this, o)
        });
        var e = h(this).data("flexslider");
        switch (o) {
            case "play":
                e.play();
                break;
            case "pause":
                e.pause();
                break;
            case "stop":
                e.stop();
                break;
            case "next":
                e.flexAnimate(e.getTarget("next"), !0);
                break;
            case "prev":
            case "previous":
                e.flexAnimate(e.getTarget("prev"), !0);
                break;
            default:
                "number" == typeof o && e.flexAnimate(o, !0)
        }
    }
}(jQuery),
function(e) { "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? e(require("jquery")) : e(window.jQuery || window.Zepto) }(function(c) {
    var l = "Close",
        d = "BeforeClose",
        i = "AfterClose",
        o = "BeforeAppend",
        p = "MarkupParse",
        u = "Open",
        n = "Change",
        s = "mfp",
        f = ".mfp",
        h = "mfp-ready",
        a = "mfp-removing",
        r = "mfp-prevent-close",
        v, e = function() {},
        g = !!window.jQuery,
        m, y = c(window),
        w, b, S, t, k = function(e, t) { v.ev.on(s + e + f, t) },
        T = function(e, t, i, o) { var n = document.createElement("div"); return n.className = "mfp-" + e, i && (n.innerHTML = i), o ? t && t.appendChild(n) : (n = c(n), t && n.appendTo(t)), n },
        C = function(e, t) { v.ev.triggerHandler(s + e, t), v.st.callbacks && (e = e.charAt(0).toLowerCase() + e.slice(1), v.st.callbacks[e] && v.st.callbacks[e].apply(v, c.isArray(t) ? t : [t])) },
        x = function(e) { return e === t && v.currTemplate.closeBtn || (v.currTemplate.closeBtn = c(v.st.closeMarkup.replace("%title%", v.st.tClose)), t = e), v.currTemplate.closeBtn },
        $ = function() { c.magnificPopup.instance || ((v = new e).init(), c.magnificPopup.instance = v) },
        I = function() {
            var e = document.createElement("p").style,
                t = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== e.transition) return !0;
            for (; t.length;)
                if (t.pop() + "Transition" in e) return !0;
            return !1
        };
    e.prototype = {
        constructor: e,
        init: function() {
            var e = navigator.appVersion;
            v.isLowIE = v.isIE8 = document.all && !document.addEventListener, v.isAndroid = /android/gi.test(e), v.isIOS = /iphone|ipad|ipod/gi.test(e), v.supportsTransition = I(), v.probablyMobile = v.isAndroid || v.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), w = c(document), v.popupsCache = {}
        },
        open: function(e) {
            var t;
            if (!1 === e.isObj) {
                v.items = e.items.toArray(), v.index = 0;
                var i = e.items,
                    o;
                for (t = 0; t < i.length; t++)
                    if ((o = i[t]).parsed && (o = o.el[0]), o === e.el[0]) { v.index = t; break }
            } else v.items = c.isArray(e.items) ? e.items : [e.items], v.index = e.index || 0;
            if (!v.isOpen) {
                v.types = [], S = "", e.mainEl && e.mainEl.length ? v.ev = e.mainEl.eq(0) : v.ev = w, e.key ? (v.popupsCache[e.key] || (v.popupsCache[e.key] = {}), v.currTemplate = v.popupsCache[e.key]) : v.currTemplate = {}, v.st = c.extend(!0, {}, c.magnificPopup.defaults, e), v.fixedContentPos = "auto" === v.st.fixedContentPos ? !v.probablyMobile : v.st.fixedContentPos, v.st.modal && (v.st.closeOnContentClick = !1, v.st.closeOnBgClick = !1, v.st.showCloseBtn = !1, v.st.enableEscapeKey = !1), v.bgOverlay || (v.bgOverlay = T("bg").on("click" + f, function() { v.close() }), v.wrap = T("wrap").attr("tabindex", -1).on("click" + f, function(e) { v._checkIfClose(e.target) && v.close() }), v.container = T("container", v.wrap)), v.contentContainer = T("content"), v.st.preloader && (v.preloader = T("preloader", v.container, v.st.tLoading));
                var n = c.magnificPopup.modules;
                for (t = 0; t < n.length; t++) {
                    var s = n[t];
                    s = s.charAt(0).toUpperCase() + s.slice(1), v["init" + s].call(v)
                }
                C("BeforeOpen"), v.st.showCloseBtn && (v.st.closeBtnInside ? (k(p, function(e, t, i, o) { i.close_replaceWith = x(o.type) }), S += " mfp-close-btn-in") : v.wrap.append(x())), v.st.alignTop && (S += " mfp-align-top"), v.fixedContentPos ? v.wrap.css({ overflow: v.st.overflowY, overflowX: "hidden", overflowY: v.st.overflowY }) : v.wrap.css({ top: y.scrollTop(), position: "absolute" }), (!1 === v.st.fixedBgPos || "auto" === v.st.fixedBgPos && !v.fixedContentPos) && v.bgOverlay.css({ height: w.height(), position: "absolute" }), v.st.enableEscapeKey && w.on("keyup" + f, function(e) { 27 === e.keyCode && v.close() }), y.on("resize" + f, function() { v.updateSize() }), v.st.closeOnContentClick || (S += " mfp-auto-cursor"), S && v.wrap.addClass(S);
                var a = v.wH = y.height(),
                    r = {};
                if (v.fixedContentPos && v._hasScrollBar(a)) {
                    var l = v._getScrollbarSize();
                    l && (r.marginRight = l)
                }
                v.fixedContentPos && (v.isIE7 ? c("body, html").css("overflow", "hidden") : r.overflow = "hidden");
                var d = v.st.mainClass;
                return v.isIE7 && (d += " mfp-ie7"), d && v._addClassToMFP(d), v.updateItemHTML(), C("BuildControls"), c("html").css(r), v.bgOverlay.add(v.wrap).prependTo(v.st.prependTo || c(document.body)), v._lastFocusedEl = document.activeElement, setTimeout(function() { v.content ? (v._addClassToMFP(h), v._setFocus()) : v.bgOverlay.addClass(h), w.on("focusin" + f, v._onFocusIn) }, 16), v.isOpen = !0, v.updateSize(a), C(u), e
            }
            v.updateItemHTML()
        },
        close: function() { v.isOpen && (C(d), v.isOpen = !1, v.st.removalDelay && !v.isLowIE && v.supportsTransition ? (v._addClassToMFP(a), setTimeout(function() { v._close() }, v.st.removalDelay)) : v._close()) },
        _close: function() {
            C(l);
            var e = a + " " + h + " ";
            if (v.bgOverlay.detach(), v.wrap.detach(), v.container.empty(), v.st.mainClass && (e += v.st.mainClass + " "), v._removeClassFromMFP(e), v.fixedContentPos) {
                var t = { marginRight: "" };
                v.isIE7 ? c("body, html").css("overflow", "") : t.overflow = "", c("html").css(t)
            }
            w.off("keyup.mfp focusin" + f), v.ev.off(f), v.wrap.attr("class", "mfp-wrap").removeAttr("style"), v.bgOverlay.attr("class", "mfp-bg"), v.container.attr("class", "mfp-container"), v.st.showCloseBtn && (!v.st.closeBtnInside || !0 === v.currTemplate[v.currItem.type]) && v.currTemplate.closeBtn && v.currTemplate.closeBtn.detach(), v.st.autoFocusLast && v._lastFocusedEl && c(v._lastFocusedEl).focus(), v.currItem = null, v.content = null, v.currTemplate = null, v.prevHeight = 0, C(i)
        },
        updateSize: function(e) {
            if (v.isIOS) {
                var t = document.documentElement.clientWidth / window.innerWidth,
                    i = window.innerHeight * t;
                v.wrap.css("height", i), v.wH = i
            } else v.wH = e || y.height();
            v.fixedContentPos || v.wrap.css("height", v.wH), C("Resize")
        },
        updateItemHTML: function() {
            var e = v.items[v.index];
            v.contentContainer.detach(), v.content && v.content.detach(), e.parsed || (e = v.parseEl(v.index));
            var t = e.type;
            if (C("BeforeChange", [v.currItem ? v.currItem.type : "", t]), v.currItem = e, !v.currTemplate[t]) {
                var i = !!v.st[t] && v.st[t].markup;
                C("FirstMarkupParse", i), v.currTemplate[t] = !i || c(i)
            }
            b && b !== e.type && v.container.removeClass("mfp-" + b + "-holder");
            var o = v["get" + t.charAt(0).toUpperCase() + t.slice(1)](e, v.currTemplate[t]);
            v.appendContent(o, t), e.preloaded = !0, C(n, e), b = e.type, v.container.prepend(v.contentContainer), C("AfterChange")
        },
        appendContent: function(e, t) {
            (v.content = e) ? v.st.showCloseBtn && v.st.closeBtnInside && !0 === v.currTemplate[t] ? v.content.find(".mfp-close").length || v.content.append(x()) : v.content = e: v.content = "", C(o), v.container.addClass("mfp-" + t + "-holder"), v.contentContainer.append(v.content)
        },
        parseEl: function(e) {
            var t = v.items[e],
                i;
            if ((t = t.tagName ? { el: c(t) } : (i = t.type, { data: t, src: t.src })).el) {
                for (var o = v.types, n = 0; n < o.length; n++)
                    if (t.el.hasClass("mfp-" + o[n])) { i = o[n]; break }
                t.src = t.el.attr("data-mfp-src"), t.src || (t.src = t.el.attr("href"))
            }
            return t.type = i || v.st.type || "inline", t.index = e, t.parsed = !0, v.items[e] = t, C("ElementParse", t), v.items[e]
        },
        addGroup: function(t, i) {
            var e = function(e) { e.mfpEl = this, v._openClick(e, t, i) };
            i || (i = {});
            var o = "click.magnificPopup";
            i.mainEl = t, i.items ? (i.isObj = !0, t.off(o).on(o, e)) : (i.isObj = !1, i.delegate ? t.off(o).on(o, i.delegate, e) : (i.items = t).off(o).on(o, e))
        },
        _openClick: function(e, t, i) {
            var o;
            if ((void 0 !== i.midClick ? i.midClick : c.magnificPopup.defaults.midClick) || !(2 === e.which || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey)) {
                var n = void 0 !== i.disableOn ? i.disableOn : c.magnificPopup.defaults.disableOn;
                if (n)
                    if (c.isFunction(n)) { if (!n.call(v)) return !0 } else if (y.width() < n) return !0;
                e.type && (e.preventDefault(), v.isOpen && e.stopPropagation()), i.el = c(e.mfpEl), i.delegate && (i.items = t.find(i.delegate)), v.open(i)
            }
        },
        updateStatus: function(e, t) {
            if (v.preloader) {
                m !== e && v.container.removeClass("mfp-s-" + m), !t && "loading" === e && (t = v.st.tLoading);
                var i = { status: e, text: t };
                C("UpdateStatus", i), e = i.status, t = i.text, v.preloader.html(t), v.preloader.find("a").on("click", function(e) { e.stopImmediatePropagation() }), v.container.addClass("mfp-s-" + e), m = e
            }
        },
        _checkIfClose: function(e) {
            if (!c(e).hasClass(r)) {
                var t = v.st.closeOnContentClick,
                    i = v.st.closeOnBgClick;
                if (t && i) return !0;
                if (!v.content || c(e).hasClass("mfp-close") || v.preloader && e === v.preloader[0]) return !0;
                if (e === v.content[0] || c.contains(v.content[0], e)) { if (t) return !0 } else if (i && c.contains(document, e)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(e) { v.bgOverlay.addClass(e), v.wrap.addClass(e) },
        _removeClassFromMFP: function(e) { this.bgOverlay.removeClass(e), v.wrap.removeClass(e) },
        _hasScrollBar: function(e) { return (v.isIE7 ? w.height() : document.body.scrollHeight) > (e || y.height()) },
        _setFocus: function() {
            (v.st.focus ? v.content.find(v.st.focus).eq(0) : v.wrap).focus()
        },
        _onFocusIn: function(e) { if (e.target !== v.wrap[0] && !c.contains(v.wrap[0], e.target)) return v._setFocus(), !1 },
        _parseMarkup: function(n, e, t) {
            var s;
            t.data && (e = c.extend(t.data, e)), C(p, [n, e, t]), c.each(e, function(e, t) { if (void 0 === t || !1 === t) return !0; if (1 < (s = e.split("_")).length) { var i = n.find(f + "-" + s[0]); if (0 < i.length) { var o = s[1]; "replaceWith" === o ? i[0] !== t[0] && i.replaceWith(t) : "img" === o ? i.is("img") ? i.attr("src", t) : i.replaceWith(c("<img>").attr("src", t).attr("class", i.attr("class"))) : i.attr(s[1], t) } } else n.find(f + "-" + e).html(t) })
        },
        _getScrollbarSize: function() {
            if (void 0 === v.scrollbarSize) {
                var e = document.createElement("div");
                e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(e), v.scrollbarSize = e.offsetWidth - e.clientWidth, document.body.removeChild(e)
            }
            return v.scrollbarSize
        }
    }, c.magnificPopup = { instance: null, proto: e.prototype, modules: [], open: function(e, t) { return $(), (e = e ? c.extend(!0, {}, e) : {}).isObj = !0, e.index = t || 0, this.instance.open(e) }, close: function() { return c.magnificPopup.instance && c.magnificPopup.instance.close() }, registerModule: function(e, t) { t.options && (c.magnificPopup.defaults[e] = t.options), c.extend(this.proto, t.proto), this.modules.push(e) }, defaults: { disableOn: 0, key: null, midClick: !1, mainClass: "", preloader: !0, focus: "", closeOnContentClick: !1, closeOnBgClick: !0, closeBtnInside: !0, showCloseBtn: !0, enableEscapeKey: !0, modal: !1, alignTop: !1, removalDelay: 0, prependTo: null, fixedContentPos: "auto", fixedBgPos: "auto", overflowY: "auto", closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>', tClose: "Close (Esc)", tLoading: "Loading...", autoFocusLast: !0 } }, c.fn.magnificPopup = function(e, t) {
        $();
        var i = c(this);
        if ("string" == typeof e)
            if ("open" === e) {
                var o, n = g ? i.data("magnificPopup") : i[0].magnificPopup,
                    s = parseInt(t, 10) || 0;
                o = n.items ? n.items[s] : (o = i, n.delegate && (o = o.find(n.delegate)), o.eq(s)), v._openClick({ mfpEl: o }, i, n)
            } else v.isOpen && v[e].apply(v, Array.prototype.slice.call(arguments, 1));
        else e = c.extend(!0, {}, e), g ? i.data("magnificPopup", e) : i[0].magnificPopup = e, v.addGroup(i, e);
        return i
    };
    var P = "inline",
        M, L, A, O = function() { A && (L.after(A.addClass(M)).detach(), A = null) };
    c.magnificPopup.registerModule(P, {
        options: { hiddenClass: "hide", markup: "", tNotFound: "Content not found" },
        proto: {
            initInline: function() { v.types.push(P), k(l + "." + P, function() { O() }) },
            getInline: function(e, t) {
                if (O(), e.src) {
                    var i = v.st.inline,
                        o = c(e.src);
                    if (o.length) {
                        var n = o[0].parentNode;
                        n && n.tagName && (L || (M = i.hiddenClass, L = T(M), M = "mfp-" + M), A = o.after(L).detach().removeClass(M)), v.updateStatus("ready")
                    } else v.updateStatus("error", i.tNotFound), o = c("<div>");
                    return e.inlineElement = o
                }
                return v.updateStatus("ready"), v._parseMarkup(t, {}, e), t
            }
        }
    });
    var E = "ajax",
        N, z = function() { N && c(document.body).removeClass(N) },
        H = function() { z(), v.req && v.req.abort() };
    c.magnificPopup.registerModule(E, {
        options: { settings: null, cursor: "mfp-ajax-cur", tError: '<a href="%url%">The content</a> could not be loaded.' },
        proto: {
            initAjax: function() { v.types.push(E), N = v.st.ajax.cursor, k(l + "." + E, H), k("BeforeChange." + E, H) },
            getAjax: function(n) {
                N && c(document.body).addClass(N), v.updateStatus("loading");
                var e = c.extend({
                    url: n.src,
                    success: function(e, t, i) {
                        var o = { data: e, xhr: i };
                        C("ParseAjax", o), v.appendContent(c(o.data), E), n.finished = !0, z(), v._setFocus(), setTimeout(function() { v.wrap.addClass(h) }, 16), v.updateStatus("ready"), C("AjaxContentAdded")
                    },
                    error: function() { z(), n.finished = n.loadError = !0, v.updateStatus("error", v.st.ajax.tError.replace("%url%", n.src)) }
                }, v.st.ajax.settings);
                return v.req = c.ajax(e), ""
            }
        }
    });
    var j, D = function(e) { if (e.data && void 0 !== e.data.title) return e.data.title; var t = v.st.image.titleSrc; if (t) { if (c.isFunction(t)) return t.call(v, e); if (e.el) return e.el.attr(t) || "" } return "" };
    c.magnificPopup.registerModule("image", {
        options: { markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>', cursor: "mfp-zoom-out-cur", titleSrc: "title", verticalFit: !0, tError: '<a href="%url%">The image</a> could not be loaded.' },
        proto: {
            initImage: function() {
                var e = v.st.image,
                    t = ".image";
                v.types.push("image"), k(u + t, function() { "image" === v.currItem.type && e.cursor && c(document.body).addClass(e.cursor) }), k(l + t, function() { e.cursor && c(document.body).removeClass(e.cursor), y.off("resize" + f) }), k("Resize" + t, v.resizeImage), v.isLowIE && k("AfterChange", v.resizeImage)
            },
            resizeImage: function() {
                var e = v.currItem;
                if (e && e.img && v.st.image.verticalFit) {
                    var t = 0;
                    v.isLowIE && (t = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", v.wH - t)
                }
            },
            _onImageHasSize: function(e) { e.img && (e.hasSize = !0, j && clearInterval(j), e.isCheckingImgSize = !1, C("ImageHasSize", e), e.imgHidden && (v.content && v.content.removeClass("mfp-loading"), e.imgHidden = !1)) },
            findImageSize: function(t) {
                var i = 0,
                    o = t.img[0],
                    n = function(e) { j && clearInterval(j), j = setInterval(function() { 0 < o.naturalWidth ? v._onImageHasSize(t) : (200 < i && clearInterval(j), 3 === ++i ? n(10) : 40 === i ? n(50) : 100 === i && n(500)) }, e) };
                n(1)
            },
            getImage: function(e, t) {
                var i = 0,
                    o = function() { e && (e.img[0].complete ? (e.img.off(".mfploader"), e === v.currItem && (v._onImageHasSize(e), v.updateStatus("ready")), e.hasSize = !0, e.loaded = !0, C("ImageLoadComplete")) : ++i < 200 ? setTimeout(o, 100) : n()) },
                    n = function() { e && (e.img.off(".mfploader"), e === v.currItem && (v._onImageHasSize(e), v.updateStatus("error", s.tError.replace("%url%", e.src))), e.hasSize = !0, e.loaded = !0, e.loadError = !0) },
                    s = v.st.image,
                    a = t.find(".mfp-img");
                if (a.length) {
                    var r = document.createElement("img");
                    r.className = "mfp-img", e.el && e.el.find("img").length && (r.alt = e.el.find("img").attr("alt")), e.img = c(r).on("load.mfploader", o).on("error.mfploader", n), r.src = e.src, a.is("img") && (e.img = e.img.clone()), 0 < (r = e.img[0]).naturalWidth ? e.hasSize = !0 : r.width || (e.hasSize = !1)
                }
                return v._parseMarkup(t, { title: D(e), img_replaceWith: e.img }, e), v.resizeImage(), e.hasSize ? (j && clearInterval(j), e.loadError ? (t.addClass("mfp-loading"), v.updateStatus("error", s.tError.replace("%url%", e.src))) : (t.removeClass("mfp-loading"), v.updateStatus("ready"))) : (v.updateStatus("loading"), e.loading = !0, e.hasSize || (e.imgHidden = !0, t.addClass("mfp-loading"), v.findImageSize(e))), t
            }
        }
    });
    var B, _ = function() { return void 0 === B && (B = void 0 !== document.createElement("p").style.MozTransform), B };
    c.magnificPopup.registerModule("zoom", {
        options: { enabled: !1, easing: "ease-in-out", duration: 300, opener: function(e) { return e.is("img") ? e : e.find("img") } },
        proto: {
            initZoom: function() {
                var s = v.st.zoom,
                    e = ".zoom",
                    t;
                if (s.enabled && v.supportsTransition) {
                    var i = s.duration,
                        o = function(e) {
                            var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                i = "all " + s.duration / 1e3 + "s " + s.easing,
                                o = { position: "fixed", zIndex: 9999, left: 0, top: 0, "-webkit-backface-visibility": "hidden" },
                                n = "transition";
                            return o["-webkit-" + n] = o["-moz-" + n] = o["-o-" + n] = o[n] = i, t.css(o), t
                        },
                        n = function() { v.content.css("visibility", "visible") },
                        a, r;
                    k("BuildControls" + e, function() {
                        if (v._allowZoom()) {
                            if (clearTimeout(a), v.content.css("visibility", "hidden"), !(t = v._getItemToZoom())) return void n();
                            (r = o(t)).css(v._getOffset()), v.wrap.append(r), a = setTimeout(function() { r.css(v._getOffset(!0)), a = setTimeout(function() { n(), setTimeout(function() { r.remove(), t = r = null, C("ZoomAnimationEnded") }, 16) }, i) }, 16)
                        }
                    }), k(d + e, function() {
                        if (v._allowZoom()) {
                            if (clearTimeout(a), v.st.removalDelay = i, !t) {
                                if (!(t = v._getItemToZoom())) return;
                                r = o(t)
                            }
                            r.css(v._getOffset(!0)), v.wrap.append(r), v.content.css("visibility", "hidden"), setTimeout(function() { r.css(v._getOffset()) }, 16)
                        }
                    }), k(l + e, function() { v._allowZoom() && (n(), r && r.remove(), t = null) })
                }
            },
            _allowZoom: function() { return "image" === v.currItem.type },
            _getItemToZoom: function() { return !!v.currItem.hasSize && v.currItem.img },
            _getOffset: function(e) {
                var t, i = (t = e ? v.currItem.img : v.st.zoom.opener(v.currItem.el || v.currItem)).offset(),
                    o = parseInt(t.css("padding-top"), 10),
                    n = parseInt(t.css("padding-bottom"), 10);
                i.top -= c(window).scrollTop() - o;
                var s = { width: t.width(), height: (g ? t.innerHeight() : t[0].offsetHeight) - n - o };
                return _() ? s["-moz-transform"] = s.transform = "translate(" + i.left + "px," + i.top + "px)" : (s.left = i.left, s.top = i.top), s
            }
        }
    });
    var W = "iframe",
        q = "//about:blank",
        F = function(e) {
            if (v.currTemplate[W]) {
                var t = v.currTemplate[W].find("iframe");
                t.length && (e || (t[0].src = q), v.isIE8 && t.css("display", e ? "block" : "none"))
            }
        };
    c.magnificPopup.registerModule(W, {
        options: { markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>', srcAction: "iframe_src", patterns: { youtube: { index: "youtube.com", id: "v=", src: "//www.youtube.com/embed/%id%?autoplay=1" }, vimeo: { index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1" }, gmaps: { index: "//maps.google.", src: "%id%&output=embed" } } },
        proto: {
            initIframe: function() { v.types.push(W), k("BeforeChange", function(e, t, i) { t !== i && (t === W ? F() : i === W && F(!0)) }), k(l + "." + W, function() { F() }) },
            getIframe: function(e, t) {
                var i = e.src,
                    o = v.st.iframe;
                c.each(o.patterns, function() { if (-1 < i.indexOf(this.index)) return this.id && (i = "string" == typeof this.id ? i.substr(i.lastIndexOf(this.id) + this.id.length, i.length) : this.id.call(this, i)), i = this.src.replace("%id%", i), !1 });
                var n = {};
                return o.srcAction && (n[o.srcAction] = i), v._parseMarkup(t, n, e), v.updateStatus("ready"), t
            }
        }
    });
    var U = function(e) { var t = v.items.length; return t - 1 < e ? e - t : e < 0 ? t + e : e },
        R = function(e, t, i) { return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, i) };
    c.magnificPopup.registerModule("gallery", {
        options: { enabled: !1, arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', preload: [0, 2], navigateByImgClick: !0, arrows: !0, tPrev: "Previous (Left arrow key)", tNext: "Next (Right arrow key)", tCounter: "%curr% of %total%" },
        proto: {
            initGallery: function() {
                var s = v.st.gallery,
                    e = ".mfp-gallery";
                if (v.direction = !0, !s || !s.enabled) return !1;
                S += " mfp-gallery", k(u + e, function() { s.navigateByImgClick && v.wrap.on("click" + e, ".mfp-img", function() { if (1 < v.items.length) return v.next(), !1 }), w.on("keydown" + e, function(e) { 37 === e.keyCode ? v.prev() : 39 === e.keyCode && v.next() }) }), k("UpdateStatus" + e, function(e, t) { t.text && (t.text = R(t.text, v.currItem.index, v.items.length)) }), k(p + e, function(e, t, i, o) {
                    var n = v.items.length;
                    i.counter = 1 < n ? R(s.tCounter, o.index, n) : ""
                }), k("BuildControls" + e, function() {
                    if (1 < v.items.length && s.arrows && !v.arrowLeft) {
                        var e = s.arrowMarkup,
                            t = v.arrowLeft = c(e.replace(/%title%/gi, s.tPrev).replace(/%dir%/gi, "left")).addClass(r),
                            i = v.arrowRight = c(e.replace(/%title%/gi, s.tNext).replace(/%dir%/gi, "right")).addClass(r);
                        t.click(function() { v.prev() }), i.click(function() { v.next() }), v.container.append(t.add(i))
                    }
                }), k(n + e, function() { v._preloadTimeout && clearTimeout(v._preloadTimeout), v._preloadTimeout = setTimeout(function() { v.preloadNearbyImages(), v._preloadTimeout = null }, 16) }), k(l + e, function() { w.off(e), v.wrap.off("click" + e), v.arrowRight = v.arrowLeft = null })
            },
            next: function() { v.direction = !0, v.index = U(v.index + 1), v.updateItemHTML() },
            prev: function() { v.direction = !1, v.index = U(v.index - 1), v.updateItemHTML() },
            goTo: function(e) { v.direction = e >= v.index, v.index = e, v.updateItemHTML() },
            preloadNearbyImages: function() {
                var e = v.st.gallery.preload,
                    t = Math.min(e[0], v.items.length),
                    i = Math.min(e[1], v.items.length),
                    o;
                for (o = 1; o <= (v.direction ? i : t); o++) v._preloadItem(v.index + o);
                for (o = 1; o <= (v.direction ? t : i); o++) v._preloadItem(v.index - o)
            },
            _preloadItem: function(e) {
                if (e = U(e), !v.items[e].preloaded) {
                    var t = v.items[e];
                    t.parsed || (t = v.parseEl(e)), C("LazyLoad", t), "image" === t.type && (t.img = c('<img class="mfp-img" />').on("load.mfploader", function() { t.hasSize = !0 }).on("error.mfploader", function() { t.hasSize = !0, t.loadError = !0, C("LazyLoadError", t) }).attr("src", t.src)), t.preloaded = !0
                }
            }
        }
    });
    var Z = "retina";
    c.magnificPopup.registerModule(Z, {
        options: { replaceSrc: function(e) { return e.src.replace(/\.\w+$/, function(e) { return "@2x" + e }) }, ratio: 1 },
        proto: {
            initRetina: function() {
                if (1 < window.devicePixelRatio) {
                    var i = v.st.retina,
                        o = i.ratio;
                    1 < (o = isNaN(o) ? o() : o) && (k("ImageHasSize." + Z, function(e, t) { t.img.css({ "max-width": t.img[0].naturalWidth / o, width: "100%" }) }), k("ElementParse." + Z, function(e, t) { t.src = i.replaceSrc(t, o) }))
                }
            }
        }
    }), $()
}),
function(m) {
    m.fn.superfish = function(o) {
        var n = m.fn.superfish,
            s = n.c,
            t = m('<span class="' + s.arrowClass + '"> &#187;</span>'),
            a = function() {
                var e = m(this),
                    t = d(e);
                clearTimeout(t.sfTimer), e.showSuperfishUl().siblings().hideSuperfishUl()
            },
            r = function(e) {
                var t = m(this),
                    i = d(t);
                "click" === e.type || n.ios ? m.proxy(l, t, i)() : (clearTimeout(i.sfTimer), i.sfTimer = setTimeout(m.proxy(l, t, i), i.delay))
            },
            l = function(e) { e.retainPath = -1 < m.inArray(this[0], e.$path), this.hideSuperfishUl(), this.parents("." + e.hoverClass).length || (e.onIdle.call(i(this)), e.$path.length && m.proxy(a, e.$path)()) },
            i = function(e) { return e.closest("." + s.menuClass) },
            d = function(e) { return i(e).data("sf-options") },
            c = function(e) { e.css("ms-touch-action", "none") },
            p = function(e, t) {
                var i = "li:has(ul)";
                t.useClick || (m.fn.hoverIntent && !t.disableHI ? e.hoverIntent(a, r, i) : e.on("mouseenter", i, a).on("mouseleave", i, r));
                var o = "MSPointerDown";
                n.ios || (o += " touchstart"), n.wp7 && (o += " mousedown"), e.on("focusin", "li", a).on("focusout", "li", r).on("click", "a", t, f).on(o, "a", u)
            },
            u = function(e) {
                var t = m(this),
                    i = t.siblings("ul");
                if (0 < i.length && i.is(":hidden") && (t.data("follow", !1), "MSPointerDown" === e.type)) return t.trigger("focus"), !1
            },
            f = function(e) {
                var t = m(this),
                    i = e.data,
                    o = t.siblings("ul"),
                    n = !1 !== t.data("follow");
                !o.length || !i.useClick && n || (e.preventDefault(), o.is(":hidden") ? m.proxy(a, t.parent("li"))() : i.useClick && n && m.proxy(r, t.parent("li"), e)())
            },
            h = function(e, t) { return e.find("li." + t.pathClass).slice(0, t.pathLevels).addClass(t.hoverClass + " " + s.bcClass).filter(function() { return m(this).children("ul").hide().show().length }).removeClass(t.pathClass) },
            v = function(e, t) { t.autoArrows && e.children("a").each(function() { g(m(this)) }) },
            g = function(e) { e.addClass(s.anchorClass).append(t.clone()) };
        return n.getOptions = d, this.addClass(s.menuClass).each(function() {
            var e = m(this),
                t = m.extend({}, n.defaults, o),
                i = e.find("li:has(ul)");
            t.$path = h(e, t), e.data("sf-options", t), v(i, t), c(e), p(e, t), i.not("." + s.bcClass).hideSuperfishUl(!0), t.onInit.call(this)
        })
    };
    var a = m.fn.superfish,
        e;
    a.o = [], a.op = {}, a.c = { bcClass: "sf-breadcrumb", menuClass: "sf-js-enabled", anchorClass: "sf-with-ul", arrowClass: "sf-sub-indicator" }, a.defaults = { hoverClass: "sfHover", pathClass: "overrideThisToUse", pathLevels: 1, delay: 800, animation: { opacity: "show" }, animationOut: { opacity: "hide" }, speed: "normal", speedOut: "fast", autoArrows: !0, disableHI: !1, useClick: !1, onInit: m.noop, onBeforeShow: m.noop, onShow: m.noop, onBeforeHide: m.noop, onHide: m.noop, onIdle: m.noop }, a.ios = /iPhone|iPad|iPod/i.test(navigator.userAgent), a.wp7 = "behavior" in (e = document.documentElement.style) && "fill" in e && /iemobile/i.test(navigator.userAgent), m.fn.extend({
        hideSuperfishUl: function(e) {
            if (this.length) {
                var t = this,
                    i = a.getOptions(t),
                    o = !0 === i.retainPath ? i.$path : "",
                    n = t.find("li." + i.hoverClass).add(this).not(o).removeClass(i.hoverClass).children("ul"),
                    s = i.speedOut;
                e && (n.show(), s = 0), i.retainPath = !1, i.onBeforeHide.call(n), n.stop(!0, !0).animate(i.animationOut, s, function() { i.onHide.call(m(this)), i.useClick && t.children("a").data("follow", !1) })
            }
            return this
        },
        showSuperfishUl: function() {
            var e = a.getOptions(this),
                t = this.addClass(e.hoverClass),
                i = t.children("ul");
            return e.onBeforeShow.call(i), i.stop(!0, !0).animate(e.animation, e.speed, function() { e.onShow.call(i), t.children("a").data("follow", !0) }), this
        }
    }), a.ios && m(window).load(function() { m("body").children().on("click", m.noop) })
}(jQuery),
function(a) {
    "use strict";
    a.fn.fitVids = function(e) {
        var i = { customSelector: null, ignore: null };
        if (!document.getElementById("fit-vids-style")) {
            var t = document.head || document.getElementsByTagName("head")[0],
                o = ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}",
                n = document.createElement("div");
            n.innerHTML = '<p>x</p><style id="fit-vids-style">' + o + "</style>", t.appendChild(n.childNodes[1])
        }
        return e && a.extend(i, e), this.each(function() {
            var e = ['iframe[src*="player.vimeo.com"]', 'iframe[src*="youtube.com"]', 'iframe[src*="youtube-nocookie.com"]', 'iframe[src*="kickstarter.com"][src*="video.html"]', "object", "embed"];
            i.customSelector && e.push(i.customSelector);
            var s = ".fitvidsignore";
            i.ignore && (s = s + ", " + i.ignore);
            var t = a(this).find(e.join(","));
            (t = (t = t.not("object object")).not(s)).each(function() {
                var e = a(this);
                if (!(0 < e.parents(s).length || "embed" === this.tagName.toLowerCase() && e.parent("object").length || e.parent(".fluid-width-video-wrapper").length)) {
                    e.css("height") || e.css("width") || !isNaN(e.attr("height")) && !isNaN(e.attr("width")) || (e.attr("height", 9), e.attr("width", 16));
                    var t, i, o = ("object" === this.tagName.toLowerCase() || e.attr("height") && !isNaN(parseInt(e.attr("height"), 10)) ? parseInt(e.attr("height"), 10) : e.height()) / (isNaN(parseInt(e.attr("width"), 10)) ? e.width() : parseInt(e.attr("width"), 10));
                    if (!e.attr("name")) {
                        var n = "fitvid" + a.fn.fitVids._count;
                        e.attr("name", n), a.fn.fitVids._count++
                    }
                    e.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * o + "%"), e.removeAttr("height").removeAttr("width")
                }
            })
        })
    }, a.fn.fitVids._count = 0
}(window.jQuery || window.Zepto),
function(e) {
    var s = e.event,
        a, r;
    a = s.special.debouncedresize = {
        setup: function() { e(this).on("resize", a.handler) },
        teardown: function() { e(this).off("resize", a.handler) },
        handler: function(e, t) {
            var i = this,
                o = arguments,
                n = function() { e.type = "debouncedresize", s.dispatch.apply(i, o) };
            r && clearTimeout(r), t ? n() : r = setTimeout(n, a.threshold)
        },
        threshold: 150
    }
}(jQuery),
function(E, m) {
    function t() { H || (H = { verbose: !1, queryLimit: { attempt: 5, delay: 250, random: 250 }, classes: { Map: google.maps.Map, Marker: google.maps.Marker, InfoWindow: google.maps.InfoWindow, Circle: google.maps.Circle, Rectangle: google.maps.Rectangle, OverlayView: google.maps.OverlayView, StreetViewPanorama: google.maps.StreetViewPanorama, KmlLayer: google.maps.KmlLayer, TrafficLayer: google.maps.TrafficLayer, BicyclingLayer: google.maps.BicyclingLayer, GroundOverlay: google.maps.GroundOverlay, StyledMapType: google.maps.StyledMapType, ImageMapType: google.maps.ImageMapType }, map: { mapTypeId: google.maps.MapTypeId.ROADMAP, center: [46.578498, 2.457275], zoom: 2 }, overlay: { pane: "floatPane", content: "", offset: { x: 0, y: 0 } }, geoloc: { getCurrentPosition: { maximumAge: 6e4, timeout: 5e3 } } }) }

    function N(e, t) { return e !== m ? e : "gmap3_" + (t ? o + 1 : ++o) }

    function d(e) {
        var t = function(e) { return parseInt(e, 10) },
            i = google.maps.version.split(".").map(t),
            o;
        for (e = e.split(".").map(t), o = 0; o < e.length; o++) { if (!i.hasOwnProperty(o)) return !1; if (i[o] < e[o]) return !1 }
        return !0
    }

    function z(n, e, s, t, a) {
        if (e.todo.events || e.todo.onces) {
            var r = { id: t, data: e.todo.data, tag: e.todo.tag };
            e.todo.events && E.each(e.todo.events, function(e, t) {
                var i = n,
                    o = t;
                E.isArray(t) && (i = t[0], o = t[1]), google.maps.event.addListener(s, e, function(e) { o.apply(i, [a || s, e, r]) })
            }), e.todo.onces && E.each(e.todo.onces, function(e, t) {
                var i = n,
                    o = t;
                E.isArray(t) && (i = t[0], o = t[1]), google.maps.event.addListenerOnce(s, e, function(e) { o.apply(i, [a || s, e, r]) })
            })
        }
    }

    function e() {
        var t = [];
        this.empty = function() { return !t.length }, this.add = function(e) { t.push(e) }, this.get = function() { return !!t.length && t[0] }, this.ack = function() { t.shift() }
    }

    function r(i, o, n) {
        function e(e) { var t = {}; return t[e] = {}, t }

        function s() {
            var e;
            for (e in n)
                if (!(e in a)) return e
        }
        var a = {},
            t = this,
            r, l = { latLng: { map: !1, marker: !1, infowindow: !1, circle: !1, overlay: !1, getlatlng: !1, getmaxzoom: !1, getelevation: !1, streetviewpanorama: !1, getaddress: !0 }, geoloc: { getgeoloc: !0 } };
        "string" == typeof n && (n = e(n)), this.run = function() {
            for (var e, t; e = s();) {
                if ("function" == typeof i[e]) return r = e, t = E.extend(!0, {}, H[e] || {}, n[e].options || {}), void(e in l.latLng ? n[e].values ? f(n[e].values, i, i[e], { todo: n[e], opts: t, session: a }) : u(i, i[e], l.latLng[e], { todo: n[e], opts: t, session: a }) : e in l.geoloc ? h(i, i[e], { todo: n[e], opts: t, session: a }) : i[e].apply(i, [{ todo: n[e], opts: t, session: a }]));
                a[e] = null
            }
            o.apply(i, [n, a])
        }, this.ack = function(e) { a[r] = e, t.run.apply(t, []) }
    }

    function l(e) { var t, i = []; for (t in e) i.push(t); return i }

    function y(e, t) {
        var i = {};
        if (e.todo)
            for (var o in e.todo) "options" !== o && "values" !== o && (i[o] = e.todo[o]);
        var n, s = ["data", "tag", "id", "events", "onces"];
        for (n = 0; n < s.length; n++) a(i, s[n], t, e.todo);
        return i.options = E.extend({}, e.opts || {}, t.options || {}), i
    }

    function a(e, t) {
        for (var i = 2; i < arguments.length; i++)
            if (t in arguments[i]) return void(e[t] = arguments[i][t])
    }

    function i() {
        var r = [];
        this.get = function(e) { if (r.length) { var t, i, o, n, s, a = l(e); for (t = 0; t < r.length; t++) { for (n = r[t], s = a.length == n.keys.length, i = 0; i < a.length && s; i++)(s = (o = a[i]) in n.request) && (s = "object" == typeof e[o] && "equals" in e[o] && "function" == typeof e[o] ? e[o].equals(n.request[o]) : e[o] === n.request[o]); if (s) return n.results } } }, this.store = function(e, t) { r.push({ request: e, keys: l(e), results: t }) }
    }

    function c(e, t, i, o) {
        var n = this,
            s = [];
        H.classes.OverlayView.call(this), this.setMap(e), this.onAdd = function() {
            var e = this.getPanes();
            t.pane in e && E(e[t.pane]).append(o), E.each("dblclick click mouseover mousemove mouseout mouseup mousedown".split(" "), function(e, t) { s.push(google.maps.event.addDomListener(o[0], t, function(e) { E.Event(e).stopPropagation(), google.maps.event.trigger(n, t, [e]), n.draw() })) }), s.push(google.maps.event.addDomListener(o[0], "contextmenu", function(e) { E.Event(e).stopPropagation(), google.maps.event.trigger(n, "rightclick", [e]), n.draw() }))
        }, this.getPosition = function() { return i }, this.draw = function() {
            var e = this.getProjection().fromLatLngToDivPixel(i);
            o.css("left", e.x + t.offset.x + "px").css("top", e.y + t.offset.y + "px")
        }, this.onRemove = function() {
            for (var e = 0; e < s.length; e++) google.maps.event.removeListener(s[e]);
            o.remove()
        }, this.hide = function() { o.hide() }, this.show = function() { o.show() }, this.toggle = function() { o && (o.is(":visible") ? this.show() : this.hide()) }, this.toggleDOM = function() { this.getMap() ? this.setMap(null) : this.setMap(e) }, this.getDOMElement = function() { return o[0] }
    }

    function v(e, t) {
        function i() { return this.onAdd = function() {}, this.onRemove = function() {}, this.draw = function() {}, H.classes.OverlayView.apply(this, []) }
        i.prototype = H.classes.OverlayView.prototype;
        var o = new i;
        return o.setMap(e), o
    }

    function w(i, m, y) {
        function t(e) { d[e] || (delete M[e].options.map, d[e] = new H.classes.Marker(M[e].options), z(i, { todo: M[e] }, d[e], M[e].id)) }

        function e() {
            (f = p.getProjection()) ? ($ = !0, r.push(google.maps.event.addListener(m, "zoom_changed", function() { n() })), r.push(google.maps.event.addListener(m, "bounds_changed", function() { n() })), s()) : setTimeout(function() { e.apply(a, []) }, 25)
        }

        function w(e) { "object" == typeof P[e] ? ("function" == typeof P[e].obj.setMap && P[e].obj.setMap(null), "function" == typeof P[e].obj.remove && P[e].obj.remove(), "function" == typeof P[e].shadow.remove && P[e].obj.remove(), "function" == typeof P[e].shadow.setMap && P[e].shadow.setMap(null), delete P[e].obj, delete P[e].shadow) : d[e] && d[e].setMap(null), delete P[e] }

        function o(e, t, i, o) { var n, s, a, r, l, d, c, p; return r = e instanceof google.maps.LatLng ? (n = e.lat(), a = e.lng(), t instanceof google.maps.LatLng ? (s = t.lat(), t.lng()) : (s = t, i)) : (n = e, a = t, i instanceof google.maps.LatLng ? (s = i.lat(), i.lng()) : (s = i, o)), l = Math.PI * n / 180, d = Math.PI * a / 180, c = Math.PI * s / 180, p = Math.PI * r / 180, 6371e3 * Math.acos(Math.min(Math.cos(l) * Math.cos(c) * Math.cos(d) * Math.cos(p) + Math.cos(l) * Math.sin(d) * Math.cos(c) * Math.sin(p) + Math.sin(l) * Math.sin(c), 1)) }

        function b() {
            var e = o(m.getCenter(), m.getBounds().getNorthEast()),
                t;
            return new google.maps.Circle({ center: m.getCenter(), radius: 1.25 * e }).getBounds()
        }

        function S() {
            var e = {},
                t;
            for (t in P) e[t] = !0;
            return e
        }

        function n() { clearTimeout(u), u = setTimeout(function() { s() }, 25) }

        function k(e) {
            var t = f.fromLatLngToDivPixel(e),
                i = f.fromDivPixelToLatLng(new google.maps.Point(t.x + y.radius, t.y - y.radius)),
                o = f.fromDivPixelToLatLng(new google.maps.Point(t.x - y.radius, t.y + y.radius));
            return new google.maps.LatLngBounds(o, i)
        }

        function s() {
            if (!T && !x && $) {
                var e = [],
                    t = {},
                    i = m.getZoom(),
                    o = "maxZoom" in y && i > y.maxZoom,
                    n = S(),
                    s, a, r, l, d = !1,
                    c, p, u, f, h, v, g;
                for (C = !1, 3 < i && (d = (c = b()).getSouthWest().lng() < c.getNorthEast().lng()), s = 0; s < M.length; s++) !M[s] || d && !c.contains(M[s].options.position) || A && !A(L[s]) || e.push(s);
                for (;;) {
                    for (s = 0; t[s] && s < e.length;) s++;
                    if (s == e.length) break;
                    if (l = [], I && !o) {
                        g = 10;
                        do { for (f = l, l = [], g--, c = k(u = f.length ? c.getCenter() : M[e[s]].options.position), a = s; a < e.length; a++) t[a] || c.contains(M[e[a]].options.position) && l.push(a) } while (f.length < l.length && 1 < l.length && g)
                    } else
                        for (a = s; a < e.length; a++)
                            if (!t[a]) { l.push(a); break } for (p = { indexes: [], ref: [] }, h = v = 0, r = 0; r < l.length; r++) t[l[r]] = !0, p.indexes.push(e[l[r]]), p.ref.push(e[l[r]]), h += M[e[l[r]]].options.position.lat(), v += M[e[l[r]]].options.position.lng();
                    h /= l.length, v /= l.length, p.latLng = new google.maps.LatLng(h, v), p.ref = p.ref.join("-"), p.ref in n ? delete n[p.ref] : (1 === l.length && (P[p.ref] = !0), O(p))
                }
                E.each(n, function(e) { w(e) }), x = !1
            }
        }
        var T = !1,
            C = !1,
            x = !1,
            $ = !1,
            I = !0,
            a = this,
            r = [],
            P = {},
            l = {},
            c = {},
            d = [],
            M = [],
            L = [],
            p = v(m, y.radius),
            u, f, A, O, h;
        e(), this.getById = function(e) { return e in l && (t(l[e]), d[l[e]]) }, this.rm = function(e) {
            var t = l[e];
            d[t] && d[t].setMap(null), delete d[t], d[t] = !1, delete M[t], M[t] = !1, delete L[t], L[t] = !1, delete l[e], delete c[t], C = !0
        }, this.clearById = function(e) { if (e in l) return this.rm(e), !0 }, this.clear = function(e, t, i) {
            var o, n, s, a, r, l = [],
                d = g(i);
            for (s = e ? (o = M.length - 1, n = -1) : (o = 0, n = M.length, 1), a = o; a != n && (!M[a] || d && !d(M[a].tag) || (l.push(c[a]), !t && !e)); a += s);
            for (r = 0; r < l.length; r++) this.rm(l[r])
        }, this.add = function(e, t) { e.id = N(e.id), this.clearById(e.id), l[e.id] = d.length, c[d.length] = e.id, d.push(null), M.push(e), L.push(t), C = !0 }, this.addMarker = function(e, t) {
            (t = t || {}).id = N(t.id), this.clearById(t.id), t.options || (t.options = {}), t.options.position = e.getPosition(), z(i, { todo: t }, e, t.id), l[t.id] = d.length, c[d.length] = t.id, d.push(e), M.push(t), L.push(t.data || {}), C = !0
        }, this.todo = function(e) { return M[e] }, this.value = function(e) { return L[e] }, this.marker = function(e) { return e in d && (t(e), d[e]) }, this.markerIsSet = function(e) { return Boolean(d[e]) }, this.setMarker = function(e, t) { d[e] = t }, this.store = function(e, t, i) { P[e.ref] = { obj: t, shadow: i } }, this.free = function() {
            for (var e = 0; e < r.length; e++) google.maps.event.removeListener(r[e]);
            r = [], E.each(P, function(e) { w(e) }), P = {}, E.each(M, function(e) { M[e] = null }), M = [], E.each(d, function(e) { d[e] && (d[e].setMap(null), delete d[e]) }), d = [], E.each(L, function(e) { delete L[e] }), L = [], l = {}, c = {}
        }, this.filter = function(e) { A = e, s() }, this.enable = function(e) { I != e && (I = e, s()) }, this.display = function(e) { O = e }, this.error = function(e) { h = e }, this.beginUpdate = function() { T = !0 }, this.endUpdate = function() { T = !1, C && s() }, this.autofit = function(e) { for (var t = 0; t < M.length; t++) M[t] && e.extend(M[t].options.position) }
    }

    function b(e, n) { this.id = function() { return e }, this.filter = function(e) { n.filter(e) }, this.enable = function() { n.enable(!0) }, this.disable = function() { n.enable(!1) }, this.add = function(e, t, i) { i || n.beginUpdate(), n.addMarker(e, t), i || n.endUpdate() }, this.getById = function(e) { return n.getById(e) }, this.clearById = function(e, t) { var i; return t || n.beginUpdate(), i = n.clearById(e), t || n.endUpdate(), i }, this.clear = function(e, t, i, o) { o || n.beginUpdate(), n.clear(e, t, i), o || n.endUpdate() } }

    function S() {
        function r(e) { return { id: e.id, name: e.name, object: e.obj, tag: e.tag, data: e.data } }

        function n(e) { "function" == typeof e.setMap && e.setMap(null), "function" == typeof e.remove && e.remove(), "function" == typeof e.free && e.free(), e = null }
        var l = {},
            d = {};
        this.add = function(e, t, i, o) {
            var n = e.todo || {},
                s = N(n.id);
            return l[t] || (l[t] = []), s in d && this.clearById(s), d[s] = { obj: i, sub: o, name: t, id: s, tag: n.tag, data: n.data }, l[t].push(s), s
        }, this.getById = function(e, t, i) { return e in d && (t ? d[e].sub : i ? r(d[e]) : d[e].obj) }, this.get = function(e, t, i, o) {
            var n, s, a = g(i);
            if (!l[e] || !l[e].length) return null;
            for (n = l[e].length; n;)
                if (n--, (s = l[e][t ? n : l[e].length - n - 1]) && d[s]) { if (a && !a(d[s].tag)) continue; return o ? r(d[s]) : d[s].obj }
            return null
        }, this.all = function(e, t, o) {
            var n = [],
                s = g(t),
                i = function(e) {
                    var t, i;
                    for (t = 0; t < l[e].length; t++)
                        if ((i = l[e][t]) && d[i]) {
                            if (s && !s(d[i].tag)) continue;
                            n.push(o ? r(d[i]) : d[i].obj)
                        }
                };
            if (e in l) i(e);
            else if (e === m)
                for (e in l) i(e);
            return n
        }, this.rm = function(e, t, i) {
            var o, n;
            if (!l[e]) return !1;
            if (t)
                if (i)
                    for (o = l[e].length - 1; 0 <= o && (n = l[e][o], !t(d[n].tag)); o--);
                else
                    for (o = 0; o < l[e].length && (n = l[e][o], !t(d[n].tag)); o++);
            else o = i ? l[e].length - 1 : 0;
            return o in l[e] && this.clearById(l[e][o], o)
        }, this.clearById = function(e, t) { if (e in d) { var i, o = d[e].name; for (i = 0; t === m && i < l[o].length; i++) e === l[o][i] && (t = i); return n(d[e].obj), d[e].sub && n(d[e].sub), delete d[e], l[o].splice(t, 1), !0 } return !1 }, this.objGetById = function(e) {
            var t;
            if (l.clusterer)
                for (var i in l.clusterer)
                    if (!1 !== (t = d[l.clusterer[i]].obj.getById(e))) return t;
            return !1
        }, this.objClearById = function(e) {
            if (l.clusterer)
                for (var t in l.clusterer)
                    if (d[l.clusterer[t]].obj.clearById(e)) return !0;
            return null
        }, this.clear = function(e, t, i, o) {
            var n, s, a, r = g(o);
            if (e && e.length) e = I(e);
            else
                for (n in e = [], l) e.push(n);
            for (s = 0; s < e.length; s++)
                if (a = e[s], t) this.rm(a, r, !0);
                else if (i) this.rm(a, r, !1);
            else
                for (; this.rm(a, r, !1););
        }, this.objClear = function(e, t, i, o) {
            if (l.clusterer && (0 <= E.inArray("marker", e) || !e.length))
                for (var n in l.clusterer) d[l.clusterer[n]].obj.clear(t, i, o)
        }
    }

    function p() { return A.geocoder || (A.geocoder = new google.maps.Geocoder), A.geocoder }

    function k() { return A.directionsService || (A.directionsService = new google.maps.DirectionsService), A.directionsService }

    function T() { return A.elevationService || (A.elevationService = new google.maps.ElevationService), A.elevationService }

    function C() { return A.maxZoomService || (A.maxZoomService = new google.maps.MaxZoomService), A.maxZoomService }

    function x() { return A.distanceMatrixService || (A.distanceMatrixService = new google.maps.DistanceMatrixService), A.distanceMatrixService }

    function $() {
        if (H.verbose) {
            var e, t = [];
            if (window.console && "function" == typeof console.error) {
                for (e = 0; e < arguments.length; e++) t.push(arguments[e]);
                console.error.apply(console, t)
            } else {
                for (t = "", e = 0; e < arguments.length; e++) t += arguments[e].toString() + " ";
                alert(t)
            }
        }
    }

    function n(e) { return ("number" == typeof e || "string" == typeof e) && "" !== e && !isNaN(e) }

    function I(e) {
        var t, i = [];
        if (e !== m)
            if ("object" == typeof e)
                if ("number" == typeof e.length) i = e;
                else
                    for (t in e) i.push(e[t]);
        else i.push(e);
        return i
    }

    function g(i) {
        if (i) return "function" == typeof i ? i : (i = I(i), function(e) {
            if (e === m) return !1;
            if ("object" != typeof e) return 0 <= E.inArray(e, i);
            for (var t = 0; t < e.length; t++)
                if (0 <= E.inArray(e[t], i)) return !0;
            return !1
        })
    }

    function P(e, t, i) { var o = t ? e : null; return e && "string" != typeof e ? e.latLng ? P(e.latLng) : e instanceof google.maps.LatLng ? e : n(e.lat) ? new google.maps.LatLng(e.lat, e.lng) : !i && E.isArray(e) && n(e[0]) && n(e[1]) ? new google.maps.LatLng(e[0], e[1]) : o : o }

    function M(e) { var t, i; return !e || e instanceof google.maps.LatLngBounds ? e || null : (E.isArray(e) ? 2 == e.length ? (t = P(e[0]), i = P(e[1])) : 4 == e.length && (t = P([e[0], e[1]]), i = P([e[2], e[3]])) : "ne" in e && "sw" in e ? (t = P(e.ne), i = P(e.sw)) : "n" in e && "e" in e && "s" in e && "w" in e && (t = P([e.n, e.e]), i = P([e.s, e.w])), t && i ? new google.maps.LatLngBounds(i, t) : null) }

    function u(i, o, n, s, a) {
        var e = !!n && P(s.todo, !1, !0),
            r = e ? { latLng: e } : !!s.todo.address && ("string" == typeof s.todo.address ? { address: s.todo.address } : s.todo.address),
            t = !!r && O.get(r),
            l = this;
        r ? (a = a || 0, t ? (s.latLng = t.results[0].geometry.location, s.results = t.results, s.status = t.status, o.apply(i, [s])) : (r.location && (r.location = P(r.location)), r.bounds && (r.bounds = M(r.bounds)), p().geocode(r, function(e, t) { t === google.maps.GeocoderStatus.OK ? (O.store(r, { results: e, status: t }), s.latLng = e[0].geometry.location, s.results = e, s.status = t, o.apply(i, [s])) : t === google.maps.GeocoderStatus.OVER_QUERY_LIMIT && a < H.queryLimit.attempt ? setTimeout(function() { u.apply(l, [i, o, n, s, a + 1]) }, H.queryLimit.delay + Math.floor(Math.random() * H.queryLimit.random)) : ($("geocode failed", t, r), s.latLng = s.results = !1, s.status = t, o.apply(i, [s])) }))) : (s.latLng = P(s.todo, !1, !0), o.apply(i, [s]))
    }

    function f(t, e, i, o) {
        function n() {
            for (; ++a < t.length && !("address" in t[a]););
            a >= t.length ? i.apply(e, [o]) : u(s, function(e) { delete e.todo, E.extend(t[a], e), n.apply(s, []) }, !0, { todo: t[a] })
        }
        var s = this,
            a = -1;
        n()
    }

    function h(t, i, o) {
        var n = !1;
        navigator && navigator.geolocation ? navigator.geolocation.getCurrentPosition(function(e) { n || (n = !0, o.latLng = new google.maps.LatLng(e.coords.latitude, e.coords.longitude), i.apply(t, [o])) }, function() { n || (n = !0, o.latLng = !1, i.apply(t, [o])) }, o.opts.getCurrentPosition) : (o.latLng = !1, i.apply(t, [o]))
    }

    function s(f) {
        function i() {!a && (a = s.get()) && a.run() }

        function o() { a = null, s.ack(), i.call(h) }

        function n(e) { if (e.todo.callback) { var t = Array.prototype.slice.call(arguments, 1); "function" == typeof e.todo.callback ? e.todo.callback.apply(f, t) : E.isArray(e.todo.callback) && "function" == typeof e.todo.callback[1] && e.todo.callback[1].apply(e.todo.callback[0], t) } }

        function p(e, t, i) { i && z(f, e, t, i), n(e, t), a.ack(t) }

        function u(e, t) {
            if (t = t || {}, g) t.todo && t.todo.options && (t.todo.options.center && (t.todo.options.center = P(t.todo.options.center)), g.setOptions(t.todo.options));
            else {
                var i = t.opts || E.extend(!0, {}, H.map, t.todo && t.todo.options ? t.todo.options : {});
                i.center = e || P(i.center), g = new H.classes.Map(f.get(0), i)
            }
        }

        function t(r, l, d) {
            var c = [],
                e = "values" in r.todo;
            e || (r.todo.values = [{ options: r.opts }]), r.todo.values.length ? (u(), E.each(r.todo.values, function(e, t) {
                var i, o, n, s, a = y(r, t);
                if (a.options[d])
                    if (a.options[d][0][0] && E.isArray(a.options[d][0][0]))
                        for (o = 0; o < a.options[d].length; o++)
                            for (n = 0; n < a.options[d][o].length; n++) a.options[d][o][n] = P(a.options[d][o][n]);
                    else
                        for (o = 0; o < a.options[d].length; o++) a.options[d][o] = P(a.options[d][o]);
                a.options.map = g, s = new google.maps[l](a.options), c.push(s), i = v.add({ todo: a }, l.toLowerCase(), s), z(f, { todo: a }, s, i)
            }), p(r, e ? c : c[0])) : p(r, !1)
        }

        function l(r) {
            var l = new w(f, g, r),
                d = {},
                c = {},
                p = [],
                e = /^[0-9]+$/,
                u, t;
            for (t in r) e.test(t) ? (p.push(1 * t), c[t] = r[t], c[t].width = c[t].width || 0, c[t].height = c[t].height || 0) : d[t] = r[t];
            return p.sort(function(e, t) { return t < e }), u = d.calculator ? function(e) { var i = []; return E.each(e, function(e, t) { i.push(l.value(t)) }), d.calculator.apply(f, [i]) } : function(e) { return e.length }, l.error(function() { $.apply(h, arguments) }), l.display(function(e) {
                var t, i, o, n, s, a = u(e.indexes);
                if (r.force || 1 < a)
                    for (t = 0; t < p.length; t++) p[t] <= a && (i = c[p[t]]);
                i ? (s = i.offset || [-i.width / 2, -i.height / 2], (o = E.extend({}, d)).options = E.extend({ pane: "overlayLayer", content: i.content ? i.content.replace("CLUSTER_COUNT", a) : "", offset: { x: ("x" in s ? s.x : s[0]) || 0, y: ("y" in s ? s.y : s[1]) || 0 } }, d.options || {}), n = h.overlay({ todo: o, opts: o.options, latLng: P(e) }, !0), o.options.pane = "floatShadow", o.options.content = E(document.createElement("div")).width(i.width + "px").height(i.height + "px").css({ cursor: "pointer" }), shadow = h.overlay({ todo: o, opts: o.options, latLng: P(e) }, !0), d.data = { latLng: P(e), markers: [] }, E.each(e.indexes, function(e, t) { d.data.markers.push(l.value(t)), l.markerIsSet(t) && l.marker(t).setMap(null) }), z(f, { todo: d }, shadow, m, { main: n, shadow: shadow }), l.store(e, n, shadow)) : E.each(e.indexes, function(e, t) { l.marker(t).setMap(g) })
            }), l
        }
        var h = this,
            s = new e,
            v = new S,
            g = null,
            a;
        this._plan = function(e) {
            for (var t = 0; t < e.length; t++) s.add(new r(h, o, e[t]));
            i()
        }, this.map = function(e) { u(e.latLng, e), z(f, e, g), p(e, g) }, this.destroy = function(e) { v.clear(), f.empty(), g && (g = null), p(e, !0) }, this.infowindow = function(s) {
            var a = [],
                r = "values" in s.todo;
            r || (s.latLng && (s.opts.position = s.latLng), s.todo.values = [{ options: s.opts }]), E.each(s.todo.values, function(e, t) {
                var i, o, n = y(s, t);
                n.options.position = n.options.position ? P(n.options.position) : P(t.latLng), g || u(n.options.position), (o = new H.classes.InfoWindow(n.options)) && (n.open === m || n.open) && (r ? o.open(g, n.anchor ? n.anchor : m) : o.open(g, n.anchor ? n.anchor : s.latLng ? m : s.session.marker ? s.session.marker : m)), a.push(o), i = v.add({ todo: n }, "infowindow", o), z(f, { todo: n }, o, i)
            }), p(s, r ? a : a[0])
        }, this.circle = function(s) {
            var a = [],
                e = "values" in s.todo;
            e || (s.opts.center = s.latLng || P(s.opts.center), s.todo.values = [{ options: s.opts }]), s.todo.values.length ? (E.each(s.todo.values, function(e, t) {
                var i, o, n = y(s, t);
                n.options.center = n.options.center ? P(n.options.center) : P(t), g || u(n.options.center), n.options.map = g, o = new H.classes.Circle(n.options), a.push(o), i = v.add({ todo: n }, "circle", o), z(f, { todo: n }, o, i)
            }), p(s, e ? a : a[0])) : p(s, !1)
        }, this.overlay = function(a, r) {
            var l = [],
                e = "values" in a.todo;
            if (e || (a.todo.values = [{ latLng: a.latLng, options: a.opts }]), a.todo.values.length) {
                if (c.__initialised || (c.prototype = new H.classes.OverlayView, c.__initialised = !0), E.each(a.todo.values, function(e, t) {
                        var i, o, n = y(a, t),
                            s = E(document.createElement("div")).css({ border: "none", borderWidth: "0px", position: "absolute" });
                        s.append(n.options.content), o = new c(g, n.options, P(n) || P(t), s), l.push(o), s = null, r || (i = v.add(a, "overlay", o), z(f, { todo: n }, o, i))
                    }), r) return l[0];
                p(a, e ? l : l[0])
            } else p(a, !1)
        }, this.getaddress = function(e) { n(e, e.results, e.status), a.ack() }, this.getlatlng = function(e) { n(e, e.results, e.status), a.ack() }, this.getmaxzoom = function(t) { C().getMaxZoomAtLatLng(t.latLng, function(e) { n(t, e.status === google.maps.MaxZoomStatus.OK && e.zoom, status), a.ack() }) }, this.getelevation = function(i) {
            var e, t = [],
                o = function(e, t) { n(i, t === google.maps.ElevationStatus.OK && e, t), a.ack() };
            if (i.latLng) t.push(i.latLng);
            else
                for (t = I(i.todo.locations || []), e = 0; e < t.length; e++) t[e] = P(t[e]);
            if (t.length) T().getElevationForLocations({ locations: t }, o);
            else {
                if (i.todo.path && i.todo.path.length)
                    for (e = 0; e < i.todo.path.length; e++) t.push(P(i.todo.path[e]));
                t.length ? T().getElevationAlongPath({ path: t, samples: i.todo.samples }, o) : a.ack()
            }
        }, this.defaults = function(e) { E.each(e.todo, function(e, t) { "object" == typeof H[e] ? H[e] = E.extend({}, H[e], t) : H[e] = t }), a.ack(!0) }, this.rectangle = function(s) {
            var a = [],
                e = "values" in s.todo;
            e || (s.todo.values = [{ options: s.opts }]), s.todo.values.length ? (E.each(s.todo.values, function(e, t) {
                var i, o, n = y(s, t);
                n.options.bounds = n.options.bounds ? M(n.options.bounds) : M(t), g || u(n.options.bounds.getCenter()), n.options.map = g, o = new H.classes.Rectangle(n.options), a.push(o), i = v.add({ todo: n }, "rectangle", o), z(f, { todo: n }, o, i)
            }), p(s, e ? a : a[0])) : p(s, !1)
        }, this.polyline = function(e) { t(e, "Polyline", "path") }, this.polygon = function(e) { t(e, "Polygon", "paths") }, this.trafficlayer = function(e) {
            u();
            var t = v.get("trafficlayer");
            t || ((t = new H.classes.TrafficLayer).setMap(g), v.add(e, "trafficlayer", t)), p(e, t)
        }, this.bicyclinglayer = function(e) {
            u();
            var t = v.get("bicyclinglayer");
            t || ((t = new H.classes.BicyclingLayer).setMap(g), v.add(e, "bicyclinglayer", t)), p(e, t)
        }, this.groundoverlay = function(e) {
            e.opts.bounds = M(e.opts.bounds), e.opts.bounds && u(e.opts.bounds.getCenter());
            var t, i = new H.classes.GroundOverlay(e.opts.url, e.opts.bounds, e.opts.opts);
            i.setMap(g), p(e, i, t = v.add(e, "groundoverlay", i))
        }, this.streetviewpanorama = function(e) {
            e.opts.opts || (e.opts.opts = {}), e.latLng ? e.opts.opts.position = e.latLng : e.opts.opts.position && (e.opts.opts.position = P(e.opts.opts.position)), e.todo.divId ? e.opts.container = document.getElementById(e.todo.divId) : e.opts.container && (e.opts.container = E(e.opts.container).get(0));
            var t, i = new H.classes.StreetViewPanorama(e.opts.container, e.opts.opts);
            i && g.setStreetView(i), p(e, i, t = v.add(e, "streetviewpanorama", i))
        }, this.kmllayer = function(a) {
            var r = [],
                e = "values" in a.todo;
            e || (a.todo.values = [{ options: a.opts }]), a.todo.values.length ? (E.each(a.todo.values, function(e, t) {
                var i, o, n, s = y(a, t);
                g || u(), n = s.options, s.options.opts && (n = s.options.opts, s.options.url && (n.url = s.options.url)), n.map = g, o = d("3.10") ? new H.classes.KmlLayer(n) : new H.classes.KmlLayer(n.url, n), r.push(o), i = v.add({ todo: s }, "kmllayer", o), z(f, { todo: s }, o, i)
            }), p(a, e ? r : r[0])) : p(a, !1)
        }, this.panel = function(e) {
            u();
            var t, i = 0,
                o = 0,
                n, s = E(document.createElement("div"));
            s.css({ position: "absolute", zIndex: 1e3, visibility: "hidden" }), e.opts.content && (n = E(e.opts.content), s.append(n), f.first().prepend(s), e.opts.left !== m ? i = e.opts.left : e.opts.right !== m ? i = f.width() - n.width() - e.opts.right : e.opts.center && (i = (f.width() - n.width()) / 2), e.opts.top !== m ? o = e.opts.top : e.opts.bottom !== m ? o = f.height() - n.height() - e.opts.bottom : e.opts.middle && (o = (f.height() - n.height()) / 2), s.css({ top: o, left: i, visibility: "visible" })), p(e, s, t = v.add(e, "panel", s)), s = null
        }, this.marker = function(s) {
            var e = "values" in s.todo,
                a = !g;
            if (e || (s.opts.position = s.latLng || P(s.opts.position), s.todo.values = [{ options: s.opts }]), s.todo.values.length)
                if (a && u(), !s.todo.cluster || g.getBounds())
                    if (s.todo.cluster) {
                        var t, o;
                        s.todo.cluster instanceof b ? (t = s.todo.cluster, o = v.getById(t.id(), !0)) : (o = l(s.todo.cluster), t = new b(N(s.todo.id, !0), o), v.add(s, "clusterer", t, o)), o.beginUpdate(), E.each(s.todo.values, function(e, t) {
                            var i = y(s, t);
                            i.options.position = i.options.position ? P(i.options.position) : P(t), i.options.map = g, a && (g.setCenter(i.options.position), a = !1), o.add(i, t)
                        }), o.endUpdate(), p(s, t)
                    } else {
                        var r = [];
                        E.each(s.todo.values, function(e, t) {
                            var i, o, n = y(s, t);
                            n.options.position = n.options.position ? P(n.options.position) : P(t), n.options.map = g, a && (g.setCenter(n.options.position), a = !1), o = new H.classes.Marker(n.options), r.push(o), i = v.add({ todo: n }, "marker", o), z(f, { todo: n }, o, i)
                        }), p(s, e ? r : r[0])
                    }
            else google.maps.event.addListenerOnce(g, "bounds_changed", function() { h.marker.apply(h, [s]) });
            else p(s, !1)
        }, this.getroute = function(i) { i.opts.origin = P(i.opts.origin, !0), i.opts.destination = P(i.opts.destination, !0), k().route(i.opts, function(e, t) { n(i, t == google.maps.DirectionsStatus.OK && e, t), a.ack() }) }, this.directionsrenderer = function(e) {
            e.opts.map = g;
            var t, i = new google.maps.DirectionsRenderer(e.opts);
            e.todo.divId ? i.setPanel(document.getElementById(e.todo.divId)) : e.todo.container && i.setPanel(E(e.todo.container).get(0)), p(e, i, t = v.add(e, "directionsrenderer", i))
        }, this.getgeoloc = function(e) { p(e, e.latLng) }, this.styledmaptype = function(e) {
            u();
            var t = new H.classes.StyledMapType(e.todo.styles, e.opts);
            g.mapTypes.set(e.todo.id, t), p(e, t)
        }, this.imagemaptype = function(e) {
            u();
            var t = new H.classes.ImageMapType(e.opts);
            g.mapTypes.set(e.todo.id, t), p(e, t)
        }, this.autofit = function(e) {
            var i = new google.maps.LatLngBounds;
            E.each(v.all(), function(e, t) { t.getPosition ? i.extend(t.getPosition()) : t.getBounds ? (i.extend(t.getBounds().getNorthEast()), i.extend(t.getBounds().getSouthWest())) : t.getPaths ? t.getPaths().forEach(function(e) { e.forEach(function(e) { i.extend(e) }) }) : t.getPath ? t.getPath().forEach(function(e) { i.extend(e) }) : t.getCenter ? i.extend(t.getCenter()) : t instanceof b && (t = v.getById(t.id(), !0)) && t.autofit(i) }), i.isEmpty() || g.getBounds() && g.getBounds().equals(i) || ("maxZoom" in e.todo && google.maps.event.addListenerOnce(g, "bounds_changed", function() { this.getZoom() > e.todo.maxZoom && this.setZoom(e.todo.maxZoom) }), g.fitBounds(i)), p(e, !0)
        }, this.clear = function(e) {
            if ("string" == typeof e.todo) {
                if (v.clearById(e.todo) || v.objClearById(e.todo)) return void p(e, !0);
                e.todo = { name: e.todo }
            }
            e.todo.id ? E.each(I(e.todo.id), function(e, t) { v.clearById(t) || v.objClearById(t) }) : (v.clear(I(e.todo.name), e.todo.last, e.todo.first, e.todo.tag), v.objClear(I(e.todo.name), e.todo.last, e.todo.first, e.todo.tag)), p(e, !0)
        }, this.exec = function(t) {
            var o = this;
            E.each(I(t.todo.func), function(e, i) { E.each(o.get(t.todo, !0, !t.todo.hasOwnProperty("full") || t.todo.full), function(e, t) { i.call(f, t) }) }), p(t, !0)
        }, this.get = function(e, t, o) {
            var i, n, s = t ? e : e.todo;
            if (t || (o = s.full), "string" == typeof s ? !1 === (n = v.getById(s, !1, o) || v.objGetById(s)) && (i = s, s = {}) : i = s.name, "map" === i && (n = g), n || (n = [], s.id ? (E.each(I(s.id), function(e, t) { n.push(v.getById(t, !1, o) || v.objGetById(t)) }), E.isArray(s.id) || (n = n[0])) : (E.each(i ? I(i) : [m], function(e, t) {
                    var i;
                    s.first ? (i = v.get(t, !1, s.tag, o)) && n.push(i) : s.all ? E.each(v.all(t, s.tag, o), function(e, t) { n.push(t) }) : (i = v.get(t, !0, s.tag, o)) && n.push(i)
                }), s.all || E.isArray(i) || (n = n[0]))), n = E.isArray(n) || !s.all ? n : [n], t) return n;
            p(e, n)
        }, this.getdistance = function(i) {
            var e;
            for (i.opts.origins = I(i.opts.origins), e = 0; e < i.opts.origins.length; e++) i.opts.origins[e] = P(i.opts.origins[e], !0);
            for (i.opts.destinations = I(i.opts.destinations), e = 0; e < i.opts.destinations.length; e++) i.opts.destinations[e] = P(i.opts.destinations[e], !0);
            x().getDistanceMatrix(i.opts, function(e, t) { n(i, t === google.maps.DistanceMatrixStatus.OK && e, t), a.ack() })
        }, this.trigger = function(e) {
            if ("string" == typeof e.todo) google.maps.event.trigger(g, e.todo);
            else {
                var i = [g, e.todo.eventName];
                e.todo.var_args && E.each(e.todo.var_args, function(e, t) { i.push(t) }), google.maps.event.trigger.apply(google.maps.event, i)
            }
            n(e), a.ack()
        }
    }

    function L(e) {
        var t;
        if (!e.hasOwnProperty("get")) return !1;
        for (t in e)
            if ("get" !== t) return !1;
        return !e.get.hasOwnProperty("callback")
    }
    var H, o = 0,
        A = {},
        O = new i;
    E.fn.gmap3 = function() {
        var e, i = [],
            o = !0,
            n = [];
        for (t(), e = 0; e < arguments.length; e++) arguments[e] && i.push(arguments[e]);
        return i.length || i.push("map"), E.each(this, function() {
            var e = E(this),
                t = e.data("gmap3");
            o = !1, t || (t = new s(e), e.data("gmap3", t)), 1 !== i.length || "get" !== i[0] && !L(i[0]) ? t._plan(i) : "get" === i[0] ? n.push(t.get("map", !0)) : n.push(t.get(i[0].get, !0, i[0].get.full))
        }), n.length ? 1 === n.length ? n[0] : n : this
    }
}(jQuery);
var scrolltotop = {
    setting: { startline: 200, scrollto: 0, scrollduration: 1200, fadeduration: [500, 100] },
    controlHTML: '<div class="to_the_top"><div class="icon-arrow-up"></div></div>',
    controlattrs: { offsetx: 0, offsety: 52 },
    anchorkeyword: "#top",
    state: { isvisible: !1, shouldvisible: !1 },
    scrollup: function() {
        this.cssfixedsupport || this.$control.css({ opacity: 0 });
        var e = isNaN(this.setting.scrollto) ? this.setting.scrollto : parseInt(this.setting.scrollto);
        e = "string" == typeof e && 1 == jQuery("#" + e).length ? jQuery("#" + e).offset().top : 0, this.$body.animate({ scrollTop: e }, this.setting.scrollduration)
    },
    keepfixed: function() {
        var e = jQuery(window),
            t = e.scrollLeft() + e.width() - this.$control.width() - this.controlattrs.offsetx,
            i = e.scrollTop() + e.height() - this.$control.height() - this.controlattrs.offsety;
        this.$control.css({ left: t + "px", top: i + "px" })
    },
    togglecontrol: function() {
        var e = jQuery(window).scrollTop();
        this.cssfixedsupport || this.keepfixed(), this.state.shouldvisible = e >= this.setting.startline, this.state.shouldvisible && !this.state.isvisible ? (this.$control.stop().animate({ opacity: 1 }, this.setting.fadeduration[0]), this.state.isvisible = !0) : 0 == this.state.shouldvisible && this.state.isvisible && (this.$control.stop().animate({ opacity: 0 }, this.setting.fadeduration[1]), this.state.isvisible = !1)
    },
    init: function() {
        jQuery(document).ready(function(e) {
            var t = scrolltotop,
                i = document.all;
            t.cssfixedsupport = !i || i && "CSS1Compat" == document.compatMode && window.XMLHttpRequest, t.$body = window.opera ? "CSS1Compat" == document.compatMode ? e("html") : e("body") : e("html,body"), t.$control = e('<div id="topcontrol">' + t.controlHTML + "</div>").css({ position: t.cssfixedsupport ? "fixed" : "absolute", bottom: t.controlattrs.offsety, right: t.controlattrs.offsetx, opacity: 0, cursor: "pointer" }).attr({ title: "To the top!" }).click(function() { return t.scrollup(), !1 }).appendTo("body"), document.all && !window.XMLHttpRequest && "" != t.$control.text() && t.$control.css({ width: t.$control.width() }), t.togglecontrol(), e('a[href="' + t.anchorkeyword + '"]').click(function() { return t.scrollup(), !1 }), e(window).bind("scroll resize", function(e) { t.togglecontrol() })
        })
    }
};
scrolltotop.init();