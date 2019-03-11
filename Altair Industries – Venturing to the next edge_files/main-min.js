! function(f) {
    "use strict";
    var l;
    f.fn.kt_imagesLoaded = (l = function(e, t, i) {
        var a, l = !1,
            s = f(e).parent(),
            o = f("<img />"),
            n = f(e).attr("srcset"),
            r = f(e).attr("sizes") || "100vw",
            d = f(e).attr("src"),
            c = function() { o.off("load error", c), clearTimeout(a), t() };
        i && (a = setTimeout(c, i)), o.on("load error", c), s.is("picture") && ((s = s.clone()).find("img").remove().end(), s.append(o), l = !0), n ? (o.attr("sizes", r), o.attr("srcset", n), l || o.appendTo(document.createElement("div")), l = !0) : d && o.attr("src", d), l && !window.HTMLPictureElement && (window.respimage ? window.respimage({ elements: [o[0]] }) : window.picturefill ? window.picturefill({ elements: [o[0]] }) : d && o.attr("src", d))
    }, function(e) {
        var t = 0,
            i = f("img", this).add(this.filter("img")),
            a = function() {++t >= i.length && e() };
        return i.length ? (i.each(function() { l(this, a) }), this) : e()
    })
}(jQuery), jQuery(document).ready(function(L) {
    function e(e, t) { return /(png|jpg|jpeg|gif|tiff|bmp)$/.test(L(t).attr("href").toLowerCase().split("?")[0].split("#")[0]) }

    function t() { L("a[href]").filter(e).attr("data-rel", "lightbox") }

    function P(l) {
        var e = l.data("slider-speed"),
            t = l.data("slider-fade"),
            i = l.data("slider-anim-speed"),
            a = l.data("slider-arrows"),
            s = l.data("slider-auto"),
            o = l.data("slider-type"),
            n = l.data("slider-center-mode"),
            r = !1;
        if (1 <= L("body.rtl").length && (r = !0), l.on("init", function(e, t) { l.removeClass("loading") }), "carousel" == o) {
            var d = l.data("slides-to-show");
            null == d && (d = 1), l.slick({ slidesToScroll: 1, slidesToShow: d, centerMode: n, variableWidth: !0, arrows: a, speed: i, autoplay: s, autoplaySpeed: e, fade: t, pauseOnHover: !1, rtl: r, dots: !0 })
        } else if ("content-carousel" == o) {
            l.on("init", function(e, t) { l.closest(".fadein-carousel").animate({ opacity: 1 }) });
            var c = l.data("slider-xxl"),
                f = l.data("slider-xl"),
                p = l.data("slider-md"),
                h = l.data("slider-sm"),
                g = l.data("slider-xs"),
                u = l.data("slider-ss"),
                m;
            if (1 !== l.data("slider-scroll")) var v = c,
                y = f,
                w = p,
                b = h,
                S = g,
                k = u;
            else var v = 1,
                y = 1,
                w = 1,
                b = 1,
                S = 1,
                k = 1;
            l.slick({ slidesToScroll: v, slidesToShow: c, arrows: a, speed: i, autoplay: s, autoplaySpeed: e, fade: t, pauseOnHover: !1, dots: !1, rtl: r, responsive: [{ breakpoint: 1499, settings: { slidesToShow: f, slidesToScroll: y } }, { breakpoint: 1199, settings: { slidesToShow: p, slidesToScroll: w } }, { breakpoint: 991, settings: { slidesToShow: h, slidesToScroll: b } }, { breakpoint: 767, settings: { slidesToShow: g, slidesToScroll: S } }, { breakpoint: 543, settings: { slidesToShow: u, slidesToScroll: k } }] }), l.on("beforeChange", function(e, t, i, a) { l.find(".kt-slickslider:not(.slick-initialized)").each(function() { P(L(this)) }) })
        } else if ("thumb" == o) {
            var x = l.data("slider-thumbid"),
                T = l.data("slider-thumbs-showing"),
                C = l.attr("id");
            l.slick({ slidesToScroll: 1, slidesToShow: 1, arrows: a, speed: i, autoplay: s, autoplaySpeed: e, fade: t, pauseOnHover: !1, adaptiveHeight: !0, dots: !1, rtl: r, asNavFor: x }), L(x).slick({ slidesToShow: T, slidesToScroll: 1, asNavFor: "#" + C, dots: !1, rtl: r, centerMode: !1, focusOnSelect: !0 })
        } else l.slick({ slidesToShow: 1, slidesToScroll: 1, arrows: a, speed: i, autoplay: s, autoplaySpeed: e, fade: t, pauseOnHover: !1, rtl: r, adaptiveHeight: !0, dots: !0 })
    }
    L("[rel=tooltip]").tooltip(), L("[data-toggle=tooltip]").tooltip(), L("[rel=popover]").popover(), L("#authorTab a").click(function(e) { e.preventDefault(), L(this).tab("show") }), L(".sc_tabs a").click(function(e) { e.preventDefault(), L(this).tab("show") }), L(".videofit").fitVids(), L.extend(!0, L.magnificPopup.defaults, { tClose: "", image: { titleSrc: function(e) { return e.el.find("img").attr("alt") } } }), L(".collapse-next").click(function(e) {
        var t = L(this).siblings(".sf-dropdown-menu");
        t.hasClass("in") ? (t.collapse("toggle"), L(this).removeClass("toggle-active")) : (t.collapse("toggle"), L(this).addClass("toggle-active"))
    }), t(), L("a[rel^='lightbox']").magnificPopup({ type: "image" }), L("a[data-rel^='lightbox']").magnificPopup({ type: "image" }), L(".kad-light-gallery").each(function() { L(this).find('a[rel^="lightbox"]').magnificPopup({ type: "image", gallery: { enabled: !0 }, image: { titleSrc: "title" } }) }), L(".kad-light-gallery").each(function() { L(this).find("a[data-rel^='lightbox']").magnificPopup({ type: "image", gallery: { enabled: !0 }, image: { titleSrc: "title" } }) }), L(".kad-light-wp-gallery").each(function() { L(this).find('a[rel^="lightbox"]').magnificPopup({ type: "image", gallery: { enabled: !0 }, image: { titleSrc: function(e) { return e.el.find("img").attr("alt") } } }) }), L(".kad-light-wp-gallery").each(function() { L(this).find("a[data-rel^='lightbox']").magnificPopup({ type: "image", gallery: { enabled: !0 }, image: { titleSrc: function(e) { return e.el.find("img").attr("alt") } } }) }), L(".wp-block-gallery").each(function() { L(this).find('a[data-rel^="lightbox"]:not(".kt-no-lightbox")').magnificPopup({ type: "image", gallery: { enabled: !0 }, image: { titleSrc: function(e) { return e.el.parents(".blocks-gallery-item").find("figcaption").length ? e.el.parents(".blocks-gallery-item").find("figcaption").html() : e.el.find("img").attr("alt") } } }) }), L("ul.sf-menu").superfish({ delay: 200, animation: { opacity: "show", height: "show" }, speed: "fast" }), L(".kt-flexslider").each(function() {
        var e = L(this).data("flex-speed"),
            t = L(this).data("flex-animation"),
            i = L(this).data("flex-anim-speed"),
            a = L(this).data("flex-auto");
        L(this).flexslider({ animation: t, animationSpeed: i, slideshow: a, slideshowSpeed: e, start: function(e) { e.removeClass("loading") } })
    }), L(".kt-flexslider-thumb").each(function() {
        var e = L(this).data("flex-speed"),
            t = L(this).data("flex-animation"),
            i = L(this).data("flex-anim-speed"),
            a = L(this).data("flex-auto");
        L("#thumbnails").flexslider({ animation: "slide", controlNav: !1, animationLoop: !1, slideshow: !1, itemWidth: 180, itemMargin: 5, asNavFor: "#flex" }), L("#flex").flexslider({ animation: t, controlNav: !1, animationLoop: !1, animationSpeed: i, slideshow: a, slideshowSpeed: e, sync: "#thumbnails", before: function(e) { e.removeClass("loading") } })
    }), L(".init-masonry").each(function() {
        var e = L(this),
            t = L(this).data("masonry-selector");
        if (L("body.rtl").length) var i = !1;
        else var i = !0;
        e.kt_imagesLoaded(function() { e.masonry({ itemSelector: t, isOriginLeft: i }) })
    }), L(".kt-masonry-init").each(function() {
        var e = L(this),
            t = L(this).data("masonry-selector");
        if (L("body.rtl").length) var i = !1;
        else var i = !0;
        e.kt_imagesLoaded(function() { e.masonry({ itemSelector: t, isOriginLeft: i }) })
    }), L(".kt-slickslider").each(function() {
        var e = L(this),
            t = e.data("slider-initdelay");
        null == t || "0" == t ? P(e) : setTimeout(function() { P(e) }, t)
    }), L("html").removeClass("no-js"), L("html").addClass("js-running")
});