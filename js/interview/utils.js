/**
 * Shared utility functions used across all interview modules.
 * Load this script before any module that needs these helpers.
 */
var InterviewUtils = (function () {
    'use strict';

    // ---- HTML Escaping ----

    function escapeHtml(text) {
        if (!text) return '';
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // ---- LocalStorage Helpers ----

    function storageGet(key, fallback) {
        try {
            var raw = localStorage.getItem(key);
            if (raw === null) return fallback;
            return JSON.parse(raw);
        } catch (e) {
            logError('storageGet', e);
            return fallback;
        }
    }

    function storageSet(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            logError('storageSet', e);
        }
    }

    function storageGetRaw(key, fallback) {
        try {
            var val = localStorage.getItem(key);
            return val !== null ? val : fallback;
        } catch (e) {
            logError('storageGetRaw', e);
            return fallback;
        }
    }

    function storageSetRaw(key, value) {
        try {
            localStorage.setItem(key, String(value));
        } catch (e) {
            logError('storageSetRaw', e);
        }
    }

    // ---- Date Helpers ----

    function todayISO() {
        return new Date().toISOString().slice(0, 10);
    }

    function yesterdayISO() {
        var d = new Date();
        d.setDate(d.getDate() - 1);
        return d.toISOString().slice(0, 10);
    }

    function formatDate(isoString, options) {
        if (!isoString) return '';
        var defaults = { month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(isoString).toLocaleDateString('en-US', options || defaults);
    }

    function formatDateLong(isoString) {
        return formatDate(isoString, {
            weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
        });
    }

    // ---- Theme Toggle ----

    var THEME_KEY = 'ios-interview-theme';

    function initThemeToggle(buttonId) {
        var btn = document.getElementById(buttonId || 'btnTheme');
        if (!btn) return;
        btn.addEventListener('click', function () {
            var isLight = document.documentElement.classList.toggle('theme-light');
            storageSetRaw(THEME_KEY, isLight ? 'light' : 'dark');
        });
    }

    // ---- Debounce ----

    function debounce(fn, delay) {
        var timer = null;
        return function () {
            var ctx = this;
            var args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () { fn.apply(ctx, args); }, delay);
        };
    }

    // ---- Error Logging ----

    var _errors = [];

    function logError(context, error) {
        var entry = {
            context: context,
            message: error ? (error.message || String(error)) : 'Unknown error',
            timestamp: new Date().toISOString(),
        };
        _errors.push(entry);
        if (_errors.length > 100) _errors.shift();
        if (typeof console !== 'undefined' && console.warn) {
            console.warn('[Interview] ' + context + ':', entry.message);
        }
    }

    function getErrors() {
        return _errors.slice();
    }

    // ---- Unique ID ----

    function generateId() {
        return Date.now() + '-' + Math.random().toString(36).substr(2, 6);
    }

    // ---- Rating Color ----

    function ratingColor(avg) {
        if (avg >= 4.0) return '#30d158';
        if (avg >= 3.0) return '#ff9f0a';
        if (avg >= 2.0) return '#ff375f';
        return '#86868b';
    }

    // ---- Public API ----

    return {
        escapeHtml: escapeHtml,
        storageGet: storageGet,
        storageSet: storageSet,
        storageGetRaw: storageGetRaw,
        storageSetRaw: storageSetRaw,
        todayISO: todayISO,
        yesterdayISO: yesterdayISO,
        formatDate: formatDate,
        formatDateLong: formatDateLong,
        initThemeToggle: initThemeToggle,
        debounce: debounce,
        logError: logError,
        getErrors: getErrors,
        generateId: generateId,
        ratingColor: ratingColor,
    };
})();
