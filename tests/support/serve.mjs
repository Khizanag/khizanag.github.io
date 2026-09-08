/**
 * Static server for `_site` that mirrors how GitHub Pages serves this site:
 * `/jobs` resolves to `jobs.html`, `/dir/` to `dir/index.html`, and every
 * unknown path gets `404.html` with a 404 status.
 */
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('../../_site', import.meta.url)));
const HOST = '127.0.0.1';
const PORT = Number(process.env.SITE_PORT ?? 4173);

const CONTENT_TYPES = {
    '.css': 'text/css; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.ico': 'image/x-icon',
    '.jpg': 'image/jpeg',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.map': 'application/json; charset=utf-8',
    '.pdf': 'application/pdf',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.txt': 'text/plain; charset=utf-8',
    '.webp': 'image/webp',
    '.woff2': 'font/woff2',
    '.xml': 'application/xml; charset=utf-8',
};

async function fileAt(candidate) {
    if (candidate !== ROOT && !candidate.startsWith(ROOT + sep)) return null;
    try {
        const stats = await stat(candidate);
        return stats.isFile() ? candidate : null;
    } catch {
        return null;
    }
}

async function resolveFile(pathname) {
    const target = resolve(ROOT, '.' + pathname);
    if (pathname.endsWith('/')) return fileAt(join(target, 'index.html'));
    return (await fileAt(target))
        ?? (await fileAt(target + '.html'))
        ?? (await fileAt(join(target, 'index.html')));
}

function send(response, status, file) {
    response.writeHead(status, {
        'content-type': CONTENT_TYPES[extname(file)] ?? 'application/octet-stream',
        'cache-control': 'no-store',
    });
    createReadStream(file).on('error', () => response.destroy()).pipe(response);
}

function sendPlain(response, status, body) {
    response.writeHead(status, { 'content-type': 'text/plain; charset=utf-8' });
    response.end(body);
}

async function handle(request, response) {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
        sendPlain(response, 405, 'Method not allowed');
        return;
    }

    let pathname;
    try {
        pathname = decodeURIComponent(new URL(request.url, 'http://' + HOST).pathname);
    } catch {
        sendPlain(response, 400, 'Bad request');
        return;
    }

    const file = await resolveFile(pathname);
    if (file) {
        send(response, 200, file);
        return;
    }

    const notFound = await fileAt(join(ROOT, '404.html'));
    if (notFound) {
        send(response, 404, notFound);
        return;
    }
    sendPlain(response, 404, 'Not found');
}

if (!(await stat(ROOT).catch(() => null))?.isDirectory()) {
    console.error(ROOT + ' is missing — run \'npm run build && npm run assemble\' first');
    process.exit(1);
}

createServer((request, response) => {
    handle(request, response).catch(() => sendPlain(response, 500, 'Server error'));
}).listen(PORT, HOST, () => {
    console.log('serving ' + ROOT + ' at http://' + HOST + ':' + PORT);
});
