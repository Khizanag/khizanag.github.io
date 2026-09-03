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

    // ---- Image URL Safety ----

    function isSafeImageUrl(url) {
        try {
            return new URL(url).protocol === 'https:';
        } catch (e) {
            return false;
        }
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

    // ---- Date Helpers ----

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
        isSafeImageUrl: isSafeImageUrl,
        storageGet: storageGet,
        storageSet: storageSet,
        formatDate: formatDate,
        formatDateLong: formatDateLong,
        debounce: debounce,
        logError: logError,
        ratingColor: ratingColor,
    };
})();
