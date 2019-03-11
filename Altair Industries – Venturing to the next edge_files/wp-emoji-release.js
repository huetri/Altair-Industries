var twemoji = function() {
    "use strict";

    function a(a, b) { return document.createTextNode(b ? a.replace(s, "") : a) }

    function b(a) { return a.replace(u, h) }

    function c(a, b) { return "".concat(b.base, b.size, "/", a, b.ext) }

    function d(a, b) { for (var c, e, f = a.childNodes, g = f.length; g--;) c = f[g], e = c.nodeType, 3 === e ? b.push(c) : 1 !== e || "ownerSVGElement" in c || v.test(c.nodeName.toLowerCase()) || d(c, b); return b }

    function e(a) { return o(a.indexOf(t) < 0 ? a.replace(s, "") : a) }

    function f(b, c) {
        for (var f, g, h, i, j, k, l, m, n, o, p, q, s, t = d(b, []), u = t.length; u--;) {
            for (h = !1, i = document.createDocumentFragment(), j = t[u], k = j.nodeValue, m = 0; l = r.exec(k);) {
                if (n = l.index, n !== m && i.appendChild(a(k.slice(m, n), !0)), p = l[0], q = e(p), m = n + p.length, s = c.callback(q, c), q && s) {
                    o = new Image, o.onerror = c.onerror, o.setAttribute("draggable", "false"), f = c.attributes(p, q);
                    for (g in f) f.hasOwnProperty(g) && 0 !== g.indexOf("on") && !o.hasAttribute(g) && o.setAttribute(g, f[g]);
                    o.className = c.className, o.alt = p, o.src = s, h = !0, i.appendChild(o)
                }
                o || i.appendChild(a(p, !1)), o = null
            }
            h && (m < k.length && i.appendChild(a(k.slice(m), !0)), j.parentNode.replaceChild(i, j))
        }
        return b
    }

    function g(a, c) {
        return m(a, function(a) {
            var d, f, g = a,
                h = e(a),
                i = c.callback(h, c);
            if (h && i) {
                g = "<img ".concat('class="', c.className, '" ', 'draggable="false" ', 'alt="', a, '"', ' src="', i, '"'), d = c.attributes(a, h);
                for (f in d) d.hasOwnProperty(f) && 0 !== f.indexOf("on") && g.indexOf(" " + f + "=") === -1 && (g = g.concat(" ", f, '="', b(d[f]), '"'));
                g = g.concat("/>")
            }
            return g
        })
    }

    function h(a) { return q[a] }

    function i() { return null }

    function j(a) { return "number" == typeof a ? a + "x" + a : a }

    function k(a) { var b = "string" == typeof a ? parseInt(a, 16) : a; return b < 65536 ? w(b) : (b -= 65536, w(55296 + (b >> 10), 56320 + (1023 & b))) }

    function l(a, b) { return b && "function" != typeof b || (b = { callback: b }), ("string" == typeof a ? g : f)(a, { callback: b.callback || c, attributes: "function" == typeof b.attributes ? b.attributes : i, base: "string" == typeof b.base ? b.base : p.base, ext: b.ext || p.ext, size: b.folder || j(b.size || p.size), className: b.className || p.className, onerror: b.onerror || p.onerror }) }

    function m(a, b) { return String(a).replace(r, b) }

    function n(a) { r.lastIndex = 0; var b = r.test(a); return r.lastIndex = 0, b }

    function o(a, b) { for (var c = [], d = 0, e = 0, f = 0; f < a.length;) d = a.charCodeAt(f++), e ? (c.push((65536 + (e - 55296 << 10) + (d - 56320)).toString(16)), e = 0) : 55296 <= d && d <= 56319 ? e = d : c.push(d.toString(16)); return c.join(b || "-") }
    var p = { base: "https://twemoji.maxcdn.com/2/", ext: ".png", size: "72x72", className: "emoji", convert: { fromCodePoint: k, toCodePoint: o }, onerror: function() { this.parentNode && this.parentNode.replaceChild(a(this.alt, !1), this) }, parse: l, replace: m, test: n },
        q = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" },
        r = /(?:\ud83d[\udc68\udc69])(?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddb0-\uddb3])|(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75]|\u26f9)((?:\ud83c[\udffb-\udfff]|\ufe0f)\u200d[\u2640\u2642]\ufe0f)|(?:\ud83c[\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6]|\ud83e[\udd26\udd35\udd37-\udd39\udd3d\udd3e\uddb8\uddb9\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f|(?:\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f)|[\u0023\u002a\u0030-\u0039]\ufe0f?\u20e3|(?:[\u00a9\u00ae\u2122\u265f]\ufe0f)|(?:\ud83c[\udc04\udd70\udd71\udd7e\udd7f\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u203c\u2049\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2697\u2699\u269b\u269c\u26a0\u26a1\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|(?:\ud83c[\udf85\udfc2-\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4-\udeb6\udec0\udecc]|\ud83e[\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\uddb5\uddb6\uddb8\uddb9\uddd1-\udddd]|[\u270a\u270b]))(?:\ud83c[\udffb-\udfff])?|(?:\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf5\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a-\udc6d\udc6f\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\udeeb\udeec\udef4-\udef9]|\ud83e[\udd10-\udd17\udd1d\udd20-\udd25\udd27-\udd2f\udd3a\udd3c\udd40-\udd45\udd47-\udd70\udd73-\udd76\udd7a\udd7c-\udda2\uddb4\uddb7\uddc0-\uddc2\uddd0\uddde-\uddff]|[\u23e9-\u23ec\u23f0\u23f3\u267e\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a])|\ufe0f/g,
        s = /\uFE0F/g,
        t = String.fromCharCode(8205),
        u = /[&<>'"]/g,
        v = /^(?:iframe|noframes|noscript|script|select|style|textarea)$/,
        w = String.fromCharCode;
    return p
}();
! function(a, b) {
    function c() {
        function c() { return !j.implementation.hasFeature || j.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1") }

        function d() {
            if (!k) {
                if ("undefined" == typeof a.twemoji) { if (l > 600) return; return a.clearTimeout(h), h = a.setTimeout(d, 50), void l++ }
                g = a.twemoji, k = !0, i && new i(function(a) {
                    for (var b, c, d, g, h = a.length; h--;) {
                        if (b = a[h].addedNodes, c = a[h].removedNodes, d = b.length, 1 === d && 1 === c.length && 3 === b[0].nodeType && "IMG" === c[0].nodeName && b[0].data === c[0].alt && "load-failed" === c[0].getAttribute("data-error")) return;
                        for (; d--;) {
                            if (g = b[d], 3 === g.nodeType) {
                                if (!g.parentNode) continue;
                                if (m)
                                    for (; g.nextSibling && 3 === g.nextSibling.nodeType;) g.nodeValue = g.nodeValue + g.nextSibling.nodeValue, g.parentNode.removeChild(g.nextSibling);
                                g = g.parentNode
                            }!g || 1 !== g.nodeType || g.className && "string" == typeof g.className && g.className.indexOf("wp-exclude-emoji") !== -1 || e(g.textContent) && f(g)
                        }
                    }
                }).observe(j.body, { childList: !0, subtree: !0 }), f(j.body)
            }
        }

        function e(a) {
            var b = /[\u203C\u2049\u20E3\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2300\u231A\u231B\u2328\u2388\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638\u2639\u263A\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692\u2693\u2694\u2696\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753\u2754\u2755\u2757\u2763\u2764\u2795\u2796\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05\u2B06\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]/,
                c = /[\uDC00-\uDFFF]/;
            return !!a && (c.test(a) || b.test(a))
        }

        function f(a, d) {
            var e;
            return !b.supports.everything && g && a && ("string" == typeof a || a.childNodes && a.childNodes.length) ? (d = d || {}, e = {
                base: c() ? b.svgUrl : b.baseUrl,
                ext: c() ? b.svgExt : b.ext,
                className: d.className || "emoji",
                callback: function(a, c) {
                    switch (a) {
                        case "a9":
                        case "ae":
                        case "2122":
                        case "2194":
                        case "2660":
                        case "2663":
                        case "2665":
                        case "2666":
                            return !1
                    }
                    return !(b.supports.everythingExceptFlag && !/^1f1(?:e[6-9a-f]|f[0-9a-f])-1f1(?:e[6-9a-f]|f[0-9a-f])$/.test(a) && !/^(1f3f3-fe0f-200d-1f308|1f3f4-200d-2620-fe0f)$/.test(a)) && "".concat(c.base, a, c.ext)
                },
                onerror: function() { g.parentNode && (this.setAttribute("data-error", "load-failed"), g.parentNode.replaceChild(j.createTextNode(g.alt), g)) }
            }, "object" == typeof d.imgAttr && (e.attributes = function() { return d.imgAttr }), g.parse(a, e)) : a
        }
        var g, h, i = a.MutationObserver || a.WebKitMutationObserver || a.MozMutationObserver,
            j = a.document,
            k = !1,
            l = 0,
            m = a.navigator.userAgent.indexOf("Trident/7.0") > 0;
        return b && (b.DOMReady ? d() : b.readyCallback = d), { parse: f, test: e }
    }
    a.wp = a.wp || {}, a.wp.emoji = new c
}(window, window._wpemojiSettings);