/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports"], function (require, exports) {
    'use strict';
    // Allow for running under nodejs/requirejs in tests
    var _monaco = (typeof monaco === 'undefined' ? self.monaco : monaco);
    var EMPTY_ELEMENTS = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'];
    exports.conf = {
        wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)/g,
        comments: {
            blockComment: ['{{!--', '--}}']
        },
        brackets: [
            ['<!--', '-->'],
            ['{{', '}}'],
            ['<', '>'],
            ['{', '}'],
            ['(', ')']
        ],
        autoClosingPairs: [
            { open: '{', close: '}' },
            { open: '[', close: ']' },
            { open: '(', close: ')' },
            { open: '"', close: '"' },
            { open: '\'', close: '\'' }
        ],
        surroundingPairs: [
            { open: '<', close: '>' },
            { open: '"', close: '"' },
            { open: '\'', close: '\'' }
        ],
        onEnterRules: [
            {
                beforeText: new RegExp("<(?!(?:" + EMPTY_ELEMENTS.join('|') + "))(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$", 'i'),
                afterText: /^<\/(\w[\w\d]*)\s*>$/i,
                action: { indentAction: _monaco.languages.IndentAction.IndentOutdent }
            },
            {
                beforeText: new RegExp("<(?!(?:" + EMPTY_ELEMENTS.join('|') + "))(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$", 'i'),
                action: { indentAction: _monaco.languages.IndentAction.Indent }
            }
        ],
    };
    exports.htmlTokenTypes = {
        DELIM_START: 'delimiter.html',
        DELIM_END: 'delimiter.html',
        DELIM_COMMENT: 'comment.html',
        COMMENT: 'comment.content.html',
        getTag: function (name) {
            return 'tag.html';
        }
    };
    exports.language = {
        defaultToken: '',
        tokenPostfix: '',
        // ignoreCase: true,
        // The main tokenizer for our languages
        tokenizer: {
            root: [
                [/\{\{/, { token: '@rematch', switchTo: '@handlebarsInSimpleState.root' }],
                [/<!DOCTYPE/, 'metatag.html', '@doctype'],
                [/<!--/, 'comment.html', '@comment'],
                [/(<)(\w+)(\/>)/, [exports.htmlTokenTypes.DELIM_START, 'tag.html', exports.htmlTokenTypes.DELIM_END]],
                [/(<)(script)/, [exports.htmlTokenTypes.DELIM_START, { token: 'tag.html', next: '@script' }]],
                [/(<)(style)/, [exports.htmlTokenTypes.DELIM_START, { token: 'tag.html', next: '@style' }]],
                [/(<)([:\w]+)/, [exports.htmlTokenTypes.DELIM_START, { token: 'tag.html', next: '@otherTag' }]],
                [/(<\/)(\w+)/, [exports.htmlTokenTypes.DELIM_START, { token: 'tag.html', next: '@otherTag' }]],
                [/</, exports.htmlTokenTypes.DELIM_START],
                [/\{/, exports.htmlTokenTypes.DELIM_START],
                [/[^<{]+/] // text
            ],
            doctype: [
                [/\{\{/, { token: '@rematch', switchTo: '@handlebarsInSimpleState.comment' }],
                [/[^>]+/, 'metatag.content.html'],
                [/>/, 'metatag.html', '@pop'],
            ],
            comment: [
                [/\{\{/, { token: '@rematch', switchTo: '@handlebarsInSimpleState.comment' }],
                [/-->/, 'comment.html', '@pop'],
                [/[^-]+/, 'comment.content.html'],
                [/./, 'comment.content.html']
            ],
            otherTag: [
                [/\{\{/, { token: '@rematch', switchTo: '@handlebarsInSimpleState.otherTag' }],
                [/\/?>/, exports.htmlTokenTypes.DELIM_END, '@pop'],
                [/"([^"]*)"/, 'attribute.value'],
                [/'([^']*)'/, 'attribute.value'],
                [/[\w\-]+/, 'attribute.name'],
                [/=/, 'delimiter'],
                [/[ \t\r\n]+/],
            ],
            // -- BEGIN <script> tags handling
            // After <script
            script: [
                [/\{\{/, { token: '@rematch', switchTo: '@handlebarsInSimpleState.script' }],
                [/type/, 'attribute.name', '@scriptAfterType'],
                [/"([^"]*)"/, 'attribute.value'],
                [/'([^']*)'/, 'attribute.value'],
                [/[\w\-]+/, 'attribute.name'],
                [/=/, 'delimiter'],
                [/>/, { token: exports.htmlTokenTypes.DELIM_END, next: '@scriptEmbedded.text/javascript', nextEmbedded: 'text/javascript' }],
                [/[ \t\r\n]+/],
                [/(<\/)(script\s*)(>)/, [exports.htmlTokenTypes.DELIM_START, 'tag.html', { token: exports.htmlTokenTypes.DELIM_END, next: '@pop' }]]
            ],
            // After <script ... type
            scriptAfterType: [
                [/\{\{/, { token: '@rematch', switchTo: '@handlebarsInSimpleState.scriptAfterType' }],
                [/=/, 'delimiter', '@scriptAfterTypeEquals'],
                [/[ \t\r\n]+/],
                [/<\/script\s*>/, { token: '@rematch', next: '@pop' }]
            ],
            // After <script ... type =
            scriptAfterTypeEquals: [
                [/\{\{/, { token: '@rematch', switchTo: '@handlebarsInSimpleState.scriptAfterTypeEquals' }],
                [/"([^"]*)"/, { token: 'attribute.value', switchTo: '@scriptWithCustomType.$1' }],
                [/'([^']*)'/, { token: 'attribute.value', switchTo: '@scriptWithCustomType.$1' }],
                [/[ \t\r\n]+/],
                [/<\/script\s*>/, { token: '@rematch', next: '@pop' }]
            ],
            // After <script ... type = $S2
            scriptWithCustomType: [
                [/\{\{/, { token: '@rematch', switchTo: '@handlebarsInSimpleState.scriptWithCustomType.$S2' }],
                [/>/, { token: exports.htmlTokenTypes.DELIM_END, next: '@scriptEmbedded.$S2', nextEmbedded: '$S2' }],
                [/"([^"]*)"/, 'attribute.value'],
                [/'([^']*)'/, 'attribute.value'],
                [/[\w\-]+/, 'attribute.name'],
                [/=/, 'delimiter'],
                [/[ \t\r\n]+/],
                [/<\/script\s*>/, { token: '@rematch', next: '@pop' }]
            ],
            scriptEmbedded: [
                [/\{\{/, { token: '@rematch', switchTo: '@handlebarsInEmbeddedState.scriptEmbedded.$S2', nextEmbedded: '@pop' }],
                [/<\/script/, { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }]
            ],
            // -- END <script> tags handling
            // -- BEGIN <style> tags handling
            // After <style
            style: [
                [/\{\{/, { token: '@rematch', switchTo: '@handlebarsInSimpleState.style' }],
                [/type/, 'attribute.name', '@styleAfterType'],
                [/"([^"]*)"/, 'attribute.value'],
                [/'([^']*)'/, 'attribute.value'],
                [/[\w\-]+/, 'attribute.name'],
                [/=/, 'delimiter'],
                [/>/, { token: exports.htmlTokenTypes.DELIM_END, next: '@styleEmbedded.text/css', nextEmbedded: 'text/css' }],
                [/[ \t\r\n]+/],
                [/(<\/)(style\s*)(>)/, [exports.htmlTokenTypes.DELIM_START, 'tag.html', { token: exports.htmlTokenTypes.DELIM_END, next: '@pop' }]]
            ],
            // After <style ... type
            styleAfterType: [
                [/\{\{/, { token: '@rematch', switchTo: '@handlebarsInSimpleState.styleAfterType' }],
                [/=/, 'delimiter', '@styleAfterTypeEquals'],
                [/[ \t\r\n]+/],
                [/<\/style\s*>/, { token: '@rematch', next: '@pop' }]
            ],
            // After <style ... type =
            styleAfterTypeEquals: [
                [/\{\{/, { token: '@rematch', switchTo: '@handlebarsInSimpleState.styleAfterTypeEquals' }],
                [/"([^"]*)"/, { token: 'attribute.value', switchTo: '@styleWithCustomType.$1' }],
                [/'([^']*)'/, { token: 'attribute.value', switchTo: '@styleWithCustomType.$1' }],
                [/[ \t\r\n]+/],
                [/<\/style\s*>/, { token: '@rematch', next: '@pop' }]
            ],
            // After <style ... type = $S2
            styleWithCustomType: [
                [/\{\{/, { token: '@rematch', switchTo: '@handlebarsInSimpleState.styleWithCustomType.$S2' }],
                [/>/, { token: exports.htmlTokenTypes.DELIM_END, next: '@styleEmbedded.$S2', nextEmbedded: '$S2' }],
                [/"([^"]*)"/, 'attribute.value'],
                [/'([^']*)'/, 'attribute.value'],
                [/[\w\-]+/, 'attribute.name'],
                [/=/, 'delimiter'],
                [/[ \t\r\n]+/],
                [/<\/style\s*>/, { token: '@rematch', next: '@pop' }]
            ],
            styleEmbedded: [
                [/\{\{/, { token: '@rematch', switchTo: '@handlebarsInEmbeddedState.styleEmbedded.$S2', nextEmbedded: '@pop' }],
                [/<\/style/, { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }]
            ],
            // -- END <style> tags handling
            handlebarsInSimpleState: [
                [/\{\{\{?/, 'delimiter.handlebars'],
                [/\}\}\}?/, { token: 'delimiter.handlebars', switchTo: '@$S2.$S3' }],
                { include: 'handlebarsRoot' }
            ],
            handlebarsInEmbeddedState: [
                [/\{\{\{?/, 'delimiter.handlebars'],
                [/\}\}\}?/, { token: 'delimiter.handlebars', switchTo: '@$S2.$S3', nextEmbedded: '$S3' }],
                { include: 'handlebarsRoot' }
            ],
            handlebarsRoot: [
                [/[#/][^\s}]+/, 'keyword.helper.handlebars'],
                [/else\b/, 'keyword.helper.handlebars'],
                [/[\s]+/],
                [/[^}]/, 'variable.parameter.handlebars'],
            ],
        },
    };
});
