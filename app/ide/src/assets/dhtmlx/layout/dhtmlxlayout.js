/*
Product Name: dhtmlxLayout 
Version: 5.0 
Edition: Standard 
License: content of this file is covered by GPL. Usage outside GPL terms is prohibited. To obtain Commercial or Enterprise license contact sales@dhtmlx.com
Copyright UAB Dinamenta http://www.dhtmlx.com
*/

if (typeof (window.dhx) == "undefined") {
    window.dhx = window.dhx4 = {
        version: "5.0",
        skin: null,
        skinDetect: function(a) {
            return {
                10: "dhx_skyblue",
                20: "dhx_web",
                30: "dhx_terrace",
                40: "material"
            }[this.readFromCss(a + "_skin_detect")] || null
        },
        readFromCss: function(c, d, e) {
            var b = document.createElement("DIV");
            b.className = c;
            if (document.body.firstChild != null) {
                document.body.insertBefore(b, document.body.firstChild)
            } else {
                document.body.appendChild(b)
            }
            if (typeof (e) == "string") {
                b.innerHTML = e
            }
            var a = b[d || "offsetWidth"];
            b.parentNode.removeChild(b);
            b = null;
            return a
        },
        lastId: 1,
        newId: function() {
            return this.lastId++
        },
        zim: {
            data: {},
            step: 5,
            first: function() {
                return 100
            },
            last: function() {
                var c = this.first();
                for (var b in this.data) {
                    c = Math.max(c, this.data[b])
                }
                return c
            },
            reserve: function(a) {
                this.data[a] = this.last() + this.step;
                return this.data[a]
            },
            clear: function(a) {
                if (this.data[a] != null) {
                    this.data[a] = null;
                    delete this.data[a]
                }
            }
        },
        s2b: function(a) {
            if (typeof (a) == "string") {
                a = a.toLowerCase()
            }
            return ( a == true || a == 1 || a == "true" || a == "1" || a == "yes" || a == "y" || a == "on")
        },
        s2j: function(s) {
            var obj = null;
            dhx4.temp = null;
            try {
                eval("dhx4.temp=" + s)
            } catch (e) {
                dhx4.temp = null
            }
            obj = dhx4.temp;
            dhx4.temp = null;
            return obj
        },
        absLeft: function(a) {
            if (typeof (a) == "string") {
                a = document.getElementById(a)
            }
            return this.getOffset(a).left
        },
        absTop: function(a) {
            if (typeof (a) == "string") {
                a = document.getElementById(a)
            }
            return this.getOffset(a).top
        },
        _aOfs: function(a) {
            var c = 0
              , b = 0;
            while (a) {
                c = c + parseInt(a.offsetTop);
                b = b + parseInt(a.offsetLeft);
                a = a.offsetParent
            }
            return {
                top: c,
                left: b
            }
        },
        _aOfsRect: function(d) {
            var g = d.getBoundingClientRect();
            var h = document.body;
            var b = document.documentElement;
            var a = window.pageYOffset || b.scrollTop || h.scrollTop;
            var e = window.pageXOffset || b.scrollLeft || h.scrollLeft;
            var f = b.clientTop || h.clientTop || 0;
            var i = b.clientLeft || h.clientLeft || 0;
            var j = g.top + a - f;
            var c = g.left + e - i;
            return {
                top: Math.round(j),
                left: Math.round(c)
            }
        },
        getOffset: function(a) {
            if (a.getBoundingClientRect) {
                return this._aOfsRect(a)
            } else {
                return this._aOfs(a)
            }
        },
        _isObj: function(a) {
            return ( a != null && typeof (a) == "object" && typeof (a.length) == "undefined")
        },
        _copyObj: function(d) {
            if (this._isObj(d)) {
                var c = {};
                for (var b in d) {
                    if (typeof (d[b]) == "object" && d[b] != null) {
                        c[b] = this._copyObj(d[b])
                    } else {
                        c[b] = d[b]
                    }
                }
            } else {
                var c = [];
                for (var b = 0; b < d.length; b++) {
                    if (typeof (d[b]) == "object" && d[b] != null) {
                        c[b] = this._copyObj(d[b])
                    } else {
                        c[b] = d[b]
                    }
                }
            }
            return c
        },
        screenDim: function() {
            var a = (navigator.userAgent.indexOf("MSIE") >= 0);
            var b = {};
            b.left = document.body.scrollLeft;
            b.right = b.left + (window.innerWidth || document.body.clientWidth);
            b.top = Math.max((a ? document.documentElement : document.getElementsByTagName("html")[0]).scrollTop, document.body.scrollTop);
            b.bottom = b.top + (a ? Math.max(document.documentElement.clientHeight || 0, document.documentElement.offsetHeight || 0) : window.innerHeight);
            return b
        },
        selectTextRange: function(d, g, b) {
            d = (typeof (d) == "string" ? document.getElementById(d) : d);
            var a = d.value.length;
            g = Math.max(Math.min(g, a), 0);
            b = Math.min(b, a);
            if (d.setSelectionRange) {
                try {
                    d.setSelectionRange(g, b)
                } catch (f) {}
            } else {
                if (d.createTextRange) {
                    var c = d.createTextRange();
                    c.moveStart("character", g);
                    c.moveEnd("character", b - a);
                    try {
                        c.select()
                    } catch (f) {}
                }
            }
        },
        transData: null,
        transDetect: function() {
            if (this.transData == null) {
                this.transData = {
                    transProp: false,
                    transEv: null
                };
                var c = {
                    MozTransition: "transitionend",
                    WebkitTransition: "webkitTransitionEnd",
                    OTransition: "oTransitionEnd",
                    msTransition: "transitionend",
                    transition: "transitionend"
                };
                for (var b in c) {
                    if (this.transData.transProp == false && document.documentElement.style[b] != null) {
                        this.transData.transProp = b;
                        this.transData.transEv = c[b]
                    }
                }
                c = null
            }
            return this.transData
        },
        _xmlNodeValue: function(a) {
            var c = "";
            for (var b = 0; b < a.childNodes.length; b++) {
                c += (a.childNodes[b].nodeValue != null ? a.childNodes[b].nodeValue.toString().replace(/^[\n\r\s]{0,}/, "").replace(/[\n\r\s]{0,}$/, "") : "")
            }
            return c
        }
    };
    window.dhx4.isIE = (navigator.userAgent.indexOf("MSIE") >= 0 || navigator.userAgent.indexOf("Trident") >= 0);
    window.dhx4.isIE6 = (window.XMLHttpRequest == null && navigator.userAgent.indexOf("MSIE") >= 0);
    window.dhx4.isIE7 = (navigator.userAgent.indexOf("MSIE 7.0") >= 0 && navigator.userAgent.indexOf("Trident") < 0);
    window.dhx4.isIE8 = (navigator.userAgent.indexOf("MSIE 8.0") >= 0 && navigator.userAgent.indexOf("Trident") >= 0);
    window.dhx4.isIE9 = (navigator.userAgent.indexOf("MSIE 9.0") >= 0 && navigator.userAgent.indexOf("Trident") >= 0);
    window.dhx4.isIE10 = (navigator.userAgent.indexOf("MSIE 10.0") >= 0 && navigator.userAgent.indexOf("Trident") >= 0 && window.navigator.pointerEnabled != true);
    window.dhx4.isIE11 = (navigator.userAgent.indexOf("Trident") >= 0 && window.navigator.pointerEnabled == true);
    window.dhx4.isEdge = (navigator.userAgent.indexOf("Edge") >= 0);
    window.dhx4.isOpera = (navigator.userAgent.indexOf("Opera") >= 0);
    window.dhx4.isChrome = (navigator.userAgent.indexOf("Chrome") >= 0) && !window.dhx4.isEdge;
    window.dhx4.isKHTML = (navigator.userAgent.indexOf("Safari") >= 0 || navigator.userAgent.indexOf("Konqueror") >= 0) && !window.dhx4.isEdge;
    window.dhx4.isFF = (navigator.userAgent.indexOf("Firefox") >= 0);
    window.dhx4.isIPad = (navigator.userAgent.search(/iPad/gi) >= 0);
    window.dhx4.dnd = {
        evs: {},
        p_en: ((window.dhx4.isIE || window.dhx4.isEdge) && (window.navigator.pointerEnabled || window.navigator.msPointerEnabled)),
        _mTouch: function(a) {
            return ( window.dhx4.isIE10 && a.pointerType == a.MSPOINTER_TYPE_MOUSE || window.dhx4.isIE11 && a.pointerType == "mouse" || window.dhx4.isEdge && a.pointerType == "mouse")
        },
        _touchOn: function(a) {
            if (a == null) {
                a = document.body
            }
            a.style.touchAction = a.style.msTouchAction = "";
            a = null
        },
        _touchOff: function(a) {
            if (a == null) {
                a = document.body
            }
            a.style.touchAction = a.style.msTouchAction = "none";
            a = null
        }
    };
    if (window.navigator.pointerEnabled == true) {
        window.dhx4.dnd.evs = {
            start: "pointerdown",
            move: "pointermove",
            end: "pointerup"
        }
    } else {
        if (window.navigator.msPointerEnabled == true) {
            window.dhx4.dnd.evs = {
                start: "MSPointerDown",
                move: "MSPointerMove",
                end: "MSPointerUp"
            }
        } else {
            if (typeof (window.addEventListener) != "undefined") {
                window.dhx4.dnd.evs = {
                    start: "touchstart",
                    move: "touchmove",
                    end: "touchend"
                }
            }
        }
    }
}
if (typeof (window.dhx4.template) == "undefined") {
    window.dhx4.trim = function(a) {
        return String(a).replace(/^\s{1,}/, "").replace(/\s{1,}$/, "")
    }
    ;
    window.dhx4.template = function(b, c, a) {
        return b.replace(/#([a-z0-9_-]{1,})(\|([^#]*))?#/gi, function() {
            var g = arguments[1];
            var f = window.dhx4.trim(arguments[3]);
            var h = null;
            var e = [c[g]];
            if (f.length > 0) {
                f = f.split(":");
                var d = [];
                for (var i = 0; i < f.length; i++) {
                    if (i > 0 && d[d.length - 1].match(/\\$/) != null) {
                        d[d.length - 1] = d[d.length - 1].replace(/\\$/, "") + ":" + f[i]
                    } else {
                        d.push(f[i])
                    }
                }
                h = d[0];
                for (var i = 1; i < d.length; i++) {
                    e.push(d[i])
                }
            }
            if (typeof (h) == "string" && typeof (window.dhx4.template[h]) == "function") {
                return window.dhx4.template[h].apply(window.dhx4.template, e)
            }
            if (g.length > 0 && typeof (c[g]) != "undefined") {
                if (a == true) {
                    return window.dhx4.trim(c[g])
                }
                return String(c[g])
            }
            return ""
        })
    }
    ;
    window.dhx4.template.date = function(a, b) {
        if (a != null) {
            if (a instanceof Date) {
                return window.dhx4.date2str(a, b)
            } else {
                a = a.toString();
                if (a.match(/^\d*$/) != null) {
                    return window.dhx4.date2str(new Date(parseInt(a)), b)
                }
                return a
            }
        }
        return ""
    }
    ;
    window.dhx4.template.maxlength = function(b, a) {
        return String(b).substr(0, a)
    }
    ;
    window.dhx4.template.number_format = function(d, e, c, a) {
        var b = window.dhx4.template._parseFmt(e, c, a);
        if (b == false) {
            return d
        }
        return window.dhx4.template._getFmtValue(d, b)
    }
    ;
    window.dhx4.template.lowercase = function(a) {
        if (typeof (a) == "undefined" || a == null) {
            a = ""
        }
        return String(a).toLowerCase()
    }
    ;
    window.dhx4.template.uppercase = function(a) {
        if (typeof (a) == "undefined" || a == null) {
            a = ""
        }
        return String(a).toUpperCase()
    }
    ;
    window.dhx4.template._parseFmt = function(h, c, a) {
        var d = h.match(/^([^\.\,0-9]*)([0\.\,]*)([^\.\,0-9]*)/);
        if (d == null || d.length != 4) {
            return false
        }
        var b = {
            i_len: false,
            i_sep: (typeof (c) == "string" ? c : ","),
            d_len: false,
            d_sep: (typeof (a) == "string" ? a : "."),
            s_bef: (typeof (d[1]) == "string" ? d[1] : ""),
            s_aft: (typeof (d[3]) == "string" ? d[3] : "")
        };
        var g = d[2].split(".");
        if (g[1] != null) {
            b.d_len = g[1].length
        }
        var e = g[0].split(",");
        if (e.length > 1) {
            b.i_len = e[e.length - 1].length
        }
        return b
    }
    ;
    window.dhx4.template._getFmtValue = function(value, fmt) {
        var r = String(value).match(/^(-)?([0-9]{1,})(\.([0-9]{1,}))?$/);
        if (r != null && r.length == 5) {
            var v0 = "";
            if (r[1] != null) {
                v0 += r[1]
            }
            v0 += fmt.s_bef;
            if (fmt.i_len !== false) {
                var i = 0;
                var v1 = "";
                for (var q = r[2].length - 1; q >= 0; q--) {
                    v1 = "" + r[2].charAt(q) + v1;
                    if (++i == fmt.i_len && q > 0) {
                        v1 = fmt.i_sep + v1;
                        i = 0
                    }
                }
                v0 += v1
            } else {
                v0 += r[2]
            }
            if (fmt.d_len !== false) {
                if (r[4] == null) {
                    r[4] = ""
                }
                while (r[4].length < fmt.d_len) {
                    r[4] += "0"
                }
                eval("dhx4.temp = new RegExp(/\\d{" + fmt.d_len + "}/);");
                var t1 = (r[4]).match(dhx4.temp);
                if (t1 != null) {
                    v0 += fmt.d_sep + t1
                }
                dhx4.temp = t1 = null
            }
            v0 += fmt.s_aft;
            return v0
        }
        return value
    }
}
if (typeof (window.dhx4.dateLang) == "undefined") {
    window.dhx4.dateLang = "en";
    window.dhx4.dateStrings = {
        en: {
            monthFullName: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthShortName: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayFullName: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayShortName: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
        }
    };
    window.dhx4.dateFormat = {
        en: "%Y-%m-%d"
    };
    window.dhx4.date2str = function(f, d, a) {
        if (d == null || typeof (d) == "undefined") {
            d = window.dhx4.dateFormat[window.dhx4.dateLang]
        }
        if (a == null || typeof (a) == "undefined") {
            a = window.dhx4.dateStrings[window.dhx4.dateLang]
        }
        if (f instanceof Date) {
            var e = function(g) {
                return ( String(g).length == 1 ? "0" + String(g) : g)
            };
            var b = function(i) {
                switch (i) {
                case "%d":
                    return e(f.getDate());
                case "%j":
                    return f.getDate();
                case "%D":
                    return a.dayShortName[f.getDay()];
                case "%l":
                    return a.dayFullName[f.getDay()];
                case "%m":
                    return e(f.getMonth() + 1);
                case "%n":
                    return f.getMonth() + 1;
                case "%M":
                    return a.monthShortName[f.getMonth()];
                case "%F":
                    return a.monthFullName[f.getMonth()];
                case "%y":
                    return e(f.getYear() % 100);
                case "%Y":
                    return f.getFullYear();
                case "%g":
                    return (f.getHours() + 11) % 12 + 1;
                case "%h":
                    return e((f.getHours() + 11) % 12 + 1);
                case "%G":
                    return f.getHours();
                case "%H":
                    return e(f.getHours());
                case "%i":
                    return e(f.getMinutes());
                case "%s":
                    return e(f.getSeconds());
                case "%a":
                    return ( f.getHours() > 11 ? "pm" : "am") ;
                case "%A":
                    return ( f.getHours() > 11 ? "PM" : "AM") ;
                case "%%":
                    return "%";
                case "%u":
                    return f.getMilliseconds();
                case "%P":
                    if (window.dhx4.temp_calendar != null && window.dhx4.temp_calendar.tz != null) {
                        return window.dhx4.temp_calendar.tz
                    }
                    var k = f.getTimezoneOffset();
                    var j = Math.abs(Math.floor(k / 60));
                    var g = Math.abs(k) - j * 60;
                    return (k > 0 ? "-" : "+") + e(j) + ":" + e(g);
                default:
                    return i
                }
            };
            var c = String(d || window.dhx4.dateFormat).replace(/%[a-zA-Z]/g, b)
        }
        return ( c || String(f))
    }
    ;
    window.dhx4.str2date = function(g, s, x) {
        if (s == null || typeof (s) == "undefined") {
            s = window.dhx4.dateFormat[window.dhx4.dateLang]
        }
        if (x == null || typeof (x) == "undefined") {
            x = window.dhx4.dateStrings[window.dhx4.dateLang]
        }
        s = s.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\\:|]/g, "\\$&");
        var u = [];
        var j = [];
        s = s.replace(/%[a-z]/gi, function(e) {
            switch (e) {
            case "%d":
            case "%m":
            case "%y":
            case "%h":
            case "%H":
            case "%i":
            case "%s":
                j.push(e);
                return "(\\d{2})";
            case "%D":
            case "%l":
            case "%M":
            case "%F":
                j.push(e);
                return "([a-zéûä\u0430-\u044F\u0451]{1,})";
            case "%j":
            case "%n":
            case "%g":
            case "%G":
                j.push(e);
                return "(\\d{1,2})";
            case "%Y":
                j.push(e);
                return "(\\d{4})";
            case "%a":
                j.push(e);
                return "([a|p]m)";
            case "%A":
                j.push(e);
                return "([A|P]M)";
            case "%u":
                j.push(e);
                return "(\\d{1,6})";
            case "%P":
                j.push(e);
                return "([+-]\\d{1,2}:\\d{1,2})"
            }
            return e
        });
        var y = new RegExp(s,"i");
        var l = g.match(y);
        if (l == null || l.length - 1 != j.length) {
            return "Invalid Date"
        }
        for (var b = 1; b < l.length; b++) {
            u.push(l[b])
        }
        var c = {
            "%y": 1,
            "%Y": 1,
            "%n": 2,
            "%m": 2,
            "%M": 2,
            "%F": 2,
            "%d": 3,
            "%j": 3,
            "%a": 4,
            "%A": 4,
            "%H": 5,
            "%G": 5,
            "%h": 5,
            "%g": 5,
            "%i": 6,
            "%s": 7,
            "%u": 7,
            "%P": 7
        };
        var m = {};
        var i = {};
        for (var b = 0; b < j.length; b++) {
            if (typeof (c[j[b]]) != "undefined") {
                var d = c[j[b]];
                if (!m[d]) {
                    m[d] = [];
                    i[d] = []
                }
                m[d].push(u[b]);
                i[d].push(j[b])
            }
        }
        u = [];
        j = [];
        for (var b = 1; b <= 7; b++) {
            if (m[b] != null) {
                for (var o = 0; o < m[b].length; o++) {
                    u.push(m[b][o]);
                    j.push(i[b][o])
                }
            }
        }
        var a = new Date();
        a.setDate(1);
        a.setHours(0);
        a.setMinutes(0);
        a.setSeconds(0);
        a.setMilliseconds(0);
        var n = function(k, e) {
            for (var f = 0; f < e.length; f++) {
                if (e[f].toLowerCase() == k) {
                    return f
                }
            }
            return -1
        };
        for (var b = 0; b < u.length; b++) {
            switch (j[b]) {
            case "%d":
            case "%j":
            case "%n":
            case "%m":
            case "%Y":
            case "%H":
            case "%G":
            case "%i":
            case "%s":
            case "%u":
                if (!isNaN(u[b])) {
                    a[{
                        "%d": "setDate",
                        "%j": "setDate",
                        "%n": "setMonth",
                        "%m": "setMonth",
                        "%Y": "setFullYear",
                        "%H": "setHours",
                        "%G": "setHours",
                        "%i": "setMinutes",
                        "%s": "setSeconds",
                        "%u": "setMilliseconds"
                    }[j[b]]](Number(u[b]) + (j[b] == "%m" || j[b] == "%n" ? -1 : 0))
                }
                break;
            case "%M":
            case "%F":
                var h = n(u[b].toLowerCase(), x[{
                    "%M": "monthShortName",
                    "%F": "monthFullName"
                }[j[b]]]);
                if (h >= 0) {
                    a.setMonth(h)
                }
                break;
            case "%y":
                if (!isNaN(u[b])) {
                    var t = Number(u[b]);
                    a.setFullYear(t + (t > 50 ? 1900 : 2000))
                }
                break;
            case "%g":
            case "%h":
                if (!isNaN(u[b])) {
                    var t = Number(u[b]);
                    if (t <= 12 && t >= 0) {
                        a.setHours(t + (n("pm", u) >= 0 ? (t == 12 ? 0 : 12) : (t == 12 ? -12 : 0)))
                    }
                }
                break;
            case "%P":
                if (window.dhx4.temp_calendar != null) {
                    window.dhx4.temp_calendar.tz = u[b]
                }
                break
            }
        }
        return a
    }
}
if (typeof (window.dhx4.ajax) == "undefined") {
    window.dhx4.ajax = {
        cache: false,
        method: "get",
        parse: function(a) {
            if (typeof a !== "string") {
                return a
            }
            a = a.replace(/^[\s]+/, "");
            if (window.DOMParser && !dhx4.isIE) {
                var b = (new window.DOMParser()).parseFromString(a, "text/xml")
            } else {
                if (window.ActiveXObject !== window.undefined) {
                    var b = new window.ActiveXObject("Microsoft.XMLDOM");
                    b.async = "false";
                    b.loadXML(a)
                }
            }
            return b
        },
        xmltop: function(a, d, c) {
            if (typeof d.status == "undefined" || d.status < 400) {
                xml = (!d.responseXML) ? dhx4.ajax.parse(d.responseText || d) : (d.responseXML || d);
                if (xml && xml.documentElement !== null) {
                    try {
                        if (!xml.getElementsByTagName("parsererror").length) {
                            return xml.getElementsByTagName(a)[0]
                        }
                    } catch (b) {}
                }
            }
            if (c !== -1) {
                dhx4.callEvent("onLoadXMLError", ["Incorrect XML", arguments[1], c])
            }
            return document.createElement("DIV")
        },
        xpath: function(c, a) {
            if (!a.nodeName) {
                a = a.responseXML || a
            }
            if (dhx4.isIE) {
                try {
                    return a.selectNodes(c) || []
                } catch (f) {
                    return []
                }
            } else {
                var d = [];
                var g;
                var b = (a.ownerDocument || a).evaluate(c, a, null, XPathResult.ANY_TYPE, null);
                while (g = b.iterateNext()) {
                    d.push(g)
                }
                return d
            }
        },
        query: function(a) {
            dhx4.ajax._call((a.method || "GET"), a.url, a.data || "", (a.async || true), a.callback, null, a.headers)
        },
        get: function(a, b) {
            return this._call("GET", a, null, true, b)
        },
        getSync: function(a) {
            return this._call("GET", a, null, false)
        },
        put: function(b, a, c) {
            return this._call("PUT", b, a, true, c)
        },
        del: function(b, a, c) {
            return this._call("DELETE", b, a, true, c)
        },
        post: function(b, a, c) {
            if (arguments.length == 1) {
                a = ""
            } else {
                if (arguments.length == 2 && (typeof (a) == "function" || typeof (window[a]) == "function")) {
                    c = a;
                    a = ""
                } else {
                    a = String(a)
                }
            }
            return this._call("POST", b, a, true, c)
        },
        postSync: function(b, a) {
            a = (a == null ? "" : String(a));
            return this._call("POST", b, a, false)
        },
        getLong: function(a, b) {
            this._call("GET", a, null, true, b, {
                url: a
            })
        },
        postLong: function(b, a, c) {
            if (arguments.length == 2 && (typeof (a) == "function" || typeof (window[a]))) {
                c = a;
                a = ""
            }
            this._call("POST", b, a, true, c, {
                url: b,
                postData: a
            })
        },
        _call: function(a, b, c, e, g, j, d) {
            var i = (window.XMLHttpRequest && !dhx4.isIE ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));
            var f = (navigator.userAgent.match(/AppleWebKit/) != null && navigator.userAgent.match(/Qt/) != null && navigator.userAgent.match(/Safari/) != null);
            if (e == true) {
                i.onreadystatechange = function() {
                    if ((i.readyState == 4) || (f == true && i.readyState == 3)) {
                        if (i.status != 200 || i.responseText == "") {
                            if (!dhx4.callEvent("onAjaxError", [{
                                xmlDoc: i,
                                filePath: b,
                                async: e
                            }])) {
                                return
                            }
                        }
                        window.setTimeout(function() {
                            if (typeof (g) == "function") {
                                g.apply(window, [{
                                    xmlDoc: i,
                                    filePath: b,
                                    async: e
                                }])
                            }
                            if (j != null) {
                                if (typeof (j.postData) != "undefined") {
                                    dhx4.ajax.postLong(j.url, j.postData, g)
                                } else {
                                    dhx4.ajax.getLong(j.url, g)
                                }
                            }
                            g = null;
                            i = null
                        }, 1)
                    }
                }
            }
            if (a == "GET") {
                b += this._dhxr(b)
            }
            i.open(a, b, e);
            if (d != null) {
                for (var h in d) {
                    i.setRequestHeader(h, d[h])
                }
            } else {
                if (a == "POST" || a == "PUT" || a == "DELETE") {
                    i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
                } else {
                    if (a == "GET") {
                        c = null
                    }
                }
            }
            i.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            i.send(c);
            if (e != true) {
                if ((i.readyState == 4) || (f == true && i.readyState == 3)) {
                    if (i.status != 200 || i.responseText == "") {
                        dhx4.callEvent("onAjaxError", [{
                            xmlDoc: i,
                            filePath: b,
                            async: e
                        }])
                    }
                }
            }
            return {
                xmlDoc: i,
                filePath: b,
                async: e
            }
        },
        _dhxr: function(a, b) {
            if (this.cache != true) {
                if (a.match(/^[\?\&]$/) == null) {
                    a = (a.indexOf("?") >= 0 ? "&" : "?")
                }
                if (typeof (b) == "undefined") {
                    b = true
                }
                return a + "dhxr" + new Date().getTime() + (b == true ? "=1" : "")
            }
            return ""
        }
    }
}
if (typeof (window.dhx4._enableDataLoading) == "undefined") {
    window.dhx4._enableDataLoading = function(g, c, f, e, h) {
        if (h == "clear") {
            for (var b in g._dhxdataload) {
                g._dhxdataload[b] = null;
                delete g._dhxdataload[b]
            }
            g._loadData = null;
            g._dhxdataload = null;
            g.load = null;
            g.loadStruct = null;
            g = null;
            return
        }
        g._dhxdataload = {
            initObj: c,
            xmlToJson: f,
            xmlRootTag: e,
            onBeforeXLS: null
        };
        g._loadData = function(n, o, p) {
            if (arguments.length == 2) {
                p = o;
                o = null
            }
            var m = null;
            if (arguments.length == 3) {
                p = arguments[2]
            }
            if (typeof (n) == "string") {
                var l = n.replace(/^\s{1,}/, "").replace(/\s{1,}$/, "");
                var s = new RegExp("^<" + this._dhxdataload.xmlRootTag);
                if (s.test(l.replace(/^<\?xml[^\?]*\?>\s*/, ""))) {
                    m = dhx4.ajax.parse(n);
                    if (m != null) {
                        m = this[this._dhxdataload.xmlToJson].apply(this, [m])
                    }
                }
                if (m == null && (l.match(/^[\s\S]*{[.\s\S]*}[\s\S]*$/) != null || l.match(/^[\s\S]*\[[.\s\S]*\][\s\S]*$/) != null)) {
                    m = dhx4.s2j(l)
                }
                if (m == null) {
                    this.callEvent("onXLS", []);
                    var j = [];
                    if (typeof (this._dhxdataload.onBeforeXLS) == "function") {
                        var l = this._dhxdataload.onBeforeXLS.apply(this, [n]);
                        if (l != null && typeof (l) == "object") {
                            if (l.url != null) {
                                n = l.url
                            }
                            if (l.params != null) {
                                for (var q in l.params) {
                                    j.push(q + "=" + encodeURIComponent(l.params[q]))
                                }
                            }
                        }
                    }
                    var r = this;
                    var i = function(a) {
                        var k = null;
                        if ((a.xmlDoc.getResponseHeader("Content-Type") || "").search(/xml/gi) >= 0 || (a.xmlDoc.responseText.replace(/^\s{1,}/, "")).match(/^</) != null) {
                            k = r[r._dhxdataload.xmlToJson].apply(r, [a.xmlDoc.responseXML])
                        } else {
                            k = dhx4.s2j(a.xmlDoc.responseText)
                        }
                        if (k != null) {
                            r[r._dhxdataload.initObj].apply(r, [k, n])
                        }
                        r.callEvent("onXLE", []);
                        if (p != null) {
                            if (typeof (p) == "function") {
                                p.apply(r, [])
                            } else {
                                if (typeof (window[p]) == "function") {
                                    window[p].apply(r, [])
                                }
                            }
                        }
                        i = p = null;
                        k = a = r = null
                    };
                    j = j.join("&") + (typeof (o) == "string" ? "&" + o : "");
                    if (dhx4.ajax.method == "post") {
                        dhx4.ajax.post(n, j, i)
                    } else {
                        if (dhx4.ajax.method == "get") {
                            dhx4.ajax.get(n + (j.length > 0 ? (n.indexOf("?") > 0 ? "&" : "?") + j : ""), i)
                        }
                    }
                    return
                }
            } else {
                if (typeof (n.documentElement) == "object" || (typeof (n.tagName) != "undefined" && typeof (n.getElementsByTagName) != "undefined" && n.getElementsByTagName(this._dhxdataload.xmlRootTag).length > 0)) {
                    m = this[this._dhxdataload.xmlToJson].apply(this, [n])
                } else {
                    m = window.dhx4._copyObj(n)
                }
            }
            if (m != null) {
                this[this._dhxdataload.initObj].apply(this, [m])
            }
            if (p != null) {
                if (typeof (p) == "function") {
                    p.apply(this, [])
                } else {
                    if (typeof (window[p]) == "function") {
                        window[p].apply(this, [])
                    }
                }
                p = null
            }
        }
        ;
        if (h != null) {
            var d = {
                struct: "loadStruct",
                data: "load"
            };
            for (var b in h) {
                if (h[b] == true) {
                    g[d[b]] = function() {
                        return this._loadData.apply(this, arguments)
                    }
                }
            }
        }
        g = null
    }
}
if (typeof (window.dhx4._eventable) == "undefined") {
    window.dhx4._eventable = function(a, b) {
        if (b == "clear") {
            a.detachAllEvents();
            a.dhxevs = null;
            a.attachEvent = null;
            a.detachEvent = null;
            a.checkEvent = null;
            a.callEvent = null;
            a.detachAllEvents = null;
            a = null;
            return
        }
        a.dhxevs = {
            data: {}
        };
        a.attachEvent = function(c, e) {
            c = String(c).toLowerCase();
            if (!this.dhxevs.data[c]) {
                this.dhxevs.data[c] = {}
            }
            var d = window.dhx4.newId();
            this.dhxevs.data[c][d] = e;
            return d
        }
        ;
        a.detachEvent = function(f) {
            for (var d in this.dhxevs.data) {
                var e = 0;
                for (var c in this.dhxevs.data[d]) {
                    if (c == f) {
                        this.dhxevs.data[d][c] = null;
                        delete this.dhxevs.data[d][c]
                    } else {
                        e++
                    }
                }
                if (e == 0) {
                    this.dhxevs.data[d] = null;
                    delete this.dhxevs.data[d]
                }
            }
        }
        ;
        a.checkEvent = function(c) {
            c = String(c).toLowerCase();
            return ( this.dhxevs.data[c] != null)
        }
        ;
        a.callEvent = function(d, f) {
            d = String(d).toLowerCase();
            if (this.dhxevs.data[d] == null) {
                return true
            }
            var e = true;
            for (var c in this.dhxevs.data[d]) {
                e = this.dhxevs.data[d][c].apply(this, f) && e
            }
            return e
        }
        ;
        a.detachAllEvents = function() {
            for (var d in this.dhxevs.data) {
                for (var c in this.dhxevs.data[d]) {
                    this.dhxevs.data[d][c] = null;
                    delete this.dhxevs.data[d][c]
                }
                this.dhxevs.data[d] = null;
                delete this.dhxevs.data[d]
            }
        }
        ;
        a = null
    }
    ;
    dhx4._eventable(dhx4)
}
if (!window.dhtmlxValidation) {
    dhtmlxValidation = function() {}
    ;
    dhtmlxValidation.prototype = {
        isEmpty: function(a) {
            return a == ""
        },
        isNotEmpty: function(a) {
            return ( a instanceof Array ? a.length > 0 : !a == "")
        },
        isValidBoolean: function(a) {
            return !!a.toString().match(/^(0|1|true|false)$/)
        },
        isValidEmail: function(a) {
            return !!a.toString().match(/(^[a-z0-9]([0-9a-z\-_\.]*)@([0-9a-z_\-\.]*)([.][a-z]{3})$)|(^[a-z]([0-9a-z_\.\-]*)@([0-9a-z_\-\.]*)(\.[a-z]{2,5})$)/i)
        },
        isValidInteger: function(a) {
            return !!a.toString().match(/(^-?\d+$)/)
        },
        isValidNumeric: function(a) {
            return !!a.toString().match(/(^-?\d\d*[\.|,]\d*$)|(^-?\d\d*$)|(^-?[\.|,]\d\d*$)/)
        },
        isValidAplhaNumeric: function(a) {
            return !!a.toString().match(/^[_\-a-z0-9]+$/gi)
        },
        isValidDatetime: function(b) {
            var a = b.toString().match(/^(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})$/);
            return a && !!(a[1] <= 9999 && a[2] <= 12 && a[3] <= 31 && a[4] <= 59 && a[5] <= 59 && a[6] <= 59) || false
        },
        isValidDate: function(a) {
            var b = a.toString().match(/^(\d{4})-(\d{2})-(\d{2})$/);
            return b && !!(b[1] <= 9999 && b[2] <= 12 && b[3] <= 31) || false
        },
        isValidTime: function(b) {
            var a = b.toString().match(/^(\d{1,2}):(\d{1,2}):(\d{1,2})$/);
            return a && !!(a[1] <= 24 && a[2] <= 59 && a[3] <= 59) || false
        },
        isValidIPv4: function(a) {
            var b = a.toString().match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
            return b && !!(b[1] <= 255 && b[2] <= 255 && b[3] <= 255 && b[4] <= 255) || false
        },
        isValidCurrency: function(a) {
            return a.toString().match(/^\$?\s?\d+?([\.,\,]?\d+)?\s?\$?$/) && true || false
        },
        isValidSSN: function(a) {
            return a.toString().match(/^\d{3}\-?\d{2}\-?\d{4}$/) && true || false
        },
        isValidSIN: function(a) {
            return a.toString().match(/^\d{9}$/) && true || false
        }
    };
    dhtmlxValidation = new dhtmlxValidation()
}
if (typeof (window.dhtmlx) == "undefined") {
    window.dhtmlx = {
        extend: function(d, c) {
            for (var e in c) {
                if (!d[e]) {
                    d[e] = c[e]
                }
            }
            return d
        },
        extend_api: function(a, d, c) {
            var b = window[a];
            if (!b) {
                return
            }
            window[a] = function(g) {
                if (g && typeof g == "object" && !g.tagName) {
                    var f = b.apply(this, (d._init ? d._init(g) : arguments));
                    for (var e in dhtmlx) {
                        if (d[e]) {
                            this[d[e]](dhtmlx[e])
                        }
                    }
                    for (var e in g) {
                        if (d[e]) {
                            this[d[e]](g[e])
                        } else {
                            if (e.indexOf("on") === 0) {
                                this.attachEvent(e, g[e])
                            }
                        }
                    }
                } else {
                    var f = b.apply(this, arguments)
                }
                if (d._patch) {
                    d._patch(this)
                }
                return f || this
            }
            ;
            window[a].prototype = b.prototype;
            if (c) {
                dhtmlx.extend(window[a].prototype, c)
            }
        },
        url: function(a) {
            if (a.indexOf("?") != -1) {
                return "&"
            } else {
                return "?"
            }
        }
    }
}
function dhtmlDragAndDropObject() {
    if (window.dhtmlDragAndDrop) {
        return window.dhtmlDragAndDrop
    }
    this.lastLanding = 0;
    this.dragNode = 0;
    this.dragStartNode = 0;
    this.dragStartObject = 0;
    this.tempDOMU = null;
    this.tempDOMM = null;
    this.waitDrag = 0;
    window.dhtmlDragAndDrop = this;
    return this
}
dhtmlDragAndDropObject.prototype.removeDraggableItem = function(a) {
    a.onmousedown = null;
    a.dragStarter = null;
    a.dragLanding = null
}
;
dhtmlDragAndDropObject.prototype.addDraggableItem = function(a, b) {
    a.onmousedown = this.preCreateDragCopy;
    a.dragStarter = b;
    this.addDragLanding(a, b)
}
;
dhtmlDragAndDropObject.prototype.addDragLanding = function(a, b) {
    a.dragLanding = b
}
;
dhtmlDragAndDropObject.prototype.preCreateDragCopy = function(a) {
    if ((a || window.event) && (a || event).button == 2) {
        return
    }
    if (window.dhtmlDragAndDrop.waitDrag) {
        window.dhtmlDragAndDrop.waitDrag = 0;
        document.body.onmouseup = window.dhtmlDragAndDrop.tempDOMU;
        document.body.onmousemove = window.dhtmlDragAndDrop.tempDOMM;
        return false
    }
    if (window.dhtmlDragAndDrop.dragNode) {
        window.dhtmlDragAndDrop.stopDrag(a)
    }
    window.dhtmlDragAndDrop.waitDrag = 1;
    window.dhtmlDragAndDrop.tempDOMU = document.body.onmouseup;
    window.dhtmlDragAndDrop.tempDOMM = document.body.onmousemove;
    window.dhtmlDragAndDrop.dragStartNode = this;
    window.dhtmlDragAndDrop.dragStartObject = this.dragStarter;
    document.body.onmouseup = window.dhtmlDragAndDrop.preCreateDragCopy;
    document.body.onmousemove = window.dhtmlDragAndDrop.callDrag;
    window.dhtmlDragAndDrop.downtime = new Date().valueOf();
    if ((a) && (a.preventDefault)) {
        a.preventDefault();
        return false
    }
    return false
}
;
dhtmlDragAndDropObject.prototype.callDrag = function(c) {
    if (!c) {
        c = window.event
    }
    dragger = window.dhtmlDragAndDrop;
    if ((new Date()).valueOf() - dragger.downtime < 100) {
        return
    }
    if (!dragger.dragNode) {
        if (dragger.waitDrag) {
            dragger.dragNode = dragger.dragStartObject._createDragNode(dragger.dragStartNode, c);
            if (!dragger.dragNode) {
                return dragger.stopDrag()
            }
            dragger.dragNode.onselectstart = function() {
                return false
            }
            ;
            dragger.gldragNode = dragger.dragNode;
            document.body.appendChild(dragger.dragNode);
            document.body.onmouseup = dragger.stopDrag;
            dragger.waitDrag = 0;
            dragger.dragNode.pWindow = window;
            dragger.initFrameRoute()
        } else {
            return dragger.stopDrag(c, true)
        }
    }
    if (dragger.dragNode.parentNode != window.document.body && dragger.gldragNode) {
        var a = dragger.gldragNode;
        if (dragger.gldragNode.old) {
            a = dragger.gldragNode.old
        }
        a.parentNode.removeChild(a);
        var b = dragger.dragNode.pWindow;
        if (a.pWindow && a.pWindow.dhtmlDragAndDrop.lastLanding) {
            a.pWindow.dhtmlDragAndDrop.lastLanding.dragLanding._dragOut(a.pWindow.dhtmlDragAndDrop.lastLanding)
        }
        if (_isIE) {
            var f = document.createElement("Div");
            f.innerHTML = dragger.dragNode.outerHTML;
            dragger.dragNode = f.childNodes[0]
        } else {
            dragger.dragNode = dragger.dragNode.cloneNode(true)
        }
        dragger.dragNode.pWindow = window;
        dragger.gldragNode.old = dragger.dragNode;
        document.body.appendChild(dragger.dragNode);
        b.dhtmlDragAndDrop.dragNode = dragger.dragNode
    }
    dragger.dragNode.style.left = c.clientX + 15 + (dragger.fx ? dragger.fx * (-1) : 0) + (document.body.scrollLeft || document.documentElement.scrollLeft) + "px";
    dragger.dragNode.style.top = c.clientY + 3 + (dragger.fy ? dragger.fy * (-1) : 0) + (document.body.scrollTop || document.documentElement.scrollTop) + "px";
    if (!c.srcElement) {
        var d = c.target
    } else {
        d = c.srcElement
    }
    dragger.checkLanding(d, c)
}
;
dhtmlDragAndDropObject.prototype.calculateFramePosition = function(e) {
    if (window.name) {
        var c = parent.frames[window.name].frameElement.offsetParent;
        var d = 0;
        var b = 0;
        while (c) {
            d += c.offsetLeft;
            b += c.offsetTop;
            c = c.offsetParent
        }
        if ((parent.dhtmlDragAndDrop) ) {
            var a = parent.dhtmlDragAndDrop.calculateFramePosition(1);
            d += a.split("_")[0] * 1;
            b += a.split("_")[1] * 1
        }
        if (e) {
            return d + "_" + b
        } else {
            this.fx = d
        }
        this.fy = b
    }
    return "0_0"
}
;
dhtmlDragAndDropObject.prototype.checkLanding = function(b, a) {
    if ((b) && (b.dragLanding)) {
        if (this.lastLanding) {
            this.lastLanding.dragLanding._dragOut(this.lastLanding)
        }
        this.lastLanding = b;
        this.lastLanding = this.lastLanding.dragLanding._dragIn(this.lastLanding, this.dragStartNode, a.clientX, a.clientY, a);
        this.lastLanding_scr = (_isIE ? a.srcElement : a.target)
    } else {
        if ((b) && (b.tagName != "BODY")) {
            this.checkLanding(b.parentNode, a)
        } else {
            if (this.lastLanding) {
                this.lastLanding.dragLanding._dragOut(this.lastLanding, a.clientX, a.clientY, a)
            }
            this.lastLanding = 0;
            if (this._onNotFound) {
                this._onNotFound()
            }
        }
    }
}
;
dhtmlDragAndDropObject.prototype.stopDrag = function(b, c) {
    dragger = window.dhtmlDragAndDrop;
    if (!c) {
        dragger.stopFrameRoute();
        var a = dragger.lastLanding;
        dragger.lastLanding = null;
        if (a) {
            a.dragLanding._drag(dragger.dragStartNode, dragger.dragStartObject, a, (_isIE ? event.srcElement : b.target))
        }
    }
    dragger.lastLanding = null;
    if ((dragger.dragNode) && (dragger.dragNode.parentNode == document.body)) {
        dragger.dragNode.parentNode.removeChild(dragger.dragNode)
    }
    dragger.dragNode = 0;
    dragger.gldragNode = 0;
    dragger.fx = 0;
    dragger.fy = 0;
    dragger.dragStartNode = 0;
    dragger.dragStartObject = 0;
    document.body.onmouseup = dragger.tempDOMU;
    document.body.onmousemove = dragger.tempDOMM;
    dragger.tempDOMU = null;
    dragger.tempDOMM = null;
    dragger.waitDrag = 0
}
;
dhtmlDragAndDropObject.prototype.stopFrameRoute = function(c) {
    if (c) {
        window.dhtmlDragAndDrop.stopDrag(1, 1)
    }
    for (var a = 0; a < window.frames.length; a++) {
        try {
            if ((window.frames[a] != c) && (window.frames[a].dhtmlDragAndDrop)) {
                window.frames[a].dhtmlDragAndDrop.stopFrameRoute(window)
            }
        } catch (b) {}
    }
    try {
        if ((parent.dhtmlDragAndDrop) && (parent != window) && (parent != c)) {
            parent.dhtmlDragAndDrop.stopFrameRoute(window)
        }
    } catch (b) {}
}
;
dhtmlDragAndDropObject.prototype.initFrameRoute = function(c, d) {
    if (c) {
        window.dhtmlDragAndDrop.preCreateDragCopy();
        window.dhtmlDragAndDrop.dragStartNode = c.dhtmlDragAndDrop.dragStartNode;
        window.dhtmlDragAndDrop.dragStartObject = c.dhtmlDragAndDrop.dragStartObject;
        window.dhtmlDragAndDrop.dragNode = c.dhtmlDragAndDrop.dragNode;
        window.dhtmlDragAndDrop.gldragNode = c.dhtmlDragAndDrop.dragNode;
        window.document.body.onmouseup = window.dhtmlDragAndDrop.stopDrag;
        window.waitDrag = 0;
        if (((!_isIE) && (d)) && ((!_isFF) || (_FFrv < 1.8))) {
            window.dhtmlDragAndDrop.calculateFramePosition()
        }
    }
    try {
        if ((parent.dhtmlDragAndDrop) && (parent != window) && (parent != c)) {
            parent.dhtmlDragAndDrop.initFrameRoute(window)
        }
    } catch (b) {}
    for (var a = 0; a < window.frames.length; a++) {
        try {
            if ((window.frames[a] != c) && (window.frames[a].dhtmlDragAndDrop)) {
                window.frames[a].dhtmlDragAndDrop.initFrameRoute(window, ((!c || d) ? 1 : 0))
            }
        } catch (b) {}
    }
}
;
_isFF = false;
_isIE = false;
_isOpera = false;
_isKHTML = false;
_isMacOS = false;
_isChrome = false;
_FFrv = false;
_KHTMLrv = false;
_OperaRv = false;
if (navigator.userAgent.indexOf("Macintosh") != -1) {
    _isMacOS = true
}
if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
    _isChrome = true
}
if ((navigator.userAgent.indexOf("Safari") != -1) || (navigator.userAgent.indexOf("Konqueror") != -1)) {
    _KHTMLrv = parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf("Safari") + 7, 5));
    if (_KHTMLrv > 525) {
        _isFF = true;
        _FFrv = 1.9
    } else {
        _isKHTML = true
    }
} else {
    if (navigator.userAgent.indexOf("Opera") != -1) {
        _isOpera = true;
        _OperaRv = parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf("Opera") + 6, 3))
    } else {
        if (navigator.appName.indexOf("Microsoft") != -1) {
            _isIE = true;
            if ((navigator.appVersion.indexOf("MSIE 8.0") != -1 || navigator.appVersion.indexOf("MSIE 9.0") != -1 || navigator.appVersion.indexOf("MSIE 10.0") != -1 || document.documentMode > 7) && document.compatMode != "BackCompat") {
                _isIE = 8
            }
        } else {
            if (navigator.appName == "Netscape" && navigator.userAgent.indexOf("Trident") != -1) {
                _isIE = 8
            } else {
                _isFF = true;
                _FFrv = parseFloat(navigator.userAgent.split("rv:")[1])
            }
        }
    }
}
if (typeof (window.dhtmlxEvent) == "undefined") {
    function dhtmlxEvent(b, c, a) {
        if (b.addEventListener) {
            b.addEventListener(c, a, false)
        } else {
            if (b.attachEvent) {
                b.attachEvent("on" + c, a)
            }
        }
    }
}
if (dhtmlxEvent.touchDelay == null) {
    dhtmlxEvent.touchDelay = 2000
}
if (typeof (dhtmlxEvent.initTouch) == "undefined") {
    dhtmlxEvent.initTouch = function() {
        var d;
        var e;
        var b, a;
        dhtmlxEvent(document.body, "touchstart", function(f) {
            e = f.touches[0].target;
            b = f.touches[0].clientX;
            a = f.touches[0].clientY;
            d = window.setTimeout(c, dhtmlxEvent.touchDelay)
        });
        function c() {
            if (e) {
                var f = document.createEvent("HTMLEvents");
                f.initEvent("dblclick", true, true);
                e.dispatchEvent(f);
                d = e = null
            }
        }
        dhtmlxEvent(document.body, "touchmove", function(f) {
            if (d) {
                if (Math.abs(f.touches[0].clientX - b) > 50 || Math.abs(f.touches[0].clientY - a) > 50) {
                    window.clearTimeout(d);
                    d = e = false
                }
            }
        });
        dhtmlxEvent(document.body, "touchend", function(f) {
            if (d) {
                window.clearTimeout(d);
                d = e = false
            }
        });
        dhtmlxEvent.initTouch = function() {}
    }
}
function dhtmlXCellObject(c, a) {
    this.cell = document.createElement("DIV");
    this.cell.className = "dhx_cell" + (a || "");
    this._idd = c;
    this._isCell = true;
    this.conf = {
        borders: true,
        idx: {},
        css: a || "",
        idx_data: {
            cont: "dhx_cell_cont",
            pr1: "dhx_cell_progress_bar",
            pr2: "dhx_cell_progress_img",
            pr3: "dhx_cell_progress_svg",
            menu: "dhx_cell_menu",
            toolbar: "dhx_cell_toolbar",
            ribbon: "dhx_cell_ribbon",
            sb: "dhx_cell_statusbar",
            cover: "dhx_cell_cover"
        },
        ofs_nodes: {
            t: {},
            b: {}
        }
    };
    this.dataNodes = {};
    this.views = {};
    var b = document.createElement("DIV");
    b.className = "dhx_cell_cont" + this.conf.css;
    this.cell.appendChild(b);
    b = null;
    this._updateIdx = function() {
        for (var d in this.conf.idx) {
            this.conf.idx[d] = null;
            delete this.conf.idx[d]
        }
        for (var g = 0; g < this.cell.childNodes.length; g++) {
            var e = this.cell.childNodes[g].className;
            for (var d in this.conf.idx_data) {
                var f = new RegExp(this.conf.idx_data[d]);
                if (e.match(f) != null) {
                    this.conf.idx[d] = g
                }
            }
        }
        this.callEvent("_onIdxUpdated", [])
    }
    ;
    this._adjustAttached = function() {
        for (var d in this.dataNodes) {
            if (this.dataNodes[d] != null && typeof (this.dataNodes[d].setSizes) == "function") {
                this.dataNodes[d].setSizes()
            }
        }
        if (this.dataObj != null && typeof (this.dataObj.setSizes) == "function") {
            if (this.dataType == "layout" && typeof (window.dhtmlXLayoutCell) == "function" && this instanceof window.dhtmlXLayoutCell && this.dataObj._getMainInst() != this.layout._getMainInst()) {
                this.dataObj.setSizes();
                return
            }
            this.dataObj.setSizes.apply(this.dataObj, arguments)
        }
    }
    ;
    this._setSize = function(m, k, n, g, i, j, e, f) {
        if (this.conf.size == null) {
            this.conf.size = {}
        }
        if (f == null) {
            f = {}
        }
        var o = {
            left: "x",
            top: "y",
            width: "w",
            height: "h"
        };
        this.conf.size.x = m;
        this.conf.size.y = k;
        this.conf.size.w = Math.max(n, 0);
        this.conf.size.h = Math.max(g, 0);
        for (var l in o) {
            var d = (f[l] || l);
            this.cell.style[d] = this.conf.size[o[l]] + "px"
        }
        this.callEvent("_onSetSize", []);
        if (j !== true) {
            this._adjustCont(i, e)
        } else {
            this._adjustAttached(i)
        }
        this._adjustProgress()
    }
    ;
    this._adjustCont = function(i, g) {
        var h = this.cell.childNodes[this.conf.idx.cont];
        if (typeof (window.dhtmlXLayoutCell) == "function" && this instanceof window.dhtmlXLayoutCell && this.conf.collapsed == true) {
            h.style.left = h.style.top = "0px";
            h.style.width = h.style.height = "200px";
            h = null;
            return
        }
        var f = 0;
        for (var d in this.conf.ofs_nodes.t) {
            var e = this.conf.ofs_nodes.t[d];
            f += (e == "func" ? this[d]() : (e == true ? this.cell.childNodes[this.conf.idx[d]].offsetHeight : 0))
        }
        var j = 0;
        for (var d in this.conf.ofs_nodes.b) {
            var e = this.conf.ofs_nodes.b[d];
            j += (e == "func" ? this[d]() : (e == true ? this.cell.childNodes[this.conf.idx[d]].offsetHeight : 0))
        }
        h.style.left = "0px";
        h.style.top = f + "px";
        if (this.conf.cells_cont == null) {
            this.conf.cells_cont = {};
            h.style.width = this.cell.offsetWidth + "px";
            h.style.height = Math.max(this.cell.offsetHeight - f - j, 0) + "px";
            this.conf.cells_cont.w = parseInt(h.style.width) - h.offsetWidth;
            this.conf.cells_cont.h = parseInt(h.style.height) - h.offsetHeight
        }
        h.style.left = "0px";
        h.style.top = f + "px";
        h.style.width = Math.max(this.cell.offsetWidth + this.conf.cells_cont.w, 0) + "px";
        h.style.height = Math.max(this.conf.size.h - f - j + this.conf.cells_cont.h, 0) + "px";
        h = null;
        this._adjustAttached(i);
        if (g == "expand" && this.dataType == "editor" && this.dataObj != null) {
            this.dataObj._prepareContent(true)
        }
    }
    ;
    this._mtbUpdBorder = function() {
        var e = ["menu", "toolbar", "ribbon"];
        for (var g = 0; g < e.length; g++) {
            if (this.conf.idx[e[g]] != null) {
                var h = this.cell.childNodes[this.conf.idx[e[g]]];
                var f = "dhx_cell_" + e[g] + "_no_borders";
                var d = "dhx_cell_" + e[g] + "_def";
                h.className = h.className.replace(new RegExp(this.conf.borders ? f : d), this.conf.borders ? d : f);
                h = null
            }
        }
    }
    ;
    this._resetSizeState = function() {
        this.conf.cells_cont = null
    }
    ;
    this.conf.view = "def";
    this.conf.views_loaded = {};
    this.conf.views_loaded[this.conf.view] = true;
    this._viewSave = function(f) {
        this.views[f] = {
            borders: this.conf.borders,
            ofs_nodes: {
                t: {},
                b: {}
            },
            url_data: this.conf.url_data,
            dataType: this.dataType,
            dataObj: this.dataObj,
            cellCont: [],
            dataNodes: {},
            dataNodesCont: {}
        };
        var g = this.cell.childNodes[this.conf.idx.cont];
        while (g.childNodes.length > 0) {
            this.views[f].cellCont.push(g.firstChild);
            g.removeChild(g.firstChild)
        }
        g = null;
        this.dataType = null;
        this.dataObj = null;
        this.conf.url_data = null;
        for (var e in this.dataNodes) {
            for (var d in this.conf.ofs_nodes) {
                if (typeof (this.conf.ofs_nodes[d][e]) != "undefined") {
                    this.views[f].ofs_nodes[d][e] = this.conf.ofs_nodes[d][e];
                    this.conf.ofs_nodes[d][e] = null;
                    delete this.conf.ofs_nodes[d][e]
                }
            }
            this.views[f].dataNodesCont[e] = this.cell.childNodes[this.conf.idx[e]];
            this.cell.removeChild(this.cell.childNodes[this.conf.idx[e]]);
            this.views[f].dataNodes[e] = this.dataNodes[e];
            this.dataNodes[e] = null;
            delete this.dataNodes[e];
            this._updateIdx()
        }
        this.callEvent("_onViewSave", [f])
    }
    ;
    this._viewRestore = function(f) {
        if (this.views[f] == null) {
            return
        }
        this.dataObj = this.views[f].dataObj;
        this.dataType = this.views[f].dataType;
        this.conf.url_data = this.views[f].url_data;
        for (var g = 0; g < this.views[f].cellCont.length; g++) {
            this.cell.childNodes[this.conf.idx.cont].appendChild(this.views[f].cellCont[g])
        }
        for (var e in this.views[f].dataNodes) {
            this.dataNodes[e] = this.views[f].dataNodes[e];
            if (e == "menu") {
                this.cell.insertBefore(this.views[f].dataNodesCont[e], this.cell.childNodes[this.conf.idx.toolbar || this.conf.idx.cont])
            }
            if (e == "toolbar") {
                this.cell.insertBefore(this.views[f].dataNodesCont[e], this.cell.childNodes[this.conf.idx.cont])
            }
            if (e == "ribbon") {
                this.cell.insertBefore(this.views[f].dataNodesCont[e], this.cell.childNodes[this.conf.idx.cont])
            }
            if (e == "sb") {
                this.cell.appendChild(this.views[f].dataNodesCont[e])
            }
            this._updateIdx()
        }
        for (var e in this.views[f].ofs_nodes) {
            for (var d in this.views[f].ofs_nodes[e]) {
                this.conf.ofs_nodes[e][d] = this.views[f].ofs_nodes[e][d]
            }
        }
        if (this.conf.borders != this.views[f].borders) {
            this[this.views[f].borders ? "_showBorders" : "_hideBorders"](true)
        }
        if (this.dataType == "url" && this.conf.url_data != null && this.conf.url_data.ajax == false && this.conf.url_data.post_data != null) {
            this.reloadURL()
        }
        this.callEvent("_onViewRestore", [f]);
        this._viewDelete(f)
    }
    ;
    this._viewDelete = function(f) {
        if (this.views[f] == null) {
            return
        }
        this.views[f].borders = null;
        for (var e in this.views[f].ofs_nodes) {
            for (var d in this.views[f].ofs_nodes[e]) {
                this.views[f].ofs_nodes[e][d] = null
            }
            this.views[f].ofs_nodes[e] = null
        }
        this.views[f].dataType = null;
        this.views[f].dataObj = null;
        this.views[f].url_data = null;
        for (var g = 0; g < this.views[f].cellCont.length; g++) {
            this.views[f].cellCont[g] = null
        }
        this.views[f].cellCont = null;
        for (var e in this.views[f].dataNodes) {
            this.views[f].dataNodes[e] = null;
            this.views[f].dataNodesCont[e] = null
        }
        this.views[f].dataNodes = this.views[f].dataNodesCont = null;
        this.views[f] = null;
        delete this.views[f]
    }
    ;
    window.dhx4._eventable(this);
    this._updateIdx();
    return this
}
dhtmlXCellObject.prototype.showView = function(a) {
    if (this.conf.view == a) {
        return false
    }
    this._viewSave(this.conf.view);
    this._viewRestore(a);
    this._updateIdx();
    this._adjustCont();
    this.conf.view = a;
    var b = (typeof (this.conf.views_loaded[this.conf.view]) == "undefined");
    this.conf.views_loaded[this.conf.view] = true;
    return b
}
;
dhtmlXCellObject.prototype.getViewName = function() {
    return this.conf.view
}
;
dhtmlXCellObject.prototype.unloadView = function(d) {
    if (d == this.conf.view) {
        var e = this.conf.unloading;
        this.conf.unloading = true;
        if (typeof (this.detachMenu) == "function") {
            this.detachMenu()
        }
        if (typeof (this.detachToolbar) == "function") {
            this.detachToolbar()
        }
        if (typeof (this.detachRibbon) == "function") {
            this.detachRibbon()
        }
        this.detachStatusBar();
        this._detachObject(null, true);
        this.conf.unloading = e;
        if (!this.conf.unloading) {
            this._adjustCont(this._idd)
        }
        return
    }
    if (this.views[d] == null) {
        return
    }
    var c = this.views[d];
    for (var b in c.dataNodes) {
        if (typeof (c.dataNodes[b].unload) == "function") {
            c.dataNodes[b].unload()
        }
        c.dataNodes[b] = null;
        c.dataNodesCont[b] = null
    }
    if (c.dataType == "url") {
        if (c.cellCont != null && c.cellCont[0] != "null") {
            this._detachURLEvents(c.cellCont[0])
        }
    } else {
        if (c.dataObj != null) {
            if (typeof (c.dataObj.unload) == "function") {
                c.dataObj.unload()
            } else {
                if (typeof (c.dataObj.destructor) == "function") {
                    c.dataObj.destructor()
                }
            }
            c.dataObj = null
        }
    }
    c = null;
    this._viewDelete(d);
    if (typeof (this.conf.views_loaded[d]) != "undefined") {
        delete this.conf.views_loaded[d]
    }
}
;
dhtmlXCellObject.prototype.getId = function() {
    return this._idd
}
;
dhtmlXCellObject.prototype.progressOn = function() {
    if (this.conf.progress == true) {
        return
    }
    this.conf.progress = true;
    var b = document.createElement("DIV");
    b.className = this.conf.idx_data.pr1;
    var a = document.createElement("DIV");
    if (this.conf.skin == "material" && (window.dhx4.isFF || window.dhx4.isChrome || window.dhx4.isOpera || window.dhx4.isEdge)) {
        a.className = this.conf.idx_data.pr3;
        a.innerHTML = '<svg class="dhx_cell_prsvg" viewBox="25 25 50 50"><circle class="dhx_cell_prcircle" cx="50" cy="50" r="20"/></svg>'
    } else {
        a.className = this.conf.idx_data.pr2
    }
    if (this.conf.idx.cover != null) {
        this.cell.insertBefore(a, this.cell.childNodes[this.conf.idx.cover])
    } else {
        this.cell.appendChild(a)
    }
    this.cell.insertBefore(b, a);
    b = a = null;
    this._updateIdx();
    this._adjustProgress()
}
;
dhtmlXCellObject.prototype.progressOff = function() {
    if (this.conf.progress != true) {
        return
    }
    for (var b in {
        pr3: 3,
        pr2: 2,
        pr1: 1
    }) {
        var c = this.cell.childNodes[this.conf.idx[b]];
        if (c != null) {
            c.parentNode.removeChild(c)
        }
        c = null
    }
    this.conf.progress = false;
    this._updateIdx()
}
;
dhtmlXCellObject.prototype._adjustProgress = function() {
    if (this.conf.idx.pr1 == null) {
        return
    }
    if (!this.conf.pr) {
        this.conf.pr = {}
    }
    var b = this.cell.childNodes[this.conf.idx.pr1];
    var a = this.cell.childNodes[this.conf.idx.pr2] || this.cell.childNodes[this.conf.idx.pr3];
    if (!this.conf.pr.ofs) {
        a.style.width = b.offsetWidth + "px";
        a.style.height = b.offsetHeight + "px";
        this.conf.pr.ofs = {
            w: a.offsetWidth - a.clientWidth,
            h: a.offsetHeight - a.clientHeight
        }
    }
    a.style.width = b.offsetWidth - this.conf.pr.ofs.w + "px";
    a.style.height = b.offsetHeight - this.conf.pr.ofs.h + "px";
    b = a = null
}
;
dhtmlXCellObject.prototype._showCellCover = function() {
    if (this.conf.cover == true) {
        return
    }
    this.conf.cover = true;
    var a = document.createElement("DIV");
    a.className = this.conf.idx_data.cover;
    this.cell.appendChild(a);
    a = null;
    this._updateIdx()
}
;
dhtmlXCellObject.prototype._hideCellCover = function() {
    if (this.conf.cover != true) {
        return
    }
    this.cell.removeChild(this.cell.childNodes[this.conf.idx.cover]);
    this._updateIdx();
    this.conf.cover = false
}
;
dhtmlXCellObject.prototype._showBorders = function(a) {
    if (this.conf.borders) {
        return
    }
    this.conf.borders = true;
    this.cell.childNodes[this.conf.idx.cont].className = "dhx_cell_cont" + this.conf.css;
    this.conf.cells_cont = null;
    this._mtbUpdBorder();
    this.callEvent("_onBorderChange", [true]);
    if (a !== true) {
        this._adjustCont(this._idd)
    }
}
;
dhtmlXCellObject.prototype._hideBorders = function(a) {
    if (!this.conf.borders) {
        return
    }
    this.conf.borders = false;
    this.cell.childNodes[this.conf.idx.cont].className = "dhx_cell_cont" + this.conf.css + " dhx_cell_cont_no_borders";
    this.conf.cells_cont = null;
    this._mtbUpdBorder();
    this.callEvent("_onBorderChange", [false]);
    if (a !== true) {
        this._adjustCont(this._idd)
    }
}
;
dhtmlXCellObject.prototype._getWidth = function() {
    return this.cell.offsetWidth
}
;
dhtmlXCellObject.prototype._getHeight = function() {
    return this.cell.offsetHeight
}
;
dhtmlXCellObject.prototype.showInnerScroll = function() {
    this.cell.childNodes[this.conf.idx.cont].style.overflow = "auto"
}
;
dhtmlXCellObject.prototype._unload = function() {
    this.conf.unloading = true;
    this.callEvent("_onCellUnload", []);
    this.progressOff();
    this.unloadView(this.conf.view);
    this.dataNodes = null;
    this.cell.parentNode.removeChild(this.cell);
    this.cell = null;
    window.dhx4._eventable(this, "clear");
    for (var b in this.views) {
        this.unloadView(b)
    }
    this.conf = null;
    for (var b in this) {
        this[b] = null
    }
}
;
dhtmlXCellObject.prototype.attachObject = function(d, c) {
    if (window.dhx4.s2b(c) && !(typeof (window.dhtmlXWindowsCell) == "function" && this instanceof window.dhtmlXWindowsCell)) {
        c = false
    }
    if (typeof (d) == "string") {
        d = document.getElementById(d)
    }
    if (d.parentNode == this.cell.childNodes[this.conf.idx.cont]) {
        d = null;
        return
    }
    if (c) {
        d.style.display = "";
        var a = d.offsetWidth;
        var b = d.offsetHeight
    }
    this._attachObject(d);
    this.dataType = "obj";
    d.style.display = "";
    d = null;
    if (c) {
        this._adjustByCont(a, b)
    }
}
;
dhtmlXCellObject.prototype.appendObject = function(a) {
    if (typeof (a) == "string") {
        a = document.getElementById(a)
    }
    if (a.parentNode == this.cell.childNodes[this.conf.idx.cont]) {
        a = null;
        return
    }
    if (!this.conf.append_mode) {
        this.cell.childNodes[this.conf.idx.cont].style.overflow = "auto";
        this.conf.append_mode = true
    }
    this._attachObject(a, null, null, true);
    this.dataType = "obj";
    a.style.display = "";
    a = null
}
;
dhtmlXCellObject.prototype.detachObject = function(b, a) {
    this._detachObject(null, b, a)
}
;
dhtmlXCellObject.prototype.getAttachedStatusBar = function() {
    return this.dataNodes.sb
}
;
dhtmlXCellObject.prototype.getAttachedObject = function() {
    if (this.dataType == "obj" || this.dataType == "url" || this.dataType == "url-ajax") {
        return this.cell.childNodes[this.conf.idx.cont].firstChild
    } else {
        return this.dataObj
    }
}
;
dhtmlXCellObject.prototype.attachURL = function(b, l, c) {
    if (c == true) {
        c = {}
    }
    var d = (typeof (c) != "undefined" && c != false && c != null);
    if (this.conf.url_data == null) {
        this.conf.url_data = {}
    }
    this.conf.url_data.url = b;
    this.conf.url_data.ajax = (l == true);
    this.conf.url_data.post_data = (c == true ? {} : (c || null));
    if (this.conf.url_data.xml_doc != null) {
        try {
            this.conf.url_data.xml_doc.xmlDoc.abort()
        } catch (h) {}
        this.conf.url_data.xml_doc.xmlDoc = null;
        this.conf.url_data.xml_doc = null
    }
    if (l == true) {
        var k = this;
        if (d) {
            var f = "";
            for (var j in c) {
                f += "&" + encodeURIComponent(j) + "=" + encodeURIComponent(c[j])
            }
            this.conf.url_data.xml_doc = dhx4.ajax.post(b, f, function(a) {
                if (k.attachHTMLString != null && typeof (a.xmlDoc.responseText) == "string") {
                    k.attachHTMLString("<div style='position:relative;width:100%;height:100%;overflow:auto;'>" + a.xmlDoc.responseText + "</div>");
                    if (typeof (k._doOnFrameContentLoaded) == "function") {
                        k._doOnFrameContentLoaded()
                    }
                    k.dataType = "url-ajax"
                }
                k = a = null
            })
        } else {
            this.conf.url_data.xml_doc = dhx4.ajax.get(b, function(a) {
                if (k.attachHTMLString != null && typeof (a.xmlDoc.responseText) == "string") {
                    k.attachHTMLString("<div style='position:relative;width:100%;height:100%;overflow:auto;'>" + a.xmlDoc.responseText + "</div>");
                    if (typeof (k._doOnFrameContentLoaded) == "function") {
                        k._doOnFrameContentLoaded()
                    }
                    k.dataType = "url-ajax"
                }
                k = a = null
            })
        }
    } else {
        if (this.dataType == "url") {
            var g = this.getFrame()
        } else {
            var g = document.createElement("IFRAME");
            g.frameBorder = 0;
            g.border = 0;
            g.style.width = "100%";
            g.style.height = "100%";
            g.style.position = "relative";
            this._attachObject(g);
            this.dataType = "url";
            this._attachURLEvents()
        }
        if (d) {
            var i = (typeof (this.conf.url_data.post_ifr) == "undefined");
            this.conf.url_data.post_ifr = true;
            if (i) {
                this._attachURLEvents()
            }
            g.src = "about:blank"
        } else {
            g.src = b + window.dhx4.ajax._dhxr(b)
        }
        g = null
    }
    g = null
}
;
dhtmlXCellObject.prototype.reloadURL = function() {
    if (!(this.dataType == "url" || this.dataType == "url-ajax")) {
        return
    }
    if (this.conf.url_data == null) {
        return
    }
    this.attachURL(this.conf.url_data.url, this.conf.url_data.ajax, this.conf.url_data.post_data)
}
;
dhtmlXCellObject.prototype.attachHTMLString = function(str) {
    this._attachObject(null, null, str);
    var z = str.match(/<script[^>]*>[^\f]*?<\/script>/g) || [];
    for (var i = 0; i < z.length; i++) {
        var s = z[i].replace(/<([\/]{0,1})script[^>]*>/gi, "");
        if (s) {
            if (window.execScript) {
                window.execScript(s)
            } else {
                window.eval(s)
            }
        }
    }
}
;
dhtmlXCellObject.prototype.attachScheduler = function(a, g, b, d) {
    d = d || window.scheduler;
    var e = false;
    if (b) {
        var f = document.getElementById(b);
        if (f) {
            e = true
        }
    }
    if (!e) {
        var c = b || '<div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div><div class="dhx_cal_tab" name="week_tab" style="right:140px;"></div><div class="dhx_cal_tab" name="month_tab" style="right:76px;"></div>';
        var f = document.createElement("DIV");
        f.id = "dhxSchedObj_" + new Date().getTime();
        f.style.width = "100%";
        f.style.height = "100%";
        f.style.position = "relative";
        f.style.overflow = "hidden";
        f.className = "dhx_cal_container";
        f.innerHTML = '<div class="dhx_cal_navline"><div class="dhx_cal_prev_button">&nbsp;</div><div class="dhx_cal_next_button">&nbsp;</div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div>' + c + '</div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>'
    }
    this._attachObject(f);
    this.dataType = "scheduler";
    this.dataObj = d;
    this.dataObj.setSizes = function() {
        this.update_view()
    }
    ;
    d.init(f.id, a, g);
    f = null;
    this.callEvent("_onContentAttach", []);
    return this.dataObj
}
;
dhtmlXCellObject.prototype.attachMap = function(a) {
    var b = document.createElement("DIV");
    b.style.width = "100%";
    b.style.height = "100%";
    b.style.position = "relative";
    b.style.overflow = "hidden";
    this._attachObject(b);
    if (!a) {
        a = {
            center: new google.maps.LatLng(40.719837,-73.992348),
            zoom: 11,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
    }
    this.dataType = "maps";
    this.dataObj = new google.maps.Map(b,a);
    this.dataObj.setSizes = function() {
        google.maps.event.trigger(this, "resize")
    }
    ;
    b = null;
    this.callEvent("_onContentAttach", []);
    return this.dataObj
}
;
dhtmlXCellObject.prototype._createNode_sb = function(g, d, f, a, e) {
    if (typeof (e) != "undefined") {
        g = e
    } else {
        var b = d || {};
        var i = (typeof (b.text) == "string" && b.text.length > 0 ? b.text : "&nbsp;");
        var c = (typeof (b.height) == "number" ? b.height : false);
        var g = document.createElement("DIV");
        g.className = "dhx_cell_statusbar_def";
        g.innerHTML = "<div class='" + (b.paging == true ? "dhx_cell_statusbar_paging" : "dhx_cell_statusbar_text") + "'>" + i + "</div>";
        if (c != false) {
            g.firstChild.style.height = g.firstChild.style.lineHeight = c + "px"
        }
    }
    if (this.conf.idx.pr1 != null) {
        this.cell.insertBefore(g, this.cell.childNodes[this.conf.idx.pr1])
    } else {
        this.cell.appendChild(g)
    }
    this.conf.ofs_nodes.b.sb = true;
    this._updateIdx();
    this._adjustCont(this._idd);
    return g
}
;
dhtmlXCellObject.prototype.attachStatusBar = function(a) {
    if (this.dataNodes.sb) {
        return
    }
    if (a != null && window.dhx4.s2b(a.paging) == true) {
        a.height = null
    }
    if (this.conf.skin == "dhx_skyblue" && typeof (window.dhtmlXWindowsCell) == "function" && this instanceof window.dhtmlXWindowsCell) {
        this.cell.childNodes[this.conf.idx.cont].className += " dhx_cell_statusbar_attached"
    }
    this.dataNodes.sb = this._attachObject("sb", a);
    this.dataNodes.sb.setText = function(b) {
        this.childNodes[0].innerHTML = b
    }
    ;
    this.dataNodes.sb.getText = function() {
        return this.childNodes[0].innerHTML
    }
    ;
    this.dataNodes.sb.onselectstart = function(b) {
        return false
    }
    ;
    return this.dataNodes.sb
}
;
dhtmlXCellObject.prototype.detachStatusBar = function() {
    if (!this.dataNodes.sb) {
        return
    }
    if (this.conf.skin == "dhx_skyblue" && typeof (window.dhtmlXWindowsCell) == "function" && this instanceof window.dhtmlXWindowsCell) {
        this.cell.childNodes[this.conf.idx.cont].className = this.cell.childNodes[this.conf.idx.cont].className.replace(/\s{0,}dhx_cell_statusbar_attached/, "")
    }
    this.dataNodes.sb.setText = this.dataNodes.sb.getText = this.dataNodes.sb.onselectstart = null;
    this.dataNodes.sb = null;
    delete this.dataNodes.sb;
    this._detachObject("sb")
}
;
dhtmlXCellObject.prototype.showStatusBar = function() {
    this._mtbShowHide("sb", "")
}
;
dhtmlXCellObject.prototype.hideStatusBar = function() {
    this._mtbShowHide("sb", "none")
}
;
dhtmlXCellObject.prototype._mtbShowHide = function(b, a) {
    if (!this.dataNodes[b]) {
        return
    }
    this.cell.childNodes[this.conf.idx[b]].style.display = a;
    this._adjustCont()
}
;
dhtmlXCellObject.prototype.getFrame = dhtmlXCellObject.prototype._getFrame = function() {
    if (this.dataType != "url") {
        return null
    }
    return this.cell.childNodes[this.conf.idx.cont].firstChild
}
;
dhtmlXCellObject.prototype._attachURLEvents = function() {
    if (this.dataType != "url") {
        return
    }
    var c = this;
    var b = this._idd;
    var a = this.cell.childNodes[this.conf.idx.cont].firstChild;
    if (typeof (this._doOnFrameMouseDown) != "function") {
        this._doOnFrameMouseDown = function(d) {
            c.callEvent("_onContentMouseDown", [b, d || event])
        }
    }
    if (typeof (window.addEventListener) == "function") {
        a.onload = function() {
            try {
                if (typeof (c._doOnFrameMouseDown) == "function") {
                    this.contentWindow.document.body.addEventListener("mousedown", c._doOnFrameMouseDown, false)
                }
            } catch (d) {}
            try {
                if (typeof (c._doOnFrameContentLoaded) == "function") {
                    c._doOnFrameContentLoaded()
                }
            } catch (d) {}
        }
    } else {
        a.onreadystatechange = function(d) {
            if (this.readyState == "complete") {
                try {
                    if (typeof (c._doOnFrameMouseDown) == "function") {
                        this.contentWindow.document.body.attachEvent("onmousedown", c._doOnFrameMouseDown)
                    }
                } catch (f) {}
                try {
                    if (typeof (c._doOnFrameContentLoaded) == "function") {
                        c._doOnFrameContentLoaded()
                    }
                } catch (f) {}
            }
        }
    }
}
;
dhtmlXCellObject.prototype._doOnFrameContentLoaded = function() {
    if (this.conf.url_data.post_ifr == true) {
        var h = this.getFrame().contentWindow.document;
        var g = h.createElement("FORM");
        g.method = "POST";
        g.action = this.conf.url_data.url;
        h.body.appendChild(g);
        var c = {};
        if (window.dhx4.ajax.cache != true) {
            c["dhxr" + new Date().getTime()] = "1"
        }
        for (var b in this.conf.url_data.post_data) {
            c[b] = this.conf.url_data.post_data[b]
        }
        for (var b in c) {
            var e = h.createElement("INPUT");
            e.type = "hidden";
            e.name = b;
            e.value = c[b];
            g.appendChild(e);
            e = null
        }
        this.conf.url_data.post_ifr = false;
        g.submit()
    } else {
        this.callEvent("_onContentLoaded", [this._idd])
    }
}
;
dhtmlXCellObject.prototype._detachURLEvents = function(a) {
    if (a == null) {
        if (this.dataType != "url") {
            return
        }
        a = this.cell.childNodes[this.conf.idx.cont].firstChild
    }
    if (typeof (window.addEventListener) == "function") {
        a.onload = null;
        try {
            a.contentWindow.document.body.removeEventListener("mousedown", this._doOnFrameMouseDown, false)
        } catch (b) {}
    } else {
        a.onreadystatechange = null;
        try {
            a.contentWindow.document.body.detachEvent("onmousedown", this._doOnFrameMouseDown)
        } catch (b) {}
    }
    a = null
}
;
dhtmlXCellObject.prototype._attachObject = function(e, b, d, a, c) {
    if (typeof (e) == "string" && {
        menu: 1,
        toolbar: 1,
        ribbon: 1,
        sb: 1
    }[e] == 1) {
        return this["_createNode_" + e].apply(this, arguments)
    }
    if (a != true) {
        this._detachObject(null, true, null)
    }
    if (typeof (d) == "string") {
        this.cell.childNodes[this.conf.idx.cont].innerHTML = d
    } else {
        this.cell.childNodes[this.conf.idx.cont].appendChild(e)
    }
    e = null
}
;
dhtmlXCellObject.prototype._detachObject = function(g, b, a) {
    this.callEvent("_onBeforeContentDetach", []);
    if (g == "menu" || g == "toolbar" || g == "ribbon" || g == "sb") {
        var f = this.cell.childNodes[this.conf.idx[g]];
        f.parentNode.removeChild(f);
        f = null;
        this.conf.ofs_nodes[g == "sb" ? "b" : "t"][g] = false;
        this._updateIdx();
        if (!this.conf.unloading) {
            this._adjustCont(this._idd)
        }
        return
    }
    if (b == true) {
        a = false
    } else {
        if (typeof (a) == "undefined") {
            a = document.body
        } else {
            if (typeof (a) == "string") {
                a = document.getElementById(a)
            }
        }
    }
    if (a === false) {
        if (this.conf.unloading == true && String(this.dataType).match(/ajax/) != null) {
            if (this.conf.url_data != null && this.conf.url_data.xml_doc != null) {
                try {
                    this.conf.url_data.xml_doc.xmlDoc.abort()
                } catch (d) {}
                this.conf.url_data.xml_doc.xmlDoc = null;
                this.conf.url_data.xml_doc = null
            }
        }
        if (this.dataType == "url") {
            this._detachURLEvents()
        } else {
            if (this.dataObj != null) {
                if (typeof (this.dataObj.unload) == "function") {
                    this.dataObj.unload()
                } else {
                    if (typeof (this.dataObj.destructor) == "function") {
                        this.dataObj.destructor()
                    }
                }
            }
        }
    }
    var f = this.cell.childNodes[this.conf.idx.cont];
    while (f.childNodes.length > 0) {
        if (a === false) {
            f.removeChild(f.lastChild)
        } else {
            f.firstChild.style.display = "none";
            a.appendChild(f.firstChild)
        }
    }
    if (this.conf.append_mode) {
        f.style.overflow = "";
        this.conf.append_mode = false
    }
    var c = (this.dataType == "tabbar");
    this.dataObj = null;
    this.dataType = null;
    a = f = null;
    if (this.conf.unloading != true && c) {
        this.showHeader(true);
        this._showBorders()
    }
}
;
dhtmlXCellObject.prototype._attachFromCell = function(b) {
    this.detachObject(true);
    var d = "layout";
    if (typeof (window.dhtmlXWindowsCell) == "function" && this instanceof window.dhtmlXWindowsCell) {
        d = "window"
    }
    if (typeof (window.dhtmlXWindowsCell) == "function" && b instanceof window.dhtmlXWindowsCell && b.wins.w[b._idd].conf.parked == true) {
        b.wins._winCellSetOpacity(b._idd, "open", false)
    }
    if (typeof (window.dhtmlXAccordionCell) == "function" && b instanceof window.dhtmlXAccordionCell && b.conf.opened == false) {
        b._cellSetOpacity("open", false)
    }
    for (var c in b.dataNodes) {
        this._attachObject(c, null, null, null, b.cell.childNodes[b.conf.idx[c]]);
        this.dataNodes[c] = b.dataNodes[c];
        b.dataNodes[c] = null;
        b.conf.ofs_nodes[c == "sb" ? "b" : "t"][c] = false;
        b._updateIdx()
    }
    this._mtbUpdBorder();
    if (b.dataType != null && b.dataObj != null) {
        this.dataType = b.dataType;
        this.dataObj = b.dataObj;
        while (b.cell.childNodes[b.conf.idx.cont].childNodes.length > 0) {
            this.cell.childNodes[this.conf.idx.cont].appendChild(b.cell.childNodes[b.conf.idx.cont].firstChild)
        }
        b.dataType = null;
        b.dataObj = null;
        if (this.dataType == "grid") {
            if (d == "window" && this.conf.skin == "dhx_skyblue") {
                this.dataObj.entBox.style.border = "1px solid #a4bed4";
                this.dataObj._sizeFix = 0
            } else {
                this.dataObj.entBox.style.border = "0px solid white";
                this.dataObj._sizeFix = 2
            }
        }
    } else {
        while (b.cell.childNodes[b.conf.idx.cont].childNodes.length > 0) {
            this.cell.childNodes[this.conf.idx.cont].appendChild(b.cell.childNodes[b.conf.idx.cont].firstChild)
        }
    }
    this.conf.view = b.conf.view;
    b.conf.view = "def";
    for (var c in b.views) {
        this.views[c] = b.views[c];
        b.views[c] = null;
        delete b.views[c]
    }
    b._updateIdx();
    b._adjustCont();
    this._updateIdx();
    this._adjustCont();
    if (b.conf.progress == true) {
        b.progressOff();
        this.progressOn()
    } else {
        this.progressOff()
    }
    if (d == "window" && this.wins.w[this._idd].conf.parked) {
        this.wins._winCellSetOpacity(this._idd, "close", false)
    }
}
;
function dhtmlXCellTop(d, b) {
    if (arguments.length == 0 || typeof (d) == "undefined") {
        return
    }
    var a = this;
    this.dataNodes = {};
    this.conf.ofs = {
        t: 0,
        b: 0,
        l: 0,
        r: 0
    };
    this.conf.ofs_nodes = {
        t: {},
        b: {}
    };
    this.conf.progress = false;
    this.conf.fs_mode = false;
    this.conf.fs_tm = null;
    this.conf.fs_resize = false;
    if (d == document.body) {
        this.conf.fs_mode = true;
        this.base = d;
        if (this.base == document.body) {
            var c = {
                dhx_skyblue: {
                    t: 2,
                    b: 2,
                    l: 2,
                    r: 2
                },
                dhx_web: {
                    t: 8,
                    b: 8,
                    l: 8,
                    r: 8
                },
                dhx_terrace: {
                    t: 9,
                    b: 9,
                    l: 8,
                    r: 8
                },
                material: {
                    t: 9,
                    b: 9,
                    l: 8,
                    r: 8
                }
            };
            this.conf.ofs = (c[this.conf.skin] != null ? c[this.conf.skin] : c.dhx_skyblue)
        }
    } else {
        this.base = (typeof (d) == "string" ? document.getElementById(d) : d)
    }
    this.base.className += " " + this.conf.css + "_base_" + this.conf.skin;
    this.cont = document.createElement("DIV");
    this.cont.className = this.conf.css + "_cont";
    this.base.appendChild(this.cont);
    if (b != null) {
        this.setOffsets(b, false)
    } else {
        if (this.base._ofs != null) {
            this.setOffsets(this.base._ofs, false);
            this.base._ofs = null;
            try {
                delete this.base._ofs
            } catch (f) {}
        }
    }
    this._adjustCont = function() {
        var h = this.conf.ofs.t;
        for (var g in this.conf.ofs_nodes.t) {
            h += (this.conf.ofs_nodes.t[g] == true ? this.dataNodes[g].offsetHeight : 0)
        }
        var e = this.conf.ofs.b;
        for (var g in this.conf.ofs_nodes.b) {
            e += (this.conf.ofs_nodes.b[g] == true ? this.dataNodes[g].offsetHeight : 0)
        }
        this.cont.style.left = this.conf.ofs.l + "px";
        this.cont.style.width = this.base.clientWidth - this.conf.ofs.l - this.conf.ofs.r + "px";
        this.cont.style.top = h + "px";
        this.cont.style.height = this.base.clientHeight - h - e + "px"
    }
    ;
    this._setBaseSkin = function(e) {
        this.base.className = this.base.className.replace(new RegExp(this.conf.css + "_base_" + this.conf.skin,"gi"), this.conf.css + "_base_" + e)
    }
    ;
    this._initFSResize = function() {
        if (this.conf.fs_resize == true) {
            return
        }
        this._doOnResizeStart = function() {
            window.clearTimeout(a.conf.fs_tm);
            a.conf.fs_tm = window.setTimeout(a._doOnResizeEnd, 200)
        }
        ;
        this._doOnResizeEnd = function() {
            a.setSizes()
        }
        ;
        if (typeof (window.addEventListener) == "function") {
            window.addEventListener("resize", this._doOnResizeStart, false)
        } else {
            window.attachEvent("onresize", this._doOnResizeStart)
        }
        this.conf.fs_resize = true
    }
    ;
    if (this.conf.fs_mode == true) {
        this._initFSResize()
    }
    this._unloadTop = function() {
        this._mtbUnload();
        this.detachHeader();
        this.detachFooter();
        if (this.conf.fs_mode == true) {
            if (typeof (window.addEventListener) == "function") {
                window.removeEventListener("resize", this._doOnResizeStart, false)
            } else {
                window.detachEvent("onresize", this._doOnResizeStart)
            }
        }
        this.base.removeChild(this.cont);
        var e = new RegExp("s{0,}" + this.conf.css + "_base_" + this.conf.skin,"gi");
        this.base.className = this.base.className.replace(e, "");
        this.cont = this.base = null;
        a = null
    }
    ;
    d = null
}
dhtmlXCellTop.prototype.setOffsets = function(f, e) {
    var d = false;
    for (var b in f) {
        var c = b.charAt(0);
        if (typeof (this.conf.ofs[c]) != "undefined" && !isNaN(f[b])) {
            this.conf.ofs[c] = parseInt(f[b]);
            d = true
        }
    }
    if (e !== false && typeof (this.setSizes) == "function" && d == true) {
        this.setSizes()
    }
}
;
dhtmlXCellTop.prototype.attachMenu = function(a) {
    if (this.dataNodes.menu != null) {
        return
    }
    this.dataNodes.menuObj = document.createElement("DIV");
    this.dataNodes.menuObj.className = "dhxcelltop_menu";
    this.base.insertBefore(this.dataNodes.menuObj, this.dataNodes.toolbarObj || this.dataNodes.ribbonObj || this.cont);
    if (typeof (a) != "object" || a == null) {
        a = {}
    }
    a.skin = this.conf.skin;
    a.parent = this.dataNodes.menuObj;
    this.dataNodes.menu = new dhtmlXMenuObject(a);
    this.dataNodes.menuEv = this.attachEvent("_onSetSizes", function() {
        if (this.dataNodes.menuObj.style.display == "none") {
            return
        }
        if (this.conf.ofs_menu == null) {
            this.dataNodes.menuObj.style.width = this.base.offsetWidth - this.conf.ofs.l - this.conf.ofs.r + "px";
            this.conf.ofs_menu = {
                w: this.dataNodes.menuObj.offsetWidth - parseInt(this.dataNodes.menuObj.style.width)
            }
        }
        this.dataNodes.menuObj.style.left = this.conf.ofs.l + "px";
        this.dataNodes.menuObj.style.marginTop = (this.dataNodes.haObj != null ? 0 : this.conf.ofs.t) + "px";
        this.dataNodes.menuObj.style.width = this.base.offsetWidth - this.conf.ofs.l - this.conf.ofs.r - this.conf.ofs_menu.w + "px"
    });
    this.conf.ofs_nodes.t.menuObj = true;
    this.setSizes();
    a.parnt = null;
    a = null;
    return this.dataNodes.menu
}
;
dhtmlXCellTop.prototype.detachMenu = function() {
    if (this.dataNodes.menu == null) {
        return
    }
    this.dataNodes.menu.unload();
    this.dataNodes.menu = null;
    this.dataNodes.menuObj.parentNode.removeChild(this.dataNodes.menuObj);
    this.dataNodes.menuObj = null;
    this.detachEvent(this.dataNodes.menuEv);
    this.dataNodes.menuEv = null;
    delete this.dataNodes.menu;
    delete this.dataNodes.menuObj;
    delete this.dataNodes.menuEv;
    this.conf.ofs_nodes.t.menuObj = false;
    if (!this.conf.unloading) {
        this.setSizes()
    }
}
;
dhtmlXCellTop.prototype.attachToolbar = function(a) {
    if (!(this.dataNodes.ribbon == null && this.dataNodes.toolbar == null)) {
        return
    }
    this.dataNodes.toolbarObj = document.createElement("DIV");
    this.dataNodes.toolbarObj.className = "dhxcelltop_toolbar";
    this.base.insertBefore(this.dataNodes.toolbarObj, this.cont);
    this.dataNodes.toolbarObj.appendChild(document.createElement("DIV"));
    if (typeof (a) != "object" || a == null) {
        a = {}
    }
    a.skin = this.conf.skin;
    a.parent = this.dataNodes.toolbarObj.firstChild;
    this.dataNodes.toolbar = new dhtmlXToolbarObject(a);
    this.dataNodes.toolbarEv = this.attachEvent("_onSetSizes", function() {
        if (this.dataNodes.toolbarObj.style.display == "none") {
            return
        }
        this.dataNodes.toolbarObj.style.left = this.conf.ofs.l + "px";
        this.dataNodes.toolbarObj.style.marginTop = (this.dataNodes.haObj != null || this.dataNodes.menuObj != null ? 0 : this.conf.ofs.t) + "px";
        this.dataNodes.toolbarObj.style.width = this.base.offsetWidth - this.conf.ofs.l - this.conf.ofs.r + "px"
    });
    this.dataNodes.toolbar._masterCell = this;
    this.dataNodes.toolbar.attachEvent("_onIconSizeChange", function() {
        this._masterCell.setSizes()
    });
    this.conf.ofs_nodes.t.toolbarObj = true;
    this.setSizes();
    a.parnt = null;
    a = null;
    return this.dataNodes.toolbar
}
;
dhtmlXCellTop.prototype.detachToolbar = function() {
    if (this.dataNodes.toolbar == null) {
        return
    }
    this.dataNodes.toolbar._masterCell = null;
    this.dataNodes.toolbar.unload();
    this.dataNodes.toolbar = null;
    this.dataNodes.toolbarObj.parentNode.removeChild(this.dataNodes.toolbarObj);
    this.dataNodes.toolbarObj = null;
    this.detachEvent(this.dataNodes.toolbarEv);
    this.dataNodes.toolbarEv = null;
    this.conf.ofs_nodes.t.toolbarObj = false;
    delete this.dataNodes.toolbar;
    delete this.dataNodes.toolbarObj;
    delete this.dataNodes.toolbarEv;
    if (!this.conf.unloading) {
        this.setSizes()
    }
}
;
dhtmlXCellTop.prototype.attachRibbon = function(a) {
    if (!(this.dataNodes.ribbon == null && this.dataNodes.toolbar == null)) {
        return
    }
    this.dataNodes.ribbonObj = document.createElement("DIV");
    this.dataNodes.ribbonObj.className = "dhxcelltop_ribbon";
    this.base.insertBefore(this.dataNodes.ribbonObj, this.cont);
    this.dataNodes.ribbonObj.appendChild(document.createElement("DIV"));
    if (typeof (a) != "object" || a == null) {
        a = {}
    }
    a.skin = this.conf.skin;
    a.parent = this.dataNodes.ribbonObj.firstChild;
    this.dataNodes.ribbon = new dhtmlXRibbon(a);
    this.dataNodes.ribbonEv = this.attachEvent("_onSetSizes", function() {
        if (this.dataNodes.ribbonObj.style.display == "none") {
            return
        }
        this.dataNodes.ribbonObj.style.left = this.conf.ofs.l + "px";
        this.dataNodes.ribbonObj.style.marginTop = (this.dataNodes.haObj != null || this.dataNodes.menuObj != null ? 0 : this.conf.ofs.t) + "px";
        this.dataNodes.ribbonObj.style.width = this.base.offsetWidth - this.conf.ofs.l - this.conf.ofs.r + "px";
        this.dataNodes.ribbon.setSizes()
    });
    this.conf.ofs_nodes.t.ribbonObj = true;
    var b = this;
    this.dataNodes.ribbon.attachEvent("_onHeightChanged", function() {
        b.setSizes()
    });
    this.setSizes();
    a.parnt = null;
    a = null;
    return this.dataNodes.ribbon
}
;
dhtmlXCellTop.prototype.detachRibbon = function() {
    if (this.dataNodes.ribbon == null) {
        return
    }
    this.dataNodes.ribbon.unload();
    this.dataNodes.ribbon = null;
    this.dataNodes.ribbonObj.parentNode.removeChild(this.dataNodes.ribbonObj);
    this.dataNodes.ribbonObj = null;
    this.detachEvent(this.dataNodes.ribbonEv);
    this.dataNodes.ribbonEv = null;
    this.conf.ofs_nodes.t.ribbonObj = false;
    delete this.dataNodes.ribbon;
    delete this.dataNodes.ribbonObj;
    delete this.dataNodes.ribbonEv;
    if (!this.conf.unloading) {
        this.setSizes()
    }
}
;
dhtmlXCellTop.prototype.attachStatusBar = function(a) {
    if (this.dataNodes.sbObj) {
        return
    }
    if (typeof (a) == "undefined") {
        a = {}
    }
    this.dataNodes.sbObj = document.createElement("DIV");
    this.dataNodes.sbObj.className = "dhxcelltop_statusbar";
    if (this.cont.nextSibling != null) {
        this.base.insertBefore(this.dataNodes.sbObj, this.cont.nextSibling)
    } else {
        this.base.appendChild(this.dataNodes.sbObj)
    }
    this.dataNodes.sbObj.innerHTML = "<div class='dhxcont_statusbar'>" + (typeof (a.text) == "string" && a.text.length > 0 ? a.text : "&nbsp;") + "</div>";
    if (typeof (a.height) == "number") {
        this.dataNodes.sbObj.firstChild.style.height = this.dataNodes.sbObj.firstChild.style.lineHeight = a.height + "px"
    }
    this.dataNodes.sbObj.setText = function(b) {
        this.childNodes[0].innerHTML = b
    }
    ;
    this.dataNodes.sbObj.getText = function() {
        return this.childNodes[0].innerHTML
    }
    ;
    this.dataNodes.sbObj.onselectstart = function(b) {
        return false
    }
    ;
    this.dataNodes.sbEv = this.attachEvent("_onSetSizes", function() {
        if (this.dataNodes.sbObj.style.display == "none") {
            return
        }
        this.dataNodes.sbObj.style.left = this.conf.ofs.l + "px";
        this.dataNodes.sbObj.style.bottom = (this.dataNodes.faObj != null ? this.dataNodes.faObj.offsetHeight : 0) + this.conf.ofs.t + "px";
        this.dataNodes.sbObj.style.width = this.base.offsetWidth - this.conf.ofs.l - this.conf.ofs.r + "px"
    });
    this.conf.ofs_nodes.b.sbObj = true;
    this.setSizes();
    return this.dataNodes.sbObj
}
;
dhtmlXCellTop.prototype.detachStatusBar = function() {
    if (!this.dataNodes.sbObj) {
        return
    }
    this.dataNodes.sbObj.setText = this.dataNodes.sbObj.getText = this.dataNodes.sbObj.onselectstart = null;
    this.dataNodes.sbObj.parentNode.removeChild(this.dataNodes.sbObj);
    this.dataNodes.sbObj = null;
    this.detachEvent(this.dataNodes.sbEv);
    this.dataNodes.sbEv = null;
    this.conf.ofs_nodes.b.sbObj = false;
    delete this.dataNodes.sb;
    delete this.dataNodes.sbObj;
    delete this.dataNodes.sbEv;
    if (!this.conf.unloading) {
        this.setSizes()
    }
}
;
dhtmlXCellTop.prototype.showMenu = function() {
    this._mtbShowHide("menuObj", "")
}
;
dhtmlXCellTop.prototype.hideMenu = function() {
    this._mtbShowHide("menuObj", "none")
}
;
dhtmlXCellTop.prototype.showToolbar = function() {
    this._mtbShowHide("toolbarObj", "")
}
;
dhtmlXCellTop.prototype.hideToolbar = function() {
    this._mtbShowHide("toolbarObj", "none")
}
;
dhtmlXCellTop.prototype.showRibbon = function() {
    this._mtbShowHide("ribbonObj", "")
}
;
dhtmlXCellTop.prototype.hideRibbon = function() {
    this._mtbShowHide("ribbonObj", "none")
}
;
dhtmlXCellTop.prototype.showStatusBar = function() {
    this._mtbShowHide("sbObj", "")
}
;
dhtmlXCellTop.prototype.hideStatusBar = function() {
    this._mtbShowHide("sbObj", "none")
}
;
dhtmlXCellTop.prototype._mtbShowHide = function(b, a) {
    if (this.dataNodes[b] == null) {
        return
    }
    this.dataNodes[b].style.display = a;
    this.setSizes()
}
;
dhtmlXCellTop.prototype._mtbUnload = function(b, a) {
    this.detachMenu();
    this.detachToolbar();
    this.detachStatusBar();
    this.detachRibbon()
}
;
dhtmlXCellTop.prototype.getAttachedMenu = function() {
    return this.dataNodes.menu
}
;
dhtmlXCellTop.prototype.getAttachedToolbar = function() {
    return this.dataNodes.toolbar
}
;
dhtmlXCellTop.prototype.getAttachedRibbon = function() {
    return this.dataNodes.ribbon
}
;
dhtmlXCellTop.prototype.getAttachedStatusBar = function() {
    return this.dataNodes.sbObj
}
;
dhtmlXCellTop.prototype.progressOn = function() {
    if (this.conf.progress) {
        return
    }
    this.conf.progress = true;
    var b = document.createElement("DIV");
    b.className = "dhxcelltop_progress";
    this.base.appendChild(b);
    var a = document.createElement("DIV");
    if (this.conf.skin == "material" && (window.dhx4.isFF || window.dhx4.isChrome || window.dhx4.isOpera || window.dhx4.isEdge)) {
        a.className = "dhxcelltop_progress_svg";
        a.innerHTML = '<svg class="dhx_cell_prsvg" viewBox="25 25 50 50"><circle class="dhx_cell_prcircle" cx="50" cy="50" r="20"/></svg>'
    } else {
        var a = document.createElement("DIV");
        a.className = "dhxcelltop_progress_img"
    }
    this.base.appendChild(a);
    b = a = null
}
;
dhtmlXCellTop.prototype.progressOff = function() {
    if (!this.conf.progress) {
        return
    }
    var d = {
        dhxcelltop_progress: true,
        dhxcelltop_progress_img: true,
        dhxcelltop_progress_svg: true
    };
    for (var c = 0; c < this.base.childNodes.length; c++) {
        if (typeof (this.base.childNodes[c].className) != "undefined" && d[this.base.childNodes[c].className] == true) {
            d[this.base.childNodes[c].className] = this.base.childNodes[c]
        }
    }
    for (var b in d) {
        if (d[b] != true) {
            this.base.removeChild(d[b])
        }
        d[b] = null
    }
    this.conf.progress = false;
    d = null
}
;
dhtmlXCellTop.prototype.attachHeader = function(b, a) {
    if (this.dataNodes.haObj != null) {
        return
    }
    if (typeof (b) != "object") {
        b = document.getElementById(b)
    }
    this.dataNodes.haObj = document.createElement("DIV");
    this.dataNodes.haObj.className = "dhxcelltop_hdr";
    this.dataNodes.haObj.style.height = (a || b.offsetHeight) + "px";
    this.base.insertBefore(this.dataNodes.haObj, this.dataNodes.menuObj || this.dataNodes.toolbarObj || this.cont);
    this.dataNodes.haObj.appendChild(b);
    b.style.visibility = "visible";
    b = null;
    this.dataNodes.haEv = this.attachEvent("_onSetSizes", function() {
        this.dataNodes.haObj.style.left = this.conf.ofs.l + "px";
        this.dataNodes.haObj.style.marginTop = this.conf.ofs.t + "px";
        this.dataNodes.haObj.style.width = this.base.offsetWidth - this.conf.ofs.l - this.conf.ofs.r + "px"
    });
    this.conf.ofs_nodes.t.haObj = true;
    this.setSizes()
}
;
dhtmlXCellTop.prototype.detachHeader = function() {
    if (!this.dataNodes.haObj) {
        return
    }
    while (this.dataNodes.haObj.childNodes.length > 0) {
        this.dataNodes.haObj.lastChild.style.visibility = "hidden";
        document.body.appendChild(this.dataNodes.haObj.lastChild)
    }
    this.dataNodes.haObj.parentNode.removeChild(this.dataNodes.haObj);
    this.dataNodes.haObj = null;
    this.detachEvent(this.dataNodes.haEv);
    this.dataNodes.haEv = null;
    this.conf.ofs_nodes.t.haObj = false;
    delete this.dataNodes.haEv;
    delete this.dataNodes.haObj;
    if (!this.conf.unloading) {
        this.setSizes()
    }
}
;
dhtmlXCellTop.prototype.attachFooter = function(c, a) {
    if (this.dataNodes.faObj != null) {
        return
    }
    if (typeof (c) != "object") {
        c = document.getElementById(c)
    }
    this.dataNodes.faObj = document.createElement("DIV");
    this.dataNodes.faObj.className = "dhxcelltop_ftr";
    this.dataNodes.faObj.style.height = (a || c.offsetHeight) + "px";
    var b = (this.dataNodes.sbObj || this.cont);
    if (this.base.lastChild == b) {
        this.base.appendChild(this.dataNodes.faObj)
    } else {
        this.base.insertBefore(this.dataNodes.faObj, b.nextSibling)
    }
    this.dataNodes.faEv = this.attachEvent("_onSetSizes", function() {
        this.dataNodes.faObj.style.left = this.conf.ofs.l + "px";
        this.dataNodes.faObj.style.bottom = this.conf.ofs.b + "px";
        this.dataNodes.faObj.style.width = this.base.offsetWidth - this.conf.ofs.l - this.conf.ofs.r + "px"
    });
    this.dataNodes.faObj.appendChild(c);
    c.style.visibility = "visible";
    b = c = null;
    this.conf.ofs_nodes.b.faObj = true;
    this.setSizes()
}
;
dhtmlXCellTop.prototype.detachFooter = function() {
    if (!this.dataNodes.faObj) {
        return
    }
    while (this.dataNodes.faObj.childNodes.length > 0) {
        this.dataNodes.faObj.lastChild.style.visibility = "hidden";
        document.body.appendChild(this.dataNodes.faObj.lastChild)
    }
    this.dataNodes.faObj.parentNode.removeChild(this.dataNodes.faObj);
    this.dataNodes.faObj = null;
    this.detachEvent(this.dataNodes.faEv);
    this.dataNodes.faEv = null;
    this.conf.ofs_nodes.b.faObj = false;
    delete this.dataNodes.faEv;
    delete this.dataNodes.faObj;
    if (!this.conf.unloading) {
        this.setSizes()
    }
}
;
function dhtmlXLayoutObject(c, i, n) {
    var l = null;
    if (c != null && typeof (c) == "object" && typeof (c.tagName) == "undefined" && c._isCell != true) {
        l = {};
        if (c.autosize != null) {
            l.autosize = c.autosize
        }
        if (c.cells != null) {
            l.cells = c.cells
        }
        if (c.pattern != null) {
            i = c.pattern
        }
        if (c.skin != null) {
            n = c.skin
        }
        if (c.offsets != null) {
            l.offsets = c.offsets
        }
        c = c.parent
    }
    this.cdata = {};
    this.conf = {
        skin: (n || window.dhx4.skin || (typeof (dhtmlx) != "undefined" ? dhtmlx.skin : null) || window.dhx4.skinDetect("dhxlayout") || "material"),
        css: "dhxlayout",
        hh: 20,
        autosize: "b",
        nextCell: {
            a: "b",
            b: "a"
        },
        inited: false,
        b_size: {
            w: -1,
            h: -1
        }
    };
    if (this.conf.skin == "material") {
        this.conf.hh = window.dhx4.readFromCss("dhxlayout_base_material dhxlayout_collapsed_height")
    }
    if (typeof (c) == "object" && c._isCell == true) {
        var h = (typeof (l) != "undefined" && l != null ? l : {});
        if (h.pattern == null && i != null) {
            h.pattern = i
        }
        if (h.skin == null && n != null) {
            h.skin = n
        }
        var f = c.attachLayout(h);
        return f
    }
    window.dhtmlXCellTop.apply(this, [c, (l == null ? null : l.offsets)]);
    this.conf.sw = this._detectSW();
    var g = this;
    this._getLayout = function() {
        return this
    }
    ;
    this.mainInst = (c._layoutMainInst != null ? c._layoutMainInst : null);
    this._getMainInst = function() {
        if (this.mainInst != null) {
            return this.mainInst._getMainInst()
        }
        return this
    }
    ;
    this._init = function(r) {
        var q = (typeof (r) == "string" ? this.tplData[r] : r);
        this.conf.mode = q.mode;
        if (this.conf.mode == "c") {
            this.cdata.a = new dhtmlXLayoutCell("a",this)
        } else {
            this.cdata.a = new dhtmlXLayoutCell("a",this);
            this.cdata.b = new dhtmlXLayoutCell("b",this)
        }
        for (var p in this.cdata) {
            this.cont.appendChild(this.cdata[p].cell);
            this.cdata[p].conf.init = {
                w: 0.5,
                h: 0.5
            }
        }
        if (this.conf.mode != "c") {
            var o = this._getMainInst();
            if (o.conf.sep_idx == null) {
                o.conf.sep_idx = 1
            } else {
                o.conf.sep_idx++
            }
            this.sep = new dhtmlXLayoutSepObject(this.conf.mode,o.conf.sep_idx);
            this.cont.appendChild(this.sep.sep);
            this.sep._getLayout = function() {
                return g._getLayout()
            }
            ;
            o = null
        }
        if (q.cells != null) {
            for (var p in q.cells) {
                if (q.cells[p].width != null) {
                    this.cdata[p].conf.init.w = q.cells[p].width
                }
                if (q.cells[p].height != null) {
                    this.cdata[p].conf.init.h = q.cells[p].height
                }
                if (q.cells[p].name != null) {
                    this.cdata[p].conf.name = q.cells[p].name;
                    this.cdata[p].setText(q.cells[p].name)
                }
                if (q.cells[p].fsize != null) {
                    this.cdata[p].conf.fsize = q.cells[p].fsize
                }
            }
        }
        this.setSizes();
        for (var p in this.cdata) {
            this.cdata[p].conf.init = {}
        }
        if (q.cells != null) {
            for (var p in q.cells) {
                if (q.cells[p].layout != null) {
                    this.cdata[p].dataNested = true;
                    this.cdata[p]._layoutMainInst = this;
                    this.cdata[p].cell.className += " dhx_cell_nested_layout";
                    this.cdata[p].attachLayout({
                        pattern: q.cells[p].layout
                    });
                    this.cdata[p]._layoutMainInst = null
                }
            }
        }
    }
    ;
    this.setSizes = function(u, C, y, p) {
        var v = (this.conf.inited == true && this._getMainInst() == this && this.checkEvent("onResizeFinish") == true ? {} : false);
        this._adjustCont();
        var B = this.cont.offsetWidth;
        var s = this.cont.offsetHeight;
        if (this.conf.mode == "c") {
            var a = 0;
            var D = 0;
            var o = B;
            var A = s;
            this.cdata.a._setSize(a, D, o, A, u, y, p);
            this.callEvent("_onSetSizes", []);
            if (v && (!(this.conf.b_size.w == B && this.conf.b_size.h == s))) {
                this._callMainEvent("onResizeFinish", [])
            }
            this.conf.b_size = {
                w: B,
                h: s
            };
            return
        }
        if (typeof (C) == "undefined") {
            var q = (this.conf.mode == "v" ? "w" : "h");
            C = this.conf.autosize;
            if (this.cdata.a.conf.collapsed) {
                C = "b"
            } else {
                if (this.cdata.b.conf.collapsed) {
                    C = "a"
                } else {
                    if (u == "a" || u == "b") {
                        C = this.conf.nextCell[u]
                    }
                }
            }
        } else {}
        if (this.conf.mode == "v") {
            if (C == "a") {
                if (this.cdata.b.conf.init.w != null) {
                    var z = Math.round(B * this.cdata.b.conf.init.w - this.conf.sw / 2)
                } else {
                    var z = this.cdata.b.conf.size.w
                }
                var x = B - z;
                var t = 0;
                var r = s;
                var a = 0;
                var D = t;
                var o = x - a - this.conf.sw;
                var A = r
            } else {
                var a = 0;
                var D = 0;
                if (this.cdata.a.conf.init.w != null) {
                    var o = Math.round(B * this.cdata.a.conf.init.w - this.conf.sw / 2) - a
                } else {
                    var o = this.cdata.a.conf.size.w
                }
                var A = s - D;
                var x = a + o + this.conf.sw;
                var t = D;
                var z = B - x;
                var r = A
            }
            this.cdata.a._setSize(a, D, o, A, u, y, p);
            this.cdata.b._setSize(x, t, z, r, u, y, p);
            this.sep._setSize(a + o, D, this.conf.sw, A)
        } else {
            if (C == "a") {
                if (this.cdata.b.conf.init.h != null) {
                    var r = Math.round(s * this.cdata.b.conf.init.h - this.conf.sw / 2)
                } else {
                    var r = this.cdata.b.conf.size.h
                }
                var x = 0;
                var t = s - r;
                var z = B - x;
                var a = x;
                var D = 0;
                var o = z;
                var A = t - D - this.conf.sw
            } else {
                var a = 0;
                var D = 0;
                var o = B - a;
                if (this.cdata.a.conf.init.h != null) {
                    var A = Math.round(s * this.cdata.a.conf.init.h - this.conf.sw / 2)
                } else {
                    var A = this.cdata.a.conf.size.h
                }
                var x = a;
                var t = D + A + this.conf.sw;
                var z = o;
                var r = s - t
            }
            this.cdata.a._setSize(a, D, o, A, u, y, p);
            this.cdata.b._setSize(x, t, z, r, u, y, p);
            this.sep._setSize(a, D + A, o, this.conf.sw)
        }
        this.callEvent("_onSetSizes", []);
        if (v && (!(this.conf.b_size.w == B && this.conf.b_size.h == s))) {
            this._callMainEvent("onResizeFinish", [])
        }
        this.conf.b_size = {
            w: B,
            h: s
        }
    }
    ;
    this._getAvailWidth = function() {
        var s = [];
        for (var v = 0; v < this.conf.as_cells.h.length; v++) {
            var o = this.cells(this.conf.as_cells.h[v]);
            var t = o.layout;
            var p = t.conf.autosize;
            if (o.conf.collapsed) {
                o = t.cdata[t.conf.nextCell[o._idd]];
                p = t.conf.nextCell[p]
            }
            s.push(Math.max(0, o.getWidth() - o._getMinWidth(p)));
            t = o = null
        }
        var u = (s.length > 0 ? Math.min.apply(window, s) : 0);
        return this.cont.offsetWidth - u
    }
    ;
    this._getAvailHeight = function() {
        var t = [];
        for (var v = 0; v < this.conf.as_cells.v.length; v++) {
            var o = this.cells(this.conf.as_cells.v[v]);
            var s = o.layout;
            var p = s.conf.autosize;
            if (o.conf.collapsed) {
                o = s.cdata[s.conf.nextCell[o._idd]];
                p = s.conf.nextCell[p]
            }
            t.push(Math.max(0, o.getHeight() - o._getHdrHeight() - o._getMinHeight(p)));
            s = o = null
        }
        var u = Math.min.apply(window, t);
        return this.cont.offsetHeight - u
    }
    ;
    this.setSkin = function(a) {
        this._setBaseSkin(a);
        this.conf.skin = a
    }
    ;
    this.unload = function() {
        this.conf.unloading = true;
        this.mainInst = null;
        this.parentLayout = null;
        if (this.items != null) {
            for (var p = 0; p < this.items.length; p++) {
                this.items[p] = null
            }
            this.items = null
        }
        if (this.dhxWins != null) {
            this.dhxWins.unload();
            this.dhxWins = null
        }
        if (this.sep != null) {
            this.sep._unload();
            this.sep = null
        }
        for (var o in this.cdata) {
            this.cdata[o]._unload();
            this.cdata[o] = null
        }
        this._unloadTop();
        window.dhx4._eventable(this, "clear");
        for (var o in this) {
            this[o] = null
        }
        g = null
    }
    ;
    this._getWindowMinDimension = function(q) {
        var a = g._getAvailWidth() + 7 + 7;
        var p = g._getAvailHeight() + 7 + 31;
        var o = {
            w: Math.max(a, 200),
            h: Math.max(p, 140)
        };
        q = null;
        return o
    }
    ;
    window.dhx4._eventable(this);
    this._callMainEvent = function(o, a) {
        return this.callEvent(o, a)
    }
    ;
    this._init(i || "3E");
    var j = this._availAutoSize[i];
    if (j != null) {
        this.conf.pattern = i;
        this.setAutoSize(j.h[j.h.length - 1], j.v[j.v.length - 1])
    }
    if (typeof (window.dhtmlXWindows) == "function" && this.mainInst == null) {
        var d = {
            vp_overflow: (this.conf.fs_mode == true ? false : "auto")
        };
        this.dhxWins = new dhtmlXWindows(d);
        this.dhxWins.setSkin(this.conf.skin)
    }
    this.conf.inited = true;
    if (this == this._getMainInst()) {
        var k = 0;
        this.items = [];
        this.forEachItem(function(a) {
            g.items.push(a);
            a.conf.index = k++
        })
    }
    if (this == this._getMainInst() && l != null) {
        if (l.autosize != null) {
            this.setAutoSize.apply(this, l.autosize)
        }
        if (l.cells != null) {
            for (var b = 0; b < l.cells.length; b++) {
                var e = l.cells[b];
                var m = this.cells(e.id);
                if (e.width) {
                    m.setWidth(e.width)
                }
                if (e.height) {
                    m.setHeight(e.height)
                }
                if (e.text) {
                    m.setText(e.text)
                }
                if (e.collapsed_text) {
                    m.setCollapsedText(e.collapsed_text)
                }
                if (e.collapse) {
                    m.collapse()
                }
                if (e.fix_size) {
                    m.fixSize(e.fix_size[0], e.fix_size[1])
                }
                if (typeof (e.header) != "undefined" && window.dhx4.s2b(e.header) == false) {
                    m.hideHeader()
                }
            }
        }
    }
    l = null;
    return this
}
dhtmlXLayoutObject.prototype = new dhtmlXCellTop();
dhtmlXLayoutObject.prototype.cells = function(d) {
    for (var b in this.cdata) {
        if (this.cdata[b].conf.name == d) {
            return this.cdata[b]
        }
        if (this.cdata[b].dataType == "layout" && this.cdata[b].dataNested == true && this.cdata[b].dataObj != null) {
            var c = this.cdata[b].dataObj.cells(d);
            if (c != null) {
                return c
            }
        }
    }
    return null
}
;
dhtmlXLayoutObject.prototype.forEachItem = function(d, c) {
    if (typeof (d) != "function") {
        return
    }
    if (typeof (c) == "undefined") {
        c = this
    }
    for (var b in this.cdata) {
        if (typeof (this.cdata[b].conf.name) != "undefined") {
            d.apply(c, [this.cdata[b]])
        }
        if (this.cdata[b].dataType == "layout" && this.cdata[b].dataNested == true && this.cdata[b].dataObj != null) {
            this.cdata[b].dataObj.forEachItem(d, c)
        }
    }
    c = null
}
;
dhtmlXLayoutObject.prototype._forEachSep = function(d, c) {
    if (typeof (d) != "function") {
        return
    }
    if (typeof (c) == "undefined") {
        c = this
    }
    if (this.sep != null) {
        d.apply(c, [this.sep])
    }
    for (var b in this.cdata) {
        if (this.cdata[b].dataType == "layout" && this.cdata[b].dataNested == true && this.cdata[b].dataObj != null) {
            this.cdata[b].dataObj._forEachSep(d, c)
        }
    }
    c = null
}
;
dhtmlXLayoutObject.prototype._detectSW = function() {
    if (this._confGlob.sw == null) {
        this._confGlob.sw = {}
    }
    if (this._confGlob.sw[this.conf.skin] == null) {
        this._confGlob.sw[this.conf.skin] = window.dhx4.readFromCss("dhxlayout_sep_sw_" + this.conf.skin)
    }
    return this._confGlob.sw[this.conf.skin]
}
;
dhtmlXLayoutObject.prototype._confGlob = {};
dhtmlXLayoutObject.prototype.listPatterns = function() {
    var c = [];
    for (var b in this.tplData) {
        c.push(b)
    }
    return c
}
;
dhtmlXLayoutObject.prototype.listAutoSizes = function() {
    var d = (this.conf.as_cells != null ? (this.conf.as_cells.h).join(";") : "");
    var c = (this.conf.as_cells != null ? (this.conf.as_cells.v).join(";") : "");
    var b = this._availAutoSize[this.conf.pattern].h;
    var a = this._availAutoSize[this.conf.pattern].v;
    return [d, c, b, a]
}
;
dhtmlXLayoutObject.prototype._getCellsNames = function(d) {
    var e = {};
    if (this.cdata[d].conf.name != null) {
        e[this.cdata[d].conf.name] = true
    }
    if (this.cdata[d].dataType == "layout" && this.cdata[d].dataObj != null && this.cdata[d].dataObj.mainInst == this) {
        var b = this.cdata[d].dataObj._getCellsNames("a");
        var f = this.cdata[d].dataObj._getCellsNames("b");
        for (var c in b) {
            e[c] = b[c]
        }
        for (var c in f) {
            e[c] = f[c]
        }
    }
    return e
}
;
dhtmlXLayoutObject.prototype.setAutoSize = function(b, h, i) {
    if (i !== true) {
        var l = this.listAutoSizes();
        if (l[0] == b && l[1] == h) {
            return
        }
        var g = false;
        var f = false;
        for (var c = 0; c < l[2].length; c++) {
            g = g || l[2][c] == b
        }
        for (var c = 0; c < l[3].length; c++) {
            f = f || l[3][c] == h
        }
        if (!g || !f) {
            return
        }
    }
    this.conf.as_cells = {
        h: b.split(";"),
        v: h.split(";")
    };
    var d = (this.conf.mode == "v" ? "h" : "v");
    for (var j in this.cdata) {
        var e = this._getCellsNames(j);
        var n = false;
        for (var c = 0; c < this.conf.as_cells[d].length; c++) {
            n = n || e[this.conf.as_cells[d][c]]
        }
        if (n) {
            this.conf.autosize = j
        }
        if (this.cdata[j].dataType == "layout" && this.cdata[j].dataObj != null) {
            this.cdata[j].dataObj.setAutoSize(b, h, true)
        }
    }
}
;
dhtmlXLayoutObject.prototype.tplData = {
    "1C": {
        mode: "c",
        cells: {
            a: {
                name: "a"
            }
        }
    },
    "2E": {
        mode: "h",
        cells: {
            a: {
                name: "a",
                fsize: {
                    v: 1
                }
            },
            b: {
                name: "b",
                fsize: {
                    v: 1
                }
            }
        }
    },
    "2U": {
        mode: "v",
        cells: {
            a: {
                name: "a",
                fsize: {
                    h: 1
                }
            },
            b: {
                name: "b",
                fsize: {
                    h: 1
                }
            }
        }
    },
    "3E": {
        mode: "h",
        cells: {
            a: {
                name: "a",
                height: 1 / 3,
                fsize: {
                    v: 1
                }
            },
            b: {
                layout: {
                    mode: "h",
                    cells: {
                        a: {
                            name: "b",
                            fsize: {
                                v: [1, 2]
                            }
                        },
                        b: {
                            name: "c",
                            fsize: {
                                v: 2
                            }
                        }
                    }
                }
            }
        }
    },
    "3W": {
        mode: "v",
        cells: {
            a: {
                name: "a",
                width: 1 / 3,
                fsize: {
                    h: 1
                }
            },
            b: {
                layout: {
                    mode: "v",
                    cells: {
                        a: {
                            name: "b",
                            fsize: {
                                h: [1, 2]
                            }
                        },
                        b: {
                            name: "c",
                            fsize: {
                                h: 2
                            }
                        }
                    }
                }
            }
        }
    },
    "3J": {
        mode: "v",
        cells: {
            a: {
                layout: {
                    mode: "h",
                    cells: {
                        a: {
                            name: "a",
                            fsize: {
                                h: 1,
                                v: 2
                            }
                        },
                        b: {
                            name: "c",
                            fsize: {
                                h: 1,
                                v: 2
                            }
                        }
                    }
                }
            },
            b: {
                name: "b",
                fsize: {
                    h: 1
                }
            }
        }
    },
    "3L": {
        mode: "v",
        cells: {
            a: {
                name: "a",
                fsize: {
                    h: 1
                }
            },
            b: {
                layout: {
                    mode: "h",
                    cells: {
                        a: {
                            name: "b",
                            fsize: {
                                h: 1,
                                v: 2
                            }
                        },
                        b: {
                            name: "c",
                            fsize: {
                                h: 1,
                                v: 2
                            }
                        }
                    }
                }
            }
        }
    },
    "3T": {
        mode: "h",
        cells: {
            a: {
                name: "a",
                fsize: {
                    v: 1
                }
            },
            b: {
                layout: {
                    mode: "v",
                    cells: {
                        a: {
                            name: "b",
                            fsize: {
                                h: 2,
                                v: 1
                            }
                        },
                        b: {
                            name: "c",
                            fsize: {
                                h: 2,
                                v: 1
                            }
                        }
                    }
                }
            }
        }
    },
    "3U": {
        mode: "h",
        cells: {
            a: {
                layout: {
                    mode: "v",
                    cells: {
                        a: {
                            name: "a",
                            fsize: {
                                h: 2,
                                v: 1
                            }
                        },
                        b: {
                            name: "b",
                            fsize: {
                                h: 2,
                                v: 1
                            }
                        }
                    }
                }
            },
            b: {
                name: "c",
                fsize: {
                    v: 1
                }
            }
        }
    },
    "4H": {
        mode: "v",
        cells: {
            a: {
                name: "a",
                width: 1 / 3,
                fsize: {
                    h: 1
                }
            },
            b: {
                layout: {
                    mode: "v",
                    cells: {
                        a: {
                            layout: {
                                mode: "h",
                                cells: {
                                    a: {
                                        name: "b",
                                        fsize: {
                                            h: [1, 2],
                                            v: 3
                                        }
                                    },
                                    b: {
                                        name: "c",
                                        fsize: {
                                            h: [1, 2],
                                            v: 3
                                        }
                                    }
                                }
                            }
                        },
                        b: {
                            name: "d",
                            fsize: {
                                h: 2
                            }
                        }
                    }
                }
            }
        }
    },
    "4I": {
        mode: "h",
        cells: {
            a: {
                name: "a",
                height: 1 / 3,
                fsize: {
                    v: 1
                }
            },
            b: {
                layout: {
                    mode: "h",
                    cells: {
                        a: {
                            layout: {
                                mode: "v",
                                cells: {
                                    a: {
                                        name: "b",
                                        fsize: {
                                            h: 3,
                                            v: [1, 2]
                                        }
                                    },
                                    b: {
                                        name: "c",
                                        fsize: {
                                            h: 3,
                                            v: [1, 2]
                                        }
                                    }
                                }
                            }
                        },
                        b: {
                            name: "d",
                            fsize: {
                                v: 2
                            }
                        }
                    }
                }
            }
        }
    },
    "4T": {
        mode: "h",
        cells: {
            a: {
                name: "a",
                fsize: {
                    v: 1
                }
            },
            b: {
                layout: {
                    mode: "v",
                    cells: {
                        a: {
                            name: "b",
                            width: 1 / 3,
                            fsize: {
                                h: 2,
                                v: 1
                            }
                        },
                        b: {
                            layout: {
                                mode: "v",
                                cells: {
                                    a: {
                                        name: "c",
                                        fsize: {
                                            h: [2, 3],
                                            v: 1
                                        }
                                    },
                                    b: {
                                        name: "d",
                                        fsize: {
                                            h: 3,
                                            v: 1
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "4U": {
        mode: "h",
        cells: {
            a: {
                layout: {
                    mode: "v",
                    cells: {
                        a: {
                            name: "a",
                            width: 1 / 3,
                            fsize: {
                                h: 2,
                                v: 1
                            }
                        },
                        b: {
                            layout: {
                                mode: "v",
                                cells: {
                                    a: {
                                        name: "b",
                                        fsize: {
                                            h: [2, 3],
                                            v: 1
                                        }
                                    },
                                    b: {
                                        name: "c",
                                        fsize: {
                                            h: 3,
                                            v: 1
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            b: {
                name: "d",
                fsize: {
                    v: 1
                }
            }
        }
    },
    "4E": {
        mode: "h",
        cells: {
            a: {
                name: "a",
                height: 1 / 4,
                fsize: {
                    v: 1
                }
            },
            b: {
                layout: {
                    mode: "h",
                    cells: {
                        a: {
                            name: "b",
                            height: 1 / 3,
                            fsize: {
                                v: [1, 2]
                            }
                        },
                        b: {
                            layout: {
                                mode: "h",
                                cells: {
                                    a: {
                                        name: "c",
                                        fsize: {
                                            v: [2, 3]
                                        }
                                    },
                                    b: {
                                        name: "d",
                                        fsize: {
                                            v: 3
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "4W": {
        mode: "v",
        cells: {
            a: {
                name: "a",
                width: 1 / 4,
                fsize: {
                    h: 1
                }
            },
            b: {
                layout: {
                    mode: "v",
                    cells: {
                        a: {
                            name: "b",
                            width: 1 / 3,
                            fsize: {
                                h: [1, 2]
                            }
                        },
                        b: {
                            layout: {
                                mode: "v",
                                cells: {
                                    a: {
                                        name: "c",
                                        fsize: {
                                            h: [2, 3]
                                        }
                                    },
                                    b: {
                                        name: "d",
                                        fsize: {
                                            h: 3
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "4A": {
        mode: "v",
        cells: {
            a: {
                width: 1 / 3,
                layout: {
                    mode: "h",
                    cells: {
                        a: {
                            name: "a",
                            fsize: {
                                h: 1,
                                v: 2
                            }
                        },
                        b: {
                            name: "b",
                            fsize: {
                                h: 1,
                                v: 2
                            }
                        }
                    }
                }
            },
            b: {
                layout: {
                    mode: "v",
                    cells: {
                        a: {
                            name: "c",
                            fsize: {
                                h: [1, 3]
                            }
                        },
                        b: {
                            name: "d",
                            fsize: {
                                h: 3
                            }
                        }
                    }
                }
            }
        }
    },
    "4L": {
        mode: "v",
        cells: {
            a: {
                name: "a",
                width: 1 / 3,
                fsize: {
                    h: 1
                }
            },
            b: {
                layout: {
                    mode: "v",
                    cells: {
                        a: {
                            name: "b",
                            fsize: {
                                h: [1, 2]
                            }
                        },
                        b: {
                            layout: {
                                mode: "h",
                                cells: {
                                    a: {
                                        name: "c",
                                        fsize: {
                                            h: 2,
                                            v: 3
                                        }
                                    },
                                    b: {
                                        name: "d",
                                        fsize: {
                                            h: 2,
                                            v: 3
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "4J": {
        mode: "h",
        cells: {
            a: {
                name: "a",
                height: 1 / 3,
                fsize: {
                    v: 1
                }
            },
            b: {
                layout: {
                    mode: "h",
                    cells: {
                        a: {
                            name: "b",
                            fsize: {
                                v: [1, 2]
                            }
                        },
                        b: {
                            layout: {
                                mode: "v",
                                cells: {
                                    a: {
                                        name: "c",
                                        fsize: {
                                            h: 3,
                                            v: 2
                                        }
                                    },
                                    b: {
                                        name: "d",
                                        fsize: {
                                            h: 3,
                                            v: 2
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "4F": {
        mode: "h",
        cells: {
            a: {
                height: 1 / 3,
                layout: {
                    mode: "v",
                    cells: {
                        a: {
                            name: "a",
                            fsize: {
                                h: 2,
                                v: 1
                            }
                        },
                        b: {
                            name: "b",
                            fsize: {
                                h: 2,
                                v: 1
                            }
                        }
                    }
                }
            },
            b: {
                layout: {
                    mode: "h",
                    cells: {
                        a: {
                            name: "c",
                            fsize: {
                                v: [1, 3]
                            }
                        },
                        b: {
                            name: "d",
                            fsize: {
                                v: 3
                            }
                        }
                    }
                }
            }
        }
    },
    "4G": {
        mode: "v",
        cells: {
            a: {
                layout: {
                    mode: "h",
                    cells: {
                        a: {
                            name: "a",
                            height: 1 / 3,
                            fsize: {
                                h: 1,
                                v: 2
                            }
                        },
                        b: {
                            layout: {
                                mode: "h",
                                cells: {
                                    a: {
                                        name: "b",
                                        fsize: {
                                            h: 1,
                                            v: [2, 3]
                                        }
                                    },
                                    b: {
                                        name: "c",
                                        fsize: {
                                            h: 1,
                                            v: 3
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            b: {
                name: "d",
                fsize: {
                    h: 1
                }
            }
        }
    },
    "4C": {
        mode: "v",
        cells: {
            a: {
                name: "a",
                fsize: {
                    h: 1
                }
            },
            b: {
                layout: {
                    mode: "h",
                    cells: {
                        a: {
                            name: "b",
                            height: 1 / 3,
                            fsize: {
                                h: 1,
                                v: 2
                            }
                        },
                        b: {
                            layout: {
                                mode: "h",
                                cells: {
                                    a: {
                                        name: "c",
                                        fsize: {
                                            h: 1,
                                            v: [2, 3]
                                        }
                                    },
                                    b: {
                                        name: "d",
                                        fsize: {
                                            h: 1,
                                            v: 3
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "5H": {
        mode: "v",
        cells: {
            a: {
                width: 1 / 3,
                name: "a",
                fsize: {
                    h: 1
                }
            },
            b: {
                layout: {
                    mode: "v",
                    cells: {
                        a: {
                            layout: {
                                mode: "h",
                                cells: {
                                    a: {
                                        name: "b",
                                        height: 1 / 3,
                                        fsize: {
                                            h: [1, 2],
                                            v: 3
                                        }
                                    },
                                    b: {
                                        layout: {
                                            mode: "h",
                                            cells: {
                                                a: {
                                                    name: "c",
                                                    fsize: {
                                                        h: [1, 2],
                                                        v: [3, 4]
                                                    }
                                                },
                                                b: {
                                                    name: "d",
                                                    fsize: {
                                                        h: [1, 2],
                                                        v: 4
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        b: {
                            name: "e",
                            fsize: {
                                h: 2
                            }
                        }
                    }
                }
            }
        }
    },
    "5I": {
        mode: "h",
        cells: {
            a: {
                height: 1 / 3,
                name: "a",
                fsize: {
                    v: 1
                }
            },
            b: {
                layout: {
                    mode: "h",
                    cells: {
                        a: {
                            layout: {
                                mode: "v",
                                cells: {
                                    a: {
                                        name: "b",
                                        width: 1 / 3,
                                        fsize: {
                                            h: 3,
                                            v: [1, 2]
                                        }
                                    },
                                    b: {
                                        layout: {
                                            mode: "v",
                                            cells: {
                                                a: {
                                                    name: "c",
                                                    fsize: {
                                                        h: [3, 4],
                                                        v: [1, 2]
                                                    }
                                                },
                                                b: {
                                                    name: "d",
                                                    fsize: {
                                                        h: 4,
                                                        v: [1, 2]
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        b: {
                            name: "e",
                            fsize: {
                                v: 2
                            }
                        }
                    }
                }
            }
        }
    },
    "5U": {
        mode: "h",
        cells: {
            a: {
                layout: {
                    mode: "v",
                    cells: {
                        a: {
                            name: "a",
                            width: 1 / 4,
                            fsize: {
                                h: 2,
                                v: 1
                            }
                        },
                        b: {
                            layout: {
                                mode: "v",
                                cells: {
                                    a: {
                                        name: "b",
                                        width: 1 / 3,
                                        fsize: {
                                            h: [2, 3],
                                            v: 1
                                        }
                                    },
                                    b: {
                                        layout: {
                                            mode: "v",
                                            cells: {
                                                a: {
                                                    name: "c",
                                                    fsize: {
                                                        h: [3, 4],
                                                        v: 1
                                                    }
                                                },
                                                b: {
                                                    name: "d",
                                                    fsize: {
                                                        h: 4,
                                                        v: 1
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            b: {
                name: "e",
                fsize: {
                    v: 1
                }
            }
        }
    },
    "5E": {
        mode: "h",
        cells: {
            a: {
                name: "a",
                height: 1 / 5,
                fsize: {
                    v: 1
                }
            },
            b: {
                layout: {
                    mode: "h",
                    cells: {
                        a: {
                            name: "b",
                            height: 1 / 4,
                            fsize: {
                                v: [1, 2]
                            }
                        },
                        b: {
                            layout: {
                                mode: "h",
                                cells: {
                                    a: {
                                        name: "c",
                                        height: 1 / 3,
                                        fsize: {
                                            v: [2, 3]
                                        }
                                    },
                                    b: {
                                        layout: {
                                            mode: "h",
                                            cells: {
                                                a: {
                                                    name: "d",
                                                    fsize: {
                                                        v: [3, 4]
                                                    }
                                                },
                                                b: {
                                                    name: "e",
                                                    fsize: {
                                                        v: 4
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "5W": {
        mode: "v",
        cells: {
            a: {
                name: "a",
                width: 1 / 5,
                fsize: {
                    h: 1
                }
            },
            b: {
                layout: {
                    mode: "v",
                    cells: {
                        a: {
                            name: "b",
                            width: 1 / 4,
                            fsize: {
                                h: [1, 2]
                            }
                        },
                        b: {
                            layout: {
                                mode: "v",
                                cells: {
                                    a: {
                                        name: "c",
                                        width: 1 / 3,
                                        fsize: {
                                            h: [2, 3]
                                        }
                                    },
                                    b: {
                                        layout: {
                                            mode: "v",
                                            cells: {
                                                a: {
                                                    name: "d",
                                                    fsize: {
                                                        h: [3, 4]
                                                    }
                                                },
                                                b: {
                                                    name: "e",
                                                    fsize: {
                                                        h: 4
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "5K": {
        mode: "v",
        cells: {
            a: {
                layout: {
                    mode: "h",
                    cells: {
                        a: {
                            name: "a",
                            height: 1 / 3,
                            fsize: {
                                h: 1,
                                v: 2
                            }
                        },
                        b: {
                            layout: {
                                mode: "h",
                                cells: {
                                    a: {
                                        name: "b",
                                        fsize: {
                                            h: 1,
                                            v: [2, 3]
                                        }
                                    },
                                    b: {
                                        name: "c",
                                        fsize: {
                                            h: 1,
                                            v: 3
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            b: {
                layout: {
                    mode: "h",
                    cells: {
                        a: {
                            name: "d",
                            fsize: {
                                h: 1,
                                v: 4
                            }
                        },
                        b: {
                            name: "e",
                            fsize: {
                                h: 1,
                                v: 4
                            }
                        }
                    }
                }
            }
        }
    },
    "5S": {
        mode: "v",
        cells: {
            a: {
                layout: {
                    mode: "h",
                    cells: {
                        a: {
                            name: "a",
                            fsize: {
                                h: 1,
                                v: 2
                            }
                        },
                        b: {
                            name: "b",
                            fsize: {
                                h: 1,
                                v: 2
                            }
                        }
                    }
                }
            },
            b: {
                layout: {
                    mode: "h",
                    cells: {
                        a: {
                            name: "c",
                            height: 1 / 3,
                            fsize: {
                                h: 1,
                                v: 3
                            }
                        },
                        b: {
                            layout: {
                                mode: "h",
                                cells: {
                                    a: {
                                        name: "d",
                                        fsize: {
                                            h: 1,
                                            v: [3, 2]
                                        }
                                    },
                                    b: {
                                        name: "e",
                                        fsize: {
                                            h: 1,
                                            v: 4
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "5G": {
        mode: "v",
        cells: {
            a: {
                width: 1 / 3,
                layout: {
                    mode: "h",
                    cells: {
                        a: {
                            name: "a",
                            height: 1 / 3,
                            fsize: {
                                h: 1,
                                v: 2
                            }
                        },
                        b: {
                            layout: {
                                mode: "h",
                                cells: {
                                    a: {
                                        name: "b",
                                        fsize: {
                                            h: 1,
                                            v: [2, 3]
                                        }
                                    },
                                    b: {
                                        name: "c",
                                        fsize: {
                                            h: 1,
                                            v: 3
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            b: {
                layout: {
                    mode: "v",
                    cells: {
                        a: {
                            name: "d",
                            fsize: {
                                h: [1, 4]
                            }
                        },
                        b: {
                            name: "e",
                            fsize: {
                                h: 4
                            }
                        }
                    }
                }
            }
        }
    },
    "5C": {
        mode: "v",
        cells: {
            a: {
                width: 2 / 3,
                layout: {
                    mode: "v",
                    cells: {
                        a: {
                            name: "a",
                            fsize: {
                                h: 2
                            }
                        },
                        b: {
                            name: "b",
                            fsize: {
                                h: [2, 1]
                            }
                        }
                    }
                }
            },
            b: {
                layout: {
                    mode: "h",
                    cells: {
                        a: {
                            name: "c",
                            height: 1 / 3,
                            fsize: {
                                h: 1,
                                v: 3
                            }
                        },
                        b: {
                            layout: {
                                mode: "h",
                                cells: {
                                    a: {
                                        name: "d",
                                        fsize: {
                                            h: 1,
                                            v: [3, 4]
                                        }
                                    },
                                    b: {
                                        name: "e",
                                        fsize: {
                                            h: 1,
                                            v: 4
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "6H": {
        mode: "v",
        cells: {
            a: {
                width: 1 / 3,
                name: "a",
                fsize: {
                    h: 1
                }
            },
            b: {
                layout: {
                    mode: "v",
                    cells: {
                        a: {
                            layout: {
                                mode: "h",
                                cells: {
                                    a: {
                                        name: "b",
                                        height: 1 / 4,
                                        fsize: {
                                            h: [1, 2],
                                            v: 3
                                        }
                                    },
                                    b: {
                                        layout: {
                                            mode: "h",
                                            cells: {
                                                a: {
                                                    name: "c",
                                                    height: 1 / 3,
                                                    fsize: {
                                                        h: [1, 2],
                                                        v: [3, 4]
                                                    }
                                                },
                                                b: {
                                                    layout: {
                                                        mode: "h",
                                                        cells: {
                                                            a: {
                                                                name: "d",
                                                                fsize: {
                                                                    h: [1, 2],
                                                                    v: [4, 5]
                                                                }
                                                            },
                                                            b: {
                                                                name: "e",
                                                                fsize: {
                                                                    h: [1, 2],
                                                                    v: 5
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        b: {
                            name: "f",
                            fsize: {
                                h: 2
                            }
                        }
                    }
                }
            }
        }
    },
    "6I": {
        mode: "h",
        cells: {
            a: {
                height: 1 / 3,
                name: "a",
                fsize: {
                    v: 1
                }
            },
            b: {
                layout: {
                    mode: "h",
                    cells: {
                        a: {
                            layout: {
                                mode: "v",
                                cells: {
                                    a: {
                                        name: "b",
                                        width: 1 / 4,
                                        fsize: {
                                            h: 3,
                                            v: [1, 2]
                                        }
                                    },
                                    b: {
                                        layout: {
                                            mode: "v",
                                            cells: {
                                                a: {
                                                    name: "c",
                                                    width: 1 / 3,
                                                    fsize: {
                                                        h: [3, 4],
                                                        v: [1, 2]
                                                    }
                                                },
                                                b: {
                                                    layout: {
                                                        mode: "v",
                                                        cells: {
                                                            a: {
                                                                name: "d",
                                                                fsize: {
                                                                    h: [4, 5],
                                                                    v: [1, 2]
                                                                }
                                                            },
                                                            b: {
                                                                name: "e",
                                                                fsize: {
                                                                    h: 5,
                                                                    v: [1, 2]
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        b: {
                            name: "f",
                            fsize: {
                                v: 2
                            }
                        }
                    }
                }
            }
        }
    },
    "6A": {
        mode: "v",
        cells: {
            a: {
                layout: {
                    mode: "h",
                    cells: {
                        a: {
                            name: "a",
                            height: 1 / 5,
                            fsize: {
                                h: 1,
                                v: 2
                            }
                        },
                        b: {
                            layout: {
                                mode: "h",
                                cells: {
                                    a: {
                                        name: "b",
                                        height: 1 / 4,
                                        fsize: {
                                            h: 1,
                                            v: [2, 3]
                                        }
                                    },
                                    b: {
                                        layout: {
                                            mode: "h",
                                            cells: {
                                                a: {
                                                    name: "c",
                                                    height: 1 / 3,
                                                    fsize: {
                                                        h: 1,
                                                        v: [3, 4]
                                                    }
                                                },
                                                b: {
                                                    layout: {
                                                        mode: "h",
                                                        cells: {
                                                            a: {
                                                                name: "d",
                                                                fsize: {
                                                                    h: 1,
                                                                    v: [4, 5]
                                                                }
                                                            },
                                                            b: {
                                                                name: "e",
                                                                fsize: {
                                                                    h: 1,
                                                                    v: 5
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            b: {
                name: "f",
                fsize: {
                    h: 1
                }
            }
        }
    },
    "6C": {
        mode: "v",
        cells: {
            a: {
                name: "a",
                fsize: {
                    h: 1
                }
            },
            b: {
                layout: {
                    mode: "h",
                    cells: {
                        a: {
                            name: "b",
                            height: 1 / 5,
                            fsize: {
                                h: 1,
                                v: 2
                            }
                        },
                        b: {
                            layout: {
                                mode: "h",
                                cells: {
                                    a: {
                                        name: "c",
                                        height: 1 / 4,
                                        fsize: {
                                            h: 1,
                                            v: [2, 3]
                                        }
                                    },
                                    b: {
                                        layout: {
                                            mode: "h",
                                            cells: {
                                                a: {
                                                    name: "d",
                                                    height: 1 / 3,
                                                    fsize: {
                                                        h: 1,
                                                        v: [3, 4]
                                                    }
                                                },
                                                b: {
                                                    layout: {
                                                        mode: "h",
                                                        cells: {
                                                            a: {
                                                                name: "e",
                                                                fsize: {
                                                                    h: 1,
                                                                    v: [4, 5]
                                                                }
                                                            },
                                                            b: {
                                                                name: "f",
                                                                fsize: {
                                                                    h: 1,
                                                                    v: 5
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "6J": {
        mode: "v",
        cells: {
            a: {
                width: 1 / 3,
                layout: {
                    mode: "h",
                    cells: {
                        a: {
                            name: "a",
                            height: 1 / 4,
                            fsize: {
                                h: 1,
                                v: 2
                            }
                        },
                        b: {
                            layout: {
                                mode: "h",
                                cells: {
                                    a: {
                                        name: "b",
                                        height: 1 / 3,
                                        fsize: {
                                            h: 1,
                                            v: [2, 3]
                                        }
                                    },
                                    b: {
                                        layout: {
                                            mode: "h",
                                            cells: {
                                                a: {
                                                    name: "c",
                                                    fsize: {
                                                        h: 1,
                                                        v: [3, 4]
                                                    }
                                                },
                                                b: {
                                                    name: "d",
                                                    fsize: {
                                                        h: 1,
                                                        v: 4
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            b: {
                layout: {
                    mode: "v",
                    cells: {
                        a: {
                            name: "e",
                            fsize: {
                                h: [1, 5]
                            }
                        },
                        b: {
                            name: "f",
                            fsize: {
                                h: 5
                            }
                        }
                    }
                }
            }
        }
    },
    "6E": {
        mode: "v",
        cells: {
            a: {
                name: "a",
                width: 1 / 3,
                fsize: {
                    h: 1
                }
            },
            b: {
                layout: {
                    mode: "v",
                    cells: {
                        a: {
                            name: "b",
                            fsize: {
                                h: [1, 2]
                            }
                        },
                        b: {
                            layout: {
                                mode: "h",
                                cells: {
                                    a: {
                                        name: "c",
                                        height: 1 / 4,
                                        fsize: {
                                            h: 2,
                                            v: 3
                                        }
                                    },
                                    b: {
                                        layout: {
                                            mode: "h",
                                            cells: {
                                                a: {
                                                    name: "d",
                                                    height: 1 / 3,
                                                    fsize: {
                                                        h: 2,
                                                        v: [3, 4]
                                                    }
                                                },
                                                b: {
                                                    layout: {
                                                        mode: "h",
                                                        cells: {
                                                            a: {
                                                                name: "e",
                                                                fsize: {
                                                                    h: 2,
                                                                    v: [4, 5]
                                                                }
                                                            },
                                                            b: {
                                                                name: "f",
                                                                fsize: {
                                                                    h: 2,
                                                                    v: 5
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "6W": {
        mode: "v",
        cells: {
            a: {
                name: "a",
                width: 1 / 6,
                fsize: {
                    h: 1
                }
            },
            b: {
                layout: {
                    mode: "v",
                    cells: {
                        a: {
                            name: "b",
                            width: 1 / 5,
                            fsize: {
                                h: [1, 2]
                            }
                        },
                        b: {
                            layout: {
                                mode: "v",
                                cells: {
                                    a: {
                                        name: "c",
                                        width: 1 / 4,
                                        fsize: {
                                            h: [2, 3]
                                        }
                                    },
                                    b: {
                                        layout: {
                                            mode: "v",
                                            cells: {
                                                a: {
                                                    name: "d",
                                                    width: 1 / 3,
                                                    fsize: {
                                                        h: [3, 4]
                                                    }
                                                },
                                                b: {
                                                    layout: {
                                                        mode: "v",
                                                        cells: {
                                                            a: {
                                                                name: "e",
                                                                fsize: {
                                                                    h: [4, 5]
                                                                }
                                                            },
                                                            b: {
                                                                name: "f",
                                                                fsize: {
                                                                    h: 5
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "7H": {
        mode: "v",
        cells: {
            a: {
                name: "a",
                width: 1 / 3,
                fsize: {
                    h: 1
                }
            },
            b: {
                layout: {
                    mode: "v",
                    cells: {
                        a: {
                            layout: {
                                mode: "h",
                                cells: {
                                    a: {
                                        name: "b",
                                        height: 1 / 5,
                                        fsize: {
                                            h: [1, 2],
                                            v: 3
                                        }
                                    },
                                    b: {
                                        layout: {
                                            mode: "h",
                                            cells: {
                                                a: {
                                                    name: "c",
                                                    height: 1 / 4,
                                                    fsize: {
                                                        h: [1, 2],
                                                        v: [3, 4]
                                                    }
                                                },
                                                b: {
                                                    layout: {
                                                        mode: "h",
                                                        cells: {
                                                            a: {
                                                                name: "d",
                                                                height: 1 / 3,
                                                                fsize: {
                                                                    h: [1, 2],
                                                                    v: [4, 5]
                                                                }
                                                            },
                                                            b: {
                                                                layout: {
                                                                    mode: "h",
                                                                    cells: {
                                                                        a: {
                                                                            name: "e",
                                                                            fsize: {
                                                                                h: [1, 2],
                                                                                v: [5, 6]
                                                                            }
                                                                        },
                                                                        b: {
                                                                            name: "f",
                                                                            fsize: {
                                                                                h: [1, 2],
                                                                                v: 6
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        b: {
                            name: "g",
                            fsize: {
                                h: 2
                            }
                        }
                    }
                }
            }
        }
    },
    "7I": {
        mode: "h",
        cells: {
            a: {
                name: "a",
                height: 1 / 3,
                fsize: {
                    v: 1
                }
            },
            b: {
                layout: {
                    mode: "h",
                    cells: {
                        a: {
                            layout: {
                                mode: "v",
                                cells: {
                                    a: {
                                        name: "b",
                                        width: 1 / 5,
                                        fsize: {
                                            h: 3,
                                            v: [1, 2]
                                        }
                                    },
                                    b: {
                                        layout: {
                                            mode: "v",
                                            cells: {
                                                a: {
                                                    name: "c",
                                                    width: 1 / 4,
                                                    fsize: {
                                                        h: [3, 4],
                                                        v: [1, 2]
                                                    }
                                                },
                                                b: {
                                                    layout: {
                                                        mode: "v",
                                                        cells: {
                                                            a: {
                                                                name: "d",
                                                                width: 1 / 3,
                                                                fsize: {
                                                                    h: [4, 5],
                                                                    v: [1, 2]
                                                                }
                                                            },
                                                            b: {
                                                                layout: {
                                                                    mode: "v",
                                                                    cells: {
                                                                        a: {
                                                                            name: "e",
                                                                            fsize: {
                                                                                h: [5, 6],
                                                                                v: [1, 2]
                                                                            }
                                                                        },
                                                                        b: {
                                                                            name: "f",
                                                                            fsize: {
                                                                                h: 6,
                                                                                v: [1, 2]
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        b: {
                            name: "g",
                            fsize: {
                                v: 2
                            }
                        }
                    }
                }
            }
        }
    }
};
dhtmlXLayoutObject.prototype._availAutoSize = {
    "1C": {
        h: ["a"],
        v: ["a"]
    },
    "2E": {
        h: ["a;b"],
        v: ["a", "b"]
    },
    "2U": {
        h: ["a", "b"],
        v: ["a;b"]
    },
    "3E": {
        h: ["a;b;c"],
        v: ["a", "b", "c"]
    },
    "3W": {
        h: ["a", "b", "c"],
        v: ["a;b;c"]
    },
    "3J": {
        h: ["a;c", "b"],
        v: ["a;b", "b;c"]
    },
    "3L": {
        h: ["a", "b;c"],
        v: ["a;b", "a;c"]
    },
    "3T": {
        h: ["a;b", "a;c"],
        v: ["a", "b;c"]
    },
    "3U": {
        h: ["a;c", "b;c"],
        v: ["a;b", "c"]
    },
    "4H": {
        h: ["a", "b;c", "d"],
        v: ["a;b;d", "a;c;d"]
    },
    "4I": {
        h: ["a;b;d", "a;c;d"],
        v: ["a", "b;c", "d"]
    },
    "4T": {
        h: ["a;b", "a;c", "a;d"],
        v: ["a", "b;c;d"]
    },
    "4U": {
        h: ["a;d", "b;d", "c;d"],
        v: ["a;b;c", "d"]
    },
    "4E": {
        h: ["a;b;c;d"],
        v: ["a", "b", "c", "d"]
    },
    "4W": {
        h: ["a", "b", "c", "d"],
        v: ["a;b;c;d"]
    },
    "4A": {
        h: ["a;b", "c", "d"],
        v: ["a;c;d", "b;c;d"]
    },
    "4L": {
        h: ["a", "b", "c;d"],
        v: ["a;b;c", "a;b;d"]
    },
    "4J": {
        h: ["a;b;c", "a;b;d"],
        v: ["a", "b", "c;d"]
    },
    "4F": {
        h: ["a;c;d", "b;c;d"],
        v: ["a;b", "c", "d"]
    },
    "4G": {
        h: ["a;b;c", "d"],
        v: ["a;d", "b;d", "c;d"]
    },
    "4C": {
        h: ["a", "b;c;d"],
        v: ["a;b", "a;c", "a;d"]
    },
    "5H": {
        h: ["a", "b;c;d", "e"],
        v: ["a;b;e", "a;c;e", "a;d;e"]
    },
    "5I": {
        h: ["a;b;e", "a;c;e", "a;d;e"],
        v: ["a", "b;c;d", "e"]
    },
    "5U": {
        h: ["a;e", "b;e", "c;e", "d;e"],
        v: ["a;b;c;d", "e"]
    },
    "5E": {
        h: ["a;b;c;d;e"],
        v: ["a", "b", "c", "d", "e"]
    },
    "5W": {
        h: ["a", "b", "c", "d", "e"],
        v: ["a;b;c;d;e"]
    },
    "5K": {
        h: ["a;b;c", "d;e"],
        v: ["a;d", "b;d", "c;d", "a;e", "b;e", "c;e"]
    },
    "5S": {
        h: ["a;b", "c;d;e"],
        v: ["a;c", "a;d", "a;e", "b;c", "b;d", "b;e"]
    },
    "5G": {
        h: ["a;b;c", "d", "e"],
        v: ["a;d;e", "b;d;e", "c;d;e"]
    },
    "5C": {
        h: ["a", "b", "c;d;e"],
        v: ["a;b;c", "a;b;d", "a;b;e"]
    },
    "6H": {
        h: ["a", "b;c;d;e", "f"],
        v: ["a;b;f", "a;c;f", "a;d;f", "a;e;f"]
    },
    "6I": {
        h: ["a;b;f", "a;c;f", "a;d;f", "a;e;f"],
        v: ["a", "b;c;d;e", "f"]
    },
    "6A": {
        h: ["a;b;c;d;e", "f"],
        v: ["a;f", "b;f", "c;f", "d;f", "e;f"]
    },
    "6C": {
        h: ["a", "b;c;d;e;f"],
        v: ["a;b", "a;c", "a;d", "a;e", "a;f"]
    },
    "6J": {
        h: ["a;b;c;d", "e", "f"],
        v: ["a;e;f", "b;e;f", "c;e;f", "d;e;f"]
    },
    "6E": {
        h: ["a", "b", "c;d;e;f"],
        v: ["a;b;c", "a;b;d", "a;b;e", "a;b;f"]
    },
    "6W": {
        h: ["a", "b", "c", "d", "e", "f"],
        v: ["a;b;c;d;e;f"]
    },
    "7H": {
        h: ["a", "b;c;d;e;f", "g"],
        v: ["a;b;g", "a;c;g", "a;d;g", "a;e;g", "a;f;g"]
    },
    "7I": {
        h: ["a;b;g", "a;c;g", "a;d;g", "a;e;g", "a;f;g"],
        v: ["a", "b;c;d;e;f", "g"]
    }
};
function dhtmlXLayoutSepObject(c, a) {
    var b = this;
    this.conf = {
        mode: c,
        idx: a,
        blocked: false,
        locked: false,
        btn_left: ((window.dhx4.isIE6 || window.dhx4.isIE7 || window.dhx4.isIE8) && typeof (window.addEventListener) == "undefined" ? 1 : 0)
    };
    if (window.dhx4.isIE && navigator.userAgent.indexOf("MSIE 7.0") >= 0 && navigator.userAgent.indexOf("Trident") >= 0) {
        this.conf.btn_left = 1
    }
    this.sep = document.createElement("DIV");
    this.sep.className = "dhxlayout_sep";
    if (window.dhx4.isIE == true) {
        this.sep.onselectstart = function() {
            return false
        }
    }
    this.sep.className = "dhxlayout_sep dhxlayout_sep_resize_" + this.conf.mode;
    this._setSize = function(d, g, e, f) {
        this.sep.style.left = d + "px";
        this.sep.style.top = g + "px";
        this.sep.style.width = Math.max(e, 0) + "px";
        this.sep.style.height = Math.max(f, 0) + "px"
    }
    ;
    this._lockSep = function(d) {
        this.conf.locked = (d == true);
        this._blockSep()
    }
    ;
    this._setWH = function(d) {
        var e = this._getLayout();
        e.conf.sw = (d == null ? e._detectSW() : Math.max(parseInt(d) || -1, -1));
        e._getMainInst().setSizes();
        e = null
    }
    ;
    this._blockSep = function() {
        var d = this._getLayout();
        var e = d.cdata.a.conf.collapsed || d.cdata.b.conf.collapsed || this.conf.locked;
        d = null;
        if (this.conf.blocked == e) {
            return
        }
        this.sep.className = "dhxlayout_sep" + (e ? "" : " dhxlayout_sep_resize_" + this.conf.mode);
        this.conf.blocked = e
    }
    ;
    this._beforeResize = function(f) {
        if (this.conf.blocked) {
            return
        }
        if (this.conf.resize != null && this.conf.resize.active == true) {
            return
        }
        if (f.type == window.dhx4.dnd.evs.start) {
            this.sep.className += " dhxlayout_sep_resize_actv";
            var h = (f.pageX || f.touches[0].pageX);
            var g = (f.pageY || f.touches[0].pageY)
        } else {
            if (f.button !== this.conf.btn_left) {
                return
            }
            var h = f.clientX;
            var g = f.clientY
        }
        if (window.dhx4.dnd.p_en == true) {
            window.dhx4.dnd._touchOff()
        }
        var d = this._getLayout();
        this.conf.resize = {
            sx: h,
            sy: g,
            tx: f.layerX,
            ty: f.layerY,
            sep_x: parseInt(this.sep.style.left),
            sep_y: parseInt(this.sep.style.top),
            min_wa: d.cdata.a._getAvailWidth("a"),
            min_wb: d.cdata.b._getAvailWidth("b"),
            min_ha: d.cdata.a._getAvailHeight("a"),
            min_hb: d.cdata.b._getAvailHeight("b")
        };
        this.conf.resize.nx = this.conf.resize.sep_x;
        this.conf.resize.ny = this.conf.resize.sep_y;
        if (typeof (window.addEventListener) == "function") {
            window.addEventListener("mousemove", this._doOnMouseMove, false);
            window.addEventListener("mouseup", this._doOnMouseUp, false);
            window.addEventListener(window.dhx4.dnd.evs.move, this._doOnMouseMove, false);
            window.addEventListener(window.dhx4.dnd.evs.end, this._doOnMouseUp, false)
        } else {
            document.body.attachEvent("onmousemove", this._doOnMouseMove);
            document.body.attachEvent("onmouseup", this._doOnMouseUp)
        }
        d = null
    }
    ;
    this._onResize = function(g) {
        if (!this.conf.resize.active) {
            this._initResizeArea();
            this.conf.resize.active = true
        }
        if (this.conf.mode == "v") {
            var d = (g.type == "mousemove" ? g.clientX : (g.pageX || g.touches[0].pageX));
            var f = this.conf.resize.sx - d;
            this.conf.resize.nx = this.conf.resize.sep_x - f;
            if (this.conf.resize.nx > this.conf.resize.sep_x + this.conf.resize.min_wb) {
                this.conf.resize.nx = this.conf.resize.sep_x + this.conf.resize.min_wb
            } else {
                if (this.conf.resize.nx < this.conf.resize.sep_x - this.conf.resize.min_wa) {
                    this.conf.resize.nx = this.conf.resize.sep_x - this.conf.resize.min_wa
                }
            }
            this.r_sep.style.left = this.conf.resize.nx + "px"
        } else {
            var h = (g.type == "mousemove" ? g.clientY : (g.pageY || g.touches[0].pageY));
            var f = this.conf.resize.sy - h;
            this.conf.resize.ny = this.conf.resize.sep_y - f;
            if (this.conf.resize.ny > this.conf.resize.sep_y + this.conf.resize.min_hb) {
                this.conf.resize.ny = this.conf.resize.sep_y + this.conf.resize.min_hb
            } else {
                if (this.conf.resize.ny < this.conf.resize.sep_y - this.conf.resize.min_ha) {
                    this.conf.resize.ny = this.conf.resize.sep_y - this.conf.resize.min_ha
                }
            }
            this.r_sep.style.top = this.conf.resize.ny + "px"
        }
    }
    ;
    this._afterResize = function(l) {
        if (typeof (window.addEventListener) == "function") {
            window.removeEventListener("mousemove", this._doOnMouseMove, false);
            window.removeEventListener("mouseup", this._doOnMouseUp, false);
            window.removeEventListener(window.dhx4.dnd.evs.move, this._doOnMouseMove, false);
            window.removeEventListener(window.dhx4.dnd.evs.end, this._doOnMouseUp, false)
        } else {
            document.body.detachEvent("onmousemove", this._doOnMouseMove);
            document.body.detachEvent("onmouseup", this._doOnMouseUp)
        }
        if (!this.conf.resize.active) {
            this.conf.resize = null;
            return
        }
        if (l.type == window.dhx4.dnd.evs.end) {
            this.sep.className = this.sep.className.replace(/\s{0,}dhxlayout_sep_resize_actv/gi, "")
        } else {
            if (l.button !== this.conf.btn_left) {
                return
            }
        }
        var h = this._getLayout();
        var f = h._getMainInst();
        var i = (f.checkEvent("onPanelResizeFinish") == true ? {} : false);
        if (i !== false) {
            f.forEachItem(function(e) {
                i[e.conf.name] = {
                    w: e.conf.size.w,
                    h: e.conf.size.h
                };
                e = null
            })
        }
        var g = this.conf.resize.nx - this.conf.resize.sep_x;
        var d = this.conf.resize.ny - this.conf.resize.sep_y;
        h.cdata.a._setSize(h.cdata.a.conf.size.x, h.cdata.a.conf.size.y, h.cdata.a.conf.size.w + g, h.cdata.a.conf.size.h + d, "a");
        h.cdata.b._setSize(h.cdata.b.conf.size.x + g, h.cdata.b.conf.size.y + d, h.cdata.b.conf.size.w - g, h.cdata.b.conf.size.h - d, "b");
        this._setSize(parseInt(this.r_sep.style.left), parseInt(this.r_sep.style.top), parseInt(this.r_sep.style.width), parseInt(this.r_sep.style.height));
        if (window.dhx4.isIE) {
            var m = this;
            window.setTimeout(function() {
                m._removeResizeArea();
                m = null
            }, 1)
        } else {
            this._removeResizeArea()
        }
        if (i !== false) {
            var j = [];
            f.forEachItem(function(e) {
                var k = i[e.conf.name];
                if (!(k.w == e.conf.size.w && k.h == e.conf.size.h)) {
                    j.push(e.conf.name)
                }
                e = null
            });
            f._callMainEvent("onPanelResizeFinish", [j])
        }
        f = h = null;
        this.conf.resize.active = false;
        this.conf.resize = null;
        if (window.dhx4.dnd.p_en == true) {
            window.dhx4.dnd._touchOn()
        }
    }
    ;
    this._initResizeArea = function() {
        if (this.r_sep == null) {
            this.r_sep = document.createElement("DIV");
            this.r_sep.className = "dhxlayout_resize_sep";
            this.r_sep.style.left = this.sep.style.left;
            this.r_sep.style.top = this.sep.style.top;
            this.r_sep.style.width = this.sep.style.width;
            this.r_sep.style.height = this.sep.style.height;
            this.sep.parentNode.appendChild(this.r_sep);
            if (window.dhx4.isIE) {
                this.r_sep.onselectstart = function() {
                    return false
                }
            }
        }
        if (this.r_area == null) {
            this.r_area = document.createElement("DIV");
            this.r_area.className = "dhxlayout_resize_area";
            this.sep.parentNode.appendChild(this.r_area);
            if (window.dhx4.isIE) {
                this.r_area.onselectstart = function() {
                    return false
                }
            }
            if (this.conf.mode == "v") {
                var d = parseInt(this.r_sep.style.left) - this.conf.resize.min_wa;
                var g = parseInt(this.r_sep.style.top);
                var e = this.conf.resize.min_wa + this.conf.resize.min_wb + parseInt(this.r_sep.style.width);
                var f = parseInt(this.r_sep.style.height)
            } else {
                var d = parseInt(this.r_sep.style.left);
                var g = parseInt(this.r_sep.style.top) - this.conf.resize.min_ha;
                var e = parseInt(this.r_sep.style.width);
                var f = this.conf.resize.min_ha + this.conf.resize.min_hb + parseInt(this.r_sep.style.height)
            }
            this.r_area.style.left = d + "px";
            this.r_area.style.top = g + "px";
            if (!dhtmlXLayoutObject.prototype._confGlob.reszieCover) {
                dhtmlXLayoutObject.prototype._confGlob.reszieCover = {};
                this.r_area.style.width = e + "px";
                this.r_area.style.height = f + "px";
                dhtmlXLayoutObject.prototype._confGlob.reszieCover.w = parseInt(this.r_area.style.width) - this.r_area.offsetWidth;
                dhtmlXLayoutObject.prototype._confGlob.reszieCover.h = parseInt(this.r_area.style.height) - this.r_area.offsetHeight
            }
            this.r_area.style.width = e + dhtmlXLayoutObject.prototype._confGlob.reszieCover.w + "px";
            this.r_area.style.height = f + dhtmlXLayoutObject.prototype._confGlob.reszieCover.h + "px"
        }
        document.body.className += " dhxlayout_resize_" + this.conf.mode
    }
    ;
    this._removeResizeArea = function() {
        this.r_sep.onselectstart = null;
        this.r_sep.parentNode.removeChild(this.r_sep);
        this.r_sep = null;
        this.r_area.onselectstart = null;
        this.r_area.parentNode.removeChild(this.r_area);
        this.r_area = null;
        document.body.className = String(document.body.className).replace(/\s{0,}dhxlayout_resize_[vh]/gi, "")
    }
    ;
    this._doOnMouseDown = function(d) {
        d = d || event;
        if (d.preventDefault) {
            d.preventDefault()
        } else {
            d.cancelBubble = true
        }
        b._beforeResize(d)
    }
    ;
    this._doOnBodyMouseDown = function(d) {
        d = d || event;
        if (b.conf.resize == null) {
            return
        }
        if (b.conf.resize.active == true && d.button !== b.conf.btn_left) {
            if (d.preventDefault) {
                d.preventDefault()
            }
            d.returnValue = false;
            d.cancelBubble = true;
            return false
        }
    }
    ;
    this._doOnMouseMove = function(d) {
        d = d || event;
        if (d.preventDefault) {
            d.preventDefault()
        } else {
            d.cancelBubble = true
        }
        b._onResize(d)
    }
    ;
    this._doOnMouseUp = function(d) {
        d = d || event;
        if (d.type == "mouseup" && d.button !== b.conf.btn_left) {
            return
        }
        b._afterResize(d)
    }
    ;
    if (typeof (window.addEventListener) == "function") {
        this.sep.addEventListener("mousedown", this._doOnMouseDown, false);
        this.sep.addEventListener(window.dhx4.dnd.evs.start, this._doOnMouseDown, false);
        document.body.addEventListener("mousedown", this._doOnBodyMouseDown, false);
        document.body.addEventListener("contextmenu", this._doOnBodyMouseDown, false)
    } else {
        this.sep.attachEvent("onmousedown", this._doOnMouseDown);
        document.body.attachEvent("onmousedown", this._doOnBodyMouseDown);
        document.body.attachEvent("oncontextmenu", this._doOnBodyMouseDown)
    }
    this._unload = function() {
        if (typeof (window.addEventListener) == "function") {
            this.sep.removeEventListener("mousedown", this._doOnMouseDown, false);
            this.sep.removeEventListener(window.dhx4.dnd.evs.start, this._doOnMouseDown, false);
            document.body.removeEventListener("mousedown", this._doOnBodyMouseDown, false);
            document.body.removeEventListener("contextmenu", this._doOnBodyMouseDown, false)
        } else {
            this.sep.detachEvent("onmousedown", this._doOnMouseDown);
            document.body.detachEvent("onmousedown", this._doOnBodyMouseDown);
            document.body.detachEvent("oncontextmenu", this._doOnBodyMouseDown)
        }
        if (window.dhx4.isIE == true) {
            this.sep.onselectstart = null
        }
        this.sep.parentNode.removeChild(this.sep);
        this.sep = null;
        for (var d in this) {
            this[d] = null
        }
        b = null
    }
    ;
    return this
}
dhtmlXLayoutObject.prototype.setSeparatorSize = function(c, d) {
    if (typeof (c) == "number") {
        var e = this.setSeparatorSize({
            index: c,
            current: -1
        }, d);
        if (e.sep != null) {
            e.sep._setWH(d)
        }
        return
    }
    for (var b in this.cdata) {
        if (this.cdata[b].dataType == "layout" && this.cdata[b].dataNested == true && this.cdata[b].dataObj != null) {
            c = this.cdata[b].dataObj.setSeparatorSize(c, d);
            if (c.sep != null) {
                return c
            }
        }
        if (b == "a" && this.sep != null) {
            c.current++;
            if (c.index == c.current) {
                return {
                    sep: this.sep
                }
            }
        }
    }
    return c
}
;
window.dhtmlXLayoutCell = function(d, c) {
    dhtmlXCellObject.apply(this, [d, "_layout"]);
    var b = this;
    this.layout = c;
    this.conf.skin = this.layout.conf.skin;
    this.conf.mode = this.layout.conf.mode;
    this.conf.collapsed = false;
    this.conf.fixed = {
        w: false,
        h: false
    };
    this.conf.docked = true;
    if (this.conf.skin == "material") {
        this.conf.min_width = 42;
        this.conf.min_height = 26
    } else {
        this.conf.min_width = 26;
        this.conf.min_height = 26
    }
    this.attachEvent("_onCellUnload", function() {
        this.cell.childNodes[this.conf.idx.hdr].ondblclick = null;
        if (this.conf.mode != "c") {
            this.cell.childNodes[this.conf.idx.hdr].lastChild.onclick = null
        }
        this._unloadDocking();
        this.layout = null;
        b = null
    });
    this._hdrInit();
    this.cell.childNodes[this.conf.idx.hdr].ondblclick = function() {
        var e = b.layout._getMainInst();
        e._callMainEvent("onDblClick", [b.conf.name]);
        e = null
    }
    ;
    this.attachEvent("_onContentLoaded", function() {
        var e = this.layout._getMainInst();
        e._callMainEvent("onContentLoaded", [this.conf.name]);
        e = null
    });
    if (this.conf.mode != "c") {
        var a = document.createElement("DIV");
        a.className = "dhxlayout_arrow dhxlayout_arrow_" + this.conf.mode + this._idd;
        this.cell.childNodes[this.conf.idx.hdr].appendChild(a);
        a.onclick = function(f) {
            if (b.conf.collapsed) {
                b.expand()
            } else {
                b.collapse()
            }
        }
        ;
        a = null
    }
    this.attachEvent("_onBeforeContentAttach", function(e) {
        if (e == "tabbar" || e == "layout" || e == "acc") {
            this._hideBorders()
        }
        if (e == "sidebar" && this.conf.skin != "dhx_skyblue" && this.conf.skin != "dhx_terrace") {
            this._hideBorders();
            this.showHeader()
        }
    });
    this._initDocking();
    return this
}
;
dhtmlXLayoutCell.prototype = new dhtmlXCellObject();
dhtmlXLayoutCell.prototype.getId = function() {
    return this.conf.name
}
;
dhtmlXLayoutCell.prototype._initDocking = function() {
    var a = this;
    this.dock = function() {
        var c = this.layout._getMainInst();
        if (c.dhxWins == null || this.conf.docked) {
            c = null;
            return
        }
        var b = c.dhxWins.window(this.conf.name);
        b.close();
        this._attachFromCell(b);
        this.conf.docked = true;
        if (!this.conf.dock_collapsed) {
            this.expand()
        }
        c._callMainEvent("onDock", [this.conf.name]);
        c = b = null
    }
    ;
    this.undock = function(b, g, e, f) {
        var d = this.layout._getMainInst();
        if (d.dhxWins == null || this.conf.docked == false) {
            d = null;
            return
        }
        this.conf.dock_collapsed = this.conf.collapsed;
        if (!this.conf.collapsed) {
            this.collapse()
        }
        if (d.dhxWins.window(this.conf.name) != null) {
            var c = d.dhxWins.window(this.conf.name);
            c.show()
        } else {
            if (b == null) {
                b = 20
            }
            if (g == null) {
                g = 20
            }
            if (e == null) {
                e = 320
            }
            if (f == null) {
                f = 200
            }
            var c = d.dhxWins.createWindow(this.conf.name, b, g, e, f);
            c.button("close").hide();
            c.addUserButton("dock", 99, "Dock");
            c.button("dock").show();
            c.button("dock").attachEvent("onClick", this._doOnDockClick);
            c.setText(this.getText());
            c.attachEvent("onClose", this._doOnDockWinClose)
        }
        this.conf.docked = false;
        c._attachFromCell(this);
        d._callMainEvent("onUnDock", [this.conf.name]);
        d = c = null
    }
    ;
    this._doOnDockClick = function() {
        a.dock()
    }
    ;
    this._doOnDockWinClose = function(b) {
        b.hide();
        return false
    }
    ;
    this._unloadDocking = function() {
        a = null
    }
}
;
dhtmlXLayoutCell.prototype._hdrInit = function() {
    var b = "";
    if (window.dhx4.isIE) {
        if (navigator.userAgent.indexOf("MSIE 9.0") != -1) {
            b = " dhx_cell_hdr_text_ie9"
        } else {
            if (window.dhx4.isIE8) {
                b = " dhx_cell_hdr_text_ie8"
            } else {
                if (window.dhx4.isIE7) {
                    b = " dhx_cell_hdr_text_ie7"
                } else {
                    if (window.dhx4.isIE6) {
                        b = " dhx_cell_hdr_text_ie6"
                    }
                }
            }
        }
    } else {
        if (window.dhx4.isChrome || window.dhx4.isKHTML) {
            b = " dhx_cell_hdr_text_chrome"
        }
    }
    var a = document.createElement("DIV");
    a.className = "dhx_cell_hdr";
    a.innerHTML = "<div class='dhx_cell_hdr_text" + b + "'></div>";
    this.cell.insertBefore(a, this.cell.childNodes[this.conf.idx.cont]);
    a = null;
    this.conf.ofs_nodes.t._getHdrHeight = "func";
    this.conf.hdr = {
        visible: true
    };
    this.conf.idx_data.hdr = "dhx_cell_hdr";
    this._updateIdx();
    this.attachEvent("_onSetSize", this._hdrOnSetSize);
    this.attachEvent("_onBorderChange", this._hdrOnBorderChange);
    this.attachEvent("_onViewSave", this._hdrOnViewSave);
    this.attachEvent("_onViewRestore", this._hdrOnViewRestore)
}
;
dhtmlXLayoutCell.prototype.showHeader = function(a) {
    if (this.conf.hdr.visible || this.conf.collapsed) {
        return
    }
    if (this.conf.hdr.w_saved > this._getAvailWidth() || this.conf.hdr.h_saved > this._getAvailHeight()) {
        return
    }
    this.conf.hdr.w_saved = this.conf.hdr.h_saved = null;
    this.conf.hdr.visible = true;
    this.cell.childNodes[this.conf.idx.hdr].className = "dhx_cell_hdr";
    if (a !== true) {
        this._adjustCont(this._idd)
    }
}
;
dhtmlXLayoutCell.prototype.hideHeader = function(a) {
    if (!this.conf.hdr.visible || this.conf.collapsed) {
        return
    }
    this.conf.hdr.w_saved = this._getMinWidth(this._idd);
    this.conf.hdr.h_saved = this._getMinHeight(this._idd);
    this.conf.hdr.visible = false;
    this.cell.childNodes[this.conf.idx.hdr].className = "dhx_cell_hdr dhx_cell_hdr_hidden";
    this._hdrUpdBorder();
    this._mtbUpdBorder();
    if (a !== true) {
        this._adjustCont(this._idd)
    }
}
;
dhtmlXLayoutCell.prototype.isHeaderVisible = function() {
    return ( this.conf.hdr.visible == true)
}
;
dhtmlXLayoutCell.prototype.showArrow = function() {
    this.cell.childNodes[this.conf.idx.hdr].childNodes[1].style.display = ""
}
;
dhtmlXLayoutCell.prototype.hideArrow = function() {
    this.cell.childNodes[this.conf.idx.hdr].childNodes[1].style.display = "none"
}
;
dhtmlXLayoutCell.prototype.isArrowVisible = function() {
    return ( this.cell.childNodes[this.conf.idx.hdr].childNodes[1].style.display == "")
}
;
dhtmlXLayoutCell.prototype.setText = function(a) {
    this.conf.hdr.text = a;
    this._hdrUpdText()
}
;
dhtmlXLayoutCell.prototype.getText = function() {
    return this.conf.hdr.text
}
;
dhtmlXLayoutCell.prototype.setCollapsedText = function(a) {
    this.conf.hdr.text_collapsed = a;
    this._hdrUpdText()
}
;
dhtmlXLayoutCell.prototype.getCollapsedText = function() {
    return ( this.conf.hdr.text_collapsed != null ? this.conf.hdr.text_collapsed : this.conf.hdr.text)
}
;
dhtmlXLayoutCell.prototype._hdrUpdText = function() {
    var a = (this.conf.collapsed == true && this.conf.hdr.text_collapsed != null ? this.conf.hdr.text_collapsed : this.conf.hdr.text);
    this.cell.childNodes[this.conf.idx.hdr].firstChild.innerHTML = "<span>" + a + "</span>"
}
;
dhtmlXLayoutCell.prototype._hdrUpdBorder = function() {
    if (this.conf.borders == true) {
        this.cell.childNodes[this.conf.idx.hdr].className = "dhx_cell_hdr" + (this.conf.hdr.visible ? "" : " dhx_cell_hdr_hidden")
    } else {
        if (!this.conf.hdr.visible) {
            this.cell.childNodes[this.conf.idx.hdr].className = "dhx_cell_hdr dhx_cell_hdr_hidden_no_borders"
        }
    }
}
;
dhtmlXLayoutCell.prototype._hdrOnSetSize = function() {
    if (this.conf.collapsed && this.conf.mode == "v") {
        this._fitHdr()
    }
}
;
dhtmlXLayoutCell.prototype._hdrOnBorderChange = function() {
    this.hideHeader(true);
    this._hdrUpdBorder()
}
;
dhtmlXLayoutCell.prototype._hdrOnViewSave = function(a) {
    this.views[a].hdr_vis = this.conf.hdr.visible
}
;
dhtmlXLayoutCell.prototype._hdrOnViewRestore = function(a) {
    if (this.conf.hdr.visible != this.views[a].hdr_vis) {
        this[this.views[a].hdr_vis ? "showHeader" : "hideHeader"](true)
    }
    this.views[a].hdr_vis = null;
    delete this.views[a].hdr_vis
}
;
dhtmlXLayoutCell.prototype._getHdrHeight = function(a) {
    if (this.conf.collapsed && this.conf.mode == "v" && a !== true) {
        return 27
    }
    return this.cell.childNodes[this.conf.idx.hdr].offsetHeight
}
;
dhtmlXLayoutCell.prototype._fitHdr = function() {
    var b = this.cell.childNodes[this.conf.idx.hdr];
    if (this.conf.collapsed == true) {
        if (typeof (dhtmlXLayoutObject.prototype._confGlob.hdrColH) == "undefined") {
            b.style.height = this.cell.offsetHeight + "px";
            dhtmlXLayoutObject.prototype._confGlob.hdrColH = parseInt(b.style.height) - this._getHdrHeight(true)
        }
        var a = this.cell.offsetHeight + dhtmlXLayoutObject.prototype._confGlob.hdrColH;
        b.style.height = a + "px";
        b.firstChild.style.width = a - 39 + "px"
    } else {
        b.firstChild.style.width = b.style.height = null
    }
    b = null
}
;
dhtmlXLayoutCell.prototype.expand = function(g) {
    if (!this.conf.collapsed) {
        return true
    }
    var c = this.layout;
    if (this.conf.mode == "v") {
        var f = (g ? c.conf.hh : c.cdata[c.conf.nextCell[this._idd]]._getMinWidth(this._idd));
        var d = c.cont.offsetWidth - c.conf.sw;
        if (f + this.conf.size.w_avl > d) {
            c = null;
            return false
        }
    } else {
        var e = (g ? c.conf.hh : c.cdata[c.conf.nextCell[this._idd]]._getMinHeight(this._idd) + c.cdata[c.conf.nextCell[this._idd]]._getHdrHeight());
        var b = c.cont.offsetHeight - c.conf.sw;
        if (e + this.conf.size.h_avl > b) {
            c = null;
            return false
        }
    }
    if (this.conf.docked == false) {
        this.dock();
        return
    }
    if (this.conf.hdr.visible == false) {
        this.cell.childNodes[this.conf.idx.hdr].className = "dhx_cell_hdr dhx_cell_hdr_hidden";
        this._hdrUpdBorder()
    }
    this.cell.className = String(this.cell.className).replace(/\s{0,}dhxlayout_collapsed_[hv]/gi, "");
    this.conf.collapsed = false;
    if (this.conf.mode == "v") {
        this.conf.size.w = Math.min(d - f, this.conf.size.w_saved);
        this.conf.size.w_saved = this.conf.size.w_avl = null
    } else {
        this.conf.size.h = Math.min(b - e, this.conf.size.h_saved);
        this.conf.size.h_saved = this.conf.size.h_avl = null
    }
    if (this.conf.mode == "v") {
        this._fitHdr()
    }
    c.setSizes(c.conf.nextCell[this._idd], c.conf.nextCell[this._idd], g == true, "expand");
    c.sep._blockSep();
    c = null;
    this._hdrUpdText();
    var a = this.layout._getMainInst();
    a._callMainEvent("onExpand", [this.conf.name]);
    a = null;
    return true
}
;
dhtmlXLayoutCell.prototype.collapse = function() {
    if (this.conf.collapsed) {
        return false
    }
    var b = this.layout;
    if (b.cdata[b.conf.nextCell[this._idd]].expand(true) == false) {
        return false
    }
    if (this.conf.mode == "v") {
        this.conf.size.w_saved = this.conf.size.w;
        this.conf.size.w_avl = this._getMinWidth(this._idd)
    } else {
        this.conf.size.h_saved = this.conf.size.h;
        this.conf.size.h_avl = this._getMinHeight(this._idd) + this._getHdrHeight()
    }
    if (this.conf.hdr.visible == false) {
        this.cell.childNodes[this.conf.idx.hdr].className = "dhx_cell_hdr"
    }
    this.cell.className += " dhxlayout_collapsed_" + this.conf.mode;
    this.conf.collapsed = true;
    if (this.conf.mode == "v") {
        this.conf.size.w = b.conf.hh
    } else {
        this.conf.size.h = this._getHdrHeight()
    }
    b.setSizes(b.conf.nextCell[this._idd], b.conf.nextCell[this._idd], false, "collapse");
    b.sep._blockSep();
    b = null;
    this._hdrUpdText();
    var a = this.layout._getMainInst();
    a._callMainEvent("onCollapse", [this.conf.name]);
    a = null;
    return true
}
;
dhtmlXLayoutCell.prototype.isCollapsed = function() {
    return ( this.conf.collapsed == true)
}
;
dhtmlXLayoutCell.prototype.setMinWidth = function(a) {
    this.conf.min_width = parseInt(a) || 0
}
;
dhtmlXLayoutCell.prototype.setMinHeight = function(a) {
    this.conf.min_height = parseInt(a) || 0
}
;
dhtmlXLayoutCell.prototype._getMinWidth = function(b) {
    if (this.dataType == "layout" && this.dataObj != null) {
        if (this.layout._getMainInst() != this.dataObj._getMainInst()) {
            return this.dataObj._getAvailWidth()
        }
        if (this.dataObj.conf.pattern == "1C") {
            return Math.max(this.conf.min_width, this.dataObj.cdata.a._getMinWidth(b))
        } else {
            if (this.dataObj.conf.mode == "v") {
                var a = b || this._idd;
                if (this.dataObj.cdata[a].conf.collapsed) {
                    a = this.dataObj.conf.nextCell[a]
                }
                return Math.max(this.conf.min_width, this.dataObj.cdata[a]._getMinWidth(b) + this.dataObj.cdata[this.dataObj.conf.nextCell[a]]._getWidth() + this.dataObj.conf.sw)
            } else {
                return Math.max(this.conf.min_width, this.dataObj.cdata.a._getMinWidth(b), this.dataObj.cdata.b._getMinWidth(b))
            }
        }
    }
    return Math.max(this.conf.min_width, 1)
}
;
dhtmlXLayoutCell.prototype._getMinHeight = function(c) {
    var b = 0;
    if (this.conf.idx.menu != null) {
        b += this.cell.childNodes[this.conf.idx.menu].offsetHeight
    }
    if (this.dataType == "layout" && this.dataObj != null) {
        if (this.layout._getMainInst() != this.dataObj._getMainInst()) {
            return this.dataObj._getAvailHeight()
        }
        if (this.dataObj.conf.pattern == "1C") {
            return Math.max(this.conf.min_height, this.dataObj.cdata.a._getMinHeight(c))
        } else {
            if (this.dataObj.conf.mode == "h") {
                var a = c;
                if (this.dataObj.cdata[a].conf.collapsed) {
                    a = this.dataObj.conf.nextCell[a]
                }
                return Math.max(this.conf.min_height, this.dataObj.cdata[a]._getMinHeight(c) + this.dataObj.cdata[a]._getHdrHeight() + this.dataObj.cdata[this.dataObj.conf.nextCell[a]]._getHeight() + this.dataObj.conf.sw)
            } else {
                return Math.max(this.conf.min_height, this.dataObj.cdata.a._getMinHeight(c) + this.dataObj.cdata.a._getHdrHeight(), this.dataObj.cdata.b._getMinHeight(c) + this.dataObj.cdata.b._getHdrHeight())
            }
        }
    }
    return Math.max(this.conf.min_height, b)
}
;
dhtmlXLayoutCell.prototype._getAvailWidth = function(c) {
    if (this.dataType == "layout" && this.dataObj != null) {
        if (this.dataObj.conf.pattern == "1C") {
            return this.dataObj.cdata.a._getAvailWidth(c)
        } else {
            if (this.dataObj.conf.mode == "v") {
                var a = (this.dataObj.cdata.a.conf.collapsed == true);
                var b = (this.dataObj.cdata.b.conf.collapsed == true);
                if (c == "a") {
                    return this.dataObj.cdata[b ? "a" : "b"]._getAvailWidth(c)
                } else {
                    return this.dataObj.cdata[a ? "b" : "a"]._getAvailWidth(c)
                }
            } else {
                return Math.min(this.dataObj.cdata.a._getAvailWidth(c), this.dataObj.cdata.b._getAvailWidth(c))
            }
        }
    }
    return this.cell.offsetWidth - this._getMinWidth()
}
;
dhtmlXLayoutCell.prototype._getAvailHeight = function(d) {
    if (this.dataType == "layout" && this.dataObj != null) {
        if (this.dataObj.conf.pattern == "1C") {
            return this.dataObj.cdata.a._getAvailHeight(d)
        } else {
            if (this.dataObj.conf.mode == "h") {
                var b = (this.dataObj.cdata.a.conf.collapsed == true);
                var c = (this.dataObj.cdata.b.conf.collapsed == true);
                if (d == "a") {
                    return this.dataObj.cdata[c ? "a" : "b"]._getAvailHeight(d)
                } else {
                    return this.dataObj.cdata[b ? "b" : "a"]._getAvailHeight(d)
                }
            } else {
                return Math.min(this.dataObj.cdata.a._getAvailHeight(d), this.dataObj.cdata.b._getAvailHeight(d))
            }
        }
    }
    var a = this._getHdrHeight();
    if (this.conf.mode == "v" && this.conf.collapsed) {
        a = this.conf.hh
    }
    return this.cell.offsetHeight - a - this._getMinHeight()
}
;
dhtmlXLayoutCell.prototype.setWidth = function(d) {
    if (this.conf.mode == "v") {
        if (this.conf.collapsed) {
            return
        }
        var e = this.layout;
        var f = e.cdata[e.conf.nextCell[this._idd]];
        if (f.conf.collapsed) {
            d = d + e.conf.sw + f._getWidth();
            g = e = f = null;
            return
        }
        var c = this._getMinWidth(this._idd);
        var h = e.cont.offsetWidth - f._getMinWidth(this._idd) - e.conf.sw;
        d = Math.max(c, Math.min(d, h));
        this.conf.size.w = d;
        e.setSizes(f._idd, f._idd);
        e = f = null
    } else {
        if (this.layout == null || this.layout.parentLayout == null) {
            return
        }
        var g = this.layout.parentLayout;
        var e = this.layout;
        var f = e.cdata[e.conf.nextCell[this._idd]];
        for (var b in g.cdata) {
            if (g.cdata[b].dataObj == e) {
                g.cdata[b].setWidth(d)
            }
        }
        g = e = null
    }
}
;
dhtmlXLayoutCell.prototype.setHeight = function(g) {
    if (this.conf.mode == "h") {
        if (this.conf.collapsed) {
            return
        }
        var d = this.layout;
        var f = d.cdata[d.conf.nextCell[this._idd]];
        if (f.conf.collapsed) {
            g = g + d.conf.sw + f._getHeight();
            var i = (this.layout != null && this.layout.parentLayout != null ? this.layout.parentLayout : null);
            if (i != null) {
                for (var b in i.cdata) {
                    if (i.cdata[b].dataObj == d) {
                        i.cdata[b].setHeight(g)
                    }
                }
            }
            i = d = f = null;
            return
        }
        var e = this._getMinHeight(this._idd) + this._getHdrHeight();
        var c = d.cont.offsetHeight - f._getMinHeight(this._idd) - f._getHdrHeight() - d.conf.sw;
        g = Math.max(e, Math.min(g, c));
        this.conf.size.h = g;
        d.setSizes(f._idd, f._idd);
        d = f = null
    } else {
        if (this.layout == null || this.layout.parentLayout == null) {
            return
        }
        var i = this.layout.parentLayout;
        var d = this.layout;
        var f = d.cdata[d.conf.nextCell[this._idd]];
        for (var b in i.cdata) {
            if (i.cdata[b].dataObj == d) {
                i.cdata[b].setHeight(g)
            }
        }
        i = d = null
    }
}
;
dhtmlXLayoutCell.prototype.getWidth = function() {
    return this.conf.size.w
}
;
dhtmlXLayoutCell.prototype.getHeight = function() {
    return this.conf.size.h
}
;
dhtmlXLayoutCell.prototype.fixSize = function(b, d) {
    this.conf.fixed.w = window.dhx4.s2b(b);
    this.conf.fixed.h = window.dhx4.s2b(d);
    var a = this.layout._getMainInst();
    var c = {};
    a.forEachItem(function(e) {
        if (e.conf.fsize != null) {
            var i = e.getId();
            var h = {
                h: (e.conf.fixed.w == true),
                v: (e.conf.fixed.h == true)
            };
            for (var f in h) {
                if (h[f] == true && e.conf.fsize[f] != null) {
                    if (!(e.conf.fsize[f]instanceof Array)) {
                        e.conf.fsize[f] = [e.conf.fsize[f]]
                    }
                    for (var g = 0; g < e.conf.fsize[f].length; g++) {
                        c[e.conf.fsize[f][g]] = true
                    }
                }
            }
        }
        e = null
    });
    a._forEachSep(function(e) {
        e._lockSep(c[e.conf.idx] == true);
        e = null
    });
    a = null
}
;
dhtmlXCellObject.prototype.attachLayout = function(a) {
    this.callEvent("_onBeforeContentAttach", ["layout"]);
    var b = document.createElement("DIV");
    b.style.width = "100%";
    b.style.height = "100%";
    b.style.position = "relative";
    b.style.overflow = "hidden";
    this._attachObject(b);
    if (typeof (this._layoutMainInst) != "undefined") {
        b._layoutMainInst = this._layoutMainInst
    }
    if (typeof (window.dhtmlXLayoutCell) == "function" && this instanceof window.dhtmlXLayoutCell) {
        b._isParentCell = true;
        if (this.conf.skin == "material" && String(this.cell.className).match(/dhx_cell_nested_layout/) == null) {
            this.cell.className += " dhx_cell_nested_layout"
        }
    }
    if (typeof (window.dhtmlXAccordionCell) == "function" && this instanceof window.dhtmlXAccordionCell) {
        if (this.conf.skin == "material") {
            b._ofs = {
                t: 14,
                r: 14,
                b: 14,
                l: 14
            }
        } else {
            b._ofs = {
                t: -1,
                r: -1,
                l: -1,
                b: -1
            }
        }
    }
    if (typeof (window.dhtmlXTabBarCell) == "function" && this instanceof window.dhtmlXTabBarCell) {
        if (this.conf.skin == "dhx_skyblue") {
            b._ofs = {
                t: -1,
                r: -1,
                b: -1,
                l: -1
            }
        }
        if (this.conf.skin == "material") {
            b._ofs = {
                t: 8,
                r: 8,
                b: 8,
                l: 8
            }
        }
    }
    if (typeof (window.dhtmlXSideBarCell) == "function" && this instanceof window.dhtmlXSideBarCell) {
        if (this.conf.skin == "dhx_web") {
            b._ofs = {
                l: 8
            };
            if (this.sidebar.conf.autohide == true) {
                b._ofs.l = 0
            }
            if (this.sidebar.conf.header == true) {
                b._ofs.t = 9
            }
        } else {
            if (this.conf.skin == "dhx_terrace") {
                b._ofs = {
                    l: 11
                };
                if (this.sidebar.conf.autohide == true) {
                    b._ofs.l = 0
                }
                if (this.sidebar.conf.header == true) {
                    b._ofs.t = 10
                }
            } else {
                b._ofs = {
                    l: -1
                }
            }
        }
    }
    if (typeof (window.dhtmlXCarouselCell) == "function" && this instanceof window.dhtmlXCarouselCell) {
        this._hideBorders()
    }
    if (typeof (window.dhtmlXWindowsCell) == "function" && this instanceof window.dhtmlXWindowsCell) {
        if (this.conf.skin == "material") {
            b._ofs = {
                t: 14,
                r: 14,
                b: 14,
                l: 14
            }
        }
    }
    if (typeof (a) == "string") {
        a = {
            pattern: a
        }
    }
    if (typeof (a.skin) == "undefined") {
        a.skin = this.conf.skin
    }
    a.parent = b;
    this.dataType = "layout";
    this.dataObj = new dhtmlXLayoutObject(a);
    if (this instanceof window.dhtmlXLayoutCell) {
        this.dataObj.parentLayout = this.layout
    }
    b._layoutMainInst = null;
    a.parent = null;
    b = a = null;
    this.callEvent("_onContentAttach", []);
    return this.dataObj
};