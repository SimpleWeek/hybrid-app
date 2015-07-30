'use strict';
/*global Autolinker */
angular.module('Simpleweek.services')

  .factory('Micromarkdown', function () {
    var micromarkdown = {
        useajax: false,
        regexobject: {
            headline: /^(\#{1,6})([^\#\n]+)$/m,
            code: /\s\`\`\`\n?([^`]+)\`\`\`/g,
            hr: /^(?:([\*\-_] ?)+)\1\1$/gm,
            lists: /^((\s*((\*|\-)|\d(\.|\))) [^\n]+)\n)+/gm,
            bolditalic: /(?:([\*_~]{1,3}))([^\*_~\n]+[^\*_~\s])\1/g,
            links: /\[([^\]<>]+)\]\(([^ \)<>]+)( "[^\(\)\"]+")?\)/g,
            reflinks: /\[([^\]]+)\]\[([^\]]+)\]/g,
            smlinks: /\@([a-z0-9]{3,})\@(t|gh|fb|gp|adn)/gi,
            mail: /<(([a-z0-9_\-\.])+\@([a-z0-9_\-\.])+\.([a-z]{2,7}))>/gmi,
            tables: /\n(([^|\n]+ *\| *)+([^|\n]+\n))((:?\-+:?\|)+(:?\-+:?)*\n)((([^|\n]+ *\| *)+([^|\n]+)\n)+)/g,
            include: /[\[<]include (\S+) from (https?:\/\/[a-z0-9\.\-]+\.[a-z]{2,9}[a-z0-9\.\-\?\&\/]+)[\]>]/gi,
            url: /<([a-zA-Z0-9@:%_\+.~#?&\/\/=]{2,256}\.[a-z]{2,4}\b(\/[\-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?)>/g
        },
        parse: function (str, strict) {
            var helper,
                helper1,
                repstr,
                stra,
                trashgc = [],
                i = 0,
            str = this.htmlEncode(str);

            if (strict !== true) {
                micromarkdown.regexobject.lists = /^((\s*(\*|\d\.) [^\n]+)\n)+/gm;
            }

            /* bold and italic */
            for (i = 0; i < 3; i++) {
                while ((stra = micromarkdown.regexobject.bolditalic.exec(str)) !== null) {
                    repstr = [];
                    if (stra[1] === '~~') {

                    } else {
                        switch (stra[1].length) {
                            case 1:
                                repstr = ['<em>', '</em>'];
                                break;
                            case 2:
                                repstr = ['<strong>', '</strong>'];
                                break;
                            case 3:
                                repstr = ['<em><b>', '</b></em>'];
                                break;
                        }
                        str = str.replace(stra[0], repstr[0] + stra[2] + repstr[1]);
                    }
                }
            }

            /* links */
            while ((stra = micromarkdown.regexobject.links.exec(str)) !== null) {
                    str = str.replace(stra[0], '<a ' + micromarkdown.mmdCSSclass(stra[2], strict) + 'href="' + stra[2] + '">' + stra[1] + '</a>\n');
            }
            while ((stra = micromarkdown.regexobject.mail.exec(str)) !== null) {
                str = str.replace(stra[0], '<a href="mailto:' + stra[1] + '">' + stra[1] + '</a>');
            }
            while ((stra = micromarkdown.regexobject.url.exec(str)) !== null) {
                repstr = stra[1];
                if (repstr.indexOf('://') === -1) {
                    repstr = 'http://' + repstr;
                }
                str = str.replace(stra[0], '<a ' + micromarkdown.mmdCSSclass(repstr, strict) + 'href="' + repstr + '">' + repstr.replace(/(https:\/\/|http:\/\/|mailto:|ftp:\/\/)/gmi, '') + '</a>');
            }
            while ((stra = micromarkdown.regexobject.reflinks.exec(str)) !== null) {
                helper1 = new RegExp('\\[' + stra[2] + '\\]: ?([^ \n]+)', 'gi');
                if ((helper = helper1.exec(str)) !== null) {
                    str = str.replace(stra[0], '<a ' + micromarkdown.mmdCSSclass(helper[1], strict) + 'href="' + helper[1] + '">' + stra[1] + '</a>');
                    trashgc.push(helper[0]);
                }
            }
            for (i = 0; i < trashgc.length; i++) {
                str = str.replace(trashgc[i], '');
            }

            str = str.replace(/ {2,}[\n]{1,}/gmi, '<br/><br/>');

            return Autolinker.link(str, {stripPrefix: false, newWindow: false, email: false, phone: false, twitter: false, hashtag: false});
        },
        ajax: function () {
        },
        countingChars: function (str, split) {
            str = str.split(split);
            if (typeof str === 'object') {
                return str.length - 1;
            }
            return 0;
        },
        htmlEncode: function (str) {
            var div = document.createElement('div');
            div.appendChild(document.createTextNode(str));
            str = div.innerHTML;
            div = undefined;
            return str;
        },
        mmdCSSclass: function () {
            return '';
        }
    };

    return micromarkdown;
  });
