;
var MonsterInsights = function() {
        var e = [];
        this.setLastClicked = function(t, n, i) {
            t = typeof t !== 'undefined' ? t : [];
            n = typeof n !== 'undefined' ? n : [];
            i = typeof i !== 'undefined' ? i : !1;
            e.valuesArray = t;
            e.fieldsArray = n
        };
        this.getLastClicked = function() { return e };

        function l() {
            if (monsterinsights_frontend.is_debug_mode === 'true' || window.monsterinsights_debug_mode) { return !0 } else { return !1 }
        };

        function t(t, n) {
            t = typeof t !== 'undefined' ? t : [];
            n = typeof n !== 'undefined' ? n : {};
            __gaTracker('send', n);
            e.valuesArray = t;
            e.fieldsArray = n;
            e.tracked = !0;
            i('Tracked: ' + t.type);
            i(e)
        };

        function n(t) {
            t = typeof t !== 'undefined' ? t : [];
            e.valuesArray = t;
            e.fieldsArray = [];
            e.tracked = !1;
            i('Not Tracked: ' + t.exit);
            i(e)
        };

        function i(e) { if (l()) { console.dir(e) } };

        function a(e) { return e.replace(/^\s+|\s+$/gm, '') };

        function s() {
            var n = 0,
                e = document.domain,
                i = e.split('.'),
                t = '_gd' + (new Date()).getTime();
            while (n < (i.length - 1) && document.cookie.indexOf(t + '=' + t) == -1) {
                e = i.slice(-1 - (++n)).join('.');
                document.cookie = t + '=' + t + ';domain=' + e + ';'
            };
            document.cookie = t + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=' + e + ';';
            return e
        };

        function f(e) {
            e = e.substring(0, (e.indexOf('#') == -1) ? e.length : e.indexOf('#'));
            e = e.substring(0, (e.indexOf('?') == -1) ? e.length : e.indexOf('?'));
            e = e.substring(e.lastIndexOf('/') + 1, e.length);
            if (e.length > 0 && e.indexOf('.') !== -1) { e = e.substring(e.indexOf('.') + 1); return e } else { return '' }
        };

        function h() { return __gaTracker.hasOwnProperty('loaded') && __gaTracker.loaded == !0 };

        function p(e) { return e.which == 1 || e.which == 2 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey };

        function d() { var e = []; if (typeof monsterinsights_frontend.download_extensions == 'string') { e = monsterinsights_frontend.download_extensions.split(',') }; return e };

        function u() { var e = []; if (typeof monsterinsights_frontend.inbound_paths == 'string') { e = monsterinsights_frontend.inbound_paths.split(',') }; return e };

        function v(e) {
            if (e.which == 1) { return 'event.which=1' } else if (e.which == 2) { return 'event.which=2' } else if (e.metaKey) { return 'metaKey' } else if (e.ctrlKey) { return 'ctrlKey' } else if (e.shiftKey) { return 'shiftKey' } else if (e.altKey) { return 'altKey' } else { return '' }
        };

        function y(e) {
            var i = d(),
                o = u(),
                t = 'unknown',
                h = e.href,
                v = f(e.href),
                c = s(),
                g = e.hostname,
                r = e.protocol,
                p = e.pathname,
                n, l;
            if (h.match(/^javascript\:/i)) { t = 'internal' } else if (a(r) == 'tel' || a(r) == 'tel:') { t = 'tel' } else if (a(r) == 'mailto' || a(r) == 'mailto:') { t = 'mailto' } else if (g.length > 0 && c.length > 0 && !g.endsWith(c)) { t = 'external' } else if (o.length > 0 && p.length > 0) { for (n = 0, l = o.length; n < l; ++n) { if (o[n].length > 0 && p.startsWith(o[n])) { t = 'internal-as-outbound'; break } } };
            if (t === 'unknown' && i.length > 0 && v.length > 0) { for (n = 0, l = i.length; n < l; ++n) { if (i[n].length > 0 && h.endsWith(i[n])) { t = 'download'; break } } };
            if (t === 'unknown') { t = 'internal' };
            return t
        };

        function m(e, t) { var n = (e.target && !e.target.match(/^_(self|parent|top)$/i)) ? e.target : !1; if (t.ctrlKey || t.shiftKey || t.metaKey || t.which == 2) { n = '_blank' }; return n };

        function c(i) {
            var o = i.srcElement || i.target,
                e = [],
                a;
            e.el = o;
            e.ga_loaded = h();
            e.click_type = v(i);
            if (!h() || !p(i)) {
                e.exit = 'loaded';
                n(e);
                return
            }
            while (o && (typeof o.tagName == 'undefined' || o.tagName.toLowerCase() != 'a' || !o.href)) { o = o.parentNode };
            if (o && o.href) {
                var c = o.href,
                    C = f(o.href),
                    K = d(),
                    L = u(),
                    O = monsterinsights_frontend.home_url,
                    w = monsterinsights_frontend.track_download_as,
                    b = 'outbound-link-' + monsterinsights_frontend.internal_label,
                    E = s(),
                    r = y(o),
                    x = m(o, i);
                e.el = o;
                e.el_href = o.href;
                e.el_protocol = o.protocol;
                e.el_hostname = o.hostname;
                e.el_port = o.port;
                e.el_pathname = o.pathname;
                e.el_search = o.search;
                e.el_hash = o.hash;
                e.el_host = o.host;
                e.debug_mode = l();
                e.download_extensions = K;
                e.inbound_paths = L;
                e.home_url = O;
                e.track_download_as = w;
                e.internal_label = b;
                e.link = c;
                e.extension = C;
                e.type = r;
                e.target = x;
                e.title = o.title || o.textContent || o.innerText;
                if (r !== 'internal' && r !== 'javascript') {
                    var k = !1,
                        g = function() {
                            if (k) { return };
                            k = !0;
                            window.location.href = c
                        },
                        T = function() {
                            e.exit = 'external';
                            n(e)
                        },
                        A = function() {
                            e.exit = 'internal-as-outbound';
                            n(e)
                        };
                    if (x || r == 'mailto' || r == 'tel') {
                        if (r == 'download') {
                            if (w == 'pageview') {
                                a = { hitType: 'pageview', page: c, };
                                t(e, a)
                            } else {
                                a = { hitType: 'event', eventCategory: 'download', eventAction: c, eventLabel: e.title, };
                                t(e, a)
                            }
                        } else if (r == 'tel') {
                            a = { hitType: 'event', eventCategory: 'tel', eventAction: c, eventLabel: e.title.replace('tel:', ''), };
                            t(e, a)
                        } else if (r == 'mailto') {
                            a = { hitType: 'event', eventCategory: 'mailto', eventAction: c, eventLabel: e.title.replace('mailto:', ''), };
                            t(e, a)
                        } else if (r == 'internal-as-outbound') {
                            a = { hitType: 'event', eventCategory: b, eventAction: c, eventLabel: e.title, };
                            t(e, a)
                        } else if (r == 'external') {
                            a = { hitType: 'event', eventCategory: 'outbound-link', eventAction: c, eventLabel: e.title, };
                            t(e, a)
                        } else {
                            e.exit = 'type';
                            n(e)
                        }
                    } else {
                        if (r != 'external' && r != 'internal-as-outbound') {
                            if (!i.defaultPrevented) {
                                if (i.preventDefault) { i.preventDefault() } else { i.returnValue = !1 }
                            }
                        };
                        if (r == 'download') {
                            if (w == 'pageview') {
                                a = { hitType: 'pageview', page: c, hitCallback: g, };
                                t(e, a)
                            } else {
                                a = { hitType: 'event', eventCategory: 'download', eventAction: c, eventLabel: e.title, hitCallback: g, };
                                t(e, a)
                            }
                        } else if (r == 'internal-as-outbound') {
                            window.onbeforeunload = function(n) {
                                if (!i.defaultPrevented) {
                                    if (i.preventDefault) { i.preventDefault() } else { i.returnValue = !1 }
                                };
                                a = { hitType: 'event', eventCategory: b, eventAction: c, eventLabel: e.title, hitCallback: g, };
                                if (navigator.sendBeacon) { a.transport = 'beacon' };
                                t(e, a);
                                setTimeout(g, 1000)
                            }
                        } else if (r == 'external') {
                            window.onbeforeunload = function(n) {
                                if (!i.defaultPrevented) {
                                    if (i.preventDefault) { i.preventDefault() } else { i.returnValue = !1 }
                                };
                                a = { hitType: 'event', eventCategory: 'outbound-link', eventAction: c, eventLabel: e.title, hitCallback: g, };
                                if (navigator.sendBeacon) { a.transport = 'beacon' };
                                t(e, a);
                                setTimeout(g, 1000)
                            }
                        } else {
                            e.exit = 'type';
                            n(e)
                        };
                        if (r != 'external' && r != 'internal-as-outbound') { setTimeout(g, 1000) } else {
                            if (r == 'external') { setTimeout(T, 1100) } else { setTimeout(A, 1100) }
                        }
                    }
                } else {
                    e.exit = 'internal';
                    n(e)
                }
            } else {
                e.exit = 'notlink';
                n(e)
            }
        };
        var r = window.location.hash;

        function g() {
            if (monsterinsights_frontend.hash_tracking === 'true' && r != window.location.hash) {
                r = window.location.hash;
                __gaTracker('set', 'page', location.pathname + location.search + location.hash);
                __gaTracker('send', 'pageview');
                i('Hash change to: ' + location.pathname + location.search + location.hash)
            } else { i('Hash change to (untracked): ' + location.pathname + location.search + location.hash) }
        };
        var o = window;
        if (o.addEventListener) {
            o.addEventListener('load', function() { document.body.addEventListener('click', c, !1) }, !1);
            window.addEventListener('hashchange', g, !1)
        } else {
            if (o.attachEvent) {
                o.attachEvent('onload', function() { document.body.attachEvent('onclick', c) });
                window.attachEvent('onhashchange', g)
            }
        };
        if (typeof String.prototype.endsWith !== 'function') { String.prototype.endsWith = function(e) { return this.indexOf(e, this.length - e.length) !== -1 } };
        if (typeof String.prototype.startsWith !== 'function') { String.prototype.startsWith = function(e) { return this.indexOf(e) === 0 } };
        if (typeof Array.prototype.lastIndexOf !== 'function') {
            Array.prototype.lastIndexOf = function(e) {
                'use strict';
                if (this === void 0 || this === null) { throw new TypeError() };
                var t, n, o = Object(this),
                    i = o.length >>> 0;
                if (i === 0) { return -1 };
                t = i - 1;
                if (arguments.length > 1) {
                    t = Number(arguments[1]);
                    if (t != t) { t = 0 } else if (t != 0 && t != (1 / 0) && t != -(1 / 0)) { t = (t > 0 || -1) * Math.floor(Math.abs(t)) }
                };
                for (n = t >= 0 ? Math.min(t, i - 1) : i - Math.abs(t); n >= 0; n--) { if (n in o && o[n] === e) { return n } };
                return -1
            }
        }
    },
    MonsterInsightsObject = new MonsterInsights();