(function (App) {
    'use strict';

    App.highlightSwift = function (code) {
        var html = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        html = html.replace(/(\/\/.*)/g, '<span class="cmt">$1</span>');
        html = html.replace(/("(?:[^"\\]|\\.)*")/g, '<span class="str">$1</span>');
        html = html.replace(/\b(\d+\.?\d*)\b/g, '<span class="num">$1</span>');
        html = html.replace(/@(escaping|autoclosure|MainActor|Published|State|Observable)\b/g, '<span class="kw">@$1</span>');

        var keywords = [
            'func', 'var', 'let', 'class', 'struct', 'enum', 'protocol', 'extension',
            'if', 'else', 'guard', 'switch', 'case', 'default', 'for', 'in', 'while', 'repeat',
            'return', 'throw', 'throws', 'try', 'catch', 'do', 'break', 'continue', 'fallthrough',
            'import', 'typealias', 'associatedtype', 'init', 'deinit', 'self', 'Self',
            'true', 'false', 'nil', 'super', 'where', 'is', 'as',
            'private', 'fileprivate', 'internal', 'public', 'open', 'static', 'final',
            'override', 'mutating', 'nonmutating', 'lazy', 'weak', 'unowned',
            'optional', 'required', 'convenience', 'indirect',
            'async', 'await', 'actor', 'nonisolated', 'isolated',
            'some', 'any', 'inout', 'defer', 'willSet', 'didSet', 'get', 'set',
        ];
        html = html.replace(
            new RegExp('(?<!["\'].*?)\\b(' + keywords.join('|') + ')\\b(?![^<]*>)', 'g'),
            '<span class="kw">$1</span>'
        );

        html = html.replace(/(?<!["\'].*?)(?<!class="[^"]*)\b([A-Z][a-zA-Z0-9]*)\b(?![^<]*>)/g, '<span class="type">$1</span>');
        html = html.replace(/\b(print)\b(?![^<]*>)/g, '<span class="call">$1</span>');

        return html;
    };

})(InterviewApp);
